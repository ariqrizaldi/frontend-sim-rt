if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const u=e=>r(e,l),c={module:{uri:l},exports:o,require:u};s[l]=Promise.all(i.map((e=>c[e]||u(e)))).then((e=>(n(...e),o)))}}define(["./workbox-2d118ab0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"sim-rt"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/404.svg",revision:"e67fc2e818ba312ca04e09fd6635f3fa"},{url:"/css/app.609f2b2c.css",revision:null},{url:"/css/login.adb6ca88.css",revision:null},{url:"/css/tables.adb6ca88.css",revision:null},{url:"/data-sources/clients.json",revision:"9a7af76f25f07ad2608f4f262aa62fe4"},{url:"/data-sources/history.json",revision:"48a804b5f3bde4815d778fa21bb6e257"},{url:"/favicon.png",revision:"4de12b2e06f6024a6257a005bc13b624"},{url:"/img/404.1b099266.svg",revision:null},{url:"/index.html",revision:"b9ccb9853e790551202beae7f69d48c7"},{url:"/js/624.ca5314d6.js",revision:null},{url:"/js/app.25de00fd.js",revision:null},{url:"/js/chunk-vendors.c6786f06.js",revision:null},{url:"/js/error.54a16513.js",revision:null},{url:"/js/login.ee3653d4.js",revision:null},{url:"/js/profile.fb786d25.js",revision:null},{url:"/js/tables.2aa2b843.js",revision:null},{url:"/manifest.json",revision:"384c16ff7e0ac592cd9f75d0c10f63ea"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
