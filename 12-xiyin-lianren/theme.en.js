(function(){
  'use strict';
  var base=window.THEME,sans='"Avenir Next",Futura,"Helvetica Neue",Arial,sans-serif';
  function words(ctx,h,text,x,y,width,px,lineHeight,maxLines,family,weight){
    var tokens=String(text).trim().split(/\s+/),lines,size=px;
    tokens.forEach(function(word){size=Math.min(size,h.fit(ctx,word,width,size,family,weight));});
    do{ctx.font=h.font(size,family,weight);lines=[];var line='';tokens.forEach(function(word){var next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>width){lines.push(line);line=word;}else line=next;});if(line)lines.push(line);if(lines.length<=maxLines||size<=20)break;size-=2;}while(size>0);
    var step=lineHeight*size/px;lines.forEach(function(line,i){ctx.fillText(line,x,y+i*step);});return y+(lines.length-1)*step;
  }
  function halo(ctx,x,y,r){
    ctx.save();ctx.translate(x,y);var g=ctx.createLinearGradient(-r,-r,r,r);g.addColorStop(0,'#B8A8F0');g.addColorStop(.32,'#FBFAFC');g.addColorStop(.65,'#9EE6D0');g.addColorStop(1,'#FFC2A8');
    ctx.strokeStyle=g;ctx.lineWidth=43;ctx.beginPath();ctx.ellipse(0,0,r,r*.8,-.52,0,Math.PI*2);ctx.stroke();
    ctx.strokeStyle='rgba(255,255,255,.95)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,r+22,r*.8+22,-.52,0,Math.PI*2);ctx.stroke();
    ctx.strokeStyle='rgba(111,102,130,.35)';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(0,0,r+72,r*.5,.4,0,Math.PI*2);ctx.stroke();
    ctx.beginPath();ctx.arc(0,-18,27,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(-54,62);ctx.bezierCurveTo(-54,12,54,12,54,62);ctx.stroke();ctx.restore();
  }
  var portrait=base.homeTop.match(/<svg[\s\S]*<\/svg>/)[0];
  window.THEME_EN={
    colors:{bg:'#F4F2F7',fg:'#2E2A3A',accent:'#5C5074',muted:'#776F83'},cardFont:sans,
    letters:['01','02','03','04'],qNo:function(i,n){return 'Signal '+String(i+1).padStart(2,'0')+' / '+n;},
    decor:base.decor,homeTop:'<div class="field-home"><span class="field-side">a closer look</span>'+portrait+'<span class="field-caption">attraction, in the details</span></div>',
    homeBottom:'<div class="field-note">Small signals. Interesting possibilities.</div>',ornament:'',loader:base.loader,gateArt:base.gateArt,
    heroHTML:base.heroHTML,
    drawCard:function(ctx,d,h){
      ctx.fillStyle='#F4F2F7';ctx.fillRect(0,0,h.W,h.H);
      [[40,290,620,'#D4C7F4'],[1020,650,700,'#BAECDD'],[600,1470,650,'#FFD7C5']].forEach(function(a){var g=ctx.createRadialGradient(a[0],a[1],0,a[0],a[1],a[2]);g.addColorStop(0,a[3]);g.addColorStop(1,'rgba(244,242,247,0)');ctx.fillStyle=g;ctx.fillRect(0,0,h.W,h.H);});
      ctx.fillStyle='rgba(255,255,255,.55)';h.rr(ctx,63,62,954,1275,48);ctx.fill();ctx.strokeStyle='#FFFFFF';ctx.lineWidth=3;ctx.stroke();
      ctx.strokeStyle='rgba(107,95,132,.14)';ctx.lineWidth=1;h.rr(ctx,80,79,920,1241,34);ctx.stroke();
      ctx.textAlign='center';ctx.fillStyle='#625A6E';words(ctx,h,d.quiz.title,540,143,830,27,34,1,sans);
      ctx.fillStyle='#5C5074';ctx.font=h.font(23,sans);h.spaced(ctx,'THE ATTRACTION EDIT',540,201,4,'center');
      halo(ctx,540,370,153);ctx.fillStyle='#6D647D';ctx.font=h.font(25,sans);ctx.fillText('You might catch the eye of',540,565);
      ctx.fillStyle='#2E2A3A';words(ctx,h,d.r.name,540,670,790,78,89,2,sans,'500');
      ctx.fillStyle='#5C5074';words(ctx,h,d.r.tag,540,835,790,30,43,2,sans);
      ctx.strokeStyle='rgba(255,255,255,.95)';ctx.beginPath();ctx.moveTo(145,910);ctx.lineTo(935,910);ctx.stroke();
      ctx.fillStyle='#2E2A3A';words(ctx,h,d.r.quote,540,970,775,37,52,2,sans);
      ctx.fillStyle='#696273';words(ctx,h,d.r.traits.join(' / '),540,1088,780,25,35,2,sans);
      ctx.textAlign='left';ctx.font=h.font(23,sans);ctx.fillText('Your signals',146,1160);ctx.textAlign='right';ctx.fillText(d.pct+'% portrait resemblance',934,1160);
      d.dims.forEach(function(v,i){var x=145+i*135;ctx.fillStyle='rgba(108,91,142,.07)';h.rr(ctx,x,1190,115,63,10);ctx.fill();ctx.fillStyle='#5C5074';ctx.fillRect(x,1250,115*v/100,3);ctx.textAlign='center';ctx.font=h.font(30,sans);ctx.fillText(v,x+57.5,1233);ctx.fillStyle='#625A6E';words(ctx,h,d.dimNames[i],x+57.5,1294,119,21,25,1,sans);});
      ctx.textAlign='center';ctx.fillStyle='#514A5F';words(ctx,h,d.labels.cardFooter,540,1377,950,25,30,1,sans);ctx.fillStyle='#756E80';words(ctx,h,d.labels.cardDisc,540,1411,920,20,24,1,sans);
    }
  };
})();
