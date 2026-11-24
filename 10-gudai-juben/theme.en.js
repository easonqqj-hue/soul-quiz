(function(){
 'use strict';
 var serif='"Baskerville","Palatino Linotype",Georgia,serif',sans='"Optima","Avenir Next","Helvetica Neue",Arial,sans-serif';
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
 function words(c,h,text,x,y,w,size,leading,maxLines,fam){var ts=String(text).split(/\s+/),ls,px=size;ts.forEach(function(t){px=Math.min(px,h.fit(c,t,w,px,fam));});do{c.font=h.font(px,fam);ls=[];var ln='';ts.forEach(function(t){var n=ln?ln+' '+t:t;if(ln&&c.measureText(n).width>w){ls.push(ln);ln=t;}else ln=n;});if(ln)ls.push(ln);if(ls.length<=maxLines||px<=20)break;px-=2;}while(true);ls.forEach(function(l,i){c.fillText(l,x,y+i*px*leading);});return y+(ls.length-1)*px*leading;}
 function rosette(cls){return '<svg class="'+cls+'" viewBox="0 0 160 80" fill="none" stroke="currentColor" aria-hidden="true"><path d="M10 40H54M106 40H150M80 7V73M47 40L80 10 113 40 80 70ZM61 40L80 23 99 40 80 57Z"/><path d="M19 40Q31 15 54 30Q33 45 19 40M141 40Q129 15 106 30Q127 45 141 40M19 40Q31 65 54 50Q33 35 19 40M141 40Q129 65 106 50Q127 35 141 40" opacity=".65"/><circle cx="80" cy="40" r="6"/></svg>';}
 function book(cls){return '<div class="'+cls+'"><div class="en-book-spine"></div><span class="en-cover-small">THE UNWRITTEN<br>LIBRARY</span>'+rosette('en-book-flower')+'<span class="en-cover-line">A life in chapters</span><div class="en-book-clasp" aria-hidden="true"></div></div>';}
 var roman=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII','XXIII','XXIV','XXV','XXVI','XXVII','XXVIII','XXIX','XXX'];
 window.THEME_EN={colors:{bg:'#421d26',fg:'#f4e8ce',accent:'#d2b473',muted:'#d0bca4'},cardFont:sans,letters:['a.','b.','c.','d.'],qNo:function(i){return 'Chapter '+roman[i];},pickDelay:280,loadingMs:1950,
  decor:'<div class="en-leather"></div><div class="en-marble en-marble-left"></div><div class="en-marble en-marble-right"></div>',
  homeTop:book('en-mini-book'),homeBottom:'<div class="en-library-foot">An original story. A familiar protagonist.</div>',ornament:rosette('en-divider'),loader:'<div class="en-loading-book">'+rosette('en-divider')+'<span>Binding the final pages.</span></div>',
  gateArt:book('pw-art en-locked-book'),onBuild:function(){document.getElementById('chips').textContent='';},
  heroHTML:function(r,pct,L){return '<div class="r-hero en-chapter-page"><div class="r-kicker">'+esc(L.resultKicker)+'</div>'+rosette('en-result-flower')+'<h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="en-chapters">'+r.chapters.map(function(a,i){return '<div class="en-chapter"><span>'+roman[i]+'</span><div><b>'+esc(a[0])+'</b><p>'+esc(a[1])+'</p></div></div>';}).join('')+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div>';},
  drawCard:function(c,d,h){
   c.fillStyle='#54212b';c.fillRect(0,0,1080,1440);h.noise(c,16000,'rgba(15,0,0,A)',31);c.fillStyle='#35131c';c.fillRect(0,0,88,1440);c.fillStyle='#b49557';c.fillRect(87,0,3,1440);c.strokeStyle='#bc9c60';c.lineWidth=2;c.strokeRect(118,51,913,1338);c.strokeRect(130,63,889,1314);
   for(var i=0;i<5;i++){c.fillStyle='#ad8d53';c.fillRect(12,126+i*275,57,5);c.fillRect(12,137+i*275,57,2);}
   c.textAlign='center';c.fillStyle='#d2b473';c.font=h.font(24,sans);c.fillText('THE UNWRITTEN LIBRARY',575,130);c.font=h.font(23,serif);c.fillText('A life in chapters',575,178);
   c.strokeStyle='#c4a464';c.beginPath();c.moveTo(575,215);c.lineTo(611,250);c.lineTo(575,285);c.lineTo(539,250);c.closePath();c.moveTo(350,250);c.lineTo(525,250);c.moveTo(625,250);c.lineTo(800,250);c.stroke();
   c.fillStyle='#f4e8ce';words(c,h,d.r.name,575,385,790,86,1.1,3,serif);
   c.fillStyle='#d2b473';words(c,h,d.r.tag,575,685,760,30,1.35,2,sans);
   c.fillStyle='#f4e8ce';words(c,h,'“'+d.r.quote+'”',575,804,745,39,1.3,2,serif);
   c.fillStyle='#d0bca4';words(c,h,d.r.traits.join(' / '),575,944,760,23,1.3,2,sans);
   d.r.chapters.forEach(function(a,i){var y=1040+i*65;c.textAlign='left';c.fillStyle='#d2b473';c.font=h.font(23,serif);c.fillText(roman[i],203,y);c.fillStyle='#f4e8ce';h.fit(c,a[0],690,30,serif);c.fillText(a[0],264,y);});
   c.strokeStyle='#9d7d49';c.beginPath();c.moveTo(202,1238);c.lineTo(948,1238);c.stroke();c.textAlign='center';c.fillStyle='#f4e8ce';c.font=h.font(25,sans);c.fillText(d.labels.cardFooter,575,1304);c.fillStyle='#d0bca4';c.font=h.font(20,sans);c.fillText(d.labels.cardDisc,575,1348);
  }
 };
})();
