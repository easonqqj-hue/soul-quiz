/*! SoulQuiz Engine v1 — 纯前端趣味测试引擎（零依赖）
 * 每个测试目录提供：data.js（window.QUIZ） + theme.js（window.THEME，可选钩子） + theme.css
 * 本文件不应被单个测试修改；需要差异化请在 theme.js / theme.css 里做。 */
(function(){
'use strict';
var LANG=window.SQ_LANG||'zh';
/* 英文模式：使用独立的英文内容包 data.en.js（window.QUIZ_EN，完整独立的题目/结果/维度）和 theme.en.js（window.THEME_EN，覆盖/扩展 THEME） */
var Q=(LANG==='en'&&window.QUIZ_EN)?window.QUIZ_EN:window.QUIZ;if(LANG==='en'&&!window.QUIZ_EN)LANG='zh';
var T=Object.assign({},window.THEME||{},LANG==='en'?(window.THEME_EN||{}):{});
if(!Q){document.body.innerHTML='<p style="padding:40px">data.js missing</p>';return;}
var DIMS=Q.dims,ND=DIMS.length,QS=Q.questions,RS=Q.results,N=QS.length;
var DEF={zh:{"start": "开始测试", "resume": "继续上次的进度", "last": "查看上次的结果", "meta": "", "tip": "凭第一感觉选择，没有对错之分", "back": "上一题", "resultKicker": "你的测试结果是", "pct": "契合度", "share": "生成我的专属分享图", "retry": "重新测试", "hub": "全部测试", "sDesc": "性格解析", "sReason": "为什么是你", "sDims": "维度图谱", "sHidden": "隐藏优势", "sEgg": "趣味彩蛋", "sRel": "关系图鉴", "match": "最佳搭子", "rival": "相爱相杀", "runner": "你的第二契合结果是", "gallery": "全部结果图鉴", "more": "再测一个", "loading": ["正在整理你的答案…", "比对所有结果…", "生成你的专属报告…"], "shareHint": "长按图片保存，或发送给朋友", "disclaimer": "本测试为趣味娱乐内容，结果基于你的答题偏好生成，不构成任何心理诊断或科学结论。", "pwItemsCouple": ["双人适配度", "关系类型解读", "双人维度对照", "同频与互补", "相处锦囊", "各自的恋爱人格", "高清分享图"], "pwItemsSingle": ["你的专属结果", "性格解析", "维度图谱", "匹配理由", "隐藏优势", "趣味彩蛋", "关系图鉴", "高清分享图"], "gateTitleCouple": "你们的双人报告已生成", "gateTitleSingle": "你的结果已生成", "metaFmt": "{n} 题 · 约 {m} 分钟 · 趣味测试，非心理诊断", "me": "我", "ta": "TA", "whoAnswering": " 作答中", "whoDone": " 已完成", "tUnanswered": "还有题目没作答哦", "dynFmt": "在 {n} 个维度里，你最突出的是「{a}」和「{b}」（{ad}；{bd}），相对最弱的是「{c}」。", "syncFmt": "你们最同频的是「{a}」，最互补的是「{b}」。", "tCopied": "已复制，去粘贴给 TA 吧", "tCopyFail": "复制失败，请手动复制", "cardDisc": "趣味测试 · 仅供娱乐", "saveImg": "保存图片", "close": "关闭", "cancel": "取消", "ok": "确定", "tBadCode": "邀请码不正确，请检查", "langLabel": "EN", "langAria": "Switch to English", "contextTitle": "", "nickPh": "你的昵称（选填）", "haveCode": "我有 TA 的邀请码", "partnerReady": "已收到邀请", "partnerDone": "已经答完了，现在轮到你", "startB": "开始作答，揭晓我们的适配度", "codeTitle": "输入 TA 的邀请码", "codePh": "粘贴邀请码或邀请链接", "gateKicker": "RESULT READY", "gateDesc": "答案已封存，解锁后立即揭晓完整报告。", "gateListTitle": "解锁后你将看到", "pwBtn": "立即解锁完整结果", "pwNote": "支持微信 / 支付宝 · 解锁后本机可随时回看", "pwUnavailable": "支付功能即将开放", "pwAllBtn": "全部 {n} 个测试一次解锁", "pwAllNote": "含双人报告 · 中英文都能看", "upKicker": "已购报告可抵扣", "upBtn": "补差价，解锁全部", "upFreeBtn": "免费领取全部解锁", "upGateNote": "已购报告可抵扣 · {tail}", "waitKicker": "HALF DONE", "waitTitle": "你的答案已封存", "waitDesc": "现在邀请 TA 来答题。两个人都完成后，才能解锁你们的双人报告。", "inviteTitle": "邀请 TA 一起测", "inviteText": "把链接发给 TA，TA 答完就能解锁你们的双人报告。也可以把手机直接递给 TA。", "inviteCopy": "复制邀请链接", "inviteHand": "递给 TA 当场测", "inviteMsg": "我测完了，轮到你，看看我们的适配度：", "nickPhB": "TA 的昵称（选填）", "coupleKicker": "你们的关系类型", "coupleScore": "适配度", "cDesc": "关系解读", "cDims": "双人维度对照", "cSync": "同频与互补", "cHidden": "你们的隐藏优势", "cAdvice": "相处小锦囊", "cTypes": "各自的恋爱人格"},
en:{"start": "Start the quiz", "resume": "Pick up where you left off", "last": "See my last result", "meta": "", "tip": "Go with your gut. No wrong answers.", "back": "Back", "resultKicker": "Your result", "pct": "Match", "share": "Make my share card", "retry": "Retake", "hub": "All quizzes", "sDesc": "The read", "sReason": "Why this is you", "sDims": "Your dimensions", "sHidden": "Hidden strength", "sEgg": "Easter egg", "sRel": "Connections", "match": "Best match", "rival": "Frenemy", "runner": "Your runner-up:", "gallery": "All results", "more": "Try another", "loading": ["Tallying your answers…", "Comparing every result…", "Writing your report…"], "shareHint": "Long-press to save, or send it to a friend", "disclaimer": "Just for fun. Results are based on your answers and are not a psychological assessment or a scientific claim.", "pwItemsCouple": ["Compatibility score", "Your relationship type", "Side-by-side dimensions", "Where you sync & differ", "Tips for the two of you", "Each of your love styles", "HD share card"], "pwItemsSingle": ["Your result", "The full read", "Dimension chart", "Why it fits", "Hidden strength", "Easter egg", "Connections", "HD share card"], "gateTitleCouple": "Your duo report is ready", "gateTitleSingle": "Your result is ready", "metaFmt": "{n} questions · about {m} min · just for fun", "me": "Me", "ta": "them", "whoAnswering": " is answering", "whoDone": " is done", "tUnanswered": "You skipped one. Finish it first.", "dynFmt": "Out of {n} dimensions, your strongest are “{a}” and “{b}” ({ad}; {bd}). Your lowest is “{c}”.", "syncFmt": "You’re most in sync on “{a}” and most different on “{b}”.", "tCopied": "Copied. Go paste it to them.", "tCopyFail": "Couldn’t copy. Please copy it manually.", "cardDisc": "Just for fun", "saveImg": "Save image", "close": "Close", "cancel": "Cancel", "ok": "OK", "tBadCode": "That code doesn’t look right.", "langLabel": "中文", "langAria": "切换到中文", "contextTitle": "A little context", "nickPh": "Your name (optional)", "haveCode": "I have their invite code", "partnerReady": "Invite received", "partnerDone": " already finished. Your turn.", "startB": "Start and reveal our match", "codeTitle": "Enter their invite code", "codePh": "Paste the code or link", "gateKicker": "RESULT READY", "gateDesc": "Your answers are sealed. Unlock to reveal the full report.", "gateListTitle": "Unlocking gets you", "pwBtn": "Unlock full result", "pwNote": "Secure checkout · Unlocked results stay on this device", "pwUnavailable": "Checkout is coming soon", "pwAllBtn": "All-Access: unlock all {n} quizzes", "pwAllNote": "Includes the couples report · both languages", "upKicker": "Your purchase counts toward it", "upBtn": "Upgrade to All-Access", "upFreeBtn": "Claim All-Access free", "upGateNote": "Your earlier purchase counts · {tail}", "waitKicker": "HALF DONE", "waitTitle": "Your answers are sealed", "waitDesc": "Now invite them to take it. Once you’ve both finished, you can unlock your duo report.", "inviteTitle": "Invite them", "inviteText": "Send them the link. When they finish, your duo report unlocks. Or just hand them your phone.", "inviteCopy": "Copy invite link", "inviteHand": "Hand them my phone", "inviteMsg": "I finished, your turn. Let’s see how compatible we are: ", "nickPhB": "Their name (optional)", "coupleKicker": "Your relationship type", "coupleScore": "Compatibility", "cDesc": "The read on you two", "cDims": "Side by side", "cSync": "In sync & complementary", "cHidden": "Your hidden strength as a pair", "cAdvice": "Tips for you two", "cTypes": "Your individual love styles"}};
var L=Object.assign({},DEF[LANG],{cardFooter:Q.title},Q.labels||{});
/* 收款页/商品名统一用中性表述（支付审核要求），不允许单个测试覆盖 */
L.payTitle=LANG==='en'?'Personality Quiz Full Report':'趣味性格测评完整报告';L.payAllTitle=LANG==='en'?'Personality Quiz All-Access':'趣味性格测评·全部解锁';
var KEY='sq_'+Q.id,HUB=Q.hubHref||'../index.html',TESTID=Q.id;
/* 公开版数据（data.public.js）：结果只有不透明 id + 计分向量；完整内容付费后由后台 /api/unlock 返回 */
var PUB=!!Q.public,PAYID=Q.payId||String(Q.id).replace(/-en$/,''),PAY_API=window.SQ_PAY_API||'';
var CAT=(function(){var C=window.SQ_CATALOG||[];for(var i=0;i<C.length;i++)if(C[i].id===Q.id||C[i].idEn===Q.id)return C[i];return null;})();
var CUR_SYM=LANG==='en'?'$':'¥';var PRICE=(CAT&&(LANG==='en'?CAT.priceEn:CAT.price))||Q.price||(LANG==='en'?'2.99':'1.99');
var ALL_PRICE=LANG==='en'?'9.99':'9.9',ALL_COUNT=(window.SQ_CATALOG||[]).length||33;
var $=function(id){return document.getElementById(id);};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function byId(id){for(var i=0;i<RS.length;i++)if(RS[i].id===id)return RS[i];return null;}
function hook(name){return typeof T[name]==='function'?T[name]:null;}
var ISWX=/MicroMessenger/i.test(navigator.userAgent);

/* ---------------- scoring ---------------- */
var STATS=(function(){var mu=[],sd=[];for(var d=0;d<ND;d++){mu[d]=0;sd[d]=0;}
  QS.forEach(function(q){for(var d=0;d<ND;d++){var k=DIMS[d].k;var vals=q.o.map(function(o){return o[1][k]||0;});
    var m=vals.reduce(function(a,b){return a+b;},0)/vals.length;mu[d]+=m;sd[d]+=vals.reduce(function(a,b){return a+(b-m)*(b-m);},0)/vals.length;}});
  for(var d2=0;d2<ND;d2++)sd[d2]=Math.sqrt(sd[d2])||1;return {mu:mu,sd:sd};})();
var PROTO=RS.map(function(r){var m=r.v.reduce(function(a,b){return a+b;},0)/ND;var c=r.v.map(function(x){return x-m;});
  var n=Math.sqrt(c.reduce(function(a,b){return a+b*b;},0))||1;return c.map(function(x){return x/n;});});
function zOf(ans){var raw=[];for(var d=0;d<ND;d++)raw[d]=0;
  ans.forEach(function(a,i){if(a==null||!QS[i])return;var w=QS[i].o[a][1];for(var d=0;d<ND;d++)raw[d]+=w[DIMS[d].k]||0;});
  return raw.map(function(x,d){return (x-STATS.mu[d])/STATS.sd[d];});}
function cos(a,b){var s=0,na=0,nb=0;for(var i=0;i<a.length;i++){s+=a[i]*b[i];na+=a[i]*a[i];nb+=b[i]*b[i];}return s/((Math.sqrt(na)*Math.sqrt(nb))||1);}
function rankZ(z,list,proto,bias){var zc=z.slice(),m=zc.reduce(function(a,b){return a+b;},0)/ND;zc=zc.map(function(x){return x-m;});
  return list.map(function(r,i){var c=cos(zc,proto[i]);return {r:r,cos:c,s:c+((bias||{})[r.id]||0)};}).sort(function(a,b){return b.s-a.s;});}
function compute(ans){var z=zOf(ans);return {z:z,ranked:rankZ(z,RS,PROTO,Q.bias)};}
function pctOf(c){return Math.max(72,Math.min(99,Math.round(74+26*Math.max(0,c))));}
function dimVal(z){return Math.round(100/(1+Math.exp(-z*0.9)));}   // 0-100

/* ---------------- couple (双人) ---------------- */
var CP=Q.couple||null,PPROTO=null;
if(CP){PPROTO=CP.pairs.map(function(p){var m=p.v.reduce(function(a,b){return a+b;},0)/ND;var c=p.v.map(function(x){return x-m;});var n=Math.sqrt(c.reduce(function(a,b){return a+b*b;},0))||1;return c.map(function(x){return x/n;});});}
function encodeAns(a){var s='';for(var i=0;i<N;i+=2){s+=((a[i]||0)*4+(a[i+1]||0)).toString(16);}var sum=0;a.forEach(function(x,i){sum+=(x+1)*(i+3);});return s+(sum%36).toString(36);}
function decodeAns(s){if(!s||s.length!==Math.ceil(N/2)+1)return null;var a=[];for(var i=0;i<Math.ceil(N/2);i++){var v=parseInt(s[i],16);if(isNaN(v))return null;a.push(v>>2);if(a.length<N)a.push(v&3);}
  for(var j=0;j<N;j++)if(a[j]>=QS[j].o.length)return null;var sum=0;a.forEach(function(x,i){sum+=(x+1)*(i+3);});return (sum%36).toString(36)===s[s.length-1]?a:null;}
function coupleCompute(aA,aB){var zA=zOf(aA),zB=zOf(aB),sum=zA.map(function(x,i){return x+zB[i];});
  var ranked=rankZ(sum,CP.pairs,PPROTO,CP.bias);var sim=cos(zA,zB);
  var gap=zA.map(function(x,i){return Math.abs(x-zB[i]);});
  var score=Math.round(78+12*sim+(ranked[0].cos*6));score=Math.max(66,Math.min(99,score));
  return {zA:zA,zB:zB,pair:ranked[0].r,score:score,sim:sim,gap:gap,a:rankZ(zA,RS,PROTO,Q.bias)[0].r,b:rankZ(zB,RS,PROTO,Q.bias)[0].r};}

/* ---------------- state ---------------- */
var S={i:0,answers:[],lock:false,partner:null,partnerName:'',nick:''};
function blank(){var a=[];for(var i=0;i<N;i++)a.push(null);return a;}
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'null');}catch(e){return null;}}
function save(extra){try{var o=load()||{};o.answers=S.answers;o.i=S.i;if(extra)Object.assign(o,extra);localStorage.setItem(KEY,JSON.stringify(o));}catch(e){}}
function clearProg(){try{var o=load()||{};delete o.answers;delete o.i;localStorage.setItem(KEY,JSON.stringify(o));}catch(e){}}

