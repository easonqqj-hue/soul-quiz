(function(){
  'use strict';
  var sans='"Helvetica Neue",Arial,sans-serif',mono='"SF Mono",Consolas,"Courier New",monospace';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function words(ctx,h,text,x,y,width,px,lineHeight,maxLines,family,weight){
    var tokens=String(text).trim().split(/\s+/),lines,size=px;
    tokens.forEach(function(word){size=Math.min(size,h.fit(ctx,word,width,size,family,weight));});
    do{ctx.font=h.font(size,family,weight);lines=[];var line='';tokens.forEach(function(word){var next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>width){lines.push(line);line=word;}else line=next;});if(line)lines.push(line);if(lines.length<=maxLines||size<=20)break;size-=2;}while(size>0);
    var step=lineHeight*size/px;lines.forEach(function(line,i){ctx.fillText(line,x,y+i*step);});return y+(lines.length-1)*step;
  }
  function barcode(){var x=0;return [2,1,3,1,1,2,4,1,2,1,3,2,1,4,1,2,3,1,1,2,4,1,2,3,1,2].map(function(w,i){var part='<rect x="'+x+'" y="0" width="'+w+'" height="'+(i%7===0?31:27)+'"/>';x+=w+2;return part;}).join('');}
  function carton(sealed){return '<svg viewBox="0 0 350 235" fill="none" aria-hidden="true"><path d="M65 38L278 16L308 44L94 68Z" fill="#DFEBE7" stroke="#56998F"/><path d="M278 16L308 44V213L278 185Z" fill="#BDDCD5" stroke="#56998F"/><path d="M65 38L278 16V185L65 207Z" fill="#FAFAF7" stroke="#56998F"/><path d="M65 38L278 16V65L65 87Z" fill="#4FA89A"/><g transform="translate(86 65) skewY(-6)"><text font-family="Arial,sans-serif" font-size="22" fill="#173C35">Love care</text><text x="0" y="43" font-family="Arial,sans-serif" font-size="22" font-weight="bold" fill="#2A2D2E">Dating habits</text><text x="0" y="65" font-family="Arial,sans-serif" font-size="13" fill="#56615E">Read the fine print.</text><text x="0" y="84" font-family="Arial,sans-serif" font-size="10" fill="#56615E">Fictional kit. Real conversation.</text><g transform="translate(0 105)" fill="#2A2D2E">'+barcode()+'</g></g>'+(sealed?'<path d="M54 112L319 84V121L54 149Z" fill="#D2423A"/><g transform="translate(113 130) skewY(-6)"><text fill="#FFFFFF" font-size="15" font-family="Arial,sans-serif">SEALED FOR YOU</text></g>':'<path d="M289 60L335 54V175L308 178" fill="#FFF" stroke="#A4BEB6"/><path d="M315 80L328 79M315 91L328 90M315 102L328 101M315 113L328 112M315 124L328 123M315 135L328 134" stroke="#A4BEB6"/>')+'</svg>';}
  window.THEME_EN={
    colors:{bg:'#FAFAF7',fg:'#2A2D2E',accent:'#2F7F70',muted:'#66736E'},cardFont:sans,
    letters:['','','',''],qNo:function(i,n){return 'Check '+String(i+1).padStart(2,'0')+' / '+n;},
    decor:window.THEME.decor,homeTop:'<div class="care-home-art">'+carton(false)+'</div>',
    homeBottom:'<div class="care-bottom"><span>Fictional care kit</span><svg viewBox="0 0 110 31" aria-hidden="true">'+barcode()+'</svg><span>Handle with honesty</span></div>',
    ornament:'<div class="care-warning">Directions: notice the habit. Try one small change.</div>',
    loader:'<div class="care-loader">'+carton(true)+'</div>',gateArt:'<div class="pw-art care-sealed">'+carton(true)+'</div>',
    heroHTML:function(r,pct,L){return '<div class="r-hero care-result"><div class="care-band"><span>Love care</span><span>Read before repeating</span></div><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-tag">'+esc(r.tag)+'</div><div class="care-formula"><small>SUGGESTED PRACTICE</small><strong>'+esc(r.remedy)+'</strong></div><div class="r-sub">'+esc(r.sub)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="care-trait-label">COMMON INGREDIENTS</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct"><span>'+esc(L.pct)+'</span><b>'+pct+'%</b><svg class="care-barcode" viewBox="0 0 110 31" aria-hidden="true">'+barcode()+'</svg></div></div>';},
    drawCard:function(ctx,d,h){
      ctx.fillStyle='#FAFAF7';ctx.fillRect(0,0,h.W,h.H);ctx.strokeStyle='#E1EAE5';ctx.lineWidth=1;
      for(var x=0;x<h.W;x+=60){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h.H);ctx.stroke();}
      ctx.save();ctx.translate(820,260);ctx.rotate(.09);ctx.fillStyle='#FFF';ctx.fillRect(-50,-30,250,940);ctx.strokeStyle='#C9DAD3';ctx.strokeRect(-50,-30,250,940);for(var y=35;y<880;y+=26){ctx.beginPath();ctx.moveTo(-20,y);ctx.lineTo(170,y);ctx.stroke();}ctx.restore();
      ctx.fillStyle='#C4DED6';ctx.beginPath();ctx.moveTo(920,118);ctx.lineTo(1002,181);ctx.lineTo(1002,1285);ctx.lineTo(920,1240);ctx.closePath();ctx.fill();ctx.strokeStyle='#579486';ctx.lineWidth=2;ctx.stroke();
      ctx.fillStyle='#FFF';ctx.fillRect(70,118,850,1125);ctx.strokeStyle='#579486';ctx.strokeRect(70,118,850,1125);
      ctx.fillStyle='#4FA89A';ctx.fillRect(70,118,850,106);ctx.textAlign='left';ctx.fillStyle='#173C35';ctx.font=h.font(43,sans,'500');ctx.fillText('Love care',120,187);ctx.textAlign='right';ctx.font=h.font(22,mono);ctx.fillText('READ BEFORE REPEATING',870,183);
      ctx.textAlign='left';ctx.fillStyle='#66736E';words(ctx,h,d.quiz.title,120,286,747,26,34,1,sans);
      ctx.fillStyle='#2A2D2E';words(ctx,h,d.r.name,116,391,750,78,86,2,sans,'700');
      ctx.fillStyle='#56635E';words(ctx,h,d.r.tag,120,554,750,31,43,2,sans);
      ctx.font=h.font(23,mono);ctx.fillStyle='#5D7266';ctx.fillText('SUGGESTED PRACTICE',120,676);
      ctx.fillStyle='#2F7F70';words(ctx,h,d.r.remedy,120,735,750,43,50,2,sans,'500');
      ctx.strokeStyle='#D2423A';ctx.lineWidth=2;ctx.strokeRect(120,842,748,161);ctx.fillStyle='#B83531';words(ctx,h,d.r.quote,144,898,700,36,47,3,sans);
      ctx.fillStyle='#5D7266';ctx.font=h.font(23,mono);ctx.fillText('COMMON INGREDIENTS',120,1066);ctx.fillStyle='#2A2D2E';words(ctx,h,d.r.traits.join(' / '),120,1110,740,27,35,2,sans);
      ctx.strokeStyle='#D6E2DC';ctx.beginPath();ctx.moveTo(120,1155);ctx.lineTo(870,1155);ctx.stroke();ctx.fillStyle='#2F7F70';ctx.font=h.font(27,sans);ctx.fillText(d.pct+'% pattern resemblance',120,1206);
      var bx=714;[3,2,5,2,1,3,4,2,1,5,3,2,3,1,4,2,3,1].forEach(function(w,i){ctx.fillStyle='#2A2D2E';ctx.fillRect(bx,1174,w,i%5===0?39:32);bx+=w+4;});
      ctx.textAlign='left';ctx.fillStyle='#B83531';words(ctx,h,'Fine print: a habit is something to work with, not your whole identity.',120,1298,820,26,35,1,sans);
      ctx.textAlign='center';ctx.fillStyle='#2A2D2E';words(ctx,h,d.labels.cardFooter,540,1367,940,26,32,1,sans);ctx.fillStyle='#66736E';words(ctx,h,d.labels.cardDisc,540,1404,920,21,25,1,sans);
    }
  };
})();
