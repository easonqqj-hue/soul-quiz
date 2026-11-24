(function(){
'use strict';
var e=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
var lanes='<svg viewBox="0 0 440 206" fill="none" aria-hidden="true"><g stroke="#fff" stroke-width="1.5" opacity=".75"><path d="M-30 235V105a145 145 0 0 1 290 0v140"/><path d="M-6 235V105a121 121 0 0 1 242 0v140"/><path d="M18 235V105a97 97 0 0 1 194 0v140"/><path d="M42 235V105a73 73 0 0 1 146 0v140"/><path d="M66 235V105a49 49 0 0 1 98 0v140"/><path d="M-20 170h270"/></g><g transform="translate(264 34) rotate(7)"><rect width="160" height="136" fill="#E3FF3C"/><circle cx="12" cy="12" r="3" fill="#C8432F"/><circle cx="148" cy="12" r="3" fill="#C8432F"/><text x="16" y="42" fill="#0B0B0B" font-family="Arial,sans-serif" font-size="13" letter-spacing="2">YOUR OWN PACE</text><text x="13" y="104" fill="#0B0B0B" font-family="Arial Black,Arial,sans-serif" font-size="64" font-style="italic" font-weight="900">32</text><text x="108" y="105" fill="#0B0B0B" font-family="Arial,sans-serif" font-size="12">LAPS</text></g></svg>';
window.THEME={
 colors:{bg:'#C8432F',fg:'#FFFFFF',accent:'#E3FF3C',muted:'#F5D4CA'},
 letters:['01','02','03','04'],qNo:function(i){return 'LAP '+String(i+1).padStart(2,'0');},
 decor:'<div class="track-background"></div>',
 homeTop:'<div class="track-illustration">'+lanes+'</div>',
 homeBottom:'<div class="track-caption"><span>不必都跑同一条道</span><b>RUN YOUR WAY.</b></div>',
 ornament:'<span class="race-rule"></span>',
 loader:'<div class="race-loader"><span>FINISH</span><i></i></div>',
 gateArt:'<div class="pw-art sealed-bib"><span class="bib-eyebrow">ATHLETE / YOU</span><b>— —</b><span class="sealed-strip">赛道已封存 · 待领取</span><i></i></div>',
 onBuild:function(){document.querySelector('.h-chips').replaceChildren();},
 heroHTML:function(r,pct,L){return '<div class="r-hero race-bib"><div class="bib-head"><span>'+e(L.resultKicker)+'</span><span>PERSONAL LANE</span></div><div class="bib-number">'+e(r.seal)+'</div><h1 class="r-name">'+e(r.name)+'</h1><div class="r-tag">'+e(r.tag)+'</div><div class="bib-pace"><small>你的探索配速</small><b>'+e(r.pace)+'</b></div><div class="r-quote">'+e(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+e(t)+'</span>';}).join('')+'</div><div class="r-pct">'+e(L.pct)+'<b>'+pct+'%</b></div></div>';},
 drawCard:function(c,d,h){
 var r=d.r;c.fillStyle='#C8432F';c.fillRect(0,0,1080,1440);
 c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=3;
 for(var j=0;j<5;j++){c.beginPath();c.moveTo(-180+j*70,1440);c.lineTo(400+j*70,0);c.stroke();}
 c.fillStyle='#0B0B0B';c.fillRect(0,0,1080,135);c.fillStyle='#E3FF3C';c.font=h.font(30,h.sans,'bold');c.textAlign='left';c.fillText(d.quiz.title,70,83);
 c.fillStyle='#FFFDF6';c.fillRect(68,190,944,1140);
 c.strokeStyle='#D1CEC6';c.lineWidth=2;c.setLineDash([6,8]);c.strokeRect(88,210,904,1100);c.setLineDash([]);
 [[104,226],[976,226],[104,1294],[976,1294]].forEach(function(p){c.fillStyle='#0B0B0B';c.beginPath();c.arc(p[0],p[1],7,0,Math.PI*2);c.fill();});
 c.fillStyle='#0B0B0B';c.font=h.font(24,'"Courier New",monospace','bold');c.fillText('ATHLETE / YOU',130,280);
 c.textAlign='right';c.fillText('14 LANES / ONE YOU',950,280);
 c.textAlign='center';c.font='italic 900 258px "Arial Black",Arial,sans-serif';c.fillText(r.seal,540,536);
 c.fillStyle='#C8432F';h.fit(c,r.name,800,100,h.sans,'900');c.fillText(r.name,540,663);
 c.fillStyle='#0B0B0B';c.font=h.font(32,h.sans,'bold');h.wrap(c,r.tag,540,727,800,43,2);
 c.fillStyle='#E3FF3C';c.fillRect(130,776,820,75);c.fillStyle='#0B0B0B';c.font=h.font(28,h.sans,'bold');c.fillText('探索配速  /  '+r.pace,540,824);
 c.font=h.font(40,h.sans,'bold');h.wrap(c,r.quote,540,930,770,58,2);
 h.chips(c,r.traits,540,1060,{radius:0,bg:'#EEECE4',color:'#0B0B0B',px:29,h:52});
 c.strokeStyle='#0B0B0B';c.beginPath();c.moveTo(130,1120);c.lineTo(950,1120);c.stroke();
 c.textAlign='left';c.font=h.font(24,h.sans);c.fillText('赛道合拍度',130,1177);c.font=h.font(60,h.sans,'900');c.fillText(d.pct+'%',130,1250);
 c.textAlign='right';c.font=h.font(24,h.sans);c.fillText('方向供探索，配速由你定',950,1180);c.font='italic 900 38px Arial,sans-serif';c.fillText('RUN YOUR WAY.',950,1245);
 c.fillStyle='#fff';c.textAlign='center';c.font=h.font(22,h.sans);c.fillText(d.labels.cardFooter+' · 趣味测试 · 仅供娱乐',540,1390);
 },
 pickDelay:240,loadingMs:2050
};
})();