/* ---------------- DOM skeleton ---------------- */
function letters(){return T.letters||['A','B','C','D'];}
function build(){
  document.documentElement.setAttribute('data-quiz',Q.id);
  var deco=document.createElement('div');deco.className='bg-decor';deco.setAttribute('aria-hidden','true');deco.innerHTML=T.decor||'';document.body.insertBefore(deco,document.body.firstChild);
  var app=$('app');
  var chips=PUB?'':RS.map(function(r){return '<span>'+esc(r.name)+'</span>';}).join('');
  app.innerHTML=
  '<a class="topnav" id="hubLink" href="'+HUB+'"><span class="tn-arrow">‹</span><span>'+esc(L.hub)+'</span></a>'+
  '<button class="lang-switch" id="langBtn" aria-label="'+esc(L.langAria)+'"><span class="ls-cur">'+(LANG==='en'?'EN':'中')+'</span><span class="ls-sep">/</span><span class="ls-alt">'+(LANG==='en'?'中':'EN')+'</span></button>'+
  '<section class="screen home on" id="home"><div class="home-inner">'+
   (T.homeTop||'')+
   '<div class="h-kicker">'+(Q.kicker||'')+'</div>'+
   '<h1 class="h-title">'+(Q.titleHTML||esc(Q.title))+'</h1>'+
   '<div class="h-sub">'+(Q.subtitle||'')+'</div>'+
   '<div class="h-orn">'+(T.ornament||'')+'</div>'+
   (Q.intro?'<p class="h-intro">'+Q.intro+'</p>':'')+
   '<div class="h-chips" id="chips">'+chips+'</div>'+
   '<div class="h-partner" id="partnerBox" style="display:none"></div>'+
   (CP?'<input class="h-nick" id="nick" maxlength="8" placeholder="'+esc(L.nickPh)+'">':'')+
   '<button class="btn btn-primary" id="startBtn">'+esc(L.start)+'</button>'+
   '<button class="link" id="resumeBtn" style="display:none"></button>'+
   '<button class="link" id="lastBtn" style="display:none">'+esc(L.last)+'</button>'+
   (CP?'<button class="link" id="codeBtn">'+esc(L.haveCode)+'</button>':'')+
   '<div class="h-meta">'+esc(L.meta||L.metaFmt.replace('{n}',N).replace('{m}',Math.max(2,Math.round(N/8))))+'</div>'+
   (T.homeBottom||'')+
  '</div></section>'+
  '<section class="screen quiz" id="quiz"><div class="quiz-inner">'+
   '<div class="q-top"><button class="back" id="backBtn"><span>‹</span> '+esc(L.back)+'</button><span class="q-count"><b id="qIdx">1</b><i>/</i><span id="qTotal">'+N+'</span></span></div>'+
   '<div class="q-bar"><i id="barFill" style="width:0"></i></div>'+
   '<div class="q-who" id="qWho" style="display:none"></div>'+
   '<div class="q-stage" id="stage"></div>'+
   '<div class="q-tip">'+esc(L.tip)+'</div>'+
  '</div></section>'+
  '<section class="screen loading" id="loading"><div class="ld-anim">'+(T.loader||'<div class="ld-dot"></div>')+'</div><p id="loadText"></p></section>'+
  '<section class="screen result" id="result"></section>';
  var mask=document.createElement('div');mask.className='mask';mask.id='mask';mask.innerHTML='<div class="sheet" id="sheet"></div>';document.body.appendChild(mask);
  var toastEl=document.createElement('div');toastEl.className='toast';toastEl.id='toast';document.body.appendChild(toastEl);
  mask.addEventListener('click',function(e){if(e.target===mask)closeMask();});
  $('startBtn').onclick=function(){begin(true);};
  $('backBtn').onclick=back;
  $('langBtn').onclick=function(){var nl=LANG==='en'?'zh':'en';if(window.SQI)SQI.set(nl);else{try{localStorage.setItem('sq_lang',nl);}catch(e){}location.reload();}};
  var h=hook('onBuild');if(h)h({Q:Q,L:L});
}
function show(id){['home','quiz','loading','result'].forEach(function(s){$(s).classList.toggle('on',s===id);});
  document.body.setAttribute('data-screen',id);$('hubLink').style.display=(id==='quiz'||id==='loading')?'none':'';$('langBtn').style.display=(id==='quiz'||id==='loading')?'none':'';window.scrollTo(0,0);
  var h=hook('onScreen');if(h)h(id);}
