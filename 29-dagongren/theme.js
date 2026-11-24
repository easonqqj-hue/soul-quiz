(function(){
 'use strict';
 function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
 function qr(){var s='<svg viewBox="0 0 68 68" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor">';for(var y=0;y<13;y++)for(var x=0;x<13;x++)if((x*7+y*11+x*y)%5<2)s+='<rect x="'+(x*5+2)+'" y="'+(y*5+2)+'" width="4" height="4"/>';return s+'</g></svg>';}
 var code=qr();
 window.THEME={
  colors:{bg:'#F4F6F8',fg:'#253244',accent:'#3C4A5C',muted:'#637183'},letters:['01','02','03','04'],qNo:function(i,n){return '工单 '+String(i+1).padStart(2,'0')+' / '+n;},pickDelay:460,loadingMs:1950,
  decor:'<div class="wk-grid"></div><div class="wk-margin">工作之外，仍然是你。</div>',
  homeTop:'<div class="wk-home-object" aria-hidden="true"><div class="wk-lanyard"></div><div class="wk-mini-card"><span class="wk-slot"></span><div class="wk-mini-head">员工观察室<span>在岗</span></div><div class="wk-mini-you">YOU</div><div class="wk-mini-line">职称以外的你</div><div class="wk-mini-foot">PERSONNEL FILE<span>'+code+'</span></div></div><div class="wk-sticky">已打卡<br><b>09:00</b><span>今天也有自己的节奏</span></div></div>',
  ornament:'',homeBottom:'<div class="wk-attendance"><span>今日记录</span><span>一份关于自己的观察</span><b>待填写</b></div>',
  loader:'<div class="wk-loader"><span>工牌签发中</span><b>···</b><i></i></div>',
  gateArt:'<div class="pw-art wk-sealed" aria-hidden="true"><div class="wk-sealed-strap"></div><div class="wk-sealed-card"><span class="wk-slot"></span><span class="wk-issue">员工观察室 / PERSONAL FILE</span><b>工牌已封装</b><div class="wk-blanks"><i></i><i></i><i></i></div><span class="wk-seal-strip">待本人领取</span><span class="wk-sealed-code">'+code+'</span></div></div>',
  heroHTML:function(r,pct,L){return '<div class="wk-result-strap" aria-hidden="true"></div><div class="r-hero wk-badge"><span class="wk-slot"></span><div class="wk-badge-head"><span>'+esc(L.resultKicker)+'</span><b>在岗</b></div><div class="wk-identity"><span class="wk-portrait" aria-hidden="true">YOU<br><small>at work</small></span><div><p class="r-kicker">工号 29–'+esc(r.seal)+'</p><p class="r-sub">'+esc(r.sub)+'</p></div></div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="wk-skill"><small>技能树</small><b>'+esc(r.skill)+'</b></div><div class="wk-badge-stats"><div class="r-pct"><span>'+esc(L.pct)+'</span><b>'+pct+'%</b></div><div><span>摸鱼指数 · 趣味设定</span><b>'+r.fish+'<small>/100</small></b></div><span class="wk-code" aria-hidden="true">'+code+'</span></div></div>';},
  drawCard:function(ctx,d,h){
   var r=d.r;ctx.fillStyle='#E6EBF0';ctx.fillRect(0,0,h.W,h.H);
   ctx.strokeStyle='#D4DCE5';ctx.lineWidth=1;for(var g=0;g<1440;g+=54){ctx.beginPath();ctx.moveTo(0,g);ctx.lineTo(1080,g);ctx.stroke();}for(var f=0;f<1080;f+=54){ctx.beginPath();ctx.moveTo(f,0);ctx.lineTo(f,1440);ctx.stroke();}
   ctx.fillStyle='#3C4A5C';ctx.beginPath();ctx.moveTo(310,0);ctx.lineTo(386,0);ctx.lineTo(566,229);ctx.lineTo(520,275);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(710,0);ctx.lineTo(786,0);ctx.lineTo(566,275);ctx.lineTo(520,229);ctx.closePath();ctx.fill();
   ctx.fillStyle='rgba(40,56,76,.09)';h.rr(ctx,110,206,864,1120,30);ctx.fill();ctx.fillStyle='#FFFFFF';h.rr(ctx,104,196,864,1118,28);ctx.fill();ctx.strokeStyle='#C7D0DC';ctx.stroke();
   ctx.fillStyle='#B7C1CD';h.rr(ctx,470,213,140,30,14);ctx.fill();ctx.fillStyle='#3C4A5C';h.rr(ctx,519,176,43,72,9);ctx.fill();
   ctx.textAlign='left';ctx.fillStyle='#667487';ctx.font=h.font(25,h.sans);ctx.fillText('员工观察室 / 打工人风格档案',151,297);ctx.fillStyle='#DAF4E9';h.rr(ctx,831,268,88,42,6);ctx.fill();ctx.fillStyle='#146447';ctx.font=h.font(23);ctx.fillText('在岗',851,297);
   ctx.fillStyle='#FFD95A';ctx.fillRect(152,343,144,141);ctx.fillStyle='#3C4A5C';ctx.font=h.font(40,'"Avenir Next",Arial,sans-serif','bold');ctx.fillText('YOU',177,417);ctx.font=h.font(20);ctx.fillText('at work',185,451);
   ctx.fillStyle='#718095';ctx.font=h.font(25,'Consolas,monospace');ctx.fillText('EMPLOYEE 29-'+r.seal,329,386);ctx.fillStyle='#3C4A5C';ctx.font=h.font(28,h.sans);ctx.fillText(r.sub,329,443);
   ctx.fillStyle='#253244';h.fit(ctx,r.name,768,96,h.sans,'bold');ctx.fillText(r.name,151,591);ctx.fillStyle='#5E6E80';ctx.font=h.font(32);ctx.fillText(r.tag,153,652);
   ctx.fillStyle='#F4F6F8';ctx.fillRect(151,697,770,133);ctx.fillStyle='#3C4A5C';ctx.font=h.font(36,h.sans,'bold');h.wrap(ctx,r.quote,178,750,718,51,2);
   ctx.font=h.font(25);ctx.fillStyle='#637183';ctx.fillText(r.traits.join('  /  '),153,881);
   ctx.fillStyle='#D8DFE7';ctx.fillRect(151,915,770,1);ctx.fillStyle='#637183';ctx.font=h.font(25);ctx.fillText('技能树',153,958);ctx.fillStyle='#253244';ctx.font=h.font(31,h.sans,'bold');ctx.fillText(r.skill,153,1007);
   ctx.fillStyle='#637183';ctx.font=h.font(24);ctx.fillText('工作风格契合度',153,1081);ctx.fillText('摸鱼指数 · 趣味设定',478,1081);ctx.fillStyle='#253244';ctx.font=h.font(60,'Consolas,monospace','bold');ctx.fillText(d.pct+'%',151,1156);ctx.fillText(String(r.fish),477,1156);ctx.font=h.font(24);ctx.fillText('/100',550,1156);
   ctx.fillStyle='#3C4A5C';for(var y=0;y<13;y++)for(var x=0;x<13;x++)if((x*7+y*11+x*y)%5<2)ctx.fillRect(802+x*8,1060+y*8,6,6);
   ctx.fillStyle='#637183';ctx.font=h.font(23);ctx.fillText('本工牌仅用于趣味记录，不参与绩效考核',153,1245);
   ctx.textAlign='center';ctx.fillStyle='#3C4A5C';ctx.font=h.font(27,h.sans,'bold');ctx.fillText(d.labels.cardFooter,540,1356);ctx.fillStyle='#637183';ctx.font=h.font(22);ctx.fillText('趣味测试 · 仅供娱乐',540,1393);
  }
 };
})();
