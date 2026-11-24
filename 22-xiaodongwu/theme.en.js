(function(){
  'use strict';
  var ink='#6B4E3D',sage='#8FA77A',peach='#F2B5A0',paper='#FBF3DF';
  var animals={
    otter:[['M82 167 Q47 164 44 203 Q88 221 121 195',peach],['M107 121 C136 88 235 113 247 158 C263 208 139 219 102 183 Z',peach],['M103 108 C73 61 47 86 65 111 M129 99 C133 62 165 76 153 108',peach],['M59 130 C50 84 141 77 157 120 C174 165 82 188 59 130',peach],['M76 136 Q107 117 137 134 Q121 160 96 155 Z',paper],['M87 118h1 M128 116h1 M106 135h1','none'],['M161 155 Q182 171 200 151 M165 176 Q185 185 206 170 M58 216 Q155 232 258 214','none']],
    shiba:[['M112 140 Q83 191 111 220 L217 220 Q234 169 197 136',peach],['M208 188 C281 214 282 135 241 142 Q217 148 239 168 Q253 156 257 173',peach],['M89 100 L82 43 L129 73 M178 72 L218 43 L215 109',peach],['M81 107 Q144 49 218 108 Q239 168 158 179 Q80 171 81 107',peach],['M88 125 Q112 113 153 142 Q191 112 216 126 Q204 174 154 172 Q104 172 88 125',paper],['M115 112h1 M187 112h1 M146 138 Q154 145 163 138 M154 146v10 M140 155q14 14 29 0 M119 202v19 M192 202v19','none']],
    cat:[['M192 211 C273 224 278 152 246 156 Q230 158 242 178 Q246 196 217 191',peach],['M112 133 Q83 172 107 221 L213 221 Q226 163 193 137',paper],['M97 110 L91 42 L135 77 Q160 67 183 77 L222 44 L216 118 Q207 160 158 160 Q108 158 97 110',paper],['M121 112l13 0 M180 112l13 0 M151 127l8 6 8-6 M159 134v9 M142 141q17 13 34 0 M83 127l31 6 M83 143l30-2 M203 132l31-8 M204 143l30 3 M130 201v20 M182 201v20','none']],
    hamster:[['M102 89 C56 62 68 32 100 49 Q121 57 121 81 M202 86 C241 44 219 30 196 46 Q178 61 181 82',peach],['M72 150 C67 53 245 54 246 153 C252 250 59 248 72 150',peach],['M109 176 Q161 146 208 176 Q210 231 158 234 Q106 232 109 176',paper],['M98 138 Q114 121 130 139 M189 138 Q205 121 220 139 M151 150l9 6 9-6 M137 170q23 19 45 0 M103 200l21-14 M215 199l-20-14','none'],['M145 186h30v32h-30z',sage]],
    fox:[['M171 201 C261 223 299 148 250 101 Q256 165 204 151 Z',peach],['M250 101 Q276 129 272 157 Q253 170 237 162 Q257 138 250 101',paper],['M123 131 Q93 175 103 221 L214 221 Q224 163 185 139',peach],['M84 104 L82 37 L139 76 L166 76 L222 36 L222 105 L155 178 Z',peach],['M84 105 L155 178 L222 105 Q193 110 155 142 Q111 109 84 105',paper],['M117 111l13 7 M191 111l-13 7 M148 153l7 7 7-7 M124 203v18 M189 203v18','none']],
    koala:[['M202 229 L220 30 L239 30 L225 229 Z',sage],['M104 139 Q74 172 100 213 Q141 252 190 208 L219 123 Q203 101 190 127 L164 171 Z',paper],['M97 100 C33 117 40 43 85 54 Q108 57 111 84 M181 86 C185 41 238 54 226 94 Q213 117 184 109',peach],['M77 114 C72 56 196 56 201 118 Q209 173 143 179 Q76 174 77 114',paper],['M130 110 C130 93 155 94 159 112 L159 132 Q145 145 130 132 Z',ink],['M105 112h1 M176 112h1 M134 151q12 8 24 0 M109 193q31 21 65-9','none']],
    hedgehog:[['M67 191 L43 168 L62 151 L43 125 L73 118 L66 89 L95 91 L102 63 L125 77 L146 51 L162 76 L191 60 L197 89 L224 86 L221 117 L249 131 L235 158 L256 184 L226 211 Z',sage],['M83 162 C98 99 205 115 228 178 L256 191 L227 204 Q163 244 83 211 Z',paper],['M170 175h1 M249 192h1 M98 215l-4 14 M202 215l7 14 M85 126l14 12 M120 93l4 19 M160 92l-4 17 M199 111l-9 12','none']],
    penguin:[['M116 204 L89 233 L146 229 M181 208 L224 233 L166 229',peach],['M104 92 C111 33 204 38 215 98 Q245 199 198 223 L118 223 Q66 199 104 92',sage],['M115 108 Q156 144 204 108 Q236 211 160 217 Q82 212 115 108',paper],['M101 119 Q68 144 73 187 Q93 181 104 155 M215 120 Q253 141 247 186 Q226 178 217 153',sage],['M132 95h1 M183 95h1','none'],['M145 111l14 14 15-14z',peach]],
    sloth:[['M39 56 Q155 34 282 63 L280 79 Q150 52 41 73 Z',sage],['M126 99 Q112 65 94 69 Q80 79 97 144 Q81 219 169 224 Q231 221 224 142 L242 79 Q237 57 223 73 L201 114',peach],['M113 140 C108 87 204 80 215 137 Q221 182 167 186 Q118 182 113 140',paper],['M125 135 Q139 112 157 141 L144 154 Z M174 140 Q196 112 205 138 L189 155 Z',sage],['M142 139h1 M188 139h1 M161 153h1 M148 164q18 13 36-1 M121 202q32-11 57 7','none']],
    redpanda:[['M196 195 C273 239 300 140 265 133 Q246 139 254 166 Q247 187 218 165 Z',peach],['M244 178l23 17 M251 158l25 6 M219 191l12 19','none'],['M105 139 Q80 186 107 224 L212 224 Q232 177 194 140',peach],['M91 109 Q64 63 90 56 L129 79 M184 79 L219 54 Q245 76 218 111',peach],['M81 113 Q89 68 155 74 Q223 70 231 118 Q227 173 155 179 Q83 174 81 113',peach],['M94 102 Q122 89 137 114 L124 144 L91 132 Z M178 114 Q194 88 220 102 L224 134 L191 143 Z M131 145 Q155 130 180 145 Q176 172 155 172 Q132 167 131 145',paper],['M113 118h1 M201 118h1 M151 149h1 M121 207v17 M194 207v17','none']],
    seal:[['M90 144 C107 98 192 102 219 166 Q242 178 270 153 L263 193 Q243 216 207 207 Q169 239 93 219 Q42 208 60 165 Z',paper],['M63 150 C41 112 64 84 100 94 Q150 97 143 142 Q126 170 63 150',paper],['M73 122h1 M116 120h1 M91 136h1 M52 139l27 5 M51 151l26-1 M109 141l30-9 M112 150l31 3 M126 190q24-27 43-15 Q157 208 133 211','none'],['M67 229 Q154 244 270 224','none']],
    rabbit:[['M112 98 C82 28 96 12 113 30 L143 91 M163 90 Q169 14 191 26 Q207 48 185 104',peach],['M105 145 Q76 200 106 228 L211 228 Q238 197 200 145',paper],['M87 123 C88 65 220 74 221 127 Q220 179 155 183 Q86 177 87 123',paper],['M118 126h1 M188 126h1 M146 144l10 6 10-6 M156 151v10 M140 160q16 10 33 0 M122 208v19 M190 208v19','none'],['M225 197 C248 188 255 217 234 224 Q222 226 220 214',peach]],
    squirrel:[['M119 185 C35 212 25 98 55 61 Q84 18 114 61 Q132 101 91 119 Q70 146 123 144',peach],['M136 137 Q102 176 119 226 L217 226 Q245 186 200 143',peach],['M133 102 L126 54 L153 78 M181 77 L210 50 L209 103',peach],['M122 112 Q127 74 178 79 Q224 83 226 122 Q222 168 174 170 Q121 166 122 112',peach],['M146 117h1 M198 116h1 M169 134h1 M128 188l24 9 M214 187l-21 11','none'],['M150 188h40q4 40-20 43-25-7-20-43',sage],['M147 187q20-24 46 0 M170 171v-12','none']],
    owl:[['M93 113 L84 55 L127 80 Q158 66 190 80 L232 53 L223 120 Q244 210 205 225 L111 225 Q75 192 93 113',sage],['M111 156 Q155 183 208 153 L202 215 L120 215 Z',paper],['M112 102 C78 114 96 159 126 151 Q157 146 148 121 Q137 97 112 102 M188 102 C153 109 164 159 194 152 Q226 148 218 122 Q210 102 188 102',paper],['M123 126h1 M190 126h1 M92 151q4 38 26 50 M223 151q-5 38-27 51 M122 226v12 M193 226v12','none'],['M149 148l10 18 12-18z',peach]]
  };
  function paths(id){return animals[id]||animals.otter;}
  function drawAnimal(ctx,id,x,y,w){ctx.save();ctx.translate(x,y);ctx.scale(w/320,w/320);ctx.globalAlpha=.15;ctx.fillStyle=sage;ctx.fill(new Path2D('M39 183C8 118 57 64 128 56S281 90 283 163S156 254 72 225Z'));ctx.globalAlpha=1;ctx.strokeStyle=ink;ctx.lineWidth=2.5;ctx.lineJoin='round';ctx.lineCap='round';paths(id).forEach(function(p){var path=new Path2D(p[0]);if(p[1]!=='none'){ctx.fillStyle=p[1];ctx.fill(path);}ctx.stroke(path);});ctx.restore();}
  var closedBook='<svg viewBox="0 0 300 230" aria-hidden="true"><path d="M62 34Q138 14 237 33L239 204Q143 188 63 211Z" fill="'+paper+'" stroke="'+ink+'" stroke-width="2"/><path d="M59 29Q139 8 232 27L232 197Q138 181 59 204Z" fill="'+sage+'" stroke="'+ink+'" stroke-width="2"/><path d="M75 28V198M181 23V195" fill="none" stroke="'+paper+'" opacity=".7"/><path d="M139 32V190M61 120Q138 111 231 119" fill="none" stroke="'+peach+'" stroke-width="7"/><path d="M139 115C92 80 105 62 131 89L140 115C164 62 190 81 152 108Z" fill="none" stroke="'+peach+'" stroke-width="4"/><path d="M117 150q21 11 39 0m-31 12h22" stroke="'+paper+'" fill="none" stroke-width="2"/><path d="M199 198v23l10-7 10 7v-24" fill="'+peach+'"/></svg>';

  var serif='Georgia,"Times New Roman",serif',sans='"Avenir Next","Helvetica Neue",Arial,sans-serif';
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  // Preserve whole words. Fit the longest word first, then shrink to the text box.
  function wrapWords(ctx,text,x,y,width,px,leading,maxLines,family,weight,h){
    var words=String(text).trim().split(/\s+/),lines=[],longest=words.reduce(function(a,b){return a.length>b.length?a:b;},'');
    px=h.fit(ctx,longest,width,px,family,weight);
    function layout(){ctx.font=h.font(px,family,weight);lines=[];var line='';words.forEach(function(word){var next=line?line+' '+word:word;if(line&&ctx.measureText(next).width>width){lines.push(line);line=word;}else line=next;});if(line)lines.push(line);}
    layout();while(lines.length>maxLines&&px>20){px-=2;layout();}
    lines.forEach(function(line,i){ctx.fillText(line,x,y+i*px*leading);});return y+(lines.length-1)*px*leading;
  }
  function rule(ctx,x,y,w,color){ctx.strokeStyle=color;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+w,y);ctx.stroke();}

  function art(id,name){return '<svg class="animal-art" viewBox="0 0 320 260" role="img" aria-label="Illustration of '+esc(name)+'"><path d="M39 183C8 118 57 64 128 56S281 90 283 163S156 254 72 225Z" fill="'+sage+'" opacity=".13"/><g stroke="'+ink+'" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round">'+paths(id).map(function(p){return '<path d="'+p[0]+'" fill="'+p[1]+'"/>';}).join('')+'</g><path d="M30 228q12-29 25-11m-16 19q2-19-13-22 M274 229q-4-22 9-31m-5 25q14-16 26-9" fill="none" stroke="'+sage+'" stroke-width="2"/></svg>';}
  window.THEME_EN={
    colors:{bg:paper,fg:ink,accent:sage,muted:'#796C59'},cardFont:sans,letters:['a','b','c','d'],qNo:function(i,n){return 'Field note '+String(i+1).padStart(2,'0')+' / '+n;},
    decor:window.THEME.decor,
    homeTop:'<div class="storybook-preview"><span class="book-note">a field guide to your off-duty self</span>'+art('otter','an otter')+'<span class="book-page">OPEN AT YOUR OWN PACE</span></div>',
    homeBottom:'<div class="book-colophon">A little wild. Entirely your own.</div>',ornament:window.THEME.ornament,
    loader:'<div class="turning-book">'+closedBook+'</div>',gateArt:'<div class="pw-art sealed-book">'+closedBook+'</div>',
    heroHTML:function(r,pct,L){return '<div class="r-hero animal-page"><div class="r-kicker">'+esc(L.resultKicker)+'</div>'+art(r.id,r.name)+'<div class="animal-caption">'+esc(r.sub)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+' <b>'+pct+'%</b></div></div>';},
    drawCard:function(ctx,d,h){
      ctx.fillStyle=paper;ctx.fillRect(0,0,1080,1440);h.noise(ctx,13000,'rgba(107,78,61,A)',22);
      ctx.fillStyle=ink;ctx.textAlign='left';wrapWords(ctx,d.quiz.title,80,87,790,29,1.2,1,sans,'normal',h);
      ctx.textAlign='right';ctx.font=h.font(26,serif);ctx.fillText('FIELD / 22',1000,87);rule(ctx,80,121,920,sage);
      ctx.textAlign='center';ctx.fillStyle='#58734A';ctx.font=h.font(25,sans);ctx.fillText(d.labels.resultKicker,540,184);
      ctx.fillStyle=ink;wrapWords(ctx,d.r.name,540,294,900,94,1.08,2,serif,'normal',h);
      wrapWords(ctx,d.r.tag,540,444,850,33,1.25,2,sans,'normal',h);
      drawAnimal(ctx,d.r.id,180,472,720);
      ctx.textAlign='center';ctx.fillStyle=ink;wrapWords(ctx,d.r.quote,540,1115,850,42,1.25,2,serif,'normal',h);
      ctx.fillStyle='#58734A';wrapWords(ctx,d.r.traits.join('  /  '),540,1246,900,27,1.25,2,sans,'normal',h);
      rule(ctx,210,1300,660,'#B8BA9D');ctx.fillStyle=ink;wrapWords(ctx,d.labels.cardFooter,540,1353,900,28,1.2,1,serif,'normal',h);
      ctx.font=h.font(22,sans);ctx.fillText('A playful personality quiz / Just for fun',540,1394);
    },pickDelay:300,loadingMs:1950
  };
})();