var tt;function toast(t){var e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){e.classList.remove('on');},2200);}
function closeMask(){$('mask').classList.remove('on');}

/* ---------------- home ---------------- */
function initHome(){
  var st=load();
  if(st&&st.answers&&st.answers.length===N&&st.answers.some(function(x){return x!=null;})&&st.answers.indexOf(null)>=0){
    var done=st.answers.filter(function(x){return x!=null;}).length;var b=$('resumeBtn');b.style.display='';b.textContent=L.resume+'（'+done+'/'+N+'）';
    b.onclick=function(){S.answers=st.answers;S.i=Math.min(st.i||0,N-1);if(st.partner){S.partner=st.partner;S.partnerName=st.partnerName||'';}S.nick=st.nick||'';show('quiz');renderQ(0);};}
  if(st&&st.last){var lb=$('lastBtn');lb.style.display='';lb.onclick=function(){
    if(st.last.couple&&CP){var a=decodeAns(st.last.couple.a),bb=decodeAns(st.last.couple.b);if(a&&bb){gate('couple',a,bb,st.last.couple.na,st.last.couple.nb);return;}}
    var a2=decodeAns(st.last.code);if(a2&&!CP){S.answers=a2;gate('single',a2);}};}
  if(CP){
    var m=location.hash.match(/p=([0-9a-z]+)/i),nm=location.hash.match(/n=([^&]*)/);
    if(m){var pa=decodeAns(m[1]);if(pa){S.partner=pa;S.partnerName=nm?decodeURIComponent(nm[1]).slice(0,8):'';showPartnerBox();}}
    $('codeBtn').onclick=askCode;
  }
}
function showPartnerBox(){var who=S.partnerName||L.ta;var b=$('partnerBox');b.style.display='';
  b.innerHTML='<div class="pb-t">'+esc(L.partnerReady)+'</div><div class="pb-n">'+esc(who)+' '+esc(L.partnerDone)+'</div>';
  $('startBtn').textContent=L.startB;var cb=$('codeBtn');if(cb)cb.style.display='none';}
function askCode(){
  $('sheet').innerHTML='<div class="pop"><h4>'+esc(L.codeTitle)+'</h4><input class="code-in" id="codeIn" placeholder="'+esc(L.codePh)+'"><div class="pop-row"><button class="btn btn-ghost" id="codeCancel">'+esc(L.cancel)+'</button><button class="btn btn-primary" id="codeOk">'+esc(L.ok)+'</button></div></div>';
  $('mask').classList.add('on');$('codeCancel').onclick=closeMask;
  $('codeOk').onclick=function(){var v=$('codeIn').value.trim();var m=v.match(/p=([0-9a-z]+)/i);var code=m?m[1]:v.split('-')[0];var nm=v.match(/n=([^&\s]*)/);var name=nm?decodeURIComponent(nm[1]):(v.split('-')[1]||'');
    var a=decodeAns(code.toLowerCase());if(!a){toast(L.tBadCode);return;}S.partner=a;S.partnerName=name.slice(0,8);closeMask();showPartnerBox();};
}

