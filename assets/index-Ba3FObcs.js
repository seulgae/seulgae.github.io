var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,a)=>(a=n==null?{}:e(i(n)),c(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.iterator;function p(e){return typeof e!=`object`||!e?null:(e=f&&e[f]||e[`@@iterator`],typeof e==`function`?e:null)}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h=Object.assign,g={};function _(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||m}_.prototype.isReactComponent={},_.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},_.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function v(){}v.prototype=_.prototype;function y(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||m}var b=y.prototype=new v;b.constructor=y,h(b,_.prototype),b.isPureReactComponent=!0;var x=Array.isArray,S={H:null,A:null,T:null,S:null,V:null},C=Object.prototype.hasOwnProperty;function w(e,n,r,i,a,o){return r=o.ref,{$$typeof:t,type:e,key:n,ref:r===void 0?null:r,props:o}}function T(e,t){return w(e.type,t,void 0,void 0,void 0,e.props)}function E(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ee(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var D=/\/+/g;function te(e,t){return typeof e==`object`&&e&&e.key!=null?ee(``+e.key):t.toString(36)}function ne(){}function re(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(ne,ne):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ie(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ie(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+te(e,0):a,x(o)?(i=``,c!=null&&(i=c.replace(D,`$&/`)+`/`),ie(o,r,i,``,function(e){return e})):o!=null&&(E(o)&&(o=T(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(D,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(x(e))for(var u=0;u<e.length;u++)a=e[u],s=l+te(a,u),c+=ie(a,r,i,s,o);else if(u=p(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+te(a,u++),c+=ie(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ie(re(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ae(e,t,n){if(e==null)return e;var r=[],i=0;return ie(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function oe(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var se=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function O(){}e.Children={map:ae,forEach:function(e,t,n){ae(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ae(e,function(){t++}),t},toArray:function(e){return ae(e,function(e){return e})||[]},only:function(e){if(!E(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}},e.Component=_,e.Fragment=r,e.Profiler=a,e.PureComponent=y,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return S.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=h({},e.props),i=e.key,a=void 0;if(t!=null)for(o in t.ref!==void 0&&(a=void 0),t.key!==void 0&&(i=``+t.key),t)!C.call(t,o)||o===`key`||o===`__self`||o===`__source`||o===`ref`&&t.ref===void 0||(r[o]=t[o]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];r.children=s}return w(e.type,i,void 0,void 0,a,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)C.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return w(e,a,void 0,void 0,null,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=E,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:oe}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=S.T,n={};S.T=n;try{var r=e(),i=S.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(O,se)}catch(e){se(e)}finally{S.T=t}},e.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},e.use=function(e){return S.H.use(e)},e.useActionState=function(e,t,n){return S.H.useActionState(e,t,n)},e.useCallback=function(e,t){return S.H.useCallback(e,t)},e.useContext=function(e){return S.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},e.useEffect=function(e,t,n){var r=S.H;if(typeof n==`function`)throw Error(`useEffect CRUD overload is not enabled in this build of React.`);return r.useEffect(e,t)},e.useId=function(){return S.H.useId()},e.useImperativeHandle=function(e,t,n){return S.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return S.H.useMemo(e,t)},e.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return S.H.useReducer(e,t,n)},e.useRef=function(e){return S.H.useRef(e)},e.useState=function(e){return S.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return S.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return S.H.useTransition()},e.version=`19.1.0`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,D());else{var t=n(l);t!==null&&re(x,t.startTime-e)}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function ee(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&re(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?D():S=!1}}}var D;if(typeof y==`function`)D=function(){y(ee)};else if(typeof MessageChannel<`u`){var te=new MessageChannel,ne=te.port2;te.port1.onmessage=ee,D=function(){ne.postMessage(null)}}else D=function(){_(ee,0)};function re(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,re(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,D()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.1.0`})),h=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(o(e)!==e)throw Error(i(188))}function l(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return c(a),e;if(s===r)return c(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var l=!1,u=a.child;u;){if(u===n){l=!0,n=a,r=s;break}if(u===r){l=!0,r=a,n=s;break}u=u.sibling}if(!l){for(u=s.child;u;){if(u===n){l=!0,n=s,r=a;break}if(u===r){l=!0,r=s,n=a;break}u=u.sibling}if(!l)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function u(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=u(e),t!==null)return t;e=e.sibling}return null}var f=Object.assign,m=Symbol.for(`react.element`),g=Symbol.for(`react.transitional.element`),_=Symbol.for(`react.portal`),v=Symbol.for(`react.fragment`),y=Symbol.for(`react.strict_mode`),b=Symbol.for(`react.profiler`),x=Symbol.for(`react.provider`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),w=Symbol.for(`react.forward_ref`),T=Symbol.for(`react.suspense`),E=Symbol.for(`react.suspense_list`),ee=Symbol.for(`react.memo`),D=Symbol.for(`react.lazy`),te=Symbol.for(`react.activity`),ne=Symbol.for(`react.memo_cache_sentinel`),re=Symbol.iterator;function ie(e){return typeof e!=`object`||!e?null:(e=re&&e[re]||e[`@@iterator`],typeof e==`function`?e:null)}var ae=Symbol.for(`react.client.reference`);function oe(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ae?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case v:return`Fragment`;case b:return`Profiler`;case y:return`StrictMode`;case T:return`Suspense`;case E:return`SuspenseList`;case te:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case _:return`Portal`;case C:return(e.displayName||`Context`)+`.Provider`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case w:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ee:return t=e.displayName||null,t===null?oe(e.type)||`Memo`:t;case D:t=e._payload,e=e._init;try{return oe(e(t))}catch{}}return null}var se=Array.isArray,O=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ce={pending:!1,data:null,method:null,action:null},le=[],ue=-1;function de(e){return{current:e}}function fe(e){0>ue||(e.current=le[ue],le[ue]=null,ue--)}function A(e,t){ue++,le[ue]=e.current,e.current=t}var pe=de(null),me=de(null),he=de(null),ge=de(null);function _e(e,t){switch(A(he,t),A(me,e),A(pe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Dd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Dd(t),e=Od(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}fe(pe),A(pe,e)}function ve(){fe(pe),fe(me),fe(he)}function ye(e){e.memoizedState!==null&&A(ge,e);var t=pe.current,n=Od(t,e.type);t!==n&&(A(me,e),A(pe,n))}function be(e){me.current===e&&(fe(pe),fe(me)),ge.current===e&&(fe(ge),Ff._currentValue=ce)}var xe=Object.prototype.hasOwnProperty,Se=t.unstable_scheduleCallback,Ce=t.unstable_cancelCallback,we=t.unstable_shouldYield,Te=t.unstable_requestPaint,Ee=t.unstable_now,De=t.unstable_getCurrentPriorityLevel,Oe=t.unstable_ImmediatePriority,ke=t.unstable_UserBlockingPriority,Ae=t.unstable_NormalPriority,je=t.unstable_LowPriority,Me=t.unstable_IdlePriority,Ne=t.log,Pe=t.unstable_setDisableYieldValue,Fe=null,Ie=null;function Le(e){if(typeof Ne==`function`&&Pe(e),Ie&&typeof Ie.setStrictMode==`function`)try{Ie.setStrictMode(Fe,e)}catch{}}var Re=Math.clz32?Math.clz32:Ve,ze=Math.log,Be=Math.LN2;function Ve(e){return e>>>=0,e===0?32:31-(ze(e)/Be|0)|0}var He=256,Ue=4194304;function We(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ge(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=We(n))):i=We(o):i=We(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=We(n))):i=We(o)):i=We(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Ke(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function qe(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Je(){var e=He;return He<<=1,!(He&4194048)&&(He=256),e}function Ye(){var e=Ue;return Ue<<=1,!(Ue&62914560)&&(Ue=4194304),e}function Xe(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ze(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Qe(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Re(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&$e(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function $e(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Re(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&4194090}function et(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Re(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function tt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function nt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function rt(){var e=k.p;return e===0?(e=window.event,e===void 0?32:Xf(e.type)):e}function it(e,t){var n=k.p;try{return k.p=e,t()}finally{k.p=n}}var at=Math.random().toString(36).slice(2),ot=`__reactFiber$`+at,st=`__reactProps$`+at,ct=`__reactContainer$`+at,lt=`__reactEvents$`+at,ut=`__reactListeners$`+at,dt=`__reactHandles$`+at,ft=`__reactResources$`+at,pt=`__reactMarker$`+at;function mt(e){delete e[ot],delete e[st],delete e[lt],delete e[ut],delete e[dt]}function ht(e){var t=e[ot];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ct]||n[ot]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Kd(e);e!==null;){if(n=e[ot])return n;e=Kd(e)}return t}e=n,n=e.parentNode}return null}function gt(e){if(e=e[ot]||e[ct]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function _t(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function vt(e){var t=e[ft];return t||=e[ft]={hoistableStyles:new Map,hoistableScripts:new Map},t}function yt(e){e[pt]=!0}var bt=new Set,xt={};function St(e,t){Ct(e,t),Ct(e+`Capture`,t)}function Ct(e,t){for(xt[e]=t,e=0;e<t.length;e++)bt.add(t[e])}var wt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Tt={},Et={};function Dt(e){return xe.call(Et,e)?!0:xe.call(Tt,e)?!1:wt.test(e)?Et[e]=!0:(Tt[e]=!0,!1)}function Ot(e,t,n){if(Dt(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function kt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function At(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}var jt,Mt;function Nt(e){if(jt===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);jt=t&&t[1]||``,Mt=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+jt+e+Mt}var Pt=!1;function Ft(e,t){if(!e||Pt)return``;Pt=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Pt=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Nt(n):``}function It(e){switch(e.tag){case 26:case 27:case 5:return Nt(e.type);case 16:return Nt(`Lazy`);case 13:return Nt(`Suspense`);case 19:return Nt(`SuspenseList`);case 0:case 15:return Ft(e.type,!1);case 11:return Ft(e.type.render,!1);case 1:return Ft(e.type,!0);case 31:return Nt(`Activity`);default:return``}}function Lt(e){try{var t=``;do t+=It(e),e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}function Rt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function zt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Bt(e){var t=zt(e)?`checked`:`value`,n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=``+e[t];if(!e.hasOwnProperty(t)&&n!==void 0&&typeof n.get==`function`&&typeof n.set==`function`){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Vt(e){e._valueTracker||=Bt(e)}function j(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=zt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Ht(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Ut=/[\n"\\]/g;function M(e){return e.replace(Ut,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Wt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Rt(t)):e.value!==``+Rt(t)&&(e.value=``+Rt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Kt(e,o,Rt(n)):Kt(e,o,Rt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Rt(s):e.removeAttribute(`name`)}function Gt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null))return;n=n==null?``:``+Rt(n),t=t==null?n:``+Rt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o)}function Kt(e,t,n){t===`number`&&Ht(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function qt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Rt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Jt(e,t,n){if(t!=null&&(t=``+Rt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Rt(n)}function N(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(se(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Rt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r)}function Yt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Xt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Zt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Xt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function Qt(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Zt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Zt(e,o,t[o])}function $t(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var en=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),tn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function nn(e){return tn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}var rn=null;function an(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var on=null,sn=null;function cn(e){var t=gt(e);if(t&&(e=t.stateNode)){var n=e[st]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Wt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+M(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[st]||null;if(!a)throw Error(i(90));Wt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&j(r)}break a;case`textarea`:Jt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&qt(e,!!n.multiple,t,!1)}}}var ln=!1;function un(e,t,n){if(ln)return e(t,n);ln=!0;try{return e(t)}finally{if(ln=!1,(on!==null||sn!==null)&&(cu(),on&&(t=on,e=sn,sn=on=null,cn(t),e)))for(t=0;t<e.length;t++)cn(e[t])}}function dn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[st]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var fn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),pn=!1;if(fn)try{var mn={};Object.defineProperty(mn,`passive`,{get:function(){pn=!0}}),window.addEventListener(`test`,mn,mn),window.removeEventListener(`test`,mn,mn)}catch{pn=!1}var hn=null,gn=null,_n=null;function vn(){if(_n)return _n;var e,t=gn,n=t.length,r,i=`value`in hn?hn.value:hn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return _n=i.slice(e,1<r?1-r:void 0)}function yn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function bn(){return!0}function xn(){return!1}function Sn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?bn:xn,this.isPropagationStopped=xn,this}return f(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=bn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=bn)},persist:function(){},isPersistent:bn}),t}var Cn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},wn=Sn(Cn),Tn=f({},Cn,{view:0,detail:0}),En=Sn(Tn),Dn,On,kn,An=f({},Tn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Vn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==kn&&(kn&&e.type===`mousemove`?(Dn=e.screenX-kn.screenX,On=e.screenY-kn.screenY):On=Dn=0,kn=e),Dn)},movementY:function(e){return`movementY`in e?e.movementY:On}}),jn=Sn(An),Mn=Sn(f({},An,{dataTransfer:0})),Nn=Sn(f({},Tn,{relatedTarget:0})),Pn=Sn(f({},Cn,{animationName:0,elapsedTime:0,pseudoElement:0})),Fn=Sn(f({},Cn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),In=Sn(f({},Cn,{data:0})),Ln={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Rn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},zn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Bn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=zn[e])?!!t[e]:!1}function Vn(){return Bn}var Hn=Sn(f({},Tn,{key:function(e){if(e.key){var t=Ln[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=yn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Rn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Vn,charCode:function(e){return e.type===`keypress`?yn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?yn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Un=Sn(f({},An,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Wn=Sn(f({},Tn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Vn})),Gn=Sn(f({},Cn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Kn=Sn(f({},An,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),qn=Sn(f({},Cn,{newState:0,oldState:0})),Jn=[9,13,27,32],Yn=fn&&`CompositionEvent`in window,Xn=null;fn&&`documentMode`in document&&(Xn=document.documentMode);var Zn=fn&&`TextEvent`in window&&!Xn,Qn=fn&&(!Yn||Xn&&8<Xn&&11>=Xn),$n=` `,er=!1;function tr(e,t){switch(e){case`keyup`:return Jn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function nr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var rr=!1;function ir(e,t){switch(e){case`compositionend`:return nr(t);case`keypress`:return t.which===32?(er=!0,$n):null;case`textInput`:return e=t.data,e===$n&&er?null:e;default:return null}}function ar(e,t){if(rr)return e===`compositionend`||!Yn&&tr(e,t)?(e=vn(),_n=gn=hn=null,rr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Qn&&t.locale!==`ko`?null:t.data;default:return null}}var or={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function sr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!or[e.type]:t===`textarea`}function cr(e,t,n,r){on?sn?sn.push(r):sn=[r]:on=r,t=pd(t,`onChange`),0<t.length&&(n=new wn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var lr=null,ur=null;function dr(e){od(e,0)}function fr(e){if(j(_t(e)))return e}function pr(e,t){if(e===`change`)return t}var mr=!1;if(fn){var hr;if(fn){var gr=`oninput`in document;if(!gr){var _r=document.createElement(`div`);_r.setAttribute(`oninput`,`return;`),gr=typeof _r.oninput==`function`}hr=gr}else hr=!1;mr=hr&&(!document.documentMode||9<document.documentMode)}function vr(){lr&&(lr.detachEvent(`onpropertychange`,yr),ur=lr=null)}function yr(e){if(e.propertyName===`value`&&fr(ur)){var t=[];cr(t,ur,e,an(e)),un(dr,t)}}function br(e,t,n){e===`focusin`?(vr(),lr=t,ur=n,lr.attachEvent(`onpropertychange`,yr)):e===`focusout`&&vr()}function xr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return fr(ur)}function P(e,t){if(e===`click`)return fr(t)}function Sr(e,t){if(e===`input`||e===`change`)return fr(t)}function Cr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var F=typeof Object.is==`function`?Object.is:Cr;function I(e,t){if(F(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!xe.call(t,i)||!F(e[i],t[i]))return!1}return!0}function wr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Tr(e,t){var n=wr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=wr(n)}}function Er(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Er(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Dr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ht(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ht(e.document)}return t}function Or(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var kr=fn&&`documentMode`in document&&11>=document.documentMode,Ar=null,jr=null,Mr=null,Nr=!1;function Pr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Nr||Ar==null||Ar!==Ht(r)||(r=Ar,`selectionStart`in r&&Or(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Mr&&I(Mr,r)||(Mr=r,r=pd(jr,`onSelect`),0<r.length&&(t=new wn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Ar)))}function Fr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Ir={animationend:Fr(`Animation`,`AnimationEnd`),animationiteration:Fr(`Animation`,`AnimationIteration`),animationstart:Fr(`Animation`,`AnimationStart`),transitionrun:Fr(`Transition`,`TransitionRun`),transitionstart:Fr(`Transition`,`TransitionStart`),transitioncancel:Fr(`Transition`,`TransitionCancel`),transitionend:Fr(`Transition`,`TransitionEnd`)},Lr={},Rr={};fn&&(Rr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Ir.animationend.animation,delete Ir.animationiteration.animation,delete Ir.animationstart.animation),`TransitionEvent`in window||delete Ir.transitionend.transition);function zr(e){if(Lr[e])return Lr[e];if(!Ir[e])return e;var t=Ir[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Rr)return Lr[e]=t[n];return e}var Br=zr(`animationend`),Vr=zr(`animationiteration`),Hr=zr(`animationstart`),Ur=zr(`transitionrun`),Wr=zr(`transitionstart`),Gr=zr(`transitioncancel`),Kr=zr(`transitionend`),qr=new Map,Jr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Jr.push(`scrollEnd`);function Yr(e,t){qr.set(e,t),St(t,[e])}var Xr=new WeakMap;function Zr(e,t){if(typeof e==`object`&&e){var n=Xr.get(e);return n===void 0?(t={value:e,source:t,stack:Lt(t)},Xr.set(e,t),t):n}return{value:e,source:t,stack:Lt(t)}}var Qr=[],$r=0,ei=0;function ti(){for(var e=$r,t=ei=$r=0;t<e;){var n=Qr[t];Qr[t++]=null;var r=Qr[t];Qr[t++]=null;var i=Qr[t];Qr[t++]=null;var a=Qr[t];if(Qr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ai(n,i,a)}}function ni(e,t,n,r){Qr[$r++]=e,Qr[$r++]=t,Qr[$r++]=n,Qr[$r++]=r,ei|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ri(e,t,n,r){return ni(e,t,n,r),oi(e)}function ii(e,t){return ni(e,null,null,t),oi(e)}function ai(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Re(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function oi(e){if(50<$l)throw $l=0,eu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var si={};function ci(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function li(e,t,n,r){return new ci(e,t,n,r)}function ui(e){return e=e.prototype,!(!e||!e.isReactComponent)}function di(e,t){var n=e.alternate;return n===null?(n=li(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function fi(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function pi(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)ui(e)&&(s=1);else if(typeof e==`string`)s=Tf(e,n,pe.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case te:return e=li(31,n,t,a),e.elementType=te,e.lanes=o,e;case v:return mi(n.children,a,o,t);case y:s=8,a|=24;break;case b:return e=li(12,n,t,a|2),e.elementType=b,e.lanes=o,e;case T:return e=li(13,n,t,a),e.elementType=T,e.lanes=o,e;case E:return e=li(19,n,t,a),e.elementType=E,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case x:case C:s=10;break a;case S:s=9;break a;case w:s=11;break a;case ee:s=14;break a;case D:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=li(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function mi(e,t,n,r){return e=li(7,e,r,t),e.lanes=n,e}function hi(e,t,n){return e=li(6,e,null,t),e.lanes=n,e}function gi(e,t,n){return t=li(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var _i=[],vi=0,yi=null,bi=0,xi=[],Si=0,Ci=null,wi=1,Ti=``;function Ei(e,t){_i[vi++]=bi,_i[vi++]=yi,yi=e,bi=t}function Di(e,t,n){xi[Si++]=wi,xi[Si++]=Ti,xi[Si++]=Ci,Ci=e;var r=wi;e=Ti;var i=32-Re(r)-1;r&=~(1<<i),n+=1;var a=32-Re(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,wi=1<<32-Re(t)+i|n<<i|r,Ti=a+e}else wi=1<<a|n<<i|r,Ti=e}function Oi(e){e.return!==null&&(Ei(e,1),Di(e,1,0))}function ki(e){for(;e===yi;)yi=_i[--vi],_i[vi]=null,bi=_i[--vi],_i[vi]=null;for(;e===Ci;)Ci=xi[--Si],xi[Si]=null,Ti=xi[--Si],xi[Si]=null,wi=xi[--Si],xi[Si]=null}var Ai=null,ji=null,L=!1,Mi=null,Ni=!1,Pi=Error(i(519));function Fi(e){throw Vi(Zr(Error(i(418,``)),e)),Pi}function Ii(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[ot]=e,t[st]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<id.length;n++)Q(id[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Gt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0),Vt(t);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),N(t,r.value,r.defaultValue,r.children),Vt(t)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||yd(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=bd),t=!0):t=!1,t||Fi(e)}function Li(e){for(Ai=e.return;Ai;)switch(Ai.tag){case 5:case 13:Ni=!1;return;case 27:case 3:Ni=!0;return;default:Ai=Ai.return}}function Ri(e){if(e!==Ai)return!1;if(!L)return Li(e),L=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||kd(e.type,e.memoizedProps)),n=!n),n&&ji&&Fi(e),Li(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));a:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(n=e.data,n===`/$`){if(t===0){ji=Wd(e.nextSibling);break a}t--}else n!==`$`&&n!==`$!`&&n!==`$?`||t++;e=e.nextSibling}ji=null}}else t===27?(t=ji,Ld(e.type)?(e=Gd,Gd=null,ji=e):ji=t):ji=Ai?Wd(e.stateNode.nextSibling):null;return!0}function zi(){ji=Ai=null,L=!1}function Bi(){var e=Mi;return e!==null&&(Bl===null?Bl=e:Bl.push.apply(Bl,e),Mi=null),e}function Vi(e){Mi===null?Mi=[e]:Mi.push(e)}var Hi=de(null),Ui=null,Wi=null;function Gi(e,t,n){A(Hi,t._currentValue),t._currentValue=n}function Ki(e){e._currentValue=Hi.current,fe(Hi)}function qi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Ji(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),qi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),qi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Yi(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;F(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===ge.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Ff]:e.push(Ff))}a=a.return}e!==null&&Ji(t,e,n,r),t.flags|=262144}function Xi(e){for(e=e.firstContext;e!==null;){if(!F(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Zi(e){Ui=e,Wi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function R(e){return $i(Ui,e)}function Qi(e,t){return Ui===null&&Zi(e),$i(e,t)}function $i(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Wi===null){if(e===null)throw Error(i(308));Wi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Wi=Wi.next=t;return n}var ea=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ta=t.unstable_scheduleCallback,na=t.unstable_NormalPriority,ra={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function z(){return{controller:new ea,data:new Map,refCount:0}}function B(e){e.refCount--,e.refCount===0&&ta(na,function(){e.controller.abort()})}var V=null,ia=0,aa=0,oa=null;function sa(e,t){if(V===null){var n=V=[];ia=0,aa=Qu(),oa={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return ia++,t.then(H,H),t}function H(){if(--ia===0&&V!==null){oa!==null&&(oa.status=`fulfilled`);var e=V;V=null,aa=0,oa=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ca(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var la=O.S;O.S=function(e,t){typeof t==`object`&&t&&typeof t.then==`function`&&sa(e,t),la!==null&&la(e,t)};var ua=de(null);function da(){var e=ua.current;return e===null?q.pooledCache:e}function fa(e,t){t===null?A(ua,ua.current):A(ua,t.pool)}function pa(){var e=da();return e===null?null:{parent:ra._currentValue,pool:e}}var ma=Error(i(460)),ha=Error(i(474)),ga=Error(i(542)),_a={then:function(){}};function va(e){return e=e.status,e===`fulfilled`||e===`rejected`}function ya(){}function ba(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(ya,ya),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ca(e),e;default:if(typeof t.status==`string`)t.then(ya,ya);else{if(e=q,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ca(e),e}throw xa=t,ma}}var xa=null;function Sa(){if(xa===null)throw Error(i(459));var e=xa;return xa=null,e}function Ca(e){if(e===ma||e===ga)throw Error(i(483))}var wa=!1;function Ta(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ea(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Da(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Oa(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,K&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=oi(e),ai(e,null,n),t}return ni(e,r,t,n),oi(e)}function ka(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,et(e,n)}}function Aa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var ja=!1;function Ma(){if(ja){var e=oa;if(e!==null)throw e}}function Na(e,t,n,r){ja=!1;var i=e.updateQueue;wa=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var p=s.lane&-536870913,m=p!==s.lane;if(m?(Y&p)===p:(r&p)===p){p!==0&&p===aa&&(ja=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;p=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,p);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,p=typeof h==`function`?h.call(_,d,p):h,p==null)break a;d=f({},d,p);break a;case 2:wa=!0}}p=s.callback,p!==null&&(e.flags|=64,m&&(e.flags|=8192),m=i.callbacks,m===null?i.callbacks=[p]:m.push(p))}else m={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=m,c=d):u=u.next=m,o|=p;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;m=s,s=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Pl|=o,e.lanes=o,e.memoizedState=d}}function Pa(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Fa(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Pa(n[e],t)}var Ia=de(null),La=de(0);function Ra(e,t){e=Ml,A(La,e),A(Ia,t),Ml=e|t.baseLanes}function za(){A(La,Ml),A(Ia,Ia.current)}function Ba(){Ml=La.current,fe(Ia),fe(La)}var Va=0,U=null,W=null,Ha=null,Ua=!1,Wa=!1,Ga=!1,Ka=0,qa=0,Ja=null,Ya=0;function Xa(){throw Error(i(321))}function Za(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!F(e[n],t[n]))return!1;return!0}function Qa(e,t,n,r,i,a){return Va=a,U=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,O.H=e===null||e.memoizedState===null?hs:gs,Ga=!1,a=n(r,i),Ga=!1,Wa&&(a=eo(t,n,r,i)),$a(e),a}function $a(e){O.H=ms;var t=W!==null&&W.next!==null;if(Va=0,Ha=W=U=null,Ua=!1,qa=0,Ja=null,t)throw Error(i(300));e===null||Zs||(e=e.dependencies,e!==null&&Xi(e)&&(Zs=!0))}function eo(e,t,n,r){U=e;var a=0;do{if(Wa&&(Ja=null),qa=0,Wa=!1,25<=a)throw Error(i(301));if(a+=1,Ha=W=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}O.H=_s,o=t(n,r)}while(Wa);return o}function to(){var e=O.H,t=e.useState()[0];return t=typeof t.then==`function`?co(t):t,e=e.useState()[0],(W===null?null:W.memoizedState)!==e&&(U.flags|=1024),t}function no(){var e=Ka!==0;return Ka=0,e}function ro(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function io(e){if(Ua){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ua=!1}Va=0,Ha=W=U=null,Wa=!1,qa=Ka=0,Ja=null}function ao(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ha===null?U.memoizedState=Ha=e:Ha=Ha.next=e,Ha}function oo(){if(W===null){var e=U.alternate;e=e===null?null:e.memoizedState}else e=W.next;var t=Ha===null?U.memoizedState:Ha.next;if(t!==null)Ha=t,W=e;else{if(e===null)throw U.alternate===null?Error(i(467)):Error(i(310));W=e,e={memoizedState:W.memoizedState,baseState:W.baseState,baseQueue:W.baseQueue,queue:W.queue,next:null},Ha===null?U.memoizedState=Ha=e:Ha=Ha.next=e}return Ha}function so(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function co(e){var t=qa;return qa+=1,Ja===null&&(Ja=[]),e=ba(Ja,e,t),t=U,(Ha===null?t.memoizedState:Ha.next)===null&&(t=t.alternate,O.H=t===null||t.memoizedState===null?hs:gs),e}function lo(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return co(e);if(e.$$typeof===C)return R(e)}throw Error(i(438,String(e)))}function uo(e){var t=null,n=U.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=U.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=so(),U.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ne;return t.index++,n}function fo(e,t){return typeof t==`function`?t(e):t}function po(e){return mo(oo(),W,e)}function mo(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Va&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===aa&&(d=!0);else if((Va&p)===p){u=u.next,p===aa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,U.lanes|=p,Pl|=p;f=u.action,Ga&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,U.lanes|=f,Pl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!F(o,e.memoizedState)&&(Zs=!0,d&&(n=oa,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function ho(e){var t=oo(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);F(o,t.memoizedState)||(Zs=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function go(e,t,n){var r=U,a=oo(),o=L;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!F((W||a).memoizedState,n);if(s&&(a.memoizedState=n,Zs=!0),a=a.queue,Bo(2048,8,yo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||Ha!==null&&Ha.memoizedState.tag&1){if(r.flags|=2048,Io(9,Lo(),vo.bind(null,r,a,n,t),null),q===null)throw Error(i(349));o||Va&124||_o(r,t,n)}return n}function _o(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=U.updateQueue,t===null?(t=so(),U.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function vo(e,t,n,r){t.value=n,t.getSnapshot=r,bo(t)&&xo(e)}function yo(e,t,n){return n(function(){bo(t)&&xo(e)})}function bo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!F(e,n)}catch{return!0}}function xo(e){var t=ii(e,2);t!==null&&ru(t,e,2)}function So(e){var t=ao();if(typeof e==`function`){var n=e;if(e=n(),Ga){Le(!0);try{n()}finally{Le(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fo,lastRenderedState:e},t}function Co(e,t,n,r){return e.baseState=n,mo(e,W,typeof r==`function`?r:fo)}function wo(e,t,n,r,a){if(ds(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};O.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,To(t,o)):(o.next=n.next,t.pending=n.next=o)}}function To(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=O.T,o={};O.T=o;try{var s=n(i,r),c=O.S;c!==null&&c(o,s),Eo(e,t,s)}catch(n){Oo(e,t,n)}finally{O.T=a}}else try{a=n(i,r),Eo(e,t,a)}catch(n){Oo(e,t,n)}}function Eo(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Do(e,t,n)},function(n){return Oo(e,t,n)}):Do(e,t,n)}function Do(e,t,n){t.status=`fulfilled`,t.value=n,ko(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,To(e,n)))}function Oo(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,ko(t),t=t.next;while(t!==r)}e.action=null}function ko(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ao(e,t){return t}function jo(e,t){if(L){var n=q.formState;if(n!==null){a:{var r=U;if(L){if(ji){b:{for(var i=ji,a=Ni;i.nodeType!==8;){if(!a){i=null;break b}if(i=Wd(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){ji=Wd(i.nextSibling),r=i.data===`F!`;break a}}Fi(r)}r=!1}r&&(t=n[0])}}return n=ao(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ao,lastRenderedState:t},n.queue=r,n=cs.bind(null,U,r),r.dispatch=n,r=So(!1),a=us.bind(null,U,!1,r.queue),r=ao(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=wo.bind(null,U,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Mo(e){return No(oo(),W,e)}function No(e,t,n){if(t=mo(e,t,Ao)[0],e=po(fo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=co(t)}catch(e){throw e===ma?ga:e}else r=t;t=oo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(U.flags|=2048,Io(9,Lo(),Po.bind(null,i,n),null)),[r,a,e]}function Po(e,t){e.action=t}function Fo(e){var t=oo(),n=W;if(n!==null)return No(t,n,e);oo(),t=t.memoizedState,n=oo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Io(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=U.updateQueue,t===null&&(t=so(),U.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Lo(){return{destroy:void 0,resource:void 0}}function Ro(){return oo().memoizedState}function zo(e,t,n,r){var i=ao();r=r===void 0?null:r,U.flags|=e,i.memoizedState=Io(1|t,Lo(),n,r)}function Bo(e,t,n,r){var i=oo();r=r===void 0?null:r;var a=i.memoizedState.inst;W!==null&&r!==null&&Za(r,W.memoizedState.deps)?i.memoizedState=Io(t,a,n,r):(U.flags|=e,i.memoizedState=Io(1|t,a,n,r))}function Vo(e,t){zo(8390656,8,e,t)}function Ho(e,t){Bo(2048,8,e,t)}function Uo(e,t){return Bo(4,2,e,t)}function Wo(e,t){return Bo(4,4,e,t)}function Go(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ko(e,t,n){n=n==null?null:n.concat([e]),Bo(4,4,Go.bind(null,t,e),n)}function qo(){}function Jo(e,t){var n=oo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Za(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Yo(e,t){var n=oo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Za(t,r[1]))return r[0];if(r=e(),Ga){Le(!0);try{e()}finally{Le(!1)}}return n.memoizedState=[r,t],r}function Xo(e,t,n){return n===void 0||Va&1073741824?e.memoizedState=t:(e.memoizedState=n,e=nu(),U.lanes|=e,Pl|=e,n)}function Zo(e,t,n,r){return F(n,t)?n:Ia.current===null?Va&42?(e=nu(),U.lanes|=e,Pl|=e,t):(Zs=!0,e.memoizedState=n):(e=Xo(e,n,r),F(e,t)||(Zs=!0),e)}function Qo(e,t,n,r,i){var a=k.p;k.p=a!==0&&8>a?a:8;var o=O.T,s={};O.T=s,us(e,!1,t,n);try{var c=i(),l=O.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?ls(e,t,ca(c,r),tu(e)):ls(e,t,r,tu(e))}catch(n){ls(e,t,{then:function(){},status:`rejected`,reason:n},tu())}finally{k.p=a,O.T=o}}function $o(){}function es(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=ts(e).queue;Qo(e,a,t,ce,n===null?$o:function(){return ns(e),n(r)})}function ts(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ce,baseState:ce,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fo,lastRenderedState:ce},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ns(e){var t=ts(e).next.queue;ls(e,t,{},tu())}function rs(){return R(Ff)}function is(){return oo().memoizedState}function as(){return oo().memoizedState}function os(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=tu();e=Da(n);var r=Oa(t,e,n);r!==null&&(ru(r,t,n),ka(r,t,n)),t={cache:z()},e.payload=t;return}t=t.return}}function ss(e,t,n){var r=tu();n={lane:r,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null},ds(e)?fs(t,n):(n=ri(e,t,n,r),n!==null&&(ru(n,e,r),ps(n,t,r)))}function cs(e,t,n){ls(e,t,n,tu())}function ls(e,t,n,r){var i={lane:r,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null};if(ds(e))fs(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,F(s,o))return ni(e,t,i,0),q===null&&ti(),!1}catch{}if(n=ri(e,t,i,r),n!==null)return ru(n,e,r),ps(n,t,r),!0}return!1}function us(e,t,n,r){if(r={lane:2,revertLane:Qu(),action:r,hasEagerState:!1,eagerState:null,next:null},ds(e)){if(t)throw Error(i(479))}else t=ri(e,n,r,2),t!==null&&ru(t,e,2)}function ds(e){var t=e.alternate;return e===U||t!==null&&t===U}function fs(e,t){Wa=Ua=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function ps(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,et(e,n)}}var ms={readContext:R,use:lo,useCallback:Xa,useContext:Xa,useEffect:Xa,useImperativeHandle:Xa,useLayoutEffect:Xa,useInsertionEffect:Xa,useMemo:Xa,useReducer:Xa,useRef:Xa,useState:Xa,useDebugValue:Xa,useDeferredValue:Xa,useTransition:Xa,useSyncExternalStore:Xa,useId:Xa,useHostTransitionStatus:Xa,useFormState:Xa,useActionState:Xa,useOptimistic:Xa,useMemoCache:Xa,useCacheRefresh:Xa},hs={readContext:R,use:lo,useCallback:function(e,t){return ao().memoizedState=[e,t===void 0?null:t],e},useContext:R,useEffect:Vo,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),zo(4194308,4,Go.bind(null,t,e),n)},useLayoutEffect:function(e,t){return zo(4194308,4,e,t)},useInsertionEffect:function(e,t){zo(4,2,e,t)},useMemo:function(e,t){var n=ao();t=t===void 0?null:t;var r=e();if(Ga){Le(!0);try{e()}finally{Le(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=ao();if(n!==void 0){var i=n(t);if(Ga){Le(!0);try{n(t)}finally{Le(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ss.bind(null,U,e),[r.memoizedState,e]},useRef:function(e){var t=ao();return e={current:e},t.memoizedState=e},useState:function(e){e=So(e);var t=e.queue,n=cs.bind(null,U,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:qo,useDeferredValue:function(e,t){return Xo(ao(),e,t)},useTransition:function(){var e=So(!1);return e=Qo.bind(null,U,e.queue,!0,!1),ao().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=U,a=ao();if(L){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),q===null)throw Error(i(349));Y&124||_o(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Vo(yo.bind(null,r,o,e),[e]),r.flags|=2048,Io(9,Lo(),vo.bind(null,r,o,n,t),null),n},useId:function(){var e=ao(),t=q.identifierPrefix;if(L){var n=Ti,r=wi;n=(r&~(1<<32-Re(r)-1)).toString(32)+n,t=`«`+t+`R`+n,n=Ka++,0<n&&(t+=`H`+n.toString(32)),t+=`»`}else n=Ya++,t=`«`+t+`r`+n.toString(32)+`»`;return e.memoizedState=t},useHostTransitionStatus:rs,useFormState:jo,useActionState:jo,useOptimistic:function(e){var t=ao();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=us.bind(null,U,!0,n),n.dispatch=t,[e,t]},useMemoCache:uo,useCacheRefresh:function(){return ao().memoizedState=os.bind(null,U)}},gs={readContext:R,use:lo,useCallback:Jo,useContext:R,useEffect:Ho,useImperativeHandle:Ko,useInsertionEffect:Uo,useLayoutEffect:Wo,useMemo:Yo,useReducer:po,useRef:Ro,useState:function(){return po(fo)},useDebugValue:qo,useDeferredValue:function(e,t){return Zo(oo(),W.memoizedState,e,t)},useTransition:function(){var e=po(fo)[0],t=oo().memoizedState;return[typeof e==`boolean`?e:co(e),t]},useSyncExternalStore:go,useId:is,useHostTransitionStatus:rs,useFormState:Mo,useActionState:Mo,useOptimistic:function(e,t){return Co(oo(),W,e,t)},useMemoCache:uo,useCacheRefresh:as},_s={readContext:R,use:lo,useCallback:Jo,useContext:R,useEffect:Ho,useImperativeHandle:Ko,useInsertionEffect:Uo,useLayoutEffect:Wo,useMemo:Yo,useReducer:ho,useRef:Ro,useState:function(){return ho(fo)},useDebugValue:qo,useDeferredValue:function(e,t){var n=oo();return W===null?Xo(n,e,t):Zo(n,W.memoizedState,e,t)},useTransition:function(){var e=ho(fo)[0],t=oo().memoizedState;return[typeof e==`boolean`?e:co(e),t]},useSyncExternalStore:go,useId:is,useHostTransitionStatus:rs,useFormState:Fo,useActionState:Fo,useOptimistic:function(e,t){var n=oo();return W===null?(n.baseState=e,[e,n.queue.dispatch]):Co(n,W,e,t)},useMemoCache:uo,useCacheRefresh:as},vs=null,ys=0;function bs(e){var t=ys;return ys+=1,vs===null&&(vs=[]),ba(vs,e,t)}function xs(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Ss(e,t){throw t.$$typeof===m?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Cs(e){var t=e._init;return t(e._payload)}function ws(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=di(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=hi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===v?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===D&&Cs(i)===t.type)?(t=a(t,n.props),xs(t,n),t.return=e,t):(t=pi(n.type,n.key,n.props,null,e.mode,r),xs(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=gi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=mi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=hi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case g:return n=pi(t.type,t.key,t.props,null,e.mode,n),xs(n,t),n.return=e,n;case _:return t=gi(t,e.mode,n),t.return=e,t;case D:var r=t._init;return t=r(t._payload),f(e,t,n)}if(se(t)||ie(t))return t=mi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,bs(t),n);if(t.$$typeof===C)return f(e,Qi(e,t),n);Ss(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case g:return n.key===i?l(e,t,n,r):null;case _:return n.key===i?u(e,t,n,r):null;case D:return i=n._init,n=i(n._payload),p(e,t,n,r)}if(se(n)||ie(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,bs(n),r);if(n.$$typeof===C)return p(e,t,Qi(e,n),r);Ss(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case g:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case _:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case D:var a=r._init;return r=a(r._payload),m(e,t,n,r,i)}if(se(r)||ie(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,bs(r),i);if(r.$$typeof===C)return m(e,t,n,Qi(t,r),i);Ss(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),L&&Ei(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return L&&Ei(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),L&&Ei(i,h),l}function y(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),L&&Ei(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return L&&Ei(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),L&&Ei(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===v&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case g:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===v){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===D&&Cs(l)===r.type){n(e,r.sibling),c=a(r,o.props),xs(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===v?(c=mi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=pi(o.type,o.key,o.props,null,e.mode,c),xs(c,o),c.return=e,e=c)}return s(e);case _:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=gi(o,e.mode,c),c.return=e,e=c}return s(e);case D:return l=o._init,o=l(o._payload),b(e,r,o,c)}if(se(o))return h(e,r,o,c);if(ie(o)){if(l=ie(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),y(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,bs(o),c);if(o.$$typeof===C)return b(e,r,Qi(e,o),c);Ss(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=hi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{ys=0;var i=b(e,t,n,r);return vs=null,i}catch(t){if(t===ma||t===ga)throw t;var a=li(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Ts=ws(!0),Es=ws(!1),Ds=de(null),Os=null;function ks(e){var t=e.alternate;A(Ns,Ns.current&1),A(Ds,e),Os===null&&(t===null||Ia.current!==null||t.memoizedState!==null)&&(Os=e)}function As(e){if(e.tag===22){if(A(Ns,Ns.current),A(Ds,e),Os===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(Os=e)}}else js(e)}function js(){A(Ns,Ns.current),A(Ds,Ds.current)}function Ms(e){fe(Ds),Os===e&&(Os=null),fe(Ns)}var Ns=de(0);function Ps(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data===`$?`||Hd(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function Fs(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:f({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Is={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=tu(),i=Da(r);i.payload=t,n!=null&&(i.callback=n),t=Oa(e,i,r),t!==null&&(ru(t,e,r),ka(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=tu(),i=Da(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Oa(e,i,r),t!==null&&(ru(t,e,r),ka(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=tu(),r=Da(n);r.tag=2,t!=null&&(r.callback=t),t=Oa(e,r,n),t!==null&&(ru(t,e,n),ka(t,e,n))}};function Ls(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!I(n,r)||!I(i,a):!0}function Rs(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Is.enqueueReplaceState(t,t.state,null)}function zs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=f({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}var Bs=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function Vs(e){Bs(e)}function Hs(e){console.error(e)}function Us(e){Bs(e)}function Ws(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Gs(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Ks(e,t,n){return n=Da(n),n.tag=3,n.payload={element:null},n.callback=function(){Ws(e,t)},n}function qs(e){return e=Da(e),e.tag=3,e}function Js(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Gs(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Gs(t,n,r),typeof i!=`function`&&(Gl===null?Gl=new Set([this]):Gl.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Ys(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Yi(t,n,a,!0),n=Ds.current,n!==null){switch(n.tag){case 13:return Os===null?mu():n.alternate===null&&Nl===0&&(Nl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===_a?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Mu(e,r,a)),!1;case 22:return n.flags|=65536,r===_a?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Mu(e,r,a)),!1}throw Error(i(435,n.tag))}return Mu(e,r,a),mu(),!1}if(L)return t=Ds.current,t===null?(r!==Pi&&(t=Error(i(423),{cause:r}),Vi(Zr(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Zr(r,n),a=Ks(e.stateNode,r,a),Aa(e,a),Nl!==4&&(Nl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Pi&&(e=Error(i(422),{cause:r}),Vi(Zr(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Zr(o,n),zl===null?zl=[o]:zl.push(o),Nl!==4&&(Nl=2),t===null)return!0;r=Zr(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Ks(n.stateNode,r,e),Aa(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(Gl===null||!Gl.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=qs(a),Js(a,e,n,r),Aa(n,a),!1}n=n.return}while(n!==null);return!1}var Xs=Error(i(461)),Zs=!1;function Qs(e,t,n,r){t.child=e===null?Es(t,null,n,r):Ts(t,e.child,n,r)}function $s(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Zi(t),r=Qa(e,t,n,o,a,i),s=no(),e!==null&&!Zs?(ro(e,t,i),yc(e,t,i)):(L&&s&&Oi(t),t.flags|=1,Qs(e,t,r,i),t.child)}function ec(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ui(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,tc(e,t,a,r,i)):(e=pi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!bc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?I:n,n(o,r)&&e.ref===t.ref)return yc(e,t,i)}return t.flags|=1,e=di(a,r),e.ref=t.ref,e.return=t,t.child=e}function tc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(I(a,r)&&e.ref===t.ref)if(Zs=!1,t.pendingProps=r=a,bc(e,i))e.flags&131072&&(Zs=!0);else return t.lanes=e.lanes,yc(e,t,i)}return ac(e,t,n,r,i)}function nc(e,t,n){var r=t.pendingProps,i=r.children,a=e===null?null:e.memoizedState;if(r.mode===`hidden`){if(t.flags&128){if(r=a===null?n:a.baseLanes|n,e!==null){for(i=t.child=e.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;t.childLanes=a&~r}else t.childLanes=0,t.child=null;return rc(e,t,r,n)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&fa(t,a===null?null:a.cachePool),a===null?za():Ra(t,a),As(t);else return t.lanes=t.childLanes=536870912,rc(e,t,a===null?n:a.baseLanes|n,n)}else a===null?(e!==null&&fa(t,null),za(),js(t)):(fa(t,a.cachePool),Ra(t,a),js(t),t.memoizedState=null);return Qs(e,t,i,n),t.child}function rc(e,t,n,r){var i=da();return i=i===null?null:{parent:ra._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},e!==null&&fa(t,null),za(),As(t),e!==null&&Yi(e,t,r,!0),null}function ic(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function ac(e,t,n,r,i){return Zi(t),n=Qa(e,t,n,r,void 0,i),r=no(),e!==null&&!Zs?(ro(e,t,i),yc(e,t,i)):(L&&r&&Oi(t),t.flags|=1,Qs(e,t,n,i),t.child)}function oc(e,t,n,r,i,a){return Zi(t),t.updateQueue=null,n=eo(t,r,n,i),$a(e),r=no(),e!==null&&!Zs?(ro(e,t,a),yc(e,t,a)):(L&&r&&Oi(t),t.flags|=1,Qs(e,t,n,a),t.child)}function sc(e,t,n,r,i){if(Zi(t),t.stateNode===null){var a=si,o=n.contextType;typeof o==`object`&&o&&(a=R(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Is,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},Ta(t),o=n.contextType,a.context=typeof o==`object`&&o?R(o):si,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Fs(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Is.enqueueReplaceState(a,a.state,null),Na(t,r,a,i),Ma(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=zs(n,s);a.props=c;var l=a.context,u=n.contextType;o=si,typeof u==`object`&&u&&(o=R(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Rs(t,a,r,o),wa=!1;var f=t.memoizedState;a.state=f,Na(t,r,a,i),Ma(),l=t.memoizedState,s||f!==l||wa?(typeof d==`function`&&(Fs(t,n,d,r),l=t.memoizedState),(c=wa||Ls(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ea(e,t),o=t.memoizedProps,u=zs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=si,typeof l==`object`&&l&&(c=R(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Rs(t,a,r,c),wa=!1,f=t.memoizedState,a.state=f,Na(t,r,a,i),Ma();var p=t.memoizedState;o!==d||f!==p||wa||e!==null&&e.dependencies!==null&&Xi(e.dependencies)?(typeof s==`function`&&(Fs(t,n,s,r),p=t.memoizedState),(u=wa||Ls(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Xi(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,ic(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Ts(t,e.child,null,i),t.child=Ts(t,null,n,i)):Qs(e,t,n,i),t.memoizedState=a.state,e=t.child):e=yc(e,t,i),e}function cc(e,t,n,r){return zi(),t.flags|=256,Qs(e,t,n,r),t.child}var lc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function uc(e){return{baseLanes:e,cachePool:pa()}}function dc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Ll),e}function fc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(Ns.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(L){if(a?ks(t):js(t),L){var c=ji,l;if(l=c){c:{for(l=c,c=Ni;l.nodeType!==8;){if(!c){c=null;break c}if(l=Wd(l.nextSibling),l===null){c=null;break c}}c=l}c===null?l=!1:(t.memoizedState={dehydrated:c,treeContext:Ci===null?null:{id:wi,overflow:Ti},retryLane:536870912,hydrationErrors:null},l=li(18,null,null,0),l.stateNode=c,l.return=t,t.child=l,Ai=t,ji=null,l=!0)}l||Fi(t)}if(c=t.memoizedState,c!==null&&(c=c.dehydrated,c!==null))return Hd(c)?t.lanes=32:t.lanes=536870912,null;Ms(t)}return c=r.children,r=r.fallback,a?(js(t),a=t.mode,c=mc({mode:`hidden`,children:c},a),r=mi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,a=t.child,a.memoizedState=uc(n),a.childLanes=dc(e,s,n),t.memoizedState=lc,r):(ks(t),pc(t,c))}if(l=e.memoizedState,l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(ks(t),t.flags&=-257,t=hc(e,t,n)):t.memoizedState===null?(js(t),a=r.fallback,c=t.mode,r=mc({mode:`visible`,children:r.children},c),a=mi(a,c,n,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,Ts(t,e.child,null,n),r=t.child,r.memoizedState=uc(n),r.childLanes=dc(e,s,n),t.memoizedState=lc,t=a):(js(t),t.child=e.child,t.flags|=128,t=null);else if(ks(t),Hd(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,Vi({value:r,source:null,stack:null}),t=hc(e,t,n)}else if(Zs||Yi(e,t,n,!1),s=(n&e.childLanes)!==0,Zs||s){if(s=q,s!==null&&(r=n&-n,r=r&42?1:tt(r),r=(r&(s.suspendedLanes|n))===0?r:0,r!==0&&r!==l.retryLane))throw l.retryLane=r,ii(e,r),ru(s,e,r),Xs;c.data===`$?`||mu(),t=hc(e,t,n)}else c.data===`$?`?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,ji=Wd(c.nextSibling),Ai=t,L=!0,Mi=null,Ni=!1,e!==null&&(xi[Si++]=wi,xi[Si++]=Ti,xi[Si++]=Ci,wi=e.id,Ti=e.overflow,Ci=t),t=pc(t,r.children),t.flags|=4096);return t}return a?(js(t),a=r.fallback,c=t.mode,l=e.child,u=l.sibling,r=di(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(a=mi(a,c,n,null),a.flags|=2):a=di(u,a),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,c=e.child.memoizedState,c===null?c=uc(n):(l=c.cachePool,l===null?l=pa():(u=ra._currentValue,l=l.parent===u?l:{parent:u,pool:u}),c={baseLanes:c.baseLanes|n,cachePool:l}),a.memoizedState=c,a.childLanes=dc(e,s,n),t.memoizedState=lc,r):(ks(t),n=e.child,e=n.sibling,n=di(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function pc(e,t){return t=mc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function mc(e,t){return e=li(22,e,null,t),e.lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function hc(e,t,n){return Ts(t,e.child,null,n),e=pc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function gc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),qi(e.return,t,n)}function _c(e,t,n,r,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=i)}function vc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;if(Qs(e,t,r.children,n),r=Ns.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&gc(e,n,t);else if(e.tag===19)gc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}switch(A(Ns,r),i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Ps(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),_c(t,!1,i,n,a);break;case`backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Ps(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}_c(t,!0,n,null,a);break;case`together`:_c(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function yc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Pl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Yi(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=di(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=di(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function bc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&Xi(e))):!0}function xc(e,t,n){switch(t.tag){case 3:_e(t,t.stateNode.containerInfo),Gi(t,ra,e.memoizedState.cache),zi();break;case 27:case 5:ye(t);break;case 4:_e(t,t.stateNode.containerInfo);break;case 10:Gi(t,t.type,t.memoizedProps.value);break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(ks(t),e=yc(e,t,n),e===null?null:e.sibling):fc(e,t,n):(ks(t),t.flags|=128,null);ks(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(Yi(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return vc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),A(Ns,Ns.current),r)break;return null;case 22:case 23:return t.lanes=0,nc(e,t,n);case 24:Gi(t,ra,e.memoizedState.cache)}return yc(e,t,n)}function Sc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Zs=!0;else{if(!bc(e,n)&&!(t.flags&128))return Zs=!1,xc(e,t,n);Zs=!!(e.flags&131072)}else Zs=!1,L&&t.flags&1048576&&Di(t,bi,t.index);switch(t.lanes=0,t.tag){case 16:a:{e=t.pendingProps;var r=t.elementType,a=r._init;if(r=a(r._payload),t.type=r,typeof r==`function`)ui(r)?(e=zs(r,e),t.tag=1,t=sc(null,t,r,e,n)):(t.tag=0,t=ac(null,t,r,e,n));else{if(r!=null){if(a=r.$$typeof,a===w){t.tag=11,t=$s(null,t,r,e,n);break a}else if(a===ee){t.tag=14,t=ec(null,t,r,e,n);break a}}throw t=oe(r)||r,Error(i(306,t,``))}}return t;case 0:return ac(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=zs(r,t.pendingProps),sc(e,t,r,a,n);case 3:a:{if(_e(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ea(e,t),Na(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Gi(t,ra,r),r!==o.cache&&Ji(t,[ra],n,!0),Ma(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=cc(e,t,r,n);break a}else if(r!==a){a=Zr(Error(i(424)),t),Vi(a),t=cc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(ji=Wd(e.firstChild),Ai=t,L=!0,Mi=null,Ni=!0,n=Es(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(zi(),r===a){t=yc(e,t,n);break a}Qs(e,t,r,n)}t=t.child}return t;case 26:return ic(e,t),e===null?(n=df(t.type,null,t.pendingProps,null))?t.memoizedState=n:L||(n=t.type,e=t.pendingProps,r=Ed(he.current).createElement(n),r[ot]=t,r[st]=e,Sd(r,n,e),yt(r),t.stateNode=r):t.memoizedState=df(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ye(t),e===null&&L&&(r=t.stateNode=qd(t.type,t.pendingProps,he.current),Ai=t,Ni=!0,a=ji,Ld(t.type)?(Gd=a,ji=Wd(r.firstChild)):ji=a),Qs(e,t,t.pendingProps.children,n),ic(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&L&&((a=r=ji)&&(r=Bd(r,t.type,t.pendingProps,Ni),r===null?a=!1:(t.stateNode=r,Ai=t,ji=Wd(r.firstChild),Ni=!1,a=!0)),a||Fi(t)),ye(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,kd(a,o)?r=null:s!==null&&kd(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Qa(e,t,to,null,null,n),Ff._currentValue=a),ic(e,t),Qs(e,t,r,n),t.child;case 6:return e===null&&L&&((e=n=ji)&&(n=Vd(n,t.pendingProps,Ni),n===null?e=!1:(t.stateNode=n,Ai=t,ji=null,e=!0)),e||Fi(t)),null;case 13:return fc(e,t,n);case 4:return _e(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ts(t,null,r,n):Qs(e,t,r,n),t.child;case 11:return $s(e,t,t.type,t.pendingProps,n);case 7:return Qs(e,t,t.pendingProps,n),t.child;case 8:return Qs(e,t,t.pendingProps.children,n),t.child;case 12:return Qs(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Gi(t,t.type,r.value),Qs(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Zi(t),a=R(a),r=r(a),t.flags|=1,Qs(e,t,r,n),t.child;case 14:return ec(e,t,t.type,t.pendingProps,n);case 15:return tc(e,t,t.type,t.pendingProps,n);case 19:return vc(e,t,n);case 31:return r=t.pendingProps,n=t.mode,r={mode:r.mode,children:r.children},e===null?(n=mc(r,n),n.ref=t.ref,t.child=n,n.return=t,t=n):(n=di(e.child,r),n.ref=t.ref,t.child=n,n.return=t,t=n),t;case 22:return nc(e,t,n);case 24:return Zi(t),r=R(ra),e===null?(a=da(),a===null&&(a=q,o=z(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},Ta(t),Gi(t,ra,a)):((e.lanes&n)!==0&&(Ea(e,t),Na(t,null,null,n),Ma()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Gi(t,ra,r),r!==a.cache&&Ji(t,[ra],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Gi(t,ra,r))),Qs(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Cc(e){e.flags|=4}function wc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ef(t)){if(t=Ds.current,t!==null&&((Y&4194048)===Y?Os!==null:(Y&62914560)!==Y&&!(Y&536870912)||t!==Os))throw xa=_a,ha;e.flags|=8192}}function Tc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Ye(),e.lanes|=t,Rl|=t)}function Ec(e,t){if(!L)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Dc(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Oc(e,t,n){var r=t.pendingProps;switch(ki(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Dc(t),null;case 1:return Dc(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Ki(ra),ve(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ri(t)?Cc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Bi())),Dc(t),null;case 26:return n=t.memoizedState,e===null?(Cc(t),n===null?(Dc(t),t.flags&=-16777217):(Dc(t),wc(t,n))):n?n===e.memoizedState?(Dc(t),t.flags&=-16777217):(Cc(t),Dc(t),wc(t,n)):(e.memoizedProps!==r&&Cc(t),Dc(t),t.flags&=-16777217),null;case 27:be(t),n=he.current;var a=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Cc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Dc(t),null}e=pe.current,Ri(t)?Ii(t,e):(e=qd(a,r,n),t.stateNode=e,Cc(t))}return Dc(t),null;case 5:if(be(t),n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Cc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Dc(t),null}if(e=pe.current,Ri(t))Ii(t,e);else{switch(a=Ed(he.current),e){case 1:e=a.createElementNS(`http://www.w3.org/2000/svg`,n);break;case 2:e=a.createElementNS(`http://www.w3.org/1998/Math/MathML`,n);break;default:switch(n){case`svg`:e=a.createElementNS(`http://www.w3.org/2000/svg`,n);break;case`math`:e=a.createElementNS(`http://www.w3.org/1998/Math/MathML`,n);break;case`script`:e=a.createElement(`div`),e.innerHTML=`<script><\/script>`,e=e.removeChild(e.firstChild);break;case`select`:e=typeof r.is==`string`?a.createElement(`select`,{is:r.is}):a.createElement(`select`),r.multiple?e.multiple=!0:r.size&&(e.size=r.size);break;default:e=typeof r.is==`string`?a.createElement(n,{is:r.is}):a.createElement(n)}}e[ot]=t,e[st]=r;a:for(a=t.child;a!==null;){if(a.tag===5||a.tag===6)e.appendChild(a.stateNode);else if(a.tag!==4&&a.tag!==27&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===t)break a;for(;a.sibling===null;){if(a.return===null||a.return===t)break a;a=a.return}a.sibling.return=a.return,a=a.sibling}t.stateNode=e;a:switch(Sd(e,n,r),n){case`button`:case`input`:case`select`:case`textarea`:e=!!r.autoFocus;break a;case`img`:e=!0;break a;default:e=!1}e&&Cc(t)}}return Dc(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Cc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=he.current,Ri(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Ai,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[ot]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||yd(e.nodeValue,n)),e||Fi(t)}else e=Ed(e).createTextNode(r),e[ot]=t,t.stateNode=e}return Dc(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Ri(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[ot]=t}else zi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Dc(t),a=!1}else a=Bi(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Ms(t),t):(Ms(t),null)}if(Ms(t),t.flags&128)return t.lanes=n,t;if(n=r!==null,e=e!==null&&e.memoizedState!==null,n){r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool);var o=null;r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)}return n!==e&&n&&(t.child.flags|=8192),Tc(t,t.updateQueue),Dc(t),null;case 4:return ve(),e===null&&ld(t.stateNode.containerInfo),Dc(t),null;case 10:return Ki(t.type),Dc(t),null;case 19:if(fe(Ns),a=t.memoizedState,a===null)return Dc(t),null;if(r=(t.flags&128)!=0,o=a.rendering,o===null)if(r)Ec(a,!1);else{if(Nl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Ps(e),o!==null){for(t.flags|=128,Ec(a,!1),e=o.updateQueue,t.updateQueue=e,Tc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)fi(n,e),n=n.sibling;return A(Ns,Ns.current&1|2),t.child}e=e.sibling}a.tail!==null&&Ee()>Ul&&(t.flags|=128,r=!0,Ec(a,!1),t.lanes=4194304)}else{if(!r)if(e=Ps(o),e!==null){if(t.flags|=128,r=!0,e=e.updateQueue,t.updateQueue=e,Tc(t,e),Ec(a,!0),a.tail===null&&a.tailMode===`hidden`&&!o.alternate&&!L)return Dc(t),null}else 2*Ee()-a.renderingStartTime>Ul&&n!==536870912&&(t.flags|=128,r=!0,Ec(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(e=a.last,e===null?t.child=o:e.sibling=o,a.last=o)}return a.tail===null?(Dc(t),null):(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=Ee(),t.sibling=null,e=Ns.current,A(Ns,r?e&1|2:e&1),t);case 22:case 23:return Ms(t),Ba(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Dc(t),t.subtreeFlags&6&&(t.flags|=8192)):Dc(t),n=t.updateQueue,n!==null&&Tc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&fe(ua),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Ki(ra),Dc(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function kc(e,t){switch(ki(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ki(ra),ve(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return be(t),null;case 13:if(Ms(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));zi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return fe(Ns),null;case 4:return ve(),null;case 10:return Ki(t.type),null;case 22:case 23:return Ms(t),Ba(),e!==null&&fe(ua),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ki(ra),null;case 25:return null;default:return null}}function Ac(e,t){switch(ki(t),t.tag){case 3:Ki(ra),ve();break;case 26:case 27:case 5:be(t);break;case 4:ve();break;case 13:Ms(t);break;case 19:fe(Ns);break;case 10:Ki(t.type);break;case 22:case 23:Ms(t),Ba(),e!==null&&fe(ua);break;case 24:Ki(ra)}}function jc(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Mc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Nc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Fa(t,n)}catch(t){Z(e,e.return,t)}}}function Pc(e,t,n){n.props=zs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Fc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Ic(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Lc(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Rc(e,t,n){try{var r=e.stateNode;Cd(r,e.type,n,t),r[st]=t}catch(t){Z(e,e.return,t)}}function zc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ld(e.type)||e.tag===4}function Bc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||zc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ld(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Vc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=bd));else if(r!==4&&(r===27&&Ld(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Vc(e,t,n),e=e.sibling;e!==null;)Vc(e,t,n),e=e.sibling}function Hc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Ld(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Hc(e,t,n),e=e.sibling;e!==null;)Hc(e,t,n),e=e.sibling}function Uc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Sd(t,r,n),t[ot]=e,t[st]=n}catch(t){Z(e,e.return,t)}}var Wc=!1,Gc=!1,Kc=!1,qc=typeof WeakSet==`function`?WeakSet:Set,Jc=null;function Yc(e,t){if(e=e.containerInfo,wd=Uf,e=Dr(e),Or(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(Td={focusedElem:e,selectionRange:n},Uf=!1,Jc=t;Jc!==null;)if(t=Jc,e=t.child,t.subtreeFlags&1024&&e!==null)e.return=t,Jc=e;else for(;Jc!==null;){switch(t=Jc,o=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=zs(n.type,a,n.elementType===n.type);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)zd(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:zd(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,Jc=e;break}Jc=t.return}}function Xc(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:ll(e,n),r&4&&jc(5,n);break;case 1:if(ll(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=zs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Nc(n),r&512&&Fc(n,n.return);break;case 3:if(ll(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Fa(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Uc(n);case 26:case 5:ll(e,n),t===null&&r&4&&Lc(n),r&512&&Fc(n,n.return);break;case 12:ll(e,n);break;case 13:ll(e,n),r&4&&tl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Fu.bind(null,n),Ud(e,n))));break;case 22:if(r=n.memoizedState!==null||Wc,!r){t=t!==null&&t.memoizedState!==null||Gc,i=Wc;var a=Gc;Wc=r,(Gc=t)&&!a?dl(e,n,(n.subtreeFlags&8772)!=0):ll(e,n),Wc=i,Gc=a}break;case 30:break;default:ll(e,n)}}function Zc(e){var t=e.alternate;t!==null&&(e.alternate=null,Zc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&mt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var G=null,Qc=!1;function $c(e,t,n){for(n=n.child;n!==null;)el(e,t,n),n=n.sibling}function el(e,t,n){if(Ie&&typeof Ie.onCommitFiberUnmount==`function`)try{Ie.onCommitFiberUnmount(Fe,n)}catch{}switch(n.tag){case 26:Gc||Ic(n,t),$c(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Gc||Ic(n,t);var r=G,i=Qc;Ld(n.type)&&(G=n.stateNode,Qc=!1),$c(e,t,n),Jd(n.stateNode),G=r,Qc=i;break;case 5:Gc||Ic(n,t);case 6:if(r=G,i=Qc,G=null,$c(e,t,n),G=r,Qc=i,G!==null)if(Qc)try{(G.nodeType===9?G.body:G.nodeName===`HTML`?G.ownerDocument.body:G).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{G.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:G!==null&&(Qc?(e=G,Rd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),hp(e)):Rd(G,n.stateNode));break;case 4:r=G,i=Qc,G=n.stateNode.containerInfo,Qc=!0,$c(e,t,n),G=r,Qc=i;break;case 0:case 11:case 14:case 15:Gc||Mc(2,n,t),Gc||Mc(4,n,t),$c(e,t,n);break;case 1:Gc||(Ic(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Pc(n,t,r)),$c(e,t,n);break;case 21:$c(e,t,n);break;case 22:Gc=(r=Gc)||n.memoizedState!==null,$c(e,t,n),Gc=r;break;default:$c(e,t,n)}}function tl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{hp(e)}catch(e){Z(t,t.return,e)}}function nl(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new qc),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new qc),t;default:throw Error(i(435,e.tag))}}function rl(e,t){var n=nl(e);t.forEach(function(t){var r=Iu.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))})}function il(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Ld(c.type)){G=c.stateNode,Qc=!1;break a}break;case 5:G=c.stateNode,Qc=!1;break a;case 3:case 4:G=c.stateNode.containerInfo,Qc=!0;break a}c=c.return}if(G===null)throw Error(i(160));el(o,s,a),G=null,Qc=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)ol(t,e),t=t.sibling}var al=null;function ol(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:il(t,e),sl(e),r&4&&(Mc(3,e,e.return),jc(3,e),Mc(5,e,e.return));break;case 1:il(t,e),sl(e),r&512&&(Gc||n===null||Ic(n,n.return)),r&64&&Wc&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=al;if(il(t,e),sl(e),r&512&&(Gc||n===null||Ic(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[pt]||o[ot]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Sd(o,r,n),o[ot]=e,yt(o),r=o;break a;case`link`:var s=Cf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Sd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Cf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Sd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[ot]=e,yt(o),r=o}e.stateNode=r}else wf(a,e.type,e.stateNode);else e.stateNode=vf(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&Rc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?wf(a,e.type,e.stateNode):vf(a,r,e.memoizedProps))}break;case 27:il(t,e),sl(e),r&512&&(Gc||n===null||Ic(n,n.return)),n!==null&&r&4&&Rc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(il(t,e),sl(e),r&512&&(Gc||n===null||Ic(n,n.return)),e.flags&32){a=e.stateNode;try{Yt(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Rc(e,a,n===null?a:n.memoizedProps)),r&1024&&(Kc=!0);break;case 6:if(il(t,e),sl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Sf=null,a=al,al=Zd(t.containerInfo),il(t,e),al=a,sl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{hp(t.containerInfo)}catch(t){Z(e,e.return,t)}Kc&&(Kc=!1,cl(e));break;case 4:r=al,al=Zd(e.stateNode.containerInfo),il(t,e),sl(e),al=r;break;case 12:il(t,e),sl(e);break;case 13:il(t,e),sl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Hl=Ee()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,rl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=Wc,d=Gc;if(Wc=u||a,Gc=d||l,il(t,e),Gc=d,Wc=u,sl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Wc||Gc||ul(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,rl(e,n))));break;case 19:il(t,e),sl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,rl(e,r)));break;case 30:break;case 21:break;default:il(t,e),sl(e)}}function sl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(zc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Hc(e,Bc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Yt(o,``),n.flags&=-33),Hc(e,Bc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Vc(e,Bc(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function cl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;cl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function ll(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Xc(e,t.alternate,t),t=t.sibling}function ul(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Mc(4,t,t.return),ul(t);break;case 1:Ic(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Pc(t,t.return,n),ul(t);break;case 27:Jd(t.stateNode);case 26:case 5:Ic(t,t.return),ul(t);break;case 22:t.memoizedState===null&&ul(t);break;case 30:ul(t);break;default:ul(t)}e=e.sibling}}function dl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:dl(i,a,n),jc(4,a);break;case 1:if(dl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Pa(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Nc(a),Fc(a,a.return);break;case 27:Uc(a);case 26:case 5:dl(i,a,n),n&&r===null&&o&4&&Lc(a),Fc(a,a.return);break;case 12:dl(i,a,n);break;case 13:dl(i,a,n),n&&o&4&&tl(i,a);break;case 22:a.memoizedState===null&&dl(i,a,n),Fc(a,a.return);break;case 30:break;default:dl(i,a,n)}t=t.sibling}}function fl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&B(n))}function pl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&B(e))}function ml(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)hl(e,t,n,r),t=t.sibling}function hl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:ml(e,t,n,r),i&2048&&jc(9,t);break;case 1:ml(e,t,n,r);break;case 3:ml(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&B(e)));break;case 12:if(i&2048){ml(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else ml(e,t,n,r);break;case 13:ml(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?ml(e,t,n,r):(a._visibility|=2,gl(e,t,n,r,(t.subtreeFlags&10256)!=0)):a._visibility&2?ml(e,t,n,r):_l(e,t),i&2048&&fl(o,t);break;case 24:ml(e,t,n,r),i&2048&&pl(t.alternate,t);break;default:ml(e,t,n,r)}}function gl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:gl(a,o,s,c,i),jc(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,gl(a,o,s,c,i)):u._visibility&2?gl(a,o,s,c,i):_l(a,o),i&&l&2048&&fl(o.alternate,o);break;case 24:gl(a,o,s,c,i),i&&l&2048&&pl(o.alternate,o);break;default:gl(a,o,s,c,i)}t=t.sibling}}function _l(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:_l(n,r),i&2048&&fl(r.alternate,r);break;case 24:_l(n,r),i&2048&&pl(r.alternate,r);break;default:_l(n,r)}t=t.sibling}}var vl=8192;function yl(e){if(e.subtreeFlags&vl)for(e=e.child;e!==null;)bl(e),e=e.sibling}function bl(e){switch(e.tag){case 26:yl(e),e.flags&vl&&e.memoizedState!==null&&kf(al,e.memoizedState,e.memoizedProps);break;case 5:yl(e);break;case 3:case 4:var t=al;al=Zd(e.stateNode.containerInfo),yl(e),al=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=vl,vl=16777216,yl(e),vl=t):yl(e));break;default:yl(e)}}function xl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Sl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];Jc=r,Tl(r,e)}xl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Cl(e),e=e.sibling}function Cl(e){switch(e.tag){case 0:case 11:case 15:Sl(e),e.flags&2048&&Mc(9,e,e.return);break;case 3:Sl(e);break;case 12:Sl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,wl(e)):Sl(e);break;default:Sl(e)}}function wl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];Jc=r,Tl(r,e)}xl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Mc(8,t,t.return),wl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,wl(t));break;default:wl(t)}e=e.sibling}}function Tl(e,t){for(;Jc!==null;){var n=Jc;switch(n.tag){case 0:case 11:case 15:Mc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:B(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,Jc=r;else a:for(n=e;Jc!==null;){r=Jc;var i=r.sibling,a=r.return;if(Zc(r),r===n){Jc=null;break a}if(i!==null){i.return=a,Jc=i;break a}Jc=a}}}var El={getCacheForType:function(e){var t=R(ra),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n}},Dl=typeof WeakMap==`function`?WeakMap:Map,K=0,q=null,J=null,Y=0,X=0,Ol=null,kl=!1,Al=!1,jl=!1,Ml=0,Nl=0,Pl=0,Fl=0,Il=0,Ll=0,Rl=0,zl=null,Bl=null,Vl=!1,Hl=0,Ul=1/0,Wl=null,Gl=null,Kl=0,ql=null,Jl=null,Yl=0,Xl=0,Zl=null,Ql=null,$l=0,eu=null;function tu(){if(K&2&&Y!==0)return Y&-Y;if(O.T!==null){var e=aa;return e===0?Qu():e}return rt()}function nu(){Ll===0&&(Ll=!(Y&536870912)||L?Je():536870912);var e=Ds.current;return e!==null&&(e.flags|=32),Ll}function ru(e,t,n){(e===q&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(uu(e,0),su(e,Y,Ll,!1)),Ze(e,n),(!(K&2)||e!==q)&&(e===q&&(!(K&2)&&(Fl|=n),Nl===4&&su(e,Y,Ll,!1)),Wu(e))}function iu(e,t,n){if(K&6)throw Error(i(327));var r=!n&&(t&124)==0&&(t&e.expiredLanes)===0||Ke(e,t),a=r?_u(e,t):hu(e,t,!0),o=r;do{if(a===0){Al&&!r&&su(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!ou(n)){a=hu(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=zl;var l=c.current.memoizedState.isDehydrated;if(l&&(uu(c,s).flags|=256),s=hu(c,s,!1),s!==2){if(jl&&!l){c.errorRecoveryDisabledLanes|=o,Fl|=o,a=4;break a}o=Bl,Bl=a,o!==null&&(Bl===null?Bl=o:Bl.push.apply(Bl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){uu(e,0),su(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:su(r,t,Ll,!kl);break a;case 2:Bl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=Hl+300-Ee(),10<a)){if(su(r,t,Ll,!kl),Ge(r,0,!0)!==0)break a;r.timeoutHandle=Md(au.bind(null,r,n,Bl,Wl,Vl,t,Ll,Fl,Rl,kl,o,2,-0,0),a);break a}au(r,n,Bl,Wl,Vl,t,Ll,Fl,Rl,kl,o,0,-0,0)}}break}while(1);Wu(e)}function au(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,(d&8192||(d&16785408)==16785408)&&(Df={stylesheets:null,count:0,unsuspend:Of},bl(t),d=Af(),d!==null)){e.cancelPendingCommit=d(wu.bind(null,e,t,a,n,r,i,o,s,c,u,1,f,p)),su(e,a,o,!l);return}wu(e,t,a,n,r,i,o,s,c)}function ou(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!F(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function su(e,t,n,r){t&=~Il,t&=~Fl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Re(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&$e(e,n,t)}function cu(){return K&6?!0:(Gu(0,!1),!1)}function lu(){if(J!==null){if(X===0)var e=J.return;else e=J,Wi=Ui=null,io(e),vs=null,ys=0,e=J;for(;e!==null;)Ac(e.alternate,e),e=e.return;J=null}}function uu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,Nd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),lu(),q=e,J=n=di(e.current,null),Y=t,X=0,Ol=null,kl=!1,Al=Ke(e,t),jl=!1,Rl=Ll=Il=Fl=Pl=Nl=0,Bl=zl=null,Vl=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-Re(r),a=1<<i;t|=e[i],r&=~a}return Ml=t,ti(),n}function du(e,t){U=null,O.H=ms,t===ma||t===ga?(t=Sa(),X=3):t===ha?(t=Sa(),X=4):X=t===Xs?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Ol=t,J===null&&(Nl=1,Ws(e,Zr(t,e.current)))}function fu(){var e=O.H;return O.H=ms,e===null?ms:e}function pu(){var e=O.A;return O.A=El,e}function mu(){Nl=4,kl||(Y&4194048)!==Y&&Ds.current!==null||(Al=!0),!(Pl&134217727)&&!(Fl&134217727)||q===null||su(q,Y,Ll,!1)}function hu(e,t,n){var r=K;K|=2;var i=fu(),a=pu();(q!==e||Y!==t)&&(Wl=null,uu(e,t)),t=!1;var o=Nl;a:do try{if(X!==0&&J!==null){var s=J,c=Ol;switch(X){case 8:lu(),o=6;break a;case 3:case 2:case 9:case 6:Ds.current===null&&(t=!0);var l=X;if(X=0,Ol=null,xu(e,s,c,l),n&&Al){o=0;break a}break;default:l=X,X=0,Ol=null,xu(e,s,c,l)}}gu(),o=Nl;break}catch(t){du(e,t)}while(1);return t&&e.shellSuspendCounter++,Wi=Ui=null,K=r,O.H=i,O.A=a,J===null&&(q=null,Y=0,ti()),o}function gu(){for(;J!==null;)yu(J)}function _u(e,t){var n=K;K|=2;var r=fu(),a=pu();q!==e||Y!==t?(Wl=null,Ul=Ee()+500,uu(e,t)):Al=Ke(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=Ol;b:switch(X){case 1:X=0,Ol=null,xu(e,t,o,1);break;case 2:case 9:if(va(o)){X=0,Ol=null,bu(t);break}t=function(){X!==2&&X!==9||q!==e||(X=7),Wu(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:va(o)?(X=0,Ol=null,bu(t)):(X=0,Ol=null,xu(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(!s||Ef(s)){X=0,Ol=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,Su(u))}break b}}X=0,Ol=null,xu(e,t,o,5);break;case 6:X=0,Ol=null,xu(e,t,o,6);break;case 8:lu(),Nl=6;break a;default:throw Error(i(462))}}vu();break}catch(t){du(e,t)}while(1);return Wi=Ui=null,O.H=r,O.A=a,K=n,J===null?(q=null,Y=0,ti(),Nl):0}function vu(){for(;J!==null&&!we();)yu(J)}function yu(e){var t=Sc(e.alternate,e,Ml);e.memoizedProps=e.pendingProps,t===null?Su(e):J=t}function bu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=oc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=oc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:io(t);default:Ac(n,t),t=J=fi(t,Ml),t=Sc(n,t,Ml)}e.memoizedProps=e.pendingProps,t===null?Su(e):J=t}function xu(e,t,n,r){Wi=Ui=null,io(t),vs=null,ys=0;var i=t.return;try{if(Ys(e,i,t,n,Y)){Nl=1,Ws(e,Zr(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;Nl=1,Ws(e,Zr(n,e.current)),J=null;return}t.flags&32768?(L||r===1?e=!0:Al||Y&536870912?e=!1:(kl=e=!0,(r===2||r===9||r===3||r===6)&&(r=Ds.current,r!==null&&r.tag===13&&(r.flags|=16384))),Cu(t,e)):Su(t)}function Su(e){var t=e;do{if(t.flags&32768){Cu(t,kl);return}e=t.return;var n=Oc(t.alternate,t,Ml);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);Nl===0&&(Nl=5)}function Cu(e,t){do{var n=kc(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);Nl=6,J=null}function wu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do ku();while(Kl!==0);if(K&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=ei,Qe(e,n,o,s,c,l),e===q&&(J=q=null,Y=0),Jl=t,ql=e,Yl=n,Xl=o,Zl=a,Ql=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Lu(Ae,function(){return Au(!0),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=O.T,O.T=null,a=k.p,k.p=2,s=K,K|=4;try{Yc(e,t,n)}finally{K=s,k.p=a,O.T=r}}Kl=1,Tu(),Eu(),Du()}}function Tu(){if(Kl===1){Kl=0;var e=ql,t=Jl,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=O.T,O.T=null;var r=k.p;k.p=2;var i=K;K|=4;try{ol(t,e);var a=Td,o=Dr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Er(s.ownerDocument.documentElement,s)){if(c!==null&&Or(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Tr(s,h),v=Tr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}Uf=!!wd,Td=wd=null}finally{K=i,k.p=r,O.T=n}}e.current=t,Kl=2}}function Eu(){if(Kl===2){Kl=0;var e=ql,t=Jl,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=O.T,O.T=null;var r=k.p;k.p=2;var i=K;K|=4;try{Xc(e,t.alternate,t)}finally{K=i,k.p=r,O.T=n}}Kl=3}}function Du(){if(Kl===4||Kl===3){Kl=0,Te();var e=ql,t=Jl,n=Yl,r=Ql;t.subtreeFlags&10256||t.flags&10256?Kl=5:(Kl=0,Jl=ql=null,Ou(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(Gl=null),nt(n),t=t.stateNode,Ie&&typeof Ie.onCommitFiberRoot==`function`)try{Ie.onCommitFiberRoot(Fe,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=O.T,i=k.p,k.p=2,O.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{O.T=t,k.p=i}}Yl&3&&ku(),Wu(e),i=e.pendingLanes,n&4194090&&i&42?e===eu?$l++:($l=0,eu=e):$l=0,Gu(0,!1)}}function Ou(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,B(t)))}function ku(e){return Tu(),Eu(),Du(),Au(e)}function Au(){if(Kl!==5)return!1;var e=ql,t=Xl;Xl=0;var n=nt(Yl),r=O.T,a=k.p;try{k.p=32>n?32:n,O.T=null,n=Zl,Zl=null;var o=ql,s=Yl;if(Kl=0,Jl=ql=null,Yl=0,K&6)throw Error(i(331));var c=K;if(K|=4,Cl(o.current),hl(o,o.current,s,n),K=c,Gu(0,!1),Ie&&typeof Ie.onPostCommitFiberRoot==`function`)try{Ie.onPostCommitFiberRoot(Fe,o)}catch{}return!0}finally{k.p=a,O.T=r,Ou(e,t)}}function ju(e,t,n){t=Zr(n,t),t=Ks(e.stateNode,t,2),e=Oa(e,t,2),e!==null&&(Ze(e,2),Wu(e))}function Z(e,t,n){if(e.tag===3)ju(e,e,n);else for(;t!==null;){if(t.tag===3){ju(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(Gl===null||!Gl.has(r))){e=Zr(n,e),n=qs(2),r=Oa(t,n,2),r!==null&&(Js(n,r,t,e),Ze(r,2),Wu(r));break}}t=t.return}}function Mu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Dl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(jl=!0,i.add(n),e=Nu.bind(null,e,t,n),t.then(e,e))}function Nu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,q===e&&(Y&n)===n&&(Nl===4||Nl===3&&(Y&62914560)===Y&&300>Ee()-Hl?!(K&2)&&uu(e,0):Il|=n,Rl===Y&&(Rl=0)),Wu(e)}function Pu(e,t){t===0&&(t=Ye()),e=ii(e,t),e!==null&&(Ze(e,t),Wu(e))}function Fu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Pu(e,n)}function Iu(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Pu(e,n)}function Lu(e,t){return Se(e,t)}var Ru=null,zu=null,Bu=!1,Vu=!1,Hu=!1,Uu=0;function Wu(e){e!==zu&&e.next===null&&(zu===null?Ru=zu=e:zu=zu.next=e),Vu=!0,Bu||(Bu=!0,Zu())}function Gu(e,t){if(!Hu&&Vu){Hu=!0;do for(var n=!1,r=Ru;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Re(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Xu(r,a))}else a=Y,a=Ge(r,r===q?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Ke(r,a)||(n=!0,Xu(r,a));r=r.next}while(n);Hu=!1}}function Ku(){qu()}function qu(){Vu=Bu=!1;var e=0;Uu!==0&&(jd()&&(e=Uu),Uu=0);for(var t=Ee(),n=null,r=Ru;r!==null;){var i=r.next,a=Ju(r,t);a===0?(r.next=null,n===null?Ru=i:n.next=i,i===null&&(zu=n)):(n=r,(e!==0||a&3)&&(Vu=!0)),r=i}Gu(e,!1)}function Ju(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Re(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=qe(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=q,n=Y,n=Ge(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Ce(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Ke(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Ce(r),nt(n)){case 2:case 8:n=ke;break;case 32:n=Ae;break;case 268435456:n=Me;break;default:n=Ae}return r=Yu.bind(null,e),n=Se(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Ce(r),e.callbackPriority=2,e.callbackNode=null,2}function Yu(e,t){if(Kl!==0&&Kl!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(ku(!0)&&e.callbackNode!==n)return null;var r=Y;return r=Ge(e,e===q?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(iu(e,r,t),Ju(e,Ee()),e.callbackNode!=null&&e.callbackNode===n?Yu.bind(null,e):null)}function Xu(e,t){if(ku())return null;iu(e,t,!0)}function Zu(){Fd(function(){K&6?Se(Oe,Ku):qu()})}function Qu(){return Uu===0&&(Uu=Je()),Uu}function $u(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:nn(``+e)}function ed(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function td(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=$u((i[st]||null).action),o=r.submitter;o&&(t=(t=o[st]||null)?$u(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new wn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Uu!==0){var e=o?ed(i,o):new FormData(i);es(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?ed(i,o):new FormData(i),es(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var nd=0;nd<Jr.length;nd++){var rd=Jr[nd];Yr(rd.toLowerCase(),`on`+(rd[0].toUpperCase()+rd.slice(1)))}Yr(Br,`onAnimationEnd`),Yr(Vr,`onAnimationIteration`),Yr(Hr,`onAnimationStart`),Yr(`dblclick`,`onDoubleClick`),Yr(`focusin`,`onFocus`),Yr(`focusout`,`onBlur`),Yr(Ur,`onTransitionRun`),Yr(Wr,`onTransitionStart`),Yr(Gr,`onTransitionCancel`),Yr(Kr,`onTransitionEnd`),Ct(`onMouseEnter`,[`mouseout`,`mouseover`]),Ct(`onMouseLeave`,[`mouseout`,`mouseover`]),Ct(`onPointerEnter`,[`pointerout`,`pointerover`]),Ct(`onPointerLeave`,[`pointerout`,`pointerover`]),St(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),St(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),St(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),St(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),St(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),St(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var id=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),ad=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(id));function od(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Bs(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Bs(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[lt];n===void 0&&(n=t[lt]=new Set);var r=e+`__bubble`;n.has(r)||(ud(t,e,2,!1),n.add(r))}function sd(e,t,n){var r=0;t&&(r|=4),ud(n,e,r,t)}var cd=`_reactListening`+Math.random().toString(36).slice(2);function ld(e){if(!e[cd]){e[cd]=!0,bt.forEach(function(t){t!==`selectionchange`&&(ad.has(t)||sd(t,!1,e),sd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[cd]||(t[cd]=!0,sd(`selectionchange`,!1,t))}}function ud(e,t,n,r){switch(Xf(t)){case 2:var i=Wf;break;case 8:i=Gf;break;default:i=Kf}n=i.bind(null,t,n,e),i=void 0,!pn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function dd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=ht(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}un(function(){var r=a,i=an(n),s=[];a:{var c=qr.get(e);if(c!==void 0){var l=wn,u=e;switch(e){case`keypress`:if(yn(n)===0)break a;case`keydown`:case`keyup`:l=Hn;break;case`focusin`:u=`focus`,l=Nn;break;case`focusout`:u=`blur`,l=Nn;break;case`beforeblur`:case`afterblur`:l=Nn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=jn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Mn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Wn;break;case Br:case Vr:case Hr:l=Pn;break;case Kr:l=Gn;break;case`scroll`:case`scrollend`:l=En;break;case`wheel`:l=Kn;break;case`copy`:case`cut`:case`paste`:l=Fn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Un;break;case`toggle`:case`beforetoggle`:l=qn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=dn(m,p),g!=null&&d.push(fd(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==rn&&(u=n.relatedTarget||n.fromElement)&&(ht(u)||u[ct]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?ht(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=jn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Un,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:_t(l),h=u==null?c:_t(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,ht(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=l,p=u,m=0,h=d;h;h=md(h))m++;for(h=0,g=p;g;g=md(g))h++;for(;0<m-h;)d=md(d),m--;for(;0<h-m;)p=md(p),h--;for(;m--;){if(d===p||p!==null&&d===p.alternate)break b;d=md(d),p=md(p)}d=null}else d=null;l!==null&&hd(s,c,l,d,!1),u!==null&&f!==null&&hd(s,f,u,d,!0)}}a:{if(c=r?_t(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=pr;else if(sr(c))if(mr)_=Sr;else{_=xr;var v=br}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&$t(r.elementType)&&(_=pr):_=P;if(_&&=_(e,r)){cr(s,_,n,i);break a}v&&v(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&Kt(c,`number`,c.value)}switch(v=r?_t(r):window,e){case`focusin`:(sr(v)||v.contentEditable===`true`)&&(Ar=v,jr=r,Mr=null);break;case`focusout`:Mr=jr=Ar=null;break;case`mousedown`:Nr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Nr=!1,Pr(s,n,i);break;case`selectionchange`:if(kr)break;case`keydown`:case`keyup`:Pr(s,n,i)}var y;if(Yn)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else rr?tr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(Qn&&n.locale!==`ko`&&(rr||b!==`onCompositionStart`?b===`onCompositionEnd`&&rr&&(y=vn()):(hn=i,gn=`value`in hn?hn.value:hn.textContent,rr=!0)),v=pd(r,b),0<v.length&&(b=new In(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=nr(n),y!==null&&(b.data=y)))),(y=Zn?ir(e,n):ar(e,n))&&(b=pd(r,`onBeforeInput`),0<b.length&&(v=new In(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),td(s,e,r,n,i)}od(s,t)})}function fd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function pd(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=dn(e,n),i!=null&&r.unshift(fd(e,i,a)),i=dn(e,t),i!=null&&r.push(fd(e,i,a))),e.tag===3)return r;e=e.return}return[]}function md(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function hd(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=dn(n,a),l!=null&&o.unshift(fd(n,l,c))):i||(l=dn(n,a),l!=null&&o.push(fd(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var gd=/\r\n?/g,_d=/\u0000|\uFFFD/g;function vd(e){return(typeof e==`string`?e:``+e).replace(gd,`
`).replace(_d,``)}function yd(e,t){return t=vd(t),vd(e)===t}function bd(){}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Yt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Yt(e,``+r);break;case`className`:kt(e,`class`,r);break;case`tabIndex`:kt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:kt(e,n,r);break;case`style`:Qt(e,r,o);break;case`data`:if(t!==`object`){kt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=nn(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=nn(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=bd);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=nn(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Ot(e,`popover`,r);break;case`xlinkActuate`:At(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:At(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:At(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:At(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:At(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:At(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:At(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:At(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:At(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Ot(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=en.get(n)||n,Ot(e,n,r))}}function xd(e,t,n,r,a,o){switch(n){case`style`:Qt(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Yt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Yt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=bd);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!xt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[st]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):Ot(e,n,r)}}}function Sd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Gt(e,o,c,l,u,s,a,!1),Vt(e);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&qt(e,!!r,n,!0):qt(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}N(e,r,a,o),Vt(e);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<id.length;r++)Q(id[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if($t(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&xd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Cd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Wt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?qt(e,!!n,n?[]:``,!1):qt(e,!!n,t,!0)):qt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Jt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if($t(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&xd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||xd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}var wd=null,Td=null;function Ed(e){return e.nodeType===9?e:e.ownerDocument}function Dd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Od(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function kd(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ad=null;function jd(){var e=window.event;return e&&e.type===`popstate`?e===Ad?!1:(Ad=e,!0):(Ad=null,!1)}var Md=typeof setTimeout==`function`?setTimeout:void 0,Nd=typeof clearTimeout==`function`?clearTimeout:void 0,Pd=typeof Promise==`function`?Promise:void 0,Fd=typeof queueMicrotask==`function`?queueMicrotask:Pd===void 0?Md:function(e){return Pd.resolve(null).then(e).catch(Id)};function Id(e){setTimeout(function(){throw e})}function Ld(e){return e===`head`}function Rd(e,t){var n=t,r=0,i=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n===`/$`){if(0<r&&8>r){n=r;var o=e.ownerDocument;if(n&1&&Jd(o.documentElement),n&2&&Jd(o.body),n&4)for(n=o.head,Jd(n),o=n.firstChild;o;){var s=o.nextSibling,c=o.nodeName;o[pt]||c===`SCRIPT`||c===`STYLE`||c===`LINK`&&o.rel.toLowerCase()===`stylesheet`||n.removeChild(o),o=s}}if(i===0){e.removeChild(a),hp(t);return}i--}else n===`$`||n===`$?`||n===`$!`?i++:r=n.charCodeAt(0)-48;else r=0;n=a}while(n);hp(t)}function zd(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:zd(n),mt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function Bd(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[pt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=Wd(e.nextSibling),e===null)break}return null}function Vd(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=Wd(e.nextSibling),e===null))return null;return e}function Hd(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState===`complete`}function Ud(e,t){var n=e.ownerDocument;if(e.data!==`$?`||n.readyState===`complete`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function Wd(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`F!`||t===`F`)break;if(t===`/$`)return null}}return e}var Gd=null;function Kd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`){if(t===0)return e;t--}else n===`/$`&&t++}e=e.previousSibling}return null}function qd(e,t,n){switch(t=Ed(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function Jd(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);mt(e)}var Yd=new Map,Xd=new Set;function Zd(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Qd=k.d;k.d={f:$d,r:ef,D:rf,C:af,L:of,m:sf,X:lf,S:cf,M:uf};function $d(){var e=Qd.f(),t=cu();return e||t}function ef(e){var t=gt(e);t!==null&&t.tag===5&&t.type===`form`?ns(t):Qd.r(e)}var tf=typeof document>`u`?null:document;function nf(e,t,n){var r=tf;if(r&&typeof t==`string`&&t){var i=M(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),Xd.has(i)||(Xd.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Sd(t,`link`,e),yt(t),r.head.appendChild(t)))}}function rf(e){Qd.D(e),nf(`dns-prefetch`,e,null)}function af(e,t){Qd.C(e,t),nf(`preconnect`,e,t)}function of(e,t,n){Qd.L(e,t,n);var r=tf;if(r&&e&&t){var i=`link[rel="preload"][as="`+M(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+M(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+M(n.imageSizes)+`"]`)):i+=`[href="`+M(e)+`"]`;var a=i;switch(t){case`style`:a=ff(e);break;case`script`:a=gf(e)}Yd.has(a)||(e=f({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),Yd.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(pf(a))||t===`script`&&r.querySelector(_f(a))||(t=r.createElement(`link`),Sd(t,`link`,e),yt(t),r.head.appendChild(t)))}}function sf(e,t){Qd.m(e,t);var n=tf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+M(r)+`"][href="`+M(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=gf(e)}if(!Yd.has(a)&&(e=f({rel:`modulepreload`,href:e},t),Yd.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(_f(a)))return}r=n.createElement(`link`),Sd(r,`link`,e),yt(r),n.head.appendChild(r)}}}function cf(e,t,n){Qd.S(e,t,n);var r=tf;if(r&&e){var i=vt(r).hoistableStyles,a=ff(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(pf(a)))s.loading=5;else{e=f({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=Yd.get(a))&&bf(e,n);var c=o=r.createElement(`link`);yt(c),Sd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,yf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function lf(e,t){Qd.X(e,t);var n=tf;if(n&&e){var r=vt(n).hoistableScripts,i=gf(e),a=r.get(i);a||(a=n.querySelector(_f(i)),a||(e=f({src:e,async:!0},t),(t=Yd.get(i))&&xf(e,t),a=n.createElement(`script`),yt(a),Sd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function uf(e,t){Qd.M(e,t);var n=tf;if(n&&e){var r=vt(n).hoistableScripts,i=gf(e),a=r.get(i);a||(a=n.querySelector(_f(i)),a||(e=f({src:e,async:!0,type:`module`},t),(t=Yd.get(i))&&xf(e,t),a=n.createElement(`script`),yt(a),Sd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function df(e,t,n,r){var a=(a=he.current)?Zd(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=ff(n.href),n=vt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=ff(n.href);var o=vt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(pf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),Yd.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Yd.set(e,n),o||hf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=gf(n),n=vt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function ff(e){return`href="`+M(e)+`"`}function pf(e){return`link[rel="stylesheet"][`+e+`]`}function mf(e){return f({},e,{"data-precedence":e.precedence,precedence:null})}function hf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Sd(t,`link`,n),yt(t),e.head.appendChild(t))}function gf(e){return`[src="`+M(e)+`"]`}function _f(e){return`script[async]`+e}function vf(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+M(n.href)+`"]`);if(r)return t.instance=r,yt(r),r;var a=f({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),yt(r),Sd(r,`style`,a),yf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=ff(n.href);var o=e.querySelector(pf(a));if(o)return t.state.loading|=4,t.instance=o,yt(o),o;r=mf(n),(a=Yd.get(a))&&bf(r,a),o=(e.ownerDocument||e).createElement(`link`),yt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Sd(o,`link`,r),t.state.loading|=4,yf(o,n.precedence,e),t.instance=o;case`script`:return o=gf(n.src),(a=e.querySelector(_f(o)))?(t.instance=a,yt(a),a):(r=n,(a=Yd.get(o))&&(r=f({},n),xf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),yt(a),Sd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,yf(r,n.precedence,e));return t.instance}function yf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function bf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function xf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Sf=null;function Cf(e,t,n){if(Sf===null){var r=new Map,i=Sf=new Map;i.set(n,r)}else i=Sf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[pt]||a[ot]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function wf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Tf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Ef(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}var Df=null;function Of(){}function kf(e,t,n){if(Df===null)throw Error(i(475));var r=Df;if(t.type===`stylesheet`&&(typeof n.media!=`string`||!1!==matchMedia(n.media).matches)&&!(t.state.loading&4)){if(t.instance===null){var a=ff(n.href),o=e.querySelector(pf(a));if(o){e=o._p,typeof e==`object`&&e&&typeof e.then==`function`&&(r.count++,r=jf.bind(r),e.then(r,r)),t.state.loading|=4,t.instance=o,yt(o);return}o=e.ownerDocument||e,n=mf(n),(a=Yd.get(a))&&bf(n,a),o=o.createElement(`link`),yt(o);var s=o;s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Sd(o,`link`,n),t.instance=o}r.stylesheets===null&&(r.stylesheets=new Map),r.stylesheets.set(t,e),(e=t.state.preload)&&!(t.state.loading&3)&&(r.count++,t=jf.bind(r),e.addEventListener(`load`,t),e.addEventListener(`error`,t))}}function Af(){if(Df===null)throw Error(i(475));var e=Df;return e.stylesheets&&e.count===0&&Nf(e,e.stylesheets),0<e.count?function(t){var n=setTimeout(function(){if(e.stylesheets&&Nf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(n)}}:null}function jf(){if(this.count--,this.count===0){if(this.stylesheets)Nf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Mf=null;function Nf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Mf=new Map,t.forEach(Pf,e),Mf=null,jf.call(e))}function Pf(e,t){if(!(t.state.loading&4)){var n=Mf.get(e);if(n)var r=n.get(null);else{n=new Map,Mf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Ff={$$typeof:C,Provider:null,Consumer:null,_currentValue:ce,_currentValue2:ce,_threadCount:0};function If(e,t,n,r,i,a,o,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Xe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Xe(0),this.hiddenUpdates=Xe(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function Lf(e,t,n,r,i,a,o,s,c,l,u,d){return e=new If(e,t,n,o,s,c,l,d),t=1,!0===a&&(t|=24),a=li(3,null,null,t),e.current=a,a.stateNode=e,t=z(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},Ta(a),e}function Rf(e){return e?(e=si,e):si}function zf(e,t,n,r,i,a){i=Rf(i),r.context===null?r.context=i:r.pendingContext=i,r=Da(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Oa(e,r,t),n!==null&&(ru(n,e,t),ka(n,e,t))}function Bf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Vf(e,t){Bf(e,t),(e=e.alternate)&&Bf(e,t)}function Hf(e){if(e.tag===13){var t=ii(e,67108864);t!==null&&ru(t,e,67108864),Vf(e,67108864)}}var Uf=!0;function Wf(e,t,n,r){var i=O.T;O.T=null;var a=k.p;try{k.p=2,Kf(e,t,n,r)}finally{k.p=a,O.T=i}}function Gf(e,t,n,r){var i=O.T;O.T=null;var a=k.p;try{k.p=8,Kf(e,t,n,r)}finally{k.p=a,O.T=i}}function Kf(e,t,n,r){if(Uf){var i=qf(r);if(i===null)dd(e,t,r,Jf,n),ap(e,r);else if(sp(i,e,t,n,r))r.stopPropagation();else if(ap(e,r),t&4&&-1<ip.indexOf(e)){for(;i!==null;){var a=gt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=We(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Re(o);s.entanglements[1]|=c,o&=~c}Wu(a),!(K&6)&&(Ul=Ee()+500,Gu(0,!1))}}break;case 13:s=ii(a,2),s!==null&&ru(s,a,2),cu(),Vf(a,2)}if(a=qf(r),a===null&&dd(e,t,r,Jf,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else dd(e,t,r,null,n)}}function qf(e){return e=an(e),Yf(e)}var Jf=null;function Yf(e){if(Jf=null,e=ht(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Jf=e,null}function Xf(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(De()){case Oe:return 2;case ke:return 8;case Ae:case je:return 32;case Me:return 268435456;default:return 32}default:return 32}}var Zf=!1,Qf=null,$f=null,ep=null,tp=new Map,np=new Map,rp=[],ip=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function ap(e,t){switch(e){case`focusin`:case`focusout`:Qf=null;break;case`dragenter`:case`dragleave`:$f=null;break;case`mouseover`:case`mouseout`:ep=null;break;case`pointerover`:case`pointerout`:tp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:np.delete(t.pointerId)}}function op(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=gt(t),t!==null&&Hf(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function sp(e,t,n,r,i){switch(t){case`focusin`:return Qf=op(Qf,e,t,n,r,i),!0;case`dragenter`:return $f=op($f,e,t,n,r,i),!0;case`mouseover`:return ep=op(ep,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return tp.set(a,op(tp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,np.set(a,op(np.get(a)||null,e,t,n,r,i)),!0}return!1}function cp(e){var t=ht(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,it(e.priority,function(){if(n.tag===13){var e=tu();e=tt(e);var t=ii(n,e);t!==null&&ru(t,n,e),Vf(n,e)}});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function lp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=qf(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);rn=r,n.target.dispatchEvent(r),rn=null}else return t=gt(n),t!==null&&Hf(t),e.blockedOn=n,!1;t.shift()}return!0}function up(e,t,n){lp(e)&&n.delete(t)}function dp(){Zf=!1,Qf!==null&&lp(Qf)&&(Qf=null),$f!==null&&lp($f)&&($f=null),ep!==null&&lp(ep)&&(ep=null),tp.forEach(up),np.forEach(up)}function fp(e,n){e.blockedOn===n&&(e.blockedOn=null,Zf||(Zf=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,dp)))}var pp=null;function mp(e){pp!==e&&(pp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){pp===e&&(pp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Yf(r||n)===null)continue;break}var a=gt(n);a!==null&&(e.splice(t,3),t-=3,es(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function hp(e){function t(t){return fp(t,e)}Qf!==null&&fp(Qf,e),$f!==null&&fp($f,e),ep!==null&&fp(ep,e),tp.forEach(t),np.forEach(t);for(var n=0;n<rp.length;n++){var r=rp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<rp.length&&(n=rp[0],n.blockedOn===null);)cp(n),n.blockedOn===null&&rp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[st]||null;if(typeof a==`function`)o||mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[st]||null)s=o.formAction;else if(Yf(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),mp(n)}}}function gp(e){this._internalRoot=e}_p.prototype.render=gp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;zf(n,tu(),e,t,null,null)},_p.prototype.unmount=gp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;zf(e.current,2,null,e,null,null),cu(),t[ct]=null}};function _p(e){this._internalRoot=e}_p.prototype.unstable_scheduleHydration=function(e){if(e){var t=rt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<rp.length&&t!==0&&t<rp[n].priority;n++);rp.splice(n,0,e),n===0&&cp(e)}};var vp=n.version;if(vp!==`19.1.0`)throw Error(i(527,vp,`19.1.0`));k.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=l(t),e=e===null?null:u(e),e=e===null?null:e.stateNode,e};var yp={bundleType:0,version:`19.1.0`,rendererPackageName:`react-dom`,currentDispatcherRef:O,reconcilerVersion:`19.1.0`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var bp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!bp.isDisabled&&bp.supportsFiber)try{Fe=bp.inject(yp),Ie=bp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Vs,s=Hs,c=Us,l=null;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(l=t.unstable_transitionCallbacks)),t=Lf(e,1,!1,null,null,n,r,o,s,c,l,null),e[ct]=t.current,ld(e),new gp(t)}})),_=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=l(d()),y=l(_(),1),b=l(h());function x(){return x=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},x.apply(this,arguments)}var S;(function(e){e.Pop=`POP`,e.Push=`PUSH`,e.Replace=`REPLACE`})(S||={});var C=`popstate`;function w(e){e===void 0&&(e={});function t(e,t){let{pathname:n,search:r,hash:i}=e.location;return te(``,{pathname:n,search:r,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||`default`)}function n(e,t){return typeof t==`string`?t:ne(t)}return ie(t,n,null,e)}function T(e,t){if(e===!1||e==null)throw Error(t)}function E(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function ee(){return Math.random().toString(36).substr(2,8)}function D(e,t){return{usr:e.state,key:e.key,idx:t}}function te(e,t,n,r){return n===void 0&&(n=null),x({pathname:typeof e==`string`?e:e.pathname,search:``,hash:``},typeof t==`string`?re(t):t,{state:n,key:t&&t.key||r||ee()})}function ne(e){let{pathname:t=`/`,search:n=``,hash:r=``}=e;return n&&n!==`?`&&(t+=n.charAt(0)===`?`?n:`?`+n),r&&r!==`#`&&(t+=r.charAt(0)===`#`?r:`#`+r),t}function re(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function ie(e,t,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=S.Pop,c=null,l=u();l??(l=0,o.replaceState(x({},o.state,{idx:l}),``));function u(){return(o.state||{idx:null}).idx}function d(){s=S.Pop;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=S.Push;let r=te(h.location,e,t);n&&n(r,e),l=u()+1;let d=D(r,l),f=h.createHref(r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=S.Replace;let r=te(h.location,e,t);n&&n(r,e),l=u();let i=D(r,l),d=h.createHref(r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){let t=i.location.origin===`null`?i.location.href:i.location.origin,n=typeof e==`string`?e:ne(e);return n=n.replace(/ $/,`%20`),T(t,`No window.location.(origin|href) available to create URL for href: `+n),new URL(n,t)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(C,d),c=e,()=>{i.removeEventListener(C,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}var ae;(function(e){e.data=`data`,e.deferred=`deferred`,e.redirect=`redirect`,e.error=`error`})(ae||={});function oe(e,t,n){return n===void 0&&(n=`/`),se(e,t,n,!1)}function se(e,t,n,r){let i=xe((typeof t==`string`?re(t):t).pathname||`/`,n);if(i==null)return null;let a=O(e);ce(a);let o=null;for(let e=0;o==null&&e<a.length;++e){let t=be(i);o=_e(a[e],t,r)}return o}function O(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r=``);let i=(e,i,a)=>{let o={relativePath:a===void 0?e.path||``:a,caseSensitive:e.caseSensitive===!0,childrenIndex:i,route:e};o.relativePath.startsWith(`/`)&&(T(o.relativePath.startsWith(r),`Absolute route path "`+o.relativePath+`" nested under path `+(`"`+r+`" is not valid. An absolute child route path `)+`must start with the combined path of all its parent routes.`),o.relativePath=o.relativePath.slice(r.length));let s=Ae([r,o.relativePath]),c=n.concat(o);e.children&&e.children.length>0&&(T(e.index!==!0,`Index routes must not have child routes. Please remove `+(`all child routes from route path "`+s+`".`)),O(e.children,t,c,s)),!(e.path==null&&!e.index)&&t.push({path:s,score:he(s,e.index),routesMeta:c})};return e.forEach((e,t)=>{var n;if(e.path===``||!((n=e.path)!=null&&n.includes(`?`)))i(e,t);else for(let n of k(e.path))i(e,t,n)}),t}function k(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=k(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function ce(e){e.sort((e,t)=>e.score===t.score?ge(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var le=/^:[\w-]+$/,ue=3,de=2,fe=1,A=10,pe=-2,me=e=>e===`*`;function he(e,t){let n=e.split(`/`),r=n.length;return n.some(me)&&(r+=pe),t&&(r+=de),n.filter(e=>!me(e)).reduce((e,t)=>e+(le.test(t)?ue:t===``?fe:A),r)}function ge(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function _e(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=ve({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=ve({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:Ae([a,u.pathname]),pathnameBase:je(Ae([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=Ae([a,u.pathnameBase]))}return o}function ve(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=ye(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,t,n)=>{let{paramName:r,isOptional:i}=t;if(r===`*`){let e=s[n]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let c=s[n];return i&&!c?e[r]=void 0:e[r]=(c||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function ye(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),E(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "`+e+`" will be treated as if it were `+(`"`+e.replace(/\*$/,`/*`)+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+(`please change the route path to "`+e.replace(/\*$/,`/*`)+`".`));let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n)=>(r.push({paramName:t,isOptional:n!=null}),n?`/?([^\\/]+)?`:`/([^\\/]+)`));return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function be(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return E(!1,`The URL path "`+e+`" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent `+(`encoding (`+t+`).`)),e}}function xe(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var Se=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ce=e=>Se.test(e);function we(e,t){t===void 0&&(t=`/`);let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?re(e):e,a;if(n)if(Ce(n))a=n;else{if(n.includes(`//`)){let e=n;n=n.replace(/\/\/+/g,`/`),E(!1,`Pathnames cannot have embedded double slashes - normalizing `+(e+` -> `+n))}a=n.startsWith(`/`)?Te(n.substring(1),`/`):Te(n,t)}else a=t;return{pathname:a,search:Me(r),hash:Ne(i)}}function Te(e,t){let n=t.replace(/\/+$/,``).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function Ee(e,t,n,r){return`Cannot include a '`+e+`' character in a manually specified `+("`to."+t+"` field ["+JSON.stringify(r)+`].  Please separate it out to the `)+("`to."+n+"` field. Alternatively you may provide the full path as ")+`a string in <Link to="..."> and the router will parse it for you.`}function De(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function Oe(e,t){let n=De(e);return t?n.map((e,t)=>t===n.length-1?e.pathname:e.pathnameBase):n.map(e=>e.pathnameBase)}function ke(e,t,n,r){r===void 0&&(r=!1);let i;typeof e==`string`?i=re(e):(i=x({},e),T(!i.pathname||!i.pathname.includes(`?`),Ee(`?`,`pathname`,`search`,i)),T(!i.pathname||!i.pathname.includes(`#`),Ee(`#`,`pathname`,`hash`,i)),T(!i.search||!i.search.includes(`#`),Ee(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=we(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var Ae=e=>e.join(`/`).replace(/\/\/+/g,`/`),je=e=>e.replace(/\/+$/,``).replace(/^\/*/,`/`),Me=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Ne=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e;function Pe(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}var Fe=[`post`,`put`,`patch`,`delete`];new Set(Fe);var Ie=[`get`,...Fe];new Set(Ie);function Le(){return Le=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Le.apply(this,arguments)}var Re=v.createContext(null),ze=v.createContext(null),Be=v.createContext(null),Ve=v.createContext(null),He=v.createContext({outlet:null,matches:[],isDataRoute:!1}),Ue=v.createContext(null);function We(e,t){let{relative:n}=t===void 0?{}:t;!Ge()&&T(!1);let{basename:r,navigator:i}=v.useContext(Be),{hash:a,pathname:o,search:s}=Ze(e,{relative:n}),c=o;return r!==`/`&&(c=o===`/`?r:Ae([r,o])),i.createHref({pathname:c,search:s,hash:a})}function Ge(){return v.useContext(Ve)!=null}function Ke(){return!Ge()&&T(!1),v.useContext(Ve).location}function qe(e){v.useContext(Be).static||v.useLayoutEffect(e)}function Je(){let{isDataRoute:e}=v.useContext(He);return e?ft():Ye()}function Ye(){!Ge()&&T(!1);let e=v.useContext(Re),{basename:t,future:n,navigator:r}=v.useContext(Be),{matches:i}=v.useContext(He),{pathname:a}=Ke(),o=JSON.stringify(Oe(i,n.v7_relativeSplatPath)),s=v.useRef(!1);return qe(()=>{s.current=!0}),v.useCallback(function(n,i){if(i===void 0&&(i={}),!s.current)return;if(typeof n==`number`){r.go(n);return}let c=ke(n,JSON.parse(o),a,i.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:Ae([t,c.pathname])),(i.replace?r.replace:r.push)(c,i.state,i)},[t,r,o,a,e])}function Xe(){let{matches:e}=v.useContext(He),t=e[e.length-1];return t?t.params:{}}function Ze(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=v.useContext(Be),{matches:i}=v.useContext(He),{pathname:a}=Ke(),o=JSON.stringify(Oe(i,r.v7_relativeSplatPath));return v.useMemo(()=>ke(e,JSON.parse(o),a,n===`path`),[e,o,a,n])}function Qe(e,t){return $e(e,t)}function $e(e,t,n,r){!Ge()&&T(!1);let{navigator:i}=v.useContext(Be),{matches:a}=v.useContext(He),o=a[a.length-1],s=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:`/`;o&&o.route;let l=Ke(),u;if(t){let e=typeof t==`string`?re(t):t;!(c===`/`||e.pathname?.startsWith(c))&&T(!1),u=e}else u=l;let d=u.pathname||`/`,f=d;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);f=`/`+d.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let p=oe(e,{pathname:f}),m=it(p&&p.map(e=>Object.assign({},e,{params:Object.assign({},s,e.params),pathname:Ae([c,i.encodeLocation?i.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:Ae([c,i.encodeLocation?i.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])})),a,n,r);return t&&m?v.createElement(Ve.Provider,{value:{location:Le({pathname:`/`,search:``,hash:``,state:null,key:`default`},u),navigationType:S.Pop}},m):m}function et(){let e=dt(),t=Pe(e)?e.status+` `+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null;return v.createElement(v.Fragment,null,v.createElement(`h2`,null,`Unexpected Application Error!`),v.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?v.createElement(`pre`,{style:{padding:`0.5rem`,backgroundColor:`rgba(200,200,200, 0.5)`}},n):null,null)}var tt=v.createElement(et,null),nt=class extends v.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error(`React Router caught the following error during render`,e,t)}render(){return this.state.error===void 0?this.props.children:v.createElement(He.Provider,{value:this.props.routeContext},v.createElement(Ue.Provider,{value:this.state.error,children:this.props.component}))}};function rt(e){let{routeContext:t,match:n,children:r}=e,i=v.useContext(Re);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),v.createElement(He.Provider,{value:t},r)}function it(e,t,n,r){if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let a=e,o=n?.errors;if(o!=null){let e=a.findIndex(e=>e.route.id&&o?.[e.route.id]!==void 0);!(e>=0)&&T(!1),a=a.slice(0,Math.min(a.length,e+1))}let s=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let e=0;e<a.length;e++){let t=a[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(c=e),t.route.id){let{loaderData:e,errors:r}=n,i=t.route.loader&&e[t.route.id]===void 0&&(!r||r[t.route.id]===void 0);if(t.route.lazy||i){s=!0,a=c>=0?a.slice(0,c+1):[a[0]];break}}}return a.reduceRight((e,r,i)=>{let l,u=!1,d=null,f=null;n&&(l=o&&r.route.id?o[r.route.id]:void 0,d=r.route.errorElement||tt,s&&(c<0&&i===0?(mt(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),u=!0,f=null):c===i&&(u=!0,f=r.route.hydrateFallbackElement||null)));let p=t.concat(a.slice(0,i+1)),m=()=>{let t;return t=l?d:u?f:r.route.Component?v.createElement(r.route.Component,null):r.route.element?r.route.element:e,v.createElement(rt,{match:r,routeContext:{outlet:e,matches:p,isDataRoute:n!=null},children:t})};return n&&(r.route.ErrorBoundary||r.route.errorElement||i===0)?v.createElement(nt,{location:n.location,revalidation:n.revalidation,component:d,error:l,children:m(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):m()},null)}var at=function(e){return e.UseBlocker=`useBlocker`,e.UseRevalidator=`useRevalidator`,e.UseNavigateStable=`useNavigate`,e}(at||{}),ot=function(e){return e.UseBlocker=`useBlocker`,e.UseLoaderData=`useLoaderData`,e.UseActionData=`useActionData`,e.UseRouteError=`useRouteError`,e.UseNavigation=`useNavigation`,e.UseRouteLoaderData=`useRouteLoaderData`,e.UseMatches=`useMatches`,e.UseRevalidator=`useRevalidator`,e.UseNavigateStable=`useNavigate`,e.UseRouteId=`useRouteId`,e}(ot||{});function st(e){let t=v.useContext(Re);return!t&&T(!1),t}function ct(e){let t=v.useContext(ze);return!t&&T(!1),t}function lt(e){let t=v.useContext(He);return!t&&T(!1),t}function ut(e){let t=lt(e),n=t.matches[t.matches.length-1];return!n.route.id&&T(!1),n.route.id}function dt(){let e=v.useContext(Ue),t=ct(ot.UseRouteError),n=ut(ot.UseRouteError);return e===void 0?t.errors?.[n]:e}function ft(){let{router:e}=st(at.UseNavigateStable),t=ut(ot.UseNavigateStable),n=v.useRef(!1);return qe(()=>{n.current=!0}),v.useCallback(function(r,i){i===void 0&&(i={}),n.current&&(typeof r==`number`?e.navigate(r):e.navigate(r,Le({fromRouteId:t},i)))},[e,t])}var pt={};function mt(e,t,n){!t&&!pt[e]&&(pt[e]=!0)}var ht=(e,t,n)=>(``+t+("You can use the `"+e+"` future flag to opt-in early. ")+(`For more information, see `+n+`.`),void 0);function gt(e,t){e?.v7_startTransition===void 0&&ht(`v7_startTransition`,"React Router will begin wrapping state updates in `React.startTransition` in v7",`https://reactrouter.com/v6/upgrading/future#v7_starttransition`),e?.v7_relativeSplatPath===void 0&&(!t||t.v7_relativeSplatPath===void 0)&&ht(`v7_relativeSplatPath`,`Relative route resolution within Splat routes is changing in v7`,`https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath`),t&&(t.v7_fetcherPersist===void 0&&ht(`v7_fetcherPersist`,`The persistence behavior of fetchers is changing in v7`,`https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist`),t.v7_normalizeFormMethod===void 0&&ht(`v7_normalizeFormMethod`,"Casing of `formMethod` fields is being normalized to uppercase in v7",`https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod`),t.v7_partialHydration===void 0&&ht(`v7_partialHydration`,"`RouterProvider` hydration behavior is changing in v7",`https://reactrouter.com/v6/upgrading/future#v7_partialhydration`),t.v7_skipActionErrorRevalidation===void 0&&ht(`v7_skipActionErrorRevalidation`,"The revalidation behavior after 4xx/5xx `action` responses is changing in v7",`https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation`))}v.startTransition;function _t(e){let{to:t,replace:n,state:r,relative:i}=e;!Ge()&&T(!1);let{future:a,static:o}=v.useContext(Be),{matches:s}=v.useContext(He),{pathname:c}=Ke(),l=Je(),u=ke(t,Oe(s,a.v7_relativeSplatPath),c,i===`path`),d=JSON.stringify(u);return v.useEffect(()=>l(JSON.parse(d),{replace:n,state:r,relative:i}),[l,d,i,n,r]),null}function vt(e){T(!1)}function yt(e){let{basename:t=`/`,children:n=null,location:r,navigationType:i=S.Pop,navigator:a,static:o=!1,future:s}=e;Ge()&&T(!1);let c=t.replace(/^\/*/,`/`),l=v.useMemo(()=>({basename:c,navigator:a,static:o,future:Le({v7_relativeSplatPath:!1},s)}),[c,s,a,o]);typeof r==`string`&&(r=re(r));let{pathname:u=`/`,search:d=``,hash:f=``,state:p=null,key:m=`default`}=r,h=v.useMemo(()=>{let e=xe(u,c);return e==null?null:{location:{pathname:e,search:d,hash:f,state:p,key:m},navigationType:i}},[c,u,d,f,p,m,i]);return h==null?null:v.createElement(Be.Provider,{value:l},v.createElement(Ve.Provider,{children:n,value:h}))}function bt(e){let{children:t,location:n}=e;return Qe(St(t),n)}var xt=function(e){return e[e.pending=0]=`pending`,e[e.success=1]=`success`,e[e.error=2]=`error`,e}(xt||{});new Promise(()=>{}),v.Component;function St(e,t){t===void 0&&(t=[]);let n=[];return v.Children.forEach(e,(e,r)=>{if(!v.isValidElement(e))return;let i=[...t,r];if(e.type===v.Fragment){n.push.apply(n,St(e.props.children,i));return}e.type!==vt&&T(!1),!(!e.props.index||!e.props.children)&&T(!1);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=St(e.props.children,i)),n.push(a)}),n}function Ct(){return Ct=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ct.apply(this,arguments)}function wt(e,t){if(e==null)return{};var n={},r=Object.keys(e),i,a;for(a=0;a<r.length;a++)i=r[a],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}function Tt(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Et(e,t){return e.button===0&&(!t||t===`_self`)&&!Tt(e)}var Dt=[`onClick`,`relative`,`reloadDocument`,`replace`,`state`,`target`,`to`,`preventScrollReset`,`viewTransition`],Ot=[`aria-current`,`caseSensitive`,`className`,`end`,`style`,`to`,`viewTransition`,`children`],kt=`6`;try{window.__reactRouterVersion=kt}catch{}var At=v.createContext({isTransitioning:!1}),jt=v.startTransition;b.flushSync,v.useId;function Mt(e){let{basename:t,children:n,future:r,window:i}=e,a=v.useRef();a.current??=w({window:i,v5Compat:!0});let o=a.current,[s,c]=v.useState({action:o.action,location:o.location}),{v7_startTransition:l}=r||{},u=v.useCallback(e=>{l&&jt?jt(()=>c(e)):c(e)},[c,l]);return v.useLayoutEffect(()=>o.listen(u),[o,u]),v.useEffect(()=>gt(r),[r]),v.createElement(yt,{basename:t,children:n,location:s.location,navigationType:s.action,navigator:o,future:r})}var Nt=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Pt=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ft=v.forwardRef(function(e,t){let{onClick:n,relative:r,reloadDocument:i,replace:a,state:o,target:s,to:c,preventScrollReset:l,viewTransition:u}=e,d=wt(e,Dt),{basename:f}=v.useContext(Be),p,m=!1;if(typeof c==`string`&&Pt.test(c)&&(p=c,Nt))try{let e=new URL(window.location.href),t=c.startsWith(`//`)?new URL(e.protocol+c):new URL(c),n=xe(t.pathname,f);t.origin===e.origin&&n!=null?c=n+t.search+t.hash:m=!0}catch{}let h=We(c,{relative:r}),g=Bt(c,{replace:a,state:o,target:s,preventScrollReset:l,relative:r,viewTransition:u});function _(e){n&&n(e),e.defaultPrevented||g(e)}return v.createElement(`a`,Ct({},d,{href:p||h,onClick:m||i?n:_,ref:t,target:s}))}),It=v.forwardRef(function(e,t){let{"aria-current":n=`page`,caseSensitive:r=!1,className:i=``,end:a=!1,style:o,to:s,viewTransition:c,children:l}=e,u=wt(e,Ot),d=Ze(s,{relative:u.relative}),f=Ke(),p=v.useContext(ze),{navigator:m,basename:h}=v.useContext(Be),g=p!=null&&Vt(d)&&c===!0,_=m.encodeLocation?m.encodeLocation(d).pathname:d.pathname,y=f.pathname,b=p&&p.navigation&&p.navigation.location?p.navigation.location.pathname:null;r||(y=y.toLowerCase(),b=b?b.toLowerCase():null,_=_.toLowerCase()),b&&h&&(b=xe(b,h)||b);let x=_!==`/`&&_.endsWith(`/`)?_.length-1:_.length,S=y===_||!a&&y.startsWith(_)&&y.charAt(x)===`/`,C=b!=null&&(b===_||!a&&b.startsWith(_)&&b.charAt(_.length)===`/`),w={isActive:S,isPending:C,isTransitioning:g},T=S?n:void 0,E;E=typeof i==`function`?i(w):[i,S?`active`:null,C?`pending`:null,g?`transitioning`:null].filter(Boolean).join(` `);let ee=typeof o==`function`?o(w):o;return v.createElement(Ft,Ct({},u,{"aria-current":T,className:E,ref:t,style:ee,to:s,viewTransition:c}),typeof l==`function`?l(w):l)}),Lt;(function(e){e.UseScrollRestoration=`useScrollRestoration`,e.UseSubmit=`useSubmit`,e.UseSubmitFetcher=`useSubmitFetcher`,e.UseFetcher=`useFetcher`,e.useViewTransitionState=`useViewTransitionState`})(Lt||={});var Rt;(function(e){e.UseFetcher=`useFetcher`,e.UseFetchers=`useFetchers`,e.UseScrollRestoration=`useScrollRestoration`})(Rt||={});function zt(e){let t=v.useContext(Re);return!t&&T(!1),t}function Bt(e,t){let{target:n,replace:r,state:i,preventScrollReset:a,relative:o,viewTransition:s}=t===void 0?{}:t,c=Je(),l=Ke(),u=Ze(e,{relative:o});return v.useCallback(t=>{Et(t,n)&&(t.preventDefault(),c(e,{replace:r===void 0?ne(l)===ne(u):r,state:i,preventScrollReset:a,relative:o,viewTransition:s}))},[l,c,u,r,i,n,e,a,o,s])}function Vt(e,t){t===void 0&&(t={});let n=v.useContext(At);n??T(!1);let{basename:r}=zt(Lt.useViewTransitionState),i=Ze(e,{relative:t.relative});if(!n.isTransitioning)return!1;let a=xe(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=xe(n.nextLocation.pathname,r)||n.nextLocation.pathname;return ve(i.pathname,o)!=null||ve(i.pathname,a)!=null}var j={home:`/`,projects:`/projects`,project:e=>`/projects/${e}`,blog:`/blog`,blogPost:e=>`/blog/${e}`,education:`/education`,awards:`/awards`,licenses:`/licenses`,resume:`/resume`,architecture:`/architecture`},Ht=[{label:`About`,to:j.home},{label:`Projects`,to:j.projects},{label:`Education`,to:j.education},{label:`Awards`,to:j.awards},{label:`Licenses`,to:j.licenses},{label:`Resume`,to:j.resume},{label:`Blog`,to:j.blog}],Ut=[{from:`/ProjectsList`,to:j.project(`jeonse-support-system`)},{from:`/ProjectsList2`,to:j.project(`cloudxper-billing`)},{from:`/ProjectsList3`,to:j.project(`lgu-billing-gw`)},{from:`/EducationList`,to:j.education},{from:`/Awards`,to:j.awards},{from:`/Licenses`,to:j.licenses},{from:`/ResumePrint`,to:j.resume},{from:`/Architecture`,to:j.architecture},{from:`/Inventory`,to:j.home}],M={name:`길태형`,role:`Backend Developer`,badge:`SI / SM Developer`,birthDate:`1996-08-16`,careerSummary:`3년+`,keywords:`운영 안정화, 성능 개선, 자동화`,phone:`010-3933-3763`,email:`r1605866@gmail.com`,profileImage:`giltaehyeong.jpg`,links:{github:`https://github.com/seulgae`,blog:`https://doltae.tistory.com/`},intro:`운영 환경에서 발생하는 문제를 빠르게 수습하는 데서 끝내지 않고, 재발을 줄이는 구조 개선과 자동화까지 연결해온 SI / SM 중심의 백엔드 개발자입니다.`,strengths:[`운영 이슈를 임시 대응으로 끝내지 않고, 재발 방지 구조와 자동화까지 연결합니다.`,`Spring Boot, Batch, REST API 기반 업무 시스템 개발과 운영 안정화 경험을 보유하고 있습니다.`,`모니터링, 로그 분석, 배치 자동화, 성능 개선을 통해 수치로 확인되는 결과를 만들어왔습니다.`],techStack:[{label:`Back-End`,items:[`Java`,`Spring`,`Spring Boot`,`Spring Batch`,`REST API`,`MyBatis`,`Thymeleaf`,`Jasypt`]},{label:`Data / Infra`,items:[`Oracle`,`MySQL`,`Redis`,`Kafka`,`Linux`,`Jenkins`,`WhaTap`]},{label:`Front / Tools`,items:[`React`,`JavaScript`,`jQuery`,`HTML/CSS`,`Git`,`Maven`,`Gradle`,`DBeaver`]}]};function Wt(e=new Date){let t=new Date(M.birthDate),n=e.getFullYear()-t.getFullYear(),r=e.getMonth()-t.getMonth();return(r<0||r===0&&e.getDate()<t.getDate())&&--n,n}function Gt(e=new Date){let t=new Date(M.birthDate);return`${t.getFullYear()}년 ${t.getMonth()+1}월 ${t.getDate()}일생 (만 ${Wt(e)}세)`}function Kt(e=``){let t=e.indexOf(`(`);return t===-1?{main:e,sub:``}:{main:e.slice(0,t).trimEnd(),sub:e.slice(t).trim()}}function qt(e=``){return`/${e.replace(/^\//,``)}`}var Jt=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),N=o(((e,t)=>{t.exports=Jt()}))();function Yt(){let[e,t]=(0,v.useState)(!1);return(0,v.useEffect)(()=>{t(!1)},[Ke().pathname]),(0,v.useEffect)(()=>{if(!e)return;let n=e=>{e.key===`Escape`&&t(!1)};return document.addEventListener(`keydown`,n),()=>document.removeEventListener(`keydown`,n)},[e]),(0,N.jsx)(`header`,{className:`site-header`,children:(0,N.jsxs)(`div`,{className:`site-header-inner`,children:[(0,N.jsxs)(Ft,{to:j.home,className:`site-brand`,children:[(0,N.jsx)(`img`,{src:qt(M.profileImage),alt:``,className:`site-brand-avatar`}),(0,N.jsx)(`span`,{className:`site-brand-name`,children:M.name}),(0,N.jsx)(`span`,{className:`site-brand-role`,children:M.role})]}),(0,N.jsx)(`nav`,{id:`site-nav`,className:`site-nav ${e?`open`:``}`,"aria-label":`주요 메뉴`,children:(0,N.jsx)(`ul`,{children:Ht.map(e=>(0,N.jsx)(`li`,{children:(0,N.jsx)(It,{to:e.to,end:e.to===j.home,className:({isActive:e})=>e?`active`:void 0,children:e.label})},e.to))})}),(0,N.jsx)(`button`,{type:`button`,className:`site-menu-button`,"aria-label":e?`메뉴 닫기`:`메뉴 열기`,"aria-expanded":e,"aria-controls":`site-nav`,onClick:()=>t(e=>!e),children:(0,N.jsxs)(`span`,{className:`site-menu-icon`,"aria-hidden":`true`,children:[(0,N.jsx)(`span`,{}),(0,N.jsx)(`span`,{}),(0,N.jsx)(`span`,{})]})})]})})}var Xt={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Zt=v.createContext&&v.createContext(Xt),Qt=[`attr`,`size`,`title`];function $t(e,t){if(e==null)return{};var n=en(e,t),r,i;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)r=a[i],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function en(e,t){if(e==null)return{};var n={};for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;n[r]=e[r]}return n}function tn(){return tn=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},tn.apply(this,arguments)}function nn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function rn(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?nn(Object(n),!0).forEach(function(t){an(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):nn(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function an(e,t,n){return t=on(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function on(e){var t=sn(e,`string`);return typeof t==`symbol`?t:t+``}function sn(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function cn(e){return e&&e.map((e,t)=>v.createElement(e.tag,rn({key:t},e.attr),cn(e.child)))}function ln(e){return t=>v.createElement(un,tn({attr:rn({},e.attr)},t),cn(e.child))}function un(e){var t=t=>{var{attr:n,size:r,title:i}=e,a=$t(e,Qt),o=r||t.size||`1em`,s;return t.className&&(s=t.className),e.className&&(s=(s?s+` `:``)+e.className),v.createElement(`svg`,tn({stroke:`currentColor`,fill:`currentColor`,strokeWidth:`0`},t.attr,n,a,{className:s,style:rn(rn({color:e.color||t.color},t.style),e.style),height:o,width:o,xmlns:`http://www.w3.org/2000/svg`}),i&&v.createElement(`title`,null,i),e.children)};return Zt===void 0?t(Xt):v.createElement(Zt.Consumer,null,e=>t(e))}function dn(e){return ln({tag:`svg`,attr:{viewBox:`0 0 496 512`},child:[{tag:`path`,attr:{d:`M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z`},child:[]}]})(e)}function fn(e){return ln({tag:`svg`,attr:{viewBox:`0 0 512 512`},child:[{tag:`path`,attr:{d:`M172.2 226.8c-14.6-2.9-28.2 8.9-28.2 23.8V301c0 10.2 7.1 18.4 16.7 22 18.2 6.8 31.3 24.4 31.3 45 0 26.5-21.5 48-48 48s-48-21.5-48-48V120c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24v248c0 89.5 82.1 160.2 175 140.7 54.4-11.4 98.3-55.4 109.7-109.7 17.4-82.9-37-157.2-112.5-172.2zM209 0c-9.2-.5-17 6.8-17 16v31.6c0 8.5 6.6 15.5 15 15.9 129.4 7 233.4 112 240.9 241.5.5 8.4 7.5 15 15.9 15h32.1c9.2 0 16.5-7.8 16-17C503.4 139.8 372.2 8.6 209 0zm.3 96c-9.3-.7-17.3 6.7-17.3 16.1v32.1c0 8.4 6.5 15.3 14.8 15.9 76.8 6.3 138 68.2 144.9 145.2.8 8.3 7.6 14.7 15.9 14.7h32.2c9.3 0 16.8-8 16.1-17.3-8.4-110.1-96.5-198.2-206.6-206.7z`},child:[]}]})(e)}function pn(e){return ln({tag:`svg`,attr:{viewBox:`0 0 512 512`},child:[{tag:`path`,attr:{d:`M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z`},child:[]}]})(e)}function mn(e){return ln({tag:`svg`,attr:{viewBox:`0 0 512 512`},child:[{tag:`path`,attr:{d:`M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z`},child:[]}]})(e)}function hn(e){return ln({tag:`svg`,attr:{viewBox:`0 0 384 512`},child:[{tag:`path`,attr:{d:`M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z`},child:[]}]})(e)}function gn(e){return ln({tag:`svg`,attr:{viewBox:`0 0 576 512`},child:[{tag:`path`,attr:{d:`M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z`},child:[]}]})(e)}function _n(e){return ln({tag:`svg`,attr:{viewBox:`0 0 576 512`},child:[{tag:`path`,attr:{d:`M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z`},child:[]}]})(e)}function vn(e){return ln({tag:`svg`,attr:{viewBox:`0 0 512 512`},child:[{tag:`path`,attr:{d:`M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z`},child:[]}]})(e)}function yn(e){return ln({tag:`svg`,attr:{viewBox:`0 0 512 512`},child:[{tag:`path`,attr:{d:`M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z`},child:[]}]})(e)}function bn(){return(0,N.jsx)(`footer`,{className:`site-footer`,children:(0,N.jsxs)(`div`,{className:`site-footer-inner`,children:[(0,N.jsxs)(`div`,{className:`site-footer-contact`,children:[(0,N.jsxs)(`a`,{href:`tel:${M.phone.replace(/-/g,``)}`,children:[(0,N.jsx)(yn,{"aria-hidden":`true`}),` `,M.phone]}),(0,N.jsxs)(`a`,{href:`mailto:${M.email}`,children:[(0,N.jsx)(mn,{"aria-hidden":`true`}),` `,M.email]}),(0,N.jsxs)(`a`,{href:M.links.github,target:`_blank`,rel:`noopener noreferrer`,children:[(0,N.jsx)(dn,{"aria-hidden":`true`}),` GitHub`]}),(0,N.jsxs)(`a`,{href:M.links.blog,target:`_blank`,rel:`noopener noreferrer`,children:[(0,N.jsx)(fn,{"aria-hidden":`true`}),` Tistory`]})]}),(0,N.jsxs)(`div`,{className:`site-footer-meta`,children:[(0,N.jsxs)(`span`,{children:[`© `,new Date().getFullYear(),` `,M.name,` · `,M.role]}),(0,N.jsx)(Ft,{to:j.architecture,children:`이 사이트의 구조 문서 보기`})]})]})})}var xn=[{label:`홈`,to:j.home,icon:_n,end:!0},{label:`프로젝트`,to:j.projects,icon:gn},{label:`블로그`,to:j.blog,icon:vn},{label:`이력서`,to:j.resume,icon:hn}],Sn=[{label:`학력 및 교육`,to:j.education},{label:`수상 이력`,to:j.awards},{label:`자격증`,to:j.licenses},{label:`사이트 구조 문서`,to:j.architecture}];function Cn(){let[e,t]=(0,v.useState)(!1),n=Ke();(0,v.useEffect)(()=>{t(!1)},[n.pathname]),(0,v.useEffect)(()=>{if(!e)return;let n=e=>{e.key===`Escape`&&t(!1)};return document.addEventListener(`keydown`,n),()=>document.removeEventListener(`keydown`,n)},[e]);let r=Sn.some(e=>n.pathname===e.to);return(0,N.jsxs)(N.Fragment,{children:[e?(0,N.jsx)(`div`,{className:`bottom-sheet-backdrop`,role:`presentation`,onClick:()=>t(!1)}):null,e?(0,N.jsx)(`div`,{className:`bottom-sheet`,role:`dialog`,"aria-label":`더보기 메뉴`,children:(0,N.jsx)(`ul`,{children:Sn.map(e=>(0,N.jsx)(`li`,{children:(0,N.jsx)(It,{to:e.to,className:({isActive:e})=>e?`active`:void 0,children:e.label})},e.to))})}):null,(0,N.jsxs)(`nav`,{className:`bottom-nav`,"aria-label":`모바일 메뉴`,children:[xn.map(e=>{let t=e.icon;return(0,N.jsxs)(It,{to:e.to,end:e.end,className:({isActive:e})=>`bottom-nav-item ${e?`active`:``}`,children:[(0,N.jsx)(t,{"aria-hidden":`true`}),(0,N.jsx)(`span`,{children:e.label})]},e.to)}),(0,N.jsxs)(`button`,{type:`button`,className:`bottom-nav-item ${r||e?`active`:``}`,"aria-expanded":e,onClick:()=>t(e=>!e),children:[(0,N.jsx)(pn,{"aria-hidden":`true`}),(0,N.jsx)(`span`,{children:`더보기`})]})]})]})}var wn=[{index:`01`,heading:`운영 관점에서 문제를 해결해왔습니다`,cards:[{title:`LG U+ 빌링 및 GW 시스템`,paragraphs:[`LG U+ 빌링 및 GW 시스템을 운영하면서, 장애가 발생한 뒤 대응하는 방식보다 문제가 반복되지 않도록 구조적으로 개선하는 것이 더 중요하다고 느꼈습니다.`,`WhaTap 애플리케이션 대시보드의 히트맵에서 slow 쿼리·fail 쿼리 내역을 추출해 분석하고, Kafka 연동 오류 발생 내역을 집계해 일일 단위로 운영자에게 공유하는 보고 체계를 만들었습니다.`,`오류 자체보다도 공유와 조치까지 시간이 오래 걸리는 점이 더 큰 문제였기 때문에, 각 파트 운영자가 빠르게 인지하고 대응할 수 있도록 프로세스를 정리했습니다. 그 결과 주간 오류 발생 건수를 약 93% 감소시켰습니다.`]},{title:`개선 원칙`,accent:!0,list:[`장애 대응보다 재발 방지 중심의 구조 개선`,`모니터링과 보고 체계를 통한 빠른 운영 피드백`,`AI 도구를 개발·운영 프로세스에 실용적으로 통합`]}]},{index:`02`,heading:`레거시 한계를 그대로 두지 않았습니다`,twoColumn:!0,cards:[{title:`CloudXper 플랫폼 고도화`,paragraphs:[`실제 운영에서 느낀 병목을 그대로 받아들이지 않고, 구조를 바꿔 성능을 개선하는 데 집중했습니다.`,`100만 건 규모에서 10분까지 늘어지던 대용량 집계 API를 계층 구조(DTO·Service·ServiceImpl) 재정비와 빌더 패턴, Parallel Stream 기반 병렬 처리로 리팩토링해 1분 15초까지 단축했습니다.`,`리팩토링 과정에서 정리한 구조를 팀 코드 컨벤션 가이드로 문서화해 배포했고, 상세 과정은 블로그에 정리했습니다.`]},{title:`국토교통부 전세사기 지원관리시스템`,paragraphs:[`CodeRay(SAST) 탐지 취약점 358건을 CWE 유형별로 분류·분석해 시큐어코딩을 적용하고, 반복 재검증으로 최종 탐지 4건(외부모듈)을 만들었습니다.`,`코드 수정에 그치지 않고 실행 경로 검증으로 미사용·벤더·테스트 코드를 제거해 공격 표면 자체를 줄였으며, 테이블명을 문자열 치환하던 망간 연계 동적 쿼리는 점검 전에 정적 쿼리로 선제 재설계해 SQL Injection을 원천 차단했습니다.`,`유형별 조치 기준과 판단 과정은 블로그의 CWE 시리즈로 정리해 두었습니다.`]}]}];function Tn({card:e}){return(0,N.jsxs)(`article`,{className:`story-card ${e.accent?`accent-card`:``}`,children:[(0,N.jsx)(`h3`,{children:e.title}),e.paragraphs?.map(e=>(0,N.jsx)(`p`,{children:e},e)),e.list?.length?(0,N.jsx)(`ul`,{className:`principle-list`,children:e.list.map(e=>(0,N.jsx)(`li`,{children:e},e))}):null]})}function En(){return(0,N.jsxs)(`div`,{className:`page-shell home-page`,children:[(0,N.jsx)(`section`,{className:`hero-card`,children:(0,N.jsxs)(`div`,{className:`hero-copy`,children:[(0,N.jsx)(`span`,{className:`eyebrow`,children:`About Me`}),(0,N.jsx)(`h1`,{className:`title`,children:`안정성은 견고하게, 운영은 스마트하게`}),(0,N.jsxs)(`p`,{className:`subtitle`,children:[`시스템의 잠재적 리스크를 줄이고, 운영 효율을 기술로 개선해온 3년 차 백엔드 개발자 `,M.name,`입니다.`]}),(0,N.jsx)(`p`,{className:`hero-summary`,children:`서비스의 가치는 단순한 구축이 아니라 안정적인 운영 과정에서 완성된다고 생각합니다. 운영 환경에서 반복되는 문제를 구조적으로 줄이고, 팀이 더 빠르게 인지하고 대응할 수 있는 흐름을 만드는 데 집중해왔습니다.`})]})}),wn.map(e=>(0,N.jsxs)(`section`,{className:`section story-section`,children:[(0,N.jsxs)(`div`,{className:`section-heading`,children:[(0,N.jsx)(`span`,{className:`section-index`,children:e.index}),(0,N.jsx)(`h2`,{children:e.heading})]}),(0,N.jsx)(`div`,{className:`story-grid ${e.twoColumn?`two-column`:``}`,children:e.cards.map(e=>(0,N.jsx)(Tn,{card:e},e.title))})]},e.index)),(0,N.jsxs)(`section`,{className:`section closing-section`,children:[(0,N.jsxs)(`div`,{className:`section-heading`,children:[(0,N.jsx)(`span`,{className:`section-index`,children:`03`}),(0,N.jsx)(`h2`,{children:`지향점`})]}),(0,N.jsx)(`p`,{className:`closing-copy`,children:`운영 환경에서 문제를 해결하는 경험을 쌓으며, 단순히 동작하는 코드가 아니라 오랫동안 안정적으로 운영되는 시스템을 만드는 개발자를 지향하게 되었습니다. 장애를 겪으면 대응에서 멈추지 않고 재발하지 않는 구조를 고민했고, 성능 문제는 구조를 바꿔 풀었으며, 보안은 점검이 오기 전에 먼저 움직였습니다.`}),(0,N.jsx)(`p`,{className:`closing-copy`,children:`그리고 그 과정을 저만 아는 지식으로 두지 않으려 합니다. 코드 컨벤션 가이드, 운영 매뉴얼, 기술 블로그처럼 팀이 재사용할 수 있는 기록으로 남겨서, 시스템이 특정 사람에게 의존하지 않고 굴러가게 만드는 것까지가 개발이라고 생각합니다.`}),(0,N.jsx)(`p`,{className:`closing-copy`,children:`이 경험을 바탕으로, 서비스가 더 안정적으로 성장하는 데 기여하고 싶습니다.`})]}),(0,N.jsxs)(`section`,{className:`section tech-shell`,children:[(0,N.jsxs)(`div`,{className:`section-heading`,children:[(0,N.jsx)(`span`,{className:`section-index`,children:`04`}),(0,N.jsx)(`h2`,{children:`기술 스택`})]}),(0,N.jsx)(`div`,{className:`tech-columns`,children:M.techStack.map(e=>(0,N.jsxs)(`div`,{className:`tech-group`,children:[(0,N.jsx)(`h3`,{children:e.label}),(0,N.jsx)(`div`,{className:`tech-grid`,children:e.items.map(e=>(0,N.jsx)(`span`,{className:`tech-item`,children:e},e))})]},e.label))})]})]})}var Dn=[{slug:`jeonse-support-system`,title:`전세사기 피해자 지원관리시스템 운영·고도화`,shortTitle:`전세사기 피해자 지원관리시스템 운영·고도화`,description:`전세사기 피해자 관리 시스템 레거시 고도화, 성능 최적화, 보안 강화, 운영 안정화 및 신규 기능개발`,period:`2025.09 ~ 2026.08`,role:`시스템 운영·기능 개발`,skills:[{label:`기술`,value:`eGovFrame 4.1.0, JSP, JSTL, jQuery, CSS, MyBatis, Jasypt, Apache SSHD, Maven`},{label:`인프라`,value:`Apache Tomcat 9.0.31, JBOSS, Linux(Fedora), CUBRID, SVN`},{label:`사용 툴`,value:`Cursor IDE, Claude AI, STS4, DBeaver`}],mainTasks:[`요청 기반 개선 대응 및 오류 분석, 기능 유지보수·자동화 수행`,`서버 용량 점검, 파일 관리, 리소스 모니터링 등 인프라 운영`,`SVN 기반 JAR 패키징 및 SFTP/SSH 활용 운영 환경 배포`],achievements:[{title:`CodeRay 기반 SAST 취약점 전수 분석 및 시큐어코딩 개선`,detail:`CodeRay SAST 탐지 취약점 전수 분석 및 CWE 유형별 시큐어코딩 적용, 단순 코드 수정뿐 아니라 실행 경로 검증을 통해 미사용·벤더·테스트 코드까지 제거하여 애플리케이션 보안 품질 강화`,result:`CodeRay 기반 SAST 취약점 358건을 CWE 유형별 분석·시큐어코딩하고 반복 재검증하여 최종 탐지 4건 달성`},{title:`국자원 웹 취약점 점검 사전 대응 및 보안 아키텍처 강화`,detail:`KISA 표준 웹 취약점 점검 결과 기반 HIGH 6·MEDIUM 7·LOW 3 항목 개선 및 SQL Injection 오류 14건 대응, 9개 테이블·97개 컬럼 정적 SQL 분기 재설계와 Jasypt 공통 암호화 유틸 적용으로 4개 환경별 계정 정보 17건 보호`,result:`보안 취약점 16건 개선, SQL Injection 14건 해소, 계정정보 17건 암호화 적용`},{title:`개인정보 대량 암호화 패치 및 CI값 보안 강화`,detail:`티빙 CI값 유출 사례 인지 후 가입·인증 컬럼 암호화 선제 조치, Damo 암복호화 솔루션 기반 CSQL nohup 백그라운드 처리로 서비스 중단 없이 대량 패치 완료`,result:`행안부 연계 CI값 14만 건·개인정보 이력 로그 370만 건, 총 384만 건 암호화 적용`,references:[{text:`티빙 CI값 유출 관련 보도 - JTBC`,href:`https://news.jtbc.co.kr/article/NB12302277`}]},{title:`운영 행정망 Slow Query 분석 및 인덱스 튜닝`,detail:`DBeaver 실행계획(EXPLAIN)을 기반으로 Full Scan 및 병목 구간을 분석하고, 조회 패턴에 맞는 인덱스 설계와 SQL 조건 개선을 수행하여 반복 발생하는 Slow Query를 최적화`,result:`53초 소요 Slow Query 개선 및 월간 운영 점검 특이사항 0건 유지`},{title:`Markdown 기반 AI 유지보수 자동화 체계 구축`,detail:`전세사기 도메인 업무를 Markdown 기반 템플릿으로 정형화하고 AI 활용 개발 프로세스를 적용하여 기능 개발 속도 및 업무 처리 효율 개선`,result:`사용자 오류 재현 및 소스 분석 시간 30~40% 단축`},{title:`인프라 용량 관리 모니터링 자동화 및 점검 프로세스 표준화`,detail:`Apache SSHD 의존성을 적용하여 SSH 기반 서버 접속 기능을 구현하고, CPU·메모리·디스크 사용률 정보를 실시간 수집해 화면에서 시각적으로 확인 가능한 기능 개발`,result:`CLI 수동 점검 화면 기반 모니터링으로 전환, 메모리·시스템 용량 사용률 30% 이하 관리`}]},{slug:`cloudxper-billing`,title:`LG CNS CloudXper 클라우드 빌링 플랫폼 고도화`,shortTitle:`CloudXper 클라우드 빌링 플랫폼 고도화`,description:`AWS · GCP · Azure · Kakao 저장소 대여·청구 통합 관리 플랫폼의 백엔드 아키텍처 개선 및 대용량 데이터 처리 최적화`,period:`2024.10 ~ 2025.02`,role:`플랫폼 서버 백엔드 개발`,skills:[{label:`기술`,value:`Spring Boot(3.x.x), REST API, React, Swagger, MyBatis, Gradle`},{label:`인프라`,value:`Redis, MySQL, SonarQube, Linux(Ubuntu), Jenkins, GitLab`},{label:`사용 툴`,value:`DBeaver, IntelliJ, VSCode`}],mainTasks:[`가입, 청구, 상품 및 공통 조회 등 주요 REST API 설계·개발`,`프로젝트 구조 표준 정의 및 코드 리팩토링 후 팀 공유 및 적용`,`OAuth 사용자 인증 정보 Redis 캐싱 기반 저장·조회 권한 모듈 신규 개발`],achievements:[{title:`대용량 데이터 조회 성능 최적화`,detail:`Java Parallel Stream 기반 병렬 처리 구조를 소스 전역 집계 로직에 적용하여 대용량 데이터 처리 성능 개선`,result:`API 응답 시간 87% 단축 (10분 → 1분 15초)`},{title:`Redis 기반 인증 아키텍처 최적화`,detail:`OAuth 인증·권한 정보를 Redis에 캐싱하는 권한 모듈을 신규 개발하고 토큰 만료와 Redis TTL을 자동 동기화`,result:`인증·권한 조회 병목을 제거하여 페이지 전환 및 렌더링 응답 속도 개선(10초 -> 0.10초 이내)`},{title:`코드 리팩토링 및 개발 컨벤션 표준화`,detail:`Builder Pattern 도입으로 객체 생성 중복 제거, 패키지 구조 재정립과 코딩 컨벤션 문서를 직접 작성·팀에 공유하여 온보딩 시간 단축`,result:`유지보수성·협업 효율 향상, SonarQube 코드 품질 지표 개선`}]},{slug:`lgu-billing-gw`,title:`LG U+ 청구 및 빌링 GW 시스템 개발·운영 유지보수`,shortTitle:`빌링 GW 시스템 개발·운영 유지보수`,description:`Kafka 기반 청구·빌링 GW 시스템의 개발 및 운영, 이기종 시스템 연동 및 데이터 흐름 표준화`,period:`2022.11 ~ 2025.05`,role:`SM/SI 서비스 개발 및 연동 시스템 유지보수`,skills:[{label:`기술`,value:`Spring Boot(2.x.x), Batch(4.x.x), REST API, HTML5, CSS, JavaScript, Swagger, MyBatis, Maven`},{label:`인프라`,value:`Redis, Kafka, APIM, TMS, Jenkins, GitLab, WhaTap, JobPass, Linux(CentOs), Oracle`},{label:`사용 툴`,value:`Trusted Orange, STS, SecureCRT, FileZilla(SFTP), VSCode`}],mainTasks:[`Kafka Topic 기반 데이터 처리 로직 설계·구현 및 연동 시스템 모니터링·장애 대응`,`빌링 요금·위약금 조회 및 전자세금계산서·청구 API 설계·개발`,`Spring Batch 기반 배치 처리 및 리포팅 자동화 시스템 개발·운영`],achievements:[{title:`Kafka 연동 오류 모니터링 체계 구축 및 대응 시나리오 표준화`,detail:`WhaTap 히트맵 기반 연동 실패 패턴을 분석해 오류 유형별 대응 시나리오를 매뉴얼화하고, 데이터 보정 스크립트 정비 및 장애 발생 시 동일한 절차로 즉시 대응 가능한 운영 체계 마련`,result:`주간 Kafka 오류 70건 → 5건 미만 (93% 감소)`},{title:`이기종 DB 연동 유지보수 및 데이터 정합성 자동 검증`,detail:`Oracle ↔ MySQL 인코딩 차이 이슈를 Java 바이트 변환 로직(SUBSTRB)·Subscriber 로직 수정으로 근본 해결, 연동 검증 로직을 공통 모듈로 표준화하여 신규 연동 추가 시 자동 적용`,result:`인코딩 오류 95% 감소, 신규 연동 실패율 5% 미만 유지`},{title:`청구 도메인 기반 요금·위약금 조회 API 신규 개발`,detail:`고객 계약·요금제·청구 정보를 통합 조회하는 REST API를 설계·개발하여 상담 시스템의 실시간 요금·위약금 조회 기능 구현`,result:`요금 분석 시뮬레이터 실시간 조회 API 제공, 3개월 예상 요금 안내 상담 업무 효율 향상`}]}];function On(){return(0,N.jsxs)(`div`,{className:`page-shell`,children:[(0,N.jsx)(`h1`,{children:`Projects`}),(0,N.jsx)(`p`,{className:`page-lead`,children:`운영 안정화·성능 개선·보안 강화를 중심으로 진행한 프로젝트들입니다. 카드를 누르면 상세 업무와 성과를 볼 수 있습니다.`}),(0,N.jsx)(`div`,{className:`project-index-list`,children:Dn.map(e=>(0,N.jsxs)(Ft,{to:j.project(e.slug),className:`project-index-card`,children:[(0,N.jsxs)(`div`,{className:`project-index-head`,children:[(0,N.jsx)(`h2`,{children:e.shortTitle||e.title}),(0,N.jsxs)(`span`,{className:`project-index-period`,children:[e.period,` · `,e.role]})]}),(0,N.jsx)(`p`,{className:`project-index-description`,children:e.description}),(0,N.jsx)(`div`,{className:`project-index-results`,children:e.achievements.slice(0,2).map(e=>(0,N.jsx)(`span`,{className:`project-index-result`,children:e.result},e.title))}),(0,N.jsx)(`span`,{className:`project-index-more`,children:`자세히 보기 →`})]},e.slug))})]})}function kn({text:e}){let{main:t,sub:n}=Kt(e);return(0,N.jsxs)(`h2`,{className:`project-title`,children:[(0,N.jsx)(`span`,{children:t}),n?(0,N.jsx)(`span`,{className:`project-title-sub`,children:n}):null]})}function An({achievement:e}){return(0,N.jsxs)(`li`,{className:`achievement-item`,children:[(0,N.jsx)(`strong`,{className:`achievement-title`,children:e.title}),e.detail?(0,N.jsx)(`p`,{className:`achievement-detail`,children:e.detail}):null,e.result?(0,N.jsxs)(`p`,{className:`achievement-result`,children:[`→ `,e.result]}):null,e.references?.length?(0,N.jsxs)(`div`,{className:`achievement-references`,children:[(0,N.jsx)(`span`,{children:`참고 기사 ↗`}),e.references.map(e=>(0,N.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noopener noreferrer`,className:`achievement-link`,children:e.text},e.href))]}):null]})}function jn({project:e,prev:t,next:n}){return(0,N.jsxs)(`div`,{className:`page-shell`,children:[(0,N.jsx)(Ft,{to:j.projects,className:`page-back-link`,children:`← 프로젝트 목록`}),(0,N.jsxs)(`article`,{className:`project`,children:[(0,N.jsxs)(`div`,{className:`project-header`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`span`,{className:`project-eyebrow`,children:`Project`}),(0,N.jsx)(kn,{text:e.title}),e.description?(0,N.jsx)(`p`,{className:`project-description`,children:e.description}):null]}),(0,N.jsx)(`div`,{className:`project-meta`,children:(0,N.jsxs)(`div`,{className:`meta-card`,children:[(0,N.jsx)(`span`,{className:`meta-label`,children:`기간 / 역할`}),(0,N.jsxs)(`strong`,{children:[e.period,` / `,e.role]})]})})]}),(0,N.jsxs)(`section`,{className:`project-block accent-block`,children:[(0,N.jsx)(`h3`,{children:`주요 업무`}),(0,N.jsx)(`ul`,{className:`project-list`,children:e.mainTasks.map(e=>(0,N.jsx)(`li`,{children:e},e))})]}),(0,N.jsxs)(`section`,{className:`project-block`,children:[(0,N.jsx)(`h3`,{children:`주요 성과`}),(0,N.jsx)(`ul`,{className:`project-list achievement-list`,children:e.achievements.map(e=>(0,N.jsx)(An,{achievement:e},e.title))})]}),(0,N.jsxs)(`div`,{className:`tech-stack-shell`,children:[(0,N.jsx)(`h3`,{children:`보유 기술`}),(0,N.jsx)(`div`,{className:`tech-stack-grid`,children:e.skills.map(e=>(0,N.jsxs)(`div`,{className:`tech-stack-card`,children:[(0,N.jsx)(`span`,{className:`meta-label`,children:e.label}),(0,N.jsx)(`p`,{children:e.value})]},e.label))})]})]}),(0,N.jsxs)(`nav`,{className:`project-pager`,"aria-label":`프로젝트 이동`,children:[t?(0,N.jsxs)(Ft,{to:j.project(t.slug),className:`project-pager-link`,children:[(0,N.jsx)(`span`,{children:`← 이전 프로젝트`}),(0,N.jsx)(`strong`,{children:t.shortTitle||t.title})]}):(0,N.jsx)(`span`,{}),n?(0,N.jsxs)(Ft,{to:j.project(n.slug),className:`project-pager-link next`,children:[(0,N.jsx)(`span`,{children:`다음 프로젝트 →`}),(0,N.jsx)(`strong`,{children:n.shortTitle||n.title})]}):(0,N.jsx)(`span`,{})]})]})}function Mn({message:e=`요청한 페이지를 찾을 수 없습니다.`}){return(0,N.jsxs)(`div`,{className:`not-found-page`,children:[(0,N.jsx)(`span`,{className:`not-found-code`,children:`404`}),(0,N.jsx)(`h1`,{children:e}),(0,N.jsx)(`p`,{children:`주소가 변경되었을 수 있습니다. 아래 링크로 이동해 주세요.`}),(0,N.jsx)(Ft,{to:j.home,className:`not-found-link`,children:`홈으로 돌아가기`})]})}function Nn(){let{slug:e}=Xe(),t=Dn.findIndex(t=>t.slug===e);return t===-1?(0,N.jsx)(Mn,{message:`요청한 프로젝트를 찾을 수 없습니다.`}):(0,N.jsx)(jn,{project:Dn[t],prev:Dn[t-1],next:Dn[t+1]})}var Pn=`---\r
title: csql과 nohup — 운영 중인 DB에 수백만 건 패치를 조용히 밀어 넣는 법\r
date: 2026-07-08\r
tags: DB, Linux, Security, Operations\r
summary: 개인정보 컬럼 대량 암호화 패치를 서비스 중단 없이 처리한 기록 — nohup 백그라운드 실행, 분할 커밋, 로그 기반 모니터링까지 대량 DML 작업의 절차 정리\r
---\r
\r
한 OTT 서비스의 본인확인 값(CI) 유출 사고가 보도된 적이 있다. 남의 일이 아니었다.\r
우리 시스템에도 가입·인증 과정에서 수집한 개인정보 컬럼이 **평문으로** 저장된\r
테이블이 있었다. 유출 사고는 터진 뒤에 막을 수 없다 — 보도를 본 그 주에\r
해당 컬럼들을 DB 암호화 솔루션 함수로 **선제 암호화하는 패치**를 하기로 했다.\r
\r
문제는 규모와 조건이었다. 대상은 수백만 건, 그리고 **서비스는 멈출 수 없다.**\r
\r
## 왜 애플리케이션이 아니라 DB에서 직접 했나\r
\r
애플리케이션에 배치 기능을 만들어 처리할 수도 있었다. 하지만 이건 일회성\r
패치다. 한 번 쓰고 버릴 코드를 애플리케이션에 넣어 배포하는 것보다,\r
**DB 서버에서 SQL 스크립트로 직접 실행**하는 편이 영향 범위도 작고 빠르다.\r
DB의 CLI 도구(csql)로 스크립트 파일을 실행하는 방식을 택했다.\r
\r
\`\`\`bash\r
csql -u <계정> <DB명> -i encrypt_patch.sql\r
\`\`\`\r
\r
여기서 첫 번째 함정을 만난다. 이렇게 포그라운드로 실행하면 **내 SSH 세션이\r
프로세스의 생명줄**이 된다. 수백만 건 UPDATE가 도는 중에 VPN이 끊기거나\r
노트북이 절전 모드로 들어가면, 세션 종료와 함께 SIGHUP이 날아가 작업이\r
중간에 죽는다. 대량 DML이 중간에 죽으면 "어디까지 반영됐는지"부터 다시\r
조사해야 하는 최악의 상황이 된다.\r
\r
## nohup — 세션과 프로세스의 생명줄을 끊어두기\r
\r
그래서 실행 명령을 이렇게 바꿨다.\r
\r
\`\`\`bash\r
nohup csql -u <계정> <DB명> -i encrypt_patch.sql > encrypt_patch.log 2>&1 &\r
\`\`\`\r
\r
한 줄이지만 네 가지 장치가 들어 있다.\r
\r
| 조각 | 역할 |\r
|---|---|\r
| \`nohup\` | 터미널이 끊겨도(SIGHUP) 프로세스를 죽이지 않음 |\r
| \`> encrypt_patch.log\` | 표준 출력을 로그 파일로 — 진행 내역이 파일에 남는다 |\r
| \`2>&1\` | 표준 에러도 같은 파일로 — 오류가 화면과 함께 증발하지 않는다 |\r
| \`&\` | 백그라운드 실행 — 터미널을 점유하지 않고 즉시 프롬프트 반환 |\r
\r
실행 직후 프로세스 ID를 확인해 두고, 진행 상황은 로그를 따라가며 본다.\r
\r
\`\`\`bash\r
jobs -l                      # 방금 띄운 백그라운드 작업과 PID 확인\r
tail -f encrypt_patch.log    # 실시간 진행 모니터링\r
ps -ef | grep csql           # 세션을 새로 열었을 때 생존 확인\r
\`\`\`\r
\r
이제 SSH가 끊겨도 패치는 서버에서 계속 돈다. 다시 접속해서 \`tail\`로 로그만\r
이어 보면 된다. 원격 작업의 불안 요소(네트워크, 세션 타임아웃)와 DB 작업의\r
안정성이 분리된 것이다.\r
\r
## 무중단의 핵심 — 트랜잭션을 잘게 쪼개기\r
\r
nohup은 "작업이 죽지 않게" 해줄 뿐, "서비스에 지장이 없게" 해주지는 않는다.\r
운영 중 대량 UPDATE의 진짜 위험은 **락과 긴 트랜잭션**이다. 수백만 건을\r
한 트랜잭션으로 묶으면 커밋까지 해당 row들의 락이 유지되고, 같은 row를\r
만지는 실사용자 트랜잭션이 줄줄이 대기한다. 롤백이라도 나면 그 시간 동안\r
DB가 후폭풍을 감당해야 한다.\r
\r
그래서 스크립트를 **범위 분할 + 분할 커밋** 구조로 짰다.\r
\r
\`\`\`sql\r
-- encrypt_patch.sql (개념 구조)\r
-- 키 범위로 잘라서, 블록마다 커밋\r
UPDATE member_auth\r
SET    ci_val = ENC_FN(ci_val)          -- 암호화 솔루션 함수\r
WHERE  member_id BETWEEN 1 AND 10000\r
AND    enc_yn = 'N';                     -- 재실행 대비: 미처리 건만\r
COMMIT;\r
\r
UPDATE member_auth\r
SET    ci_val = ENC_FN(ci_val)\r
WHERE  member_id BETWEEN 10001 AND 20000\r
AND    enc_yn = 'N';\r
COMMIT;\r
-- ... 반복\r
\`\`\`\r
\r
- **블록 단위 커밋**: 락 보유 시간이 블록 하나 처리 시간으로 줄어든다.\r
  실사용자 쿼리는 블록 사이사이에 자연스럽게 끼어든다.\r
- **처리 플래그(미처리 조건)**: 중간에 죽어도 같은 스크립트를 다시 돌리면\r
  안 된 것만 이어서 처리된다 — 재실행 가능(idempotent)하게 만드는 것이\r
  대량 작업의 보험이다.\r
- **저부하 시간대 실행**: 그래도 부하는 부하라서, 트래픽이 가장 적은\r
  시간대에 실행을 걸었다.\r
\r
## 실행 전후 — 대사(對査)로 마무리\r
\r
실행보다 중요한 게 앞뒤 절차였다.\r
\r
1. **사전**: 대상 테이블 백업, 대상 건수 확정(\`COUNT\`), 샘플 row로\r
   암·복호화 왕복 테스트 — 함수를 잘못 걸면 데이터가 복구 불가로 깨진다.\r
2. **실행 중**: \`tail -f\`로 로그 확인 + 운영 화면에서 해당 기능 응답 속도\r
   체감 확인 — 서비스 지장 여부를 패치 도는 동안 계속 본다.\r
3. **사후**: 처리 건수와 대상 건수 대사, 암호화 컬럼 샘플 복호화 검증,\r
   애플리케이션 조회 화면 정상 동작 확인.\r
\r
패치는 서비스 중단 없이 완료됐고, 사용자 쪽에서는 아무 일도 없던 하루였다.\r
아무 일도 없던 것처럼 보이는 게 이 작업의 성공 조건이었다.\r
\r
이후 이 절차(nohup 백그라운드 + 분할 커밋 + 로그 모니터링 + 전후 대사)는\r
연계 데이터 정합성 복구 같은 **다른 대량 DB 작업에도 그대로 재사용하는\r
표준 절차**가 됐다.\r
\r
## 배운 점\r
\r
- **nohup 한 줄이 아니라 절차가 무중단을 만든다.** 백그라운드 실행은\r
  시작일 뿐이고, 분할 커밋·재실행 가능 설계·전후 대사가 합쳐져야 "운영 중\r
  대량 작업"이 성립한다.\r
- **대량 DML은 '다시 돌려도 되는가'부터 설계한다.** 중간에 죽는 상황을\r
  전제로 미처리 조건을 걸어두면, 장애가 나도 조사가 아니라 재실행으로\r
  끝난다.\r
- **보안 조치의 타이밍은 사고가 아니라 보도다.** 남의 사고를 보고 우리\r
  데이터를 점검하는 것 — 선제 조치는 거창한 게 아니라 뉴스를 자기 시스템에\r
  대입해 보는 습관에서 시작했다.\r
`,Fn=`---
title: 53초짜리 목록 조회 — CUBRID 쿼리 플랜의 빨간 구간을 지우는 인덱스 설계
date: 2026-03-04
tags: SQL, CUBRID, Performance
summary: 7만 건 목록 조회가 53초 걸리던 운영 화면 — CUBRID 매니저의 쿼리 플랜에서 풀 스캔(sscan) 구간을 찾아 WHERE 조건과 ORDER BY까지 함께 타는 복합 인덱스로 재설계한 기록
---

운영 행정망 화면 중에 접수 목록을 조회하는 화면이 있었다. 대상 데이터는
약 **7만 건** — 요즘 기준으로 큰 데이터가 아니다. 그런데 조회 버튼을 누르면
**53초**가 걸렸다. 운영자는 화면이 죽은 줄 알고 새로고침을 눌렀고, 그러면
같은 쿼리가 한 번 더 돌았다.

7만 건에 53초라면 데이터 양의 문제가 아니라 **데이터를 읽는 방법**의
문제다. DB는 CUBRID였고, 진단은 큐브리드 매니저(CUBRID Manager)의 쿼리
플랜에서 시작했다.

## 진단 — 플랜의 빨간 구간부터

문제의 쿼리는 전형적인 목록 조회였다.

\`\`\`sql
SELECT rcpt_no, rcpt_status, apply_nm, area_cd, reg_dt
  FROM rcpt_list
 WHERE del_yn = 'N'
   AND area_cd = ?
   AND rcpt_status = ?
   AND reg_dt BETWEEN ? AND ?
 ORDER BY reg_dt DESC, rcpt_no DESC
\`\`\`

큐브리드 매니저에서 실행 계획을 열면 비용이 큰 노드가 **빨간색으로
강조**된다. 이 쿼리의 플랜은 두 군데가 빨갰다.

\`\`\`text
Query plan:
  temp(order by)                  ← 정렬을 위한 temp 생성 (빨강)
    sscan                         ← rcpt_list 순차 풀 스캔 (빨강)
      class: rcpt_list
      filter: del_yn='N' and area_cd=? and rcpt_status=? and reg_dt between ...
\`\`\`

CUBRID 플랜에서 \`sscan\`은 테이블을 처음부터 끝까지 읽는 순차 스캔이고,
\`iscan\`이 인덱스 스캔이다. 이 쿼리는 **WHERE에 걸린 컬럼 어디에도 쓸 만한
인덱스가 없어서** 7만 건 전체를 읽은 뒤 필터링하고, 걸러진 결과를 다시
\`temp\` 공간에서 정렬하고 있었다. 읽기도 풀 스캔, 정렬도 별도 작업 — 53초의
정체였다.

## 인덱스 설계 — 컬럼을 어떤 순서로 태울 것인가

"인덱스를 건다"는 결정보다 **어떤 컬럼을 어떤 순서로 거는가**가 본론이다.
후보 컬럼은 WHERE의 4개(del_yn, area_cd, rcpt_status, reg_dt)와 ORDER BY의
2개(reg_dt, rcpt_no)였고, 하나씩 따져봤다.

**1) 등치(=) 조건을 앞에, 범위 조건을 뒤에.**
복합 인덱스는 선두 컬럼부터 순서대로 좁혀 들어간다. \`area_cd = ?\`,
\`rcpt_status = ?\` 같은 등치 조건은 인덱스 앞쪽에 있어야 탐색 범위를 점으로
좁히고, \`reg_dt BETWEEN\`은 범위 조건이라 **범위 조건 뒤의 컬럼은 탐색에
쓰이지 못한다.** 그래서 reg_dt는 등치 조건들 뒤로 보냈다.

**2) 선택도(카디널리티) 낮은 컬럼은 선두에 두지 않는다.**
\`del_yn\`은 'Y'/'N' 두 값뿐이고 운영 데이터의 대부분이 'N'이다. 이런 컬럼을
선두에 두면 인덱스를 타도 거의 전 구간을 훑는다. del_yn은 인덱스에서
빼고 필터로 남기는 것과, 맨 뒤에 포함하는 것을 비교해 본 뒤 뒤쪽에
포함하는 것으로 정리했다 — 커버링 효과로 테이블 접근을 줄이는 쪽이
근소하게 나았다.

**3) ORDER BY까지 인덱스로 해결할 수 있는지 본다.**
정렬 컬럼(reg_dt DESC, rcpt_no DESC)이 인덱스 순서와 이어지면 DB는 정렬
작업 없이 **인덱스를 읽는 순서 그대로** 결과를 내놓는다. 플랜의
\`temp(order by)\` 노드를 지우는 방법이다. 등치 조건 뒤에 reg_dt를 두고,
그 뒤에 rcpt_no를 붙이면 WHERE와 ORDER BY가 한 인덱스에서 끝난다.
정렬 방향도 함께 본다 — 두 컬럼 모두 DESC로 방향이 일치해서 역순 스캔으로
처리 가능했다.

정리된 인덱스는 이렇다.

\`\`\`sql
CREATE INDEX ix_rcpt_list_01
    ON rcpt_list (area_cd, rcpt_status, reg_dt DESC, rcpt_no DESC, del_yn);
\`\`\`

\`\`\`text
등치(area_cd, rcpt_status) → 범위+정렬(reg_dt) → 정렬 보조(rcpt_no) → 필터(del_yn)
\`\`\`

## 함께 잡은 것 — 인덱스를 무력화하는 조건절

인덱스를 만들어도 조건절이 인덱스를 못 쓰게 막는 패턴이 화면 곳곳에
있었다. 같은 화면의 다른 조회에서 발견한 두 가지다.

\`\`\`sql
-- (1) 컬럼을 함수로 가공 — 인덱스의 정렬 기준이 깨져서 못 탄다
WHERE TO_CHAR(reg_dt, 'YYYYMMDD') = ?

-- 컬럼은 그대로 두고 파라미터 쪽을 범위로 가공한다
WHERE reg_dt >= ? AND reg_dt < ?   -- 해당 일자 00:00 ~ 다음날 00:00
\`\`\`

\`\`\`sql
-- (2) 선행 와일드카드 — 시작점을 알 수 없어 풀 스캔
WHERE apply_nm LIKE '%' || ? || '%'

-- 업무 협의로 전방 일치 검색으로 변경 (이름 검색은 앞자리 입력이 자연스러움)
WHERE apply_nm LIKE ? || '%'
\`\`\`

마지막으로 \`UPDATE STATISTICS ON rcpt_list;\`로 통계 정보를 갱신했다.
인덱스가 있어도 통계가 낡으면 옵티마이저가 엉뚱한 판단을 한다.

## 결과

같은 조건으로 다시 실행한 플랜은 이렇게 바뀌었다.

\`\`\`text
Query plan:
  iscan                           ← 인덱스 스캔, 빨간 구간 없음
    class: rcpt_list
    index: ix_rcpt_list_01
\`\`\`

\`sscan\`이 \`iscan\`으로 바뀌었고, 정렬 \`temp\` 노드는 사라졌다. 조회 시간은
**53초 → 1초 미만**. 이후 월간 운영 점검에서 이 화면의 Slow Query
특이사항은 0건으로 유지됐다.

## 배운 점

- **튜닝은 플랜을 여는 데서 시작한다.** "느리다"는 증상만으로 인덱스를
  추측해서 걸면 안 걸리는 인덱스만 늘어난다. 빨간 구간(고비용 노드)이
  어디인지 — 읽기인지 정렬인지 — 를 먼저 확인하면 고칠 곳은 한 군데로
  좁혀진다.
- **인덱스 설계는 컬럼 나열이 아니라 순서 결정이다.** 등치 → 범위 → 정렬의
  배치, 선택도, 정렬 방향까지 맞아야 WHERE와 ORDER BY가 인덱스 하나로
  끝난다. 순서가 틀린 복합 인덱스는 없는 것과 비슷하다.
- **인덱스는 공짜가 아니다.** INSERT/UPDATE마다 인덱스도 갱신된다. 접수
  테이블은 조회가 압도적이라 남는 장사였지만, 쓰기 위주 테이블이었다면
  같은 결정을 하지 않았을 것이다.
- **조건절 습관이 인덱스를 살리고 죽인다.** 컬럼 가공과 선행 와일드카드는
  아무리 좋은 인덱스도 무력화한다. 인덱스 설계와 쿼리 작성 규칙은 세트로
  다녀야 한다.
`,In=`---\r
title: CWE-209 오류 메시지 정보노출 — 예외 로깅이 보안 결함이 되는 순간\r
date: 2026-08-12\r
tags: Security, Java, SAST\r
summary: e.getMessage() 문자열 조립, printStackTrace 등 예외 정보가 새어 나가던 25여 건을 "고정 문구 + throwable 전달" 원칙으로 통일한 기록\r
---\r
\r
정적분석 도구 코드레이(CodeRay)가 검출한 결함 중 가장 건수가 많았던 유형이\r
**CWE-209(민감한 정보가 포함된 오류 메시지 생성)** 였다. 레거시 Java 코드 곳곳에서\r
예외의 내부 정보가 로그 문자열, 사용자 응답, 심지어 DB 이력 테이블까지 새어 나가고 있었다.\r
\r
## 무엇이 문제인가\r
\r
예외 메시지에는 생각보다 많은 것이 담긴다. 파일 경로, DB 접속 정보 조각, 클래스 구조,\r
호스트/포트 — 공격자에게는 시스템 내부를 추측할 단서가 된다. 문제 코드는 형태가 다양했지만\r
본질은 같았다. **예외 객체의 내부 문자열을 직접 조립해서 내보내는 것.**\r
\r
\`\`\`java\r
// 유형 1 — 예외 원문을 문자열로 조립해 로깅\r
LOGGER.error("[" + e.getClass() + "] : " + e.getMessage());\r
\r
// 유형 2 — 스택트레이스를 표준출력으로\r
e.printStackTrace();\r
\r
// 유형 3 — 예외 원문을 DB 이력에 저장\r
saveHistory(String.format("실패 [에러: %s]", ex.getMessage()));\r
\r
// 유형 4 — 예외 원문을 새 예외 메시지에 담아 전파\r
throw new SQLException(ie.getMessage());\r
\`\`\`\r
\r
## 조치 원칙 — 하나로 통일\r
\r
25여 건을 개별로 고민하지 않고 원칙 하나를 정해 전부 같은 방식으로 조치했다.\r
\r
> **사람에게 보이는 메시지는 고정 문구, 예외 상세는 throwable 인자로만.**\r
\r
\`\`\`java\r
// After — 고정 문구 + throwable 전달\r
LOGGER.error("데이터 처리 중 오류가 발생했습니다.", e);\r
\r
// DB 이력도 고정 메시지만\r
saveHistory("작업 실행 오류");\r
\r
// 예외 전파 시에는 원인을 cause 체인으로\r
throw new SQLException("데이터 읽기 중 오류가 발생했습니다.", ie);\r
\`\`\`\r
\r
로깅 프레임워크(SLF4J/Log4j)는 throwable을 마지막 인자로 받으면 스택트레이스를\r
**서버 로그에만** 온전히 기록한다. 운영자는 원인을 전부 볼 수 있고, 로그 문자열이나\r
응답으로 흘러가는 건 고정 문구뿐이다. 진단 정보를 잃지 않으면서 노출만 막는 구조다.\r
\r
함정 하나 — \`LOGGER.error("오류: {}", e.getMessage(), e)\` 처럼 getMessage를\r
플레이스홀더에 넣는 코드도 있었다. throwable을 넘기고 있으니 괜찮아 보이지만,\r
메시지 원문이 로그 한 줄에 그대로 박히는 건 동일해서 함께 정리했다.\r
\r
## 배운 점\r
\r
- 예외 처리 코드는 "에러 났을 때만 도는 코드"라서 리뷰에서 가장 관대해지기 쉬운 곳이고,\r
  그래서 결함이 가장 많이 쌓여 있었다.\r
- 유형이 4가지여도 조치 원칙이 하나면 25건이 한 방향으로 정리된다. 원칙을 먼저 문서로\r
  합의하고 시작한 것이 일관성을 만들었다.\r
`,Ln=`---\r
title: CWE-330·489·497 — 결함의 절반은 쓰지 않는 코드에 있었다\r
date: 2026-08-12\r
tags: Security, Java, SAST\r
summary: 부적절한 난수, 디버그 코드, 시스템 정보 노출 검출을 추적해 보니 대부분 미사용 벤더 모듈과 테스트 화면 — 진입점 역추적 후 삭제로 종결한 기록\r
---\r
\r
시큐어코딩 점검에서 흥미로운 통계가 하나 나왔다. **CWE-330(부적절한 난수),\r
CWE-489(활성 디버그 코드), CWE-497(시스템 정보 노출)** 검출을 추적해 보니,\r
대부분이 실서비스 코드가 아니라 **아무도 쓰지 않는 코드**에서 나온 것이다.\r
\r
## 발견된 것들\r
\r
- **벤더 인증 모듈 잔재** — 과거에 쓰다 중단한 인증서 로그인 모듈이 통째로 남아\r
  있었다. 그 안의 \`Math.random()\` 기반 세션 ID 생성, 난독화 번들 속 취약 난수가\r
  CWE-330으로 줄줄이 검출됐다.\r
- **진단/샘플 페이지** — 서버의 시스템 프로퍼티 전체를 화면에 덤프하는 벤더 진단용\r
  JSP(CWE-497), 본인확인 연동 샘플, 컴포넌트 테스트 화면(CWE-489).\r
- **테스트 컨트롤러** — 개발 중 연계 테스트용으로 만든 컨트롤러가 배포 대상에\r
  포함되어 있었다.\r
- **미사용 연동 기능** — 쿠키 값으로 사용자를 식별하는 소셜 로그인 연동 코드\r
  (CWE-807, 신뢰할 수 없는 입력 기반 보안 결정). 화면 진입점도, 인터셉터 등록도\r
  없는 죽은 기능이었다.\r
\r
## 조치 — 고치지 않고 지우기 위한 확인 절차\r
\r
이런 코드는 escape를 씌우고 난수를 SecureRandom으로 바꾸는 "수리"가 답이 아니다.\r
**쓰지 않음을 증명하고 지우는 것**이 답이다. 다만 증명 없이 지우면 사고가 나므로,\r
파일마다 같은 절차를 밟았다.\r
\r
1. **진입점 역추적** — 컨트롤러 매핑, 화면 흐름, include/script 로드 관계를 따라\r
   이 파일에 도달하는 경로가 있는지 확인\r
2. **참조 전수검색** — 활성 화면에서의 참조가 0건인지 소스 전체 검색으로 확인\r
3. **실사용 대체재 확인** — 예를 들어 실서비스 인증코드 생성은 \`SecureRandom\`을\r
   쓰고 있음을 확인해서, 삭제 대상이 실기능과 무관함을 기록\r
4. **삭제 + 사유 기록** — 조치 내역에 "미사용 근거"를 남겨 감리에 대응\r
\r
이 절차로 벤더 모듈 디렉터리, 테스트 화면, 테스트 컨트롤러, 미사용 연동 기능을\r
삭제해 수십 건을 종결했다. 파일 하나 지우면 그 안의 검출 여러 건이 함께 사라지므로,\r
건수 대비 효율이 가장 높은 조치이기도 했다.\r
\r
## 덤 — 미사용 유틸의 TOCTOU (CWE-367)\r
\r
파일 목록을 나열한 뒤 각 파일의 상태를 읽는 사이에 파일이 바뀔 수 있다는\r
경쟁조건 검출도 있었다. 확인해 보니 어디서도 인스턴스화되지 않는 파일 감시 유틸.\r
같은 원칙(미사용 확인 → 해당 구간 제거)으로 정리했다.\r
\r
## 배운 점\r
\r
- 취약점의 상당수는 "잘못 짠 코드"가 아니라 **"지웠어야 할 코드"** 에서 나온다.\r
  벤더 샘플, 테스트 화면, 중단된 연동 — 배포 산출물에 실리는 순간 전부 공격 표면이다.\r
- 삭제는 가장 강력한 보안 조치지만, 근거 없는 삭제는 장애의 지름길이다.\r
  "진입점 역추적 → 참조 검색 → 사유 기록"의 절차화가 삭제를 안전한 조치로 만들었다.\r
`,Rn=`---\r
title: CWE-404·496 — 자원 해제와 방어적 복사, 객체를 안전하게 다루는 두 가지\r
date: 2026-08-12\r
tags: Security, Java, SAST\r
summary: 수동 close를 try-with-resources로 전환하고(CWE-404), setter의 배열 참조 저장을 방어적 복사로 바꾼(CWE-496) 조치 기록\r
---\r
\r
건수는 적지만 Java의 기본기를 묻는 두 유형을 함께 정리한다.\r
**CWE-404(부적절한 리소스 종료/해제)** 와 **CWE-496(Private 배열에 Public 데이터 할당)**.\r
\r
## CWE-404 — 예외가 나면 close는 실행되지 않는다\r
\r
레거시 코드의 스트림 처리는 대부분 이런 모양이었다.\r
\r
\`\`\`java\r
// Before — 중간에 예외가 나면 close에 도달하지 못한다\r
OutputStream os = con.getOutputStream();\r
BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"));\r
writer.write(param);\r
writer.flush();\r
writer.close();\r
\`\`\`\r
\r
닫는 코드가 있긴 하다. 문제는 **정상 경로에만 있다**는 것. \`write()\`에서 예외가 나면\r
close는 실행되지 않고 커넥션/스트림이 누수된다. 트래픽이 몰리는 날 서버가 서서히\r
느려지는 종류의 버그다.\r
\r
\`\`\`java\r
// After — try-with-resources: 정상이든 예외든 자동 close\r
try (OutputStream os = con.getOutputStream();\r
     BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"))) {\r
    writer.write(param);\r
    writer.flush();\r
}\r
\`\`\`\r
\r
Java 7의 try-with-resources로 전환하면 선언 역순으로 자동 해제된다.\r
예외별로 중복돼 있던 수동 close 로직도 함께 제거되어 코드가 오히려 짧아졌다.\r
try-with-resources를 못 쓰는 구조(조건부 생성)는 try/finally로 해제를 보장했다.\r
\r
## CWE-496 — setter가 배열 참조를 그대로 저장하면\r
\r
\`\`\`java\r
// Before — 외부 배열의 "참조"를 그대로 보관\r
public void setLocations(Resource[] locations) {\r
    this.locations = locations;\r
}\r
\`\`\`\r
\r
이 코드의 문제는 미묘하다. 호출자가 넘긴 배열을 나중에 수정하면, 이 객체의\r
내부 상태가 **객체 바깥에서 바뀐다.** private 필드라는 캡슐화가 사실상 무력화되는 것.\r
\r
\`\`\`java\r
// After — 방어적 복사: 내 상태는 내 것만 가리키게\r
public void setLocations(Resource[] locations) {\r
    this.locations = (locations == null) ? null : locations.clone();\r
}\r
\`\`\`\r
\r
배열을 복사해서 저장하면 외부 변조가 내부에 닿지 않는다. getter로 배열을 내줄 때도\r
같은 원리(복사본 반환)가 적용된다.\r
\r
## 배운 점\r
\r
- 이 두 유형은 "보안 결함"이라기보다 **견고함의 문제**다. 하지만 자원 누수는 가용성\r
  공격의 통로가 되고, 참조 노출은 검증 우회의 통로가 된다 — 견고하지 않은 코드가\r
  곧 공격 표면이라는 걸 정적분석 룰이 상기시켜 준다.\r
- try-with-resources 전환은 기계적으로 가능한 몇 안 되는 조치라, 이런 유형부터\r
  빠르게 끝내고 판단이 필요한 유형에 시간을 쓰는 순서가 효율적이었다.\r
`,zn=`---\r
title: CWE-476 Null Pointer 역참조 — 검출 15건을 한 곳에서 잡은 이야기\r
date: 2026-08-12\r
tags: Security, Java, SAST\r
summary: NPE 검출 20여 건을 라인 단위가 아니라 근원 단위로 추적해, 공통 유틸 한 곳 수정으로 15건을 일괄 해소한 기록\r
---\r
\r
**CWE-476(NULL 포인터 역참조)** 은 검출 건수만 보면 20건이 넘었다.\r
그런데 검출 위치를 하나씩 열어 보니, 상당수가 **같은 메서드를 가리키고 있었다.**\r
\r
## 검출 15건의 근원은 한 곳이었다\r
\r
여러 화면의 입력 정제 코드가 공통 유틸의 문자열 치환 메서드를 호출하고 있었고,\r
정적분석은 호출 지점마다 결함을 하나씩 찍었다. 진짜 문제는 치환 메서드 내부에 있었다.\r
\r
\`\`\`java\r
// Before — target/from/to가 null이면 indexOf/substring/length에서 NPE\r
private static String replace(String target, String from, String to) {\r
    int idx = 0;\r
    while ((idx = target.indexOf(from, idx)) != -1) {\r
        target = target.substring(0, idx) + to + target.substring(idx + from.length());\r
        idx += to.length();\r
    }\r
    return target;\r
}\r
\r
// After — 역참조 대상을 메서드 입구에서 직접 가드\r
private static String replace(String target, String from, String to) {\r
    if (target == null || from == null || to == null) {\r
        return target;\r
    }\r
    ...\r
}\r
\`\`\`\r
\r
호출부 15곳을 각각 고치는 대신 **근원 메서드 한 곳에 null 가드**를 넣어\r
검출 15건을 일괄 해소했다. 라인 단위로 따라갔다면 같은 방어 코드가 15곳에\r
복제됐을 것이다.\r
\r
## 나머지 케이스 — "null을 반환할 수 있는 API"들\r
\r
남은 검출은 대부분 표준 API의 null 반환 가능성을 잊은 코드였다.\r
\r
\`\`\`java\r
// System.getProperty는 null을 반환할 수 있다\r
output.write(System.getProperty("line.separator").getBytes());\r
// → non-null이 보장되는 System.lineSeparator()로 교체\r
\r
// getCodeSource(), getLocation()도 null 반환 가능한 체인\r
clazz.getProtectionDomain().getCodeSource().getLocation().getPath()\r
// → 단계별 null 가드 + 디버그 로그는 isDebugEnabled 선평가로 감쌈\r
\`\`\`\r
\r
가장 재미있었던 건은 **API의 계약 자체를 바꾼 케이스**다. 허용되지 않은 호출자면\r
null을 반환하던 내부 메서드가 있었는데, 호출부 4곳이 전부 반환값을 검사 없이\r
사용해서 검출 4건이 나왔다. null 반환을 **예외 throw로 변경**하니 호출부를\r
한 줄도 고치지 않고 4건이 사라졌다 — 실패를 null로 알리는 API는 호출부 수만큼\r
NPE 위험을 복제한다.\r
\r
## 배운 점\r
\r
- 정적분석의 검출 단위는 "라인"이지만 결함의 단위는 "설계"다. 검출 목록을 근원별로\r
  다시 묶는 작업이 조치의 절반이었다.\r
- null 가드를 추가하는 것과 null이 나올 수 없게 만드는 것(non-null API 교체,\r
  예외 계약으로 변경) 중 후자가 가능하면 항상 후자가 낫다. 가드는 잊혀지지만\r
  계약은 컴파일러와 호출부 전체에 강제된다.\r
`,Bn=`---\r
title: CWE-615 주석 속 민감정보 — 주석 처리했다고 사라지는 게 아니다\r
date: 2026-08-12\r
tags: Security, Java, SAST\r
summary: 주석 처리된 코드에 남아 있던 인증 URL·계정 파라미터·하드코딩 password를 삭제한 기록 — 주석은 배포 산출물에도 그대로 실린다\r
---\r
\r
**CWE-615(소스 코드 주석에 민감한 정보 포함)** 로 검출된 건들은 코드를 한 줄도\r
실행하지 않는 "죽은 텍스트"였다. 그런데 조치 우선순위는 높음이었다. 왜일까.\r
\r
## 발견된 것들\r
\r
\`\`\`java\r
// 케이스 1 — 주석 처리된 옛 로그인 코드에 인증 엔드포인트와 파라미터 구성이 통째로\r
//response.sendRedirect(ctx + "/auth_check?username=" + user.getId() + "&password=" + user.getKey());\r
\r
// 케이스 2 — 주석 블록 안의 테스트 main()에 하드코딩 password/salt\r
/*\r
public static void main(String[] args) {\r
    String password = "abc";\r
    String salt = "def";\r
    ...\r
}\r
*/\r
\r
// 케이스 3 — 쓰지 않게 된 password 파라미터 참조가 주석으로 잔존\r
//String password = request.getParameter("password");\r
\`\`\`\r
\r
공통점은 전부 **"나중에 쓸지 몰라서" 주석 처리해 둔 코드**라는 것.\r
기능을 끄면서 지우지 않고 주석으로 남긴 흔적들이다.\r
\r
## 주석이 왜 위험한가\r
\r
- 주석은 컴파일되지 않지만 **소스는 배포·백업·형상관리 어디에나 실려 다닌다.**\r
  소스가 유출되는 순간(저장소 오설정, 백업 유출, 협력사 반출) 주석 속 인증 URL과\r
  파라미터 구성은 실행 코드와 똑같은 가치의 정보가 된다.\r
- 특히 인증 관련 주석 코드는 "이 시스템이 과거에 어떻게 인증했는지, 어떤 파라미터를\r
  받는지"를 알려주는 공격 설계도 역할을 한다.\r
\r
## 조치 — 삭제, 그리고 걱정 내려놓기\r
\r
조치는 전부 **해당 라인 삭제**다. 간단하지만 심리적 저항이 있는 조치이기도 하다.\r
"나중에 필요하면?" — 필요 없다. **형상관리(Git) 이력에 전부 남아 있다.**\r
주석 처리는 버전 관리가 없던 시절의 습관이고, 지금은 지우는 것이 보관이다.\r
\r
## 배운 점\r
\r
- 주석 처리된 코드는 기능적으로는 죽어 있지만 정보로서는 살아 있다.\r
  "주석이니까 괜찮다"는 실행 관점의 판단이고, 보안은 노출 관점으로 판단해야 한다.\r
- 이런 결함이 쌓이는 걸 막는 건 결국 코드 리뷰 문화다 — "주석 처리 말고 삭제하세요,\r
  이력은 Git에 있습니다" 한 마디면 예방되는 유형이다.\r
`,Vn=`---\r
title: CWE-676 위험한 API 사용 — eval을 지우기 전에 해야 하는 일\r
date: 2026-08-12\r
tags: Security, JavaScript, Java, SAST\r
summary: 레거시 JS의 eval 두 종류를 호출부 전수조사 후 안전한 문법으로 대체하고, deprecated API를 정리한 기록\r
---\r
\r
**CWE-676(잠재적으로 위험한 함수 사용)** 검출의 주인공은 예상대로 JavaScript의\r
\`eval\`이었다. 그런데 이 유형의 조치에서 정작 오래 걸린 건 코드를 고치는 일이 아니라,\r
**고쳐도 되는지 확인하는 일**이었다.\r
\r
## 케이스 1 — 문자열 조립 eval은 문법으로 대체된다\r
\r
\`\`\`js\r
// Before — 폼/필드 이름을 문자열로 조립해 eval\r
var fields = eval("document.forms." + formName + "." + fieldName);\r
\r
// After — 대괄호 표기법: 동작 동일, 인젝션 불가\r
var fields = document.forms[formName][fieldName];\r
\`\`\`\r
\r
동적으로 프로퍼티에 접근하고 싶어서 eval을 쓴 전형적인 케이스.\r
JavaScript의 대괄호 표기법이 정확히 이 용도라서, 코드 인젝션 가능성만 제거하고\r
동작은 그대로 유지된다. 90년대 스타일 레거시 JS에서 아주 흔한 패턴이다.\r
\r
## 케이스 2 — 콜백 eval, 지우기 전에 전수조사\r
\r
\`\`\`js\r
// Before — 콜백이 문자열이면 eval로 실행\r
if (typeof callback === "function") {\r
    callback();\r
} else if (callback) {\r
    eval(callback);\r
}\r
\`\`\`\r
\r
공통 확인창 유틸의 콜백 처리다. 여기서 eval을 그냥 지우면 문자열 콜백을 넘기는\r
화면이 조용히 깨진다. 그래서 먼저 **호출부 22곳을 전수조사**했다.\r
결과: 전부 함수 참조를 넘기고 있었고, 문자열 분기는 실행된 적 없는 dead path였다.\r
\r
확인이 끝났으니 안전하게 대체할 수 있었다.\r
\r
\`\`\`js\r
// After — 문자열이면 전역 함수명으로만 해석 (임의 코드 실행 불가)\r
} else if (typeof window[callback] === "function") {\r
    window[callback]();\r
}\r
\`\`\`\r
\r
## 케이스 3 — deprecated API의 조용한 위험\r
\r
\`\`\`java\r
// Before — 플랫폼 기본 charset에 의존 (deprecated)\r
String enc = URLEncoder.encode(text);\r
\r
// After — charset 명시\r
String enc = URLEncoder.encode(text, "UTF-8");\r
\`\`\`\r
\r
서버 OS 설정에 따라 인코딩 결과가 달라질 수 있는 API. 보안 결함이라기보다\r
이식성 결함에 가깝지만, 인코딩 불일치는 필터 우회의 재료가 되기도 해서 함께 정리했다.\r
\r
## 조치불가 판정 — 서드파티 라이브러리 속 eval\r
\r
오픈소스 JSON 폴리필과 벤더 암호화 번들 안에도 eval 검출이 있었다.\r
난독화·압축된 서드파티 산출물을 직접 수정하는 건 라이선스와 유지보수 양쪽에서\r
부적합하다고 판단해 **"조치불가 + 사유 기록"** 으로 종결했다.\r
모든 검출을 억지로 고치는 것보다, 못 고치는 이유를 남기는 것이 감리 관점에서 정직하다.\r
\r
## 배운 점\r
\r
- eval 제거의 핵심은 대체 문법이 아니라 **영향 범위 확인**이다. 호출부 전수조사 없이\r
  고쳤다면 "보안 조치가 기능을 깨뜨린" 사례가 됐을 것이다.\r
- 정적분석 도구는 서드파티 코드도 가리지 않고 찍는다. 수정/제외/조치불가를 판정하고\r
  사유를 기록하는 것까지가 조치 프로세스다.\r
`,Hn=`---\r
title: CWE-754 부적절한 예외 처리 — catch(Exception)을 걷어내며\r
date: 2026-08-12\r
tags: Security, Java, SAST\r
summary: 광범위한 catch, 무의미한 재던지기, 예외 삼키기, null 미검사 — 네 가지 안티패턴을 걷어낸 예외 처리 정비 기록\r
---\r
\r
**CWE-754(비정상적이거나 예외적인 조건에 대한 부적절한 검사)** 로 검출된 15여 건을\r
정리했다. 하나의 CWE지만 실제 코드에서는 네 가지 안티패턴으로 나타났고,\r
각각 조치 방법이 달랐다.\r
\r
## 안티패턴 1 — 광범위한 catch(Exception)\r
\r
\`\`\`java\r
// Before — 모든 예외를 한 덩어리로\r
try {\r
    executeRemoteCall(config);\r
} catch (Exception e) { ... }\r
\r
// After — try 블록이 실제로 던지는 예외로 좁힘\r
try {\r
    executeRemoteCall(config);\r
} catch (IOException e) { ... }\r
\`\`\`\r
\r
\`catch(Exception)\`은 의도하지 않은 예외(버그로 인한 NPE 등)까지 삼켜서\r
문제를 숨긴다. try 블록이 실제로 던질 수 있는 예외를 확인하고 그것만 잡도록 좁혔다.\r
DB 접근과 일반 로직이 섞인 블록은 \`DataAccessException\` catch를 앞에 추가하는\r
2단 구성으로 갔다.\r
\r
## 안티패턴 2 — 잡아서 그대로 다시 던지기\r
\r
\`\`\`java\r
// Before — catch가 하는 일이 없다\r
try {\r
    return doProceed();\r
} catch (Throwable e) {\r
    throw e;          // 무의미\r
} finally {\r
    stopWatch.stop();\r
}\r
\r
// After — try/finally만 남김 (동작 동일)\r
try {\r
    return doProceed();\r
} finally {\r
    stopWatch.stop();\r
}\r
\`\`\`\r
\r
메서드가 이미 \`throws Throwable\`이고 finally는 어차피 실행되므로,\r
catch 블록은 존재 이유가 없었다. 같은 클래스 안에 복사-붙여넣기로 4곳 반복되어 있었다.\r
\r
## 안티패턴 3 — 예외 삼키기\r
\r
\`\`\`java\r
// Before — 프린트만 하고 아무 일도 없었던 것처럼 진행\r
} catch (Exception e) {\r
    e.printStackTrace();\r
}\r
\r
// After — 로깅하고, 호출자에게 실패를 알림\r
} catch (IOException e) {\r
    LOGGER.error("파일 다운로드 처리 중 오류가 발생했습니다.", e);\r
    throw new IOException("파일 다운로드 처리 중 오류가 발생했습니다.");\r
}\r
\`\`\`\r
\r
삼켜진 예외는 "다운로드가 조용히 안 되는" 유령 버그가 된다. AJAX 응답을 반환하는\r
컨트롤러는 예외를 다시 던지는 대신 \`result=false\`로 정상적인 실패 JSON을\r
반환하도록 바꿨다 — 전파와 응답 중 무엇이 맞는지는 호출자가 누구냐에 따라 갈린다.\r
\r
## 안티패턴 4 — 실패 조건 미검사\r
\r
연결 생성 함수가 실패 시 null을 반환하는데 호출부가 검사 없이 바로 사용하는 코드.\r
null 체크를 추가하는 것으로 조치했지만, 근본적으로는 "실패를 null로 알리는 API"\r
자체가 문제라는 걸 다음 편(CWE-476)에서 다시 만나게 된다.\r
\r
## 배운 점\r
\r
- 같은 CWE 번호라도 코드 현실은 여러 갈래다. 검출 결과를 안티패턴 단위로 다시\r
  분류해야 조치 방법이 명확해진다.\r
- 예외 처리의 기준은 "잡을 수 있는 것만 잡고, 잡았으면 책임진다(로깅+전파 또는\r
  명시적 실패 응답)"로 요약된다. 이 기준에 안 맞는 catch는 대부분 지우는 게 답이었다.\r
`,Un=`---\r
title: CWE-79 크로스 사이트 스크립팅 — 레거시 JSP 200여 건 조치 기록\r
date: 2026-08-12\r
tags: Security, JSP, XSS, SAST\r
summary: 코드레이 정적분석에서 검출된 CWE-79 결함 200여 건을 패턴별로 분류하고, 레거시 JSP 출력 구조를 개편해 조치한 과정 정리\r
---\r
\r
공공기관 웹 시스템의 웹 취약점 점검 과제를 수행하면서, 정적분석 도구 **코드레이(CodeRay)** 가\r
검출한 **CWE-79(크로스 사이트 스크립팅)** 결함 200여 건을 조치했다.\r
대상은 eGovFrame + Spring MVC + JSP 기반의 레거시 시스템이었다.\r
\r
건수는 많았지만 원인은 몇 가지 패턴으로 수렴했다. 그래서 결함을 하나씩 고치기 전에\r
**전체를 유형별로 분류하는 작업부터** 했고, 유형마다 표준 조치 방식을 정한 뒤 일괄 적용했다.\r
이 글은 그 분류와 조치 기준의 기록이다. (예시 코드는 전부 일반화한 것이다.)\r
\r
## 전제 — 이 시스템의 방어 구조\r
\r
이 시스템은 서블릿 필터가 요청 파라미터의 특수문자(\`<\` \`>\` \`"\` \`'\` 등)를\r
HTML 엔티티로 인코딩해서 DB에 저장하는, **입력 측 방어**가 이미 있는 구조였다.\r
\r
문제는 출력 측이었다. JSP에서 EL(\`\${...}\`)을 그대로 출력하는 코드가 화면 곳곳에 있었고,\r
필터를 거치지 않는 값(예외 메시지, 내부 조회 값, 외부 연동 리턴값)은 입력 방어의 보호도 받지 못했다.\r
**방어는 출력 컨텍스트에서 완성된다**는 원칙으로 출력부 전체를 손봤다.\r
\r
## 패턴 1 — HTML 본문의 raw EL 출력 (가장 많음)\r
\r
목록과 상세 화면의 \`<td>\`, \`<div>\` 안에 EL을 그대로 찍는 코드. 전형적인 XSS 출력점이다.\r
\r
\`\`\`jsp\r
<%-- Before --%>\r
<td><div class="txt">\${item.userName}</div></td>\r
\r
<%-- After --%>\r
<td><div class="txt"><c:out value="\${item.userName}"/></div></td>\r
\`\`\`\r
\r
JSTL \`c:out\`은 기본값으로 escapeXml이 켜져 있어 \`<\` \`>\` 등을 엔티티로 치환해 준다.\r
단순해 보이지만 전체 검출의 절반 이상이 이 패턴이었다.\r
\r
### 함정 — "마스킹했으니 안전하다"는 착각\r
\r
이름·전화번호 마스킹 함수를 거친 출력은 안전해 보이지만, 마스킹은 **개인정보 보호**이지\r
**escape가 아니다**. 마스킹 후에도 남는 문자열에 스크립트 조각이 살아 있을 수 있다.\r
그래서 마스킹 함수 출력부도 예외 없이 \`c:out\`으로 감쌌다.\r
\r
\`\`\`jsp\r
<%-- 마스킹 함수도 escape 대상이다 --%>\r
<c:out value="\${custom:nameMasking(item.userName)}"/>\r
\`\`\`\r
\r
## 패턴 2 — 인코딩 저장값의 이중 처리 (디코딩 + 재이스케이프)\r
\r
입력 필터가 인코딩한 값을 그대로 출력하면 화면에 \`&lt;\` \`&#40;\` 같은 깨진 문자가 보인다.\r
그렇다고 raw로 출력하면 XSS다. 답은 **디코딩해서 원문으로 되돌린 뒤, 출력 시점에 다시 escape**\r
하는 것이다.\r
\r
\`\`\`jsp\r
<%-- Before: 인코딩된 값이 그대로 노출되거나, raw 출력으로 XSS 위험 --%>\r
\${item.address}\r
\r
<%-- After: 커스텀 EL 함수로 디코딩 → c:out으로 재이스케이프 --%>\r
<c:out value="\${custom:decode(item.address)}"/>\r
\`\`\`\r
\r
"입력에서 한 번 막았으니 출력은 자유"가 아니라, 입력 인코딩과 출력 escape는\r
**각자 자기 계층의 계약을 지켜야** 전체가 안전해진다. 주소류 필드처럼 사용자가\r
직접 타이핑하는 값에 이 패턴을 집중 적용했다.\r
\r
## 패턴 3 — HTML을 반환하는 서버 함수 출력\r
\r
셀렉트박스 옵션을 서버 측 공통코드 함수가 \`<option>...</option>\` HTML 문자열로\r
만들어 주는 레거시 구조가 있었다. 이걸 \`c:out\`으로 감싸면 태그가 문자 그대로\r
화면에 노출되어 UI가 깨진다.\r
\r
\`\`\`jsp\r
<%-- Before: 함수가 만든 HTML을 raw EL로 출력 --%>\r
<select>\${custom:codeOptions('CODE_GROUP')}</select>\r
\r
<%-- After: 통제된 raw 출력 전용 커스텀 태그로 이관 --%>\r
<select><egovc:rawHtml value="\${custom:codeOptions('CODE_GROUP')}"/></select>\r
\`\`\`\r
\r
핵심은 **"escape하지 않는 출력"을 없애는 게 아니라, 한 곳으로 모아 통제하는 것**이다.\r
전용 커스텀 태그를 만들어 두면 ① raw 출력 지점이 코드 검색 한 번에 전부 드러나고\r
② "이 태그에는 사용자 입력을 넣지 않는다"는 규칙을 리뷰에서 강제할 수 있다.\r
\`fn:replace\`로 강조 태그(\`<span>\`)를 만들어 raw 출력하던 케이스도 같은 방식으로 정리했다.\r
\r
## 패턴 4 — 에러 페이지의 예외 메시지 출력\r
\r
공통 에러 JSP들이 \`\${exception.message}\`, \`\${pageTitle}\` 같은 값을 그대로 출력하고 있었다.\r
예외 메시지에는 요청 파라미터가 섞여 들어오는 경우가 많아서 reflected XSS의 통로가 된다.\r
\r
\`\`\`jsp\r
<%-- Before --%>\r
<p class="title">\${exception.message}</p>\r
\r
<%-- After --%>\r
<p class="title"><c:out value="\${exception.message}"/></p>\r
\`\`\`\r
\r
에러 페이지는 "화면"으로 잘 인식되지 않아 점검에서 누락되기 쉬운 사각지대였다.\r
이번 조치에서 에러 템플릿 전체를 한 번에 정리했다.\r
\r
## 패턴 5 — 죽은 코드는 고치지 않고 삭제\r
\r
검출 건수 2위는 의외의 곳에서 나왔다. 본인확인 연동 샘플, 인증서 벤더의 진단용 샘플,\r
컴포넌트 테스트 화면 같은 **미사용 JSP**들이 \`request.getParameter()\`를 스크립틀릿으로\r
그대로 출력하고 있었다.\r
\r
\`\`\`jsp\r
<%-- 파라미터를 무방비로 출력하는 벤더 샘플 코드 --%>\r
<li>결과메세지 : <%=RESULT_MSG%></li>\r
\`\`\`\r
\r
이런 파일은 escape를 씌워 "고치는" 것보다, 실제 진입 경로가 없음을 확인하고\r
**삭제해서 공격 표면 자체를 없애는 것**이 맞다고 판단했다. 컨트롤러 매핑과\r
화면 흐름을 역추적해 미사용을 확인한 뒤 40여 건을 파일 삭제로 종결했다.\r
\r
## 패턴 6 — 에디터 본문처럼 escape할 수 없는 값\r
\r
위지윅 에디터로 작성된 게시 본문은 HTML 태그를 보존해야 해서 escape가 불가능하다.\r
이 영역은 raw EL이 화면 여기저기 흩어져 있던 것을 패턴 3의 전용 태그로 모아,\r
**"raw 출력이 허용된 유일한 통로"** 로 단일화했다. 대신 이 값의 안전성은\r
에디터의 허용 태그 정책과 입력 필터가 책임진다는 것을 문서화해 남겼다.\r
\r
## 정리\r
\r
| 패턴 | 조치 | 비고 |\r
| --- | --- | --- |\r
| HTML 본문 raw EL | c:out 래핑 | 마스킹 함수 출력 포함 |\r
| 인코딩 저장값 | 디코딩 + c:out 재이스케이프 | 입력 필터와 역할 분담 |\r
| HTML 반환 함수 | 전용 rawHtml 커스텀 태그 | raw 출력 지점 단일화 |\r
| 에러 페이지 예외 메시지 | c:out 래핑 | 점검 사각지대 |\r
| 미사용 샘플/테스트 JSP | 파일 삭제 | 공격 표면 제거 |\r
| 에디터 HTML 본문 | rawHtml 태그로 통로 단일화 | 정책 문서화 병행 |\r
\r
## 배운 점\r
\r
- **결함 200건 ≠ 문제 200개.** 분류부터 하면 원인은 소수의 패턴으로 수렴하고,\r
  패턴별 표준 조치를 정하면 일관성 있게 빠르게 끝난다. 개별 건을 하나씩 고쳤다면\r
  같은 위치에 다른 방식의 코드가 섞였을 것이다.\r
- **escape는 컨텍스트가 결정한다.** HTML 본문, 태그를 보존해야 하는 본문,\r
  깨진 문자를 되돌려야 하는 인코딩 값 — 같은 XSS 지적이라도 답이 다르다.\r
- **삭제도 조치다.** 쓰지 않는 코드는 고치는 순간부터 다시 유지보수 대상이 된다.\r
  미사용이 확인되면 지우는 것이 가장 확실한 보안 조치였다.\r
- **정적분석 도구와 일하는 법.** 도구는 같은 라인을 중복 검출하기도 하고,\r
  위험하지 않은 출력을 지적하기도 한다. 검출 결과를 그대로 따라가는 게 아니라\r
  코드 맥락을 판단해 조치/제외를 구분하고 사유를 남기는 것까지가 조치다.\r
`,Wn=`---\r
title: MyBatis를 JPA처럼 쓰던 연계 로직 — 범용 동적 쿼리를 정적 쿼리로 되돌리기\r
date: 2026-06-17\r
tags: Java, MyBatis, SQL, Security\r
summary: 테이블명·컬럼명을 문자열 치환으로 조립하던 망간 데이터 동기화 로직을 테이블별 정적 쿼리로 재작성한 기록 — 그리고 대상 목록을 코드에서 뽑았다가 테이블 하나를 누락한 사고의 수습기\r
---\r
\r
내부망과 외부망(인터넷망)에 각각 DB를 두고 게시물·첨부파일을 양방향으로\r
동기화하는 연계 로직이 있었다. 정적분석(코드레이)을 돌리기 **전에** 이 코드를\r
먼저 손봤는데, 결과적으로 스캐너에서 SQL 삽입 검출이 0건으로 나왔다.\r
사전 조치라 조치 목록에는 남지 않은, 그래서 따로 기록해 두고 싶은 작업이다.\r
\r
## 원래 구조 — MyBatis로 만든 "만능 저장소"\r
\r
처음 이 매퍼를 열었을 때 감탄과 걱정이 동시에 들었다. 어떤 테이블이든\r
동기화할 수 있는 **범용 SELECT와 범용 MERGE가 단 두 개의 statement**로\r
구현되어 있었다.\r
\r
\`\`\`xml\r
<!-- 어떤 테이블이든 조회 -->\r
<select id="selectSyncInfo" resultType="map">\r
    SELECT * FROM \${targetTable} WHERE ROW_ID = #{rowId}\r
</select>\r
\r
<!-- 어떤 테이블이든 저장: 컬럼 목록을 Java에서 조립해서 전달 -->\r
<update id="updateSyncInfoReg">\r
    MERGE INTO \${targetTable} USING DUAL\r
    ON (ROW_ID = #{rowId})\r
    WHEN MATCHED THEN UPDATE SET\r
        <foreach collection="updateList" item="item" separator=",">\r
            \${item.columnName} = #{item.columnValue}\r
        </foreach>\r
    WHEN NOT MATCHED THEN INSERT (...동일한 foreach...)\r
</update>\r
\`\`\`\r
\r
Java 쪽에서 대상 테이블명과 컬럼 목록(메타데이터)을 만들어 넘기면, 매퍼가\r
그걸 문자열로 끼워 넣어 SQL을 완성한다. 새 테이블을 연계 대상에 추가할 때\r
**SQL을 한 줄도 안 써도 되는** 구조 — MyBatis를 사실상 JPA의 범용\r
리포지토리처럼 쓰고 있었던 셈이다. 설계자의 의도는 이해가 갔다. 연계 대상\r
테이블이 계속 늘어나는 시스템에서 반복 작업을 없애고 싶었을 것이다.\r
\r
## 무엇이 위험했나\r
\r
MyBatis에서 \`#{}\`는 PreparedStatement 바인딩 변수가 되지만, **\`\${}\`는 단순\r
문자열 치환**이다. 위 구조에서 문자열로 치환되는 것은 세 가지 — 테이블명,\r
UPDATE 컬럼명들, INSERT 컬럼명들. 즉 **SQL의 뼈대 전체가 런타임에 문자열로\r
조립**되고 있었다.\r
\r
- 당장은 테이블명·컬럼명이 내부 코드에서만 오지만, 이 DAO를 호출하는 경로가\r
  하나라도 외부 입력과 닿는 순간 그대로 SQL 삽입이 된다. "지금은 안전한\r
  \${}"는 리팩터링 한 번, 재사용 한 번에 무너지는 전제다.\r
- 실행될 SQL이 소스 어디에도 완성형으로 존재하지 않는다. 정적분석 도구도,\r
  코드 리뷰어도, 6개월 뒤의 나도 **이 코드가 실제로 무슨 SQL을 날리는지\r
  읽을 수 없다.**\r
- \`SELECT *\`와 동적 컬럼 목록은 스키마 변경에 조용히 휩쓸린다. 컬럼이\r
  추가되면 어느 날부터 의도치 않은 컬럼까지 동기화되고, 그걸 알아챌 지점이 없다.\r
\r
## 개선 — 테이블을 아는 쿼리로 되돌리기\r
\r
방향은 "범용 1개"를 버리고 **"테이블별 정적 statement"** 로 가는 것이었다.\r
연계 대상 테이블마다 select와 merge를 명시적으로 작성했다.\r
\r
\`\`\`xml\r
<!-- 테이블별 정적 statement: 전부 바인딩 변수, 컬럼 명시 -->\r
<select id="select_TB_BOARD_A" resultType="map">\r
    SELECT POST_ID, TITLE, CONTENT, ATTACH_ID, USE_YN, ROW_ID, ...\r
    FROM   TB_BOARD_A\r
    WHERE  ROW_ID = #{rowId}\r
</select>\r
\r
<update id="merge_TB_BOARD_A">\r
    MERGE INTO TB_BOARD_A USING DUAL\r
    ON (ROW_ID = #{rowId})\r
    WHEN MATCHED THEN UPDATE SET TITLE = #{title}, CONTENT = #{content}, ...\r
    WHEN NOT MATCHED THEN INSERT (...) VALUES (#{postId}, #{title}, ...)\r
</update>\r
\`\`\`\r
\r
그리고 DAO는 테이블명으로 SQL을 조립하는 대신, **statement id를 선택**한다.\r
\r
\`\`\`java\r
// 테이블명은 이제 SQL 조각이 아니라 "실행할 statement의 이름"일 뿐이다\r
public EgovMap selectSyncInfo(SyncVO syncInfo) {\r
    return selectOne("SyncDAO.select_" + syncInfo.getTargetTable().toUpperCase(), syncInfo);\r
}\r
public int mergeSyncInfo(SyncVO syncInfo, EgovMap targetInfo) {\r
    return update("SyncDAO.merge_" + syncInfo.getTargetTable().toUpperCase(), targetInfo);\r
}\r
\`\`\`\r
\r
이 한 줄의 의미가 이번 개선의 핵심이다. 테이블명이 이상한 값이면 예전 구조에서는\r
**그 값이 SQL에 박혀 실행**됐지만, 지금은 **존재하지 않는 statement id라서\r
실행 자체가 거부**된다. 매퍼에 정의된 테이블만 동작하는, 사실상의 화이트리스트가\r
된 것이다. 인터페이스(Service, 스케줄러, 호출부)는 그대로 두고 DAO와 매퍼만\r
바꿨기 때문에 연계 흐름 전체를 재작성하지 않아도 됐다.\r
\r
정리하면서 곁가지 버그도 하나 잡았다. 원본 조회 결과가 없을 때도 merge가\r
실행되어 **반대편 데이터가 전부 NULL로 덮일 수 있는** 경로가 있어서,\r
"원본이 있을 때만 merge, 없으면 skip + 로그" 가드를 넣었다.\r
\r
## 사고 — 대상 목록을 코드에서 뽑은 대가\r
\r
여기까지가 계획대로 된 부분이고, 사고는 그다음에 났다.\r
\r
테이블별 정적 statement를 만들려면 먼저 "연계 대상 테이블 전체 목록"이\r
필요하다. 나는 이 목록을 **소스 코드에 하드코딩된 테이블 목록에서 뽑았다.**\r
코드에 열거된 테이블이 곧 연계 대상 전부라고 믿은 것이다.\r
\r
그런데 이 시스템에는 **동기화 이력(hist) 테이블**이 있었다. 실제로 어떤\r
테이블의 어떤 row가 언제 연계됐는지가 전부 기록되는 곳 — 즉 "실제 연계 대상의\r
전수 목록"은 코드가 아니라 **운영 데이터에** 있었다. 이력 테이블을 기준으로\r
뽑았다면 나왔을 테이블 하나가 코드 목록에는 없었고, 그 테이블의 정적\r
statement는 만들어지지 않았다.\r
\r
결과는 **조용한 연계 누락**이었다. 해당 테이블의 변경분만 반대편 DB로 넘어가지\r
않았고, 에러도 없었다 — 동기화 요청 자체가 발생하지 않으니 실패 로그조차 없는,\r
가장 발견하기 어려운 종류의 장애였다. 양쪽 데이터가 어긋난 걸 확인하고서야\r
누락을 알았다.\r
\r
## 수습 — csql과 nohup으로 양쪽을 다시 맞추기\r
\r
누락 statement를 추가하는 건 금방이었지만, 문제는 **누락 기간 동안 벌어진\r
양쪽 데이터의 차이**였다. 애플리케이션 연계 로직으로 밀린 데이터를 재전송하는\r
건 건수가 많아 부적합했고, DB 레벨에서 직접 맞추기로 했다.\r
\r
- 양쪽 DB에서 대상 테이블을 조회해 **차이 나는 row를 식별하는 SQL**과, 그\r
  차이분을 원본 기준으로 맞추는 보정 SQL을 스크립트로 작성했다.\r
- 실행은 DB CLI(csql)로 서버에서 직접 돌리되, 건수가 많아 세션이 끊겨도\r
  중단되지 않도록 **\`nohup\`으로 백그라운드 실행**하고 로그 파일로 진행 상황을\r
  추적했다.\r
\r
\`\`\`bash\r
nohup csql -u <user> <db> -i sync_recover.sql > sync_recover.log 2>&1 &\r
tail -f sync_recover.log   # 진행 상황 모니터링\r
\`\`\`\r
\r
보정 후에는 양쪽 테이블의 건수·키 대사(對査) 쿼리로 정합성을 재확인하고,\r
동기화 이력 테이블 기준으로 **코드의 대상 목록과 실제 연계 이력이 일치하는지**\r
검증하는 것으로 마무리했다.\r
\r
## 잘한 점, 아쉬운 점\r
\r
**잘한 점.**\r
\r
- 스캐너가 돌기 전에 구조적 위험을 스스로 찾아 조치했다. 정적분석은 \`\${}\`를\r
  잘 찍지만, "이 구조가 왜 만들어졌고 어떻게 바꿔야 호출부가 안 깨지는지"는\r
  사람이 판단해야 하는 영역이었다.\r
- SQL이 소스에 완성형으로 존재하게 됐다. 리뷰 가능하고, 스캔 가능하고,\r
  스키마가 바뀌면 매퍼 수정이 강제되므로 변경이 드러난다.\r
- 인터페이스를 유지한 채 내부만 교체해서 영향 범위를 DAO 계층으로 가뒀다.\r
\r
**아쉬운 점 / 부족했던 점.**\r
\r
- **전환 대상 목록을 코드에서 뽑은 것.** 이번 작업 최대의 실수다. "실제로\r
  무엇이 연계되는가"의 진실은 동기화 이력 테이블에 있었는데, 코드에 열거된\r
  목록을 전수라고 믿었다. 그 결과가 위의 누락 사고다.\r
- **누락을 감지할 장치를 함께 만들지 않은 것.** 연계 누락은 에러가 나지 않는\r
  장애라서, 양쪽 건수 대사 같은 정합성 점검이 있었다면 사고 기간이 훨씬\r
  짧았을 것이다. 수습하면서야 대사 쿼리를 만들었다.\r
- **범용성의 편의는 잃었다.** 이제 연계 테이블을 추가하려면 select와 merge\r
  statement 두 개를 손으로 작성해야 한다. 원래 구조가 없애려던 반복 작업이\r
  되살아난 것이고, 이건 명백한 트레이드오프다.\r
- statement id를 문자열 연결로 찾는 방식은 여전히 **런타임에야 오류를 안다.**\r
  등록 안 된 테이블명이 오면 실행은 안 되지만, 컴파일 타임에 잡히는 것도\r
  아니다. enum으로 대상 테이블을 정의해 타입 수준에서 강제하는 것까지 갔어야\r
  했는데, 일정상 거기까지는 못 갔다.\r
- \`SELECT *\`를 명시 컬럼으로 바꾸는 과정은 순수 수작업이었다. 테이블마다\r
  컬럼 목록을 옮겨 적으며 오타 하나가 곧 동기화 누락이 되는 작업이라,\r
  양쪽 DB 실데이터로 왕복 동기화를 검증하는 데 시간이 많이 들었다.\r
\r
## 배운 점\r
\r
- **"어떤 테이블이든 되는 코드"는 "무슨 SQL이 나가는지 아무도 모르는 코드"의\r
  다른 이름이었다.** 추상화가 SQL 텍스트 자체를 숨기기 시작하면, 편의가\r
  보안·가시성 비용으로 전환된다. MyBatis를 쓰기로 한 프로젝트라면 SQL이\r
  보이는 것이 MyBatis의 존재 이유다.\r
- \`\${}\`와 \`#{}\`의 차이는 문법이 아니라 본질이다 — 하나는 SQL을 만들고,\r
  하나는 값을 바인딩한다. "지금은 내부값이라 안전하다"는 코드의 현재만 보는\r
  판단이고, 구조는 미래의 호출자까지 책임져야 한다.\r
- **전수 조사의 기준은 코드가 아니라 운영 데이터다.** 코드는 "이렇게 동작해야\r
  한다"의 기록이고, 이력 테이블은 "실제로 이렇게 동작했다"의 기록이다. 둘이\r
  다를 수 있다는 걸 사고로 배웠다. 마이그레이션·전환 작업의 대상 목록은\r
  반드시 실적 데이터에서 뽑고, 코드 목록과 교차 검증해야 한다.\r
- 조용한 장애가 가장 무섭다. 실패 로그가 남는 장애는 발견되지만, 요청 자체가\r
  발생하지 않는 누락은 정합성 대사 같은 **능동적 점검** 없이는 드러나지 않는다.\r
- 보안 조치에도 트레이드오프 명세가 필요하다. 이번 선택으로 무엇을 얻고\r
  무엇을 포기했는지(편의 ↔ 안전·가시성)를 기록해 둬야, 다음 사람이 "왜\r
  이렇게 번거롭게 해놨지"라며 범용 구조로 되돌리는 일을 막을 수 있다.\r
`,Gn=`---
title: 이 블로그에 글 쓰는 방법
date: 2026-08-11
tags: Guide
summary: DB 없이 마크다운 파일로 운영되는 이 블로그의 글 작성·수정·배포 방법 정리
---

이 블로그는 별도의 서버나 DB 없이 동작합니다. 글 하나가 마크다운 파일 하나이고,
빌드할 때 Vite가 \`src/posts/\` 폴더를 읽어 목록과 상세 페이지를 자동으로 만듭니다.

## 글 추가하기

\`src/posts/\` 폴더에 \`.md\` 파일을 하나 만듭니다. 파일명이 곧 글 주소가 됩니다.

\`\`\`
src/posts/redis-ttl.md   →   /blog/redis-ttl
\`\`\`

파일 맨 위에 글 정보를 씁니다.

\`\`\`markdown
---
title: Redis TTL과 토큰 만료 동기화
date: 2026-08-15
tags: Redis, Spring
summary: 목록 카드에 보여줄 한 줄 요약
---

여기부터 본문입니다. 마크다운 문법을 그대로 쓰면 됩니다.
\`\`\`

## 지원하는 문법

제목(\`#\`, \`##\`), 목록, **굵게**, \`인라인 코드\`, 코드 블록, 인용문, 링크, 표까지
GitHub 마크다운(GFM) 문법을 지원합니다.

| 항목 | 필수 | 설명 |
| --- | --- | --- |
| title | O | 글 제목 |
| date | O | YYYY-MM-DD — 목록 정렬 기준 |
| tags | X | 쉼표로 구분 |
| summary | X | 목록 카드에 표시되는 요약 |

## 수정과 삭제

- 수정: 해당 \`.md\` 파일을 고치면 됩니다.
- 삭제: 파일을 지우면 목록에서도 사라집니다.

## 공개(배포)

\`\`\`bash
npm run build
npm run deploy
\`\`\`

로컬에서 \`npm run dev\`로 미리 확인한 뒤 배포하면 됩니다.

> 참고: Claude Code에게 "오늘 공부한 ○○ 내용으로 블로그 글 초안 만들어줘"라고 하면
> 이 형식에 맞는 파일 생성까지 한 번에 처리할 수 있습니다.
`,Kn=`---\r
title: JSch가 WEB 서버 앞에서 멈춘 날 — Apache MINA SSHD로 서버 용량 모니터링 만들기\r
date: 2026-01-05\r
tags: Java, SSH, Infra, Spring\r
summary: 월말마다 수기로 정리하던 서버 메모리·디스크 현황을 SSH 기반 실시간 화면으로 자동화한 과정 — JSch의 암호화 협상 실패, MINA SSHD 교체, 그리고 함수 하나하나의 선택 이유\r
---\r
\r
운영 업무 중에 매달 반복되는 일이 있었다. **월말이 되면 서버마다 접속해서\r
메모리와 디스크 사용량을 확인하고, 표로 정리해 보고하는 것.** 서버는 인터넷망과\r
업무망에 WEB/WAS가 각각 있어서, 사람이 일일이 터미널로 들어가 \`free\`와 \`df\`를\r
치고 결과를 옮겨 적는 구조였다. 이걸 관리자 화면에서 실시간으로 보이게 만들고,\r
월말 정리도 쌓인 데이터로 하자는 게 시작이었다.\r
\r
## 설계 — WAS가 각 서버에 SSH로 물어본다\r
\r
에이전트를 서버마다 설치하는 방식은 공공 인프라 특성상 승인 비용이 크다.\r
대신 **WAS 애플리케이션이 SSH 클라이언트가 되어 각 서버에 접속해 명령을 실행**하고,\r
결과를 파싱해 DB에 쌓는 구조로 갔다.\r
\r
\`\`\`text\r
[관리자 화면] ← [Controller] ← [DB (수집 이력)]\r
                                   ↑\r
[Quartz 스케줄러(4시간 주기)] → [SSH 클라이언트] → 각 서버 (WEB/WAS × 인터넷망/업무망)\r
                                → free -h / top / df -h 실행 → 파싱 → 저장\r
\`\`\`\r
\r
접속 정보(호스트/계정/비밀번호)는 properties 하드코딩 대신 **DB 테이블로\r
관리**하고 비밀번호 컬럼은 DB 암호화 솔루션으로 암호화했다. 운영 중 서버가\r
추가돼도 재배포 없이 row 하나만 넣으면 수집 대상에 포함된다.\r
\r
## 첫 시도 — JSch, 그리고 암호화 협상 실패\r
\r
Java에서 SSH라면 가장 먼저 나오는 라이브러리가 JSch라서 그걸로 시작했다.\r
로컬에서 개발 서버로는 잘 붙었다. 그런데 **운영 WAS에서 WEB 서버를 찌르는 순간\r
인증 단계도 못 가고 접속이 실패했다.**\r
\r
원인은 코드가 아니라 **암호화 알고리즘 협상(negotiation)** 이었다. SSH는 접속\r
시점에 클라이언트와 서버가 지원하는 키 교환(kex)·호스트 키·암호화 알고리즘\r
목록을 교환해 공통분모를 고르는데, WEB 서버의 sshd는 보안 정책상 구형 알고리즘이\r
비활성화된 상태였고 JSch가 제시하는 목록과 **교집합이 없었다.** 최신 OpenSSH가\r
\`ssh-rsa\`(SHA-1 기반) 같은 구형 방식을 기본 비활성화하는 흐름과, 오래된 JSch가\r
최신 알고리즘을 모르는 상황이 정확히 충돌한 것이다.\r
\r
이걸 파악하는 과정에서 코드 바깥을 봐야 했다. WEB 서버의 \`/etc/ssh/sshd_config\`\r
허용 알고리즘을 확인하고 \`ssh -vvv\` 협상 로그로 양쪽 목록을 비교했다.\r
**WAS에서 WEB으로 가는 길은 애플리케이션 코드가 아니라 인프라 설정이 결정한다.**\r
서버 설정을 낮춰(구형 알고리즘 허용) 맞출 수도 있었지만, 보안 점검을 받는\r
시스템에서 서버 보안 수준을 낮추는 건 답이 아니라고 판단해 클라이언트를 바꿨다.\r
\r
## 교체 — Apache MINA SSHD 2.16.0\r
\r
기준은 하나 — **어떤 운영체제, 어떤 sshd 정책과도 협상이 되는 라이브러리.**\r
MINA SSHD는 활발히 관리되어 최신 키 교환·호스트 키 알고리즘을 지원하고,\r
서버가 무엇을 요구하든 협상이 성립했다.\r
\r
\`\`\`xml\r
<dependency>\r
    <groupId>org.apache.sshd</groupId>\r
    <artifactId>sshd-core</artifactId>\r
    <version>2.16.0</version>\r
</dependency>\r
\`\`\`\r
\r
## 구현 디테일 — 함수 하나하나의 선택 이유\r
\r
### 접속: 모든 비동기 단계에 verify(timeout)\r
\r
\`\`\`java\r
SshClient client = SshClient.setUpDefaultClient();\r
client.start();\r
\r
ClientSession session = client.connect(user, host, port)\r
        .verify(10, TimeUnit.SECONDS)      // 연결 완료를 10초까지만 기다림\r
        .getSession();\r
session.addPasswordIdentity(password);\r
session.auth().verify(10, TimeUnit.SECONDS); // 인증도 동일\r
\`\`\`\r
\r
MINA SSHD의 API는 대부분 **비동기 Future를 반환**한다. \`connect()\`도 \`auth()\`도\r
즉시 리턴되고, \`verify(timeout)\`을 호출해야 완료를 대기한다. 모니터링 대상\r
서버 중 한 대가 죽어 있거나 방화벽에 막혀 있으면 그 지점에서 무한 대기가\r
발생하므로, **연결·인증·채널 오픈·명령 종료까지 모든 단계에 10초 타임아웃**을\r
걸었다. 한 대의 장애가 전체 수집을 멈추면 안 되는 게 모니터링 코드의 제1 요건이다.\r
\r
### 명령 실행: 셸 채널이 아니라 EXEC 채널\r
\r
\`\`\`java\r
ClientChannel channel = session.createChannel(ClientChannel.CHANNEL_EXEC, command);\r
channel.setOut(outputStream);   // 표준출력\r
channel.setErr(errorStream);    // 표준에러 — 반드시 분리\r
channel.open().verify(10, TimeUnit.SECONDS);\r
channel.waitFor(Collections.singletonList(ClientChannelEvent.CLOSED),\r
        TimeUnit.SECONDS.toMillis(10));\r
\`\`\`\r
\r
- **\`CHANNEL_EXEC\`를 선택한 이유**: 셸 채널(\`CHANNEL_SHELL\`)은 대화형 세션이라\r
  프롬프트 파싱, 명령 종료 판별을 직접 해야 한다. EXEC 채널은 명령 하나를 던지면\r
  실행 후 채널이 닫히므로 "닫힘 이벤트 = 명령 종료"로 판별이 명확하다.\r
- **\`setOut\`/\`setErr\` 분리**: 처음엔 출력만 받았는데, 명령이 실패하면 "결과가\r
  비어 있다"는 것만 알 수 있었다. stderr를 분리 수집하니 "명령을 찾을 수 없음"\r
  같은 실패 원인이 로그에 남는다.\r
- **\`waitFor(CLOSED, timeout)\`**: 채널이 닫힐 때까지 대기하되 역시 상한 10초.\r
\r
### 종료: finally에서 채널 → 세션 → 클라이언트 순서로\r
\r
SSH 연결 정리도 비동기라서, 그냥 close만 호출하고 나가면 커넥션이 누수될 수\r
있다. finally 블록에서 **채널 → 세션 → 클라이언트 순으로 명시적으로 닫고**,\r
비동기 정리가 끝날 시간을 짧게 대기한 뒤 진행한다. 이때 한 가지 함정이 있는데 —\r
finally 안에서 close 예외를 그대로 던지면 **try에서 난 원본 예외가 덮여 사라진다.**\r
그래서 원본 예외를 변수에 보관하고, 원본이 있으면 close 예외는 로깅만 하도록 했다.\r
\r
\`\`\`java\r
} catch (Exception e) {\r
    originalException = ...;  // 원본 보관\r
    throw originalException;\r
} finally {\r
    try { session.close(); ... }\r
    catch (Exception e) {\r
        LOGGER.warn("세션 종료 중 오류", e);\r
        if (originalException == null) {   // 원본이 없을 때만 던짐\r
            throw new RuntimeException("세션 종료 중 오류 발생", e);\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### 수집 명령과 파싱 — 왜 이 명령이었나\r
\r
**메모리: \`free -h\`** — 사람이 읽는 단위(G/M)로 나와 파싱 후 화면에 그대로\r
쓸 수 있다. 단, \`-h\`는 \`Gi\`/\`Mi\`(binary 단위)로 출력하므로 보고서 표기에 맞게\r
정규식으로 접미사를 정리했다.\r
\r
\`\`\`java\r
// "2Gi" → "2G", "512Mi" → "512M"\r
value.trim().replaceAll("(?i)(\\\\d+)([KMGT])i", "$1$2");\r
\`\`\`\r
\r
**CPU: \`top\` 우선, \`vmstat\` 폴백** — 서버마다 설치된 도구와 출력 포맷이 미묘하게\r
달라서 단일 명령에 걸 수 없었다.\r
\r
\`\`\`bash\r
# 1차: top 배치 모드 1회 실행에서 user CPU 추출\r
top -bn1 | grep 'Cpu(s)' | awk '{print $2}' | sed 's/%us,//'\r
# 1차가 빈 값이면 2차: vmstat의 idle(15번째 컬럼)을 100에서 빼서 사용률 계산\r
vmstat 1 2 | tail -1 | awk '{print 100-$15}'\r
\`\`\`\r
\r
\`top -bn1\`의 \`-b\`(배치 모드)가 핵심이다 — 화면 제어 문자 없이 텍스트로만 출력돼\r
파싱이 가능해진다. \`vmstat 1 2\`에서 \`2\`인 이유는 첫 샘플이 부팅 이후 누적\r
평균이라 부정확하기 때문에 두 번째 샘플(직전 1초 실측)을 \`tail -1\`로 집는 것이다.\r
파싱된 사용률이 90% 이상이면 화면에 "경고" 상태를 표시한다.\r
\r
**디스크: \`df -h\`** — 전체 파일시스템이 아니라 **마운트 포인트 기준으로 필요한\r
볼륨만** 골라 담았다. 애플리케이션 볼륨은 전 서버 공통으로 수집하고, 공유\r
스토리지 볼륨은 WAS에만 마운트되어 있어 WEB 서버는 파싱에서 제외했다 —\r
서버 역할에 따라 봐야 할 디스크가 다르다는 인프라 지식이 파싱 조건으로\r
들어간 부분이다. 로컬 개발 환경에는 운영과 같은 마운트가 없어서, 같은 코드가\r
로컬에서는 다른 마운트 포인트를 대신 읽도록 분기해 파싱 로직 자체를 테스트할\r
수 있게 했다.\r
\r
### 스케줄러: Quartz와 "Spring Bean이 아닌 클래스"의 함정\r
\r
수집은 Quartz cron(\`0 0 */4 * * ?\`, 4시간 주기)으로 돈다. 여기서 두 가지\r
비자명한 문제를 만났다.\r
\r
1. **Quartz Job은 Spring Bean이 아니다.** \`@Resource\`, \`@Value\` 주입이 동작하지\r
   않는다. 서비스는 \`JobDataMap\`을 통해 넘겨받고, 환경 값은 properties 유틸로\r
   직접 읽는 방식으로 우회했다.\r
2. **이중 수집 방지.** WAS가 2대라 스케줄러도 2곳에서 뜬다. 같은 데이터가 두 번\r
   쌓이지 않도록 properties의 스케줄 활성화 플래그로 **대표 1대만 수집**하게\r
   하고, local/dev 환경은 Spring profile(\`!dev\`)과 서버 타입 검사로 이중 차단했다\r
   — 개발 PC가 운영 서버에 SSH를 날리는 사고를 막는 안전장치다.\r
\r
### 화면 조회: Collectors.toMap이 버그 검출기가 되도록\r
\r
화면은 서버별 최신 1건만 보여주면 되므로, 쿼리가 서버별 최신 데이터만 내려주고\r
Controller는 이를 \`"WAS_1"\`, \`"WEB_2"\` 형태의 키로 Map에 담아 JSP에 넘긴다.\r
\r
\`\`\`java\r
serverList.stream()\r
    .filter(vo -> vo != null && vo.getServerType() != null && vo.getServerNo() != null)\r
    .collect(Collectors.toMap(\r
        vo -> vo.getServerType() + "_" + vo.getServerNo(),\r
        vo -> vo\r
    ));\r
\`\`\`\r
\r
\`Collectors.toMap\`은 **키가 중복되면 IllegalStateException을 던진다.** 보통은\r
merge 함수를 넣어 무마하지만 일부러 넣지 않았다 — 중복이 왔다는 건 "서버별\r
최신 1건" 쿼리가 깨졌다는 뜻이라, 조용히 덮는 것보다 크게 실패해서 로그에\r
드러나는 편이 낫다. 조회가 실패해도 화면은 떠야 하므로 model 속성 주입은\r
finally에서 빈 Map으로라도 보장했다.\r
\r
## 결과\r
\r
관리자 화면에서 메모리 탭 / 시스템(디스크) 탭으로 전 서버 현황을 실시간 조회할\r
수 있게 됐고, 4시간마다 수집된 데이터가 DB에 쌓이면서 월말 용량 보고는\r
"서버 들어가서 적어 오기"에서 "쌓인 데이터 정리"로 바뀌었다.\r
\r
## 배운 점\r
\r
- **라이브러리 선택 기준은 인지도가 아니라 대상 환경과의 호환성이다.** JSch는\r
  훌륭하지만 접속할 서버의 보안 정책과 맞지 않으면 소용이 없다. "무엇에\r
  붙는가"를 먼저 확인해야 한다.\r
- **개발자도 자기 코드가 지나가는 인프라 구간은 읽을 줄 알아야 한다.**\r
  sshd_config, 알고리즘 협상 로그, 마운트 구성, 망 분리 — 이번 기능의 실패\r
  원인과 파싱 조건은 전부 애플리케이션 코드 바깥에 있었다.\r
- **모니터링 코드는 감시 대상보다 튼튼해야 한다.** 전 단계 타임아웃, 명령 폴백,\r
  한 대 실패 시 계속 진행, 원본 예외 보존 — 장애 상황에 동작해야 하는 코드라서\r
  정상 경로보다 실패 경로에 더 많은 코드를 썼다.\r
`,qn=`---
title: 쪼개진 원천 테이블과 달라진 PK 사이 — Kafka 서비스 도메인 GW에서 데이터 정합성 지키기
date: 2025-02-10
tags: Kafka, Java, Spring, Operations
summary: 차세대 전환으로 원천 테이블이 쪼개지고 PK 체계가 바뀌면서 pub/sub 데이터가 어긋나기 시작했다 — 중간에서 형상을 맞춰주는 GW의 구조, 이벤트 토픽 등록 절차, 업무키 매핑, 그리고 엑셀로 DML을 만들어 불일치를 보정하던 운영 기록
---

서비스 도메인 연동 시스템을 운영하며 가장 오래 맡았던 업무 중 하나가 **GW(Gateway) 데이터
연동**이다. 한 문장으로 정리하면 이렇다 — *Kafka pub/sub으로 연동되는
데이터에서 불일치 건을 식별하고 조치해서, 구독 파트의 테이블에 데이터가
정상적으로 만들어지게 하는 일(DI, Data Integrity 업무)*.

## 배경 — 왜 중간에 GW가 필요했나

발행(Pub) 측 시스템이 차세대 전환을 하면서 **기존 원천 테이블들이 여러
테이블로 쪼개졌다.** 테이블만 쪼개진 게 아니라 PK 체계가 바뀌고 UUID가
도입되면서, 발행되는 데이터의 형상 자체가 달라졌다.

문제는 구독(Sub) 측이다. 과금·청구·정산 같은 구독 파트의 테이블은 기존
업무키 기준으로 설계되어 있는데, 발행 데이터는 새 형상으로 내려온다.
그대로 꽂으면 데이터가 안 맞는다. 그래서 **중간에서 형상을 맞춰 주는
GW를 개발**해, 발행 데이터를 구독 파트 테이블 구조로 변환한 뒤 적재하도록
했다.

\`\`\`text
발행 시스템(차세대) --Kafka Pub--> [토픽] --Sub--> GW 변환 --Redis--> 구독 파트 DB
                                                     (과금 / 청구 / 정산)
\`\`\`

용어를 정리하면 — **topic**은 메시지가 발행되고 소비되는 단위,
**payload**는 Producer가 토픽으로 보내는 메시지의 본문(body)이다. GW는
토픽을 구독해서 payload를 받아 변환하고, 중간 저장소(Redis)를 거쳐 구독
파트 DB에 반영한다.

## GW 소스 구조 — 변환 로직의 뼈대

변환을 담당하는 convert 패키지의 중심에는 추상 클래스가 하나 있다.

\`\`\`java
public abstract class AbstractGwService {

    /** payload가 단일 DTO인 경우 */
    public void process(GwPayload payload) { ... }

    /** payload가 계층 구조(레벨 2에 DTO 리스트)인 경우 */
    public void processWithList(GwPayload payload) { ... }

    protected abstract void stepInSrc(...);   // 원천 데이터 해석
    protected abstract void stepInTrgt(...);  // 대상 테이블 반영
}
\`\`\`

- payload의 **레벨 1에만 DTO가 있으면 \`process\`**, **레벨 2에 DTO 리스트가
  있으면 \`processWithList\`**를 탄다.
- 매핑 유형에 따라 구현체가 갈린다. 원천과 대상 테이블이 1:1이면
  \`OneToOneService\`, 원천 하나가 대상 여러 테이블로 갈라지면
  \`OneToManyService\` 계열 구현체가 \`stepInSrc\` / \`stepInTrgt\`를 구현한다.
- 이벤트의 작업 유형 코드(\`eventWorkCd\`)에 따라 **INS / UPD / MER / DEL**
  로 분기한다. MER(merge)은 join 조건 기준으로 있으면 UPDATE, 없으면
  INSERT다.

\`\`\`java     
switch (event.getEventWorkCd()) {
    case INS -> targetDao.insert(row);
    case UPD -> targetDao.update(row);        // joinT로 정의된 조건 컬럼 기준
    case MER -> targetDao.merge(row);
    case DEL -> targetDao.delete(row.getKeys());
}
\`\`\`

구독 진입점에서는 **Dispatcher**가 메시지 헤더를 읽어 사업 구분(MNO/MVNO)
을 판별해 처리 경로를 나누고, 도메인 이벤트는 \`domainEventHandler\`가 받는다.
payload에 필드가 추가되면 공통 DTO 모듈을 수정하고 **각 파트별 pom.xml의
의존성 버전을 올려**(사내 Nexus 배포) 배포하는 것까지가 한 세트다.

## 이벤트 토픽은 어떻게 만들었나 — 메타데이터 테이블

GW의 변환 규칙은 코드에 하드코딩되어 있지 않고 **메타데이터 테이블**로
관리된다. 구조는 크게 세 묶음이다.

\`\`\`text
① 토픽/이벤트         : 토픽 관리 기본, 토픽 이벤트(필드) 관리 기본
② 원천(Pub 쪽)        : 원천 테이블 관리, 원천 컬럼 관리, 이벤트-원천 매핑 상세
③ 대상(Sub 쪽)        : 대상 테이블 관리, 대상 컬럼 관리, 원천-대상 매핑 상세
\`\`\`

- **토픽 관리 테이블**: 토픽 정보를 담는다. ID 채번은 시퀀스 없이
  \`MAX + 1\` 방식을 썼고, 구독 파트에서 토픽을 요청할 때 ID를 함께 주면
  그대로 등록한다.
- **이벤트 관리 테이블**: 이벤트별 필드명 정보를 담는다. 이벤트는 두
  종류로 구분했다 — 이벤트명에 테이블 접두어(TB_)가 붙어 있으면 원천
  테이블 단위로 발행되는 **테이블(create) 토픽**, 붙어 있지 않으면 업무
  단위로 발행되는 **도메인 토픽**.
- **원천/대상 매핑 테이블**: 어떤 원천 컬럼이 어떤 대상 컬럼으로 가는지,
  UPDATE 시 어떤 컬럼을 조건으로 잡는지(join 대상 여부 플래그, 보통 PK)
  를 정의한다. 원천 테이블명은 명명 규칙에 따라 접미어를 붙여 GW용
  구조로 변환해 관리했다.

### 참조 예제 — 신규 이벤트 토픽 등록 절차

청구 파트가 "계약 변경 이벤트를 구독하고 싶다"고 요청했다고 하자.
실제 등록은 이런 순서로 진행했다.

\`\`\`sql
-- 1. 토픽 등록 (ID는 MAX+1 채번, 구독 파트가 지정해 준 ID가 있으면 그대로)
INSERT INTO gw_topic_mgmt (topic_id, topic_nm, event_type, use_yn, reg_id)
VALUES ((SELECT NVL(MAX(topic_id), 0) + 1 FROM gw_topic_mgmt),
        'SVC_CONTRACT_DOMAIN', 'DOMAIN', 'Y', 'GWADM');

-- 2. 이벤트 필드 등록 (payload의 레벨/필드 구조 정의)
INSERT INTO gw_event_mgmt (topic_id, event_id, field_nm, field_level, work_type_yn)
VALUES (:topicId, 'contractChanged', 'cntrUuid', 1, 'N');
-- ... 필드 수만큼 반복. 레벨 2에 리스트가 있으면 processWithList 대상

-- 3. 원천-대상 매핑 등록 (join 대상 컬럼은 플래그로 표시)
INSERT INTO gw_src_trgt_mapg (src_tbl, src_clmn, trgt_tbl, trgt_clmn, join_yn)
VALUES ('CONTRACT_I', 'CNTR_UUID', 'SVC_CONTRACT', 'CNTR_NO', 'Y');
\`\`\`

이 매핑 데이터는 화면이 따로 없어서 **엑셀에 정리한 뒤 INSERT 문으로
만들어 직접 반영**했다. 등록이 끝나면 payload DTO에 필드를 추가하고
파트별 pom 버전을 올려 배포하면 새 토픽이 흐르기 시작한다.

## 핵심 이슈 — 업무 중심키(PK)가 달라졌다

가장 까다로웠던 건 **발행 측과 구독 측의 중심키가 다르다**는 점이었다.

\`\`\`text
원천(차세대) : CNTR_UUID (신규 도입된 UUID) + 이력 시퀀스
구독(서비스 도메인) : CNTR_NO + SVC_NO (기존 업무키 조합)
\`\`\`

원천은 테이블이 쪼개지면서 UUID 기반으로 재설계됐는데, 구독 파트 테이블은
여전히 업무키로 조회·갱신된다. UUID만 담긴 이벤트가 오면 구독 테이블의
어느 행을 갱신해야 하는지 알 수 없다. GW에서 이렇게 맞췄다.

1. **키 매핑의 기준을 정한다** — 신규 생성(INS) 이벤트에는 UUID와 업무키가
   함께 내려온다. 이때 UUID ↔ 업무키 매핑을 만들어 둔다.
2. **매핑을 Redis에 올려 둔다** — 이후 변경(UPD/MER) 이벤트는 UUID만
   들고 오는 경우가 있어서, 적재해 둔 매핑으로 업무키를 해석한 뒤 대상
   테이블의 join 조건(업무키)으로 UPDATE를 친다. 연동 구조에서 Redis가
   낀 이유가 이것이다 — 단순 버퍼가 아니라 **키 해석용 중간 저장소**였다.
3. **join 조건은 메타데이터로 관리한다** — 어떤 컬럼 조합으로 UPDATE
   조건을 잡는지를 매핑 테이블의 join 플래그로 정의해서, 키가 다른
   테이블이 늘어나도 코드 수정 없이 매핑 등록으로 대응했다.

순서도 문제였다. 매핑이 만들어지기 전에 변경 이벤트가 먼저 도착하면 키
해석이 실패한다. 이런 건은 바로 버리지 않고 재처리 대상으로 쌓아 두었다가
매핑이 생긴 뒤 다시 흘렸다.

## 모니터링 — same, mismatch, 그리고 재연동 대기

발행 측과 구독 파트 사이의 데이터 차이는 **GW 모니터링 사이트**에서
실시간으로 확인했다. 대사(비교) 결과는 상태로 나뉜다.

- **same** — 일치. 정상.
- **mismatch** — 불일치. 조치 대상.
- **재연동 대기** — 연동 쿼리가 돌지 않아 다시 실행해야 하는 상태.

mismatch가 뜨면 원인부터 갈랐다. 발행 누락인지, 이벤트 순서 역전인지,
GW 변환 오류인지, 구독 측에서 수기로 데이터를 고쳐서 생긴 차이인지에
따라 조치가 다르기 때문이다. 이렇게 원인 유형별 대응 시나리오를 매뉴얼로
정리해 둔 것이 주간 Kafka 오류를 93% 줄인 모니터링 체계 업무로 이어졌다.

## 불일치 보정 — 엑셀로 DML을 만들던 방법

건수가 적으면 건건이 고치면 되지만, 특정 기간의 이벤트가 통째로 누락되는
식의 **대량 불일치**가 생기면 이야기가 다르다. 이때 쓰던 방법이 엑셀
수작업 DML 생성이었다.

1. **대사 쿼리로 불일치 키 목록을 추출한다.** 원천 스냅샷과 구독 테이블을
   업무키로 비교해서 "구독 측에 없거나 값이 다른" 키와 올바른 값을 뽑는다.
2. **엑셀에 붙여넣고 수식으로 DML을 만든다.** 키와 값이 A, B, C열에
   있다면 마지막 열에 문자열 조합 수식을 건다.

\`\`\`text
="UPDATE svc_contract SET cntr_status = '" & B2 & "', chg_dt = SYSDATE" &
 " WHERE cntr_no = '" & A2 & "' AND svc_no = '" & C2 & "';"
\`\`\`

   아래로 드래그하면 몇천 건의 UPDATE 문이 행 수만큼 만들어진다.
   INSERT 누락 건은 같은 방식으로 INSERT 문을 만들었다.
3. **반영 전에 반드시 역검증한다.** 만들어진 DML의 WHERE 조건으로 먼저
   SELECT를 돌려 **대상 건수가 키 목록 건수와 일치하는지** 확인하고,
   반영 후에는 모니터링 대사를 다시 돌려 mismatch가 same으로 바뀌는지
   확인하는 것까지가 한 사이클이다.

원시적인 방법이라는 건 안다. 하지만 정형화되지 않은 일회성 대량 보정에는
"키 목록을 눈으로 확인하면서 DML을 만들 수 있다"는 점이 오히려 안전장치가
됐다. 그리고 같은 유형의 보정이 반복되기 시작하면 그때 스크립트로
정비했다 — 반복 여부가 자동화의 기준선이었다.

## 배운 점

- **pub/sub 연동의 실전은 토픽 설계가 아니라 키 설계다.** 발행 측과 구독
  측의 중심키가 다르면 그 사이의 해석 계층(GW)이 반드시 필요하고, 키
  매핑이 무너지면 연동 전체가 무너진다.
- **변환 규칙은 코드가 아니라 데이터로 관리할수록 오래간다.** 원천-대상
  매핑을 메타데이터 테이블로 뺀 덕에, 테이블이 늘어나도 매핑 등록만으로
  대응할 수 있었다.
- **정합성 업무의 핵심은 "고치는 것"이 아니라 "확인하는 것"이다.** 대사
  → 보정 → 재대사의 사이클에서 보정은 한 단계일 뿐이고, 앞뒤의 검증이
  없으면 보정이 새로운 불일치를 만든다.
- **수작업과 자동화 사이의 기준을 정해 두면 흔들리지 않는다.** 일회성은
  엑셀로, 반복되면 스크립트로 — 이 기준 덕에 급한 보정과 체계화가 서로를
  방해하지 않았다.
`,Jn=`---
title: 10분짜리 API를 1분 15초로 — 100만 건에서 드러난 N+1과 MyBatis 구조 리팩토링
date: 2024-11-27
tags: Java, Spring, MyBatis, Performance
summary: 1만 건에서는 드러나지 않던 목록 + 연관 리스트 조회의 N+1 문제가 100만 건 테스트 데이터에서 10분짜리 API가 된 사건 — 흩어진 Map 기반 로직을 계층화하고 병렬 처리로 응답 시간을 줄인 뒤, 그 해결의 한계까지 돌아본 기록
---

이전에 참여했던 프로젝트에서 겪은 일이다. 화면에서 도메인 목록을 조회하면
**각 항목에 연관된 상세 리스트**(예: 서비스 목록 → 서비스별 상품 구성)를
함께 붙여 내려주는 API가 있었다.

개발 단계에서는 별다른 문제가 없었다. 테스트 데이터가 **1만 건** 수준이었기
때문이다. 그러다 성능 검증을 위해 **100만 건 규모의 테스트 데이터**를
구성했고, 같은 API의 응답 시간이 **10분**까지 치솟았다.

화면이 느린 정도가 아니라 타임아웃과 싸워야 하는 수준이었다.

문제는 이 API 하나로 끝나지 않았다. 같은 "목록 + 연관 리스트" 조회 패턴이
**화면별로 복사되어 여러 곳에 분산**돼 있었다. 서비스 화면, 상품 화면,
청구 화면이 각자의 컨트롤러와 DAO에 비슷한 로직을 따로 들고 있었기 때문에
한 곳을 고쳐도 다른 화면은 그대로였다.

성능 문제와 구조 문제가 동시에 드러난 상황이었다.

## 왜 당시에는 DB보다 애플리케이션을 먼저 손댔나

이전 운영 경험은 Oracle 기반이었다. Oracle에서는 실행계획을 확인하고
인덱스 접근 경로와 힌트를 살펴보며 쿼리를 튜닝한 경험이 있었다.

하지만 이 프로젝트의 DB는 **MySQL**이었다.

물론 MySQL에도 \`EXPLAIN\`, 인덱스 설계, 옵티마이저 힌트 등 성능을 분석할
방법이 있다. 다만 당시의 나는 MySQL 실행계획과 옵티마이저에 익숙하지
않았다.

그래서 낯선 DB에서 근거 없이 힌트부터 적용하기보다 우선
**내가 구조와 동작을 명확하게 통제할 수 있는 애플리케이션 계층부터
정리하자**고 판단했다.

지금 돌아보면 절반은 맞고 절반은 부족한 판단이었다.

애플리케이션 구조를 정리한 것은 필요했지만, 성능 문제라면 동시에
\`EXPLAIN\`으로 실제 SQL의 접근 경로를 확인했어야 했다. 이 부분은 작업이
끝난 뒤 가장 크게 남은 아쉬움이었다.

## AS-IS — Map과 N+1이 화면마다 흩어져 있었다

성능 이야기 전에 기존 구조부터 봐야 한다.

일부 코드는 컨트롤러가 DAO를 직접 호출하고 있었고, DB에서 조회한
\`Map<String, Object>\`가 **별도의 모델링 없이 컨트롤러와 화면까지
그대로 전달**되고 있었다.

요청 파라미터도 Map, 조회 결과도 Map, 응답도 Map이었다.

\`\`\`java
// AS-IS
public List<Map<String, Object>> getServiceList(Long customerId) {
    Map<String, Object> param = new HashMap<>();
    param.put("customerId", customerId);

    // 1. 서비스 목록 조회
    List<Map<String, Object>> services =
            serviceDAO.selectServiceList(param);

    for (Map<String, Object> service : services) {
        // 2. 서비스마다 연관 상품을 다시 조회
        Map<String, Object> productParam = new HashMap<>();
        productParam.put("serviceId", service.get("ID"));

        List<Map<String, Object>> products =
                serviceDAO.selectProductList(productParam);

        // 3. 조회 결과 Map에 다시 연관 데이터를 추가
        service.put("products", products);
    }

    return services;
}
\`\`\`

이 코드에서 성능상 가장 큰 문제는 단순히 \`for\`문이 있다는 것이 아니었다.

\`\`\`text
서비스 목록 조회           1회
서비스 1의 상품 목록 조회   1회
서비스 2의 상품 목록 조회   1회
서비스 3의 상품 목록 조회   1회
...
\`\`\`

부모 목록이 N건이면 연관 데이터를 가져오기 위한 쿼리도 N번 추가되는
전형적인 **N+1 형태**였다.

조회 대상이 적을 때는 문제가 잘 드러나지 않았다. 하지만 부모 목록의
건수가 커지면서 DB 왕복 횟수도 함께 증가했고, 각 조회가 순차적으로
실행되면서 전체 응답 시간이 누적됐다.

구조적인 문제도 있었다.

**타입이 없었다.**  
Map은 어떤 키를 가져야 하는지 컴파일러가 알지 못한다. \`"ID"\`를 \`"id"\`로
잘못 적어도 컴파일 오류가 발생하지 않고 런타임에서 \`null\`로 드러난다.

**검증 위치가 제각각이었다.**  
필수값이나 길이 검증이 필요한 화면마다 \`if\`문이 흩어져 있었다.

**같은 로직이 복제돼 있었다.**  
같은 도메인 목록을 다루면서도 화면마다 코드 모양이 달랐고, 수정 요청이
들어오면 어느 화면의 어느 사본을 고쳐야 하는지부터 찾아야 했다.

성능만 고쳐서는 같은 문제가 다시 생길 수 있는 구조였다.

## TO-BE — 먼저 계층을 다시 세웠다

그래서 성능 코드를 바로 건드리기보다 애플리케이션의 역할을 먼저 나눴다.

\`\`\`text
Controller
    ↓
Service
    ↓
ServiceImpl
    ↓
DAO
\`\`\`

그리고 계층 사이에 전달되는 객체도 역할에 따라 구분했다.

\`\`\`text
Controller   : HTTP 요청과 응답 처리
Service      : 비즈니스 기능의 계약
ServiceImpl  : 비즈니스 규칙, 트랜잭션, 데이터 조립
DTO          : API 입출력 객체
Model(VO)    : DB 매핑 객체
DAO          : MyBatis를 통한 DB 접근
\`\`\`

화면별로 흩어져 있던 "목록 조회 + 연관 데이터 조립" 로직은
**ServiceImpl 한 곳으로 모았다.**

화면 A와 화면 B가 같은 도메인 데이터를 필요로 한다면 각각 로직을
복사하는 대신 같은 Service 계약을 호출하도록 정리했다.

### DTO — Map 대신 API의 계약을 코드로

\`\`\`java
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDTO {

    private Long id;

    @NotNull(message = "고객 ID는 필수입니다.")
    private Long customerId;

    @NotBlank(message = "서비스명은 필수 입력 항목입니다.")
    @Size(max = 100, message = "서비스명은 100자 이내로 입력해주세요.")
    private String serviceName;

    private String status;
    private LocalDateTime createdAt;
    private List<ProductDTO> products;
}
\`\`\`

Map으로 전달하던 값을 DTO로 바꾸면서 API가 어떤 값을 주고받는지
클래스 선언만으로 확인할 수 있게 됐다.

필수값과 길이 검증도 \`@NotNull\`, \`@NotBlank\`, \`@Size\` 같은 Bean Validation
애노테이션으로 DTO에 모았다.

\`\`\`java
@PostMapping
public ResponseEntity<ServiceDTO> createService(
        @Valid @RequestBody ServiceDTO dto,
        Principal principal) {
    ...
}
\`\`\`

컨트롤러에서는 \`@Valid\`를 통해 입력 검증을 요청하고, 실제 비즈니스
처리는 Service에 위임하도록 역할을 나눴다.

당시에는 하나의 DTO를 생성·수정·응답에 함께 사용하는 형태까지 정리했다.
지금 다시 설계한다면 여기서 한 단계 더 나아가
\`CreateRequest\`, \`UpdateRequest\`, \`Response\`처럼 역할별 DTO를 분리할
것이다.

생성과 수정에서 필요한 필드가 다르고, 응답에만 필요한 필드도 있기 때문이다.

### Model(VO) — DB 계층 전용, 애플리케이션 생성은 Builder로

\`\`\`java
@Getter
public class ServiceItem {

    private Long id;
    private Long customerId;
    private String serviceName;
    private String status;
    private LocalDateTime createdAt;

    @Builder
    public ServiceItem(
            Long customerId,
            String serviceName,
            String status) {
        this.customerId = customerId;
        this.serviceName = serviceName;
        this.status = status;
    }

    public void changeStatus(String status) {
        this.status = status;
    }
}
\`\`\`

DB 매핑 객체와 API DTO도 분리했다.

조회 결과는 MyBatis 매핑을 통해 \`ServiceItem\`으로 받고,
애플리케이션에서 저장용 객체를 생성할 때는 Builder를 사용했다.

여기서 의도적으로 Builder의 생성 대상에서 \`id\`와 \`createdAt\`을 제외했다.

\`\`\`text
id          → DB가 생성
createdAt   → INSERT 시점에 DB가 생성
\`\`\`

DB가 책임지는 값을 애플리케이션 코드에서 임의로 만들어 넣지 못하도록
객체 생성 경계를 좁힌 것이다.

setter도 전부 열어두지 않았다.

\`\`\`java
item.setStatus("ACTIVE");
\`\`\`

대신

\`\`\`java
item.changeStatus("ACTIVE");
\`\`\`

처럼 변경 의도를 메서드 이름으로 드러내도록 했다.

엄밀히 말하면 \`ServiceItem\` 자체가 완전한 불변 객체인 것은 아니다.
상태 변경 메서드가 존재하기 때문이다.

다만 Map과 setter를 여기저기 전달하던 이전 구조보다 **어디에서 어떤
상태 변경이 가능한지 범위를 좁히는 것**이 목적이었다.

### Service / ServiceImpl — 비즈니스 로직을 한곳으로

\`\`\`java
public interface ServiceManagementService {

    ServiceDTO createService(ServiceDTO dto, String username);

    List<ServiceDTO> getServices(Long customerId);

    ServiceDTO updateService(
            Long id,
            ServiceDTO dto,
            String username);

    void deleteService(Long id, String username);
}
\`\`\`

\`\`\`java
@Service
@RequiredArgsConstructor
public class ServiceManagementServiceImpl
        implements ServiceManagementService {

    private final ServiceDAO serviceDAO;

    @Override
    @Transactional
    public ServiceDTO createService(
            ServiceDTO dto,
            String username) {

        ServiceItem item = ServiceItem.builder()
                .customerId(dto.getCustomerId())
                .serviceName(dto.getServiceName())
                .status("ACTIVE")
                .build();

        serviceDAO.insertService(item);

        return toDTO(item);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServiceDTO> getServices(Long customerId) {

        List<ServiceItem> services =
                serviceDAO.selectServices(customerId);

        return services.parallelStream()
                .map(service -> {
                    List<ProductDTO> products =
                            serviceDAO
                                .selectProducts(service.getId())
                                .stream()
                                .map(this::toDTO)
                                .collect(Collectors.toList());

                    return toDTO(service, products);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ServiceDTO updateService(
            Long id,
            ServiceDTO dto,
            String username) {

        ServiceItem item = serviceDAO.selectService(id);

        if (item == null) {
            throw new IllegalArgumentException(
                    "존재하지 않는 서비스입니다.");
        }

        item.changeStatus(dto.getStatus());
        serviceDAO.updateService(item);

        return toDTO(item);
    }

    ...
}
\`\`\`

화면마다 흩어져 있던 존재 여부 확인, 상태 검증, 데이터 조립과
트랜잭션 경계를 ServiceImpl로 모았다.

AS-IS에서는 어떤 화면은 검증하고 어떤 화면은 검증하지 않는 식으로
동일한 도메인 규칙조차 구현 위치에 따라 달라지는 경우가 있었다.

계층을 정리하면서 적어도 같은 기능은 같은 서비스 경로를 통하도록 만들었다.

### Controller — HTTP 처리만 남겼다

\`\`\`java
@Slf4j
@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceManagementService serviceService;

    @PostMapping
    public ResponseEntity<ServiceDTO> createService(
            @Valid @RequestBody ServiceDTO dto,
            Principal principal) {

        ServiceDTO created =
                serviceService.createService(
                        dto,
                        principal.getName());

        return new ResponseEntity<>(
                created,
                HttpStatus.CREATED);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<ServiceDTO>> getServices(
            @PathVariable Long customerId) {

        return ResponseEntity.ok(
                serviceService.getServices(customerId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(
            @PathVariable Long id,
            Principal principal) {

        serviceService.deleteService(
                id,
                principal.getName());

        return ResponseEntity.noContent().build();
    }
}
\`\`\`

컨트롤러에서는 HTTP 요청을 받고 검증을 시작한 뒤 Service를 호출하고,
그 결과를 HTTP 응답으로 변환하는 역할만 남겼다.

비즈니스 규칙이나 DAO 호출이 컨트롤러까지 올라오지 않도록 경계를 정리했다.

## 당시 성능 개선 — N+1을 없앤 것이 아니라 동시에 처리했다

구조를 정리한 뒤 실제 성능 개선에 들어갔다.

당시 적용한 방법은 기존의 순차 루프를 \`parallelStream()\`으로 바꾸는
것이었다.

AS-IS에서는 다음 조회가 순차적으로 진행됐다.

\`\`\`text
상품 조회 1 → 완료
상품 조회 2 → 완료
상품 조회 3 → 완료
상품 조회 4 → 완료
...
\`\`\`

이를 병렬 스트림으로 변경하면서 여러 항목의 연관 데이터 조회가
동시에 진행될 수 있게 했다.

\`\`\`java
services.parallelStream()
        .map(service -> {
            List<ProductDTO> products =
                    serviceDAO
                        .selectProducts(service.getId())
                        .stream()
                        .map(this::toDTO)
                        .collect(Collectors.toList());

            return toDTO(service, products);
        })
        .collect(Collectors.toList());
\`\`\`

여기서 정확히 구분해야 할 것이 있다.

**N+1을 제거한 것은 아니다.**

부모 데이터가 N건이면 연관 데이터를 조회하는 SQL도 여전히 N번 발생한다.
달라진 것은 이 SQL들이 순차적으로 끝나기를 기다리지 않고 일부 요청을
겹쳐 처리했다는 점이다.

즉,

\`\`\`text
쿼리 횟수 감소        X
쿼리 대기 시간 중첩   O
\`\`\`

에 가까운 개선이었다.

\`parallelStream()\` 역시 단순히 "CPU 코어 수만큼 정확하게 실행된다"고
설명할 수 있는 기능은 아니다. 기본적으로 공용 ForkJoinPool을 사용하며
실제 병렬 실행 정도는 실행 환경의 영향을 받는다.

더구나 이 로직은 CPU 계산보다 **DB I/O 비중이 높은 작업**이었다.

따라서 성능 개선 폭은 Java의 병렬 처리만으로 결정되는 것이 아니라
DB가 동시에 처리할 수 있는 요청 수, 애플리케이션의 커넥션 풀 크기,
DB 서버 자원 상태에도 영향을 받는다.

또 하나 뒤늦게 중요하게 본 부분은 트랜잭션 경계다.

Spring의 트랜잭션 컨텍스트는 기본적으로 실행 스레드에 연결되므로,
메서드에 선언된 \`@Transactional(readOnly = true)\`가
\`parallelStream()\`의 각 worker thread에 그대로 전파된다고 가정해서는
안 된다.

당시에는 이러한 부분까지 세밀하게 설계한 것이 아니라
**기존 N+1 구조의 대기 시간을 줄이기 위한 현실적인 개선책으로
병렬 스트림을 적용**했다.

별도의 Executor와 동시성 제한을 두는 방식에 비해 제어 수준이 낮았다는
점도 지금 보면 분명한 한계다.

그럼에도 동일한 테스트 조건에서 Swagger로 반복 확인했을 때
응답 시간은 다음과 같이 줄었다.

\`\`\`text
AS-IS    약 10분
TO-BE    약 1분 15초
\`\`\`

당시 목표였던 응답 시간 단축은 달성했다.

다만 이 숫자가 **N+1 문제가 해결됐다는 의미는 아니었다.**

## 지금 다시 한다면 — 쿼리 횟수부터 줄인다

지금 같은 문제를 다시 만난다면 \`parallelStream()\`부터 적용하지 않을 것이다.

먼저 실제 실행 SQL과 MySQL의 \`EXPLAIN\`을 확인하고,
인덱스와 접근 경로에 문제가 없는지 살펴본 뒤 **N+1 쿼리 자체를
제거하는 방향**을 우선 검토할 것이다.

예를 들어 먼저 부모 목록을 가져온다.

\`\`\`java
List<ServiceItem> services =
        serviceDAO.selectServices(customerId);
\`\`\`

그리고 부모 ID를 모은다.

\`\`\`java
List<Long> serviceIds = services.stream()
        .map(ServiceItem::getId)
        .collect(Collectors.toList());
\`\`\`

연관 상품은 항목별로 조회하는 대신 여러 ID를 묶어 조회한다.

\`\`\`sql
SELECT
       service_id,
       product_id,
       product_name
  FROM product
 WHERE service_id IN (...)
\`\`\`

조회 결과는 애플리케이션에서 \`serviceId\` 기준으로 그룹핑한다.

\`\`\`java
Map<Long, List<ProductItem>> productMap =
        products.stream()
                .collect(
                    Collectors.groupingBy(
                        ProductItem::getServiceId));
\`\`\`

이렇게 하면 핵심은

\`\`\`text
서비스별 DB 호출
        ↓
연관 데이터를 집합 단위로 조회
\`\`\`

로 바뀐다.

조회 대상 ID가 매우 많다면 하나의 거대한 \`IN\` 절을 만드는 것도 좋은
방법은 아니다. 일정 크기로 나눠 batch 조회하거나, 상황에 따라 JOIN이나
다른 조회 전략을 선택해야 한다.

중요한 것은 **동시에 더 많은 SQL을 실행하는 것보다 처음부터 실행해야 할
SQL의 수를 줄이는 것**이다.

당시에는 병렬화까지 적용하고 작업을 마쳤지만, 지금은 그 다음 단계가
어디였는지도 명확하게 알고 있다.

## 컨벤션 가이드 — 리팩토링을 팀의 표준으로

리팩토링 과정에서 또 하나 발견한 문제는
**팀원마다, 화면마다 코드 구조가 다르다는 것**이었다.

누구는 Map을 사용하고 누구는 VO를 사용했다.

같은 목록 조회 기능인데도 어떤 화면은 Controller에서 데이터를 조립하고,
어떤 화면은 Service에서 조립했다. 같은 도메인 규칙도 구현 위치에 따라
조금씩 달랐다.

코드를 고치는 것만으로는 시간이 지나면 다시 같은 구조가 생길 가능성이
높았다.

그래서 이번에 정리한 방향을 기준으로 **코드 컨벤션 가이드 문서**를
작성해 팀에 공유했다.

- 계층 구조는 \`Controller → Service → ServiceImpl → DAO\` 방향으로 유지
- API 입출력 DTO와 DB 매핑 Model(VO)의 역할 분리
- Map 기반 파라미터와 응답 사용 지양
- 애플리케이션에서 객체를 만들 때 Builder 사용
- 무분별한 setter 대신 의도가 드러나는 상태 변경 메서드 사용
- 동일 도메인의 조회·조립 로직은 Service 계층으로 집중
- Bean Validation을 이용한 입력값 검증 위치 통일
- 존재 여부와 비즈니스 상태 검사는 ServiceImpl에서 처리
- 예외 처리 위치와 로그 포맷 통일
- 화면별 동일 로직 복사 금지

코드는 시간이 지나면 다시 바뀐다.

하지만 **"다음 코드는 어떤 모양으로 작성해야 하는가"에 대한 팀의 합의**가
있으면 비슷한 구조적 부채가 반복되는 속도를 줄일 수 있다.

## 배운 점

- **적은 데이터에서 빠른 코드는 빠른 코드라는 증거가 아니다.**  
  1만 건에서는 드러나지 않았던 N+1 구조가 100만 건 규모의 테스트
  데이터에서야 문제가 됐다. 성능 검증은 운영 규모에 가까운 데이터에서
  해야 한다는 걸 체감했다.

- **병목의 핵심은 순차 for문보다 N+1이었다.**  
  당시에는 \`parallelStream()\`으로 여러 DB 대기 시간을 겹치게 만들어
  10분이던 응답을 약 1분 15초까지 줄였다. 하지만 실행되는 SQL 수 자체가
  줄어든 것은 아니었다.

- **병렬화는 처리량을 공짜로 만들어 주지 않는다.**  
  DB 호출을 병렬화하면 애플리케이션뿐 아니라 커넥션 풀과 DB 서버도
  동시에 더 많은 요청을 받아야 한다. \`parallelStream()\` 내부의 작업과
  Spring 트랜잭션의 스레드 경계 역시 별도로 생각해야 한다.

- **구조를 정리하면 성능 변경도 통제하기 쉬워진다.**  
  Map과 화면별 복제 로직을 DTO/Model/Service 구조로 모은 뒤에는
  성능 로직을 변경해야 할 위치도 한 곳으로 좁혀졌다. 병렬 처리 자체보다
  이 구조 정리가 이후 변경의 기반이 됐다.

- **낯선 DB 앞에서 애플리케이션으로 먼저 간 것은 절반만 정답이었다.**  
  애플리케이션 구조 개선은 필요했지만 성능 문제를 다루면서
  MySQL \`EXPLAIN\`과 인덱스를 함께 확인하지 않은 것은 부족했다.
  지금 다시 한다면 DB 접근 경로부터 확인할 것이다.

- **다음 단계는 병렬화가 아니라 쿼리 수 감소였다.**  
  연관 데이터를 ID별로 하나씩 조회하는 대신 집합 단위로 가져오고
  애플리케이션에서 그룹핑하면 N+1 자체를 제거하거나 크게 줄일 수 있다.
  조회 대상이 많다면 IN 절도 적절한 크기로 나누는 전략이 필요하다.

- **당시의 해결과 지금 알고 있는 더 나은 해결을 구분해야 한다.**  
  당시에는 병렬화를 통해 요구된 성능 개선을 만들었다. 지금은 그 방식이
  어떤 조건에서 위험할 수 있고, 무엇을 먼저 개선해야 하는지도 안다.
  과거의 선택을 완벽한 정답으로 포장하기보다 어디까지 해결했고 무엇이
  남았는지를 설명할 수 있는 것이 더 중요하다고 생각한다.

- **리팩토링의 산출물은 코드뿐 아니라 팀의 기준이었다.**  
  한 번 빠르게 만든 코드보다 다음 개발자도 같은 기준으로 작성할 수 있는
  구조와 컨벤션을 남기는 것이 장기적으로 더 큰 효과가 있었다.`,Yn=`---
title: 인덱스가 있는데 왜 안 타지 — 실행계획으로 좁혀간 슬로우 쿼리 튜닝기
date: 2023-01-10
tags: SQL, Oracle, Performance
summary: 스칼라 서브쿼리가 행마다 TABLE ACCESS FULL을 반복하던 조회 쿼리 — Trusted Orange로 플랜을 열고, 묵시적 형변환이라는 원인을 찾고, 인덱스 접근과 쿼리 재작성으로 고쳐간 기록. 그리고 그 과정을 기존 소스와 DBA 보고서에서 배웠다는 이야기
---

시스템을 운영하면서 상담 화면의 청구 목록 조회가 느리다는 문의를 받았다.
특정 월의 청구 목록을 조회하는 쿼리였는데, 데이터가 몰린 고객사를 조회하면
응답이 수십 초까지 늘어졌다.

당시 사용하던 툴은 **Trusted Orange**(Orange for Oracle의 사내 보안
버전)였다. Orange의 Plan 도구에 쿼리를 올리면 실행 계획 트리를 바로 볼 수
있어서, 튜닝은 언제나 여기서 시작했다.

## 실행계획부터 열었다

문제의 쿼리는 청구 목록에 "최근 납부일"을 붙여 주는 형태였다.

\`\`\`sql
SELECT a.bill_no,
       a.cust_no,
       a.svc_cd,
       a.bill_amt,
       (SELECT MAX(p.pay_dt)
          FROM payment p
         WHERE p.bill_no = a.bill_no) AS last_pay_dt   -- 스칼라 서브쿼리
  FROM bill a
 WHERE a.bill_ym = '202212'
   AND a.svc_cd  = ?
\`\`\`

Orange의 플랜 트리는 이렇게 나왔다.

\`\`\`text
SELECT STATEMENT
  TABLE ACCESS (BY INDEX ROWID) OF BILL
    INDEX (RANGE SCAN) OF IX_BILL_YM_SVC        ← 본문은 인덱스를 잘 탄다
  SORT (AGGREGATE)
    TABLE ACCESS (FULL) OF PAYMENT              ← 문제 지점
\`\`\`

본문(bill)은 인덱스를 잘 타는데, **스칼라 서브쿼리 쪽 payment가
\`TABLE ACCESS (FULL)\`**이었다. 스칼라 서브쿼리는 기본적으로 본문 행마다
실행된다. 같은 입력값이 반복되면 Oracle이 결과를 캐싱해 주기도 하지만,
bill_no처럼 행마다 다른 키로 조회하는 경우에는 사실상 행 수만큼 실행된다.
청구 목록이 5천 건이면 payment 풀 스캔이 5천 번 가까이 돈다는 뜻이다.
느린 이유는 쿼리 본문 어디에도 없고, 플랜에만 있었다.

## 원인 — 인덱스는 있는데 타지 않았다

payment 테이블에는 \`bill_no\` 인덱스가 이미 있었다. 그런데도 풀 스캔이
나오는 게 이상해서 컬럼 정의를 확인했다.

\`\`\`text
bill.bill_no     NUMBER
payment.bill_no  VARCHAR2(20)      ← 타입이 다르다
\`\`\`

Oracle은 VARCHAR2와 NUMBER를 비교하면 문자 쪽을 숫자로 변환한다. 추측이
아니라 플랜에 증거가 있었다 — Orange 플랜 하단의 Predicate 정보에
\`TO_NUMBER("P"."BILL_NO")=:B1\`이 찍혀 있었다. 내가 쓰지도 않은
\`TO_NUMBER\`를 옵티마이저가 인덱스 컬럼에 씌우고 있었던 것이다. 인덱스
컬럼에 함수가 걸리면 그 인덱스는 못 쓴다. **인덱스가 없어서가 아니라,
있어도 못 쓰는 조건**이었다.

Oracle은 VARCHAR2와 NUMBER를 비교할 때 암시적 형변환을 수행한다. 추측이 
아니라 플랜에 증거가 있었다 — Orange 플랜 하단의 Predicate 정보에 TO_NUMBER("P"."BILL_NO")=:B1이 찍혀 있었다. 
내가 쿼리에 작성하지 않은 TO_NUMBER()가 payment.bill_no에 적용되고 있었던 것이다. 
결국 인덱스 컬럼에 형변환이 걸리면서 이미 있던 인덱스를 제대로 활용하지 못하고 있었다. 
인덱스가 없어서가 아니라, 있어도 제대로 활용하지 못하는 조건이었다.

지금 생각하면 아찔한 점이 하나 더 있다. \`TO_NUMBER(p.bill_no)\`는
payment에 숫자가 아닌 값이 한 건이라도 섞여 있으면 ORA-01722로 터진다.
느린 것보다 더 나쁜 사고가 잠복해 있던 셈이다.

## 개선 1 — 형변환을 정리하고, 힌트로 접근 경로를 고정

가공이 인덱스 컬럼이 아닌 본문 쪽에 가도록 변환 방향을 명시했다. 그리고
같은 사고가 재발하지 않도록 서브쿼리에 인덱스 힌트를 걸어 접근 경로를
고정했다.

\`\`\`sql
(SELECT /*+ INDEX(p IX_PAYMENT_BILLNO) */
        MAX(p.pay_dt)
   FROM payment p
  WHERE p.bill_no = TO_CHAR(a.bill_no)) AS last_pay_dt
\`\`\`

플랜에서 \`TABLE ACCESS (FULL) OF PAYMENT\`가
\`INDEX (RANGE SCAN) OF IX_PAYMENT_BILLNO\`로 바뀌었다.

다만 \`TO_CHAR\`로 방향을 바꾸는 게 공짜는 아니다. 문자 쪽 컬럼에
\`'00123'\`처럼 선행 0이 붙은 값이 있으면 \`TO_CHAR(123)\`은 \`'123'\`이라
조인이 **오류 없이 조용히 빠진다.** 반영 전에 양쪽 값의 표기 규칙이
일치하는지 데이터로 확인하고 나서야 적용했다. 근본 해결은 두 컬럼의
타입을 맞추는 것이지만, 운영 중인 테이블이라 거기까지는 손대지 못했다.

힌트에 대한 생각도 분명히 해 둘 필요가 있다. **힌트는 원인을 찾은 뒤에
쓰는 고정 장치이지, 원인을 모른 채 쓰는 치료제가 아니다.** 이 케이스의
원인은 묵시적 형변환이었고, 그걸 고친 다음에 "통계나 데이터 분포가 변해도
옵티마이저가 이 경로를 벗어나지 않도록" 힌트로 고정한 것이다. 형변환을
그대로 둔 채 힌트만 걸었다면 인덱스를 탈 수 없으니 힌트는 무시됐을 것이다.

## 개선 2 — 행마다 실행되는 구조 자체를 손보기

인덱스를 태워도 "행 수만큼 실행"이라는 구조는 남는다. 목록이 커질수록
서브쿼리 실행 횟수가 같이 늘어나므로, 조회 건수가 많은 화면은 스칼라
서브쿼리를 조인 + 집계로 재작성했다.

\`\`\`sql
SELECT /*+ LEADING(a) USE_HASH(p) */
       a.bill_no,
       a.cust_no,
       a.svc_cd,
       a.bill_amt,
       p.last_pay_dt
  FROM bill a
  LEFT JOIN (SELECT bill_no, MAX(pay_dt) AS last_pay_dt
               FROM payment
              GROUP BY bill_no) p
    ON p.bill_no = TO_CHAR(a.bill_no)
 WHERE a.bill_ym = '202212'
   AND a.svc_cd  = ?
\`\`\`

payment를 한 번만 읽어 bill_no별로 집계해 두고 본문과 조인하는 구조다.
납부가 없는 청구 건은 스칼라 서브쿼리에서도 NULL, LEFT JOIN에서도
NULL이라 결과는 동일하다. \`LEADING\`/\`USE_HASH\`는 힌트가 없어도
옵티마이저가 대개 같은 계획을 골랐겠지만, 통계 변화로 플랜이 뒤집히지
않도록 고정해 둔 것이다.

물론 이 방식도 공짜는 아니다. 인라인 뷰가 payment **전체**를 집계하기
때문에, 조회 결과가 몇 건 안 되는 화면에서는 필요한 것보다 훨씬 많이
읽는다. 그래서 화면을 나눴다 — 조회 건수가 적은 화면은 개선 1(인덱스 +
스칼라 서브쿼리)을 유지하고, 대량 조회 화면만 개선 2(조인 재작성)를
적용했다.

## 결과

- 플랜에서 반복 실행되던 \`TABLE ACCESS (FULL) OF PAYMENT\` 구간이 사라졌다.
  Orange에서 같은 조건으로 반복 실행하며 확인했고, 고객사와 조회 조건에
  따라 편차는 있었지만 **수십 초 걸리던 조회가 1초 안팎**까지 내려왔다.
- 같은 원인(묵시적 형변환)이 의심되는 조인 조건을 시스템 전체에서 찾아
  같은 방식으로 정리했다 — 타입이 다른 컬럼끼리의 조인은 이 사건 이후
  코드 리뷰 체크 항목이 됐다.

## 덧붙여 — 같은 시기에 배운 PARALLEL 힌트

이 슬로우 쿼리와는 별개의 이야기지만, 비슷한 시기에 배워서 함께 적어 둔다.
모든 풀 스캔이 죄는 아니다. 월 마감 집계처럼 어차피 테이블 전 구간을
읽어야 하는 배치 쿼리는 인덱스로 좁힐 대상이 없다. 이런 쿼리는 풀 스캔을
없애는 게 아니라, 풀 스캔을 여러 병렬 실행 서버로 나눠 읽게 했다.

\`\`\`sql
SELECT /*+ FULL(p) PARALLEL(p 4) */
       p.bill_ym,
       p.svc_cd,
       SUM(p.pay_amt) AS pay_amt
  FROM payment p
 WHERE p.pay_dt >= :from_dt
   AND p.pay_dt <  :to_dt
 GROUP BY p.bill_ym, p.svc_cd
\`\`\`

\`PARALLEL(p 4)\`는 payment 스캔을 병렬 실행 서버 4개로 나누라는 지시다.
플랜에는 \`PX BLOCK ITERATOR\` 아래로 스캔이 갈라져 나타난다. 이상적으로는
병렬도에 비례해 시간이 줄지만, 실제로는 I/O 대역폭과 병렬 서버 가용량에
따라 그보다 덜 줄었다. 쓰면서 지킨 원칙이 있다.

- **인덱스로 좁힐 수 있는 쿼리에는 쓰지 않는다.** PARALLEL은 "읽을 게
  많은 걸 빨리 읽는" 장치지, "읽을 걸 줄이는" 장치가 아니다. 화면 조회를
  PARALLEL로 덮으면 진짜 원인(접근 경로)이 가려진다.
- **병렬도는 공짜가 아니다.** 병렬 서버는 DB 전체가 공유하는 자원이라,
  업무 시간대 온라인 쿼리에 걸면 다른 세션의 자원을 뺏는다. 그래서
  야간 배치와 마감 집계로 용도를 한정했다.

고백하자면 당시 병렬도 4라는 숫자는 내가 계산한 값이 아니었다. 기존
소스의 배치 쿼리들이 4를 쓰고 있어서 따라 쓴 것이고, 왜 4인지는 설명하지
못했다. CPU 코어 수와 동시에 도는 배치 개수를 따져 병렬도를 정해야
한다는 건 나중에 알았다.

## 어떻게 배웠나 — 기존 소스와 DBA의 튜닝 보고서

이 글의 힌트 사용법들은 책이나 매뉴얼에서 체계적으로 배운 게 아니라는
점도 남겨 둔다. 출처는 두 가지였다.

하나는 **이미 운영에서 돌고 있던 기존 소스**다. 선배 개발자들이 작성해 둔
쿼리에 \`INDEX\`, \`LEADING\`, \`PARALLEL\` 힌트가 주석 없이 박혀 있었고, 나는
플랜을 열어 그 힌트가 있을 때와 없을 때를 비교해 보며 "이 힌트가 이
플랜을 만드는구나"를 역으로 익혔다.

다른 하나는 **DBA에게 튜닝을 요청하면 돌아오는 상세 보고서**였다. 문제
쿼리를 접수하면 실행 계획 분석, 대기 이벤트, 인덱스 권고, 수정 쿼리안이
정리된 보고서가 왔는데, 내 쿼리가 어떻게 진단되는지를 보여 주는 가장
좋은 교재였다. 보고서의 수정안을 그대로 반영하는 데서 멈추지 않고,
"왜 이렇게 고쳤는지"를 플랜으로 재확인하는 것까지가 내 몫이었다.

이 방식이 정답이 아니라는 건 안다. 이미 사용되고 있는 소스의 패턴을
참고하는 학습은 **그 소스가 옳다는 보장이 없고**, 잘못된 관행까지 함께
복사할 위험이 있다. 다만 당시의 내 실력에서는 그것이 닿을 수 있는 가장
빠른 길이었고, 그 한계를 인정하는 것에서부터 다음 공부(플랜을 스스로
읽고 근거를 확인하는 습관)가 시작됐다.

## 배운 점

- **느린 쿼리의 답은 쿼리 본문이 아니라 플랜에 있다.** 본문만 보면 멀쩡한
  쿼리였다. 플랜을 열었을 때에야 서브쿼리 구간의 FULL SCAN 반복이 보였고,
  Predicate 정보에서 형변환의 증거를 찾을 수 있었다.
- **"인덱스가 있다"와 "인덱스를 탄다"는 다르다.** 묵시적 형변환, 컬럼 가공,
  타입 불일치는 인덱스를 조용히 무력화한다. 인덱스 존재 확인 다음에는 반드시
  접근 경로를 확인해야 한다.
- **고치는 방법에도 부작용이 있다.** TO_CHAR 방향 전환은 표기 규칙이 다르면
  조인 누락을 만들고, 조인 재작성은 소량 조회에서 오히려 손해다. 개선안을
  적용하기 전에 "이게 새로 만드는 문제는 없나"를 데이터로 확인하는 습관이
  이때 생겼다.
- **힌트는 진단 후의 고정 장치다.** 원인(형변환)을 고치고 나서 경로를
  고정하는 데 쓰면 유용하지만, 원인을 모른 채 걸면 무시되거나 다른 병목을
  가린다.
- **따라 쓴 것과 이해한 것을 구분해야 한다.** 기존 소스의 힌트 패턴과
  DBA 보고서는 훌륭한 출발점이었지만, "왜"를 설명하지 못한 채 따라 쓴
  부분(병렬도 같은)은 당시 실력의 한계였다. 한계를 인정하고 나서야
  플랜을 근거로 스스로 검증하는 습관이 생겼다.
`,Xn=`---
title: 포트폴리오 사이트 구조 리팩터링 기록
date: 2026-08-11
tags: React, Refactoring
summary: 콘텐츠와 화면을 분리하고, 페이지 파일 복제를 단일 라우트로 통합한 과정 정리
---

이 사이트를 만들고 1년 넘게 운영하면서 반복해서 겪은 문제가 있었다.
**경력 내용 하나를 고치려면 파일 여러 개를 같이 고쳐야 한다**는 점이다.

## 문제

- 프로젝트마다 \`Projects.jsx\`, \`Projects2.jsx\`, \`Projects3.jsx\`처럼 데이터 파일과
  페이지 파일을 복제해서 만들었다.
- 출력용 이력서(\`ResumePrint\`)에는 같은 경력 내용을 손으로 다시 타이핑해 두었다.
  그 결과 웹 화면과 이력서의 성과 문구가 서로 달라지는 일이 실제로 발생했다.
- 커밋 로그에 "경력기술서 현행화"가 반복해서 등장했다 — 같은 내용을 여러 곳에서
  맞추느라 생긴 비용이었다.

## 개선

핵심은 **단일 출처(single source of truth)** 원칙이었다.

1. 콘텐츠를 전부 \`src/data/\`로 분리했다. 프로젝트, 교육, 수상, 자격, 프로필이
   각각 파일 하나씩이다.
2. 프로젝트 페이지 3개를 \`/projects/:slug\` 라우트 하나로 통합했다.
   이제 프로젝트를 추가하면 상세 페이지, 메뉴, 이력서에 자동 반영된다.
3. 이력서 페이지는 데이터를 다시 쓰지 않고, 각 성과의 \`result\` 필드를 그대로
   가져다 쓴다. 웹과 이력서가 어긋날 수 없는 구조다.

\`\`\`text
변경 전: 콘텐츠 1건 수정 → 파일 6곳 편집
변경 후: 콘텐츠 1건 수정 → data/ 파일 1곳 편집
\`\`\`

## 배운 점

- 중복은 처음엔 빠르지만, 시간이 지날수록 "어느 쪽이 최신인지 모르는" 비용으로
  돌아온다. 운영 시스템에서 겪던 데이터 정합성 문제와 본질이 같았다.
- 구조를 고치기 전에 커밋 로그를 훑어보면 어디가 아픈지 보인다. 같은 종류의
  커밋 메시지가 반복되는 지점이 리팩터링 대상이었다.
`,Zn=`---\r
title: 화면마다 권한을 DB에 묻던 시스템 — Redis 캐시와 "세션과 같은 TTL"\r
date: 2025-01-07\r
tags: Java, Spring, Redis, Performance\r
summary: 셀렉트 박스 하나 그릴 때마다 권한 테이블을 조회하던 구조를 Redis 캐시로 바꾸고, TTL을 로그아웃(세션 만료) 시간과 일치시켜 정합성과 속도를 함께 잡은 기록\r
---\r
\r
권한 관리가 화면 단위로 촘촘한 시스템이 있었다. 같은 조회 화면이라도 사용자\r
권한에 따라 **셀렉트 박스에 보이는 항목이 달랐다** — 일반 사용자는 자기 부서\r
코드만, 관리자는 전체 코드가 보이는 식이다. 문제는 이걸 구현한 방식이었다.\r
\r
## AS-IS — 렌더링할 때마다 권한 테이블로\r
\r
화면이 열릴 때마다, 셀렉트 박스가 그려질 때마다 서버는 DB의 권한 테이블을\r
조회했다.\r
\r
\`\`\`java\r
// AS-IS — 화면 컨트롤러마다 반복되던 패턴\r
@GetMapping("/board/list")\r
public String boardList(Model model, Principal principal) {\r
    // 이 사용자가 볼 수 있는 코드 목록을 매번 DB에서\r
    List<CodeVO> deptCodes = permissionService.getAllowedCodes(principal.getName(), "DEPT");\r
    List<CodeVO> typeCodes = permissionService.getAllowedCodes(principal.getName(), "TYPE");\r
    model.addAttribute("deptCodes", deptCodes);\r
    model.addAttribute("typeCodes", typeCodes);\r
    ...\r
}\r
\`\`\`\r
\r
권한 조회 쿼리는 사용자-역할-권한-코드를 잇는 조인이라 가볍지 않았고,\r
셀렉트 박스가 대여섯 개인 화면은 열릴 때마다 그 조인을 대여섯 번씩 실행했다.\r
사용자 입장에선 **화면 하나 이동할 때마다 같은 질문을 DB에 반복**하는\r
구조다. 답은 뻔했다 — 로그인해 있는 동안 이 사용자의 권한은 바뀌지 않는데,\r
왜 매번 묻는가.\r
\r
## TO-BE — 로그인할 때 한 번 묻고, Redis에 올려두기\r
\r
권한 데이터의 성질을 먼저 정리했다.\r
\r
- **읽기는 매우 잦다** — 모든 화면 렌더링이 읽는다.\r
- **변경은 매우 드물다** — 관리자가 권한을 바꾸는 이벤트는 하루에 몇 번도 안 된다.\r
- **사용자별로 다르지만, 세션 동안에는 같다.**\r
\r
읽기 압도적 + 변경 희소 + 세션 단위 일관성 — 캐시에 딱 맞는 프로필이다.\r
로그인 시점에 권한을 조회해 Redis에 올리고, 이후 렌더링은 전부 캐시에서\r
읽도록 바꿨다.\r
\r
\`\`\`java\r
// TO-BE — 권한 조회에 캐시를 씌운다\r
@Cacheable(value = "userPermissions", key = "#username + ':' + #codeGroup")\r
public List<CodeVO> getAllowedCodes(String username, String codeGroup) {\r
    return permissionDAO.selectAllowedCodes(username, codeGroup); // 캐시 미스일 때만 실행\r
}\r
\`\`\`\r
\r
\`\`\`java\r
// Redis 캐시 설정 — TTL을 세션 만료 시간과 동일하게\r
@Bean\r
public RedisCacheManager cacheManager(RedisConnectionFactory factory) {\r
    RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()\r
            .entryTtl(Duration.ofMinutes(30))   // ← 세션 타임아웃과 같은 값\r
            .serializeValuesWith(SerializationPair.fromSerializer(\r
                    new GenericJackson2JsonRedisSerializer()));\r
    return RedisCacheManager.builder(factory)\r
            .withCacheConfiguration("userPermissions", config)\r
            .build();\r
}\r
\`\`\`\r
\r
## 핵심 설계 — 왜 TTL을 로그아웃 시간과 맞췄나\r
\r
이 작업에서 코드보다 중요한 게 TTL 값의 결정이었다. 캐시 TTL을\r
**세션 만료(로그아웃) 시간과 동일하게** 잡았는데, 이유는 이렇다.\r
\r
- **TTL이 세션보다 길면**: 사용자가 로그아웃하고 권한이 변경된 뒤 재로그인해도\r
  낡은 권한이 캐시에 살아 있을 수 있다. 권한 데이터에서 이건 성능 문제가\r
  아니라 **보안 문제**다.\r
- **TTL이 세션보다 짧으면**: 로그인 중인 사용자의 캐시가 중간에 증발해\r
  다시 DB를 두드린다. 캐시 미스가 잦아져 효과가 반감된다.\r
- **TTL = 세션이면**: "한 세션 동안의 권한은 로그인 시점 기준으로 고정"이라는\r
  규칙이 된다. 이건 원래부터 이 시스템의 암묵적 동작이기도 했다 — 권한이\r
  바뀌어도 재로그인해야 반영되는 게 사용자에게도 자연스럽다. 캐시 수명을\r
  세션 수명에 정렬함으로써, **캐시가 만든 새로운 불일치가 하나도 없는**\r
  상태를 만들었다.\r
\r
경계 이벤트도 같은 원칙으로 처리했다.\r
\r
- **로그아웃**: 세션 무효화와 함께 해당 사용자의 캐시 키를 즉시 삭제\r
  (\`@CacheEvict\` / 로그아웃 핸들러에서 키 삭제). TTL이 남아 있어도 세션이\r
  끝나면 캐시도 끝난다.\r
- **관리자가 권한을 변경**: 대상 사용자의 캐시 키를 evict. 그 사용자는\r
  다음 요청(또는 재로그인)부터 새 권한을 받는다.\r
\r
키는 \`userPermissions::{username}:{codeGroup}\` 형태로 잡아, 사용자 한 명의\r
권한만 정확히 지울 수 있게 했다. 전체 flush는 권한 체계 개편 같은 예외\r
상황에만 쓰는 것으로 정리했다.\r
\r
## 결과\r
\r
- 화면 하나를 그릴 때 나가던 권한 조인 쿼리 여러 건이 **로그인 후 첫 조회\r
  이후에는 0건**이 됐다. 권한 조회가 DB 왕복에서 Redis 메모리 조회(밀리초\r
  미만)로 바뀌면서 화면 체감 렌더링이 눈에 띄게 빨라졌고, 특히 셀렉트\r
  박스가 많은 관리 화면일수록 개선 폭이 컸다.\r
- DB 입장에서는 접속자 수 × 화면 이동 수만큼 반복되던 동일 조인이\r
  사라졌다 — 캐시는 응답 속도만이 아니라 **DB의 여유**를 만드는 장치였다.\r
\r
## 배운 점\r
\r
- **캐시 설계의 절반은 TTL과 무효화 정책이다.** "Redis를 붙였다"가 아니라\r
  "캐시 수명을 무엇에 정렬했고, 어떤 이벤트에 지우는가"가 설계의 실체였다.\r
  권한처럼 민감한 데이터일수록 TTL은 성능 파라미터가 아니라 정합성 규칙이다.\r
- **캐시하기 좋은 데이터부터 골라야 한다.** 읽기 빈도, 변경 빈도, 일관성\r
  요구 수준을 먼저 따져보면 권한/코드성 데이터가 1순위로 나온다. 반대로\r
  실시간성이 필요한 데이터에 같은 패턴을 쓰면 사고가 된다.\r
- **기존 시스템의 암묵적 규칙을 명시적 규칙으로.** "권한 변경은 재로그인해야\r
  반영된다"는 원래 있던 동작을 TTL 정책으로 문서화한 셈이 됐다. 캐시를\r
  도입하면서 시스템의 동작 계약이 오히려 분명해졌다.\r
`,Qn=`---\r
title: XSSFWorkbook vs SXSSFWorkbook — 수작업 엑셀 업무를 기능으로 만들며 정리한 선택 기준\r
date: 2025-11-20\r
tags: Java, POI, Excel, Performance\r
summary: 운영자가 매번 DB를 조회해 손으로 만들던 추출 대장·통계 엑셀을 다운로드 기능으로 구현한 기록 — 건수에 따라 XSSF와 SXSSF를 가르는 기준과 스트리밍 방식의 함정들\r
---\r
\r
운영 업무 중에 정기적으로 반복되는 일이 있었다. 담당자가 DB를 직접 조회해서\r
결과를 복사하고, 엑셀에 붙여 넣고, 서식을 정리해서 보고용 대장과 주간 통계를\r
만드는 것. 조회 조건이 매번 비슷하고 산출물 양식이 정해져 있는데도 사람 손을\r
거치니 시간이 들고, 복사 과정에서 실수도 났다. 이걸 **관리자 화면에서 조회\r
조건을 걸고 버튼 한 번으로 내려받는 엑셀 다운로드 기능**으로 만들었다.\r
\r
구현 자체는 Apache POI로 하는 흔한 작업이다. 흔하지 않았던 건 데이터\r
규모였다 — 추출 대상이 **수만~수십만 행**이라, POI의 두 클래스\r
\`XSSFWorkbook\`과 \`SXSSFWorkbook\` 중 무엇을 쓰느냐가 기능의 생사를 갈랐다.\r
\r
## XSSF vs SXSSF — 차이의 본질은 "어디에 들고 있느냐"\r
\r
둘 다 .xlsx를 만든다. 차이는 **작성 중인 워크북을 어디에 유지하느냐**다.\r
\r
| | XSSFWorkbook | SXSSFWorkbook |\r
|---|---|---|\r
| 데이터 위치 | 전체를 **힙 메모리**(DOM)에 유지 | 최근 N행만 메모리, 나머지는 **디스크 임시파일**로 flush |\r
| 메모리 사용 | 행 수에 비례해 증가 | window 크기만큼 **일정** |\r
| 이미 쓴 행 접근 | 자유 (수정, 재조회 가능) | flush된 행은 **접근 불가** |\r
| autoSizeColumn | 자유 | 기본 불가 (컬럼 추적을 켜야 하고, 켜면 스트리밍 이점 상쇄) |\r
| 뒷정리 | close()만 | **dispose() 필수** (임시파일 삭제) |\r
| 적합 규모 | 수천~1만 행 내외 | 수만 행 이상 |\r
\r
XSSF는 셀 하나가 객체 하나다. 30개 컬럼 × 10만 행이면 셀 객체만 300만 개가\r
힙에 쌓인다. 스타일·문자열 캐시까지 더하면 수십만 행에서 힙이 수 GB로 치솟고,\r
운영 WAS처럼 힙이 제한된 환경에서는 **다운로드 버튼 하나가 OOM으로 서버를\r
쓰러뜨릴 수 있다.**\r
\r
SXSSF는 생성자에 준 window 크기만큼의 행만 메모리에 유지하고, 그보다 오래된\r
행은 디스크 임시파일에 순차 기록한다. 100만 행을 써도 메모리 사용량은\r
window만큼으로 일정하다. 대신 "이미 흘려보낸 행"으로는 돌아갈 수 없다 —\r
스트리밍이라는 이름 그대로다.\r
\r
## 건수별 선택 기준\r
\r
이 시스템에서는 다운로드를 두 종류로 이원화했다.\r
\r
- **일반 다운로드 (수백~수천 건)** — \`XSSFWorkbook\`. 목록 화면의 검색 결과\r
  내려받기 수준이면 메모리 부담이 없고, \`autoSizeColumn\` 같은 편의 기능을\r
  자유롭게 쓸 수 있어 산출물 품질을 챙기기 좋다.\r
- **대용량 추출 (수만 건 이상)** — \`SXSSFWorkbook\`. 전 건 추출 대장처럼\r
  행 수 상한을 예측할 수 없는 기능은 처음부터 스트리밍으로 갔다.\r
\r
기준을 한 줄로 줄이면 이렇다. **"최대 몇 행까지 커질 수 있는가"를 예측할 수\r
없다면 SXSSF다.** XSSF의 한계는 평균이 아니라 최악의 케이스에서 터지고,\r
운영 데이터는 언제나 예상보다 많아진다.\r
\r
## 구현 — 스트리밍을 무력화하는 함정들\r
\r
대용량 쪽 코드의 뼈대는 이렇다.\r
\r
\`\`\`java\r
// window 크기만큼만 메모리에 유지, 초과분은 디스크로\r
SXSSFWorkbook workbook = new SXSSFWorkbook(1000);\r
\r
try {\r
    SXSSFSheet sheet = workbook.createSheet(sheetName);\r
\r
    // (1) 스타일은 루프 밖에서 1회만 생성\r
    CellStyle headerStyle = defaultCellStyle(workbook.createCellStyle(), true);\r
    CellStyle bodyStyle   = defaultCellStyle(workbook.createCellStyle(), false);\r
\r
    // 헤더\r
    Row headerRow = sheet.createRow(rowNo++);\r
    for (int i = 0; i < headerFields.length; i++) {\r
        Cell cell = headerRow.createCell(i, CellType.STRING);\r
        cell.setCellValue(headerFields[i]);\r
        cell.setCellStyle(headerStyle);\r
    }\r
\r
    // (2) autoSizeColumn 대신 고정 컬럼 너비\r
    for (int i = 0; i < headerFields.length; i++) {\r
        sheet.setColumnWidth(i, FIXED_COLUMN_WIDTH);\r
    }\r
\r
    // 데이터 바인딩 — 행을 만들며 지나가면 window 밖 행은 디스크로 flush\r
    for (Map<String, String> rowData : dataList) {\r
        Row row = sheet.createRow(rowNo++);\r
        ...\r
    }\r
\r
    workbook.write(response.getOutputStream());\r
} finally {\r
    workbook.dispose();   // (3) 디스크 임시파일 삭제 — 잊으면 서버에 쌓인다\r
    workbook.close();\r
}\r
\`\`\`\r
\r
번호를 단 세 곳이 이번 구현에서 배운 함정들이다.\r
\r
**(1) CellStyle을 루프 안에서 만들면 안 된다.** 스타일은 셀이 아니라 워크북\r
소속이고, 워크북당 개수 제한(6만여 개)이 있다. 행마다 \`createCellStyle()\`을\r
호출하는 코드는 소량에서는 멀쩡하다가 대량에서 스타일 한도 초과로 깨진다.\r
헤더용/본문용 스타일을 **루프 밖에서 한 번만 만들어 재사용**했다.\r
\r
**(2) autoSizeColumn은 스트리밍의 적이다.** 컬럼 폭 자동 조절은 "그 컬럼의\r
모든 셀"을 봐야 하는 연산이다. SXSSF에서 쓰려면 전 컬럼 추적\r
(\`trackAllColumnsForAutoSizing\`)을 켜야 하는데, 그러면 flush한 행의 정보를\r
계속 들고 있어야 해서 **스트리밍으로 아낀 메모리를 도로 쓰는 꼴**이 된다.\r
대용량 쪽은 자동 조절을 포기하고 고정 너비로 갔다 — 산출물 양식이 정해져\r
있어서 가능한 트레이드오프였다.\r
\r
**(3) dispose()는 close()와 다르다.** SXSSF가 흘려보낸 행들은 서버 디스크의\r
임시파일에 있다. \`close()\`는 스트림을 닫을 뿐 이 파일을 지우지 않는다.\r
\`dispose()\`를 finally에서 호출하지 않으면 다운로드가 실행될 때마다\r
임시파일이 쌓여, 언젠가 디스크가 가득 찬다. 조용히 진행되는 종류의 장애라\r
코드 리뷰에서 반드시 잡아야 하는 지점이다.\r
\r
## 검증 — 힙 로그로 눈으로 확인하기\r
\r
"메모리가 일정하다"를 믿음이 아니라 측정으로 확인하고 싶어서, 개발 단계에\r
1,000행 처리마다 힙 사용량을 찍는 로깅을 넣고 대량 데이터로 돌려봤다.\r
\r
\`\`\`java\r
private void logHeap(String label) {\r
    Runtime rt = Runtime.getRuntime();\r
    long used = (rt.totalMemory() - rt.freeMemory()) / 1024 / 1024;\r
    logger.info("[HEAP] {} | used={}MB, max={}MB", label, used, rt.maxMemory() / 1024 / 1024);\r
}\r
\`\`\`\r
\r
XSSF로 대량을 쓰면 행 수에 비례해 used가 우상향하는 그래프가 나오고, SXSSF는\r
window 크기 수준에서 톱니 모양으로 일정하게 유지된다. 이 로그 덕에 "수십만\r
건이 와도 힙은 평평하다"를 확인하고 기능을 열 수 있었다.\r
\r
## 결과\r
\r
- 담당자가 DB 조회 → 복사 → 엑셀 서식 정리로 처리하던 정기 산출물(추출 대장\r
  2종, 주간 통계)이 **화면에서 조건 선택 후 버튼 한 번**으로 바뀌었다.\r
  건당 수십 분씩 걸리고 실수 여지가 있던 작업이 다운로드 대기 시간으로\r
  줄었다.\r
- 산출물 양식이 코드로 고정되면서 "만드는 사람에 따라 달라지는 엑셀"이\r
  사라졌다 — 자동화는 시간만이 아니라 일관성도 산출물이다.\r
\r
## 배운 점\r
\r
- **라이브러리의 클래스 선택이 곧 용량 설계다.** XSSF/SXSSF는 기능이 아니라\r
  메모리 모델이 다른 클래스다. "몇 건까지 감당해야 하는 기능인가"라는 질문\r
  없이 예제 코드를 복사하면, 소량 테스트를 통과하고 운영에서 터진다.\r
- **스트리밍의 대가는 되돌아갈 수 없다는 것.** autoSizeColumn 포기, flush된\r
  행 접근 불가, dispose 책임 — 메모리를 아끼는 방식에는 항상 교환 조건이\r
  있고, 그걸 알고 선택하는 것과 모르고 겪는 것은 다르다.\r
- **성능 주장은 로그로 증명한다.** 힙 로깅 몇 줄이 "아마 괜찮을 것"을\r
  "측정해서 평평한 것"으로 바꿔줬다. 대용량 기능은 열기 전에 최악 케이스를\r
  눈으로 봐야 한다.\r
`,$n=Object.assign({"../posts/csql-nohup-mass-patch.md":Pn,"../posts/cubrid-query-plan-index-tuning.md":Fn,"../posts/cwe-209-error-message-exposure.md":In,"../posts/cwe-330-489-dead-code-removal.md":Ln,"../posts/cwe-404-496-resource-handling.md":Rn,"../posts/cwe-476-null-dereference.md":zn,"../posts/cwe-615-sensitive-comments.md":Bn,"../posts/cwe-676-dangerous-api.md":Vn,"../posts/cwe-754-exception-handling.md":Hn,"../posts/cwe-79-xss-remediation.md":Un,"../posts/dynamic-to-static-sync-query.md":Wn,"../posts/how-to-write-posts.md":Gn,"../posts/jsch-to-mina-sshd.md":Kn,"../posts/kafka-gw-data-integrity.md":qn,"../posts/mybatis-builder-parallel-refactoring.md":Jn,"../posts/oracle-hint-subquery-fullscan.md":Yn,"../posts/portfolio-refactoring.md":Xn,"../posts/redis-permission-cache-ttl.md":Zn,"../posts/sxssf-vs-xssf-excel-download.md":Qn});function er(e){let t=e.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);if(!t)return{meta:{},body:e};let n={};return t[1].split(/\r?\n/).forEach(e=>{let t=e.indexOf(`:`);if(t===-1)return;let r=e.slice(0,t).trim(),i=e.slice(t+1).trim();r&&(n[r]=i)}),{meta:n,body:e.slice(t[0].length)}}function tr(e,t){let n=e.split(`/`).pop().replace(/\.md$/,``),{meta:r,body:i}=er(t);return{slug:n,title:r.title||n,date:r.date||``,tags:r.tags?r.tags.split(`,`).map(e=>e.trim()).filter(Boolean):[],summary:r.summary||``,body:i}}var nr=Object.entries($n).map(([e,t])=>tr(e,t)).sort((e,t)=>t.date.localeCompare(e.date));function rr(){return nr}function ir(e){return nr.find(t=>t.slug===e)}function ar(){let e=new Map;return nr.forEach(t=>{t.tags.forEach(t=>e.set(t,(e.get(t)||0)+1))}),[...e.entries()].map(([e,t])=>({name:e,count:t}))}var or=10;function sr(){let[e,t]=(0,v.useState)(``),[n,r]=(0,v.useState)(null),[i,a]=(0,v.useState)(1),o=rr(),s=ar(),c=(0,v.useMemo)(()=>{let t=e.trim().toLowerCase();return o.filter(e=>n&&!e.tags.includes(n)?!1:t?e.title.toLowerCase().includes(t)||e.summary.toLowerCase().includes(t)||e.tags.some(e=>e.toLowerCase().includes(t))||e.body.toLowerCase().includes(t):!0)},[o,n,e]),l=Math.max(1,Math.ceil(c.length/or)),u=Math.min(i,l),d=c.slice((u-1)*or,u*or),f=e=>{t(e),a(1)},p=e=>{r(e),a(1)},m=e=>{a(e),window.scrollTo(0,0)},h=e.trim()!==``||n!==null;return(0,N.jsxs)(`div`,{className:`page-shell`,children:[(0,N.jsx)(`h1`,{children:`Blog`}),(0,N.jsx)(`p`,{className:`page-lead`,children:`공부한 내용과 작업 기록을 정리하는 공간입니다. 글은 마크다운 파일로 관리됩니다.`}),(0,N.jsx)(`div`,{className:`blog-search`,children:(0,N.jsx)(`input`,{type:`search`,value:e,placeholder:`제목 · 내용 · 태그 검색`,"aria-label":`블로그 글 검색`,onChange:e=>f(e.target.value)})}),s.length?(0,N.jsxs)(`div`,{className:`blog-tags`,role:`group`,"aria-label":`태그 필터`,children:[(0,N.jsxs)(`button`,{type:`button`,className:`blog-tag ${n===null?`active`:``}`,onClick:()=>p(null),children:[`전체 `,o.length]}),s.map(e=>(0,N.jsxs)(`button`,{type:`button`,className:`blog-tag ${n===e.name?`active`:``}`,onClick:()=>p(e.name),children:[e.name,` `,e.count]},e.name))]}):null,h?(0,N.jsxs)(`p`,{className:`blog-result-count`,children:[`검색 결과 `,c.length,`건`]}):null,(0,N.jsxs)(`div`,{className:`blog-list`,children:[d.map(e=>(0,N.jsxs)(Ft,{to:j.blogPost(e.slug),className:`blog-card`,children:[(0,N.jsxs)(`div`,{className:`blog-card-head`,children:[(0,N.jsx)(`h2`,{children:e.title}),(0,N.jsx)(`time`,{dateTime:e.date,children:e.date})]}),e.summary?(0,N.jsx)(`p`,{className:`blog-card-summary`,children:e.summary}):null,e.tags.length?(0,N.jsx)(`div`,{className:`blog-card-tags`,children:e.tags.map(e=>(0,N.jsx)(`span`,{children:e},e))}):null]},e.slug)),d.length?null:(0,N.jsx)(`p`,{className:`blog-empty`,children:`조건에 맞는 글이 없습니다.`})]}),l>1?(0,N.jsxs)(`nav`,{className:`blog-pagination`,"aria-label":`블로그 페이지 이동`,children:[(0,N.jsx)(`button`,{type:`button`,className:`blog-page-button`,disabled:u===1,onClick:()=>m(u-1),children:`이전`}),Array.from({length:l},(e,t)=>t+1).map(e=>(0,N.jsx)(`button`,{type:`button`,className:`blog-page-button number ${e===u?`active`:``}`,"aria-current":e===u?`page`:void 0,onClick:()=>m(e),children:e},e)),(0,N.jsx)(`button`,{type:`button`,className:`blog-page-button`,disabled:u===l,onClick:()=>m(u+1),children:`다음`})]}):null]})}function cr(e,t){let n=t||{};return(e[e.length-1]===``?[...e,``]:e).join((n.padRight?` `:``)+`,`+(n.padLeft===!1?``:` `)).trim()}var lr=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,ur=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,dr={};function fr(e,t){return((t||dr).jsx?ur:lr).test(e)}var pr=/[ \t\n\f\r]/g;function mr(e){return typeof e==`object`?e.type===`text`?hr(e.value):!1:hr(e)}function hr(e){return e.replace(pr,``)===``}var gr=class{constructor(e,t,n){this.normal=t,this.property=e,n&&(this.space=n)}};gr.prototype.normal={},gr.prototype.property={},gr.prototype.space=void 0;function _r(e,t){let n={},r={};for(let t of e)Object.assign(n,t.property),Object.assign(r,t.normal);return new gr(n,r,t)}function vr(e){return e.toLowerCase()}var yr=class{constructor(e,t){this.attribute=t,this.property=e}};yr.prototype.attribute=``,yr.prototype.booleanish=!1,yr.prototype.boolean=!1,yr.prototype.commaOrSpaceSeparated=!1,yr.prototype.commaSeparated=!1,yr.prototype.defined=!1,yr.prototype.mustUseProperty=!1,yr.prototype.number=!1,yr.prototype.overloadedBoolean=!1,yr.prototype.property=``,yr.prototype.spaceSeparated=!1,yr.prototype.space=void 0;var br=s({boolean:()=>P,booleanish:()=>Sr,commaOrSpaceSeparated:()=>Tr,commaSeparated:()=>wr,number:()=>F,overloadedBoolean:()=>Cr,spaceSeparated:()=>I}),xr=0,P=Er(),Sr=Er(),Cr=Er(),F=Er(),I=Er(),wr=Er(),Tr=Er();function Er(){return 2**++xr}var Dr=Object.keys(br),Or=class extends yr{constructor(e,t,n,r){let i=-1;if(super(e,t),kr(this,`space`,r),typeof n==`number`)for(;++i<Dr.length;){let e=Dr[i];kr(this,Dr[i],(n&br[e])===br[e])}}};Or.prototype.defined=!0;function kr(e,t,n){n&&(e[t]=n)}function Ar(e){let t={},n={};for(let[r,i]of Object.entries(e.properties)){let a=new Or(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(a.mustUseProperty=!0),t[r]=a,n[vr(r)]=r,n[vr(a.attribute)]=r}return new gr(t,n,e.space)}var jr=Ar({properties:{ariaActiveDescendant:null,ariaAtomic:Sr,ariaAutoComplete:null,ariaBusy:Sr,ariaChecked:Sr,ariaColCount:F,ariaColIndex:F,ariaColSpan:F,ariaControls:I,ariaCurrent:null,ariaDescribedBy:I,ariaDetails:null,ariaDisabled:Sr,ariaDropEffect:I,ariaErrorMessage:null,ariaExpanded:Sr,ariaFlowTo:I,ariaGrabbed:Sr,ariaHasPopup:null,ariaHidden:Sr,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:I,ariaLevel:F,ariaLive:null,ariaModal:Sr,ariaMultiLine:Sr,ariaMultiSelectable:Sr,ariaOrientation:null,ariaOwns:I,ariaPlaceholder:null,ariaPosInSet:F,ariaPressed:Sr,ariaReadOnly:Sr,ariaRelevant:null,ariaRequired:Sr,ariaRoleDescription:I,ariaRowCount:F,ariaRowIndex:F,ariaRowSpan:F,ariaSelected:Sr,ariaSetSize:F,ariaSort:null,ariaValueMax:F,ariaValueMin:F,ariaValueNow:F,ariaValueText:null,role:null},transform(e,t){return t===`role`?t:`aria-`+t.slice(4).toLowerCase()}});function Mr(e,t){return t in e?e[t]:t}function Nr(e,t){return Mr(e,t.toLowerCase())}var Pr=Ar({attributes:{acceptcharset:`accept-charset`,classname:`class`,htmlfor:`for`,httpequiv:`http-equiv`},mustUseProperty:[`checked`,`multiple`,`muted`,`selected`],properties:{abbr:null,accept:wr,acceptCharset:I,accessKey:I,action:null,allow:null,allowFullScreen:P,allowPaymentRequest:P,allowUserMedia:P,alpha:P,alt:null,as:null,async:P,autoCapitalize:null,autoComplete:I,autoFocus:P,autoPlay:P,blocking:I,capture:null,charSet:null,checked:P,cite:null,className:I,closedBy:null,colorSpace:null,cols:F,colSpan:F,command:null,commandFor:null,content:null,contentEditable:Sr,controls:P,controlsList:I,coords:F|wr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:P,defer:P,dir:null,dirName:null,disabled:P,download:Cr,draggable:Sr,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:P,formTarget:null,headers:I,height:F,hidden:Cr,high:F,href:null,hrefLang:null,htmlFor:I,httpEquiv:I,id:null,imageSizes:null,imageSrcSet:null,inert:P,inputMode:null,integrity:null,is:null,isMap:P,itemId:null,itemProp:I,itemRef:I,itemScope:P,itemType:I,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:P,low:F,manifest:null,max:null,maxLength:F,media:null,method:null,min:null,minLength:F,multiple:P,muted:P,name:null,nonce:null,noModule:P,noValidate:P,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:P,optimum:F,pattern:null,ping:I,placeholder:null,playsInline:P,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:P,referrerPolicy:null,rel:I,required:P,reversed:P,rows:F,rowSpan:F,sandbox:I,scope:null,scoped:P,seamless:P,selected:P,shadowRootClonable:P,shadowRootCustomElementRegistry:P,shadowRootDelegatesFocus:P,shadowRootMode:null,shadowRootSerializable:P,shape:null,size:F,sizes:null,slot:null,span:F,spellCheck:Sr,src:null,srcDoc:null,srcLang:null,srcSet:null,start:F,step:null,style:null,tabIndex:F,target:null,title:null,translate:null,type:null,typeMustMatch:P,useMap:null,value:Sr,width:F,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:I,axis:null,background:null,bgColor:null,border:F,borderColor:null,bottomMargin:F,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:P,declare:P,event:null,face:null,frame:null,frameBorder:null,hSpace:F,leftMargin:F,link:null,longDesc:null,lowSrc:null,marginHeight:F,marginWidth:F,noResize:P,noHref:P,noShade:P,noWrap:P,object:null,profile:null,prompt:null,rev:null,rightMargin:F,rules:null,scheme:null,scrolling:Sr,standby:null,summary:null,text:null,topMargin:F,valueType:null,version:null,vAlign:null,vLink:null,vSpace:F,allowTransparency:null,autoCorrect:null,autoSave:null,credentialless:P,disablePictureInPicture:P,disableRemotePlayback:P,exportParts:wr,part:I,prefix:null,property:null,results:F,security:null,unselectable:null},space:`html`,transform:Nr}),Fr=Ar({attributes:{accentHeight:`accent-height`,alignmentBaseline:`alignment-baseline`,arabicForm:`arabic-form`,baselineShift:`baseline-shift`,capHeight:`cap-height`,className:`class`,clipPath:`clip-path`,clipRule:`clip-rule`,colorInterpolation:`color-interpolation`,colorInterpolationFilters:`color-interpolation-filters`,colorProfile:`color-profile`,colorRendering:`color-rendering`,crossOrigin:`crossorigin`,dataType:`datatype`,dominantBaseline:`dominant-baseline`,enableBackground:`enable-background`,fillOpacity:`fill-opacity`,fillRule:`fill-rule`,floodColor:`flood-color`,floodOpacity:`flood-opacity`,fontFamily:`font-family`,fontSize:`font-size`,fontSizeAdjust:`font-size-adjust`,fontStretch:`font-stretch`,fontStyle:`font-style`,fontVariant:`font-variant`,fontWeight:`font-weight`,glyphName:`glyph-name`,glyphOrientationHorizontal:`glyph-orientation-horizontal`,glyphOrientationVertical:`glyph-orientation-vertical`,hrefLang:`hreflang`,horizAdvX:`horiz-adv-x`,horizOriginX:`horiz-origin-x`,horizOriginY:`horiz-origin-y`,imageRendering:`image-rendering`,letterSpacing:`letter-spacing`,lightingColor:`lighting-color`,markerEnd:`marker-end`,markerMid:`marker-mid`,markerStart:`marker-start`,maskType:`mask-type`,navDown:`nav-down`,navDownLeft:`nav-down-left`,navDownRight:`nav-down-right`,navLeft:`nav-left`,navNext:`nav-next`,navPrev:`nav-prev`,navRight:`nav-right`,navUp:`nav-up`,navUpLeft:`nav-up-left`,navUpRight:`nav-up-right`,onAbort:`onabort`,onActivate:`onactivate`,onAfterPrint:`onafterprint`,onBeforePrint:`onbeforeprint`,onBegin:`onbegin`,onCancel:`oncancel`,onCanPlay:`oncanplay`,onCanPlayThrough:`oncanplaythrough`,onChange:`onchange`,onClick:`onclick`,onClose:`onclose`,onCopy:`oncopy`,onCueChange:`oncuechange`,onCut:`oncut`,onDblClick:`ondblclick`,onDrag:`ondrag`,onDragEnd:`ondragend`,onDragEnter:`ondragenter`,onDragExit:`ondragexit`,onDragLeave:`ondragleave`,onDragOver:`ondragover`,onDragStart:`ondragstart`,onDrop:`ondrop`,onDurationChange:`ondurationchange`,onEmptied:`onemptied`,onEnd:`onend`,onEnded:`onended`,onError:`onerror`,onFocus:`onfocus`,onFocusIn:`onfocusin`,onFocusOut:`onfocusout`,onHashChange:`onhashchange`,onInput:`oninput`,onInvalid:`oninvalid`,onKeyDown:`onkeydown`,onKeyPress:`onkeypress`,onKeyUp:`onkeyup`,onLoad:`onload`,onLoadedData:`onloadeddata`,onLoadedMetadata:`onloadedmetadata`,onLoadStart:`onloadstart`,onMessage:`onmessage`,onMouseDown:`onmousedown`,onMouseEnter:`onmouseenter`,onMouseLeave:`onmouseleave`,onMouseMove:`onmousemove`,onMouseOut:`onmouseout`,onMouseOver:`onmouseover`,onMouseUp:`onmouseup`,onMouseWheel:`onmousewheel`,onOffline:`onoffline`,onOnline:`ononline`,onPageHide:`onpagehide`,onPageShow:`onpageshow`,onPaste:`onpaste`,onPause:`onpause`,onPlay:`onplay`,onPlaying:`onplaying`,onPopState:`onpopstate`,onProgress:`onprogress`,onRateChange:`onratechange`,onRepeat:`onrepeat`,onReset:`onreset`,onResize:`onresize`,onScroll:`onscroll`,onSeeked:`onseeked`,onSeeking:`onseeking`,onSelect:`onselect`,onShow:`onshow`,onStalled:`onstalled`,onStorage:`onstorage`,onSubmit:`onsubmit`,onSuspend:`onsuspend`,onTimeUpdate:`ontimeupdate`,onToggle:`ontoggle`,onUnload:`onunload`,onVolumeChange:`onvolumechange`,onWaiting:`onwaiting`,onZoom:`onzoom`,overlinePosition:`overline-position`,overlineThickness:`overline-thickness`,paintOrder:`paint-order`,panose1:`panose-1`,pointerEvents:`pointer-events`,referrerPolicy:`referrerpolicy`,renderingIntent:`rendering-intent`,shapeRendering:`shape-rendering`,stopColor:`stop-color`,stopOpacity:`stop-opacity`,strikethroughPosition:`strikethrough-position`,strikethroughThickness:`strikethrough-thickness`,strokeDashArray:`stroke-dasharray`,strokeDashOffset:`stroke-dashoffset`,strokeLineCap:`stroke-linecap`,strokeLineJoin:`stroke-linejoin`,strokeMiterLimit:`stroke-miterlimit`,strokeOpacity:`stroke-opacity`,strokeWidth:`stroke-width`,tabIndex:`tabindex`,textAnchor:`text-anchor`,textDecoration:`text-decoration`,textRendering:`text-rendering`,transformOrigin:`transform-origin`,typeOf:`typeof`,underlinePosition:`underline-position`,underlineThickness:`underline-thickness`,unicodeBidi:`unicode-bidi`,unicodeRange:`unicode-range`,unitsPerEm:`units-per-em`,vAlphabetic:`v-alphabetic`,vHanging:`v-hanging`,vIdeographic:`v-ideographic`,vMathematical:`v-mathematical`,vectorEffect:`vector-effect`,vertAdvY:`vert-adv-y`,vertOriginX:`vert-origin-x`,vertOriginY:`vert-origin-y`,wordSpacing:`word-spacing`,writingMode:`writing-mode`,xHeight:`x-height`,playbackOrder:`playbackorder`,timelineBegin:`timelinebegin`},properties:{about:Tr,accentHeight:F,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:F,amplitude:F,arabicForm:null,ascent:F,attributeName:null,attributeType:null,azimuth:F,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:F,by:null,calcMode:null,capHeight:F,className:I,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:F,diffuseConstant:F,direction:null,display:null,dur:null,divisor:F,dominantBaseline:null,download:P,dx:null,dy:null,edgeMode:null,editable:null,elevation:F,enableBackground:null,end:null,event:null,exponent:F,externalResourcesRequired:null,fill:null,fillOpacity:F,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:wr,g2:wr,glyphName:wr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:F,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:F,horizOriginX:F,horizOriginY:F,id:null,ideographic:F,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:F,k:F,k1:F,k2:F,k3:F,k4:F,kernelMatrix:Tr,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:F,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskType:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:F,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:F,overlineThickness:F,paintOrder:null,panose1:null,path:null,pathLength:F,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:I,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:F,pointsAtY:F,pointsAtZ:F,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:Tr,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:Tr,rev:Tr,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:Tr,requiredFeatures:Tr,requiredFonts:Tr,requiredFormats:Tr,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:F,specularExponent:F,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:F,strikethroughThickness:F,string:null,stroke:null,strokeDashArray:Tr,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:F,strokeOpacity:F,strokeWidth:null,style:null,surfaceScale:F,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:Tr,tabIndex:F,tableValues:null,target:null,targetX:F,targetY:F,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:Tr,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:F,underlineThickness:F,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:F,values:null,vAlphabetic:F,vMathematical:F,vectorEffect:null,vHanging:F,vIdeographic:F,version:null,vertAdvY:F,vertOriginX:F,vertOriginY:F,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:F,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:`svg`,transform:Mr}),Ir=Ar({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:`xlink`,transform(e,t){return`xlink:`+t.slice(5).toLowerCase()}}),Lr=Ar({attributes:{xmlnsxlink:`xmlns:xlink`},properties:{xmlnsXLink:null,xmlns:null},space:`xmlns`,transform:Nr}),Rr=Ar({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:`xml`,transform(e,t){return`xml:`+t.slice(3).toLowerCase()}}),zr={classId:`classID`,dataType:`datatype`,itemId:`itemID`,strokeDashArray:`strokeDasharray`,strokeDashOffset:`strokeDashoffset`,strokeLineCap:`strokeLinecap`,strokeLineJoin:`strokeLinejoin`,strokeMiterLimit:`strokeMiterlimit`,typeOf:`typeof`,xLinkActuate:`xlinkActuate`,xLinkArcRole:`xlinkArcrole`,xLinkHref:`xlinkHref`,xLinkRole:`xlinkRole`,xLinkShow:`xlinkShow`,xLinkTitle:`xlinkTitle`,xLinkType:`xlinkType`,xmlnsXLink:`xmlnsXlink`},Br=/[A-Z]/g,Vr=/-[a-z]/g,Hr=/^data[-\w.:]+$/i;function Ur(e,t){let n=vr(t),r=t,i=yr;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)===`data`&&Hr.test(t)){if(t.charAt(4)===`-`){let e=t.slice(5).replace(Vr,Gr);r=`data`+e.charAt(0).toUpperCase()+e.slice(1)}else{let e=t.slice(4);if(!Vr.test(e)){let n=e.replace(Br,Wr);n.charAt(0)!==`-`&&(n=`-`+n),t=`data`+n}}i=Or}return new i(r,t)}function Wr(e){return`-`+e.toLowerCase()}function Gr(e){return e.charAt(1).toUpperCase()}var Kr=_r([jr,Pr,Ir,Lr,Rr],`html`),qr=_r([jr,Fr,Ir,Lr,Rr],`svg`);function Jr(e){return e.join(` `).trim()}var Yr=o(((e,t)=>{var n=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,i=/^\s*/,a=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,o=/^:\s*/,s=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,c=/^[;\s]*/,l=/^\s+|\s+$/g,u=`
`,d=`/`,f=`*`,p=``,m=`comment`,h=`declaration`;function g(e,t){if(typeof e!=`string`)throw TypeError(`First argument must be a string`);if(!e)return[];t||={};var l=1,g=1;function v(e){var t=e.match(r);t&&(l+=t.length);var n=e.lastIndexOf(u);g=~n?e.length-n:g+e.length}function y(){var e={line:l,column:g};return function(t){return t.position=new b(e),C(),t}}function b(e){this.start=e,this.end={line:l,column:g},this.source=t.source}b.prototype.content=e;function x(n){var r=Error(t.source+`:`+l+`:`+g+`: `+n);if(r.reason=n,r.filename=t.source,r.line=l,r.column=g,r.source=e,!t.silent)throw r}function S(t){var n=t.exec(e);if(n){var r=n[0];return v(r),e=e.slice(r.length),n}}function C(){S(i)}function w(e){var t;for(e||=[];t=T();)t!==!1&&e.push(t);return e}function T(){var t=y();if(!(d!=e.charAt(0)||f!=e.charAt(1))){for(var n=2;p!=e.charAt(n)&&(f!=e.charAt(n)||d!=e.charAt(n+1));)++n;if(n+=2,p===e.charAt(n-1))return x(`End of comment missing`);var r=e.slice(2,n-2);return g+=2,v(r),e=e.slice(n),g+=2,t({type:m,comment:r})}}function E(){var e=y(),t=S(a);if(t){if(T(),!S(o))return x(`property missing ':'`);var r=S(s),i=e({type:h,property:_(t[0].replace(n,p)),value:r?_(r[0].replace(n,p)):p});return S(c),i}}function ee(){var e=[];w(e);for(var t;t=E();)t!==!1&&(e.push(t),w(e));return e}return C(),ee()}function _(e){return e?e.replace(l,p):p}t.exports=g})),Xr=o((e=>{var t=e&&e.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,`__esModule`,{value:!0}),e.default=r;var n=t(Yr());function r(e,t){let r=null;if(!e||typeof e!=`string`)return r;let i=(0,n.default)(e),a=typeof t==`function`;return i.forEach(e=>{if(e.type!==`declaration`)return;let{property:n,value:i}=e;a?t(n,i,e):i&&(r||={},r[n]=i)}),r}})),Zr=o((e=>{Object.defineProperty(e,`__esModule`,{value:!0}),e.camelCase=void 0;var t=/^--[a-zA-Z0-9_-]+$/,n=/-([a-z])/g,r=/^[^-]+$/,i=/^-(webkit|moz|ms|o|khtml)-/,a=/^-(ms)-/,o=function(e){return!e||r.test(e)||t.test(e)},s=function(e,t){return t.toUpperCase()},c=function(e,t){return`${t}-`};e.camelCase=function(e,t){return t===void 0&&(t={}),o(e)?e:(e=e.toLowerCase(),e=t.reactCompat?e.replace(a,c):e.replace(i,c),e.replace(n,s))}})),Qr=o(((e,t)=>{var n=(e&&e.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(Xr()),r=Zr();function i(e,t){var i={};return!e||typeof e!=`string`||(0,n.default)(e,function(e,n){e&&n&&(i[(0,r.camelCase)(e,t)]=n)}),i}i.default=i,t.exports=i})),$r=ti(`end`),ei=ti(`start`);function ti(e){return t;function t(t){let n=t&&t.position&&t.position[e]||{};if(typeof n.line==`number`&&n.line>0&&typeof n.column==`number`&&n.column>0)return{line:n.line,column:n.column,offset:typeof n.offset==`number`&&n.offset>-1?n.offset:void 0}}}function ni(e){let t=ei(e),n=$r(e);if(t&&n)return{start:t,end:n}}function ri(e){return!e||typeof e!=`object`?``:`position`in e||`type`in e?ai(e.position):`start`in e||`end`in e?ai(e):`line`in e||`column`in e?ii(e):``}function ii(e){return oi(e&&e.line)+`:`+oi(e&&e.column)}function ai(e){return ii(e&&e.start)+`-`+ii(e&&e.end)}function oi(e){return e&&typeof e==`number`?e:1}var si=class extends Error{constructor(e,t,n){super(),typeof t==`string`&&(n=t,t=void 0);let r=``,i={},a=!1;if(t&&(i=`line`in t&&`column`in t||`start`in t&&`end`in t?{place:t}:`type`in t?{ancestors:[t],place:t.position}:{...t}),typeof e==`string`?r=e:!i.cause&&e&&(a=!0,r=e.message,i.cause=e),!i.ruleId&&!i.source&&typeof n==`string`){let e=n.indexOf(`:`);e===-1?i.ruleId=n:(i.source=n.slice(0,e),i.ruleId=n.slice(e+1))}if(!i.place&&i.ancestors&&i.ancestors){let e=i.ancestors[i.ancestors.length-1];e&&(i.place=e.position)}let o=i.place&&`start`in i.place?i.place.start:i.place;this.ancestors=i.ancestors||void 0,this.cause=i.cause||void 0,this.column=o?o.column:void 0,this.fatal=void 0,this.file=``,this.message=r,this.line=o?o.line:void 0,this.name=ri(i.place)||`1:1`,this.place=i.place||void 0,this.reason=this.message,this.ruleId=i.ruleId||void 0,this.source=i.source||void 0,this.stack=a&&i.cause&&typeof i.cause.stack==`string`?i.cause.stack:``,this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}};si.prototype.file=``,si.prototype.name=``,si.prototype.reason=``,si.prototype.message=``,si.prototype.stack=``,si.prototype.column=void 0,si.prototype.line=void 0,si.prototype.ancestors=void 0,si.prototype.cause=void 0,si.prototype.fatal=void 0,si.prototype.place=void 0,si.prototype.ruleId=void 0,si.prototype.source=void 0;var ci=l(Qr(),1),li={}.hasOwnProperty,ui=new Map,di=/[A-Z]/g,fi=new Set([`table`,`tbody`,`thead`,`tfoot`,`tr`]),pi=new Set([`td`,`th`]),mi=`https://github.com/syntax-tree/hast-util-to-jsx-runtime`;function hi(e,t){if(!t||t.Fragment===void 0)throw TypeError("Expected `Fragment` in options");let n=t.filePath||void 0,r;if(t.development){if(typeof t.jsxDEV!=`function`)throw TypeError("Expected `jsxDEV` in options when `development: true`");r=Ei(n,t.jsxDEV)}else{if(typeof t.jsx!=`function`)throw TypeError("Expected `jsx` in production options");if(typeof t.jsxs!=`function`)throw TypeError("Expected `jsxs` in production options");r=Ti(n,t.jsx,t.jsxs)}let i={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||`react`,evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space===`svg`?qr:Kr,stylePropertyNameCase:t.stylePropertyNameCase||`dom`,tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},a=gi(i,e,void 0);return a&&typeof a!=`string`?a:i.create(e,i.Fragment,{children:a||void 0},void 0)}function gi(e,t,n){if(t.type===`element`)return _i(e,t,n);if(t.type===`mdxFlowExpression`||t.type===`mdxTextExpression`)return vi(e,t);if(t.type===`mdxJsxFlowElement`||t.type===`mdxJsxTextElement`)return bi(e,t,n);if(t.type===`mdxjsEsm`)return yi(e,t);if(t.type===`root`)return xi(e,t,n);if(t.type===`text`)return Si(e,t)}function _i(e,t,n){let r=e.schema,i=r;t.tagName.toLowerCase()===`svg`&&r.space===`html`&&(i=qr,e.schema=i),e.ancestors.push(t);let a=L(e,t.tagName,!1),o=Di(e,t),s=ki(e,t);return fi.has(t.tagName)&&(s=s.filter(function(e){return typeof e==`string`?!mr(e):!0})),Ci(e,o,a,t),wi(o,s),e.ancestors.pop(),e.schema=r,e.create(t,a,o,n)}function vi(e,t){if(t.data&&t.data.estree&&e.evaluater){let n=t.data.estree.body[0];return n.type,e.evaluater.evaluateExpression(n.expression)}Mi(e,t.position)}function yi(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);Mi(e,t.position)}function bi(e,t,n){let r=e.schema,i=r;t.name===`svg`&&r.space===`html`&&(i=qr,e.schema=i),e.ancestors.push(t);let a=t.name===null?e.Fragment:L(e,t.name,!0),o=Oi(e,t),s=ki(e,t);return Ci(e,o,a,t),wi(o,s),e.ancestors.pop(),e.schema=r,e.create(t,a,o,n)}function xi(e,t,n){let r={};return wi(r,ki(e,t)),e.create(t,e.Fragment,r,n)}function Si(e,t){return t.value}function Ci(e,t,n,r){typeof n!=`string`&&n!==e.Fragment&&e.passNode&&(t.node=r)}function wi(e,t){if(t.length>0){let n=t.length>1?t:t[0];n&&(e.children=n)}}function Ti(e,t,n){return r;function r(e,r,i,a){let o=Array.isArray(i.children)?n:t;return a?o(r,i,a):o(r,i)}}function Ei(e,t){return n;function n(n,r,i,a){let o=Array.isArray(i.children),s=ei(n);return t(r,i,a,o,{columnNumber:s?s.column-1:void 0,fileName:e,lineNumber:s?s.line:void 0},void 0)}}function Di(e,t){let n={},r,i;for(i in t.properties)if(i!==`children`&&li.call(t.properties,i)){let a=Ai(e,i,t.properties[i]);if(a){let[i,o]=a;e.tableCellAlignToStyle&&i===`align`&&typeof o==`string`&&pi.has(t.tagName)?r=o:n[i]=o}}if(r){let t=n.style||={};t[e.stylePropertyNameCase===`css`?`text-align`:`textAlign`]=r}return n}function Oi(e,t){let n={};for(let r of t.attributes)if(r.type===`mdxJsxExpressionAttribute`)if(r.data&&r.data.estree&&e.evaluater){let t=r.data.estree.body[0];t.type;let i=t.expression;i.type;let a=i.properties[0];a.type,Object.assign(n,e.evaluater.evaluateExpression(a.argument))}else Mi(e,t.position);else{let i=r.name,a;if(r.value&&typeof r.value==`object`)if(r.value.data&&r.value.data.estree&&e.evaluater){let t=r.value.data.estree.body[0];t.type,a=e.evaluater.evaluateExpression(t.expression)}else Mi(e,t.position);else a=r.value===null?!0:r.value;n[i]=a}return n}function ki(e,t){let n=[],r=-1,i=e.passKeys?new Map:ui;for(;++r<t.children.length;){let a=t.children[r],o;if(e.passKeys){let e=a.type===`element`?a.tagName:a.type===`mdxJsxFlowElement`||a.type===`mdxJsxTextElement`?a.name:void 0;if(e){let t=i.get(e)||0;o=e+`-`+t,i.set(e,t+1)}}let s=gi(e,a,o);s!==void 0&&n.push(s)}return n}function Ai(e,t,n){let r=Ur(e.schema,t);if(!(n==null||typeof n==`number`&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?cr(n):Jr(n)),r.property===`style`){let t=typeof n==`object`?n:ji(e,String(n));return e.stylePropertyNameCase===`css`&&(t=Ni(t)),[`style`,t]}return[e.elementAttributeNameCase===`react`&&r.space?zr[r.property]||r.property:r.attribute,n]}}function ji(e,t){try{return(0,ci.default)(t,{reactCompat:!0})}catch(t){if(e.ignoreInvalidStyle)return{};let n=t,r=new si("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:n,ruleId:`style`,source:`hast-util-to-jsx-runtime`});throw r.file=e.filePath||void 0,r.url=mi+`#cannot-parse-style-attribute`,r}}function L(e,t,n){let r;if(!n)r={type:`Literal`,value:t};else if(t.includes(`.`)){let e=t.split(`.`),n=-1,i;for(;++n<e.length;){let t=fr(e[n])?{type:`Identifier`,name:e[n]}:{type:`Literal`,value:e[n]};i=i?{type:`MemberExpression`,object:i,property:t,computed:!!(n&&t.type===`Literal`),optional:!1}:t}r=i}else r=fr(t)&&!/^[a-z]/.test(t)?{type:`Identifier`,name:t}:{type:`Literal`,value:t};if(r.type===`Literal`){let t=r.value;return li.call(e.components,t)?e.components[t]:t}if(e.evaluater)return e.evaluater.evaluateExpression(r);Mi(e)}function Mi(e,t){let n=new si("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:`mdx-estree`,source:`hast-util-to-jsx-runtime`});throw n.file=e.filePath||void 0,n.url=mi+`#cannot-handle-mdx-estrees-without-createevaluater`,n}function Ni(e){let t={},n;for(n in e)li.call(e,n)&&(t[Pi(n)]=e[n]);return t}function Pi(e){let t=e.replace(di,Fi);return t.slice(0,3)===`ms-`&&(t=`-`+t),t}function Fi(e){return`-`+e.toLowerCase()}var Ii={action:[`form`],cite:[`blockquote`,`del`,`ins`,`q`],data:[`object`],formAction:[`button`,`input`],href:[`a`,`area`,`base`,`link`],icon:[`menuitem`],itemId:null,manifest:[`html`],ping:[`a`,`area`],poster:[`video`],src:[`audio`,`embed`,`iframe`,`img`,`input`,`script`,`source`,`track`,`video`]},Li={};function Ri(e,t){let n=t||Li;return zi(e,typeof n.includeImageAlt==`boolean`?n.includeImageAlt:!0,typeof n.includeHtml==`boolean`?n.includeHtml:!0)}function zi(e,t,n){if(Vi(e)){if(`value`in e)return e.type===`html`&&!n?``:e.value;if(t&&`alt`in e&&e.alt)return e.alt;if(`children`in e)return Bi(e.children,t,n)}return Array.isArray(e)?Bi(e,t,n):``}function Bi(e,t,n){let r=[],i=-1;for(;++i<e.length;)r[i]=zi(e[i],t,n);return r.join(``)}function Vi(e){return!!(e&&typeof e==`object`)}var Hi=document.createElement(`i`);function Ui(e){let t=`&`+e+`;`;Hi.innerHTML=t;let n=Hi.textContent;return n.charCodeAt(n.length-1)===59&&e!==`semi`||n===t?!1:n}function Wi(e,t,n,r){let i=e.length,a=0,o;if(t=t<0?-t>i?0:i+t:t>i?i:t,n=n>0?n:0,r.length<1e4)o=Array.from(r),o.unshift(t,n),e.splice(...o);else for(n&&e.splice(t,n);a<r.length;)o=r.slice(a,a+1e4),o.unshift(t,0),e.splice(...o),a+=1e4,t+=1e4}function Gi(e,t){return e.length>0?(Wi(e,e.length,0,t),e):t}var Ki={}.hasOwnProperty;function qi(e){let t={},n=-1;for(;++n<e.length;)Ji(t,e[n]);return t}function Ji(e,t){let n;for(n in t){let r=(Ki.call(e,n)?e[n]:void 0)||(e[n]={}),i=t[n],a;if(i)for(a in i){Ki.call(r,a)||(r[a]=[]);let e=i[a];Yi(r[a],Array.isArray(e)?e:e?[e]:[])}}}function Yi(e,t){let n=-1,r=[];for(;++n<t.length;)(t[n].add===`after`?e:r).push(t[n]);Wi(e,0,0,r)}function Xi(e,t){let n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)==65535||(n&65535)==65534||n>1114111?`�`:String.fromCodePoint(n)}function Zi(e){return e.replace(/[\t\n\r ]+/g,` `).replace(/^ | $/g,``).toLowerCase().toUpperCase()}var R=oa(/[A-Za-z]/),Qi=oa(/[\dA-Za-z]/),$i=oa(/[#-'*+\--9=?A-Z^-~]/);function ea(e){return e!==null&&(e<32||e===127)}var ta=oa(/\d/),na=oa(/[\dA-Fa-f]/),ra=oa(/[!-/:-@[-`{-~]/);function z(e){return e!==null&&e<-2}function B(e){return e!==null&&(e<0||e===32)}function V(e){return e===-2||e===-1||e===32}var ia=oa(/\p{P}|\p{S}/u),aa=oa(/\s/);function oa(e){return t;function t(t){return t!==null&&t>-1&&e.test(String.fromCharCode(t))}}function sa(e){let t=[],n=-1,r=0,i=0;for(;++n<e.length;){let a=e.charCodeAt(n),o=``;if(a===37&&Qi(e.charCodeAt(n+1))&&Qi(e.charCodeAt(n+2)))i=2;else if(a<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a))||(o=String.fromCharCode(a));else if(a>55295&&a<57344){let t=e.charCodeAt(n+1);a<56320&&t>56319&&t<57344?(o=String.fromCharCode(a,t),i=1):o=`�`}else o=String.fromCharCode(a);o&&=(t.push(e.slice(r,n),encodeURIComponent(o)),r=n+i+1,``),i&&=(n+=i,0)}return t.join(``)+e.slice(r)}function H(e,t,n,r){let i=r?r-1:1/0,a=0;return o;function o(r){return V(r)?(e.enter(n),s(r)):t(r)}function s(r){return V(r)&&a++<i?(e.consume(r),s):(e.exit(n),t(r))}}var ca={tokenize:la};function la(e){let t=e.attempt(this.parser.constructs.contentInitial,r,i),n;return t;function r(n){if(n===null){e.consume(n);return}return e.enter(`lineEnding`),e.consume(n),e.exit(`lineEnding`),H(e,t,`linePrefix`)}function i(t){return e.enter(`paragraph`),a(t)}function a(t){let r=e.enter(`chunkText`,{contentType:`text`,previous:n});return n&&(n.next=r),n=r,o(t)}function o(t){if(t===null){e.exit(`chunkText`),e.exit(`paragraph`),e.consume(t);return}return z(t)?(e.consume(t),e.exit(`chunkText`),a):(e.consume(t),o)}}var ua={tokenize:fa},da={tokenize:pa};function fa(e){let t=this,n=[],r=0,i,a,o;return s;function s(i){if(r<n.length){let a=n[r];return t.containerState=a[1],e.attempt(a[0].continuation,c,l)(i)}return l(i)}function c(e){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,i&&v();let n=t.events.length,a=n,o;for(;a--;)if(t.events[a][0]===`exit`&&t.events[a][1].type===`chunkFlow`){o=t.events[a][1].end;break}_(r);let s=n;for(;s<t.events.length;)t.events[s][1].end={...o},s++;return Wi(t.events,a+1,0,t.events.slice(n)),t.events.length=s,l(e)}return s(e)}function l(a){if(r===n.length){if(!i)return f(a);if(i.currentConstruct&&i.currentConstruct.concrete)return m(a);t.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(da,u,d)(a)}function u(e){return i&&v(),_(r),f(e)}function d(e){return t.parser.lazy[t.now().line]=r!==n.length,o=t.now().offset,m(e)}function f(n){return t.containerState={},e.attempt(da,p,m)(n)}function p(e){return r++,n.push([t.currentConstruct,t.containerState]),f(e)}function m(n){if(n===null){i&&v(),_(0),e.consume(n);return}return i||=t.parser.flow(t.now()),e.enter(`chunkFlow`,{_tokenizer:i,contentType:`flow`,previous:a}),h(n)}function h(n){if(n===null){g(e.exit(`chunkFlow`),!0),_(0),e.consume(n);return}return z(n)?(e.consume(n),g(e.exit(`chunkFlow`)),r=0,t.interrupt=void 0,s):(e.consume(n),h)}function g(e,n){let s=t.sliceStream(e);if(n&&s.push(null),e.previous=a,a&&(a.next=e),a=e,i.defineSkip(e.start),i.write(s),t.parser.lazy[e.start.line]){let e=i.events.length;for(;e--;)if(i.events[e][1].start.offset<o&&(!i.events[e][1].end||i.events[e][1].end.offset>o))return;let n=t.events.length,a=n,s,c;for(;a--;)if(t.events[a][0]===`exit`&&t.events[a][1].type===`chunkFlow`){if(s){c=t.events[a][1].end;break}s=!0}for(_(r),e=n;e<t.events.length;)t.events[e][1].end={...c},e++;Wi(t.events,a+1,0,t.events.slice(n)),t.events.length=e}}function _(r){let i=n.length;for(;i-- >r;){let r=n[i];t.containerState=r[1],r[0].exit.call(t,e)}n.length=r}function v(){i.write([null]),a=void 0,i=void 0,t.containerState._closeFlow=void 0}}function pa(e,t,n){return H(e,e.attempt(this.parser.constructs.document,t,n),`linePrefix`,this.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)}function ma(e){if(e===null||B(e)||aa(e))return 1;if(ia(e))return 2}function ha(e,t,n){let r=[],i=-1;for(;++i<e.length;){let a=e[i].resolveAll;a&&!r.includes(a)&&(t=a(t,n),r.push(a))}return t}var ga={name:`attention`,resolveAll:_a,tokenize:va};function _a(e,t){let n=-1,r,i,a,o,s,c,l,u;for(;++n<e.length;)if(e[n][0]===`enter`&&e[n][1].type===`attentionSequence`&&e[n][1]._close){for(r=n;r--;)if(e[r][0]===`exit`&&e[r][1].type===`attentionSequence`&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;c=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;let d={...e[r][1].end},f={...e[n][1].start};ya(d,-c),ya(f,c),o={type:c>1?`strongSequence`:`emphasisSequence`,start:d,end:{...e[r][1].end}},s={type:c>1?`strongSequence`:`emphasisSequence`,start:{...e[n][1].start},end:f},a={type:c>1?`strongText`:`emphasisText`,start:{...e[r][1].end},end:{...e[n][1].start}},i={type:c>1?`strong`:`emphasis`,start:{...o.start},end:{...s.end}},e[r][1].end={...o.start},e[n][1].start={...s.end},l=[],e[r][1].end.offset-e[r][1].start.offset&&(l=Gi(l,[[`enter`,e[r][1],t],[`exit`,e[r][1],t]])),l=Gi(l,[[`enter`,i,t],[`enter`,o,t],[`exit`,o,t],[`enter`,a,t]]),l=Gi(l,ha(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),l=Gi(l,[[`exit`,a,t],[`enter`,s,t],[`exit`,s,t],[`exit`,i,t]]),e[n][1].end.offset-e[n][1].start.offset?(u=2,l=Gi(l,[[`enter`,e[n][1],t],[`exit`,e[n][1],t]])):u=0,Wi(e,r-1,n-r+3,l),n=r+l.length-u-2;break}}for(n=-1;++n<e.length;)e[n][1].type===`attentionSequence`&&(e[n][1].type=`data`);return e}function va(e,t){let n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=ma(r),a;return o;function o(t){return a=t,e.enter(`attentionSequence`),s(t)}function s(o){if(o===a)return e.consume(o),s;let c=e.exit(`attentionSequence`),l=ma(o),u=!l||l===2&&i||n.includes(o),d=!i||i===2&&l||n.includes(r);return c._open=!!(a===42?u:u&&(i||!d)),c._close=!!(a===42?d:d&&(l||!u)),t(o)}}function ya(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}var ba={name:`autolink`,tokenize:xa};function xa(e,t,n){let r=0;return i;function i(t){return e.enter(`autolink`),e.enter(`autolinkMarker`),e.consume(t),e.exit(`autolinkMarker`),e.enter(`autolinkProtocol`),a}function a(t){return R(t)?(e.consume(t),o):t===64?n(t):l(t)}function o(e){return e===43||e===45||e===46||Qi(e)?(r=1,s(e)):l(e)}function s(t){return t===58?(e.consume(t),r=0,c):(t===43||t===45||t===46||Qi(t))&&r++<32?(e.consume(t),s):(r=0,l(t))}function c(r){return r===62?(e.exit(`autolinkProtocol`),e.enter(`autolinkMarker`),e.consume(r),e.exit(`autolinkMarker`),e.exit(`autolink`),t):r===null||r===32||r===60||ea(r)?n(r):(e.consume(r),c)}function l(t){return t===64?(e.consume(t),u):$i(t)?(e.consume(t),l):n(t)}function u(e){return Qi(e)?d(e):n(e)}function d(n){return n===46?(e.consume(n),r=0,u):n===62?(e.exit(`autolinkProtocol`).type=`autolinkEmail`,e.enter(`autolinkMarker`),e.consume(n),e.exit(`autolinkMarker`),e.exit(`autolink`),t):f(n)}function f(t){if((t===45||Qi(t))&&r++<63){let n=t===45?f:d;return e.consume(t),n}return n(t)}}var Sa={partial:!0,tokenize:Ca};function Ca(e,t,n){return r;function r(t){return V(t)?H(e,i,`linePrefix`)(t):i(t)}function i(e){return e===null||z(e)?t(e):n(e)}}var wa={continuation:{tokenize:Ea},exit:Da,name:`blockQuote`,tokenize:Ta};function Ta(e,t,n){let r=this;return i;function i(t){if(t===62){let n=r.containerState;return n.open||=(e.enter(`blockQuote`,{_container:!0}),!0),e.enter(`blockQuotePrefix`),e.enter(`blockQuoteMarker`),e.consume(t),e.exit(`blockQuoteMarker`),a}return n(t)}function a(n){return V(n)?(e.enter(`blockQuotePrefixWhitespace`),e.consume(n),e.exit(`blockQuotePrefixWhitespace`),e.exit(`blockQuotePrefix`),t):(e.exit(`blockQuotePrefix`),t(n))}}function Ea(e,t,n){let r=this;return i;function i(t){return V(t)?H(e,a,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):a(t)}function a(r){return e.attempt(wa,t,n)(r)}}function Da(e){e.exit(`blockQuote`)}var Oa={name:`characterEscape`,tokenize:ka};function ka(e,t,n){return r;function r(t){return e.enter(`characterEscape`),e.enter(`escapeMarker`),e.consume(t),e.exit(`escapeMarker`),i}function i(r){return ra(r)?(e.enter(`characterEscapeValue`),e.consume(r),e.exit(`characterEscapeValue`),e.exit(`characterEscape`),t):n(r)}}var Aa={name:`characterReference`,tokenize:ja};function ja(e,t,n){let r=this,i=0,a,o;return s;function s(t){return e.enter(`characterReference`),e.enter(`characterReferenceMarker`),e.consume(t),e.exit(`characterReferenceMarker`),c}function c(t){return t===35?(e.enter(`characterReferenceMarkerNumeric`),e.consume(t),e.exit(`characterReferenceMarkerNumeric`),l):(e.enter(`characterReferenceValue`),a=31,o=Qi,u(t))}function l(t){return t===88||t===120?(e.enter(`characterReferenceMarkerHexadecimal`),e.consume(t),e.exit(`characterReferenceMarkerHexadecimal`),e.enter(`characterReferenceValue`),a=6,o=na,u):(e.enter(`characterReferenceValue`),a=7,o=ta,u(t))}function u(s){if(s===59&&i){let i=e.exit(`characterReferenceValue`);return o===Qi&&!Ui(r.sliceSerialize(i))?n(s):(e.enter(`characterReferenceMarker`),e.consume(s),e.exit(`characterReferenceMarker`),e.exit(`characterReference`),t)}return o(s)&&i++<a?(e.consume(s),u):n(s)}}var Ma={partial:!0,tokenize:Fa},Na={concrete:!0,name:`codeFenced`,tokenize:Pa};function Pa(e,t,n){let r=this,i={partial:!0,tokenize:x},a=0,o=0,s;return c;function c(e){return l(e)}function l(t){let n=r.events[r.events.length-1];return a=n&&n[1].type===`linePrefix`?n[2].sliceSerialize(n[1],!0).length:0,s=t,e.enter(`codeFenced`),e.enter(`codeFencedFence`),e.enter(`codeFencedFenceSequence`),u(t)}function u(t){return t===s?(o++,e.consume(t),u):o<3?n(t):(e.exit(`codeFencedFenceSequence`),V(t)?H(e,d,`whitespace`)(t):d(t))}function d(n){return n===null||z(n)?(e.exit(`codeFencedFence`),r.interrupt?t(n):e.check(Ma,h,b)(n)):(e.enter(`codeFencedFenceInfo`),e.enter(`chunkString`,{contentType:`string`}),f(n))}function f(t){return t===null||z(t)?(e.exit(`chunkString`),e.exit(`codeFencedFenceInfo`),d(t)):V(t)?(e.exit(`chunkString`),e.exit(`codeFencedFenceInfo`),H(e,p,`whitespace`)(t)):t===96&&t===s?n(t):(e.consume(t),f)}function p(t){return t===null||z(t)?d(t):(e.enter(`codeFencedFenceMeta`),e.enter(`chunkString`,{contentType:`string`}),m(t))}function m(t){return t===null||z(t)?(e.exit(`chunkString`),e.exit(`codeFencedFenceMeta`),d(t)):t===96&&t===s?n(t):(e.consume(t),m)}function h(t){return e.attempt(i,b,g)(t)}function g(t){return e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),_}function _(t){return a>0&&V(t)?H(e,v,`linePrefix`,a+1)(t):v(t)}function v(t){return t===null||z(t)?e.check(Ma,h,b)(t):(e.enter(`codeFlowValue`),y(t))}function y(t){return t===null||z(t)?(e.exit(`codeFlowValue`),v(t)):(e.consume(t),y)}function b(n){return e.exit(`codeFenced`),t(n)}function x(e,t,n){let i=0;return a;function a(t){return e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),c}function c(t){return e.enter(`codeFencedFence`),V(t)?H(e,l,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):l(t)}function l(t){return t===s?(e.enter(`codeFencedFenceSequence`),u(t)):n(t)}function u(t){return t===s?(i++,e.consume(t),u):i>=o?(e.exit(`codeFencedFenceSequence`),V(t)?H(e,d,`whitespace`)(t):d(t)):n(t)}function d(r){return r===null||z(r)?(e.exit(`codeFencedFence`),t(r)):n(r)}}}function Fa(e,t,n){let r=this;return i;function i(t){return t===null?n(t):(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),a)}function a(e){return r.parser.lazy[r.now().line]?n(e):t(e)}}var Ia={name:`codeIndented`,tokenize:Ra},La={partial:!0,tokenize:za};function Ra(e,t,n){let r=this;return i;function i(t){return e.enter(`codeIndented`),H(e,a,`linePrefix`,5)(t)}function a(e){let t=r.events[r.events.length-1];return t&&t[1].type===`linePrefix`&&t[2].sliceSerialize(t[1],!0).length>=4?o(e):n(e)}function o(t){return t===null?c(t):z(t)?e.attempt(La,o,c)(t):(e.enter(`codeFlowValue`),s(t))}function s(t){return t===null||z(t)?(e.exit(`codeFlowValue`),o(t)):(e.consume(t),s)}function c(n){return e.exit(`codeIndented`),t(n)}}function za(e,t,n){let r=this;return i;function i(t){return r.parser.lazy[r.now().line]?n(t):z(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),i):H(e,a,`linePrefix`,5)(t)}function a(e){let a=r.events[r.events.length-1];return a&&a[1].type===`linePrefix`&&a[2].sliceSerialize(a[1],!0).length>=4?t(e):z(e)?i(e):n(e)}}var Ba={name:`codeText`,previous:U,resolve:Va,tokenize:W};function Va(e){let t=e.length-4,n=3,r,i;if((e[n][1].type===`lineEnding`||e[n][1].type===`space`)&&(e[t][1].type===`lineEnding`||e[t][1].type===`space`)){for(r=n;++r<t;)if(e[r][1].type===`codeTextData`){e[n][1].type=`codeTextPadding`,e[t][1].type=`codeTextPadding`,n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)i===void 0?r!==t&&e[r][1].type!==`lineEnding`&&(i=r):(r===t||e[r][1].type===`lineEnding`)&&(e[i][1].type=`codeTextData`,r!==i+2&&(e[i][1].end=e[r-1][1].end,e.splice(i+2,r-i-2),t-=r-i-2,r=i+2),i=void 0);return e}function U(e){return e!==96||this.events[this.events.length-1][1].type===`characterEscape`}function W(e,t,n){let r=0,i,a;return o;function o(t){return e.enter(`codeText`),e.enter(`codeTextSequence`),s(t)}function s(t){return t===96?(e.consume(t),r++,s):(e.exit(`codeTextSequence`),c(t))}function c(t){return t===null?n(t):t===32?(e.enter(`space`),e.consume(t),e.exit(`space`),c):t===96?(a=e.enter(`codeTextSequence`),i=0,u(t)):z(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),c):(e.enter(`codeTextData`),l(t))}function l(t){return t===null||t===32||t===96||z(t)?(e.exit(`codeTextData`),c(t)):(e.consume(t),l)}function u(n){return n===96?(e.consume(n),i++,u):i===r?(e.exit(`codeTextSequence`),e.exit(`codeText`),t(n)):(a.type=`codeTextData`,l(n))}}var Ha=class{constructor(e){this.left=e?[...e]:[],this.right=[]}get(e){if(e<0||e>=this.left.length+this.right.length)throw RangeError("Cannot access index `"+e+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return e<this.left.length?this.left[e]:this.right[this.right.length-e+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(e,t){let n=t??1/0;return n<this.left.length?this.left.slice(e,n):e>this.left.length?this.right.slice(this.right.length-n+this.left.length,this.right.length-e+this.left.length).reverse():this.left.slice(e).concat(this.right.slice(this.right.length-n+this.left.length).reverse())}splice(e,t,n){let r=t||0;this.setCursor(Math.trunc(e));let i=this.right.splice(this.right.length-r,1/0);return n&&Ua(this.left,n),i.reverse()}pop(){return this.setCursor(1/0),this.left.pop()}push(e){this.setCursor(1/0),this.left.push(e)}pushMany(e){this.setCursor(1/0),Ua(this.left,e)}unshift(e){this.setCursor(0),this.right.push(e)}unshiftMany(e){this.setCursor(0),Ua(this.right,e.reverse())}setCursor(e){if(!(e===this.left.length||e>this.left.length&&this.right.length===0||e<0&&this.left.length===0))if(e<this.left.length){let t=this.left.splice(e,1/0);Ua(this.right,t.reverse())}else{let t=this.right.splice(this.left.length+this.right.length-e,1/0);Ua(this.left,t.reverse())}}};function Ua(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function Wa(e){let t={},n=-1,r,i,a,o,s,c,l,u=new Ha(e);for(;++n<u.length;){for(;n in t;)n=t[n];if(r=u.get(n),n&&r[1].type===`chunkFlow`&&u.get(n-1)[1].type===`listItemPrefix`&&(c=r[1]._tokenizer.events,a=0,a<c.length&&c[a][1].type===`lineEndingBlank`&&(a+=2),a<c.length&&c[a][1].type===`content`))for(;++a<c.length&&c[a][1].type!==`content`;)c[a][1].type===`chunkText`&&(c[a][1]._isInFirstContentOfListItem=!0,a++);if(r[0]===`enter`)r[1].contentType&&(Object.assign(t,Ga(u,n)),n=t[n],l=!0);else if(r[1]._container){for(a=n,i=void 0;a--;)if(o=u.get(a),o[1].type===`lineEnding`||o[1].type===`lineEndingBlank`)o[0]===`enter`&&(i&&(u.get(i)[1].type=`lineEndingBlank`),o[1].type=`lineEnding`,i=a);else if(!(o[1].type===`linePrefix`||o[1].type===`listItemIndent`))break;i&&(r[1].end={...u.get(i)[1].start},s=u.slice(i,n),s.unshift(r),u.splice(i,n-i+1,s))}}return Wi(e,0,1/0,u.slice(0)),!l}function Ga(e,t){let n=e.get(t)[1],r=e.get(t)[2],i=t-1,a=[],o=n._tokenizer;o||(o=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(o._contentTypeTextTrailing=!0));let s=o.events,c=[],l={},u,d,f=-1,p=n,m=0,h=0,g=[h];for(;p;){for(;e.get(++i)[1]!==p;);a.push(i),p._tokenizer||(u=r.sliceStream(p),p.next||u.push(null),d&&o.defineSkip(p.start),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(u),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),d=p,p=p.next}for(p=n;++f<s.length;)s[f][0]===`exit`&&s[f-1][0]===`enter`&&s[f][1].type===s[f-1][1].type&&s[f][1].start.line!==s[f][1].end.line&&(h=f+1,g.push(h),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(o.events=[],p?(p._tokenizer=void 0,p.previous=void 0):g.pop(),f=g.length;f--;){let t=s.slice(g[f],g[f+1]),n=a.pop();c.push([n,n+t.length-1]),e.splice(n,2,t)}for(c.reverse(),f=-1;++f<c.length;)l[m+c[f][0]]=m+c[f][1],m+=c[f][1]-c[f][0]-1;return l}var Ka={resolve:Ja,tokenize:Ya},qa={partial:!0,tokenize:Xa};function Ja(e){return Wa(e),e}function Ya(e,t){let n;return r;function r(t){return e.enter(`content`),n=e.enter(`chunkContent`,{contentType:`content`}),i(t)}function i(t){return t===null?a(t):z(t)?e.check(qa,o,a)(t):(e.consume(t),i)}function a(n){return e.exit(`chunkContent`),e.exit(`content`),t(n)}function o(t){return e.consume(t),e.exit(`chunkContent`),n.next=e.enter(`chunkContent`,{contentType:`content`,previous:n}),n=n.next,i}}function Xa(e,t,n){let r=this;return i;function i(t){return e.exit(`chunkContent`),e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),H(e,a,`linePrefix`)}function a(i){if(i===null||z(i))return n(i);let a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes(`codeIndented`)&&a&&a[1].type===`linePrefix`&&a[2].sliceSerialize(a[1],!0).length>=4?t(i):e.interrupt(r.parser.constructs.flow,n,t)(i)}}function Za(e,t,n,r,i,a,o,s,c){let l=c||1/0,u=0;return d;function d(t){return t===60?(e.enter(r),e.enter(i),e.enter(a),e.consume(t),e.exit(a),f):t===null||t===32||t===41||ea(t)?n(t):(e.enter(r),e.enter(o),e.enter(s),e.enter(`chunkString`,{contentType:`string`}),h(t))}function f(n){return n===62?(e.enter(a),e.consume(n),e.exit(a),e.exit(i),e.exit(r),t):(e.enter(s),e.enter(`chunkString`,{contentType:`string`}),p(n))}function p(t){return t===62?(e.exit(`chunkString`),e.exit(s),f(t)):t===null||t===60||z(t)?n(t):(e.consume(t),t===92?m:p)}function m(t){return t===60||t===62||t===92?(e.consume(t),p):p(t)}function h(i){return!u&&(i===null||i===41||B(i))?(e.exit(`chunkString`),e.exit(s),e.exit(o),e.exit(r),t(i)):u<l&&i===40?(e.consume(i),u++,h):i===41?(e.consume(i),u--,h):i===null||i===32||i===40||ea(i)?n(i):(e.consume(i),i===92?g:h)}function g(t){return t===40||t===41||t===92?(e.consume(t),h):h(t)}}function Qa(e,t,n,r,i,a){let o=this,s=0,c;return l;function l(t){return e.enter(r),e.enter(i),e.consume(t),e.exit(i),e.enter(a),u}function u(l){return s>999||l===null||l===91||l===93&&!c||l===94&&!s&&`_hiddenFootnoteSupport`in o.parser.constructs?n(l):l===93?(e.exit(a),e.enter(i),e.consume(l),e.exit(i),e.exit(r),t):z(l)?(e.enter(`lineEnding`),e.consume(l),e.exit(`lineEnding`),u):(e.enter(`chunkString`,{contentType:`string`}),d(l))}function d(t){return t===null||t===91||t===93||z(t)||s++>999?(e.exit(`chunkString`),u(t)):(e.consume(t),c||=!V(t),t===92?f:d)}function f(t){return t===91||t===92||t===93?(e.consume(t),s++,d):d(t)}}function $a(e,t,n,r,i,a){let o;return s;function s(t){return t===34||t===39||t===40?(e.enter(r),e.enter(i),e.consume(t),e.exit(i),o=t===40?41:t,c):n(t)}function c(n){return n===o?(e.enter(i),e.consume(n),e.exit(i),e.exit(r),t):(e.enter(a),l(n))}function l(t){return t===o?(e.exit(a),c(o)):t===null?n(t):z(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),H(e,l,`linePrefix`)):(e.enter(`chunkString`,{contentType:`string`}),u(t))}function u(t){return t===o||t===null||z(t)?(e.exit(`chunkString`),l(t)):(e.consume(t),t===92?d:u)}function d(t){return t===o||t===92?(e.consume(t),u):u(t)}}function eo(e,t){let n;return r;function r(i){return z(i)?(e.enter(`lineEnding`),e.consume(i),e.exit(`lineEnding`),n=!0,r):V(i)?H(e,r,n?`linePrefix`:`lineSuffix`)(i):t(i)}}var to={name:`definition`,tokenize:ro},no={partial:!0,tokenize:io};function ro(e,t,n){let r=this,i;return a;function a(t){return e.enter(`definition`),o(t)}function o(t){return Qa.call(r,e,s,n,`definitionLabel`,`definitionLabelMarker`,`definitionLabelString`)(t)}function s(t){return i=Zi(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),t===58?(e.enter(`definitionMarker`),e.consume(t),e.exit(`definitionMarker`),c):n(t)}function c(t){return B(t)?eo(e,l)(t):l(t)}function l(t){return Za(e,u,n,`definitionDestination`,`definitionDestinationLiteral`,`definitionDestinationLiteralMarker`,`definitionDestinationRaw`,`definitionDestinationString`)(t)}function u(t){return e.attempt(no,d,d)(t)}function d(t){return V(t)?H(e,f,`whitespace`)(t):f(t)}function f(a){return a===null||z(a)?(e.exit(`definition`),r.parser.defined.push(i),t(a)):n(a)}}function io(e,t,n){return r;function r(t){return B(t)?eo(e,i)(t):n(t)}function i(t){return $a(e,a,n,`definitionTitle`,`definitionTitleMarker`,`definitionTitleString`)(t)}function a(t){return V(t)?H(e,o,`whitespace`)(t):o(t)}function o(e){return e===null||z(e)?t(e):n(e)}}var ao={name:`hardBreakEscape`,tokenize:oo};function oo(e,t,n){return r;function r(t){return e.enter(`hardBreakEscape`),e.consume(t),i}function i(r){return z(r)?(e.exit(`hardBreakEscape`),t(r)):n(r)}}var so={name:`headingAtx`,resolve:co,tokenize:lo};function co(e,t){let n=e.length-2,r=3,i,a;return e[r][1].type===`whitespace`&&(r+=2),n-2>r&&e[n][1].type===`whitespace`&&(n-=2),e[n][1].type===`atxHeadingSequence`&&(r===n-1||n-4>r&&e[n-2][1].type===`whitespace`)&&(n-=r+1===n?2:4),n>r&&(i={type:`atxHeadingText`,start:e[r][1].start,end:e[n][1].end},a={type:`chunkText`,start:e[r][1].start,end:e[n][1].end,contentType:`text`},Wi(e,r,n-r+1,[[`enter`,i,t],[`enter`,a,t],[`exit`,a,t],[`exit`,i,t]])),e}function lo(e,t,n){let r=0;return i;function i(t){return e.enter(`atxHeading`),a(t)}function a(t){return e.enter(`atxHeadingSequence`),o(t)}function o(t){return t===35&&r++<6?(e.consume(t),o):t===null||B(t)?(e.exit(`atxHeadingSequence`),s(t)):n(t)}function s(n){return n===35?(e.enter(`atxHeadingSequence`),c(n)):n===null||z(n)?(e.exit(`atxHeading`),t(n)):V(n)?H(e,s,`whitespace`)(n):(e.enter(`atxHeadingText`),l(n))}function c(t){return t===35?(e.consume(t),c):(e.exit(`atxHeadingSequence`),s(t))}function l(t){return t===null||t===35||B(t)?(e.exit(`atxHeadingText`),s(t)):(e.consume(t),l)}}var uo=`address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul`.split(`.`),fo=[`pre`,`script`,`style`,`textarea`],po={concrete:!0,name:`htmlFlow`,resolveTo:go,tokenize:_o},mo={partial:!0,tokenize:yo},ho={partial:!0,tokenize:vo};function go(e){let t=e.length;for(;t--&&!(e[t][0]===`enter`&&e[t][1].type===`htmlFlow`););return t>1&&e[t-2][1].type===`linePrefix`&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function _o(e,t,n){let r=this,i,a,o,s,c;return l;function l(e){return u(e)}function u(t){return e.enter(`htmlFlow`),e.enter(`htmlFlowData`),e.consume(t),d}function d(s){return s===33?(e.consume(s),f):s===47?(e.consume(s),a=!0,h):s===63?(e.consume(s),i=3,r.interrupt?t:O):R(s)?(e.consume(s),o=String.fromCharCode(s),g):n(s)}function f(a){return a===45?(e.consume(a),i=2,p):a===91?(e.consume(a),i=5,s=0,m):R(a)?(e.consume(a),i=4,r.interrupt?t:O):n(a)}function p(i){return i===45?(e.consume(i),r.interrupt?t:O):n(i)}function m(i){return i===`CDATA[`.charCodeAt(s++)?(e.consume(i),s===6?r.interrupt?t:D:m):n(i)}function h(t){return R(t)?(e.consume(t),o=String.fromCharCode(t),g):n(t)}function g(s){if(s===null||s===47||s===62||B(s)){let c=s===47,l=o.toLowerCase();return!c&&!a&&fo.includes(l)?(i=1,r.interrupt?t(s):D(s)):uo.includes(o.toLowerCase())?(i=6,c?(e.consume(s),_):r.interrupt?t(s):D(s)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(s):a?v(s):y(s))}return s===45||Qi(s)?(e.consume(s),o+=String.fromCharCode(s),g):n(s)}function _(i){return i===62?(e.consume(i),r.interrupt?t:D):n(i)}function v(t){return V(t)?(e.consume(t),v):E(t)}function y(t){return t===47?(e.consume(t),E):t===58||t===95||R(t)?(e.consume(t),b):V(t)?(e.consume(t),y):E(t)}function b(t){return t===45||t===46||t===58||t===95||Qi(t)?(e.consume(t),b):x(t)}function x(t){return t===61?(e.consume(t),S):V(t)?(e.consume(t),x):y(t)}function S(t){return t===null||t===60||t===61||t===62||t===96?n(t):t===34||t===39?(e.consume(t),c=t,C):V(t)?(e.consume(t),S):w(t)}function C(t){return t===c?(e.consume(t),c=null,T):t===null||z(t)?n(t):(e.consume(t),C)}function w(t){return t===null||t===34||t===39||t===47||t===60||t===61||t===62||t===96||B(t)?x(t):(e.consume(t),w)}function T(e){return e===47||e===62||V(e)?y(e):n(e)}function E(t){return t===62?(e.consume(t),ee):n(t)}function ee(t){return t===null||z(t)?D(t):V(t)?(e.consume(t),ee):n(t)}function D(t){return t===45&&i===2?(e.consume(t),ie):t===60&&i===1?(e.consume(t),ae):t===62&&i===4?(e.consume(t),k):t===63&&i===3?(e.consume(t),O):t===93&&i===5?(e.consume(t),se):z(t)&&(i===6||i===7)?(e.exit(`htmlFlowData`),e.check(mo,ce,te)(t)):t===null||z(t)?(e.exit(`htmlFlowData`),te(t)):(e.consume(t),D)}function te(t){return e.check(ho,ne,ce)(t)}function ne(t){return e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),re}function re(t){return t===null||z(t)?te(t):(e.enter(`htmlFlowData`),D(t))}function ie(t){return t===45?(e.consume(t),O):D(t)}function ae(t){return t===47?(e.consume(t),o=``,oe):D(t)}function oe(t){if(t===62){let n=o.toLowerCase();return fo.includes(n)?(e.consume(t),k):D(t)}return R(t)&&o.length<8?(e.consume(t),o+=String.fromCharCode(t),oe):D(t)}function se(t){return t===93?(e.consume(t),O):D(t)}function O(t){return t===62?(e.consume(t),k):t===45&&i===2?(e.consume(t),O):D(t)}function k(t){return t===null||z(t)?(e.exit(`htmlFlowData`),ce(t)):(e.consume(t),k)}function ce(n){return e.exit(`htmlFlow`),t(n)}}function vo(e,t,n){let r=this;return i;function i(t){return z(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),a):n(t)}function a(e){return r.parser.lazy[r.now().line]?n(e):t(e)}}function yo(e,t,n){return r;function r(r){return e.enter(`lineEnding`),e.consume(r),e.exit(`lineEnding`),e.attempt(Sa,t,n)}}var bo={name:`htmlText`,tokenize:xo};function xo(e,t,n){let r=this,i,a,o;return s;function s(t){return e.enter(`htmlText`),e.enter(`htmlTextData`),e.consume(t),c}function c(t){return t===33?(e.consume(t),l):t===47?(e.consume(t),x):t===63?(e.consume(t),y):R(t)?(e.consume(t),w):n(t)}function l(t){return t===45?(e.consume(t),u):t===91?(e.consume(t),a=0,m):R(t)?(e.consume(t),v):n(t)}function u(t){return t===45?(e.consume(t),p):n(t)}function d(t){return t===null?n(t):t===45?(e.consume(t),f):z(t)?(o=d,ae(t)):(e.consume(t),d)}function f(t){return t===45?(e.consume(t),p):d(t)}function p(e){return e===62?ie(e):e===45?f(e):d(e)}function m(t){return t===`CDATA[`.charCodeAt(a++)?(e.consume(t),a===6?h:m):n(t)}function h(t){return t===null?n(t):t===93?(e.consume(t),g):z(t)?(o=h,ae(t)):(e.consume(t),h)}function g(t){return t===93?(e.consume(t),_):h(t)}function _(t){return t===62?ie(t):t===93?(e.consume(t),_):h(t)}function v(t){return t===null||t===62?ie(t):z(t)?(o=v,ae(t)):(e.consume(t),v)}function y(t){return t===null?n(t):t===63?(e.consume(t),b):z(t)?(o=y,ae(t)):(e.consume(t),y)}function b(e){return e===62?ie(e):y(e)}function x(t){return R(t)?(e.consume(t),S):n(t)}function S(t){return t===45||Qi(t)?(e.consume(t),S):C(t)}function C(t){return z(t)?(o=C,ae(t)):V(t)?(e.consume(t),C):ie(t)}function w(t){return t===45||Qi(t)?(e.consume(t),w):t===47||t===62||B(t)?T(t):n(t)}function T(t){return t===47?(e.consume(t),ie):t===58||t===95||R(t)?(e.consume(t),E):z(t)?(o=T,ae(t)):V(t)?(e.consume(t),T):ie(t)}function E(t){return t===45||t===46||t===58||t===95||Qi(t)?(e.consume(t),E):ee(t)}function ee(t){return t===61?(e.consume(t),D):z(t)?(o=ee,ae(t)):V(t)?(e.consume(t),ee):T(t)}function D(t){return t===null||t===60||t===61||t===62||t===96?n(t):t===34||t===39?(e.consume(t),i=t,te):z(t)?(o=D,ae(t)):V(t)?(e.consume(t),D):(e.consume(t),ne)}function te(t){return t===i?(e.consume(t),i=void 0,re):t===null?n(t):z(t)?(o=te,ae(t)):(e.consume(t),te)}function ne(t){return t===null||t===34||t===39||t===60||t===61||t===96?n(t):t===47||t===62||B(t)?T(t):(e.consume(t),ne)}function re(e){return e===47||e===62||B(e)?T(e):n(e)}function ie(r){return r===62?(e.consume(r),e.exit(`htmlTextData`),e.exit(`htmlText`),t):n(r)}function ae(t){return e.exit(`htmlTextData`),e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),oe}function oe(t){return V(t)?H(e,se,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):se(t)}function se(t){return e.enter(`htmlTextData`),o(t)}}var So={name:`labelEnd`,resolveAll:Eo,resolveTo:Do,tokenize:Oo},Co={tokenize:ko},wo={tokenize:Ao},To={tokenize:jo};function Eo(e){let t=-1,n=[];for(;++t<e.length;){let r=e[t][1];if(n.push(e[t]),r.type===`labelImage`||r.type===`labelLink`||r.type===`labelEnd`){let e=r.type===`labelImage`?4:2;r.type=`data`,t+=e}}return e.length!==n.length&&Wi(e,0,e.length,n),e}function Do(e,t){let n=e.length,r=0,i,a,o,s;for(;n--;)if(i=e[n][1],a){if(i.type===`link`||i.type===`labelLink`&&i._inactive)break;e[n][0]===`enter`&&i.type===`labelLink`&&(i._inactive=!0)}else if(o){if(e[n][0]===`enter`&&(i.type===`labelImage`||i.type===`labelLink`)&&!i._balanced&&(a=n,i.type!==`labelLink`)){r=2;break}}else i.type===`labelEnd`&&(o=n);let c={type:e[a][1].type===`labelLink`?`link`:`image`,start:{...e[a][1].start},end:{...e[e.length-1][1].end}},l={type:`label`,start:{...e[a][1].start},end:{...e[o][1].end}},u={type:`labelText`,start:{...e[a+r+2][1].end},end:{...e[o-2][1].start}};return s=[[`enter`,c,t],[`enter`,l,t]],s=Gi(s,e.slice(a+1,a+r+3)),s=Gi(s,[[`enter`,u,t]]),s=Gi(s,ha(t.parser.constructs.insideSpan.null,e.slice(a+r+4,o-3),t)),s=Gi(s,[[`exit`,u,t],e[o-2],e[o-1],[`exit`,l,t]]),s=Gi(s,e.slice(o+1)),s=Gi(s,[[`exit`,c,t]]),Wi(e,a,e.length,s),e}function Oo(e,t,n){let r=this,i=r.events.length,a,o;for(;i--;)if((r.events[i][1].type===`labelImage`||r.events[i][1].type===`labelLink`)&&!r.events[i][1]._balanced){a=r.events[i][1];break}return s;function s(t){return a?a._inactive?d(t):(o=r.parser.defined.includes(Zi(r.sliceSerialize({start:a.end,end:r.now()}))),e.enter(`labelEnd`),e.enter(`labelMarker`),e.consume(t),e.exit(`labelMarker`),e.exit(`labelEnd`),c):n(t)}function c(t){return t===40?e.attempt(Co,u,o?u:d)(t):t===91?e.attempt(wo,u,o?l:d)(t):o?u(t):d(t)}function l(t){return e.attempt(To,u,d)(t)}function u(e){return t(e)}function d(e){return a._balanced=!0,n(e)}}function ko(e,t,n){return r;function r(t){return e.enter(`resource`),e.enter(`resourceMarker`),e.consume(t),e.exit(`resourceMarker`),i}function i(t){return B(t)?eo(e,a)(t):a(t)}function a(t){return t===41?u(t):Za(e,o,s,`resourceDestination`,`resourceDestinationLiteral`,`resourceDestinationLiteralMarker`,`resourceDestinationRaw`,`resourceDestinationString`,32)(t)}function o(t){return B(t)?eo(e,c)(t):u(t)}function s(e){return n(e)}function c(t){return t===34||t===39||t===40?$a(e,l,n,`resourceTitle`,`resourceTitleMarker`,`resourceTitleString`)(t):u(t)}function l(t){return B(t)?eo(e,u)(t):u(t)}function u(r){return r===41?(e.enter(`resourceMarker`),e.consume(r),e.exit(`resourceMarker`),e.exit(`resource`),t):n(r)}}function Ao(e,t,n){let r=this;return i;function i(t){return Qa.call(r,e,a,o,`reference`,`referenceMarker`,`referenceString`)(t)}function a(e){return r.parser.defined.includes(Zi(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(e):n(e)}function o(e){return n(e)}}function jo(e,t,n){return r;function r(t){return e.enter(`reference`),e.enter(`referenceMarker`),e.consume(t),e.exit(`referenceMarker`),i}function i(r){return r===93?(e.enter(`referenceMarker`),e.consume(r),e.exit(`referenceMarker`),e.exit(`reference`),t):n(r)}}var Mo={name:`labelStartImage`,resolveAll:So.resolveAll,tokenize:No};function No(e,t,n){let r=this;return i;function i(t){return e.enter(`labelImage`),e.enter(`labelImageMarker`),e.consume(t),e.exit(`labelImageMarker`),a}function a(t){return t===91?(e.enter(`labelMarker`),e.consume(t),e.exit(`labelMarker`),e.exit(`labelImage`),o):n(t)}function o(e){return e===94&&`_hiddenFootnoteSupport`in r.parser.constructs?n(e):t(e)}}var Po={name:`labelStartLink`,resolveAll:So.resolveAll,tokenize:Fo};function Fo(e,t,n){let r=this;return i;function i(t){return e.enter(`labelLink`),e.enter(`labelMarker`),e.consume(t),e.exit(`labelMarker`),e.exit(`labelLink`),a}function a(e){return e===94&&`_hiddenFootnoteSupport`in r.parser.constructs?n(e):t(e)}}var Io={name:`lineEnding`,tokenize:Lo};function Lo(e,t){return n;function n(n){return e.enter(`lineEnding`),e.consume(n),e.exit(`lineEnding`),H(e,t,`linePrefix`)}}var Ro={name:`thematicBreak`,tokenize:zo};function zo(e,t,n){let r=0,i;return a;function a(t){return e.enter(`thematicBreak`),o(t)}function o(e){return i=e,s(e)}function s(a){return a===i?(e.enter(`thematicBreakSequence`),c(a)):r>=3&&(a===null||z(a))?(e.exit(`thematicBreak`),t(a)):n(a)}function c(t){return t===i?(e.consume(t),r++,c):(e.exit(`thematicBreakSequence`),V(t)?H(e,s,`whitespace`)(t):s(t))}}var Bo={continuation:{tokenize:Wo},exit:Ko,name:`list`,tokenize:Uo},Vo={partial:!0,tokenize:qo},Ho={partial:!0,tokenize:Go};function Uo(e,t,n){let r=this,i=r.events[r.events.length-1],a=i&&i[1].type===`linePrefix`?i[2].sliceSerialize(i[1],!0).length:0,o=0;return s;function s(t){let i=r.containerState.type||(t===42||t===43||t===45?`listUnordered`:`listOrdered`);if(i===`listUnordered`?!r.containerState.marker||t===r.containerState.marker:ta(t)){if(r.containerState.type||(r.containerState.type=i,e.enter(i,{_container:!0})),i===`listUnordered`)return e.enter(`listItemPrefix`),t===42||t===45?e.check(Ro,n,l)(t):l(t);if(!r.interrupt||t===49)return e.enter(`listItemPrefix`),e.enter(`listItemValue`),c(t)}return n(t)}function c(t){return ta(t)&&++o<10?(e.consume(t),c):(!r.interrupt||o<2)&&(r.containerState.marker?t===r.containerState.marker:t===41||t===46)?(e.exit(`listItemValue`),l(t)):n(t)}function l(t){return e.enter(`listItemMarker`),e.consume(t),e.exit(`listItemMarker`),r.containerState.marker=r.containerState.marker||t,e.check(Sa,r.interrupt?n:u,e.attempt(Vo,f,d))}function u(e){return r.containerState.initialBlankLine=!0,a++,f(e)}function d(t){return V(t)?(e.enter(`listItemPrefixWhitespace`),e.consume(t),e.exit(`listItemPrefixWhitespace`),f):n(t)}function f(n){return r.containerState.size=a+r.sliceSerialize(e.exit(`listItemPrefix`),!0).length,t(n)}}function Wo(e,t,n){let r=this;return r.containerState._closeFlow=void 0,e.check(Sa,i,a);function i(n){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,H(e,t,`listItemIndent`,r.containerState.size+1)(n)}function a(n){return r.containerState.furtherBlankLines||!V(n)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,o(n)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(Ho,t,o)(n))}function o(i){return r.containerState._closeFlow=!0,r.interrupt=void 0,H(e,e.attempt(Bo,t,n),`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(i)}}function Go(e,t,n){let r=this;return H(e,i,`listItemIndent`,r.containerState.size+1);function i(e){let i=r.events[r.events.length-1];return i&&i[1].type===`listItemIndent`&&i[2].sliceSerialize(i[1],!0).length===r.containerState.size?t(e):n(e)}}function Ko(e){e.exit(this.containerState.type)}function qo(e,t,n){let r=this;return H(e,i,`listItemPrefixWhitespace`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:5);function i(e){let i=r.events[r.events.length-1];return!V(e)&&i&&i[1].type===`listItemPrefixWhitespace`?t(e):n(e)}}var Jo={name:`setextUnderline`,resolveTo:Yo,tokenize:Xo};function Yo(e,t){let n=e.length,r,i,a;for(;n--;)if(e[n][0]===`enter`){if(e[n][1].type===`content`){r=n;break}e[n][1].type===`paragraph`&&(i=n)}else e[n][1].type===`content`&&e.splice(n,1),!a&&e[n][1].type===`definition`&&(a=n);let o={type:`setextHeading`,start:{...e[r][1].start},end:{...e[e.length-1][1].end}};return e[i][1].type=`setextHeadingText`,a?(e.splice(i,0,[`enter`,o,t]),e.splice(a+1,0,[`exit`,e[r][1],t]),e[r][1].end={...e[a][1].end}):e[r][1]=o,e.push([`exit`,o,t]),e}function Xo(e,t,n){let r=this,i;return a;function a(t){let a=r.events.length,s;for(;a--;)if(r.events[a][1].type!==`lineEnding`&&r.events[a][1].type!==`linePrefix`&&r.events[a][1].type!==`content`){s=r.events[a][1].type===`paragraph`;break}return!r.parser.lazy[r.now().line]&&(r.interrupt||s)?(e.enter(`setextHeadingLine`),i=t,o(t)):n(t)}function o(t){return e.enter(`setextHeadingLineSequence`),s(t)}function s(t){return t===i?(e.consume(t),s):(e.exit(`setextHeadingLineSequence`),V(t)?H(e,c,`lineSuffix`)(t):c(t))}function c(r){return r===null||z(r)?(e.exit(`setextHeadingLine`),t(r)):n(r)}}var Zo={tokenize:Qo};function Qo(e){let t=this,n=e.attempt(Sa,r,e.attempt(this.parser.constructs.flowInitial,i,H(e,e.attempt(this.parser.constructs.flow,i,e.attempt(Ka,i)),`linePrefix`)));return n;function r(r){if(r===null){e.consume(r);return}return e.enter(`lineEndingBlank`),e.consume(r),e.exit(`lineEndingBlank`),t.currentConstruct=void 0,n}function i(r){if(r===null){e.consume(r);return}return e.enter(`lineEnding`),e.consume(r),e.exit(`lineEnding`),t.currentConstruct=void 0,n}}var $o={resolveAll:rs()},es=ns(`string`),ts=ns(`text`);function ns(e){return{resolveAll:rs(e===`text`?is:void 0),tokenize:t};function t(t){let n=this,r=this.parser.constructs[e],i=t.attempt(r,a,o);return a;function a(e){return c(e)?i(e):o(e)}function o(e){if(e===null){t.consume(e);return}return t.enter(`data`),t.consume(e),s}function s(e){return c(e)?(t.exit(`data`),i(e)):(t.consume(e),s)}function c(e){if(e===null)return!0;let t=r[e],i=-1;if(t)for(;++i<t.length;){let e=t[i];if(!e.previous||e.previous.call(n,n.previous))return!0}return!1}}}function rs(e){return t;function t(t,n){let r=-1,i;for(;++r<=t.length;)i===void 0?t[r]&&t[r][1].type===`data`&&(i=r,r++):(!t[r]||t[r][1].type!==`data`)&&(r!==i+2&&(t[i][1].end=t[r-1][1].end,t.splice(i+2,r-i-2),r=i+2),i=void 0);return e?e(t,n):t}}function is(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type===`lineEnding`)&&e[n-1][1].type===`data`){let r=e[n-1][1],i=t.sliceStream(r),a=i.length,o=-1,s=0,c;for(;a--;){let e=i[a];if(typeof e==`string`){for(o=e.length;e.charCodeAt(o-1)===32;)s++,o--;if(o)break;o=-1}else if(e===-2)c=!0,s++;else if(e!==-1){a++;break}}if(t._contentTypeTextTrailing&&n===e.length&&(s=0),s){let i={type:n===e.length||c||s<2?`lineSuffix`:`hardBreakTrailing`,start:{_bufferIndex:a?o:r.start._bufferIndex+o,_index:r.start._index+a,line:r.end.line,column:r.end.column-s,offset:r.end.offset-s},end:{...r.end}};r.end={...i.start},r.start.offset===r.end.offset?Object.assign(r,i):(e.splice(n,0,[`enter`,i,t],[`exit`,i,t]),n+=2)}n++}return e}var as=s({attentionMarkers:()=>ps,contentInitial:()=>ss,disable:()=>ms,document:()=>os,flow:()=>ls,flowInitial:()=>cs,insideSpan:()=>fs,string:()=>us,text:()=>ds}),os={42:Bo,43:Bo,45:Bo,48:Bo,49:Bo,50:Bo,51:Bo,52:Bo,53:Bo,54:Bo,55:Bo,56:Bo,57:Bo,62:wa},ss={91:to},cs={[-2]:Ia,[-1]:Ia,32:Ia},ls={35:so,42:Ro,45:[Jo,Ro],60:po,61:Jo,95:Ro,96:Na,126:Na},us={38:Aa,92:Oa},ds={[-5]:Io,[-4]:Io,[-3]:Io,33:Mo,38:Aa,42:ga,60:[ba,bo],91:Po,92:[ao,Oa],93:So,95:ga,96:Ba},fs={null:[ga,$o]},ps={null:[42,95]},ms={null:[]};function hs(e,t,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0},i={},a=[],o=[],s=[],c={attempt:C(x),check:C(S),consume:v,enter:y,exit:b,interrupt:C(S,{interrupt:!0})},l={code:null,containerState:{},defineSkip:h,events:[],now:m,parser:e,previous:null,sliceSerialize:f,sliceStream:p,write:d},u=t.tokenize.call(l,c);return t.resolveAll&&a.push(t),l;function d(e){return o=Gi(o,e),g(),o[o.length-1]===null?(w(t,0),l.events=ha(a,l.events,l),l.events):[]}function f(e,t){return _s(p(e),t)}function p(e){return gs(o,e)}function m(){let{_bufferIndex:e,_index:t,line:n,column:i,offset:a}=r;return{_bufferIndex:e,_index:t,line:n,column:i,offset:a}}function h(e){i[e.line]=e.column,E()}function g(){let e;for(;r._index<o.length;){let t=o[r._index];if(typeof t==`string`)for(e=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===e&&r._bufferIndex<t.length;)_(t.charCodeAt(r._bufferIndex));else _(t)}}function _(e){u=u(e)}function v(e){z(e)?(r.line++,r.column=1,r.offset+=e===-3?2:1,E()):e!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===o[r._index].length&&(r._bufferIndex=-1,r._index++)),l.previous=e}function y(e,t){let n=t||{};return n.type=e,n.start=m(),l.events.push([`enter`,n,l]),s.push(n),n}function b(e){let t=s.pop();return t.end=m(),l.events.push([`exit`,t,l]),t}function x(e,t){w(e,t.from)}function S(e,t){t.restore()}function C(e,t){return n;function n(n,r,i){let a,o,s,u;return Array.isArray(n)?f(n):`tokenize`in n?f([n]):d(n);function d(e){return t;function t(t){let n=t!==null&&e[t],r=t!==null&&e.null;return f([...Array.isArray(n)?n:n?[n]:[],...Array.isArray(r)?r:r?[r]:[]])(t)}}function f(e){return a=e,o=0,e.length===0?i:p(e[o])}function p(e){return n;function n(n){return u=T(),s=e,e.partial||(l.currentConstruct=e),e.name&&l.parser.constructs.disable.null.includes(e.name)?h(n):e.tokenize.call(t?Object.assign(Object.create(l),t):l,c,m,h)(n)}}function m(t){return e(s,u),r}function h(e){return u.restore(),++o<a.length?p(a[o]):i}}}function w(e,t){e.resolveAll&&!a.includes(e)&&a.push(e),e.resolve&&Wi(l.events,t,l.events.length-t,e.resolve(l.events.slice(t),l)),e.resolveTo&&(l.events=e.resolveTo(l.events,l))}function T(){let e=m(),t=l.previous,n=l.currentConstruct,i=l.events.length,a=Array.from(s);return{from:i,restore:o};function o(){r=e,l.previous=t,l.currentConstruct=n,l.events.length=i,s=a,E()}}function E(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function gs(e,t){let n=t.start._index,r=t.start._bufferIndex,i=t.end._index,a=t.end._bufferIndex,o;if(n===i)o=[e[n].slice(r,a)];else{if(o=e.slice(n,i),r>-1){let e=o[0];typeof e==`string`?o[0]=e.slice(r):o.shift()}a>0&&o.push(e[i].slice(0,a))}return o}function _s(e,t){let n=-1,r=[],i;for(;++n<e.length;){let a=e[n],o;if(typeof a==`string`)o=a;else switch(a){case-5:o=`\r`;break;case-4:o=`
`;break;case-3:o=`\r
`;break;case-2:o=t?` `:`	`;break;case-1:if(!t&&i)continue;o=` `;break;default:o=String.fromCharCode(a)}i=a===-2,r.push(o)}return r.join(``)}function vs(e){let t={constructs:qi([as,...(e||{}).extensions||[]]),content:n(ca),defined:[],document:n(ua),flow:n(Zo),lazy:{},string:n(es),text:n(ts)};return t;function n(e){return n;function n(n){return hs(t,e,n)}}}function ys(e){for(;!Wa(e););return e}var bs=/[\0\t\n\r]/g;function xs(){let e=1,t=``,n=!0,r;return i;function i(i,a,o){let s=[],c,l,u,d,f;for(i=t+(typeof i==`string`?i.toString():new TextDecoder(a||void 0).decode(i)),u=0,t=``,n&&=(i.charCodeAt(0)===65279&&u++,void 0);u<i.length;){if(bs.lastIndex=u,c=bs.exec(i),d=c&&c.index!==void 0?c.index:i.length,f=i.charCodeAt(d),!c){t=i.slice(u);break}if(f===10&&u===d&&r)s.push(-3),r=void 0;else switch(r&&=(s.push(-5),void 0),u<d&&(s.push(i.slice(u,d)),e+=d-u),f){case 0:s.push(65533),e++;break;case 9:for(l=Math.ceil(e/4)*4,s.push(-2);e++<l;)s.push(-1);break;case 10:s.push(-4),e=1;break;default:r=!0,e=1}u=d+1}return o&&(r&&s.push(-5),t&&s.push(t),s.push(null)),s}}var Ss=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function Cs(e){return e.replace(Ss,ws)}function ws(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){let e=n.charCodeAt(1),t=e===120||e===88;return Xi(n.slice(t?2:1),t?16:10)}return Ui(n)||e}var Ts={}.hasOwnProperty;function Es(e,t,n){return t&&typeof t==`object`&&(n=t,t=void 0),Ds(n)(ys(vs(n).document().write(xs()(e,t,!0))))}function Ds(e){let t={transforms:[],canContainEols:[`emphasis`,`fragment`,`heading`,`paragraph`,`strong`],enter:{autolink:a(we),autolinkProtocol:T,autolinkEmail:T,atxHeading:a(be),blockQuote:a(he),characterEscape:T,characterReference:T,codeFenced:a(ge),codeFencedFenceInfo:o,codeFencedFenceMeta:o,codeIndented:a(ge,o),codeText:a(_e,o),codeTextData:T,data:T,codeFlowValue:T,definition:a(ve),definitionDestinationString:o,definitionLabelString:o,definitionTitleString:o,emphasis:a(ye),hardBreakEscape:a(xe),hardBreakTrailing:a(xe),htmlFlow:a(Se,o),htmlFlowData:T,htmlText:a(Se,o),htmlTextData:T,image:a(Ce),label:o,link:a(we),listItem:a(Ee),listItemValue:f,listOrdered:a(Te,d),listUnordered:a(Te),paragraph:a(De),reference:le,referenceString:o,resourceDestinationString:o,resourceTitleString:o,setextHeading:a(be),strong:a(Oe),thematicBreak:a(Ae)},exit:{atxHeading:c(),atxHeadingSequence:x,autolink:c(),autolinkEmail:me,autolinkProtocol:pe,blockQuote:c(),characterEscapeValue:E,characterReferenceMarkerHexadecimal:de,characterReferenceMarkerNumeric:de,characterReferenceValue:fe,characterReference:A,codeFenced:c(g),codeFencedFence:h,codeFencedFenceInfo:p,codeFencedFenceMeta:m,codeFlowValue:E,codeIndented:c(_),codeText:c(re),codeTextData:E,data:E,definition:c(),definitionDestinationString:b,definitionLabelString:v,definitionTitleString:y,emphasis:c(),hardBreakEscape:c(D),hardBreakTrailing:c(D),htmlFlow:c(te),htmlFlowData:E,htmlText:c(ne),htmlTextData:E,image:c(ae),label:se,labelText:oe,lineEnding:ee,link:c(ie),listItem:c(),listOrdered:c(),listUnordered:c(),paragraph:c(),referenceString:ue,resourceDestinationString:O,resourceTitleString:k,resource:ce,setextHeading:c(w),setextHeadingLineSequence:C,setextHeadingText:S,strong:c(),thematicBreak:c()}};ks(t,(e||{}).mdastExtensions||[]);let n={};return r;function r(e){let r={type:`root`,children:[]},a={stack:[r],tokenStack:[],config:t,enter:s,exit:l,buffer:o,resume:u,data:n},c=[],d=-1;for(;++d<e.length;)(e[d][1].type===`listOrdered`||e[d][1].type===`listUnordered`)&&(e[d][0]===`enter`?c.push(d):d=i(e,c.pop(),d));for(d=-1;++d<e.length;){let n=t[e[d][0]];Ts.call(n,e[d][1].type)&&n[e[d][1].type].call(Object.assign({sliceSerialize:e[d][2].sliceSerialize},a),e[d][1])}if(a.tokenStack.length>0){let e=a.tokenStack[a.tokenStack.length-1];(e[1]||js).call(a,void 0,e[0])}for(r.position={start:Os(e.length>0?e[0][1].start:{line:1,column:1,offset:0}),end:Os(e.length>0?e[e.length-2][1].end:{line:1,column:1,offset:0})},d=-1;++d<t.transforms.length;)r=t.transforms[d](r)||r;return r}function i(e,t,n){let r=t-1,i=-1,a=!1,o,s,c,l;for(;++r<=n;){let t=e[r];switch(t[1].type){case`listUnordered`:case`listOrdered`:case`blockQuote`:t[0]===`enter`?i++:i--,l=void 0;break;case`lineEndingBlank`:t[0]===`enter`&&(o&&!l&&!i&&!c&&(c=r),l=void 0);break;case`linePrefix`:case`listItemValue`:case`listItemMarker`:case`listItemPrefix`:case`listItemPrefixWhitespace`:break;default:l=void 0}if(!i&&t[0]===`enter`&&t[1].type===`listItemPrefix`||i===-1&&t[0]===`exit`&&(t[1].type===`listUnordered`||t[1].type===`listOrdered`)){if(o){let i=r;for(s=void 0;i--;){let t=e[i];if(t[1].type===`lineEnding`||t[1].type===`lineEndingBlank`){if(t[0]===`exit`)continue;s&&(e[s][1].type=`lineEndingBlank`,a=!0),t[1].type=`lineEnding`,s=i}else if(!(t[1].type===`linePrefix`||t[1].type===`blockQuotePrefix`||t[1].type===`blockQuotePrefixWhitespace`||t[1].type===`blockQuoteMarker`||t[1].type===`listItemIndent`))break}c&&(!s||c<s)&&(o._spread=!0),o.end=Object.assign({},s?e[s][1].start:t[1].end),e.splice(s||r,0,[`exit`,o,t[2]]),r++,n++}if(t[1].type===`listItemPrefix`){let i={type:`listItem`,_spread:!1,start:Object.assign({},t[1].start),end:void 0};o=i,e.splice(r,0,[`enter`,i,t[2]]),r++,n++,c=void 0,l=!0}}}return e[t][1]._spread=a,n}function a(e,t){return n;function n(n){s.call(this,e(n),n),t&&t.call(this,n)}}function o(){this.stack.push({type:`fragment`,children:[]})}function s(e,t,n){this.stack[this.stack.length-1].children.push(e),this.stack.push(e),this.tokenStack.push([t,n||void 0]),e.position={start:Os(t.start),end:void 0}}function c(e){return t;function t(t){e&&e.call(this,t),l.call(this,t)}}function l(e,t){let n=this.stack.pop(),r=this.tokenStack.pop();if(r)r[0].type!==e.type&&(t?t.call(this,e,r[0]):(r[1]||js).call(this,e,r[0]));else throw Error("Cannot close `"+e.type+"` ("+ri({start:e.start,end:e.end})+`): it’s not open`);n.position.end=Os(e.end)}function u(){return Ri(this.stack.pop())}function d(){this.data.expectingFirstListItemValue=!0}function f(e){if(this.data.expectingFirstListItemValue){let t=this.stack[this.stack.length-2];t.start=Number.parseInt(this.sliceSerialize(e),10),this.data.expectingFirstListItemValue=void 0}}function p(){let e=this.resume(),t=this.stack[this.stack.length-1];t.lang=e}function m(){let e=this.resume(),t=this.stack[this.stack.length-1];t.meta=e}function h(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function g(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,``),this.data.flowCodeInside=void 0}function _(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e.replace(/(\r?\n|\r)$/g,``)}function v(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=Zi(this.sliceSerialize(e)).toLowerCase()}function y(){let e=this.resume(),t=this.stack[this.stack.length-1];t.title=e}function b(){let e=this.resume(),t=this.stack[this.stack.length-1];t.url=e}function x(e){let t=this.stack[this.stack.length-1];t.depth||=this.sliceSerialize(e).length}function S(){this.data.setextHeadingSlurpLineEnding=!0}function C(e){let t=this.stack[this.stack.length-1];t.depth=this.sliceSerialize(e).codePointAt(0)===61?1:2}function w(){this.data.setextHeadingSlurpLineEnding=void 0}function T(e){let t=this.stack[this.stack.length-1].children,n=t[t.length-1];(!n||n.type!==`text`)&&(n=ke(),n.position={start:Os(e.start),end:void 0},t.push(n)),this.stack.push(n)}function E(e){let t=this.stack.pop();t.value+=this.sliceSerialize(e),t.position.end=Os(e.end)}function ee(e){let n=this.stack[this.stack.length-1];if(this.data.atHardBreak){let t=n.children[n.children.length-1];t.position.end=Os(e.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(n.type)&&(T.call(this,e),E.call(this,e))}function D(){this.data.atHardBreak=!0}function te(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function ne(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function re(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function ie(){let e=this.stack[this.stack.length-1];if(this.data.inReference){let t=this.data.referenceType||`shortcut`;e.type+=`Reference`,e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;this.data.referenceType=void 0}function ae(){let e=this.stack[this.stack.length-1];if(this.data.inReference){let t=this.data.referenceType||`shortcut`;e.type+=`Reference`,e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;this.data.referenceType=void 0}function oe(e){let t=this.sliceSerialize(e),n=this.stack[this.stack.length-2];n.label=Cs(t),n.identifier=Zi(t).toLowerCase()}function se(){let e=this.stack[this.stack.length-1],t=this.resume(),n=this.stack[this.stack.length-1];this.data.inReference=!0,n.type===`link`?n.children=e.children:n.alt=t}function O(){let e=this.resume(),t=this.stack[this.stack.length-1];t.url=e}function k(){let e=this.resume(),t=this.stack[this.stack.length-1];t.title=e}function ce(){this.data.inReference=void 0}function le(){this.data.referenceType=`collapsed`}function ue(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=Zi(this.sliceSerialize(e)).toLowerCase(),this.data.referenceType=`full`}function de(e){this.data.characterReferenceType=e.type}function fe(e){let t=this.sliceSerialize(e),n=this.data.characterReferenceType,r;n?(r=Xi(t,n===`characterReferenceMarkerNumeric`?10:16),this.data.characterReferenceType=void 0):r=Ui(t);let i=this.stack[this.stack.length-1];i.value+=r}function A(e){let t=this.stack.pop();t.position.end=Os(e.end)}function pe(e){E.call(this,e);let t=this.stack[this.stack.length-1];t.url=this.sliceSerialize(e)}function me(e){E.call(this,e);let t=this.stack[this.stack.length-1];t.url=`mailto:`+this.sliceSerialize(e)}function he(){return{type:`blockquote`,children:[]}}function ge(){return{type:`code`,lang:null,meta:null,value:``}}function _e(){return{type:`inlineCode`,value:``}}function ve(){return{type:`definition`,identifier:``,label:null,title:null,url:``}}function ye(){return{type:`emphasis`,children:[]}}function be(){return{type:`heading`,depth:0,children:[]}}function xe(){return{type:`break`}}function Se(){return{type:`html`,value:``}}function Ce(){return{type:`image`,title:null,url:``,alt:null}}function we(){return{type:`link`,title:null,url:``,children:[]}}function Te(e){return{type:`list`,ordered:e.type===`listOrdered`,start:null,spread:e._spread,children:[]}}function Ee(e){return{type:`listItem`,spread:e._spread,checked:null,children:[]}}function De(){return{type:`paragraph`,children:[]}}function Oe(){return{type:`strong`,children:[]}}function ke(){return{type:`text`,value:``}}function Ae(){return{type:`thematicBreak`}}}function Os(e){return{line:e.line,column:e.column,offset:e.offset}}function ks(e,t){let n=-1;for(;++n<t.length;){let r=t[n];Array.isArray(r)?ks(e,r):As(e,r)}}function As(e,t){let n;for(n in t)if(Ts.call(t,n))switch(n){case`canContainEols`:{let r=t[n];r&&e[n].push(...r);break}case`transforms`:{let r=t[n];r&&e[n].push(...r);break}case`enter`:case`exit`:{let r=t[n];r&&Object.assign(e[n],r);break}}}function js(e,t){throw Error(e?"Cannot close `"+e.type+"` ("+ri({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+ri({start:t.start,end:t.end})+`) is open`:"Cannot close document, a token (`"+t.type+"`, "+ri({start:t.start,end:t.end})+`) is still open`)}function Ms(e){let t=this;t.parser=n;function n(n){return Es(n,{...t.data(`settings`),...e,extensions:t.data(`micromarkExtensions`)||[],mdastExtensions:t.data(`fromMarkdownExtensions`)||[]})}}function Ns(e,t){let n={type:`element`,tagName:`blockquote`,properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function Ps(e,t){let n={type:`element`,tagName:`br`,properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:`text`,value:`
`}]}function Fs(e,t){let n=t.value?t.value+`
`:``,r={},i=t.lang?t.lang.split(/\s+/):[];i.length>0&&(r.className=[`language-`+i[0]]);let a={type:`element`,tagName:`code`,properties:r,children:[{type:`text`,value:n}]};return t.meta&&(a.data={meta:t.meta}),e.patch(t,a),a=e.applyData(t,a),a={type:`element`,tagName:`pre`,properties:{},children:[a]},e.patch(t,a),a}function Is(e,t){let n={type:`element`,tagName:`del`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Ls(e,t){let n={type:`element`,tagName:`em`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Rs(e,t){let n=typeof e.options.clobberPrefix==`string`?e.options.clobberPrefix:`user-content-`,r=String(t.identifier).toUpperCase(),i=sa(r.toLowerCase()),a=e.footnoteOrder.indexOf(r),o,s=e.footnoteCounts.get(r);s===void 0?(s=0,e.footnoteOrder.push(r),o=e.footnoteOrder.length):o=a+1,s+=1,e.footnoteCounts.set(r,s);let c={type:`element`,tagName:`a`,properties:{href:`#`+n+`fn-`+i,id:n+`fnref-`+i+(s>1?`-`+s:``),dataFootnoteRef:!0,ariaDescribedBy:[`footnote-label`]},children:[{type:`text`,value:String(o)}]};e.patch(t,c);let l={type:`element`,tagName:`sup`,properties:{},children:[c]};return e.patch(t,l),e.applyData(t,l)}function zs(e,t){let n={type:`element`,tagName:`h`+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Bs(e,t){if(e.options.allowDangerousHtml){let n={type:`raw`,value:t.value};return e.patch(t,n),e.applyData(t,n)}}function Vs(e,t){let n=t.referenceType,r=`]`;if(n===`collapsed`?r+=`[]`:n===`full`&&(r+=`[`+(t.label||t.identifier)+`]`),t.type===`imageReference`)return[{type:`text`,value:`![`+t.alt+r}];let i=e.all(t),a=i[0];a&&a.type===`text`?a.value=`[`+a.value:i.unshift({type:`text`,value:`[`});let o=i[i.length-1];return o&&o.type===`text`?o.value+=r:i.push({type:`text`,value:r}),i}function Hs(e,t){let n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return Vs(e,t);let i={src:sa(r.url||``),alt:t.alt};r.title!==null&&r.title!==void 0&&(i.title=r.title);let a={type:`element`,tagName:`img`,properties:i,children:[]};return e.patch(t,a),e.applyData(t,a)}function Us(e,t){let n={src:sa(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:`element`,tagName:`img`,properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function Ws(e,t){let n={type:`text`,value:t.value.replace(/\r?\n|\r/g,` `)};e.patch(t,n);let r={type:`element`,tagName:`code`,properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function Gs(e,t){let n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return Vs(e,t);let i={href:sa(r.url||``)};r.title!==null&&r.title!==void 0&&(i.title=r.title);let a={type:`element`,tagName:`a`,properties:i,children:e.all(t)};return e.patch(t,a),e.applyData(t,a)}function Ks(e,t){let n={href:sa(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:`element`,tagName:`a`,properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function qs(e,t,n){let r=e.all(t),i=n?Js(n):Ys(t),a={},o=[];if(typeof t.checked==`boolean`){let e=r[0],n;e&&e.type===`element`&&e.tagName===`p`?n=e:(n={type:`element`,tagName:`p`,properties:{},children:[]},r.unshift(n)),n.children.length>0&&n.children.unshift({type:`text`,value:` `}),n.children.unshift({type:`element`,tagName:`input`,properties:{type:`checkbox`,checked:t.checked,disabled:!0},children:[]}),a.className=[`task-list-item`]}let s=-1;for(;++s<r.length;){let e=r[s];(i||s!==0||e.type!==`element`||e.tagName!==`p`)&&o.push({type:`text`,value:`
`}),e.type===`element`&&e.tagName===`p`&&!i?o.push(...e.children):o.push(e)}let c=r[r.length-1];c&&(i||c.type!==`element`||c.tagName!==`p`)&&o.push({type:`text`,value:`
`});let l={type:`element`,tagName:`li`,properties:a,children:o};return e.patch(t,l),e.applyData(t,l)}function Js(e){let t=!1;if(e.type===`list`){t=e.spread||!1;let n=e.children,r=-1;for(;!t&&++r<n.length;)t=Ys(n[r])}return t}function Ys(e){return e.spread??e.children.length>1}function Xs(e,t){let n={},r=e.all(t),i=-1;for(typeof t.start==`number`&&t.start!==1&&(n.start=t.start);++i<r.length;){let e=r[i];if(e.type===`element`&&e.tagName===`li`&&e.properties&&Array.isArray(e.properties.className)&&e.properties.className.includes(`task-list-item`)){n.className=[`contains-task-list`];break}}let a={type:`element`,tagName:t.ordered?`ol`:`ul`,properties:n,children:e.wrap(r,!0)};return e.patch(t,a),e.applyData(t,a)}function Zs(e,t){let n={type:`element`,tagName:`p`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Qs(e,t){let n={type:`root`,children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function $s(e,t){let n={type:`element`,tagName:`strong`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function ec(e,t){let n=e.all(t),r=n.shift(),i=[];if(r){let n={type:`element`,tagName:`thead`,properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],n),i.push(n)}if(n.length>0){let r={type:`element`,tagName:`tbody`,properties:{},children:e.wrap(n,!0)},a=ei(t.children[1]),o=$r(t.children[t.children.length-1]);a&&o&&(r.position={start:a,end:o}),i.push(r)}let a={type:`element`,tagName:`table`,properties:{},children:e.wrap(i,!0)};return e.patch(t,a),e.applyData(t,a)}function tc(e,t,n){let r=n?n.children:void 0,i=(r?r.indexOf(t):1)===0?`th`:`td`,a=n&&n.type===`table`?n.align:void 0,o=a?a.length:t.children.length,s=-1,c=[];for(;++s<o;){let n=t.children[s],r={},o=a?a[s]:void 0;o&&(r.align=o);let l={type:`element`,tagName:i,properties:r,children:[]};n&&(l.children=e.all(n),e.patch(n,l),l=e.applyData(n,l)),c.push(l)}let l={type:`element`,tagName:`tr`,properties:{},children:e.wrap(c,!0)};return e.patch(t,l),e.applyData(t,l)}function nc(e,t){let n={type:`element`,tagName:`td`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}var rc=9,ic=32;function ac(e){let t=String(e),n=/\r?\n|\r/g,r=n.exec(t),i=0,a=[];for(;r;)a.push(oc(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return a.push(oc(t.slice(i),i>0,!1)),a.join(``)}function oc(e,t,n){let r=0,i=e.length;if(t){let t=e.codePointAt(r);for(;t===rc||t===ic;)r++,t=e.codePointAt(r)}if(n){let t=e.codePointAt(i-1);for(;t===rc||t===ic;)i--,t=e.codePointAt(i-1)}return i>r?e.slice(r,i):``}function sc(e,t){let n={type:`text`,value:ac(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function cc(e,t){let n={type:`element`,tagName:`hr`,properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}var lc={blockquote:Ns,break:Ps,code:Fs,delete:Is,emphasis:Ls,footnoteReference:Rs,heading:zs,html:Bs,imageReference:Hs,image:Us,inlineCode:Ws,linkReference:Gs,link:Ks,listItem:qs,list:Xs,paragraph:Zs,root:Qs,strong:$s,table:ec,tableCell:nc,tableRow:tc,text:sc,thematicBreak:cc,toml:uc,yaml:uc,definition:uc,footnoteDefinition:uc};function uc(){}var dc=typeof self==`object`?self:globalThis,fc=(e,t)=>{switch(e){case`Function`:case`SharedWorker`:case`Worker`:case`eval`:case`setInterval`:case`setTimeout`:throw TypeError(`unable to deserialize `+e)}return new dc[e](t)},pc=(e,t)=>{let n=(t,n)=>(e.set(n,t),t),r=i=>{if(e.has(i))return e.get(i);let[a,o]=t[i];switch(a){case 0:case-1:return n(o,i);case 1:{let e=n([],i);for(let t of o)e.push(r(t));return e}case 2:{let e=n({},i);for(let[t,n]of o)e[r(t)]=r(n);return e}case 3:return n(new Date(o),i);case 4:{let{source:e,flags:t}=o;return n(new RegExp(e,t),i)}case 5:{let e=n(new Map,i);for(let[t,n]of o)e.set(r(t),r(n));return e}case 6:{let e=n(new Set,i);for(let t of o)e.add(r(t));return e}case 7:{let{name:e,message:t}=o;return n(typeof dc[e]==`function`?fc(e,t):Error(t),i)}case 8:return n(BigInt(o),i);case`BigInt`:return n(Object(BigInt(o)),i);case`ArrayBuffer`:return n(new Uint8Array(o).buffer,o);case`DataView`:{let{buffer:e}=new Uint8Array(o);return n(new DataView(e),o)}}return n(fc(a,o),i)};return r},mc=e=>pc(new Map,e)(0),hc=``,{toString:gc}={},{keys:_c}=Object,vc=e=>{let t=typeof e;if(t!==`object`||!e)return[0,t];let n=gc.call(e).slice(8,-1);switch(n){case`Array`:return[1,hc];case`Object`:return[2,hc];case`Date`:return[3,hc];case`RegExp`:return[4,hc];case`Map`:return[5,hc];case`Set`:return[6,hc];case`DataView`:return[1,n]}return n.includes(`Array`)?[1,n]:e instanceof Error?[7,e.name||`Error`]:[2,n]},yc=([e,t])=>e===0&&(t===`function`||t===`symbol`),bc=(e,t,n,r)=>{let i=(e,t)=>{let i=r.push(e)-1;return n.set(t,i),i},a=r=>{if(n.has(r))return n.get(r);let[o,s]=vc(r);switch(o){case 0:{let t=r;switch(s){case`bigint`:o=8,t=r.toString();break;case`function`:case`symbol`:if(e)throw TypeError(`unable to serialize `+s);t=null;break;case`undefined`:return i([-1],r)}return i([o,t],r)}case 1:{if(s){let e=r;return s===`DataView`?e=new Uint8Array(r.buffer):s===`ArrayBuffer`&&(e=new Uint8Array(r)),i([s,[...e]],r)}let e=[],t=i([o,e],r);for(let t of r)e.push(a(t));return t}case 2:{if(s)switch(s){case`BigInt`:return i([s,r.toString()],r);case`Boolean`:case`Number`:case`String`:return i([s,r.valueOf()],r)}if(t&&`toJSON`in r)return a(r.toJSON());let n=[],c=i([o,n],r);for(let t of _c(r))(e||!yc(vc(r[t])))&&n.push([a(t),a(r[t])]);return c}case 3:return i([o,isNaN(r.getTime())?hc:r.toISOString()],r);case 4:{let{source:e,flags:t}=r;return i([o,{source:e,flags:t}],r)}case 5:{let t=[],n=i([o,t],r);for(let[n,i]of r)(e||!(yc(vc(n))||yc(vc(i))))&&t.push([a(n),a(i)]);return n}case 6:{let t=[],n=i([o,t],r);for(let n of r)(e||!yc(vc(n)))&&t.push(a(n));return n}}let{message:c}=r;return i([o,{name:s,message:c}],r)};return a},xc=(e,{json:t,lossy:n}={})=>{let r=[];return bc(!(t||n),!!t,new Map,r)(e),r},Sc=typeof structuredClone==`function`?(e,t)=>t&&(`json`in t||`lossy`in t)?mc(xc(e,t)):structuredClone(e):(e,t)=>mc(xc(e,t));function Cc(e,t){let n=[{type:`text`,value:`↩`}];return t>1&&n.push({type:`element`,tagName:`sup`,properties:{},children:[{type:`text`,value:String(t)}]}),n}function wc(e,t){return`Back to reference `+(e+1)+(t>1?`-`+t:``)}function Tc(e){let t=typeof e.options.clobberPrefix==`string`?e.options.clobberPrefix:`user-content-`,n=e.options.footnoteBackContent||Cc,r=e.options.footnoteBackLabel||wc,i=e.options.footnoteLabel||`Footnotes`,a=e.options.footnoteLabelTagName||`h2`,o=e.options.footnoteLabelProperties||{className:[`sr-only`]},s=[],c=-1;for(;++c<e.footnoteOrder.length;){let i=e.footnoteById.get(e.footnoteOrder[c]);if(!i)continue;let a=e.all(i),o=String(i.identifier).toUpperCase(),l=sa(o.toLowerCase()),u=0,d=[],f=e.footnoteCounts.get(o);for(;f!==void 0&&++u<=f;){d.length>0&&d.push({type:`text`,value:` `});let e=typeof n==`string`?n:n(c,u);typeof e==`string`&&(e={type:`text`,value:e}),d.push({type:`element`,tagName:`a`,properties:{href:`#`+t+`fnref-`+l+(u>1?`-`+u:``),dataFootnoteBackref:``,ariaLabel:typeof r==`string`?r:r(c,u),className:[`data-footnote-backref`]},children:Array.isArray(e)?e:[e]})}let p=a[a.length-1];if(p&&p.type===`element`&&p.tagName===`p`){let e=p.children[p.children.length-1];e&&e.type===`text`?e.value+=` `:p.children.push({type:`text`,value:` `}),p.children.push(...d)}else a.push(...d);let m={type:`element`,tagName:`li`,properties:{id:t+`fn-`+l},children:e.wrap(a,!0)};e.patch(i,m),s.push(m)}if(s.length!==0)return{type:`element`,tagName:`section`,properties:{dataFootnotes:!0,className:[`footnotes`]},children:[{type:`element`,tagName:a,properties:{...Sc(o),id:`footnote-label`},children:[{type:`text`,value:i}]},{type:`text`,value:`
`},{type:`element`,tagName:`ol`,properties:{},children:e.wrap(s,!0)},{type:`text`,value:`
`}]}}var Ec=(function(e){if(e==null)return jc;if(typeof e==`function`)return Ac(e);if(typeof e==`object`)return Array.isArray(e)?Dc(e):Oc(e);if(typeof e==`string`)return kc(e);throw Error(`Expected function, string, or object as test`)});function Dc(e){let t=[],n=-1;for(;++n<e.length;)t[n]=Ec(e[n]);return Ac(r);function r(...e){let n=-1;for(;++n<t.length;)if(t[n].apply(this,e))return!0;return!1}}function Oc(e){let t=e;return Ac(n);function n(n){let r=n,i;for(i in e)if(r[i]!==t[i])return!1;return!0}}function kc(e){return Ac(t);function t(t){return t&&t.type===e}}function Ac(e){return t;function t(t,n,r){return!!(Mc(t)&&e.call(this,t,typeof n==`number`?n:void 0,r||void 0))}}function jc(){return!0}function Mc(e){return typeof e==`object`&&!!e&&`type`in e}function Nc(e){return e}var Pc=[];function Fc(e,t,n,r){let i;typeof t==`function`&&typeof n!=`function`?(r=n,n=t):i=t;let a=Ec(i),o=r?-1:1;s(e,void 0,[])();function s(e,i,c){let l=e&&typeof e==`object`?e:{};if(typeof l.type==`string`){let t=typeof l.tagName==`string`?l.tagName:typeof l.name==`string`?l.name:void 0;Object.defineProperty(u,`name`,{value:`node (`+Nc(e.type+(t?`<`+t+`>`:``))+`)`})}return u;function u(){let l=Pc,u,d,f;if((!t||a(e,i,c[c.length-1]||void 0))&&(l=Ic(n(e,c)),l[0]===!1))return l;if(`children`in e&&e.children){let t=e;if(t.children&&l[0]!==`skip`)for(d=(r?t.children.length:-1)+o,f=c.concat(t);d>-1&&d<t.children.length;){let e=t.children[d];if(u=s(e,d,f)(),u[0]===!1)return u;d=typeof u[1]==`number`?u[1]:d+o}}return l}}}function Ic(e){return Array.isArray(e)?e:typeof e==`number`?[!0,e]:e==null?Pc:[e]}function Lc(e,t,n,r){let i,a,o;typeof t==`function`&&typeof n!=`function`?(a=void 0,o=t,i=n):(a=t,o=n,i=r),Fc(e,a,s,i);function s(e,t){let n=t[t.length-1],r=n?n.children.indexOf(e):void 0;return o(e,r,n)}}var Rc={}.hasOwnProperty,zc={};function Bc(e,t){let n=t||zc,r=new Map,i=new Map,a={all:s,applyData:Hc,definitionById:r,footnoteById:i,footnoteCounts:new Map,footnoteOrder:[],handlers:{...lc,...n.handlers},one:o,options:n,patch:Vc,wrap:Wc};return Lc(e,function(e){if(e.type===`definition`||e.type===`footnoteDefinition`){let t=e.type===`definition`?r:i,n=String(e.identifier).toUpperCase();t.has(n)||t.set(n,e)}}),a;function o(e,t){let n=e.type,r=a.handlers[n];if(Rc.call(a.handlers,n)&&r)return r(a,e,t);if(a.options.passThrough&&a.options.passThrough.includes(n)){if(`children`in e){let{children:t,...n}=e,r=Sc(n);return r.children=a.all(e),r}return Sc(e)}return(a.options.unknownHandler||Uc)(a,e,t)}function s(e){let t=[];if(`children`in e){let n=e.children,r=-1;for(;++r<n.length;){let i=a.one(n[r],e);if(i){if(r&&n[r-1].type===`break`&&(!Array.isArray(i)&&i.type===`text`&&(i.value=Gc(i.value)),!Array.isArray(i)&&i.type===`element`)){let e=i.children[0];e&&e.type===`text`&&(e.value=Gc(e.value))}Array.isArray(i)?t.push(...i):t.push(i)}}}return t}}function Vc(e,t){e.position&&(t.position=ni(e))}function Hc(e,t){let n=t;if(e&&e.data){let t=e.data.hName,r=e.data.hChildren,i=e.data.hProperties;typeof t==`string`&&(n.type===`element`?n.tagName=t:n={type:`element`,tagName:t,properties:{},children:`children`in n?n.children:[n]}),n.type===`element`&&i&&Object.assign(n.properties,Sc(i)),`children`in n&&n.children&&r!=null&&(n.children=r)}return n}function Uc(e,t){let n=t.data||{},r=`value`in t&&!(Rc.call(n,`hProperties`)||Rc.call(n,`hChildren`))?{type:`text`,value:t.value}:{type:`element`,tagName:`div`,properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function Wc(e,t){let n=[],r=-1;for(t&&n.push({type:`text`,value:`
`});++r<e.length;)r&&n.push({type:`text`,value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:`text`,value:`
`}),n}function Gc(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function Kc(e,t){let n=Bc(e,t),r=n.one(e,void 0),i=Tc(n),a=Array.isArray(r)?{type:`root`,children:r}:r||{type:`root`,children:[]};return i&&(`children`in a,a.children.push({type:`text`,value:`
`},i)),a}function qc(e,t){return e&&`run`in e?async function(n,r){let i=Kc(n,{file:r,...t});await e.run(i,r)}:function(n,r){return Kc(n,{file:r,...e||t})}}function Jc(e){if(e)throw e}var Yc=o(((e,t)=>{var n=Object.prototype.hasOwnProperty,r=Object.prototype.toString,i=Object.defineProperty,a=Object.getOwnPropertyDescriptor,o=function(e){return typeof Array.isArray==`function`?Array.isArray(e):r.call(e)===`[object Array]`},s=function(e){if(!e||r.call(e)!==`[object Object]`)return!1;var t=n.call(e,`constructor`),i=e.constructor&&e.constructor.prototype&&n.call(e.constructor.prototype,`isPrototypeOf`);if(e.constructor&&!t&&!i)return!1;for(var a in e);return a===void 0||n.call(e,a)},c=function(e,t){i&&t.name===`__proto__`?i(e,t.name,{enumerable:!0,configurable:!0,value:t.newValue,writable:!0}):e[t.name]=t.newValue},l=function(e,t){if(t===`__proto__`){if(!n.call(e,t))return;if(a)return a(e,t).value}return e[t]};t.exports=function e(){var t,n,r,i,a,u,d=arguments[0],f=1,p=arguments.length,m=!1;for(typeof d==`boolean`&&(m=d,d=arguments[1]||{},f=2),(d==null||typeof d!=`object`&&typeof d!=`function`)&&(d={});f<p;++f)if(t=arguments[f],t!=null)for(n in t)r=l(d,n),i=l(t,n),d!==i&&(m&&i&&(s(i)||(a=o(i)))?(a?(a=!1,u=r&&o(r)?r:[]):u=r&&s(r)?r:{},c(d,{name:n,newValue:e(m,u,i)})):i!==void 0&&c(d,{name:n,newValue:i}));return d}}));function Xc(e){if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Zc(){let e=[],t={run:n,use:r};return t;function n(...t){let n=-1,r=t.pop();if(typeof r!=`function`)throw TypeError(`Expected function as last argument, not `+r);i(null,...t);function i(a,...o){let s=e[++n],c=-1;if(a){r(a);return}for(;++c<t.length;)(o[c]===null||o[c]===void 0)&&(o[c]=t[c]);t=o,s?G(s,i)(...o):r(null,...o)}}function r(n){if(typeof n!=`function`)throw TypeError("Expected `middelware` to be a function, not "+n);return e.push(n),t}}function G(e,t){let n;return r;function r(...t){let r=e.length>t.length,o;r&&t.push(i);try{o=e.apply(this,t)}catch(e){let t=e;if(r&&n)throw t;return i(t)}r||(o&&o.then&&typeof o.then==`function`?o.then(a,i):o instanceof Error?i(o):a(o))}function i(e,...r){n||(n=!0,t(e,...r))}function a(e){i(null,e)}}var Qc={basename:$c,dirname:el,extname:tl,join:nl,sep:`/`};function $c(e,t){if(t!==void 0&&typeof t!=`string`)throw TypeError(`"ext" argument must be a string`);al(e);let n=0,r=-1,i=e.length,a;if(t===void 0||t.length===0||t.length>e.length){for(;i--;)if(e.codePointAt(i)===47){if(a){n=i+1;break}}else r<0&&(a=!0,r=i+1);return r<0?``:e.slice(n,r)}if(t===e)return``;let o=-1,s=t.length-1;for(;i--;)if(e.codePointAt(i)===47){if(a){n=i+1;break}}else o<0&&(a=!0,o=i+1),s>-1&&(e.codePointAt(i)===t.codePointAt(s--)?s<0&&(r=i):(s=-1,r=o));return n===r?r=o:r<0&&(r=e.length),e.slice(n,r)}function el(e){if(al(e),e.length===0)return`.`;let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||=!0;return t<0?e.codePointAt(0)===47?`/`:`.`:t===1&&e.codePointAt(0)===47?`//`:e.slice(0,t)}function tl(e){al(e);let t=e.length,n=-1,r=0,i=-1,a=0,o;for(;t--;){let s=e.codePointAt(t);if(s===47){if(o){r=t+1;break}continue}n<0&&(o=!0,n=t+1),s===46?i<0?i=t:a!==1&&(a=1):i>-1&&(a=-1)}return i<0||n<0||a===0||a===1&&i===n-1&&i===r+1?``:e.slice(i,n)}function nl(...e){let t=-1,n;for(;++t<e.length;)al(e[t]),e[t]&&(n=n===void 0?e[t]:n+`/`+e[t]);return n===void 0?`.`:rl(n)}function rl(e){al(e);let t=e.codePointAt(0)===47,n=il(e,!t);return n.length===0&&!t&&(n=`.`),n.length>0&&e.codePointAt(e.length-1)===47&&(n+=`/`),t?`/`+n:n}function il(e,t){let n=``,r=0,i=-1,a=0,o=-1,s,c;for(;++o<=e.length;){if(o<e.length)s=e.codePointAt(o);else if(s===47)break;else s=47;if(s===47){if(!(i===o-1||a===1))if(i!==o-1&&a===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(c=n.lastIndexOf(`/`),c!==n.length-1){c<0?(n=``,r=0):(n=n.slice(0,c),r=n.length-1-n.lastIndexOf(`/`)),i=o,a=0;continue}}else if(n.length>0){n=``,r=0,i=o,a=0;continue}}t&&(n=n.length>0?n+`/..`:`..`,r=2)}else n.length>0?n+=`/`+e.slice(i+1,o):n=e.slice(i+1,o),r=o-i-1;i=o,a=0}else s===46&&a>-1?a++:a=-1}return n}function al(e){if(typeof e!=`string`)throw TypeError(`Path must be a string. Received `+JSON.stringify(e))}var ol={cwd:sl};function sl(){return`/`}function cl(e){return!!(typeof e==`object`&&e&&`href`in e&&e.href&&`protocol`in e&&e.protocol&&e.auth===void 0)}function ll(e){if(typeof e==`string`)e=new URL(e);else if(!cl(e)){let t=TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code=`ERR_INVALID_ARG_TYPE`,t}if(e.protocol!==`file:`){let e=TypeError(`The URL must be of scheme file`);throw e.code=`ERR_INVALID_URL_SCHEME`,e}return ul(e)}function ul(e){if(e.hostname!==``){let e=TypeError(`File URL host must be "localhost" or empty on darwin`);throw e.code=`ERR_INVALID_FILE_URL_HOST`,e}let t=e.pathname,n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){let e=t.codePointAt(n+2);if(e===70||e===102){let e=TypeError(`File URL path must not include encoded / characters`);throw e.code=`ERR_INVALID_FILE_URL_PATH`,e}}return decodeURIComponent(t)}var dl=[`history`,`path`,`basename`,`stem`,`extname`,`dirname`],fl=class{constructor(e){let t;t=e?cl(e)?{path:e}:typeof e==`string`||gl(e)?{value:e}:e:{},this.cwd=`cwd`in t?``:ol.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let n=-1;for(;++n<dl.length;){let e=dl[n];e in t&&t[e]!==void 0&&t[e]!==null&&(this[e]=e===`history`?[...t[e]]:t[e])}let r;for(r in t)dl.includes(r)||(this[r]=t[r])}get basename(){return typeof this.path==`string`?Qc.basename(this.path):void 0}set basename(e){ml(e,`basename`),pl(e,`basename`),this.path=Qc.join(this.dirname||``,e)}get dirname(){return typeof this.path==`string`?Qc.dirname(this.path):void 0}set dirname(e){hl(this.basename,`dirname`),this.path=Qc.join(e||``,this.basename)}get extname(){return typeof this.path==`string`?Qc.extname(this.path):void 0}set extname(e){if(pl(e,`extname`),hl(this.dirname,`extname`),e){if(e.codePointAt(0)!==46)throw Error("`extname` must start with `.`");if(e.includes(`.`,1))throw Error("`extname` cannot contain multiple dots")}this.path=Qc.join(this.dirname,this.stem+(e||``))}get path(){return this.history[this.history.length-1]}set path(e){cl(e)&&(e=ll(e)),ml(e,`path`),this.path!==e&&this.history.push(e)}get stem(){return typeof this.path==`string`?Qc.basename(this.path,this.extname):void 0}set stem(e){ml(e,`stem`),pl(e,`stem`),this.path=Qc.join(this.dirname||``,e+(this.extname||``))}fail(e,t,n){let r=this.message(e,t,n);throw r.fatal=!0,r}info(e,t,n){let r=this.message(e,t,n);return r.fatal=void 0,r}message(e,t,n){let r=new si(e,t,n);return this.path&&(r.name=this.path+`:`+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}toString(e){return this.value===void 0?``:typeof this.value==`string`?this.value:new TextDecoder(e||void 0).decode(this.value)}};function pl(e,t){if(e&&e.includes(Qc.sep))throw Error("`"+t+"` cannot be a path: did not expect `"+Qc.sep+"`")}function ml(e,t){if(!e)throw Error("`"+t+"` cannot be empty")}function hl(e,t){if(!e)throw Error("Setting `"+t+"` requires `path` to be set too")}function gl(e){return!!(e&&typeof e==`object`&&`byteLength`in e&&`byteOffset`in e)}var _l=(function(e){let t=this.constructor.prototype,n=t[e],r=function(){return n.apply(r,arguments)};return Object.setPrototypeOf(r,t),r}),vl=l(Yc(),1),yl={}.hasOwnProperty,bl=new class e extends _l{constructor(){super(`copy`),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=Zc()}copy(){let t=new e,n=-1;for(;++n<this.attachers.length;){let e=this.attachers[n];t.use(...e)}return t.data((0,vl.default)(!0,{},this.namespace)),t}data(e,t){return typeof e==`string`?arguments.length===2?(Cl(`data`,this.frozen),this.namespace[e]=t,this):yl.call(this.namespace,e)&&this.namespace[e]||void 0:e?(Cl(`data`,this.frozen),this.namespace=e,this):this.namespace}freeze(){if(this.frozen)return this;let e=this;for(;++this.freezeIndex<this.attachers.length;){let[t,...n]=this.attachers[this.freezeIndex];if(n[0]===!1)continue;n[0]===!0&&(n[0]=void 0);let r=t.call(e,...n);typeof r==`function`&&this.transformers.use(r)}return this.frozen=!0,this.freezeIndex=1/0,this}parse(e){this.freeze();let t=El(e),n=this.parser||this.Parser;return xl(`parse`,n),n(String(t),t)}process(e,t){let n=this;return this.freeze(),xl(`process`,this.parser||this.Parser),Sl(`process`,this.compiler||this.Compiler),t?r(void 0,t):new Promise(r);function r(r,i){let a=El(e),o=n.parse(a);n.run(o,a,function(e,t,r){if(e||!t||!r)return s(e);let i=t,a=n.stringify(i,r);K(a)?r.value=a:r.result=a,s(e,r)});function s(e,n){e||!n?i(e):r?r(n):t(void 0,n)}}}processSync(e){let t=!1,n;return this.freeze(),xl(`processSync`,this.parser||this.Parser),Sl(`processSync`,this.compiler||this.Compiler),this.process(e,r),Tl(`processSync`,`process`,t),n;function r(e,r){t=!0,Jc(e),n=r}}run(e,t,n){wl(e),this.freeze();let r=this.transformers;return!n&&typeof t==`function`&&(n=t,t=void 0),n?i(void 0,n):new Promise(i);function i(i,a){let o=El(t);r.run(e,o,s);function s(t,r,o){let s=r||e;t?a(t):i?i(s):n(void 0,s,o)}}}runSync(e,t){let n=!1,r;return this.run(e,t,i),Tl(`runSync`,`run`,n),r;function i(e,t){Jc(e),r=t,n=!0}}stringify(e,t){this.freeze();let n=El(t),r=this.compiler||this.Compiler;return Sl(`stringify`,r),wl(e),r(e,n)}use(e,...t){let n=this.attachers,r=this.namespace;if(Cl(`use`,this.frozen),e!=null)if(typeof e==`function`)s(e,t);else if(typeof e==`object`)Array.isArray(e)?o(e):a(e);else throw TypeError("Expected usable value, not `"+e+"`");return this;function i(e){if(typeof e==`function`)s(e,[]);else if(typeof e==`object`)if(Array.isArray(e)){let[t,...n]=e;s(t,n)}else a(e);else throw TypeError("Expected usable value, not `"+e+"`")}function a(e){if(!(`plugins`in e)&&!(`settings`in e))throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");o(e.plugins),e.settings&&(r.settings=(0,vl.default)(!0,r.settings,e.settings))}function o(e){let t=-1;if(e!=null)if(Array.isArray(e))for(;++t<e.length;){let n=e[t];i(n)}else throw TypeError("Expected a list of plugins, not `"+e+"`")}function s(e,t){let r=-1,i=-1;for(;++r<n.length;)if(n[r][0]===e){i=r;break}if(i===-1)n.push([e,...t]);else if(t.length>0){let[r,...a]=t,o=n[i][1];Xc(o)&&Xc(r)&&(r=(0,vl.default)(!0,o,r)),n[i]=[e,r,...a]}}}}().freeze();function xl(e,t){if(typeof t!=`function`)throw TypeError("Cannot `"+e+"` without `parser`")}function Sl(e,t){if(typeof t!=`function`)throw TypeError("Cannot `"+e+"` without `compiler`")}function Cl(e,t){if(t)throw Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function wl(e){if(!Xc(e)||typeof e.type!=`string`)throw TypeError("Expected node, got `"+e+"`")}function Tl(e,t,n){if(!n)throw Error("`"+e+"` finished async. Use `"+t+"` instead")}function El(e){return Dl(e)?e:new fl(e)}function Dl(e){return!!(e&&typeof e==`object`&&`message`in e&&`messages`in e)}function K(e){return typeof e==`string`||q(e)}function q(e){return!!(e&&typeof e==`object`&&`byteLength`in e&&`byteOffset`in e)}var J=[],Y={allowDangerousHtml:!0},X=/^(https?|ircs?|mailto|xmpp)$/i,Ol=[{from:`astPlugins`,id:`remove-buggy-html-in-markdown-parser`},{from:`allowDangerousHtml`,id:`remove-buggy-html-in-markdown-parser`},{from:`allowNode`,id:`replace-allownode-allowedtypes-and-disallowedtypes`,to:`allowElement`},{from:`allowedTypes`,id:`replace-allownode-allowedtypes-and-disallowedtypes`,to:`allowedElements`},{from:`className`,id:`remove-classname`},{from:`disallowedTypes`,id:`replace-allownode-allowedtypes-and-disallowedtypes`,to:`disallowedElements`},{from:`escapeHtml`,id:`remove-buggy-html-in-markdown-parser`},{from:`includeElementIndex`,id:`#remove-includeelementindex`},{from:`includeNodeIndex`,id:`change-includenodeindex-to-includeelementindex`},{from:`linkTarget`,id:`remove-linktarget`},{from:`plugins`,id:`change-plugins-to-remarkplugins`,to:`remarkPlugins`},{from:`rawSourcePos`,id:`#remove-rawsourcepos`},{from:`renderers`,id:`change-renderers-to-components`,to:`components`},{from:`source`,id:`change-source-to-children`,to:`children`},{from:`sourcePos`,id:`#remove-sourcepos`},{from:`transformImageUri`,id:`#add-urltransform`,to:`urlTransform`},{from:`transformLinkUri`,id:`#add-urltransform`,to:`urlTransform`}];function kl(e){let t=Al(e),n=jl(e);return Ml(t.runSync(t.parse(n),n),e)}function Al(e){let t=e.rehypePlugins||J,n=e.remarkPlugins||J,r=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...Y}:Y;return bl().use(Ms).use(n).use(qc,r).use(t)}function jl(e){let t=e.children||``,n=new fl;return typeof t==`string`?n.value=t:``+t,n}function Ml(e,t){let n=t.allowedElements,r=t.allowElement,i=t.components,a=t.disallowedElements,o=t.skipHtml,s=t.unwrapDisallowed,c=t.urlTransform||Nl;for(let e of Ol)Object.hasOwn(t,e.from)&&``+e.from+(e.to?"use `"+e.to+"` instead":`remove it`)+e.id;return Lc(e,l),hi(e,{Fragment:N.Fragment,components:i,ignoreInvalidStyle:!0,jsx:N.jsx,jsxs:N.jsxs,passKeys:!0,passNode:!0});function l(e,t,i){if(e.type===`raw`&&i&&typeof t==`number`)return o?i.children.splice(t,1):i.children[t]={type:`text`,value:e.value},t;if(e.type===`element`){let t;for(t in Ii)if(Object.hasOwn(Ii,t)&&Object.hasOwn(e.properties,t)){let n=e.properties[t],r=Ii[t];(r===null||r.includes(e.tagName))&&(e.properties[t]=c(String(n||``),t,e))}}if(e.type===`element`){let o=n?!n.includes(e.tagName):a?a.includes(e.tagName):!1;if(!o&&r&&typeof t==`number`&&(o=!r(e,t,i)),o&&i&&typeof t==`number`)return s&&e.children?i.children.splice(t,1,...e.children):i.children.splice(t,1),t}}}function Nl(e){let t=e.indexOf(`:`),n=e.indexOf(`?`),r=e.indexOf(`#`),i=e.indexOf(`/`);return t===-1||i!==-1&&t>i||n!==-1&&t>n||r!==-1&&t>r||X.test(e.slice(0,t))?e:``}function Pl(e,t){let n=String(e);if(typeof t!=`string`)throw TypeError(`Expected character`);let r=0,i=n.indexOf(t);for(;i!==-1;)r++,i=n.indexOf(t,i+t.length);return r}function Fl(e){if(typeof e!=`string`)throw TypeError(`Expected a string`);return e.replace(/[|\\{}()[\]^$+*?.]/g,`\\$&`).replace(/-/g,`\\x2d`)}function Il(e,t,n){let r=Ec((n||{}).ignore||[]),i=Ll(t),a=-1;for(;++a<i.length;)Fc(e,`text`,o);function o(e,t){let n=-1,i;for(;++n<t.length;){let e=t[n],a=i?i.children:void 0;if(r(e,a?a.indexOf(e):void 0,i))return;i=e}if(i)return s(e,t)}function s(e,t){let n=t[t.length-1],r=i[a][0],o=i[a][1],s=0,c=n.children.indexOf(e),l=!1,u=[];r.lastIndex=0;let d=r.exec(e.value);for(;d;){let n=d.index,i={index:d.index,input:d.input,stack:[...t,e]},a=o(...d,i);if(typeof a==`string`&&(a=a.length>0?{type:`text`,value:a}:void 0),a===!1?r.lastIndex=n+1:(s!==n&&u.push({type:`text`,value:e.value.slice(s,n)}),Array.isArray(a)?u.push(...a):a&&u.push(a),s=n+d[0].length,l=!0),!r.global)break;d=r.exec(e.value)}return l?(s<e.value.length&&u.push({type:`text`,value:e.value.slice(s)}),n.children.splice(c,1,...u)):u=[e],c+u.length}}function Ll(e){let t=[];if(!Array.isArray(e))throw TypeError(`Expected find and replace tuple or list of tuples`);let n=!e[0]||Array.isArray(e[0])?e:[e],r=-1;for(;++r<n.length;){let e=n[r];t.push([Rl(e[0]),zl(e[1])])}return t}function Rl(e){return typeof e==`string`?new RegExp(Fl(e),`g`):e}function zl(e){return typeof e==`function`?e:function(){return e}}var Bl=`phrasing`,Vl=[`autolink`,`link`,`image`,`label`];function Hl(){return{transforms:[Xl],enter:{literalAutolink:Wl,literalAutolinkEmail:Gl,literalAutolinkHttp:Gl,literalAutolinkWww:Gl},exit:{literalAutolink:Yl,literalAutolinkEmail:Jl,literalAutolinkHttp:Kl,literalAutolinkWww:ql}}}function Ul(){return{unsafe:[{character:`@`,before:`[+\\-.\\w]`,after:`[\\-.\\w]`,inConstruct:Bl,notInConstruct:Vl},{character:`.`,before:`[Ww]`,after:`[\\-.\\w]`,inConstruct:Bl,notInConstruct:Vl},{character:`:`,before:`[ps]`,after:`\\/`,inConstruct:Bl,notInConstruct:Vl}]}}function Wl(e){this.enter({type:`link`,title:null,url:``,children:[]},e)}function Gl(e){this.config.enter.autolinkProtocol.call(this,e)}function Kl(e){this.config.exit.autolinkProtocol.call(this,e)}function ql(e){this.config.exit.data.call(this,e);let t=this.stack[this.stack.length-1];t.type,t.url=`http://`+this.sliceSerialize(e)}function Jl(e){this.config.exit.autolinkEmail.call(this,e)}function Yl(e){this.exit(e)}function Xl(e){Il(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,Zl],[/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu,Ql]],{ignore:[`link`,`linkReference`]})}function Zl(e,t,n,r,i){let a=``;if(!tu(i)||(/^w/i.test(t)&&(n=t+n,t=``,a=`http://`),!$l(n)))return!1;let o=eu(n+r);if(!o[0])return!1;let s={type:`link`,title:null,url:a+t+o[0],children:[{type:`text`,value:t+o[0]}]};return o[1]?[s,{type:`text`,value:o[1]}]:s}function Ql(e,t,n,r){return!tu(r,!0)||/[-\d_]$/.test(n)?!1:{type:`link`,title:null,url:`mailto:`+t+`@`+n,children:[{type:`text`,value:t+`@`+n}]}}function $l(e){let t=e.split(`.`);return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function eu(e){let t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(`)`),i=Pl(e,`(`),a=Pl(e,`)`);for(;r!==-1&&i>a;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(`)`),a++;return[e,n]}function tu(e,t){let n=e.input.charCodeAt(e.index-1);return(e.index===0||aa(n)||ia(n))&&(!t||n!==47)}du.peek=uu;function nu(){this.buffer()}function ru(e){this.enter({type:`footnoteReference`,identifier:``,label:``},e)}function iu(){this.buffer()}function au(e){this.enter({type:`footnoteDefinition`,identifier:``,label:``,children:[]},e)}function ou(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=Zi(this.sliceSerialize(e)).toLowerCase(),n.label=t}function su(e){this.exit(e)}function cu(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=Zi(this.sliceSerialize(e)).toLowerCase(),n.label=t}function lu(e){this.exit(e)}function uu(){return`[`}function du(e,t,n,r){let i=n.createTracker(r),a=i.move(`[^`),o=n.enter(`footnoteReference`),s=n.enter(`reference`);return a+=i.move(n.safe(n.associationId(e),{after:`]`,before:a})),s(),o(),a+=i.move(`]`),a}function fu(){return{enter:{gfmFootnoteCallString:nu,gfmFootnoteCall:ru,gfmFootnoteDefinitionLabelString:iu,gfmFootnoteDefinition:au},exit:{gfmFootnoteCallString:ou,gfmFootnoteCall:su,gfmFootnoteDefinitionLabelString:cu,gfmFootnoteDefinition:lu}}}function pu(e){let t=!1;return e&&e.firstLineBlank&&(t=!0),{handlers:{footnoteDefinition:n,footnoteReference:du},unsafe:[{character:`[`,inConstruct:[`label`,`phrasing`,`reference`]}]};function n(e,n,r,i){let a=r.createTracker(i),o=a.move(`[^`),s=r.enter(`footnoteDefinition`),c=r.enter(`label`);return o+=a.move(r.safe(r.associationId(e),{before:o,after:`]`})),c(),o+=a.move(`]:`),e.children&&e.children.length>0&&(a.shift(4),o+=a.move((t?`
`:` `)+r.indentLines(r.containerFlow(e,a.current()),t?hu:mu))),s(),o}}function mu(e,t,n){return t===0?e:hu(e,t,n)}function hu(e,t,n){return(n?``:`    `)+e}var gu=[`autolink`,`destinationLiteral`,`destinationRaw`,`reference`,`titleQuote`,`titleApostrophe`];xu.peek=Su;function _u(){return{canContainEols:[`delete`],enter:{strikethrough:yu},exit:{strikethrough:bu}}}function vu(){return{unsafe:[{character:`~`,inConstruct:`phrasing`,notInConstruct:gu}],handlers:{delete:xu}}}function yu(e){this.enter({type:`delete`,children:[]},e)}function bu(e){this.exit(e)}function xu(e,t,n,r){let i=n.createTracker(r),a=n.enter(`strikethrough`),o=i.move(`~~`);return o+=n.containerPhrasing(e,{...i.current(),before:o,after:`~`}),o+=i.move(`~~`),a(),o}function Su(){return`~`}function Cu(e){return e.length}function wu(e,t){let n=t||{},r=(n.align||[]).concat(),i=n.stringLength||Cu,a=[],o=[],s=[],c=[],l=0,u=-1;for(;++u<e.length;){let t=[],r=[],a=-1;for(e[u].length>l&&(l=e[u].length);++a<e[u].length;){let o=Tu(e[u][a]);if(n.alignDelimiters!==!1){let e=i(o);r[a]=e,(c[a]===void 0||e>c[a])&&(c[a]=e)}t.push(o)}o[u]=t,s[u]=r}let d=-1;if(typeof r==`object`&&`length`in r)for(;++d<l;)a[d]=Eu(r[d]);else{let e=Eu(r);for(;++d<l;)a[d]=e}d=-1;let f=[],p=[];for(;++d<l;){let e=a[d],t=``,r=``;e===99?(t=`:`,r=`:`):e===108?t=`:`:e===114&&(r=`:`);let i=n.alignDelimiters===!1?1:Math.max(1,c[d]-t.length-r.length),o=t+`-`.repeat(i)+r;n.alignDelimiters!==!1&&(i=t.length+i+r.length,i>c[d]&&(c[d]=i),p[d]=i),f[d]=o}o.splice(1,0,f),s.splice(1,0,p),u=-1;let m=[];for(;++u<o.length;){let e=o[u],t=s[u];d=-1;let r=[];for(;++d<l;){let i=e[d]||``,o=``,s=``;if(n.alignDelimiters!==!1){let e=c[d]-(t[d]||0),n=a[d];n===114?o=` `.repeat(e):n===99?e%2?(o=` `.repeat(e/2+.5),s=` `.repeat(e/2-.5)):(o=` `.repeat(e/2),s=o):s=` `.repeat(e)}n.delimiterStart!==!1&&!d&&r.push(`|`),n.padding!==!1&&!(n.alignDelimiters===!1&&i===``)&&(n.delimiterStart!==!1||d)&&r.push(` `),n.alignDelimiters!==!1&&r.push(o),r.push(i),n.alignDelimiters!==!1&&r.push(s),n.padding!==!1&&r.push(` `),(n.delimiterEnd!==!1||d!==l-1)&&r.push(`|`)}m.push(n.delimiterEnd===!1?r.join(``).replace(/ +$/,``):r.join(``))}return m.join(`
`)}function Tu(e){return e==null?``:String(e)}function Eu(e){let t=typeof e==`string`?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}function Du(e,t,n,r){let i=n.enter(`blockquote`),a=n.createTracker(r);a.move(`> `),a.shift(2);let o=n.indentLines(n.containerFlow(e,a.current()),Ou);return i(),o}function Ou(e,t,n){return`>`+(n?``:` `)+e}function ku(e,t){return Au(e,t.inConstruct,!0)&&!Au(e,t.notInConstruct,!1)}function Au(e,t,n){if(typeof t==`string`&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function ju(e,t,n,r){let i=-1;for(;++i<n.unsafe.length;)if(n.unsafe[i].character===`
`&&ku(n.stack,n.unsafe[i]))return/[ \t]/.test(r.before)?``:` `;return`\\
`}function Z(e,t){let n=String(e),r=n.indexOf(t),i=r,a=0,o=0;if(typeof t!=`string`)throw TypeError(`Expected substring`);for(;r!==-1;)r===i?++a>o&&(o=a):a=1,i=r+t.length,r=n.indexOf(t,i);return o}function Mu(e,t){return!!(t.options.fences===!1&&e.value&&!e.lang&&/[^ \r\n]/.test(e.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value))}function Nu(e){let t=e.options.fence||"`";if(t!=="`"&&t!==`~`)throw Error("Cannot serialize code with `"+t+"` for `options.fence`, expected `` ` `` or `~`");return t}function Pu(e,t,n,r){let i=Nu(n),a=e.value||``,o=i==="`"?`GraveAccent`:`Tilde`;if(Mu(e,n)){let e=n.enter(`codeIndented`),t=n.indentLines(a,Fu);return e(),t}let s=n.createTracker(r),c=i.repeat(Math.max(Z(a,i)+1,3)),l=n.enter(`codeFenced`),u=s.move(c);if(e.lang){let t=n.enter(`codeFencedLang${o}`);u+=s.move(n.safe(e.lang,{before:u,after:` `,encode:["`"],...s.current()})),t()}if(e.lang&&e.meta){let t=n.enter(`codeFencedMeta${o}`);u+=s.move(` `),u+=s.move(n.safe(e.meta,{before:u,after:`
`,encode:["`"],...s.current()})),t()}return u+=s.move(`
`),a&&(u+=s.move(a+`
`)),u+=s.move(c),l(),u}function Fu(e,t,n){return(n?``:`    `)+e}function Iu(e){let t=e.options.quote||`"`;if(t!==`"`&&t!==`'`)throw Error("Cannot serialize title with `"+t+"` for `options.quote`, expected `\"`, or `'`");return t}function Lu(e,t,n,r){let i=Iu(n),a=i===`"`?`Quote`:`Apostrophe`,o=n.enter(`definition`),s=n.enter(`label`),c=n.createTracker(r),l=c.move(`[`);return l+=c.move(n.safe(n.associationId(e),{before:l,after:`]`,...c.current()})),l+=c.move(`]: `),s(),!e.url||/[\0- \u007F]/.test(e.url)?(s=n.enter(`destinationLiteral`),l+=c.move(`<`),l+=c.move(n.safe(e.url,{before:l,after:`>`,...c.current()})),l+=c.move(`>`)):(s=n.enter(`destinationRaw`),l+=c.move(n.safe(e.url,{before:l,after:e.title?` `:`
`,...c.current()}))),s(),e.title&&(s=n.enter(`title${a}`),l+=c.move(` `+i),l+=c.move(n.safe(e.title,{before:l,after:i,...c.current()})),l+=c.move(i),s()),o(),l}function Ru(e){let t=e.options.emphasis||`*`;if(t!==`*`&&t!==`_`)throw Error("Cannot serialize emphasis with `"+t+"` for `options.emphasis`, expected `*`, or `_`");return t}function zu(e){return`&#x`+e.toString(16).toUpperCase()+`;`}function Bu(e,t,n){let r=ma(e),i=ma(t);return r===void 0?i===void 0?n===`_`?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:r===1?i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}Vu.peek=Hu;function Vu(e,t,n,r){let i=Ru(n),a=n.enter(`emphasis`),o=n.createTracker(r),s=o.move(i),c=o.move(n.containerPhrasing(e,{after:i,before:s,...o.current()})),l=c.charCodeAt(0),u=Bu(r.before.charCodeAt(r.before.length-1),l,i);u.inside&&(c=zu(l)+c.slice(1));let d=c.charCodeAt(c.length-1),f=Bu(r.after.charCodeAt(0),d,i);f.inside&&(c=c.slice(0,-1)+zu(d));let p=o.move(i);return a(),n.attentionEncodeSurroundingInfo={after:f.outside,before:u.outside},s+c+p}function Hu(e,t,n){return n.options.emphasis||`*`}function Uu(e,t){let n=!1;return Lc(e,function(e){if(`value`in e&&/\r?\n|\r/.test(e.value)||e.type===`break`)return n=!0,!1}),!!((!e.depth||e.depth<3)&&Ri(e)&&(t.options.setext||n))}function Wu(e,t,n,r){let i=Math.max(Math.min(6,e.depth||1),1),a=n.createTracker(r);if(Uu(e,n)){let t=n.enter(`headingSetext`),r=n.enter(`phrasing`),o=n.containerPhrasing(e,{...a.current(),before:`
`,after:`
`});return r(),t(),o+`
`+(i===1?`=`:`-`).repeat(o.length-(Math.max(o.lastIndexOf(`\r`),o.lastIndexOf(`
`))+1))}let o=`#`.repeat(i),s=n.enter(`headingAtx`),c=n.enter(`phrasing`);a.move(o+` `);let l=n.containerPhrasing(e,{before:`# `,after:`
`,...a.current()});return/^[\t ]/.test(l)&&(l=zu(l.charCodeAt(0))+l.slice(1)),l=l?o+` `+l:o,n.options.closeAtx&&(l+=` `+o),c(),s(),l}Gu.peek=Ku;function Gu(e){return e.value||``}function Ku(){return`<`}qu.peek=Ju;function qu(e,t,n,r){let i=Iu(n),a=i===`"`?`Quote`:`Apostrophe`,o=n.enter(`image`),s=n.enter(`label`),c=n.createTracker(r),l=c.move(`![`);return l+=c.move(n.safe(e.alt,{before:l,after:`]`,...c.current()})),l+=c.move(`](`),s(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(s=n.enter(`destinationLiteral`),l+=c.move(`<`),l+=c.move(n.safe(e.url,{before:l,after:`>`,...c.current()})),l+=c.move(`>`)):(s=n.enter(`destinationRaw`),l+=c.move(n.safe(e.url,{before:l,after:e.title?` `:`)`,...c.current()}))),s(),e.title&&(s=n.enter(`title${a}`),l+=c.move(` `+i),l+=c.move(n.safe(e.title,{before:l,after:i,...c.current()})),l+=c.move(i),s()),l+=c.move(`)`),o(),l}function Ju(){return`!`}Yu.peek=Xu;function Yu(e,t,n,r){let i=e.referenceType,a=n.enter(`imageReference`),o=n.enter(`label`),s=n.createTracker(r),c=s.move(`![`),l=n.safe(e.alt,{before:c,after:`]`,...s.current()});c+=s.move(l+`][`),o();let u=n.stack;n.stack=[],o=n.enter(`reference`);let d=n.safe(n.associationId(e),{before:c,after:`]`,...s.current()});return o(),n.stack=u,a(),i===`full`||!l||l!==d?c+=s.move(d+`]`):i===`shortcut`?c=c.slice(0,-1):c+=s.move(`]`),c}function Xu(){return`!`}Zu.peek=Qu;function Zu(e,t,n){let r=e.value||``,i="`",a=-1;for(;RegExp("(^|[^`])"+i+"([^`]|$)").test(r);)i+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=` `+r+` `);++a<n.unsafe.length;){let e=n.unsafe[a],t=n.compilePattern(e),i;if(e.atBreak)for(;i=t.exec(r);){let e=i.index;r.charCodeAt(e)===10&&r.charCodeAt(e-1)===13&&e--,r=r.slice(0,e)+` `+r.slice(i.index+1)}}return i+r+i}function Qu(){return"`"}function $u(e,t){let n=Ri(e);return!!(!t.options.resourceLink&&e.url&&!e.title&&e.children&&e.children.length===1&&e.children[0].type===`text`&&(n===e.url||`mailto:`+n===e.url)&&/^[a-z][a-z+.-]+:/i.test(e.url)&&!/[\0- <>\u007F]/.test(e.url))}ed.peek=td;function ed(e,t,n,r){let i=Iu(n),a=i===`"`?`Quote`:`Apostrophe`,o=n.createTracker(r),s,c;if($u(e,n)){let t=n.stack;n.stack=[],s=n.enter(`autolink`);let r=o.move(`<`);return r+=o.move(n.containerPhrasing(e,{before:r,after:`>`,...o.current()})),r+=o.move(`>`),s(),n.stack=t,r}s=n.enter(`link`),c=n.enter(`label`);let l=o.move(`[`);return l+=o.move(n.containerPhrasing(e,{before:l,after:`](`,...o.current()})),l+=o.move(`](`),c(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(c=n.enter(`destinationLiteral`),l+=o.move(`<`),l+=o.move(n.safe(e.url,{before:l,after:`>`,...o.current()})),l+=o.move(`>`)):(c=n.enter(`destinationRaw`),l+=o.move(n.safe(e.url,{before:l,after:e.title?` `:`)`,...o.current()}))),c(),e.title&&(c=n.enter(`title${a}`),l+=o.move(` `+i),l+=o.move(n.safe(e.title,{before:l,after:i,...o.current()})),l+=o.move(i),c()),l+=o.move(`)`),s(),l}function td(e,t,n){return $u(e,n)?`<`:`[`}nd.peek=rd;function nd(e,t,n,r){let i=e.referenceType,a=n.enter(`linkReference`),o=n.enter(`label`),s=n.createTracker(r),c=s.move(`[`),l=n.containerPhrasing(e,{before:c,after:`]`,...s.current()});c+=s.move(l+`][`),o();let u=n.stack;n.stack=[],o=n.enter(`reference`);let d=n.safe(n.associationId(e),{before:c,after:`]`,...s.current()});return o(),n.stack=u,a(),i===`full`||!l||l!==d?c+=s.move(d+`]`):i===`shortcut`?c=c.slice(0,-1):c+=s.move(`]`),c}function rd(){return`[`}function id(e){let t=e.options.bullet||`*`;if(t!==`*`&&t!==`+`&&t!==`-`)throw Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function ad(e){let t=id(e),n=e.options.bulletOther;if(!n)return t===`*`?`-`:`*`;if(n!==`*`&&n!==`+`&&n!==`-`)throw Error("Cannot serialize items with `"+n+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(n===t)throw Error("Expected `bullet` (`"+t+"`) and `bulletOther` (`"+n+"`) to be different");return n}function od(e){let t=e.options.bulletOrdered||`.`;if(t!==`.`&&t!==`)`)throw Error("Cannot serialize items with `"+t+"` for `options.bulletOrdered`, expected `.` or `)`");return t}function Q(e){let t=e.options.rule||`*`;if(t!==`*`&&t!==`-`&&t!==`_`)throw Error("Cannot serialize rules with `"+t+"` for `options.rule`, expected `*`, `-`, or `_`");return t}function sd(e,t,n,r){let i=n.enter(`list`),a=n.bulletCurrent,o=e.ordered?od(n):id(n),s=e.ordered?o===`.`?`)`:`.`:ad(n),c=t&&n.bulletLastUsed?o===n.bulletLastUsed:!1;if(!e.ordered){let t=e.children?e.children[0]:void 0;if((o===`*`||o===`-`)&&t&&(!t.children||!t.children[0])&&n.stack[n.stack.length-1]===`list`&&n.stack[n.stack.length-2]===`listItem`&&n.stack[n.stack.length-3]===`list`&&n.stack[n.stack.length-4]===`listItem`&&n.indexStack[n.indexStack.length-1]===0&&n.indexStack[n.indexStack.length-2]===0&&n.indexStack[n.indexStack.length-3]===0&&(c=!0),Q(n)===o&&t){let t=-1;for(;++t<e.children.length;){let n=e.children[t];if(n&&n.type===`listItem`&&n.children&&n.children[0]&&n.children[0].type===`thematicBreak`){c=!0;break}}}}c&&(o=s),n.bulletCurrent=o;let l=n.containerFlow(e,r);return n.bulletLastUsed=o,n.bulletCurrent=a,i(),l}function cd(e){let t=e.options.listItemIndent||`one`;if(t!==`tab`&&t!==`one`&&t!==`mixed`)throw Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function ld(e,t,n,r){let i=cd(n),a=n.bulletCurrent||id(n);t&&t.type===`list`&&t.ordered&&(a=(typeof t.start==`number`&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+a);let o=a.length+1;(i===`tab`||i===`mixed`&&(t&&t.type===`list`&&t.spread||e.spread))&&(o=Math.ceil(o/4)*4);let s=n.createTracker(r);s.move(a+` `.repeat(o-a.length)),s.shift(o);let c=n.enter(`listItem`),l=n.indentLines(n.containerFlow(e,s.current()),u);return c(),l;function u(e,t,n){return t?(n?``:` `.repeat(o))+e:(n?a:a+` `.repeat(o-a.length))+e}}function ud(e,t,n,r){let i=n.enter(`paragraph`),a=n.enter(`phrasing`),o=n.containerPhrasing(e,r);return a(),i(),o}var dd=Ec([`break`,`delete`,`emphasis`,`footnote`,`footnoteReference`,`image`,`imageReference`,`inlineCode`,`inlineMath`,`link`,`linkReference`,`mdxJsxTextElement`,`mdxTextExpression`,`strong`,`text`,`textDirective`]);function fd(e,t,n,r){return(e.children.some(function(e){return dd(e)})?n.containerPhrasing:n.containerFlow).call(n,e,r)}function pd(e){let t=e.options.strong||`*`;if(t!==`*`&&t!==`_`)throw Error("Cannot serialize strong with `"+t+"` for `options.strong`, expected `*`, or `_`");return t}md.peek=hd;function md(e,t,n,r){let i=pd(n),a=n.enter(`strong`),o=n.createTracker(r),s=o.move(i+i),c=o.move(n.containerPhrasing(e,{after:i,before:s,...o.current()})),l=c.charCodeAt(0),u=Bu(r.before.charCodeAt(r.before.length-1),l,i);u.inside&&(c=zu(l)+c.slice(1));let d=c.charCodeAt(c.length-1),f=Bu(r.after.charCodeAt(0),d,i);f.inside&&(c=c.slice(0,-1)+zu(d));let p=o.move(i+i);return a(),n.attentionEncodeSurroundingInfo={after:f.outside,before:u.outside},s+c+p}function hd(e,t,n){return n.options.strong||`*`}function gd(e,t,n,r){return n.safe(e.value,r)}function _d(e){let t=e.options.ruleRepetition||3;if(t<3)throw Error("Cannot serialize rules with repetition `"+t+"` for `options.ruleRepetition`, expected `3` or more");return t}function vd(e,t,n){let r=(Q(n)+(n.options.ruleSpaces?` `:``)).repeat(_d(n));return n.options.ruleSpaces?r.slice(0,-1):r}var yd={blockquote:Du,break:ju,code:Pu,definition:Lu,emphasis:Vu,hardBreak:ju,heading:Wu,html:Gu,image:qu,imageReference:Yu,inlineCode:Zu,link:ed,linkReference:nd,list:sd,listItem:ld,paragraph:ud,root:fd,strong:md,text:gd,thematicBreak:vd};function bd(){return{enter:{table:$,tableData:wd,tableHeader:wd,tableRow:Sd},exit:{codeText:Td,table:xd,tableData:Cd,tableHeader:Cd,tableRow:Cd}}}function $(e){let t=e._align;this.enter({type:`table`,align:t.map(function(e){return e===`none`?null:e}),children:[]},e),this.data.inTable=!0}function xd(e){this.exit(e),this.data.inTable=void 0}function Sd(e){this.enter({type:`tableRow`,children:[]},e)}function Cd(e){this.exit(e)}function wd(e){this.enter({type:`tableCell`,children:[]},e)}function Td(e){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,Ed));let n=this.stack[this.stack.length-1];n.type,n.value=t,this.exit(e)}function Ed(e,t){return t===`|`?t:e}function Dd(e){let t=e||{},n=t.tableCellPadding,r=t.tablePipeAlign,i=t.stringLength,a=n?` `:`|`;return{unsafe:[{character:`\r`,inConstruct:`tableCell`},{character:`
`,inConstruct:`tableCell`},{atBreak:!0,character:`|`,after:`[	 :-]`},{character:`|`,inConstruct:`tableCell`},{atBreak:!0,character:`:`,after:`-`},{atBreak:!0,character:`-`,after:`[:|-]`}],handlers:{inlineCode:f,table:o,tableCell:c,tableRow:s}};function o(e,t,n,r){return l(u(e,n,r),e.align)}function s(e,t,n,r){let i=l([d(e,n,r)]);return i.slice(0,i.indexOf(`
`))}function c(e,t,n,r){let i=n.enter(`tableCell`),o=n.enter(`phrasing`),s=n.containerPhrasing(e,{...r,before:a,after:a});return o(),i(),s}function l(e,t){return wu(e,{align:t,alignDelimiters:r,padding:n,stringLength:i})}function u(e,t,n){let r=e.children,i=-1,a=[],o=t.enter(`table`);for(;++i<r.length;)a[i]=d(r[i],t,n);return o(),a}function d(e,t,n){let r=e.children,i=-1,a=[],o=t.enter(`tableRow`);for(;++i<r.length;)a[i]=c(r[i],e,t,n);return o(),a}function f(e,t,n){let r=yd.inlineCode(e,t,n);return n.stack.includes(`tableCell`)&&(r=r.replace(/\|/g,`\\$&`)),r}}function Od(){return{exit:{taskListCheckValueChecked:Ad,taskListCheckValueUnchecked:Ad,paragraph:jd}}}function kd(){return{unsafe:[{atBreak:!0,character:`-`,after:`[:|-]`}],handlers:{listItem:Md}}}function Ad(e){let t=this.stack[this.stack.length-2];t.type,t.checked=e.type===`taskListCheckValueChecked`}function jd(e){let t=this.stack[this.stack.length-2];if(t&&t.type===`listItem`&&typeof t.checked==`boolean`){let e=this.stack[this.stack.length-1];e.type;let n=e.children[0];if(n&&n.type===`text`){let r=t.children,i=-1,a;for(;++i<r.length;){let e=r[i];if(e.type===`paragraph`){a=e;break}}a===e&&(n.value=n.value.slice(1),n.value.length===0?e.children.shift():e.position&&n.position&&typeof n.position.start.offset==`number`&&(n.position.start.column++,n.position.start.offset++,e.position.start=Object.assign({},n.position.start)))}}this.exit(e)}function Md(e,t,n,r){let i=e.children[0],a=typeof e.checked==`boolean`&&i&&i.type===`paragraph`,o=`[`+(e.checked?`x`:` `)+`] `,s=n.createTracker(r);a&&s.move(o);let c=yd.listItem(e,t,n,{...r,...s.current()});return a&&(c=c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,l)),c;function l(e){return e+o}}function Nd(){return[Hl(),fu(),_u(),bd(),Od()]}function Pd(e){return{extensions:[Ul(),pu(e),vu(),Dd(e),kd()]}}var Fd={tokenize:Yd,partial:!0},Id={tokenize:Xd,partial:!0},Ld={tokenize:Zd,partial:!0},Rd={tokenize:Qd,partial:!0},zd={tokenize:$d,partial:!0},Bd={name:`wwwAutolink`,tokenize:qd,previous:ef},Vd={name:`protocolAutolink`,tokenize:Jd,previous:tf},Hd={name:`emailAutolink`,tokenize:Kd,previous:nf},Ud={};function Wd(){return{text:Ud}}for(var Gd=48;Gd<123;)Ud[Gd]=Hd,Gd++,Gd===58?Gd=65:Gd===91&&(Gd=97);Ud[43]=Hd,Ud[45]=Hd,Ud[46]=Hd,Ud[95]=Hd,Ud[72]=[Hd,Vd],Ud[104]=[Hd,Vd],Ud[87]=[Hd,Bd],Ud[119]=[Hd,Bd];function Kd(e,t,n){let r=this,i,a;return o;function o(t){return!rf(t)||!nf.call(r,r.previous)||af(r.events)?n(t):(e.enter(`literalAutolink`),e.enter(`literalAutolinkEmail`),s(t))}function s(t){return rf(t)?(e.consume(t),s):t===64?(e.consume(t),c):n(t)}function c(t){return t===46?e.check(zd,u,l)(t):t===45||t===95||Qi(t)?(a=!0,e.consume(t),c):u(t)}function l(t){return e.consume(t),i=!0,c}function u(o){return a&&i&&R(r.previous)?(e.exit(`literalAutolinkEmail`),e.exit(`literalAutolink`),t(o)):n(o)}}function qd(e,t,n){let r=this;return i;function i(t){return t!==87&&t!==119||!ef.call(r,r.previous)||af(r.events)?n(t):(e.enter(`literalAutolink`),e.enter(`literalAutolinkWww`),e.check(Fd,e.attempt(Id,e.attempt(Ld,a),n),n)(t))}function a(n){return e.exit(`literalAutolinkWww`),e.exit(`literalAutolink`),t(n)}}function Jd(e,t,n){let r=this,i=``,a=!1;return o;function o(t){return(t===72||t===104)&&tf.call(r,r.previous)&&!af(r.events)?(e.enter(`literalAutolink`),e.enter(`literalAutolinkHttp`),i+=String.fromCodePoint(t),e.consume(t),s):n(t)}function s(t){if(R(t)&&i.length<5)return i+=String.fromCodePoint(t),e.consume(t),s;if(t===58){let n=i.toLowerCase();if(n===`http`||n===`https`)return e.consume(t),c}return n(t)}function c(t){return t===47?(e.consume(t),a?l:(a=!0,c)):n(t)}function l(t){return t===null||ea(t)||B(t)||aa(t)||ia(t)?n(t):e.attempt(Id,e.attempt(Ld,u),n)(t)}function u(n){return e.exit(`literalAutolinkHttp`),e.exit(`literalAutolink`),t(n)}}function Yd(e,t,n){let r=0;return i;function i(t){return(t===87||t===119)&&r<3?(r++,e.consume(t),i):t===46&&r===3?(e.consume(t),a):n(t)}function a(e){return e===null?n(e):t(e)}}function Xd(e,t,n){let r,i,a;return o;function o(t){return t===46||t===95?e.check(Rd,c,s)(t):t===null||B(t)||aa(t)||t!==45&&ia(t)?c(t):(a=!0,e.consume(t),o)}function s(t){return t===95?r=!0:(i=r,r=void 0),e.consume(t),o}function c(e){return i||r||!a?n(e):t(e)}}function Zd(e,t){let n=0,r=0;return i;function i(o){return o===40?(n++,e.consume(o),i):o===41&&r<n?a(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?e.check(Rd,t,a)(o):o===null||B(o)||aa(o)?t(o):(e.consume(o),i)}function a(t){return t===41&&r++,e.consume(t),i}}function Qd(e,t,n){return r;function r(o){return o===33||o===34||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===63||o===95||o===126?(e.consume(o),r):o===38?(e.consume(o),a):o===93?(e.consume(o),i):o===60||o===null||B(o)||aa(o)?t(o):n(o)}function i(e){return e===null||e===40||e===91||B(e)||aa(e)?t(e):r(e)}function a(e){return R(e)?o(e):n(e)}function o(t){return t===59?(e.consume(t),r):R(t)?(e.consume(t),o):n(t)}}function $d(e,t,n){return r;function r(t){return e.consume(t),i}function i(e){return Qi(e)?n(e):t(e)}}function ef(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||B(e)}function tf(e){return!R(e)}function nf(e){return!(e===47||rf(e))}function rf(e){return e===43||e===45||e===46||e===95||Qi(e)}function af(e){let t=e.length,n=!1;for(;t--;){let r=e[t][1];if((r.type===`labelLink`||r.type===`labelImage`)&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}var of={tokenize:mf,partial:!0};function sf(){return{document:{91:{name:`gfmFootnoteDefinition`,tokenize:df,continuation:{tokenize:ff},exit:pf}},text:{91:{name:`gfmFootnoteCall`,tokenize:uf},93:{name:`gfmPotentialFootnoteCall`,add:`after`,tokenize:cf,resolveTo:lf}}}}function cf(e,t,n){let r=this,i=r.events.length,a=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),o;for(;i--;){let e=r.events[i][1];if(e.type===`labelImage`){o=e;break}if(e.type===`gfmFootnoteCall`||e.type===`labelLink`||e.type===`label`||e.type===`image`||e.type===`link`)break}return s;function s(i){if(!o||!o._balanced)return n(i);let s=Zi(r.sliceSerialize({start:o.end,end:r.now()}));return s.codePointAt(0)!==94||!a.includes(s.slice(1))?n(i):(e.enter(`gfmFootnoteCallLabelMarker`),e.consume(i),e.exit(`gfmFootnoteCallLabelMarker`),t(i))}}function lf(e,t){let n=e.length;for(;n--;)if(e[n][1].type===`labelImage`&&e[n][0]===`enter`){e[n][1];break}e[n+1][1].type=`data`,e[n+3][1].type=`gfmFootnoteCallLabelMarker`;let r={type:`gfmFootnoteCall`,start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},i={type:`gfmFootnoteCallMarker`,start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};i.end.column++,i.end.offset++,i.end._bufferIndex++;let a={type:`gfmFootnoteCallString`,start:Object.assign({},i.end),end:Object.assign({},e[e.length-1][1].start)},o={type:`chunkString`,contentType:`string`,start:Object.assign({},a.start),end:Object.assign({},a.end)},s=[e[n+1],e[n+2],[`enter`,r,t],e[n+3],e[n+4],[`enter`,i,t],[`exit`,i,t],[`enter`,a,t],[`enter`,o,t],[`exit`,o,t],[`exit`,a,t],e[e.length-2],e[e.length-1],[`exit`,r,t]];return e.splice(n,e.length-n+1,...s),e}function uf(e,t,n){let r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),a=0,o;return s;function s(t){return e.enter(`gfmFootnoteCall`),e.enter(`gfmFootnoteCallLabelMarker`),e.consume(t),e.exit(`gfmFootnoteCallLabelMarker`),c}function c(t){return t===94?(e.enter(`gfmFootnoteCallMarker`),e.consume(t),e.exit(`gfmFootnoteCallMarker`),e.enter(`gfmFootnoteCallString`),e.enter(`chunkString`).contentType=`string`,l):n(t)}function l(s){if(a>999||s===93&&!o||s===null||s===91||B(s))return n(s);if(s===93){e.exit(`chunkString`);let a=e.exit(`gfmFootnoteCallString`);return i.includes(Zi(r.sliceSerialize(a)))?(e.enter(`gfmFootnoteCallLabelMarker`),e.consume(s),e.exit(`gfmFootnoteCallLabelMarker`),e.exit(`gfmFootnoteCall`),t):n(s)}return B(s)||(o=!0),a++,e.consume(s),s===92?u:l}function u(t){return t===91||t===92||t===93?(e.consume(t),a++,l):l(t)}}function df(e,t,n){let r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),a,o=0,s;return c;function c(t){return e.enter(`gfmFootnoteDefinition`)._container=!0,e.enter(`gfmFootnoteDefinitionLabel`),e.enter(`gfmFootnoteDefinitionLabelMarker`),e.consume(t),e.exit(`gfmFootnoteDefinitionLabelMarker`),l}function l(t){return t===94?(e.enter(`gfmFootnoteDefinitionMarker`),e.consume(t),e.exit(`gfmFootnoteDefinitionMarker`),e.enter(`gfmFootnoteDefinitionLabelString`),e.enter(`chunkString`).contentType=`string`,u):n(t)}function u(t){if(o>999||t===93&&!s||t===null||t===91||B(t))return n(t);if(t===93){e.exit(`chunkString`);let n=e.exit(`gfmFootnoteDefinitionLabelString`);return a=Zi(r.sliceSerialize(n)),e.enter(`gfmFootnoteDefinitionLabelMarker`),e.consume(t),e.exit(`gfmFootnoteDefinitionLabelMarker`),e.exit(`gfmFootnoteDefinitionLabel`),f}return B(t)||(s=!0),o++,e.consume(t),t===92?d:u}function d(t){return t===91||t===92||t===93?(e.consume(t),o++,u):u(t)}function f(t){return t===58?(e.enter(`definitionMarker`),e.consume(t),e.exit(`definitionMarker`),i.includes(a)||i.push(a),H(e,p,`gfmFootnoteDefinitionWhitespace`)):n(t)}function p(e){return t(e)}}function ff(e,t,n){return e.check(Sa,t,e.attempt(of,t,n))}function pf(e){e.exit(`gfmFootnoteDefinition`)}function mf(e,t,n){let r=this;return H(e,i,`gfmFootnoteDefinitionIndent`,5);function i(e){let i=r.events[r.events.length-1];return i&&i[1].type===`gfmFootnoteDefinitionIndent`&&i[2].sliceSerialize(i[1],!0).length===4?t(e):n(e)}}function hf(e){let t=(e||{}).singleTilde,n={name:`strikethrough`,tokenize:i,resolveAll:r};return t??=!0,{text:{126:n},insideSpan:{null:[n]},attentionMarkers:{null:[126]}};function r(e,t){let n=-1;for(;++n<e.length;)if(e[n][0]===`enter`&&e[n][1].type===`strikethroughSequenceTemporary`&&e[n][1]._close){let r=n;for(;r--;)if(e[r][0]===`exit`&&e[r][1].type===`strikethroughSequenceTemporary`&&e[r][1]._open&&e[n][1].end.offset-e[n][1].start.offset===e[r][1].end.offset-e[r][1].start.offset){e[n][1].type=`strikethroughSequence`,e[r][1].type=`strikethroughSequence`;let i={type:`strikethrough`,start:Object.assign({},e[r][1].start),end:Object.assign({},e[n][1].end)},a={type:`strikethroughText`,start:Object.assign({},e[r][1].end),end:Object.assign({},e[n][1].start)},o=[[`enter`,i,t],[`enter`,e[r][1],t],[`exit`,e[r][1],t],[`enter`,a,t]],s=t.parser.constructs.insideSpan.null;s&&Wi(o,o.length,0,ha(s,e.slice(r+1,n),t)),Wi(o,o.length,0,[[`exit`,a,t],[`enter`,e[n][1],t],[`exit`,e[n][1],t],[`exit`,i,t]]),Wi(e,r-1,n-r+3,o),n=r+o.length-2;break}}for(n=-1;++n<e.length;)e[n][1].type===`strikethroughSequenceTemporary`&&(e[n][1].type=`data`);return e}function i(e,n,r){let i=this.previous,a=this.events,o=0;return s;function s(t){return i===126&&a[a.length-1][1].type!==`characterEscape`?r(t):(e.enter(`strikethroughSequenceTemporary`),c(t))}function c(a){let s=ma(i);if(a===126)return o>1?r(a):(e.consume(a),o++,c);if(o<2&&!t)return r(a);let l=e.exit(`strikethroughSequenceTemporary`),u=ma(a);return l._open=!u||u===2&&!!s,l._close=!s||s===2&&!!u,n(a)}}}var gf=class{constructor(){this.map=[]}add(e,t,n){_f(this,e,t,n)}consume(e){if(this.map.sort(function(e,t){return e[0]-t[0]}),this.map.length===0)return;let t=this.map.length,n=[];for(;t>0;)--t,n.push(e.slice(this.map[t][0]+this.map[t][1]),this.map[t][2]),e.length=this.map[t][0];n.push(e.slice()),e.length=0;let r=n.pop();for(;r;){for(let t of r)e.push(t);r=n.pop()}this.map.length=0}};function _f(e,t,n,r){let i=0;if(!(n===0&&r.length===0)){for(;i<e.map.length;){if(e.map[i][0]===t){e.map[i][1]+=n,e.map[i][2].push(...r);return}i+=1}e.map.push([t,n,r])}}function vf(e,t){let n=!1,r=[];for(;t<e.length;){let i=e[t];if(n){if(i[0]===`enter`)i[1].type===`tableContent`&&r.push(e[t+1][1].type===`tableDelimiterMarker`?`left`:`none`);else if(i[1].type===`tableContent`){if(e[t-1][1].type===`tableDelimiterMarker`){let e=r.length-1;r[e]=r[e]===`left`?`center`:`right`}}else if(i[1].type===`tableDelimiterRow`)break}else i[0]===`enter`&&i[1].type===`tableDelimiterRow`&&(n=!0);t+=1}return r}function yf(){return{flow:{null:{name:`table`,tokenize:bf,resolveAll:xf}}}}function bf(e,t,n){let r=this,i=0,a=0,o;return s;function s(e){let t=r.events.length-1;for(;t>-1;){let e=r.events[t][1].type;if(e===`lineEnding`||e===`linePrefix`)t--;else break}let i=t>-1?r.events[t][1].type:null,a=i===`tableHead`||i===`tableRow`?S:c;return a===S&&r.parser.lazy[r.now().line]?n(e):a(e)}function c(t){return e.enter(`tableHead`),e.enter(`tableRow`),l(t)}function l(e){return e===124?u(e):(o=!0,a+=1,u(e))}function u(t){return t===null?n(t):z(t)?a>1?(a=0,r.interrupt=!0,e.exit(`tableRow`),e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),p):n(t):V(t)?H(e,u,`whitespace`)(t):(a+=1,o&&(o=!1,i+=1),t===124?(e.enter(`tableCellDivider`),e.consume(t),e.exit(`tableCellDivider`),o=!0,u):(e.enter(`data`),d(t)))}function d(t){return t===null||t===124||B(t)?(e.exit(`data`),u(t)):(e.consume(t),t===92?f:d)}function f(t){return t===92||t===124?(e.consume(t),d):d(t)}function p(t){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(t):(e.enter(`tableDelimiterRow`),o=!1,V(t)?H(e,m,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):m(t))}function m(t){return t===45||t===58?g(t):t===124?(o=!0,e.enter(`tableCellDivider`),e.consume(t),e.exit(`tableCellDivider`),h):x(t)}function h(t){return V(t)?H(e,g,`whitespace`)(t):g(t)}function g(t){return t===58?(a+=1,o=!0,e.enter(`tableDelimiterMarker`),e.consume(t),e.exit(`tableDelimiterMarker`),_):t===45?(a+=1,_(t)):t===null||z(t)?b(t):x(t)}function _(t){return t===45?(e.enter(`tableDelimiterFiller`),v(t)):x(t)}function v(t){return t===45?(e.consume(t),v):t===58?(o=!0,e.exit(`tableDelimiterFiller`),e.enter(`tableDelimiterMarker`),e.consume(t),e.exit(`tableDelimiterMarker`),y):(e.exit(`tableDelimiterFiller`),y(t))}function y(t){return V(t)?H(e,b,`whitespace`)(t):b(t)}function b(n){return n===124?m(n):n===null||z(n)?!o||i!==a?x(n):(e.exit(`tableDelimiterRow`),e.exit(`tableHead`),t(n)):x(n)}function x(e){return n(e)}function S(t){return e.enter(`tableRow`),C(t)}function C(n){return n===124?(e.enter(`tableCellDivider`),e.consume(n),e.exit(`tableCellDivider`),C):n===null||z(n)?(e.exit(`tableRow`),t(n)):V(n)?H(e,C,`whitespace`)(n):(e.enter(`data`),w(n))}function w(t){return t===null||t===124||B(t)?(e.exit(`data`),C(t)):(e.consume(t),t===92?T:w)}function T(t){return t===92||t===124?(e.consume(t),w):w(t)}}function xf(e,t){let n=-1,r=!0,i=0,a=[0,0,0,0],o=[0,0,0,0],s=!1,c=0,l,u,d,f=new gf;for(;++n<e.length;){let p=e[n],m=p[1];p[0]===`enter`?m.type===`tableHead`?(s=!1,c!==0&&(Cf(f,t,c,l,u),u=void 0,c=0),l={type:`table`,start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[[`enter`,l,t]])):m.type===`tableRow`||m.type===`tableDelimiterRow`?(r=!0,d=void 0,a=[0,0,0,0],o=[0,n+1,0,0],s&&(s=!1,u={type:`tableBody`,start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[[`enter`,u,t]])),i=m.type===`tableDelimiterRow`?2:u?3:1):i&&(m.type===`data`||m.type===`tableDelimiterMarker`||m.type===`tableDelimiterFiller`)?(r=!1,o[2]===0&&(a[1]!==0&&(o[0]=o[1],d=Sf(f,t,a,i,void 0,d),a=[0,0,0,0]),o[2]=n)):m.type===`tableCellDivider`&&(r?r=!1:(a[1]!==0&&(o[0]=o[1],d=Sf(f,t,a,i,void 0,d)),a=o,o=[a[1],n,0,0])):m.type===`tableHead`?(s=!0,c=n):m.type===`tableRow`||m.type===`tableDelimiterRow`?(c=n,a[1]===0?o[1]!==0&&(d=Sf(f,t,o,i,n,d)):(o[0]=o[1],d=Sf(f,t,a,i,n,d)),i=0):i&&(m.type===`data`||m.type===`tableDelimiterMarker`||m.type===`tableDelimiterFiller`)&&(o[3]=n)}for(c!==0&&Cf(f,t,c,l,u),f.consume(t.events),n=-1;++n<t.events.length;){let e=t.events[n];e[0]===`enter`&&e[1].type===`table`&&(e[1]._align=vf(t.events,n))}return e}function Sf(e,t,n,r,i,a){let o=r===1?`tableHeader`:r===2?`tableDelimiter`:`tableData`;n[0]!==0&&(a.end=Object.assign({},wf(t.events,n[0])),e.add(n[0],0,[[`exit`,a,t]]));let s=wf(t.events,n[1]);if(a={type:o,start:Object.assign({},s),end:Object.assign({},s)},e.add(n[1],0,[[`enter`,a,t]]),n[2]!==0){let i=wf(t.events,n[2]),a=wf(t.events,n[3]),o={type:`tableContent`,start:Object.assign({},i),end:Object.assign({},a)};if(e.add(n[2],0,[[`enter`,o,t]]),r!==2){let r=t.events[n[2]],i=t.events[n[3]];if(r[1].end=Object.assign({},i[1].end),r[1].type=`chunkText`,r[1].contentType=`text`,n[3]>n[2]+1){let t=n[2]+1,r=n[3]-n[2]-1;e.add(t,r,[])}}e.add(n[3]+1,0,[[`exit`,o,t]])}return i!==void 0&&(a.end=Object.assign({},wf(t.events,i)),e.add(i,0,[[`exit`,a,t]]),a=void 0),a}function Cf(e,t,n,r,i){let a=[],o=wf(t.events,n);i&&(i.end=Object.assign({},o),a.push([`exit`,i,t])),r.end=Object.assign({},o),a.push([`exit`,r,t]),e.add(n+1,0,a)}function wf(e,t){let n=e[t],r=n[0]===`enter`?`start`:`end`;return n[1][r]}var Tf={name:`tasklistCheck`,tokenize:Df};function Ef(){return{text:{91:Tf}}}function Df(e,t,n){let r=this;return i;function i(t){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(t):(e.enter(`taskListCheck`),e.enter(`taskListCheckMarker`),e.consume(t),e.exit(`taskListCheckMarker`),a)}function a(t){return B(t)?(e.enter(`taskListCheckValueUnchecked`),e.consume(t),e.exit(`taskListCheckValueUnchecked`),o):t===88||t===120?(e.enter(`taskListCheckValueChecked`),e.consume(t),e.exit(`taskListCheckValueChecked`),o):n(t)}function o(t){return t===93?(e.enter(`taskListCheckMarker`),e.consume(t),e.exit(`taskListCheckMarker`),e.exit(`taskListCheck`),s):n(t)}function s(r){return z(r)?t(r):V(r)?e.check({tokenize:Of},t,n)(r):n(r)}}function Of(e,t,n){return H(e,r,`whitespace`);function r(e){return e===null?n(e):t(e)}}function kf(e){return qi([Wd(),sf(),hf(e),yf(),Ef()])}var Af={};function jf(e){let t=this,n=e||Af,r=t.data(),i=r.micromarkExtensions||=[],a=r.fromMarkdownExtensions||=[],o=r.toMarkdownExtensions||=[];i.push(kf(n)),a.push(Nd()),o.push(Pd(n))}function Mf(){let{slug:e}=Xe(),t=ir(e);return t?(0,N.jsxs)(`div`,{className:`page-shell blog-post-shell`,children:[(0,N.jsx)(Ft,{to:j.blog,className:`page-back-link`,children:`← 글 목록`}),(0,N.jsxs)(`article`,{className:`blog-post`,children:[(0,N.jsxs)(`header`,{className:`blog-post-header`,children:[(0,N.jsx)(`h1`,{children:t.title}),(0,N.jsxs)(`div`,{className:`blog-post-meta`,children:[(0,N.jsx)(`time`,{dateTime:t.date,children:t.date}),t.tags.map(e=>(0,N.jsx)(`span`,{className:`blog-post-tag`,children:e},e))]})]}),(0,N.jsx)(`div`,{className:`blog-prose`,children:(0,N.jsx)(kl,{remarkPlugins:[jf],children:t.body})})]})]}):(0,N.jsx)(Mn,{message:`요청한 글을 찾을 수 없습니다.`})}function Nf({links:e=[],label:t=``}){return e.length?(0,N.jsxs)(`div`,{className:`external-links`,children:[t?(0,N.jsx)(`p`,{className:`external-links-label`,children:t}):null,(0,N.jsx)(`div`,{className:`external-links-row`,children:e.map(e=>(0,N.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noopener noreferrer`,className:`external-link`,children:e.label},e.href))})]}):null}function Pf({src:e,alt:t=``,onClose:n}){let r=(0,v.useRef)(null);return(0,v.useEffect)(()=>{let e=e=>{e.key===`Escape`&&n()};return document.addEventListener(`keydown`,e),r.current?.focus(),()=>document.removeEventListener(`keydown`,e)},[n]),(0,N.jsx)(`div`,{className:`lightbox`,role:`presentation`,onClick:n,children:(0,N.jsxs)(`div`,{className:`lightbox-panel`,role:`dialog`,"aria-modal":`true`,"aria-label":t||`이미지 확대 보기`,onClick:e=>e.stopPropagation(),children:[(0,N.jsx)(`button`,{type:`button`,ref:r,className:`lightbox-close`,"aria-label":`닫기`,onClick:n,children:`×`}),(0,N.jsx)(`img`,{src:e,alt:t})]})})}function Ff({src:e,alt:t,className:n,href:r,onZoom:i}){let a=(0,N.jsx)(`img`,{src:e,alt:t,className:n});return r?(0,N.jsx)(`a`,{href:r,target:`_blank`,rel:`noopener noreferrer`,className:`image-link`,children:a}):(0,N.jsx)(`button`,{type:`button`,className:`image-zoom-button`,"aria-label":`${t} 이미지 크게 보기`,onClick:()=>i(e,t),children:a})}function If(){let[e,t]=(0,v.useState)(null);return{zoomed:e,open:(0,v.useCallback)((e,n=``)=>t({src:e,alt:n}),[]),close:(0,v.useCallback)(()=>t(null),[])}}var Lf=[{id:`lgcns-ucamp`,degree:`LG CNS U-CAMP 36기 신입 교육 프로그램`,school:`LG CNS`,period:`2022.09 - 2022.11`,summary:`Full-Stack Web Development Bootcamp 과정`,curriculum:[`JAVA(JDK 11), ORACLE(11c), React.js, Spring Boot(2.x.x)`],image:`LGCNS.png`,imageLink:`https://www.lg.co.kr/media/release/3933`},{id:`ezen-academy`,degree:`빅데이터 기반 자바 백엔드 과정`,school:`EZEN ACADEMY`,period:`2021.06 - 2022.01`,summary:`Full-Stack Web Application Development Program`,curriculum:[`JAVA(JDK11), MYSQL, HTML, CSS, JavaScript(ES6), JSP, Spring Framework`],image:`Ezen2.png`},{id:`hycu-bachelor`,degree:`컴퓨터공학과 학사`,school:`한양사이버대학교`,period:`2016.03 - 2021.03`,summary:`평점 4.05 / 4.5`,image:`HYLOGO.jpg`,imageLink:`https://www.hycu.ac.kr/user/maSnEx/goMain/30003/loadMap.do`,links:[{label:`GitHub`,href:`https://github.com/seulgae/Leesigukgram`},{label:`프로젝트 설명 PDF`,href:`https://github.com/Giltaehyeong/Leesigukgram/blob/main/LeeSigukgram(%EC%84%A4%EB%AA%85).pdf`},{label:`동작 영상`,href:`https://www.youtube.com/watch?v=kE8Ci-JRsi4`}]}];function Rf(){let{zoomed:e,open:t,close:n}=If();return(0,N.jsxs)(`div`,{className:`page-shell`,children:[(0,N.jsx)(`h1`,{children:`학력 및 교육`}),(0,N.jsx)(`div`,{className:`education-list`,children:Lf.map(e=>(0,N.jsxs)(`article`,{className:`education-card`,children:[(0,N.jsx)(Ff,{src:qt(e.image),alt:e.school,className:`education-image`,href:e.imageLink,onZoom:t}),(0,N.jsxs)(`div`,{className:`education-details`,children:[(0,N.jsx)(`h2`,{children:e.degree}),(0,N.jsx)(`h3`,{children:e.school}),(0,N.jsxs)(`p`,{children:[(0,N.jsx)(`strong`,{children:`기간:`}),` `,e.period]}),(0,N.jsx)(`p`,{children:e.summary}),e.curriculum?.length?(0,N.jsxs)(`div`,{className:`education-curriculum`,children:[(0,N.jsx)(`p`,{className:`education-curriculum-label`,children:`상세 교육 내용`}),(0,N.jsx)(`ul`,{children:e.curriculum.map(e=>(0,N.jsx)(`li`,{children:e},e))})]}):null,(0,N.jsx)(Nf,{links:e.links,label:`프로젝트 항목`})]})]},e.id))}),e?(0,N.jsx)(Pf,{src:e.src,alt:e.alt,onClose:n}):null]})}function zf({items:e=[],dateLabel:t=`일자`}){let{zoomed:n,open:r,close:i}=If();return(0,N.jsxs)(`div`,{className:`credential-list`,children:[e.map(e=>(0,N.jsxs)(`article`,{className:`credential-card`,children:[(0,N.jsx)(Ff,{src:qt(e.image),alt:e.title,className:`credential-image`,onZoom:r}),(0,N.jsxs)(`div`,{className:`credential-details`,children:[(0,N.jsx)(`h2`,{children:e.title}),(0,N.jsxs)(`p`,{className:`credential-date`,children:[(0,N.jsx)(`strong`,{children:t}),` `,e.date]}),(0,N.jsx)(`p`,{children:e.description}),(0,N.jsx)(Nf,{links:e.links})]})]},e.id)),n?(0,N.jsx)(Pf,{src:n.src,alt:n.alt,onClose:i}):null]})}var Bf=[{id:`abacus-2024`,title:`(주)애버커스 통신사업본부 우수사원`,date:`2024.12`,description:`CloudXper 플랫폼 성능 개선과 LG U+ 통합 빌링 운영 안정화 성과를 바탕으로 선정되었습니다.`,image:`ABACUS.jpg`,links:[{label:`회사 홈페이지`,href:`http://iabacus.co.kr/iabacus/`},{label:`기업정보`,href:`https://www.jobkorea.co.kr/recruit/co_read/c/abacus`}]},{id:`ucamp-2022`,title:`LG CNS UCAMP 프로젝트 최우수상`,date:`2022.11`,description:`사전 평가 시험에서 반 2등을 기록해 2팀 팀장을 맡았고, 4명의 팀원과 협업하여 프로젝트를 최우수상으로 이끌었습니다.`,image:`UCAMP.jpg`,links:[{label:`GitHub`,href:`https://github.com/seulgae/fmBoot`},{label:`프로젝트 설명`,href:`https://github.com/seulgae/fmBoot/blob/main/PPT.pdf`},{label:`프로젝트 영상`,href:`https://youtu.be/Cb8BTgsmOXY`}]}];function Vf(){return(0,N.jsxs)(`div`,{className:`page-shell`,children:[(0,N.jsx)(`h1`,{children:`수상 이력`}),(0,N.jsx)(zf,{items:Bf,dateLabel:`수상일`})]})}var Hf=[{id:`sqld`,title:`SQLD`,date:`2025.06.27`,description:`한국데이터산업진흥원`,image:`Licenses2.png`},{id:`web-design`,title:`웹 디자인 개발기능사`,date:`2014.06.24`,description:`한국산업인력공단`,image:`Licenses1.png`}];function Uf(){return(0,N.jsxs)(`div`,{className:`page-shell`,children:[(0,N.jsx)(`h1`,{children:`자격증`}),(0,N.jsx)(zf,{items:Hf,dateLabel:`취득일`})]})}var Wf=`2026-07-17 | e9fbd32 | [20260717]경력기술서 내용 현행화(2026-07-04 | 396bed9 | [20260704]경력기술서 내용, Navbar 제목 현행화(2026-06-30 | d6e5f5e | [20260630]인사 문구 수정(2026-06-30 | b46d99b | [20260630]경력기술서 현행화(2026-06-30 | 4a5eba6 | [20260630]경력기술서 현행화(2026-06-30 | 56237fd | [20260630]경력기술서 현행화(2026-06-16 | ff75cbd | [20260513]Projects.jsx, ResumePrint.jsx 이력서 출력 페이지 현행화(2026-05-18 | d175c85 | [20260513]ResumePrint.jsx 이력서 출력 페이지 현행화(2026-05-13 | f80571c | [20260513]Home.jsx 파일 내용 수정(2026-05-13 | f1e03e9 | [20260513]임시 모바일 css 데탑 모드로 적용(2026-05-13 | 54cec7b | [20260513]Home.jsx 파일 내용 수정(2026-05-13 | 072477d | [20260513]ReadMe.md 현행화(2026-05-13 | 4d4a3fd | [20260513]Projects.jsx 항목 현행화 및 구조 수정(2026-04-12 | b1630de | [20260412]ResumePrint.jsx css 수정(2026-04-11 | 2a6e5e7 | [20260411]Home.jsx, tech-group 목록 수정(2026-03-31 | 1852130 | [20260331]모바일 웹, 데스크톱 웹 css 분리 적용(2026-03-31 | ed1025e | [20260331]README 업데이트(2026-03-31 | 2c0aad9 | [20260331] Architecture 페이지에 라우팅, 패키지, 커밋 이력 문서 추가(2026-03-30 | 4f1a6b6 | [20260330]이력서 출력페이지 추가, Awards, Licenses 내용 수정(2026-03-30 | 49f316d | [20260330]이력서 출력페이지 추가, Awards, Licenses 내용 수정(2026-03-26 | 54ce037 | [20260326]BrowserRouter 변경(2026-03-26 | 587c79e | [20260326]포트폴리오 사이트 개선 업로드(2025-06-27 | 7de9113 | 20250627 ReadMe UPD(2025-06-27 | c78b02a | Merge branch 'main' of https://github.com/seulgae/seulgae.github.io(2025-06-27 | 31c51da | SQLD Licenses img UPD(2025-06-26 | 55527d3 | Update README.md(2025-06-26 | e71057a | 20250625 ReadMe UPD(2025-06-04 | 740ff1b | 사이드 프로젝트 링크 수정(2025-06-04 | f83c5bf | 자격증 목록 수정(2025-05-28 | 1cff3e2 | 기술 스택 수정(2025-05-16 | 3659100 | 사이드 프로젝트 임시 활성화(2025-05-09 | a0a9eb9 | 포트폴리오 사이트 지원용 임시 백업(2025-05-08 | 203e6ce | 경력기술서 update(2025-05-07 | 546065f | 깃허브 포맷 후 커밋 테스트(2025-05-06 | bed0ad0 | 기술 스택 영역별 박스 추가(2025-05-05 | 250682e | 사이드 프로젝트 목록 최신화(2025-05-04 | 61a5e35 | 프로젝트 리스트 mainTasks 수정(2025-05-04 | 647a28d | 프로젝트 리스트 Kosa 경력 항목 추가(2025-05-02 | 67dcca7 | 사이드 프로젝트 메뉴 임시 비활성화(2025-04-29 | 8e319c4 | 사이드 프로젝트 목록 수정(2025-04-25 | d933763 | Merge branch 'main' of https://github.com/seulgae/seulgae.github.io(2025-04-25 | cc64bc1 | 교육 내용 패스트캠퍼스 이력 추가(2025-04-25 | 45f65fe | Update README.md(2025-04-24 | 868baf6 | 로고 사이즈 조절(2025-04-24 | 9cb4f2a | 로고 사이즈 조절(2025-04-24 | a2fc987 | 로고 사이즈 조절(2025-04-24 | 6b99eed | SideProject 로고 업데이트(2025-04-23 | 7ce0761 | sideProjects 메뉴 수정, 마이그레이션 전, 후 아이콘 추가(2025-04-22 | de35e99 | SideProject FM 프로젝트 JDK 수정(2025-04-21 | 64751d8 | 교육 목록 수정(2025-04-21 | 5876690 | 사이드 프로젝트 목록과 내용 수정(2025-04-20 | f46ab56 | 앞으로의 다짐 Home 내용 추가(2025-04-20 | 4effd64 | Education 목록 수정(2025-04-20 | fc402e9 | 교육 모달 레이어 이미지 효과 추가(2025-04-18 | 8dbab4e | 사이드 프로젝트 메뉴 활성화(2025-04-17 | e5d9e93 | 모바일 css 제거 viewport 태그 주석처리(2025-04-17 | d438497 | 모바일 버전 pc 사이즈에 맞는 css 반영(2025-04-17 | 1e978bc | css 폴더 구조 분리, 모바일 css 주석처리(2025-04-17 | 2a1fa2b | Blog 형태 소스로 다시 원복(2025-04-15 | 3fbc90b | css width 사이즈 100% 적용(2025-04-14 | 7abb3b8 | 각 메뉴별 애니메이션 효과 적용, Home 페이지 디자인 수정 및 적용(2025-04-14 | 744c6a0 | 사이드 프로젝트 목록 정리(2025-04-14 | 9eb2540 | 모달레이어 x버튼 위치 수정(2025-04-14 | e39dc59 | 수상경력 사진 수정(2025-04-14 | cceddf7 | 사이드바 메뉴 위치 수정, 애니메이션 수정, 버튼 위치 수정(2025-04-14 | 2ee7e7d | 모바일 슬라이드 기능 추가(2025-04-14 | 9c7e6d6 | 사이드바 버튼 제거, 스크롤 방식으로 변경(2025-04-14 | 271e562 | 모바일 css 적용(2025-04-14 | 0c8cd88 | 페이지별 CSS 사이즈 %로 변경(2025-04-14 | 6328ca0 | 프로젝트 일지 추가작성(2025-04-13 | a0505a2 | Side Project 메뉴 추가(2025-04-13 | 779acc4 | ProjectList STAR 양식으로 변경(2025-04-11 | 95e1ffc | ReadMe 내용 업데이트(2025-04-11 | a18b230 | ReadMe 정리(2025-04-10 | f369906 | Contact 디자인 적용(2025-04-09 | cd5b7f0 | 자격증 메뉴 추가(2025-04-09 | 000861d | ReadMe 프로젝트 일지 기록(2025-04-09 | 2c1e574 | Project Experience 메뉴 하위 세부항목 메뉴 추가(2025-04-09 | 250f4af | Router 속성 변경 -> HashRouter(2025-04-08 | e2b41ee | 사이드바 버튼 수정(2025-04-08 | c7ea94e | 포트폴리오 버전 V2 업로드(2025-04-08 | 808f362 | Navbar 사이드 수정(2025-04-08 | bbaeac9 | Navbar 사이드 수정(2025-04-08 | 8c9f6b0 | Navbar 사이드 수정(2025-04-08 | d98909f | Navbar 사이드 수정(2025-04-08 | e43d134 | Navbar 사이드 수정(2025-04-08 | 72a4de8 | Navbar 사이드 수정(2025-04-08 | a3b8b42 | Navbar 사이드 수정(2025-04-08 | da544c1 | Navbar 사이드 수정(2025-04-08 | 23a1c75 | Navbar 사이드 수정(2025-04-08 | d619506 | Navbar 사이드 수정(2025-04-07 | 2baa3ef | ReadMe Edit(2025-04-07 | 47719ca | ReadMe Edit(2025-04-07 | af8f40d | ReadMe Edit(2025-04-07 | 7dad5a3 | 포트폴리오 페이지 초안 디자인 V1(2025-04-07 | 5c04f97 | ReadMe Edit(2025-04-07 | 2a29d0a | HomePage Main Edit(2025-04-07 | 27e38c8 | ReadMe Edit(2025-04-07 | 72ccab5 | favicon.ico file Edit(2025-04-07 | 1ffd21a | package.json Edit(2025-04-07 | c18fe9a | first upload`.split(`(`),Gf=[{step:`01. Bootstrap`,title:`main.jsx`,body:`ReactDOM root를 생성하고 App을 마운트합니다. 전역 토큰(styles/tokens.css)과 기본 스타일도 여기서 연결됩니다.`},{step:`02. Application Shell`,title:`App.jsx`,body:`BrowserRouter, 상단 고정 헤더, 푸터, 페이지 진입 애니메이션을 관리합니다. 라우트 목록은 routes.js에서 가져옵니다.`},{step:`03. Routing Source`,title:`routes.js`,body:`경로와 상단 메뉴 구성의 단일 출처입니다. App(라우팅)과 Header(메뉴)가 같은 정의를 공유합니다.`},{step:`04. Content Data`,title:`data/* + posts/*`,body:`프로필·프로젝트·교육·수상·자격은 data/에, 블로그 글은 posts/의 마크다운 파일에만 존재합니다. 화면과 출력용 이력서가 같은 데이터를 참조합니다.`},{step:`05. Composition`,title:`components/ + pages/`,body:`components/는 재사용 UI(Header, Lightbox, CredentialList 등), pages/는 라우트 단위 화면 조립만 담당합니다.`},{step:`06. Deployment`,title:`Vite + GitHub Pages`,body:`vite build 결과물을 gh-pages로 배포합니다. package.json의 predeploy/deploy 스크립트가 배포 흐름을 담당합니다.`}],Kf=[{title:`새 프로젝트 추가`,body:`data/projects.js 배열에 객체 하나만 추가하면 됩니다. 상세 페이지(/projects/:slug), 사이드바 서브메뉴, 출력용 이력서가 모두 자동으로 반영됩니다.`},{title:`블로그 글 작성`,body:`src/posts/에 마크다운 파일을 추가하면 목록·상세·태그가 자동 반영됩니다. 파일 상단 frontmatter(title, date, tags, summary)만 지키면 됩니다. 자세한 방법은 블로그의 '이 블로그에 글 쓰는 방법' 글 참고.`},{title:`이력 내용 수정`,body:`교육·수상·자격은 data/education.js, data/awards.js, data/licenses.js에만 있습니다. 연락처·기술 스택·핵심 요약은 data/profile.js에 있습니다.`},{title:`디자인 조정`,body:`색·반경·그림자는 styles/tokens.css의 변수를 수정하면 전체에 반영됩니다. 화면별 레이아웃만 각 CSS 파일에서 다룹니다.`},{title:`경로 변경`,body:`routes.js의 paths를 수정하면 라우팅과 메뉴가 함께 바뀝니다. 이전 경로는 legacyRedirects에 남겨 두어 공유된 링크가 깨지지 않게 합니다.`},{title:`화면 대응 범위`,body:`3단계 적응형입니다. 데스크톱(960px 초과)은 상단 메뉴, 태블릿(769~960px)은 햄버거 패널, 모바일(768px 이하)은 앱 스타일 하단 탭바(BottomNav)로 이동합니다. 모바일은 여백·글자 밀도도 별도로 조정되며, 출력용 이력서는 A4 폭 유지 + 가로 스크롤로 열람합니다.`},{title:`배포 절차`,body:`npm run sync:history로 커밋 이력을 갱신하고, npm run build로 확인한 뒤 npm run deploy를 실행합니다.`}],qf=[{path:j.home,page:`Home`,purpose:`포트폴리오 첫 화면. 자기소개, 핵심 메시지, 기술 스택 요약을 제공합니다.`,userGuide:`처음 방문한 사용자는 여기서 전체 톤과 강점을 빠르게 파악하면 됩니다.`},{path:j.projects,page:`Projects`,purpose:`프로젝트 목록. 개요 카드에서 상세로 진입합니다.`,userGuide:`무엇을 먼저 볼지 여기서 고르면 됩니다. 상세에서 이전/다음 이동도 가능합니다.`},...Dn.map(e=>({path:j.project(e.slug),page:e.shortTitle||e.title,purpose:e.description,userGuide:`${e.period} / ${e.role}`})),{path:j.blog,page:`Blog`,purpose:`학습·작업 기록. src/posts/의 마크다운 파일에서 자동 생성됩니다.`,userGuide:`태그로 필터링할 수 있고, 글은 DB 없이 파일로 관리됩니다.`},{path:j.education,page:`Education`,purpose:`학위 및 교육 이력을 정리해둔 페이지입니다.`,userGuide:`기술 역량이 어떤 학습 경로를 통해 형성됐는지 확인할 수 있습니다.`},{path:j.awards,page:`Awards`,purpose:`수상 이력을 정리합니다.`,userGuide:`성과에 대한 외부 평가나 조직 내 인정 이력을 확인할 수 있습니다.`},{path:j.licenses,page:`Licenses`,purpose:`자격증 이력을 정리합니다.`,userGuide:`기술/직무 관련 공식 자격 보유 여부를 확인할 수 있습니다.`},{path:j.resume,page:`Resume Print`,purpose:`A4 2장 출력용 이력서입니다. 내용은 data/의 원본을 그대로 사용합니다.`,userGuide:`실제 제출용 문서를 보거나 인쇄할 때 사용합니다.`},{path:j.architecture,page:`Architecture`,purpose:`현재 프로젝트의 구조, 흐름, 의존성, 변경 이력을 설명하는 내부 문서 페이지입니다.`,userGuide:`이 프로젝트를 유지보수하거나 확장하려는 사람이 먼저 보는 안내서입니다.`}],Jf=[{name:`react / react-dom`,version:`^19.1.0`,category:`runtime`,purpose:`컴포넌트 기반 UI 렌더링과 DOM 마운트를 담당합니다.`,note:`전체 화면이 함수형 컴포넌트 기준으로 구성돼 있습니다.`},{name:`react-router-dom`,version:`^6.30.1`,category:`runtime`,purpose:`라우팅과 화면 전환 경로를 담당합니다.`,note:`routes.js의 경로 정의를 App.jsx가 Route로 펼쳐 사용합니다.`},{name:`react-markdown / remark-gfm`,version:`^10.1.0 / ^4.0.1`,category:`runtime`,purpose:`블로그 마크다운 본문을 렌더링합니다. GFM(표·체크리스트) 문법 지원.`,note:`BlogPostPage.jsx에서 사용됩니다. 페이지 전환은 CSS 애니메이션으로 대체되어 framer-motion은 제거했습니다.`},{name:`react-icons`,version:`^5.5.0`,category:`runtime`,purpose:`GitHub, 블로그 아이콘 등 UI 아이콘을 제공합니다.`,note:`Navbar.jsx에서 사용됩니다.`},{name:`vite / @vitejs/plugin-react`,version:`^8.0.3 / ^6.0.1`,category:`build`,purpose:`개발 서버와 프로덕션 번들 빌드, JSX 변환을 담당합니다.`,note:`dev/build/preview 스크립트가 모두 Vite 기준입니다.`},{name:`vitest / jsdom`,version:`^4.1.2 / ^26.0.0`,category:`test`,purpose:`테스트 러너와 브라우저 유사 DOM 환경을 제공합니다.`,note:`npm test는 vitest run으로 연결돼 있습니다.`},{name:`@testing-library/react · jest-dom · user-event`,version:`^16.3.0 / ^6.6.3 / ^13.5.0`,category:`test`,purpose:`컴포넌트 렌더링, DOM assertion, 사용자 인터랙션 검증 도구입니다.`,note:`라우팅·데이터 정합성 테스트에 사용합니다.`},{name:`gh-pages`,version:`^6.3.0`,category:`deploy`,purpose:`build 결과물을 GitHub Pages 브랜치로 배포합니다.`,note:`npm run deploy에서 사용됩니다.`}],Yf=[`src/`,`  main.jsx                    // 앱 진입점, 전역 스타일 연결`,`  App.jsx                     // 라우팅, 헤더/푸터 배치, 진입 애니메이션`,`  routes.js                   // 경로 + 메뉴 정의 (단일 출처)`,`  index.css                   // 기본 스타일`,`  data/                       // 콘텐츠 단일 출처`,`    profile.js                // 인물 정보, 연락처, 기술 스택`,`    projects.js               // 프로젝트 경력 (목록·상세·이력서 공용)`,`    education.js / awards.js / licenses.js`,`    commitHistory.js          // 자동 생성 (npm run sync:history)`,`  posts/                      // 블로그 글 (마크다운 파일 = 글 1건)`,`    how-to-write-posts.md`,`    portfolio-refactoring.md`,`  lib/posts.js                // posts/ 로더 + frontmatter 파서`,`  components/                 // 재사용 UI`,`    Header.jsx / Footer.jsx   // 상단 고정 메뉴, 연락처 푸터`,`    BottomNav.jsx             // 모바일 전용 하단 탭바 (+더보기 시트)`,`    ProjectDetail.jsx         // 프로젝트 상세 렌더러 (+이전/다음 이동)`,`    CredentialList.jsx        // 수상·자격 공용 카드 목록`,`    Lightbox.jsx / ZoomableImage.jsx / ExternalLinks.jsx`,`  pages/                      // 라우트 단위 화면`,`    HomePage.jsx`,`    ProjectsIndexPage.jsx     // /projects 목록`,`    ProjectDetailPage.jsx     // /projects/:slug 단일 처리`,`    BlogListPage.jsx / BlogPostPage.jsx`,`    EducationPage.jsx / AwardsPage.jsx / LicensesPage.jsx`,`    ResumePage.jsx / ArchitecturePage.jsx / NotFoundPage.jsx`,`  hooks/useLightbox.js`,`  utils/text.js               // 제목 분리, 정적 파일 경로`,`  styles/`,`    tokens.css                // 색·반경·그림자·폰트 단일 출처 (클린 라이트)`,`    pageShell.css             // 페이지 공통 폭·제목·뒤로가기`,`    header.css / footer.css / bottomNav.css / blog.css / projectsIndex.css`,`    lightbox.css / externalLinks.css / credentials.css`,`    home.css / projectDetail.css / education.css`,`    architecture.css / resume.css / notFound.css`,`scripts/`,`  generate-commit-history.mjs // git log -> data/commitHistory.js`],Xf=[{date:`2026-08`,title:`클린 라이트 개편 + 블로그 추가`,body:`숨은 사이드바를 상단 고정 헤더로 교체하고 모바일 반응형을 적용했습니다. 마크다운 파일 기반 블로그(/blog)와 프로젝트 목록(/projects)을 추가했습니다.`},{date:`2026-08`,title:`구조 리팩터링`,body:`콘텐츠를 data/로 분리해 웹 화면과 출력용 이력서의 내용 중복을 제거했고, 프로젝트별 페이지 파일을 /projects/:slug 단일 라우트로 통합했습니다. 미사용 반응형 코드와 중복 CSS도 함께 정리했습니다.`},{date:`2026-03`,title:`Resume Print와 라우팅 정리`,body:`출력용 이력서 페이지가 추가됐고 BrowserRouter 기반으로 라우팅 구성이 정리됐습니다.`},{date:`2025-06`,title:`이력 최신화`,body:`SQLD 자격증, README, 포트폴리오 소개 내용이 갱신됐습니다.`},{date:`2025-04`,title:`UI 구조 확장 집중`,body:`Navbar, Project Experience 하위 메뉴, 모달, 애니메이션, Home 디자인이 집중적으로 발전했습니다.`}];function Zf(){return(0,N.jsxs)(`div`,{className:`page-shell architecture-page`,children:[(0,N.jsxs)(`section`,{className:`architecture-hero`,children:[(0,N.jsx)(`span`,{className:`architecture-eyebrow`,children:`Project Manual`}),(0,N.jsx)(`h1`,{children:`Portfolio Architecture & Maintenance Guide`}),(0,N.jsx)(`p`,{children:`이 페이지는 현재 포트폴리오 프로젝트를 유지보수하거나 확장하려는 사람이 먼저 보는 문서입니다. 화면 구조, 라우팅, 파일 역할, 패키지 버전, 사용 가이드, 변경 이력을 한 곳에서 확인할 수 있도록 정리했습니다.`})]}),(0,N.jsx)(`section`,{className:`architecture-map`,children:Gf.slice(0,4).map(e=>(0,N.jsxs)(`div`,{className:`map-column`,children:[(0,N.jsx)(`span`,{className:`architecture-index`,children:e.step}),(0,N.jsxs)(`div`,{className:`map-box`,children:[(0,N.jsx)(`strong`,{children:e.title}),(0,N.jsx)(`span`,{children:e.body})]})]},e.step))}),(0,N.jsxs)(`section`,{className:`architecture-shell`,children:[(0,N.jsxs)(`div`,{className:`architecture-header`,children:[(0,N.jsx)(`span`,{className:`architecture-index`,children:`Overview`}),(0,N.jsx)(`h2`,{children:`아키텍처 레벨 단계`})]}),(0,N.jsx)(`div`,{className:`architecture-grid architecture-grid-wide`,children:Gf.map(e=>(0,N.jsxs)(`article`,{className:`architecture-card`,children:[(0,N.jsx)(`span`,{className:`architecture-card-step`,children:e.step}),(0,N.jsx)(`h3`,{children:e.title}),(0,N.jsx)(`p`,{children:e.body})]},e.step))})]}),(0,N.jsxs)(`section`,{className:`architecture-shell`,children:[(0,N.jsxs)(`div`,{className:`architecture-header`,children:[(0,N.jsx)(`span`,{className:`architecture-index`,children:`Guide`}),(0,N.jsx)(`h2`,{children:`사용자/운영자 가이드`})]}),(0,N.jsx)(`div`,{className:`architecture-grid`,children:Kf.map(e=>(0,N.jsxs)(`article`,{className:`architecture-card`,children:[(0,N.jsx)(`h3`,{children:e.title}),(0,N.jsx)(`p`,{children:e.body})]},e.title))})]}),(0,N.jsxs)(`section`,{className:`architecture-shell`,children:[(0,N.jsxs)(`div`,{className:`architecture-header`,children:[(0,N.jsx)(`span`,{className:`architecture-index`,children:`Routes`}),(0,N.jsx)(`h2`,{children:`페이지 구조와 사용 흐름`})]}),(0,N.jsx)(`div`,{className:`route-list`,children:qf.map(e=>(0,N.jsxs)(`article`,{className:`route-card`,children:[(0,N.jsxs)(`div`,{className:`route-head`,children:[(0,N.jsx)(`strong`,{children:e.page}),(0,N.jsx)(`span`,{children:e.path})]}),(0,N.jsx)(`p`,{children:e.purpose}),(0,N.jsx)(`p`,{className:`route-guide`,children:e.userGuide})]},e.path))})]}),(0,N.jsxs)(`section`,{className:`architecture-shell`,children:[(0,N.jsxs)(`div`,{className:`architecture-header`,children:[(0,N.jsx)(`span`,{className:`architecture-index`,children:`Legacy`}),(0,N.jsx)(`h2`,{children:`이전 경로 리다이렉트`})]}),(0,N.jsx)(`p`,{className:`architecture-note`,children:`이미 공유된 옛 주소로 접속해도 새 경로로 자동 이동합니다.`}),(0,N.jsx)(`pre`,{className:`architecture-code`,children:(0,N.jsx)(`code`,{children:Ut.map(e=>`${e.from}  ->  ${e.to}`).join(`
`)})})]}),(0,N.jsxs)(`section`,{className:`architecture-shell`,children:[(0,N.jsxs)(`div`,{className:`architecture-header`,children:[(0,N.jsx)(`span`,{className:`architecture-index`,children:`Packages`}),(0,N.jsx)(`h2`,{children:`package.json 라이브러리와 버전 설명`})]}),(0,N.jsx)(`div`,{className:`package-grid package-grid-wide`,children:Jf.map(e=>(0,N.jsxs)(`article`,{className:`package-card`,children:[(0,N.jsxs)(`div`,{className:`package-meta`,children:[(0,N.jsx)(`strong`,{children:e.name}),(0,N.jsx)(`span`,{children:e.version})]}),(0,N.jsx)(`em`,{children:e.category}),(0,N.jsx)(`p`,{children:e.purpose}),(0,N.jsx)(`p`,{className:`package-note`,children:e.note})]},e.name))})]}),(0,N.jsxs)(`section`,{className:`architecture-shell`,children:[(0,N.jsxs)(`div`,{className:`architecture-header`,children:[(0,N.jsx)(`span`,{className:`architecture-index`,children:`Structure`}),(0,N.jsx)(`h2`,{children:`실제 디렉터리 구조`})]}),(0,N.jsx)(`pre`,{className:`architecture-code`,children:(0,N.jsx)(`code`,{children:Yf.join(`
`)})})]}),(0,N.jsxs)(`section`,{className:`architecture-shell`,children:[(0,N.jsxs)(`div`,{className:`architecture-header`,children:[(0,N.jsx)(`span`,{className:`architecture-index`,children:`History`}),(0,N.jsx)(`h2`,{children:`변경 이력 요약`})]}),(0,N.jsx)(`div`,{className:`timeline-list`,children:Xf.map(e=>(0,N.jsxs)(`article`,{className:`timeline-card`,children:[(0,N.jsx)(`span`,{children:e.date}),(0,N.jsx)(`h3`,{children:e.title}),(0,N.jsx)(`p`,{children:e.body})]},`${e.date}-${e.title}`))})]}),(0,N.jsxs)(`section`,{className:`architecture-shell`,children:[(0,N.jsxs)(`div`,{className:`architecture-header`,children:[(0,N.jsx)(`span`,{className:`architecture-index`,children:`Commits`}),(0,N.jsx)(`h2`,{children:`전체 커밋 리스트`})]}),(0,N.jsxs)(`p`,{className:`architecture-note`,children:[`npm run sync:history로 git log에서 자동 생성됩니다. (총 `,Wf.length,`건)`]}),(0,N.jsx)(`pre`,{className:`architecture-code architecture-code-tall`,children:(0,N.jsx)(`code`,{children:Wf.join(`
`)})})]})]})}var Qf=2,$f=[Dn.slice(0,Qf),Dn.slice(Qf)];function ep({project:e}){return(0,N.jsxs)(`article`,{className:`resume-project-entry`,children:[(0,N.jsxs)(`div`,{className:`resume-project-title-row`,children:[(0,N.jsx)(`h3`,{children:e.title}),(0,N.jsxs)(`span`,{children:[e.period,` / `,e.role]})]}),(0,N.jsx)(`table`,{className:`resume-table resume-project-table`,children:(0,N.jsxs)(`tbody`,{children:[(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{scope:`row`,children:`주요 업무`}),(0,N.jsx)(`td`,{children:(0,N.jsx)(`ul`,{className:`resume-doc-list compact`,children:e.mainTasks.map(e=>(0,N.jsx)(`li`,{children:e},e))})})]}),(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{scope:`row`,children:`주요 성과`}),(0,N.jsx)(`td`,{children:(0,N.jsx)(`ul`,{className:`resume-doc-list compact`,children:e.achievements.map(e=>(0,N.jsx)(`li`,{children:e.result},e.title))})})]})]})})]})}function tp({rows:e}){return(0,N.jsx)(`table`,{className:`resume-table`,children:(0,N.jsx)(`tbody`,{children:e.map(([e,t])=>(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{scope:`row`,children:e}),(0,N.jsx)(`td`,{children:t})]},e))})})}function np(){let e=[[`이름`,M.name],[`생년월일`,Gt()],[`직무`,M.role],[`경력`,M.careerSummary],[`핵심 키워드`,M.keywords],[`연락처`,`${M.phone} / ${M.email}`],[`링크`,`${M.links.github.replace(/^https?:\/\//,``)} / ${M.links.blog.replace(/^https?:\/\//,``).replace(/\/$/,``)}`]],t=M.techStack.map(e=>[e.label,e.items.join(`, `)]);return(0,N.jsxs)(`div`,{className:`resume-print-page`,children:[(0,N.jsxs)(`div`,{className:`resume-print-toolbar`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`strong`,{children:`출력용 이력서`}),(0,N.jsx)(`span`,{children:`Ctrl+P 후 A4, 배율 기본값, 머리글/바닥글 끔 기준으로 2장 출력에 맞춰 구성했습니다.`})]}),(0,N.jsx)(`button`,{type:`button`,className:`resume-print-button`,onClick:()=>window.print(),children:`인쇄하기`})]}),(0,N.jsxs)(`section`,{className:`resume-paper`,children:[(0,N.jsxs)(`header`,{className:`resume-doc-header`,children:[(0,N.jsxs)(`div`,{children:[(0,N.jsx)(`p`,{className:`resume-doc-eyebrow`,children:`Printable Resume`}),(0,N.jsx)(`h1`,{children:M.name}),(0,N.jsx)(`p`,{className:`resume-doc-role`,children:M.role})]}),(0,N.jsx)(`p`,{className:`resume-doc-intro`,children:M.intro})]}),(0,N.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,N.jsx)(`h2`,{children:`기본 정보`}),(0,N.jsx)(tp,{rows:e})]}),(0,N.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,N.jsx)(`h2`,{children:`핵심 요약`}),(0,N.jsx)(`ul`,{className:`resume-doc-list`,children:M.strengths.map(e=>(0,N.jsx)(`li`,{children:e},e))})]}),(0,N.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,N.jsx)(`h2`,{children:`경력 기술서`}),$f[0].map(e=>(0,N.jsx)(ep,{project:e},e.slug))]})]}),(0,N.jsxs)(`section`,{className:`resume-paper page-break`,children:[$f[1].length?(0,N.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,N.jsx)(`h2`,{children:`경력 기술서`}),$f[1].map(e=>(0,N.jsx)(ep,{project:e},e.slug))]}):null,(0,N.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,N.jsx)(`h2`,{children:`기술 스택`}),(0,N.jsx)(tp,{rows:t})]}),(0,N.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,N.jsx)(`h2`,{children:`교육`}),(0,N.jsxs)(`table`,{className:`resume-table`,children:[(0,N.jsx)(`thead`,{children:(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{children:`과정`}),(0,N.jsx)(`th`,{children:`기관`}),(0,N.jsx)(`th`,{children:`기간`})]})}),(0,N.jsx)(`tbody`,{children:Lf.map(e=>(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{scope:`row`,children:e.degree}),(0,N.jsx)(`td`,{children:e.school}),(0,N.jsx)(`td`,{children:e.period})]},e.id))})]})]}),(0,N.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,N.jsx)(`h2`,{children:`수상`}),(0,N.jsxs)(`table`,{className:`resume-table`,children:[(0,N.jsx)(`thead`,{children:(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{children:`항목`}),(0,N.jsx)(`th`,{children:`일자`})]})}),(0,N.jsx)(`tbody`,{children:Bf.map(e=>(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{scope:`row`,children:e.title}),(0,N.jsx)(`td`,{children:e.date})]},e.id))})]})]}),(0,N.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,N.jsx)(`h2`,{children:`자격`}),(0,N.jsxs)(`table`,{className:`resume-table`,children:[(0,N.jsx)(`thead`,{children:(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{children:`항목`}),(0,N.jsx)(`th`,{children:`취득일`})]})}),(0,N.jsx)(`tbody`,{children:Hf.map(e=>(0,N.jsxs)(`tr`,{children:[(0,N.jsx)(`th`,{scope:`row`,children:e.title}),(0,N.jsx)(`td`,{children:e.date})]},e.id))})]})]})]})]})}var rp=[{path:j.home,element:(0,N.jsx)(En,{})},{path:j.projects,element:(0,N.jsx)(On,{})},{path:`${j.projects}/:slug`,element:(0,N.jsx)(Nn,{})},{path:j.blog,element:(0,N.jsx)(sr,{})},{path:`${j.blog}/:slug`,element:(0,N.jsx)(Mf,{})},{path:j.education,element:(0,N.jsx)(Rf,{})},{path:j.awards,element:(0,N.jsx)(Vf,{})},{path:j.licenses,element:(0,N.jsx)(Uf,{})},{path:j.resume,element:(0,N.jsx)(np,{})},{path:j.architecture,element:(0,N.jsx)(Zf,{})}];function ip(){return(0,N.jsx)(Mt,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:(0,N.jsx)(ap,{})})}function ap(){let e=Ke();return(0,v.useEffect)(()=>{window.scrollTo(0,0)},[e.pathname]),(0,N.jsxs)(`div`,{className:`app-shell`,children:[(0,N.jsx)(Yt,{}),(0,N.jsx)(`main`,{className:`app-main page-enter`,children:(0,N.jsxs)(bt,{location:e,children:[rp.map(e=>(0,N.jsx)(vt,{path:e.path,element:e.element},e.path)),Ut.map(e=>(0,N.jsx)(vt,{path:e.from,element:(0,N.jsx)(_t,{to:e.to,replace:!0})},e.from)),(0,N.jsx)(vt,{path:`*`,element:(0,N.jsx)(Mn,{})})]})},e.pathname),(0,N.jsx)(bn,{}),(0,N.jsx)(Cn,{})]})}y.createRoot(document.getElementById(`root`)).render((0,N.jsx)(v.StrictMode,{children:(0,N.jsx)(ip,{})}));