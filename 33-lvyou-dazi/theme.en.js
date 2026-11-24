(function(){
 'use strict';
 var sans='"Gill Sans","Trebuchet MS",Arial,sans-serif',serif='Georgia,"Times New Roman",serif',mono='Consolas,"Courier New",monospace';
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
 function words(c,h,t,x,y,w,px,lh,max,fam,weight){var tokens=String(t).trim().split(/\s+/),lines,size=px;do{c.font=h.font(size,fam,weight);tokens.forEach(function(word){size=Math.min(size,h.fit(c,word,w,size,fam,weight));});c.font=h.font(size,fam,weight);lines=[''];tokens.forEach(function(word){var i=lines.length-1,next=lines[i]?lines[i]+' '+word:word;if(c.measureText(next).width>w&&lines[i])lines.push(word);else lines[i]=next;});if(lines.length<=max||size<=20)break;size-=2;}while(true);var step=lh*size/px;lines.forEach(function(line,i){h.fit(c,line,w,size,fam,weight);c.fillText(line,x,y+i*step);});return y+(lines.length-1)*step;}
 function text(c,h,t,x,y,w,px,color,fam,weight){c.fillStyle=color;c.font=h.font(px,fam||sans,weight);h.fit(c,t,w,px,fam||sans,weight);c.fillText(t,x,y);}
 function guilloche(){var s='<svg viewBox="0 0 420 260" fill="none" aria-hidden="true">';for(var i=0;i<22;i++){var p='';for(var x=0;x<=420;x+=4){var y=30+i*9+Math.sin(x/37+i*.2)*17+Math.sin(x/83)*13;p+=(x?'L':'M')+x+','+y.toFixed(1);}s+='<path d="'+p+'" stroke="currentColor" stroke-width=".7"/>';}return s+'</svg>';}
 var pattern=guilloche(),compass='<svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="43"/><circle cx="50" cy="50" r="35"/><path d="M50 3V14M50 86V97M3 50H14M86 50H97M19 19L26 26M74 74L81 81M19 81L26 74M74 26L81 19M50 21L58 43L79 50L58 57L50 79L43 57L21 50L43 43ZM50 21V50L79 50M50 79V50L21 50"/><circle cx="50" cy="50" r="4"/></svg>';
 function mrz(r){return ['P<TRV<'+r.name.toUpperCase().replace(/[^A-Z]/g,'<'),'SOUVENIR<<'+r.id.toUpperCase().replace(/[^A-Z]/g,'<')+'<<YOUR<WAY'].map(function(s){return s.slice(0,36).padEnd(36,'<');});}
 window.THEME_EN={
  colors:{bg:'#F7F5EE',fg:'#1E2D4F',accent:'#2E7D5B',muted:'#68766E'},cardFont:sans,letters:['A','B','C','D'],qNo:function(i,n){return '<span class="entry-stamp">'+String(i+1).padStart(2,'0')+'</span> TRIP MOMENT / '+n;},
  decor:'<div class="passport-background">'+pattern+pattern+'</div><div class="passport-margin"></div>',
  homeTop:'<div class="passport-book"><div class="passport-spine">TRAVEL COMPANION</div><div class="passport-leaf"><div class="visa-lines">'+pattern+'</div><span class="passport-leaf-head">THE TRAVEL BUDDY EDITION</span><div class="passport-emblem">'+compass+'</div><b>PASSPORT</b><small>YOUR WAY, YOUR JOURNEY.</small><div class="entry-seal">LET’S GO<span>ANYWHERE GOOD</span></div></div></div>',
  ornament:'<div class="passport-route"><span>HOME</span><i></i><b>?</b><i></i><span>SOMEWHERE</span></div>',
  homeBottom:'<div class="passport-home-foot">A little self-discovery before departure.<span>PERSONAL EDITION / SOUVENIR ONLY</span></div>',
  loader:'<div class="visa-loader"><div>'+compass+'</div><span>PREPARING YOUR TRAVEL VISA</span></div>',
  gateArt:'<div class="pw-art passport-closed" aria-hidden="true"><div class="passport-cover-line"></div><span>TRAVEL COMPANION</span>'+compass+'<b>PASSPORT</b><small>YOUR TRAVEL STORY, SEALED</small><div class="passport-lockband">READY TO OPEN</div></div>',
  heroHTML:function(r,pct,L){return '<div class="r-hero"><div class="visa-lines">'+pattern+'</div><div class="visa-header"><b>VISA</b><span>TRAVEL BUDDY / SOUVENIR</span></div><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="visa-fields"><div><small>ISSUED AT</small><b>'+esc(r.issue)+'</b></div><div><small>VALID FOR</small><b>Your next good story</b></div></div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="visa-bottom"><div class="visa-approved">YOUR WAY<span>GO SOMEWHERE GOOD</span></div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div><div class="visa-mrz" aria-label="Decorative souvenir code containing your travel type">'+mrz(r).map(function(t){return '<div>'+esc(t)+'</div>';}).join('')+'</div></div>';},
  drawCard:function(c,d,h){
   var navy='#1E2D4F',green='#2E7D5B',paper='#F7F5EE';c.fillStyle=navy;c.fillRect(0,0,h.W,h.H);c.fillStyle=paper;c.fillRect(34,34,1012,1372);
   c.save();c.beginPath();c.rect(52,50,976,1320);c.clip();c.strokeStyle='#B8CEBD';c.lineWidth=1;c.globalAlpha=.45;for(var j=0;j<50;j++){c.beginPath();for(var x=42;x<1040;x+=6){var y=110+j*25+Math.sin(x/56+j*.17)*19+Math.cos(x/101)*17;if(x===42)c.moveTo(x,y);else c.lineTo(x,y);}c.stroke();}c.restore();
   c.fillStyle=navy;c.fillRect(34,34,1012,102);c.textAlign='left';text(c,h,d.quiz.title,77,99,925,31,paper);
   text(c,h,'VISA',77,250,600,100,navy,serif,'700');text(c,h,'THE TRAVEL BUDDY EDITION',80,295,640,24,navy,mono);
   c.save();c.translate(882,234);c.rotate(-.12);c.strokeStyle='#6D4C9F';c.lineWidth=3;c.strokeRect(-104,-57,208,114);c.strokeRect(-97,-50,194,100);c.textAlign='center';text(c,h,'YOUR WAY',0,-13,174,29,'#6D4C9F',sans,'700');text(c,h,'SOUVENIR ONLY',0,35,174,18,'#6D4C9F',mono);c.restore();c.textAlign='left';
   c.fillStyle=navy;words(c,h,d.r.name,77,420,923,86,98,2,serif,'700');
   c.fillStyle=green;words(c,h,d.r.tag,80,575,920,32,42,2,sans,'600');
   c.strokeStyle='#9FB8A7';c.lineWidth=2;c.beginPath();c.moveTo(80,638);c.lineTo(1000,638);c.stroke();
   text(c,h,'ISSUED AT',80,679,435,22,'#68766E',mono);text(c,h,'VALID FOR',570,679,430,22,'#68766E',mono);
   text(c,h,d.r.issue,80,722,435,30,navy);text(c,h,'Your next good story',570,722,430,30,navy);
   c.fillStyle=navy;words(c,h,d.r.quote,80,797,920,37,48,2,serif);
   text(c,h,d.r.traits.join(' / '),80,901,920,27,green);
   d.dims.forEach(function(v,i){var x=80+(i%2)*488,y=963+Math.floor(i/2)*60;text(c,h,d.dimNames[i],x,y,230,24,navy);text(c,h,String(v),x+357,y,70,24,green,mono);c.fillStyle='#D9E6DC';c.fillRect(x,y+12,425,6);c.fillStyle=green;c.fillRect(x,y+12,425*v/100,6);});
   c.fillStyle='#D9E6DC';c.fillRect(60,1190,960,112);var codes=mrz(d.r);text(c,h,codes[0],80,1234,920,34,navy,mono);text(c,h,codes[1],80,1280,920,34,navy,mono);
   text(c,h,d.labels.cardFooter,80,1346,745,26,navy);c.textAlign='right';text(c,h,d.pct+'% MATCH',1000,1346,155,23,green,mono);c.textAlign='left';text(c,h,d.labels.cardDisc,80,1383,920,22,'#68766E');
  }
 };
})();
