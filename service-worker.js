if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,l)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let o={};const u=e=>i(e,n),c={module:{uri:n},exports:o,require:u};s[n]=Promise.all(r.map((e=>c[e]||u(e)))).then((e=>(l(...e),o)))}}define(["./workbox-2d118ab0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"sim-rt"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/404.svg",revision:"e67fc2e818ba312ca04e09fd6635f3fa"},{url:"/css/app.3099e7a6.css",revision:null},{url:"/css/login.adb6ca88.css",revision:null},{url:"/css/tables.adb6ca88.css",revision:null},{url:"/favicon.png",revision:"4de12b2e06f6024a6257a005bc13b624"},{url:"/img/404.1b099266.svg",revision:null},{url:"/index.html",revision:"249321a4b48b7bf1b406db494f2eff05"},{url:"/js/674.51a595a7.js",revision:null},{url:"/js/app.58a96f88.js",revision:null},{url:"/js/chunk-vendors.ed643834.js",revision:null},{url:"/js/error.d0db17c3.js",revision:null},{url:"/js/login.de7fe922.js",revision:null},{url:"/js/profile.ec929fe6.js",revision:null},{url:"/js/tables.17e7b7dc.js",revision:null},{url:"/manifest.json",revision:"384c16ff7e0ac592cd9f75d0c10f63ea"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map