(function(){
  'use strict';
  var base=window.THEME,sans='"Helvetica Neue",Arial,sans-serif';
  // All line breaking is word-based. h.fit handles an overlong single word first.
  function block(c,text,x,y,w,px,family,weight,maxLines,h){
    var tokens=String(text).trim().split(/\s+/),rows=[];
    function layout(){rows=[];var row='';tokens.forEach(function(word){var next=row?row+' '+word:word;if(row&&c.measureText(next).width>w){rows.push(row);row=word;}else row=next;});if(row)rows.push(row);}
    c.font=h.font(px,family,weight);
    var longest=tokens.reduce(function(a,b){return c.measureText(a).width>c.measureText(b).width?a:b;},'');
    px=h.fit(c,longest,w,px,family,weight);c.font=h.font(px,family,weight);layout();
    while(rows.length>maxLines&&px>20){px--;c.font=h.font(px,family,weight);layout();}
    rows.forEach(function(row,i){c.fillText(row,x,y+i*px*1.22);});
    return y+(rows.length-1)*px*1.22;
  }
  function esc(s){return String(s).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}

  function cmyk(hex){var a=hex.slice(1).match(/../g).map(function(v){return parseInt(v,16)/255;}),k=1-Math.max.apply(null,a);return a.map(function(v){return k===1?0:Math.round((1-v-k)/(1-k)*100);}).concat(Math.round(k*100));}
  window.THEME_EN={
    colors:{bg:'#F7F7F5',fg:'#111111',accent:'#111111',muted:'#646462'},cardFont:sans,letters:['A','B','C','D'],qNo:function(i,n){return 'SAMPLE '+String(i+1).padStart(2,'0')+' / '+n;},
    decor:base.decor,ornament:'',
    homeTop:'<div class="colour-study" aria-hidden="true"><div class="study-a"></div><div class="study-b"></div><div class="study-c"></div><div class="study-caption"><span>Warmth</span><span>Momentum</span><span>Space</span></div></div>',
    homeBottom:'<div class="lab-signoff"><span>No perfect shade.<br>Just your own mix.</span><span>Everyday choices.<br>Unexpected undertones.</span></div>',
    loader:'<div class="colour-loader" aria-hidden="true"><i></i><i></i><i></i></div>',
    gateArt:'<div class="pw-art covered-swatch"><div class="swatch-underlay"></div><div class="swatch-cover"><span>COLOR<br>UNDER COVER</span><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><path d="M10 14V10a6 6 0 0 1 12 0V14M7 14H25V28H7ZM16 19V23" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><small>AWAITING REVEAL</small></div><div class="swatch-corner"></div><div class="swatch-bottom"><span>YOUR EVERYDAY COLOR</span><b>— — —</b></div></div>',
    heroHTML:function(r,p,L){return '<div class="r-hero colour-hero" style="--swatch:'+r.color+';--swatch-ink:'+r.ink+'"><div class="colour-head"><span class="r-kicker">'+esc(L.resultKicker)+'</span><span class="colour-no">No. '+esc(r.seal)+'</span></div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="colour-code"><span>HEX '+r.color+'</span><span>CMYK '+cmyk(r.color).join(' / ')+'</span></div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+p+'%</b></div></div>';},
    drawCard:function(c,d,h){
      var r=d.r;c.fillStyle='#F7F7F5';c.fillRect(0,0,h.W,h.H);c.fillStyle=r.color;c.fillRect(0,0,h.W,960);
      c.fillStyle=r.ink;c.textAlign='left';block(c,d.quiz.title,65,83,700,26,sans,'normal',1,h);c.textAlign='right';block(c,'Color / '+r.seal,1015,83,230,26,sans,'normal',1,h);
      c.textAlign='left';block(c,'THE EVERYDAY PALETTE',65,908,600,24,sans,'normal',1,h);c.textAlign='right';block(c,'Color match '+d.pct+'%',1015,908,320,24,sans,'normal',1,h);
      c.textAlign='left';c.fillStyle='#111111';block(c,r.name,65,1050,950,87,sans,'bold',1,h);
      c.font=h.font(24,sans);c.fillText('HEX '+r.color,65,1101);c.textAlign='right';c.fillText('CMYK '+cmyk(r.color).join(' / '),1015,1101);
      c.textAlign='left';block(c,r.tag,65,1161,950,29,sans,'600',2,h);block(c,r.quote,65,1248,950,30,sans,'normal',2,h);
      c.fillStyle='#555551';block(c,r.traits.join(' / '),65,1331,950,24,sans,'normal',1,h);
      c.strokeStyle='#BFBFBA';c.lineWidth=1;c.beginPath();c.moveTo(65,1360);c.lineTo(1015,1360);c.stroke();
      block(c,d.labels.cardFooter,65,1402,730,23,sans,'normal',1,h);c.textAlign='right';block(c,'Just for fun',1015,1402,210,23,sans,'normal',1,h);
    }
  };
})();

