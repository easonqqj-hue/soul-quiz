(function(){
  'use strict';
  var ink='<svg viewBox="0 0 640 640" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M491 112C364 18 168 65 101 218C25 390 154 571 322 558C477 546 585 415 523 274" stroke="currentColor" stroke-width="61" stroke-linecap="butt"/><path d="M491 112C350 38 161 101 121 249C77 415 197 541 354 524" stroke="currentColor" stroke-width="8"/><path d="M67 383L121 503L195 545L121 470Z M501 104L535 144L507 194L476 136Z" fill="currentColor"/><g fill="currentColor"><circle cx="84" cy="151" r="7"/><circle cx="547" cy="227" r="12"/><circle cx="66" cy="452" r="5"/><circle cx="566" cy="194" r="4"/><circle cx="444" cy="564" r="6"/></g></svg>';
  var seal='<span class="mp-red-seal">山门<br>亲启</span>';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  window.THEME={
    colors:{bg:'#F1ECE2',fg:'#161514',accent:'#C0392B',muted:'#77716A'},
    letters:['甲','乙','丙','丁'],qNo:function(i){return '问心 · '+String(i+1).padStart(2,'0');},pickDelay:460,loadingMs:2000,
    decor:'<div class="mp-edge-ink">'+ink+'</div><div class="mp-paper"></div>',
    homeTop:'<div class="mp-notice"><span>山门大开</span><b>招新榜</b><span>见字如晤</span></div><div class="mp-home-ink">'+ink+'</div><span class="mp-side-note">不问根骨<br>且问本心</span>',
    homeBottom:'<div class="mp-bottom">择一门风　修一段自己的路</div>',
    ornament:'<span class="mp-stamp">叩山门</span>',
    loader:'<div class="mp-loading-seal">录<br>取</div>',
    gateArt:'<div class="pw-art mp-envelope" aria-hidden="true"><span class="mp-envelope-line"></span><span class="mp-envelope-label">录取帖</span><span class="mp-envelope-small">三十问已毕<br>此帖候君启</span>'+seal+'</div>',
    heroHTML:function(r,pct,L){return '<div class="r-hero mp-admission"><div class="mp-admission-head"><span>'+esc(L.resultKicker)+'</span><span>门下新录</span></div><div class="mp-admission-body"><span class="mp-admit-word">兹录取</span><h1 class="r-name">'+esc(r.name)+'</h1><div class="mp-teacher">'+esc(r.sub)+'</div><span class="mp-school-seal">'+esc(r.seal)+'</span></div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct"><span>'+esc(L.pct)+'</span><b>'+pct+'%</b></div></div>';},
    drawCard:function(ctx,d,h){
      var r=d.r,W=h.W,H=h.H;
      ctx.fillStyle='#F1ECE2';ctx.fillRect(0,0,W,H);h.noise(ctx,12000,'rgba(70,55,35,A)',28);
      ctx.strokeStyle='#161514';ctx.lineWidth=2;ctx.strokeRect(48,48,984,1344);ctx.strokeRect(62,62,956,1316);
      ctx.fillStyle='#161514';ctx.textAlign='left';ctx.font=h.font(27,h.serif);ctx.fillText('山门招新榜  /  我的录取帖',105,125);
      ctx.beginPath();ctx.moveTo(104,158);ctx.lineTo(976,158);ctx.stroke();
      ctx.save();ctx.translate(274,415);ctx.strokeStyle='rgba(22,21,20,.09)';ctx.lineWidth=46;ctx.beginPath();ctx.arc(0,0,169,.45,Math.PI*2-.28);ctx.stroke();ctx.restore();
      ctx.textAlign='center';ctx.fillStyle='#161514';ctx.font=h.font(61,h.serif,'bold');Array.from('兹录取').forEach(function(t,i){ctx.fillText(t,895,251+i*83);});
      ctx.font=h.font(92,'"Kaiti SC","STKaiti","KaiTi",'+h.serif,'bold');Array.from(r.name).forEach(function(t,i){ctx.fillText(t,723,250+i*98);});
      ctx.fillStyle='#625C54';ctx.font=h.font(29,h.serif);Array.from(r.sub.replace(' · ','')).forEach(function(t,i){ctx.fillText(t,578,242+i*36);});
      ctx.textAlign='left';ctx.fillStyle='#C0392B';ctx.font=h.font(33,h.serif,'bold');h.wrap(ctx,r.tag,116,280,340,52,2);
      ctx.fillStyle='#161514';ctx.font=h.font(42,h.serif);h.wrap(ctx,r.quote,116,426,340,68,3);
      ctx.save();ctx.translate(185,622);ctx.rotate(-.07);ctx.strokeStyle='#C0392B';ctx.lineWidth=5;ctx.strokeRect(-67,-62,134,134);ctx.strokeRect(-58,-53,116,116);ctx.fillStyle='#C0392B';ctx.font=h.font(47,h.serif,'bold');ctx.textAlign='center';ctx.fillText(r.seal.slice(0,1),0,-5);ctx.fillText(r.seal.slice(1),0,48);ctx.restore();
      ctx.strokeStyle='#AFA69A';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(105,798);ctx.lineTo(975,798);ctx.stroke();
      ctx.fillStyle='#161514';ctx.font=h.font(30,h.serif);ctx.textAlign='left';ctx.fillText('门风相契  '+d.pct+'%',110,850);ctx.textAlign='right';ctx.fillText(r.traits.join(' / '),968,850);
      h.bars(ctx,124,915,830,d.dims,d.dimNames,{fill:'#161514',label:'#655E55',track:'#DDD5C9',rowH:48,px:28,labelW:140});
      ctx.textAlign='center';ctx.fillStyle='#161514';ctx.font=h.font(29,h.serif);ctx.fillText(d.labels.cardFooter,540,1291);ctx.fillStyle='#77716A';ctx.font=h.font(24,h.sans);ctx.fillText('趣味测试 · 仅供娱乐',540,1338);
    }
  };
})();
