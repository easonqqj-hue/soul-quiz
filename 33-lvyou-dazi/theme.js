(function(){
 'use strict';
 function e(s){return String(s).replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c];});}
 function guilloche(){var s='<svg viewBox="0 0 420 260" fill="none" aria-hidden="true">';for(var i=0;i<22;i++){var p='';for(var x=0;x<=420;x+=4){var y=30+i*9+Math.sin(x/37+i*.2)*17+Math.sin(x/83)*13;p+=(x?'L':'M')+x+','+y.toFixed(1);}s+='<path d="'+p+'" stroke="currentColor" stroke-width=".7"/>';}return s+'</svg>';}
 var pattern=guilloche();
 var compass='<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="43"/><circle cx="50" cy="50" r="35"/><path d="M50 3V14M50 86V97M3 50H14M86 50H97M19 19L26 26M74 74L81 81M19 81L26 74M74 26L81 19"/><path d="M50 21L58 43L79 50L58 57L50 79L43 57L21 50L43 43Z"/><path d="M50 21V50L79 50M50 79V50L21 50"/><circle cx="50" cy="50" r="4"/></svg>';
 function mrz(r){return ['P<TRV<'+r.en+'<<<<<<<<<<<<<<<<<<<<','WAY<'+r.id.toUpperCase()+'<<LIFETIME<<<<<<<<<<<<<<<<'].map(function(t){return t.slice(0,36).padEnd(36,'<');});}
 window.THEME={
 colors:{bg:'#F7F5EE',fg:'#1E2D4F',accent:'#2E7D5B',muted:'#68766E'},letters:['A','B','C','D'],qNo:function(i,n){return '<span class="entry-stamp">'+String(i+1).padStart(2,'0')+'</span> 旅途入境 / '+n+' 站';},
 decor:'<div class="passport-background">'+pattern+pattern+'</div><div class="passport-margin"></div>',
 homeTop:'<div class="passport-book"><div class="passport-spine">TRAVEL COMPANION</div><div class="passport-leaf"><div class="visa-lines">'+pattern+'</div><span class="passport-leaf-head">个人旅行偏好护照</span><div class="passport-emblem">'+compass+'</div><b>PASSPORT</b><small>YOUR WAY, YOUR JOURNEY.</small><div class="entry-seal">准许出发<span>GO YOUR WAY</span></div></div></div>',
 ornament:'<div class="passport-route"><span>HOME</span><i></i><b>?</b><i></i><span>SOMEWHERE</span></div>',homeBottom:'<div class="passport-home-foot">签发给每一个想出发的人<span>NO. 033 / PERSONAL EDITION</span></div>',
 loader:'<div class="visa-loader"><div>'+compass+'</div><span>签发中 / ISSUING</span></div>',
 gateArt:'<div class="pw-art passport-closed" aria-hidden="true"><div class="passport-cover-line"></div><span>TRAVEL COMPANION</span>'+compass+'<b>搭子护照</b><small>PERSONAL PASSPORT</small><div class="passport-lockband">签证已封存</div></div>',
 heroHTML:function(r,pct,L){var code=mrz(r);return '<div class="r-hero"><div class="visa-lines">'+pattern+'</div><div class="visa-header"><b>VISA</b><span>同行方式签注 / 趣味证件</span></div><div class="r-kicker">'+e(L.resultKicker)+'</div><h1 class="r-name">'+e(r.name)+'</h1><div class="r-sub">'+e(r.sub)+'</div><div class="r-tag">'+e(r.tag)+'</div><div class="visa-fields"><div><small>签发地 / ISSUED AT</small><b>'+e(r.issue)+'</b></div><div><small>有效期 / VALIDITY</small><b>一生 · 随心续签</b></div></div><div class="r-quote">'+e(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+e(t)+'</span>';}).join('')+'</div><div class="visa-bottom"><div class="visa-approved">同行许可<span>APPROVED</span></div><div class="r-pct">'+e(L.pct)+'<b>'+pct+'%</b></div></div><div class="visa-mrz" aria-label="含人格英文名的机读装饰码">'+code.map(function(t){return '<div>'+e(t)+'</div>';}).join('')+'</div></div>';},
 drawCard:function(c,d,h){
  var navy='#1E2D4F',green='#2E7D5B',paper='#F7F5EE',code=mrz(d.r);
  c.fillStyle=navy;c.fillRect(0,0,1080,1440);c.fillStyle=paper;c.fillRect(34,34,1012,1372);
  c.save();c.beginPath();c.rect(52,50,976,1320);c.clip();c.strokeStyle='#B8CEBD';c.lineWidth=1;c.globalAlpha=.55;
  for(var j=0;j<50;j++){c.beginPath();for(var x=42;x<1040;x+=6){var y=110+j*25+Math.sin(x/56+j*.17)*19+Math.cos(x/101)*17;if(x===42)c.moveTo(x,y);else c.lineTo(x,y);}c.stroke();}c.restore();
  c.fillStyle=navy;c.fillRect(34,34,1012,102);c.fillStyle=paper;c.textAlign='left';c.font=h.font(31);c.fillText(d.quiz.title,77,99);c.textAlign='right';c.font=h.font(28,'Consolas,monospace');c.fillText('PERSONAL VISA',1003,99);c.textAlign='left';
  c.fillStyle=navy;c.font=h.font(84,'Arial,sans-serif','700');c.fillText('VISA',77,248);c.font=h.font(24,'Consolas,monospace');c.fillText('TYPE / TRAVEL COMPANION',80,291);
  c.save();c.translate(870,233);c.rotate(-.14);c.strokeStyle=green;c.lineWidth=4;c.strokeRect(-112,-58,224,116);c.strokeRect(-104,-50,208,100);c.fillStyle=green;c.textAlign='center';c.font=h.font(31,h.sans,'600');c.fillText('同行许可',0,-5);c.font=h.font(21,'Consolas,monospace');c.fillText('GO YOUR WAY',0,31);c.restore();
  c.textAlign='left';c.fillStyle=navy;h.fit(c,d.r.name,918,104,h.sans,'800');c.fillText(d.r.name,77,421);c.font=h.font(30);c.fillStyle=green;c.fillText(d.r.tag,80,480);c.fillStyle=navy;c.font=h.font(25,'Consolas,monospace');c.fillText(d.r.sub,80,527);
  c.strokeStyle='#9FB8A7';c.lineWidth=2;c.beginPath();c.moveTo(80,558);c.lineTo(1000,558);c.stroke();
  [['签发地 / ISSUED AT',d.r.issue,80],['有效期 / VALIDITY','一生 · 随心续签',570]].forEach(function(p){c.fillStyle='#68766E';c.font=h.font(22);c.fillText(p[0],p[2],600);c.fillStyle=navy;c.font=h.font(30);c.fillText(p[1],p[2],648);});
  c.fillStyle=navy;c.font=h.font(39,h.sans,'600');h.wrap(c,d.r.quote,80,736,906,55,2);c.font=h.font(25);c.fillStyle=green;c.fillText(d.r.traits.join(' / '),80,861);
  d.dims.forEach(function(v,i){var x=80+(i%2)*488,y=936+Math.floor(i/2)*62;c.fillStyle=navy;c.font=h.font(24);c.fillText(d.dimNames[i],x,y);c.fillStyle='#D9E6DC';c.fillRect(x+79,y-14,245,7);c.fillStyle=green;c.fillRect(x+79,y-14,245*v/100,7);c.font=h.font(24,'Consolas,monospace');c.fillText(String(v).padStart(2,'0'),x+345,y);});
  c.fillStyle='#D9E6DC';c.fillRect(60,1168,960,135);c.fillStyle=navy;c.font=h.font(35,'Consolas,"Courier New",monospace');c.fillText(code[0],80,1215);c.fillText(code[1],80,1264);
  c.font=h.font(24);c.fillText(d.labels.cardFooter,80,1345);c.textAlign='right';c.font=h.font(22);c.fillText('风格契合 '+d.pct+'%',1000,1345);c.textAlign='left';c.fillStyle='#68766E';c.font=h.font(21);c.fillText('趣味测试 · 仅供娱乐 · 机读码为装饰，非真实证件',80,1383);
 },pickDelay:280,loadingMs:2100
 };
})();
