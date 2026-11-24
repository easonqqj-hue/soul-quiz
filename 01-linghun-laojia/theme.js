(function(){
  'use strict';
  var green='#2F5D50',red='#B5482F',paper='#F3EDE3';
  var scenes={
    chengdu:'M15 125H165 M25 110H150 M38 110V85H135V110 M28 85L86 55L145 85Z M60 85V110 M112 85V110 M43 144Q85 134 137 144 M142 64Q155 32 162 47 M155 75V34',
    chongqing:'M10 140H170 M20 140V95H48V140 M58 140V50H85V140 M96 140V82H122V140 M135 140V30H162V140 M10 95Q90 10 170 88 M10 102Q90 17 170 95 M42 60V91 M111 53V88',
    hangzhou:'M10 130Q50 120 90 130T170 130 M10 144Q50 134 90 144T170 144 M35 117V86H70V117 M28 86L52 65L78 86Z M98 115V65 M88 65H108 M92 59H105 M95 52H102 M15 52Q42 20 62 45Q80 15 100 43',
    suzhou:'M10 126H170 M22 126V75H157V126 M15 75L47 55L80 75L114 52L165 75 M74 126V105A18 18 0 0 1 110 105V126 M35 90H57V112H35Z M125 90H145V112H125Z M15 141Q70 130 165 143',
    xiamen:'M10 130Q50 118 90 130T170 130 M10 145Q50 133 90 145T170 145 M52 115V63H89V115 M43 63L70 45L98 63 M119 118V58 M119 58Q95 30 92 57 M119 58Q142 30 150 57 M119 58Q144 56 154 78',
    dali:'M8 95L48 38L77 70L112 20L173 95 M36 55L48 38L60 55 M93 45L112 20L133 45 M10 115Q48 103 88 115T170 115 M10 135Q48 123 88 135T170 135',
    qingdao:'M10 140Q60 128 100 140T170 140 M22 122V85H56V122 M16 85L39 61L63 85 M76 122V71H113V122 M69 71L95 43L120 71 M132 122V90H161V122 M125 90L146 70L170 90',
    haerbin:'M15 141H170 M30 141V83H150V141 M22 83H158 M46 82Q46 51 65 39Q84 51 84 82 M97 82Q97 34 121 20Q145 34 145 82 M65 39V25 M121 20V9 M75 140V111A15 15 0 0 1 105 111V140',
    xian:'M10 140H170 M25 140V100H155V140 M20 100H161 M44 99V75H137V99 M35 75L90 50L145 75 M62 62V42H116V62 M53 42L90 22L125 42 M80 140V120H102V140',
    changsha:'M10 141Q50 128 95 141T170 141 M25 125H152 M39 125V95H135V125 M31 95L86 69L143 95 M65 79V58H109V79 M57 58L86 39L118 58 M15 115L25 60 M154 117L164 54',
    guangzhou:'M12 140H168 M25 140V70H155V140 M18 70L90 45L162 70 M39 140V115A13 13 0 0 1 65 115V140 M77 140V115A13 13 0 0 1 103 115V140 M115 140V115A13 13 0 0 1 141 115V140 M40 84H61 M79 84H100 M118 84H139',
    beijing:'M10 141H170 M24 141V103H157V141 M15 103L42 87H137L165 103 M44 87V64H137V87 M31 64L90 40L151 64 M71 140V120H108V140 M45 116H57 M122 116H135',
    shanghai:'M10 143H170 M23 143V89H48V143 M65 143V70 M65 70V22 M52 79H78 M53 90H77 M59 39H71 M95 143V49L119 40V143 M137 143V30L158 15V143',
    lasa:'M10 145H170 M20 145L28 96H63V145 M57 145V64H126V145 M119 145V92H154L163 145 M53 64H132 M66 56H119 M79 49H106 M71 80H80 M97 80H106 M72 100H81 M97 100H106 M80 145V121H101V145'
  };
  function sketch(id){return '<svg viewBox="0 0 180 165" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="'+(scenes[id]||scenes.dali)+'"/></svg>';}
  function date(){var d=new Date();return d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+String(d.getDate()).padStart(2,'0');}
  function postal(){return '<div class="mail-object" aria-hidden="true"><div class="mail-head">POST CARD <span>私人来信</span></div><div class="mail-address"><i></i><i></i><i></i><small>收件人：此刻的你</small></div><div class="mail-stamp">'+sketch('dali')+'<span>SOUL POST</span></div><div class="mail-seal">灵魂邮局<br><b>已封存</b></div><div class="mail-waves">～～～<br>～～～</div></div>';}
  window.THEME={
    colors:{bg:paper,fg:green,accent:red,muted:'#736F60'},letters:['一','二','三','四'],qNo:function(i){return '第 '+String(i+1).padStart(2,'0')+' 枚生活邮戳';},pickDelay:320,loadingMs:2050,
    decor:'<svg width="100%" height="100%" aria-hidden="true"><defs><pattern id="post-grain" width="23" height="27" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r=".65" fill="#2F5D50" opacity=".12"/><circle cx="17" cy="19" r=".5" fill="#B5482F" opacity=".12"/></pattern></defs><rect width="100%" height="100%" fill="url(#post-grain)"/></svg>',
    homeTop:'<div class="home-post">'+postal()+'</div>',homeBottom:'<div class="post-bottom"><span>寄出地 / 你的日常</span><span>收信地 / 尚待揭晓</span></div>',ornament:'<span class="post-rule"></span>',loader:'<div class="loading-postmark">灵魂邮局<br><b>正在盖戳</b><small>SOUL POST</small></div>',gateArt:'<div class="pw-art">'+postal()+'</div>',
    heroHTML:function(r,pct,L){return '<div class="r-hero postcard-hero"><div class="r-kicker">'+L.resultKicker+'</div><div class="post-destination"><div><div class="city-latin">'+r.en+'</div><h1 class="r-name">'+r.name+'</h1><div class="r-sub">'+r.sub+'</div></div><div class="city-stamp">'+sketch(r.id)+'<span>'+r.seal+' · 私藏风景</span></div></div><div class="r-tag">'+r.tag+'</div><div class="r-quote">'+r.quote+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+t+'</span>';}).join('')+'</div><div class="r-pct">'+L.pct+'<b>'+pct+'%</b></div><div class="post-date">'+date()+' · 寄达</div></div>';},
    drawCard:function(ctx,d,h){
      var r=d.r;ctx.fillStyle=paper;ctx.fillRect(0,0,1080,1440);h.noise(ctx,11000,'rgba(67,56,38,A)',19);
      ctx.strokeStyle=green;ctx.lineWidth=2;ctx.strokeRect(48,48,984,1344);ctx.textAlign='left';ctx.fillStyle=green;ctx.font=h.font(26,h.sans);ctx.fillText('你的灵魂老家在哪座城市',82,108);ctx.font=h.font(30,'Georgia,serif');ctx.fillText('Soul post / 01',790,108);
      ctx.strokeStyle='#C5BBA8';ctx.beginPath();ctx.moveTo(450,190);ctx.lineTo(450,780);ctx.stroke();
      ctx.font=h.font(46,'Didot,Georgia,serif');ctx.fillText(r.en,88,215);ctx.font=h.font(r.name.length===3?126:158,h.serif,'bold');Array.from(r.name).forEach(function(c,i){ctx.fillText(c,112,390+i*155);});
      ctx.fillStyle='#E4E5D8';ctx.fillRect(554,204,368,378);ctx.strokeStyle=green;ctx.lineWidth=7;ctx.setLineDash([2,14]);ctx.strokeRect(545,195,386,396);ctx.setLineDash([]);
      ctx.save();ctx.translate(575,205);ctx.scale(1.85,1.85);ctx.strokeStyle=green;ctx.lineWidth=1.8;ctx.stroke(new Path2D(scenes[r.id]));ctx.restore();ctx.fillStyle=green;ctx.textAlign='center';ctx.font=h.font(25,h.sans);ctx.fillText(r.name+' / '+r.seal,737,558);
      ctx.save();ctx.translate(774,695);ctx.rotate(-.14);ctx.strokeStyle=red;ctx.fillStyle=red;ctx.lineWidth=3;[85,96].forEach(function(rad){ctx.beginPath();ctx.arc(0,0,rad,0,Math.PI*2);ctx.stroke();});ctx.font=h.font(26,h.sans);ctx.fillText('灵 魂 邮 局',0,-25);ctx.font=h.font(21,'Consolas,monospace');ctx.fillText(date(),0,13);ctx.font=h.font(25,h.serif);ctx.fillText('寄 达',0,48);ctx.restore();
      ctx.textAlign='left';ctx.fillStyle=green;h.fit(ctx,r.tag,900,44,h.serif,'bold');ctx.fillText(r.tag,90,870);ctx.strokeStyle='#BEB7A6';ctx.lineWidth=1;[996,1074].forEach(function(y){ctx.beginPath();ctx.moveTo(90,y);ctx.lineTo(990,y);ctx.stroke();});ctx.fillStyle='#394C45';ctx.font=h.font(42,'"Kaiti SC","STKaiti","KaiTi",serif');h.wrap(ctx,r.quote,90,974,880,78,2);
      ctx.font=h.font(27,h.sans);ctx.fillStyle=green;ctx.fillText(r.traits.join('  /  '),90,1150);ctx.font=h.font(25,h.sans);ctx.fillStyle='#736F60';ctx.fillText('归属感投票 '+d.pct+'% · 来自你的答题偏好',90,1205);ctx.strokeStyle=green;ctx.beginPath();ctx.moveTo(90,1258);ctx.lineTo(990,1258);ctx.stroke();ctx.font=h.font(27,h.sans);ctx.fillText(d.labels.cardFooter,90,1315);ctx.font=h.font(22,h.sans);ctx.fillText('趣味测试 · 仅供娱乐',90,1358);
    }
  };
})();
