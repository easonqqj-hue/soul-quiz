(function(){
  'use strict';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function barsSVG(){var x=0;return [2,1,3,1,1,2,4,1,2,1,3,2,1,4,1,2,3,1,1,2,4,1,2,3,1,2].map(function(w,i){var p='<rect x="'+x+'" y="0" width="'+w+'" height="'+(i%7===0?31:27)+'"/>';x+=w+2;return p;}).join('');}
  function carton(sealed){return '<svg viewBox="0 0 350 235" fill="none" aria-hidden="true"><path d="M70 37L280 15L307 44L95 67Z" fill="#DFEBE7" stroke="#56998F"/><path d="M280 15L307 44V212L280 185Z" fill="#BDDCD5" stroke="#56998F"/><path d="M70 37L280 15V185L70 207Z" fill="#FAFAF7" stroke="#56998F"/><path d="M70 37L280 15V65L70 87Z" fill="#4FA89A"/><g transform="translate(94 63) skewY(-6)"><text x="0" y="0" font-family="Arial,sans-serif" font-size="14" fill="#173C35">Love care</text><text x="0" y="56" font-family="Microsoft YaHei,sans-serif" font-size="23" fill="#2A2D2E">相处说明书</text><text x="0" y="80" font-family="Microsoft YaHei,sans-serif" font-size="10" fill="#56615E">虚构恋爱用品 / 请认真沟通</text><g transform="translate(0 104)" fill="#2A2D2E">'+barsSVG()+'</g></g>'+(sealed?'<path d="M59 110L319 83V120L59 148Z" fill="#D2423A"/><g transform="translate(122 127) skewY(-6)"><text x="0" y="0" fill="#FFFFFF" font-size="15" font-family="Microsoft YaHei,sans-serif">封存 · 待开启</text></g>':'<path d="M287 59L335 53V174L307 177" fill="#FFF" stroke="#A4BEB6"/><path d="M315 80L327 79M315 91L327 90M315 102L327 101M315 113L327 112M315 124L327 123M315 135L327 134" stroke="#A4BEB6"/>')+'</svg>';}
  window.THEME={
    colors:{bg:'#FAFAF7',fg:'#2A2D2E',accent:'#4FA89A',muted:'#66736E'},letters:['','','',''],qNo:function(i,n){return '自查项目 '+String(i+1).padStart(2,'0')+' / '+n;},
    decor:'<div class="care-rule"></div><div class="care-grid"></div>',
    homeTop:'<div class="care-home-art">'+carton(false)+'</div>',ornament:'<div class="care-warning">使用提示：对事不对人，每次只改一小步。</div>',
    homeBottom:'<div class="care-bottom"><span>虚构恋爱用品</span><svg viewBox="0 0 110 31" aria-hidden="true">'+barsSVG()+'</svg><span>只谈相处习惯</span></div>',
    loader:'<div class="care-loader">'+carton(true)+'</div>',gateArt:'<div class="pw-art care-sealed">'+carton(true)+'</div>',
    onBuild:function(){document.querySelector('.h-chips').textContent='';},
    heroHTML:function(r,pct,L){return '<div class="r-hero care-result"><div class="care-band"><span>Love care</span><span>相处习惯说明书</span></div><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-tag">'+esc(r.tag)+'</div><div class="care-formula"><small>【药品名称 · 虚构】</small><strong>'+esc(r.remedy)+'</strong></div><div class="r-sub">'+esc(r.sub)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="care-trait-label">【常见成分】</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct"><span>'+esc(L.pct)+'</span><b>'+pct+'%</b><svg class="care-barcode" viewBox="0 0 110 31" aria-hidden="true">'+barsSVG()+'</svg></div></div>';},
    drawCard:function(ctx,d,h){
      ctx.fillStyle='#FAFAF7';ctx.fillRect(0,0,1080,1440);
      ctx.strokeStyle='#DDE8E2';ctx.lineWidth=1;for(var k=0;k<1080;k+=60){ctx.beginPath();ctx.moveTo(k,0);ctx.lineTo(k,1440);ctx.stroke();}
      ctx.save();ctx.translate(784,230);ctx.rotate(.095);ctx.fillStyle='#FFFFFF';ctx.fillRect(-70,-30,270,990);ctx.strokeStyle='#C9DAD3';ctx.strokeRect(-70,-30,270,990);ctx.strokeStyle='#D8E0DB';for(var j=55;j<940;j+=27){ctx.beginPath();ctx.moveTo(-30,j);ctx.lineTo(160,j);ctx.stroke();}ctx.restore();
      ctx.fillStyle='#C4DED6';ctx.beginPath();ctx.moveTo(889,138);ctx.lineTo(985,209);ctx.lineTo(985,1204);ctx.lineTo(889,1155);ctx.closePath();ctx.fill();ctx.strokeStyle='#5A9B8C';ctx.lineWidth=2;ctx.stroke();
      ctx.fillStyle='#FFFFFF';ctx.fillRect(84,138,805,1017);ctx.strokeStyle='#4F8C80';ctx.strokeRect(84,138,805,1017);
      ctx.fillStyle='#4FA89A';ctx.fillRect(84,138,805,107);ctx.fillStyle='#173C35';ctx.textAlign='left';ctx.font=h.font(35,'"Avenir Next",Arial,sans-serif');ctx.fillText('Love care',129,207);ctx.font=h.font(26,h.sans);ctx.textAlign='right';ctx.fillText('恋爱习惯说明书',842,205);
      ctx.textAlign='left';ctx.fillStyle='#66736E';ctx.font=h.font(25,h.sans);ctx.fillText('你的恋爱隐藏短板',131,301);
      ctx.fillStyle='#2A2D2E';h.fit(ctx,d.r.name,706,92,h.sans,'700');ctx.fillText(d.r.name,128,408);
      ctx.font=h.font(28,h.sans);ctx.fillStyle='#52625C';h.wrap(ctx,d.r.tag,131,464,704,42,2);
      ctx.font=h.font(24,h.sans);ctx.fillText('【药品名称 · 虚构】',122,545);ctx.fillStyle='#2F7F70';ctx.font=h.font(43,h.sans,'500');ctx.fillText(d.r.remedy,131,607);
      ctx.strokeStyle='#D2423A';ctx.lineWidth=2;ctx.strokeRect(130,649,710,141);ctx.fillStyle='#B83531';ctx.font=h.font(36,h.sans);h.wrap(ctx,d.r.quote,153,706,661,51,2);
      ctx.fillStyle='#54635D';ctx.font=h.font(25,h.sans);ctx.fillText('【常见成分】',122,852);ctx.font=h.font(27,h.sans);ctx.fillStyle='#2A2D2E';ctx.fillText(d.r.traits.join('  /  '),131,902);
      ctx.strokeStyle='#D6E2DC';ctx.beginPath();ctx.moveTo(130,940);ctx.lineTo(840,940);ctx.stroke();ctx.fillStyle='#54635D';ctx.font=h.font(24,h.sans);ctx.fillText('【使用提示】每次只练习一种新表达',122,992);
      ctx.fillStyle='#2F7F70';ctx.font=h.font(27,h.sans);ctx.fillText('习惯贴合度 '+d.pct+'%',131,1081);
      var bx=665;[3,2,5,2,1,3,4,2,1,5,3,2,3,1,4,2,3,1].forEach(function(w,i){ctx.fillStyle='#2A2D2E';ctx.fillRect(bx,1039,w,i%5===0?49:42);bx+=w+5;});
      ctx.fillStyle='#FAFAF7';ctx.fillRect(115,1196,725,104);ctx.strokeStyle='#D2423A';ctx.lineWidth=1.5;ctx.strokeRect(115,1196,725,104);ctx.fillStyle='#B83531';ctx.font=h.font(26,h.sans);ctx.fillText('【注意事项】',137,1237);ctx.fillStyle='#52625C';ctx.font=h.font(25,h.sans);ctx.fillText('习惯可以调整，别把一个标签当作全部的你。',137,1277);
      ctx.textAlign='center';ctx.fillStyle='#2A2D2E';ctx.font=h.font(28,h.sans);ctx.fillText(d.labels.cardFooter,540,1350);ctx.fillStyle='#66736E';ctx.font=h.font(23,h.sans);ctx.fillText('趣味测试 · 仅供娱乐',540,1394);
    },pickDelay:460,loadingMs:2100
  };
})();