/* ---------------- quiz ---------------- */
function begin(fresh){
  if(fresh){S.answers=blank();S.i=0;}
  if(CP&&$('nick'))S.nick=$('nick').value.trim().slice(0,8);
  save({partner:S.partner,partnerName:S.partnerName,nick:S.nick});show('quiz');renderQ(0);
}
function renderQ(dir){
  var q=QS[S.i],stage=$('stage'),cards=stage.querySelectorAll('.qcard'),old=cards.length?cards[cards.length-1]:null;
  for(var ci=0;ci<cards.length-1;ci++)cards[ci].remove();
  $('qIdx').textContent=S.i+1;$('barFill').style.width=(S.answers.filter(function(x){return x!=null;}).length/N*100)+'%';
  $('backBtn').disabled=S.i===0;
  var who=$('qWho');if(CP){who.style.display='';who.textContent=S.partner?((S.nick||L.me)+L.whoAnswering+' · '+(S.partnerName||L.ta)+L.whoDone):((S.nick||L.me)+L.whoAnswering);}
  var card=document.createElement('div');card.setAttribute('data-i',S.i);card.className='qcard'+(dir?' enter'+(dir<0?' rev':''):'');
  var lt=letters();
  var qh=hook('questionHTML');
  card.innerHTML=qh?qh(q,S.i,N):('<div class="q-no">'+(T.qNo?T.qNo(S.i,N):('Q'+(S.i+1<10?'0':'')+(S.i+1)))+'</div><div class="q-text">'+esc(q.q)+'</div>'+
    '<div class="q-opts">'+q.o.map(function(o,k){return '<button class="opt'+(S.answers[S.i]===k?' sel':'')+'" data-k="'+k+'"><span class="k">'+lt[k]+'</span><span class="t">'+esc(o[0])+'</span></button>';}).join('')+'</div>');
  if(old){old.classList.add('leave');if(dir<0)old.classList.add('rev');setTimeout(function(){if(old.parentNode)old.remove();},Math.max(420,T.leaveMs||0));}
  stage.appendChild(card);
  requestAnimationFrame(function(){requestAnimationFrame(function(){card.classList.remove('enter');card.classList.remove('rev');});});
  var myI=S.i;card.querySelectorAll('.opt').forEach(function(b){b.addEventListener('click',function(){if(myI!==S.i||card.classList.contains('leave'))return;pick(+b.getAttribute('data-k'),b);});});
}
function pick(k,btn){
  if(S.lock)return;S.lock=true;S.answers[S.i]=k;
  btn.parentNode.querySelectorAll('.opt').forEach(function(x){x.classList.toggle('sel',x===btn);});
  $('barFill').style.width=(S.answers.filter(function(x){return x!=null;}).length/N*100)+'%';
  setTimeout(function(){S.lock=false;if(S.i<N-1){S.i++;save();renderQ(1);}else{save();finish();}},T.pickDelay||280);
}
function back(){if(S.i>0&&!S.lock){S.i--;save();renderQ(-1);}}
function finish(){
  var first=S.answers.indexOf(null);if(first>=0){S.i=first;renderQ(1);toast(L.tUnanswered);return;}
  show('loading');var texts=L.loading,t=0;$('loadText').textContent=texts[0];
  var iv=setInterval(function(){t++;if(t<texts.length)$('loadText').textContent=texts[t];},650);
  setTimeout(function(){clearInterval(iv);
    var code=encodeAns(S.answers);
    if(CP&&S.partner){var pc=encodeAns(S.partner);save({last:{code:code,couple:{a:pc,b:code,na:S.partnerName,nb:S.nick}}});clearProg();gate('couple',S.partner.slice(),S.answers.slice(),S.partnerName,S.nick);}
    else if(CP){clearProg();waitPartner();}
    else{save({last:{code:code}});clearProg();gate('single',S.answers.slice());}
  },T.loadingMs||1900);
}

/* ---------------- result ---------------- */
var CUR=null;
function sec(title,body,cls){return '<section class="r-sec'+(cls?' '+cls:'')+'"><h2>'+esc(title)+'</h2>'+body+'</section>';}
function dimsHTML(z){var td=z.map(function(v,i){return {i:i,v:v};}).sort(function(a,b){return b.v-a.v;});var top2=[td[0].i,td[1].i];
  return '<div class="dims">'+DIMS.map(function(d,i){var v=dimVal(z[i]);return '<div class="dim'+(top2.indexOf(i)>=0?' top':'')+'"><span class="dn">'+esc(d.name)+'</span><span class="dt"><i style="width:'+v+'%"></i></span><span class="dv">'+v+'</span></div>';}).join('')+'</div>';}
function dynReason(z){var td=z.map(function(v,i){return {i:i,v:v};}).sort(function(a,b){return b.v-a.v;});var a=DIMS[td[0].i],b=DIMS[td[1].i],c=DIMS[td[ND-1].i];
  return L.dynFmt.replace('{n}',ND).replace('{a}',a.name).replace('{b}',b.name).replace('{ad}',a.desc).replace('{bd}',b.desc).replace('{c}',c.name);}
function heroHTML(r,pct){var hh=hook('heroHTML');if(hh)return hh(r,pct,L);
  return '<div class="r-hero">'+(r.seal?'<div class="r-seal">'+esc(r.seal)+'</div>':'')+'<div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1>'+(r.sub?'<div class="r-sub">'+esc(r.sub)+'</div>':'')+
  '<div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div>'+
  '<div class="r-pct"><span>'+esc(L.pct)+'</span><b>'+pct+'%</b></div></div>';}
function relHTML(r,second){var m=byId(r.match),v=byId(r.rival);
  return '<div class="rel">'+(m?'<button class="rel-card" data-r="'+m.id+'"><small>'+esc(L.match)+'</small><b>'+esc(m.name)+'</b><i>'+esc(m.tag)+'</i></button>':'')+(v?'<button class="rel-card" data-r="'+v.id+'"><small>'+esc(L.rival)+'</small><b>'+esc(v.name)+'</b><i>'+esc(v.tag)+'</i></button>':'')+'</div>'+
   (second?'<p class="runner">'+esc(L.runner)+' <b>'+esc(second.r.name)+'</b>（'+pctOf(second.cos)+'%）</p>':'');}
function galleryHTML(r){return '<div class="gallery">'+RS.map(function(x){return '<button class="g-item'+(x.id===r.id?' me':'')+'" data-r="'+x.id+'"><b>'+esc(x.name)+'</b><i>'+esc(x.tag)+'</i></button>';}).join('')+'</div>';}
function moreHTML(){var C=window.SQ_CATALOG;if(!C)return '';var pool=C.filter(function(c){return c.id!==Q.id&&c.idEn!==Q.id;});
  for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t;}
  return sec(L.more,'<div class="more">'+pool.slice(0,3).map(function(c){return '<a class="more-item" href="../'+c.dir+'/index.html"><b>'+esc(LANG==='en'?c.titleEn:c.title)+'</b><i>'+esc(LANG==='en'?c.catEn:c.cat)+'</i></a>';}).join('')+'</div>','r-more');}
function footHTML(){return '<div class="r-foot"><div class="r-row"><button class="btn btn-ghost" id="retryBtn">'+esc(L.retry)+'</button><a class="btn btn-ghost" href="'+HUB+'">'+esc(L.hub)+'</a></div><p class="r-disc">'+esc(L.disclaimer)+'</p></div>';}
function bindResult(){var el=$('result');
  $('shareBtn').onclick=openShare;$('retryBtn').onclick=retry;
  el.querySelectorAll('[data-r]').forEach(function(b){b.onclick=function(){openR(byId(b.getAttribute('data-r')));};});}
