(function () {
  'use strict';
  var C = {bg:'#F4EEE2',fg:'#2B2926',accent:'#A63F2E',muted:'#766D5E',gold:'#A8895A',line:'#DCCFB8',dai:'#2E4B4A'};
  var mountain = '<svg class="mountain" viewBox="0 0 1440 260" preserveAspectRatio="none" aria-hidden="true"><path d="M0 260V192C90 139 125 166 190 186C250 210 290 110 360 138C425 166 440 192 505 167C570 140 603 87 675 128C747 169 790 154 856 172C930 191 968 112 1040 139C1110 167 1140 190 1210 156C1300 108 1360 160 1440 146V260Z" fill="#2E4B4A" opacity=".075"/><path d="M0 260V224C130 182 190 220 290 205C390 190 450 228 555 206C675 182 724 219 826 212C950 190 1040 211 1120 202C1230 181 1320 219 1440 196V260Z" fill="#2E4B4A" opacity=".09"/></svg>';
  var ornament = '<svg viewBox="0 0 180 14" aria-hidden="true"><path d="M0 7h70m40 0h70" stroke="#A8895A"/><path d="m90 1 6 6-6 6-6-6z" fill="none" stroke="#A63F2E"/><circle cx="78" cy="7" r="1.6" fill="#A8895A"/><circle cx="102" cy="7" r="1.6" fill="#A8895A"/></svg>';
  var scroll = '<div class="pw-art sealed-scroll" aria-hidden="true"><svg viewBox="0 0 320 224"><defs><linearGradient id="scroll-paper" x2="0" y2="1"><stop stop-color="#E4D6BB"/><stop offset=".3" stop-color="#FCF7E9"/><stop offset=".78" stop-color="#F0E5CE"/><stop offset="1" stop-color="#CEBA93"/></linearGradient></defs><ellipse cx="160" cy="190" rx="119" ry="9" fill="#2B2926" opacity=".07"/><g transform="rotate(-7 160 112)"><path d="M49 55h222v108H49z" fill="url(#scroll-paper)" stroke="#A8895A"/><path d="M64 65h192v87H64z" fill="none" stroke="#A8895A" opacity=".45"/><path d="M70 144q21-27 42-13t34-17 39 15 35-12 32 19" fill="none" stroke="#2E4B4A" opacity=".22"/><g fill="#9F8156" stroke="#705B3E"><rect x="39" y="43" width="15" height="132" rx="6"/><rect x="267" y="43" width="15" height="132" rx="6"/></g><path d="M42 50h9m-9 116h9m219-116h9m-9 116h9" stroke="#D9C398" stroke-width="2"/><path d="M150 55v108m17-108v108" stroke="#A63F2E" stroke-width="3"/><path d="m151 120-12 65 18-12 9 10 4-65" fill="#A63F2E"/><g class="scroll-seal" transform="translate(160 108) rotate(6)"><rect x="-27" y="-27" width="54" height="54" rx="4" fill="#A63F2E"/><rect x="-22" y="-22" width="44" height="44" rx="2" stroke="#F4E6D3" fill="none"/><path d="M-15-15h12v13h-12zm18 0h12v13H3zM-15 4h12v12h-12zM3 4h12v12H3zM-9-15V-2M9 4v12" fill="none" stroke="#F4E6D3" stroke-width="2"/></g></g></svg></div>';

  function drawCard(ctx, d, h) {
    var W=h.W,H=h.H,r=d.r;
    ctx.fillStyle=C.bg;ctx.fillRect(0,0,W,H);
    var wash=ctx.createRadialGradient(200,80,10,200,80,900);
    wash.addColorStop(0,'rgba(168,137,90,.16)');wash.addColorStop(1,'rgba(168,137,90,0)');
    ctx.fillStyle=wash;ctx.fillRect(0,0,W,H);h.noise(ctx,5000,'rgba(60,50,30,A)',7);
    ctx.fillStyle='rgba(46,75,74,.05)';ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(0,1270);ctx.bezierCurveTo(160,1200,260,1290,420,1240);ctx.bezierCurveTo(560,1200,640,1280,780,1235);ctx.bezierCurveTo(900,1200,1000,1260,1080,1230);ctx.lineTo(W,H);ctx.fill();
    ctx.fillStyle='rgba(46,75,74,.06)';ctx.beginPath();ctx.moveTo(0,H);ctx.lineTo(0,1340);ctx.bezierCurveTo(200,1290,320,1350,520,1315);ctx.bezierCurveTo(700,1285,860,1345,1080,1305);ctx.lineTo(W,H);ctx.fill();
    ctx.strokeStyle=C.gold;ctx.lineWidth=3;ctx.strokeRect(36,36,W-72,H-72);ctx.lineWidth=1;ctx.globalAlpha=.6;ctx.strokeRect(52,52,W-104,H-104);ctx.globalAlpha=1;
    [[52,52],[W-52,52],[52,H-52],[W-52,H-52]].forEach(function(p){ctx.save();ctx.translate(p[0],p[1]);ctx.rotate(Math.PI/4);ctx.fillStyle=C.accent;ctx.fillRect(-7,-7,14,14);ctx.restore();});
    ctx.textBaseline='alphabetic';ctx.textAlign='center';ctx.fillStyle=C.muted;ctx.font=h.font(30,h.serif);h.spaced(ctx,'我的灵魂对应的历史人物',W/2,160,14,'center');
    ctx.save();ctx.translate(r.name.length>2?948:880,230);ctx.rotate(.1);ctx.fillStyle=C.accent;h.rr(ctx,-50,-50,100,100,8);ctx.fill();ctx.strokeStyle='#D7A28D';ctx.lineWidth=2;ctx.strokeRect(-42,-42,84,84);ctx.fillStyle='#F6E9DA';ctx.font=h.font(35,h.serif,'bold');ctx.fillText(r.seal[0],0,-3);ctx.fillText(r.seal[1]||'',0,34);ctx.restore();
    ctx.fillStyle=C.fg;ctx.font=h.font(r.name.length>2?168:190,h.serif,'900');h.spaced(ctx,r.name,W/2,350,r.name.length>2?18:40,'center');
    ctx.fillStyle='#5A544B';ctx.font=h.font(34,h.serif);h.spaced(ctx,r.sub,W/2,425,6,'center');
    ctx.fillStyle=C.accent;h.fit(ctx,'— '+r.tag+' —',850,46,h.serif,'bold');ctx.fillText('— '+r.tag+' —',W/2,505);
    ctx.strokeStyle=C.line;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(150,565);ctx.lineTo(930,565);ctx.moveTo(150,755);ctx.lineTo(930,755);ctx.stroke();
    ctx.fillStyle=C.fg;ctx.font=h.font(46,h.serif);
    var lines=h.lines(ctx,'「'+r.quote+'」',820),start=lines.length>1?635:673;
    lines.forEach(function(line,i){ctx.fillText(line,W/2,start+i*72);});
    h.radar(ctx,540,941,120,d.dims,d.dimNames,{grid:C.line,fill:'rgba(166,63,46,.18)',stroke:C.accent,label:'#5A544B',px:30,fam:h.serif});
    // Preserve the full legacy traits, including its longer labels, within the frame.
    var chipPx=32;
    function chipWidth(){ctx.font=h.font(chipPx,h.serif);return r.traits.reduce(function(sum,t){return sum+ctx.measureText(t).width+40;},0)+18*(r.traits.length-1);}
    while(chipWidth()>900&&chipPx>23)chipPx--;
    h.chips(ctx,r.traits,540,1160,{px:chipPx,fam:h.serif,pad:20,gap:18,h:58,bg:'#EAE1CF',color:'#5A544B'});
    ctx.fillStyle=C.muted;ctx.font=h.font(30,h.serif);ctx.textAlign='right';ctx.fillText('灵魂契合度',550,1240);ctx.textAlign='left';ctx.fillStyle=C.accent;ctx.font=h.font(54,h.serif,'bold');ctx.fillText(d.pct+'%',574,1244);
    ctx.textAlign='center';ctx.fillStyle='#5A544B';h.fit(ctx,d.labels.cardFooter,890,30,h.serif,'bold');ctx.fillText(d.labels.cardFooter,540,1336);
    ctx.fillStyle=C.muted;ctx.font=h.font(22,h.serif);h.spaced(ctx,'趣味测试 · 仅供娱乐',540,1372,4,'center');
  }
  window.THEME={colors:C,letters:['甲','乙','丙','丁'],qNo:function(i){return '卷中第 '+String(i+1).padStart(2,'0')+' 问';},decor:mountain,homeTop:'<div class="history-seal" aria-hidden="true"><span>灵魂</span><span>照鉴</span></div>',ornament:ornament,loader:'<div class="ink-bloom"></div>',gateArt:scroll,drawCard:drawCard,pickDelay:300,loadingMs:1950};
})();
