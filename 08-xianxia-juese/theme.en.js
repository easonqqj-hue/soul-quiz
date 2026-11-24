(function(){
 'use strict';
 var serif='Didot,"Bodoni 72",Georgia,serif',sans='"Avenir Next","Helvetica Neue",Arial,sans-serif';
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
 // Keep words intact; reduce the type size for a long word or a full text block.
 function words(c,h,text,x,y,width,size,leading,maxLines,family){
  var tokens=String(text).split(/\s+/),lines,px=size;
  tokens.forEach(function(t){px=Math.min(px,h.fit(c,t,width,px,family));});
  do{c.font=h.font(px,family);lines=[];var line='';tokens.forEach(function(t){var next=line?line+' '+t:t;if(line&&c.measureText(next).width>width){lines.push(line);line=t;}else line=next;});if(line)lines.push(line);if(lines.length<=maxLines||px<=20)break;px-=2;}while(true);
  lines.forEach(function(l,i){c.fillText(l,x,y+i*px*leading);});return y+(lines.length-1)*px*leading;
 }
 function starMap(cls){return '<svg class="'+cls+'" viewBox="0 0 260 230" fill="none" aria-hidden="true"><circle cx="130" cy="115" r="96" stroke="currentColor" opacity=".24"/><circle cx="130" cy="115" r="83" stroke="currentColor" opacity=".45"/><path d="M130 8V30M130 200V222M23 115H45M215 115H237M55 40L69 54M191 176L205 190M55 190L69 176M191 54L205 40" stroke="currentColor"/><path d="M80 137L104 86 146 65 178 111 151 163 80 137 130 115 178 111M104 86L130 115 151 163" stroke="currentColor" opacity=".65"/><path d="M147 47A32 32 0 1 0 181 88A26 26 0 0 1 147 47Z" fill="currentColor" opacity=".86"/><g fill="currentColor"><circle cx="80" cy="137" r="3"/><circle cx="104" cy="86" r="3"/><circle cx="146" cy="65" r="2"/><circle cx="178" cy="111" r="3"/><circle cx="151" cy="163" r="3"/><path d="M130 103L133 112 142 115 133 118 130 127 127 118 118 115 127 112Z"/></g><g stroke="currentColor" opacity=".4"><path d="M66 63L70 58 75 64M65 163L70 169 77 165M192 65L187 60 181 66M189 168L184 174 179 168"/></g></svg>';}
 var trees='<path d="M0 850V240M0 480L85 370M0 610L110 510M80 900V480M80 650L145 560M1440 900V170M1440 440L1340 310M1440 650L1290 480M1360 900V480M1360 650L1300 570" stroke="#577b7d" stroke-width="3"/><path d="M0 1000V640L70 710 40 710 120 790 78 790 170 890 105 890 190 1000M1440 1000V600L1360 695 1390 695 1310 790 1350 790 1260 900 1320 900 1240 1000" fill="#143b3f"/>';
 window.THEME_EN={
  colors:{bg:'#092c32',fg:'#e3eee9',accent:'#b4d2d0',muted:'#a7bdbc'},cardFont:sans,letters:['I','II','III','IV'],qNo:function(i){return 'Crossing '+String(i+1).padStart(2,'0');},pickDelay:260,loadingMs:1950,
  decor:'<svg class="en-forest" viewBox="0 0 1440 1000" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="en-moon-haze"><stop stop-color="#28555a"/><stop offset="1" stop-color="#092c32"/></radialGradient></defs><rect width="1440" height="1000" fill="url(#en-moon-haze)"/>'+trees+'<g stroke="#b4d2d0" opacity=".16" fill="none"><path d="M190 160L310 210 365 95 490 150M1030 120L1160 70 1230 240 1090 300Z"/><circle cx="190" cy="160" r="3"/><circle cx="310" cy="210" r="3"/><circle cx="365" cy="95" r="3"/><circle cx="1160" cy="70" r="3"/></g></svg>',
  homeTop:'<div class="en-astrolabe">'+starMap('en-map')+'</div>',homeBottom:'<p class="en-colophon">Fourteen paths. None of them ordinary.</p>',ornament:'<span class="en-star-rule" aria-hidden="true"></span>',loader:starMap('en-loader'),
  gateArt:'<div class="pw-art en-sealed-sky" aria-label="A sealed silver constellation record">'+starMap('en-map')+'<span>SEALED UNDER MOONLIGHT</span></div>',
  onBuild:function(){document.getElementById('chips').textContent='';},
  heroHTML:function(r,pct,L){return '<div class="r-hero en-character">'+starMap('en-result-map')+'<div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div>';},
  drawCard:function(c,d,h){
   c.fillStyle='#092c32';c.fillRect(0,0,1080,1440);c.strokeStyle='#729a9c';c.lineWidth=2;c.strokeRect(48,48,984,1344);c.strokeRect(62,62,956,1316);
   c.save();c.translate(540,265);c.strokeStyle='#b4d2d0';[112,134].forEach(function(r){c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.stroke();});
   c.beginPath();c.moveTo(-73,25);c.lineTo(-34,-61);c.lineTo(45,-78);c.lineTo(91,12);c.lineTo(30,72);c.closePath();c.moveTo(-34,-61);c.lineTo(30,72);c.stroke();[[-73,25],[-34,-61],[45,-78],[91,12],[30,72]].forEach(function(p){c.beginPath();c.arc(p[0],p[1],5,0,Math.PI*2);c.fillStyle='#e3eee9';c.fill();});c.restore();
   // A crescent over the constellation; quiet forest silhouettes frame the lower page.
   c.fillStyle='#d7e7e0';c.beginPath();c.arc(583,201,33,0,Math.PI*2);c.fill();c.fillStyle='#092c32';c.beginPath();c.arc(596,190,30,0,Math.PI*2);c.fill();
   c.save();c.strokeStyle='#395f64';c.lineWidth=2;[0,1].forEach(function(side){c.save();if(side)c.transform(-1,0,0,1,1080,0);c.beginPath();c.moveTo(84,1220);c.lineTo(84,830);c.moveTo(84,940);c.lineTo(118,892);c.moveTo(84,1025);c.lineTo(112,983);c.moveTo(84,1090);c.lineTo(117,1050);c.moveTo(84,1150);c.lineTo(112,1115);c.stroke();c.restore();});c.restore();
   c.textAlign='center';c.fillStyle='#b4d2d0';c.font=h.font(24,sans);c.fillText('THE MOONLIT REGISTER',540,111);
   c.fillStyle='#e3eee9';words(c,h,d.r.name,540,495,840,91,1.08,2,serif);
   c.fillStyle='#b4d2d0';words(c,h,d.r.tag,540,685,800,32,1.35,2,sans);
   c.fillStyle='#e3eee9';words(c,h,'“'+d.r.quote+'”',540,805,770,41,1.3,2,serif);
   c.fillStyle='#b4d2d0';words(c,h,d.r.traits.join(' / '),540,945,800,25,1.4,2,sans);
   d.dims.forEach(function(v,i){var x=132+(i%2)*455,y=1050+Math.floor(i/2)*69;c.textAlign='left';c.fillStyle='#b4d2d0';c.font=h.font(24,sans);c.fillText(d.dimNames[i],x,y);c.fillStyle='#375960';c.fillRect(x,y+13,355,3);c.fillStyle='#d7e7e0';c.fillRect(x,y+13,355*v/100,3);c.textAlign='right';c.fillText(String(v),x+355,y);});
   c.textAlign='center';c.fillStyle='#e3eee9';c.font=h.font(25,sans);c.fillText(d.labels.cardFooter,540,1296);c.fillStyle='#a7bdbc';c.font=h.font(20,sans);c.fillText(d.labels.cardDisc,540,1345);
  }
 };
})();
