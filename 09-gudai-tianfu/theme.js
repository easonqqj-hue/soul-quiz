(function(){
 'use strict';
 // Original object plates: the same paths are engraved in SVG and on the share canvas.
 var plates={
  xiang:['M45 105Q100 155 155 105L143 150H57Z','M53 102Q100 60 147 102ZM65 150L58 171M135 150L142 171M72 171H128','M100 82C82 64 117 56 100 40C86 26 105 19 101 8M80 77C67 59 86 53 78 40M122 79C109 59 130 50 123 37','M62 113H138M67 122H133M75 132H125'],
  jiu:['M75 35H125V64C157 78 166 125 145 163Q100 184 55 163C34 125 43 78 75 64ZM72 35V23H128V35','M69 26Q100 10 131 26M61 92Q100 77 139 92M52 131Q100 116 148 131M60 160Q100 147 140 160','M79 47H121M78 55H122M69 102V121M80 99V118M91 98V117M102 98V117M113 99V118M124 102V121'],
  xiu:['M100 19A72 72 0 1 1 99.9 19ZM100 27A64 64 0 1 0 100.1 27','M89 19V6H111V19M81 10H119M72 129Q80 91 116 63M86 99Q59 102 61 82Q80 79 86 99M100 81Q96 50 114 48Q126 66 100 81M79 115Q105 116 111 96Q90 93 79 115','M137 26L60 149M133 31L139 23M62 149Q137 190 162 146'],
  mo:['M48 39L88 26 150 59 113 76ZM48 39V146L113 180 150 161V59M113 76V180','M60 57L101 79V156L60 134ZM70 82L91 94M72 93L89 103M72 109L89 119M72 124L88 134','M124 82V166M132 77V162M140 71V157M55 145L110 173'],
  xing:['M100 22A63 63 0 1 1 99.9 22ZM100 34A51 51 0 1 0 100.1 34','M37 85H163M100 22V148M56 40L144 130M56 130L144 40M100 148V171M66 176H134M79 171H121','M100 49L110 73 137 80 112 92 110 118 97 96 71 97 87 79Z','M100 14V7M171 85H178M22 85H29M100 159V153'],
  qin:['M72 16Q100 7 128 16L119 38Q113 45 124 61L138 159Q100 180 62 159L76 61Q87 45 81 38Z','M87 24L75 155M91 24L83 157M96 24L91 159M101 24L99 160M106 24L107 159M111 24L115 157M116 24L123 155','M82 35H119M69 146H131M79 66H86M77 81H84M74 96H81M72 111H79M70 126H77'],
  ma:['M59 170L62 133 48 118 52 91 80 48 86 18 102 38 118 20 125 51Q155 83 146 118L134 165','M80 48Q97 58 124 51M67 73L113 85 132 113M52 91L97 110 121 88M62 133Q93 143 111 122M69 115L88 122M106 64L114 63','M125 53Q151 75 145 112M132 59Q161 83 153 118M136 69Q170 100 156 139M104 140L117 166M104 170H140'],
  yuan:['M40 118L56 96 61 61 78 80 93 36 112 70 125 64 139 111 162 139 123 159 80 153Z','M61 61L74 113 56 125M93 36L94 102 78 130M112 70L108 114 125 137M125 64L128 112M51 139L80 145 95 136 119 146 150 141','M34 170H166M25 181H175M123 28A31 31 0 0 1 163 75M145 49L160 49M153 41V57'],
  ci:['M77 18Q100 12 123 18L119 54C113 77 161 95 155 139Q152 169 100 174Q48 169 45 139C39 95 87 77 81 54ZM77 18Q100 27 123 18','M80 33H120M82 44H118M64 98Q100 112 136 98M50 126Q100 140 150 126M59 151Q100 163 141 151','M65 112L71 121M80 116L85 126M96 117L101 128M112 116L117 126M128 112L133 121M78 169V178H122V169'],
  jian:['M100 8L115 31 109 123H91L85 31ZM100 17V123M76 126H124V136H76ZM92 136H108V170H92ZM88 170H112V179H88Z','M92 144H108M92 152H108M92 160H108M67 126L76 136M133 126L124 136M82 123H118','M36 44L46 34M34 60L54 40M151 135L165 121M149 152L172 129'],
  yi:['M37 40L100 20 163 40V164L100 184 37 164ZM37 40L100 61 163 40M100 61V184','M47 58L88 72V111L47 97ZM47 110L88 124V164L47 150ZM111 72L153 58V97L111 111ZM111 124L153 110V150L111 164Z','M61 82L75 87M61 136L75 141M124 88L138 83M124 141L138 136M75 28V15H125V28'],
  yin:['M49 90L100 66 151 90V151L100 178 49 151ZM49 90L100 116 151 90M100 116V178','M72 78V52Q72 22 100 22Q128 22 128 52V78M87 52A13 13 0 1 0 113 52A13 13 0 1 0 87 52','M58 111L88 127V156L58 140ZM65 120L79 127M66 132L79 139M111 124L142 109M111 135L142 120M111 146L142 131M111 157L142 142'],
  cha:['M57 84Q100 61 143 84L135 146Q100 173 65 146ZM74 73Q100 50 126 73M93 59V45H107V59','M141 93Q173 70 174 103Q173 136 138 132M58 94L32 78 26 90 59 122M73 151V163H128V151','M64 93Q100 110 136 93M69 136Q100 153 131 136M81 30Q70 17 84 7M103 29Q93 17 105 4M125 33Q112 18 126 10'],
  ji:['M76 30L85 42 103 40 106 56 121 63 114 78 117 94 100 100 93 116 77 110 61 116 53 101 36 97 40 80 32 64 49 56 52 40 68 44ZM76 55A25 25 0 1 1 75.9 55','M129 101L138 114 152 116 150 132 160 145 146 154 139 170 123 166 109 173 100 159 85 154 89 138 84 124 101 118 110 103ZM123 124A18 18 0 1 1 122.9 124','M76 80L123 142M74 77H78V83H74ZM120 139H126V145H120Z']
 };
 function engraving(id,cls){var p=plates[id]||plates.ji;return '<svg class="'+cls+'" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p.map(function(d){return '<path d="'+d+'"/>';}).join('')+'</svg>';}
 function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
 window.THEME={colors:{bg:'#E4D5B7',fg:'#2B2622',accent:'#B23A2A',muted:'#695b48'},letters:['一','二','三','四'],qNo:function(i){return '卷'+['一','二','三'][Math.floor(i/10)]+' · 第'+String(i+1).padStart(2,'0')+'页';},pickDelay:300,loadingMs:1950,
  decor:'<div class="paper-grain"></div><div class="binding-side" aria-hidden="true"></div>',
  homeTop:'<div class="book-heading"><span>日用之间<br>自见工夫</span>'+engraving('ji','cover-engraving')+'<b>百工<br>手记</b></div>',
  ornament:'<span class="book-rule">阅习惯 · 识本领</span>',homeBottom:'<div class="book-colophon">不问出身，只问趁手。</div>',
  loader:'<div class="print-loader">'+engraving('mo','ink-engraving')+'<span>上墨 · 拓印</span></div>',
  gateArt:'<div class="pw-art sealed-book"><div class="thread"></div><span class="sealed-title">百工手记</span><span class="book-seal">未<br>启</span><span class="seal-strip">此卷已成 · 待君亲阅</span></div>',
  onBuild:function(){document.getElementById('chips').textContent='';},
  heroHTML:function(r,pct,L){return '<div class="r-hero craft-page"><div class="plate-head">'+esc(L.resultKicker)+'<span>技艺图谱</span></div><div class="plate-main"><div class="object-plate">'+engraving(r.id,'result-engraving')+'<small>'+esc(r.tool)+'</small></div><div class="plate-caption"><div class="r-kicker">天赋所长</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="craft-grade">'+esc(r.grade)+'</div></div></div><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><p class="master-note">批：'+esc(r.note)+'</p><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div>';},
  drawCard:function(c,d,h){
   var r=d.r;c.fillStyle='#E4D5B7';c.fillRect(0,0,1080,1440);h.noise(c,9000,'rgba(70,45,20,A)',9);
   c.fillStyle='#2E3F5C';c.fillRect(0,0,65,1440);c.strokeStyle='#d1c2a5';c.lineWidth=3;for(var y=130;y<1370;y+=225){c.beginPath();c.moveTo(24,y-30);c.lineTo(80,y);c.lineTo(24,y+30);c.lineTo(24,y-30);c.stroke();}
   c.strokeStyle='#2B2622';c.lineWidth=3;c.strokeRect(103,64,915,1298);c.lineWidth=1;c.strokeRect(113,74,895,1278);
   c.textAlign='left';c.fillStyle='#2B2622';c.font=h.font(29,h.serif);c.fillText('百工手记',146,128);c.textAlign='right';c.fillText('技艺图谱 · '+String(d.quiz.results.indexOf(r)+1).padStart(2,'0'),974,128);
   c.beginPath();c.moveTo(114,160);c.lineTo(1007,160);c.stroke();c.textAlign='center';c.fillStyle='#695b48';c.font=h.font(25,h.serif);h.spaced(c,'日用之间，自见工夫',560,224,8,'center');
   c.save();c.translate(160,315);c.scale(2.4,2.4);c.strokeStyle='#2B2622';c.lineWidth=1.2;(plates[r.id]||plates.ji).forEach(function(p){c.stroke(new Path2D(p));});c.restore();
   c.strokeStyle='#7d705a';c.lineWidth=1;c.beginPath();c.moveTo(670,275);c.lineTo(670,822);c.stroke();
   c.fillStyle='#2B2622';var letters=r.name.split('');var size=letters.length>3?74:104;c.font=h.font(size,h.serif,'bold');letters.forEach(function(t,i){c.fillText(t,800,340+i*(letters.length>3?91:126));});
   c.fillStyle='#B23A2A';c.font=h.font(29,h.serif);c.fillText(r.grade,809,letters.length>3?750:760);c.strokeStyle='#B23A2A';c.lineWidth=2;c.strokeRect(728,723,160,57);
   c.fillStyle='#695b48';c.font=h.font(28,h.serif);c.fillText('器物 · '+r.tool,399,833);
   c.fillStyle='#2B2622';h.fit(c,r.tag,780,37,h.serif);c.fillText(r.tag,560,909);
   c.fillStyle='#B23A2A';c.font=h.font(32,h.serif);c.fillText('批：'+r.note,560,972);
   c.fillStyle='#2B2622';c.font=h.font(37,h.serif);h.wrap(c,'「'+r.quote+'」',560,1053,770,55,2);
   c.strokeStyle='#9c8a6a';c.lineWidth=1;c.beginPath();c.moveTo(155,1154);c.lineTo(963,1154);c.stroke();
   h.chips(c,r.traits,560,1203,{px:26,pad:12,gap:12,h:40,radius:0,bg:'rgba(46,63,92,.07)',color:'#2E3F5C'});
   c.textAlign='center';c.fillStyle='#695b48';c.font=h.font(24,h.serif);c.fillText(d.labels.cardFooter,560,1273);c.font=h.font(22);c.fillText('趣味测试 · 仅供娱乐',560,1320);
  }
 };
})();
