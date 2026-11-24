(function(){
 'use strict';
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
 var theatre='<svg viewBox="0 0 260 132" fill="none" aria-hidden="true"><path d="M20 113V31L53 12H207L240 31V113M30 113V38L57 23H203L230 38V113M20 48H240M45 49V113M215 49V113M13 115H247M5 123H255" stroke="currentColor"/><path d="M45 49Q88 83 111 49M111 49Q135 75 150 49M150 49Q181 85 215 49M45 58Q57 86 43 105M215 58Q203 86 217 105" stroke="currentColor"/><circle cx="130" cy="22" r="6" stroke="currentColor"/><path d="M96 87H164M108 95H152M119 103H141" stroke="currentColor" opacity=".6"/></svg>';
 window.THEME={colors:{bg:'#141012',fg:'#F2E8D5',accent:'#C8A24A',muted:'#C5B99F'},letters:['起','承','转','合'],qNo:function(i){return '第 '+String(i+1).padStart(2,'0')+' 折';},pickDelay:320,loadingMs:2000,
  decor:'<div class="stage-space"></div><div class="curtain curtain-left"></div><div class="curtain curtain-right"></div><div class="stage-lintel"><span></span></div><div class="stage-floor"></div>',
  homeTop:'<div class="stage-sign">'+theatre+'<div class="stage-sign-name">人 间 戏 台</div></div>',
  ornament:'<div class="opera-rule"><span></span><b>今夜 · 你来主演</b><span></span></div>',homeBottom:'<div class="playbill-colophon">行当是叙事角色，不限定性别。</div>',
  loader:'<div class="gong-loader"><svg viewBox="0 0 140 140" fill="none" aria-hidden="true"><circle cx="70" cy="70" r="52" stroke="currentColor"/><circle class="gong-ripple" cx="70" cy="70" r="39" stroke="currentColor"/><circle cx="70" cy="70" r="13" stroke="currentColor"/><path d="M106 110L126 131" stroke="currentColor" stroke-width="4"/></svg></div>',
  gateArt:'<div class="pw-art sealed-playbill"><div class="ticket-ruled"></div><div class="playbill-cover-title">人生戏单</div><div class="ticket-band">尚 · 未 · 揭 · 幕</div><span class="ticket-bottom">一人一戏 · 静候开场</span></div>',
  onBuild:function(){document.getElementById('chips').textContent='';},
  heroHTML:function(r,pct,L){return '<div class="r-hero opera-playbill"><div class="playbill-topline">'+esc(L.resultKicker)+'</div><div class="playbill-title"><div class="starring">主 演<b>你</b><small>三折新编</small></div><h1 class="r-name">'+esc(r.name)+'</h1><div class="playbill-side">'+esc(r.sub)+'</div></div><div class="r-sub">行当：'+esc(r.hang)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="three-acts">'+r.acts.map(function(a,i){return '<div class="act"><span>'+['壹','贰','叁'][i]+'</span><div><b>'+esc(a.title)+'</b><p>'+esc(a.text)+'</p></div></div>';}).join('')+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div>';},
  drawCard:function(c,d,h){
   var r=d.r;c.fillStyle='#141012';c.fillRect(0,0,1080,1440);
   // Velvet curtains: dark folds, a swept lower edge and restrained gilt cord.
   for(var side=0;side<2;side++){c.save();if(side)c.transform(-1,0,0,1,1080,0);var g=c.createLinearGradient(0,0,190,0);g.addColorStop(0,'#3c1216');g.addColorStop(.28,'#8e1b1b');g.addColorStop(.5,'#541219');g.addColorStop(.78,'#8e1b1b');g.addColorStop(1,'#291115');c.fillStyle=g;c.beginPath();c.moveTo(0,0);c.lineTo(240,0);c.bezierCurveTo(225,210,160,380,65,520);c.lineTo(0,560);c.closePath();c.fill();c.strokeStyle='#C8A24A';c.lineWidth=2;c.beginPath();c.moveTo(220,0);c.bezierCurveTo(215,200,142,365,50,495);c.stroke();c.restore();}
   c.fillStyle='#F2E8D5';c.fillRect(113,84,854,1272);h.noise(c,7500,'rgba(80,43,22,A)',13);
   c.strokeStyle='#C8A24A';c.lineWidth=2;c.strokeRect(93,63,894,1314);c.strokeStyle='#8E1B1B';c.lineWidth=2;c.strokeRect(132,103,816,1234);
   c.textAlign='center';c.fillStyle='#8E1B1B';c.font=h.font(29,h.serif);h.spaced(c,'人 间 戏 台 · 今 夜 新 编',540,164,4,'center');
   c.strokeStyle='#8E1B1B';c.beginPath();c.moveTo(175,198);c.lineTo(905,198);c.stroke();
   c.save();c.translate(200,242);c.fillStyle='#8E1B1B';c.fillRect(0,0,91,240);c.fillStyle='#F2E8D5';c.font=h.font(27,h.serif);c.fillText('主',45,43);c.fillText('演',45,82);c.font=h.font(65,h.serif,'bold');c.fillText('你',45,179);c.font=h.font(18,h.serif);c.fillText('三折',45,217);c.restore();
   c.fillStyle='#141012';var chars=r.name.split('');c.font=h.font(88,h.serif,'bold');chars.slice(0,2).forEach(function(s,i){c.fillText(s,725,302+i*112);});chars.slice(2).forEach(function(s,i){c.fillText(s,545,302+i*112);});
   c.fillStyle='#8E1B1B';c.font=h.font(26,h.serif);c.fillText(r.sub,634,483);c.fillStyle='#564236';c.font=h.font(25,h.serif);c.fillText('行当：'+r.hang,540,555);
   c.fillStyle='#8E1B1B';h.fit(c,r.tag,730,35,h.serif,'bold');c.fillText(r.tag,540,615);
   c.strokeStyle='#bca887';c.lineWidth=1;c.beginPath();c.moveTo(175,656);c.lineTo(905,656);c.stroke();
   r.acts.forEach(function(a,i){var y=713+i*114;c.textAlign='center';c.fillStyle='#8E1B1B';c.font=h.font(27,h.serif);c.fillText(['壹','贰','叁'][i],209,y+7);c.strokeStyle='#bca887';c.strokeRect(184,y-26,50,52);c.textAlign='left';c.fillStyle='#2b2020';c.font=h.font(32,h.serif,'bold');c.fillText(a.title,269,y);c.fillStyle='#645448';c.font=h.font(24,h.serif);h.wrap(c,a.text,269,y+43,600,34,2);});
   c.textAlign='center';c.fillStyle='#8E1B1B';c.font=h.font(35,h.serif);h.wrap(c,'「'+r.quote+'」',540,1082,740,53,2);
   h.chips(c,r.traits,540,1195,{px:24,pad:10,gap:12,h:42,radius:0,color:'#564236',bg:'rgba(142,27,27,.06)'});
   c.fillStyle='#645448';c.textAlign='center';c.font=h.font(23,h.serif);c.fillText(d.labels.cardFooter,540,1265);c.font=h.font(21);c.fillText('趣味测试 · 仅供娱乐',540,1310);
  }
 };
})();
