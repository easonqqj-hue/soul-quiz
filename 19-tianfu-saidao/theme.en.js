(function(){
'use strict';
var base=window.THEME;
var sans='"Avenir Next","Helvetica Neue",Arial,sans-serif';
var display='Futura,"Arial Black",Arial,sans-serif';
var mono='"SF Mono",Consolas,"Courier New",monospace';
function e(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
// Word wrapping preserves whole words. h.fit handles an unusually long single word.
function words(c,h,t,x,y,w,px,leading,maxLines,fam,weight,align){
  var tokens=String(t).trim().split(/\s+/),lines=[];
  tokens.forEach(function(t){px=Math.min(px,h.fit(c,t,w,px,fam,weight));});
  function layout(){c.font=h.font(px,fam,weight);lines=[];var line='';tokens.forEach(function(t){var next=line?line+' '+t:t;if(line&&c.measureText(next).width>w){lines.push(line);line=t;}else line=next;});if(line)lines.push(line);}
  layout();while(lines.length>maxLines&&px>20){px-=2;layout();}
  c.textAlign=align||'left';lines.forEach(function(t,i){c.fillText(t,x,y+i*px*leading);});
  return y+(lines.length-1)*px*leading;
}
window.THEME_EN={
  colors:{bg:'#C8432F',fg:'#FFFFFF',accent:'#E3FF3C',muted:'#F5D4CA'},cardFont:sans,
  letters:['01','02','03','04'],qNo:function(i,n){return 'LAP '+String(i+1).padStart(2,'0')+' / '+n;},
  decor:'<div class="track-background"></div>',
  homeTop:base.homeTop,
  homeBottom:'<div class="track-caption"><span>There is more than one way to move.</span><b>RUN YOUR WAY.</b></div>',
  ornament:'<span class="race-rule"></span>',
  loader:'<div class="race-loader"><span>PHOTO FINISH</span><i></i></div>',
  gateArt:'<div class="pw-art sealed-bib" aria-label="A sealed race bib"><span class="bib-eyebrow">ATHLETE / YOU</span><b>— —</b><span class="sealed-strip">YOUR LANE / STILL SEALED</span><i></i></div>',
  onBuild:function(){document.querySelector('.h-chips').replaceChildren();},
  heroHTML:function(r,pct,L){return '<div class="r-hero race-bib"><div class="bib-head"><span>'+e(L.resultKicker)+'</span><span>PERSONAL LANE</span></div><div class="bib-number">'+e(r.seal)+'</div><h1 class="r-name">'+e(r.name)+'</h1><div class="r-sub">'+e(r.sub)+'</div><div class="r-tag">'+e(r.tag)+'</div><div class="bib-pace"><small>YOUR WORKING PACE</small><b>'+e(r.pace)+'</b></div><div class="r-quote">'+e(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+e(t)+'</span>';}).join('')+'</div><div class="r-pct">'+e(L.pct)+'<b>'+pct+'%</b></div></div>';},
  drawCard:function(c,d,h){
    var r=d.r;c.fillStyle='#C8432F';c.fillRect(0,0,1080,1440);
    c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=3;
    for(var i=0;i<6;i++){c.beginPath();c.moveTo(-230+i*110,1440);c.lineTo(440+i*110,0);c.stroke();}
    c.fillStyle='#0B0B0B';c.fillRect(0,0,1080,140);c.fillStyle='#E3FF3C';
    words(c,h,d.quiz.title,68,84,944,34,1.2,1,sans,'700');
    c.fillStyle='#FFFDF6';c.fillRect(68,190,944,1140);
    c.strokeStyle='#B8B6AE';c.lineWidth=2;c.setLineDash([6,8]);c.strokeRect(88,210,904,1100);c.setLineDash([]);
    [[106,228],[974,228],[106,1292],[974,1292]].forEach(function(p){c.fillStyle='#0B0B0B';c.beginPath();c.arc(p[0],p[1],7,0,Math.PI*2);c.fill();});
    c.fillStyle='#0B0B0B';c.font=h.font(25,mono,'bold');c.textAlign='left';c.fillText('ATHLETE / YOU',130,270);c.textAlign='right';c.fillText('14 LANES / ONE YOU',950,270);
    c.textAlign='center';c.font='italic 900 190px '+display;c.fillText(r.seal,540,450);
    c.fillStyle='#C8432F';words(c,h,r.name,540,570,800,84,1.05,2,display,'900','center');
    c.fillStyle='#5C5A54';words(c,h,r.sub,540,700,800,29,1.2,1,sans,'600','center');
    c.fillStyle='#0B0B0B';words(c,h,r.tag,540,755,780,32,1.25,2,sans,'600','center');
    c.fillStyle='#E3FF3C';c.fillRect(130,829,820,70);c.fillStyle='#0B0B0B';words(c,h,r.pace,540,873,780,28,1.2,1,sans,'700','center');
    words(c,h,r.quote,540,970,770,42,1.24,2,display,'700','center');
    c.fillStyle='#5C5A54';words(c,h,r.traits.join('  /  '),540,1100,790,27,1.3,2,sans,'500','center');
    c.strokeStyle='#0B0B0B';c.beginPath();c.moveTo(130,1160);c.lineTo(950,1160);c.stroke();
    c.fillStyle='#0B0B0B';c.textAlign='left';c.font=h.font(23,mono);c.fillText('LANE FIT',130,1210);c.font='italic 900 64px '+display;c.fillText(d.pct+'%',130,1280);
    c.textAlign='right';c.font=h.font(23,sans);c.fillText('Direction to explore.',950,1210);c.font='italic 900 37px '+display;c.fillText('RUN YOUR WAY.',950,1272);
    c.fillStyle='#FFFFFF';words(c,h,d.labels.cardFooter,540,1380,940,25,1.1,1,sans,'600','center');words(c,h,d.labels.cardDisc,540,1414,940,21,1.1,1,sans,'400','center');
  },pickDelay:240,loadingMs:2050
};
})();