/* ---------------- paywall gate（全付费：解锁前不渲染任何个性化结果） ----------------
 * 答完题 → 只显示主题化的「结果已生成」解锁页 .pw-gate[data-paywall=locked][data-test-id][data-attempt-id]
 * 解锁后才把完整结果渲染进 DOM：.pw-unlocked[data-paywall=unlocked][data-test-id][data-result-id]
 * paywall.js 接口：SQPaywall.isUnlocked(ctx) → bool|Promise ；SQPaywall.requestUnlock(ctx) 成功后调用 ctx.onUnlocked()
 *   ctx = {testId, attemptId, resultId, kind:'single'|'couple', price, title, onUnlocked}
 *   resultId 只在 JS 里传给 paywall（供后台记录/核验），不写进解锁前的 DOM
 * 开发开关：URL ?pw=dev / #pw=dev、localStorage.sq_pw_dev="1"、window.SQ_PAYWALL_DEV=true → 跳过解锁页 */
function devUnlocked(){try{if(/[?&]pw=dev/.test(location.search)||/pw=dev/.test(location.hash))return true;if(localStorage.getItem('sq_pw_dev')==='1')return true;}catch(e){}return !!window.SQ_PAYWALL_DEV;}
var PENDING=null,UNLOCKED=false;
function attemptId(kind,a,b){return TESTID+'.'+(kind==='couple'?encodeAns(a)+'.'+encodeAns(b):encodeAns(a));}
function gateItems(){return L.pwItems||(CP?L.pwItemsCouple:L.pwItemsSingle);}
function gateHTML(kind,att){var gh=hook('gateHTML');
  var inner=gh?gh(kind,L):('<div class="pw-hero">'+(T.gateArt||'<div class="pw-art"></div>')+'<div class="pw-kicker">'+esc(L.gateKicker)+'</div><h1 class="pw-title">'+esc(L.gateTitle||(kind==='couple'?L.gateTitleCouple:L.gateTitleSingle))+'</h1><p class="pw-desc">'+esc(L.gateDesc)+'</p></div>');
  return '<div class="pw-gate" data-paywall="locked" data-test-id="'+esc(TESTID)+'" data-attempt-id="'+esc(att)+'" data-price="'+esc(PRICE)+'">'+inner+
   '<div class="pw-box"><div class="pw-box-t">'+esc(L.gateListTitle)+'</div><ul class="pw-list">'+gateItems().map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul>'+
   '<button class="btn btn-primary pw-unlock-btn" data-paywall-action="unlock"><span>'+esc(L.pwBtn)+'</span><b class="pw-price" data-paywall-price>'+CUR_SYM+esc(PRICE)+'</b></button>'+
   '<button class="btn btn-ghost pw-all-btn" data-paywall-action="unlock-all"><span>'+esc(L.pwAllBtn.replace('{n}',ALL_COUNT))+'</span><b class="pw-price" data-paywall-price-all>'+CUR_SYM+esc(ALL_PRICE)+'</b></button>'+
   '<div class="pw-all-note">'+esc(L.pwAllNote)+'</div>'+
   '<div class="pw-note" data-paywall-slot="note">'+esc(L.pwNote)+'</div><div data-paywall-slot="extra"></div></div>'+
   '<div class="r-foot"><div class="r-row"><button class="btn btn-ghost" id="retryBtn">'+esc(L.retry)+'</button><a class="btn btn-ghost" href="'+HUB+'">'+esc(L.hub)+'</a></div><p class="r-disc">'+esc(L.disclaimer)+'</p></div></div>';}
function gate(kind,a,b,na,nb){UNLOCKED=false;var att=attemptId(kind,a,b);
  var rid=kind==='couple'?('pair:'+coupleCompute(a,b).pair.id):compute(a).ranked[0].r.id;
  PENDING={kind:kind,a:a,b:b,na:na,nb:nb,att:att,rid:rid};
  var ctx={testId:TESTID,attemptId:att,resultId:rid,kind:kind,price:PRICE,currency:LANG==='en'?'USD':'CNY',lang:LANG,title:Q.title,onUnlocked:function(){reveal();}};
  if(devUnlocked()&&!PUB){reveal();return;}
  $('result').innerHTML='<div class="result-inner">'+gateHTML(kind,att)+'</div>';show('result');
  $('retryBtn').onclick=retry;
  try{document.dispatchEvent(new CustomEvent('sq:gate',{detail:{testId:TESTID,attemptId:att,kind:kind,price:PRICE}}));}catch(e){}
  var gk=hook('onGate');if(gk)gk(kind,$('result'));
  if(PUB){spGate(kind,a,b,att);return;}
  $('result').querySelectorAll('[data-paywall-action="unlock"]').forEach(function(btn){btn.onclick=function(){
    if(window.SQPaywall&&typeof SQPaywall.requestUnlock==='function')SQPaywall.requestUnlock(ctx);else toast(L.pwUnavailable);};});
  if(window.SQPaywall&&typeof SQPaywall.isUnlocked==='function'){try{var v=SQPaywall.isUnlocked(ctx);if(v&&typeof v.then==='function')v.then(function(ok){if(ok&&PENDING&&PENDING.att===att)reveal();});else if(v)reveal();}catch(e){console.warn(e);}}
}
/* ---- SoulPay 对接（PAYWALL_INTERFACE.md v1）：testId=PAYID（中英同一个，付一次两种语言都解锁）；
 *  单人 resultId=rNN/eNN，双人 resultId=<rA>+<rB>，sku=couple。解锁卡用本测试自己的主题页，按钮调用 SoulPay.open；
 *  已购设备由隐藏的 SoulPay.lock 自动核验凭证并回调 render。 */
var SP_READY=null,SP_LAST=null;
/* 补差价升级：差价由后端 /api/upgrade 按本设备已付订单计算，前端只展示。 */
function upMoney(c,cur){var t=(cur==='USD'?'$':'¥')+(c/100).toFixed(2);return cur==='USD'?t:t.replace(/\.?0+$/,'');}
function upLines(q){var en=LANG==='en';return {head:en?'Unlock all '+ALL_COUNT+' · '+upMoney(q.price,q.currency):'解锁全部 '+ALL_COUNT+' 个测试 '+upMoney(q.price,q.currency),
  tail:q.free?(en?'Free with what you have paid':'已付满额 · 免费升级'):(en?'only '+upMoney(q.amount,q.currency)+' more':'只需再付 '+upMoney(q.amount,q.currency))};}
function spQuote(){if(!PUB||!window.SoulPay||!PAY_API||!SoulPay.upgradeQuote)return Promise.resolve(null);
  return spInit().then(function(cfg){if(!cfg)return null;return SoulPay.upgradeQuote();}).then(function(q){return q&&q.eligible?q:null;}).catch(function(){return null;});}
function spUpgradeCard(){var root=$('result');if(!root||!SP_LAST)return;var o=Object.assign({},SP_LAST,{sku:'all',title:L.payAllTitle});delete o.render;
  spQuote().then(function(q){if(!q||!UNLOCKED)return;var old=root.querySelector('.pw-upgrade');if(old)old.remove();var ln=upLines(q);
    var card=document.createElement('section');card.className='pw-upgrade';card.setAttribute('data-paywall','upgrade');
    card.innerHTML='<div class="pw-up-kicker">'+esc(L.upKicker)+'</div><div class="pw-up-head">'+esc(ln.head)+'</div><div class="pw-up-tail">'+esc(ln.tail)+'</div>'+
      '<div class="pw-up-note">'+esc(L.pwAllNote)+'</div><button class="btn btn-primary btn-block pw-up-btn" data-paywall-action="upgrade">'+esc(q.free?L.upFreeBtn:L.upBtn)+'</button>';
    var foot=root.querySelector('.r-foot');if(foot)foot.parentNode.insertBefore(card,foot);else (root.querySelector('.result-inner')||root).appendChild(card);
    card.querySelector('.pw-up-btn').onclick=function(){SoulPay.open(o).catch(function(e){console.warn(e);toast(L.pwUnavailable);});};
    if(!spUpgradeCard.bound){spUpgradeCard.bound=true;SoulPay.on('paid',function(){var c=$('result').querySelector('.pw-upgrade');if(c)c.remove();});}
  });}
