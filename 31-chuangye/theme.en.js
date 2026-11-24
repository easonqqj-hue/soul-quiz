(function(){
 'use strict';
 var sans='"Helvetica Neue",Arial,sans-serif',mono='Consolas,"Courier New",monospace';
 var ink='#0A0A0A',paper='#F5F5F0',green='#39FF88';
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
 // Wrap whole words; fit an overlong word before laying out the paragraph.
 function words(c,h,t,x,y,w,px,lh,max,fam,weight){
  var tokens=String(t).trim().split(/\s+/),lines,size=px;
  do{c.font=h.font(size,fam,weight);tokens.forEach(function(word){size=Math.min(size,h.fit(c,word,w,size,fam,weight));});c.font=h.font(size,fam,weight);lines=[''];tokens.forEach(function(word){var i=lines.length-1,next=lines[i]?lines[i]+' '+word:word;if(c.measureText(next).width>w&&lines[i])lines.push(word);else lines[i]=next;});if(lines.length<=max||size<=20)break;size-=2;}while(true);
  var step=lh*size/px;lines.forEach(function(line,i){h.fit(c,line,w,size,fam,weight);c.fillText(line,x,y+i*step);});return y+(lines.length-1)*step;
 }
 function text(c,h,t,x,y,w,px,color,fam,weight){c.fillStyle=color;c.font=h.font(px,fam||sans,weight);h.fit(c,t,w,px,fam||sans,weight);c.fillText(t,x,y);}
 var chart='<svg viewBox="0 0 340 130" fill="none" aria-hidden="true"><path d="M8 18H332M8 58H332M8 98H332M60 8V118M140 8V118M220 8V118M300 8V118" stroke="currentColor" opacity=".12"/><path d="M12 110L53 99L86 106L122 73L155 82L190 49L225 58L265 20L300 30L328 10" stroke="currentColor" stroke-width="3"/></svg>';
 window.THEME_EN={
  colors:{bg:ink,fg:paper,accent:green,muted:'#A2A69F'},cardFont:sans,letters:['A','B','C','D'],qNo:function(i,n){return 'SLIDE '+String(i+1).padStart(2,'0')+' / '+n;},
  decor:'<div class="terminal-grid"></div><div class="edge-mark">FOUNDER DECK / PERSONAL EDITION</div>',
  homeTop:'<div class="deck-cover"><div class="deck-topline"><span>THE FOUNDER DECK</span><span>PERSONAL EDITION</span></div><div class="deck-word">MAKE<br>IT REAL<span>An idea is a place to start.</span></div><div class="deck-chart">'+chart+'</div><div class="deck-caption">FROM IDEA TO FIRST STEP<span>What is your move?</span></div></div>',
  ornament:'<div class="deck-rule"><i></i><span>NO PERFECT ANSWER</span></div>',
  homeBottom:'<div class="deck-bottom">YOUR INSTINCTS. YOUR DECK.<span>A little self-discovery.</span></div>',
  loader:'<div class="deck-loading"><span>ASSEMBLING YOUR MEMO</span><i></i><b>Finding the founder behind the pitch.</b></div>',
  gateArt:'<div class="pw-art sealed-deck" aria-hidden="true"><div class="sealed-paper">FOUNDER<br>MEMORANDUM<span>Personal edition</span></div><div class="sealed-front"><span>PRIVATE COPY</span><b>SEALED</b><i>YOUR FULL READ IS INSIDE</i></div><div class="sealed-band">READY TO OPEN</div></div>',
  heroHTML:function(r,pct,L){return '<div class="r-hero"><div class="bp-heading"><span>FOUNDER MEMO</span><b>'+esc(r.seal)+'</b></div><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="bp-signal"><span>Your six operating preferences</span><svg viewBox="0 0 320 72" role="img" aria-label="Your decision preference profile"><path d="M10 60H310M10 36H310M10 12H310" stroke="currentColor" opacity=".15"/><polyline id="founderCurve" points="10,36 70,36 130,36 190,36 250,36 310,36" fill="none" stroke="currentColor" stroke-width="2.5"/></svg></div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div>';},
  drawCard:function(c,d,h){
   c.fillStyle=ink;c.fillRect(0,0,h.W,h.H);c.textAlign='left';
   text(c,h,d.quiz.title,70,84,940,30,paper);
   c.strokeStyle='#454B40';c.lineWidth=2;c.beginPath();c.moveTo(70,114);c.lineTo(1010,114);c.stroke();
   text(c,h,'FOUNDER',63,245,950,132,paper,sans,'900');
   text(c,h,'PERSONAL MEMO / '+d.r.seal,70,286,600,24,green,mono);
   c.fillStyle=paper;c.fillRect(70,324,940,480);
   text(c,h,'YOUR FOUNDER MODE',104,368,866,23,'#535B4C',mono);
   c.fillStyle=ink;words(c,h,d.r.name,104,456,866,92,100,2,sans,'900');
   c.fillStyle='#1E4E30';words(c,h,d.r.tag,104,630,866,30,38,2,sans,'600');
   c.strokeStyle='#C4CABD';c.beginPath();c.moveTo(104,688);c.lineTo(976,688);c.stroke();
   c.fillStyle=ink;words(c,h,d.r.quote,104,739,866,37,45,2,sans,'600');
   text(c,h,'STYLE MATCH / '+d.pct+'%',70,836,940,28,green,mono);
   text(c,h,d.r.traits.join(' / '),70,888,940,28,paper);
   c.strokeStyle='#343A32';[936,990,1044].forEach(function(y){c.beginPath();c.moveTo(70,y);c.lineTo(1010,y);c.stroke();});
   c.strokeStyle=green;c.lineWidth=4;c.beginPath();d.dims.forEach(function(v,i){var x=70+i*188,y=1056-v*1.25;if(i)c.lineTo(x,y);else c.moveTo(x,y);});c.stroke();
   text(c,h,'YOUR DECISION PROFILE',70,1094,940,22,'#A2A69F',mono);
   d.dims.forEach(function(v,i){var x=70+(i%3)*325,y=1150+Math.floor(i/3)*82;text(c,h,d.dimNames[i],x,y,210,25,paper);text(c,h,String(v),x+245,y,55,25,green,mono);c.fillStyle='#343A32';c.fillRect(x,y+16,280,4);c.fillStyle=green;c.fillRect(x,y+16,280*v/100,4);});
   text(c,h,d.labels.cardFooter,70,1325,940,29,paper);
   text(c,h,d.labels.cardDisc,70,1372,940,22,'#A2A69F');
  }
 };
})();
