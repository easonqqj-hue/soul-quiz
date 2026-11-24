(function () {
  'use strict';
  if (window.SoulPay) return;

  /* QR_BEGIN：独立 byte/M 编码器，版本 1–10，四模块静区，无外部请求。 */
  function qrSVG(text) {
    var bytes = Array.from(new TextEncoder().encode(text));
    var blocks = [null, [[1,26,16]], [[1,44,28]], [[1,70,44]], [[2,50,32]], [[2,67,43]], [[4,43,27]], [[4,49,31]], [[2,60,38],[2,61,39]], [[3,58,36],[2,59,37]], [[4,69,43],[1,70,44]]];
    var align = [[],[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50]];
    var version, capacity;
    for (version = 1; version <= 10; version++) {
      capacity = blocks[version].reduce(function (n, g) { return n + g[0] * g[2]; }, 0);
      if (4 + (version < 10 ? 8 : 16) + bytes.length * 8 <= capacity * 8) break;
    }
    if (version > 10) throw new Error('支付二维码内容过长，请使用其他支付方式');
    var bits = [];
    function append(value, length) { for (var i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1); }
    append(4, 4); append(bytes.length, version < 10 ? 8 : 16);
    bytes.forEach(function (b) { append(b, 8); });
    append(0, Math.min(4, capacity * 8 - bits.length));
    while (bits.length % 8) bits.push(0);
    var data = [];
    for (var b = 0; b < bits.length; b += 8) data.push(bits.slice(b, b + 8).reduce(function (v, bit) { return v * 2 + bit; }, 0));
    for (var pad = 0; data.length < capacity; pad++) data.push(pad % 2 ? 17 : 236);
    function mul(a, b) {
      var value = 0;
      for (var k = 0; k < 8; k++) { if (b & 1) value ^= a; b >>>= 1; a <<= 1; if (a & 256) a ^= 0x11d; }
      return value;
    }
    function parity(chunk, degree) {
      var poly = [1], root = 1;
      for (var i = 0; i < degree; i++) {
        var next = new Array(poly.length + 1).fill(0);
        poly.forEach(function (n, j) { next[j] ^= n; next[j + 1] ^= mul(n, root); });
        poly = next; root = mul(root, 2);
      }
      var result = chunk.concat(new Array(degree).fill(0));
      for (var j = 0; j < chunk.length; j++) {
        var factor = result[j];
        for (var p = 0; p < poly.length; p++) result[j + p] ^= mul(poly[p], factor);
      }
      return result.slice(chunk.length);
    }
    var groups = [], offset = 0;
    blocks[version].forEach(function (g) {
      for (var n = 0; n < g[0]; n++) {
        var chunk = data.slice(offset, offset + g[2]); offset += g[2];
        groups.push({ data: chunk, ecc: parity(chunk, g[1] - g[2]) });
      }
    });
    var words = [];
    ['data', 'ecc'].forEach(function (key) {
      var length = Math.max.apply(null, groups.map(function (g) { return g[key].length; }));
      for (var i = 0; i < length; i++) groups.forEach(function (g) { if (i < g[key].length) words.push(g[key][i]); });
    });
    var size = version * 4 + 17;
    var base = Array.from({ length: size }, function () { return new Array(size).fill(false); });
    var fixed = base.map(function (row) { return row.slice(); });
    function set(x, y, value) { if (x >= 0 && y >= 0 && x < size && y < size) { base[y][x] = Boolean(value); fixed[y][x] = true; } }
    for (var t = 0; t < size; t++) { set(6, t, t % 2 === 0); set(t, 6, t % 2 === 0); }
    [[3,3],[size-4,3],[3,size-4]].forEach(function (center) {
      for (var y = -4; y <= 4; y++) for (var x = -4; x <= 4; x++) {
        var dist = Math.max(Math.abs(x), Math.abs(y));
        set(center[0]+x, center[1]+y, dist !== 2 && dist !== 4);
      }
    });
    var positions = align[version];
    positions.forEach(function (cy, yi) { positions.forEach(function (cx, xi) {
      var last = positions.length - 1;
      if ((xi === 0 && yi === 0) || (xi === last && yi === 0) || (xi === 0 && yi === last)) return;
      for (var y = -2; y <= 2; y++) for (var x = -2; x <= 2; x++) set(cx+x, cy+y, Math.max(Math.abs(x), Math.abs(y)) !== 1);
    }); });
    function format(mask, target) {
      var remainder = mask;
      for (var i = 0; i < 10; i++) remainder = (remainder << 1) ^ ((remainder >>> 9) * 0x537);
      var value = ((mask << 10) | remainder) ^ 0x5412; // M 的纠错位为 00。
      function put(x, y, bit) { target[y][x] = Boolean((value >>> bit) & 1); fixed[y][x] = true; }
      for (var a = 0; a <= 5; a++) put(8, a, a);
      put(8, 7, 6); put(8, 8, 7); put(7, 8, 8);
      for (var c = 9; c < 15; c++) put(14-c, 8, c);
      for (var d = 0; d < 8; d++) put(size-1-d, 8, d);
      for (var e = 8; e < 15; e++) put(8, size-15+e, e);
      target[size-8][8] = true; fixed[size-8][8] = true;
    }
    format(0, base);
    if (version >= 7) {
      var rem = version;
      for (var v = 0; v < 12; v++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
      var vbits = (version << 12) | rem;
      for (var vb = 0; vb < 18; vb++) { var xx = size-11 + vb%3, yy = Math.floor(vb/3); set(xx, yy, (vbits >>> vb)&1); set(yy, xx, (vbits >>> vb)&1); }
    }
    function masked(mask, x, y) {
      var p = x*y;
      return [((x+y)%2), (y%2), (x%3), ((x+y)%3), ((Math.floor(y/2)+Math.floor(x/3))%2), (p%2+p%3), ((p%2+p%3)%2), (((x+y)%2+p%3)%2)][mask] === 0;
    }
    function penalty(matrix) {
      var score = 0, dark = 0;
      for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
          if (matrix[y][x]) dark++;
          if (x && y && matrix[y][x] === matrix[y-1][x] && matrix[y][x] === matrix[y][x-1] && matrix[y][x] === matrix[y-1][x-1]) score += 3;
        }
        [matrix[y], matrix.map(function (row) { return row[y]; })].forEach(function (line) {
          var run = 1;
          for (var i = 1; i < size; i++) {
            run = line[i] === line[i-1] ? run+1 : 1;
            if (run === 5) score += 3; else if (run > 5) score++;
          }
          var pattern = line.map(Number).join('');
          for (var j = 0; j <= size-11; j++) if (['00001011101','10111010000'].includes(pattern.slice(j,j+11))) score += 40;
        });
      }
      return score + Math.floor(Math.abs(dark*100/(size*size)-50)/5)*10;
    }
    var best, bestScore = Infinity;
    for (var mask = 0; mask < 8; mask++) {
      var matrix = base.map(function (row) { return row.slice(); });
      var index = 0, up = true;
      for (var right = size-1; right >= 1; right -= 2) {
        if (right === 6) right = 5;
        for (var row = 0; row < size; row++) {
          var y = up ? size-1-row : row;
          for (var col = 0; col < 2; col++) {
            var x = right-col;
            if (!fixed[y][x]) {
              var bit = index < words.length*8 ? (words[index>>>3] >>> (7-index%8))&1 : 0;
              matrix[y][x] = Boolean(bit) !== masked(mask,x,y); index++;
            }
          }
        }
        up = !up;
      }
      format(mask, matrix);
      var cost = penalty(matrix);
      if (cost < bestScore) { best = matrix; bestScore = cost; }
    }
    var path = '';
    best.forEach(function (row,y) { row.forEach(function (dark,x) { if (dark) path += 'M'+(x+4)+','+(y+4)+'h1v1h-1z'; }); });
    return '<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="微信支付二维码" viewBox="0 0 '+(size+8)+' '+(size+8)+'" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="'+path+'" fill="#000"/></svg>';
  }
  /* QR_END */

  var script = document.currentScript;
  var settings = { api: new URL((script && script.dataset.api) || '/api', script && script.src || location.href).href.replace(/\/$/,''), brand: {zh:'灵魂测试馆',en:'SoulPay'}, debug: false, lang: 'zh', region: null };
  var config, configPromise, device, modal, polling, resumeOrder, oauthResume, creatingOrder = false;
  var locks = new Map(), events = new Map(), renders = new WeakMap();
  var vars = ['bg','fg','muted','accent','accent-fg','card','line','radius','font','blur'];
  var defaultBullets = ['你的专属结果与金句','性格解析与维度图谱','隐藏优势与趣味彩蛋','关系图鉴与完整分享图'];
  var agreement = '虚拟内容，解锁后不支持退款；娱乐内容不构成专业建议';
  // 字典覆盖组件的标题、操作、支付状态、错误与协议；宿主的通用文案也支持 {zh,en}。
  var messages = { zh: {}, en: {
    '你的专属报告已生成':'Your personal report is ready',
    '你的专属结果与金句':'Your personal result and signature quote',
    '性格解析与维度图谱':'Personality insights and dimension map',
    '隐藏优势与趣味彩蛋':'Hidden strengths and little surprises',
    '关系图鉴与完整分享图':'Relationship gallery and shareable report',
    '虚拟内容，解锁后不支持退款；娱乐内容不构成专业建议':'Digital content. Non-refundable once unlocked. For entertainment only.',
    '加载价格后解锁完整报告':'Load price to unlock your full report',
    '解锁完整报告':'Unlock full report', '我有兑换码':'I have a code',
    '正在封存报告…':'Sealing your report…', '关闭支付弹层':'Close payment dialog',
    '打开模拟收银台':'Open demo checkout', '微信支付':'WeChat Pay', '微信扫码支付':'Scan with WeChat Pay',
    '支付宝支付':'Alipay', '支付宝电脑网站支付':'Alipay desktop checkout',
    '卡支付 · Apple Pay · Google Pay':'Card · Apple Pay · Google Pay',
    '正在打开支付宝':'Opening Alipay', '人民币':'CNY · ¥', '美元':'USD · $', '选择币种':'Choose currency',
    '当前浏览器暂无可用支付方式，可使用兑换码或更换浏览器。':'No payment method is available here. Use a code or try another browser.',
    '查询已有订单':'Check existing order', '确认未付款，重新下单':'I have not paid — create a new order', '重试':'Try again',
    '输入兑换码':'Enter your code', '确认兑换':'Redeem code', '正在验证兑换码…':'Checking your code…',
    '兑换成功':'Code redeemed', '返回支付':'Back to payment', '请提供测试 ID':'A test ID is required',
    '微信支付组件尚未就绪，请重新打开页面':'WeChat Pay is not ready. Please reopen this page.',
    '正在创建订单…':'Creating your order…', '等待支付，完成后报告会自动解锁。':'Waiting for payment. Your report will unlock automatically.',
    '订单':'Order', '模拟支付成功':'Simulate successful payment', '使用微信扫一扫完成支付':'Scan with WeChat to pay',
    '再次打开微信支付':'Open WeChat Pay again', '打开收银台':'Open checkout', '我已支付，查询订单':'I have paid — check order',
    '支付成功':'Payment complete', '购买凭证已保存，报告暂时未能加载。请重试加载，无需再次付款。':'Your purchase is saved. Please reload the report; you do not need to pay again.',
    '重新加载报告':'Reload report', '凭证已保存，但这笔订单或兑换码不包含当前报告，请打开对应测试查看。':'Your purchase is saved, but it does not cover this report. Open the test you purchased.',
    '返回测试':'Back to test', '查看完整报告':'View full report',
    '等待已超过 5 分钟。订单已保留，可继续查询支付结果。':'Five minutes have passed. Your order is saved; you can check again.',
    '继续查询':'Check again', '正在创建订单，请稍候…':'Creating your order. Please wait…',
    '正在核验购买凭证…':'Checking your purchase…', '此报告已解锁':'This report is unlocked', '此报告已购买':'This report is purchased',
    '重新核验购买凭证':'Check purchase again', '请允许浏览器使用本地存储，以保存本设备的购买凭证':'Allow browser storage to save your purchase on this device.',
    '请求失败，请重试':'Something went wrong. Please try again.', '网络请求超时，请先查询订单状态':'The request timed out. Please check your order before paying again.',
    '请提供有效的 testId 和 resultId':'Please provide valid testId and resultId values', 'lock 需要 render(content, el) 回调':'lock requires a render(content, el) callback',
    '商品与结果类型不匹配':'The product does not match this result type', '一个页面只能连接一个 SoulPay 后端':'A page can connect to only one SoulPay backend',
    '锁定容器不存在':'The report container was not found', '事件名称或回调错误':'Invalid event name or callback',
    '支付二维码内容过长，请使用其他支付方式':'The payment QR code is too long. Choose another payment method.',
    '语言必须是 zh 或 en':'Language must be zh or en', '地区必须是 cn 或 intl':'Region must be cn or intl',
    '操作太频繁，请一分钟后再试':'Too many requests. Please try again in a minute.',
    '兑换码不存在':'This code was not found.', '兑换码已使用':'This code has already been used.', '兑换码已过期':'This code has expired.',
    '兑换码不适用于此测试':'This code does not cover this test.', '订单不属于当前设备':'This order belongs to another device.',
    '订单不存在':'This order was not found.', '报告内容尚未配置':'This report is temporarily unavailable.',
    '此支付渠道不可用':'This payment method is unavailable.', '此支付渠道不支持所选币种':'This payment method does not support this currency.',
    '回跳地址不在允许的域名内':'The return page is not allowed. Please contact support.',
    '支付请求未能完成，请先查询订单状态':'Payment could not be started. Please check your order first.',
    '单个测试完整报告':'One complete report', '三个测试合集':'Three-test collection', '全部测试通票':'All tests pass', '双人适配报告':'Couple report'
  }};
  Object.keys(messages.en).forEach(function (key) { messages.zh[key] = key; });
  function localized(value) {
    if (typeof value === 'function') return localized(value());
    if (value && typeof value === 'object' && !Array.isArray(value)) return localized(value[settings.lang] === undefined ? value.zh : value[settings.lang]);
    return typeof value === 'string' && Object.prototype.hasOwnProperty.call(messages[settings.lang],value) ? messages[settings.lang][value] : value;
  }
  function textBinding(el, value) { el.spText = value; el.setAttribute('data-sp-text',''); el.textContent = localized(value); }
  function errorText(error) {
    var known = messages.zh[error.message];
    if (known || settings.lang === 'zh') return localized(error.message || '请求失败，请重试');
    var codes = { RATE_LIMIT:'操作太频繁，请一分钟后再试', CODE_NOT_FOUND:'兑换码不存在', CODE_USED:'兑换码已使用', CODE_EXPIRED:'兑换码已过期', CODE_SCOPE:'兑换码不适用于此测试', DEVICE_MISMATCH:'订单不属于当前设备', ORDER_NOT_FOUND:'订单不存在', CONTENT_NOT_FOUND:'报告内容尚未配置', CHANNEL:'此支付渠道不可用', CURRENCY_CHANNEL:'此支付渠道不支持所选币种', REDIRECT:'回跳地址不在允许的域名内', PAYMENT_NETWORK:'支付请求未能完成，请先查询订单状态', PAYMENT_UPSTREAM:'支付请求未能完成，请先查询订单状态' };
    return localized(codes[error.code] || '请求失败，请重试');
  }
  function detectRegion() {
    var zone = '';
    try { zone = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (_) { /* 使用浏览器语言 */ }
    return settings.lang === 'zh' && (['Asia/Shanghai','Asia/Chongqing','Asia/Urumqi','Asia/Harbin'].includes(zone) || /^zh-CN$/i.test(navigator.language || '')) ? 'cn' : 'intl';
  }
  function region() { return settings.region || detectRegion(); }
  function refreshText() {
    document.querySelectorAll('.sp-card,.sp-overlay').forEach(function (root) {
      root.lang = settings.lang;
      root.querySelectorAll('.sp-list').forEach(function (list) { if (list.spPopulate) list.spPopulate(); });
      root.querySelectorAll('[data-sp-text]').forEach(function (el) { el.textContent = localized(el.spText); });
      var closeButton = root.querySelector('.sp-close');
      if (closeButton) closeButton.setAttribute('aria-label',localized('关闭支付弹层'));
      var qr = root.querySelector('.sp-qr svg');
      if (qr) qr.setAttribute('aria-label',settings.lang === 'en' ? 'WeChat Pay QR code' : '微信支付二维码');
      var currencies = root.querySelector('.sp-currencies');
      if (currencies) currencies.setAttribute('aria-label',localized('选择币种'));
    });
  }
  async function setLang(lang) {
    if (!['zh','en'].includes(lang)) throw new Error(localized('语言必须是 zh 或 en'));
    var changed = settings.lang !== lang;
    settings.lang = lang; refreshText();
    if (changed) locks.forEach(function (context) {
      context.revision = (context.revision || 0) + 1;
      context.unlocked = false; showLock(context);
    });
    if (changed) emit('lang',{lang:lang});
    await init();
    // 宿主可在 lang 事件里 relock 并提交新 ID；没有映射时仍请求原 ID，服务端严格校验。
    await refreshLocks(true);
    return config;
  }
  var regionPromises = new Map();
  async function loadRegion() {
    var desired = region();
    if (!regionPromises.has(desired)) regionPromises.set(desired,api('/config?region='+desired).catch(function (error) { regionPromises.delete(desired); throw error; }));
    var loaded = await regionPromises.get(desired);
    if (desired === region()) {
      config = loaded;
      locks.forEach(function (context) { if (!context.unlocked) showLock(context,context.error); });
      if (modal && modal.view === 'purchase') purchaseView(modal);
      refreshText();
    }
    return loaded;
  }
  function emit(name, detail) {
    (events.get(name) || []).forEach(function (fn) { try { fn(detail); } catch (error) { if (settings.debug) console.warn('SoulPay 事件处理失败', name); } });
  }
  function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (_) { return fallback; } }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (_) { throw new Error('请允许浏览器使用本地存储，以保存本设备的购买凭证'); }
  }
  function pendingKey() { return 'soulpay_pending:' + settings.api; }
  function getDevice() {
    if (device) return device;
    var existing = read('soulpay_device', '');
    if (/^[a-f0-9]{32}$/.test(existing)) { device = existing; return device; }
    var bytes = new Uint8Array(16); window.crypto.getRandomValues(bytes);
    device = Array.from(bytes).map(function (b) { return b.toString(16).padStart(2,'0'); }).join('');
    write('soulpay_device', device); return device;
  }
  function tokenPayload(token) {
    try { var str = token.split('.')[0].replace(/-/g,'+').replace(/_/g,'/'); return JSON.parse(atob(str.padEnd(Math.ceil(str.length/4)*4, '='))); } catch (_) { return null; }
  }
  function saveTokens(result) {
    var old = read('soulpay_tokens', []); if (!Array.isArray(old)) old = [];
    var valid = old.concat(result.tokens || [result.token]).filter(function (token) { var p = typeof token === 'string' && tokenPayload(token); return p && p.did === getDevice() && p.exp*1000 > Date.now(); });
    // 一种 scope 保存最新凭证，避免重测和重复查询无限膨胀。
    var unique = new Map(); valid.forEach(function (token) { unique.set(tokenPayload(token).scope, token); });
    write('soulpay_tokens', Array.from(unique.values()));
  }
  function candidates(testId, resultId) {
    var tokens = read('soulpay_tokens', []); if (!Array.isArray(tokens)) return [];
    var pair = resultId.includes('+');
    return tokens.filter(function (token) {
      var p = typeof token === 'string' && tokenPayload(token);
      return p && p.did === getDevice() && p.exp*1000 > Date.now() && (pair ? p.scope === 'couple:'+testId : p.scope === 'all' || p.scope === 'test:'+testId);
    }).reverse();
  }
  async function api(path, body) {
    var controller = new AbortController(), timer = setTimeout(function () { controller.abort(); }, 15000);
    try {
      var response = await fetch(settings.api + path, { method: body === undefined ? 'GET' : 'POST', headers: body === undefined ? {} : { 'Content-Type':'application/json' }, body: body === undefined ? undefined : JSON.stringify(body), signal: controller.signal, credentials: 'omit', cache: 'no-store' });
      var data = await response.json();
      if (!response.ok) { var error = new Error(data.error && data.error.message || '请求失败，请重试'); error.code = data.error && data.error.code; error.orderId = data.error && data.error.orderId; error.status = response.status; throw error; }
      return data;
    } catch (error) {
      if (error.name === 'AbortError') throw new Error('网络请求超时，请先查询订单状态');
      throw error;
    } finally { clearTimeout(timer); }
  }
  function element(tag, cls, text) { var el = document.createElement(tag); if (cls) el.className = cls; if (text !== undefined && text !== '') textBinding(el,text); return el; }
  function button(text, cls, handler) { var el = element('button', cls, text); el.type = 'button'; el.addEventListener('click', handler); return el; }
  function money(price, currency) { return ((currency || config && config.currency || (region() === 'cn' ? 'CNY' : 'USD')) === 'USD' ? '$' : '¥') + (price / 100).toFixed(2); }
  function reportError(error) { emit('error', error); if (settings.debug) console.warn('SoulPay', error.code || 'REQUEST_FAILED'); }
  function options(raw, requireRender) {
    if (!raw || !/^[a-z0-9_-]{1,80}$/.test(raw.testId || '') || !/^[a-z0-9_-]{1,80}(?:\+[a-z0-9_-]{1,80})?$/.test(raw.resultId || '')) throw new Error('请提供有效的 testId 和 resultId');
    if (requireRender && typeof raw.render !== 'function') throw new Error('lock 需要 render(content, el) 回调');
    var sku = raw.sku || 'single';
    if (!['single','all','couple'].includes(sku) || (sku === 'couple') !== raw.resultId.includes('+')) throw new Error('商品与结果类型不匹配');
    // 只读取新版参数；结果对象、preview 和未知属性均不进入锁卡。
    return { testId: raw.testId, resultId: raw.resultId, sku: sku, title: raw.title || '你的专属报告已生成', teaser: raw.teaser || '', bullets: raw.bullets || defaultBullets, answers: raw.answers, render: raw.render, fallback: raw.fallback };
  }
  function theme(from, to) {
    var computed = getComputedStyle(from || document.documentElement);
    vars.forEach(function (name) { var value = computed.getPropertyValue('--sp-'+name); if (value.trim()) to.style.setProperty('--sp-'+name, value); });
    if (!computed.getPropertyValue('--sp-font').trim()) to.style.setProperty('--sp-font', computed.fontFamily);
  }
  function injectStyle() {
    if (document.getElementById('sp-style')) return;
    var style = element('style'); style.id = 'sp-style';
    style.textContent = `
.sp-card,.sp-overlay{--sp-fallback-bg:#fffaf3;--sp-fallback-fg:#302b27;color:var(--sp-fg,var(--sp-fallback-fg));font-family:var(--sp-font,inherit);font-size:15px;line-height:1.7;box-sizing:border-box}
.sp-card[lang=en],.sp-overlay[lang=en]{font-family:var(--sp-font-en,"Avenir Next","Segoe UI",Arial,sans-serif);letter-spacing:.005em;line-height:1.65}.sp-card[lang=en] .sp-title,.sp-overlay[lang=en] .sp-title{letter-spacing:-.025em;line-height:1.25}.sp-card[lang=en] .sp-seal:after{content:'✦'}.sp-icon.sp-icon-card{background:#5145a5;flex-shrink:0}.sp-icon-card svg{width:22px;height:22px}.sp-currencies{display:flex;gap:10px;margin:16px 0}.sp-price{font-variant-numeric:tabular-nums}
.sp-card *,.sp-overlay *{box-sizing:border-box}.sp-card button,.sp-overlay button,.sp-overlay input{font:inherit}.sp-card button,.sp-overlay button{cursor:pointer}.sp-card button:disabled,.sp-overlay button:disabled{cursor:wait;opacity:.55}.sp-card button:focus-visible,.sp-overlay :focus-visible{outline:3px solid var(--sp-accent,#a1352c);outline-offset:4px}
.sp-card{background:var(--sp-card,var(--sp-bg,#fffaf3));border:1px solid var(--sp-line,#ded5ca);border-radius:var(--sp-radius,18px);padding:36px 30px;max-width:560px;margin:auto;text-align:center;box-shadow:0 12px 36px #00000008}.sp-seal{position:relative;width:70px;height:82px;border:1px solid var(--sp-line,#ded5ca);margin:0 auto 24px;display:grid;place-items:center;border-radius:3px;background:repeating-linear-gradient(0deg,transparent,transparent 12px,var(--sp-line,#ded5ca) 13px,transparent 14px)}.sp-seal:after{content:'封';display:grid;place-items:center;border:1px solid currentColor;border-radius:50%;width:36px;height:36px;color:var(--sp-accent,#a1352c);background:var(--sp-card,var(--sp-bg,#fffaf3));font-family:serif;transform:rotate(-9deg)}
.sp-title{font-size:23px;font-weight:600;letter-spacing:.03em;line-height:1.45;margin:0 0 12px}.sp-teaser,.sp-muted{color:var(--sp-muted,#746b62);margin:8px 0 20px}.sp-list{list-style:none;margin:24px auto;padding:0;max-width:310px;text-align:left;display:grid;gap:10px}.sp-list li{padding-left:21px;position:relative}.sp-list li:before{content:'＋';position:absolute;left:0;color:var(--sp-accent,#a1352c)}.sp-main{display:block;width:100%;border:1px solid transparent;border-radius:10px;padding:14px 18px;color:var(--sp-accent-fg,#fff);background:var(--sp-accent,#a1352c);font-weight:600;transition:transform .18s,opacity .18s}.sp-main:active{transform:scale(.985)}.sp-link{border:0;background:none;color:var(--sp-fg,#302b27);text-decoration:underline;text-underline-offset:4px;padding:10px 8px}.sp-terms{color:var(--sp-muted,#746b62);font-size:12px;margin:16px 0 0;line-height:1.7}.sp-error{color:var(--sp-fg,#302b27);border-left:3px solid var(--sp-accent,#a1352c);padding:10px 14px;background:var(--sp-card,#fffaf3);text-align:left}
.sp-overlay{position:fixed;inset:0;z-index:2147483000;background:#0009;display:flex;align-items:center;justify-content:center;padding:24px;isolation:isolate}.sp-dialog{position:relative;max-width:460px;width:100%;max-height:90vh;max-height:90dvh;overflow:auto;overscroll-behavior:contain;background:var(--sp-bg,#fffaf3);border:1px solid var(--sp-line,#ded5ca);border-radius:var(--sp-radius,18px);padding:30px;box-shadow:0 24px 90px #0004;animation:sp-enter .22s ease-out}.sp-close{position:absolute;top:10px;right:12px;background:none;border:0;font-size:25px!important;width:42px;height:42px;color:inherit}.sp-brand{font-size:12px;color:var(--sp-muted,#746b62);margin:0 40px 24px 0}.sp-price{font-size:40px;font-weight:500;line-height:1.25;color:var(--sp-accent,#a1352c);margin:20px 0}.sp-choices{display:flex;gap:10px;margin:18px 0}.sp-choice{flex:1;border:1px solid var(--sp-line,#ded5ca);border-radius:9px;padding:10px 8px;background:var(--sp-card,#fffaf3);color:inherit}.sp-choice[aria-pressed=true]{border-color:var(--sp-accent,#a1352c);box-shadow:inset 0 0 0 1px var(--sp-accent,#a1352c)}.sp-methods{display:grid;gap:12px}.sp-method{width:100%;text-align:left;border:1px solid var(--sp-line,#ded5ca);border-radius:10px;background:var(--sp-card,#fffaf3);color:inherit;padding:14px 16px;display:flex;align-items:center;gap:12px}.sp-icon{display:inline-grid;place-items:center;width:27px;height:27px;border-radius:8px;background:#06793d;color:white;font-weight:bold}.sp-icon-alipay{background:#0875b9}.sp-input{width:100%;border:1px solid var(--sp-line,#ded5ca);border-radius:8px;background:var(--sp-card,#fffaf3);color:inherit;padding:12px;margin:8px 0 14px}.sp-status{margin:18px 0 8px;overflow-wrap:anywhere}.sp-qr{width:232px;max-width:100%;margin:20px auto;padding:0;background:#fff}.sp-qr svg{display:block;width:100%;height:auto}.sp-success{width:60px;height:60px;border:1px solid var(--sp-accent,#a1352c);border-radius:50%;margin:24px auto;display:grid;place-items:center;color:var(--sp-accent,#a1352c);animation:sp-check .3s ease-out}.sp-success:after{content:'✓';font-size:32px}.sp-receipt{font-size:12px;color:var(--sp-muted,#746b62);overflow-wrap:anywhere}.sp-loading{color:var(--sp-muted,#746b62);text-align:center;padding:24px}
@keyframes sp-enter{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}@keyframes sp-check{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}
@media(max-width:600px){.sp-overlay{padding:0;align-items:flex-end}.sp-dialog{border-radius:var(--sp-radius,18px) var(--sp-radius,18px) 0 0;max-height:94vh;max-height:94dvh;padding:28px 24px calc(24px + env(safe-area-inset-bottom,0px))}.sp-card{padding:28px 20px}.sp-title{font-size:21px}}@media(prefers-reduced-motion:reduce){.sp-card *,.sp-overlay *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;
    document.head.appendChild(style);
  }
  function addBullets(parent, opts) {
    var list = element('ul','sp-list');
    function populate() {
      var items = localized(opts.bullets);
      if (typeof items === 'string') items = [items];
      if (!Array.isArray(items)) items = defaultBullets;
      list.replaceChildren(); items.slice(0,10).forEach(function (text) { list.appendChild(element('li','',text)); });
    }
    list.spPopulate = populate; populate(); parent.appendChild(list);
  }
  function showLock(context, error) {
    if (locks.get(context.el) !== context) return;
    context.error = error;
    var card = element('section','sp-card'); card.lang = settings.lang;
    var seal = element('div','sp-seal'); seal.setAttribute('aria-hidden','true'); card.appendChild(seal);
    card.appendChild(element('h2','sp-title',context.opts.title));
    if (context.opts.teaser) card.appendChild(element('p','sp-teaser',context.opts.teaser));
    addBullets(card,context.opts);
    var price = config && config.skus[context.opts.sku].price;
    card.appendChild(button(function () { return price === undefined ? localized('加载价格后解锁完整报告') : money(price)+' '+localized('解锁完整报告'); },'sp-main',function () { openContext(context).catch(reportError); }));
    card.appendChild(button('我有兑换码','sp-link',function () { openContext(context,true).catch(reportError); }));
    card.appendChild(element('p','sp-terms',agreement));
    if (error) { var notice = element('p','sp-error',function () { return errorText(error); }); notice.setAttribute('role','alert'); card.appendChild(notice); }
    context.el.replaceChildren(card);
  }
  async function contentFor(opts, lang) {
    lang = lang || settings.lang;
    var tokens = candidates(opts.testId,opts.resultId);
    for (var token of tokens) {
      try { return (await api('/unlock',{ token:token, deviceId:getDevice(), testId:opts.testId, resultId:opts.resultId, lang:lang })).content; }
      catch (error) {
        // 仅后端通过凭证和订单校验后给出的缺内容错误允许 mock fallback。
        if (error.code === 'CONTENT_NOT_FOUND' && config.mode === 'mock' && opts.fallback) {
          var fallback = opts.fallback.result ? opts.fallback : { result:opts.fallback,gallery:[] };
          var actual = fallback.lang || (lang === 'en' && hasFallbackEnglish(fallback.result) ? 'en' : 'zh');
          return Object.assign(fallbackLanguage(fallback,actual),{lang:actual});
        }
        if (error.status !== 403) throw error;
      }
    }
    return null;
  }
  function hasFallbackEnglish(value) {
    if (!value || typeof value !== 'object') return false;
    if (value.en && typeof value.en === 'object' && !Array.isArray(value.en) && Object.keys(value.en).length) return true;
    return Object.keys(value).some(function (key) { return hasFallbackEnglish(value[key]); });
  }
  function fallbackLanguage(value, lang) {
    if (Array.isArray(value)) return value.map(function (item) { return fallbackLanguage(item,lang); });
    if (!value || typeof value !== 'object') return value;
    var merged = Object.assign({},value,lang === 'en' ? value.en || {} : {}), result = {};
    Object.keys(merged).forEach(function (key) { if (key !== 'en') result[key] = fallbackLanguage(merged[key],lang); });
    if (value.id) result.id = value.id;
    return result;
  }
  async function unlockContext(context) {
    if (locks.get(context.el) !== context) return false;
    // 同一实例/语言的并发刷新共用请求；relock 会创建新实例，使旧响应自动失效。
    if (context.loading && context.loading.lang === settings.lang && context.loading.revision === context.revision) return context.loading.promise;
    var lang = settings.lang, revision = (context.revision || 0) + 1; context.revision = revision;
    function active() { return lang === settings.lang && locks.get(context.el) === context && context.revision === revision; }
    var loading = {lang:lang,revision:revision};
    loading.promise = (async function () {
      try {
        var content = await contentFor(context.opts,lang);
        if (!content || !active()) return false;
        // 同一容器的异步 render 串行，旧回调完成后才能提交新结果。
        var renderTask = (renders.get(context.el) || Promise.resolve()).catch(function () {}).then(async function () {
          if (!active()) return false;
          context.el.replaceChildren();
          try { await context.opts.render(content,context.el); }
          finally {
            if (!active()) {
              var latest = locks.get(context.el);
              if (latest) showLock(latest,latest.error);
            }
          }
          if (!active()) return false;
          context.unlocked = true; context.error = null;
          emit('unlock',{testId:context.opts.testId,resultId:context.opts.resultId,content:content,lang:content.lang || lang});
          return true;
        });
        renders.set(context.el,renderTask);
        try { return await renderTask; }
        finally { if (renders.get(context.el) === renderTask) renders.delete(context.el); }
      } catch (error) { if (active()) throw error; return false; }
    })();
    context.loading = loading;
    try { return await loading.promise; }
    finally { if (context.loading === loading) context.loading = null; }
  }
  async function refreshLocks(includeUnlocked) {
    var failures = [];
    await Promise.all(Array.from(locks.values()).map(async function (context) {
      if (!context.el.isConnected) { locks.delete(context.el); return; }
      if (context.unlocked && !includeUnlocked) return;
      try { await unlockContext(context); } catch (error) { if (!context.unlocked) showLock(context,error); failures.push(error); reportError(error); }
    }));
    return failures;
  }
  function consumeHash() {
    var params = new URLSearchParams(location.hash.slice(1)), changed = false;
    var openid = params.get('sp_openid');
    if (openid && /^[A-Za-z0-9_-]{8,128}$/.test(openid)) {
      write('soulpay_openid:'+settings.api,openid);
      oauthResume = read('soulpay_oauth:'+settings.api,null);
    }
    var id = params.get('sp_order');
    if (id && /^SP\d{20}$/.test(id)) resumeOrder = id;
    ['sp_openid','sp_order'].forEach(function (key) { if (params.has(key)) { params.delete(key); changed = true; } });
    if (changed) { var target = new URL(location.href); target.hash = params.toString(); history.replaceState(history.state,'',target.href); }
  }
  async function init(opts) {
    if (opts) {
      var nextApi = opts.api ? new URL(opts.api,location.href).href.replace(/\/$/,'') : settings.api.replace(/\/$/,'');
      if (configPromise && nextApi !== settings.api) throw new Error('一个页面只能连接一个 SoulPay 后端');
      settings.api = nextApi; if (opts.brand) settings.brand = opts.brand; settings.debug = Boolean(opts.debug);
      if (opts.lang !== undefined) {
        if (!['zh','en'].includes(opts.lang)) throw new Error(localized('语言必须是 zh 或 en'));
        var changed = settings.lang !== opts.lang; settings.lang = opts.lang;
        if (changed) emit('lang',{lang:settings.lang});
      }
      if (opts.region !== undefined) {
        if (!['cn','intl'].includes(opts.region)) throw new Error(localized('地区必须是 cn 或 intl'));
        settings.region = opts.region;
      }
      refreshText();
    }
    settings.api = settings.api.replace(/\/$/,'');
    if (!configPromise) {
      configPromise = (async function () {
        injectStyle(); getDevice(); consumeHash();
        await loadRegion();
        var pending = read(pendingKey(),null);
        if (resumeOrder || pending && pending.id) startPolling(resumeOrder || pending.id);
        return config;
      })().catch(function (error) { configPromise = null; throw error; });
    }
    await configPromise;
    if (!config || config.region !== region()) await loadRegion();
    return config;
  }
  async function lock(el, raw) {
    if (typeof el === 'string') el = document.querySelector(el);
    if (!el || !el.replaceChildren) throw new Error('锁定容器不存在');
    var opts = options(raw,true), previous = locks.get(el);
    // 先清空整个结果容器，网络等待期间也不留下旧结果。
    el.replaceChildren(element('p','sp-loading','正在封存报告…'));
    var context = { el:el,opts:opts,unlocked:false };
    locks.set(el,context); injectStyle(); showLock(context);
    if (modal && (modal.context === previous || !modal.context.el && modal.context.opts.testId === opts.testId && modal.context.opts.resultId.includes('+') === opts.resultId.includes('+'))) {
      modal.context = context;
      textBinding(modal.dialog.querySelector('.sp-title'),opts.title);
      if (modal.view === 'purchase' && config) purchaseView(modal);
    }
    try {
      await init();
      if (locks.get(el) !== context) return 'locked';
      if (await unlockContext(context) || context.unlocked) return 'unlocked';
      if (locks.get(el) !== context) return 'locked';
      showLock(context);
      if (oauthResume && oauthResume.testId === context.opts.testId && oauthResume.resultId === context.opts.resultId && Date.now()-oauthResume.at < 600000) {
        if (['single','all','couple'].includes(oauthResume.sku)) context.opts.sku = oauthResume.sku;
        oauthResume = null; write('soulpay_oauth:'+settings.api,null); await openContext(context);
      }
      return 'locked';
    } catch (error) { if (locks.get(el) === context) { showLock(context,error); reportError(error); } return 'locked'; }
  }
  function close() {
    if (!modal) return;
    var current = modal; modal = null;
    document.removeEventListener('keydown',current.keydown);
    current.hidden.forEach(function (entry) { entry.el.inert = entry.inert; });
    current.overlay.remove(); document.body.style.overflow = current.overflow;
    if (current.focus && current.focus.isConnected) current.focus.focus();
    else if (current.context.el && current.context.el.isConnected) { current.context.el.tabIndex = -1; current.context.el.focus(); }
    emit('close',{});
  }
  function buildModal(context) {
    close();
    var overlay = element('div','sp-overlay'); overlay.lang = settings.lang; theme(context.el,overlay);
    var dialog = element('section','sp-dialog'); dialog.setAttribute('role','dialog'); dialog.setAttribute('aria-modal','true'); dialog.setAttribute('aria-labelledby','sp-dialog-title'); dialog.tabIndex = -1;
    dialog.appendChild(button('×','sp-close',close)); dialog.firstChild.setAttribute('aria-label',localized('关闭支付弹层'));
    dialog.appendChild(element('p','sp-brand',settings.brand));
    var title = element('h2','sp-title',context.opts.title); title.id = 'sp-dialog-title'; dialog.appendChild(title);
    var body = element('div','sp-body'); dialog.appendChild(body);
    dialog.appendChild(element('p','sp-terms',agreement));
    overlay.appendChild(dialog);
    overlay.addEventListener('click',function (event) { if (event.target === overlay) close(); });
    var current = { context:context,overlay:overlay,dialog:dialog,body:body,focus:document.activeElement,overflow:document.body.style.overflow,hidden:[],busy:false };
    Array.from(document.body.children).forEach(function (el) { current.hidden.push({ el:el,inert:el.inert }); el.inert = true; });
    current.keydown = function (event) {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key !== 'Tab') return;
      var focusable = Array.from(dialog.querySelectorAll('button:not(:disabled),input:not(:disabled),a[href],[tabindex="0"]')).filter(function (el) { return el.getClientRects().length; });
      var first = focusable[0], last = focusable[focusable.length-1];
      if (!first) { event.preventDefault(); dialog.focus(); }
      else if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement) || document.activeElement === dialog)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown',current.keydown); document.body.appendChild(overlay); document.body.style.overflow = 'hidden'; modal = current; dialog.focus();
    emit('open',{testId:context.opts.testId,sku:context.opts.sku}); return current;
  }
  function status(current, text, error) {
    if (modal !== current) return;
    current.view = 'status';
    current.body.replaceChildren();
    var message = element('p',error ? 'sp-status sp-error' : 'sp-status',text); message.setAttribute('role',error ? 'alert' : 'status'); message.setAttribute('aria-live','polite'); current.body.appendChild(message);
  }
  function availableChannels() {
    if (config.region === 'intl') return ['stripe_checkout','paypal','mock'].filter(function (channel) { return config.channels.includes(channel); });
    var ua = navigator.userAgent;
    var desired = /MicroMessenger/i.test(ua) ? ['wechat_jsapi'] : /AlipayClient/i.test(ua) ? ['alipay_wap'] : /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ? ['alipay_wap','wechat_h5'] : ['wechat_native','alipay_page'];
    return desired.concat(config.mode === 'mock' ? ['mock'] : []).filter(function (channel) { return config.channels.includes(channel); });
  }
  function purchaseView(current) {
    if (modal !== current) return;
    current.view = 'purchase'; current.busy = false; current.body.replaceChildren();
    var opts = current.context.opts;
    var price = element('p','sp-price',money(config.skus[opts.sku].price)); current.body.appendChild(price);
    var currencies = element('div','sp-currencies'); currencies.setAttribute('role','group');
    currencies.setAttribute('aria-label',localized('选择币种'));
    [['cn','人民币'],['intl','美元']].forEach(function (entry) {
      var choice = button(entry[1],'sp-choice',async function () {
        if (creatingOrder || current.busy) return;
        var previous = settings.region; current.busy = true;
        Array.from(current.body.querySelectorAll('button')).forEach(function (item) { item.disabled = true; });
        settings.region = entry[0];
        try { await loadRegion(); emit('currency',{currency:config.currency,region:config.region}); }
        catch (error) { settings.region = previous; purchaseView(current); current.body.appendChild(element('p','sp-error',function () { return errorText(error); })); reportError(error); }
        finally { current.busy = false; }
      });
      choice.setAttribute('aria-pressed',String(config.region === entry[0])); currencies.appendChild(choice);
    });
    current.body.appendChild(currencies);
    var choices = element('div','sp-choices');
    (opts.sku === 'couple' ? ['couple'] : ['single','all']).forEach(function (sku) {
      var choice = button(config.skus[sku].title,'sp-choice',function () { opts.sku = sku; purchaseView(current); });
      choice.setAttribute('aria-pressed',String(opts.sku === sku)); choices.appendChild(choice);
    });
    current.body.appendChild(choices);
    var methods = element('div','sp-methods');
    var names = {mock:'打开模拟收银台',wechat_jsapi:'微信支付',wechat_h5:'微信支付',wechat_native:'微信扫码支付',alipay_wap:'支付宝支付',alipay_page:'支付宝电脑网站支付',stripe_checkout:'卡支付 · Apple Pay · Google Pay',paypal:'PayPal'};
    var channels = availableChannels();
    channels.forEach(function (channel) {
      var pay = button('','sp-method',function () {
        if (current.busy || creatingOrder) return;
        current.busy = true;
        // 必须在用户点击调用栈里预开窗口，避免异步下单后被拦截。
        var popup = channel === 'alipay_page' && config.mode !== 'mock' ? window.open('about:blank','_blank') : null;
        if (popup) { popup.opener = null; popup.document.title = localized('正在打开支付宝'); }
        creatingOrder = true;
        createOrder(current,channel,popup).catch(function (error) { if (popup && !popup.closed) popup.close(); current.busy = false; reportError(error); paymentFailure(modal || current,error); }).finally(function () { creatingOrder = false; });
      });
      var icon = element('span','sp-icon'+(channel.startsWith('alipay') ? ' sp-icon-alipay' : ''),channel === 'mock' ? '验' : channel.startsWith('alipay') ? '支' : '微'); icon.setAttribute('aria-hidden','true');
      if (channel === 'stripe_checkout') {
        icon.className = 'sp-icon sp-icon-card'; icon.removeAttribute('data-sp-text');
        icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 9h20M6 15h4"/></svg>';
      } else if (channel === 'mock') textBinding(icon,'◇');
      else if (channel.startsWith('alipay')) textBinding(icon,'A');
      else textBinding(icon,'W');
      pay.append(icon,element('span','',names[channel])); methods.appendChild(pay);
    });
    if (!channels.length) methods.appendChild(element('p','sp-error','当前浏览器暂无可用支付方式，可使用兑换码或更换浏览器。'));
    current.body.appendChild(methods);
    current.body.appendChild(button('我有兑换码','sp-link',function () { redeemView(current); }));
  }
  function paymentFailure(current,error) {
    status(current,function () { return errorText(error); },true);
    if (modal !== current) return;
    if (read(pendingKey(),null)) {
      current.body.appendChild(button('查询已有订单','sp-main',function () { var pending = read(pendingKey(),null); if (pending) { waitingView(current,pending); startPolling(pending.id); } }));
      current.body.appendChild(button('确认未付款，重新下单','sp-link',function () { if (polling) clearTimeout(polling.timer); polling = null; write(pendingKey(),null); purchaseView(current); }));
    } else current.body.appendChild(button('重试','sp-main',function () { purchaseView(current); }));
  }
  function redeemView(current) {
    if (modal !== current) return;
    current.view = 'redeem';
    current.body.replaceChildren();
    var form = element('form','sp-form');
    var label = element('label','','输入兑换码'); label.htmlFor = 'sp-code';
    var input = element('input','sp-input'); input.id = 'sp-code'; input.name = 'code'; input.autocomplete = 'off'; input.maxLength = 128; input.required = true;
    var submit = element('button','sp-main','确认兑换'); submit.type = 'submit';
    var feedback = element('p','sp-status'); feedback.setAttribute('role','status');
    form.append(label,input,submit,feedback);
    form.addEventListener('submit',async function (event) {
      event.preventDefault(); if (submit.disabled) return; submit.disabled = true; textBinding(feedback,'正在验证兑换码…');
      try {
        await redeem(input.value,{testId:current.context.opts.testId});
        await paidView(current,'兑换成功');
      } catch (error) { textBinding(feedback,function () { return errorText(error); }); reportError(error); } finally { submit.disabled = false; }
    });
    current.body.appendChild(form); current.body.appendChild(button('返回支付','sp-link',function () { purchaseView(current); })); input.focus();
  }
  async function redeem(code, opts) {
    await init();
    if (!opts || !/^[a-z0-9_-]{1,80}$/.test(opts.testId || '')) throw new Error('请提供测试 ID');
    var result = await api('/redeem',{code:code,deviceId:getDevice(),testId:opts.testId});
    saveTokens(result); await refreshLocks(); return true;
  }
  function waitBridge() {
    if (window.WeixinJSBridge) return Promise.resolve(window.WeixinJSBridge);
    return new Promise(function (resolve,reject) {
      var timer = setTimeout(function () { document.removeEventListener('WeixinJSBridgeReady',ready); reject(new Error('微信支付组件尚未就绪，请重新打开页面')); },10000);
      function ready() { clearTimeout(timer); document.removeEventListener('WeixinJSBridgeReady',ready); resolve(window.WeixinJSBridge); }
      document.addEventListener('WeixinJSBridgeReady',ready);
    });
  }
  async function createOrder(current,channel,popup) {
    var opts = current.context.opts;
    var openid = read('soulpay_openid:'+settings.api,'');
    if (channel === 'wechat_jsapi' && config.mode !== 'mock' && !openid) {
      write('soulpay_oauth:'+settings.api,{testId:opts.testId,resultId:opts.resultId,sku:opts.sku,at:Date.now()});
      location.assign(settings.api+'/wechat/oauth?redirect='+encodeURIComponent(location.href)); return;
    }
    status(current,'正在创建订单…');
    var result;
    try { result = await api('/orders',{testId:opts.testId,resultId:opts.resultId,lang:settings.lang,sku:opts.sku,answers:opts.answers,deviceId:getDevice(),channel:channel,currency:config.currency,openid:openid || undefined,returnUrl:location.href}); }
    catch (error) {
      if (error.orderId) { write(pendingKey(),{id:error.orderId,testId:opts.testId,resultId:opts.resultId,sku:opts.sku,at:Date.now()}); startPolling(error.orderId); }
      throw error;
    }
    var pending = {id:result.orderId,testId:opts.testId,resultId:opts.resultId,sku:opts.sku,pay:result.pay,amount:result.amount,currency:result.currency,at:Date.now()};
    write(pendingKey(),pending); emit('order',result); waitingView(modal || current,pending); startPolling(result.orderId);
    if (!modal) { if (popup && !popup.closed) popup.close(); return; }
    var pay = result.pay;
    if (pay.type === 'jsapi') {
      var bridge = await waitBridge();
      bridge.invoke('getBrandWCPayRequest',{appId:pay.appId,timeStamp:pay.timeStamp,nonceStr:pay.nonceStr,package:pay.package,signType:pay.signType,paySign:pay.paySign},function () { pollNow(); });
    } else if (pay.type === 'redirect') {
      if (pay.newWindow) { if (popup && !popup.closed) popup.location.replace(pay.redirectUrl); }
      else location.assign(pay.redirectUrl);
    }
  }
  function normalizedPay(pay) {
    // 兼容第二轮遗留在 localStorage 的未付订单。
    if (!pay) return pay;
    if (pay.type === 'wechat_jsapi') return Object.assign({},pay,{type:'jsapi'});
    if (pay.type === 'wechat_native') return {type:'qrcode',codeUrl:pay.code_url};
    if (['wechat_h5','alipay_wap','alipay_page'].includes(pay.type)) return {type:'redirect',redirectUrl:pay.url || pay.h5_url,newWindow:pay.type === 'alipay_page'};
    return pay;
  }
  function waitingView(current,pending) {
    if (modal !== current) return;
    // 凭证按测试/单人与双人类型计；不能让旧订单的语言 ID 覆盖 relock 的新结果。
    if (pending.testId && pending.resultId && (current.context.opts.testId !== pending.testId || current.context.opts.resultId.includes('+') !== pending.resultId.includes('+'))) {
      current.context = Array.from(locks.values()).find(function (context) { return context.opts.testId === pending.testId && context.opts.resultId.includes('+') === pending.resultId.includes('+'); }) || {el:null,opts:options({testId:pending.testId,resultId:pending.resultId,sku:pending.sku},false)};
    }
    status(current,'等待支付，完成后报告会自动解锁。');
    current.view = 'waiting'; current.pendingId = pending.id;
    current.dialog.querySelector('.sp-title').spText = current.context.opts.title;
    current.body.appendChild(element('p','sp-receipt',function () { return localized('订单')+' '+pending.id; }));
    if (pending.amount !== undefined) current.body.appendChild(element('p','sp-price',money(pending.amount,pending.currency || 'CNY')));
    var pay = normalizedPay(pending.pay);
    if (pay && pay.type === 'mock') {
      current.body.appendChild(button('模拟支付成功','sp-main',async function (event) {
        var btn = event.currentTarget; btn.disabled = true;
        try { await api('/mock/pay/'+pending.id,{deviceId:getDevice()}); await pollNow(); } catch (error) { paymentFailure(current,error); reportError(error); } finally { btn.disabled = false; }
      }));
    } else if (pay && pay.type === 'qrcode') {
      var qr = element('div','sp-qr'); qr.innerHTML = qrSVG(pay.codeUrl); current.body.appendChild(qr);
      current.body.appendChild(element('p','sp-muted','使用微信扫一扫完成支付'));
    } else if (pay && pay.type === 'jsapi') {
      current.body.appendChild(button('再次打开微信支付','sp-main',function () {
        waitBridge().then(function (bridge) { bridge.invoke('getBrandWCPayRequest',{appId:pay.appId,timeStamp:pay.timeStamp,nonceStr:pay.nonceStr,package:pay.package,signType:pay.signType,paySign:pay.paySign},function () { pollNow(); }); }).catch(function (error) { paymentFailure(current,error); reportError(error); });
      }));
    } else if (pay && pay.type === 'redirect') {
      var link = element('a','sp-main','打开收银台'); link.href = pay.redirectUrl;
      if (pay.newWindow) { link.target = '_blank'; link.rel = 'noopener noreferrer'; } current.body.appendChild(link);
    }
    current.body.appendChild(button('我已支付，查询订单','sp-link',function () { startPolling(pending.id); }));
    refreshText();
  }
  async function paidView(current,title) {
    if (modal !== current) return;
    status(current,title || '支付成功');
    current.body.prepend(element('div','sp-success'));
    var failures = await refreshLocks();
    var available = Boolean(current.context.el && current.context.unlocked);
    // open() 可独立使用，结果通过 render 或 unlock 事件交给调用者。
    if (!current.context.el) {
      try {
        var content = await contentFor(current.context.opts);
        available = Boolean(content);
        if (content) {
          if (current.context.opts.render) await current.context.opts.render(content,null);
          emit('unlock',{testId:current.context.opts.testId,resultId:current.context.opts.resultId,content:content,lang:content.lang || settings.lang});
        }
      } catch (error) { failures.push(error); reportError(error); }
    }
    if (modal !== current) return;
    if (failures.length) {
      current.body.appendChild(element('p','sp-error','购买凭证已保存，报告暂时未能加载。请重试加载，无需再次付款。'));
      current.body.appendChild(button('重新加载报告','sp-main',function () { paidView(current,title).catch(reportError); }));
    } else if (!available) {
      current.body.appendChild(element('p','sp-muted','凭证已保存，但这笔订单或兑换码不包含当前报告，请打开对应测试查看。'));
      current.body.appendChild(button('返回测试','sp-main',close));
    } else current.body.appendChild(button('查看完整报告','sp-main',close));
  }
  function startPolling(id) {
    if (!/^SP\d{20}$/.test(id)) return;
    var pending = read(pendingKey(),null);
    if (!pending || pending.id !== id) write(pendingKey(),{id:id,at:Date.now()});
    if (polling && polling.id === id) { polling.deadline = Date.now()+300000; pollNow(); return; }
    if (polling) clearTimeout(polling.timer);
    polling = {id:id,deadline:Date.now()+300000,busy:false,timer:null}; pollNow();
  }
  async function pollNow() {
    var state = polling;
    if (!state || state.busy) return;
    clearTimeout(state.timer);
    if (Date.now() >= state.deadline) {
      if (modal) {
        status(modal,'等待已超过 5 分钟。订单已保留，可继续查询支付结果。');
        modal.body.appendChild(button('继续查询','sp-main',function () { startPolling(state.id); }));
      }
      return;
    }
    state.busy = true;
    try {
      var result = await api('/orders/'+state.id+'?deviceId='+encodeURIComponent(getDevice()));
      if (polling !== state) return;
      var saved = read(pendingKey(),null) || {};
      var pending = Object.assign({},saved,{id:result.orderId,testId:result.testId,resultId:result.resultId,sku:result.sku,amount:result.amount,currency:result.currency,pay:result.pay || saved.pay});
      if (result.status === 'paid') {
        saveTokens(result); write(pendingKey(),null); polling = null; resumeOrder = null;
        emit('paid',result);
        if (modal && modal.view === 'waiting') waitingView(modal,pending);
        if (modal) await paidView(modal); else await refreshLocks();
        return;
      }
      write(pendingKey(),pending);
      if (modal && modal.view === 'waiting' && (!saved.testId || !saved.pay && pending.pay)) waitingView(modal,pending);
    } catch (error) {
      if (polling !== state) return;
      reportError(error);
      if (error.status === 403 || error.status === 404) { polling = null; write(pendingKey(),null); if (modal) paymentFailure(modal,error); return; }
    } finally {
      state.busy = false;
      if (polling === state) state.timer = setTimeout(pollNow,2000);
    }
  }
  async function openContext(context,code) {
    await init();
    var current = buildModal(context);
    if (creatingOrder) { status(current,'正在创建订单，请稍候…'); return; }
    if (code) { redeemView(current); return; }
    var pending = read(pendingKey(),null);
    if (pending && pending.id) { waitingView(current,pending); startPolling(pending.id); return; }
    if (candidates(context.opts.testId,context.opts.resultId).length) {
      status(current,'正在核验购买凭证…');
      try { if (await contentFor(context.opts)) { await paidView(current,'此报告已解锁'); return; } }
      catch (error) {
        if (error.code === 'CONTENT_NOT_FOUND') { await paidView(current,'此报告已购买'); return; }
        status(current,function () { return errorText(error); },true);
        if (modal === current) current.body.appendChild(button('重新核验购买凭证','sp-main',function () { openContext(context).catch(reportError); }));
        reportError(error); return;
      }
    }
    purchaseView(current);
  }
  document.addEventListener('visibilitychange',function () { if (!document.hidden) pollNow(); });
  window.SoulPay = {
    init:init, setLang:setLang, lock:lock, relock:lock,
    open:async function (raw) { var context = {el:null,opts:options(raw,false)}; return openContext(context); },
    redeem:redeem,
    isUnlocked:async function (testId,resultId) { await init(); var opts = options({testId:testId,resultId:resultId,sku:typeof resultId === 'string' && resultId.includes('+') ? 'couple' : 'single'},false); return Boolean(await contentFor(opts)); },
    on:function (name,fn) { if (!['open','close','order','paid','unlock','error','currency','lang'].includes(name) || typeof fn !== 'function') throw new Error(localized('事件名称或回调错误')); if (!events.has(name)) events.set(name,[]); events.get(name).push(fn); return function () { events.set(name,events.get(name).filter(function (item) { return item !== fn; })); }; }
  };
  // 即使宿主尚未重新计算结果，也先保存从收银台回跳的已付凭证。
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',function () { init().catch(reportError); },{once:true});
  else Promise.resolve().then(function () { return init(); }).catch(reportError);
})();
