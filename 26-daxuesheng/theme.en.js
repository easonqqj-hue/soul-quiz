/* B09EN: complete English presentation layer. Chinese theme stays untouched. */
(function(){
"use strict";

function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
var sans='"Avenir Next","Helvetica Neue",Arial,sans-serif';
var mono='"SF Mono",Consolas,"Courier New",monospace';
var pen='"American Typewriter",Georgia,serif';
function wordLines(c,text,width){var rows=[],line='';String(text).split(/\s+/).forEach(function(word){var next=line?line+' '+word:word;if(line&&c.measureText(next).width>width){rows.push(line);line=word;}else line=next;});if(line)rows.push(line);return rows;}
function words(c,h,text,x,y,width,px,lineHeight,maxLines,family,weight){
 var longest=String(text).split(/\s+/).reduce(function(a,b){return a.length>b.length?a:b;},'');
 px=h.fit(c,longest,width,px,family,weight);c.font=h.font(px,family,weight);
 var rows=wordLines(c,text,width);
 while(rows.length>maxLines&&px>20){px-=2;c.font=h.font(px,family,weight);rows=wordLines(c,text,width);}
 rows.forEach(function(row,i){c.fillText(row,x,y+i*lineHeight);});
 return y+(rows.length-1)*lineHeight;
}
function fit(c,h,text,x,y,width,px,family,weight){var size=h.fit(c,text,width,px,family,weight);c.font=h.font(size,family,weight);c.fillText(text,x,y);}
function traits(r){return '<div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div>';}
function line(c,x,y,x2,y2,color){c.strokeStyle=color;c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke();}
function poly(c,x,y,r,n,angle){c.beginPath();for(var i=0;i<n;i++){var a=angle+i*Math.PI*2/n;i?c.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r):c.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}c.closePath();}
var portrait="<svg viewBox=\"0 0 96 112\" aria-hidden=\"true\"><rect x=\"1\" y=\"1\" width=\"94\" height=\"110\" fill=\"#EAF0F7\" stroke=\"#BFD3E6\"/><path d=\"M1 28h94M1 56h94M1 84h94M24 1v110M48 1v110M72 1v110\" stroke=\"#BFD3E6\"/><circle cx=\"48\" cy=\"40\" r=\"17\" fill=\"#FBFAF5\" stroke=\"#2B4C9B\" stroke-width=\"2\"/><path d=\"M17 103V87c0-28 62-28 62 0v16\" fill=\"#F7E463\" stroke=\"#2B4C9B\" stroke-width=\"2\"/><path d=\"M41 42h2m10 0h2M43 51q5 4 10 0\" fill=\"none\" stroke=\"#2B4C9B\" stroke-width=\"2\"/></svg>";
window.THEME_EN = {
  "colors": {
    "bg": "#FBFAF5",
    "fg": "#2B4C9B",
    "accent": "#2B4C9B",
    "muted": "#536784"
  },
  "letters": [
    "a",
    "b",
    "c",
    "d"
  ],
  "decor": "<div class=\"notebook-grid\"></div><div class=\"paper-margin\"></div>",
  "homeTop": "<div class=\"campus-sketch\"><svg viewBox=\"0 0 350 154\" aria-hidden=\"true\"><g transform=\"translate(54 20) rotate(-8 110 55)\"><rect x=\"0\" y=\"0\" width=\"230\" height=\"114\" fill=\"#FBFAF5\" stroke=\"#2B4C9B\" stroke-width=\"1.5\"/><path d=\"M26 0v114M0 28h230M0 50h230M0 72h230M0 94h230\" stroke=\"#BFD3E6\"/><path d=\"M45 36h122M45 58h95M45 80h134\" stroke=\"#2B4C9B\" stroke-width=\"2\"/><path d=\"M42 57h104\" stroke=\"#F7E463\" stroke-width=\"15\" opacity=\".7\"/><path d=\"M184 25l8 8 15-18\" fill=\"none\" stroke=\"#2B4C9B\" stroke-width=\"2.5\"/></g><g transform=\"translate(245 16) rotate(23)\"><path d=\"M0 0h16v111l-8 19-8-19z\" fill=\"#F7E463\" stroke=\"#2B4C9B\" stroke-width=\"1.5\"/><path d=\"M0 12h16M0 105h16M8 12v93\" stroke=\"#2B4C9B\" stroke-width=\"1.2\"/><path d=\"M5 122l3 8 3-8\" fill=\"#2B4C9B\"/></g><path d=\"M37 127c39 10 70 13 113 12\" fill=\"none\" stroke=\"#2B4C9B\" stroke-width=\"1.5\"/><path d=\"M298 110l3 8 9 1-7 5 1 9-7-5-8 4 3-8-6-6 9-1z\" fill=\"#FF8FB1\" stroke=\"#2B4C9B\"/></svg><span class=\"scribble\">off the syllabus</span></div>",
  "homeBottom": "<div class=\"notebook-footer\"><span>CAMPUS / 26</span><span>a note about you</span></div>",
  "ornament": "<svg class=\"pen-rule\" viewBox=\"0 0 250 10\" aria-hidden=\"true\"><path d=\"M3 5q90-5 242 1M9 9q110-4 224-1\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\"/></svg>",
  "loader": "<div class=\"campus-loader\"><svg viewBox=\"0 0 300 205\" aria-hidden=\"true\"><g transform=\"translate(22 14) rotate(-5 128 87)\"><rect x=\"12\" y=\"10\" width=\"232\" height=\"161\" rx=\"3\" fill=\"#EAF0F7\" stroke=\"#2B4C9B\" stroke-width=\"1.5\"/><path d=\"M25 26h206v129H25z\" fill=\"none\" stroke=\"#BFD3E6\"/><path d=\"M12 47h232v124H12z\" fill=\"#FBFAF5\" stroke=\"#2B4C9B\" stroke-width=\"1.5\"/><path d=\"M12 48l116 72L244 48\" fill=\"none\" stroke=\"#2B4C9B\" stroke-width=\"1.5\"/><rect x=\"79\" y=\"85\" width=\"98\" height=\"30\" fill=\"#F7E463\" transform=\"rotate(-5 128 100)\"/><text x=\"128\" y=\"106\" text-anchor=\"middle\" fill=\"#2B4C9B\" font-size=\"13\" font-family=\"Consolas,monospace\">SEALED</text><path d=\"M30 147h56m95 0h43\" stroke=\"#BFD3E6\" stroke-width=\"2\"/></g></svg></div>",
  "gateArt": "<div class=\"pw-art campus-sleeve\"><svg viewBox=\"0 0 300 205\" aria-hidden=\"true\"><g transform=\"translate(22 14) rotate(-5 128 87)\"><rect x=\"12\" y=\"10\" width=\"232\" height=\"161\" rx=\"3\" fill=\"#EAF0F7\" stroke=\"#2B4C9B\" stroke-width=\"1.5\"/><path d=\"M25 26h206v129H25z\" fill=\"none\" stroke=\"#BFD3E6\"/><path d=\"M12 47h232v124H12z\" fill=\"#FBFAF5\" stroke=\"#2B4C9B\" stroke-width=\"1.5\"/><path d=\"M12 48l116 72L244 48\" fill=\"none\" stroke=\"#2B4C9B\" stroke-width=\"1.5\"/><rect x=\"79\" y=\"85\" width=\"98\" height=\"30\" fill=\"#F7E463\" transform=\"rotate(-5 128 100)\"/><text x=\"128\" y=\"106\" text-anchor=\"middle\" fill=\"#2B4C9B\" font-size=\"13\" font-family=\"Consolas,monospace\">SEALED</text><path d=\"M30 147h56m95 0h43\" stroke=\"#BFD3E6\" stroke-width=\"2\"/></g></svg></div>",
  "pickDelay": 290,
  "loadingMs": 1900,
  qNo: function(i){return "MARGIN NOTE / "+String(i+1).padStart(2,"0");},
  heroHTML: function(r,pct,L){
return '<div class="r-hero student-id"><div class="id-band"><span>CAMPUS LIFE / STUDENT ID</span><span>'+esc(r.seal)+'</span></div><div class="id-profile"><div><div class="r-kicker">'+esc(L.resultKicker)+'</div><p class="id-caption">OFF THE SYLLABUS</p></div><div class="id-portrait">'+portrait+'</div></div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-tag">'+esc(r.tag)+'</div><dl class="id-details"><div><dt>DEPARTMENT</dt><dd>'+esc(r.college)+'</dd></div><div><dt>STUDENT NO.</dt><dd>26-32-'+esc(r.seal)+'</dd></div></dl>'+traits(r)+'<div class="id-sticky"><p class="r-quote">'+esc(r.quote)+'</p><p class="sticky-note">'+esc(r.note)+'</p></div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div><small class="id-fine">PERSONALITY PLAY / NOT AN OFFICIAL ID</small></div>';
},
  drawCard: function(c,d,h){
var r=d.r;c.fillStyle='#FBFAF5';c.fillRect(0,0,1080,1440);c.lineWidth=1;
for(var x=0;x<1080;x+=36)line(c,x,0,x,1440,'#DBE6F0');for(var y=0;y<1440;y+=36)line(c,0,y,1080,y,'#DBE6F0');line(c,64,0,64,1440,'#E9B2C3');
c.textAlign='left';c.fillStyle='#2B4C9B';c.font=h.font(43,pen,'bold');c.fillText('Campus notes',100,110);c.font=h.font(23,mono);c.fillText('OFF THE SYLLABUS',100,157);
c.fillStyle='#C4D2E2';c.fillRect(92,226,910,598);c.fillStyle='#FBFAF5';h.rr(c,80,214,910,598,12);c.fill();c.strokeStyle='#2B4C9B';c.lineWidth=2;c.stroke();
c.fillStyle='#2B4C9B';c.fillRect(80,238,910,68);c.fillStyle='#FBFAF5';c.font=h.font(26,sans,'bold');c.fillText('CAMPUS LIFE / STUDENT ID',114,282);c.textAlign='right';c.font=h.font(23,mono);c.fillText('26 / '+r.seal,956,282);
c.textAlign='left';c.fillStyle='#536784';c.font=h.font(24,mono);c.fillText('UNOFFICIAL CAMPUS TYPE',114,366);c.fillText('26-32-'+r.seal,114,416);
c.fillStyle='#EDF1F6';c.fillRect(827,332,126,126);c.strokeStyle='#2B4C9B';c.strokeRect(827,332,126,126);c.beginPath();c.arc(890,370,22,0,Math.PI*2);c.stroke();c.beginPath();c.moveTo(849,445);c.bezierCurveTo(849,397,931,397,931,445);c.stroke();
c.fillStyle='#203C7E';words(c,h,r.name,114,513,825,66,76,2,sans,'800');
c.fillStyle='#2B4C9B';words(c,h,r.tag,114,654,825,31,40,2,sans);
c.fillStyle='#536784';fit(c,h,r.college,114,745,820,25,mono);
c.fillStyle='#F7E463';c.fillRect(108,766,844,30);c.fillStyle='#203C7E';fit(c,h,r.traits.join(' / '),120,789,815,24,sans);
c.save();c.translate(540,1047);c.rotate(-.025);c.fillStyle='#E2D580';c.fillRect(-410,-177,840,356);c.fillStyle='#F7E463';c.fillRect(-418,-185,840,356);c.fillStyle='#EDA9C1';c.fillRect(-88,-202,176,34);
c.textAlign='left';c.fillStyle='#2B4C9B';c.font=h.font(24,pen);c.fillText('A NOTE TO SELF',-370,-125);words(c,h,r.quote,-370,-54,740,39,54,3,pen,'bold');words(c,h,r.note,-370,126,740,25,34,2,sans);c.restore();
c.textAlign='left';c.fillStyle='#2B4C9B';c.font=h.font(25,mono);c.fillText(d.labels.pct+' / '+d.pct+'%',100,1284);c.textAlign='right';c.fillText('NOT AN OFFICIAL ID',980,1284);
c.textAlign='center';fit(c,h,d.labels.cardFooter,540,1351,940,27,sans,'600');c.fillStyle='#536784';c.font=h.font(22,sans);c.fillText('Just for fun',540,1395);
}
};
})();
