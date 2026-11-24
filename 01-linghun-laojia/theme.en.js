(function(){
  'use strict';
  var ink='#284B6B',red='#AF493C',paper='#F4F0E6';
  var serif='Georgia,"Times New Roman",serif',sans='"Avenir Next","Helvetica Neue",Arial,sans-serif',mono='"Courier New",monospace';
  var scenes={
    paris:'M18 143H162M55 143L90 28L125 143M66 108H114M75 79H105M86 28V16H94V28M75 143Q90 108 105 143M26 143V105H45V143M137 143V94H156V143',
    lisbon:'M14 143L170 114M37 132V56H139V114M32 56H144M48 68H78V94H48ZM93 68H124V94H93ZM45 105L130 90M55 55V44H120V55M78 44L100 24L118 43M48 129L48 141M123 116V129',
    'new-york':'M10 145H172M22 145V82H50V145M62 145V53H88V145M67 53V35H83V53M75 35V16M100 145V91H125V145M138 145V45H161V145M144 45V31H155V45M30 95H43M108 103H118',
    'new-orleans':'M17 145H166M30 145V44H148V145M23 44H155M38 65H64V91H38ZM77 65H103V91H77ZM116 65H140V91H116ZM24 100H155M25 112H155M32 100V145M59 100V112M84 100V112M111 100V112M144 100V145M72 145V124H108V145',
    austin:'M10 143H170M24 143V85H58V143M34 85V66H48V85M78 143V47H108V143M86 47V30H101V47M127 143V96H158V143M11 118Q70 74 170 119M118 44A17 17 0 1 0 152 44A17 17 0 1 0 118 44',
    portland:'M10 142H171M32 141V92H150V141M23 92L91 42L159 92M51 141V111H73V141M104 105H131V128H104ZM13 125V57M3 86L13 57L24 86M153 78L165 47L178 78M166 78V141',
    'san-francisco':'M9 143Q49 132 90 143T171 143M25 132V36H36V132M143 132V36H154V132M10 108H171M31 45Q89 127 148 45M51 70V108M71 89V108M91 96V108M113 89V108M133 70V108M25 51H36M143 51H154',
    copenhagen:'M10 143H172M19 143V67L43 43L66 67V143M71 143V51L95 29L119 51V143M125 143V76L147 52L168 76V143M30 82H52M30 104H52M83 70H107M83 94H107M137 92H157M137 114H157M83 143V119H106V143',
    edinburgh:'M10 144H171M21 144V77H58V144M29 77V61H49V77M64 144V50H111V144M70 50V29L86 16L103 29V50M121 144V87H159V144M132 87V65H149V87M78 144V119A10 10 0 0 1 98 119V144M77 73H98M77 94H98',
    barcelona:'M15 143H169M28 143V88H57V143M35 88V46L43 29L51 46V88M68 143V76H106V143M76 76V36L87 17L98 36V76M117 143V91H150V143M125 91V54L135 36L144 54V91M75 143V121A12 12 0 0 1 99 121V143',
    rome:'M15 145H168M24 145V69Q89 40 156 69V145M23 94Q89 68 157 94M23 119Q89 95 157 119M36 142V128Q43 116 50 128V142M65 139V122Q73 110 81 122V139M97 139V122Q105 110 113 122V139M128 142V128Q136 117 144 128V142M40 87V72M70 80V64M106 80V64M138 87V72',
    amsterdam:'M11 140H169M22 139V62H29V49H38V37H49V49H58V62H66V139M73 139V74L96 42L119 74V139M126 139V55H135V43H151V55H161V139M33 79H54M33 102H54M84 89H108M84 113H108M135 73H152M135 96H152M11 153Q50 144 92 153T169 153',
    chicago:'M12 143H169M21 143V77H48V143M60 143V36H91V143M66 36V18M83 36V18M102 143V67H126V143M138 143V47H161V143M68 55H82M68 76H82M68 97H82M28 90H40M145 63H154M10 153Q50 142 90 153T170 153',
    prague:'M10 141H171M22 141V81L42 48L61 81V141M72 141V69L93 24L113 69V141M126 141V88L145 54L165 88V141M85 93A8 8 0 1 0 101 93A8 8 0 1 0 85 93M85 141V120H102V141M13 151H171'
  };
  function art(id){return '<svg viewBox="0 0 180 165" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="'+(scenes[id]||scenes.amsterdam)+'"/></svg>';}
  function date(){return new Date().toLocaleDateString('en-US',{month:'short',day:'2-digit',year:'numeric'}).toUpperCase();}
  function envelope(){return '<div class="air-envelope" aria-hidden="true"><div class="air-service">BY AIR MAIL <span>PERSONAL POST</span></div><div class="air-address"><small>DELIVER TO</small><b>The life that feels like you</b><i></i><i></i></div><div class="air-stamp">'+art('amsterdam')+'<span>SOUL POST / 01</span></div><div class="air-postmark">RETURN ADDRESS<br><b>SEALED</b></div></div>';}
  function words(ctx,h,text,x,y,width,px,lh,family,weight){
    var parts=String(text).split(/\s+/);parts.forEach(function(w){px=Math.min(px,h.fit(ctx,w,width,px,family,weight));});ctx.font=h.font(px,family,weight);
    var line='',rows=[];parts.forEach(function(w){var next=line?line+' '+w:w;if(line&&ctx.measureText(next).width>width){rows.push(line);line=w;}else line=next;});if(line)rows.push(line);rows.forEach(function(t,i){ctx.fillText(t,x,y+i*lh);});return y+rows.length*lh;
  }
  function stripe(ctx){ctx.save();ctx.beginPath();ctx.rect(35,35,1010,1370);ctx.rect(54,54,972,1332);ctx.clip('evenodd');for(var i=-1440,n=0;i<1200;i+=84,n++){ctx.fillStyle=n%2===0?red:ink;ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i+38,0);ctx.lineTo(i+1478,1440);ctx.lineTo(i+1440,1440);ctx.fill();}ctx.restore();}
  window.THEME_EN={
    colors:{bg:paper,fg:ink,accent:red,muted:'#63717A'},letters:['A','B','C','D'],qNo:function(i,n){return 'POSTMARK '+String(i+1).padStart(2,'0')+' / '+n;},
    decor:'<svg width="100%" height="100%" aria-hidden="true"><defs><pattern id="air-grain" width="25" height="29" patternUnits="userSpaceOnUse"><circle cx="4" cy="7" r=".55" fill="#284B6B" opacity=".13"/><circle cx="19" cy="23" r=".5" fill="#AF493C" opacity=".1"/></pattern></defs><rect width="100%" height="100%" fill="url(#air-grain)"/></svg>',
    homeTop:'<div class="air-home">'+envelope()+'</div>',homeBottom:'<div class="air-footer"><span>Origin: your everyday life</span><span>Address: to be found</span></div>',ornament:'<div class="air-rule"></div>',loader:'<div class="air-loading">SOUL POST<b>IN TRANSIT</b><small>YOUR RETURN ADDRESS</small></div>',gateArt:'<div class="pw-art air-gate">'+envelope()+'</div>',
    heroHTML:function(r,pct,L){return '<div class="r-hero air-hero"><div class="air-destination"><div class="r-kicker">'+L.resultKicker+'<span class="air-delivery">A LETTER FROM YOUR EVERYDAY SELF</span></div><div class="air-result-stamp">'+art(r.id)+'<span>'+r.seal+' / SOUL POST</span></div></div><h1 class="r-name">'+r.name+'</h1><div class="r-sub">'+r.sub+'</div><div class="r-tag">'+r.tag+'</div><div class="r-quote">'+r.quote+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+t+'</span>';}).join('')+'</div><div class="r-pct">'+L.pct+'<b>'+pct+'%</b></div><div class="air-date">RECEIVED / '+date()+'</div></div>';},
    drawCard:function(ctx,d,h){
      var r=d.r;ctx.fillStyle=paper;ctx.fillRect(0,0,1080,1440);stripe(ctx);h.noise(ctx,7000,'rgba(40,75,107,A)',31);ctx.textAlign='left';ctx.fillStyle=ink;
      words(ctx,h,d.quiz.title,90,115,820,28,38,sans);ctx.font=h.font(24,mono);ctx.fillText('PERSONAL AIRMAIL / SOUL POST',90,192);
      ctx.strokeStyle='#B7B9B3';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(90,222);ctx.lineTo(990,222);ctx.stroke();
      ctx.fillStyle='#E1E6E8';ctx.fillRect(716,268,250,270);ctx.strokeStyle=ink;ctx.setLineDash([2,12]);ctx.lineWidth=5;ctx.strokeRect(708,260,266,286);ctx.setLineDash([]);
      ctx.save();ctx.translate(738,278);ctx.scale(1.15,1.15);ctx.lineWidth=1.8;ctx.stroke(new Path2D(scenes[r.id]));ctx.restore();ctx.textAlign='center';ctx.fillStyle=ink;ctx.font=h.font(20,mono);ctx.fillText(r.seal+' / SOUL POST',841,515);ctx.textAlign='left';
      words(ctx,h,r.name,88,357,590,106,118,serif,'bold');ctx.fillStyle='#63717A';words(ctx,h,r.sub,92,592,880,26,38,sans);
      ctx.fillStyle=red;words(ctx,h,r.tag,90,692,880,39,52,serif,'bold');ctx.fillStyle=ink;words(ctx,h,r.quote,90,811,865,46,68,serif);
      ctx.strokeStyle='#BDC3C5';[960,1028].forEach(function(y){ctx.beginPath();ctx.moveTo(90,y);ctx.lineTo(990,y);ctx.stroke();});
      words(ctx,h,r.traits.join(' / '),90,1082,880,27,39,sans);ctx.font=h.font(28,sans);ctx.fillText('Hometown affinity  '+d.pct+'%',90,1170);
      ctx.font=h.font(22,mono);ctx.fillStyle=red;ctx.fillText('RECEIVED / '+date(),90,1230);ctx.strokeStyle=red;ctx.lineWidth=2;[71,78].forEach(function(rad){ctx.beginPath();ctx.arc(885,1177,rad,0,Math.PI*2);ctx.stroke();});ctx.textAlign='center';ctx.font=h.font(17,mono);ctx.fillText('SOUL POST',885,1164);ctx.font=h.font(18,serif);ctx.fillText('DELIVERED',885,1196);ctx.textAlign='left';ctx.strokeStyle=ink;ctx.beginPath();ctx.moveTo(90,1270);ctx.lineTo(990,1270);ctx.stroke();ctx.fillStyle=ink;
      words(ctx,h,d.labels.cardFooter,90,1320,900,25,35,sans);ctx.font=h.font(21,sans);ctx.fillStyle='#63717A';ctx.fillText(d.labels.cardDisc||'A little self-discovery. Just for fun.',90,1370);
    }
  };
})();
