(function(){
 'use strict';
 var green='#39FF88',paper='#F5F5F0',ink='#0A0A0A';
 function esc(s){return String(s).replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c];});}
 var chart='<svg viewBox="0 0 340 130" fill="none" aria-hidden="true"><path d="M8 18H332M8 58H332M8 98H332M60 8V118M140 8V118M220 8V118M300 8V118" stroke="currentColor" opacity=".12"/><path d="M12 110L53 99L86 106L122 73L155 82L190 49L225 58L265 20L300 30L328 10" stroke="currentColor" stroke-width="3"/><circle cx="265" cy="20" r="5" fill="currentColor"/></svg>';
 var values={product:'∞ 次细节返工',sales:'1 次开口的勇气',tech:'1 套自动运行',serial:'N 次重新开局',community:'1 群下次还来的人',cash:'1 盏持续亮着的灯',disrupt:'1 个全新的问法',lean:'10 份真实反馈',brand:'1 眼就记住的质感',connector:'1 张刚好接上的网',mission:'1 件始终在意的事',solo:'1 段自己的时间'};
 window.THEME={
  colors:{bg:ink,fg:paper,accent:green,muted:'#A2A69F'},letters:['A','B','C','D'],qNo:function(i,n){return 'SLIDE '+String(i+1).padStart(2,'0')+' / '+n;},
  decor:'<div class="terminal-grid"></div><div class="edge-mark">FOUNDER DECK / PERSONAL EDITION</div>',
  homeTop:'<div class="deck-cover"><div class="deck-topline"><span>FOUNDER / 001</span><span>开局提案</span></div><div class="deck-word">MAKE<br>IT REAL<span>从一个念头开始</span></div><div class="deck-chart">'+chart+'</div><div class="deck-caption">IDEA → FIRST STEP<span>你的开局，由你定义</span></div></div>',
  ornament:'<div class="deck-rule"><i></i><span>NO PERFECT ANSWER</span></div>',homeBottom:'<div class="deck-bottom">A PERSONAL PITCH DECK<span>仅供娱乐的创始人侧写</span></div>',
  loader:'<div class="deck-loading"><span>ASSEMBLING</span><i></i><b>提案装订中</b></div>',
  gateArt:'<div class="pw-art sealed-deck" aria-hidden="true"><div class="sealed-paper">FOUNDER<br>MEMORANDUM<span>你的创始人提案</span></div><div class="sealed-front"><span>PRIVATE COPY</span><b>未翻阅</b><i>READY TO OPEN</i></div><div class="sealed-band">SEALED / 待解锁</div></div>',
  heroHTML:function(r,pct,L){return '<div class="r-hero"><div class="bp-heading"><span>FOUNDER MEMO</span><b>'+esc(r.seal)+'</b></div><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="bp-value"><small>你的趣味估值 / 无货币单位</small><b>'+esc(values[r.id])+'</b></div><div class="bp-signal"><span>核心偏好连线</span><svg viewBox="0 0 320 72" aria-label="六项决策偏好曲线"><path d="M10 60H310M10 36H310M10 12H310" stroke="currentColor" opacity=".15"/><polyline id="founderCurve" points="10,36 70,36 130,36 190,36 250,36 310,36" fill="none" stroke="currentColor" stroke-width="2.5"/></svg></div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div>';},
  onResult:function(cur,el){var line=el.querySelector('#founderCurve');if(line&&cur.z)line.setAttribute('points',cur.z.map(function(z,i){return (10+i*60)+','+(62-52/(1+Math.exp(-z*.9))).toFixed(1);}).join(' '));},
  drawCard:function(ctx,d,h){
   ctx.fillStyle=ink;ctx.fillRect(0,0,1080,1440);ctx.textAlign='left';
   ctx.fillStyle=paper;ctx.font=h.font(27);ctx.fillText(d.quiz.title,70,83);
   ctx.strokeStyle='#424740';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(70,113);ctx.lineTo(1010,113);ctx.stroke();
   ctx.fillStyle=green;ctx.font=h.font(25,'Consolas,monospace');ctx.fillText('PERSONAL PITCH / '+d.r.seal,70,163);
   ctx.font=h.font(116,'Arial,sans-serif','900');ctx.fillStyle=paper;ctx.fillText('FOUNDER',64,285);
   ctx.fillStyle=paper;ctx.fillRect(70,328,940,430);ctx.fillStyle=ink;ctx.font=h.font(26);ctx.fillText('创始人类型 / '+d.r.sub,104,380);
   h.fit(ctx,d.r.name,866,102,h.sans,'900');ctx.fillText(d.r.name,104,510);
   ctx.font=h.font(34,h.sans,'bold');ctx.fillText(d.r.tag,104,578);
   ctx.strokeStyle='#B7BDB3';ctx.beginPath();ctx.moveTo(104,612);ctx.lineTo(976,612);ctx.stroke();
   ctx.font=h.font(36);h.wrap(ctx,d.r.quote,104,672,850,51,2);
   ctx.fillStyle=green;ctx.font=h.font(28,'Consolas,monospace');ctx.fillText('STYLE MATCH  '+d.pct+'%',70,814);
   ctx.textAlign='right';ctx.fillStyle=paper;ctx.font=h.font(24);ctx.fillText(d.r.traits.join(' / '),1010,814);ctx.textAlign='left';
   ctx.strokeStyle='#30362F';ctx.lineWidth=2;[875,945,1015].forEach(function(y){ctx.beginPath();ctx.moveTo(70,y);ctx.lineTo(1010,y);ctx.stroke();});
   ctx.strokeStyle=green;ctx.lineWidth=5;ctx.beginPath();[[70,1016],[210,984],[310,1002],[458,923],[570,946],[710,865],[840,888],[1006,844]].forEach(function(p,i){if(i)ctx.lineTo(p[0],p[1]);else ctx.moveTo(p[0],p[1]);});ctx.stroke();
   ctx.fillStyle='#A2A69F';ctx.font=h.font(22);ctx.fillText('开局灵感曲线 / 装饰示意，非业绩预测',70,1050);
   d.dims.forEach(function(v,i){var x=70+(i%3)*325,y=1122+Math.floor(i/3)*74;ctx.fillStyle=paper;ctx.font=h.font(24);ctx.fillText(d.dimNames[i],x,y);ctx.fillStyle=green;ctx.font=h.font(26,'Consolas,monospace');ctx.fillText(String(v).padStart(2,'0'),x+180,y);ctx.fillStyle='#343A32';ctx.fillRect(x,y+14,265,4);ctx.fillStyle=green;ctx.fillRect(x,y+14,265*v/100,4);});
   ctx.fillStyle=paper;ctx.font=h.font(27);ctx.fillText(d.labels.cardFooter,70,1321);ctx.fillStyle='#A2A69F';ctx.font=h.font(23);ctx.fillText('趣味测试 · 仅供娱乐',70,1370);ctx.textAlign='right';ctx.font=h.font(23,'Consolas,monospace');ctx.fillText('END OF DECK / 01',1010,1370);
  },pickDelay:260,loadingMs:2000
 };
})();
