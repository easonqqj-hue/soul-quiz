(function(){
  'use strict';
  var black='#121110',cream='#F2E6D0',orange='#E27D4C',teal='#4C7A7A';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function scene(kind){
    var shapes='';
    if(kind==='road'||kind==='route')shapes='<path d="M210 128 126 230H312L235 128Z" fill="'+black+'"/><path d="M223 143 216 158m-6 12-10 24m-9 18-8 18" stroke="'+cream+'" stroke-width="2"/><path d="M0 165 170 126H0m400 34L258 126h142" fill="'+teal+'"/><path d="M56 126v65m283-60v60M45 135h22m260 0h28" stroke="'+black+'" stroke-width="3"/>';
    else if(kind==='station')shapes='<path d="M0 70h278l-16 15H0Z" fill="'+black+'"/><path d="M28 84v146M249 84v146" stroke="'+black+'" stroke-width="7"/><path d="M0 192h400v38H0Z" fill="'+black+'"/><path d="M0 202h400" stroke="'+cream+'" stroke-width="2"/><path d="M42 172h100m-91 0v20m82-20v20" stroke="'+black+'" stroke-width="7"/><circle cx="202" cy="102" r="14" fill="'+cream+'"/><path d="M202 91v11l7 4" fill="none" stroke="'+black+'" stroke-width="2"/>';
    else if(kind==='lane'||kind==='window')shapes='<path d="M0 116h110v114H0m300-147h100v147H300" fill="'+teal+'"/><path d="M110 148h83v82h-83m120-90h67v90h-67" fill="'+black+'"/><g fill="'+cream+'"><path d="M22 135h22v30H22m18 26h25v39H40m268-122h26v36h-26m42 9h26v36h-26m-221 14h18v27h-18"/></g><path d="M320 109v36m-13-18h28M0 100l120 20m160-53 120 25" stroke="'+black+'" stroke-width="3"/>';
    else if(kind==='rain')shapes='<path d="M38 104h245v126H38Z" fill="'+black+'"/><path d="M52 116h215v93H52Z" fill="'+cream+'"/><path d="M182 116v114M52 182h215m-215-43h215" stroke="'+black+'" stroke-width="5"/><path d="M60 213h205v17H60" fill="'+teal+'"/><g stroke="'+cream+'" stroke-opacity=".65">'+Array.from({length:18},function(_,i){var x=i*25;return '<path d="M'+x+' 12l-18 35m30 5-18 35m29 8-18 35"/>';}).join('')+'</g>';
    else if(kind==='book')shapes='<path d="M137 161V88a63 63 0 0 1 126 0v73Z" fill="'+cream+'"/><path d="M200 25v136m-63-53h126" stroke="'+black+'" stroke-width="3"/><path d="M0 180h400v50H0Z" fill="'+teal+'"/><g stroke="'+black+'" stroke-width="4"><path d="M0 183h400M0 218h400"/>'+Array.from({length:24},function(_,i){return '<path d="M'+(i*18+4)+' 190v25"/>';}).join('')+'</g>';
    else if(kind==='desk'||kind==='music')shapes='<path d="M62 28h244v132H62Z" fill="'+teal+'"/><path d="M72 38h224v111H72Z" fill="'+cream+'"/><path d="M184 38v111m-112-45h224" stroke="'+black+'" stroke-width="3"/><path d="M24 181h352v9H24m28 0v40m298-40v40" fill="'+black+'" stroke="'+black+'" stroke-width="5"/><path d="M103 169h70l-9-42h-52Z" fill="'+cream+'"/><path d="M240 181v-44l-21-12h44l-20 12" fill="'+black+'" stroke="'+black+'" stroke-width="3"/>';
    else if(kind==='letter')shapes='<path d="M72 156V40a18 18 0 0 1 18-18h220a18 18 0 0 1 18 18v116Z" fill="none" stroke="'+black+'" stroke-width="5"/><path d="M64 171h272v59H64Z" fill="'+teal+'"/><path d="M132 125h137v86H132Z" fill="'+cream+'"/><path d="m132 125 69 47 68-47m-137 86 51-48m86 48-51-48" fill="none" stroke="'+black+'" stroke-width="2"/>';
    else if(kind==='roof')shapes='<path d="M0 164h36v-26h35v43h45v-58h36v44h47v-24h32v42h38v-56h46v25h43v-41h42v117H0Z" fill="'+teal+'"/><path d="M0 193h400m-375 0v37m75-37v37m75-37v37m75-37v37m75-37v37" stroke="'+black+'" stroke-width="5"/>';
    else if(kind==='steps')shapes='<path d="M0 208h65v-32h60v-32h60v-32h60V80h60V48h95v182H0Z" fill="'+teal+'"/><path d="M0 193 355 12" stroke="'+black+'" stroke-width="4"/><path d="M65 160v16m60-47v15m60-46v14m60-44v12m60-43v11" stroke="'+black+'" stroke-width="3"/>';
    else if(kind==='market')shapes='<path d="M23 92h351l-24 40H47Z" fill="'+cream+'"/>'+Array.from({length:7},function(_,i){return '<path d="M'+(35+i*48)+' 92h23l-4 40h-29Z" fill="'+teal+'"/>';}).join('')+'<path d="M47 132v98m303-98v98m-320-42h337v42H30Z" fill="'+black+'" stroke="'+black+'" stroke-width="4"/><g fill="'+orange+'"><circle cx="82" cy="178" r="12"/><circle cx="107" cy="178" r="12"/><circle cx="96" cy="158" r="12"/><circle cx="287" cy="178" r="15"/><circle cx="317" cy="178" r="15"/></g>';
    else shapes='<ellipse cx="200" cy="165" rx="88" ry="16" fill="'+black+'"/><path d="M200 180v50M52 129v61h60m-52 0v40m45-40v40m243-101v61h-60m52 0v40m-45-40v40" fill="none" stroke="'+black+'" stroke-width="6"/><path d="M167 140h18v21h-18m48-21h18v21h-18" fill="'+cream+'"/>';
    return '<svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="400" height="230" fill="'+orange+'"/><circle cx="'+(kind==='road'?108:308)+'" cy="70" r="45" fill="'+cream+'" opacity=".8"/><path d="M0 157Q108 112 205 147T400 136V230H0Z" fill="'+teal+'" opacity=".4"/>'+shapes+'<path d="M0 228h400" stroke="'+black+'" stroke-width="4"/></svg>';
  }
  function paintScene(ctx,kind){
    ctx.save();ctx.translate(74,192);ctx.scale(2.33,2.12);ctx.beginPath();ctx.rect(0,0,400,230);ctx.clip();ctx.fillStyle=orange;ctx.fillRect(0,0,400,230);ctx.fillStyle=cream;ctx.beginPath();ctx.arc(kind==='road'?108:308,70,45,0,Math.PI*2);ctx.fill();ctx.fillStyle=teal;ctx.globalAlpha=.35;ctx.beginPath();ctx.moveTo(0,160);ctx.bezierCurveTo(120,90,220,180,400,135);ctx.lineTo(400,230);ctx.lineTo(0,230);ctx.fill();ctx.globalAlpha=1;
    function rect(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(x,y,w,h);}
    function line(points,color,width){ctx.strokeStyle=color;ctx.lineWidth=width||2;ctx.beginPath();points.forEach(function(p,i){i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);});ctx.stroke();}
    if(kind==='road'||kind==='route'){
      ctx.fillStyle=black;ctx.beginPath();ctx.moveTo(210,128);ctx.lineTo(126,230);ctx.lineTo(312,230);ctx.lineTo(235,128);ctx.fill();line([[223,143],[216,158]],cream);line([[210,170],[200,194]],cream);line([[191,212],[183,230]],cream);line([[56,126],[56,191]],black,3);line([[339,131],[339,191]],black,3);
    }else if(kind==='station'){
      rect(0,70,278,15,black);rect(25,85,6,145,black);rect(246,85,6,145,black);rect(0,192,400,38,black);rect(0,202,400,2,cream);rect(42,169,100,6,black);rect(50,175,4,17,black);rect(130,175,4,17,black);ctx.fillStyle=cream;ctx.beginPath();ctx.arc(202,104,14,0,Math.PI*2);ctx.fill();line([[202,93],[202,104],[209,108]],black);
    }else if(kind==='lane'||kind==='window'){
      rect(0,116,110,114,teal);rect(300,83,100,147,teal);rect(110,148,83,82,black);rect(233,140,67,90,black);[[22,135,22,30],[40,191,25,39],[308,109,26,36],[350,154,26,36],[133,168,18,27]].forEach(function(a){rect(a[0],a[1],a[2],a[3],cream);});line([[320,109],[320,145]],black);line([[308,127],[334,127]],black);
    }else if(kind==='rain'){
      rect(38,104,245,126,black);rect(52,116,215,93,cream);rect(179,116,5,114,black);rect(52,180,215,4,black);rect(52,137,215,4,black);rect(60,213,205,17,teal);for(var i=0;i<18;i++)for(var j=0;j<3;j++)line([[i*25+j*10,j*44+12],[i*25+j*10-16,j*44+45]],cream,.7);
    }else if(kind==='book'){
      ctx.fillStyle=cream;ctx.beginPath();ctx.arc(200,88,63,Math.PI,0);ctx.lineTo(263,161);ctx.lineTo(137,161);ctx.fill();rect(199,25,3,136,black);rect(137,106,126,3,black);rect(0,180,400,50,teal);rect(0,181,400,4,black);rect(0,218,400,4,black);for(var k=0;k<24;k++)rect(k*18+4,189,3,26,black);
    }else if(kind==='desk'||kind==='music'){
      rect(62,28,244,132,teal);rect(72,38,224,111,cream);rect(183,38,3,111,black);rect(72,103,224,3,black);rect(24,181,352,9,black);rect(50,190,5,40,black);rect(350,190,5,40,black);rect(105,129,65,45,cream);line([[242,181],[242,137],[220,125],[263,125],[242,137]],black,3);if(kind==='music'){for(var st=0;st<5;st++)rect(112,140+st*5,48,1,teal);}
    }else if(kind==='letter'){
      ctx.strokeStyle=black;ctx.lineWidth=4;ctx.strokeRect(72,22,256,134);rect(64,171,272,59,teal);rect(132,125,137,86,cream);line([[132,125],[201,172],[269,125]],black);line([[132,211],[183,163]],black);line([[269,211],[218,163]],black);
    }else if(kind==='roof'){
      for(var b=0;b<10;b++)rect(b*42,122+(b%3)*14,36,108,teal);rect(0,193,400,4,black);for(var n=0;n<5;n++)rect(25+n*75,193,4,37,black);
    }else if(kind==='steps'){
      for(var s=0;s<7;s++)rect(s*60,208-s*32,65,230,teal);line([[0,193],[355,12]],black,4);
    }else if(kind==='market'){
      rect(23,92,351,40,cream);for(var a=0;a<7;a++)rect(35+a*48,92,23,40,teal);rect(45,132,4,98,black);rect(349,132,4,98,black);rect(30,188,337,42,black);ctx.fillStyle=orange;[[82,178],[107,178],[96,158],[287,178],[317,178]].forEach(function(p){ctx.beginPath();ctx.arc(p[0],p[1],12,0,Math.PI*2);ctx.fill();});
    }else{
      ctx.fillStyle=black;ctx.beginPath();ctx.ellipse(200,165,88,16,0,0,Math.PI*2);ctx.fill();rect(198,180,4,50,black);line([[52,129],[52,190],[112,190]],black,5);line([[348,129],[348,190],[288,190]],black,5);[60,105,340,295].forEach(function(x){rect(x,190,4,40,black);});rect(167,140,18,21,cream);rect(215,140,18,21,cream);
    }
    ctx.restore();
  }

  var serif='Didot,"Bodoni 72",Georgia,"Times New Roman",serif';
  var sans='"Gill Sans","Avenir Next","Helvetica Neue",Arial,sans-serif';
  function wrapWords(ctx,h,text,x,y,width,px,leading,maxLines,family,weight){
    var words=String(text).trim().split(/\s+/),lines=[];family=family||sans;
    ctx.font=h.font(px,family,weight);var longest=words.reduce(function(a,b){return ctx.measureText(a).width>ctx.measureText(b).width?a:b;},'');px=h.fit(ctx,longest,width,px,family,weight);
    function layout(){ctx.font=h.font(px,family,weight);lines=[];var line='';words.forEach(function(word){var next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>width){lines.push(line);line=word;}else line=next;});if(line)lines.push(line);}
    layout();while(lines.length>maxLines&&px>20){px-=2;layout();}lines.forEach(function(line,i){ctx.fillText(line,x,y+i*px*leading);});return y+(lines.length-1)*px*leading;
  }
  var reel='<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M196 50h92v152h-92" fill="none" stroke="'+teal+'" stroke-width="18"/>'+Array.from({length:9},function(_,i){return '<path d="M280 '+(55+i*16)+'h16" stroke="'+cream+'" stroke-width="6"/>';}).join('')+'<circle cx="145" cy="119" r="96" fill="#242420" stroke="'+cream+'" stroke-opacity=".7"/><circle cx="145" cy="119" r="88" fill="none" stroke="'+teal+'"/><circle cx="145" cy="119" r="78" fill="none" stroke="'+cream+'" stroke-opacity=".2"/>'+[0,1,2,3,4].map(function(i){var a=i*2*Math.PI/5-.9;return '<circle cx="'+(145+53*Math.cos(a))+'" cy="'+(119+53*Math.sin(a))+'" r="20" fill="'+black+'" stroke="'+teal+'"/>';}).join('')+'<circle cx="145" cy="119" r="12" fill="'+cream+'"/><path d="M44 108h208v34H44Z" fill="'+orange+'"/><text x="148" y="129" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" letter-spacing="1.3" fill="'+black+'">SEALED / YOUR FINAL CUT</text><path d="M67 217h153" stroke="'+cream+'" stroke-opacity=".25"/></svg>';
  window.THEME_EN={
    colors:{bg:black,fg:cream,accent:orange,muted:'#BEB6A8'},cardFont:sans,letters:['I','II','III','IV'],qNo:function(i,n){return 'SCENE '+String(i+1).padStart(2,'0')+' / '+n;},
    decor:'<div class="cinema-side side-left"></div><div class="cinema-side side-right"></div>',
    homeTop:'<div class="film-opening"><div class="film-sprockets"></div><div class="opening-image">'+scene('road')+'<span class="opening-subtitle">Some stories take the long way home.</span></div><div class="film-sprockets"></div></div>',
    homeBottom:'<div class="home-credits"><span>Starring <b>YOU</b></span><span>Written in everyday moments</span></div>',ornament:'',
    loader:'<div class="film-countdown"><span>3</span><i></i></div>',gateArt:'<div class="pw-art sealed-reel">'+reel+'</div>',
    heroHTML:function(r,pct,L){return '<div class="r-hero film-poster"><div class="r-kicker">'+esc(L.resultKicker)+'</div><div class="poster-picture">'+scene(r.art)+'</div><div class="poster-copy"><div class="r-sub">'+esc(r.sub)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="film-genre">'+esc(r.genre)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="poster-billing"><span>Starring <b>YOU</b></span><span class="r-pct">'+esc(L.pct)+' <b>'+pct+'%</b></span></div></div></div>';},
    drawCard:function(ctx,d,h){
      ctx.fillStyle=black;ctx.fillRect(0,0,1080,1440);ctx.fillStyle=cream;ctx.textAlign='left';ctx.font=h.font(27,sans);ctx.fillText("What's Your Dream Love Story?",74,94);ctx.textAlign='right';ctx.font=h.font(26,serif,'italic');ctx.fillText('An original, starring you',1006,94);
      ctx.fillStyle='#242420';ctx.fillRect(48,137,984,586);ctx.fillStyle=cream;for(var i=0;i<18;i++){ctx.fillRect(72+i*54,151,24,12);ctx.fillRect(72+i*54,698,24,12);}paintScene(ctx,d.r.art);
      ctx.textAlign='center';ctx.fillStyle='#C5BCA9';wrapWords(ctx,h,d.r.sub,540,776,920,28,1.1,1,serif,'italic');
      ctx.fillStyle=cream;wrapWords(ctx,h,d.r.name,540,862,930,92,1.03,2,serif,'normal');
      ctx.fillStyle=orange;wrapWords(ctx,h,d.r.genre,540,998,920,28,1.15,1,sans,'600');
      ctx.fillStyle='#C5BCA9';wrapWords(ctx,h,d.r.tag,540,1048,920,27,1.15,1,sans);
      ctx.fillStyle='#080807';ctx.fillRect(48,1080,984,125);ctx.fillStyle=cream;wrapWords(ctx,h,d.r.quote,540,1126,890,37,1.35,2,serif);
      ctx.fillStyle='#C5BCA9';wrapWords(ctx,h,d.r.traits.join(' / '),540,1250,925,25,1.15,1,sans);
      ctx.fillStyle=orange;ctx.fillRect(74,1290,932,2);ctx.textAlign='left';ctx.fillStyle=cream;ctx.font=h.font(27,sans);ctx.fillText('STARRING YOU',74,1337);ctx.textAlign='right';ctx.fillText('Story fit '+d.pct+'%',1006,1337);
      ctx.textAlign='center';ctx.fillStyle='#BEB6A8';ctx.font=h.font(25,sans);ctx.fillText("What's Your Dream Love Story?",540,1390);ctx.font=h.font(20,sans);ctx.fillText('An original story, just for fun.',540,1422);h.noise(ctx,13000,'rgba(0,0,0,A)',1505);
    },pickDelay:330,loadingMs:2050
  };
})();
