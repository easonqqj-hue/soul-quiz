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
function badge(seal){return '<svg viewBox="0 0 200 190" aria-hidden="true"><path d="M100 8l78 45v82l-78 45-78-45V53z" fill="#101725" stroke="#2DF5E6" stroke-width="1.5"/><path d="M100 20l67 39v70l-67 39-67-39V59z" fill="none" stroke="#9B5CFF"/><g transform="rotate('+(Number(seal)*11)+' 100 95)"><path d="M100 48l14 33 33 14-33 14-14 33-14-33-33-14 33-14z" fill="#2DF5E60D" stroke="#2DF5E6" stroke-width="2"/><path d="M100 67l28 28-28 28-28-28z" fill="none" stroke="#9B5CFF" stroke-width="2"/></g><circle cx="100" cy="95" r="8" fill="#2DF5E6"/><path d="M8 73v44M192 73v44M83 4h34M83 186h34" stroke="#9B5CFF" stroke-width="3"/></svg>';}
window.THEME_EN = {
  "colors": {
    "bg": "#07080D",
    "fg": "#EDF1FA",
    "accent": "#2DF5E6",
    "muted": "#9BAAC0"
  },
  "letters": [
    "A",
    "B",
    "C",
    "D"
  ],
  "decor": "<div class=\"hud-grid\"></div><div class=\"hud-flank left\"></div><div class=\"hud-flank right\"></div>",
  "homeTop": "<div class=\"player-emblem\"><div class=\"emblem-copy\"><span>NO DEFAULT<br>PLAY STYLE.</span><small>PROFILE / 27<br>AWAITING INPUT</small></div><svg viewBox=\"0 0 200 190\" aria-hidden=\"true\"><path d=\"M100 8l78 45v82l-78 45-78-45V53z\" fill=\"#101725\" stroke=\"#2DF5E6\" stroke-width=\"1.5\"/><path d=\"M100 20l67 39v70l-67 39-67-39V59z\" fill=\"none\" stroke=\"#9B5CFF\" stroke-width=\"1\"/><path d=\"M100 36l51 30v58l-51 30-51-30V66z\" fill=\"none\" stroke=\"#263748\"/><g transform=\"rotate(0 100 95)\"><path d=\"M100 48l14 33 33 14-33 14-14 33-14-33-33-14 33-14z\" fill=\"#2DF5E60D\" stroke=\"#2DF5E6\" stroke-width=\"2\"/><path d=\"M100 67l28 28-28 28-28-28z\" fill=\"none\" stroke=\"#9B5CFF\" stroke-width=\"2\"/></g><circle cx=\"100\" cy=\"95\" r=\"8\" fill=\"#2DF5E6\"/><path d=\"M8 73v44M192 73v44M83 4h34M83 186h34\" stroke=\"#9B5CFF\" stroke-width=\"3\"/></svg><div class=\"emblem-caption\">YOUR STYLE. YOUR SESSION.</div></div>",
  "homeBottom": "<div class=\"channel-footer\"><span>LOCAL SIGNAL</span><span>14 IDENTITIES / 06 AXES</span></div>",
  "ornament": "<div class=\"hud-divider\"><i></i><i></i><i></i><span>PLAYER CONNECTED</span></div>",
  "loader": "<div class=\"profile-loader\"><div class=\"encrypted-card\"><div class=\"ec-top\"><span>PLAYER FILE</span><span>///</span></div><div class=\"ec-lock\"><svg viewBox=\"0 0 100 100\" aria-hidden=\"true\"><path d=\"M30 45V30a20 20 0 0140 0v15M22 45h56v39H22z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M50 58v14\" stroke=\"currentColor\" stroke-width=\"3\"/><path d=\"M9 9h14M9 9v14M91 9H77M91 9v14M9 91h14M9 91V77M91 91H77M91 91V77\" stroke=\"#9B5CFF\" fill=\"none\"/></svg></div><span class=\"ec-label\">IDENTITY ENCRYPTED</span><div class=\"ec-bars\"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class=\"ec-scan\"></div></div></div>",
  "gateArt": "<div class=\"pw-art player-gate\"><div class=\"encrypted-card\"><div class=\"ec-top\"><span>PLAYER FILE</span><span>///</span></div><div class=\"ec-lock\"><svg viewBox=\"0 0 100 100\" aria-hidden=\"true\"><path d=\"M30 45V30a20 20 0 0140 0v15M22 45h56v39H22z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M50 58v14\" stroke=\"currentColor\" stroke-width=\"3\"/><path d=\"M9 9h14M9 9v14M91 9H77M91 9v14M9 91h14M9 91V77M91 91H77M91 91V77\" stroke=\"#9B5CFF\" fill=\"none\"/></svg></div><span class=\"ec-label\">IDENTITY ENCRYPTED</span><div class=\"ec-bars\"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class=\"ec-scan\"></div></div></div>",
  "pickDelay": 240,
  "loadingMs": 1950,
  qNo: function(i){return "INPUT / "+String(i+1).padStart(2,"0");},
  heroHTML: function(r,pct,L){
return '<div class="r-hero player-card"><div class="player-top"><span>PLAYER / '+esc(r.seal)+'</span><span>'+esc(r.rank)+'</span></div><div class="result-badge">'+badge(r.seal)+'</div><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><p class="r-tag">'+esc(r.tag)+'</p><div class="player-role"><small>PREFERRED ROLE</small><b>'+esc(r.position)+'</b></div><p class="r-quote">'+esc(r.quote)+'</p>'+traits(r)+'<div class="hud-radar"></div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div><small class="player-fine">STYLE BADGE / NOT A COMPETITIVE RANK</small></div>';
},
  drawCard: function(c,d,h){
var r=d.r;c.fillStyle='#07080D';c.fillRect(0,0,1080,1440);c.lineWidth=1;for(var y=36;y<1440;y+=36)line(c,0,y,1080,y,'#14202D');
c.strokeStyle='#37546B';c.lineWidth=2;c.beginPath();c.moveTo(48,355);c.lineTo(48,98);c.lineTo(96,50);c.lineTo(350,50);c.moveTo(1032,1100);c.lineTo(1032,1342);c.lineTo(984,1390);c.lineTo(730,1390);c.stroke();
c.textAlign='left';c.fillStyle='#2DF5E6';c.font=h.font(25,mono);c.fillText('PLAYER / '+r.seal,86,109);c.textAlign='right';c.fillStyle='#9BAAC0';c.fillText('LOCAL PROFILE',994,109);
poly(c,540,277,130,6,-Math.PI/2);c.fillStyle='#101725';c.fill();c.strokeStyle='#2DF5E6';c.lineWidth=3;c.stroke();poly(c,540,277,114,6,-Math.PI/2);c.strokeStyle='#9B5CFF';c.lineWidth=2;c.stroke();
c.save();c.translate(540,277);c.rotate(Number(r.seal)*11*Math.PI/180);poly(c,0,0,61,4,0);c.strokeStyle='#2DF5E6';c.stroke();poly(c,0,0,35,4,Math.PI/4);c.strokeStyle='#9B5CFF';c.stroke();c.restore();
c.textAlign='center';c.fillStyle='#9BAAC0';fit(c,h,r.rank+' / '+r.position,540,449,900,25,mono);
c.fillStyle='#EDF1FA';words(c,h,r.name,540,542,900,76,84,2,sans,'900');c.fillStyle='#2DF5E6';words(c,h,r.tag,540,697,890,32,43,2,sans,'600');
c.fillStyle='#EDF1FA';words(c,h,r.quote,540,809,870,37,51,2,mono);c.fillStyle='#9BAAC0';fit(c,h,r.traits.join(' / '),540,918,900,25,mono);
h.radar(c,540,1100,112,d.dims,d.dimNames,{grid:'#29374C',fill:'#2DF5E619',stroke:'#2DF5E6',label:'#AEBBD0',px:22,fam:mono});
c.textAlign='left';c.fillStyle='#B58DFF';c.font=h.font(21,mono);c.fillText('STYLE SYNC',86,1084);c.fillStyle='#2DF5E6';c.font=h.font(40,mono,'bold');c.fillText(d.pct+'%',86,1135);
c.textAlign='right';c.fillStyle='#9BAAC0';c.font=h.font(21,mono);c.fillText('06 AXES',994,1084);c.fillText('14 STYLES',994,1122);
line(c,86,1290,994,1290,'#2DF5E6');c.textAlign='center';c.fillStyle='#EDF1FA';fit(c,h,d.labels.cardFooter,540,1341,940,28,sans,'600');c.fillStyle='#9BAAC0';c.font=h.font(22,sans);c.fillText(d.labels.cardDisc,540,1385);
},
  onResult: function(cur,el){
var host=el.querySelector('.hud-radar');if(!host||!cur.z)return;
var vals=cur.z.map(window.SQ.dimVal),names=window.QUIZ_EN.dims.map(function(d){return d.name;});
function point(i,r){var a=-Math.PI/2+i*Math.PI/3;return [180+r*Math.cos(a),148+r*Math.sin(a)];}
function points(radius){return vals.map(function(v,i){return point(i,radius==null?92*Math.max(.08,v/100):radius).join(',');}).join(' ');}
var s='<svg viewBox="0 0 360 298" role="img" aria-label="'+esc(names.map(function(n,i){return n+' '+vals[i];}).join(', '))+'">';
[30,61,92].forEach(function(r){s+='<polygon points="'+points(r)+'" fill="none" stroke="#2D3B50"/>';});
vals.forEach(function(v,i){var p=point(i,92),t=point(i,129);s+='<path d="M180 148L'+p.join(' ')+'" stroke="#263748"/><text x="'+t[0]+'" y="'+(t[1]+4)+'" text-anchor="middle" fill="#AEBBD0" font-size="11" font-family="Consolas,monospace">'+esc(names[i])+'</text>';});
host.innerHTML=s+'<polygon points="'+points(null)+'" fill="#2DF5E619" stroke="#2DF5E6" stroke-width="2"/></svg>';
}
};
})();
