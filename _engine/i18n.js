/* SoulQuiz i18n loader —— 中文与英文是两套独立内容包（英文是本地化版本，不是翻译）
 * 语言来源优先级：URL ?lang=en|zh  >  localStorage.sq_lang  >  默认 zh
 * 测试页：<head> 里 SQI.head() 写入主题样式；<body> 里 SQI.body() 按语言写入数据/主题脚本与引擎 */
(function(){
  var lang='zh';
  try{var m=location.search.match(/[?&]lang=(en|zh)/);if(m){lang=m[1];localStorage.setItem('sq_lang',lang);}else{var s=localStorage.getItem('sq_lang');if(s==='en'||s==='zh')lang=s;}}catch(e){}
  var src='public';try{var sm=location.search.match(/[?&]src=(full|public)/);if(sm){src=sm[1];}else if(localStorage.getItem('sq_src')==='full')src='full';}catch(e){}
  window.SQ_SRC=src;
  window.SQ_LANG=lang;document.documentElement.setAttribute('lang',lang==='en'?'en':'zh-CN');document.documentElement.setAttribute('data-lang',lang);
  function w(h){document.write(h);}
  window.SQI={
    lang:lang,
    head:function(){w('<link rel="stylesheet" href="theme.css">');if(lang==='en')w('<link rel="stylesheet" href="theme.en.css">');},
    /* 数据来源：默认公开版 data.public.js / data.en.public.js（无结果文案）；
     * 开发预览完整版：?src=full 或 localStorage.sq_src="full"（只在本地文件夹有效，公开站不部署 data.js） */
    src:src,
    body:function(root){root=root||'..';
      var d=src==='full'?(lang==='en'?'data.en.js':'data.js'):(lang==='en'?'data.en.public.js':'data.public.js');
      w('<script src="'+d+'"><\/script><script src="theme.js"><\/script>'+(lang==='en'?'<script src="theme.en.js"><\/script>':''));
      w('<script src="'+root+'/_engine/catalog.js"><\/script>');
      if(src==='full')w('<script src="'+root+'/shared/paywall.js"><\/script>');
      else w('<script src="'+root+'/shared/pay-config.js"><\/script>');
      w('<script src="'+root+'/_engine/engine.js"><\/script>');},
    set:function(l){try{localStorage.setItem('sq_lang',l);}catch(e){}var u=location.href.replace(/([?&])lang=(en|zh)&?/,'$1').replace(/[?&]$/,'');location.href=u.split('#')[0];},
    t:function(zh,en){return lang==='en'?en:zh;}
  };
})();