function spGateQuote(){spQuote().then(function(q){if(!q)return;var ln=upLines(q);$('result').querySelectorAll('.pw-all-note').forEach(function(e){e.textContent=L.upGateNote.replace('{tail}',ln.tail);e.classList.add('is-upgrade');});});}
function spInit(){if(SP_READY)return SP_READY;SP_READY=(window.SoulPay&&PAY_API)?SoulPay.init({api:PAY_API,lang:LANG,region:LANG==='en'?'intl':'cn',brand:LANG==='en'?'Soul Quiz Atelier':'灵魂测试馆'}).catch(function(e){console.warn('SoulPay init',e&&e.message);return null;}):Promise.resolve(null);return SP_READY;}
function unEn(v){if(Array.isArray(v))return v.map(unEn);if(!v||typeof v!=='object')return v;var o={};Object.keys(v).forEach(function(k){o[k==='__en'?'en':k]=unEn(v[k]);});return o;}
function hydrate(c){if(!c)return false;c=unEn(c);var map={};RS.forEach(function(r){map[r.id]=r;});
  (c.gallery||[]).concat(c.result?[c.result]:[]).forEach(function(g){var t=map[g.id];if(!t)return;var keep=t.v;Object.assign(t,g);t.v=keep;if(g.oid){t.id=g.oid;}});
  var cp=c.couple;if(cp&&CP&&cp.reports){var pm={};CP.pairs.forEach(function(p){pm[p.id]=p;});Object.keys(cp.reports).forEach(function(k){var t=pm[k],g=cp.reports[k];if(!t)return;var keep=t.v;Object.assign(t,g);t.v=keep;if(g.oid)t.id=g.oid;});}
  return true;}
function spOpts(kind,a,b){var rid,sku='single';if(kind==='couple'){var cc=coupleCompute(a,b);rid=cc.a.id+'+'+cc.b.id;sku='couple';}else rid=compute(a).ranked[0].r.id;
  return {testId:PAYID,resultId:rid,sku:sku,allCount:ALL_COUNT,title:L.payTitle,teaser:L.payTeaser||'',bullets:gateItems(),answers:kind==='couple'?encodeAns(a)+'.'+encodeAns(b):encodeAns(a)};}
function spGate(kind,a,b,att){
  var o=spOpts(kind,a,b),done=false;SP_LAST=o;o.render=function(c){if(done||!PENDING||PENDING.att!==att)return;if(hydrate(c)){done=true;reveal();}};
  var hid=document.createElement('div');hid.className='sp-hidden-lock';hid.setAttribute('aria-hidden','true');hid.style.display='none';$('result').appendChild(hid);
  spInit().then(function(cfg){if(!cfg||!window.SoulPay)return;
    try{var pr=cfg.skus&&cfg.skus[o.sku]&&cfg.skus[o.sku].price;var cur=cfg.currency||(LANG==='en'?'USD':'CNY');if(pr!=null){var t=(cur==='USD'?'$':'¥')+(pr/100).toFixed(2);$('result').querySelectorAll('[data-paywall-price]').forEach(function(e){e.textContent=t;});}var pa=cfg.skus&&cfg.skus.all&&cfg.skus.all.price;if(pa!=null){var ta=(cur==='USD'?'$':'¥')+(pa/100).toFixed(2);$('result').querySelectorAll('[data-paywall-price-all]').forEach(function(e){e.textContent=ta;});}}catch(e){}
    SoulPay.lock(hid,o).catch(function(e){console.warn('SoulPay lock',e&&e.message);});spGateQuote();});
  $('result').querySelectorAll('[data-paywall-action="unlock-all"]').forEach(function(btn){btn.onclick=function(){
    if(!window.SoulPay||!PAY_API){toast(L.pwUnavailable);return;}
    spInit().then(function(cfg){if(!cfg){toast(L.pwUnavailable);return;}SoulPay.open(Object.assign({},o,{sku:'all',title:L.payAllTitle})).catch(function(e){console.warn(e);toast(L.pwUnavailable);});});};});
  $('result').querySelectorAll('[data-paywall-action="unlock"]').forEach(function(btn){btn.onclick=function(){
    if(!window.SoulPay||!PAY_API){toast(L.pwUnavailable);return;}
    spInit().then(function(cfg){if(!cfg){toast(L.pwUnavailable);return;}SoulPay.open(o).catch(function(e){console.warn(e);toast(L.pwUnavailable);});});};});
}
function reveal(){if(!PENDING)return;if(PUB&&!RS[0].name){console.warn('locked: content not loaded');return;}UNLOCKED=true;var P=PENDING;
  if(P.kind==='couple')showCouple(P.a,P.b,P.na,P.nb);else{S.answers=P.a;showResult(compute(P.a));}
  document.body.classList.add('pw-is-unlocked');if(PUB)spUpgradeCard();var hk=hook('onUnlock');if(hk)hk(CUR);}
function unlockWrap(rid,h){return '<div class="pw-unlocked" data-paywall="unlocked" data-test-id="'+esc(TESTID)+'" data-result-id="'+esc(rid)+'">'+h+'</div>';}
function retry(){S.partner=null;S.partnerName='';PENDING=null;clearProg();if(location.hash)history.replaceState(null,'',location.pathname+location.search);show('home');$('partnerBox').style.display='none';$('startBtn').textContent=L.start;var cb=$('codeBtn');if(cb)cb.style.display='';}
/* 双人测试：A 答完、TA 还没答 → 只显示等待/邀请页（不含任何结果） */
function waitPartner(){var h='<div class="pw-gate pw-wait" data-paywall="waiting" data-test-id="'+esc(TESTID)+'">'+
  '<div class="pw-hero">'+(T.gateArt||'<div class="pw-art"></div>')+'<div class="pw-kicker">'+esc(L.waitKicker)+'</div><h1 class="pw-title">'+esc(L.waitTitle)+'</h1><p class="pw-desc">'+esc(L.waitDesc)+'</p></div>'+
  inviteBlock()+'<div class="r-foot"><div class="r-row"><button class="btn btn-ghost" id="retryBtn">'+esc(L.retry)+'</button><a class="btn btn-ghost" href="'+HUB+'">'+esc(L.hub)+'</a></div><p class="r-disc">'+esc(L.disclaimer)+'</p></div></div>';
  $('result').innerHTML='<div class="result-inner">'+h+'</div>';show('result');$('retryBtn').onclick=retry;bindInvite();var gk=hook('onGate');if(gk)gk('wait',$('result'));}
