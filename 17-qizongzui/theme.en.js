(function(){
  'use strict';
  var base=window.THEME,serif='Didot,"Bodoni 72",Georgia,serif',sans='"Gill Sans","Helvetica Neue",Arial,sans-serif';
  // All line breaking is word-based. h.fit handles an overlong single word first.
  function block(c,text,x,y,w,px,family,weight,maxLines,h){
    var tokens=String(text).trim().split(/\s+/),rows=[];
    function layout(){rows=[];var row='';tokens.forEach(function(word){var next=row?row+' '+word:word;if(row&&c.measureText(next).width>w){rows.push(row);row=word;}else row=next;});if(row)rows.push(row);}
    c.font=h.font(px,family,weight);
    var longest=tokens.reduce(function(a,b){return c.measureText(a).width>c.measureText(b).width?a:b;},'');
    px=h.fit(c,longest,w,px,family,weight);c.font=h.font(px,family,weight);layout();
    while(rows.length>maxLines&&px>20){px--;c.font=h.font(px,family,weight);layout();}
    rows.forEach(function(row,i){c.fillText(row,x,y+i*px*1.22);});
    return y+(rows.length-1)*px*1.22;
  }
  function esc(s){return String(s).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});}

  var arch='M20 300V135Q20 62 120 10Q220 62 220 135V300Z';
  var panes=['M120 18 72 71 120 101Z','M120 18 168 71 120 101Z','M72 71 29 133 85 150 120 101Z','M168 71 211 133 155 150 120 101Z','M29 133 85 150 75 230 29 291Z','M211 133 155 150 165 230 211 291Z','M29 291 75 230 120 266 120 291Z','M211 291 165 230 120 266 120 291Z'];
  var marks={pride:'M30 70 20 34 43 48 60 20 77 48 100 34 90 70ZM30 82H90M40 94H80',envy:'M38 22H82L94 36V72L82 86H38L26 72V36ZM60 86V108M45 108H75M44 36 70 67M52 28 82 58',wrath:'M69 14 32 65H57L49 108 91 52H66ZM22 36 12 27M100 82 110 92',sloth:'M22 34Q60 22 98 34L92 86Q60 98 28 86ZM27 40 35 78M93 40 85 78M46 47H75L48 72H78',greed:'M69 25a20 20 0 1 0 0 40a20 20 0 1 0 0-40M54 60 22 94 22 106 35 106 35 93 48 93 48 80 61 67M66 40h6v10h-6Z',gluttony:'M32 24H88V45Q88 73 60 75Q32 73 32 45ZM60 75V100M41 103H79M35 43H85M91 31H104V44Q104 60 85 61',desire:'M60 23C24 6 13 43 38 58L60 81 82 58C107 43 96 6 60 23ZM60 81V109M60 98Q37 100 34 82Q53 81 60 98M60 91Q80 92 84 73Q65 74 60 91'};
  function glass(color,mark,sealed){
    var tones=sealed?['#1E1A23','#151219','#27212A']:['#6E0F1A',color,'#4C3F30'];
    return '<svg viewBox="0 0 240 320" role="img" aria-label="'+(sealed?'Sealed window, awaiting light':'Stained-glass window with an original emblem')+'"><path d="'+arch+'" fill="#131016" stroke="#B8955A" stroke-width="2"/><path d="M10 307V134Q10 54 120 1Q230 54 230 134V307Z" fill="none" stroke="#B8955A" stroke-opacity=".35"/>'+panes.map(function(p,i){return '<path class="glass-pane" style="--pane:'+i+'" d="'+p+'" fill="'+tones[i%3]+'" stroke="#0D0B10" stroke-width="3"/>';}).join('')+'<path d="M120 100 161 149 164 226 120 268 76 226 79 149Z" fill="#1A141D" stroke="#B8955A"/><circle cx="120" cy="180" r="48" fill="'+(sealed?'#17131B':color)+'" fill-opacity=".28" stroke="#B8955A" stroke-width=".8"/><g transform="translate(60 119)" fill="none" stroke="#D3B47B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="'+(sealed?'M40 55V39a20 20 0 0 1 40 0V55M34 55H86V96H34ZM60 69V82':marks[mark])+'"/></g><path d="M20 308H220M30 315H210" stroke="#B8955A"/></svg>';
  }
  function roman(n){var s='';[[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']].forEach(function(p){while(n>=p[0]){s+=p[1];n-=p[0];}});return s;}
  window.THEME_EN={
    colors:{bg:'#0D0B10',fg:'#E6DDCD',accent:'#B8955A',muted:'#AAA090'},cardFont:sans,letters:['I','II','III','IV'],qNo:function(i){return roman(i+1)+' / THE CORRIDOR';},
    decor:base.decor,homeTop:'<div class="window-home">'+glass('#79628F','desire',false)+'</div>',
    homeBottom:'<p class="window-note">A literary mirror. Not a moral verdict.</p>',
    ornament:'<div class="gothic-rule"><i></i><span>A VICE HAS TWO SIDES</span><i></i></div>',
    loader:'<div class="window-loader">'+glass('#79628F','pride',false)+'</div>',gateArt:'<div class="pw-art window-sealed">'+glass('#27212A','',true)+'</div>',
    heroHTML:function(r,p,L){return '<div class="r-hero window-hero" style="--glass:'+r.color+'"><div class="result-window">'+glass(r.color,r.sin,false)+'</div><div class="r-kicker">'+esc(L.resultKicker)+'</div><div class="r-sub">'+esc(r.sub)+'</div><div class="en-vice">'+esc(r.vice)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+p+'%</b></div></div>';},
    drawCard:function(c,d,h){
      var r=d.r;c.fillStyle='#0D0B10';c.fillRect(0,0,h.W,h.H);h.noise(c,7000,'rgba(230,221,205,A)',17);
      c.textAlign='center';c.fillStyle='#C4B69F';block(c,d.quiz.title,540,72,920,27,sans,'normal',1,h);
      c.save();c.translate(120,104);c.scale(3.5,3.92);c.fillStyle='#17121A';c.strokeStyle='#B8955A';c.lineWidth=.8;c.fill(new Path2D(arch));c.stroke(new Path2D(arch));
      c.stroke(new Path2D('M10 307V134Q10 54 120 1Q230 54 230 134V307Z'));
      panes.forEach(function(p,i){c.fillStyle=i%3===0?r.color:(i%3===1?'#43101B':'#352C23');c.globalAlpha=.55;c.fill(new Path2D(p));c.globalAlpha=1;c.strokeStyle='#0D0B10';c.lineWidth=1.3;c.stroke(new Path2D(p));});c.restore();
      c.fillStyle='#100D13';c.beginPath();c.ellipse(540,407,155,155,0,0,Math.PI*2);c.fill();c.strokeStyle='#B8955A';c.lineWidth=2;c.stroke();c.beginPath();c.ellipse(540,407,144,144,0,0,Math.PI*2);c.stroke();
      c.save();c.translate(426,289);c.scale(1.9,1.9);c.strokeStyle='#D3B47B';c.lineWidth=2;c.lineCap='round';c.lineJoin='round';c.stroke(new Path2D(marks[r.sin]));c.restore();
      c.fillStyle='#100D13';c.fillRect(213,595,654,676);
      c.textAlign='center';c.fillStyle='#DBC293';block(c,r.sub,540,627,700,25,sans,'normal',1,h);
      c.fillStyle='#F0E7D7';block(c,r.vice,540,755,740,108,serif,'normal',1,h);
      c.fillStyle='#E6DDCD';block(c,r.name,540,853,730,66,serif,'normal',2,h);
      c.fillStyle='#D0B787';block(c,r.tag,540,1000,690,31,sans,'normal',2,h);
      c.fillStyle='#F0E7D7';block(c,r.quote,540,1114,690,35,serif,'normal',2,h);
      c.fillStyle='#C7B9A2';block(c,r.traits.join(' / '),540,1215,700,24,sans,'normal',2,h);
      c.font=h.font(24,sans);c.fillText('Resonance '+d.pct+'%',540,1287);
      c.strokeStyle='#B8955A';c.lineWidth=1;c.beginPath();c.moveTo(200,1325);c.lineTo(880,1325);c.stroke();
      c.fillStyle='#BEB39F';block(c,d.labels.cardFooter+' / Just for fun',540,1377,940,23,sans,'normal',1,h);
    }
  };
})();

