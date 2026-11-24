(function(){
 'use strict';
 function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
 var storeSvg='<svg viewBox="0 0 340 172" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M48 146H300M62 146V55H270V146M56 54L68 31H264L277 55M62 58Q72 69 84 58Q96 69 108 58Q120 69 132 58Q144 69 156 58Q168 69 180 58Q192 69 204 58Q216 69 228 58Q240 69 252 58Q263 69 270 58M82 31L78 53M109 31L106 54M137 31L134 54M163 31V54M190 31L193 54M218 31L222 54M247 31L252 54"/><path d="M85 84H159V128H85ZM122 84V128M85 106H159M183 146V80H245V146M232 112V118M90 146V135H151V146M290 146V128M281 125Q286 106 290 119Q300 102 303 119Q300 131 281 125Z"/><path d="M184 19L186 8M238 19L237 8M172 19H251V39H172Z"/><circle cx="33" cy="83" r="12"/><path d="M33 95V112M25 108H40M24 78L33 70L42 78M21 83H44"/></g><g fill="currentColor"><circle cx="98" cy="100" r="2"/><circle cx="143" cy="100" r="2"/></g></svg>';
 window.THEME={
  colors:{bg:'#22312B',fg:'#F3F1EA',accent:'#C8553D',muted:'#B8C1B8'},letters:['壹','贰','叁','肆'],qNo:function(i,n){return '今日菜单 / '+String(i+1).padStart(2,'0')+' · '+n;},pickDelay:460,loadingMs:1950,
  decor:'<div class="shop-chalk-dust"></div><div class="shop-border-lines"></div>',
  homeTop:'<div class="shop-awning" aria-hidden="true"></div><div class="shop-sketch">'+storeSvg+'<span class="shop-hanging-note">虚位<br>待店主</span></div>',
  ornament:'<span class="shop-chalk-rule"><i></i> 日子可以慢慢卖 <i></i></span>',
  homeBottom:'<div class="shop-home-receipt"><span>开门所需</span><b>一点喜欢 + 一点日常</b><span>请按自己的口味作答</span></div>',
  loader:'<div class="shop-printer"><div class="shop-print-slot"></div><div class="shop-print-slip">开业小票<br><span>正在出纸</span><i></i><i></i><i></i></div></div>',
  gateArt:'<div class="pw-art shop-bag" aria-hidden="true"><div class="shop-bag-fold"></div><div class="shop-gate-slip"><span>开业小票</span><i></i><i></i><i></i><small>待店主亲阅</small></div><span class="shop-bag-label">小店<br>待开张</span><span class="shop-bag-bottom">一间属于你的日常</span></div>',
  heroHTML:function(r,pct,L){return '<div class="r-hero shop-result"><div class="shop-awning" aria-hidden="true"></div><div class="shop-sign"><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div></div><div class="shop-ticket"><div class="shop-ticket-head"><b>开业小票</b><span>FOR YOU / 30</span></div><div class="r-quote">'+esc(r.quote)+'</div><dl class="shop-ticket-items"><div><dt>营业时段</dt><dd>'+esc(r.hours)+'</dd></div><div><dt>店内招牌</dt><dd>'+esc(r.signature)+'</dd></div><div><dt>预计回头客</dt><dd>'+esc(r.regular)+'</dd></div></dl><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct"><span>'+esc(L.pct)+'</span><b>'+pct+'%</b></div><p class="shop-ticket-note">这是一份开店想象，请常来坐坐。</p></div></div>';},
  drawCard:function(ctx,d,h){
   var r=d.r;ctx.fillStyle='#22312B';ctx.fillRect(0,0,h.W,h.H);h.noise(ctx,14000,'rgba(255,255,235,A)',30);
   ctx.textAlign='center';ctx.fillStyle='#F3F1EA';ctx.font=h.font(25,h.sans);ctx.fillText('街角新店 / 测你适合经营什么样的小店',540,65);
   ctx.fillStyle='#D4B48A';ctx.fillRect(80,170,920,390);ctx.fillStyle='#22312B';ctx.fillRect(93,184,894,215);ctx.strokeStyle='#D4B48A';ctx.lineWidth=2;ctx.strokeRect(106,197,868,188);
   for(var i=0;i<16;i++){ctx.fillStyle=i%2?'#F3F1EA':'#C8553D';ctx.fillRect(80+i*57.5,101,57.5,72);ctx.beginPath();ctx.arc(108.75+i*57.5,173,28.75,0,Math.PI);ctx.fill();}
   ctx.fillStyle='#D4B48A';ctx.font=h.font(28,h.serif);ctx.fillText('店招 · '+r.store,540,240);ctx.fillStyle='#F3F1EA';h.fit(ctx,r.name,800,88,'"Kaiti SC","STKaiti","KaiTi",'+h.serif,'bold');ctx.fillText(r.name,540,332);ctx.font=h.font(29,h.serif);ctx.fillText(r.tag,540,375);
   ctx.fillStyle='#2E4338';ctx.fillRect(119,418,310,121);ctx.fillRect(653,418,310,121);ctx.fillStyle='#D4B48A';ctx.fillRect(266,418,5,121);ctx.fillRect(799,418,5,121);ctx.fillRect(119,477,310,4);ctx.fillRect(653,477,310,4);ctx.strokeStyle='#22312B';ctx.lineWidth=4;ctx.strokeRect(460,417,164,143);ctx.fillStyle='#22312B';ctx.fillRect(482,434,120,87);ctx.fillStyle='#D4B48A';ctx.fillRect(582,496,7,14);
   ctx.fillStyle='rgba(0,0,0,.12)';ctx.fillRect(142,578,816,714);ctx.fillStyle='#F3F1EA';ctx.beginPath();ctx.moveTo(130,565);ctx.lineTo(950,565);ctx.lineTo(950,1260);for(var x=950;x>=130;x-=20){ctx.lineTo(x,1260);ctx.lineTo(Math.max(130,x-10),1272);}ctx.lineTo(130,565);ctx.closePath();ctx.fill();h.noise(ctx,3000,'rgba(70,55,35,A)',50);
   ctx.textAlign='left';ctx.fillStyle='#22312B';ctx.font=h.font(32,h.serif,'bold');ctx.fillText('开业小票',180,633);ctx.textAlign='right';ctx.font=h.font(26,'Consolas,'+h.sans);ctx.fillText('契合度 '+d.pct+'%',900,633);
   function dash(y){ctx.strokeStyle='#A4A69B';ctx.lineWidth=2;ctx.setLineDash([7,7]);ctx.beginPath();ctx.moveTo(180,y);ctx.lineTo(900,y);ctx.stroke();ctx.setLineDash([]);}dash(662);
   ctx.textAlign='center';ctx.fillStyle='#22312B';ctx.font=h.font(39,h.serif,'bold');h.wrap(ctx,r.quote,540,726,700,57,2);dash(814);
   function row(label,value,y,px){ctx.textAlign='left';ctx.fillStyle='#677066';ctx.font=h.font(25,'Consolas,'+h.sans);ctx.fillText(label,182,y);ctx.textAlign='right';ctx.fillStyle='#22312B';h.fit(ctx,value,545,px||28,h.sans);ctx.fillText(value,898,y);}
   row('营业时段',r.hours,871,29);row('店内招牌',r.signature,936,28);row('预计回头客',r.regular,1001,27);dash(1040);
   ctx.textAlign='center';ctx.fillStyle='#22312B';ctx.font=h.font(29,h.serif);ctx.fillText(r.traits.join(' / '),540,1097);ctx.fillStyle='#C8553D';ctx.font=h.font(33,h.serif,'bold');ctx.fillText('谢谢你，把普通日子认真开张。',540,1170);ctx.fillStyle='#677066';ctx.font=h.font(23);ctx.fillText('这是一份开店想象，请常来坐坐。',540,1220);
   ctx.fillStyle='#F3F1EA';ctx.font=h.font(28,h.serif);ctx.fillText(d.labels.cardFooter,540,1337);ctx.fillStyle='#BDC5BA';ctx.font=h.font(23);ctx.fillText('趣味测试 · 仅供娱乐',540,1384);
  }
 };
})();
