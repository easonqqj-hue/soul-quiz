(function(){
  'use strict';
  var black='#141414',cream='#EDE5D8',orange='#E0662F',teal='#3E8A8A';

  var serif='Georgia,"Times New Roman",serif',sans='"Avenir Next","Helvetica Neue",Arial,sans-serif';
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  // Preserve whole words. Fit the longest word first, then shrink to the text box.
  function wrapWords(ctx,text,x,y,width,px,leading,maxLines,family,weight,h){
    var words=String(text).trim().split(/\s+/),lines=[],longest=words.reduce(function(a,b){return a.length>b.length?a:b;},'');
    px=h.fit(ctx,longest,width,px,family,weight);
    function layout(){ctx.font=h.font(px,family,weight);lines=[];var line='';words.forEach(function(word){var next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>width){lines.push(line);line=word;}else line=next;});if(line)lines.push(line);}
    layout();while(lines.length>maxLines&&px>20){px-=2;layout();}
    lines.forEach(function(line,i){ctx.fillText(line,x,y+i*px*leading);});return y+(lines.length-1)*px*leading;
  }
  function rule(ctx,x,y,w,color){ctx.strokeStyle=color;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+w,y);ctx.stroke();}

  function record(label,small,cls){return '<div class="record-face '+(cls||'')+'" aria-hidden="true"><div class="record-label"><span>'+small+'</span><b>'+label+'</b><i></i></div></div>';}
  function tracks(r){return '<div class="tracklist"><div class="track-heading"><span>A day on this record</span><i>SIDE B</i></div>'+r.tracks.map(function(t,i){return '<div class="track"><span class="track-no">0'+(i+1)+'</span><div><b>'+esc(t[1])+'</b><p>'+esc(t[2])+'</p></div><span class="track-time">'+esc(t[0])+'</span></div>';}).join('')+'</div>';}
  function vinyl(ctx,x,y,R,bpm,h){ctx.save();ctx.translate(x,y);ctx.fillStyle=black;ctx.beginPath();ctx.arc(0,0,R,0,Math.PI*2);ctx.fill();ctx.lineWidth=1.5;for(var r=R*.43;r<R-8;r+=8){ctx.strokeStyle='#383832';ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();}ctx.fillStyle='rgba(237,229,216,.07)';[-1.7,1.35].forEach(function(a){ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,R,a,a+.38);ctx.closePath();ctx.fill();});ctx.fillStyle=orange;ctx.beginPath();ctx.arc(0,0,R*.38,0,Math.PI*2);ctx.fill();ctx.textAlign='center';ctx.fillStyle=black;ctx.font=h.font(24,sans);ctx.fillText('LIFE BPM',0,-40);ctx.font=h.font(85,sans,'bold');ctx.fillText(String(bpm),0,39);ctx.fillStyle=cream;ctx.beginPath();ctx.arc(0,68,6,0,Math.PI*2);ctx.fill();ctx.restore();}
  window.THEME_EN={
    colors:{bg:black,fg:cream,accent:orange,muted:'#A9A498'},cardFont:sans,letters:['A','B','C','D'],qNo:function(i,n){return 'Track '+String(i+1).padStart(2,'0')+' / '+n;},
    decor:window.THEME.decor,
    homeTop:'<div class="home-turntable"><div class="mini-sleeve"><span>EVERYDAY GROOVES</span><i>an original pressing</i><b>Life at<br>your speed.</b></div>'+record('33⅓','your own tempo')+'<div class="tonearm" aria-hidden="true"></div></div>',
    homeBottom:'<p class="tempo-note">BPM is a playful metaphor, not a body measurement.</p>',ornament:window.THEME.ornament,
    loader:'<div class="loading-deck">'+record('...','LISTENING','spinning')+'<div class="tonearm"></div></div>',
    gateArt:'<div class="pw-art sealed-record"><div class="gate-vinyl">'+record('—','UNPLAYED')+'</div><div class="record-sleeve"><div class="sleeve-lines"></div><span>EVERYDAY GROOVES</span><b>Your day.<br>Your speed.</b><i>PERSONAL PRESSING</i><div class="sleeve-seal">SEALED</div></div></div>',
    heroHTML:function(r,pct,L){return '<div class="r-hero record-cover"><div class="cover-top"><span>EVERYDAY GROOVES</span><i>'+esc(r.genre)+'</i></div><div class="r-kicker">'+esc(L.resultKicker)+'</div><div class="result-vinyl">'+record(r.bpm,'LIFE BPM')+'</div><div class="bpm-caption">'+r.bpm+' BPM / a playful metaphor</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+' <b>'+pct+'%</b></div>'+tracks(r)+'</div>';},
    drawCard:function(ctx,d,h){
      ctx.fillStyle=black;ctx.fillRect(0,0,1080,1440);ctx.fillStyle=cream;ctx.fillRect(40,36,1000,1368);h.noise(ctx,10000,'rgba(20,20,20,A)',24);
      ctx.fillStyle=black;ctx.textAlign='left';wrapWords(ctx,d.quiz.title,86,99,690,30,1.2,1,sans,'normal',h);ctx.textAlign='right';ctx.font=h.font(25,sans);ctx.fillText('SIDE A / '+d.r.genre.toUpperCase(),994,99);rule(ctx,86,130,908,black);
      vinyl(ctx,570,421,258,d.r.bpm,h);
      ctx.save();ctx.translate(105,663);ctx.rotate(-Math.PI/2);ctx.textAlign='left';h.fit(ctx,'EVERYDAY GROOVES / PERSONAL PRESSING',490,25,sans);ctx.fillText('EVERYDAY GROOVES / PERSONAL PRESSING',0,0);ctx.restore();
      ctx.fillStyle='#346C65';ctx.textAlign='right';ctx.font=h.font(23,sans);ctx.fillText('A musical metaphor, not a measurement',991,725);
      ctx.textAlign='left';ctx.fillStyle=black;wrapWords(ctx,d.r.name,86,818,908,84,1.06,2,sans,'bold',h);
      wrapWords(ctx,d.r.tag,90,954,900,32,1.2,2,sans,'normal',h);
      wrapWords(ctx,d.r.quote,90,1040,900,34,1.25,2,serif,'italic',h);
      ctx.fillStyle='#346C65';wrapWords(ctx,d.r.traits.join(' / '),90,1120,900,25,1.2,1,sans,'normal',h);
      rule(ctx,90,1144,900,'#B8B2A5');ctx.font=h.font(23,sans);ctx.fillText('SIDE B / YOUR DAILY TRACK LIST',90,1178);
      d.r.tracks.forEach(function(t,i){var y=1220+i*45;ctx.fillStyle=black;ctx.textAlign='left';ctx.font=h.font(22,sans);ctx.fillText(t[0],90,y);wrapWords(ctx,t[1],177,y,285,26,1.1,1,sans,'bold',h);wrapWords(ctx,t[2],480,y,510,24,1.1,1,sans,'normal',h);});
      rule(ctx,90,1334,900,'#B8B2A5');ctx.fillStyle=black;wrapWords(ctx,d.labels.cardFooter,90,1374,650,26,1.2,1,sans,'normal',h);ctx.textAlign='right';ctx.font=h.font(22,sans);ctx.fillText('Just for fun',990,1374);
    },pickDelay:260,loadingMs:2100
  };
})();
