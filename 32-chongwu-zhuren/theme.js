(function(){
 'use strict';
 var paw='<ellipse cx="21" cy="25" rx="8" ry="11" transform="rotate(-24 21 25)"/><ellipse cx="40" cy="15" rx="8" ry="11"/><ellipse cx="59" cy="19" rx="8" ry="11" transform="rotate(18 59 19)"/><ellipse cx="74" cy="34" rx="7" ry="10" transform="rotate(35 74 34)"/><path d="M24 56C24 46 33 43 38 35C43 27 53 30 57 39C61 48 69 51 66 60C63 72 53 66 46 66C38 66 22 71 24 56Z"/>';
 var pawSVG='<svg viewBox="0 0 92 84" fill="currentColor" aria-hidden="true">'+paw+'</svg>';
 var portrait='<svg viewBox="0 0 200 170" fill="none" aria-hidden="true"><path d="M23 136C30 105 60 101 87 113M99 133C107 103 142 100 178 128" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M43 100C19 81 24 50 47 49L55 29L76 45L100 34L102 66C112 96 89 116 65 112Z" fill="#EBD6B9" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M109 76C108 46 148 37 162 63L173 99C162 122 118 119 109 95Z" fill="#FFF9F0" stroke="currentColor" stroke-width="3"/><path d="M112 59C94 46 96 80 106 88M157 58C179 42 188 74 173 88" fill="#B5733E" stroke="currentColor" stroke-width="3"/><path d="M53 76L59 78M80 75L86 73M129 81H132M151 81H154M67 87L72 87L69 92Z M139 91L145 91L142 95Z M61 98Q69 105 78 97M134 101Q142 107 151 100" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M39 87L20 82M40 94L20 97M94 88L107 83" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
 function e(s){return String(s).replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c];});}
 function stars(n){var s='';for(var i=0;i<5;i++)s+='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 2L12.4 7.1L18 7.8L14 11.9L15 17.5L10 14.8L5 17.5L6 11.9L2 7.8L7.6 7.1Z" fill="'+(i<n?'currentColor':'none')+'" stroke="currentColor"/></svg>';return '<div class="pet-stars" aria-label="趣味星级 '+n+' 星">'+s+'</div>';}
 function drawPaw(c,x,y,s,color){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle=color;[[21,25,8,11,-.42],[40,15,8,11,0],[59,19,8,11,.32],[74,34,7,10,.6]].forEach(function(p){c.beginPath();c.ellipse(p[0],p[1],p[2],p[3],p[4],0,Math.PI*2);c.fill();});c.beginPath();c.moveTo(24,56);c.bezierCurveTo(24,46,33,43,38,35);c.bezierCurveTo(43,27,53,30,57,39);c.bezierCurveTo(61,48,69,51,66,60);c.bezierCurveTo(63,72,53,66,46,66);c.bezierCurveTo(38,66,22,71,24,56);c.fill();c.restore();}
 window.THEME={
 colors:{bg:'#F6E6D2',fg:'#4A3426',accent:'#B5733E',muted:'#81644E'},letters:['A','B','C','D'],qNo:function(i,n){return '同住日常 '+String(i+1).padStart(2,'0')+' / '+n;},
 decor:'<div class="felt-light"></div><div class="paw-corner">'+pawSVG+'</div>',
 homeTop:'<div class="pet-home-id"><div class="pet-clip"></div><div class="pet-home-head"><span>HUMAN ID</span><span>由毛孩子签发</span></div><div class="pet-portrait">'+portrait+'</div><div class="pet-home-copy"><span>CO-LIVING CLUB</span><b>同住人<br>资格审阅中</b><small>一张关于陪伴的证件</small></div><div class="pet-home-seal">'+pawSVG+'</div></div>',
 ornament:'<div class="yarn-line"><i></i><svg viewBox="0 0 34 34" fill="none" aria-hidden="true"><circle cx="17" cy="17" r="13"/><path d="M6 11C16 8 24 12 28 21M5 18C15 14 23 18 25 26M10 6C8 15 12 25 21 29M18 4C14 14 19 22 29 24"/></svg><i></i></div>',
 homeBottom:'<div class="pet-bottom">签发依据：你们一起度过的小日子</div>',
 loader:'<div class="pet-loader">'+pawSVG+'<span>正在留下爪印</span></div>',
 gateArt:'<div class="pw-art pet-sleeve" aria-hidden="true"><div class="pet-secret-card"><span>HUMAN ID</span><i>同住人档案</i></div><div class="pet-sleeve-front"><span>已封存 · 待拆阅</span><div class="pet-emboss">'+pawSVG+'</div><small>WITH A PAW OF APPROVAL</small></div><div class="pet-tape">给我的人类</div></div>',
 heroHTML:function(r,pct,L){return '<div class="r-hero"><div class="pet-id-head"><span>CO-LIVING CERTIFICATE</span>'+pawSVG+'</div><div class="r-kicker">'+e(L.resultKicker)+'</div><h1 class="r-name">'+e(r.name)+'</h1><div class="r-sub">'+e(r.sub)+'</div><div class="r-tag">'+e(r.tag)+'</div><div class="pet-grade"><span>趣味称号 · '+e(r.level)+'</span>'+stars(r.stars)+'</div><div class="r-quote">'+e(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+e(t)+'</span>';}).join('')+'</div><div class="pet-review"><small>如果它能给你写评价</small><p>“'+e(r.review)+'”</p></div><div class="r-pct">'+e(L.pct)+'<b>'+pct+'%</b></div><div class="pet-cert-footer"><span>铲屎官趣味认证</span><span>PAW APPROVED</span></div></div>';},
 drawCard:function(c,d,h){
 c.fillStyle='#F6E6D2';c.fillRect(0,0,1080,1440);c.fillStyle='#E8D0AF';for(var i=0;i<24;i++){c.beginPath();c.arc(30+i*47,30,2,0,Math.PI*2);c.fill();}
 c.shadowColor='#91654235';c.shadowBlur=36;c.shadowOffsetY=14;c.fillStyle='#FFF9F0';h.rr(c,55,92,970,1260,50);c.fill();c.shadowBlur=0;c.shadowOffsetY=0;
 c.strokeStyle='#D9BA96';c.lineWidth=8;h.rr(c,75,112,930,1220,36);c.stroke();c.strokeStyle='#DEC7AB';c.lineWidth=2;c.setLineDash([4,8]);h.rr(c,93,131,894,1182,25);c.stroke();c.setLineDash([]);
 c.fillStyle='#B5733E';h.rr(c,443,50,194,110,26);c.fill();c.fillStyle='#F6E6D2';h.rr(c,471,78,138,17,8);c.fill();
 c.textAlign='left';c.fillStyle='#4A3426';c.font=h.font(28);c.fillText(d.quiz.title,127,215);c.font=h.font(23,'Arial,sans-serif');c.fillStyle='#81644E';c.fillText('CO-LIVING CERTIFICATE / HUMAN ID',127,257);
 c.strokeStyle='#8DB36B';c.lineWidth=3;c.beginPath();c.arc(865,234,66,0,Math.PI*2);c.stroke();drawPaw(c,819,194,1,'#648447');
 c.fillStyle='#4A3426';h.fit(c,d.r.name,826,106,h.sans,'800');c.fillText(d.r.name,127,418);c.font=h.font(33);c.fillStyle='#8B532C';c.fillText(d.r.tag,127,480);
 c.font=h.font(24);c.fillStyle='#81644E';c.fillText('趣味称号 / '+d.r.level,127,535);c.textAlign='right';c.fillText('风格契合 '+d.pct+'%',953,535);c.textAlign='left';
 c.strokeStyle='#DDC8AD';c.lineWidth=2;c.beginPath();c.moveTo(127,568);c.lineTo(953,568);c.stroke();c.fillStyle='#4A3426';c.font=h.font(40,h.sans,'600');h.wrap(c,d.r.quote,127,637,810,57,2);
 c.fillStyle='#EEE1CC';h.rr(c,122,738,836,116,22);c.fill();c.fillStyle='#81644E';c.font=h.font(22);c.fillText('毛孩子的内心旁白',147,776);c.fillStyle='#4A3426';c.font=h.font(28);h.wrap(c,d.r.review,147,818,775,38,1);
 c.font=h.font(25);c.fillStyle='#8B532C';c.fillText(d.r.traits.join('  /  '),127,912);
 d.dims.forEach(function(v,i){var x=127+(i%2)*437,y=976+Math.floor(i/2)*65;c.fillStyle='#4A3426';c.font=h.font(24);c.fillText(d.dimNames[i],x,y);c.fillStyle='#E6D5BE';h.rr(c,x+72,y-14,210,9,4);c.fill();c.fillStyle='#B5733E';h.rr(c,x+72,y-14,Math.max(8,210*v/100),9,4);c.fill();c.textAlign='right';c.fillStyle='#81644E';c.fillText(String(v),x+325,y);c.textAlign='left';});
 c.font=h.font(22);c.fillStyle='#648447';c.fillText('PAW APPROVED',564,1171);c.strokeStyle='#DDC8AD';c.beginPath();c.moveTo(127,1210);c.lineTo(953,1210);c.stroke();c.fillStyle='#4A3426';c.font=h.font(26);c.fillText(d.labels.cardFooter,127,1254);c.fillStyle='#81644E';c.font=h.font(21);c.fillText('趣味测试 · 仅供娱乐',127,1296);
 c.textAlign='center';c.font=h.font(22);c.fillText('每一种陪伴，都有自己的小习惯。',540,1395);
 },pickDelay:290,loadingMs:2100
 };
})();
