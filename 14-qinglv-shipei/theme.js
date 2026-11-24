(function(){
  'use strict';
  var red='#E5484D',blue='#2F55D4',purple='#6B3FA0',paper='#F5F1EA',ink='#242326';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  var print='<svg viewBox="0 0 360 210" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><pattern id="risoDots" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="'+paper+'" opacity=".45"/></pattern></defs><path d="M22 28H338V182H22V125a20 20 0 0 0 0-40Z" fill="'+paper+'" stroke="'+ink+'" stroke-width="1"/><path d="M180 28V182" stroke="'+ink+'" stroke-dasharray="3 5"/><circle cx="143" cy="105" r="61" fill="'+red+'"/><circle cx="217" cy="105" r="61" fill="'+blue+'"/><path d="M180 57a61 61 0 0 1 0 96 61 61 0 0 1 0-96" fill="'+purple+'"/><circle cx="143" cy="105" r="61" fill="url(#risoDots)"/><circle cx="217" cy="105" r="61" fill="url(#risoDots)"/><g fill="none" stroke="'+paper+'" stroke-width="2"><path d="M110 119V91h22a14 14 0 0 1 0 28Z"/><path d="M228 91v28m-10-28h20m-20 28h20"/></g><g fill="'+ink+'" font-family="Arial,sans-serif" font-size="9" letter-spacing="2"><text x="35" y="46">ADMIT TWO</text><text x="228" y="172">KEEP BOTH HALVES</text></g><g stroke="'+ink+'" stroke-width="1"><path d="M9 18h16m-8-8v16M335 192h16m-8-8v16"/></g></svg>';
  function base(ctx,h){
    ctx.fillStyle=paper;ctx.fillRect(0,0,h.W,h.H);ctx.strokeStyle=ink;ctx.lineWidth=2;ctx.strokeRect(46,46,988,1348);
    ctx.textAlign='left';ctx.fillStyle=ink;ctx.font=h.font(27,h.sans,'bold');ctx.fillText('情侣适配度测试',94,114);
    ctx.textAlign='right';ctx.font=h.font(24,'Futura,Arial,sans-serif');ctx.fillText('Two of us / 双人票',986,114);
    ctx.strokeStyle='#b7b0a7';ctx.beginPath();ctx.moveTo(94,146);ctx.lineTo(986,146);ctx.stroke();
  }
  function perforation(ctx,y){ctx.save();ctx.strokeStyle=ink;ctx.lineWidth=2;ctx.setLineDash([7,11]);ctx.beginPath();ctx.moveTo(46,y);ctx.lineTo(1034,y);ctx.stroke();ctx.setLineDash([]);[46,1034].forEach(function(x){ctx.fillStyle=paper;ctx.beginPath();ctx.arc(x,y,18,0,Math.PI*2);ctx.fill();ctx.stroke();});ctx.restore();}
  function circles(ctx,x,y,r){ctx.save();ctx.globalCompositeOperation='multiply';ctx.fillStyle=red;ctx.beginPath();ctx.arc(x-r*.57,y,r,0,Math.PI*2);ctx.fill();ctx.fillStyle=blue;ctx.beginPath();ctx.arc(x+r*.57,y,r,0,Math.PI*2);ctx.fill();ctx.restore();}
  function footer(ctx,h){ctx.textAlign='left';ctx.fillStyle=ink;ctx.font=h.font(25,h.sans,'bold');ctx.fillText('情侣适配度测试 / 我们的双人票',94,1315);ctx.font=h.font(22);ctx.fillStyle='#625d59';ctx.fillText('趣味测试 · 仅供娱乐',94,1360);ctx.font=h.font(24,'Futura,Arial,sans-serif');ctx.textAlign='right';ctx.fillText('KEEP BOTH HALVES',986,1360);}
  function single(ctx,d,h){
    base(ctx,h);circles(ctx,850,300,95);ctx.textAlign='left';ctx.fillStyle=red;ctx.font=h.font(28);ctx.fillText('这一半票根 / 你的恋爱风格',94,227);
    ctx.fillStyle=ink;h.fit(ctx,d.r.name,860,112,h.sans,'900');ctx.fillText(d.r.name,94,474);ctx.fillStyle=red;h.fit(ctx,d.r.tag,880,38,h.sans,'bold');ctx.fillText(d.r.tag,94,548);
    ctx.fillStyle=ink;ctx.font=h.font(41,h.sans,'bold');h.wrap(ctx,d.r.quote,94,665,870,62,2);
    ctx.font=h.font(27);ctx.fillStyle='#625d59';ctx.fillText(d.r.traits.join(' / '),94,819);
    ctx.fillStyle=red;ctx.fillRect(94,864,890,6);ctx.font=h.font(26);ctx.fillStyle=ink;ctx.fillText('风格贴合度',94,927);ctx.textAlign='right';ctx.font=h.font(60,'Futura,Arial,sans-serif','bold');ctx.fillText(d.pct+'%',986,934);
    perforation(ctx,997);ctx.textAlign='left';ctx.fillStyle=blue;ctx.font=h.font(44,h.sans,'bold');ctx.fillText('等 TA 来撕另一半',94,1088);ctx.font=h.font(28);ctx.fillText('两种爱法，都值得被看见。',94,1145);ctx.font=h.font(23);ctx.fillText('这是一张个人风格票根，不代表双人关系结论。',94,1205);footer(ctx,h);h.noise(ctx,8500,'rgba(0,0,0,A)',14);
  }
  function couple(ctx,d,h){
    base(ctx,h);ctx.textAlign='left';ctx.fillStyle=red;h.fit(ctx,d.na,390,48,h.sans,'bold');ctx.fillText(d.na,94,225);ctx.textAlign='right';ctx.fillStyle=blue;h.fit(ctx,d.nb,390,48,h.sans,'bold');ctx.fillText(d.nb,986,225);ctx.textAlign='center';ctx.fillStyle=purple;ctx.font=h.font(34,'Futura,Arial,sans-serif');ctx.fillText('&',540,225);
    circles(ctx,540,414,155);ctx.fillStyle=paper;ctx.font=h.font(158,'Futura,Arial,sans-serif','bold');ctx.fillText(d.pct,518,457);ctx.font=h.font(43,'Futura,Arial,sans-serif');ctx.fillText('%',667,453);
    ctx.fillStyle=ink;ctx.font=h.font(26);ctx.fillText('趣味适配度 / 合拍，也留一点不同',540,624);h.fit(ctx,d.r.name,880,84,h.sans,'900');ctx.fillText(d.r.name,540,738);ctx.fillStyle=purple;h.fit(ctx,d.r.tag,870,32,h.sans,'bold');ctx.fillText(d.r.tag,540,801);
    ctx.fillStyle=ink;ctx.font=h.font(37,h.sans,'bold');h.wrap(ctx,d.r.quote,540,880,870,55,2);perforation(ctx,983);
    d.dimNames.forEach(function(name,i){var col=i%2,row=Math.floor(i/2),x=94+col*460,y=1045+row*67;ctx.textAlign='left';ctx.fillStyle=ink;ctx.font=h.font(24);ctx.fillText(name,x,y);ctx.fillStyle='#ded8cf';ctx.fillRect(x+92,y-20,220,26);ctx.fillStyle=red;ctx.fillRect(x+92,y-20,220*d.dimsA[i]/100,18);ctx.save();ctx.globalCompositeOperation='multiply';ctx.fillStyle=blue;ctx.fillRect(x+92,y-12,220*d.dimsB[i]/100,18);ctx.restore();ctx.fillStyle='#625d59';ctx.font=h.font(20);ctx.fillText(d.dimsA[i]+' / '+d.dimsB[i],x+325,y);});
    ctx.textAlign='center';ctx.fillStyle='#625d59';ctx.font=h.font(22);ctx.fillText('红为先答的一半，蓝为后答的一半 · 分数不决定关系走向',540,1251);footer(ctx,h);h.noise(ctx,8500,'rgba(0,0,0,A)',24);
  }
  window.THEME={
    colors:{bg:paper,fg:ink,accent:red,muted:'#6b625d'},letters:['a','b','c','d'],qNo:function(i){return '印下第 '+String(i+1).padStart(2,'0')+' 格 / your half';},
    decor:'<div class="riso-edge edge-a"></div><div class="riso-edge edge-b"></div>',
    homeTop:'<div class="riso-home-art">'+print+'</div>',
    homeBottom:'<div class="riso-steps"><span>各自作答</span><i></i><span>邀请另一半</span><i></i><span>解锁双人票</span></div>',
    ornament:'',loader:'<div class="riso-loader"><span></span><span></span></div>',
    gateArt:'<div class="pw-art riso-sealed">'+print+'<div class="riso-seal">答案封存 · 待拆封</div></div>',
    heroHTML:function(r,pct,L){return '<div class="r-hero personal-ticket"><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div><div class="ticket-end">KEEP THIS HALF / 等 TA 来拼票</div></div>';},
    coupleHeroHTML:function(c,na,nb,L){return '<div class="r-hero couple"><div class="r-kicker">'+esc(L.coupleKicker)+'</div><div class="cp-names"><span>'+esc(na)+'</span><em>&amp;</em><span>'+esc(nb)+'</span></div><div class="riso-score"><div class="cp-score"><b>'+c.score+'</b><i>%</i></div></div><div class="r-sub">'+esc(L.coupleScore)+'</div><h1 class="r-name">'+esc(c.pair.name)+'</h1><div class="r-tag">'+esc(c.pair.tag)+'</div><div class="r-quote">'+esc(c.pair.quote)+'</div><div class="cp-types"><div><small>'+esc(na)+'</small><b>'+esc(c.a.name)+'</b></div><div><small>'+esc(nb)+'</small><b>'+esc(c.b.name)+'</b></div></div><div class="ticket-end">分数是趣味映照，关系由你们一起经营</div></div>';},
    onScreen:function(id){if(id==='home'||id==='quiz'){var box=document.getElementById('partnerBox');document.body.dataset.ink=box&&box.style.display!=='none'?'b':'a';}},
    onBuild:function(){var b=document.getElementById('partnerBox');if(b&&window.MutationObserver)new MutationObserver(function(){document.body.dataset.ink=b.style.display==='none'?'a':'b';}).observe(b,{attributes:true,attributeFilter:['style']});},
    drawCard:single,drawCoupleCard:couple,pickDelay:290,loadingMs:1950
  };
})();
