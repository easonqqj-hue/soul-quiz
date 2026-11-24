(function(){
  'use strict';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function tint(hex,t){var c=hex.slice(1).match(/../g).map(function(x){return parseInt(x,16);});return '#'+c.map(function(x){return Math.round(t>0?x+(255-x)*t:x*(1+t)).toString(16).padStart(2,'0');}).join('');}
  var facets=[[[90,15],[155,40],[120,83]],[[90,15],[120,83],[58,69]],[[90,15],[58,69],[29,49]],[[29,49],[58,69],[18,118]],[[58,69],[120,83],[90,145]],[[18,118],[58,69],[90,145]],[[155,40],[173,114],[120,83]],[[120,83],[173,114],[90,145]],[[18,118],[90,145],[87,203]],[[90,145],[173,114],[87,203]]];
  var shades=[.42,.16,-.04,-.3,-.12,-.48,-.25,.26,-.32,-.04];
  function gem(color){return '<svg viewBox="0 0 190 220" role="img" aria-label="多切面宝石标本">'+facets.map(function(p,i){return '<polygon points="'+p.map(function(v){return v.join(',');}).join(' ')+'" fill="'+tint(color,shades[i])+'" stroke="'+tint(color,.55)+'" stroke-opacity=".35" stroke-width=".7"/>';}).join('')+'<path d="M90 15 58 69 120 83 155 40M18 118 90 145 87 203" fill="none" stroke="#EFE8DA" stroke-opacity=".5" stroke-width=".7"/></svg>';}
  var cage='<svg viewBox="0 0 260 250" aria-hidden="true"><path d="M28 195V68L130 15 232 68V195L130 235Z" fill="#102D27" stroke="#B08D57"/><path d="M28 68 130 119 232 68M130 119V235M28 195 130 145 232 195M130 15V66" fill="none" stroke="#B08D57" stroke-opacity=".45"/><path d="M72 73 130 44 188 73 188 153 130 184 72 153Z" fill="#0B211C" stroke="#B08D57" stroke-opacity=".65"/><path d="M74 75 186 151M186 75 74 151" stroke="#B08D57" stroke-opacity=".25"/><circle cx="130" cy="112" r="23" fill="#B08D57"/><path d="M123 110V104a7 7 0 0 1 14 0V110M121 110H139V125H121Z" fill="none" stroke="#102D27" stroke-width="2"/><path d="M43 204 130 248 217 204" fill="none" stroke="#B08D57" stroke-opacity=".3"/></svg>';
  window.THEME={
    colors:{bg:'#0F2A24',fg:'#EFE8DA',accent:'#B08D57',muted:'#ABBAAF'},letters:['a','b','c','d'],
    qNo:function(i){return '切面 / '+String(i+1).padStart(2,'0');},pickDelay:290,loadingMs:2100,
    decor:'<div class="museum-walls"></div><svg class="museum-lines" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#B08D57" stroke-width=".7"><path d="M-100 300 220 80 430 400 160 710ZM980 60 1230 320 1020 740 800 410Z"/><path d="M220 80 160 710M-100 300 430 400M980 60 1020 740M800 410 1230 320"/></g></svg>',
    homeTop:'<div class="specimen-scene"><span class="specimen-note">COLLECTION<br>OF THE ORDINARY</span><div class="home-gem">'+gem('#8AAE9D')+'</div><span class="specimen-scale">日常采集<br>尚待命名</span><div class="specimen-plinth"></div></div>',
    ornament:'<svg width="92" height="12" viewBox="0 0 92 12" aria-hidden="true"><path d="M0 6H36M56 6H92M46 1 51 6 46 11 41 6Z" fill="none" stroke="currentColor"/></svg>',
    homeBottom:'<div class="museum-caption">每种切面，都有自己的光。</div>',
    loader:'<div class="specimen-loader">'+gem('#B08D57')+'</div>',
    gateArt:'<div class="pw-art specimen-locked">'+cage+'</div>',
    heroHTML:function(r,pct,L){return '<div class="r-hero specimen-hero"><div class="specimen-display"><span class="specimen-id">N° '+esc(r.seal)+'</span>'+gem(r.color)+'<span class="specimen-type">FACET COLLECTION</span></div><div class="specimen-label"><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div></div>';},
    drawCard:function(ctx,d,h){
      var r=d.r;ctx.fillStyle='#0F2A24';ctx.fillRect(0,0,h.W,h.H);h.noise(ctx,9000,'rgba(239,232,218,A)',16);
      ctx.strokeStyle='#B08D57';ctx.lineWidth=2;ctx.strokeRect(44,44,992,1352);ctx.strokeRect(57,57,966,1326);
      ctx.textAlign='left';ctx.fillStyle='#D9C49F';ctx.font=h.font(27,h.sans);ctx.fillText(d.quiz.title,92,118);
      ctx.textAlign='right';ctx.font=h.font(38,'Didot,Georgia,serif');ctx.fillText('N° '+r.seal,988,122);
      ctx.save();ctx.translate(316,160);ctx.scale(2.35,2.15);facets.forEach(function(p,i){ctx.beginPath();p.forEach(function(v,j){j?ctx.lineTo(v[0],v[1]):ctx.moveTo(v[0],v[1]);});ctx.closePath();ctx.fillStyle=tint(r.color,shades[i]);ctx.fill();ctx.strokeStyle=tint(r.color,.5);ctx.lineWidth=.6;ctx.stroke();});ctx.restore();
      ctx.strokeStyle='#6B7054';ctx.beginPath();ctx.ellipse(540,626,218,18,0,0,Math.PI*2);ctx.stroke();
      ctx.fillStyle='#EFE8DA';ctx.fillRect(92,686,896,630);ctx.fillStyle='#30463D';ctx.textAlign='left';ctx.font=h.font(24,h.sans);ctx.fillText('天赋标本 / '+r.sub,132,738);
      ctx.fillStyle='#17372C';h.fit(ctx,r.name,800,91,h.serif,'bold');ctx.fillText(r.name,128,850);
      ctx.font=h.font(31,h.sans);ctx.fillText(r.tag,132,905);ctx.strokeStyle='#B9B29F';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(132,937);ctx.lineTo(948,937);ctx.stroke();
      ctx.font=h.font(34,h.serif);h.wrap(ctx,r.quote,132,992,810,46,2);
      ctx.font=h.font(26,h.sans);ctx.fillStyle='#526255';ctx.fillText(r.traits.join(' / '),132,1095);
      var top=d.dims.map(function(v,i){return {v:v,n:d.dimNames[i]};}).sort(function(a,b){return b.v-a.v;}).slice(0,3);
      top.forEach(function(x,i){var y=1150+i*43;ctx.font=h.font(25,h.sans);ctx.fillText(x.n,132,y);ctx.fillStyle='#D4D2C2';ctx.fillRect(245,y-15,450,8);ctx.fillStyle='#466854';ctx.fillRect(245,y-15,450*x.v/100,8);ctx.fillText(String(x.v),722,y);});
      ctx.font=h.font(23,h.sans);ctx.fillStyle='#526255';ctx.fillText('产地：你的日常选择',132,1281);ctx.textAlign='right';ctx.fillText('切面契合 '+d.pct+'%',948,1281);
      ctx.textAlign='center';ctx.fillStyle='#C2C9BA';ctx.font=h.font(23,h.sans);ctx.fillText(d.labels.cardFooter+'  /  趣味测试 · 仅供娱乐',540,1364);
    }
  };
})();