function showResult(res){
  var top=res.ranked[0],r=top.r,pct=pctOf(top.cos);CUR={kind:'single',r:r,z:res.z,pct:pct};
  var h=heroHTML(r,pct)+'<div class="r-actions"><button class="btn btn-primary btn-block" id="shareBtn">'+esc(L.share)+'</button></div>';
  h+=sec(L.sDesc,'<p>'+esc(r.desc)+'</p>','r-desc');
  h+=sec(L.sDims,dimsHTML(res.z));
  h+=sec(L.sReason,'<p>'+esc(dynReason(res.z))+'</p><p>'+esc(r.reason)+'</p>');
  h+=sec(L.sHidden,'<p>'+esc(r.hidden)+'</p>','r-hidden');
  h+=sec(L.sEgg,'<p>'+esc(r.egg)+'</p>','r-egg');
  if(r.match||r.rival)h+=sec(L.sRel,relHTML(r,res.ranked[1]));
  h+=sec(L.gallery,galleryHTML(r));
  h=unlockWrap(r.id,h)+moreHTML()+footHTML();
  $('result').innerHTML='<div class="result-inner">'+h+'</div>';show('result');bindResult();
  var hk=hook('onResult');if(hk)hk(CUR,$('result'));
}
function inviteURL(){var base=location.href.split('#')[0];return base+'#p='+encodeAns(S.answers)+(S.nick?'&n='+encodeURIComponent(S.nick):'');}
function inviteBlock(){return sec(L.inviteTitle,'<p>'+esc(L.inviteText)+'</p><div class="invite"><div class="inv-code" id="invCode">'+encodeAns(S.answers)+(S.nick?'-'+esc(S.nick):'')+'</div><div class="r-row"><button class="btn btn-primary" id="invCopy">'+esc(L.inviteCopy)+'</button><button class="btn btn-ghost" id="invHand">'+esc(L.inviteHand)+'</button></div></div>','r-invite');}
function bindInvite(){$('invCopy').onclick=function(){copyText((L.inviteMsg)+inviteURL());};
  $('invHand').onclick=function(){S.partner=S.answers.slice();S.partnerName=S.nick||L.ta;S.nick='';S.answers=blank();S.i=0;
    show('home');showPartnerBox();var n=$('nick');if(n){n.value='';n.placeholder=L.nickPhB;}};}
function showCouple(aA,aB,na,nb){
  var c=coupleCompute(aA,aB),p=c.pair;na=na||L.ta;nb=nb||L.me;CUR={kind:'couple',c:c,na:na,nb:nb,pct:c.score,r:p};
  var hh=hook('coupleHeroHTML');
  var h=hh?hh(c,na,nb,L):('<div class="r-hero couple"><div class="r-kicker">'+esc(L.coupleKicker)+'</div><div class="cp-names"><span>'+esc(na)+'</span><em>&amp;</em><span>'+esc(nb)+'</span></div><div class="cp-score"><b>'+c.score+'</b><i>%</i></div><div class="r-sub">'+esc(L.coupleScore)+'</div><h1 class="r-name">'+esc(p.name)+'</h1><div class="r-tag">'+esc(p.tag)+'</div><div class="r-quote">'+esc(p.quote)+'</div><div class="cp-types"><div><small>'+esc(na)+'</small><b>'+esc(c.a.name)+'</b></div><div><small>'+esc(nb)+'</small><b>'+esc(c.b.name)+'</b></div></div></div>');
  h+='<div class="r-actions"><button class="btn btn-primary btn-block" id="shareBtn">'+esc(L.share)+'</button></div>';
  h+=sec(L.cDesc,'<p>'+esc(p.desc)+'</p>','r-desc');
  h+=sec(L.cDims,'<div class="dims dims2">'+DIMS.map(function(d,i){return '<div class="dim2"><span class="dn">'+esc(d.name)+'</span><span class="dt"><i class="a" style="width:'+dimVal(c.zA[i])+'%"></i></span><span class="dt"><i class="b" style="width:'+dimVal(c.zB[i])+'%"></i></span></div>';}).join('')+'<div class="dims2-leg"><span class="a">'+esc(na)+'</span><span class="b">'+esc(nb)+'</span></div></div>');
  var gi=c.gap.map(function(v,i){return {i:i,v:v};}).sort(function(a,b){return a.v-b.v;});
  h+=sec(L.cSync,'<p>'+esc(L.syncFmt.replace('{a}',DIMS[gi[0].i].name).replace('{b}',DIMS[gi[ND-1].i].name))+' '+esc(DIMS[gi[ND-1].i].pairTip||'')+'</p>');
  h+=sec(L.cHidden,'<p>'+esc(p.hidden)+'</p>','r-hidden');
  if(p.advice)h+=sec(L.cAdvice,'<p>'+esc(p.advice)+'</p>');
  h+=sec(L.sEgg,'<p>'+esc(p.egg)+'</p>','r-egg');
  h+=sec(L.cTypes,'<div class="rel"><button class="rel-card" data-r="'+c.a.id+'"><small>'+esc(na)+'</small><b>'+esc(c.a.name)+'</b><i>'+esc(c.a.tag)+'</i></button><button class="rel-card" data-r="'+c.b.id+'"><small>'+esc(nb)+'</small><b>'+esc(c.b.name)+'</b><i>'+esc(c.b.tag)+'</i></button></div>');
  h=unlockWrap('pair:'+p.id,h)+moreHTML()+footHTML();
  $('result').innerHTML='<div class="result-inner">'+h+'</div>';show('result');bindResult();
  var hk=hook('onResult');if(hk)hk(CUR,$('result'));
}
function openR(r){if(!r)return;$('sheet').innerHTML='<div class="pop"><h4>'+esc(r.name)+'</h4><div class="pop-tag">'+esc(r.tag)+'</div><p class="pop-q">'+esc(r.quote)+'</p><p>'+esc(r.desc)+'</p><div class="pop-row"><button class="btn btn-ghost" id="popClose">'+esc(L.close)+'</button></div></div>';$('mask').classList.add('on');$('popClose').onclick=closeMask;}
function copyText(t){function fb(){var ta=document.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');toast(L.tCopied);}catch(e){toast(L.tCopyFail);}ta.remove();}
  if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(t).then(function(){toast(L.tCopied);},fb);else fb();}

/* ---------------- share card (canvas 1080x1440, 3:4) ---------------- */
var H={
  W:1080,H:1440,
  font:function(px,fam,weight){return (weight||'normal')+' '+px+'px '+(fam||T.cardFont||'"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Noto Sans CJK SC",sans-serif');},
  serif:'"Songti SC","STSong","Noto Serif CJK SC","Source Han Serif SC","SimSun",serif',
  sans:'"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Noto Sans CJK SC",sans-serif',
  rr:function(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();},
  lines:function(ctx,text,maxW){var out=[],line='';String(text).split('').forEach(function(c){if(ctx.measureText(line+c).width>maxW&&line){if('，。！？、；：」”）…'.indexOf(c)>=0){line+=c;c='';}out.push(line);line=c;}else line+=c;});if(line)out.push(line);return out;},
  wrap:function(ctx,text,x,y,maxW,lh,maxLines){var ls=H.lines(ctx,text,maxW);if(maxLines&&ls.length>maxLines){ls=ls.slice(0,maxLines);ls[maxLines-1]=ls[maxLines-1].slice(0,-1)+'…';}ls.forEach(function(l,i){ctx.fillText(l,x,y+i*lh);});return y+(ls.length-1)*lh;},
  spaced:function(ctx,text,x,y,sp,align){var ch=String(text).split(''),w=0;ch.forEach(function(c){w+=ctx.measureText(c).width;});w+=sp*(ch.length-1);var sx=align==='center'?x-w/2:(align==='right'?x-w:x);var a=ctx.textAlign;ctx.textAlign='left';ch.forEach(function(c){ctx.fillText(c,sx,y);sx+=ctx.measureText(c).width+sp;});ctx.textAlign=a;return w;},
  fit:function(ctx,text,maxW,px,fam,weight){while(px>20){ctx.font=H.font(px,fam,weight);if(ctx.measureText(text).width<=maxW)break;px-=4;}return px;},
  noise:function(ctx,n,rgba,seed){var s=seed||7;function rnd(){s=(s*16807)%2147483647;return s/2147483647;}for(var i=0;i<n;i++){ctx.fillStyle=rgba.replace('A',(rnd()*0.06).toFixed(3));ctx.fillRect(rnd()*H.W,rnd()*H.H,1.6,1.6);}},
  chips:function(ctx,arr,cx,y,o){o=o||{};ctx.font=H.font(o.px||32,o.fam,o.weight);var pad=o.pad||24,gap=o.gap||16,h=o.h||58;var ws=arr.map(function(t){return ctx.measureText(t).width+pad*2;});var tot=ws.reduce(function(a,b){return a+b;},0)+gap*(ws.length-1);var x=cx-tot/2;ctx.textAlign='center';
    arr.forEach(function(t,k){ctx.fillStyle=o.bg||'rgba(0,0,0,.06)';H.rr(ctx,x,y-h*0.7,ws[k],h,o.radius==null?h/2:o.radius);ctx.fill();if(o.stroke){ctx.strokeStyle=o.stroke;ctx.lineWidth=2;ctx.stroke();}ctx.fillStyle=o.color||'#333';ctx.fillText(t,x+ws[k]/2,y);x+=ws[k]+gap;});},
  bars:function(ctx,x,y,w,vals,names,o){o=o||{};var rowH=o.rowH||54;ctx.textAlign='left';vals.forEach(function(v,i){var yy=y+i*rowH;ctx.font=H.font(o.px||28,o.fam);ctx.fillStyle=o.label||'#555';ctx.fillText(names[i],x,yy+10);var bx=x+(o.labelW||140),bw=w-(o.labelW||140)-70;ctx.fillStyle=o.track||'rgba(0,0,0,.08)';H.rr(ctx,bx,yy-8,bw,16,8);ctx.fill();ctx.fillStyle=o.fill||'#333';H.rr(ctx,bx,yy-8,Math.max(16,bw*v/100),16,8);ctx.fill();ctx.fillStyle=o.label||'#555';ctx.textAlign='right';ctx.fillText(v,x+w,yy+10);ctx.textAlign='left';});return y+vals.length*rowH;},
  radar:function(ctx,cx,cy,R,vals,names,o){o=o||{};var n=vals.length;function pt(i,r){var a=-Math.PI/2+i*2*Math.PI/n;return [cx+r*Math.cos(a),cy+r*Math.sin(a)];}
    ctx.strokeStyle=o.grid||'rgba(0,0,0,.15)';ctx.lineWidth=2;[1,.66,.33].forEach(function(k){ctx.beginPath();for(var i=0;i<n;i++){var p=pt(i,R*k);i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);}ctx.closePath();ctx.stroke();});
    ctx.font=H.font(o.px||28,o.fam);ctx.fillStyle=o.label||'#555';ctx.textAlign='center';for(var i=0;i<n;i++){var p=pt(i,R);ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(p[0],p[1]);ctx.stroke();var l=pt(i,R+40);ctx.fillText(names[i],l[0],l[1]+10);}
    ctx.beginPath();for(var j=0;j<n;j++){var q=pt(j,R*Math.max(.08,vals[j]/100));j?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]);}ctx.closePath();ctx.fillStyle=o.fill||'rgba(0,0,0,.18)';ctx.fill();ctx.strokeStyle=o.stroke||'#333';ctx.lineWidth=4;ctx.stroke();},
  esc:esc
};
function cardData(){var d={quiz:Q,labels:L,lang:LANG,pct:CUR.pct,kind:CUR.kind,r:CUR.r,dimNames:DIMS.map(function(x){return x.name;})};
  if(CUR.kind==='single'){d.dims=CUR.z.map(dimVal);}else{d.c=CUR.c;d.na=CUR.na;d.nb=CUR.nb;d.dimsA=CUR.c.zA.map(dimVal);d.dimsB=CUR.c.zB.map(dimVal);d.dims=CUR.c.zA.map(function(x,i){return dimVal((x+CUR.c.zB[i])/2);});}
  return d;}
