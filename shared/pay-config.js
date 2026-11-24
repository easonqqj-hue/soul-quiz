/* 付费后台地址（SoulPay，接口见 payment/PAYWALL_INTERFACE.md）。
 * 留空 = 公开静态站暂未接后台：不加载支付 SDK，解锁按钮只提示“支付功能即将开放”；页面里没有任何完整结果内容。
 * 本地演示 mock 后台：浏览器控制台执行 localStorage.sq_pay_api='http://localhost:3000/api' 后刷新。
 * 正式上线：把下面的 API 改成已备案域名下的后台地址，例如 'https://pay.example.com/api'。 */
(function(){
  var API='';
  var v='';try{v=localStorage.getItem('sq_pay_api')||'';}catch(e){}
  window.SQ_PAY_API=window.SQ_PAY_API||v||API;
  if(window.SQ_PAY_API){var s=document.currentScript,src=(s&&s.src||'').replace(/pay-config\.js(\?.*)?$/,'soulpay.js');
    document.write('<script src="'+src+'" data-api="'+String(window.SQ_PAY_API).replace(/"/g,'')+'"><\/script>');}
})();
