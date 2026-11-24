(function(){
  'use strict';
  var green='#6F9C8F',ink='#3B4A48',red='#9C3B2B',paper='#F4F1EC';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  var book='<svg viewBox="0 0 360 200" fill="none" aria-hidden="true"><path d="M27 18H175L180 26L185 18H333V181H187L180 188L173 181H27Z" fill="'+paper+'" stroke="'+ink+'"/><path d="M33 12H172L180 20V177L171 170H33Z" fill="'+green+'"/><path d="M188 12H327V170H189L180 177V20Z" fill="'+red+'"/><path d="M43 146L74 116L104 135L135 106L166 129M43 153L75 123L104 142L136 113L166 136" stroke="'+ink+'" opacity=".55"/><path d="M196 149L233 112L252 131L280 96L316 145Z" fill="'+paper+'" opacity=".87"/><path d="M51 37L48 50M75 49L72 62M102 30L99 43M132 42L129 55M154 25L151 38M55 78L52 91M108 79L105 92M149 71L146 84" stroke="'+paper+'" opacity=".7"/><path d="M180 20V177M37 177H170M190 177H323" stroke="'+ink+'" opacity=".5"/><g fill="'+paper+'" font-family="SimSun,serif" font-size="40"><text x="80" y="103">南</text><text x="232" y="83">北</text></g><path d="M283 12V65L294 58L305 65V12" fill="#C89B5D"/></svg>';
  function south(vals){return Math.max(3,Math.min(97,Math.round(50+(vals[0]+vals[3]+vals[4]-vals[1]-vals[2]-vals[5])/6)));}
  function gauge(ans){var s=0,n=0;ans.forEach(function(a,i){if(a==null||!window.QUIZ.questions[i])return;var w=window.QUIZ.questions[i].o[a][1];s+=(w.A||0)+(w.D||0)+(w.E||0);n+=(w.B||0)+(w.C||0)+(w.F||0);});var bar=document.querySelector('.q-bar');if(bar)bar.style.setProperty('--north',(s+n?10+80*n/(s+n):50)+'%');}
  function stored(){try{return JSON.parse(localStorage.getItem('sq_nanbei-renge')||'{}').answers||[];}catch(e){return [];}}
  window.THEME={
    colors:{bg:paper,fg:ink,accent:red,muted:'#65736E'},letters:['一','二','三','四'],
    qNo:function(i){gauge(stored());return '南北之间 / 第 '+String(i+1).padStart(2,'0')+' 页';},
    decor:'<div class="south-field"></div><div class="north-field"></div><div class="book-spine"></div>',
    homeTop:'<div class="open-book">'+book+'</div>',homeBottom:'<div class="colophon"><span>雨巷 / South</span><i></i><span>雪原 / North</span></div>',
    ornament:'<span class="binding-rule"></span>',loader:'<div class="loading-book">'+book+'</div>',
    gateArt:'<div class="pw-art sealed-book"><span class="cover-half"></span><span class="cover-half"></span><span class="book-title">南北之间</span><span class="book-band">私藏篇章 · 尚未拆封</span><i class="book-clasp">封</i></div>',
    onBuild:function(){document.getElementById('chips').replaceChildren();document.querySelector('.q-bar').insertAdjacentHTML('beforeend','<span class="gauge-ends" aria-hidden="true"><span>南 S</span><span>北 N</span></span>');document.getElementById('stage').addEventListener('click',function(e){var b=e.target.closest('.opt');if(!b)return;var ans=stored().slice();ans[Number(document.getElementById('qIdx').textContent)-1]=Number(b.dataset.k);gauge(ans);});},
    heroHTML:function(r,pct,L){return '<div class="r-hero"><div class="chapter-top"><span>南北之间</span><span>私人藏书</span></div><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="split-ratio"><div><small>南方意象</small><b data-south>—</b><em>%</em></div><div><small>北方意象</small><b data-north>—</b><em>%</em></div></div><p class="ratio-note">南北偏好比例 · 不是地域归属</p><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(x){return '<span>'+esc(x)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div>';},
    onResult:function(cur,el){var s=south(cur.z.map(function(z){return Math.round(100/(1+Math.exp(-z*.9)));}));el.querySelector('[data-south]').textContent=s;el.querySelector('[data-north]').textContent=100-s;},
    drawCard:function(ctx,d,h){
      var s=south(d.dims);ctx.fillStyle=paper;ctx.fillRect(0,0,1080,1440);
      ctx.fillStyle=green;ctx.fillRect(0,0,540,526);ctx.fillStyle=red;ctx.fillRect(540,0,540,526);
      ctx.save();ctx.strokeStyle='rgba(244,241,236,.24)';ctx.lineWidth=2;for(var i=0;i<45;i++){var x=25+(i*79)%495,y=25+(i*47)%455;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-13,y+35);ctx.stroke();}ctx.fillStyle='rgba(244,241,236,.13)';ctx.beginPath();ctx.moveTo(540,526);ctx.lineTo(680,355);ctx.lineTo(787,436);ctx.lineTo(938,290);ctx.lineTo(1080,420);ctx.lineTo(1080,526);ctx.fill();ctx.restore();
      ctx.textAlign='center';ctx.fillStyle=paper;ctx.font=h.font(26,h.sans);ctx.fillText(d.quiz.title,540,80);
      ctx.font=h.font(36,h.serif);ctx.fillText('南 / South',270,160);ctx.fillText('北 / North',810,160);
      ctx.font=h.font(146,'Georgia,serif');ctx.fillText(String(s),255,342);ctx.fillText(String(100-s),795,342);ctx.font=h.font(35);ctx.fillText('%',385,340);ctx.fillText('%',925,340);
      ctx.font=h.font(25);ctx.fillText('南北偏好比例 · 不是地域归属',540,447);
      ctx.strokeStyle=ink;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(540,103);ctx.lineTo(540,1260);ctx.stroke();
      ctx.fillStyle=paper;ctx.fillRect(76,548,928,210);ctx.fillStyle=ink;h.fit(ctx,d.r.name,920,101,h.serif,'bold');ctx.fillText(d.r.name,540,650);ctx.font=h.font(32,h.serif);ctx.fillText(d.r.tag,540,718);
      ctx.fillStyle=paper;ctx.fillRect(76,786,928,150);ctx.fillStyle=ink;ctx.font=h.font(44,h.serif);h.wrap(ctx,'「'+d.r.quote+'」',540,836,900,62,2);
      h.chips(ctx,d.r.traits,540,966,{px:28,radius:0,bg:paper,color:ink,stroke:'#C5C7BC',pad:20});
      ctx.fillStyle=paper;ctx.fillRect(80,1005,920,230);d.dims.forEach(function(v,i){var col=i%2,row=Math.floor(i/2),x=110+col*465,y=1050+row*63;ctx.textAlign='left';ctx.fillStyle=ink;ctx.font=h.font(27);ctx.fillText(d.dimNames[i],x,y);ctx.fillStyle='#DADCD1';ctx.fillRect(x+91,y-16,230,5);ctx.fillStyle=i===0||i===3||i===4?green:red;ctx.fillRect(x+91,y-16,230*v/100,5);ctx.font=h.font(24,'Georgia,serif');ctx.fillText(String(v),x+340,y);});
      ctx.textAlign='center';ctx.fillStyle=ink;ctx.font=h.font(26);ctx.fillText('篇章契合度 '+d.pct+'%  /  私人藏书',540,1280);ctx.font=h.font(26);ctx.fillText(d.labels.cardFooter,540,1352);ctx.font=h.font(22);ctx.fillText('趣味测试 · 仅供娱乐',540,1394);h.noise(ctx,9000,'rgba(50,65,58,A)',14);
    },pickDelay:290,loadingMs:2050
  };
})();
