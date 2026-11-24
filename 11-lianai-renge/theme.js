(function(){
  'use strict';
  var serif='"Songti SC","STSong","Noto Serif CJK SC","Source Han Serif SC","SimSun",serif';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  var envelope='<svg viewBox="0 0 360 210" fill="none" aria-hidden="true"><path d="M30 58L180 13L330 58V185H30Z" fill="#EAD0C7" stroke="#C99A9A"/><path d="M57 22H303V163H57Z" fill="#FFF9F3" stroke="#D8B9AE"/><path d="M83 48H178M83 64H254M83 80H224" stroke="#C99A9A"/><path d="M30 58L180 136L330 58V185H30Z" fill="#F3DDD3" stroke="#C99A9A"/><path d="M30 185L144 116M330 185L216 116" stroke="#C99A9A"/><path d="M180 100C190 96 195 105 205 107C211 117 211 124 208 134C204 144 194 143 185 150C175 153 167 145 157 142C148 134 153 125 150 116C155 108 164 103 172 104Z" fill="#7A1F2B"/><circle cx="180" cy="125" r="20" stroke="#C99A9A" stroke-opacity=".65"/><path d="M180 136C176 132 165 126 168 119C171 112 179 117 180 120C182 115 190 114 192 119C196 126 184 134 180 136Z" stroke="#E6BBB1"/><path d="M48 172H107M253 172H312" stroke="#B88E83"/></svg>';
  function seal(ctx,x,y,r){
    ctx.save();ctx.translate(x,y);ctx.beginPath();
    for(var i=0;i<=120;i++){var a=i*Math.PI/60,rr=r*(1+.035*Math.sin(a*9)+.025*Math.cos(a*13));var px=Math.cos(a)*rr,py=Math.sin(a)*rr;i?ctx.lineTo(px,py):ctx.moveTo(px,py);}
    ctx.closePath();ctx.fillStyle='#7A1F2B';ctx.fill();ctx.strokeStyle='#C99A9A';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,r*.74,0,Math.PI*2);ctx.stroke();
    ctx.font='36px '+serif;ctx.fillStyle='#F6E7E1';ctx.textAlign='center';ctx.fillText('心',0,12);ctx.restore();
  }
  window.THEME={
    colors:{bg:'#F6E7E1',fg:'#2C3445',accent:'#7A1F2B',muted:'#7F6260'},
    letters:['a','b','c','d'],qNo:function(i){return '第 '+String(i+1).padStart(2,'0')+' 行 / 写给你'},
    decor:'<div class="letter-border"></div><div class="ink-flower"><svg viewBox="0 0 260 520" fill="none"><path d="M96 505C144 376 91 287 155 141M113 402C47 369 36 317 40 286C95 304 111 340 113 402M123 337C190 321 212 272 213 242C160 249 132 283 123 337M133 237C72 215 72 166 79 139C123 153 140 187 133 237M155 141C119 126 117 87 135 62C158 76 169 103 155 141M155 141C180 90 211 81 237 85C226 119 196 143 155 141" stroke="currentColor"/></svg></div>',
    homeTop:'<div class="letter-home-art">'+envelope+'</div>',homeBottom:'<div class="letter-sign">Yours, in everyday ways.</div>',
    ornament:'<svg width="86" height="12" viewBox="0 0 86 12" aria-hidden="true"><path d="M0 6H34M52 6H86M38 6L43 2L48 6L43 10Z" fill="none" stroke="currentColor"/></svg>',
    loader:'<div class="letter-loading">'+envelope+'</div>',gateArt:'<div class="pw-art letter-sealed">'+envelope+'</div>',
    onBuild:function(){document.querySelector('.h-chips').textContent='';},
    heroHTML:function(r,pct,L){return '<div class="r-hero letter-open"><div class="letter-fold" aria-hidden="true"></div><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct"><span>'+esc(L.pct)+'</span><b>'+pct+'%</b></div><div class="letter-autograph">认真喜欢的你</div><div class="r-seal">'+esc(r.seal)+'</div></div>';},
    drawCard:function(ctx,d,h){
      ctx.fillStyle='#F6E7E1';ctx.fillRect(0,0,h.W,h.H);h.noise(ctx,9000,'rgba(80,35,28,A)',17);
      ctx.strokeStyle='#D8B5AA';ctx.lineWidth=2;ctx.strokeRect(38,38,1004,1364);
      ctx.fillStyle='#E8C9BD';ctx.beginPath();ctx.moveTo(48,970);ctx.lineTo(540,690);ctx.lineTo(1032,970);ctx.lineTo(1032,1280);ctx.lineTo(48,1280);ctx.closePath();ctx.fill();
      ctx.fillStyle='#FFF9F3';ctx.fillRect(90,87,900,1120);ctx.strokeStyle='#D8B5AA';ctx.strokeRect(90,87,900,1120);
      ctx.textAlign='left';ctx.fillStyle='#7F6260';ctx.font=h.font(26,h.sans);ctx.fillText('测你的恋爱人格',155,155);
      ctx.font=h.font(34,serif);ctx.fillStyle='#7A1F2B';ctx.fillText('致 恋爱中的你：',155,242);
      h.fit(ctx,d.r.name,770,104,serif,'bold');ctx.fillStyle='#2C3445';ctx.fillText(d.r.name,155,378);
      ctx.font=h.font(31,serif);ctx.fillStyle='#7A1F2B';h.wrap(ctx,d.r.tag,155,450,750,46,2);
      ctx.strokeStyle='#DBC2B7';ctx.lineWidth=1;[572,642,712].forEach(function(y){ctx.beginPath();ctx.moveTo(155,y);ctx.lineTo(925,y);ctx.stroke();});
      ctx.fillStyle='#2C3445';ctx.font=h.font(43,'"Kaiti SC","STKaiti","KaiTi",serif');h.wrap(ctx,d.r.quote,155,553,742,70,3);
      ctx.font=h.font(26,h.sans);ctx.fillStyle='#7F6260';ctx.fillText(d.r.traits.join('  /  '),155,765);
      h.bars(ctx,155,812,710,d.dims,d.dimNames,{fill:'#7A1F2B',label:'#69595D',track:'#EBDDD5',rowH:37,px:25,labelW:125});
      ctx.fillStyle='#F0D6CA';ctx.beginPath();ctx.moveTo(48,970);ctx.lineTo(540,1200);ctx.lineTo(1032,970);ctx.lineTo(1032,1280);ctx.lineTo(48,1280);ctx.closePath();ctx.fill();
      ctx.strokeStyle='#C99A9A';ctx.beginPath();ctx.moveTo(48,1280);ctx.lineTo(405,1125);ctx.moveTo(1032,1280);ctx.lineTo(675,1125);ctx.stroke();
      ctx.font=h.font(27,serif);ctx.fillStyle='#7A1F2B';ctx.fillText('笔迹相似度 '+d.pct+'%',132,1210);seal(ctx,879,1180,67);
      ctx.textAlign='center';ctx.fillStyle='#2C3445';ctx.font=h.font(29,serif);ctx.fillText(d.labels.cardFooter,540,1330);ctx.fillStyle='#7F6260';ctx.font=h.font(23,h.sans);ctx.fillText('趣味测试 · 仅供娱乐',540,1374);
    },pickDelay:460,loadingMs:2100
  };
})();
