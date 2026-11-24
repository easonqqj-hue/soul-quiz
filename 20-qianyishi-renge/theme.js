(function(){
'use strict';
var e=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};
var glyphs={
 night:'M-35 45V-18a35 35 0 0 1 70 0V45Z M0-52V45 M-35-4H35 M-35 20H35 M-48 45H48',
 dreamer:'M-34-5a21 21 0 1 1 30 19L32 50l13-13-12-12 8-8-12-12L8-16 M-25-8a8 8 0 1 0 16 0 8 8 0 1 0-16 0',
 maze:'M-48 48H48V34H33V18H18V2H3V-14H-12V-30H-27V-46H-48Z M-27-30H-8 M-12-14H7 M3 2H22 M18 18H37',
 deep:'M-48 8C-48-50 40-60 48 2 54 48-20 62-27 20-33-12 21-23 23 8 25 25-2 26-6 13 M-44 29L-24 46',
 light:'M0-54 39-9 0 28-39-9Z M0-54V28 M-39-9H39 M0 28C-23 42 28 44 2 62',
 observer:'M-49 16 24-24 43 9-29 49Z M14-19 33 15 M-37 9-18 42 M23-24 30-29 50 5 43 9 M2 32V56 M-17 56H22',
 collector:'M-16-48H16V-30L34-12V48H-34V-12L-16-30Z M-16-39H16 M-24 5H24 M-24 18H24 M-10-17 14-12 7 6-17 1Z',
 storm:'M-34-51H34V51H-34Z M8-38-20 3H-2L-9 36 22-9H3Z',
 mirror:'M0-52C-57-52-57 38 0 38S57-52 0-52Z M0 38V55 M-22 55H22 M-23-24 12-38 M-23-10 20-31 M-24 12Q0-4 24 12 M-20 24Q0 8 20 24',
 ferry:'M-52 20H52L31 43H-31Z M-38 12 33-40 M25-49 42-31 M-40 53Q-20 44 0 53T40 53',
 forest:'M0-55 36-27 23-27 47 3 28 3 52 31H-52L-28 3H-47L-23-27H-36Z M0 31V57 M-15 57H15',
 star:'M-50 0a50 50 0 1 0 100 0 50 50 0 1 0-100 0 M-55 0H55 M0-55V55 M-33 31-18-19 18 12 33-30 M-18-19 0-37 33-30 M18 12 20 38'
};
function icon(r){return '<svg class="dream-symbol" viewBox="-70 -70 140 140" aria-hidden="true"><path d="'+glyphs[r.id]+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';}
var scene='<svg viewBox="0 0 440 260" fill="none" aria-hidden="true"><defs><radialGradient id="moon"><stop stop-color="#FAF4E5"/><stop offset="1" stop-color="#D7CEE8"/></radialGradient><linearGradient id="steps" x2="1" y2="1"><stop stop-color="#A5AED5"/><stop offset="1" stop-color="#353253"/></linearGradient></defs><circle cx="267" cy="101" r="79" fill="url(#moon)"/><circle cx="267" cy="101" r="96" stroke="#D8C08A" opacity=".35"/><ellipse cx="235" cy="244" rx="139" ry="12" fill="#6C7BB5" opacity=".16"/><path d="M90 239h28v-16h27v-16h27v-16h27v-16h27v-16h27v-16h27v96Z" fill="url(#steps)"/><g stroke="#DBD5EB" opacity=".5"><path d="M118 223h162M145 207h135M172 191h108M199 175h81M226 159h54"/></g><path d="M251 143v-40a22 22 0 0 1 44 0v40" fill="#1B1433" stroke="#D8C08A"/><path d="m76 109 20-13 20 13-20 13Z M96 96v26" stroke="#D8C08A"/><path d="m351 176 13-22 13 22Z" stroke="#B0B9DE"/><path d="M22 206c40-22 52 13 84 0s47-16 67-7M295 225c27-14 49 11 78-3s35-5 45-2" stroke="#6C7BB5" opacity=".7"/><g fill="#D8C08A"><circle cx="58" cy="57" r="1.5"/><circle cx="158" cy="47" r="1.3"/><circle cx="387" cy="67" r="1.4"/><circle cx="335" cy="36" r="1.2"/></g></svg>';
window.THEME={
 colors:{bg:'#1B1433',fg:'#EDE6F7',accent:'#D8C08A',muted:'#B5ADCB'},
 letters:['Ⅰ','Ⅱ','Ⅲ','Ⅳ'],qNo:function(i){return '梦的第 '+String(i+1).padStart(2,'0')+' 幕';},
 decor:'<div class="night-dust"></div><div class="horizon-mist"></div>',
 homeTop:'<div class="dream-scene">'+scene+'</div>',
 homeBottom:'<div class="moon-caption"><span></span><i>Not all rooms have doors.</i><span></span></div>',
 ornament:'<span class="moon-divider"></span>',
 loader:'<div class="moon-phase"></div>',
 gateArt:'<div class="pw-art moon-gate"><svg viewBox="0 0 240 250" aria-hidden="true"><circle cx="120" cy="100" r="86" fill="none" stroke="#D8C08A" opacity=".25"/><circle cx="120" cy="100" r="71" fill="#6C7BB5" opacity=".18"/><path d="M72 205V97a48 48 0 0 1 96 0v108Z" fill="#211A3C" stroke="#D8C08A"/><path d="M80 201V97a40 40 0 0 1 80 0v104M120 55v146" fill="none" stroke="#D8C08A" opacity=".4"/><circle cx="120" cy="147" r="17" fill="#1B1433" stroke="#D8C08A"/><path d="M122 138a9 9 0 1 0 6 15 11 11 0 0 1-6-15Z" fill="#D8C08A"/><path d="M60 214h120M50 224h140M40 234h160" stroke="#6C7BB5"/></svg></div>',
 onBuild:function(){document.querySelector('.h-chips').replaceChildren();},
 heroHTML:function(r,pct,L){return '<div class="r-hero dream-portrait"><div class="r-kicker">'+e(L.resultKicker)+'</div><div class="symbol-orbit">'+icon(r)+'</div><h1 class="r-name">'+e(r.name)+'</h1><div class="r-sub">'+e(r.symbol)+'</div><div class="r-tag">'+e(r.tag)+'</div><div class="r-quote">'+e(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+e(t)+'</span>';}).join('')+'</div><div class="r-pct">'+e(L.pct)+'<b>'+pct+'%</b></div></div>';},
 drawCard:function(c,d,h){
 c.fillStyle='#1B1433';c.fillRect(0,0,1080,1440);
 var mist=c.createRadialGradient(700,520,30,600,520,620);mist.addColorStop(0,'rgba(108,123,181,.29)');mist.addColorStop(1,'rgba(27,20,51,0)');c.fillStyle=mist;c.fillRect(0,0,1080,850);
 c.strokeStyle='#D8C08A';c.lineWidth=1;c.strokeRect(42,42,996,1356);
 c.fillStyle='#D8C08A';c.font=h.font(26,h.sans);c.textAlign='center';h.spaced(c,d.quiz.title,540,108,6,'center');
 for(var i=0;i<44;i++){var x=(i*173+79)%1000+40,y=(i*i*47+70)%600+130;c.globalAlpha=.3+(i%4)*.15;c.beginPath();c.arc(x,y,i%3===0?2:1,0,Math.PI*2);c.fill();}c.globalAlpha=1;
 c.strokeStyle='rgba(216,192,138,.3)';c.beginPath();c.arc(570,357,207,0,Math.PI*2);c.stroke();
 var moon=c.createRadialGradient(510,290,15,570,357,174);moon.addColorStop(0,'#FAF4E5');moon.addColorStop(1,'#D1C7E1');c.fillStyle=moon;c.beginPath();c.arc(570,357,174,0,Math.PI*2);c.fill();
 c.save();c.translate(570,352);c.scale(1.7,1.7);c.strokeStyle='#3A3154';c.lineWidth=2;c.lineCap='round';c.lineJoin='round';c.stroke(new Path2D(glyphs[d.r.id]));c.restore();
 for(var s=0;s<8;s++){var xx=165+s*47,yy=690-s*21;c.fillStyle=s%2?'#636A99':'#737DAA';c.fillRect(xx,yy,47,26+s*21);c.strokeStyle='#B0B7D5';c.beginPath();c.moveTo(xx,yy);c.lineTo(xx+47,yy);c.stroke();}
 c.fillStyle='#1B1433';c.fillRect(0,718,1080,620);c.strokeStyle='rgba(216,192,138,.3)';c.beginPath();c.moveTo(116,718);c.lineTo(964,718);c.stroke();
 c.fillStyle='#B5ADCB';c.font=h.font(24,h.serif);h.spaced(c,'月下象征物 · '+d.r.symbol,540,752,2,'center');
 c.fillStyle='#EDE6F7';h.fit(c,d.r.name,850,102,h.serif,'normal');c.fillText(d.r.name,540,880);
 c.fillStyle='#D8C08A';c.font=h.font(33,h.serif);h.wrap(c,d.r.tag,540,946,850,48,2);
 c.fillStyle='#EDE6F7';c.font=h.font(40,h.serif);h.wrap(c,d.r.quote,540,1040,790,65,2);
 h.chips(c,d.r.traits,540,1196,{px:28,h:54,radius:27,bg:'rgba(108,123,181,.13)',stroke:'#5D5873',color:'#EDE6F7'});
 c.textAlign='center';c.fillStyle='#B5ADCB';c.font=h.font(24,h.sans);c.fillText('梦境呼应度  '+d.pct+'%   /   一次日常偏好的投影',540,1288);
 c.fillStyle='#D8C08A';c.font=h.font(26,h.serif);c.fillText(d.labels.cardFooter,540,1340);c.fillStyle='#B5ADCB';c.font=h.font(21,h.sans);c.fillText('趣味测试 · 仅供娱乐',540,1372);
 },
 pickDelay:330,loadingMs:2100
};
})();