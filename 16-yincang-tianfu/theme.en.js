(function(){
  'use strict';
  var base=window.THEME,serif='Didot,"Bodoni 72",Georgia,serif',sans='"Avenir Next","Helvetica Neue",Arial,sans-serif';
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

  var facets=[[[90,15],[155,40],[120,83]],[[90,15],[120,83],[58,69]],[[90,15],[58,69],[29,49]],[[29,49],[58,69],[18,118]],[[58,69],[120,83],[90,145]],[[18,118],[58,69],[90,145]],[[155,40],[173,114],[120,83]],[[120,83],[173,114],[90,145]],[[18,118],[90,145],[87,203]],[[90,145],[173,114],[87,203]]];
  function gem(color){return '<svg viewBox="0 0 190 220" role="img" aria-label="Faceted gemstone specimen">'+facets.map(function(p,i){return '<polygon points="'+p.map(function(v){return v.join(',');}).join(' ')+'" fill="'+color+'" stroke="#EFE8DA" stroke-opacity=".35" stroke-width=".7"/><polygon points="'+p.map(function(v){return v.join(',');}).join(' ')+'" fill="'+(i%3===0?'#FFFFFF':'#000000')+'" fill-opacity="'+[.23,.12,.32][i%3]+'"/>';}).join('')+'</svg>';}
  function hero(r,p,L){return '<div class="r-hero specimen-hero"><div class="specimen-display"><span class="specimen-id">N° '+esc(r.seal)+'</span>'+gem(r.color)+'<span class="specimen-type">THE EVERYDAY COLLECTION</span></div><div class="specimen-label"><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+p+'%</b></div></div></div>';}
  window.THEME_EN={
    colors:{bg:'#0F2A24',fg:'#EFE8DA',accent:'#B08D57',muted:'#ABBAAF'},cardFont:sans,letters:['A','B','C','D'],
    qNo:function(i,n){return 'FACET '+String(i+1).padStart(2,'0')+' / '+n;},
    decor:base.decor,
    homeTop:'<div class="specimen-scene"><span class="specimen-note">COLLECTED<br>FROM REAL LIFE</span><div class="home-gem">'+gem('#8AAE9D')+'</div><span class="specimen-scale">UNPOLISHED<br>POTENTIAL</span><div class="specimen-plinth"></div></div>',
    homeBottom:'<div class="museum-caption">Ordinary moments. Unexpected brilliance.</div>',
    ornament:base.ornament,loader:'<div class="specimen-loader">'+gem('#B08D57')+'</div>',gateArt:base.gateArt,heroHTML:hero,
    drawCard:function(c,d,h){
      var r=d.r;c.fillStyle='#0F2A24';c.fillRect(0,0,h.W,h.H);h.noise(c,7000,'rgba(239,232,218,A)',16);
      c.strokeStyle='#B08D57';c.lineWidth=2;c.strokeRect(44,44,992,1352);c.strokeRect(57,57,966,1326);
      c.fillStyle='#D9C49F';c.textAlign='left';block(c,d.quiz.title,92,118,700,28,sans,'normal',1,h);
      c.textAlign='right';block(c,'N° '+r.seal,988,122,160,36,serif,'normal',1,h);
      c.save();c.translate(355,145);c.scale(1.95,1.95);
      facets.forEach(function(p,i){c.beginPath();p.forEach(function(v,j){j?c.lineTo(v[0],v[1]):c.moveTo(v[0],v[1]);});c.closePath();c.fillStyle=r.color;c.fill();c.fillStyle=i%3===0?'rgba(255,255,255,.23)':i%3===1?'rgba(0,0,0,.12)':'rgba(0,0,0,.32)';c.fill();c.strokeStyle='rgba(239,232,218,.35)';c.lineWidth=.7;c.stroke();});c.restore();
      c.strokeStyle='#687552';c.beginPath();c.ellipse(540,568,186,14,0,0,Math.PI*2);c.stroke();
      c.fillStyle='#EFE8DA';c.fillRect(92,620,896,690);c.textAlign='left';c.fillStyle='#526255';
      block(c,'SPECIMEN '+r.seal+' / '+r.sub,132,669,810,23,sans,'normal',1,h);
      c.fillStyle='#17372C';block(c,r.name,132,766,810,76,serif,'bold',2,h);
      block(c,r.tag,132,910,810,31,sans,'normal',2,h);
      c.strokeStyle='#B9B29F';c.lineWidth=1;c.beginPath();c.moveTo(132,975);c.lineTo(948,975);c.stroke();
      block(c,r.quote,132,1028,810,35,serif,'normal',2,h);
      c.fillStyle='#526255';block(c,r.traits.join(' / '),132,1120,810,23,sans,'normal',1,h);
      var top=d.dims.map(function(v,i){return {v:v,n:d.dimNames[i]};}).sort(function(a,b){return b.v-a.v;}).slice(0,3);
      top.forEach(function(t,i){var y=1175+i*36;c.fillStyle='#526255';block(c,t.n,132,y,200,23,sans,'normal',1,h);c.fillStyle='#D4D2C2';c.fillRect(350,y-12,390,7);c.fillStyle='#466854';c.fillRect(350,y-12,390*t.v/100,7);c.font=h.font(23,sans);c.fillText(String(t.v),770,y);});
      c.font=h.font(21,sans);c.fillStyle='#526255';c.fillText('FOUND IN EVERYDAY LIFE',132,1282);c.textAlign='right';c.fillText('Facet match '+d.pct+'%',948,1282);
      c.textAlign='center';c.fillStyle='#C2C9BA';block(c,d.labels.cardFooter+' / Just for fun',540,1364,900,23,sans,'normal',1,h);
    }
  };
})();

