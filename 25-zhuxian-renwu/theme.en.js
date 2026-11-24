/* B09EN: complete English presentation layer. Chinese theme stays untouched. */
(function(){
"use strict";

function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
var sans='"Avenir Next","Helvetica Neue",Arial,sans-serif';
var mono='"SF Mono",Consolas,"Courier New",monospace';
var pen='"American Typewriter",Georgia,serif';
function wordLines(c,text,width){var rows=[],line='';String(text).split(/\s+/).forEach(function(word){var next=line?line+' '+word:word;if(line&&c.measureText(next).width>width){rows.push(line);line=word;}else line=next;});if(line)rows.push(line);return rows;}
function words(c,h,text,x,y,width,px,lineHeight,maxLines,family,weight){
 var longest=String(text).split(/\s+/).reduce(function(a,b){return a.length>b.length?a:b;},'');
 px=h.fit(c,longest,width,px,family,weight);c.font=h.font(px,family,weight);
 var rows=wordLines(c,text,width);
 while(rows.length>maxLines&&px>20){px-=2;c.font=h.font(px,family,weight);rows=wordLines(c,text,width);}
 rows.forEach(function(row,i){c.fillText(row,x,y+i*lineHeight);});
 return y+(rows.length-1)*lineHeight;
}
function fit(c,h,text,x,y,width,px,family,weight){var size=h.fit(c,text,width,px,family,weight);c.font=h.font(size,family,weight);c.fillText(text,x,y);}
function traits(r){return '<div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div>';}
function line(c,x,y,x2,y2,color){c.strokeStyle=color;c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke();}
function poly(c,x,y,r,n,angle){c.beginPath();for(var i=0;i<n;i++){var a=angle+i*Math.PI*2/n;i?c.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r):c.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}c.closePath();}
window.THEME_EN = {
  "colors": {
    "bg": "#12131C",
    "fg": "#F2F2F2",
    "accent": "#7BD389",
    "muted": "#A5ACB9"
  },
  "letters": [
    "01",
    "02",
    "03",
    "04"
  ],
  "decor": "<div class=\"q-grid\"></div><div class=\"q-edge q-edge-a\"></div><div class=\"q-edge q-edge-b\"></div>",
  "homeTop": "<div class=\"quest-map\"><div class=\"map-cap\"><span>SAVE POINT</span><span>01 / 14 ROUTES</span></div><svg viewBox=\"0 0 360 164\" role=\"img\" aria-label=\"\" shape-rendering=\"crispEdges\"><path fill=\"#1C2530\" d=\"M0 118h24V94h24v14h28V78h32v18h28V64h32v40h32V76h32v24h32V62h32v30h32v26h32v46H0z\"/><path fill=\"#263D3A\" d=\"M0 144h36v-18h32v12h28v-30h28v18h48v-16h32v16h44v-30h36v32h40v-14h36v50H0z\"/><path fill=\"#F2C14E\" d=\"M36 28h8v8h-8zM296 18h4v4h-4zM106 24h4v4h-4zM334 60h4v4h-4z\"/><path fill=\"#7BD389\" d=\"M170 112h20v-8h-4V78h-8v26h-8zM174 50h12v8h-12zM166 58h28v20h-28zM170 78h20v18h-20z\"/><path fill=\"#F2C14E\" d=\"M206 50h4v52h-4zM210 50h28v16h-28z\"/><path fill=\"#355448\" d=\"M156 150h48v8h-48zM144 160h72v4h-72z\"/><path stroke=\"#7BD389\" stroke-width=\"2\" fill=\"none\" d=\"M180 126v14h-36v12h-38\"/><path fill=\"#F2F2F2\" d=\"M178 63h4v4h-4z\"/></svg><div class=\"map-note\">You are here. The route is still yours.</div></div>",
  "homeBottom": "<div class=\"save-note\">ONE LIFE / MANY POSSIBLE QUESTS</div>",
  "ornament": "<div class=\"pixel-rule\"><i></i><i></i><i></i></div>",
  "loader": "<div class=\"quest-loader\"><svg viewBox=\"0 0 240 200\" aria-hidden=\"true\" shape-rendering=\"crispEdges\"><path fill=\"#1B202C\" stroke=\"#7BD389\" stroke-width=\"3\" d=\"M46 22h148v12h12v132h-12v12H46v-12H34V34h12z\"/><path fill=\"#26392F\" d=\"M54 38h132v124H54z\"/><path fill=\"#7BD389\" d=\"M62 49h116v5H62zM62 142h116v5H62z\"/><path fill=\"#526759\" d=\"M68 66h60v4H68zM68 78h96v4H68zM68 90h76v4H68zM68 128h104v4H68z\"/><path fill=\"#F2C14E\" d=\"M106 83h28v10h8v32h-44V93h8z\"/><path fill=\"#12131C\" d=\"M112 89h16v12h-16zM116 107h8v12h-8z\"/><path stroke=\"#364636\" stroke-width=\"2\" d=\"M20 48H8m212 100h12M54 190v8M190 4v10\"/></svg></div>",
  "gateArt": "<div class=\"pw-art quest-scroll\"><svg viewBox=\"0 0 240 200\" aria-hidden=\"true\" shape-rendering=\"crispEdges\"><path fill=\"#1B202C\" stroke=\"#7BD389\" stroke-width=\"3\" d=\"M46 22h148v12h12v132h-12v12H46v-12H34V34h12z\"/><path fill=\"#26392F\" d=\"M54 38h132v124H54z\"/><path fill=\"#7BD389\" d=\"M62 49h116v5H62zM62 142h116v5H62z\"/><path fill=\"#526759\" d=\"M68 66h60v4H68zM68 78h96v4H68zM68 90h76v4H68zM68 128h104v4H68z\"/><path fill=\"#F2C14E\" d=\"M106 83h28v10h8v32h-44V93h8z\"/><path fill=\"#12131C\" d=\"M112 89h16v12h-16zM116 107h8v12h-8z\"/><path stroke=\"#364636\" stroke-width=\"2\" d=\"M20 48H8m212 100h12M54 190v8M190 4v10\"/></svg></div>",
  "pickDelay": 250,
  "loadingMs": 1950,
  qNo: function(i){return "DIALOGUE / "+String(i+1).padStart(2,"0");},
  heroHTML: function(r,pct,L){
return '<div class="r-hero"><div class="quest-header"><span>QUEST ACCEPTED</span><span>SAVE '+esc(r.seal)+'</span></div><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><p class="r-tag">'+esc(r.tag)+'</p><p class="r-quote">'+esc(r.quote)+'</p>'+traits(r)+'<dl class="quest-stats"><div><dt>STATUS</dt><dd>'+esc(r.level)+'</dd></div><div><dt>REWARD</dt><dd>'+esc(r.reward)+'</dd></div></dl><div class="side-quest"><small>STARTER SIDE QUEST</small><p>'+esc(r.side)+'</p></div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div>';
},
  drawCard: function(c,d,h){
var r=d.r;c.fillStyle='#12131C';c.fillRect(0,0,1080,1440);
c.fillStyle='#283238';for(var x=28;x<1080;x+=32)for(var y=28;y<1440;y+=32)c.fillRect(x,y,2,2);
c.fillStyle='#1B202B';c.fillRect(64,138,952,1160);c.strokeStyle='#7BD389';c.lineWidth=3;c.strokeRect(64,138,952,1160);
c.fillStyle='#7BD389';[[52,150],[1004,150],[52,1274],[1004,1274]].forEach(function(p){c.fillRect(p[0],p[1],24,12);});
c.textAlign='left';c.fillStyle='#A5ACB9';fit(c,h,d.quiz.title,76,82,830,27,mono);
c.fillStyle='#7BD389';c.fillRect(65,162,950,60);c.fillStyle='#12131C';c.font=h.font(26,mono,'bold');c.fillText('MAIN QUEST FOUND',100,201);c.textAlign='right';c.fillText('SAVE / '+r.seal,980,201);
c.textAlign='left';c.fillStyle='#F2C14E';c.fillRect(104,269,7,53);c.fillRect(111,269,38,21);c.fillRect(90,322,35,7);
c.fillStyle='#A5ACB9';c.font=h.font(25,mono);c.fillText('YOUR CURRENT QUEST',177,307);
c.fillStyle='#F2F2F2';words(c,h,r.name,100,420,880,85,94,2,mono,'bold');
c.fillStyle='#7BD389';words(c,h,r.tag,100,588,860,34,46,2,sans,'600');
line(c,100,674,980,674,'#36434A');
c.fillStyle='#F2F2F2';words(c,h,r.quote,100,744,860,42,57,3,mono);
c.fillStyle='#A5ACB9';fit(c,h,r.traits.join(' / '),100,936,860,27,mono);
d.dims.forEach(function(v,i){var xx=100+(i%2)*458,yy=1010+Math.floor(i/2)*66;c.fillStyle='#A5ACB9';fit(c,h,d.dimNames[i],xx,yy,175,25,mono);for(var k=0;k<10;k++){c.fillStyle=k<Math.round(v/10)?'#7BD389':'#36434A';c.fillRect(xx+184+k*17,yy-18,12,18);}c.textAlign='right';c.fillStyle='#F2F2F2';c.font=h.font(24,mono);c.fillText(String(v),xx+417,yy);c.textAlign='left';});
line(c,100,1183,980,1183,'#36434A');c.fillStyle='#F2C14E';c.font=h.font(22,mono);c.fillText('REWARD',100,1222);fit(c,h,r.reward,100,1266,690,27,sans);
c.textAlign='right';c.fillStyle='#7BD389';c.font=h.font(40,mono,'bold');c.fillText(d.pct+'%',980,1254);
c.textAlign='center';c.fillStyle='#F2F2F2';fit(c,h,d.labels.cardFooter,540,1356,940,27,sans,'600');c.fillStyle='#A5ACB9';c.font=h.font(22,sans);c.fillText(d.labels.cardDisc,540,1400);
}
};
})();
