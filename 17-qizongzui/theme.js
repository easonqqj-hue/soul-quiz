(function(){
  'use strict';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  var marks={pride:'M30 70 20 34 43 48 60 20 77 48 100 34 90 70ZM30 82H90M40 94H80',envy:'M38 22H82L94 36V72L82 86H38L26 72V36ZM60 86V108M45 108H75M44 36 70 67M52 28 82 58',wrath:'M69 14 32 65H57L49 108 91 52H66ZM22 36 12 27M100 82 110 92',sloth:'M22 34Q60 22 98 34L92 86Q60 98 28 86ZM27 40 35 78M93 40 85 78M46 47H75L48 72H78',greed:'M69 25a20 20 0 1 0 0 40a20 20 0 1 0 0-40M54 60 22 94 22 106 35 106 35 93 48 93 48 80 61 67M66 40h6v10h-6Z',gluttony:'M32 24H88V45Q88 73 60 75Q32 73 32 45ZM60 75V100M41 103H79M35 43H85M91 31H104V44Q104 60 85 61',desire:'M60 23C24 6 13 43 38 58L60 81 82 58C107 43 96 6 60 23ZM60 81V109M60 98Q37 100 34 82Q53 81 60 98M60 91Q80 92 84 73Q65 74 60 91'};
  var arch='M20 300V135Q20 62 120 10Q220 62 220 135V300Z';
  var panes=['M120 18 72 71 120 101Z','M120 18 168 71 120 101Z','M72 71 29 133 85 150 120 101Z','M168 71 211 133 155 150 120 101Z','M29 133 85 150 75 230 29 291Z','M211 133 155 150 165 230 211 291Z','M29 291 75 230 120 266 120 291Z','M211 291 165 230 120 266 120 291Z'];
  function glass(color,mark,sealed){var cols=sealed?['#1E1A23','#151219','#27212A']:['#6E0F1A',color,'#4C3F30'];return '<svg viewBox="0 0 240 320" role="img" aria-label="'+(sealed?'未点亮的封印彩窗':'尖拱彩窗与原创纹章')+'"><path d="'+arch+'" fill="#131016" stroke="#B8955A" stroke-width="2"/><path d="M10 307V134Q10 54 120 1Q230 54 230 134V307Z" fill="none" stroke="#B8955A" stroke-opacity=".35"/>'+panes.map(function(p,i){return '<path class="glass-pane" style="--pane:'+i+'" d="'+p+'" fill="'+cols[i%3]+'" stroke="#0D0B10" stroke-width="3"/>';}).join('')+'<path d="M120 100 161 149 164 226 120 268 76 226 79 149Z" fill="#1A141D" stroke="#B8955A" stroke-width="1"/><circle cx="120" cy="180" r="48" fill="'+(sealed?'#17131B':color)+'" fill-opacity=".28" stroke="#B8955A" stroke-width=".8"/><g transform="translate(60 119)" fill="none" stroke="#D3B47B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="'+(sealed?'M40 55V39a20 20 0 0 1 40 0V55M34 55H86V96H34ZM60 69V82':marks[mark]||marks.desire)+'"/></g><path d="M20 308H220M30 315H210" stroke="#B8955A" stroke-width="1"/></svg>';}
  function roman(n){var s='',a=[[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];a.forEach(function(p){while(n>=p[0]){s+=p[1];n-=p[0];}});return s;}
  window.THEME={
    colors:{bg:'#0D0B10',fg:'#E6DDCD',accent:'#B8955A',muted:'#AAA090'},letters:['Ⅰ','Ⅱ','Ⅲ','Ⅳ'],qNo:function(i){return roman(i+1)+' / 欲望回廊';},pickDelay:310,loadingMs:2150,
    decor:'<svg class="vault-lines" viewBox="0 0 1400 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="#B8955A" stroke-width="1"><path d="M-120 1000V390Q-120 180 200 20Q520 180 520 390V1000M-70 1000V410Q-70 210 200 70Q470 210 470 410V1000M880 1000V390Q880 180 1200 20Q1520 180 1520 390V1000M930 1000V410Q930 210 1200 70Q1470 210 1470 410V1000"/></g></svg><div class="candle-haze"></div>',
    homeTop:'<div class="window-home">'+glass('#79628F','desire',false)+'</div>',
    ornament:'<div class="gothic-rule"><i></i><span>欲望没有单面</span><i></i></div>',
    homeBottom:'<p class="window-note">“罪名”是文学比喻，不是道德判决。</p>',
    loader:'<div class="window-loader">'+glass('#79628F','pride',false)+'</div>',
    gateArt:'<div class="pw-art window-sealed">'+glass('#27212A','',true)+'</div>',
    heroHTML:function(r,pct,L){var n=r.name.split('·');return '<div class="r-hero window-hero" style="--glass:'+r.color+'"><div class="result-window">'+glass(r.color,r.sin,false)+'</div><div class="r-kicker">'+esc(L.resultKicker)+'</div><div class="r-sub">'+esc(r.sub)+'</div><h1 class="r-name"><span>'+esc(n[0])+'</span><small>'+esc(n[1])+'</small></h1><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div>';},
    drawCard:function(ctx,d,h){
      var r=d.r,n=r.name.split('·');ctx.fillStyle='#0D0B10';ctx.fillRect(0,0,h.W,h.H);h.noise(ctx,8000,'rgba(230,221,205,A)',17);
      ctx.textAlign='center';ctx.font=h.font(28,h.serif);ctx.fillStyle='#BEB39F';ctx.fillText(d.quiz.title,540,76);
      ctx.save();ctx.translate(120,102);ctx.scale(3.5,3.92);ctx.fillStyle='#17121A';ctx.strokeStyle='#B8955A';ctx.lineWidth=.8;ctx.fill(new Path2D(arch));ctx.stroke(new Path2D(arch));ctx.stroke(new Path2D('M10 307V134Q10 54 120 1Q230 54 230 134V307Z'));
      panes.forEach(function(p,i){ctx.fillStyle=i%3===0?r.color:(i%3===1?'#43101B':'#352C23');ctx.globalAlpha=.5;ctx.fill(new Path2D(p));ctx.globalAlpha=1;ctx.strokeStyle='#0D0B10';ctx.lineWidth=1.3;ctx.stroke(new Path2D(p));});ctx.restore();
      ctx.fillStyle='#100D13';ctx.beginPath();ctx.ellipse(540,502,176,176,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#B8955A';ctx.lineWidth=2;ctx.stroke();ctx.beginPath();ctx.ellipse(540,502,163,163,0,0,Math.PI*2);ctx.stroke();
      ctx.save();ctx.translate(414,375);ctx.scale(2.1,2.1);ctx.strokeStyle='#D3B47B';ctx.lineWidth=2;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke(new Path2D(marks[r.sin]));ctx.restore();
      ctx.fillStyle='#DBC293';ctx.font=h.font(35,'Didot,Georgia,serif');h.spaced(ctx,r.sub.split(' / ')[0],540,735,7,'center');
      ctx.fillStyle='#F0E7D7';ctx.font=h.font(116,h.serif,'normal');ctx.fillText(n[0],540,877);ctx.font=h.font(59,h.serif);ctx.fillText(n[1],540,961);
      ctx.fillStyle='#D0B787';ctx.font=h.font(28,h.sans);h.wrap(ctx,r.tag,540,1023,660,40,2);
      ctx.fillStyle='#E5D9C5';ctx.font=h.font(34,h.serif);h.wrap(ctx,r.quote,540,1115,670,49,2);
      ctx.font=h.font(23,h.sans);ctx.fillStyle='#C7B9A2';ctx.fillText(r.traits.join(' / '),540,1230);
      ctx.font=h.font(23,h.sans);ctx.fillText(r.sub.split(' / ')[1]+'  ·  欲望共鸣 '+d.pct+'%',540,1284);
      ctx.strokeStyle='#B8955A';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(200,1325);ctx.lineTo(880,1325);ctx.stroke();
      ctx.fillStyle='#BEB39F';ctx.font=h.font(24,h.sans);ctx.fillText(d.labels.cardFooter+' / 趣味测试 · 仅供娱乐',540,1378);
    }
  };
})();
