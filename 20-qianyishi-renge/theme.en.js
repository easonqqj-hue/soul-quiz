(function(){
'use strict';
var base=window.THEME,serif='Didot,"Bodoni 72",Georgia,serif',sans='"Gill Sans","Avenir Next","Helvetica Neue",Arial,sans-serif';
function e(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
var glyphs={
  window:'M-35 45V-18a35 35 0 0 1 70 0V45Z M0-52V45 M-35-4H35 M-35 20H35 M-48 45H48',
  key:'M-34-5a21 21 0 1 1 30 19L32 50l13-13-12-12 8-8-12-12L8-16 M-25-8a8 8 0 1 0 16 0 8 8 0 1 0-16 0',
  stairs:'M-48 48H48V34H33V18H18V2H3V-14H-12V-30H-27V-46H-48Z M-27-30H-8 M-12-14H7 M3 2H22 M18 18H37',
  shell:'M-48 8C-48-50 40-60 48 2 54 48-20 62-27 20-33-12 21-23 23 8 25 25-2 26-6 13 M-44 29L-24 46',
  kite:'M0-54 39-9 0 28-39-9Z M0-54V28 M-39-9H39 M0 28C-23 42 28 44 2 62',
  scope:'M-49 16 24-24 43 9-29 49Z M14-19 33 15 M-37 9-18 42 M23-24 30-29 50 5 43 9 M2 32V56 M-17 56H22',
  bottle:'M-16-48H16V-30L34-12V48H-34V-12L-16-30Z M-16-39H16 M-24 5H24 M-24 18H24 M-10-17 14-12 7 6-17 1Z',
  lightning:'M-34-51H34V51H-34Z M8-38-20 3H-2L-9 36 22-9H3Z',
  mirror:'M0-52C-57-52-57 38 0 38S57-52 0-52Z M0 38V55 M-22 55H22 M-23-24 12-38 M-23-10 20-31 M-24 12Q0-4 24 12 M-20 24Q0 8 20 24',
  boat:'M-52 20H52L31 43H-31Z M-38 12 33-40 M25-49 42-31 M-40 53Q-20 44 0 53T40 53',
  tree:'M0-55 36-27 23-27 47 3 28 3 52 31H-52L-28 3H-47L-23-27H-36Z M0 31V57 M-15 57H15',
  stars:'M-50 0a50 50 0 1 0 100 0 50 50 0 1 0-100 0 M-55 0H55 M0-55V55 M-33 31-18-19 18 12 33-30 M-18-19 0-37 33-30 M18 12 20 38'
};
function icon(r){return '<svg class="dream-symbol" viewBox="-70 -70 140 140" aria-hidden="true"><path d="'+glyphs[r.glyph]+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';}
function words(c,h,t,x,y,w,px,leading,maxLines,fam,weight,align){
  var tokens=String(t).trim().split(/\s+/),lines=[];
  tokens.forEach(function(t){px=Math.min(px,h.fit(c,t,w,px,fam,weight));});
  function layout(){c.font=h.font(px,fam,weight);lines=[];var line='';tokens.forEach(function(t){var next=line?line+' '+t:t;if(line&&c.measureText(next).width>w){lines.push(line);line=t;}else line=next;});if(line)lines.push(line);}
  layout();while(lines.length>maxLines&&px>20){px-=2;layout();}
  c.textAlign=align||'center';lines.forEach(function(t,i){c.fillText(t,x,y+i*px*leading);});return y+(lines.length-1)*px*leading;
}
window.THEME_EN={
  colors:{bg:'#1B1433',fg:'#EDE6F7',accent:'#D8C08A',muted:'#B5ADCB'},cardFont:sans,
  letters:['I','II','III','IV'],qNo:function(i,n){return 'DREAM SCENE '+String(i+1).padStart(2,'0')+' / '+n;},
  decor:'<div class="night-dust"></div><div class="horizon-mist"></div>',
  homeTop:base.homeTop,homeBottom:'<div class="moon-caption"><span></span><i>A little daylight, after hours.</i><span></span></div>',
  ornament:'<span class="moon-divider"></span>',loader:'<div class="moon-phase" aria-label="The moon turns"></div>',gateArt:base.gateArt,
  onBuild:function(){document.querySelector('.h-chips').replaceChildren();},
  heroHTML:function(r,pct,L){return '<div class="r-hero dream-portrait"><div class="r-kicker">'+e(L.resultKicker)+'</div><div class="symbol-orbit">'+icon(r)+'</div><h1 class="r-name">'+e(r.name)+'</h1><div class="r-sub">'+e(r.symbol)+'</div><div class="r-tag">'+e(r.tag)+'</div><div class="r-quote">'+e(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+e(t)+'</span>';}).join('')+'</div><div class="r-pct">'+e(L.pct)+'<b>'+pct+'%</b></div></div>';},
  drawCard:function(c,d,h){
    c.fillStyle='#1B1433';c.fillRect(0,0,1080,1440);
    var mist=c.createRadialGradient(660,370,30,600,470,620);mist.addColorStop(0,'rgba(108,123,181,.28)');mist.addColorStop(1,'rgba(27,20,51,0)');c.fillStyle=mist;c.fillRect(0,0,1080,900);
    c.strokeStyle='rgba(216,192,138,.65)';c.lineWidth=1;c.strokeRect(42,42,996,1356);
    c.fillStyle='#D8C08A';words(c,h,d.quiz.title,540,108,890,32,1.2,1,sans,'500');
    for(var i=0;i<48;i++){c.globalAlpha=.3+(i%4)*.15;c.beginPath();c.arc((i*173+79)%980+50,(i*i*47+70)%500+145,i%3===0?2:1,0,Math.PI*2);c.fill();}c.globalAlpha=1;
    c.strokeStyle='rgba(216,192,138,.3)';c.beginPath();c.arc(570,345,198,0,Math.PI*2);c.stroke();
    var moon=c.createRadialGradient(510,280,15,570,345,165);moon.addColorStop(0,'#FAF4E5');moon.addColorStop(1,'#D1C7E1');c.fillStyle=moon;c.beginPath();c.arc(570,345,165,0,Math.PI*2);c.fill();
    c.save();c.translate(570,342);c.scale(1.65,1.65);c.strokeStyle='#3A3154';c.lineWidth=2;c.lineCap='round';c.lineJoin='round';c.stroke(new Path2D(glyphs[d.r.glyph]));c.restore();
    for(var s=0;s<8;s++){var x=165+s*47,y=660-s*21;c.fillStyle=s%2?'#636A99':'#737DAA';c.fillRect(x,y,47,26+s*21);c.strokeStyle='#B0B7D5';c.beginPath();c.moveTo(x,y);c.lineTo(x+47,y);c.stroke();}
    c.fillStyle='#1B1433';c.fillRect(70,689,940,620);c.strokeStyle='rgba(216,192,138,.3)';c.beginPath();c.moveTo(115,689);c.lineTo(965,689);c.stroke();
    c.fillStyle='#B5ADCB';words(c,h,d.r.symbol,540,731,830,28,1.2,1,sans,'400');
    c.fillStyle='#EDE6F7';words(c,h,d.r.name,540,832,860,88,1.05,2,serif,'normal');
    c.fillStyle='#D8C08A';words(c,h,d.r.tag,540,978,810,33,1.3,2,serif,'normal');
    c.fillStyle='#EDE6F7';words(c,h,d.r.quote,540,1087,810,40,1.3,2,serif,'normal');
    c.fillStyle='#B5ADCB';words(c,h,d.r.traits.join('  /  '),540,1213,810,27,1.3,2,sans,'400');
    c.fillStyle='#D8C08A';words(c,h,d.labels.pct+'  '+d.pct+'%',540,1302,860,28,1.2,1,sans,'500');
    c.fillStyle='#EDE6F7';words(c,h,d.labels.cardFooter,540,1350,900,27,1.2,1,serif,'normal');
    c.fillStyle='#B5ADCB';words(c,h,d.labels.cardDisc,540,1380,900,21,1.1,1,sans,'400');
  },pickDelay:330,loadingMs:2100
};
})();
