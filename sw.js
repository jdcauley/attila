!function(e){var t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s(s.s=7)}([function(e,t,s){"use strict";try{self["workbox:core:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:routing:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:background-sync:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:cacheable-response:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:google-analytics:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";s.r(t);s(0);const n=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class r extends Error{constructor(e,t){super(n(e,t)),this.name=e,this.details=t}}const a=new Set;const i={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},o=e=>[i.prefix,e,i.suffix].filter(e=>e&&e.length>0).join("-"),c=e=>{(e=>{for(const t of Object.keys(i))e(t)})(t=>{"string"==typeof e[t]&&(i[t]=e[t])})},u=e=>e||o(i.googleAnalytics),h=e=>e||o(i.precache),l=()=>i.prefix,d=e=>e||o(i.runtime),f=()=>i.suffix;const p=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),""),g=(e,t)=>e.filter(e=>t in e),w=async({request:e,mode:t,plugins:s=[]})=>{const n=g(s,"cacheKeyWillBeUsed");let r=e;for(const e of n)r=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},y=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:r=[]})=>{const a=await self.caches.open(e),i=await w({plugins:r,request:t,mode:"read"});let o=await a.match(i,n);for(const t of r)if("cachedResponseWillBeUsed"in t){const r=t.cachedResponseWillBeUsed;o=await r.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:o,request:i})}return o},m=async({cacheName:e,request:t,response:s,event:n,plugins:i=[],matchOptions:o})=>{const c=await w({plugins:i,request:t,mode:"write"});if(!s)throw new r("cache-put-with-no-response",{url:p(c.url)});const u=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let r=t,a=!1;for(const t of n)if("cacheWillUpdate"in t){a=!0;const n=t.cacheWillUpdate;if(r=await n.call(t,{request:e,response:r,event:s}),!r)break}return a||(r=r&&200===r.status?r:void 0),r||null})({event:n,plugins:i,response:s,request:c});if(!u)return void 0;const h=await self.caches.open(e),l=g(i,"cacheDidUpdate"),d=l.length>0?await y({cacheName:e,matchOptions:o,request:c}):null;try{await h.put(c,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of a)await e()}(),e}for(const t of l)await t.cacheDidUpdate.call(t,{cacheName:e,event:n,oldResponse:d,newResponse:u,request:c})},_=y;let q;class v{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:r,includeKeys:a=!1}={}){return await this.transaction([e],"readonly",(i,o)=>{const c=i.objectStore(e),u=t?c.index(t):c,h=[],l=u.openCursor(s,n);l.onsuccess=()=>{const e=l.result;e?(h.push(a?e:e.value),r&&h.length>=r?o(h):e.continue()):o(h)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,r)=>{const a=this._db.transaction(e,t);a.onabort=()=>r(a.error),a.oncomplete=()=>n(),s(a,e=>n(e))})}async _call(e,t,s,...n){return await this.transaction([t],s,(s,r)=>{const a=s.objectStore(t),i=a[e].apply(a,n);i.onsuccess=()=>r(i.result)})}close(){this._db&&(this._db.close(),this._db=null)}}v.prototype.OPEN_TIMEOUT=2e3;const R={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(R))for(const s of t)s in IDBObjectStore.prototype&&(v.prototype[s]=async function(t,...n){return await this._call(s,t,e,...n)});const b=async({request:e,fetchOptions:t,event:s,plugins:n=[]})=>{if("string"==typeof e&&(e=new Request(e)),s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const a=g(n,"fetchDidFail"),i=a.length>0?e.clone():null;try{for(const t of n)if("requestWillFetch"in t){const n=t.requestWillFetch,r=e.clone();e=await n.call(t,{request:r,event:s})}}catch(e){throw new r("plugin-error-request-will-fetch",{thrownError:e})}const o=e.clone();try{let r;r="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of n)"fetchDidSucceed"in e&&(r=await e.fetchDidSucceed.call(e,{event:s,request:o,response:r}));return r}catch(e){0;for(const t of a)await t.fetchDidFail.call(t,{error:e,event:s,originalRequest:i.clone(),request:o.clone()});throw e}};const x={get googleAnalytics(){return u()},get precache(){return h()},get prefix(){return l()},get runtime(){return d()},get suffix(){return f()}};async function T(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},r=t?t(n):n,a=function(){if(void 0===q){const e=new Response("");if("body"in e)try{new Response(e.body),q=!0}catch(e){q=!1}q=!1}return q}()?s.body:await s.blob();return new Response(a,r)}s(1);const O=[],U={get:()=>O,add(e){O.push(...e)}};function N(e){if(!e)throw new r("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new r("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),a=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:a.href}}class L{constructor(e){this._cacheName=h(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=N(s),a="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new r("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new r("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,a),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],r=await self.caches.open(this._cacheName),a=await r.keys(),i=new Set(a.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)i.has(t)?n.push(e):s.push({cacheKey:t,url:e});const o=s.map(({cacheKey:s,url:n})=>{const r=this._cacheKeysToIntegrities.get(s),a=this._urlsToCacheModes.get(n);return this._addURLToCache({cacheKey:s,cacheMode:a,event:e,integrity:r,plugins:t,url:n})});await Promise.all(o);return{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const r of t)s.has(r.url)||(await e.delete(r),n.push(r.url));return{deletedURLs:n}}async _addURLToCache({cacheKey:e,url:t,cacheMode:s,event:n,plugins:a,integrity:i}){const o=new Request(t,{integrity:i,cache:s,credentials:"same-origin"});let c,u=await b({event:n,plugins:a,request:o});for(const e of a||[])"cacheWillUpdate"in e&&(c=e);if(!(c?await c.cacheWillUpdate({event:n,request:o,response:u}):u.status<400))throw new r("bad-precaching-response",{url:t,status:u.status});u.redirected&&(u=await T(u)),await m({event:n,plugins:a,response:u,request:e===t?o:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this._cacheName)).match(s)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new r("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(s){if(e)return fetch(t);throw s}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new r("non-precached-url",{url:e});const s=this.createHandler(t),n=new Request(e);return()=>s({request:n})}}let S;const E=()=>(S||(S=new L),S);const k=(e,t)=>{const s=E().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:r}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(a,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:a});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let K=!1;function C(e){K||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const r=h();self.addEventListener("fetch",a=>{const i=k(a.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!i)return void 0;let o=self.caches.open(r).then(e=>e.match(i)).then(e=>e||fetch(i));a.respondWith(o)})})(e),K=!0)}const P=e=>{const t=E(),s=U.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},j=e=>{const t=E();e.waitUntil(t.activate())};function M(e,t){!function(e){E().addToCacheList(e),e.length>0&&(self.addEventListener("install",P),self.addEventListener("activate",j))}(e),C(t)}s(5);class D{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(t=>e.headers.get(t)===this._headers[t])),t}}class A{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new D(e)}}s(2);const I=e=>e&&"object"==typeof e?e:{handle:e};class W{constructor(e,t,s="GET"){this.handler=I(t),this.match=e,this.method=s}}class F extends W{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}class H{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const{params:n,route:r}=this.findMatchingRoute({url:s,request:e,event:t});let a=r&&r.handler;if(!a&&this._defaultHandler&&(a=this._defaultHandler),!a)return void 0;let i;try{i=a.handle({url:s,request:e,event:t,params:n})}catch(e){i=Promise.reject(e)}return i instanceof Promise&&this._catchHandler&&(i=i.catch(n=>this._catchHandler.handle({url:s,request:e,event:t}))),i}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const r of n){let n;const a=r.match({url:e,request:t,event:s});if(a)return n=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=I(e)}setCatchHandler(e){this._catchHandler=I(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new r("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new r("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let B;const G=()=>(B||(B=new H,B.addFetchListener(),B.addCacheListener()),B);function V(e,t,s){let n;if("string"==typeof e){const r=new URL(e,location.href);0;n=new W(({url:e})=>e.href===r.href,t,s)}else if(e instanceof RegExp)n=new F(e,t,s);else if("function"==typeof e)n=new W(e,t,s);else{if(!(e instanceof W))throw new r("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return G().registerRoute(n),n}s(3);class ${constructor(e={}){this._cacheName=d(e.cacheName),this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));let s,n=await _({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(n)0;else{0;try{n=await this._getFromNetwork(t,e)}catch(e){s=e}0}if(!n)throw new r("no-response",{url:t.url,error:s});return n}async _getFromNetwork(e,t){const s=await b({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=s.clone(),r=m({cacheName:this._cacheName,request:e,response:n,event:t,plugins:this._plugins});if(t)try{t.waitUntil(r)}catch(e){0}return s}}const J={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class Q{constructor(e={}){if(this._cacheName=d(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[J,...e.plugins]}else this._plugins=[J];this._networkTimeoutSeconds=e.networkTimeoutSeconds||0,this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){const s=[];"string"==typeof t&&(t=new Request(t));const n=[];let a;if(this._networkTimeoutSeconds){const{id:r,promise:i}=this._getTimeoutPromise({request:t,event:e,logs:s});a=r,n.push(i)}const i=this._getNetworkPromise({timeoutId:a,request:t,event:e,logs:s});n.push(i);let o=await Promise.race(n);if(o||(o=await i),!o)throw new r("no-response",{url:t.url});return o}_getTimeoutPromise({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this._respondFromCache({request:e,event:s}))},1e3*this._networkTimeoutSeconds)}),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,event:n}){let r,a;try{a=await b({request:t,event:n,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){r=e}if(e&&clearTimeout(e),r||!a)a=await this._respondFromCache({request:t,event:n});else{const e=a.clone(),s=m({cacheName:this._cacheName,request:t,response:e,event:n,plugins:this._plugins});if(n)try{n.waitUntil(s)}catch(e){0}}return a}_respondFromCache({event:e,request:t}){return _({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins})}}class z{constructor(e={}){this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions}async handle({event:e,request:t}){let s,n;"string"==typeof t&&(t=new Request(t));try{n=await b({request:t,event:e,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){s=e}if(!n)throw new r("no-response",{url:t.url,error:s});return n}}s(4);class X{constructor(e){this._queueName=e,this._db=new v("workbox-background-sync",3,{onupgradeneeded:this._upgradeDb})}async pushEntry(e){delete e.id,e.queueName=this._queueName,await this._db.add("requests",e)}async unshiftEntry(e){const[t]=await this._db.getAllMatching("requests",{count:1});t?e.id=t.id-1:delete e.id,e.queueName=this._queueName,await this._db.add("requests",e)}async popEntry(){return this._removeEntry({direction:"prev"})}async shiftEntry(){return this._removeEntry({direction:"next"})}async getAll(){return await this._db.getAllMatching("requests",{index:"queueName",query:IDBKeyRange.only(this._queueName)})}async deleteEntry(e){await this._db.delete("requests",e)}async _removeEntry({direction:e}){const[t]=await this._db.getAllMatching("requests",{direction:e,index:"queueName",query:IDBKeyRange.only(this._queueName),count:1});if(t)return await this.deleteEntry(t.id),t}_upgradeDb(e){const t=e.target.result;e.oldVersion>0&&e.oldVersion<3&&t.objectStoreNames.contains("requests")&&t.deleteObjectStore("requests");t.createObjectStore("requests",{autoIncrement:!0,keyPath:"id"}).createIndex("queueName","queueName",{unique:!1})}}const Y=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class Z{constructor(e){"navigate"===e.mode&&(e.mode="same-origin"),this._requestData=e}static async fromRequest(e){const t={url:e.url,headers:{}};"GET"!==e.method&&(t.body=await e.clone().arrayBuffer());for(const[s,n]of e.headers.entries())t.headers[s]=n;for(const s of Y)void 0!==e[s]&&(t[s]=e[s]);return new Z(t)}toObject(){const e=Object.assign({},this._requestData);return e.headers=Object.assign({},this._requestData.headers),e.body&&(e.body=e.body.slice(0)),e}toRequest(){return new Request(this._requestData.url,this._requestData)}clone(){return new Z(this.toObject())}}const ee=new Set,te=e=>{const t={request:new Z(e.requestData).toRequest(),timestamp:e.timestamp};return e.metadata&&(t.metadata=e.metadata),t};class se{constructor(e,{onSync:t,maxRetentionTime:s}={}){if(this._syncInProgress=!1,this._requestsAddedDuringSync=!1,ee.has(e))throw new r("duplicate-queue-name",{name:e});ee.add(e),this._name=e,this._onSync=t||this.replayRequests,this._maxRetentionTime=s||10080,this._queueStore=new X(this._name),this._addSyncListener()}get name(){return this._name}async pushRequest(e){await this._addRequest(e,"push")}async unshiftRequest(e){await this._addRequest(e,"unshift")}async popRequest(){return this._removeRequest("pop")}async shiftRequest(){return this._removeRequest("shift")}async getAll(){const e=await this._queueStore.getAll(),t=Date.now(),s=[];for(const n of e){const e=60*this._maxRetentionTime*1e3;t-n.timestamp>e?await this._queueStore.deleteEntry(n.id):s.push(te(n))}return s}async _addRequest({request:e,metadata:t,timestamp:s=Date.now()},n){const r={requestData:(await Z.fromRequest(e.clone())).toObject(),timestamp:s};t&&(r.metadata=t),await this._queueStore[n+"Entry"](r),this._syncInProgress?this._requestsAddedDuringSync=!0:await this.registerSync()}async _removeRequest(e){const t=Date.now(),s=await this._queueStore[e+"Entry"]();if(s){const n=60*this._maxRetentionTime*1e3;return t-s.timestamp>n?this._removeRequest(e):te(s)}}async replayRequests(){let e;for(;e=await this.shiftRequest();)try{await fetch(e.request.clone())}catch(t){throw await this.unshiftRequest(e),new r("queue-replay-failed",{name:this._name})}}async registerSync(){if("sync"in self.registration)try{await self.registration.sync.register("workbox-background-sync:"+this._name)}catch(e){0}}_addSyncListener(){"sync"in self.registration?self.addEventListener("sync",e=>{if(e.tag==="workbox-background-sync:"+this._name){0;const t=async()=>{let t;this._syncInProgress=!0;try{await this._onSync({queue:this})}catch(e){throw t=e,t}finally{!this._requestsAddedDuringSync||t&&!e.lastChance||await this.registerSync(),this._syncInProgress=!1,this._requestsAddedDuringSync=!1}};e.waitUntil(t())}}):this._onSync({queue:this})}static get _queueNames(){return ee}}class ne{constructor(e,t){this.fetchDidFail=async({request:e})=>{await this._queue.pushRequest({request:e})},this._queue=new se(e,t)}}s(6);const re=/^\/(\w+\/)?collect/,ae=e=>{const t=({url:e})=>"www.google-analytics.com"===e.hostname&&re.test(e.pathname),s=new z({plugins:[e]});return[new W(t,s,"GET"),new W(t,s,"POST")]},ie=e=>{const t=new Q({cacheName:e});return new W(({url:e})=>"www.google-analytics.com"===e.hostname&&"/analytics.js"===e.pathname,t,"GET")},oe=e=>{const t=new Q({cacheName:e});return new W(({url:e})=>"www.googletagmanager.com"===e.hostname&&"/gtag/js"===e.pathname,t,"GET")},ce=e=>{const t=new Q({cacheName:e});return new W(({url:e})=>"www.googletagmanager.com"===e.hostname&&"/gtm.js"===e.pathname,t,"GET")};var ue=[{url:"/",revision:"204"}],he=["ghost"];c({prefix:"ghostCache",suffix:"v2",precache:"it",runtime:"rt",googleAnalytics:"ga"});V(new RegExp(".*\\.css"),new $({plugins:[new A({statuses:[0,200]})]})),V(new RegExp(".*\\.js"),new $({plugins:[new A({statuses:[0,200]})]}));V(/\.(?:jpg|jpeg|png|jp2|svg|gif|webp)$/,new $({plugins:[new A({statuses:[0,200]})]})),V(/\.(?:woff|woff2|otf|ttf|)$/,new $({plugins:[new A({statuses:[0,200]})]})),V(/.*(?:googleapis|gstatic)\.com/,new $({plugins:[new A({statuses:[0,200]})]})),V((function(e){if(console.log(e),!e.url)return!1;var t=e.url.href;return!!t&&("GET"===e.request.method&&(!!t.includes("https")&&(!he.includes(t)&&!he.some((function(e){return t.includes(e)})))))}),new Q({plugins:[new A({statuses:[0,200]})]})),M(ue),((e={})=>{const t=u(e.cacheName),s=new ne("workbox-google-analytics",{maxRetentionTime:2880,onSync:(n=e,async({queue:e})=>{let t;for(;t=await e.shiftRequest();){const{request:s,timestamp:r}=t,a=new URL(s.url);try{const e="POST"===s.method?new URLSearchParams(await s.clone().text()):a.searchParams,t=r-(Number(e.get("qt"))||0),i=Date.now()-t;if(e.set("qt",String(i)),n.parameterOverrides)for(const t of Object.keys(n.parameterOverrides)){const s=n.parameterOverrides[t];e.set(t,s)}"function"==typeof n.hitFilter&&n.hitFilter.call(null,e),await fetch(new Request(a.origin+a.pathname,{body:e.toString(),method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain"}}))}catch(s){throw await e.unshiftRequest(t),s}}})});var n;const r=[ce(t),ie(t),oe(t),...ae(s)],a=new H;for(const e of r)a.registerRoute(e);a.addFetchListener()})(),self.addEventListener("activate",(function(e){caches.keys().then((function(e){return e.filter((function(e){return!e.startsWith("v2")})).map((function(e){return caches.delete(e)})),!0})),self.addEventListener("activate",()=>self.clients.claim())})),self.addEventListener("install",(function(e){var t=ue.map((function(e){return e.url})),s=x.runtime;e.waitUntil(caches.open(s).then((function(e){return e.addAll(t)}))),M(ue)}))}]);