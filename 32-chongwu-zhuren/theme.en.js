(function(){
 'use strict';
 var sans='"Trebuchet MS","Avenir Next",Arial,sans-serif',title='"Avenir Next","Trebuchet MS",Arial,sans-serif';
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
 function words(c,h,t,x,y,w,px,lh,max,fam,weight){var tokens=String(t).trim().split(/\s+/),lines,size=px;do{c.font=h.font(size,fam,weight);tokens.forEach(function(word){size=Math.min(size,h.fit(c,word,w,size,fam,weight));});c.font=h.font(size,fam,weight);lines=[''];tokens.forEach(function(word){var i=lines.length-1,next=lines[i]?lines[i]+' '+word:word;if(c.measureText(next).width>w&&lines[i])lines.push(word);else lines[i]=next;});if(lines.length<=max||size<=20)break;size-=2;}while(true);var step=lh*size/px;lines.forEach(function(line,i){h.fit(c,line,w,size,fam,weight);c.fillText(line,x,y+i*step);});return y+(lines.length-1)*step;}
 function text(c,h,t,x,y,w,px,color,fam,weight){c.fillStyle=color;c.font=h.font(px,fam||sans,weight);h.fit(c,t,w,px,fam||sans,weight);c.fillText(t,x,y);}
 var paw='<svg viewBox="0 0 92 84" fill="currentColor" aria-hidden="true"><ellipse cx="21" cy="25" rx="8" ry="11" transform="rotate(-24 21 25)"/><ellipse cx="40" cy="15" rx="8" ry="11"/><ellipse cx="59" cy="19" rx="8" ry="11" transform="rotate(18 59 19)"/><ellipse cx="74" cy="34" rx="7" ry="10" transform="rotate(35 74 34)"/><path d="M24 56C24 46 33 43 38 35C43 27 53 30 57 39C61 48 69 51 66 60C63 72 53 66 46 66C38 66 22 71 24 56Z"/></svg>';
 var portrait='<svg viewBox="0 0 200 170" fill="none" aria-hidden="true"><path d="M23 136C30 105 60 101 87 113M99 133C107 103 142 100 178 128" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M43 100C19 81 24 50 47 49L55 29L76 45L100 34L102 66C112 96 89 116 65 112Z" fill="#EBD6B9" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M109 76C108 46 148 37 162 63L173 99C162 122 118 119 109 95Z" fill="#FFF9F0" stroke="currentColor" stroke-width="3"/><path d="M112 59C94 46 96 80 106 88M157 58C179 42 188 74 173 88" fill="#B5733E" stroke="currentColor" stroke-width="3"/><path d="M53 76L59 78M80 75L86 73M129 81H132M151 81H154M67 87L72 87L69 92Z M139 91L145 91L142 95Z M61 98Q69 105 78 97M134 101Q142 107 151 100" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
 function drawPaw(c,x,y,s,color){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle=color;[[21,25,8,11,-.42],[40,15,8,11,0],[59,19,8,11,.32],[74,34,7,10,.6]].forEach(function(p){c.beginPath();c.ellipse(p[0],p[1],p[2],p[3],p[4],0,Math.PI*2);c.fill();});c.beginPath();c.moveTo(24,56);c.bezierCurveTo(24,46,33,43,38,35);c.bezierCurveTo(43,27,53,30,57,39);c.bezierCurveTo(61,48,69,51,66,60);c.bezierCurveTo(63,72,53,66,46,66);c.bezierCurveTo(38,66,22,71,24,56);c.fill();c.restore();}
 window.THEME_EN={
  colors:{bg:'#F6E6D2',fg:'#4A3426',accent:'#945A2E',muted:'#81644E'},cardFont:sans,letters:['A','B','C','D'],qNo:function(i,n){return 'HOME LIFE / '+String(i+1).padStart(2,'0')+' OF '+n;},
  decor:'<div class="felt-light"></div><div class="paw-corner">'+paw+'</div>',
  homeTop:'<div class="pet-home-id"><div class="pet-clip"></div><div class="pet-home-head"><span>PET PARENT LICENSE</span><span>HUMAN EDITION</span></div><div class="pet-portrait">'+portrait+'</div><div class="pet-home-copy"><span>THE HOUSEHOLD FILE</span><b>Good human.<br>Many quirks.</b><small>Awaiting a paw review.</small></div><div class="pet-home-seal">'+paw+'</div></div>',
  ornament:'<div class="yarn-line"><i></i><svg viewBox="0 0 34 34" fill="none" aria-hidden="true"><circle cx="17" cy="17" r="13"/><path d="M6 11C16 8 24 12 28 21M5 18C15 14 23 18 25 26M10 6C8 15 12 25 21 29M18 4C14 14 19 22 29 24"/></svg><i></i></div>',
  homeBottom:'<div class="pet-bottom">Issued by the unofficial household committee.</div>',
  loader:'<div class="pet-loader">'+paw+'<span>One final paw print.</span></div>',
  gateArt:'<div class="pw-art pet-sleeve" aria-hidden="true"><div class="pet-secret-card"><span>HUMAN LICENSE</span><i>Your household file</i></div><div class="pet-sleeve-front"><span>PAW REVIEW COMPLETE</span><div class="pet-emboss">'+paw+'</div><small>THE FULL READ IS INSIDE</small></div><div class="pet-tape">FOR MY HUMAN</div></div>',
  heroHTML:function(r,pct,L){return '<div class="r-hero"><div class="pet-id-head"><span>PET PARENT LICENSE</span>'+paw+'</div><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="pet-review"><small>A completely unofficial pet review</small><p>“'+esc(r.review)+'”</p></div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div><div class="pet-cert-footer"><span>SOUVENIR LICENSE</span><span>PAW APPROVED</span></div></div>';},
  drawCard:function(c,d,h){
   c.fillStyle='#F6E6D2';c.fillRect(0,0,h.W,h.H);c.fillStyle='#FFF9F0';c.shadowColor='#91654230';c.shadowBlur=30;c.shadowOffsetY=12;h.rr(c,55,92,970,1260,48);c.fill();c.shadowBlur=0;c.shadowOffsetY=0;
   c.strokeStyle='#D9BA96';c.lineWidth=7;h.rr(c,75,112,930,1220,34);c.stroke();c.strokeStyle='#DEC7AB';c.lineWidth=2;c.setLineDash([4,8]);h.rr(c,94,132,892,1180,23);c.stroke();c.setLineDash([]);
   c.fillStyle='#B5733E';h.rr(c,443,50,194,110,26);c.fill();c.fillStyle='#F6E6D2';h.rr(c,471,78,138,17,8);c.fill();c.textAlign='left';
   text(c,h,d.quiz.title,125,221,664,29,'#4A3426',sans);
   text(c,h,'PET PARENT LICENSE',125,270,664,27,'#81644E',title,'700');
   c.strokeStyle='#648447';c.lineWidth=3;c.beginPath();c.arc(870,241,63,0,Math.PI*2);c.stroke();drawPaw(c,824,200,1,'#648447');
   c.fillStyle='#4A3426';words(c,h,d.r.name,125,400,826,84,94,2,title,'800');
   c.fillStyle='#8B532C';words(c,h,d.r.tag,125,548,826,30,41,2,sans,'600');
   c.strokeStyle='#DDC8AD';c.lineWidth=2;c.beginPath();c.moveTo(125,606);c.lineTo(955,606);c.stroke();
   c.fillStyle='#4A3426';words(c,h,d.r.quote,125,662,826,37,48,2,title,'700');
   c.fillStyle='#EFF1E3';h.rr(c,118,751,844,142,22);c.fill();
   text(c,h,'THE UNOFFICIAL PET REVIEW',143,789,792,22,'#5D734B',title,'600');
   c.fillStyle='#4A3426';words(c,h,d.r.review,143,833,792,28,37,2,sans);
   text(c,h,d.r.traits.join(' / '),125,943,826,26,'#8B532C');
   d.dims.forEach(function(v,i){var x=125+(i%2)*435,y=1003+Math.floor(i/2)*62;text(c,h,d.dimNames[i],x,y,225,24,'#4A3426');text(c,h,String(v),x+300,y,56,24,'#81644E');c.fillStyle='#E6D5BE';c.fillRect(x,y+13,355,6);c.fillStyle='#B5733E';c.fillRect(x,y+13,355*v/100,6);});
   text(c,h,'STYLE MATCH / '+d.pct+'%',560,1189,355,24,'#648447',title,'600');
   c.strokeStyle='#DDC8AD';c.beginPath();c.moveTo(125,1232);c.lineTo(955,1232);c.stroke();
   text(c,h,d.labels.cardFooter,125,1264,826,26,'#4A3426');text(c,h,d.labels.cardDisc,125,1300,826,21,'#81644E');
   c.textAlign='center';text(c,h,'Every home has its own little habits.',540,1396,950,26,'#70523C');
  }
 };
})();
