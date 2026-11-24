(function(){
 'use strict';
 var serif='Georgia,"Times New Roman",serif',sans='"Gill Sans","Trebuchet MS",Arial,sans-serif';
 function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
 function crest(mark){return '<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M24 28Q100 8 176 28V107Q176 166 100 204Q24 166 24 107Z" fill="#213C4A" stroke="#B99A62" stroke-width="3"/><path d="M36 38Q100 22 164 38V107Q164 157 100 190Q36 157 36 107Z" fill="none" stroke="#B99A62"/><path d="M100 43V153M69 75L100 44L131 75M69 120L100 151L131 120" fill="none" stroke="#B99A62" stroke-width="2"/><path d="M55 92H145V126H55Z" fill="#213C4A"/><text x="100" y="116" text-anchor="middle" fill="#F0E6CF" font-size="25" font-family="Georgia,serif">'+esc(mark)+'</text></svg>';}
 function wrapWords(ctx,h,text,x,y,width,size,lineHeight,maxLines,family,weight){
  var words=String(text).split(/\s+/),longest=words.reduce(function(a,b){return a.length>b.length?a:b;},'');
  size=h.fit(ctx,longest,width,size,family,weight);var lines;
  do{ctx.font=h.font(size,family,weight);lines=[];var line='';words.forEach(function(word){var next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>width){lines.push(line);line=word;}else line=next;});if(line)lines.push(line);if(lines.length<=maxLines)break;size-=2;}while(size>20);
  var leading=Math.min(lineHeight,size*1.28);lines.forEach(function(line,i){ctx.fillText(line,x,y+i*leading);});return y+(lines.length-1)*leading;
 }
 function shield(ctx,x,y,size,mark,h){ctx.save();ctx.translate(x,y);ctx.scale(size/200,size/200);ctx.beginPath();ctx.moveTo(24,28);ctx.quadraticCurveTo(100,8,176,28);ctx.lineTo(176,107);ctx.quadraticCurveTo(176,166,100,204);ctx.quadraticCurveTo(24,166,24,107);ctx.closePath();ctx.fillStyle='#213C4A';ctx.fill();ctx.strokeStyle='#B99A62';ctx.lineWidth=3;ctx.stroke();ctx.fillStyle='#F0E6CF';ctx.textAlign='center';ctx.font=h.font(44,serif);ctx.fillText(mark,100,123);ctx.restore();}
 window.THEME_EN={
  colors:{bg:'#142735',fg:'#F0E6CF',accent:'#B99A62',muted:'#B4B8B4'},cardFont:sans,letters:['I','II','III','IV'],qNo:function(i,n){return 'Article '+String(i+1).padStart(2,'0')+' / '+n;},pickDelay:460,loadingMs:2000,
  decor:'<div class="en-order-grain"></div><div class="en-order-banner left"></div><div class="en-order-banner right"></div>',
  homeTop:'<div class="en-charter-top"><span>By character, not by birthright</span><i></i></div><div class="en-home-crest">'+crest('XII')+'</div>',homeBottom:'<div class="en-charter-bottom">Twelve orders. A place worth belonging.</div>',
  ornament:'<span class="en-charter-rule"><i></i><b></b><i></i></span>',
  loader:'<div class="en-order-loader">'+crest('XII')+'<span>The council is deliberating</span></div>',
  gateArt:'<div class="pw-art en-sealed-charter" aria-hidden="true"><span class="en-envelope-title">A LETTER OF<br>RECRUITMENT</span><span class="en-envelope-fold"></span><span class="en-wax">'+crest('XII')+'</span><span class="en-envelope-note">Reserved for the applicant</span></div>',
  heroHTML:function(r,pct,L){return '<div class="r-hero en-order-charter"><div class="en-result-crest">'+crest(r.seal)+'</div><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct"><span>'+esc(L.pct)+'</span><b>'+pct+'%</b></div><div class="en-charter-signoff">An invitation to make your mark.</div></div>';},
  drawCard:function(ctx,d,h){
   ctx.fillStyle='#142735';ctx.fillRect(0,0,h.W,h.H);ctx.fillStyle='#F0E6CF';ctx.fillRect(48,48,984,1344);h.noise(ctx,7000,'rgba(60,40,15,A)',28);
   ctx.strokeStyle='#B99A62';ctx.lineWidth=2;ctx.strokeRect(69,69,942,1302);ctx.strokeRect(81,81,918,1278);
   ctx.fillStyle='#823C3C';ctx.beginPath();ctx.moveTo(144,48);ctx.lineTo(218,48);ctx.lineTo(218,246);ctx.lineTo(181,220);ctx.lineTo(144,246);ctx.closePath();ctx.fill();
   ctx.textAlign='center';ctx.fillStyle='#213C4A';wrapWords(ctx,h,d.quiz.title,540,125,670,29,38,2,sans,'normal');shield(ctx,435,178,210,d.r.seal,h);
   ctx.fillStyle='#6B604B';ctx.font=h.font(25,sans);ctx.fillText('YOUR LETTER OF RECRUITMENT',540,446);
   ctx.fillStyle='#213C4A';wrapWords(ctx,h,d.r.name,540,535,820,83,100,2,serif,'bold');
   ctx.fillStyle='#6B604B';wrapWords(ctx,h,d.r.sub,540,681,810,30,38,1,sans,'normal');
   ctx.strokeStyle='#B99A62';ctx.beginPath();ctx.moveTo(180,720);ctx.lineTo(900,720);ctx.stroke();
   ctx.fillStyle='#823C3C';wrapWords(ctx,h,d.r.tag,540,769,790,31,39,2,sans,'normal');
   ctx.fillStyle='#213C4A';wrapWords(ctx,h,d.r.quote,540,858,780,43,55,2,serif,'normal');
   wrapWords(ctx,h,d.r.traits.join(' / '),540,991,800,26,34,1,sans,'normal');
   ctx.textAlign='left';ctx.fillStyle='#6B604B';ctx.font=h.font(25,sans);ctx.fillText('ORDER AFFINITY',145,1064);ctx.textAlign='right';ctx.fillStyle='#823C3C';ctx.font=h.font(44,serif,'bold');ctx.fillText(d.pct+'%',934,1064);
   d.dimNames.forEach(function(name,i){var x=i<3?146:565,y=1120+(i%3)*49;ctx.textAlign='left';ctx.fillStyle='#213C4A';ctx.font=h.font(24,sans);ctx.fillText(name,x,y);ctx.fillStyle='#D4C9B3';ctx.fillRect(x+137,y-13,170,5);ctx.fillStyle='#213C4A';ctx.fillRect(x+137,y-13,170*d.dims[i]/100,5);});
   ctx.textAlign='center';ctx.fillStyle='#6B604B';wrapWords(ctx,h,d.labels.cardFooter,540,1304,820,27,34,1,sans,'normal');ctx.font=h.font(22,sans);ctx.fillText(d.labels.cardDisc,540,1340);
  }
 };
})();
