(function(){
  'use strict';
  var paper='#F4F1EC',ink='#1A1A1A',warm='#D9B38C',green='#8C9A86';
  var palette={rain:['#AEB7AC','#737D6C','#D9B38C'],sunset:['#D9B38C','#8C9A86','#F4F1EC'],nightshop:['#353A35','#1A1A1A','#D9B38C'],quietlux:['#D9D5C8','#8C9A86','#806F5B'],forest:['#CED4C6','#8C9A86','#63755F'],run:['#424B45','#252925','#D9B38C'],afternoon:['#E6CFB5','#C4B39B','#F4F1EC'],millennium:['#B9C1B2','#D9B38C','#F4F1EC'],morning:['#E7E5DB','#B5BDA9','#F4F1EC'],hearth:['#71604F','#3A342F','#D9B38C'],band:['#414740','#242624','#D9B38C'],vintage:['#C8B89F','#7C8876','#EEE2D1'],whitebox:['#EEEDE7','#BFC5B7','#F4F1EC'],tropical:['#D9B38C','#8C9A86','#F4F1EC']};
  var details={rain:['book','mug'],sunset:['leaf','mug'],nightshop:['mug','glint'],quietlux:['fabric','book'],forest:['leaf','glint'],run:['shoe','glint'],afternoon:['mug','fabric'],millennium:['glint','fabric'],morning:['mug','leaf'],hearth:['fabric','mug'],band:['music','glint'],vintage:['fabric','book'],whitebox:['glint','book'],tropical:['leaf','mug']};
  function scene(id,i){var c=palette[id];return '<div class="scene scene-'+id+' crop-'+i+(i?' detail-'+details[id][i-1]:'')+'" style="--sky:'+c[0]+';--land:'+c[1]+';--light:'+c[2]+'" aria-hidden="true"><i class="scene-light"></i><i class="scene-object"></i><i class="scene-detail"></i></div>';}
  function photo(id,i,caption){return '<figure class="polaroid photo-'+i+'">'+scene(id,i)+'<figcaption>'+caption+'</figcaption></figure>';}
  function collage(r,cls){return '<div class="collage '+(cls||'')+'">'+r.shots.map(function(s,i){return photo(r.id,i,s);}).join('')+'<span class="album-tape" aria-hidden="true"></span></div>';}
  function drawScene(ctx,id,x,y,w,h,i){
    var c=palette[id];ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();ctx.translate(x,y);ctx.scale(w/300,h/300);
    var g=ctx.createLinearGradient(0,0,160,300);g.addColorStop(0,c[0]);g.addColorStop(1,c[1]);ctx.fillStyle=g;ctx.fillRect(0,0,300,300);ctx.translate(i===1?-20:i===2?18:0,0);
    ctx.fillStyle=c[2];ctx.strokeStyle=c[2];ctx.lineWidth=3;
    if(i>0){
      var detail=details[id][i-1];
      if(detail==='book'){ctx.save();ctx.translate(160,160);ctx.rotate(-.15);ctx.fillStyle=paper;ctx.fillRect(-108,-65,216,139);ctx.strokeStyle=c[1];ctx.beginPath();ctx.moveTo(0,-64);ctx.lineTo(0,73);for(var line=0;line<6;line++){ctx.moveTo(-88,-43+line*18);ctx.lineTo(-17,-43+line*18);ctx.moveTo(17,-43+line*18);ctx.lineTo(85,-43+line*18);}ctx.stroke();ctx.restore();}
      else if(detail==='mug'){ctx.fillStyle=c[2];ctx.beginPath();ctx.ellipse(158,228,92,24,0,0,Math.PI*2);ctx.fill();ctx.fillRect(111,116,91,102);ctx.beginPath();ctx.ellipse(156,116,45,14,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle=c[2];ctx.lineWidth=11;ctx.beginPath();ctx.arc(208,159,30,-1.6,1.6);ctx.stroke();ctx.fillStyle=c[1];ctx.beginPath();ctx.ellipse(156,117,37,8,0,0,Math.PI*2);ctx.fill();}
      else if(detail==='leaf'){ctx.strokeStyle=c[1];ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(49,303);ctx.quadraticCurveTo(90,125,228,19);ctx.stroke();for(var leaf=0;leaf<7;leaf++){ctx.save();ctx.translate(79+leaf*20,250-leaf*33);ctx.rotate(leaf%2?-.65:.65);ctx.fillStyle=leaf%2?c[1]:c[2];ctx.beginPath();ctx.ellipse(leaf%2?-31:30,0,47,14,leaf%2?.35:-.35,0,Math.PI*2);ctx.fill();ctx.restore();}}
      else if(detail==='fabric'){ctx.fillStyle=c[2];ctx.beginPath();ctx.moveTo(65,0);ctx.lineTo(230,0);ctx.lineTo(215,300);ctx.lineTo(29,300);ctx.closePath();ctx.fill();ctx.strokeStyle=c[1];ctx.globalAlpha=.45;ctx.lineWidth=4;for(var fold=0;fold<8;fold++){ctx.beginPath();ctx.moveTo(72+fold*21,0);ctx.quadraticCurveTo(135+fold*8,150,40+fold*22,300);ctx.stroke();}}
      else if(detail==='shoe'){ctx.fillStyle=c[2];ctx.beginPath();ctx.moveTo(50,172);ctx.lineTo(82,125);ctx.lineTo(139,166);ctx.lineTo(182,179);ctx.quadraticCurveTo(256,189,258,227);ctx.lineTo(53,227);ctx.closePath();ctx.fill();ctx.strokeStyle=c[1];ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(54,215);ctx.lineTo(253,215);for(var lace=0;lace<4;lace++){ctx.moveTo(113+lace*17,165+lace*5);ctx.lineTo(101+lace*17,181+lace*5);}ctx.stroke();}
      else if(detail==='music'){ctx.fillStyle='#252925';ctx.beginPath();ctx.arc(150,152,108,0,Math.PI*2);ctx.fill();ctx.strokeStyle=c[2];ctx.globalAlpha=.3;for(var groove=45;groove<100;groove+=9){ctx.beginPath();ctx.arc(150,152,groove,0,Math.PI*2);ctx.stroke();}ctx.globalAlpha=1;ctx.fillStyle=c[2];ctx.beginPath();ctx.arc(150,152,31,0,Math.PI*2);ctx.fill();}
      else{ctx.fillStyle=paper;ctx.globalAlpha=.5;ctx.beginPath();ctx.moveTo(68,0);ctx.lineTo(167,0);ctx.lineTo(300,300);ctx.lineTo(150,300);ctx.closePath();ctx.fill();ctx.strokeStyle=c[1];ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,220);ctx.lineTo(300,220);ctx.stroke();}
      ctx.restore();return;
    }
    if(id==='sunset'||id==='tropical'){
      ctx.beginPath();ctx.arc(205,95,42,0,Math.PI*2);ctx.fill();ctx.fillStyle=c[1];ctx.fillRect(0,165,340,135);
      ctx.globalAlpha=.4;for(var j=0;j<8;j++){ctx.fillStyle=c[2];ctx.fillRect(173-j*5,176+j*14,60+j*9,2);}ctx.globalAlpha=1;
      if(id==='tropical'){ctx.strokeStyle='#485546';ctx.fillStyle='#485546';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(42,300);ctx.quadraticCurveTo(85,150,62,60);ctx.stroke();for(var n=0;n<6;n++){ctx.save();ctx.translate(64,66);ctx.rotate(-1.3+n*.5);ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(60,-30,113,5);ctx.quadraticCurveTo(58,14,0,0);ctx.fill();ctx.restore();}}
    }else if(id==='forest'){
      for(var t=0;t<6;t++){ctx.globalAlpha=.3+t*.09;ctx.fillStyle=c[1];ctx.beginPath();ctx.moveTo(t*65-20,0);ctx.lineTo(t*65+14,0);ctx.lineTo(t*65+28,300);ctx.lineTo(t*65-13,300);ctx.fill();}ctx.globalAlpha=.3;ctx.fillStyle=paper;ctx.beginPath();ctx.ellipse(170,155,220,48,-.3,0,Math.PI*2);ctx.fill();
    }else if(id==='rain'||id==='morning'){
      ctx.fillStyle=paper;ctx.globalAlpha=.4;ctx.fillRect(30,27,235,211);ctx.globalAlpha=1;ctx.fillStyle=c[1];ctx.fillRect(141,26,7,210);ctx.fillRect(30,130,236,7);ctx.fillStyle=c[2];ctx.fillRect(0,237,340,63);
      if(id==='rain'){ctx.strokeStyle=paper;ctx.globalAlpha=.5;for(var k=0;k<24;k++){var xx=(k*43)%300;var yy=(k*71)%230;ctx.beginPath();ctx.moveTo(xx,yy);ctx.lineTo(xx-3,yy+20);ctx.stroke();}ctx.globalAlpha=1;ctx.fillStyle='#57624F';ctx.fillRect(47,224,93,16);ctx.fillRect(40,207,85,16);}else{ctx.fillStyle=paper;ctx.beginPath();ctx.ellipse(190,265,58,18,0,0,Math.PI*2);ctx.fill();ctx.fillStyle=c[1];ctx.fillRect(177,232,29,30);}
    }else if(id==='nightshop'||id==='run'){
      ctx.fillStyle='#252925';ctx.fillRect(0,200,340,100);ctx.strokeStyle=c[2];ctx.globalAlpha=.7;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(150,205);ctx.lineTo(60,300);ctx.moveTo(195,205);ctx.lineTo(270,300);ctx.stroke();ctx.globalAlpha=1;
      if(id==='nightshop'){ctx.fillStyle=c[2];ctx.fillRect(50,80,205,125);ctx.fillStyle='#606957';ctx.fillRect(62,99,178,83);ctx.fillStyle=c[2];ctx.fillRect(145,95,6,100);}else{[60,145,230].forEach(function(xx,n){ctx.fillStyle=c[2];ctx.fillRect(xx,45+n*16,5,165);ctx.beginPath();ctx.ellipse(xx+8,48+n*16,22,7,0,0,Math.PI*2);ctx.fill();});}
    }else if(id==='hearth'){
      ctx.fillStyle='#292722';ctx.fillRect(56,110,196,155);ctx.strokeStyle=c[2];ctx.lineWidth=15;ctx.strokeRect(47,102,215,170);ctx.fillStyle=c[2];ctx.beginPath();ctx.moveTo(105,250);ctx.quadraticCurveTo(95,205,152,157);ctx.quadraticCurveTo(147,202,178,207);ctx.quadraticCurveTo(209,172,197,252);ctx.fill();ctx.strokeStyle='#5D4F41';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(98,257);ctx.lineTo(209,235);ctx.stroke();
    }else if(id==='millennium'){
      ctx.globalAlpha=.65;ctx.fillStyle=paper;ctx.beginPath();ctx.ellipse(142,148,117,69,-.5,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;ctx.strokeStyle=c[1];ctx.lineWidth=24;ctx.beginPath();ctx.ellipse(159,145,82,60,-.5,0,Math.PI*2);ctx.stroke();ctx.strokeStyle=paper;ctx.lineWidth=4;[[70,70],[235,184],[120,251]].forEach(function(p){ctx.beginPath();ctx.moveTo(p[0]-12,p[1]);ctx.lineTo(p[0]+12,p[1]);ctx.moveTo(p[0],p[1]-12);ctx.lineTo(p[0],p[1]+12);ctx.stroke();});
    }else if(id==='band'){
      ctx.fillStyle=c[2];ctx.globalAlpha=.2;ctx.beginPath();ctx.moveTo(120,0);ctx.lineTo(50,300);ctx.lineTo(280,300);ctx.lineTo(167,0);ctx.fill();ctx.globalAlpha=1;ctx.fillStyle='#20221F';ctx.fillRect(30,220,90,65);ctx.fillRect(225,205,60,83);ctx.strokeStyle=c[2];ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(165,98);ctx.lineTo(165,260);ctx.lineTo(124,280);ctx.moveTo(165,260);ctx.lineTo(205,280);ctx.moveTo(165,103);ctx.lineTo(187,91);ctx.stroke();
    }else if(id==='vintage'){
      ctx.strokeStyle='#504C42';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(35,36);ctx.lineTo(35,300);ctx.moveTo(264,36);ctx.lineTo(264,300);ctx.moveTo(35,55);ctx.lineTo(264,55);ctx.stroke();[58,119,180].forEach(function(xx,n){ctx.fillStyle=[c[2],c[1],c[0]][n];ctx.beginPath();ctx.moveTo(xx+18,85);ctx.lineTo(xx-12,113);ctx.lineTo(xx,148);ctx.lineTo(xx+9,137);ctx.lineTo(xx+7,246);ctx.lineTo(xx+56,246);ctx.lineTo(xx+55,136);ctx.lineTo(xx+67,150);ctx.lineTo(xx+78,117);ctx.lineTo(xx+46,85);ctx.closePath();ctx.fill();});
    }else if(id==='afternoon'){
      ctx.globalAlpha=.3;ctx.fillStyle=paper;ctx.beginPath();ctx.moveTo(0,15);ctx.lineTo(270,110);ctx.lineTo(300,235);ctx.lineTo(0,157);ctx.fill();ctx.globalAlpha=1;ctx.fillStyle=c[1];ctx.beginPath();ctx.ellipse(160,246,180,64,0,0,Math.PI*2);ctx.fill();ctx.fillStyle=paper;ctx.beginPath();ctx.ellipse(165,210,62,18,0,0,Math.PI*2);ctx.fill();ctx.fillRect(132,166,57,42);ctx.beginPath();ctx.ellipse(161,165,29,9,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle=paper;ctx.lineWidth=7;ctx.beginPath();ctx.arc(194,184,16,-1.7,1.7);ctx.stroke();
    }else{
      ctx.fillStyle=c[2];ctx.globalAlpha=.4;ctx.beginPath();ctx.moveTo(115,0);ctx.lineTo(300,0);ctx.lineTo(178,300);ctx.lineTo(0,300);ctx.fill();ctx.globalAlpha=1;ctx.strokeStyle=c[1];ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(102,235);ctx.lineTo(101,128);ctx.quadraticCurveTo(150,87,207,125);ctx.lineTo(208,232);ctx.moveTo(95,205);ctx.lineTo(211,205);ctx.moveTo(110,209);ctx.lineTo(91,290);ctx.moveTo(197,208);ctx.lineTo(219,290);ctx.stroke();
    }
    ctx.restore();
  }

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

  var display='Didot,"Bodoni 72",Georgia,serif';
  function cardPhoto(ctx,id,i,x,y,w,height,angle,caption,h){ctx.save();ctx.translate(x+w/2,y+height/2);ctx.rotate(angle);ctx.shadowColor='rgba(26,26,26,.16)';ctx.shadowBlur=18;ctx.shadowOffsetY=9;ctx.fillStyle='#FFFDF7';ctx.fillRect(-w/2,-height/2,w,height);ctx.shadowColor='transparent';drawScene(ctx,id,-w/2+20,-height/2+20,w-40,height-110,i);ctx.fillStyle=ink;ctx.textAlign='center';wrapWords(ctx,caption,0,height/2-53,w-44,25,1.15,1,serif,'italic',h);ctx.restore();}
  window.THEME_EN={
    colors:{bg:paper,fg:ink,accent:green,muted:'#737469'},cardFont:sans,letters:['01','02','03','04'],qNo:function(i,n){return 'Frame '+String(i+1).padStart(2,'0')+' / '+n;},
    decor:window.THEME.decor,
    homeTop:collage({id:'sunset',shots:['the everyday edit','found along the way','stay a little longer']},'home-collage'),
    homeBottom:'<div class="album-footnote">Good taste is not a shopping list.</div>',ornament:'<span class="handwritten">a life, not just a look.</span>',
    loader:'<div class="developing-photo"><span></span><i>Let it develop.</i></div>',
    gateArt:'<div class="pw-art album-envelope"><div class="unseen-photo unseen-one"></div><div class="unseen-photo unseen-two"></div><div class="album-sleeve"><span>The everyday edit</span><i>DEVELOPED / STILL SEALED</i><b class="seal-tape">OPEN ME</b></div></div>',
    heroHTML:function(r,pct,L){return '<div class="r-hero album-result"><div class="r-kicker">'+esc(L.resultKicker)+'</div>'+collage(r,'result-collage')+'<h1 class="r-name"><span>#</span>'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+' <b>'+pct+'%</b></div></div>';},
    drawCard:function(ctx,d,h){
      ctx.fillStyle=paper;ctx.fillRect(0,0,1080,1440);h.noise(ctx,15000,'rgba(26,26,26,A)',23);ctx.fillStyle=ink;ctx.textAlign='left';wrapWords(ctx,d.quiz.title,76,87,810,29,1.2,1,sans,'normal',h);ctx.textAlign='right';ctx.font=h.font(25,serif);ctx.fillText('VOL. 23',1004,87);
      cardPhoto(ctx,d.r.id,1,704,183,290,300,.055,d.r.shots[1],h);cardPhoto(ctx,d.r.id,2,704,515,290,300,-.055,d.r.shots[2],h);cardPhoto(ctx,d.r.id,0,77,166,584,640,-.025,d.r.shots[0],h);
      ctx.save();ctx.translate(365,172);ctx.rotate(-.07);ctx.globalAlpha=.76;ctx.fillStyle=warm;ctx.fillRect(-119,-22,238,44);ctx.restore();
      ctx.textAlign='left';ctx.fillStyle='#52604A';ctx.font=h.font(25,sans);ctx.fillText(d.labels.resultKicker,78,890);
      ctx.fillStyle=ink;wrapWords(ctx,'# '+d.r.name,76,985,930,83,1.06,2,display,'normal',h);
      wrapWords(ctx,d.r.tag,80,1129,910,31,1.24,2,sans,'normal',h);
      wrapWords(ctx,d.r.quote,80,1221,910,36,1.22,2,serif,'italic',h);
      ctx.fillStyle='#52604A';wrapWords(ctx,d.r.traits.join(' / '),80,1310,910,25,1.2,1,sans,'normal',h);rule(ctx,80,1340,920,'#B9BAAE');
      ctx.fillStyle=ink;wrapWords(ctx,d.labels.cardFooter,80,1382,740,26,1.2,1,sans,'normal',h);ctx.textAlign='right';ctx.font=h.font(22,sans);ctx.fillText('Just for fun',1000,1382);
    },pickDelay:310,loadingMs:2000
  };
})();
