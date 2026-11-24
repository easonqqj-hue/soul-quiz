(function(){
 'use strict';
 var navy='#172C43',brick='#A65342',paper='#F6F1E9',pink='#D893A5',gold='#EBA466';
 var serif='Georgia,"Times New Roman",serif',sans='"Avenir Next","Helvetica Neue",Arial,sans-serif';
 function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
 function wrapWords(c,h,text,x,y,w,size,family,weight,maxLines){
   var words=String(text).split(/\s+/),lines,px=size;
   words.forEach(function(word){px=Math.min(px,h.fit(c,word,w,px,family,weight));});
   function split(){lines=[];var line='';words.forEach(function(word){var trial=line?line+' '+word:word;if(line&&c.measureText(trial).width>w){lines.push(line);line=word;}else line=trial;});if(line)lines.push(line);}
   do{c.font=h.font(px,family,weight);split();if(!maxLines||lines.length<=maxLines||px<=20)break;px-=2;}while(true);
   lines.forEach(function(line,i){c.fillText(line,x,y+i*px*1.18);});return y+lines.length*px*1.18;
 }
 function coast(vals){return Math.max(3,Math.min(97,Math.round(50+(vals[0]+vals[1]+vals[2]-vals[3]-vals[4]-vals[5])/6)));}
 function stored(){try{return JSON.parse(localStorage.getItem('sq_nanbei-renge-en')||'{}').answers||[];}catch(e){return [];}}
 function fitQuestionStage(){var stage=document.getElementById('stage');function fit(){var card=stage.lastElementChild;if(card)stage.style.minHeight=card.offsetHeight+'px';}var resize=window.ResizeObserver?new ResizeObserver(fit):null;new MutationObserver(function(){if(resize){resize.disconnect();if(stage.lastElementChild)resize.observe(stage.lastElementChild);}fit();}).observe(stage,{childList:true});window.addEventListener('resize',fit);}
 function gauge(ans){var east=0,total=0;ans.forEach(function(a,i){if(a==null||!window.QUIZ_EN.questions[i])return;var w=window.QUIZ_EN.questions[i].o[a][1];Object.keys(w).forEach(function(k){total+=w[k];if('ABC'.indexOf(k)>=0)east+=w[k];});});var bar=document.querySelector('.q-bar');if(bar)bar.style.setProperty('--coast',(total?8+84*(1-east/total):50)+'%');}
 function art(id){return '<svg viewBox="0 0 460 220" fill="none" aria-hidden="true"><defs><linearGradient id="'+id+'" x2="0" y2="1"><stop stop-color="#EDA76E"/><stop offset=".5" stop-color="#D893A5"/><stop offset="1" stop-color="#79749B"/></linearGradient></defs><path fill="'+navy+'" d="M0 0H230V220H0Z"/><path fill="url(#'+id+')" d="M230 0H460V220H230Z"/><g fill="'+brick+'" stroke="#D99878" stroke-width=".8"><path d="M22 216V89H76V216M81 216V59H145V216M150 216V103H209V216"/><path d="M18 89H79V82H18ZM77 59H149V51H77ZM146 103H213V96H146Z"/></g><g stroke="#EFCEAA" stroke-width="1.2"><path d="M32 105H47V129H32ZM54 105H69V129H54ZM32 144H47V166H32ZM54 144H69V166H54ZM92 77H108V103H92ZM119 77H135V103H119ZM92 117H108V143H92ZM119 117H135V143H119ZM161 119H176V144H161ZM185 119H200V144H185ZM161 158H176V183H161ZM185 158H200V183H185Z"/><path d="M95 216V169Q112 147 129 169V216M89 211H135M86 217H138"/></g><path d="M35 24L42 39L49 31L46 45L59 47L47 54L50 63L39 59L33 68L34 56L20 59L27 48L17 42L31 41Z" stroke="#E2B16C"/><path d="M35 49L35 76" stroke="#E2B16C"/><circle cx="341" cy="92" r="36" fill="#F8DBAF"/><path d="M230 174Q290 145 346 172T460 168V220H230Z" fill="#5D667F"/><path d="M230 198Q305 171 369 191T460 183M230 210Q306 190 366 205T460 198" stroke="#EDC6C1"/><g stroke="'+navy+'" stroke-width="2.5" stroke-linecap="round"><path d="M416 220Q416 150 399 96M399 96Q368 76 356 102M399 96Q371 92 361 121M399 96Q389 65 370 68M399 96Q410 68 430 72M399 96Q432 85 447 110M399 96Q421 103 427 129"/></g><path d="M230 0V220" stroke="'+paper+'"/><g fill="'+paper+'" font-family="Arial,sans-serif" font-size="10" letter-spacing="3"><text x="164" y="24">EAST</text><text x="245" y="24" fill="'+navy+'">WEST</text></g></svg>';}
 window.THEME_EN={
   colors:{bg:paper,fg:navy,accent:brick,muted:'#65707A'},cardFont:sans,letters:['A','B','C','D'],
   qNo:function(i,n){gauge(stored());return 'STOP '+String(i+1).padStart(2,'0')+' / '+n;},
   decor:'<div class="coast-field coast-east"></div><div class="coast-field coast-west"></div><div class="coast-seam"></div>',
   homeTop:'<div class="coast-diptych">'+art('coast-home')+'</div>',homeBottom:'<div class="coast-colophon"><span>Atlantic pace</span><span>Pacific state of mind</span></div>',
   ornament:'<span class="coast-rule"></span>',loader:'<div class="coast-loader">'+art('coast-loading')+'</div>',
   gateArt:'<div class="pw-art coast-folio"><div class="coast-folio-art">'+art('coast-sealed')+'</div><span class="coast-folio-title">A tale of<br>two coasts.</span><span class="coast-band">PERSONAL REPORT / SEALED</span><i class="coast-seal">E / W</i></div>',
   onBuild:function(){document.getElementById('chips').replaceChildren();fitQuestionStage();var bar=document.querySelector('.q-bar');bar.insertAdjacentHTML('beforeend','<span class="coast-axis" aria-hidden="true"><span>East</span><span>West</span></span>');document.getElementById('stage').addEventListener('click',function(e){var b=e.target.closest('.opt');if(!b)return;var a=stored().slice();a[Number(document.getElementById('qIdx').textContent)-1]=Number(b.dataset.k);gauge(a);});},
   heroHTML:function(r,pct,L){return '<div class="r-hero"><div class="coast-result-head"><span>COAST TO COAST</span><span>'+esc(r.seal)+'</span></div><div class="r-kicker">'+esc(L.resultKicker)+'</div><h1 class="r-name">'+esc(r.name)+'</h1><div class="r-sub">'+esc(r.sub)+'</div><div class="coast-ratio"><div><small>East Coast</small><b data-east>—</b><em>%</em></div><div><small>West Coast</small><b data-west>—</b><em>%</em></div></div><p class="coast-ratio-note">Your answer-based blend. No ZIP code required.</p><div class="r-tag">'+esc(r.tag)+'</div><div class="r-quote">'+esc(r.quote)+'</div><div class="r-traits">'+r.traits.map(function(t){return '<span>'+esc(t)+'</span>';}).join('')+'</div><div class="r-pct">'+esc(L.pct)+'<b>'+pct+'%</b></div></div>';},
   onResult:function(cur,el){var east=coast(cur.z.map(function(z){return Math.round(100/(1+Math.exp(-z*.9)));}));el.querySelector('[data-east]').textContent=east;el.querySelector('[data-west]').textContent=100-east;},
   drawCard:function(c,d,h){
     var east=coast(d.dims);c.fillStyle=paper;c.fillRect(0,0,1080,1440);c.fillStyle=navy;c.fillRect(0,0,540,520);var g=c.createLinearGradient(540,0,540,520);g.addColorStop(0,gold);g.addColorStop(.48,pink);g.addColorStop(1,'#79749B');c.fillStyle=g;c.fillRect(540,0,540,520);
     c.strokeStyle='#C47761';c.lineWidth=2;[56,180,304,428].forEach(function(x,i){var y=300-i%2*48;c.strokeRect(x,y,91,220);for(var row=0;row<3;row++)for(var col=0;col<2;col++)c.strokeRect(x+14+col*37,y+20+row*55,22,32);});
     c.fillStyle='#F9DDB1';c.beginPath();c.arc(841,386,63,0,Math.PI*2);c.fill();c.strokeStyle='#EFC3C4';[454,478,502].forEach(function(y){c.beginPath();c.moveTo(540,y);c.bezierCurveTo(740,y-34,880,y+24,1080,y-15);c.stroke();});
     c.fillStyle=paper;c.fillRect(0,0,1080,92);c.textAlign='center';c.fillStyle=navy;wrapWords(c,h,d.quiz.title,540,62,930,27,sans,'normal',1);
     c.font=h.font(25,sans);c.fillStyle=paper;c.fillText('EAST COAST',270,145);c.fillStyle=navy;c.fillText('WEST COAST',810,145);
     c.fillStyle=paper;c.font=h.font(135,serif);c.fillText(east+'%',270,280);c.fillStyle=navy;c.fillText((100-east)+'%',810,280);
     c.fillStyle=navy;c.textAlign='left';c.font=h.font(22,sans);c.fillText('YOUR COASTAL ALTER EGO',85,580);
     wrapWords(c,h,d.r.name,80,672,920,82,serif,'normal',2);wrapWords(c,h,d.r.tag,84,837,910,29,sans,'normal',1);
     c.strokeStyle='#C6C5BF';c.beginPath();c.moveTo(84,878);c.lineTo(996,878);c.stroke();
     wrapWords(c,h,'“'+d.r.quote+'”',84,938,910,40,serif,'normal',2);
     d.r.traits.forEach(function(t,i){var x=84+(i%2)*465,y=1087+Math.floor(i/2)*55;c.fillStyle=i%2?brick:navy;c.fillRect(x,y-18,5,22);c.fillStyle=navy;wrapWords(c,h,t,x+20,y,405,27,sans,'normal',1);});
     c.strokeStyle='#C6C5BF';c.beginPath();c.moveTo(84,1198);c.lineTo(996,1198);c.stroke();c.font=h.font(25,sans);c.fillText('Archetype match '+d.pct+'%',84,1245);c.textAlign='right';c.fillText('An answer-based coast blend',996,1245);
     c.textAlign='center';wrapWords(c,h,d.labels.cardFooter,540,1340,920,27,serif,'normal',1);c.font=h.font(21,sans);c.fillStyle='#5B6570';c.fillText('No ZIP code required. Just for fun.',540,1385);h.noise(c,6000,'rgba(30,40,55,A)',41);
   },pickDelay:280,loadingMs:2000
 };
})();
