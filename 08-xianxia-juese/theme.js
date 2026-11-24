(function(){
  'use strict';
  var mark='M80 12V30M62 24L80 37 98 24M80 37V65M56 50H104M64 65L80 80 96 65M80 80V129M53 94L66 108 53 122M107 94L94 108 107 122M63 142L80 129 97 142M80 142V165';
  function sigil(cls){return '<svg class="'+cls+'" viewBox="0 0 160 180" fill="none" aria-hidden="true"><path d="M80 3L140 42V139L80 177 20 139V42Z" stroke="currentColor" opacity=".28"/><path class="sigil-line" d="'+mark+'" stroke="currentColor" stroke-width="1.4"/><circle cx="80" cy="92" r="58" stroke="currentColor" opacity=".18"/></svg>';}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function mountains(c,y){
    c.save();c.translate(0,y);
    c.fillStyle='#c6d8de';c.beginPath();c.moveTo(0,180);c.bezierCurveTo(160,80,180,130,300,30);c.lineTo(410,146);c.lineTo(570,70);c.lineTo(730,160);c.lineTo(910,0);c.lineTo(1080,140);c.lineTo(1080,330);c.lineTo(0,330);c.fill();
    c.fillStyle='#9db8c4';c.beginPath();c.moveTo(0,220);c.lineTo(180,135);c.lineTo(270,200);c.lineTo(470,90);c.lineTo(660,235);c.lineTo(815,120);c.lineTo(1080,220);c.lineTo(1080,330);c.lineTo(0,330);c.fill();
    c.fillStyle='#e9f0ef';c.beginPath();c.moveTo(0,260);c.bezierCurveTo(230,190,350,310,600,230);c.bezierCurveTo(800,170,930,260,1080,215);c.lineTo(1080,350);c.lineTo(0,350);c.fill();c.restore();
  }
  window.THEME={
    colors:{bg:'#DDE8EA',fg:'#22313A',accent:'#8A682F',muted:'#526A74'},letters:['壹','贰','叁','肆'],qNo:function(i){return '问心 · '+String(i+1).padStart(2,'0');},pickDelay:320,loadingMs:2000,
    decor:'<svg class="sky-landscape" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="sky-fade" x2="0" y2="1"><stop stop-color="#f3f7f5"/><stop offset="1" stop-color="#DDE8EA"/></linearGradient></defs><rect width="1440" height="1000" fill="url(#sky-fade)"/><circle cx="1040" cy="230" r="115" fill="none" stroke="#C2A15A" opacity=".3"/><path d="M0 760L190 540 300 650 465 390 620 690 820 580 960 700 1160 445 1440 725V1000H0Z" fill="#5B7C8C" opacity=".11"/><path d="M0 850L160 740 330 800 520 610 740 860 930 720 1110 820 1310 620 1440 810V1000H0Z" fill="#5B7C8C" opacity=".14"/><g class="cloud-drift" fill="none" stroke="#f5f8f6" stroke-width="65" opacity=".8"><path d="M-120 870Q130 740 420 840T980 820T1610 840"/><path d="M-100 980Q210 830 590 930T1520 920"/></g><path d="M0 926Q190 855 340 915T690 905T1060 925T1440 875" fill="none" stroke="#C2A15A" opacity=".35"/></svg>',
    homeTop:'<div class="sky-portal" aria-hidden="true"><span class="portal-side">云深不记年</span>'+sigil('portal-sigil')+'<span class="portal-side">此心自有道</span></div>',
    homeBottom:'<div class="sky-colophon">山川有形，心性有迹</div>',
    ornament:'<svg width="124" height="12" viewBox="0 0 124 12" aria-hidden="true"><path d="M0 6H50M74 6H124M62 1L67 6 62 11 57 6Z" fill="none" stroke="currentColor"/></svg>',
    loader:sigil('loader-sigil'),
    gateArt:'<div class="pw-art sealed-lu" aria-label="金线封缄的仙箓"><div class="lu-tie"></div>'+sigil('gate-sigil')+'<span class="lu-label">问心已毕<br>仙箓待启</span></div>',
    onBuild:function(){document.getElementById('chips').textContent='';},
    heroHTML:function(r,pct,L){return '<div class="r-hero celestial-register"><div class="register-edge" aria-hidden="true">云海录</div>'+sigil('result-sigil')+'<div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="lu-facts"><div><small>境界</small><b>'+esc(r.realm)+'</b></div><div><small>本命法器</small><b>'+esc(r.artifact)+'</b></div></div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div>';},
    drawCard:function(c,d,h){
      var r=d.r;c.fillStyle='#e9f0ef';c.fillRect(0,0,h.W,h.H);mountains(c,980);
      c.strokeStyle='#C2A15A';c.lineWidth=2;c.strokeRect(50,48,980,1344);c.strokeRect(65,63,950,1314);
      [[78,80],[1002,80],[78,1360],[1002,1360]].forEach(function(p){c.beginPath();c.moveTo(p[0]-8,p[1]);c.lineTo(p[0],p[1]-8);c.lineTo(p[0]+8,p[1]);c.lineTo(p[0],p[1]+8);c.closePath();c.stroke();});
      c.fillStyle='#526A74';c.textAlign='center';c.font=h.font(28,h.serif);h.spaced(c,'云 海 录 · 修 行 仙 箓',540,132,4,'center');
      c.save();c.translate(460,158);c.strokeStyle='#aa8542';c.lineWidth=1.6;c.stroke(new Path2D(mark));c.restore();
      c.fillStyle='#22313A';h.fit(c,r.name,840,112,h.serif,'normal');c.fillText(r.name,540,430);
      c.fillStyle='#536e7a';c.font=h.font(29,h.serif);h.spaced(c,r.sub,540,489,7,'center');
      c.fillStyle='#8A682F';h.fit(c,r.tag,830,37,h.serif);c.fillText(r.tag,540,561);
      c.strokeStyle='rgba(138,104,47,.4)';c.beginPath();c.moveTo(160,612);c.lineTo(920,612);c.moveTo(540,640);c.lineTo(540,744);c.stroke();
      c.fillStyle='#526A74';c.font=h.font(25);c.fillText('境 界',330,656);c.fillText('本 命 法 器',750,656);
      c.fillStyle='#22313A';c.font=h.font(44,h.serif);c.fillText(r.realm,330,718);c.fillText(r.artifact,750,718);
      c.font=h.font(42,h.serif);h.wrap(c,'「'+r.quote+'」',540,820,800,64,2);
      h.chips(c,r.traits,540,975,{px:27,pad:18,gap:12,h:48,radius:0,bg:'rgba(91,124,140,.08)',color:'#314d5c'});
      c.textAlign='left';c.fillStyle='#526A74';c.font=h.font(23);c.fillText('六 脉 心 性',150,1062);
      d.dims.forEach(function(v,i){var x=150+i*133;c.fillStyle='#526A74';c.font=h.font(23);c.fillText(d.dimNames[i],x,1104);c.fillStyle='#8A682F';c.font=h.font(34,h.serif);c.fillText(String(v),x,1155);});
      c.textAlign='center';c.fillStyle='#314d5c';c.font=h.font(26,h.serif);c.fillText(d.labels.cardFooter,540,1280);c.font=h.font(22);c.fillText('趣味测试 · 仅供娱乐',540,1330);
    }
  };
})();
