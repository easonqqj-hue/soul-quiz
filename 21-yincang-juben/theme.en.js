(function(){
'use strict';
var base=window.THEME,mono='"American Typewriter","Courier New",monospace',sans='"Helvetica Neue",Arial,sans-serif',serif='Georgia,"Times New Roman",serif';
function e(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function words(c,h,t,x,y,w,px,leading,maxLines,fam,weight,align){
  var tokens=String(t).trim().split(/\s+/),lines=[];
  tokens.forEach(function(t){px=Math.min(px,h.fit(c,t,w,px,fam,weight));});
  function layout(){c.font=h.font(px,fam,weight);lines=[];var line='';tokens.forEach(function(t){var next=line?line+' '+t:t;if(line&&c.measureText(next).width>w){lines.push(line);line=t;}else line=next;});if(line)lines.push(line);}
  layout();while(lines.length>maxLines&&px>20){px-=2;layout();}
  c.textAlign=align||'left';lines.forEach(function(t,i){c.fillText(t,x,y+i*px*leading);});return y+(lines.length-1)*px*leading;
}
window.THEME_EN={
  colors:{bg:'#C9A97A',fg:'#1F1E1C',accent:'#A3231F',muted:'#665339'},cardFont:sans,
  letters:['A','B','C','D'],qNo:function(i,n){return 'STATEMENT '+String(i+1).padStart(2,'0')+' / '+n;},
  decor:'<div class="archive-grid"></div>',homeTop:base.homeTop,
  homeBottom:'<div class="archive-footer"><span>ADDRESSEE: YOU</span><span>STATUS: AWAITING STATEMENT</span></div>',
  ornament:'<div class="archive-rule"><i></i><span>THE SMALL DECISIONS LEAVE CLUES</span></div>',
  loader:'<div class="file-loader"><span>SORTING STATEMENTS</span><b>FILED</b><i></i></div>',
  gateArt:'<div class="pw-art sealed-folder"><svg viewBox="0 0 270 240" aria-label="A sealed personal file" role="img"><path d="M22 32h226v184H22Z" fill="#D8BA8B" stroke="#70583B"/><path d="m22 32 113 77L248 32" fill="#C5A270" stroke="#70583B"/><path d="m22 216 79-61M248 216l-79-61" stroke="#70583B" opacity=".5"/><path d="M135 85v88" stroke="#6A4D30" stroke-width="2"/><circle cx="135" cy="120" r="32" fill="#A3231F"/><circle cx="135" cy="120" r="25" fill="none" stroke="#D08B65"/><path d="M122 111h26M125 119h20M128 127h14" stroke="#D8BA8B"/><rect x="53" y="174" width="164" height="27" fill="#E8C547"/><text x="135" y="192" text-anchor="middle" fill="#1F1E1C" font-family="Courier New,monospace" font-size="12" letter-spacing="2">STILL SEALED</text><text x="135" y="22" text-anchor="middle" fill="#70583B" font-family="Courier New,monospace" font-size="11" letter-spacing="2">FOR YOUR EYES ONLY</text></svg></div>',
  onBuild:function(){document.querySelector('.h-chips').replaceChildren();},
  heroHTML:function(r,pct,L){return '<div class="r-hero case-report"><div class="case-top"><span>PERSONAL FILE / UNSEALED</span><b>'+e(r.seal)+'</b></div><div class="r-kicker">'+e(L.resultKicker)+'</div><h1 class="r-name">'+e(r.name)+'</h1><div class="r-sub">'+e(r.sub)+'</div><div class="r-tag">'+e(r.tag)+'</div><div class="case-clues"><h2>THREE KEY CLUES</h2>'+r.clues.map(function(t,i){return '<p><b>0'+(i+1)+'</b><span>'+e(t)+'</span></p>';}).join('')+'</div><div class="r-quote">'+e(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+e(t)+'</span>';}).join('')+'</div><div class="r-pct">'+e(L.pct)+'<b>'+pct+'%</b></div><span class="filed-stamp">FILED</span></div>';},
  drawCard:function(c,d,h){
    c.fillStyle='#C9A97A';c.fillRect(0,0,1080,1440);h.noise(c,13000,'rgba(50,30,10,A)',21);
    c.strokeStyle='#79603F';c.lineWidth=2;c.strokeRect(48,48,984,1344);
    c.fillStyle='#BE9A67';c.beginPath();c.moveTo(48,48);c.lineTo(540,270);c.lineTo(1032,48);c.closePath();c.fill();c.stroke();
    c.fillStyle='#1F1E1C';words(c,h,d.quiz.title,91,112,785,32,1.2,1,sans,'600');
    c.font=h.font(23,mono);c.textAlign='left';c.fillText('PERSONAL CASE / 32 STATEMENTS',91,160);
    c.save();c.translate(760,224);c.rotate(-.14);c.strokeStyle='#A3231F';c.lineWidth=4;c.strokeRect(-190,-35,380,72);c.fillStyle='#A3231F';c.textAlign='center';c.font=h.font(35,mono,'bold');c.fillText('CONFIDENTIAL',0,13);c.restore();
    c.strokeStyle='#1F1E1C';c.lineWidth=5;c.beginPath();c.moveTo(927,87);c.lineTo(927,170);c.bezierCurveTo(927,206,977,206,977,170);c.lineTo(977,76);c.bezierCurveTo(977,49,944,49,944,76);c.lineTo(944,163);c.bezierCurveTo(944,178,960,178,960,163);c.lineTo(960,96);c.stroke();
    c.fillStyle='#EDE1CA';c.fillRect(91,315,898,886);c.strokeStyle='#A18D6E';c.lineWidth=1;c.strokeRect(91,315,898,886);
    c.fillStyle='#665339';c.font=h.font(23,mono);c.textAlign='left';c.fillText('FILE / '+d.r.seal,130,374);c.textAlign='right';c.fillText('SUBJECT / YOU',950,374);
    c.fillStyle='#1F1E1C';words(c,h,d.r.name,130,466,810,78,1.1,2,serif,'bold');
    c.fillStyle='#A3231F';words(c,h,d.r.tag,130,620,810,32,1.3,2,sans,'600');
    c.fillStyle='#E8C547';c.fillRect(130,692,302,40);c.fillStyle='#1F1E1C';c.font=h.font(23,mono,'bold');c.textAlign='left';c.fillText('THREE KEY CLUES',147,720);
    d.r.clues.forEach(function(t,i){var y=780+i*85;c.fillStyle='#A3231F';c.font=h.font(25,mono,'bold');c.fillText('0'+(i+1),130,y);c.fillStyle='#1F1E1C';words(c,h,t,187,y,755,28,1.2,2,sans,'400');c.strokeStyle='#C6B28E';c.beginPath();c.moveTo(130,y+47);c.lineTo(950,y+47);c.stroke();});
    c.fillStyle='#1F1E1C';words(c,h,d.r.quote,130,1062,810,38,1.26,2,serif,'bold');
    c.fillStyle='#665339';words(c,h,d.r.traits.join(' / '),130,1164,810,25,1.2,1,sans,'400');
    c.fillStyle='#1F1E1C';c.font=h.font(25,mono);c.textAlign='left';c.fillText('CLUE MATCH / '+d.pct+'%',91,1252);c.font=h.font(22,mono);c.fillText('STORY SUBJECT TO CHANGE.',91,1298);
    c.save();c.translate(849,1270);c.rotate(-.12);c.strokeStyle='#A3231F';c.lineWidth=4;c.strokeRect(-108,-46,216,92);c.fillStyle='#A3231F';c.textAlign='center';c.font=h.font(43,mono,'bold');c.fillText('FILED',0,14);c.restore();
    c.fillStyle='#1F1E1C';words(c,h,d.labels.cardFooter,540,1350,900,26,1.2,1,sans,'500','center');c.fillStyle='#665339';words(c,h,d.labels.cardDisc,540,1381,900,21,1.1,1,sans,'400','center');
  },pickDelay:270,loadingMs:2050
};
})();
