/* English gallery treatment. All artwork is original, inline and offline. */
(function(){
  'use strict';
  var en=window.SQ_LANG==='en',button=document.getElementById('langBtn');
  button.innerHTML='<span class="ls-cur">'+(en?'EN':'中')+'</span><span class="ls-sep">/</span><span class="ls-alt">'+(en?'中':'EN')+'</span>';
  button.setAttribute('aria-label',en?'切换到中文':'Switch to English');
  button.addEventListener('click',function(){window.SQI.set(en?'zh':'en');});
  if(!en)return;
  function text(selector,value){document.querySelector(selector).textContent=value;}
  document.title='SOUL QUIZ ATELIER — A different way to see yourself';
  document.querySelector('meta[name="description"]').content='33 personality quizzes, each with a world of its own. Find your city, your historical soul twin, and a few surprises. Just for fun.';
  text('.skip-link','Skip to quizzes');
  document.querySelector('.brand').setAttribute('aria-label','Soul Quiz Atelier home');
  text('.brand small','A collection of possible yous');
  text('.masthead-note','Come in. Get curious.');
  text('#site-title','SOUL QUIZ ATELIER');
  text('.intro-copy>p','See your everyday self in a new light.');
  document.querySelector('.intro-meta').innerHTML='<span><b id="test-count">33</b> quizzes</span><span>6 collections</span><span>Curiosity looks good on you</span>';
  document.getElementById('random-quiz').lastChild.textContent='Surprise me';
  text('.intro-aside>span','Let chance choose this one.');
  document.querySelector('.section-nav').setAttribute('aria-label','Quiz collections');
  text('.footer b','SOUL QUIZ ATELIER');
  text('.footer span','Enjoy the result. Keep the final say on who you are.');
  text('.footer p','Just for fun. Results reflect your answers; they are not a psychological assessment or a scientific claim.');
  text('.footer>a','Back to the top');
  var descriptions={city:'A city that feels a little like you.',gufeng:'Old worlds. A fresh read on you.',love:'A closer look at how you connect.',persona:'Meet the parts of you hiding in plain sight.',fun:'Take a detour from your usual feed.',niche:'Your people. Your peculiar little corner.'};
  var themes={
    'nanbei-renge':['#E7DECD','#192F49','#A15943',12,'coasts'],
    'lishi-renwu':['#F0F1ED','#203F39','#9B7940',16,'museum',36],
    'gudai-shenfen':['#E8DCBA','#233F71','#A43C30',14,'manuscript'],
    'xianxia-juese':['#102F35','#D8E7E4','#A8BDC7',14,'moonwood'],
    'gudai-tianfu':['#E8D8B8','#634831','#9E4535',14,'workshop'],
    'gudai-juben':['#59252D','#F0E6CF','#BD9C5E','12–14','novel'],
    'xianxia-menpai':['#EDE3CA','#243F4D','#A84938',12,'heraldry']
  };
  // All retained motifs receive English lettering, including text inside SVGs.
  var lettering={'远 方 来 信':'AIR MAIL','DEPARTURES / 心动待降落':'DEPARTURES / DESTINY','气质之城':'CITY ENERGY','心 动':'PULL','心动使用说明':'DATING NOTES','恋爱解药':'LOVE Rx','先读懂，再靠近':'READ BEFORE USE','这一次，你是主角。':'YOUR SCENE STARTS HERE','天赋 · 待发掘':'HIDDEN TALENT','性格底色':'TRUE COLOR','找到你的赛道':'FIND YOUR LANE','梦 的 另 一 面':'AFTER HOURS','一瞬间的你':'A LITTLE LIKE YOU','生活的拍子':'YOUR TEMPO','QUEST / 主线已刷新':'QUEST / NEW CHAPTER','找到你的主线任务':'FIND YOUR MAIN QUEST','大学生活观察簿':'CAMPUS NOTES','今日待办':'TO DO','认识自己':'MEET YOU','工位':'WORK','居民':'LIFE','今日开张':'NOW OPEN','从一个想法开始':'START WITH AN IDEA','铲屎官资格证':'PET PARENT LICENSE','VISA / 下一站见':'VISA / NEXT STOP','准予出发':'LET’S GO'};
  function localize(svg){return svg.replace(/(<text\b[^>]*>)([^<]*)(<\/text>)/g,function(all,a,t,b){var s=lettering[t];if(!s)return all;var size=+(a.match(/font-size="([\d.]+)"/)||[])[1];if(size&&s.length>t.length)a=a.replace(/font-size="[\d.]+"/,'font-size="'+Math.max(7,Math.min(size,size*t.length/s.length*1.5)).toFixed(1)+'"');return a+s+b;});}
  function art(kind,uid){
    var s='',gold='#B39352',leaf='<path d="M-54 30Q-82-4-47-49M54 30Q82-4 47-49"/><g fill="'+gold+'" stroke="none">';
    for(var i=0;i<5;i++)leaf+='<ellipse cx="'+(-58-i*2+i*i*.7)+'" cy="'+(18-i*13)+'" rx="5" ry="10" transform="rotate(-40 '+(-58-i*2+i*i*.7)+' '+(18-i*13)+')"/><ellipse cx="'+(58+i*2-i*i*.7)+'" cy="'+(18-i*13)+'" rx="5" ry="10" transform="rotate(40 '+(58+i*2-i*i*.7)+' '+(18-i*13)+')"/>';
    leaf+='</g>';
    if(kind==='coasts')s='<defs><linearGradient id="'+uid+'-sun" x2="0" y2="1"><stop stop-color="#EEAA6F"/><stop offset=".5" stop-color="#CF8E9D"/><stop offset="1" stop-color="#71678C"/></linearGradient></defs><path fill="#192F49" d="M0 0h160v220H0z"/><path fill="url(#'+uid+'-sun)" d="M160 0h160v220H160z"/><g fill="#9B5545" stroke="#D7AF91"><path d="M20 191V71h48v120m13 0V51h49v140"/><path fill="#192F49" d="M31 86h13v20H31zm0 35h13v20H31zm61-53h14v20H92zm0 38h14v20H92z"/></g><path d="m139 42-8 9 1 8-10-4 2 11-10 4 13 4 6 11 4-13 12-7-12-1Z" fill="#BB854F"/><circle cx="239" cy="91" r="27" fill="#F4C6A3"/><g stroke="#213D43" fill="none" stroke-width="2"><path d="M275 189q-12-52-9-84m0 0q-23-25-39-9m39 9q15-30 32-14m-32 14q23-13 39 7m-39-7q-16-7-25 17"/><path d="M165 175q53-26 100-7t55-4"/></g><g fill="#FFF6E5" font-family="Georgia,serif" font-size="15" text-anchor="middle"><text x="80" y="28">EAST</text><text x="240" y="28">WEST</text></g>';
    if(kind==='museum')s='<path d="M0 49q80 42 142 0t178 21M18 220Q81 128 184 139t136-51" stroke="#CED3CF" fill="none"/><rect x="55" y="19" width="210" height="145" fill="#203F39" stroke="'+gold+'" stroke-width="9"/><rect x="65" y="29" width="190" height="125" fill="none" stroke="'+gold+'"/><g transform="translate(160 98)" stroke="'+gold+'" fill="none">'+leaf+'</g><path d="M151 57q24-4 24 20l-6 8v12q19 7 21 29h-59q2-23 20-29l-5-16q-8-17 5-24Z" fill="#E2E4DC"/><path d="M147 102l10 22m5-23 9 23" stroke="#A6B4AD"/><rect x="103" y="180" width="114" height="25" fill="#FAFAF5" stroke="#C4C4B7"/><text x="160" y="197" text-anchor="middle" font-size="10" fill="#203F39" font-family="Georgia,serif">A soul, on display.</text>';
    if(kind==='manuscript')s='<rect x="36" y="15" width="248" height="190" fill="#F4E9CA" stroke="#B39352"/><rect x="51" y="29" width="218" height="162" fill="none" stroke="#233F71"/><g stroke="#758256" fill="none"><path d="M44 183q32-28 0-55t0-54 0-51M277 30q-32 28 0 55t0 54 0 51"/></g><g fill="#B39352"><path d="m44 42 6 9-6 9-6-9Zm233 109 6 9-6 9-6-9Z"/></g><rect x="70" y="49" width="64" height="76" fill="#233F71" stroke="#B39352" stroke-width="3"/><text x="103" y="107" font-size="59" font-family="Georgia,serif" text-anchor="middle" fill="#E7C86D">M</text><g stroke="#70593D"><path d="M148 55h99m-99 13h88m-88 13h99m-99 13h90m-90 13h99M71 141h176m-176 13h176m-176 13h140"/></g><text x="159" y="187" font-size="9" font-family="Georgia,serif" fill="#A43C30" text-anchor="middle">A LIFE IN THE MARGINS</text>';
    if(kind==='moonwood')s='<g stroke="#486669" fill="none"><path d="M25 220V0m-2 95L0 59m25 87 33-57M288 220V0m0 68-35-42m35 91 32-45M65 220V0m190 220V0"/></g><circle cx="160" cy="91" r="58" fill="none" stroke="#829FAD"/><circle cx="160" cy="91" r="49" fill="none" stroke="#829FAD" stroke-dasharray="2 9"/><path d="M176 52a30 30 0 1 0 10 51 31 31 0 0 1-10-51" fill="#D8E7E4"/><path d="m83 165 41-28 35 31 34-34 47 27" fill="none" stroke="#A8BDC7"/><g fill="#E8EFED"><circle cx="83" cy="165" r="3"/><circle cx="124" cy="137" r="3"/><circle cx="159" cy="168" r="3"/><circle cx="193" cy="134" r="3"/><circle cx="240" cy="161" r="3"/></g><text x="160" y="205" font-size="10" fill="#D8E7E4" text-anchor="middle" font-family="Georgia,serif">Under a different sky</text>';
    if(kind==='workshop')s='<g fill="none" stroke="#BDAA86" stroke-width=".5"><path d="M0 44h320M0 88h320M0 132h320M0 176h320M53 0v220M106 0v220M159 0v220M212 0v220M265 0v220"/></g><g fill="none" stroke="#634831"><circle cx="149" cy="109" r="66"/><circle cx="149" cy="109" r="48"/><path d="M69 109h160M149 29v160M123 47l49 131M175 47l-49 131m7-37 31 0M89 88l20 21-20 21M209 88l-20 21 20 21"/><path d="M38 30h35m-17-7v14M230 46h59m-59 9h38M232 143h53m-53 9h41"/></g><text x="27" y="200" font-size="13" font-style="italic" font-family="Georgia,serif" fill="#634831">Measure. Make. Begin again.</text><circle cx="268" cy="178" r="17" fill="#9E4535"/><path d="m268 167 7 11-7 11-7-11Z" fill="none" stroke="#E9C39C"/>';
    if(kind==='novel')s='<rect x="53" y="15" width="214" height="192" fill="#431922"/><rect x="69" y="16" width="189" height="185" rx="3" fill="#702E38" stroke="#BD9C5E"/><path d="M80 29h166v159H80zM59 38h10m-10 23h10m-10 99h10m-10 24h10" fill="none" stroke="#BD9C5E"/><g stroke="#BD9C5E" fill="none"><path d="m163 46 13 13-13 13-13-13Zm-44 107h88m-44 25 13 13-13 13-13-13Z"/></g><g font-family="Georgia,serif" text-anchor="middle" fill="#F0E6CF"><text x="163" y="97" font-size="24">Your Life</text><text x="163" y="129" font-size="15">Chapter I</text><text x="163" y="169" font-size="9">THE STORY IS YOURS</text></g><path d="M55 207h210" stroke="#DDCDB0" stroke-width="5"/>';
    if(kind==='heraldry')s='<path d="M49 13h49v122l-24-18-25 18Z" fill="#A84938"/><path d="M222 13h49v122l-24-18-25 18Z" fill="#243F4D"/><path d="M69 150h183v51H69z" fill="#FAF0D7" stroke="#A9956F"/><path d="M160 24q31 18 60 11v55q0 45-60 68-60-23-60-68V35q29 7 60-11Z" fill="#243F4D" stroke="#B39352" stroke-width="3"/><path d="m160 48 11 28 29 11-29 11-11 29-11-29-29-11 29-11Z" fill="none" stroke="#D6BE82" stroke-width="2"/><path d="M88 166h102m-102 11h81" stroke="#8F7A58"/><path d="m219 181-8 31 13-8 12 7-7-30" fill="#A84938"/><circle cx="224" cy="180" r="18" fill="#A84938"/><circle cx="224" cy="180" r="12" fill="none" stroke="#D5A577"/>';
    return s?'<svg class="card-art" viewBox="0 0 320 220" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">'+s+'</svg>':'';
  }
  window.HUB_EN={themes:themes,descriptions:descriptions,art:art,localize:localize};
})();
