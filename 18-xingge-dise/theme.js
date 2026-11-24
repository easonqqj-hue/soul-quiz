(function(){
  'use strict';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function cmyk(hex){var rgb=hex.slice(1).match(/../g).map(function(x){return parseInt(x,16)/255;}),k=1-Math.max.apply(null,rgb);return rgb.map(function(v){return Math.round((1-v-k)/(1-k)*100);}).concat(Math.round(k*100));}
  function codes(r){var c=cmyk(r.color);return '<span>HEX '+r.color+'</span><span>CMYK '+c.join(' / ')+'</span>';}
  window.THEME={
    colors:{bg:'#F7F7F5',fg:'#111111',accent:'#111111',muted:'#646462'},letters:['A','B','C','D'],qNo:function(i){return 'Sample '+String(i+1).padStart(2,'0')+' / 生活取样';},pickDelay:240,loadingMs:2050,
    decor:'<div class="lab-margin lab-margin-left"></div><div class="lab-margin lab-margin-right"></div>',
    homeTop:'<div class="colour-study" aria-hidden="true"><div class="study-a"></div><div class="study-b"></div><div class="study-c"></div><div class="study-caption"><span>温度</span><span>节奏</span><span>留白</span></div></div>',
    homeBottom:'<div class="lab-signoff"><span>Your everyday,<br>in colour.</span><span>没有标准色，<br>只有你自己的配比。</span></div>',
    loader:'<div class="colour-loader"><i></i><i></i><i></i></div>',
    gateArt:'<div class="pw-art covered-swatch"><div class="swatch-underlay"></div><div class="swatch-cover"><span>COLOUR<br>UNDER COVER</span><svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"><path d="M10 14V10a6 6 0 0 1 12 0V14M7 14H25V28H7ZM16 19V23" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><small>尚未揭色</small></div><div class="swatch-corner"></div><div class="swatch-bottom"><span>你的性格底色</span><b>— — —</b></div></div>',
    heroHTML:function(r,pct,L){return '<div class="r-hero colour-hero" style="--swatch:'+r.color+';--swatch-ink:'+r.ink+'"><div class="colour-head"><span class="r-kicker">'+esc(L.resultKicker)+'</span><span class="colour-no">No. '+r.seal+'</span></div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="colour-code">'+codes(r)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div>';},
    drawCard:function(ctx,d,h){
      var r=d.r,c=cmyk(r.color);ctx.fillStyle='#F7F7F5';ctx.fillRect(0,0,h.W,h.H);ctx.fillStyle=r.color;ctx.fillRect(0,0,h.W,960);
      ctx.fillStyle=r.ink;ctx.textAlign='left';ctx.font=h.font(26,h.sans);ctx.fillText(d.quiz.title,65,83);ctx.textAlign='right';ctx.font=h.font(27,'"Helvetica Neue",Arial,sans-serif');ctx.fillText('Colour / '+r.seal,1015,83);
      ctx.textAlign='left';ctx.font=h.font(25,'"Helvetica Neue",Arial,sans-serif');ctx.fillText(r.sub.toUpperCase(),65,908);ctx.textAlign='right';ctx.fillText(r.color,1015,908);
      ctx.fillStyle='#111111';ctx.textAlign='left';ctx.font=h.font(88,h.sans,'bold');ctx.fillText(r.name,60,1070);ctx.textAlign='right';ctx.font=h.font(25,'"Helvetica Neue",Arial,sans-serif');ctx.fillText('HEX '+r.color,1015,1022);ctx.fillText('CMYK '+c.join(' / '),1015,1066);
      ctx.textAlign='left';ctx.font=h.font(32,h.sans,'600');ctx.fillText(r.tag,65,1136);ctx.font=h.font(31,h.sans);h.wrap(ctx,r.quote,65,1198,950,44,2);
      ctx.font=h.font(25,h.sans);ctx.fillStyle='#555551';ctx.fillText(r.traits.join(' / '),65,1290);ctx.textAlign='right';ctx.fillText('底色契合 '+d.pct+'%',1015,1290);
      ctx.strokeStyle='#BFBFBA';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(65,1334);ctx.lineTo(1015,1334);ctx.stroke();ctx.textAlign='left';ctx.fillStyle='#51514C';ctx.font=h.font(23,h.sans);ctx.fillText(d.labels.cardFooter,65,1387);ctx.textAlign='right';ctx.fillText('趣味测试 · 仅供娱乐',1015,1387);
    }
  };
})();
