(function(){
  'use strict';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function lens(id,veiled){return '<svg viewBox="0 0 340 280" fill="none" aria-hidden="true"><defs><linearGradient id="'+id+'-rim" x1="55" y1="30" x2="270" y2="250" gradientUnits="userSpaceOnUse"><stop stop-color="#B8A8F0"/><stop offset=".34" stop-color="#F4F2F7"/><stop offset=".63" stop-color="#9EE6D0"/><stop offset="1" stop-color="#FFC2A8"/></linearGradient><radialGradient id="'+id+'-haze"><stop stop-color="#FFF"/><stop offset=".65" stop-color="#DCD6F0" stop-opacity=".3"/><stop offset="1" stop-color="#B8A8F0" stop-opacity="0"/></radialGradient></defs><circle cx="170" cy="140" r="133" fill="url(#'+id+'-haze)"/><ellipse cx="170" cy="140" rx="119" ry="100" transform="rotate(-32 170 140)" stroke="url(#'+id+'-rim)" stroke-width="28"/><ellipse cx="170" cy="140" rx="121" ry="102" transform="rotate(-32 170 140)" stroke="white" stroke-opacity=".8"/><ellipse cx="170" cy="140" rx="153" ry="66" transform="rotate(25 170 140)" stroke="#8C839D" stroke-opacity=".4"/><ellipse cx="170" cy="140" rx="142" ry="89" transform="rotate(-32 170 140)" stroke="white"/><circle cx="293" cy="171" r="7" fill="#9EE6D0" stroke="white"/>'+(veiled?'<rect x="122" y="80" width="96" height="120" rx="12" fill="#F4F2F7" fill-opacity=".85" stroke="white"/><path d="M150 127V117A20 20 0 0 1 190 117V127M146 127H194V164H146Z" stroke="#777183" stroke-width="1.5"/><circle cx="170" cy="143" r="3" fill="#777183"/>':'<circle cx="170" cy="117" r="20" stroke="#5E566D" stroke-width="1.3"/><path d="M131 181C131 140 209 140 209 181" stroke="#5E566D" stroke-width="1.3"/><path d="M150 190H190" stroke="#5E566D" stroke-width="1.3"/>')+'</svg>';}
  function halo(ctx,x,y,r){
    ctx.save();ctx.translate(x,y);
    var g=ctx.createLinearGradient(-r,-r,r,r);g.addColorStop(0,'#B8A8F0');g.addColorStop(.32,'#FBFAFC');g.addColorStop(.6,'#9EE6D0');g.addColorStop(1,'#FFC2A8');
    ctx.strokeStyle=g;ctx.lineWidth=47;ctx.beginPath();ctx.ellipse(0,0,r,r*.82,-.52,0,Math.PI*2);ctx.stroke();
    ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,r+22,r*.82+22,-.52,0,Math.PI*2);ctx.stroke();
    ctx.strokeStyle='rgba(111,102,130,.32)';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(0,0,r+70,r*.53,.4,0,Math.PI*2);ctx.stroke();ctx.restore();
  }
  window.THEME={
    colors:{bg:'#F4F2F7',fg:'#2E2A3A',accent:'#5C5074',muted:'#777080'},letters:['01','02','03','04'],
    qNo:function(i,n){return '切面 '+String(i+1).padStart(2,'0')+' / '+n;},
    decor:'<div class="field-orbs"><i></i><i></i><i></i></div><div class="field-axis"></div>',
    homeTop:'<div class="field-home"><span class="field-side">相遇的线索</span>'+lens('home',false)+'<span class="field-caption">a little closer</span></div>',
    homeBottom:'<div class="field-note">吸引，是相处细节的回声。</div>',ornament:'',
    loader:'<div class="field-loading">'+lens('loading',true)+'</div>',gateArt:'<div class="pw-art field-veiled">'+lens('sealed',true)+'</div>',
    onBuild:function(){document.querySelector('.h-chips').textContent='';},
    heroHTML:function(r,pct,L){return '<div class="r-hero field-portrait"><div class="r-kicker">'+esc(L.resultKicker)+'</div><div class="field-result-art">'+lens('portrait-'+r.id,false)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-tag">'+esc(r.tag)+'</div><div class="r-sub">'+esc(r.sub)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct"><span>'+esc(L.pct)+'</span><b>'+pct+'%</b></div></div>';},
    drawCard:function(ctx,d,h){
      ctx.fillStyle='#F4F2F7';ctx.fillRect(0,0,h.W,h.H);
      [[40,300,610,'#D4C7F4'],[970,600,650,'#BAECDD'],[600,1400,620,'#FFD7C5']].forEach(function(a){var g=ctx.createRadialGradient(a[0],a[1],0,a[0],a[1],a[2]);g.addColorStop(0,a[3]);g.addColorStop(1,'rgba(244,242,247,0)');ctx.fillStyle=g;ctx.fillRect(0,0,1080,1440);});
      ctx.fillStyle='rgba(255,255,255,.54)';h.rr(ctx,73,91,934,1202,40);ctx.fill();ctx.strokeStyle='#FFFFFF';ctx.lineWidth=3;ctx.stroke();
      ctx.strokeStyle='rgba(107,95,132,.18)';ctx.lineWidth=1;h.rr(ctx,89,108,902,1168,29);ctx.stroke();
      ctx.textAlign='center';ctx.fillStyle='#5D556D';ctx.font=h.font(28,h.sans);ctx.fillText('你容易吸引什么样的恋人',540,175);
      ctx.font=h.font(28,'"Avenir Next",Futura,Arial,sans-serif');ctx.fillText('Attraction, in everyday moments',540,228);
      halo(ctx,540,438,170);ctx.strokeStyle='#756B84';ctx.lineWidth=2;ctx.beginPath();ctx.arc(540,414,32,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(477,502);ctx.bezierCurveTo(477,448,603,448,603,502);ctx.stroke();
      ctx.fillStyle='#6D647D';ctx.font=h.font(26,h.sans);ctx.fillText('向你靠近的人',540,627);
      ctx.fillStyle='#2E2A3A';h.fit(ctx,d.r.name,790,100,h.sans,'500');ctx.fillText(d.r.name,540,735);
      ctx.fillStyle='#5C5074';ctx.font=h.font(31,h.sans);h.wrap(ctx,d.r.tag,540,802,790,44,2);
      ctx.fillStyle='#2E2A3A';ctx.font=h.font(37,h.sans);h.wrap(ctx,d.r.quote,540,875,780,54,2);
      ctx.font=h.font(25,h.sans);ctx.fillStyle='#696273';ctx.fillText(d.r.traits.join('  /  '),540,990);
      ctx.textAlign='left';ctx.font=h.font(24,h.sans);ctx.fillText('你的相处信号',151,1050);ctx.textAlign='right';ctx.fillText('画像贴合度 '+d.pct+'%',926,1050);
      d.dims.forEach(function(v,i){var x=158+i*133;ctx.fillStyle='rgba(108,91,142,.1)';h.rr(ctx,x,1090,92,63,8);ctx.fill();ctx.fillStyle='#5C5074';ctx.fillRect(x,1151,92*v/100,3);ctx.font=h.font(31,'"Avenir Next",Arial,sans-serif');ctx.textAlign='center';ctx.fillText(v,x+46,1134);ctx.font=h.font(24,h.sans);ctx.fillStyle='#5E5769';ctx.fillText(d.dimNames[i],x+46,1200);});
      ctx.textAlign='center';ctx.fillStyle='#514A5F';ctx.font=h.font(28,h.sans);ctx.fillText(d.labels.cardFooter,540,1340);ctx.fillStyle='#756E80';ctx.font=h.font(23,h.sans);ctx.fillText('趣味测试 · 仅供娱乐',540,1384);
    },pickDelay:460,loadingMs:2100
  };
})();
