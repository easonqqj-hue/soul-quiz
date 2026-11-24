(function(){
  'use strict';
  var red='#E5484D',blue='#2F55D4',purple='#6B3FA0',paper='#F5F1EA',ink='#242326';
  var sans='"Avenir Next",Futura,"Helvetica Neue",Arial,sans-serif';
  var ticket=window.THEME.homeTop.match(/<svg[\s\S]*<\/svg>/)[0];
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  // Whole-word wrapping, including h.fit for any word wider than its box.
  function wrapWords(ctx,h,text,x,y,width,px,leading,maxLines,family,weight){
    var words=String(text).trim().split(/\s+/),lines=[];family=family||sans;
    var longest=words.reduce(function(a,b){ctx.font=h.font(px,family,weight);return ctx.measureText(a).width>ctx.measureText(b).width?a:b;},'');
    px=h.fit(ctx,longest,width,px,family,weight);
    function layout(){ctx.font=h.font(px,family,weight);lines=[];var line='';words.forEach(function(word){var candidate=line?line+' '+word:word;if(line&&ctx.measureText(candidate).width>width){lines.push(line);line=word;}else line=candidate;});if(line)lines.push(line);}
    layout();while(lines.length>maxLines&&px>20){px-=2;layout();}
    lines.forEach(function(line,i){ctx.fillText(line,x,y+i*px*leading);});return y+(lines.length-1)*px*leading;
  }
  function line(ctx,x1,y1,x2,y2,color){ctx.strokeStyle=color||ink;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}
  function circles(ctx,x,y,r){ctx.save();ctx.globalCompositeOperation='multiply';ctx.fillStyle=red;ctx.beginPath();ctx.arc(x-r*.57,y,r,0,Math.PI*2);ctx.fill();ctx.fillStyle=blue;ctx.beginPath();ctx.arc(x+r*.57,y,r,0,Math.PI*2);ctx.fill();ctx.restore();}
  function perforation(ctx,y){ctx.save();ctx.setLineDash([7,11]);line(ctx,46,y,1034,y);ctx.setLineDash([]);[46,1034].forEach(function(x){ctx.fillStyle=paper;ctx.beginPath();ctx.arc(x,y,17,0,Math.PI*2);ctx.fill();ctx.stroke();});ctx.restore();}
  function base(ctx,h){ctx.fillStyle=paper;ctx.fillRect(0,0,1080,1440);ctx.strokeStyle=ink;ctx.lineWidth=2;ctx.strokeRect(46,46,988,1348);ctx.textAlign='left';ctx.fillStyle=ink;ctx.font=h.font(27,sans,'700');ctx.fillText('Couples Compatibility Test',94,110);ctx.textAlign='right';ctx.font=h.font(23,sans);ctx.fillText('TWO OF US',986,110);line(ctx,94,145,986,145,'#b7b0a7');}
  function footer(ctx,h){ctx.textAlign='left';ctx.fillStyle=ink;ctx.font=h.font(27,sans,'700');ctx.fillText('Two people. What a pair.',94,1320);ctx.font=h.font(21,sans);ctx.fillStyle='#59545a';ctx.fillText('Just for fun. A score does not decide a relationship.',94,1363);}
  function single(ctx,d,h){
    base(ctx,h);circles(ctx,817,277,84);ctx.textAlign='left';ctx.fillStyle=red;ctx.font=h.font(26,sans,'700');ctx.fillText('THE INK YOU BRING',94,225);
    ctx.fillStyle=ink;wrapWords(ctx,h,d.r.name,94,430,885,104,1.05,2,sans,'900');
    ctx.fillStyle=purple;wrapWords(ctx,h,d.r.tag,94,620,885,38,1.2,2,sans,'700');
    ctx.fillStyle=ink;wrapWords(ctx,h,d.r.quote,94,735,870,43,1.3,2,sans,'600');
    d.r.traits.forEach(function(t,i){ctx.font=h.font(26,sans);ctx.fillStyle='#59545a';ctx.fillText(t,94+(i%2)*450,880+Math.floor(i/2)*46);});
    line(ctx,94,964,986,964,red);ctx.textAlign='left';ctx.font=h.font(25,sans);ctx.fillStyle=ink;ctx.fillText('Your style fit',94,1013);ctx.textAlign='right';ctx.font=h.font(49,sans,'800');ctx.fillText(d.pct+'%',986,1017);
    perforation(ctx,1060);ctx.textAlign='left';ctx.fillStyle=blue;ctx.font=h.font(42,sans,'800');ctx.fillText('Keep this half.',94,1135);ctx.font=h.font(28,sans);ctx.fillText('There is room for another kind of ink.',94,1193);ctx.font=h.font(22,sans);ctx.fillStyle='#59545a';ctx.fillText('An individual style. The full ticket takes two.',94,1243);footer(ctx,h);h.noise(ctx,9000,'rgba(0,0,0,A)',1405);
  }
  function couple(ctx,d,h){
    base(ctx,h);ctx.textAlign='left';ctx.fillStyle=red;h.fit(ctx,d.na,375,47,sans,'700');ctx.fillText(d.na,94,220);ctx.textAlign='right';ctx.fillStyle=blue;h.fit(ctx,d.nb,375,47,sans,'700');ctx.fillText(d.nb,986,220);ctx.textAlign='center';ctx.fillStyle=purple;ctx.font=h.font(34,sans);ctx.fillText('&',540,220);
    circles(ctx,540,405,146);ctx.fillStyle=paper;ctx.font=h.font(150,sans,'900');ctx.fillText(d.pct+'%',540,451);ctx.fillStyle='#59545a';ctx.font=h.font(24,sans);ctx.fillText('PLAYFUL COMPATIBILITY',540,602);
    ctx.fillStyle=ink;wrapWords(ctx,h,d.r.name,540,702,880,76,1.08,2,sans,'900');ctx.fillStyle=purple;wrapWords(ctx,h,d.r.tag,540,827,880,31,1.2,1,sans,'700');ctx.fillStyle=ink;wrapWords(ctx,h,d.r.quote,540,887,865,35,1.27,2,sans,'600');perforation(ctx,986);
    d.dimNames.forEach(function(name,i){var x=94+(i%2)*460,y=1035+Math.floor(i/2)*73;ctx.textAlign='left';ctx.fillStyle=ink;ctx.font=h.font(24,sans,'600');ctx.fillText(name,x,y);ctx.font=h.font(21,sans);ctx.textAlign='right';ctx.fillStyle='#59545a';ctx.fillText(d.dimsA[i]+' / '+d.dimsB[i],x+425,y);ctx.fillStyle='#ddd5cb';ctx.fillRect(x,y+13,425,26);ctx.fillStyle=red;ctx.fillRect(x,y+13,425*d.dimsA[i]/100,18);ctx.save();ctx.globalCompositeOperation='multiply';ctx.fillStyle=blue;ctx.fillRect(x,y+21,425*d.dimsB[i]/100,18);ctx.restore();});
    ctx.textAlign='center';ctx.fillStyle='#59545a';ctx.font=h.font(21,sans);ctx.fillText('First half in red. Second half in blue. Both belong here.',540,1263);footer(ctx,h);h.noise(ctx,9000,'rgba(0,0,0,A)',1415);
  }
  window.THEME_EN={
    colors:{bg:paper,fg:ink,accent:red,muted:'#59545a'},cardFont:sans,letters:['a','b','c','d'],qNo:function(i,n){return 'IMPRESSION '+String(i+1).padStart(2,'0')+' / '+n;},
    decor:'<div class="riso-edge edge-a"></div><div class="riso-edge edge-b"></div>',
    homeTop:'<div class="riso-home-art">'+ticket+'</div>',homeBottom:'<div class="riso-steps"><span>Your half</span><i></i><span>Their half</span><i></i><span>One ticket</span></div>',ornament:'',
    loader:'<div class="riso-loader"><span></span><span></span></div>',gateArt:'<div class="pw-art riso-sealed">'+ticket+'<div class="riso-seal">TWO INKS / SAFELY SEALED</div></div>',
    heroHTML:function(r,pct,L){return '<div class="r-hero personal-ticket"><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div><div class="ticket-end">KEEP THIS HALF. THERE IS ROOM FOR ANOTHER INK.</div></div>';},
    coupleHeroHTML:function(c,na,nb,L){return '<div class="r-hero couple"><div class="r-kicker">'+esc(L.coupleKicker)+'</div><div class="cp-names"><span>'+esc(na)+'</span><em>&amp;</em><span>'+esc(nb)+'</span></div><div class="riso-score"><div class="cp-score"><b>'+c.score+'</b><i>%</i></div></div><div class="r-sub">'+esc(L.coupleScore)+'</div><h1 class="r-name">'+esc(c.pair.name)+'</h1><div class="r-tag">'+esc(c.pair.tag)+'</div><div class="r-quote">'+esc(c.pair.quote)+'</div><div class="cp-types"><div><small>'+esc(na)+'</small><b>'+esc(c.a.name)+'</b></div><div><small>'+esc(nb)+'</small><b>'+esc(c.b.name)+'</b></div></div><div class="ticket-end">A little perspective. You two write the actual story.</div></div>';},
    onBuild:function(){
      // The engine uses the current URL for invitations. Keep the edition explicit.
      try{var u=new URL(location.href);if(u.searchParams.get('lang')!=='en'){u.searchParams.set('lang','en');history.replaceState(null,'',u.href);}}catch(e){/* Some local-file browsers restrict history changes. */}
      var b=document.getElementById('partnerBox');if(b&&window.MutationObserver)new MutationObserver(function(){document.body.dataset.ink=b.style.display==='none'?'a':'b';}).observe(b,{attributes:true,attributeFilter:['style']});
    },
    onScreen:function(id){if(id==='home'||id==='quiz'){var b=document.getElementById('partnerBox');document.body.dataset.ink=b&&b.style.display!=='none'?'b':'a';}},
    drawCard:single,drawCoupleCard:couple,pickDelay:290,loadingMs:1950
  };
})();
