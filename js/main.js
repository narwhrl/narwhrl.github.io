(()=>{var v={q:i=>document.querySelector(i),qa:i=>document.querySelectorAll(i),gId:i=>document.getElementById(i),debounce(i,e,n){let t;return function(){let o=this,s=arguments;clearTimeout(t),t=setTimeout(function(){t=null,n||i.apply(o,s)},e),n&&!t&&i.apply(o,s)}},wrap(i,e,n={}){if(typeof e=="string"){e=document.createElement(e);for(let[t,o]of Object.entries(n))e.setAttribute(t,o)}i.parentNode.insertBefore(e,i),e.appendChild(i)},urlFor(i){return/^(#|\/\/|http(s)?:)/.test(i)?i:(window.ASYNC_CONFIG.root+i).replace(/\/{2,}/g,"/")},siblings:(i,e)=>[...i.parentNode.children].filter(n=>e?n!==i&&n.matches(e):n!==i),_message:[],message(i,e="success"){let n=document.createElement("div");n.className=`trm-message ${e}`,n.style.top=`${30+v._message.length*60}px`,n.innerText=i,document.body.append(n),v._message.push(n),setTimeout(()=>{v._message=v._message.filter(t=>t!==n),document.body.removeChild(n),v._message.forEach((t,o)=>{t.style.top=`${30+o*60}px`})},2e3)},loadScript(i,e){return new Promise((n,t)=>{if(e)n();else{let o=document.createElement("script");o.src=i,o.setAttribute("async","false"),o.onerror=t,o.onload=()=>n(),document.head.appendChild(o)}})},runScriptBlock(i){let e=i.text||i.textContent||i.innerHTML||"",n=document.head||document.querySelector("head")||document.documentElement,t=document.createElement("script");if(e.match("document.write"))return console&&console.log&&console.log("Script contains document.write. Can\u2019t be executed correctly. Code skipped "),!1;try{t.appendChild(document.createTextNode(e))}catch{t.text=e}n.appendChild(t),n.contains(t)&&n.removeChild(t)},icons(i,e="font"){return e==="symbol"?`<svg class="symbol-icon " aria-hidden="true"><use xlink:href="#${i}"></use></svg>`:`<i class="iconfont ${i}"></i>`},diffDate:(i,e=!1)=>{let n=new Date,t=new Date(i),o=n.getTime()-t.getTime(),s=1e3*60,r=s*60,a=r*24,f=a*30,u;if(e){let g=o/f,l=o/a,d=o/r,h=o/s;g>12?u=t.toISOString().slice(0,10):g>=1?u=parseInt(g.toString())+" "+window.ASYNC_CONFIG.date_suffix.month:l>=1?u=parseInt(l.toString())+" "+window.ASYNC_CONFIG.date_suffix.day:d>=1?u=parseInt(d.toString())+" "+window.ASYNC_CONFIG.date_suffix.hour:h>=1?u=parseInt(h.toString())+" "+window.ASYNC_CONFIG.date_suffix.min:u=window.ASYNC_CONFIG.date_suffix.just}else u=parseInt((o/a).toString());return u}},c=v;var x=class{constructor(e){this.name="HeadPlugin";this.isSwupPlugin=!0;this.defaultOptions={persistTags:!1,persistAssets:!1,specialTags:!1};this.getHeadAndReplace=()=>{let e=this.getHeadChildren(),n=this.getNextHeadChildren();this.replaceTags(e,n)};this.getHeadChildren=()=>document.head.children;this.getNextHeadChildren=()=>{let e=this.swup.cache.getCurrentPage().originalContent.replace("<head",'<div id="swupHead"').replace("</head>","</div>"),n=document.createElement("div");n.innerHTML=e;let t=n.querySelector("#swupHead").children;return n.innerHTML="",n=null,t};this.replaceTags=(e,n)=>{let t=document.head,o=Boolean(document.querySelector("[data-swup-theme]")),s=this.getTagsToAdd(e,n,o),r=this.getTagsToRemove(e,n);r.reverse().forEach(a=>{t.removeChild(a.tag)}),s.forEach(a=>{t.insertBefore(a.tag,t.children[a.index+1]||null)}),this.swup.log(`Removed ${r.length} / added ${s.length} tags in head`)};this.compareTags=(e,n)=>{let t=e.outerHTML,o=n.outerHTML;return t===o};this.getTagsToRemove=(e,n)=>{let t=[];for(let o=0;o<e.length;o++){let s=null;for(let r=0;r<n.length;r++)if(this.compareTags(e[o],n[r])){s=r;break}s==null&&e[o].getAttribute("data-async-theme")===null&&!this.isMatchesTag(e[o],this.options.persistTags)&&t.push({tag:e[o]})}return t};this.getTagsToAdd=(e,n,t)=>{let o=[];for(let s=0;s<n.length;s++){let r=null;for(let a=0;a<e.length;a++)if(this.compareTags(e[a],n[s])){r=a;break}r==null&&!this.isMatchesTag(n[s],this.options.specialTags)&&o.push({index:t?s+1:s,tag:n[s]})}return o};this.isMatchesTag=(e,n=this.options.persistTags)=>typeof n=="function"?n(e):typeof n=="string"?e.matches(n):Boolean(n);this.updateHtmlLangAttribute=()=>{let e=document.documentElement,t=new DOMParser().parseFromString(this.swup.cache.getCurrentPage().originalContent,"text/html").documentElement.lang;e.lang!==t&&(this.swup.log(`Updated lang attribute: ${e.lang} > ${t}`),e.lang=t)};this.options={...this.defaultOptions,...e},this.options.persistAssets&&!this.options.persistTags&&(this.options.persistTags="link[rel=stylesheet], script[src], style")}mount(){this.swup.on("contentReplaced",this.getHeadAndReplace),this.swup.on("contentReplaced",this.updateHtmlLangAttribute)}unmount(){this.swup.off("contentReplaced",this.getHeadAndReplace),this.swup.off("contentReplaced",this.updateHtmlLangAttribute)}},S=x;var $=i=>Array.prototype.slice.call(i),C=class{constructor(e={}){this.name="ScriptPlugin";this.isSwupPlugin=!0;this.defaultOptions={selectors:"script[data-swup-reload-script]"};this.getScriptAndInsert=()=>{let e=this.getNextScriptChildren();e.length&&(async t=>{let o=Array.from(document.scripts);for(let s=0;s<t.length;s++){let r=t[s];r.src?o.findIndex(a=>a.src===r.src&&!a.dataset.reset)<0&&await this.loadScript(r):c.runScriptBlock(r)}})(e)};this.options={...this.defaultOptions,...e}}mount(){this.swup.on("contentReplaced",this.getScriptAndInsert)}unmount(){this.swup.off("contentReplaced",this.getScriptAndInsert)}loadScript(e){return new Promise((n,t)=>{let o=document.createElement("script");for(let{name:s,value:r}of $(e.attributes))o.setAttribute(s,r);o.textContent=e.textContent,o.setAttribute("async","false"),o.onload=()=>{n(),document.body.contains(o)&&document.body.removeChild(o)},o.onerror=t,document.body.appendChild(o)})}getNextScriptChildren(){let e=this.swup.cache.getCurrentPage().originalContent.replace("<body",'<div id="swupBody"').replace("</body>","</div>"),n=document.createElement("div");n.innerHTML=e;let t=n.querySelector("#swupBody").querySelectorAll(this.options.selectors);return n.innerHTML="",n=null,t}},E=C;function N(){window.Fancybox&&(window.Fancybox.bind("[data-fancybox]"),window.Fancybox.bind('[data-fancybox="light"],[data-fancybox="article"]',{groupAll:!0}),window.Fancybox.bind('[data-fancybox="dark"],[data-fancybox="article"]',{groupAll:!0}),window.Fancybox.defaults.Hash=!1)}function T(){if(window.Swiper)var i=new window.Swiper(".trm-slideshow",{slidesPerView:1,effect:"fade",parallax:!0,autoplay:!0,speed:1400})}function _(){window.Fancybox&&c.qa("#article-container img:not(.no-fancybox)").forEach(i=>{if(!i.parentNode.dataset.fancybox){let e="article";i.classList.contains("trm-light-icon")?e="light":i.classList.contains("trm-dark-icon")&&(e="dark"),c.wrap(i,"div",{"data-src":i.dataset.src||i.src,"data-fancybox":e})}})}function P(){let i=[];i.push(new S({specialTags:"#trm-switch-style"})),i.push(new E);let e={containers:["#trm-dynamic-content"],animateHistoryBrowsing:!0,linkSelector:".trm-menu a:not([data-no-swup]), .trm-anima-link:not([data-no-swup])",animationSelector:'[class="trm-swup-animation"]',plugins:i};return new window.Swup(e)}function A(i=!1){let e=c.q("#trm-swich");if(!e)return;let n=c.q("#trm-scroll-container"),t=c.q(".trm-mode-swich-animation"),o=c.q(".trm-mode-swich-animation-frame"),s=function(){let r=getComputedStyle(document.documentElement).getPropertyValue("--theme-bg-color"),a=c.q('meta[name="theme-color"]');r&&a&&(a.content=r)};if(i){let r=(localStorage.getItem("theme-mode")||window.ASYNC_CONFIG.theme.default)=="style-dark";e.checked=r,r?(t.classList.add("trm-active"),o.classList.remove("trm-active")):(t.classList.remove("trm-active"),o.classList.remove("trm-active")),s()}e.addEventListener("change",function(){new Promise(r=>{o.classList.add("trm-active"),n.style.opacity=0,setTimeout(()=>r(),600)}).then(()=>{setTimeout(()=>{let r=this.checked?"add":"remove";t.classList[r]("trm-active"),document.documentElement.classList[r]("dark"),typeof window.changeGiscusTheme=="function"&&window.changeGiscusTheme()},200),setTimeout(function(){o.classList.remove("trm-active"),n.style.opacity=1,s()},600)}),localStorage.setItem("theme-mode",this.checked?"style-dark":"style-light")})}function I(){let i=c.q("#trm-scroll-container"),e=c.q("#trm-back-top"),n=c.q(".trm-fixed-container"),t=new window.LocomotiveScroll({el:c.q("#trm-scroll-container"),smooth:!0,lerp:.1,reloadOnContextChange:!0,class:"trm-active-el"}),o=c.debounce(()=>t.update(),150),s=new ResizeObserver(()=>{t.update()});s.observe(i),window.addEventListener("resize",o),t.on("scroll",({scroll:g})=>{g.y>500?(e.classList.add("active-el"),n.classList.add("offset")):(e.classList.remove("active-el"),n.classList.remove("offset"))});let r=function(){t.scrollTo(0)};e.addEventListener("click",r);let a=window.matchMedia("screen and (min-width: 768px)"),f=window.matchMedia("screen and (max-width: 767px)"),u=function(g){g.matches&&location.reload()};return a.addListener(u),f.addListener(u),document.addEventListener("swup:contentReplaced",g=>{e.removeEventListener("click",r),window.removeEventListener("resize",o),s.unobserve(i),a.removeListener(u),f.removeListener(u),t.destroy()}),t}function H(){c.q(".trm-menu-btn").addEventListener("click",function(){c.q(".trm-menu-btn,.trm-right-side").classList.toggle("trm-active")}),c.q(".trm-menu ul li a").addEventListener("click",function(){c.q(".trm-menu-btn,.trm-right-side").classList.remove("trm-active")})}function q(i=2e3){let e=(n,t,o,s)=>{o+=t,o>=s?n.innerText=s.toString():(n.innerText=parseInt(o.toString()).toString(),requestAnimationFrame(()=>e(n,t,o,s)))};c.qa(".trm-counter").forEach(n=>{let t=Number(n.innerText);if(!isNaN(t)){let o=t/(i/16);e(n,o,0,t)}})}function O(){let i=document.getElementById("trm-tabs-nav");i&&(i.addEventListener("click",function(n){var t=n.target;let o=t.dataset.to||t.parentElement.dataset.to,s=t.classList.contains("active")||t.parentElement.classList.contains("active");o&&!s&&(document.querySelectorAll(".trm-tabs-nav-item").forEach(r=>{r.classList.toggle("active")}),document.querySelectorAll(".trm-tabs-item").forEach(r=>{r.classList.toggle("active")}))}),(()=>{let n=c.q(".post-toc"),t=Array.from(n.querySelectorAll("a.toc-link"));if(!t.length)return;let o=t.map(l=>c.gId(decodeURI(l.getAttribute("href").replace("#","")))),s=document.querySelector(".trm-app-frame");if(!s)return;let r=document.querySelector(".trm-top-bar"),{bottom:a}=r.getBoundingClientRect();function f(l){if(l=l.parentNode,l.classList.contains("active-current"))return;c.qa(".post-toc .active").forEach(h=>{h.classList.remove("active","active-current")}),l.classList.add("active","active-current");let d=l.parentNode;for(;!d.matches(".post-toc");)d.matches("li")&&d.classList.add("active"),d=d.parentNode}function u(l){let d=0,h=l[d];if(h.intersectionRatio<=0)return d=o.indexOf(h.target),d===0?0:d-1;for(;d<l.length;d++)if(l[d].intersectionRatio>0)h=l[d];else return o.indexOf(h.target);return o.indexOf(h.target)}function g(l){l=Math.floor(l+1e4);let d=new IntersectionObserver((h,p)=>{let w=document.documentElement.scrollHeight+100;if(w>l){p.disconnect(),g(w);return}let y=u(h);f(t[y])},{root:s,rootMargin:`${l}px 0px -${s.clientHeight-a-20}px 0px`,threshold:[0,1]});o.forEach(h=>{h&&d.observe(h)})}g(document.documentElement.scrollHeight)})())}function Y(){if(window.ASYNC_CONFIG.creative_commons){let{author:i,i18n:e,creative_commons:n}=window.ASYNC_CONFIG,t=function(o){let s=o.clipboardData||window.clipboardData;if(!s)return;let r=window.getSelection().toString();if(r){o.preventDefault();let a=document.getElementById("post-author");a&&(i=a.innerText.replace(`
`,""));let f=location.href,u=document.getElementById("original-link");u&&(f=u.innerText.replace(`
`,""));let g=`

${e.author}${i}
${e.copyright_link}${f}
${e.copyright_license_title}${e.copyright_license_content.replace("undefined","CC"+n.license.toUpperCase()+" "+(n.license=="zero"?"1.0":"4.0"))}`;s.setData("text/plain",r+g)}};document.addEventListener("copy",t)}}function k(){let{i18n:i,highlight:e,icons:n,icontype:t}=window.ASYNC_CONFIG,o=e.copy,s=e.lang,r=e.height_limit,a=o||s,f=e.plugin==="prismjs",u=e.title==="mac",g=f?'pre[class*="language-"]':"figure.highlight",l=c.qa(g);if(!(a||r||l.length))return;let d=function(){try{let p=this.parentNode.parentNode,w=p.querySelector(".code");if(w||(w=p.querySelector("table")),w||(w=p.querySelector("code")),!w)return;navigator.clipboard.writeText(w.innerText),c.message(i.copy_success)}catch{c.message(i.copy_failure,"warning")}},h=function(){this.classList.toggle("expand-done")};c.qa(g).forEach(p=>{let w=document.createDocumentFragment(),y=document.createElement("div");if(y.className=`code-tools ${a&&u?"mac-style":"default-style"}`,s){let m="";f?m=p.getAttribute("data-language")?p.getAttribute("data-language"):"Code":(m=p.getAttribute("class").split(" ")[1],(m==="plain"||m===void 0)&&(m="Code"));let b=document.createElement("span");b.className="code-lang",b.innerText=m,y.append(b)}if(o){let m=document.createElement("span");m.className="copy-button",m.innerHTML=c.icons(n.copy,t),m.addEventListener("click",d),y.append(m)}if(r&&p.offsetHeight>e.height_limit+50){let m=document.createElement("div");m.innerHTML=c.icons(n.double_arrows,t),m.className="code-expand-btn",m.addEventListener("click",h),w.append(m)}if(w.append(y),f){c.wrap(p,"figure",{class:"highlight"}),p.parentNode.insertBefore(w,p);let m=p.querySelector(".caption,caption");m&&p.parentNode.appendChild(m)}else p.insertBefore(w,p.querySelector("table"))})}function F(){c.qa(".trm-tabs .trm-tab > button").forEach(function(i){i.addEventListener("click",function(e){let n=this,t=n.parentNode;if(!t.classList.contains("active")){let o=t.parentNode.nextElementSibling,s=c.siblings(t,".active")[0];s&&s.classList.remove("active"),t.classList.add("active");let r=n.getAttribute("data-href").replace("#","");[...o.children].forEach(f=>{f.id===r?f.classList.add("active"):f.classList.remove("active")})}})})}function M(){let i=c.qa(".fj-gallery");i.length&&(i.forEach(e=>{e.querySelectorAll("img").forEach(t=>{t.loading="eager",c.wrap(t,"div",{class:"fj-gallery-item","data-src":t.dataset.src||t.src,"data-fancybox":"gallery"})})}),c.loadScript(window.ASYNC_CONFIG.plugin.flickr_justified_gallery,window.fjGallery).then(()=>{i.forEach(e=>{window.fjGallery(e,{itemSelector:".fj-gallery-item",rowHeight:220,gutter:4,onJustify:function(){this.$container.style.opacity="1"}})})}))}function R(){let i=document.body;i.classList.add("trm-read-mode");let e=document.createElement("button");e.type="button",e.title=window.ASYNC_CONFIG.i18n.exit_read_mode,e.className="trm-exit-readmode trm-glow",e.innerHTML=c.icons(window.ASYNC_CONFIG.icons.close,window.ASYNC_CONFIG.icontype),i.appendChild(e);function n(){i.classList.remove("trm-read-mode"),e.remove(),e.removeEventListener("click",n)}e.addEventListener("click",n)}function B(){if(window.ASYNC_CONFIG&&window.ASYNC_CONFIG.favicon.visibilitychange){window.originTitle=document.title;let i,e=Array.from(c.qa('[rel="icon"]')),n=e.map(t=>t.href);document.addEventListener("visibilitychange",function(){document.hidden?(e.forEach(t=>{t.href=c.urlFor(window.ASYNC_CONFIG.favicon.hidden)}),document.title=window.ASYNC_CONFIG.favicon.hideText,clearTimeout(i)):(e.forEach((t,o)=>{t.href=n[o]}),document.title=window.ASYNC_CONFIG.favicon.showText+window.originTitle,i=setTimeout(function(){document.title=window.originTitle},2e3))})}}function G(){let{notice_outdate:i,i18n:e}=window.ASYNC_CONFIG;if(i){let n=c.diffDate(window.PAGE_CONFIG.postUpdate);if(n>=i.limit_day){let t=document.createElement("div");t.className=`post-outdate-notice ${i.position}`,t.textContent=e.notice_outdate_message.replace("undefined",n.toString());let o=document.getElementById("article-container");i.position==="top"?o.insertBefore(t,o.firstChild):o.appendChild(t)}}}function D(){let i=e=>console.log(e,"color: white; background: #0078E7; padding:5px 0;margin: 0 0 2px 0;border-radius: 4px 0 0 4px;","padding: 4px;border:1px solid #0078E7;border-radius: 0 4px 4px 0; background: linear-gradient(70deg, #e3f9eb, #d1dbff);");i(`%c \u{1F680} Hexo-Theme-Async ${window.ASYNC_CONFIG.theme_version=="0.0.0"?"Github":window.ASYNC_CONFIG.theme_version} %c https://github.com/MaLuns/hexo-theme-async `),i("%c \u{1F4D1} Hexo-Theme-Async Docs %c https://hexo-theme-async.imalun.com ")}function j(){c.q("html").classList.add("is-animating"),c.q(".trm-scroll-container").style.opacity=0,setTimeout(function(){c.q("html").classList.remove("is-animating"),c.q(".trm-scroll-container").style.opacity=1},600)}function L(){window.switchReadMode=R,D(),j(),B(),window.PAGE_CONFIG.isPost&&G(),M(),_(),k(),F(),window.ASYNC_CONFIG.swup&&P(),H(),A(!0),q(),I(),T(),N(),O(),Y(),window.ASYNC_CONFIG.swup&&document.addEventListener("swup:contentReplaced",function(){let i=c.gId("async-page-config");i&&c.runScriptBlock(i),window.PAGE_CONFIG.isPost&&G(),document.body.classList.remove("trm-read-mode"),window.show_date_time&&window.show_date_time(),M(),_(),k(),F(),c.q(".trm-scroll-container").style.opacity=1,H(),A(!0),q(),I(),T(),N(),O()})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",L):L();})();
