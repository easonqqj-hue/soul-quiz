(function(){
'use strict';
var e=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
var folder='<svg viewBox="0 0 420 228" fill="none" aria-hidden="true"><path d="M40 62h128l19-25h175v165H40Z" fill="#BA9665" stroke="#6A543B"/><path d="M32 62h338v147H32Z" fill="#D8BA8B" stroke="#6A543B"/><path d="m32 62 169 71L370 62" stroke="#6A543B"/><rect x="56" y="116" width="146" height="65" fill="#EDE1CA" transform="rotate(-4 56 116)"/><text x="69" y="140" fill="#1F1E1C" font-family="Courier New,monospace" font-size="13">PERSONAL FILE</text><text x="69" y="163" fill="#1F1E1C" font-family="Courier New,monospace" font-size="17">32 STATEMENTS</text><g transform="translate(230 126) rotate(-11)"><rect width="160" height="38" stroke="#A3231F" stroke-width="2"/><text x="80" y="24" text-anchor="middle" fill="#A3231F" font-family="Courier New,monospace" font-size="17" font-weight="bold">CONFIDENTIAL</text></g><path d="M315 34v43c0 17 23 17 23 0V25c0-10-15-10-15 0v50c0 7 7 7 7 0V36" stroke="#1F1E1C" stroke-width="2.5"/><circle cx="201" cy="123" r="10" fill="#A3231F"/><circle cx="201" cy="166" r="8" fill="#A3231F"/><path d="m201 123-8 42 17-2-9-40" stroke="#705230"/></svg>';
window.THEME={
 colors:{bg:'#C9A97A',fg:'#1F1E1C',accent:'#A3231F',muted:'#665339'},
 letters:['甲','乙','丙','丁'],qNo:function(i,n){return '笔录 '+String(i+1).padStart(2,'0')+' / 共 '+n+' 页';},
 decor:'<div class="archive-grid"></div>',
 homeTop:'<div class="file-illustration">'+folder+'</div>',
 homeBottom:'<div class="archive-footer"><span>收件人：你本人</span><span>状态：等待笔录</span></div>',
 ornament:'<div class="archive-rule"><i></i><span>以下内容由你的选择补全</span></div>',
 loader:'<div class="file-loader"><span>正在归档</span><b>FILED</b><i></i></div>',
 gateArt:'<div class="pw-art sealed-folder"><svg viewBox="0 0 270 240" aria-hidden="true"><path d="M22 32h226v184H22Z" fill="#D8BA8B" stroke="#70583B"/><path d="m22 32 113 77L248 32" fill="#C5A270" stroke="#70583B"/><path d="m22 216 79-61M248 216l-79-61" stroke="#70583B" opacity=".5"/><path d="M135 85v88" stroke="#6A4D30" stroke-width="2"/><circle cx="135" cy="120" r="32" fill="#A3231F"/><circle cx="135" cy="120" r="25" fill="none" stroke="#D08B65"/><path d="M122 111h26M125 119h20M128 127h14" stroke="#D8BA8B"/><rect x="53" y="174" width="164" height="27" fill="#E8C547"/><text x="135" y="193" text-anchor="middle" fill="#1F1E1C" font-family="Microsoft YaHei,sans-serif" font-size="13" letter-spacing="5">未解封</text><text x="135" y="22" text-anchor="middle" fill="#70583B" font-family="Courier New,monospace" font-size="11" letter-spacing="2">FOR YOUR EYES ONLY</text></svg></div>',
 onBuild:function(){document.querySelector('.h-chips').replaceChildren();},
 heroHTML:function(r,pct,L){return '<div class="r-hero case-report"><div class="case-top"><span>个人卷宗 / 已解封</span><b>'+e(r.seal)+'</b></div><div class="r-kicker">'+e(L.resultKicker)+'</div><h1 class="r-name">'+e(r.name)+'</h1><div class="r-tag">'+e(r.tag)+'</div><div class="case-clues"><h2>关键线索 / EVIDENCE</h2>'+r.clues.map(function(t,i){return '<p><b>0'+(i+1)+'</b><span>'+e(t)+'</span></p>';}).join('')+'</div><div class="r-quote">'+e(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+e(t)+'</span>';}).join('')+'</div><div class="r-pct">'+e(L.pct)+'<b>'+pct+'%</b></div><span class="filed-stamp">已归档</span></div>';},
 drawCard:function(c,d,h){
 c.fillStyle='#C9A97A';c.fillRect(0,0,1080,1440);h.noise(c,17000,'rgba(50,30,10,A)',21);
 c.strokeStyle='#79603F';c.lineWidth=2;c.strokeRect(48,48,984,1344);
 c.fillStyle='#BE9A67';c.beginPath();c.moveTo(48,48);c.lineTo(540,270);c.lineTo(1032,48);c.closePath();c.fill();c.stroke();
 c.textAlign='left';c.fillStyle='#1F1E1C';c.font=h.font(27,h.sans);c.fillText(d.quiz.title,91,113);
 c.font=h.font(22,'"Courier New",monospace');c.fillText('PERSONAL CASE / 32 STATEMENTS',91,155);
 c.save();c.translate(790,200);c.rotate(-.16);c.strokeStyle='#A3231F';c.lineWidth=4;c.strokeRect(-191,-35,382,72);c.fillStyle='#A3231F';c.font='bold 36px "Courier New",monospace';c.textAlign='center';c.fillText('CONFIDENTIAL',0,14);c.restore();
 c.strokeStyle='#1F1E1C';c.lineWidth=5;c.beginPath();c.moveTo(927,87);c.lineTo(927,212);c.bezierCurveTo(927,248,977,248,977,212);c.lineTo(977,76);c.bezierCurveTo(977,49,944,49,944,76);c.lineTo(944,205);c.bezierCurveTo(944,220,960,220,960,205);c.lineTo(960,96);c.stroke();
 c.fillStyle='#EDE1CA';c.fillRect(91,315,898,838);c.strokeStyle='#A18D6E';c.lineWidth=1;c.strokeRect(91,315,898,838);
 c.fillStyle='#1F1E1C';c.font=h.font(26,'"Courier New",monospace','bold');c.textAlign='left';c.fillText('档案代号 / '+d.r.seal,130,377);
 c.textAlign='right';c.font=h.font(22,h.sans);c.fillText('收件人：你本人',950,377);
 c.textAlign='left';c.fillStyle='#1F1E1C';h.fit(c,d.r.name,810,100,h.serif,'bold');c.fillText(d.r.name,130,510);
 c.fillStyle='#A3231F';c.font=h.font(32,h.serif);c.fillText(d.r.tag,130,579);
 c.fillStyle='#E8C547';c.fillRect(130,637,306,45);c.fillStyle='#1F1E1C';c.font=h.font(24,h.sans,'bold');c.fillText('关键线索 / EVIDENCE',147,668);
 d.r.clues.forEach(function(t,i){var y=735+i*64;c.fillStyle='#A3231F';c.font=h.font(25,'"Courier New",monospace','bold');c.fillText('0'+(i+1),130,y);c.fillStyle='#1F1E1C';c.font=h.font(29,h.sans);h.fit(c,t,730,29,h.sans);c.fillText(t,190,y);c.strokeStyle='#C6B28E';c.beginPath();c.moveTo(130,y+17);c.lineTo(950,y+17);c.stroke();});
 c.fillStyle='#1F1E1C';c.font=h.font(39,h.serif,'bold');h.wrap(c,d.r.quote,130,987,800,62,2);
 c.font=h.font(22,h.sans);c.fillStyle='#665339';c.fillText('线索呼应度 '+d.pct+'% / 剧本可改，选择由你',130,1110);
 c.save();c.translate(840,1250);c.rotate(-.12);c.strokeStyle='#A3231F';c.lineWidth=4;c.strokeRect(-111,-53,222,106);c.fillStyle='#A3231F';c.textAlign='center';c.font=h.font(45,h.serif,'bold');c.fillText('已归档',0,16);c.restore();
 c.textAlign='left';c.fillStyle='#1F1E1C';c.font=h.font(25,h.sans);c.fillText(d.r.traits.join(' / '),91,1220);c.font=h.font(22,'"Courier New",monospace');c.fillText('STORY SUBJECT TO CHANGE.',91,1270);
 c.textAlign='center';c.font=h.font(23,h.sans);c.fillText(d.labels.cardFooter+' · 趣味测试 · 仅供娱乐',540,1362);
 },
 pickDelay:270,loadingMs:2050
};
})();