function defaultCard(ctx,d,h){var W=h.W,Hh=h.H,C=T.colors||{};var bg=C.bg||'#F6F3EE',fg=C.fg||'#222',ac=C.accent||'#B04A3A',mu=C.muted||'#888';
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,Hh);ctx.strokeStyle=ac;ctx.lineWidth=3;ctx.strokeRect(40,40,W-80,Hh-80);
  ctx.textAlign='center';ctx.fillStyle=mu;ctx.font=h.font(32);h.spaced(ctx,d.labels.resultKicker,W/2,190,10,'center');
  var px=h.fit(ctx,d.r.name,W-200,150,h.serif,'900');ctx.fillStyle=fg;ctx.fillText(d.r.name,W/2,370);
  ctx.fillStyle=ac;ctx.font=h.font(46,h.serif,'bold');ctx.fillText(d.r.tag,W/2,470);
  ctx.fillStyle=fg;ctx.font=h.font(44,h.serif);var y=h.wrap(ctx,'「'+d.r.quote+'」',W/2,590,820,70,3);
  h.chips(ctx,d.r.traits||[],W/2,y+130,{bg:'rgba(0,0,0,.06)',color:fg});
  h.bars(ctx,170,y+260,W-340,d.dims,d.dimNames,{fill:ac,label:mu});
  ctx.textAlign='center';ctx.fillStyle=mu;ctx.font=h.font(30,null,'bold');ctx.fillText(d.labels.cardFooter,W/2,Hh-110);ctx.font=h.font(22);ctx.fillText(L.cardDisc,W/2,Hh-70);}
function renderCard(){var cv=document.createElement('canvas');cv.width=H.W;cv.height=H.H;var ctx=cv.getContext('2d');ctx.textBaseline='alphabetic';
  var d=cardData();var fn=(d.kind==='couple'&&hook('drawCoupleCard'))||hook('drawCard')||defaultCard;
  ctx.save();try{fn(ctx,d,H);}catch(e){console.error(e);ctx.setTransform(1,0,0,1,0,0);defaultCard(ctx,d,H);}ctx.restore();return cv;}
function openShare(){if(!UNLOCKED||!CUR)return;var cv=renderCard(),url=cv.toDataURL('image/png');
  $('sheet').innerHTML='<div class="share"><img id="shareImg" alt="share" src="'+url+'"><p class="share-hint">'+esc(L.shareHint)+'</p><div class="pop-row">'+(ISWX?'':'<a class="btn btn-primary" id="dl" download="'+esc(Q.title)+'-'+esc(CUR.r.name)+'.png" href="'+url+'">'+esc(L.saveImg)+'</a>')+'<button class="btn btn-ghost" id="shareClose">'+esc(L.close)+'</button></div></div>';
  $('mask').classList.add('on');$('shareClose').onclick=closeMask;}

/* ---------------- expose for QA ---------------- */
window.SQ={_render:function(res){UNLOCKED=true;showResult(res);},Q:Q,lang:LANG,pub:PUB,payId:PAYID,hydrate:hydrate,unlock:reveal,isUnlocked:function(){return UNLOCKED;},testId:TESTID,compute:compute,coupleCompute:coupleCompute,PROTO:PROTO,PPROTO:PPROTO,STATS:STATS,encodeAns:encodeAns,decodeAns:decodeAns,renderCard:renderCard,dimVal:dimVal,pctOf:pctOf,
  _show:function(ans){S.answers=ans;PENDING={kind:'single',a:ans};reveal();},_hd:function(){return renderCard();},_showCouple:function(a,b){PENDING={kind:'couple',a:a,b:b,na:'小鱼',nb:'阿森'};reveal();},H:H};
build();initHome();
})();
