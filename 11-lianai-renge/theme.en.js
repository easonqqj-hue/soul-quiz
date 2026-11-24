(function(){
  'use strict';
  var base=window.THEME;
  var serif='Didot,"Bodoni 72",Georgia,"Times New Roman",serif';
  var sans='"Avenir Next","Helvetica Neue",Arial,sans-serif';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  // Fit an entire text box; wrap only at spaces, including shrink-to-fit for long words.
  function words(ctx,h,text,x,y,width,px,lineHeight,maxLines,family,weight){
    var tokens=String(text).trim().split(/\s+/),lines,size=px;
    tokens.forEach(function(word){size=Math.min(size,h.fit(ctx,word,width,size,family,weight));});
    do{ctx.font=h.font(size,family,weight);lines=[];var line='';tokens.forEach(function(word){var next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>width){lines.push(line);line=word;}else line=next;});if(line)lines.push(line);if(lines.length<=maxLines||size<=20)break;size-=2;}while(size>0);
    var step=lineHeight*size/px;lines.forEach(function(line,i){ctx.fillText(line,x,y+i*step);});return y+(lines.length-1)*step;
  }
  function wax(ctx,x,y){
    ctx.save();ctx.translate(x,y);ctx.rotate(-.12);ctx.beginPath();for(var i=0;i<=100;i++){var a=i*Math.PI/50,r=66+3*Math.sin(a*9)+2*Math.cos(a*13);i?ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r):ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.fillStyle='#7A1F2B';ctx.fill();ctx.strokeStyle='#C99A9A';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,48,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#F6E7E1';ctx.font='italic 35px Georgia,serif';ctx.textAlign='center';ctx.fillText('xo',0,10);ctx.restore();
  }
  window.THEME_EN={
    colors:{bg:'#F6E7E1',fg:'#2C3445',accent:'#7A1F2B',muted:'#7F6260'},cardFont:sans,
    letters:['a','b','c','d'],qNo:function(i,n){return 'Line '+String(i+1).padStart(2,'0')+' of '+n;},
    decor:base.decor,homeTop:base.homeTop,homeBottom:'<div class="letter-sign">Yours, in everyday ways.</div>',ornament:base.ornament,
    loader:base.loader,gateArt:base.gateArt,
    heroHTML:function(r,pct,L){return '<div class="r-hero letter-open"><div class="letter-fold" aria-hidden="true"></div><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct"><span>'+esc(L.pct)+'</span><b>'+pct+'%</b></div><div class="letter-autograph">With love, the everyday you.</div><div class="r-seal" aria-hidden="true">xo</div></div>';},
    drawCard:function(ctx,d,h){
      ctx.fillStyle='#F6E7E1';ctx.fillRect(0,0,h.W,h.H);h.noise(ctx,6500,'rgba(80,35,28,A)',31);
      ctx.strokeStyle='#CCA89D';ctx.lineWidth=2;ctx.strokeRect(35,35,1010,1370);
      ctx.fillStyle='#E5C4B7';ctx.beginPath();ctx.moveTo(55,1110);ctx.lineTo(540,825);ctx.lineTo(1025,1110);ctx.lineTo(1025,1320);ctx.lineTo(55,1320);ctx.closePath();ctx.fill();
      ctx.save();ctx.shadowColor='rgba(70,30,20,.09)';ctx.shadowBlur=24;ctx.shadowOffsetY=8;ctx.fillStyle='#FFF9F3';ctx.fillRect(92,82,896,1190);ctx.restore();
      ctx.strokeStyle='#DCC2B8';ctx.strokeRect(92,82,896,1190);ctx.textAlign='left';ctx.fillStyle='#7F6260';
      words(ctx,h,d.quiz.title,145,145,785,27,34,1,sans);ctx.fillStyle='#7A1F2B';ctx.font=h.font(36,serif,'italic');ctx.fillText('Dear you, in love,',145,230);
      ctx.fillStyle='#2C3445';words(ctx,h,d.r.name,140,342,790,94,100,2,serif,'normal');
      ctx.fillStyle='#7A1F2B';words(ctx,h,d.r.tag,145,510,775,31,42,2,sans);
      ctx.strokeStyle='#E4CDC2';ctx.lineWidth=1;[659,723,787].forEach(function(y){ctx.beginPath();ctx.moveTo(145,y);ctx.lineTo(935,y);ctx.stroke();});
      ctx.fillStyle='#2C3445';words(ctx,h,d.r.quote,145,641,770,43,64,3,serif,'italic');
      ctx.fillStyle='#7F6260';words(ctx,h,d.r.traits.join(' / '),145,842,770,27,38,2,sans);
      h.bars(ctx,145,913,770,d.dims,d.dimNames,{fill:'#7A1F2B',label:'#69595D',track:'#EBDDD5',rowH:39,px:25,labelW:172,fam:sans});
      ctx.fillStyle='#F0D6CA';ctx.beginPath();ctx.moveTo(55,1160);ctx.lineTo(540,1320);ctx.lineTo(1025,1160);ctx.lineTo(1025,1320);ctx.lineTo(55,1320);ctx.closePath();ctx.fill();
      ctx.strokeStyle='#C99A9A';ctx.beginPath();ctx.moveTo(55,1320);ctx.lineTo(385,1225);ctx.moveTo(1025,1320);ctx.lineTo(695,1225);ctx.stroke();
      ctx.fillStyle='#7A1F2B';ctx.font=h.font(28,sans);ctx.fillText(d.pct+'% style resemblance',145,1265);wax(ctx,897,1240);
      ctx.textAlign='center';ctx.fillStyle='#2C3445';words(ctx,h,d.labels.cardFooter,540,1363,940,25,30,1,sans);ctx.fillStyle='#7F6260';words(ctx,h,d.labels.cardDisc,540,1395,920,20,26,1,sans);
    }
  };
})();
