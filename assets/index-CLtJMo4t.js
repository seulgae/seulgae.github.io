var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,a)=>(a=n==null?{}:e(i(n)),c(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.iterator;function p(e){return typeof e!=`object`||!e?null:(e=f&&e[f]||e[`@@iterator`],typeof e==`function`?e:null)}var m={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h=Object.assign,g={};function _(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||m}_.prototype.isReactComponent={},_.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},_.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function v(){}v.prototype=_.prototype;function y(e,t,n){this.props=e,this.context=t,this.refs=g,this.updater=n||m}var b=y.prototype=new v;b.constructor=y,h(b,_.prototype),b.isPureReactComponent=!0;var x=Array.isArray,S={H:null,A:null,T:null,S:null,V:null},C=Object.prototype.hasOwnProperty;function ee(e,n,r,i,a,o){return r=o.ref,{$$typeof:t,type:e,key:n,ref:r===void 0?null:r,props:o}}function w(e,t){return ee(e.type,t,void 0,void 0,void 0,e.props)}function T(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function te(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var E=/\/+/g;function ne(e,t){return typeof e==`object`&&e&&e.key!=null?te(``+e.key):t.toString(36)}function re(){}function ie(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(re,re):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function ae(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,ae(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ne(e,0):a,x(o)?(i=``,c!=null&&(i=c.replace(E,`$&/`)+`/`),ae(o,r,i,``,function(e){return e})):o!=null&&(T(o)&&(o=w(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(E,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(x(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ne(a,u),c+=ae(a,r,i,s,o);else if(u=p(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ne(a,u++),c+=ae(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return ae(ie(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function oe(e,t,n){if(e==null)return e;var r=[],i=0;return ae(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function se(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ce=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function D(){}e.Children={map:oe,forEach:function(e,t,n){oe(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return oe(e,function(){t++}),t},toArray:function(e){return oe(e,function(e){return e})||[]},only:function(e){if(!T(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}},e.Component=_,e.Fragment=r,e.Profiler=a,e.PureComponent=y,e.StrictMode=i,e.Suspense=l,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=S,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return S.H.useMemoCache(e)}},e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=h({},e.props),i=e.key,a=void 0;if(t!=null)for(o in t.ref!==void 0&&(a=void 0),t.key!==void 0&&(i=``+t.key),t)!C.call(t,o)||o===`key`||o===`__self`||o===`__source`||o===`ref`&&t.ref===void 0||(r[o]=t[o]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];r.children=s}return ee(e.type,i,void 0,void 0,a,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)C.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return ee(e,a,void 0,void 0,null,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=T,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:se}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=function(e){var t=S.T,n={};S.T=n;try{var r=e(),i=S.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(D,ce)}catch(e){ce(e)}finally{S.T=t}},e.unstable_useCacheRefresh=function(){return S.H.useCacheRefresh()},e.use=function(e){return S.H.use(e)},e.useActionState=function(e,t,n){return S.H.useActionState(e,t,n)},e.useCallback=function(e,t){return S.H.useCallback(e,t)},e.useContext=function(e){return S.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return S.H.useDeferredValue(e,t)},e.useEffect=function(e,t,n){var r=S.H;if(typeof n==`function`)throw Error(`useEffect CRUD overload is not enabled in this build of React.`);return r.useEffect(e,t)},e.useId=function(){return S.H.useId()},e.useImperativeHandle=function(e,t,n){return S.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return S.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return S.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return S.H.useMemo(e,t)},e.useOptimistic=function(e,t){return S.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return S.H.useReducer(e,t,n)},e.useRef=function(e){return S.H.useRef(e)},e.useState=function(e){return S.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return S.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return S.H.useTransition()},e.version=`19.1.0`})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m)if(n(c)!==null)m=!0,S||(S=!0,E());else{var t=n(l);t!==null&&ie(x,t.startTime-e)}}var S=!1,C=-1,ee=5,w=-1;function T(){return g?!0:!(e.unstable_now()-w<ee)}function te(){if(g=!1,S){var t=e.unstable_now();w=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&T());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ie(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?E():S=!1}}}var E;if(typeof y==`function`)E=function(){y(te)};else if(typeof MessageChannel<`u`){var ne=new MessageChannel,re=ne.port2;ne.port1.onmessage=te,E=function(){re.postMessage(null)}}else E=function(){_(te,0)};function ie(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):ee=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ie(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,E()))),r},e.unstable_shouldYield=T,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=d();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`);function o(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:``+r,children:e,containerInfo:t,implementation:n}}var s=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function c(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return o(e,t,null,r)},e.flushSync=function(e){var t=s.T,n=i.p;try{if(s.T=null,i.p=2,e)return e()}finally{s.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`)if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=c(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0})}}else t??i.d.M(e)},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=c(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`)if(t){var n=c(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0})}else i.d.m(e)},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return s.H.useFormState(e,t,n)},e.useFormStatus=function(){return s.H.useHostTransitionStatus()},e.version=`19.1.0`})),h=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=p(),n=d(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(o(e)!==e)throw Error(i(188))}function l(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return c(a),e;if(s===r)return c(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var l=!1,u=a.child;u;){if(u===n){l=!0,n=a,r=s;break}if(u===r){l=!0,r=a,n=s;break}u=u.sibling}if(!l){for(u=s.child;u;){if(u===n){l=!0,n=s,r=a;break}if(u===r){l=!0,r=s,n=a;break}u=u.sibling}if(!l)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function u(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=u(e),t!==null)return t;e=e.sibling}return null}var f=Object.assign,m=Symbol.for(`react.element`),g=Symbol.for(`react.transitional.element`),_=Symbol.for(`react.portal`),v=Symbol.for(`react.fragment`),y=Symbol.for(`react.strict_mode`),b=Symbol.for(`react.profiler`),x=Symbol.for(`react.provider`),S=Symbol.for(`react.consumer`),C=Symbol.for(`react.context`),ee=Symbol.for(`react.forward_ref`),w=Symbol.for(`react.suspense`),T=Symbol.for(`react.suspense_list`),te=Symbol.for(`react.memo`),E=Symbol.for(`react.lazy`),ne=Symbol.for(`react.activity`),re=Symbol.for(`react.memo_cache_sentinel`),ie=Symbol.iterator;function ae(e){return typeof e!=`object`||!e?null:(e=ie&&e[ie]||e[`@@iterator`],typeof e==`function`?e:null)}var oe=Symbol.for(`react.client.reference`);function se(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===oe?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case v:return`Fragment`;case b:return`Profiler`;case y:return`StrictMode`;case w:return`Suspense`;case T:return`SuspenseList`;case ne:return`Activity`}if(typeof e==`object`)switch(e.$$typeof){case _:return`Portal`;case C:return(e.displayName||`Context`)+`.Provider`;case S:return(e._context.displayName||`Context`)+`.Consumer`;case ee:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case te:return t=e.displayName||null,t===null?se(e.type)||`Memo`:t;case E:t=e._payload,e=e._init;try{return se(e(t))}catch{}}return null}var ce=Array.isArray,D=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,O=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,le={pending:!1,data:null,method:null,action:null},ue=[],de=-1;function fe(e){return{current:e}}function pe(e){0>de||(e.current=ue[de],ue[de]=null,de--)}function k(e,t){de++,ue[de]=e.current,e.current=t}var me=fe(null),he=fe(null),ge=fe(null),_e=fe(null);function ve(e,t){switch(k(ge,t),k(he,e),k(me,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Dd(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Dd(t),e=Od(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}pe(me),k(me,e)}function ye(){pe(me),pe(he),pe(ge)}function be(e){e.memoizedState!==null&&k(_e,e);var t=me.current,n=Od(t,e.type);t!==n&&(k(he,e),k(me,n))}function xe(e){he.current===e&&(pe(me),pe(he)),_e.current===e&&(pe(_e),Ff._currentValue=le)}var Se=Object.prototype.hasOwnProperty,Ce=t.unstable_scheduleCallback,we=t.unstable_cancelCallback,Te=t.unstable_shouldYield,Ee=t.unstable_requestPaint,De=t.unstable_now,Oe=t.unstable_getCurrentPriorityLevel,ke=t.unstable_ImmediatePriority,Ae=t.unstable_UserBlockingPriority,je=t.unstable_NormalPriority,Me=t.unstable_LowPriority,Ne=t.unstable_IdlePriority,Pe=t.log,Fe=t.unstable_setDisableYieldValue,Ie=null,Le=null;function Re(e){if(typeof Pe==`function`&&Fe(e),Le&&typeof Le.setStrictMode==`function`)try{Le.setStrictMode(Ie,e)}catch{}}var ze=Math.clz32?Math.clz32:He,Be=Math.log,Ve=Math.LN2;function He(e){return e>>>=0,e===0?32:31-(Be(e)/Ve|0)|0}var Ue=256,We=4194304;function Ge(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ke(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Ge(n))):i=Ge(o):i=Ge(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Ge(n))):i=Ge(o)):i=Ge(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function qe(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Je(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ye(){var e=Ue;return Ue<<=1,!(Ue&4194048)&&(Ue=256),e}function Xe(){var e=We;return We<<=1,!(We&62914560)&&(We=4194304),e}function Ze(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Qe(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function $e(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-ze(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&et(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function et(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-ze(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&4194090}function tt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-ze(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function nt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function rt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function it(){var e=O.p;return e===0?(e=window.event,e===void 0?32:Xf(e.type)):e}function at(e,t){var n=O.p;try{return O.p=e,t()}finally{O.p=n}}var ot=Math.random().toString(36).slice(2),st=`__reactFiber$`+ot,ct=`__reactProps$`+ot,lt=`__reactContainer$`+ot,ut=`__reactEvents$`+ot,dt=`__reactListeners$`+ot,ft=`__reactHandles$`+ot,pt=`__reactResources$`+ot,mt=`__reactMarker$`+ot;function ht(e){delete e[st],delete e[ct],delete e[ut],delete e[dt],delete e[ft]}function gt(e){var t=e[st];if(t)return t;for(var n=e.parentNode;n;){if(t=n[lt]||n[st]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Kd(e);e!==null;){if(n=e[st])return n;e=Kd(e)}return t}e=n,n=e.parentNode}return null}function _t(e){if(e=e[st]||e[lt]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function vt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function yt(e){var t=e[pt];return t||=e[pt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function bt(e){e[mt]=!0}var xt=new Set,St={};function Ct(e,t){wt(e,t),wt(e+`Capture`,t)}function wt(e,t){for(St[e]=t,e=0;e<t.length;e++)xt.add(t[e])}var Tt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Et={},Dt={};function Ot(e){return Se.call(Dt,e)?!0:Se.call(Et,e)?!1:Tt.test(e)?Dt[e]=!0:(Et[e]=!0,!1)}function kt(e,t,n){if(Ot(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,``+n)}}function At(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,``+n)}}function jt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,``+r)}}var Mt,Nt;function Pt(e){if(Mt===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Mt=t&&t[1]||``,Nt=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Mt+e+Nt}var Ft=!1;function It(e,t){if(!e||Ft)return``;Ft=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,`props`,{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}e.call(n.prototype)}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,`name`,{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ft=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Pt(n):``}function Lt(e){switch(e.tag){case 26:case 27:case 5:return Pt(e.type);case 16:return Pt(`Lazy`);case 13:return Pt(`Suspense`);case 19:return Pt(`SuspenseList`);case 0:case 15:return It(e.type,!1);case 11:return It(e.type.render,!1);case 1:return It(e.type,!0);case 31:return Pt(`Activity`);default:return``}}function Rt(e){try{var t=``;do t+=Lt(e),e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}function zt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Bt(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Vt(e){var t=Bt(e)?`checked`:`value`,n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=``+e[t];if(!e.hasOwnProperty(t)&&n!==void 0&&typeof n.get==`function`&&typeof n.set==`function`){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ht(e){e._valueTracker||=Vt(e)}function A(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Bt(e)?e.checked?`true`:`false`:e.value),e=r,e===n?!1:(t.setValue(e),!0)}function Ut(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}var Wt=/[\n"\\]/g;function j(e){return e.replace(Wt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Gt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+zt(t)):e.value!==``+zt(t)&&(e.value=``+zt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):qt(e,o,zt(n)):qt(e,o,zt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+zt(s):e.removeAttribute(`name`)}function Kt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null))return;n=n==null?``:``+zt(n),t=t==null?n:``+zt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o)}function qt(e,t,n){t===`number`&&Ut(e.ownerDocument)===e||e.defaultValue===``+n||(e.defaultValue=``+n)}function Jt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+zt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Yt(e,t,n){if(t!=null&&(t=``+zt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+zt(n)}function M(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(ce(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=zt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r)}function Xt(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Zt=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function Qt(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||Zt.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function $t(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&Qt(e,a,r)}else for(var o in t)t.hasOwnProperty(o)&&Qt(e,o,t[o])}function en(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var tn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),nn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function rn(e){return nn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}var an=null;function on(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var sn=null,cn=null;function ln(e){var t=_t(e);if(t&&(e=t.stateNode)){var n=e[ct]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Gt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+j(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[ct]||null;if(!a)throw Error(i(90));Gt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&A(r)}break a;case`textarea`:Yt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Jt(e,!!n.multiple,t,!1)}}}var un=!1;function dn(e,t,n){if(un)return e(t,n);un=!0;try{return e(t)}finally{if(un=!1,(sn!==null||cn!==null)&&(cu(),sn&&(t=sn,e=cn,cn=sn=null,ln(t),e)))for(t=0;t<e.length;t++)ln(e[t])}}function fn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[ct]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=!(e===`button`||e===`input`||e===`select`||e===`textarea`)),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var pn=!(typeof window>`u`||window.document===void 0||window.document.createElement===void 0),mn=!1;if(pn)try{var hn={};Object.defineProperty(hn,`passive`,{get:function(){mn=!0}}),window.addEventListener(`test`,hn,hn),window.removeEventListener(`test`,hn,hn)}catch{mn=!1}var gn=null,_n=null,vn=null;function yn(){if(vn)return vn;var e,t=_n,n=t.length,r,i=`value`in gn?gn.value:gn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return vn=i.slice(e,1<r?1-r:void 0)}function bn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function xn(){return!0}function Sn(){return!1}function Cn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?xn:Sn,this.isPropagationStopped=Sn,this}return f(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=xn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=xn)},persist:function(){},isPersistent:xn}),t}var wn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Tn=Cn(wn),En=f({},wn,{view:0,detail:0}),Dn=Cn(En),On,kn,N,P=f({},En,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Bn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==N&&(N&&e.type===`mousemove`?(On=e.screenX-N.screenX,kn=e.screenY-N.screenY):kn=On=0,N=e),On)},movementY:function(e){return`movementY`in e?e.movementY:kn}}),An=Cn(P),jn=Cn(f({},P,{dataTransfer:0})),Mn=Cn(f({},En,{relatedTarget:0})),Nn=Cn(f({},wn,{animationName:0,elapsedTime:0,pseudoElement:0})),Pn=Cn(f({},wn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Fn=Cn(f({},wn,{data:0})),In={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Ln={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Rn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function zn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Rn[e])?!!t[e]:!1}function Bn(){return zn}var Vn=Cn(f({},En,{key:function(e){if(e.key){var t=In[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=bn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Ln[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Bn,charCode:function(e){return e.type===`keypress`?bn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?bn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),Hn=Cn(f({},P,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Un=Cn(f({},En,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Bn})),Wn=Cn(f({},wn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Gn=Cn(f({},P,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Kn=Cn(f({},wn,{newState:0,oldState:0})),qn=[9,13,27,32],Jn=pn&&`CompositionEvent`in window,Yn=null;pn&&`documentMode`in document&&(Yn=document.documentMode);var Xn=pn&&`TextEvent`in window&&!Yn,Zn=pn&&(!Jn||Yn&&8<Yn&&11>=Yn),Qn=` `,$n=!1;function er(e,t){switch(e){case`keyup`:return qn.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function tr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var nr=!1;function rr(e,t){switch(e){case`compositionend`:return tr(t);case`keypress`:return t.which===32?($n=!0,Qn):null;case`textInput`:return e=t.data,e===Qn&&$n?null:e;default:return null}}function ir(e,t){if(nr)return e===`compositionend`||!Jn&&er(e,t)?(e=yn(),vn=_n=gn=null,nr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return Zn&&t.locale!==`ko`?null:t.data;default:return null}}var ar={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function or(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!ar[e.type]:t===`textarea`}function sr(e,t,n,r){sn?cn?cn.push(r):cn=[r]:sn=r,t=pd(t,`onChange`),0<t.length&&(n=new Tn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var cr=null,lr=null;function ur(e){od(e,0)}function dr(e){if(A(vt(e)))return e}function fr(e,t){if(e===`change`)return t}var pr=!1;if(pn){var mr;if(pn){var hr=`oninput`in document;if(!hr){var gr=document.createElement(`div`);gr.setAttribute(`oninput`,`return;`),hr=typeof gr.oninput==`function`}mr=hr}else mr=!1;pr=mr&&(!document.documentMode||9<document.documentMode)}function _r(){cr&&(cr.detachEvent(`onpropertychange`,vr),lr=cr=null)}function vr(e){if(e.propertyName===`value`&&dr(lr)){var t=[];sr(t,lr,e,on(e)),dn(ur,t)}}function yr(e,t,n){e===`focusin`?(_r(),cr=t,lr=n,cr.attachEvent(`onpropertychange`,vr)):e===`focusout`&&_r()}function br(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return dr(lr)}function xr(e,t){if(e===`click`)return dr(t)}function Sr(e,t){if(e===`input`||e===`change`)return dr(t)}function Cr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var wr=typeof Object.is==`function`?Object.is:Cr;function Tr(e,t){if(wr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Se.call(t,i)||!wr(e[i],t[i]))return!1}return!0}function Er(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Dr(e,t){var n=Er(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Er(n)}}function Or(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Or(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function kr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ut(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ut(e.document)}return t}function Ar(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var F=pn&&`documentMode`in document&&11>=document.documentMode,I=null,jr=null,L=null,R=!1;function Mr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;R||I==null||I!==Ut(r)||(r=I,`selectionStart`in r&&Ar(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),L&&Tr(L,r)||(L=r,r=pd(jr,`onSelect`),0<r.length&&(t=new Tn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=I)))}function Nr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Pr={animationend:Nr(`Animation`,`AnimationEnd`),animationiteration:Nr(`Animation`,`AnimationIteration`),animationstart:Nr(`Animation`,`AnimationStart`),transitionrun:Nr(`Transition`,`TransitionRun`),transitionstart:Nr(`Transition`,`TransitionStart`),transitioncancel:Nr(`Transition`,`TransitionCancel`),transitionend:Nr(`Transition`,`TransitionEnd`)},Fr={},Ir={};pn&&(Ir=document.createElement(`div`).style,`AnimationEvent`in window||(delete Pr.animationend.animation,delete Pr.animationiteration.animation,delete Pr.animationstart.animation),`TransitionEvent`in window||delete Pr.transitionend.transition);function Lr(e){if(Fr[e])return Fr[e];if(!Pr[e])return e;var t=Pr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ir)return Fr[e]=t[n];return e}var Rr=Lr(`animationend`),zr=Lr(`animationiteration`),Br=Lr(`animationstart`),Vr=Lr(`transitionrun`),Hr=Lr(`transitionstart`),Ur=Lr(`transitioncancel`),Wr=Lr(`transitionend`),Gr=new Map,Kr=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);Kr.push(`scrollEnd`);function qr(e,t){Gr.set(e,t),Ct(t,[e])}var Jr=new WeakMap;function Yr(e,t){if(typeof e==`object`&&e){var n=Jr.get(e);return n===void 0?(t={value:e,source:t,stack:Rt(t)},Jr.set(e,t),t):n}return{value:e,source:t,stack:Rt(t)}}var Xr=[],Zr=0,Qr=0;function $r(){for(var e=Zr,t=Qr=Zr=0;t<e;){var n=Xr[t];Xr[t++]=null;var r=Xr[t];Xr[t++]=null;var i=Xr[t];Xr[t++]=null;var a=Xr[t];if(Xr[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&ri(n,i,a)}}function ei(e,t,n,r){Xr[Zr++]=e,Xr[Zr++]=t,Xr[Zr++]=n,Xr[Zr++]=r,Qr|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function ti(e,t,n,r){return ei(e,t,n,r),ii(e)}function ni(e,t){return ei(e,null,null,t),ii(e)}function ri(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-ze(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ii(e){if(50<$l)throw $l=0,eu=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ai={};function oi(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function si(e,t,n,r){return new oi(e,t,n,r)}function ci(e){return e=e.prototype,!(!e||!e.isReactComponent)}function li(e,t){var n=e.alternate;return n===null?(n=si(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function ui(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function di(e,t,n,r,a,o){var s=0;if(r=e,typeof e==`function`)ci(e)&&(s=1);else if(typeof e==`string`)s=Tf(e,n,me.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(e){case ne:return e=si(31,n,t,a),e.elementType=ne,e.lanes=o,e;case v:return fi(n.children,a,o,t);case y:s=8,a|=24;break;case b:return e=si(12,n,t,a|2),e.elementType=b,e.lanes=o,e;case w:return e=si(13,n,t,a),e.elementType=w,e.lanes=o,e;case T:return e=si(19,n,t,a),e.elementType=T,e.lanes=o,e;default:if(typeof e==`object`&&e)switch(e.$$typeof){case x:case C:s=10;break a;case S:s=9;break a;case ee:s=11;break a;case te:s=14;break a;case E:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=si(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function fi(e,t,n,r){return e=si(7,e,r,t),e.lanes=n,e}function pi(e,t,n){return e=si(6,e,null,t),e.lanes=n,e}function mi(e,t,n){return t=si(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var hi=[],gi=0,_i=null,vi=0,yi=[],bi=0,xi=null,Si=1,Ci=``;function wi(e,t){hi[gi++]=vi,hi[gi++]=_i,_i=e,vi=t}function Ti(e,t,n){yi[bi++]=Si,yi[bi++]=Ci,yi[bi++]=xi,xi=e;var r=Si;e=Ci;var i=32-ze(r)-1;r&=~(1<<i),n+=1;var a=32-ze(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Si=1<<32-ze(t)+i|n<<i|r,Ci=a+e}else Si=1<<a|n<<i|r,Ci=e}function Ei(e){e.return!==null&&(wi(e,1),Ti(e,1,0))}function Di(e){for(;e===_i;)_i=hi[--gi],hi[gi]=null,vi=hi[--gi],hi[gi]=null;for(;e===xi;)xi=yi[--bi],yi[bi]=null,Ci=yi[--bi],yi[bi]=null,Si=yi[--bi],yi[bi]=null}var Oi=null,ki=null,z=!1,Ai=null,ji=!1,Mi=Error(i(519));function Ni(e){throw zi(Yr(Error(i(418,``)),e)),Mi}function Pi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[st]=e,t[ct]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<id.length;n++)Q(id[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),Kt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0),Ht(t);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),M(t,r.value,r.defaultValue,r.children),Ht(t)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||yd(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=bd),t=!0):t=!1,t||Ni(e)}function Fi(e){for(Oi=e.return;Oi;)switch(Oi.tag){case 5:case 13:ji=!1;return;case 27:case 3:ji=!0;return;default:Oi=Oi.return}}function Ii(e){if(e!==Oi)return!1;if(!z)return Fi(e),z=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!==`form`&&n!==`button`)||kd(e.type,e.memoizedProps)),n=!n),n&&ki&&Ni(e),Fi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));a:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(n=e.data,n===`/$`){if(t===0){ki=Wd(e.nextSibling);break a}t--}else n!==`$`&&n!==`$!`&&n!==`$?`||t++;e=e.nextSibling}ki=null}}else t===27?(t=ki,Ld(e.type)?(e=Gd,Gd=null,ki=e):ki=t):ki=Oi?Wd(e.stateNode.nextSibling):null;return!0}function Li(){ki=Oi=null,z=!1}function Ri(){var e=Ai;return e!==null&&(Bl===null?Bl=e:Bl.push.apply(Bl,e),Ai=null),e}function zi(e){Ai===null?Ai=[e]:Ai.push(e)}var Bi=fe(null),Vi=null,Hi=null;function Ui(e,t,n){k(Bi,t._currentValue),t._currentValue=n}function Wi(e){e._currentValue=Bi.current,pe(Bi)}function Gi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Ki(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),Gi(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),Gi(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function qi(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;wr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===_e.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[Ff]:e.push(Ff))}a=a.return}e!==null&&Ki(t,e,n,r),t.flags|=262144}function Ji(e){for(e=e.firstContext;e!==null;){if(!wr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Yi(e){Vi=e,Hi=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Xi(e){return Qi(Vi,e)}function Zi(e,t){return Vi===null&&Yi(e),Qi(e,t)}function Qi(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Hi===null){if(e===null)throw Error(i(308));Hi=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Hi=Hi.next=t;return n}var $i=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ea=t.unstable_scheduleCallback,ta=t.unstable_NormalPriority,na={$$typeof:C,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ra(){return{controller:new $i,data:new Map,refCount:0}}function ia(e){e.refCount--,e.refCount===0&&ea(ta,function(){e.controller.abort()})}var aa=null,oa=0,sa=0,ca=null;function la(e,t){if(aa===null){var n=aa=[];oa=0,sa=Qu(),ca={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return oa++,t.then(ua,ua),t}function ua(){if(--oa===0&&aa!==null){ca!==null&&(ca.status=`fulfilled`);var e=aa;aa=null,sa=0,ca=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function da(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var fa=D.S;D.S=function(e,t){typeof t==`object`&&t&&typeof t.then==`function`&&la(e,t),fa!==null&&fa(e,t)};var B=fe(null);function V(){var e=B.current;return e===null?q.pooledCache:e}function H(e,t){t===null?k(B,B.current):k(B,t.pool)}function pa(){var e=V();return e===null?null:{parent:na._currentValue,pool:e}}var ma=Error(i(460)),ha=Error(i(474)),ga=Error(i(542)),U={then:function(){}};function _a(e){return e=e.status,e===`fulfilled`||e===`rejected`}function va(){}function ya(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(va,va),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Sa(e),e;default:if(typeof t.status==`string`)t.then(va,va);else{if(e=q,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Sa(e),e}throw ba=t,ma}}var ba=null;function xa(){if(ba===null)throw Error(i(459));var e=ba;return ba=null,e}function Sa(e){if(e===ma||e===ga)throw Error(i(483))}var Ca=!1;function wa(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ta(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Ea(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Da(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,K&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ii(e),ri(e,null,n),t}return ei(e,r,t,n),ii(e)}function Oa(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,tt(e,n)}}function ka(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Aa=!1;function ja(){if(Aa){var e=ca;if(e!==null)throw e}}function Ma(e,t,n,r){Aa=!1;var i=e.updateQueue;Ca=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var p=s.lane&-536870913,m=p!==s.lane;if(m?(Y&p)===p:(r&p)===p){p!==0&&p===sa&&(Aa=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var h=e,g=s;p=t;var _=n;switch(g.tag){case 1:if(h=g.payload,typeof h==`function`){d=h.call(_,d,p);break a}d=h;break a;case 3:h.flags=h.flags&-65537|128;case 0:if(h=g.payload,p=typeof h==`function`?h.call(_,d,p):h,p==null)break a;d=f({},d,p);break a;case 2:Ca=!0}}p=s.callback,p!==null&&(e.flags|=64,m&&(e.flags|=8192),m=i.callbacks,m===null?i.callbacks=[p]:m.push(p))}else m={lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=m,c=d):u=u.next=m,o|=p;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;m=s,s=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),Pl|=o,e.lanes=o,e.memoizedState=d}}function Na(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Pa(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Na(n[e],t)}var Fa=fe(null),Ia=fe(0);function La(e,t){e=Ml,k(Ia,e),k(Fa,t),Ml=e|t.baseLanes}function Ra(){k(Ia,Ml),k(Fa,Fa.current)}function za(){Ml=Ia.current,pe(Fa),pe(Ia)}var Ba=0,W=null,G=null,Va=null,Ha=!1,Ua=!1,Wa=!1,Ga=0,Ka=0,qa=null,Ja=0;function Ya(){throw Error(i(321))}function Xa(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!wr(e[n],t[n]))return!1;return!0}function Za(e,t,n,r,i,a){return Ba=a,W=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,D.H=e===null||e.memoizedState===null?ms:hs,Wa=!1,a=n(r,i),Wa=!1,Ua&&(a=$a(t,n,r,i)),Qa(e),a}function Qa(e){D.H=ps;var t=G!==null&&G.next!==null;if(Ba=0,Va=G=W=null,Ha=!1,Ka=0,qa=null,t)throw Error(i(300));e===null||Xs||(e=e.dependencies,e!==null&&Ji(e)&&(Xs=!0))}function $a(e,t,n,r){W=e;var a=0;do{if(Ua&&(qa=null),Ka=0,Ua=!1,25<=a)throw Error(i(301));if(a+=1,Va=G=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}D.H=gs,o=t(n,r)}while(Ua);return o}function eo(){var e=D.H,t=e.useState()[0];return t=typeof t.then==`function`?so(t):t,e=e.useState()[0],(G===null?null:G.memoizedState)!==e&&(W.flags|=1024),t}function to(){var e=Ga!==0;return Ga=0,e}function no(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function ro(e){if(Ha){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ha=!1}Ba=0,Va=G=W=null,Ua=!1,Ka=Ga=0,qa=null}function io(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Va===null?W.memoizedState=Va=e:Va=Va.next=e,Va}function ao(){if(G===null){var e=W.alternate;e=e===null?null:e.memoizedState}else e=G.next;var t=Va===null?W.memoizedState:Va.next;if(t!==null)Va=t,G=e;else{if(e===null)throw W.alternate===null?Error(i(467)):Error(i(310));G=e,e={memoizedState:G.memoizedState,baseState:G.baseState,baseQueue:G.baseQueue,queue:G.queue,next:null},Va===null?W.memoizedState=Va=e:Va=Va.next=e}return Va}function oo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function so(e){var t=Ka;return Ka+=1,qa===null&&(qa=[]),e=ya(qa,e,t),t=W,(Va===null?t.memoizedState:Va.next)===null&&(t=t.alternate,D.H=t===null||t.memoizedState===null?ms:hs),e}function co(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return so(e);if(e.$$typeof===C)return Xi(e)}throw Error(i(438,String(e)))}function lo(e){var t=null,n=W.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=W.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=oo(),W.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=re;return t.index++,n}function uo(e,t){return typeof t==`function`?t(e):t}function fo(e){return po(ao(),G,e)}function po(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Ba&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===sa&&(d=!0);else if((Ba&p)===p){u=u.next,p===sa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,W.lanes|=p,Pl|=p;f=u.action,Wa&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,W.lanes|=f,Pl|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!wr(o,e.memoizedState)&&(Xs=!0,d&&(n=ca,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function mo(e){var t=ao(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);wr(o,t.memoizedState)||(Xs=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ho(e,t,n){var r=W,a=ao(),o=z;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!wr((G||a).memoizedState,n);if(s&&(a.memoizedState=n,Xs=!0),a=a.queue,zo(2048,8,vo.bind(null,r,a,e),[e]),a.getSnapshot!==t||s||Va!==null&&Va.memoizedState.tag&1){if(r.flags|=2048,Fo(9,Io(),_o.bind(null,r,a,n,t),null),q===null)throw Error(i(349));o||Ba&124||go(r,t,n)}return n}function go(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=W.updateQueue,t===null?(t=oo(),W.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function _o(e,t,n,r){t.value=n,t.getSnapshot=r,yo(t)&&bo(e)}function vo(e,t,n){return n(function(){yo(t)&&bo(e)})}function yo(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!wr(e,n)}catch{return!0}}function bo(e){var t=ni(e,2);t!==null&&ru(t,e,2)}function xo(e){var t=io();if(typeof e==`function`){var n=e;if(e=n(),Wa){Re(!0);try{n()}finally{Re(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:uo,lastRenderedState:e},t}function So(e,t,n,r){return e.baseState=n,po(e,G,typeof r==`function`?r:uo)}function Co(e,t,n,r,a){if(us(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};D.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,wo(t,o)):(o.next=n.next,t.pending=n.next=o)}}function wo(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=D.T,o={};D.T=o;try{var s=n(i,r),c=D.S;c!==null&&c(o,s),To(e,t,s)}catch(n){Do(e,t,n)}finally{D.T=a}}else try{a=n(i,r),To(e,t,a)}catch(n){Do(e,t,n)}}function To(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Eo(e,t,n)},function(n){return Do(e,t,n)}):Eo(e,t,n)}function Eo(e,t,n){t.status=`fulfilled`,t.value=n,Oo(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,wo(e,n)))}function Do(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Oo(t),t=t.next;while(t!==r)}e.action=null}function Oo(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ko(e,t){return t}function Ao(e,t){if(z){var n=q.formState;if(n!==null){a:{var r=W;if(z){if(ki){b:{for(var i=ki,a=ji;i.nodeType!==8;){if(!a){i=null;break b}if(i=Wd(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){ki=Wd(i.nextSibling),r=i.data===`F!`;break a}}Ni(r)}r=!1}r&&(t=n[0])}}return n=io(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ko,lastRenderedState:t},n.queue=r,n=ss.bind(null,W,r),r.dispatch=n,r=xo(!1),a=ls.bind(null,W,!1,r.queue),r=io(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=Co.bind(null,W,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function jo(e){return Mo(ao(),G,e)}function Mo(e,t,n){if(t=po(e,t,ko)[0],e=fo(uo)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=so(t)}catch(e){throw e===ma?ga:e}else r=t;t=ao();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(W.flags|=2048,Fo(9,Io(),No.bind(null,i,n),null)),[r,a,e]}function No(e,t){e.action=t}function Po(e){var t=ao(),n=G;if(n!==null)return Mo(t,n,e);ao(),t=t.memoizedState,n=ao();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Fo(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=W.updateQueue,t===null&&(t=oo(),W.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Io(){return{destroy:void 0,resource:void 0}}function Lo(){return ao().memoizedState}function Ro(e,t,n,r){var i=io();r=r===void 0?null:r,W.flags|=e,i.memoizedState=Fo(1|t,Io(),n,r)}function zo(e,t,n,r){var i=ao();r=r===void 0?null:r;var a=i.memoizedState.inst;G!==null&&r!==null&&Xa(r,G.memoizedState.deps)?i.memoizedState=Fo(t,a,n,r):(W.flags|=e,i.memoizedState=Fo(1|t,a,n,r))}function Bo(e,t){Ro(8390656,8,e,t)}function Vo(e,t){zo(2048,8,e,t)}function Ho(e,t){return zo(4,2,e,t)}function Uo(e,t){return zo(4,4,e,t)}function Wo(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Go(e,t,n){n=n==null?null:n.concat([e]),zo(4,4,Wo.bind(null,t,e),n)}function Ko(){}function qo(e,t){var n=ao();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Xa(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Jo(e,t){var n=ao();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Xa(t,r[1]))return r[0];if(r=e(),Wa){Re(!0);try{e()}finally{Re(!1)}}return n.memoizedState=[r,t],r}function Yo(e,t,n){return n===void 0||Ba&1073741824?e.memoizedState=t:(e.memoizedState=n,e=nu(),W.lanes|=e,Pl|=e,n)}function Xo(e,t,n,r){return wr(n,t)?n:Fa.current===null?Ba&42?(e=nu(),W.lanes|=e,Pl|=e,t):(Xs=!0,e.memoizedState=n):(e=Yo(e,n,r),wr(e,t)||(Xs=!0),e)}function Zo(e,t,n,r,i){var a=O.p;O.p=a!==0&&8>a?a:8;var o=D.T,s={};D.T=s,ls(e,!1,t,n);try{var c=i(),l=D.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?cs(e,t,da(c,r),tu(e)):cs(e,t,r,tu(e))}catch(n){cs(e,t,{then:function(){},status:`rejected`,reason:n},tu())}finally{O.p=a,D.T=o}}function Qo(){}function $o(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=es(e).queue;Zo(e,a,t,le,n===null?Qo:function(){return ts(e),n(r)})}function es(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:le,baseState:le,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:uo,lastRenderedState:le},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:uo,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ts(e){var t=es(e).next.queue;cs(e,t,{},tu())}function ns(){return Xi(Ff)}function rs(){return ao().memoizedState}function is(){return ao().memoizedState}function as(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=tu();e=Ea(n);var r=Da(t,e,n);r!==null&&(ru(r,t,n),Oa(r,t,n)),t={cache:ra()},e.payload=t;return}t=t.return}}function os(e,t,n){var r=tu();n={lane:r,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null},us(e)?ds(t,n):(n=ti(e,t,n,r),n!==null&&(ru(n,e,r),fs(n,t,r)))}function ss(e,t,n){cs(e,t,n,tu())}function cs(e,t,n,r){var i={lane:r,revertLane:0,action:n,hasEagerState:!1,eagerState:null,next:null};if(us(e))ds(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,wr(s,o))return ei(e,t,i,0),q===null&&$r(),!1}catch{}if(n=ti(e,t,i,r),n!==null)return ru(n,e,r),fs(n,t,r),!0}return!1}function ls(e,t,n,r){if(r={lane:2,revertLane:Qu(),action:r,hasEagerState:!1,eagerState:null,next:null},us(e)){if(t)throw Error(i(479))}else t=ti(e,n,r,2),t!==null&&ru(t,e,2)}function us(e){var t=e.alternate;return e===W||t!==null&&t===W}function ds(e,t){Ua=Ha=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function fs(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,tt(e,n)}}var ps={readContext:Xi,use:co,useCallback:Ya,useContext:Ya,useEffect:Ya,useImperativeHandle:Ya,useLayoutEffect:Ya,useInsertionEffect:Ya,useMemo:Ya,useReducer:Ya,useRef:Ya,useState:Ya,useDebugValue:Ya,useDeferredValue:Ya,useTransition:Ya,useSyncExternalStore:Ya,useId:Ya,useHostTransitionStatus:Ya,useFormState:Ya,useActionState:Ya,useOptimistic:Ya,useMemoCache:Ya,useCacheRefresh:Ya},ms={readContext:Xi,use:co,useCallback:function(e,t){return io().memoizedState=[e,t===void 0?null:t],e},useContext:Xi,useEffect:Bo,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Ro(4194308,4,Wo.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ro(4194308,4,e,t)},useInsertionEffect:function(e,t){Ro(4,2,e,t)},useMemo:function(e,t){var n=io();t=t===void 0?null:t;var r=e();if(Wa){Re(!0);try{e()}finally{Re(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=io();if(n!==void 0){var i=n(t);if(Wa){Re(!0);try{n(t)}finally{Re(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=os.bind(null,W,e),[r.memoizedState,e]},useRef:function(e){var t=io();return e={current:e},t.memoizedState=e},useState:function(e){e=xo(e);var t=e.queue,n=ss.bind(null,W,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Ko,useDeferredValue:function(e,t){return Yo(io(),e,t)},useTransition:function(){var e=xo(!1);return e=Zo.bind(null,W,e.queue,!0,!1),io().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=W,a=io();if(z){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),q===null)throw Error(i(349));Y&124||go(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Bo(vo.bind(null,r,o,e),[e]),r.flags|=2048,Fo(9,Io(),_o.bind(null,r,o,n,t),null),n},useId:function(){var e=io(),t=q.identifierPrefix;if(z){var n=Ci,r=Si;n=(r&~(1<<32-ze(r)-1)).toString(32)+n,t=`«`+t+`R`+n,n=Ga++,0<n&&(t+=`H`+n.toString(32)),t+=`»`}else n=Ja++,t=`«`+t+`r`+n.toString(32)+`»`;return e.memoizedState=t},useHostTransitionStatus:ns,useFormState:Ao,useActionState:Ao,useOptimistic:function(e){var t=io();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=ls.bind(null,W,!0,n),n.dispatch=t,[e,t]},useMemoCache:lo,useCacheRefresh:function(){return io().memoizedState=as.bind(null,W)}},hs={readContext:Xi,use:co,useCallback:qo,useContext:Xi,useEffect:Vo,useImperativeHandle:Go,useInsertionEffect:Ho,useLayoutEffect:Uo,useMemo:Jo,useReducer:fo,useRef:Lo,useState:function(){return fo(uo)},useDebugValue:Ko,useDeferredValue:function(e,t){return Xo(ao(),G.memoizedState,e,t)},useTransition:function(){var e=fo(uo)[0],t=ao().memoizedState;return[typeof e==`boolean`?e:so(e),t]},useSyncExternalStore:ho,useId:rs,useHostTransitionStatus:ns,useFormState:jo,useActionState:jo,useOptimistic:function(e,t){return So(ao(),G,e,t)},useMemoCache:lo,useCacheRefresh:is},gs={readContext:Xi,use:co,useCallback:qo,useContext:Xi,useEffect:Vo,useImperativeHandle:Go,useInsertionEffect:Ho,useLayoutEffect:Uo,useMemo:Jo,useReducer:mo,useRef:Lo,useState:function(){return mo(uo)},useDebugValue:Ko,useDeferredValue:function(e,t){var n=ao();return G===null?Yo(n,e,t):Xo(n,G.memoizedState,e,t)},useTransition:function(){var e=mo(uo)[0],t=ao().memoizedState;return[typeof e==`boolean`?e:so(e),t]},useSyncExternalStore:ho,useId:rs,useHostTransitionStatus:ns,useFormState:Po,useActionState:Po,useOptimistic:function(e,t){var n=ao();return G===null?(n.baseState=e,[e,n.queue.dispatch]):So(n,G,e,t)},useMemoCache:lo,useCacheRefresh:is},_s=null,vs=0;function ys(e){var t=vs;return vs+=1,_s===null&&(_s=[]),ya(_s,e,t)}function bs(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function xs(e,t){throw t.$$typeof===m?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Ss(e){var t=e._init;return t(e._payload)}function Cs(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=li(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=67108866,n):(r=r.index,r<n?(t.flags|=67108866,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=67108866),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=pi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===v?d(e,t,n.props.children,r,n.key):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===E&&Ss(i)===t.type)?(t=a(t,n.props),bs(t,n),t.return=e,t):(t=di(n.type,n.key,n.props,null,e.mode,r),bs(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=mi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=fi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=pi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case g:return n=di(t.type,t.key,t.props,null,e.mode,n),bs(n,t),n.return=e,n;case _:return t=mi(t,e.mode,n),t.return=e,t;case E:var r=t._init;return t=r(t._payload),f(e,t,n)}if(ce(t)||ae(t))return t=fi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,ys(t),n);if(t.$$typeof===C)return f(e,Zi(e,t),n);xs(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case g:return n.key===i?l(e,t,n,r):null;case _:return n.key===i?u(e,t,n,r):null;case E:return i=n._init,n=i(n._payload),p(e,t,n,r)}if(ce(n)||ae(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,ys(n),r);if(n.$$typeof===C)return p(e,t,Zi(e,n),r);xs(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case g:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case _:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case E:var a=r._init;return r=a(r._payload),m(e,t,n,r,i)}if(ce(r)||ae(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,ys(r),i);if(r.$$typeof===C)return m(e,t,n,Zi(t,r),i);xs(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),z&&wi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return z&&wi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&g.alternate!==null&&d.delete(g.key===null?h:g.key),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),z&&wi(i,h),l}function y(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),z&&wi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return z&&wi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&v.alternate!==null&&h.delete(v.key===null?g:v.key),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),z&&wi(a,g),u}function b(e,r,o,c){if(typeof o==`object`&&o&&o.type===v&&o.key===null&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case g:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===v){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===E&&Ss(l)===r.type){n(e,r.sibling),c=a(r,o.props),bs(c,o),c.return=e,e=c;break a}n(e,r);break}else t(e,r);r=r.sibling}o.type===v?(c=fi(o.props.children,e.mode,c,o.key),c.return=e,e=c):(c=di(o.type,o.key,o.props,null,e.mode,c),bs(c,o),c.return=e,e=c)}return s(e);case _:a:{for(l=o.key;r!==null;){if(r.key===l)if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}else{n(e,r);break}else t(e,r);r=r.sibling}c=mi(o,e.mode,c),c.return=e,e=c}return s(e);case E:return l=o._init,o=l(o._payload),b(e,r,o,c)}if(ce(o))return h(e,r,o,c);if(ae(o)){if(l=ae(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),y(e,r,o,c)}if(typeof o.then==`function`)return b(e,r,ys(o),c);if(o.$$typeof===C)return b(e,r,Zi(e,o),c);xs(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=pi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{vs=0;var i=b(e,t,n,r);return _s=null,i}catch(t){if(t===ma||t===ga)throw t;var a=si(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var ws=Cs(!0),Ts=Cs(!1),Es=fe(null),Ds=null;function Os(e){var t=e.alternate;k(Ms,Ms.current&1),k(Es,e),Ds===null&&(t===null||Fa.current!==null||t.memoizedState!==null)&&(Ds=e)}function ks(e){if(e.tag===22){if(k(Ms,Ms.current),k(Es,e),Ds===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(Ds=e)}}else As(e)}function As(){k(Ms,Ms.current),k(Es,Es.current)}function js(e){pe(Es),Ds===e&&(Ds=null),pe(Ms)}var Ms=fe(0);function Ns(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data===`$?`||Hd(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function Ps(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:f({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Fs={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=tu(),i=Ea(r);i.payload=t,n!=null&&(i.callback=n),t=Da(e,i,r),t!==null&&(ru(t,e,r),Oa(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=tu(),i=Ea(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Da(e,i,r),t!==null&&(ru(t,e,r),Oa(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=tu(),r=Ea(n);r.tag=2,t!=null&&(r.callback=t),t=Da(e,r,n),t!==null&&(ru(t,e,n),Oa(t,e,n))}};function Is(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Tr(n,r)||!Tr(i,a):!0}function Ls(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Fs.enqueueReplaceState(t,t.state,null)}function Rs(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=f({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}var zs=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function Bs(e){zs(e)}function Vs(e){console.error(e)}function Hs(e){zs(e)}function Us(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Ws(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Gs(e,t,n){return n=Ea(n),n.tag=3,n.payload={element:null},n.callback=function(){Us(e,t)},n}function Ks(e){return e=Ea(e),e.tag=3,e}function qs(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Ws(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Ws(t,n,r),typeof i!=`function`&&(Gl===null?Gl=new Set([this]):Gl.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Js(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&qi(t,n,a,!0),n=Es.current,n!==null){switch(n.tag){case 13:return Ds===null?mu():n.alternate===null&&Nl===0&&(Nl=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===U?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),Mu(e,r,a)),!1;case 22:return n.flags|=65536,r===U?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),Mu(e,r,a)),!1}throw Error(i(435,n.tag))}return Mu(e,r,a),mu(),!1}if(z)return t=Es.current,t===null?(r!==Mi&&(t=Error(i(423),{cause:r}),zi(Yr(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Yr(r,n),a=Gs(e.stateNode,r,a),ka(e,a),Nl!==4&&(Nl=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Mi&&(e=Error(i(422),{cause:r}),zi(Yr(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Yr(o,n),zl===null?zl=[o]:zl.push(o),Nl!==4&&(Nl=2),t===null)return!0;r=Yr(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Gs(n.stateNode,r,e),ka(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(Gl===null||!Gl.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Ks(a),qs(a,e,n,r),ka(n,a),!1}n=n.return}while(n!==null);return!1}var Ys=Error(i(461)),Xs=!1;function Zs(e,t,n,r){t.child=e===null?Ts(t,null,n,r):ws(t,e.child,n,r)}function Qs(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Yi(t),r=Za(e,t,n,o,a,i),s=to(),e!==null&&!Xs?(no(e,t,i),vc(e,t,i)):(z&&s&&Ei(t),t.flags|=1,Zs(e,t,r,i),t.child)}function $s(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ci(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,ec(e,t,a,r,i)):(e=di(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!yc(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Tr:n,n(o,r)&&e.ref===t.ref)return vc(e,t,i)}return t.flags|=1,e=li(a,r),e.ref=t.ref,e.return=t,t.child=e}function ec(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Tr(a,r)&&e.ref===t.ref)if(Xs=!1,t.pendingProps=r=a,yc(e,i))e.flags&131072&&(Xs=!0);else return t.lanes=e.lanes,vc(e,t,i)}return ic(e,t,n,r,i)}function tc(e,t,n){var r=t.pendingProps,i=r.children,a=e===null?null:e.memoizedState;if(r.mode===`hidden`){if(t.flags&128){if(r=a===null?n:a.baseLanes|n,e!==null){for(i=t.child=e.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;t.childLanes=a&~r}else t.childLanes=0,t.child=null;return nc(e,t,r,n)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&H(t,a===null?null:a.cachePool),a===null?Ra():La(t,a),ks(t);else return t.lanes=t.childLanes=536870912,nc(e,t,a===null?n:a.baseLanes|n,n)}else a===null?(e!==null&&H(t,null),Ra(),As(t)):(H(t,a.cachePool),La(t,a),As(t),t.memoizedState=null);return Zs(e,t,i,n),t.child}function nc(e,t,n,r){var i=V();return i=i===null?null:{parent:na._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},e!==null&&H(t,null),Ra(),ks(t),e!==null&&qi(e,t,r,!0),null}function rc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function ic(e,t,n,r,i){return Yi(t),n=Za(e,t,n,r,void 0,i),r=to(),e!==null&&!Xs?(no(e,t,i),vc(e,t,i)):(z&&r&&Ei(t),t.flags|=1,Zs(e,t,n,i),t.child)}function ac(e,t,n,r,i,a){return Yi(t),t.updateQueue=null,n=$a(t,r,n,i),Qa(e),r=to(),e!==null&&!Xs?(no(e,t,a),vc(e,t,a)):(z&&r&&Ei(t),t.flags|=1,Zs(e,t,n,a),t.child)}function oc(e,t,n,r,i){if(Yi(t),t.stateNode===null){var a=ai,o=n.contextType;typeof o==`object`&&o&&(a=Xi(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Fs,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},wa(t),o=n.contextType,a.context=typeof o==`object`&&o?Xi(o):ai,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(Ps(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&Fs.enqueueReplaceState(a,a.state,null),Ma(t,r,a,i),ja(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Rs(n,s);a.props=c;var l=a.context,u=n.contextType;o=ai,typeof u==`object`&&u&&(o=Xi(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Ls(t,a,r,o),Ca=!1;var f=t.memoizedState;a.state=f,Ma(t,r,a,i),ja(),l=t.memoizedState,s||f!==l||Ca?(typeof d==`function`&&(Ps(t,n,d,r),l=t.memoizedState),(c=Ca||Is(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Ta(e,t),o=t.memoizedProps,u=Rs(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ai,typeof l==`object`&&l&&(c=Xi(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Ls(t,a,r,c),Ca=!1,f=t.memoizedState,a.state=f,Ma(t,r,a,i),ja();var p=t.memoizedState;o!==d||f!==p||Ca||e!==null&&e.dependencies!==null&&Ji(e.dependencies)?(typeof s==`function`&&(Ps(t,n,s,r),p=t.memoizedState),(u=Ca||Is(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&Ji(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,rc(e,t),r=(t.flags&128)!=0,a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=ws(t,e.child,null,i),t.child=ws(t,null,n,i)):Zs(e,t,n,i),t.memoizedState=a.state,e=t.child):e=vc(e,t,i),e}function sc(e,t,n,r){return Li(),t.flags|=256,Zs(e,t,n,r),t.child}var cc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function lc(e){return{baseLanes:e,cachePool:pa()}}function uc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=Ll),e}function dc(e,t,n){var r=t.pendingProps,a=!1,o=(t.flags&128)!=0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(Ms.current&2)!=0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!=0,t.flags&=-33,e===null){if(z){if(a?Os(t):As(t),z){var c=ki,l;if(l=c){c:{for(l=c,c=ji;l.nodeType!==8;){if(!c){c=null;break c}if(l=Wd(l.nextSibling),l===null){c=null;break c}}c=l}c===null?l=!1:(t.memoizedState={dehydrated:c,treeContext:xi===null?null:{id:Si,overflow:Ci},retryLane:536870912,hydrationErrors:null},l=si(18,null,null,0),l.stateNode=c,l.return=t,t.child=l,Oi=t,ki=null,l=!0)}l||Ni(t)}if(c=t.memoizedState,c!==null&&(c=c.dehydrated,c!==null))return Hd(c)?t.lanes=32:t.lanes=536870912,null;js(t)}return c=r.children,r=r.fallback,a?(As(t),a=t.mode,c=pc({mode:`hidden`,children:c},a),r=fi(r,a,n,null),c.return=t,r.return=t,c.sibling=r,t.child=c,a=t.child,a.memoizedState=lc(n),a.childLanes=uc(e,s,n),t.memoizedState=cc,r):(Os(t),fc(t,c))}if(l=e.memoizedState,l!==null&&(c=l.dehydrated,c!==null)){if(o)t.flags&256?(Os(t),t.flags&=-257,t=mc(e,t,n)):t.memoizedState===null?(As(t),a=r.fallback,c=t.mode,r=pc({mode:`visible`,children:r.children},c),a=fi(a,c,n,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,ws(t,e.child,null,n),r=t.child,r.memoizedState=lc(n),r.childLanes=uc(e,s,n),t.memoizedState=cc,t=a):(As(t),t.child=e.child,t.flags|=128,t=null);else if(Os(t),Hd(c)){if(s=c.nextSibling&&c.nextSibling.dataset,s)var u=s.dgst;s=u,r=Error(i(419)),r.stack=``,r.digest=s,zi({value:r,source:null,stack:null}),t=mc(e,t,n)}else if(Xs||qi(e,t,n,!1),s=(n&e.childLanes)!==0,Xs||s){if(s=q,s!==null&&(r=n&-n,r=r&42?1:nt(r),r=(r&(s.suspendedLanes|n))===0?r:0,r!==0&&r!==l.retryLane))throw l.retryLane=r,ni(e,r),ru(s,e,r),Ys;c.data===`$?`||mu(),t=mc(e,t,n)}else c.data===`$?`?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,ki=Wd(c.nextSibling),Oi=t,z=!0,Ai=null,ji=!1,e!==null&&(yi[bi++]=Si,yi[bi++]=Ci,yi[bi++]=xi,Si=e.id,Ci=e.overflow,xi=t),t=fc(t,r.children),t.flags|=4096);return t}return a?(As(t),a=r.fallback,c=t.mode,l=e.child,u=l.sibling,r=li(l,{mode:`hidden`,children:r.children}),r.subtreeFlags=l.subtreeFlags&65011712,u===null?(a=fi(a,c,n,null),a.flags|=2):a=li(u,a),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,c=e.child.memoizedState,c===null?c=lc(n):(l=c.cachePool,l===null?l=pa():(u=na._currentValue,l=l.parent===u?l:{parent:u,pool:u}),c={baseLanes:c.baseLanes|n,cachePool:l}),a.memoizedState=c,a.childLanes=uc(e,s,n),t.memoizedState=cc,r):(Os(t),n=e.child,e=n.sibling,n=li(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function fc(e,t){return t=pc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function pc(e,t){return e=si(22,e,null,t),e.lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function mc(e,t,n){return ws(t,e.child,null,n),e=fc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function hc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Gi(e.return,t,n)}function gc(e,t,n,r,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=i)}function _c(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;if(Zs(e,t,r.children,n),r=Ms.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&hc(e,n,t);else if(e.tag===19)hc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}switch(k(Ms,r),i){case`forwards`:for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Ns(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),gc(t,!1,i,n,a);break;case`backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Ns(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}gc(t,!0,n,null,a);break;case`together`:gc(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function vc(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Pl|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(qi(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=li(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=li(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function yc(e,t){return(e.lanes&t)===0?(e=e.dependencies,!!(e!==null&&Ji(e))):!0}function bc(e,t,n){switch(t.tag){case 3:ve(t,t.stateNode.containerInfo),Ui(t,na,e.memoizedState.cache),Li();break;case 27:case 5:be(t);break;case 4:ve(t,t.stateNode.containerInfo);break;case 10:Ui(t,t.type,t.memoizedProps.value);break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated===null?(n&t.child.childLanes)===0?(Os(t),e=vc(e,t,n),e===null?null:e.sibling):dc(e,t,n):(Os(t),t.flags|=128,null);Os(t);break;case 19:var i=(e.flags&128)!=0;if(r=(n&t.childLanes)!==0,r||=(qi(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return _c(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),k(Ms,Ms.current),r)break;return null;case 22:case 23:return t.lanes=0,tc(e,t,n);case 24:Ui(t,na,e.memoizedState.cache)}return vc(e,t,n)}function xc(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Xs=!0;else{if(!yc(e,n)&&!(t.flags&128))return Xs=!1,bc(e,t,n);Xs=!!(e.flags&131072)}else Xs=!1,z&&t.flags&1048576&&Ti(t,vi,t.index);switch(t.lanes=0,t.tag){case 16:a:{e=t.pendingProps;var r=t.elementType,a=r._init;if(r=a(r._payload),t.type=r,typeof r==`function`)ci(r)?(e=Rs(r,e),t.tag=1,t=oc(null,t,r,e,n)):(t.tag=0,t=ic(null,t,r,e,n));else{if(r!=null){if(a=r.$$typeof,a===ee){t.tag=11,t=Qs(null,t,r,e,n);break a}else if(a===te){t.tag=14,t=$s(null,t,r,e,n);break a}}throw t=se(r)||r,Error(i(306,t,``))}}return t;case 0:return ic(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Rs(r,t.pendingProps),oc(e,t,r,a,n);case 3:a:{if(ve(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,Ta(e,t),Ma(t,r,null,n);var s=t.memoizedState;if(r=s.cache,Ui(t,na,r),r!==o.cache&&Ki(t,[na],n,!0),ja(),r=s.element,o.isDehydrated)if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=sc(e,t,r,n);break a}else if(r!==a){a=Yr(Error(i(424)),t),zi(a),t=sc(e,t,r,n);break a}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(ki=Wd(e.firstChild),Oi=t,z=!0,Ai=null,ji=!0,n=Ts(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Li(),r===a){t=vc(e,t,n);break a}Zs(e,t,r,n)}t=t.child}return t;case 26:return rc(e,t),e===null?(n=df(t.type,null,t.pendingProps,null))?t.memoizedState=n:z||(n=t.type,e=t.pendingProps,r=Ed(ge.current).createElement(n),r[st]=t,r[ct]=e,Sd(r,n,e),bt(r),t.stateNode=r):t.memoizedState=df(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return be(t),e===null&&z&&(r=t.stateNode=qd(t.type,t.pendingProps,ge.current),Oi=t,ji=!0,a=ki,Ld(t.type)?(Gd=a,ki=Wd(r.firstChild)):ki=a),Zs(e,t,t.pendingProps.children,n),rc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&z&&((a=r=ki)&&(r=Bd(r,t.type,t.pendingProps,ji),r===null?a=!1:(t.stateNode=r,Oi=t,ki=Wd(r.firstChild),ji=!1,a=!0)),a||Ni(t)),be(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,kd(a,o)?r=null:s!==null&&kd(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Za(e,t,eo,null,null,n),Ff._currentValue=a),rc(e,t),Zs(e,t,r,n),t.child;case 6:return e===null&&z&&((e=n=ki)&&(n=Vd(n,t.pendingProps,ji),n===null?e=!1:(t.stateNode=n,Oi=t,ki=null,e=!0)),e||Ni(t)),null;case 13:return dc(e,t,n);case 4:return ve(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ws(t,null,r,n):Zs(e,t,r,n),t.child;case 11:return Qs(e,t,t.type,t.pendingProps,n);case 7:return Zs(e,t,t.pendingProps,n),t.child;case 8:return Zs(e,t,t.pendingProps.children,n),t.child;case 12:return Zs(e,t,t.pendingProps.children,n),t.child;case 10:return r=t.pendingProps,Ui(t,t.type,r.value),Zs(e,t,r.children,n),t.child;case 9:return a=t.type._context,r=t.pendingProps.children,Yi(t),a=Xi(a),r=r(a),t.flags|=1,Zs(e,t,r,n),t.child;case 14:return $s(e,t,t.type,t.pendingProps,n);case 15:return ec(e,t,t.type,t.pendingProps,n);case 19:return _c(e,t,n);case 31:return r=t.pendingProps,n=t.mode,r={mode:r.mode,children:r.children},e===null?(n=pc(r,n),n.ref=t.ref,t.child=n,n.return=t,t=n):(n=li(e.child,r),n.ref=t.ref,t.child=n,n.return=t,t=n),t;case 22:return tc(e,t,n);case 24:return Yi(t),r=Xi(na),e===null?(a=V(),a===null&&(a=q,o=ra(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},wa(t),Ui(t,na,a)):((e.lanes&n)!==0&&(Ta(e,t),Ma(t,null,null,n),ja()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,Ui(t,na,r),r!==a.cache&&Ki(t,[na],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),Ui(t,na,r))),Zs(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function Sc(e){e.flags|=4}function Cc(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ef(t)){if(t=Es.current,t!==null&&((Y&4194048)===Y?Ds!==null:(Y&62914560)!==Y&&!(Y&536870912)||t!==Ds))throw ba=U,ha;e.flags|=8192}}function wc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:Xe(),e.lanes|=t,Rl|=t)}function Tc(e,t){if(!z)switch(e.tailMode){case`hidden`:t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case`collapsed`:n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ec(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&65011712,r|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Dc(e,t,n){var r=t.pendingProps;switch(Di(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ec(t),null;case 1:return Ec(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Wi(na),ye(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ii(t)?Sc(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ri())),Ec(t),null;case 26:return n=t.memoizedState,e===null?(Sc(t),n===null?(Ec(t),t.flags&=-16777217):(Ec(t),Cc(t,n))):n?n===e.memoizedState?(Ec(t),t.flags&=-16777217):(Sc(t),Ec(t),Cc(t,n)):(e.memoizedProps!==r&&Sc(t),Ec(t),t.flags&=-16777217),null;case 27:xe(t),n=ge.current;var a=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Sc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Ec(t),null}e=me.current,Ii(t)?Pi(t,e):(e=qd(a,r,n),t.stateNode=e,Sc(t))}return Ec(t),null;case 5:if(xe(t),n=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&Sc(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return Ec(t),null}if(e=me.current,Ii(t))Pi(t,e);else{switch(a=Ed(ge.current),e){case 1:e=a.createElementNS(`http://www.w3.org/2000/svg`,n);break;case 2:e=a.createElementNS(`http://www.w3.org/1998/Math/MathML`,n);break;default:switch(n){case`svg`:e=a.createElementNS(`http://www.w3.org/2000/svg`,n);break;case`math`:e=a.createElementNS(`http://www.w3.org/1998/Math/MathML`,n);break;case`script`:e=a.createElement(`div`),e.innerHTML=`<script><\/script>`,e=e.removeChild(e.firstChild);break;case`select`:e=typeof r.is==`string`?a.createElement(`select`,{is:r.is}):a.createElement(`select`),r.multiple?e.multiple=!0:r.size&&(e.size=r.size);break;default:e=typeof r.is==`string`?a.createElement(n,{is:r.is}):a.createElement(n)}}e[st]=t,e[ct]=r;a:for(a=t.child;a!==null;){if(a.tag===5||a.tag===6)e.appendChild(a.stateNode);else if(a.tag!==4&&a.tag!==27&&a.child!==null){a.child.return=a,a=a.child;continue}if(a===t)break a;for(;a.sibling===null;){if(a.return===null||a.return===t)break a;a=a.return}a.sibling.return=a.return,a=a.sibling}t.stateNode=e;a:switch(Sd(e,n,r),n){case`button`:case`input`:case`select`:case`textarea`:e=!!r.autoFocus;break a;case`img`:e=!0;break a;default:e=!1}e&&Sc(t)}}return Ec(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&Sc(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=ge.current,Ii(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Oi,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[st]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||yd(e.nodeValue,n)),e||Ni(t)}else e=Ed(e).createTextNode(r),e[st]=t,t.stateNode=e}return Ec(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Ii(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[st]=t}else Li(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ec(t),a=!1}else a=Ri(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(js(t),t):(js(t),null)}if(js(t),t.flags&128)return t.lanes=n,t;if(n=r!==null,e=e!==null&&e.memoizedState!==null,n){r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool);var o=null;r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)}return n!==e&&n&&(t.child.flags|=8192),wc(t,t.updateQueue),Ec(t),null;case 4:return ye(),e===null&&ld(t.stateNode.containerInfo),Ec(t),null;case 10:return Wi(t.type),Ec(t),null;case 19:if(pe(Ms),a=t.memoizedState,a===null)return Ec(t),null;if(r=(t.flags&128)!=0,o=a.rendering,o===null)if(r)Tc(a,!1);else{if(Nl!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Ns(e),o!==null){for(t.flags|=128,Tc(a,!1),e=o.updateQueue,t.updateQueue=e,wc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)ui(n,e),n=n.sibling;return k(Ms,Ms.current&1|2),t.child}e=e.sibling}a.tail!==null&&De()>Ul&&(t.flags|=128,r=!0,Tc(a,!1),t.lanes=4194304)}else{if(!r)if(e=Ns(o),e!==null){if(t.flags|=128,r=!0,e=e.updateQueue,t.updateQueue=e,wc(t,e),Tc(a,!0),a.tail===null&&a.tailMode===`hidden`&&!o.alternate&&!z)return Ec(t),null}else 2*De()-a.renderingStartTime>Ul&&n!==536870912&&(t.flags|=128,r=!0,Tc(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(e=a.last,e===null?t.child=o:e.sibling=o,a.last=o)}return a.tail===null?(Ec(t),null):(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=De(),t.sibling=null,e=Ms.current,k(Ms,r?e&1|2:e&1),t);case 22:case 23:return js(t),za(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(Ec(t),t.subtreeFlags&6&&(t.flags|=8192)):Ec(t),n=t.updateQueue,n!==null&&wc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&pe(B),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Wi(na),Ec(t),null;case 25:return null;case 30:return null}throw Error(i(156,t.tag))}function Oc(e,t){switch(Di(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Wi(na),ye(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return xe(t),null;case 13:if(js(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));Li()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return pe(Ms),null;case 4:return ye(),null;case 10:return Wi(t.type),null;case 22:case 23:return js(t),za(),e!==null&&pe(B),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Wi(na),null;case 25:return null;default:return null}}function kc(e,t){switch(Di(t),t.tag){case 3:Wi(na),ye();break;case 26:case 27:case 5:xe(t);break;case 4:ye();break;case 13:js(t);break;case 19:pe(Ms);break;case 10:Wi(t.type);break;case 22:case 23:js(t),za(),e!==null&&pe(B);break;case 24:Wi(na)}}function Ac(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function jc(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function Mc(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Pa(t,n)}catch(t){Z(e,e.return,t)}}}function Nc(e,t,n){n.props=Rs(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Pc(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Fc(e,t){var n=e.ref,r=e.refCleanup;if(n!==null)if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}function Ic(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Lc(e,t,n){try{var r=e.stateNode;Cd(r,e.type,n,t),r[ct]=t}catch(t){Z(e,e.return,t)}}function Rc(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ld(e.type)||e.tag===4}function zc(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Rc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ld(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Bc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=bd));else if(r!==4&&(r===27&&Ld(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Bc(e,t,n),e=e.sibling;e!==null;)Bc(e,t,n),e=e.sibling}function Vc(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(r===27&&Ld(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Vc(e,t,n),e=e.sibling;e!==null;)Vc(e,t,n),e=e.sibling}function Hc(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Sd(t,r,n),t[st]=e,t[ct]=n}catch(t){Z(e,e.return,t)}}var Uc=!1,Wc=!1,Gc=!1,Kc=typeof WeakSet==`function`?WeakSet:Set,qc=null;function Jc(e,t){if(e=e.containerInfo,wd=Uf,e=kr(e),Ar(e)){if(`selectionStart`in e)var n={start:e.selectionStart,end:e.selectionEnd};else a:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var a=r.anchorOffset,o=r.focusNode;r=r.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==n||a!==0&&f.nodeType!==3||(c=s+a),f!==o||r!==0&&f.nodeType!==3||(l=s+r),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===n&&++u===a&&(c=s),p===o&&++d===r&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}n=c===-1||l===-1?null:{start:c,end:l}}else n=null}n||={start:0,end:0}}else n=null;for(Td={focusedElem:e,selectionRange:n},Uf=!1,qc=t;qc!==null;)if(t=qc,e=t.child,t.subtreeFlags&1024&&e!==null)e.return=t,qc=e;else for(;qc!==null;){switch(t=qc,o=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if(e&1024&&o!==null){e=void 0,n=t,a=o.memoizedProps,o=o.memoizedState,r=n.stateNode;try{var h=Rs(n.type,a,n.elementType===n.type);e=r.getSnapshotBeforeUpdate(h,o),r.__reactInternalSnapshotBeforeUpdate=e}catch(e){Z(n,n.return,e)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)zd(e);else if(n===1)switch(e.nodeName){case`HEAD`:case`HTML`:case`BODY`:zd(e);break;default:e.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(i(163))}if(e=t.sibling,e!==null){e.return=t.return,qc=e;break}qc=t.return}}function Yc(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:ll(e,n),r&4&&Ac(5,n);break;case 1:if(ll(e,n),r&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Rs(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}r&64&&Mc(n),r&512&&Pc(n,n.return);break;case 3:if(ll(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Pa(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Hc(n);case 26:case 5:ll(e,n),t===null&&r&4&&Ic(n),r&512&&Pc(n,n.return);break;case 12:ll(e,n);break;case 13:ll(e,n),r&4&&tl(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Fu.bind(null,n),Ud(e,n))));break;case 22:if(r=n.memoizedState!==null||Uc,!r){t=t!==null&&t.memoizedState!==null||Wc,i=Uc;var a=Wc;Uc=r,(Wc=t)&&!a?dl(e,n,(n.subtreeFlags&8772)!=0):ll(e,n),Uc=i,Wc=a}break;case 30:break;default:ll(e,n)}}function Xc(e){var t=e.alternate;t!==null&&(e.alternate=null,Xc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&ht(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Zc=null,Qc=!1;function $c(e,t,n){for(n=n.child;n!==null;)el(e,t,n),n=n.sibling}function el(e,t,n){if(Le&&typeof Le.onCommitFiberUnmount==`function`)try{Le.onCommitFiberUnmount(Ie,n)}catch{}switch(n.tag){case 26:Wc||Fc(n,t),$c(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Wc||Fc(n,t);var r=Zc,i=Qc;Ld(n.type)&&(Zc=n.stateNode,Qc=!1),$c(e,t,n),Jd(n.stateNode),Zc=r,Qc=i;break;case 5:Wc||Fc(n,t);case 6:if(r=Zc,i=Qc,Zc=null,$c(e,t,n),Zc=r,Qc=i,Zc!==null)if(Qc)try{(Zc.nodeType===9?Zc.body:Zc.nodeName===`HTML`?Zc.ownerDocument.body:Zc).removeChild(n.stateNode)}catch(e){Z(n,t,e)}else try{Zc.removeChild(n.stateNode)}catch(e){Z(n,t,e)}break;case 18:Zc!==null&&(Qc?(e=Zc,Rd(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),hp(e)):Rd(Zc,n.stateNode));break;case 4:r=Zc,i=Qc,Zc=n.stateNode.containerInfo,Qc=!0,$c(e,t,n),Zc=r,Qc=i;break;case 0:case 11:case 14:case 15:Wc||jc(2,n,t),Wc||jc(4,n,t),$c(e,t,n);break;case 1:Wc||(Fc(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Nc(n,t,r)),$c(e,t,n);break;case 21:$c(e,t,n);break;case 22:Wc=(r=Wc)||n.memoizedState!==null,$c(e,t,n),Wc=r;break;default:$c(e,t,n)}}function tl(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{hp(e)}catch(e){Z(t,t.return,e)}}function nl(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Kc),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Kc),t;default:throw Error(i(435,e.tag))}}function rl(e,t){var n=nl(e);t.forEach(function(t){var r=Iu.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))})}function il(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var a=n[r],o=e,s=t,c=s;a:for(;c!==null;){switch(c.tag){case 27:if(Ld(c.type)){Zc=c.stateNode,Qc=!1;break a}break;case 5:Zc=c.stateNode,Qc=!1;break a;case 3:case 4:Zc=c.stateNode.containerInfo,Qc=!0;break a}c=c.return}if(Zc===null)throw Error(i(160));el(o,s,a),Zc=null,Qc=!1,o=a.alternate,o!==null&&(o.return=null),a.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)ol(t,e),t=t.sibling}var al=null;function ol(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:il(t,e),sl(e),r&4&&(jc(3,e,e.return),Ac(3,e),jc(5,e,e.return));break;case 1:il(t,e),sl(e),r&512&&(Wc||n===null||Fc(n,n.return)),r&64&&Uc&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?r:n.concat(r))));break;case 26:var a=al;if(il(t,e),sl(e),r&512&&(Wc||n===null||Fc(n,n.return)),r&4){var o=n===null?null:n.memoizedState;if(r=e.memoizedState,n===null)if(r===null)if(e.stateNode===null){a:{r=e.type,n=e.memoizedProps,a=a.ownerDocument||a;b:switch(r){case`title`:o=a.getElementsByTagName(`title`)[0],(!o||o[mt]||o[st]||o.namespaceURI===`http://www.w3.org/2000/svg`||o.hasAttribute(`itemprop`))&&(o=a.createElement(r),a.head.insertBefore(o,a.querySelector(`head > title`))),Sd(o,r,n),o[st]=e,bt(o),r=o;break a;case`link`:var s=Cf(`link`,`href`,a).get(r+(n.href||``));if(s){for(var c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&o.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&o.getAttribute(`title`)===(n.title==null?null:n.title)&&o.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(c,1);break b}}o=a.createElement(r),Sd(o,r,n),a.head.appendChild(o);break;case`meta`:if(s=Cf(`meta`,`content`,a).get(r+(n.content||``))){for(c=0;c<s.length;c++)if(o=s[c],o.getAttribute(`content`)===(n.content==null?null:``+n.content)&&o.getAttribute(`name`)===(n.name==null?null:n.name)&&o.getAttribute(`property`)===(n.property==null?null:n.property)&&o.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){s.splice(c,1);break b}}o=a.createElement(r),Sd(o,r,n),a.head.appendChild(o);break;default:throw Error(i(468,r))}o[st]=e,bt(o),r=o}e.stateNode=r}else wf(a,e.type,e.stateNode);else e.stateNode=vf(a,r,e.memoizedProps);else o===r?r===null&&e.stateNode!==null&&Lc(e,e.memoizedProps,n.memoizedProps):(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,r===null?wf(a,e.type,e.stateNode):vf(a,r,e.memoizedProps))}break;case 27:il(t,e),sl(e),r&512&&(Wc||n===null||Fc(n,n.return)),n!==null&&r&4&&Lc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(il(t,e),sl(e),r&512&&(Wc||n===null||Fc(n,n.return)),e.flags&32){a=e.stateNode;try{Xt(a,``)}catch(t){Z(e,e.return,t)}}r&4&&e.stateNode!=null&&(a=e.memoizedProps,Lc(e,a,n===null?a:n.memoizedProps)),r&1024&&(Gc=!0);break;case 6:if(il(t,e),sl(e),r&4){if(e.stateNode===null)throw Error(i(162));r=e.memoizedProps,n=e.stateNode;try{n.nodeValue=r}catch(t){Z(e,e.return,t)}}break;case 3:if(Sf=null,a=al,al=Zd(t.containerInfo),il(t,e),al=a,sl(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{hp(t.containerInfo)}catch(t){Z(e,e.return,t)}Gc&&(Gc=!1,cl(e));break;case 4:r=al,al=Zd(e.stateNode.containerInfo),il(t,e),sl(e),al=r;break;case 12:il(t,e),sl(e);break;case 13:il(t,e),sl(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Hl=De()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,rl(e,r)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,u=Uc,d=Wc;if(Uc=u||a,Wc=d||l,il(t,e),Wc=d,Uc=u,sl(e),r&8192)a:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Uc||Wc||ul(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(o=l.stateNode,a)s=o.style,typeof s.setProperty==`function`?s.setProperty(`display`,`none`,`important`):s.display=`none`;else{c=l.stateNode;var f=l.memoizedProps.style,p=f!=null&&f.hasOwnProperty(`display`)?f.display:null;c.style.display=p==null||typeof p==`boolean`?``:(``+p).trim()}}catch(e){Z(l,l.return,e)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?``:l.memoizedProps}catch(e){Z(l,l.return,e)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break a;for(;t.sibling===null;){if(t.return===null||t.return===e)break a;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(n=r.retryQueue,n!==null&&(r.retryQueue=null,rl(e,n))));break;case 19:il(t,e),sl(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,rl(e,r)));break;case 30:break;case 21:break;default:il(t,e),sl(e)}}function sl(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Rc(r)){n=r;break}r=r.return}if(n==null)throw Error(i(160));switch(n.tag){case 27:var a=n.stateNode;Vc(e,zc(e),a);break;case 5:var o=n.stateNode;n.flags&32&&(Xt(o,``),n.flags&=-33),Vc(e,zc(e),o);break;case 3:case 4:var s=n.stateNode.containerInfo;Bc(e,zc(e),s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function cl(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;cl(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function ll(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Yc(e,t.alternate,t),t=t.sibling}function ul(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:jc(4,t,t.return),ul(t);break;case 1:Fc(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount==`function`&&Nc(t,t.return,n),ul(t);break;case 27:Jd(t.stateNode);case 26:case 5:Fc(t,t.return),ul(t);break;case 22:t.memoizedState===null&&ul(t);break;case 30:ul(t);break;default:ul(t)}e=e.sibling}}function dl(e,t,n){for(n&&=(t.subtreeFlags&8772)!=0,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags;switch(a.tag){case 0:case 11:case 15:dl(i,a,n),Ac(4,a);break;case 1:if(dl(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var s=r.stateNode;try{var c=i.shared.hiddenCallbacks;if(c!==null)for(i.shared.hiddenCallbacks=null,i=0;i<c.length;i++)Na(c[i],s)}catch(e){Z(r,r.return,e)}}n&&o&64&&Mc(a),Pc(a,a.return);break;case 27:Hc(a);case 26:case 5:dl(i,a,n),n&&r===null&&o&4&&Ic(a),Pc(a,a.return);break;case 12:dl(i,a,n);break;case 13:dl(i,a,n),n&&o&4&&tl(i,a);break;case 22:a.memoizedState===null&&dl(i,a,n),Pc(a,a.return);break;case 30:break;default:dl(i,a,n)}t=t.sibling}}function fl(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ia(n))}function pl(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ia(e))}function ml(e,t,n,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)hl(e,t,n,r),t=t.sibling}function hl(e,t,n,r){var i=t.flags;switch(t.tag){case 0:case 11:case 15:ml(e,t,n,r),i&2048&&Ac(9,t);break;case 1:ml(e,t,n,r);break;case 3:ml(e,t,n,r),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ia(e)));break;case 12:if(i&2048){ml(e,t,n,r),e=t.stateNode;try{var a=t.memoizedProps,o=a.id,s=a.onPostCommit;typeof s==`function`&&s(o,t.alternate===null?`mount`:`update`,e.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else ml(e,t,n,r);break;case 13:ml(e,t,n,r);break;case 23:break;case 22:a=t.stateNode,o=t.alternate,t.memoizedState===null?a._visibility&2?ml(e,t,n,r):(a._visibility|=2,gl(e,t,n,r,(t.subtreeFlags&10256)!=0)):a._visibility&2?ml(e,t,n,r):_l(e,t),i&2048&&fl(o,t);break;case 24:ml(e,t,n,r),i&2048&&pl(t.alternate,t);break;default:ml(e,t,n,r)}}function gl(e,t,n,r,i){for(i&&=(t.subtreeFlags&10256)!=0,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:gl(a,o,s,c,i),Ac(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,gl(a,o,s,c,i)):u._visibility&2?gl(a,o,s,c,i):_l(a,o),i&&l&2048&&fl(o.alternate,o);break;case 24:gl(a,o,s,c,i),i&&l&2048&&pl(o.alternate,o);break;default:gl(a,o,s,c,i)}t=t.sibling}}function _l(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:_l(n,r),i&2048&&fl(r.alternate,r);break;case 24:_l(n,r),i&2048&&pl(r.alternate,r);break;default:_l(n,r)}t=t.sibling}}var vl=8192;function yl(e){if(e.subtreeFlags&vl)for(e=e.child;e!==null;)bl(e),e=e.sibling}function bl(e){switch(e.tag){case 26:yl(e),e.flags&vl&&e.memoizedState!==null&&kf(al,e.memoizedState,e.memoizedProps);break;case 5:yl(e);break;case 3:case 4:var t=al;al=Zd(e.stateNode.containerInfo),yl(e),al=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=vl,vl=16777216,yl(e),vl=t):yl(e));break;default:yl(e)}}function xl(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Sl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];qc=r,Tl(r,e)}xl(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Cl(e),e=e.sibling}function Cl(e){switch(e.tag){case 0:case 11:case 15:Sl(e),e.flags&2048&&jc(9,e,e.return);break;case 3:Sl(e);break;case 12:Sl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,wl(e)):Sl(e);break;default:Sl(e)}}function wl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];qc=r,Tl(r,e)}xl(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:jc(8,t,t.return),wl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,wl(t));break;default:wl(t)}e=e.sibling}}function Tl(e,t){for(;qc!==null;){var n=qc;switch(n.tag){case 0:case 11:case 15:jc(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ia(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,qc=r;else a:for(n=e;qc!==null;){r=qc;var i=r.sibling,a=r.return;if(Xc(r),r===n){qc=null;break a}if(i!==null){i.return=a,qc=i;break a}qc=a}}}var El={getCacheForType:function(e){var t=Xi(na),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n}},Dl=typeof WeakMap==`function`?WeakMap:Map,K=0,q=null,J=null,Y=0,X=0,Ol=null,kl=!1,Al=!1,jl=!1,Ml=0,Nl=0,Pl=0,Fl=0,Il=0,Ll=0,Rl=0,zl=null,Bl=null,Vl=!1,Hl=0,Ul=1/0,Wl=null,Gl=null,Kl=0,ql=null,Jl=null,Yl=0,Xl=0,Zl=null,Ql=null,$l=0,eu=null;function tu(){if(K&2&&Y!==0)return Y&-Y;if(D.T!==null){var e=sa;return e===0?Qu():e}return it()}function nu(){Ll===0&&(Ll=!(Y&536870912)||z?Ye():536870912);var e=Es.current;return e!==null&&(e.flags|=32),Ll}function ru(e,t,n){(e===q&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(uu(e,0),su(e,Y,Ll,!1)),Qe(e,n),(!(K&2)||e!==q)&&(e===q&&(!(K&2)&&(Fl|=n),Nl===4&&su(e,Y,Ll,!1)),Wu(e))}function iu(e,t,n){if(K&6)throw Error(i(327));var r=!n&&(t&124)==0&&(t&e.expiredLanes)===0||qe(e,t),a=r?_u(e,t):hu(e,t,!0),o=r;do{if(a===0){Al&&!r&&su(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!ou(n)){a=hu(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=zl;var l=c.current.memoizedState.isDehydrated;if(l&&(uu(c,s).flags|=256),s=hu(c,s,!1),s!==2){if(jl&&!l){c.errorRecoveryDisabledLanes|=o,Fl|=o,a=4;break a}o=Bl,Bl=a,o!==null&&(Bl===null?Bl=o:Bl.push.apply(Bl,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){uu(e,0),su(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t)break;case 6:su(r,t,Ll,!kl);break a;case 2:Bl=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=Hl+300-De(),10<a)){if(su(r,t,Ll,!kl),Ke(r,0,!0)!==0)break a;r.timeoutHandle=Md(au.bind(null,r,n,Bl,Wl,Vl,t,Ll,Fl,Rl,kl,o,2,-0,0),a);break a}au(r,n,Bl,Wl,Vl,t,Ll,Fl,Rl,kl,o,0,-0,0)}}break}while(1);Wu(e)}function au(e,t,n,r,i,a,o,s,c,l,u,d,f,p){if(e.timeoutHandle=-1,d=t.subtreeFlags,(d&8192||(d&16785408)==16785408)&&(Df={stylesheets:null,count:0,unsuspend:Of},bl(t),d=Af(),d!==null)){e.cancelPendingCommit=d(wu.bind(null,e,t,a,n,r,i,o,s,c,u,1,f,p)),su(e,a,o,!l);return}wu(e,t,a,n,r,i,o,s,c)}function ou(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!wr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function su(e,t,n,r){t&=~Il,t&=~Fl,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-ze(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&et(e,n,t)}function cu(){return K&6?!0:(Gu(0,!1),!1)}function lu(){if(J!==null){if(X===0)var e=J.return;else e=J,Hi=Vi=null,ro(e),_s=null,vs=0,e=J;for(;e!==null;)kc(e.alternate,e),e=e.return;J=null}}function uu(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,Nd(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),lu(),q=e,J=n=li(e.current,null),Y=t,X=0,Ol=null,kl=!1,Al=qe(e,t),jl=!1,Rl=Ll=Il=Fl=Pl=Nl=0,Bl=zl=null,Vl=!1,t&8&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var i=31-ze(r),a=1<<i;t|=e[i],r&=~a}return Ml=t,$r(),n}function du(e,t){W=null,D.H=ps,t===ma||t===ga?(t=xa(),X=3):t===ha?(t=xa(),X=4):X=t===Ys?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Ol=t,J===null&&(Nl=1,Us(e,Yr(t,e.current)))}function fu(){var e=D.H;return D.H=ps,e===null?ps:e}function pu(){var e=D.A;return D.A=El,e}function mu(){Nl=4,kl||(Y&4194048)!==Y&&Es.current!==null||(Al=!0),!(Pl&134217727)&&!(Fl&134217727)||q===null||su(q,Y,Ll,!1)}function hu(e,t,n){var r=K;K|=2;var i=fu(),a=pu();(q!==e||Y!==t)&&(Wl=null,uu(e,t)),t=!1;var o=Nl;a:do try{if(X!==0&&J!==null){var s=J,c=Ol;switch(X){case 8:lu(),o=6;break a;case 3:case 2:case 9:case 6:Es.current===null&&(t=!0);var l=X;if(X=0,Ol=null,xu(e,s,c,l),n&&Al){o=0;break a}break;default:l=X,X=0,Ol=null,xu(e,s,c,l)}}gu(),o=Nl;break}catch(t){du(e,t)}while(1);return t&&e.shellSuspendCounter++,Hi=Vi=null,K=r,D.H=i,D.A=a,J===null&&(q=null,Y=0,$r()),o}function gu(){for(;J!==null;)yu(J)}function _u(e,t){var n=K;K|=2;var r=fu(),a=pu();q!==e||Y!==t?(Wl=null,Ul=De()+500,uu(e,t)):Al=qe(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=Ol;b:switch(X){case 1:X=0,Ol=null,xu(e,t,o,1);break;case 2:case 9:if(_a(o)){X=0,Ol=null,bu(t);break}t=function(){X!==2&&X!==9||q!==e||(X=7),Wu(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:_a(o)?(X=0,Ol=null,bu(t)):(X=0,Ol=null,xu(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(!s||Ef(s)){X=0,Ol=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,Su(u))}break b}}X=0,Ol=null,xu(e,t,o,5);break;case 6:X=0,Ol=null,xu(e,t,o,6);break;case 8:lu(),Nl=6;break a;default:throw Error(i(462))}}vu();break}catch(t){du(e,t)}while(1);return Hi=Vi=null,D.H=r,D.A=a,K=n,J===null?(q=null,Y=0,$r(),Nl):0}function vu(){for(;J!==null&&!Te();)yu(J)}function yu(e){var t=xc(e.alternate,e,Ml);e.memoizedProps=e.pendingProps,t===null?Su(e):J=t}function bu(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=ac(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=ac(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:ro(t);default:kc(n,t),t=J=ui(t,Ml),t=xc(n,t,Ml)}e.memoizedProps=e.pendingProps,t===null?Su(e):J=t}function xu(e,t,n,r){Hi=Vi=null,ro(t),_s=null,vs=0;var i=t.return;try{if(Js(e,i,t,n,Y)){Nl=1,Us(e,Yr(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;Nl=1,Us(e,Yr(n,e.current)),J=null;return}t.flags&32768?(z||r===1?e=!0:Al||Y&536870912?e=!1:(kl=e=!0,(r===2||r===9||r===3||r===6)&&(r=Es.current,r!==null&&r.tag===13&&(r.flags|=16384))),Cu(t,e)):Su(t)}function Su(e){var t=e;do{if(t.flags&32768){Cu(t,kl);return}e=t.return;var n=Dc(t.alternate,t,Ml);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);Nl===0&&(Nl=5)}function Cu(e,t){do{var n=Oc(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);Nl=6,J=null}function wu(e,t,n,r,a,o,s,c,l){e.cancelPendingCommit=null;do ku();while(Kl!==0);if(K&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));if(o=t.lanes|t.childLanes,o|=Qr,$e(e,n,o,s,c,l),e===q&&(J=q=null,Y=0),Jl=t,ql=e,Yl=n,Xl=o,Zl=a,Ql=r,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Lu(je,function(){return Au(!0),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!=0,t.subtreeFlags&13878||r){r=D.T,D.T=null,a=O.p,O.p=2,s=K,K|=4;try{Jc(e,t,n)}finally{K=s,O.p=a,D.T=r}}Kl=1,Tu(),Eu(),Du()}}function Tu(){if(Kl===1){Kl=0;var e=ql,t=Jl,n=(t.flags&13878)!=0;if(t.subtreeFlags&13878||n){n=D.T,D.T=null;var r=O.p;O.p=2;var i=K;K|=4;try{ol(t,e);var a=Td,o=kr(e.containerInfo),s=a.focusedElem,c=a.selectionRange;if(o!==s&&s&&s.ownerDocument&&Or(s.ownerDocument.documentElement,s)){if(c!==null&&Ar(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Dr(s,h),v=Dr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}Uf=!!wd,Td=wd=null}finally{K=i,O.p=r,D.T=n}}e.current=t,Kl=2}}function Eu(){if(Kl===2){Kl=0;var e=ql,t=Jl,n=(t.flags&8772)!=0;if(t.subtreeFlags&8772||n){n=D.T,D.T=null;var r=O.p;O.p=2;var i=K;K|=4;try{Yc(e,t.alternate,t)}finally{K=i,O.p=r,D.T=n}}Kl=3}}function Du(){if(Kl===4||Kl===3){Kl=0,Ee();var e=ql,t=Jl,n=Yl,r=Ql;t.subtreeFlags&10256||t.flags&10256?Kl=5:(Kl=0,Jl=ql=null,Ou(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(Gl=null),rt(n),t=t.stateNode,Le&&typeof Le.onCommitFiberRoot==`function`)try{Le.onCommitFiberRoot(Ie,t,void 0,(t.current.flags&128)==128)}catch{}if(r!==null){t=D.T,i=O.p,O.p=2,D.T=null;try{for(var a=e.onRecoverableError,o=0;o<r.length;o++){var s=r[o];a(s.value,{componentStack:s.stack})}}finally{D.T=t,O.p=i}}Yl&3&&ku(),Wu(e),i=e.pendingLanes,n&4194090&&i&42?e===eu?$l++:($l=0,eu=e):$l=0,Gu(0,!1)}}function Ou(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ia(t)))}function ku(e){return Tu(),Eu(),Du(),Au(e)}function Au(){if(Kl!==5)return!1;var e=ql,t=Xl;Xl=0;var n=rt(Yl),r=D.T,a=O.p;try{O.p=32>n?32:n,D.T=null,n=Zl,Zl=null;var o=ql,s=Yl;if(Kl=0,Jl=ql=null,Yl=0,K&6)throw Error(i(331));var c=K;if(K|=4,Cl(o.current),hl(o,o.current,s,n),K=c,Gu(0,!1),Le&&typeof Le.onPostCommitFiberRoot==`function`)try{Le.onPostCommitFiberRoot(Ie,o)}catch{}return!0}finally{O.p=a,D.T=r,Ou(e,t)}}function ju(e,t,n){t=Yr(n,t),t=Gs(e.stateNode,t,2),e=Da(e,t,2),e!==null&&(Qe(e,2),Wu(e))}function Z(e,t,n){if(e.tag===3)ju(e,e,n);else for(;t!==null;){if(t.tag===3){ju(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(Gl===null||!Gl.has(r))){e=Yr(n,e),n=Ks(2),r=Da(t,n,2),r!==null&&(qs(n,r,t,e),Qe(r,2),Wu(r));break}}t=t.return}}function Mu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Dl;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(jl=!0,i.add(n),e=Nu.bind(null,e,t,n),t.then(e,e))}function Nu(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,q===e&&(Y&n)===n&&(Nl===4||Nl===3&&(Y&62914560)===Y&&300>De()-Hl?!(K&2)&&uu(e,0):Il|=n,Rl===Y&&(Rl=0)),Wu(e)}function Pu(e,t){t===0&&(t=Xe()),e=ni(e,t),e!==null&&(Qe(e,t),Wu(e))}function Fu(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Pu(e,n)}function Iu(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),Pu(e,n)}function Lu(e,t){return Ce(e,t)}var Ru=null,zu=null,Bu=!1,Vu=!1,Hu=!1,Uu=0;function Wu(e){e!==zu&&e.next===null&&(zu===null?Ru=zu=e:zu=zu.next=e),Vu=!0,Bu||(Bu=!0,Zu())}function Gu(e,t){if(!Hu&&Vu){Hu=!0;do for(var n=!1,r=Ru;r!==null;){if(!t)if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-ze(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Xu(r,a))}else a=Y,a=Ke(r,r===q?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||qe(r,a)||(n=!0,Xu(r,a));r=r.next}while(n);Hu=!1}}function Ku(){qu()}function qu(){Vu=Bu=!1;var e=0;Uu!==0&&(jd()&&(e=Uu),Uu=0);for(var t=De(),n=null,r=Ru;r!==null;){var i=r.next,a=Ju(r,t);a===0?(r.next=null,n===null?Ru=i:n.next=i,i===null&&(zu=n)):(n=r,(e!==0||a&3)&&(Vu=!0)),r=i}Gu(e,!1)}function Ju(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-ze(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=Je(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=q,n=Y,n=Ke(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&we(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||qe(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&we(r),rt(n)){case 2:case 8:n=Ae;break;case 32:n=je;break;case 268435456:n=Ne;break;default:n=je}return r=Yu.bind(null,e),n=Ce(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&we(r),e.callbackPriority=2,e.callbackNode=null,2}function Yu(e,t){if(Kl!==0&&Kl!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(ku(!0)&&e.callbackNode!==n)return null;var r=Y;return r=Ke(e,e===q?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(iu(e,r,t),Ju(e,De()),e.callbackNode!=null&&e.callbackNode===n?Yu.bind(null,e):null)}function Xu(e,t){if(ku())return null;iu(e,t,!0)}function Zu(){Fd(function(){K&6?Ce(ke,Ku):qu()})}function Qu(){return Uu===0&&(Uu=Ye()),Uu}function $u(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:rn(``+e)}function ed(e,t){var n=t.ownerDocument.createElement(`input`);return n.name=t.name,n.value=t.value,e.id&&n.setAttribute(`form`,e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function td(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=$u((i[ct]||null).action),o=r.submitter;o&&(t=(t=o[ct]||null)?$u(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Tn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Uu!==0){var e=o?ed(i,o):new FormData(i);$o(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=o?ed(i,o):new FormData(i),$o(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var nd=0;nd<Kr.length;nd++){var rd=Kr[nd];qr(rd.toLowerCase(),`on`+(rd[0].toUpperCase()+rd.slice(1)))}qr(Rr,`onAnimationEnd`),qr(zr,`onAnimationIteration`),qr(Br,`onAnimationStart`),qr(`dblclick`,`onDoubleClick`),qr(`focusin`,`onFocus`),qr(`focusout`,`onBlur`),qr(Vr,`onTransitionRun`),qr(Hr,`onTransitionStart`),qr(Ur,`onTransitionCancel`),qr(Wr,`onTransitionEnd`),wt(`onMouseEnter`,[`mouseout`,`mouseover`]),wt(`onMouseLeave`,[`mouseout`,`mouseover`]),wt(`onPointerEnter`,[`pointerout`,`pointerover`]),wt(`onPointerLeave`,[`pointerout`,`pointerover`]),Ct(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Ct(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Ct(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Ct(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Ct(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Ct(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var id=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),ad=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(id));function od(e,t){t=(t&4)!=0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){zs(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){zs(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[ut];n===void 0&&(n=t[ut]=new Set);var r=e+`__bubble`;n.has(r)||(ud(t,e,2,!1),n.add(r))}function sd(e,t,n){var r=0;t&&(r|=4),ud(n,e,r,t)}var cd=`_reactListening`+Math.random().toString(36).slice(2);function ld(e){if(!e[cd]){e[cd]=!0,xt.forEach(function(t){t!==`selectionchange`&&(ad.has(t)||sd(t,!1,e),sd(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[cd]||(t[cd]=!0,sd(`selectionchange`,!1,t))}}function ud(e,t,n,r){switch(Xf(t)){case 2:var i=Wf;break;case 8:i=Gf;break;default:i=Kf}n=i.bind(null,t,n,e),i=void 0,!mn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function dd(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=gt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}dn(function(){var r=a,i=on(n),s=[];a:{var c=Gr.get(e);if(c!==void 0){var l=Tn,u=e;switch(e){case`keypress`:if(bn(n)===0)break a;case`keydown`:case`keyup`:l=Vn;break;case`focusin`:u=`focus`,l=Mn;break;case`focusout`:u=`blur`,l=Mn;break;case`beforeblur`:case`afterblur`:l=Mn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=An;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=jn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Un;break;case Rr:case zr:case Br:l=Nn;break;case Wr:l=Wn;break;case`scroll`:case`scrollend`:l=Dn;break;case`wheel`:l=Gn;break;case`copy`:case`cut`:case`paste`:l=Pn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=Hn;break;case`toggle`:case`beforetoggle`:l=Kn}var d=(t&4)!=0,f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=fn(m,p),g!=null&&d.push(fd(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(c=e===`mouseover`||e===`pointerover`,l=e===`mouseout`||e===`pointerout`,c&&n!==an&&(u=n.relatedTarget||n.fromElement)&&(gt(u)||u[lt]))break a;if((l||c)&&(c=i.window===i?i:(c=i.ownerDocument)?c.defaultView||c.parentWindow:window,l?(u=n.relatedTarget||n.toElement,l=r,u=u?gt(u):null,u!==null&&(f=o(u),d=u.tag,u!==f||d!==5&&d!==27&&d!==6)&&(u=null)):(l=null,u=r),l!==u)){if(d=An,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=Hn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=l==null?c:vt(l),h=u==null?c:vt(u),c=new d(g,m+`leave`,l,n,i),c.target=f,c.relatedTarget=h,g=null,gt(i)===r&&(d=new d(p,m+`enter`,u,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,l&&u)b:{for(d=l,p=u,m=0,h=d;h;h=md(h))m++;for(h=0,g=p;g;g=md(g))h++;for(;0<m-h;)d=md(d),m--;for(;0<h-m;)p=md(p),h--;for(;m--;){if(d===p||p!==null&&d===p.alternate)break b;d=md(d),p=md(p)}d=null}else d=null;l!==null&&hd(s,c,l,d,!1),u!==null&&f!==null&&hd(s,f,u,d,!0)}}a:{if(c=r?vt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=fr;else if(or(c))if(pr)_=Sr;else{_=br;var v=yr}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&en(r.elementType)&&(_=fr):_=xr;if(_&&=_(e,r)){sr(s,_,n,i);break a}v&&v(e,c,r),e===`focusout`&&r&&c.type===`number`&&r.memoizedProps.value!=null&&qt(c,`number`,c.value)}switch(v=r?vt(r):window,e){case`focusin`:(or(v)||v.contentEditable===`true`)&&(I=v,jr=r,L=null);break;case`focusout`:L=jr=I=null;break;case`mousedown`:R=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:R=!1,Mr(s,n,i);break;case`selectionchange`:if(F)break;case`keydown`:case`keyup`:Mr(s,n,i)}var y;if(Jn)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else nr?er(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(Zn&&n.locale!==`ko`&&(nr||b!==`onCompositionStart`?b===`onCompositionEnd`&&nr&&(y=yn()):(gn=i,_n=`value`in gn?gn.value:gn.textContent,nr=!0)),v=pd(r,b),0<v.length&&(b=new Fn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=tr(n),y!==null&&(b.data=y)))),(y=Xn?rr(e,n):ir(e,n))&&(b=pd(r,`onBeforeInput`),0<b.length&&(v=new Fn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),td(s,e,r,n,i)}od(s,t)})}function fd(e,t,n){return{instance:e,listener:t,currentTarget:n}}function pd(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=fn(e,n),i!=null&&r.unshift(fd(e,i,a)),i=fn(e,t),i!=null&&r.push(fd(e,i,a))),e.tag===3)return r;e=e.return}return[]}function md(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function hd(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=fn(n,a),l!=null&&o.unshift(fd(n,l,c))):i||(l=fn(n,a),l!=null&&o.push(fd(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var gd=/\r\n?/g,_d=/\u0000|\uFFFD/g;function vd(e){return(typeof e==`string`?e:``+e).replace(gd,`
`).replace(_d,``)}function yd(e,t){return t=vd(t),vd(e)===t}function bd(){}function $(e,t,n,r,a,o){switch(n){case`children`:typeof r==`string`?t===`body`||t===`textarea`&&r===``||Xt(e,r):(typeof r==`number`||typeof r==`bigint`)&&t!==`body`&&Xt(e,``+r);break;case`className`:At(e,`class`,r);break;case`tabIndex`:At(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:At(e,n,r);break;case`style`:$t(e,r,o);break;case`data`:if(t!==`object`){At(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=rn(``+r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}else typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null)));if(r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=rn(``+r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=bd);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=rn(``+r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``+r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),kt(e,`popover`,r);break;case`xlinkActuate`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:jt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:jt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:kt(e,`is`,r);break;case`innerText`:case`textContent`:break;default:(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)&&(n=tn.get(n)||n,kt(e,n,r))}}function xd(e,t,n,r,a,o){switch(n){case`style`:$t(e,r,o);break;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));e.innerHTML=n}}break;case`children`:typeof r==`string`?Xt(e,r):(typeof r==`number`||typeof r==`bigint`)&&Xt(e,``+r);break;case`onScroll`:r!=null&&Q(`scroll`,e);break;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);break;case`onClick`:r!=null&&(e.onclick=bd);break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:break;case`innerText`:case`textContent`:break;default:if(!St.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),t=n.slice(2,a?n.length-7:void 0),o=e[ct]||null,o=o==null?null:o[n],typeof o==`function`&&e.removeEventListener(t,o,a),typeof r==`function`)){typeof o!=`function`&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,r,a);break a}n in e?e[n]=r:!0===r?e.setAttribute(n,``):kt(e,n,r)}}}function Sd(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}Kt(e,o,c,l,u,s,a,!1),Ht(e);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Jt(e,!!r,n,!0):Jt(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}M(e,r,a,o),Ht(e);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<id.length;r++)Q(id[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(en(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&xd(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}function Cd(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:o=m;break;case`name`:a=m;break;case`checked`:u=m;break;case`defaultChecked`:d=m;break;case`value`:s=m;break;case`defaultValue`:c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}Gt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:p=o;break;case`defaultValue`:c=o;break;case`multiple`:s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Jt(e,!!n,n?[]:``,!1):Jt(e,!!n,t,!0)):Jt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:p=a;break;case`defaultValue`:m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}Yt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(en(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&xd(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||xd(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}var wd=null,Td=null;function Ed(e){return e.nodeType===9?e:e.ownerDocument}function Dd(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function Od(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function kd(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ad=null;function jd(){var e=window.event;return e&&e.type===`popstate`?e===Ad?!1:(Ad=e,!0):(Ad=null,!1)}var Md=typeof setTimeout==`function`?setTimeout:void 0,Nd=typeof clearTimeout==`function`?clearTimeout:void 0,Pd=typeof Promise==`function`?Promise:void 0,Fd=typeof queueMicrotask==`function`?queueMicrotask:Pd===void 0?Md:function(e){return Pd.resolve(null).then(e).catch(Id)};function Id(e){setTimeout(function(){throw e})}function Ld(e){return e===`head`}function Rd(e,t){var n=t,r=0,i=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n===`/$`){if(0<r&&8>r){n=r;var o=e.ownerDocument;if(n&1&&Jd(o.documentElement),n&2&&Jd(o.body),n&4)for(n=o.head,Jd(n),o=n.firstChild;o;){var s=o.nextSibling,c=o.nodeName;o[mt]||c===`SCRIPT`||c===`STYLE`||c===`LINK`&&o.rel.toLowerCase()===`stylesheet`||n.removeChild(o),o=s}}if(i===0){e.removeChild(a),hp(t);return}i--}else n===`$`||n===`$?`||n===`$!`?i++:r=n.charCodeAt(0)-48;else r=0;n=a}while(n);hp(t)}function zd(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:zd(n),ht(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function Bd(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r)if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e;else if(!e[mt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=Wd(e.nextSibling),e===null)break}return null}function Vd(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=Wd(e.nextSibling),e===null))return null;return e}function Hd(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState===`complete`}function Ud(e,t){var n=e.ownerDocument;if(e.data!==`$?`||n.readyState===`complete`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function Wd(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`F!`||t===`F`)break;if(t===`/$`)return null}}return e}var Gd=null;function Kd(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`){if(t===0)return e;t--}else n===`/$`&&t++}e=e.previousSibling}return null}function qd(e,t,n){switch(t=Ed(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function Jd(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);ht(e)}var Yd=new Map,Xd=new Set;function Zd(e){return typeof e.getRootNode==`function`?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Qd=O.d;O.d={f:$d,r:ef,D:rf,C:af,L:of,m:sf,X:lf,S:cf,M:uf};function $d(){var e=Qd.f(),t=cu();return e||t}function ef(e){var t=_t(e);t!==null&&t.tag===5&&t.type===`form`?ts(t):Qd.r(e)}var tf=typeof document>`u`?null:document;function nf(e,t,n){var r=tf;if(r&&typeof t==`string`&&t){var i=j(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),Xd.has(i)||(Xd.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),Sd(t,`link`,e),bt(t),r.head.appendChild(t)))}}function rf(e){Qd.D(e),nf(`dns-prefetch`,e,null)}function af(e,t){Qd.C(e,t),nf(`preconnect`,e,t)}function of(e,t,n){Qd.L(e,t,n);var r=tf;if(r&&e&&t){var i=`link[rel="preload"][as="`+j(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+j(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+j(n.imageSizes)+`"]`)):i+=`[href="`+j(e)+`"]`;var a=i;switch(t){case`style`:a=ff(e);break;case`script`:a=gf(e)}Yd.has(a)||(e=f({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),Yd.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(pf(a))||t===`script`&&r.querySelector(_f(a))||(t=r.createElement(`link`),Sd(t,`link`,e),bt(t),r.head.appendChild(t)))}}function sf(e,t){Qd.m(e,t);var n=tf;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+j(r)+`"][href="`+j(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=gf(e)}if(!Yd.has(a)&&(e=f({rel:`modulepreload`,href:e},t),Yd.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(_f(a)))return}r=n.createElement(`link`),Sd(r,`link`,e),bt(r),n.head.appendChild(r)}}}function cf(e,t,n){Qd.S(e,t,n);var r=tf;if(r&&e){var i=yt(r).hoistableStyles,a=ff(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(pf(a)))s.loading=5;else{e=f({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=Yd.get(a))&&bf(e,n);var c=o=r.createElement(`link`);bt(c),Sd(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,yf(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function lf(e,t){Qd.X(e,t);var n=tf;if(n&&e){var r=yt(n).hoistableScripts,i=gf(e),a=r.get(i);a||(a=n.querySelector(_f(i)),a||(e=f({src:e,async:!0},t),(t=Yd.get(i))&&xf(e,t),a=n.createElement(`script`),bt(a),Sd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function uf(e,t){Qd.M(e,t);var n=tf;if(n&&e){var r=yt(n).hoistableScripts,i=gf(e),a=r.get(i);a||(a=n.querySelector(_f(i)),a||(e=f({src:e,async:!0,type:`module`},t),(t=Yd.get(i))&&xf(e,t),a=n.createElement(`script`),bt(a),Sd(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function df(e,t,n,r){var a=(a=ge.current)?Zd(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(t=ff(n.href),n=yt(a).hoistableStyles,r=n.get(t),r||(r={type:`style`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=ff(n.href);var o=yt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(pf(e)))&&!o._p&&(s.instance=o,s.state.loading=5),Yd.has(e)||(n={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Yd.set(e,n),o||hf(a,e,n,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(t=gf(n),n=yt(a).hoistableScripts,r=n.get(t),r||(r={type:`script`,instance:null,count:0,state:null},n.set(t,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function ff(e){return`href="`+j(e)+`"`}function pf(e){return`link[rel="stylesheet"][`+e+`]`}function mf(e){return f({},e,{"data-precedence":e.precedence,precedence:null})}function hf(e,t,n,r){e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)?r.loading=1:(t=e.createElement(`link`),r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2}),Sd(t,`link`,n),bt(t),e.head.appendChild(t))}function gf(e){return`[src="`+j(e)+`"]`}function _f(e){return`script[async]`+e}function vf(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+j(n.href)+`"]`);if(r)return t.instance=r,bt(r),r;var a=f({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),bt(r),Sd(r,`style`,a),yf(r,n.precedence,e),t.instance=r;case`stylesheet`:a=ff(n.href);var o=e.querySelector(pf(a));if(o)return t.state.loading|=4,t.instance=o,bt(o),o;r=mf(n),(a=Yd.get(a))&&bf(r,a),o=(e.ownerDocument||e).createElement(`link`),bt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Sd(o,`link`,r),t.state.loading|=4,yf(o,n.precedence,e),t.instance=o;case`script`:return o=gf(n.src),(a=e.querySelector(_f(o)))?(t.instance=a,bt(a),a):(r=n,(a=Yd.get(o))&&(r=f({},n),xf(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),bt(a),Sd(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,yf(r,n.precedence,e));return t.instance}function yf(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function bf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function xf(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Sf=null;function Cf(e,t,n){if(Sf===null){var r=new Map,i=Sf=new Map;i.set(n,r)}else i=Sf,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[mt]||a[st]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function wf(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function Tf(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Ef(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}var Df=null;function Of(){}function kf(e,t,n){if(Df===null)throw Error(i(475));var r=Df;if(t.type===`stylesheet`&&(typeof n.media!=`string`||!1!==matchMedia(n.media).matches)&&!(t.state.loading&4)){if(t.instance===null){var a=ff(n.href),o=e.querySelector(pf(a));if(o){e=o._p,typeof e==`object`&&e&&typeof e.then==`function`&&(r.count++,r=jf.bind(r),e.then(r,r)),t.state.loading|=4,t.instance=o,bt(o);return}o=e.ownerDocument||e,n=mf(n),(a=Yd.get(a))&&bf(n,a),o=o.createElement(`link`),bt(o);var s=o;s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),Sd(o,`link`,n),t.instance=o}r.stylesheets===null&&(r.stylesheets=new Map),r.stylesheets.set(t,e),(e=t.state.preload)&&!(t.state.loading&3)&&(r.count++,t=jf.bind(r),e.addEventListener(`load`,t),e.addEventListener(`error`,t))}}function Af(){if(Df===null)throw Error(i(475));var e=Df;return e.stylesheets&&e.count===0&&Nf(e,e.stylesheets),0<e.count?function(t){var n=setTimeout(function(){if(e.stylesheets&&Nf(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(n)}}:null}function jf(){if(this.count--,this.count===0){if(this.stylesheets)Nf(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Mf=null;function Nf(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Mf=new Map,t.forEach(Pf,e),Mf=null,jf.call(e))}function Pf(e,t){if(!(t.state.loading&4)){var n=Mf.get(e);if(n)var r=n.get(null);else{n=new Map,Mf.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=jf.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Ff={$$typeof:C,Provider:null,Consumer:null,_currentValue:le,_currentValue2:le,_threadCount:0};function If(e,t,n,r,i,a,o,s){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ze(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ze(0),this.hiddenUpdates=Ze(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=s,this.incompleteTransitions=new Map}function Lf(e,t,n,r,i,a,o,s,c,l,u,d){return e=new If(e,t,n,o,s,c,l,d),t=1,!0===a&&(t|=24),a=si(3,null,null,t),e.current=a,a.stateNode=e,t=ra(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},wa(a),e}function Rf(e){return e?(e=ai,e):ai}function zf(e,t,n,r,i,a){i=Rf(i),r.context===null?r.context=i:r.pendingContext=i,r=Ea(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=Da(e,r,t),n!==null&&(ru(n,e,t),Oa(n,e,t))}function Bf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Vf(e,t){Bf(e,t),(e=e.alternate)&&Bf(e,t)}function Hf(e){if(e.tag===13){var t=ni(e,67108864);t!==null&&ru(t,e,67108864),Vf(e,67108864)}}var Uf=!0;function Wf(e,t,n,r){var i=D.T;D.T=null;var a=O.p;try{O.p=2,Kf(e,t,n,r)}finally{O.p=a,D.T=i}}function Gf(e,t,n,r){var i=D.T;D.T=null;var a=O.p;try{O.p=8,Kf(e,t,n,r)}finally{O.p=a,D.T=i}}function Kf(e,t,n,r){if(Uf){var i=qf(r);if(i===null)dd(e,t,r,Jf,n),ap(e,r);else if(sp(i,e,t,n,r))r.stopPropagation();else if(ap(e,r),t&4&&-1<ip.indexOf(e)){for(;i!==null;){var a=_t(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Ge(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-ze(o);s.entanglements[1]|=c,o&=~c}Wu(a),!(K&6)&&(Ul=De()+500,Gu(0,!1))}}break;case 13:s=ni(a,2),s!==null&&ru(s,a,2),cu(),Vf(a,2)}if(a=qf(r),a===null&&dd(e,t,r,Jf,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else dd(e,t,r,null,n)}}function qf(e){return e=on(e),Yf(e)}var Jf=null;function Yf(e){if(Jf=null,e=gt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Jf=e,null}function Xf(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`resize`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Oe()){case ke:return 2;case Ae:return 8;case je:case Me:return 32;case Ne:return 268435456;default:return 32}default:return 32}}var Zf=!1,Qf=null,$f=null,ep=null,tp=new Map,np=new Map,rp=[],ip=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function ap(e,t){switch(e){case`focusin`:case`focusout`:Qf=null;break;case`dragenter`:case`dragleave`:$f=null;break;case`mouseover`:case`mouseout`:ep=null;break;case`pointerover`:case`pointerout`:tp.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:np.delete(t.pointerId)}}function op(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=_t(t),t!==null&&Hf(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function sp(e,t,n,r,i){switch(t){case`focusin`:return Qf=op(Qf,e,t,n,r,i),!0;case`dragenter`:return $f=op($f,e,t,n,r,i),!0;case`mouseover`:return ep=op(ep,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return tp.set(a,op(tp.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,np.set(a,op(np.get(a)||null,e,t,n,r,i)),!0}return!1}function cp(e){var t=gt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,at(e.priority,function(){if(n.tag===13){var e=tu();e=nt(e);var t=ni(n,e);t!==null&&ru(t,n,e),Vf(n,e)}});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function lp(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=qf(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);an=r,n.target.dispatchEvent(r),an=null}else return t=_t(n),t!==null&&Hf(t),e.blockedOn=n,!1;t.shift()}return!0}function up(e,t,n){lp(e)&&n.delete(t)}function dp(){Zf=!1,Qf!==null&&lp(Qf)&&(Qf=null),$f!==null&&lp($f)&&($f=null),ep!==null&&lp(ep)&&(ep=null),tp.forEach(up),np.forEach(up)}function fp(e,n){e.blockedOn===n&&(e.blockedOn=null,Zf||(Zf=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,dp)))}var pp=null;function mp(e){pp!==e&&(pp=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){pp===e&&(pp=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Yf(r||n)===null)continue;break}var a=_t(n);a!==null&&(e.splice(t,3),t-=3,$o(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function hp(e){function t(t){return fp(t,e)}Qf!==null&&fp(Qf,e),$f!==null&&fp($f,e),ep!==null&&fp(ep,e),tp.forEach(t),np.forEach(t);for(var n=0;n<rp.length;n++){var r=rp[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<rp.length&&(n=rp[0],n.blockedOn===null);)cp(n),n.blockedOn===null&&rp.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[ct]||null;if(typeof a==`function`)o||mp(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[ct]||null)s=o.formAction;else if(Yf(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),mp(n)}}}function gp(e){this._internalRoot=e}_p.prototype.render=gp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;zf(n,tu(),e,t,null,null)},_p.prototype.unmount=gp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;zf(e.current,2,null,e,null,null),cu(),t[lt]=null}};function _p(e){this._internalRoot=e}_p.prototype.unstable_scheduleHydration=function(e){if(e){var t=it();e={blockedOn:null,target:e,priority:t};for(var n=0;n<rp.length&&t!==0&&t<rp[n].priority;n++);rp.splice(n,0,e),n===0&&cp(e)}};var vp=n.version;if(vp!==`19.1.0`)throw Error(i(527,vp,`19.1.0`));O.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=l(t),e=e===null?null:u(e),e=e===null?null:e.stateNode,e};var yp={bundleType:0,version:`19.1.0`,rendererPackageName:`react-dom`,currentDispatcherRef:D,reconcilerVersion:`19.1.0`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var bp=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!bp.isDisabled&&bp.supportsFiber)try{Ie=bp.inject(yp),Le=bp}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=Bs,s=Vs,c=Hs,l=null;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(l=t.unstable_transitionCallbacks)),t=Lf(e,1,!1,null,null,n,r,o,s,c,l,null),e[lt]=t.current,ld(e),new gp(t)}})),_=o(((e,t)=>{function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>`u`||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!=`function`))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=l(d()),y=l(_(),1),b=l(h());function x(){return x=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},x.apply(this,arguments)}var S;(function(e){e.Pop=`POP`,e.Push=`PUSH`,e.Replace=`REPLACE`})(S||={});var C=`popstate`;function ee(e){e===void 0&&(e={});function t(e,t){let{pathname:n,search:r,hash:i}=e.location;return ne(``,{pathname:n,search:r,hash:i},t.state&&t.state.usr||null,t.state&&t.state.key||`default`)}function n(e,t){return typeof t==`string`?t:re(t)}return ae(t,n,null,e)}function w(e,t){if(e===!1||e==null)throw Error(t)}function T(e,t){if(!e){typeof console<`u`&&console.warn(t);try{throw Error(t)}catch{}}}function te(){return Math.random().toString(36).substr(2,8)}function E(e,t){return{usr:e.state,key:e.key,idx:t}}function ne(e,t,n,r){return n===void 0&&(n=null),x({pathname:typeof e==`string`?e:e.pathname,search:``,hash:``},typeof t==`string`?ie(t):t,{state:n,key:t&&t.key||r||te()})}function re(e){let{pathname:t=`/`,search:n=``,hash:r=``}=e;return n&&n!==`?`&&(t+=n.charAt(0)===`?`?n:`?`+n),r&&r!==`#`&&(t+=r.charAt(0)===`#`?r:`#`+r),t}function ie(e){let t={};if(e){let n=e.indexOf(`#`);n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf(`?`);r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function ae(e,t,n,r){r===void 0&&(r={});let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s=S.Pop,c=null,l=u();l??(l=0,o.replaceState(x({},o.state,{idx:l}),``));function u(){return(o.state||{idx:null}).idx}function d(){s=S.Pop;let e=u(),t=e==null?null:e-l;l=e,c&&c({action:s,location:h.location,delta:t})}function f(e,t){s=S.Push;let r=ne(h.location,e,t);n&&n(r,e),l=u()+1;let d=E(r,l),f=h.createHref(r);try{o.pushState(d,``,f)}catch(e){if(e instanceof DOMException&&e.name===`DataCloneError`)throw e;i.location.assign(f)}a&&c&&c({action:s,location:h.location,delta:1})}function p(e,t){s=S.Replace;let r=ne(h.location,e,t);n&&n(r,e),l=u();let i=E(r,l),d=h.createHref(r);o.replaceState(i,``,d),a&&c&&c({action:s,location:h.location,delta:0})}function m(e){let t=i.location.origin===`null`?i.location.href:i.location.origin,n=typeof e==`string`?e:re(e);return n=n.replace(/ $/,`%20`),w(t,`No window.location.(origin|href) available to create URL for href: `+n),new URL(n,t)}let h={get action(){return s},get location(){return e(i,o)},listen(e){if(c)throw Error(`A history only accepts one active listener`);return i.addEventListener(C,d),c=e,()=>{i.removeEventListener(C,d),c=null}},createHref(e){return t(i,e)},createURL:m,encodeLocation(e){let t=m(e);return{pathname:t.pathname,search:t.search,hash:t.hash}},push:f,replace:p,go(e){return o.go(e)}};return h}var oe;(function(e){e.data=`data`,e.deferred=`deferred`,e.redirect=`redirect`,e.error=`error`})(oe||={});function se(e,t,n){return n===void 0&&(n=`/`),ce(e,t,n,!1)}function ce(e,t,n,r){let i=Se((typeof t==`string`?ie(t):t).pathname||`/`,n);if(i==null)return null;let a=D(e);le(a);let o=null;for(let e=0;o==null&&e<a.length;++e){let t=xe(i);o=ve(a[e],t,r)}return o}function D(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r=``);let i=(e,i,a)=>{let o={relativePath:a===void 0?e.path||``:a,caseSensitive:e.caseSensitive===!0,childrenIndex:i,route:e};o.relativePath.startsWith(`/`)&&(w(o.relativePath.startsWith(r),`Absolute route path "`+o.relativePath+`" nested under path `+(`"`+r+`" is not valid. An absolute child route path `)+`must start with the combined path of all its parent routes.`),o.relativePath=o.relativePath.slice(r.length));let s=je([r,o.relativePath]),c=n.concat(o);e.children&&e.children.length>0&&(w(e.index!==!0,`Index routes must not have child routes. Please remove `+(`all child routes from route path "`+s+`".`)),D(e.children,t,c,s)),!(e.path==null&&!e.index)&&t.push({path:s,score:ge(s,e.index),routesMeta:c})};return e.forEach((e,t)=>{var n;if(e.path===``||!((n=e.path)!=null&&n.includes(`?`)))i(e,t);else for(let n of O(e.path))i(e,t,n)}),t}function O(e){let t=e.split(`/`);if(t.length===0)return[];let[n,...r]=t,i=n.endsWith(`?`),a=n.replace(/\?$/,``);if(r.length===0)return i?[a,``]:[a];let o=O(r.join(`/`)),s=[];return s.push(...o.map(e=>e===``?a:[a,e].join(`/`))),i&&s.push(...o),s.map(t=>e.startsWith(`/`)&&t===``?`/`:t)}function le(e){e.sort((e,t)=>e.score===t.score?_e(e.routesMeta.map(e=>e.childrenIndex),t.routesMeta.map(e=>e.childrenIndex)):t.score-e.score)}var ue=/^:[\w-]+$/,de=3,fe=2,pe=1,k=10,me=-2,he=e=>e===`*`;function ge(e,t){let n=e.split(`/`),r=n.length;return n.some(he)&&(r+=me),t&&(r+=fe),n.filter(e=>!he(e)).reduce((e,t)=>e+(ue.test(t)?de:t===``?pe:k),r)}function _e(e,t){return e.length===t.length&&e.slice(0,-1).every((e,n)=>e===t[n])?e[e.length-1]-t[t.length-1]:0}function ve(e,t,n){n===void 0&&(n=!1);let{routesMeta:r}=e,i={},a=`/`,o=[];for(let e=0;e<r.length;++e){let s=r[e],c=e===r.length-1,l=a===`/`?t:t.slice(a.length)||`/`,u=ye({path:s.relativePath,caseSensitive:s.caseSensitive,end:c},l),d=s.route;if(!u&&c&&n&&!r[r.length-1].route.index&&(u=ye({path:s.relativePath,caseSensitive:s.caseSensitive,end:!1},l)),!u)return null;Object.assign(i,u.params),o.push({params:i,pathname:je([a,u.pathname]),pathnameBase:Me(je([a,u.pathnameBase])),route:d}),u.pathnameBase!==`/`&&(a=je([a,u.pathnameBase]))}return o}function ye(e,t){typeof e==`string`&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=be(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,`$1`),s=i.slice(1);return{params:r.reduce((e,t,n)=>{let{paramName:r,isOptional:i}=t;if(r===`*`){let e=s[n]||``;o=a.slice(0,a.length-e.length).replace(/(.)\/+$/,`$1`)}let c=s[n];return i&&!c?e[r]=void 0:e[r]=(c||``).replace(/%2F/g,`/`),e},{}),pathname:a,pathnameBase:o,pattern:e}}function be(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),T(e===`*`||!e.endsWith(`*`)||e.endsWith(`/*`),`Route path "`+e+`" will be treated as if it were `+(`"`+e.replace(/\*$/,`/*`)+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+(`please change the route path to "`+e.replace(/\*$/,`/*`)+`".`));let r=[],i=`^`+e.replace(/\/*\*?$/,``).replace(/^\/*/,`/`).replace(/[\\.*+^${}|()[\]]/g,`\\$&`).replace(/\/:([\w-]+)(\?)?/g,(e,t,n)=>(r.push({paramName:t,isOptional:n!=null}),n?`/?([^\\/]+)?`:`/([^\\/]+)`));return e.endsWith(`*`)?(r.push({paramName:`*`}),i+=e===`*`||e===`/*`?`(.*)$`:`(?:\\/(.+)|\\/*)$`):n?i+=`\\/*$`:e!==``&&e!==`/`&&(i+=`(?:(?=\\/|$))`),[new RegExp(i,t?void 0:`i`),r]}function xe(e){try{return e.split(`/`).map(e=>decodeURIComponent(e).replace(/\//g,`%2F`)).join(`/`)}catch(t){return T(!1,`The URL path "`+e+`" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent `+(`encoding (`+t+`).`)),e}}function Se(e,t){if(t===`/`)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith(`/`)?t.length-1:t.length,r=e.charAt(n);return r&&r!==`/`?null:e.slice(n)||`/`}var Ce=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,we=e=>Ce.test(e);function Te(e,t){t===void 0&&(t=`/`);let{pathname:n,search:r=``,hash:i=``}=typeof e==`string`?ie(e):e,a;if(n)if(we(n))a=n;else{if(n.includes(`//`)){let e=n;n=n.replace(/\/\/+/g,`/`),T(!1,`Pathnames cannot have embedded double slashes - normalizing `+(e+` -> `+n))}a=n.startsWith(`/`)?Ee(n.substring(1),`/`):Ee(n,t)}else a=t;return{pathname:a,search:Ne(r),hash:Pe(i)}}function Ee(e,t){let n=t.replace(/\/+$/,``).split(`/`);return e.split(`/`).forEach(e=>{e===`..`?n.length>1&&n.pop():e!==`.`&&n.push(e)}),n.length>1?n.join(`/`):`/`}function De(e,t,n,r){return`Cannot include a '`+e+`' character in a manually specified `+("`to."+t+"` field ["+JSON.stringify(r)+`].  Please separate it out to the `)+("`to."+n+"` field. Alternatively you may provide the full path as ")+`a string in <Link to="..."> and the router will parse it for you.`}function Oe(e){return e.filter((e,t)=>t===0||e.route.path&&e.route.path.length>0)}function ke(e,t){let n=Oe(e);return t?n.map((e,t)=>t===n.length-1?e.pathname:e.pathnameBase):n.map(e=>e.pathnameBase)}function Ae(e,t,n,r){r===void 0&&(r=!1);let i;typeof e==`string`?i=ie(e):(i=x({},e),w(!i.pathname||!i.pathname.includes(`?`),De(`?`,`pathname`,`search`,i)),w(!i.pathname||!i.pathname.includes(`#`),De(`#`,`pathname`,`hash`,i)),w(!i.search||!i.search.includes(`#`),De(`#`,`search`,`hash`,i)));let a=e===``||i.pathname===``,o=a?`/`:i.pathname,s;if(o==null)s=n;else{let e=t.length-1;if(!r&&o.startsWith(`..`)){let t=o.split(`/`);for(;t[0]===`..`;)t.shift(),--e;i.pathname=t.join(`/`)}s=e>=0?t[e]:`/`}let c=Te(i,s),l=o&&o!==`/`&&o.endsWith(`/`),u=(a||o===`.`)&&n.endsWith(`/`);return!c.pathname.endsWith(`/`)&&(l||u)&&(c.pathname+=`/`),c}var je=e=>e.join(`/`).replace(/\/\/+/g,`/`),Me=e=>e.replace(/\/+$/,``).replace(/^\/*/,`/`),Ne=e=>!e||e===`?`?``:e.startsWith(`?`)?e:`?`+e,Pe=e=>!e||e===`#`?``:e.startsWith(`#`)?e:`#`+e;function Fe(e){return e!=null&&typeof e.status==`number`&&typeof e.statusText==`string`&&typeof e.internal==`boolean`&&`data`in e}var Ie=[`post`,`put`,`patch`,`delete`];new Set(Ie);var Le=[`get`,...Ie];new Set(Le);function Re(){return Re=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Re.apply(this,arguments)}var ze=v.createContext(null),Be=v.createContext(null),Ve=v.createContext(null),He=v.createContext(null),Ue=v.createContext({outlet:null,matches:[],isDataRoute:!1}),We=v.createContext(null);function Ge(e,t){let{relative:n}=t===void 0?{}:t;!Ke()&&w(!1);let{basename:r,navigator:i}=v.useContext(Ve),{hash:a,pathname:o,search:s}=Qe(e,{relative:n}),c=o;return r!==`/`&&(c=o===`/`?r:je([r,o])),i.createHref({pathname:c,search:s,hash:a})}function Ke(){return v.useContext(He)!=null}function qe(){return!Ke()&&w(!1),v.useContext(He).location}function Je(e){v.useContext(Ve).static||v.useLayoutEffect(e)}function Ye(){let{isDataRoute:e}=v.useContext(Ue);return e?pt():Xe()}function Xe(){!Ke()&&w(!1);let e=v.useContext(ze),{basename:t,future:n,navigator:r}=v.useContext(Ve),{matches:i}=v.useContext(Ue),{pathname:a}=qe(),o=JSON.stringify(ke(i,n.v7_relativeSplatPath)),s=v.useRef(!1);return Je(()=>{s.current=!0}),v.useCallback(function(n,i){if(i===void 0&&(i={}),!s.current)return;if(typeof n==`number`){r.go(n);return}let c=Ae(n,JSON.parse(o),a,i.relative===`path`);e==null&&t!==`/`&&(c.pathname=c.pathname===`/`?t:je([t,c.pathname])),(i.replace?r.replace:r.push)(c,i.state,i)},[t,r,o,a,e])}function Ze(){let{matches:e}=v.useContext(Ue),t=e[e.length-1];return t?t.params:{}}function Qe(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=v.useContext(Ve),{matches:i}=v.useContext(Ue),{pathname:a}=qe(),o=JSON.stringify(ke(i,r.v7_relativeSplatPath));return v.useMemo(()=>Ae(e,JSON.parse(o),a,n===`path`),[e,o,a,n])}function $e(e,t){return et(e,t)}function et(e,t,n,r){!Ke()&&w(!1);let{navigator:i}=v.useContext(Ve),{matches:a}=v.useContext(Ue),o=a[a.length-1],s=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:`/`;o&&o.route;let l=qe(),u;if(t){let e=typeof t==`string`?ie(t):t;!(c===`/`||e.pathname?.startsWith(c))&&w(!1),u=e}else u=l;let d=u.pathname||`/`,f=d;if(c!==`/`){let e=c.replace(/^\//,``).split(`/`);f=`/`+d.replace(/^\//,``).split(`/`).slice(e.length).join(`/`)}let p=se(e,{pathname:f}),m=at(p&&p.map(e=>Object.assign({},e,{params:Object.assign({},s,e.params),pathname:je([c,i.encodeLocation?i.encodeLocation(e.pathname).pathname:e.pathname]),pathnameBase:e.pathnameBase===`/`?c:je([c,i.encodeLocation?i.encodeLocation(e.pathnameBase).pathname:e.pathnameBase])})),a,n,r);return t&&m?v.createElement(He.Provider,{value:{location:Re({pathname:`/`,search:``,hash:``,state:null,key:`default`},u),navigationType:S.Pop}},m):m}function tt(){let e=ft(),t=Fe(e)?e.status+` `+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null;return v.createElement(v.Fragment,null,v.createElement(`h2`,null,`Unexpected Application Error!`),v.createElement(`h3`,{style:{fontStyle:`italic`}},t),n?v.createElement(`pre`,{style:{padding:`0.5rem`,backgroundColor:`rgba(200,200,200, 0.5)`}},n):null,null)}var nt=v.createElement(tt,null),rt=class extends v.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!==`idle`&&e.revalidation===`idle`?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error===void 0?t.error:e.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){console.error(`React Router caught the following error during render`,e,t)}render(){return this.state.error===void 0?this.props.children:v.createElement(Ue.Provider,{value:this.props.routeContext},v.createElement(We.Provider,{value:this.state.error,children:this.props.component}))}};function it(e){let{routeContext:t,match:n,children:r}=e,i=v.useContext(ze);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),v.createElement(Ue.Provider,{value:t},r)}function at(e,t,n,r){if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let a=e,o=n?.errors;if(o!=null){let e=a.findIndex(e=>e.route.id&&o?.[e.route.id]!==void 0);!(e>=0)&&w(!1),a=a.slice(0,Math.min(a.length,e+1))}let s=!1,c=-1;if(n&&r&&r.v7_partialHydration)for(let e=0;e<a.length;e++){let t=a[e];if((t.route.HydrateFallback||t.route.hydrateFallbackElement)&&(c=e),t.route.id){let{loaderData:e,errors:r}=n,i=t.route.loader&&e[t.route.id]===void 0&&(!r||r[t.route.id]===void 0);if(t.route.lazy||i){s=!0,a=c>=0?a.slice(0,c+1):[a[0]];break}}}return a.reduceRight((e,r,i)=>{let l,u=!1,d=null,f=null;n&&(l=o&&r.route.id?o[r.route.id]:void 0,d=r.route.errorElement||nt,s&&(c<0&&i===0?(ht(`route-fallback`,!1,"No `HydrateFallback` element provided to render during initial hydration"),u=!0,f=null):c===i&&(u=!0,f=r.route.hydrateFallbackElement||null)));let p=t.concat(a.slice(0,i+1)),m=()=>{let t;return t=l?d:u?f:r.route.Component?v.createElement(r.route.Component,null):r.route.element?r.route.element:e,v.createElement(it,{match:r,routeContext:{outlet:e,matches:p,isDataRoute:n!=null},children:t})};return n&&(r.route.ErrorBoundary||r.route.errorElement||i===0)?v.createElement(rt,{location:n.location,revalidation:n.revalidation,component:d,error:l,children:m(),routeContext:{outlet:null,matches:p,isDataRoute:!0}}):m()},null)}var ot=function(e){return e.UseBlocker=`useBlocker`,e.UseRevalidator=`useRevalidator`,e.UseNavigateStable=`useNavigate`,e}(ot||{}),st=function(e){return e.UseBlocker=`useBlocker`,e.UseLoaderData=`useLoaderData`,e.UseActionData=`useActionData`,e.UseRouteError=`useRouteError`,e.UseNavigation=`useNavigation`,e.UseRouteLoaderData=`useRouteLoaderData`,e.UseMatches=`useMatches`,e.UseRevalidator=`useRevalidator`,e.UseNavigateStable=`useNavigate`,e.UseRouteId=`useRouteId`,e}(st||{});function ct(e){let t=v.useContext(ze);return!t&&w(!1),t}function lt(e){let t=v.useContext(Be);return!t&&w(!1),t}function ut(e){let t=v.useContext(Ue);return!t&&w(!1),t}function dt(e){let t=ut(e),n=t.matches[t.matches.length-1];return!n.route.id&&w(!1),n.route.id}function ft(){let e=v.useContext(We),t=lt(st.UseRouteError),n=dt(st.UseRouteError);return e===void 0?t.errors?.[n]:e}function pt(){let{router:e}=ct(ot.UseNavigateStable),t=dt(st.UseNavigateStable),n=v.useRef(!1);return Je(()=>{n.current=!0}),v.useCallback(function(r,i){i===void 0&&(i={}),n.current&&(typeof r==`number`?e.navigate(r):e.navigate(r,Re({fromRouteId:t},i)))},[e,t])}var mt={};function ht(e,t,n){!t&&!mt[e]&&(mt[e]=!0)}var gt=(e,t,n)=>(``+t+("You can use the `"+e+"` future flag to opt-in early. ")+(`For more information, see `+n+`.`),void 0);function _t(e,t){e?.v7_startTransition===void 0&&gt(`v7_startTransition`,"React Router will begin wrapping state updates in `React.startTransition` in v7",`https://reactrouter.com/v6/upgrading/future#v7_starttransition`),e?.v7_relativeSplatPath===void 0&&(!t||t.v7_relativeSplatPath===void 0)&&gt(`v7_relativeSplatPath`,`Relative route resolution within Splat routes is changing in v7`,`https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath`),t&&(t.v7_fetcherPersist===void 0&&gt(`v7_fetcherPersist`,`The persistence behavior of fetchers is changing in v7`,`https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist`),t.v7_normalizeFormMethod===void 0&&gt(`v7_normalizeFormMethod`,"Casing of `formMethod` fields is being normalized to uppercase in v7",`https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod`),t.v7_partialHydration===void 0&&gt(`v7_partialHydration`,"`RouterProvider` hydration behavior is changing in v7",`https://reactrouter.com/v6/upgrading/future#v7_partialhydration`),t.v7_skipActionErrorRevalidation===void 0&&gt(`v7_skipActionErrorRevalidation`,"The revalidation behavior after 4xx/5xx `action` responses is changing in v7",`https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation`))}v.startTransition;function vt(e){let{to:t,replace:n,state:r,relative:i}=e;!Ke()&&w(!1);let{future:a,static:o}=v.useContext(Ve),{matches:s}=v.useContext(Ue),{pathname:c}=qe(),l=Ye(),u=Ae(t,ke(s,a.v7_relativeSplatPath),c,i===`path`),d=JSON.stringify(u);return v.useEffect(()=>l(JSON.parse(d),{replace:n,state:r,relative:i}),[l,d,i,n,r]),null}function yt(e){w(!1)}function bt(e){let{basename:t=`/`,children:n=null,location:r,navigationType:i=S.Pop,navigator:a,static:o=!1,future:s}=e;Ke()&&w(!1);let c=t.replace(/^\/*/,`/`),l=v.useMemo(()=>({basename:c,navigator:a,static:o,future:Re({v7_relativeSplatPath:!1},s)}),[c,s,a,o]);typeof r==`string`&&(r=ie(r));let{pathname:u=`/`,search:d=``,hash:f=``,state:p=null,key:m=`default`}=r,h=v.useMemo(()=>{let e=Se(u,c);return e==null?null:{location:{pathname:e,search:d,hash:f,state:p,key:m},navigationType:i}},[c,u,d,f,p,m,i]);return h==null?null:v.createElement(Ve.Provider,{value:l},v.createElement(He.Provider,{children:n,value:h}))}function xt(e){let{children:t,location:n}=e;return $e(Ct(t),n)}var St=function(e){return e[e.pending=0]=`pending`,e[e.success=1]=`success`,e[e.error=2]=`error`,e}(St||{});new Promise(()=>{}),v.Component;function Ct(e,t){t===void 0&&(t=[]);let n=[];return v.Children.forEach(e,(e,r)=>{if(!v.isValidElement(e))return;let i=[...t,r];if(e.type===v.Fragment){n.push.apply(n,Ct(e.props.children,i));return}e.type!==yt&&w(!1),!(!e.props.index||!e.props.children)&&w(!1);let a={id:e.props.id||i.join(`-`),caseSensitive:e.props.caseSensitive,element:e.props.element,Component:e.props.Component,index:e.props.index,path:e.props.path,loader:e.props.loader,action:e.props.action,errorElement:e.props.errorElement,ErrorBoundary:e.props.ErrorBoundary,hasErrorBoundary:e.props.ErrorBoundary!=null||e.props.errorElement!=null,shouldRevalidate:e.props.shouldRevalidate,handle:e.props.handle,lazy:e.props.lazy};e.props.children&&(a.children=Ct(e.props.children,i)),n.push(a)}),n}function wt(){return wt=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},wt.apply(this,arguments)}function Tt(e,t){if(e==null)return{};var n={},r=Object.keys(e),i,a;for(a=0;a<r.length;a++)i=r[a],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}function Et(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Dt(e,t){return e.button===0&&(!t||t===`_self`)&&!Et(e)}var Ot=[`onClick`,`relative`,`reloadDocument`,`replace`,`state`,`target`,`to`,`preventScrollReset`,`viewTransition`],kt=[`aria-current`,`caseSensitive`,`className`,`end`,`style`,`to`,`viewTransition`,`children`],At=`6`;try{window.__reactRouterVersion=At}catch{}var jt=v.createContext({isTransitioning:!1}),Mt=v.startTransition;b.flushSync,v.useId;function Nt(e){let{basename:t,children:n,future:r,window:i}=e,a=v.useRef();a.current??=ee({window:i,v5Compat:!0});let o=a.current,[s,c]=v.useState({action:o.action,location:o.location}),{v7_startTransition:l}=r||{},u=v.useCallback(e=>{l&&Mt?Mt(()=>c(e)):c(e)},[c,l]);return v.useLayoutEffect(()=>o.listen(u),[o,u]),v.useEffect(()=>_t(r),[r]),v.createElement(bt,{basename:t,children:n,location:s.location,navigationType:s.action,navigator:o,future:r})}var Pt=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,Ft=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,It=v.forwardRef(function(e,t){let{onClick:n,relative:r,reloadDocument:i,replace:a,state:o,target:s,to:c,preventScrollReset:l,viewTransition:u}=e,d=Tt(e,Ot),{basename:f}=v.useContext(Ve),p,m=!1;if(typeof c==`string`&&Ft.test(c)&&(p=c,Pt))try{let e=new URL(window.location.href),t=c.startsWith(`//`)?new URL(e.protocol+c):new URL(c),n=Se(t.pathname,f);t.origin===e.origin&&n!=null?c=n+t.search+t.hash:m=!0}catch{}let h=Ge(c,{relative:r}),g=Vt(c,{replace:a,state:o,target:s,preventScrollReset:l,relative:r,viewTransition:u});function _(e){n&&n(e),e.defaultPrevented||g(e)}return v.createElement(`a`,wt({},d,{href:p||h,onClick:m||i?n:_,ref:t,target:s}))}),Lt=v.forwardRef(function(e,t){let{"aria-current":n=`page`,caseSensitive:r=!1,className:i=``,end:a=!1,style:o,to:s,viewTransition:c,children:l}=e,u=Tt(e,kt),d=Qe(s,{relative:u.relative}),f=qe(),p=v.useContext(Be),{navigator:m,basename:h}=v.useContext(Ve),g=p!=null&&Ht(d)&&c===!0,_=m.encodeLocation?m.encodeLocation(d).pathname:d.pathname,y=f.pathname,b=p&&p.navigation&&p.navigation.location?p.navigation.location.pathname:null;r||(y=y.toLowerCase(),b=b?b.toLowerCase():null,_=_.toLowerCase()),b&&h&&(b=Se(b,h)||b);let x=_!==`/`&&_.endsWith(`/`)?_.length-1:_.length,S=y===_||!a&&y.startsWith(_)&&y.charAt(x)===`/`,C=b!=null&&(b===_||!a&&b.startsWith(_)&&b.charAt(_.length)===`/`),ee={isActive:S,isPending:C,isTransitioning:g},w=S?n:void 0,T;T=typeof i==`function`?i(ee):[i,S?`active`:null,C?`pending`:null,g?`transitioning`:null].filter(Boolean).join(` `);let te=typeof o==`function`?o(ee):o;return v.createElement(It,wt({},u,{"aria-current":w,className:T,ref:t,style:te,to:s,viewTransition:c}),typeof l==`function`?l(ee):l)}),Rt;(function(e){e.UseScrollRestoration=`useScrollRestoration`,e.UseSubmit=`useSubmit`,e.UseSubmitFetcher=`useSubmitFetcher`,e.UseFetcher=`useFetcher`,e.useViewTransitionState=`useViewTransitionState`})(Rt||={});var zt;(function(e){e.UseFetcher=`useFetcher`,e.UseFetchers=`useFetchers`,e.UseScrollRestoration=`useScrollRestoration`})(zt||={});function Bt(e){let t=v.useContext(ze);return!t&&w(!1),t}function Vt(e,t){let{target:n,replace:r,state:i,preventScrollReset:a,relative:o,viewTransition:s}=t===void 0?{}:t,c=Ye(),l=qe(),u=Qe(e,{relative:o});return v.useCallback(t=>{Dt(t,n)&&(t.preventDefault(),c(e,{replace:r===void 0?re(l)===re(u):r,state:i,preventScrollReset:a,relative:o,viewTransition:s}))},[l,c,u,r,i,n,e,a,o,s])}function Ht(e,t){t===void 0&&(t={});let n=v.useContext(jt);n??w(!1);let{basename:r}=Bt(Rt.useViewTransitionState),i=Qe(e,{relative:t.relative});if(!n.isTransitioning)return!1;let a=Se(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=Se(n.nextLocation.pathname,r)||n.nextLocation.pathname;return ye(i.pathname,o)!=null||ye(i.pathname,a)!=null}var A={home:`/`,projects:`/projects`,project:e=>`/projects/${e}`,blog:`/blog`,blogPost:e=>`/blog/${e}`,education:`/education`,awards:`/awards`,licenses:`/licenses`,resume:`/resume`,architecture:`/architecture`},Ut=[{label:`About`,to:A.home},{label:`Projects`,to:A.projects},{label:`Education`,to:A.education},{label:`Awards`,to:A.awards},{label:`Licenses`,to:A.licenses},{label:`Resume`,to:A.resume},{label:`Blog`,to:A.blog}],Wt=[{from:`/ProjectsList`,to:A.project(`jeonse-support-system`)},{from:`/ProjectsList2`,to:A.project(`cloudxper-billing`)},{from:`/ProjectsList3`,to:A.project(`lgu-billing-gw`)},{from:`/EducationList`,to:A.education},{from:`/Awards`,to:A.awards},{from:`/Licenses`,to:A.licenses},{from:`/ResumePrint`,to:A.resume},{from:`/Architecture`,to:A.architecture},{from:`/Inventory`,to:A.home}],j={name:`길태형`,role:`Backend Developer`,badge:`SI / SM Developer`,birthDate:`1996-08-16`,careerSummary:`3년+`,keywords:`운영 안정화, 성능 개선, 자동화`,phone:`010-3933-3763`,email:`r1605866@gmail.com`,profileImage:`giltaehyeong.jpg`,links:{github:`https://github.com/seulgae`,blog:`https://doltae.tistory.com/`},intro:`운영 환경에서 발생하는 문제를 빠르게 수습하는 데서 끝내지 않고, 재발을 줄이는 구조 개선과 자동화까지 연결해온 SI / SM 중심의 백엔드 개발자입니다.`,strengths:[`운영 이슈를 임시 대응으로 끝내지 않고, 재발 방지 구조와 자동화까지 연결합니다.`,`Spring Boot, Batch, REST API 기반 업무 시스템 개발과 운영 안정화 경험을 보유하고 있습니다.`,`모니터링, 로그 분석, 배치 자동화, 성능 개선을 통해 수치로 확인되는 결과를 만들어왔습니다.`],techStack:[{label:`Back-End`,items:[`Java`,`Spring`,`Spring Boot`,`Spring Batch`,`REST API`,`MyBatis`,`Thymeleaf`,`Jasypt`]},{label:`Data / Infra`,items:[`Oracle`,`MySQL`,`Redis`,`Kafka`,`Linux`,`Jenkins`,`WhaTap`]},{label:`Front / Tools`,items:[`React`,`JavaScript`,`jQuery`,`HTML/CSS`,`Git`,`Maven`,`Gradle`,`DBeaver`]}]};function Gt(e=new Date){let t=new Date(j.birthDate),n=e.getFullYear()-t.getFullYear(),r=e.getMonth()-t.getMonth();return(r<0||r===0&&e.getDate()<t.getDate())&&--n,n}function Kt(e=new Date){let t=new Date(j.birthDate);return`${t.getFullYear()}년 ${t.getMonth()+1}월 ${t.getDate()}일생 (만 ${Gt(e)}세)`}function qt(e=``){let t=e.indexOf(`(`);return t===-1?{main:e,sub:``}:{main:e.slice(0,t).trimEnd(),sub:e.slice(t).trim()}}function Jt(e=``){return`/${e.replace(/^\//,``)}`}var Yt=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),M=o(((e,t)=>{t.exports=Yt()}))();function Xt(){let[e,t]=(0,v.useState)(!1);return(0,v.useEffect)(()=>{t(!1)},[qe().pathname]),(0,v.useEffect)(()=>{if(!e)return;let n=e=>{e.key===`Escape`&&t(!1)};return document.addEventListener(`keydown`,n),()=>document.removeEventListener(`keydown`,n)},[e]),(0,M.jsx)(`header`,{className:`site-header`,children:(0,M.jsxs)(`div`,{className:`site-header-inner`,children:[(0,M.jsxs)(It,{to:A.home,className:`site-brand`,children:[(0,M.jsx)(`img`,{src:Jt(j.profileImage),alt:``,className:`site-brand-avatar`}),(0,M.jsx)(`span`,{className:`site-brand-name`,children:j.name}),(0,M.jsx)(`span`,{className:`site-brand-role`,children:j.role})]}),(0,M.jsx)(`nav`,{id:`site-nav`,className:`site-nav ${e?`open`:``}`,"aria-label":`주요 메뉴`,children:(0,M.jsx)(`ul`,{children:Ut.map(e=>(0,M.jsx)(`li`,{children:(0,M.jsx)(Lt,{to:e.to,end:e.to===A.home,className:({isActive:e})=>e?`active`:void 0,children:e.label})},e.to))})}),(0,M.jsx)(`button`,{type:`button`,className:`site-menu-button`,"aria-label":e?`메뉴 닫기`:`메뉴 열기`,"aria-expanded":e,"aria-controls":`site-nav`,onClick:()=>t(e=>!e),children:(0,M.jsxs)(`span`,{className:`site-menu-icon`,"aria-hidden":`true`,children:[(0,M.jsx)(`span`,{}),(0,M.jsx)(`span`,{}),(0,M.jsx)(`span`,{})]})})]})})}var Zt={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Qt=v.createContext&&v.createContext(Zt),$t=[`attr`,`size`,`title`];function en(e,t){if(e==null)return{};var n=tn(e,t),r,i;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)r=a[i],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function tn(e,t){if(e==null)return{};var n={};for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;n[r]=e[r]}return n}function nn(){return nn=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},nn.apply(this,arguments)}function rn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function an(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?rn(Object(n),!0).forEach(function(t){on(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):rn(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function on(e,t,n){return t=sn(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function sn(e){var t=cn(e,`string`);return typeof t==`symbol`?t:t+``}function cn(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function ln(e){return e&&e.map((e,t)=>v.createElement(e.tag,an({key:t},e.attr),ln(e.child)))}function un(e){return t=>v.createElement(dn,nn({attr:an({},e.attr)},t),ln(e.child))}function dn(e){var t=t=>{var{attr:n,size:r,title:i}=e,a=en(e,$t),o=r||t.size||`1em`,s;return t.className&&(s=t.className),e.className&&(s=(s?s+` `:``)+e.className),v.createElement(`svg`,nn({stroke:`currentColor`,fill:`currentColor`,strokeWidth:`0`},t.attr,n,a,{className:s,style:an(an({color:e.color||t.color},t.style),e.style),height:o,width:o,xmlns:`http://www.w3.org/2000/svg`}),i&&v.createElement(`title`,null,i),e.children)};return Qt===void 0?t(Zt):v.createElement(Qt.Consumer,null,e=>t(e))}function fn(e){return un({tag:`svg`,attr:{viewBox:`0 0 496 512`},child:[{tag:`path`,attr:{d:`M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z`},child:[]}]})(e)}function pn(e){return un({tag:`svg`,attr:{viewBox:`0 0 512 512`},child:[{tag:`path`,attr:{d:`M172.2 226.8c-14.6-2.9-28.2 8.9-28.2 23.8V301c0 10.2 7.1 18.4 16.7 22 18.2 6.8 31.3 24.4 31.3 45 0 26.5-21.5 48-48 48s-48-21.5-48-48V120c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24v248c0 89.5 82.1 160.2 175 140.7 54.4-11.4 98.3-55.4 109.7-109.7 17.4-82.9-37-157.2-112.5-172.2zM209 0c-9.2-.5-17 6.8-17 16v31.6c0 8.5 6.6 15.5 15 15.9 129.4 7 233.4 112 240.9 241.5.5 8.4 7.5 15 15.9 15h32.1c9.2 0 16.5-7.8 16-17C503.4 139.8 372.2 8.6 209 0zm.3 96c-9.3-.7-17.3 6.7-17.3 16.1v32.1c0 8.4 6.5 15.3 14.8 15.9 76.8 6.3 138 68.2 144.9 145.2.8 8.3 7.6 14.7 15.9 14.7h32.2c9.3 0 16.8-8 16.1-17.3-8.4-110.1-96.5-198.2-206.6-206.7z`},child:[]}]})(e)}function mn(e){return un({tag:`svg`,attr:{viewBox:`0 0 512 512`},child:[{tag:`path`,attr:{d:`M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z`},child:[]}]})(e)}function hn(e){return un({tag:`svg`,attr:{viewBox:`0 0 512 512`},child:[{tag:`path`,attr:{d:`M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z`},child:[]}]})(e)}function gn(e){return un({tag:`svg`,attr:{viewBox:`0 0 384 512`},child:[{tag:`path`,attr:{d:`M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z`},child:[]}]})(e)}function _n(e){return un({tag:`svg`,attr:{viewBox:`0 0 576 512`},child:[{tag:`path`,attr:{d:`M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z`},child:[]}]})(e)}function vn(e){return un({tag:`svg`,attr:{viewBox:`0 0 576 512`},child:[{tag:`path`,attr:{d:`M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z`},child:[]}]})(e)}function yn(e){return un({tag:`svg`,attr:{viewBox:`0 0 512 512`},child:[{tag:`path`,attr:{d:`M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z`},child:[]}]})(e)}function bn(e){return un({tag:`svg`,attr:{viewBox:`0 0 512 512`},child:[{tag:`path`,attr:{d:`M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z`},child:[]}]})(e)}function xn(){return(0,M.jsx)(`footer`,{className:`site-footer`,children:(0,M.jsxs)(`div`,{className:`site-footer-inner`,children:[(0,M.jsxs)(`div`,{className:`site-footer-contact`,children:[(0,M.jsxs)(`a`,{href:`tel:${j.phone.replace(/-/g,``)}`,children:[(0,M.jsx)(bn,{"aria-hidden":`true`}),` `,j.phone]}),(0,M.jsxs)(`a`,{href:`mailto:${j.email}`,children:[(0,M.jsx)(hn,{"aria-hidden":`true`}),` `,j.email]}),(0,M.jsxs)(`a`,{href:j.links.github,target:`_blank`,rel:`noopener noreferrer`,children:[(0,M.jsx)(fn,{"aria-hidden":`true`}),` GitHub`]}),(0,M.jsxs)(`a`,{href:j.links.blog,target:`_blank`,rel:`noopener noreferrer`,children:[(0,M.jsx)(pn,{"aria-hidden":`true`}),` Tistory`]})]}),(0,M.jsxs)(`div`,{className:`site-footer-meta`,children:[(0,M.jsxs)(`span`,{children:[`© `,new Date().getFullYear(),` `,j.name,` · `,j.role]}),(0,M.jsx)(It,{to:A.architecture,children:`이 사이트의 구조 문서 보기`})]})]})})}var Sn=[{label:`홈`,to:A.home,icon:vn,end:!0},{label:`프로젝트`,to:A.projects,icon:_n},{label:`블로그`,to:A.blog,icon:yn},{label:`이력서`,to:A.resume,icon:gn}],Cn=[{label:`학력 및 교육`,to:A.education},{label:`수상 이력`,to:A.awards},{label:`자격증`,to:A.licenses},{label:`사이트 구조 문서`,to:A.architecture}];function wn(){let[e,t]=(0,v.useState)(!1),n=qe();(0,v.useEffect)(()=>{t(!1)},[n.pathname]),(0,v.useEffect)(()=>{if(!e)return;let n=e=>{e.key===`Escape`&&t(!1)};return document.addEventListener(`keydown`,n),()=>document.removeEventListener(`keydown`,n)},[e]);let r=Cn.some(e=>n.pathname===e.to);return(0,M.jsxs)(M.Fragment,{children:[e?(0,M.jsx)(`div`,{className:`bottom-sheet-backdrop`,role:`presentation`,onClick:()=>t(!1)}):null,e?(0,M.jsx)(`div`,{className:`bottom-sheet`,role:`dialog`,"aria-label":`더보기 메뉴`,children:(0,M.jsx)(`ul`,{children:Cn.map(e=>(0,M.jsx)(`li`,{children:(0,M.jsx)(Lt,{to:e.to,className:({isActive:e})=>e?`active`:void 0,children:e.label})},e.to))})}):null,(0,M.jsxs)(`nav`,{className:`bottom-nav`,"aria-label":`모바일 메뉴`,children:[Sn.map(e=>{let t=e.icon;return(0,M.jsxs)(Lt,{to:e.to,end:e.end,className:({isActive:e})=>`bottom-nav-item ${e?`active`:``}`,children:[(0,M.jsx)(t,{"aria-hidden":`true`}),(0,M.jsx)(`span`,{children:e.label})]},e.to)}),(0,M.jsxs)(`button`,{type:`button`,className:`bottom-nav-item ${r||e?`active`:``}`,"aria-expanded":e,onClick:()=>t(e=>!e),children:[(0,M.jsx)(mn,{"aria-hidden":`true`}),(0,M.jsx)(`span`,{children:`더보기`})]})]})]})}var Tn=[{index:`01`,heading:`운영 관점에서 문제를 해결해왔습니다`,cards:[{title:`LG U+ 빌링 및 GW 시스템`,paragraphs:[`LG U+ 빌링 및 GW 시스템을 운영하면서, 장애가 발생한 뒤 대응하는 방식보다 문제가 반복되지 않도록 구조적으로 개선하는 것이 더 중요하다고 느꼈습니다.`,`WhaTap 애플리케이션 대시보드의 히트맵에서 slow 쿼리·fail 쿼리 내역을 추출해 분석하고, Kafka 연동 오류 발생 내역을 집계해 일일 단위로 운영자에게 공유하는 보고 체계를 만들었습니다.`,`오류 자체보다도 공유와 조치까지 시간이 오래 걸리는 점이 더 큰 문제였기 때문에, 각 파트 운영자가 빠르게 인지하고 대응할 수 있도록 프로세스를 정리했습니다. 그 결과 주간 오류 발생 건수를 약 93% 감소시켰습니다.`]},{title:`개선 원칙`,accent:!0,list:[`장애 대응보다 재발 방지 중심의 구조 개선`,`모니터링과 보고 체계를 통한 빠른 운영 피드백`,`AI 도구를 개발·운영 프로세스에 실용적으로 통합`]}]},{index:`02`,heading:`레거시 한계를 그대로 두지 않았습니다`,twoColumn:!0,cards:[{title:`CloudXper 플랫폼 고도화`,paragraphs:[`실제 운영에서 느낀 병목을 그대로 받아들이지 않고, 구조를 바꿔 성능을 개선하는 데 집중했습니다.`,`100만 건 규모에서 10분까지 늘어지던 대용량 집계 API를 계층 구조(DTO·Service·ServiceImpl) 재정비와 빌더 패턴, Parallel Stream 기반 병렬 처리로 리팩토링해 1분 15초까지 단축했습니다.`,`리팩토링 과정에서 정리한 구조를 팀 코드 컨벤션 가이드로 문서화해 배포했고, 상세 과정은 블로그에 정리했습니다.`]},{title:`국토교통부 전세사기 지원관리시스템`,paragraphs:[`CodeRay(SAST) 탐지 취약점 358건을 CWE 유형별로 분류·분석해 시큐어코딩을 적용하고, 반복 재검증으로 최종 탐지 4건(외부모듈)을 만들었습니다.`,`코드 수정에 그치지 않고 실행 경로 검증으로 미사용·벤더·테스트 코드를 제거해 공격 표면 자체를 줄였으며, 테이블명을 문자열 치환하던 망간 연계 동적 쿼리는 점검 전에 정적 쿼리로 선제 재설계해 SQL Injection을 원천 차단했습니다.`,`유형별 조치 기준과 판단 과정은 블로그의 CWE 시리즈로 정리해 두었습니다.`]}]}];function En({card:e}){return(0,M.jsxs)(`article`,{className:`story-card ${e.accent?`accent-card`:``}`,children:[(0,M.jsx)(`h3`,{children:e.title}),e.paragraphs?.map(e=>(0,M.jsx)(`p`,{children:e},e)),e.list?.length?(0,M.jsx)(`ul`,{className:`principle-list`,children:e.list.map(e=>(0,M.jsx)(`li`,{children:e},e))}):null]})}function Dn(){return(0,M.jsxs)(`div`,{className:`page-shell home-page`,children:[(0,M.jsx)(`section`,{className:`hero-card`,children:(0,M.jsxs)(`div`,{className:`hero-copy`,children:[(0,M.jsx)(`span`,{className:`eyebrow`,children:`About Me`}),(0,M.jsx)(`h1`,{className:`title`,children:`안정성은 견고하게, 운영은 스마트하게`}),(0,M.jsxs)(`p`,{className:`subtitle`,children:[`시스템의 잠재적 리스크를 줄이고, 운영 효율을 기술로 개선해온 3년 차 백엔드 개발자 `,j.name,`입니다.`]}),(0,M.jsx)(`p`,{className:`hero-summary`,children:`서비스의 가치는 단순한 구축이 아니라 안정적인 운영 과정에서 완성된다고 생각합니다. 운영 환경에서 반복되는 문제를 구조적으로 줄이고, 팀이 더 빠르게 인지하고 대응할 수 있는 흐름을 만드는 데 집중해왔습니다.`})]})}),Tn.map(e=>(0,M.jsxs)(`section`,{className:`section story-section`,children:[(0,M.jsxs)(`div`,{className:`section-heading`,children:[(0,M.jsx)(`span`,{className:`section-index`,children:e.index}),(0,M.jsx)(`h2`,{children:e.heading})]}),(0,M.jsx)(`div`,{className:`story-grid ${e.twoColumn?`two-column`:``}`,children:e.cards.map(e=>(0,M.jsx)(En,{card:e},e.title))})]},e.index)),(0,M.jsxs)(`section`,{className:`section closing-section`,children:[(0,M.jsxs)(`div`,{className:`section-heading`,children:[(0,M.jsx)(`span`,{className:`section-index`,children:`03`}),(0,M.jsx)(`h2`,{children:`지향점`})]}),(0,M.jsx)(`p`,{className:`closing-copy`,children:`운영 환경에서 문제를 해결하는 경험을 쌓으며, 단순히 동작하는 코드가 아니라 오랫동안 안정적으로 운영되는 시스템을 만드는 개발자를 지향하게 되었습니다. 장애를 겪으면 대응에서 멈추지 않고 재발하지 않는 구조를 고민했고, 성능 문제는 구조를 바꿔 풀었으며, 보안은 점검이 오기 전에 먼저 움직였습니다.`}),(0,M.jsx)(`p`,{className:`closing-copy`,children:`그리고 그 과정을 저만 아는 지식으로 두지 않으려 합니다. 코드 컨벤션 가이드, 운영 매뉴얼, 기술 블로그처럼 팀이 재사용할 수 있는 기록으로 남겨서, 시스템이 특정 사람에게 의존하지 않고 굴러가게 만드는 것까지가 개발이라고 생각합니다.`}),(0,M.jsx)(`p`,{className:`closing-copy`,children:`이 경험을 바탕으로, 서비스가 더 안정적으로 성장하는 데 기여하고 싶습니다.`})]}),(0,M.jsxs)(`section`,{className:`section tech-shell`,children:[(0,M.jsxs)(`div`,{className:`section-heading`,children:[(0,M.jsx)(`span`,{className:`section-index`,children:`04`}),(0,M.jsx)(`h2`,{children:`기술 스택`})]}),(0,M.jsx)(`div`,{className:`tech-columns`,children:j.techStack.map(e=>(0,M.jsxs)(`div`,{className:`tech-group`,children:[(0,M.jsx)(`h3`,{children:e.label}),(0,M.jsx)(`div`,{className:`tech-grid`,children:e.items.map(e=>(0,M.jsx)(`span`,{className:`tech-item`,children:e},e))})]},e.label))})]})]})}var On=[{slug:`jeonse-support-system`,title:`전세사기 피해자 지원관리시스템 운영·고도화`,shortTitle:`전세사기 피해자 지원관리시스템 운영·고도화`,description:`전세사기 피해자 관리 시스템 레거시 고도화, 성능 최적화, 보안 강화, 운영 안정화 및 신규 기능개발`,period:`2025.09 ~ 2026.08`,role:`시스템 운영·기능 개발`,skills:[{label:`기술`,value:`eGovFrame 4.1.0, JSP, JSTL, jQuery, CSS, MyBatis, Jasypt, Apache SSHD, Maven`},{label:`인프라`,value:`Apache Tomcat 9.0.31, JBOSS, Linux(Fedora), CUBRID, SVN`},{label:`사용 툴`,value:`Cursor IDE, Claude AI, STS4, DBeaver`}],mainTasks:[`요청 기반 개선 대응 및 오류 분석, 기능 유지보수·자동화 수행`,`서버 용량 점검, 파일 관리, 리소스 모니터링 등 인프라 운영`,`SVN 기반 JAR 패키징 및 SFTP/SSH 활용 운영 환경 배포`],achievements:[{title:`CodeRay 기반 SAST 취약점 전수 분석 및 시큐어코딩 개선`,detail:`CodeRay SAST 탐지 취약점 전수 분석 및 CWE 유형별 시큐어코딩 적용, 단순 코드 수정뿐 아니라 실행 경로 검증을 통해 미사용·벤더·테스트 코드까지 제거하여 애플리케이션 보안 품질 강화`,result:`CodeRay 기반 SAST 취약점 358건을 CWE 유형별 분석·시큐어코딩하고 반복 재검증하여 최종 탐지 4건 달성`},{title:`국자원 웹 취약점 점검 사전 대응 및 보안 아키텍처 강화`,detail:`KISA 표준 웹 취약점 점검 결과 기반 HIGH 6·MEDIUM 7·LOW 3 항목 개선 및 SQL Injection 오류 14건 대응, 9개 테이블·97개 컬럼 정적 SQL 분기 재설계와 Jasypt 공통 암호화 유틸 적용으로 4개 환경별 계정 정보 17건 보호`,result:`보안 취약점 16건 개선, SQL Injection 14건 해소, 계정정보 17건 암호화 적용`},{title:`개인정보 대량 암호화 패치 및 CI값 보안 강화`,detail:`티빙 CI값 유출 사례 인지 후 가입·인증 컬럼 암호화 선제 조치, Damo 암복호화 솔루션 기반 CSQL nohup 백그라운드 처리로 서비스 중단 없이 대량 패치 완료`,result:`행안부 연계 CI값 14만 건·개인정보 이력 로그 370만 건, 총 384만 건 암호화 적용`,references:[{text:`티빙 CI값 유출 관련 보도 - JTBC`,href:`https://news.jtbc.co.kr/article/NB12302277`}]},{title:`운영 행정망 Slow Query 분석 및 인덱스 튜닝`,detail:`DBeaver 실행계획(EXPLAIN)을 기반으로 Full Scan 및 병목 구간을 분석하고, 조회 패턴에 맞는 인덱스 설계와 SQL 조건 개선을 수행하여 반복 발생하는 Slow Query를 최적화`,result:`53초 소요 Slow Query 개선 및 월간 운영 점검 특이사항 0건 유지`},{title:`Markdown 기반 AI 유지보수 자동화 체계 구축`,detail:`전세사기 도메인 업무를 Markdown 기반 템플릿으로 정형화하고 AI 활용 개발 프로세스를 적용하여 기능 개발 속도 및 업무 처리 효율 개선`,result:`사용자 오류 재현 및 소스 분석 시간 30~40% 단축`},{title:`인프라 용량 관리 모니터링 자동화 및 점검 프로세스 표준화`,detail:`Apache SSHD 의존성을 적용하여 SSH 기반 서버 접속 기능을 구현하고, CPU·메모리·디스크 사용률 정보를 실시간 수집해 화면에서 시각적으로 확인 가능한 기능 개발`,result:`CLI 수동 점검 화면 기반 모니터링으로 전환, 메모리·시스템 용량 사용률 30% 이하 관리`}]},{slug:`cloudxper-billing`,title:`CloudXper 클라우드 빌링 플랫폼 고도화`,shortTitle:`CloudXper 클라우드 빌링 플랫폼 고도화`,description:`AWS · GCP · Azure · Kakao 저장소 대여·청구 통합 관리 플랫폼의 백엔드 아키텍처 개선 및 대용량 데이터 처리 최적화`,period:`2024.10 ~ 2025.02`,role:`플랫폼 서버 백엔드 개발`,skills:[{label:`기술`,value:`Spring Boot(3.x.x), REST API, React, Swagger, MyBatis, Gradle`},{label:`인프라`,value:`Redis, MySQL, SonarQube, Linux(Ubuntu), Jenkins, GitLab`},{label:`사용 툴`,value:`DBeaver, IntelliJ, VSCode`}],mainTasks:[`가입, 청구, 상품 및 공통 조회 등 주요 REST API 설계·개발`,`프로젝트 구조 표준 정의 및 코드 리팩토링 후 팀 공유 및 적용`,`OAuth 사용자 인증 정보 Redis 캐싱 기반 저장·조회 권한 모듈 신규 개발`],achievements:[{title:`대용량 데이터 조회 성능 최적화`,detail:`Java Parallel Stream 기반 병렬 처리 구조를 소스 전역 집계 로직에 적용하여 대용량 데이터 처리 성능 개선`,result:`API 응답 시간 87% 단축 (10분 → 1분 15초)`},{title:`Redis 기반 인증 아키텍처 최적화`,detail:`OAuth 인증·권한 정보를 Redis에 캐싱하는 권한 모듈을 신규 개발하고 토큰 만료와 Redis TTL을 자동 동기화`,result:`인증·권한 조회 병목을 제거하여 페이지 전환 및 렌더링 응답 속도 개선(10초 -> 0.10초 이내)`},{title:`코드 리팩토링 및 개발 컨벤션 표준화`,detail:`Builder Pattern 도입으로 객체 생성 중복 제거, 패키지 구조 재정립과 코딩 컨벤션 문서를 직접 작성·팀에 공유하여 온보딩 시간 단축`,result:`유지보수성·협업 효율 향상, SonarQube 코드 품질 지표 개선`}]},{slug:`lgu-billing-gw`,title:`빌링 GW 시스템 개발·운영 유지보수`,shortTitle:`빌링 GW 시스템 개발·운영 유지보수`,description:`Kafka 기반 청구·빌링 GW 시스템의 개발 및 운영, 이기종 시스템 연동 및 데이터 흐름 표준화`,period:`2022.11 ~ 2025.05`,role:`SM/SI 서비스 개발 및 연동 시스템 유지보수`,skills:[{label:`기술`,value:`Spring Boot(2.x.x), Batch(4.x.x), REST API, HTML5, CSS, JavaScript, Swagger, MyBatis, Maven`},{label:`인프라`,value:`Redis, Kafka, APIM, TMS, Jenkins, GitLab, WhaTap, JobPass, Linux(CentOs), Oracle`},{label:`사용 툴`,value:`Trusted Orange, STS, SecureCRT, FileZilla(SFTP), VSCode`}],mainTasks:[`Kafka Topic 기반 데이터 처리 로직 설계·구현 및 연동 시스템 모니터링·장애 대응`,`빌링 요금·위약금 조회 및 전자세금계산서·청구 API 설계·개발`,`Spring Batch 기반 배치 처리 및 리포팅 자동화 시스템 개발·운영`],achievements:[{title:`Kafka 연동 오류 모니터링 체계 구축 및 대응 시나리오 표준화`,detail:`WhaTap 히트맵 기반 연동 실패 패턴을 분석해 오류 유형별 대응 시나리오를 매뉴얼화하고, 데이터 보정 스크립트 정비 및 장애 발생 시 동일한 절차로 즉시 대응 가능한 운영 체계 마련`,result:`주간 Kafka 오류 70건 → 5건 미만 (93% 감소)`},{title:`이기종 DB 연동 유지보수 및 데이터 정합성 자동 검증`,detail:`Oracle ↔ MySQL 인코딩 차이 이슈를 Java 바이트 변환 로직(SUBSTRB)·Subscriber 로직 수정으로 근본 해결, 연동 검증 로직을 공통 모듈로 표준화하여 신규 연동 추가 시 자동 적용`,result:`인코딩 오류 95% 감소, 신규 연동 실패율 5% 미만 유지`},{title:`청구 도메인 기반 요금·위약금 조회 API 신규 개발`,detail:`고객 계약·요금제·청구 정보를 통합 조회하는 REST API를 설계·개발하여 상담 시스템의 실시간 요금·위약금 조회 기능 구현`,result:`요금 분석 시뮬레이터 실시간 조회 API 제공, 3개월 예상 요금 안내 상담 업무 효율 향상`}]}];function kn(){return(0,M.jsxs)(`div`,{className:`page-shell`,children:[(0,M.jsx)(`h1`,{children:`Projects`}),(0,M.jsx)(`p`,{className:`page-lead`,children:`운영 안정화·성능 개선·보안 강화를 중심으로 진행한 프로젝트들입니다. 카드를 누르면 상세 업무와 성과를 볼 수 있습니다.`}),(0,M.jsx)(`div`,{className:`project-index-list`,children:On.map(e=>(0,M.jsxs)(It,{to:A.project(e.slug),className:`project-index-card`,children:[(0,M.jsxs)(`div`,{className:`project-index-head`,children:[(0,M.jsx)(`h2`,{children:e.shortTitle||e.title}),(0,M.jsxs)(`span`,{className:`project-index-period`,children:[e.period,` · `,e.role]})]}),(0,M.jsx)(`p`,{className:`project-index-description`,children:e.description}),(0,M.jsx)(`div`,{className:`project-index-results`,children:e.achievements.slice(0,2).map(e=>(0,M.jsx)(`span`,{className:`project-index-result`,children:e.result},e.title))}),(0,M.jsx)(`span`,{className:`project-index-more`,children:`자세히 보기 →`})]},e.slug))})]})}var N=(e,t,n,r,i,a,o,s,c=!1,l=`service`)=>({id:e,x:t,y:n,w:r,h:108,title:i,lines:a,logo:o,detail:s,owned:c,kind:l}),P=(e,t,n,r,i,a,o=`data`,s=!1)=>({from:e,to:t,d:n,label:r,x:i,y:a,type:o,both:s}),An={"lgu-billing-gw":{theme:`event`,intro:`이벤트가 도착한 뒤, 서로 다른 키와 데이터 구조를 맞춰 구독 DB에 반영하는 흐름입니다.`,figures:[{id:`gw-events`,title:`01 / 이벤트 연동과 업무키 변환`,height:450,summary:`발행 시스템 → Kafka → Spring Boot GW → 구독 DB. GW는 Redis에서 업무키를 해석하고 메타데이터로 변환하며, 매핑이 없으면 재처리합니다.`,zones:[{x:474,y:30,w:250,h:400,label:`담당 영역 · 서비스 도메인 GW`,owned:!0}],nodes:[N(`publisher`,20,98,180,`차세대 발행 시스템`,[`분리된 원천 테이블`,`UUID 기반 payload`],null,`차세대 전환으로 원천 테이블과 PK 체계가 변경됐습니다. 발행 시스템의 DB 제품별 배치는 공개 기록에 없어 특정 제품으로 지정하지 않았습니다.`),N(`kafka`,255,98,170,`Apache Kafka`,[`테이블 / 도메인 토픽`,`Pub · Sub 이벤트 전달`],`apachekafka`,`Producer가 payload를 발행하고 GW가 토픽을 구독합니다. Redis는 이 메시지를 전달하는 큐가 아니라 키 해석을 위한 저장소입니다.`),N(`gw`,494,98,210,`Spring Boot 2.x`,[`Dispatcher → 변환 서비스`,`MyBatis · INS/UPD/MER/DEL`],`spring`,`Dispatcher가 MNO/MVNO를 분기하고 AbstractGwService의 구현체가 원천을 해석해 대상 데이터로 변환합니다. 이 연동 로직의 개발·유지보수와 정합성 대응을 담당했습니다.`,!0),N(`target`,770,98,170,`구독 파트 DB`,[`과금 · 청구 · 정산`,`Oracle / MySQL 연동 환경`],`oracle`,`GW가 기존 업무키와 join 조건을 이용해 대상 테이블을 반영합니다. Oracle↔MySQL 연동 경험은 확인되지만 각 파트별 DB 제품 배치는 공개 기록에 구분되어 있지 않습니다.`,!1,`database`),N(`redis`,494,296,210,`Redis · 키 매핑`,[`UUID ↔ 기존 업무키`,`신규 생성 때 저장 / 변경 때 조회`],`redis`,`INS 이벤트에서 UUID와 업무키 매핑을 저장합니다. 이후 UUID만 온 변경 이벤트는 Redis에 저장된 업무키로 대상 행을 찾습니다.`,!0,`database`),N(`metadata`,770,296,170,`매핑 메타데이터`,[`원천 → 대상 컬럼`,`1:1 / 1:N · join 조건`],null,`토픽·이벤트 필드·원천/대상 컬럼과 join 플래그를 테이블로 관리합니다. 신규 연계는 매핑 등록과 DTO·의존성 배포를 함께 처리했습니다.`,!1,`database`),N(`retry`,255,296,170,`재처리 대기`,[`매핑 생성 전 도착한 이벤트`,`업무키 확보 후 다시 처리`],null,`순서 역전으로 키를 해석하지 못한 이벤트를 보관했다가 매핑 생성 후 재처리합니다. 전용 DLQ나 Kafka 재발행 방식은 기록에 없어 특정 기술로 표시하지 않았습니다.`)],edges:[P(`publisher`,`kafka`,`M200 150 H255`,`① Pub`,227,136),P(`kafka`,`gw`,`M425 150 H494`,`② Sub`,459,136),P(`gw`,`target`,`M704 150 H770`,`④ DML`,737,136),P(`gw`,`redis`,`M599 206 V296`,`③ 키 저장·조회`,599,257,`lookup`,!0),P(`gw`,`metadata`,`M704 180 H744 V350 H770`,`변환 규칙`,745,265,`lookup`,!0),P(`gw`,`retry`,`M514 206 V246 H340 V296`,`키 해석 실패`,398,238,`retry`),P(`retry`,`gw`,`M255 350 H226 V70 H540 V98`,`매핑 생성 후 재처리`,358,62,`retry`)],notes:[`실선: 이벤트·데이터 반영`,`점선: 키·규칙 조회`,`주황선: 재처리`],guide:[[`①–② 이벤트 수신`,`새 UUID 구조로 온 이벤트를 Kafka에서 구독합니다. GW가 사업 구분과 payload 형상에 맞는 처리 경로를 선택합니다.`],[`③ 업무키 해석`,`Redis에서 기존 업무키를 찾고, 메타데이터로 컬럼·join 조건을 맞춥니다. 매핑이 없으면 재처리 경로로 보냅니다.`],[`④ 구독 DB 반영`,`과금·청구·정산 테이블에 작업 유형별 DML을 반영합니다. Redis와 DB는 서로 다른 책임을 가집니다.`]]}],supporting:[{title:`연동 운영`,tools:[[`WhaTap`,null],[`GW 모니터링`,null]],text:`히트맵·대사 결과 확인 → 원인 분류 → 보정 DML → 재대사`},{title:`병행 개발 업무`,tools:[[`Spring Batch 4.x`,`spring`],[`REST API · Swagger`,null]],text:`배치·리포팅 자동화, 요금·위약금 조회 API 개발`},{title:`빌드·운영 환경`,tools:[[`GitLab`,`gitlab`],[`Maven`,`maven`],[`Jenkins`,`jenkins`],[`CentOS`,`linux`]],text:`함께 사용한 도구 · APIM / TMS / JobPass의 세부 연결은 생략`}]},"cloudxper-billing":{theme:`cloud`,intro:`화면 요청을 처리하는 API를 중심으로, 권한 캐시 경로와 업무 데이터 조회 경로를 나눴습니다.`,providers:[[`AWS`,`amazonwebservices`],[`GCP`,`googlecloud`],[`Azure`,`azure`],[`Kakao`,null]],figures:[{id:`cloud-request`,title:`01 / 요청·권한·업무 데이터의 분기`,height:605,summary:`React 화면이 Spring Boot Controller를 호출하고 권한 서비스는 Redis를 조회합니다. 캐시 미스는 MySQL에서 조회해 채우며, 업무 서비스는 MyBatis를 통해 MySQL을 조회합니다.`,zones:[{x:248,y:24,w:324,h:556,label:`Spring Boot 3.x · Ubuntu`,owned:!0},{x:684,y:188,w:252,h:392,label:`캐시 / 영속 데이터`}],nodes:[N(`react`,24,90,172,`React 관리 화면`,[`가입 · 상품 · 청구`,`사용자별 권한에 맞춘 표시`],`react`,`React 화면이 REST API를 호출하고 DTO 응답을 받습니다. 담당 범위는 플랫폼 백엔드 개발이며 프런트엔드 전체 개발로 표시하지 않았습니다.`),N(`controller`,280,90,260,`Controller · DTO`,[`HTTP 요청·응답 / 입력 검증`,`API 계약과 DB Model 분리`],`spring`,`HTTP 처리와 검증을 Controller에 두고, 비즈니스 규칙과 데이터 조립은 ServiceImpl로 모았습니다.`,!0),N(`permission`,280,255,260,`인증·권한 서비스`,[`사용자 + 코드 그룹별 캐시`,`로그아웃·권한 변경 시 삭제`],`java`,`OAuth 인증·권한 조회 모듈을 Redis 캐싱 구조로 개선했습니다. TTL은 만료 정책에 맞추고 사용자별 키를 무효화합니다.`,!0),N(`redis`,704,255,212,`Redis`,[`인증·권한 캐시`,`Cache hit → 권한 반환`],`redis`,`반복되는 권한 조회를 메모리에서 처리합니다. 캐시가 없으면 애플리케이션이 DB에서 조회해 캐시를 채웁니다. Redis가 DB를 직접 조회하는 구조는 아닙니다.`,!1,`database`),N(`service`,280,440,260,`ServiceImpl · MyBatis`,[`공통 조회·데이터 조립`,`연관 리스트 병렬 조회`],`spring`,`화면마다 흩어진 로직을 모으고 parallelStream으로 연관 조회의 대기 시간을 겹쳤습니다. SQL 호출 수 자체는 유지됩니다.`,!0),N(`mysql`,704,440,212,`MySQL`,[`가입 · 상품 · 청구 데이터`,`권한 원본 테이블`],`mysql`,`DAO가 MyBatis로 업무 데이터를 조회합니다. 캐시 미스 시 권한 원본도 여기에서 조회하며, 캐시는 DB 왕복을 줄이는 별도 경로입니다.`,!1,`database`)],edges:[P(`react`,`controller`,`M196 144 H280`,`① REST / JSON`,238,123,`data`,!0),P(`controller`,`permission`,`M410 198 V255`,`② 권한 확인`,410,229),P(`permission`,`redis`,`M540 307 H704`,`③ 캐시 저장·조회`,622,289,`lookup`,!0),P(`permission`,`mysql`,`M540 335 H626 V469 H704`,`Cache miss`,626,399,`lookup`),P(`permission`,`service`,`M410 363 V440`,`권한 확인 후 업무 처리`,410,403),P(`service`,`mysql`,`M540 514 H704`,`④ SQL / 조회 결과`,622,540,`data`,!0)],notes:[`실선: 요청·업무 데이터`,`점선: 캐시 조회 / 미스 경로`],guide:[[`① API 진입`,`관리 화면의 요청을 검증하고, DTO로 입출력 계약을 분리합니다. 실제 인증 제공자의 외부 배치는 생략했습니다.`],[`②–③ 권한 캐시`,`캐시가 있으면 Redis에서 권한을 읽습니다. 없으면 권한 서비스가 MySQL을 조회해 다시 캐싱합니다.`],[`④ 업무 조회`,`권한 확인을 거친 조회·조립 로직은 공통 ServiceImpl을 사용합니다. 응답은 Controller를 통해 화면으로 돌아갑니다.`]]},{id:`cloud-performance`,title:`02 / 성능 개선 지점 · 순차 대기를 병렬 대기로`,height:325,summary:`개선 전에는 연관 DB 조회를 순서대로 기다렸습니다. 개선 후 parallelStream에서 일부 조회를 동시에 처리했고, N+1 SQL 횟수는 그대로입니다.`,zones:[{x:20,y:18,w:440,h:276,label:`BEFORE · 약 10분`},{x:490,y:18,w:450,h:276,label:`AFTER · 약 1분 15초`,owned:!0}],nodes:[N(`sequential`,44,80,180,`순차 조회`,[`항목 1 → 2 → 3 → …`,`이전 조회 종료까지 대기`],`java`,`부모 목록의 각 항목마다 연관 리스트를 순서대로 조회하던 형태입니다. 100만 건 데이터에서 약 10분이 소요됐습니다.`),N(`beforedb`,270,80,164,`MySQL`,[`목록 1회 + 연관 N회`,`대기 시간 누적`],`mysql`,`N+1 조회가 데이터 증가에 따라 병목으로 드러났습니다.`,!1,`database`),N(`parallel`,514,80,204,`parallelStream`,[`여러 연관 조회 동시 진행`,`ServiceImpl에서 조립`],`java`,`같은 테스트 조건에서 약 1분 15초로 줄었습니다. 작업 스레드, 커넥션 풀과 DB 자원의 영향을 받는 개선입니다.`,!0),N(`afterdb`,770,80,146,`MySQL`,[`SQL 수는 동일`,`N+1 구조는 남음`],`mysql`,`N+1 자체를 제거한 개선은 아닙니다. 집합 조회와 EXPLAIN 분석은 회고에서 정리한 다음 단계입니다.`,!1,`database`)],edges:[P(`sequential`,`beforedb`,`M224 134 H270`,`SQL`,247,121),P(`parallel`,`afterdb`,`M718 110 H770`,``,744,98),P(`parallel`,`afterdb`,`M718 140 H770`,``,744,98),P(`parallel`,`afterdb`,`M718 170 H770`,``,744,98)],notes:[`동일한 100만 건 테스트 조건에서 비교 · 시간 축 비례 도표 아님`],guide:[[`이 그림의 핵심`,`병렬화로 DB 대기 시간을 겹친 성과입니다. 쿼리 수 감소나 무제한 확장으로 해석하지 않도록 SQL 수와 남은 한계를 함께 표시했습니다.`]]}],supporting:[{title:`빌드·품질 도구`,tools:[[`GitLab`,`gitlab`],[`Gradle`,`gradle`],[`Jenkins`,`jenkins`],[`SonarQube`,`sonarqube`]],text:`프로젝트에서 함께 사용한 도구 · 실제 CI 단계 순서는 표현하지 않음`},{title:`개발·검증`,tools:[[`Swagger`,null],[`DBeaver`,null],[`Ubuntu`,`linux`]],text:`API 성능 반복 확인 · DTO/Model/Service 컨벤션 작성·팀 공유`}]},"jeonse-support-system":{theme:`public`,intro:`대민 인터넷망과 내부 업무망을 구분하고, 데이터 동기화와 운영 수집을 별도의 그림으로 읽을 수 있게 구성했습니다.`,figures:[{id:`public-network`,title:`01 / 망 분리 환경과 데이터 동기화`,height:605,summary:`인터넷망과 업무망 각각의 WEB, WAS, CUBRID DB 계층. 두 DB의 게시물·첨부 데이터를 MyBatis 정적 SELECT/MERGE 동기화 로직으로 맞춥니다.`,zones:[{x:20,y:24,w:270,h:555,label:`인터넷망 · 대민 서비스`},{x:670,y:24,w:270,h:555,label:`업무망 · 내부 업무`}],nodes:[N(`publicweb`,46,84,218,`WEB · 인터넷망`,[`대민 웹 요청 진입`,`Linux 서버`],`linux`,`인터넷망 WEB/WAS 운영 환경을 표현한 논리 계층입니다. WEB 서버 제품명·방화벽·로드밸런서 구성은 기록에 없어 지정하지 않았습니다.`),N(`publicwas`,46,266,218,`WAS · 업무 서비스`,[`eGovFrame 4.1 · JSP`,`JSTL · jQuery · MyBatis`],`java`,`JSP·jQuery 화면과 eGovFrame 기반 업무 서비스입니다. 공통 사용 WAS는 Tomcat 9 / JBoss지만 각 망의 제품별 배치 정보는 없어 여기서는 WAS로 표기합니다.`),N(`publicdb`,46,446,218,`CUBRID · 인터넷망`,[`게시물 · 첨부파일 데이터`,`명시적 컬럼 조회·반영`],null,`망간 동기화 대상 데이터입니다. 원본 존재 여부를 확인한 뒤 대상 MERGE를 수행해 빈 원본으로 인한 NULL 덮어쓰기를 방지합니다.`,!1,`database`),N(`internalweb`,696,84,218,`WEB · 업무망`,[`내부 업무 요청 진입`,`Linux 서버`],`linux`,`업무망 WEB/WAS 환경입니다. 그림의 선은 애플리케이션 요청 흐름이며 실제 망 접근 정책이나 물리 네트워크 연결을 의미하지 않습니다.`),N(`internalwas`,696,266,218,`WAS · 업무 서비스`,[`eGovFrame 4.1 · JSP`,`Jasypt · MyBatis`],`java`,`기능 개발·오류 분석·보안 조치를 수행한 업무 계층입니다. Jasypt 공통 유틸은 환경별 계정 정보 보호에 사용했습니다.`),N(`internaldb`,696,446,218,`CUBRID · 업무망`,[`업무 데이터 · 동기화 이력`,`Damo 개인정보 암호화`],null,`CUBRID에서 실행계획과 인덱스를 분석했습니다. CI·개인정보 이력 384만 건 암호화는 별도 DB 패치로 수행했으며 두 망의 제품별 암호화 배치를 나타낸 것은 아닙니다.`,!1,`database`),N(`sync`,364,446,232,`동기화 Service / DAO`,[`테이블별 SELECT / MERGE`,`원본 없으면 skip + 로그`],`java`,`기존 연계 Service 인터페이스를 유지하면서 DAO·MyBatis Mapper를 정적 statement로 개선했습니다. 배치 위치가 아닌 두 망 간 논리 연계 기능을 나타냅니다.`,!0),N(`security`,364,206,232,`보안 개선 지점`,[`CodeRay SAST → 재검증`,`SQL 바인딩 · Jasypt · Damo`],null,`CodeRay 358→4건, 웹 취약점과 SQL Injection 개선, 계정 정보 보호 및 개인정보 암호화를 수행했습니다. 운영 데이터 흐름과 구분된 개선 범위입니다.`,!0)],edges:[P(`publicweb`,`publicwas`,`M155 192 V266`,`① HTTP 요청`,155,232),P(`publicwas`,`publicdb`,`M155 374 V446`,`② MyBatis / SQL`,155,415,`data`,!0),P(`internalweb`,`internalwas`,`M805 192 V266`,`① HTTP 요청`,805,232),P(`internalwas`,`internaldb`,`M805 374 V446`,`② MyBatis / SQL`,805,415,`data`,!0),P(`publicdb`,`sync`,`M264 500 H364`,`③ 동기화`,314,484,`data`,!0),P(`sync`,`internaldb`,`M596 500 H696`,`③ 동기화`,646,484,`data`,!0),P(`security`,`sync`,`M480 314 V446`,`정적 SQL · 값 바인딩`,480,389,`lookup`)],notes:[`실선: 업무·동기화 흐름`,`점선: 보안 개선 적용`,`WEB/WAS/DB는 논리 계층 · 장비 대수·물리 배치 생략`],guide:[[`①–② 각 망의 업무 처리`,`WEB을 거친 요청을 eGovFrame·JSP 서비스가 처리하고 MyBatis로 CUBRID에 접근합니다. 각 망의 서버·DB를 나눠 표시했습니다.`],[`③ 망간 데이터 동기화`,`게시물·첨부 데이터는 테이블별 SELECT/MERGE로 맞춥니다. 중간 박스는 논리 연계 기능이며 직접 DB 간 통신을 뜻하지 않습니다.`],[`담당 개선 범위`,`동적 SQL의 문자열 조립을 제거하고, 개인정보·계정 암호화와 취약점 재검증을 수행했습니다. 다음 그림은 별도 개발한 운영 수집 기능입니다.`]]},{id:`public-monitoring`,title:`02 / SSH 기반 서버 점검과 이력 조회`,height:505,summary:`대표 WAS Quartz가 4시간마다 MINA SSHD 수집을 시작합니다. WEB/WAS에서 명령 결과를 받고 CUBRID에 이력을 저장해 JSP 관리자 화면에서 조회합니다.`,zones:[{x:20,y:22,w:545,h:216,label:`대표 WAS · 직접 개발한 수집 기능`,owned:!0},{x:20,y:282,w:545,h:188,label:`CUBRID · 수집 설정과 이력`}],nodes:[N(`quartz`,40,92,190,`Quartz 스케줄러`,[`4시간 주기 · 대표 1대`,`개발 환경 수집 차단`],`java`,`WAS 2대의 이중 수집을 막기 위해 대표 1대만 스케줄을 활성화했습니다. 개발 환경은 별도로 차단합니다.`),N(`ssh`,325,92,220,`Apache MINA SSHD`,[`SSH EXEC · 명령 결과 파싱`,`timeout · stdout/stderr 분리`],`java`,`JSch의 알고리즘 협상 실패를 분석한 뒤 MINA SSHD로 전환했습니다. 접속·인증·명령 실행에 제한 시간을 두고 자원을 정리합니다.`,!0),N(`servers`,690,92,230,`Linux WEB / WAS`,[`인터넷망 · 업무망 수집 대상`,`free · top/vmstat · df`],`linux`,`서버별 메모리·CPU·디스크 값을 수집합니다. 선은 수집 요청/응답의 논리 경로이며 실제 망별 허용 경로는 생략했습니다.`),N(`connections`,40,320,190,`접속 정보 테이블`,[`호스트 · 계정 · 수집 대상`,`비밀번호 DB 암호화`],null,`접속 정보는 DB 테이블로 관리하고 비밀번호 컬럼은 암호화했습니다. 서버 추가는 데이터 등록으로 반영합니다.`,!1,`database`),N(`history`,325,320,220,`CUBRID · 수집 이력`,[`서버별 CPU·메모리·디스크`,`주기별 데이터 누적`],null,`SSH 수집 결과를 파싱해 이력으로 저장합니다. 관리자 화면은 서버별 최신 1건을 조회하며, 실시간 스트리밍 수집이 아닙니다.`,!1,`database`),N(`admin`,690,320,230,`관리자 화면`,[`Controller → JSP / jQuery`,`최신 이력 조회 · 월말 보고`],`jquery`,`서버별 최신 이력을 화면에서 확인하고 누적 데이터를 월말 보고에 활용합니다. 수집 주기는 4시간입니다.`,!0)],edges:[P(`quartz`,`ssh`,`M230 145 H325`,`① 실행`,278,128),P(`ssh`,`servers`,`M545 145 H690`,`② SSH / 명령 결과`,617,126,`data`,!0),P(`ssh`,`history`,`M435 200 V320`,`③ 파싱·저장`,435,265),P(`connections`,`ssh`,`M135 320 V258 H354 V200`,`접속 정보 조회`,234,249,`lookup`),P(`history`,`admin`,`M545 374 H690`,`④ 최신 이력 조회`,617,355,`data`,!0)],notes:[`실선: 주기 실행·수집·조회`,`점선: 수집 대상·접속 설정`],guide:[[`①–② 수집`,`대표 WAS가 4시간마다 SSH로 명령을 실행하고 결과를 받습니다. 별도 에이전트 설치 없이 수집하도록 구현했습니다.`],[`③–④ 활용`,`CUBRID에 누적한 이력에서 서버별 최신 상태를 조회합니다. 수동 접속·기록 업무를 화면 조회와 월말 데이터 정리로 전환했습니다.`]]}],supporting:[{title:`공통 서비스 스택`,tools:[[`Tomcat 9`,`tomcat`],[`JBoss`,null],[`eGovFrame 4.1`,null],[`JSP · JSTL`,`java`],[`Fedora`,`linux`]],text:`제품별 망·서버 배치는 공개 자료에서 구분되지 않아 공통 사용 기술로 표시`},{title:`배포·보안 도구`,tools:[[`SVN`,null],[`Maven`,`maven`],[`SFTP / SSH`,null],[`CodeRay`,null],[`Damo · Jasypt`,null]],text:`패키징·운영 배포 / SAST 분석 / 계정·개인정보 암호화`}]}};function jn({name:e,logo:t}){return(0,M.jsxs)(`span`,{className:`arch-tech`,children:[t&&(0,M.jsx)(`img`,{src:`/tech-logos/${t}.svg`,alt:``,loading:`lazy`,width:`22`,height:`22`}),(0,M.jsx)(`span`,{children:e})]})}function Mn({figure:e,theme:t}){let[n,r]=(0,v.useState)(null),i=(0,v.useRef)(null),a=(0,v.useRef)(null),o=(0,v.useId)().replace(/:/g,``),s=e.nodes.find(e=>e.id===n),c=new Set([n]);e.edges.forEach(e=>{(e.from===n||e.to===n)&&(c.add(e.from),c.add(e.to))});let l=e=>r(t=>t===e?null:e);function u(t){let r=`${o}-${t}`;return(0,M.jsxs)(`svg`,{viewBox:`0 0 960 ${e.height}`,className:`arch-canvas`,role:`group`,"aria-label":e.summary,children:[(0,M.jsx)(`title`,{children:e.title}),(0,M.jsx)(`desc`,{children:e.summary}),(0,M.jsxs)(`defs`,{children:[[`data`,`lookup`,`retry`].map(e=>(0,M.jsx)(`marker`,{id:`${r}-${e}`,viewBox:`0 0 10 10`,refX:`9`,refY:`5`,markerWidth:`7`,markerHeight:`7`,orient:`auto-start-reverse`,children:(0,M.jsx)(`path`,{d:`M0 0 L10 5 L0 10 Z`,className:`arch-arrowhead arch-${e}`})},e)),(0,M.jsx)(`pattern`,{id:`${r}-grid`,width:`20`,height:`20`,patternUnits:`userSpaceOnUse`,children:(0,M.jsx)(`circle`,{cx:`1`,cy:`1`,r:`.8`,fill:`#dce4ed`})})]}),(0,M.jsx)(`rect`,{width:`960`,height:e.height,fill:`url(#${r}-grid)`}),e.zones.map(e=>(0,M.jsxs)(`g`,{className:e.owned?`arch-zone arch-zone-owned`:`arch-zone`,children:[(0,M.jsx)(`rect`,{x:e.x,y:e.y,width:e.w,height:e.h,rx:`14`}),(0,M.jsx)(`text`,{x:e.x+16,y:e.y+27,children:e.label})]},e.label)),e.edges.map((e,t)=>(0,M.jsxs)(`g`,{className:`arch-edge arch-${e.type}${n&&e.from!==n&&e.to!==n?` arch-dim`:``}`,children:[(0,M.jsx)(`path`,{d:e.d,markerEnd:`url(#${r}-${e.type})`,markerStart:e.both?`url(#${r}-${e.type})`:void 0}),e.label&&(0,M.jsx)(`text`,{x:e.x,y:e.y,textAnchor:`middle`,children:e.label})]},t)),e.nodes.map(e=>(0,M.jsxs)(`g`,{transform:`translate(${e.x} ${e.y})`,className:`arch-node${e.owned?` arch-node-owned`:``}${n&&!c.has(e.id)?` arch-dim`:``}`,role:`button`,tabIndex:0,"aria-pressed":e.id===n,"aria-label":`${e.title} 역할 보기`,onClick:()=>l(e.id),onKeyDown:t=>{(t.key===`Enter`||t.key===` `)&&(t.preventDefault(),l(e.id))},children:[(0,M.jsx)(`rect`,{className:`arch-node-bg`,width:e.w,height:e.h,rx:`10`}),e.logo?(0,M.jsx)(`image`,{href:`/tech-logos/${e.logo}.svg`,x:`14`,y:`12`,width:e.logo===`oracle`?`68`:`29`,height:`29`,"aria-hidden":`true`}):e.kind===`database`?(0,M.jsxs)(`g`,{className:`arch-glyph`,"aria-hidden":`true`,children:[(0,M.jsx)(`path`,{d:`M15 19 V35 C15 42 43 42 43 35 V19`}),(0,M.jsx)(`ellipse`,{cx:`29`,cy:`19`,rx:`14`,ry:`5`}),(0,M.jsx)(`path`,{d:`M15 27 C15 34 43 34 43 27`})]}):(0,M.jsxs)(`g`,{className:`arch-glyph`,"aria-hidden":`true`,children:[(0,M.jsx)(`rect`,{x:`15`,y:`14`,width:`29`,height:`23`,rx:`4`}),(0,M.jsx)(`path`,{d:`M20 22 H38 M20 29 H33`})]}),e.owned&&(0,M.jsx)(`text`,{className:`arch-ownership`,x:e.w-12,y:`29`,textAnchor:`end`,children:`담당 개선`}),(0,M.jsx)(`text`,{className:`arch-node-title`,x:`14`,y:`59`,children:e.title}),e.lines.map((e,t)=>(0,M.jsx)(`text`,{className:`arch-node-line`,x:`14`,y:80+t*17,children:e},e))]},e.id))]})}return(0,M.jsxs)(`figure`,{className:`arch-figure arch-theme-${t}`,children:[(0,M.jsxs)(`div`,{className:`arch-figure-heading`,children:[(0,M.jsx)(`h4`,{children:e.title}),(0,M.jsx)(`button`,{type:`button`,ref:a,onClick:()=>i.current.showModal(),children:`크게 보기 ↗`})]}),(0,M.jsx)(`div`,{className:`arch-scroll`,tabIndex:0,role:`region`,"aria-label":`${e.title} · 좁은 화면에서 좌우 스크롤 가능`,children:u(`inline`)}),(0,M.jsxs)(`figcaption`,{children:[(0,M.jsx)(`div`,{className:`arch-legend`,children:e.notes.map(e=>(0,M.jsx)(`span`,{children:e},e))}),(0,M.jsx)(`p`,{className:`arch-help`,children:`구성 요소를 누르면 연결된 흐름과 역할을 볼 수 있습니다. 작은 화면에서는 그림을 좌우로 이동하거나 크게 보기를 이용하세요.`}),(0,M.jsxs)(`div`,{className:`arch-selection`,"aria-live":`polite`,children:[(0,M.jsx)(`strong`,{children:s?s.title:`그림 읽는 순서`}),(0,M.jsx)(`p`,{children:s?s.detail:e.summary})]}),(0,M.jsx)(`ol`,{className:`arch-reading-guide`,children:e.guide.map(([e,t])=>(0,M.jsxs)(`li`,{children:[(0,M.jsx)(`strong`,{children:e}),(0,M.jsx)(`p`,{children:t})]},e))})]}),(0,M.jsxs)(`dialog`,{className:`arch-dialog arch-theme-${t}`,ref:i,"aria-label":`${e.title} 확대`,onClose:()=>a.current?.focus(),onClick:e=>{e.target===i.current&&i.current.close()},children:[(0,M.jsxs)(`div`,{className:`arch-dialog-heading`,children:[(0,M.jsx)(`strong`,{children:e.title}),(0,M.jsx)(`button`,{type:`button`,onClick:()=>i.current.close(),children:`닫기 ×`})]}),(0,M.jsx)(`div`,{className:`arch-scroll`,children:u(`expanded`)}),(0,M.jsxs)(`div`,{className:`arch-selection`,"aria-live":`polite`,children:[(0,M.jsx)(`strong`,{children:s?s.title:`구성 요소를 눌러 역할 확인`}),(0,M.jsx)(`p`,{children:s?s.detail:e.summary})]})]})]})}function Nn({slug:e}){let t=An[e];return t?(0,M.jsxs)(`div`,{className:`architecture-diagrams`,children:[(0,M.jsx)(`p`,{className:`arch-intro`,children:t.intro}),t.providers&&(0,M.jsxs)(`div`,{className:`arch-providers`,children:[(0,M.jsx)(`span`,{children:`통합 관리 대상 클라우드`}),(0,M.jsx)(`div`,{children:t.providers.map(([e,t])=>(0,M.jsx)(jn,{name:e,logo:t},e))}),(0,M.jsx)(`small`,{children:`클라우드별 수집 API·실제 호스팅 배치 정보는 생략`})]}),t.figures.map(e=>(0,M.jsx)(Mn,{figure:e,theme:t.theme},e.id)),(0,M.jsxs)(`div`,{className:`arch-tool-context`,children:[(0,M.jsx)(`h4`,{children:`이 흐름을 개발·운영할 때 사용한 도구`}),(0,M.jsx)(`div`,{className:`arch-tool-groups`,children:t.supporting.map(e=>(0,M.jsxs)(`section`,{children:[(0,M.jsx)(`h5`,{children:e.title}),(0,M.jsx)(`div`,{className:`arch-tool-list`,children:e.tools.map(([e,t])=>(0,M.jsx)(jn,{name:e,logo:t},e))}),(0,M.jsx)(`p`,{children:e.text})]},e.title))})]})]}):null}var Pn=[{label:`주간 Kafka 연동 오류`,value:`70 → 5건 미만`,detail:`실패 패턴 분석 · 대응 절차 표준화`},{label:`인코딩 오류`,value:`95% 감소`,detail:`문자열 처리 개선 · 정합성 검증`},{label:`신규 연동 실패율`,value:`5% 미만`,detail:`검증 로직 공통 모듈화`}];function Fn(){return(0,M.jsxs)(`div`,{className:`billing-overview`,children:[(0,M.jsx)(`section`,{"aria-label":`대표 성과`,className:`billing-metrics`,children:Pn.map(({label:e,value:t,detail:n})=>(0,M.jsxs)(`div`,{className:`billing-metric`,children:[(0,M.jsx)(`span`,{children:e}),(0,M.jsx)(`strong`,{children:t}),(0,M.jsx)(`p`,{children:n})]},e))}),(0,M.jsxs)(`section`,{className:`project-block billing-architecture`,"aria-labelledby":`billing-architecture-title`,children:[(0,M.jsxs)(`div`,{className:`billing-section-heading`,children:[(0,M.jsx)(`h3`,{id:`billing-architecture-title`,children:`시스템 한눈에 보기`}),(0,M.jsx)(`span`,{className:`billing-label`,children:`강조 영역: 담당 업무`})]}),(0,M.jsx)(`p`,{className:`billing-intro`,children:`달라진 데이터 구조를 연결하고, 청구 데이터의 정합성을 지키다`}),(0,M.jsx)(`p`,{className:`billing-caption`,children:`차세대의 UUID 기반 데이터를 기존 업무키 기반 구조로 변환하는 서비스 도메인 GW`}),(0,M.jsx)(Nn,{slug:`lgu-billing-gw`}),(0,M.jsxs)(`details`,{className:`billing-details`,open:!0,children:[(0,M.jsx)(`summary`,{children:`이벤트 순서가 뒤바뀌면 어떻게 처리할까?`}),(0,M.jsxs)(`div`,{className:`billing-columns`,children:[(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`h4`,{children:`매핑이 있는 경우`}),(0,M.jsx)(`p`,{children:`변경 이벤트 수신 → Redis에서 업무키 해석 → 대상 DB 반영`})]}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`h4`,{children:`매핑이 아직 없는 경우`}),(0,M.jsx)(`p`,{children:`키 해석 실패 → 재처리 대상으로 보관 → 매핑 생성 후 다시 처리`})]})]})]}),(0,M.jsxs)(`details`,{className:`billing-details`,children:[(0,M.jsx)(`summary`,{children:`GW 내부 처리 구조 보기`}),(0,M.jsxs)(`dl`,{className:`billing-steps`,children:[(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`dt`,{children:`수신`}),(0,M.jsx)(`dd`,{children:`Dispatcher가 헤더의 MNO/MVNO로 처리 경로를 분기하고, 도메인 이벤트는 domainEventHandler에서 처리합니다.`})]}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`dt`,{children:`변환`}),(0,M.jsx)(`dd`,{children:`단일 DTO는 process, 레벨 2 DTO 리스트는 processWithList를 사용합니다. OneToOne / OneToMany 구현체가 원천 해석과 대상 반영을 수행합니다.`})]}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`dt`,{children:`반영`}),(0,M.jsx)(`dd`,{children:`eventWorkCd에 따라 INS / UPD / MER / DEL을 실행합니다. MER는 join 조건 기준으로 존재하면 UPDATE, 없으면 INSERT합니다.`})]})]})]}),(0,M.jsxs)(`div`,{className:`billing-operations`,children:[(0,M.jsx)(`h4`,{children:`운영에서 정합성을 확인하는 방법`}),(0,M.jsxs)(`div`,{className:`billing-columns`,children:[(0,M.jsxs)(`div`,{className:`billing-dependency`,children:[(0,M.jsx)(`span`,{className:`billing-label`,children:`GW 모니터링 · 대사`}),(0,M.jsx)(`h4`,{children:`원천과 구독 데이터 비교`}),(0,M.jsx)(`p`,{children:`same · mismatch · 재연동 대기`}),(0,M.jsx)(`small`,{children:`발행 누락 / 순서 역전 / 변환 오류 / 수기 변경으로 원인 구분`})]}),(0,M.jsxs)(`div`,{className:`billing-dependency`,children:[(0,M.jsx)(`span`,{className:`billing-label`,children:`보정 후 재검증`}),(0,M.jsx)(`h4`,{children:`불일치가 해소됐는지 확인`}),(0,M.jsx)(`p`,{children:`불일치 키 추출 → DML 작성 → 대상 SELECT 검증 → 반영 → 재대사`}),(0,M.jsx)(`small`,{children:`일회성은 엑셀 DML · 반복 유형은 스크립트 정비`})]})]})]}),(0,M.jsxs)(`p`,{className:`billing-source`,children:[`경험을 정리한 논리 구조입니다. 강조 영역은 담당 업무 범위를 나타냅니다.`,(0,M.jsx)(`br`,{}),(0,M.jsx)(It,{to:A.blogPost(`kafka-gw-data-integrity`),children:`데이터 정합성 개선 과정 자세히 읽기 →`})]})]}),(0,M.jsxs)(`section`,{className:`project-block`,children:[(0,M.jsx)(`h3`,{children:`대표 개선 사례`}),(0,M.jsxs)(`dl`,{className:`billing-steps`,children:[(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`dt`,{children:`문제`}),(0,M.jsx)(`dd`,{children:`원천 테이블 분리와 PK 변경으로 발행·구독 데이터가 불일치하고, 이벤트 순서 역전 시 업무키 해석이 실패했습니다.`})]}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`dt`,{children:`담당 업무`}),(0,M.jsx)(`dd`,{children:`원인별 대응 시나리오 정리, 불일치 보정과 재대사, 반복 보정 스크립트 정비를 수행했습니다.`})]}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`dt`,{children:`결과`}),(0,M.jsx)(`dd`,{children:(0,M.jsx)(`strong`,{children:`모니터링·대응 체계 개선으로 주간 Kafka 오류 70건 → 5건 미만`})})]})]}),(0,M.jsxs)(`details`,{className:`billing-details`,children:[(0,M.jsx)(`summary`,{children:`신규 이벤트 연동을 추가하는 절차`}),(0,M.jsx)(`p`,{children:`토픽 등록 → 이벤트 필드 정의 → 원천·대상 매핑 및 join 조건 등록 → 공통 DTO 수정 → Nexus 배포 및 파트별 pom 의존성 갱신`})]})]})]})}var In={"cloudxper-billing":{headline:`조회 대기 시간을 줄이고, 반복되는 권한 조회를 캐시로 전환하다`,caption:`멀티 클라우드 대여·청구 통합 관리 플랫폼의 백엔드 개선 영역`,metrics:[{label:`대용량 API 응답`,value:`10분 → 1분 15초`,detail:`100만 건 테스트 데이터 · 동일 조건 비교`},{label:`권한 조회 관련 화면 응답`,value:`10초 → 0.1초 이내`,detail:`프로젝트 경력에 기록된 개선 결과`},{label:`권한 캐시 수명`,value:`세션 만료와 정렬`,detail:`로그아웃·권한 변경 시 사용자 캐시 삭제`}],flowLabel:`관리 화면 → Spring Boot API → MyBatis · MySQL`,nodes:[{title:`관리 화면`,body:`가입 · 상품 · 청구 조회`,tech:`React · REST API`},{title:`Spring Boot API`,body:`요청 검증 · 비즈니스 규칙 · 데이터 조립`,tech:`Controller → Service → ServiceImpl`,owned:!0},{title:`MyBatis · MySQL`,body:`목록과 연관 데이터 조회`,tech:`DAO · DB 매핑 Model(VO)`}],dependencies:[{label:`조회·조립 로직 개선`,title:`ServiceImpl에서 병렬 처리`,body:`화면별로 복제된 로직을 모으고, 연관 데이터 조회의 대기 시간을 겹쳐 처리`,tech:`parallelStream · DTO / Model 분리 · Builder`},{label:`권한 모듈 신규 개발`,title:`권한 서비스 ↔ Redis`,body:`로그인·첫 조회 시 DB 권한 조회 후 캐싱, 이후 요청은 캐시에서 조회`,tech:`사용자 + 코드 그룹별 키 · 캐시 미스 시 DB 조회`}],outputLabel:`↓ 서비스 계층에서 조회 결과 조립`,output:{title:`DTO 응답 → 관리 화면`,body:`서비스·상품·청구 화면이 공통 서비스 계약을 사용`,tech:`화면별 중복 로직 축소 · 입력 검증 위치 통일`},details:[{title:`조회 성능은 어떻게 달라졌을까?`,open:!0,items:[{title:`개선 전 · 순차 조회`,body:`부모 목록 조회 후 항목별 연관 리스트를 하나씩 조회. 100만 건 테스트에서 약 10분 소요.`},{title:`개선 후 · 병렬 조회`,body:`ServiceImpl로 조회·조립을 모으고 병렬 스트림 적용. 같은 테스트 조건에서 약 1분 15초로 단축.`}]},{title:`병렬 처리의 범위와 남은 과제`,items:[{title:`당시 적용한 개선`,body:`SQL 횟수는 그대로이며 N+1을 제거한 것은 아닙니다. 여러 DB 조회의 대기 시간을 겹쳐 응답 시간을 줄였습니다.`},{title:`회고에서 정리한 다음 단계`,body:`EXPLAIN 확인과 집합 단위 조회로 쿼리 수를 줄이는 방향을 검토했습니다. 커넥션 풀 부하와 작업 스레드의 트랜잭션 경계도 고려 대상입니다.`}]},{title:`권한 캐시는 언제 갱신할까?`,items:[{title:`조회 · 만료`,body:`사용자·코드 그룹별 캐시를 읽고, 없으면 DB에서 조회합니다. TTL은 세션 만료 정책에 맞췄습니다.`},{title:`로그아웃 · 권한 변경`,body:`해당 사용자의 캐시 키를 삭제해 다음 조회에서 새 권한을 읽도록 구성했습니다.`}]}],operationTitle:`개선을 팀의 개발 기준으로 남기기`,operations:[{label:`구조 표준화`,title:`계층별 책임 정리`,body:`Controller는 HTTP 처리, ServiceImpl은 규칙·데이터 조립, DAO는 DB 접근을 담당`,tech:`DTO: API 계약 / Model: DB 매핑`},{label:`협업 · 품질`,title:`컨벤션 작성·팀 공유`,body:`Builder 사용, 입력 검증·예외·로그 기준 정리와 동일 로직 복제 방지`,tech:`SonarQube 코드 품질 지표 개선`}],caseStudy:{problem:`1만 건에서는 드러나지 않던 목록·연관 리스트의 N+1 조회가 100만 건 테스트에서 10분짜리 API가 됐습니다.`,action:`Map 기반 로직을 DTO·Model·Service 계층으로 정리하고, ServiceImpl에 모인 연관 조회에 병렬 스트림을 적용했습니다.`,result:`동일 테스트 조건에서 API 응답 약 10분 → 1분 15초. 조회 횟수 감소가 아닌 대기 시간 단축입니다.`},sources:[{slug:`mybatis-builder-parallel-refactoring`,label:`100만 건 성능 검증과 계층 리팩토링`},{slug:`redis-permission-cache-ttl`,label:`Redis 권한 캐시와 만료 정책`}]},"jeonse-support-system":{headline:`민감한 데이터를 보호하고, 반복되는 운영 점검을 자동화하다`,caption:`전세사기 피해자 지원관리시스템의 망간 데이터 동기화·보안·운영 개선 영역`,metrics:[{label:`CodeRay SAST 탐지`,value:`358 → 4건`,detail:`CWE 유형별 분석 · 수정 후 반복 재검증`},{label:`개인정보 암호화`,value:`384만 건`,detail:`CI 14만 건 + 개인정보 이력 로그 370만 건`},{label:`서버 현황 수집`,value:`4시간 주기`,detail:`대표 WAS에서 수집 · 관리자 화면에서 이력 조회`}],flowLabel:`업무망 DB ↔ 망간 동기화 로직 ↔ 인터넷망 DB`,bidirectional:!0,nodes:[{title:`업무망 DB`,body:`게시물 · 첨부파일 데이터`,tech:`CUBRID · 동기화 이력`},{title:`망간 동기화 로직`,body:`원본 조회 → 원본 존재 확인 → 대상 반영`,tech:`eGovFrame · MyBatis 정적 SELECT / MERGE`,owned:!0},{title:`인터넷망 DB`,body:`게시물 · 첨부파일 데이터`,tech:`양방향 동기화`}],dependencies:[{label:`연계 SQL 개선`,title:`테이블별 정적 statement`,body:`테이블·컬럼 문자열 조립을 명시적 SQL과 값 바인딩으로 전환`,tech:`DAO·Mapper 개선 · 기존 Service 인터페이스 유지`},{label:`개인정보 · 설정 보호`,title:`DB 암호화와 Jasypt`,body:`Damo로 개인정보를 암호화하고, Jasypt 공통 유틸로 환경별 계정 정보 보호`,tech:`대량 패치: csql · nohup · 범위 분할 커밋`}],details:[{title:`망간 동기화는 어떻게 안전해졌을까?`,open:!0,items:[{title:`개선 전 · 범용 동적 쿼리`,body:`테이블명과 컬럼명을 문자열로 조립해 실행하는 구조여서 실제 SQL과 변경 영향을 확인하기 어려웠습니다.`},{title:`개선 후 · 명시적 쿼리`,body:`정의된 statement만 실행하고 값을 바인딩합니다. 원본이 없으면 MERGE를 건너뛰고 로그를 남겨 NULL 덮어쓰기를 방지했습니다.`}]},{title:`대량 암호화와 보안 점검 과정`,items:[{title:`384만 건 암호화`,body:`csql·nohup으로 DB 패치를 실행하고 범위별 커밋과 미처리 조건으로 처리했습니다. 로그를 추적하고 반영 결과를 확인했습니다.`},{title:`SAST · 웹 취약점 개선`,body:`CodeRay 탐지를 CWE별로 분석·수정·재검증했습니다. 별도로 웹 취약점 16건, SQL Injection 14건을 개선하고 계정 정보 17건을 암호화했습니다.`}]},{title:`전환 과정에서 배운 정합성 검증`,items:[{title:`대상 목록 누락과 복구`,body:`코드 목록만으로 전환 대상을 정해 테이블 하나가 누락됐습니다. statement 추가와 차이 데이터 보정 후 건수·키 대사로 복구를 확인했습니다.`},{title:`운영 이력과 교차 검증`,body:`동기화 이력 기준으로 실제 대상과 코드 목록을 비교했습니다. 오류 로그가 없는 연계 누락도 데이터 대사로 확인해야 한다는 기준을 남겼습니다.`}]}],secondaryFlow:{title:`서버 점검 자동화 · 별도의 운영 수집 경로`,label:`Quartz → SSH 수집 → 수집 이력 DB 및 관리자 화면`,nodes:[{title:`Quartz`,body:`대표 WAS 1대에서 4시간마다 실행`,tech:`스케줄 활성화 플래그 · 개발 환경 차단`},{title:`SSH 수집`,body:`인터넷망·업무망 WEB/WAS에 접속`,tech:`Apache MINA SSHD · free / top / df`,owned:!0},{title:`이력 저장 · 화면 조회`,body:`파싱 결과를 DB에 저장하고 서버별 최신 이력 표시`,tech:`Controller → JSP 관리자 화면`}]},operationTitle:`장애 상황에도 동작하는 점검·운영`,operations:[{label:`모니터링 기능 개발`,title:`접속부터 종료까지 제한 시간`,body:`연결·인증·명령 실행에 타임아웃을 적용하고 오류를 기록하며 자원을 정리`,tech:`EXEC 채널 · stdout/stderr 분리 · 원본 예외 보존`},{label:`조회 성능 개선`,title:`실행계획 기반 SQL 튜닝`,body:`CUBRID의 Full Scan과 조회 조건을 분석해 인덱스와 SQL을 개선`,tech:`53초 소요 Slow Query 개선 · 월간 점검 특이사항 0건`}],caseStudy:{problem:`월말마다 각 서버에 접속해 메모리·디스크 사용량을 수기로 옮겼고, 수집 기능 도입 중 SSH 알고리즘 협상 실패가 발생했습니다.`,action:`Apache MINA SSHD로 전환하고 대표 WAS의 Quartz에서 주기적으로 수집해 DB에 저장했습니다. 관리자 화면은 서버별 최신 이력을 조회하도록 구성했습니다.`,result:`수동 접속·기록을 4시간 주기 수집과 화면 조회로 전환해, 누적 데이터로 월말 용량 현황을 정리할 수 있게 됐습니다.`},sources:[{slug:`dynamic-to-static-sync-query`,label:`망간 동기화 SQL 개선과 복구 경험`},{slug:`jsch-to-mina-sshd`,label:`SSH 기반 서버 점검 자동화`},{slug:`csql-nohup-mass-patch`,label:`대량 개인정보 암호화 패치`},{slug:`cubrid-query-plan-index-tuning`,label:`CUBRID 실행계획과 인덱스 튜닝`}]}};function Ln({slug:e}){let t=In[e];if(!t)return null;let n=`${e}-architecture-title`;return(0,M.jsxs)(`div`,{className:`billing-overview`,children:[(0,M.jsx)(`section`,{"aria-label":`대표 성과`,className:`billing-metrics`,children:t.metrics.map(e=>(0,M.jsxs)(`div`,{className:`billing-metric`,children:[(0,M.jsx)(`span`,{children:e.label}),(0,M.jsx)(`strong`,{children:e.value}),(0,M.jsx)(`p`,{children:e.detail})]},e.label))}),(0,M.jsxs)(`section`,{className:`project-block billing-architecture`,"aria-labelledby":n,children:[(0,M.jsxs)(`div`,{className:`billing-section-heading`,children:[(0,M.jsx)(`h3`,{id:n,children:`시스템 한눈에 보기`}),(0,M.jsx)(`span`,{className:`billing-label`,children:`강조 영역: 담당 업무`})]}),(0,M.jsx)(`p`,{className:`billing-intro`,children:t.headline}),(0,M.jsx)(`p`,{className:`billing-caption`,children:t.caption}),(0,M.jsx)(Nn,{slug:e}),t.details.map(e=>(0,M.jsxs)(`details`,{className:`billing-details`,open:e.open,children:[(0,M.jsx)(`summary`,{children:e.title}),(0,M.jsx)(`div`,{className:`billing-columns`,children:e.items.map(e=>(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`h4`,{children:e.title}),(0,M.jsx)(`p`,{children:e.body})]},e.title))})]},e.title)),(0,M.jsxs)(`div`,{className:`billing-source`,children:[(0,M.jsx)(`p`,{children:`경험을 정리한 논리 구조입니다. 강조 영역은 담당 업무 범위를 나타냅니다.`}),(0,M.jsx)(`ul`,{className:`architecture-source-list`,children:t.sources.map(e=>(0,M.jsx)(`li`,{children:(0,M.jsxs)(It,{to:A.blogPost(e.slug),children:[e.label,` →`]})},e.slug))})]})]}),(0,M.jsxs)(`section`,{className:`project-block`,children:[(0,M.jsx)(`h3`,{children:`대표 개선 사례`}),(0,M.jsxs)(`dl`,{className:`billing-steps`,children:[(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`dt`,{children:`문제`}),(0,M.jsx)(`dd`,{children:t.caseStudy.problem})]}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`dt`,{children:`담당 업무`}),(0,M.jsx)(`dd`,{children:t.caseStudy.action})]}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`dt`,{children:`결과`}),(0,M.jsx)(`dd`,{children:(0,M.jsx)(`strong`,{children:t.caseStudy.result})})]})]})]})]})}function Rn({text:e}){let{main:t,sub:n}=qt(e);return(0,M.jsxs)(`h2`,{className:`project-title`,children:[(0,M.jsx)(`span`,{children:t}),n?(0,M.jsx)(`span`,{className:`project-title-sub`,children:n}):null]})}function zn({achievement:e}){return(0,M.jsxs)(`li`,{className:`achievement-item`,children:[(0,M.jsx)(`strong`,{className:`achievement-title`,children:e.title}),e.detail?(0,M.jsx)(`p`,{className:`achievement-detail`,children:e.detail}):null,e.result?(0,M.jsxs)(`p`,{className:`achievement-result`,children:[`→ `,e.result]}):null,e.references?.length?(0,M.jsxs)(`div`,{className:`achievement-references`,children:[(0,M.jsx)(`span`,{children:`참고 기사 ↗`}),e.references.map(e=>(0,M.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noopener noreferrer`,className:`achievement-link`,children:e.text},e.href))]}):null]})}function Bn({project:e,prev:t,next:n}){return(0,M.jsxs)(`div`,{className:`page-shell`,children:[(0,M.jsx)(It,{to:A.projects,className:`page-back-link`,children:`← 프로젝트 목록`}),(0,M.jsxs)(`article`,{className:`project`,children:[(0,M.jsxs)(`div`,{className:`project-header`,children:[(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`span`,{className:`project-eyebrow`,children:`Project`}),(0,M.jsx)(Rn,{text:e.title}),e.description?(0,M.jsx)(`p`,{className:`project-description`,children:e.description}):null]}),(0,M.jsx)(`div`,{className:`project-meta`,children:(0,M.jsxs)(`div`,{className:`meta-card`,children:[(0,M.jsx)(`span`,{className:`meta-label`,children:`기간 / 역할`}),(0,M.jsxs)(`strong`,{children:[e.period,` / `,e.role]})]})})]}),e.slug===`lgu-billing-gw`?(0,M.jsx)(Fn,{}):(0,M.jsx)(Ln,{slug:e.slug}),(0,M.jsxs)(`section`,{className:`project-block accent-block`,children:[(0,M.jsx)(`h3`,{children:`주요 업무`}),(0,M.jsx)(`ul`,{className:`project-list`,children:e.mainTasks.map(e=>(0,M.jsx)(`li`,{children:e},e))})]}),(0,M.jsxs)(`section`,{className:`project-block`,children:[(0,M.jsx)(`h3`,{children:`주요 성과`}),(0,M.jsx)(`ul`,{className:`project-list achievement-list`,children:e.achievements.map(e=>(0,M.jsx)(zn,{achievement:e},e.title))})]}),(0,M.jsxs)(`div`,{className:`tech-stack-shell`,children:[(0,M.jsx)(`h3`,{children:`보유 기술`}),(0,M.jsx)(`div`,{className:`tech-stack-grid`,children:e.skills.map(e=>(0,M.jsxs)(`div`,{className:`tech-stack-card`,children:[(0,M.jsx)(`span`,{className:`meta-label`,children:e.label}),(0,M.jsx)(`p`,{children:e.value})]},e.label))})]})]}),(0,M.jsxs)(`nav`,{className:`project-pager`,"aria-label":`프로젝트 이동`,children:[t?(0,M.jsxs)(It,{to:A.project(t.slug),className:`project-pager-link`,children:[(0,M.jsx)(`span`,{children:`← 이전 프로젝트`}),(0,M.jsx)(`strong`,{children:t.shortTitle||t.title})]}):(0,M.jsx)(`span`,{}),n?(0,M.jsxs)(It,{to:A.project(n.slug),className:`project-pager-link next`,children:[(0,M.jsx)(`span`,{children:`다음 프로젝트 →`}),(0,M.jsx)(`strong`,{children:n.shortTitle||n.title})]}):(0,M.jsx)(`span`,{})]})]})}function Vn({message:e=`요청한 페이지를 찾을 수 없습니다.`}){return(0,M.jsxs)(`div`,{className:`not-found-page`,children:[(0,M.jsx)(`span`,{className:`not-found-code`,children:`404`}),(0,M.jsx)(`h1`,{children:e}),(0,M.jsx)(`p`,{children:`주소가 변경되었을 수 있습니다. 아래 링크로 이동해 주세요.`}),(0,M.jsx)(It,{to:A.home,className:`not-found-link`,children:`홈으로 돌아가기`})]})}function Hn(){let{slug:e}=Ze(),t=On.findIndex(t=>t.slug===e);return t===-1?(0,M.jsx)(Vn,{message:`요청한 프로젝트를 찾을 수 없습니다.`}):(0,M.jsx)(Bn,{project:On[t],prev:On[t-1],next:On[t+1]})}var Un=`---\r
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
`,Wn=`---
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
`,Gn=`---\r
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
`,Kn=`---\r
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
`,qn=`---\r
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
`,Jn=`---\r
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
`,Yn=`---\r
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
`,Xn=`---\r
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
`,Zn=`---\r
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
`,Qn=`---\r
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
`,$n=`---\r
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
`,er=`---
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
`,tr=`---\r
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
`,nr=`---
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
`,rr=`---
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
  구조와 컨벤션을 남기는 것이 장기적으로 더 큰 효과가 있었다.`,ir=`---
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
`,ar=`---
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
`,or=`---\r
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
`,sr=`---\r
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
`,cr=Object.assign({"../posts/csql-nohup-mass-patch.md":Un,"../posts/cubrid-query-plan-index-tuning.md":Wn,"../posts/cwe-209-error-message-exposure.md":Gn,"../posts/cwe-330-489-dead-code-removal.md":Kn,"../posts/cwe-404-496-resource-handling.md":qn,"../posts/cwe-476-null-dereference.md":Jn,"../posts/cwe-615-sensitive-comments.md":Yn,"../posts/cwe-676-dangerous-api.md":Xn,"../posts/cwe-754-exception-handling.md":Zn,"../posts/cwe-79-xss-remediation.md":Qn,"../posts/dynamic-to-static-sync-query.md":$n,"../posts/how-to-write-posts.md":er,"../posts/jsch-to-mina-sshd.md":tr,"../posts/kafka-gw-data-integrity.md":nr,"../posts/mybatis-builder-parallel-refactoring.md":rr,"../posts/oracle-hint-subquery-fullscan.md":ir,"../posts/portfolio-refactoring.md":ar,"../posts/redis-permission-cache-ttl.md":or,"../posts/sxssf-vs-xssf-excel-download.md":sr});function lr(e){let t=e.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);if(!t)return{meta:{},body:e};let n={};return t[1].split(/\r?\n/).forEach(e=>{let t=e.indexOf(`:`);if(t===-1)return;let r=e.slice(0,t).trim(),i=e.slice(t+1).trim();r&&(n[r]=i)}),{meta:n,body:e.slice(t[0].length)}}function ur(e,t){let n=e.split(`/`).pop().replace(/\.md$/,``),{meta:r,body:i}=lr(t);return{slug:n,title:r.title||n,date:r.date||``,tags:r.tags?r.tags.split(`,`).map(e=>e.trim()).filter(Boolean):[],summary:r.summary||``,body:i}}var dr=Object.entries(cr).map(([e,t])=>ur(e,t)).sort((e,t)=>t.date.localeCompare(e.date));function fr(){return dr}function pr(e){return dr.find(t=>t.slug===e)}function mr(){let e=new Map;return dr.forEach(t=>{t.tags.forEach(t=>e.set(t,(e.get(t)||0)+1))}),[...e.entries()].map(([e,t])=>({name:e,count:t}))}var hr=10;function gr(){let[e,t]=(0,v.useState)(``),[n,r]=(0,v.useState)(null),[i,a]=(0,v.useState)(1),o=fr(),s=mr(),c=(0,v.useMemo)(()=>{let t=e.trim().toLowerCase();return o.filter(e=>n&&!e.tags.includes(n)?!1:t?e.title.toLowerCase().includes(t)||e.summary.toLowerCase().includes(t)||e.tags.some(e=>e.toLowerCase().includes(t))||e.body.toLowerCase().includes(t):!0)},[o,n,e]),l=Math.max(1,Math.ceil(c.length/hr)),u=Math.min(i,l),d=c.slice((u-1)*hr,u*hr),f=e=>{t(e),a(1)},p=e=>{r(e),a(1)},m=e=>{a(e),window.scrollTo(0,0)},h=e.trim()!==``||n!==null;return(0,M.jsxs)(`div`,{className:`page-shell`,children:[(0,M.jsx)(`h1`,{children:`Blog`}),(0,M.jsx)(`p`,{className:`page-lead`,children:`공부한 내용과 작업 기록을 정리하는 공간입니다. 글은 마크다운 파일로 관리됩니다.`}),(0,M.jsx)(`div`,{className:`blog-search`,children:(0,M.jsx)(`input`,{type:`search`,value:e,placeholder:`제목 · 내용 · 태그 검색`,"aria-label":`블로그 글 검색`,onChange:e=>f(e.target.value)})}),s.length?(0,M.jsxs)(`div`,{className:`blog-tags`,role:`group`,"aria-label":`태그 필터`,children:[(0,M.jsxs)(`button`,{type:`button`,className:`blog-tag ${n===null?`active`:``}`,onClick:()=>p(null),children:[`전체 `,o.length]}),s.map(e=>(0,M.jsxs)(`button`,{type:`button`,className:`blog-tag ${n===e.name?`active`:``}`,onClick:()=>p(e.name),children:[e.name,` `,e.count]},e.name))]}):null,h?(0,M.jsxs)(`p`,{className:`blog-result-count`,children:[`검색 결과 `,c.length,`건`]}):null,(0,M.jsxs)(`div`,{className:`blog-list`,children:[d.map(e=>(0,M.jsxs)(It,{to:A.blogPost(e.slug),className:`blog-card`,children:[(0,M.jsxs)(`div`,{className:`blog-card-head`,children:[(0,M.jsx)(`h2`,{children:e.title}),(0,M.jsx)(`time`,{dateTime:e.date,children:e.date})]}),e.summary?(0,M.jsx)(`p`,{className:`blog-card-summary`,children:e.summary}):null,e.tags.length?(0,M.jsx)(`div`,{className:`blog-card-tags`,children:e.tags.map(e=>(0,M.jsx)(`span`,{children:e},e))}):null]},e.slug)),d.length?null:(0,M.jsx)(`p`,{className:`blog-empty`,children:`조건에 맞는 글이 없습니다.`})]}),l>1?(0,M.jsxs)(`nav`,{className:`blog-pagination`,"aria-label":`블로그 페이지 이동`,children:[(0,M.jsx)(`button`,{type:`button`,className:`blog-page-button`,disabled:u===1,onClick:()=>m(u-1),children:`이전`}),Array.from({length:l},(e,t)=>t+1).map(e=>(0,M.jsx)(`button`,{type:`button`,className:`blog-page-button number ${e===u?`active`:``}`,"aria-current":e===u?`page`:void 0,onClick:()=>m(e),children:e},e)),(0,M.jsx)(`button`,{type:`button`,className:`blog-page-button`,disabled:u===l,onClick:()=>m(u+1),children:`다음`})]}):null]})}function _r(e,t){let n=t||{};return(e[e.length-1]===``?[...e,``]:e).join((n.padRight?` `:``)+`,`+(n.padLeft===!1?``:` `)).trim()}var vr=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,yr=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,br={};function xr(e,t){return((t||br).jsx?yr:vr).test(e)}var Sr=/[ \t\n\f\r]/g;function Cr(e){return typeof e==`object`?e.type===`text`?wr(e.value):!1:wr(e)}function wr(e){return e.replace(Sr,``)===``}var Tr=class{constructor(e,t,n){this.normal=t,this.property=e,n&&(this.space=n)}};Tr.prototype.normal={},Tr.prototype.property={},Tr.prototype.space=void 0;function Er(e,t){let n={},r={};for(let t of e)Object.assign(n,t.property),Object.assign(r,t.normal);return new Tr(n,r,t)}function Dr(e){return e.toLowerCase()}var Or=class{constructor(e,t){this.attribute=t,this.property=e}};Or.prototype.attribute=``,Or.prototype.booleanish=!1,Or.prototype.boolean=!1,Or.prototype.commaOrSpaceSeparated=!1,Or.prototype.commaSeparated=!1,Or.prototype.defined=!1,Or.prototype.mustUseProperty=!1,Or.prototype.number=!1,Or.prototype.overloadedBoolean=!1,Or.prototype.property=``,Or.prototype.spaceSeparated=!1,Or.prototype.space=void 0;var kr=s({boolean:()=>F,booleanish:()=>I,commaOrSpaceSeparated:()=>Nr,commaSeparated:()=>Mr,number:()=>L,overloadedBoolean:()=>jr,spaceSeparated:()=>R}),Ar=0,F=Pr(),I=Pr(),jr=Pr(),L=Pr(),R=Pr(),Mr=Pr(),Nr=Pr();function Pr(){return 2**++Ar}var Fr=Object.keys(kr),Ir=class extends Or{constructor(e,t,n,r){let i=-1;if(super(e,t),Lr(this,`space`,r),typeof n==`number`)for(;++i<Fr.length;){let e=Fr[i];Lr(this,Fr[i],(n&kr[e])===kr[e])}}};Ir.prototype.defined=!0;function Lr(e,t,n){n&&(e[t]=n)}function Rr(e){let t={},n={};for(let[r,i]of Object.entries(e.properties)){let a=new Ir(r,e.transform(e.attributes||{},r),i,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(a.mustUseProperty=!0),t[r]=a,n[Dr(r)]=r,n[Dr(a.attribute)]=r}return new Tr(t,n,e.space)}var zr=Rr({properties:{ariaActiveDescendant:null,ariaAtomic:I,ariaAutoComplete:null,ariaBusy:I,ariaChecked:I,ariaColCount:L,ariaColIndex:L,ariaColSpan:L,ariaControls:R,ariaCurrent:null,ariaDescribedBy:R,ariaDetails:null,ariaDisabled:I,ariaDropEffect:R,ariaErrorMessage:null,ariaExpanded:I,ariaFlowTo:R,ariaGrabbed:I,ariaHasPopup:null,ariaHidden:I,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:R,ariaLevel:L,ariaLive:null,ariaModal:I,ariaMultiLine:I,ariaMultiSelectable:I,ariaOrientation:null,ariaOwns:R,ariaPlaceholder:null,ariaPosInSet:L,ariaPressed:I,ariaReadOnly:I,ariaRelevant:null,ariaRequired:I,ariaRoleDescription:R,ariaRowCount:L,ariaRowIndex:L,ariaRowSpan:L,ariaSelected:I,ariaSetSize:L,ariaSort:null,ariaValueMax:L,ariaValueMin:L,ariaValueNow:L,ariaValueText:null,role:null},transform(e,t){return t===`role`?t:`aria-`+t.slice(4).toLowerCase()}});function Br(e,t){return t in e?e[t]:t}function Vr(e,t){return Br(e,t.toLowerCase())}var Hr=Rr({attributes:{acceptcharset:`accept-charset`,classname:`class`,htmlfor:`for`,httpequiv:`http-equiv`},mustUseProperty:[`checked`,`multiple`,`muted`,`selected`],properties:{abbr:null,accept:Mr,acceptCharset:R,accessKey:R,action:null,allow:null,allowFullScreen:F,allowPaymentRequest:F,allowUserMedia:F,alpha:F,alt:null,as:null,async:F,autoCapitalize:null,autoComplete:R,autoFocus:F,autoPlay:F,blocking:R,capture:null,charSet:null,checked:F,cite:null,className:R,closedBy:null,colorSpace:null,cols:L,colSpan:L,command:null,commandFor:null,content:null,contentEditable:I,controls:F,controlsList:R,coords:L|Mr,crossOrigin:null,data:null,dateTime:null,decoding:null,default:F,defer:F,dir:null,dirName:null,disabled:F,download:jr,draggable:I,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:F,formTarget:null,headers:R,height:L,hidden:jr,high:L,href:null,hrefLang:null,htmlFor:R,httpEquiv:R,id:null,imageSizes:null,imageSrcSet:null,inert:F,inputMode:null,integrity:null,is:null,isMap:F,itemId:null,itemProp:R,itemRef:R,itemScope:F,itemType:R,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:F,low:L,manifest:null,max:null,maxLength:L,media:null,method:null,min:null,minLength:L,multiple:F,muted:F,name:null,nonce:null,noModule:F,noValidate:F,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:F,optimum:L,pattern:null,ping:R,placeholder:null,playsInline:F,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:F,referrerPolicy:null,rel:R,required:F,reversed:F,rows:L,rowSpan:L,sandbox:R,scope:null,scoped:F,seamless:F,selected:F,shadowRootClonable:F,shadowRootCustomElementRegistry:F,shadowRootDelegatesFocus:F,shadowRootMode:null,shadowRootSerializable:F,shape:null,size:L,sizes:null,slot:null,span:L,spellCheck:I,src:null,srcDoc:null,srcLang:null,srcSet:null,start:L,step:null,style:null,tabIndex:L,target:null,title:null,translate:null,type:null,typeMustMatch:F,useMap:null,value:I,width:L,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:R,axis:null,background:null,bgColor:null,border:L,borderColor:null,bottomMargin:L,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:F,declare:F,event:null,face:null,frame:null,frameBorder:null,hSpace:L,leftMargin:L,link:null,longDesc:null,lowSrc:null,marginHeight:L,marginWidth:L,noResize:F,noHref:F,noShade:F,noWrap:F,object:null,profile:null,prompt:null,rev:null,rightMargin:L,rules:null,scheme:null,scrolling:I,standby:null,summary:null,text:null,topMargin:L,valueType:null,version:null,vAlign:null,vLink:null,vSpace:L,allowTransparency:null,autoCorrect:null,autoSave:null,credentialless:F,disablePictureInPicture:F,disableRemotePlayback:F,exportParts:Mr,part:R,prefix:null,property:null,results:L,security:null,unselectable:null},space:`html`,transform:Vr}),Ur=Rr({attributes:{accentHeight:`accent-height`,alignmentBaseline:`alignment-baseline`,arabicForm:`arabic-form`,baselineShift:`baseline-shift`,capHeight:`cap-height`,className:`class`,clipPath:`clip-path`,clipRule:`clip-rule`,colorInterpolation:`color-interpolation`,colorInterpolationFilters:`color-interpolation-filters`,colorProfile:`color-profile`,colorRendering:`color-rendering`,crossOrigin:`crossorigin`,dataType:`datatype`,dominantBaseline:`dominant-baseline`,enableBackground:`enable-background`,fillOpacity:`fill-opacity`,fillRule:`fill-rule`,floodColor:`flood-color`,floodOpacity:`flood-opacity`,fontFamily:`font-family`,fontSize:`font-size`,fontSizeAdjust:`font-size-adjust`,fontStretch:`font-stretch`,fontStyle:`font-style`,fontVariant:`font-variant`,fontWeight:`font-weight`,glyphName:`glyph-name`,glyphOrientationHorizontal:`glyph-orientation-horizontal`,glyphOrientationVertical:`glyph-orientation-vertical`,hrefLang:`hreflang`,horizAdvX:`horiz-adv-x`,horizOriginX:`horiz-origin-x`,horizOriginY:`horiz-origin-y`,imageRendering:`image-rendering`,letterSpacing:`letter-spacing`,lightingColor:`lighting-color`,markerEnd:`marker-end`,markerMid:`marker-mid`,markerStart:`marker-start`,maskType:`mask-type`,navDown:`nav-down`,navDownLeft:`nav-down-left`,navDownRight:`nav-down-right`,navLeft:`nav-left`,navNext:`nav-next`,navPrev:`nav-prev`,navRight:`nav-right`,navUp:`nav-up`,navUpLeft:`nav-up-left`,navUpRight:`nav-up-right`,onAbort:`onabort`,onActivate:`onactivate`,onAfterPrint:`onafterprint`,onBeforePrint:`onbeforeprint`,onBegin:`onbegin`,onCancel:`oncancel`,onCanPlay:`oncanplay`,onCanPlayThrough:`oncanplaythrough`,onChange:`onchange`,onClick:`onclick`,onClose:`onclose`,onCopy:`oncopy`,onCueChange:`oncuechange`,onCut:`oncut`,onDblClick:`ondblclick`,onDrag:`ondrag`,onDragEnd:`ondragend`,onDragEnter:`ondragenter`,onDragExit:`ondragexit`,onDragLeave:`ondragleave`,onDragOver:`ondragover`,onDragStart:`ondragstart`,onDrop:`ondrop`,onDurationChange:`ondurationchange`,onEmptied:`onemptied`,onEnd:`onend`,onEnded:`onended`,onError:`onerror`,onFocus:`onfocus`,onFocusIn:`onfocusin`,onFocusOut:`onfocusout`,onHashChange:`onhashchange`,onInput:`oninput`,onInvalid:`oninvalid`,onKeyDown:`onkeydown`,onKeyPress:`onkeypress`,onKeyUp:`onkeyup`,onLoad:`onload`,onLoadedData:`onloadeddata`,onLoadedMetadata:`onloadedmetadata`,onLoadStart:`onloadstart`,onMessage:`onmessage`,onMouseDown:`onmousedown`,onMouseEnter:`onmouseenter`,onMouseLeave:`onmouseleave`,onMouseMove:`onmousemove`,onMouseOut:`onmouseout`,onMouseOver:`onmouseover`,onMouseUp:`onmouseup`,onMouseWheel:`onmousewheel`,onOffline:`onoffline`,onOnline:`ononline`,onPageHide:`onpagehide`,onPageShow:`onpageshow`,onPaste:`onpaste`,onPause:`onpause`,onPlay:`onplay`,onPlaying:`onplaying`,onPopState:`onpopstate`,onProgress:`onprogress`,onRateChange:`onratechange`,onRepeat:`onrepeat`,onReset:`onreset`,onResize:`onresize`,onScroll:`onscroll`,onSeeked:`onseeked`,onSeeking:`onseeking`,onSelect:`onselect`,onShow:`onshow`,onStalled:`onstalled`,onStorage:`onstorage`,onSubmit:`onsubmit`,onSuspend:`onsuspend`,onTimeUpdate:`ontimeupdate`,onToggle:`ontoggle`,onUnload:`onunload`,onVolumeChange:`onvolumechange`,onWaiting:`onwaiting`,onZoom:`onzoom`,overlinePosition:`overline-position`,overlineThickness:`overline-thickness`,paintOrder:`paint-order`,panose1:`panose-1`,pointerEvents:`pointer-events`,referrerPolicy:`referrerpolicy`,renderingIntent:`rendering-intent`,shapeRendering:`shape-rendering`,stopColor:`stop-color`,stopOpacity:`stop-opacity`,strikethroughPosition:`strikethrough-position`,strikethroughThickness:`strikethrough-thickness`,strokeDashArray:`stroke-dasharray`,strokeDashOffset:`stroke-dashoffset`,strokeLineCap:`stroke-linecap`,strokeLineJoin:`stroke-linejoin`,strokeMiterLimit:`stroke-miterlimit`,strokeOpacity:`stroke-opacity`,strokeWidth:`stroke-width`,tabIndex:`tabindex`,textAnchor:`text-anchor`,textDecoration:`text-decoration`,textRendering:`text-rendering`,transformOrigin:`transform-origin`,typeOf:`typeof`,underlinePosition:`underline-position`,underlineThickness:`underline-thickness`,unicodeBidi:`unicode-bidi`,unicodeRange:`unicode-range`,unitsPerEm:`units-per-em`,vAlphabetic:`v-alphabetic`,vHanging:`v-hanging`,vIdeographic:`v-ideographic`,vMathematical:`v-mathematical`,vectorEffect:`vector-effect`,vertAdvY:`vert-adv-y`,vertOriginX:`vert-origin-x`,vertOriginY:`vert-origin-y`,wordSpacing:`word-spacing`,writingMode:`writing-mode`,xHeight:`x-height`,playbackOrder:`playbackorder`,timelineBegin:`timelinebegin`},properties:{about:Nr,accentHeight:L,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:L,amplitude:L,arabicForm:null,ascent:L,attributeName:null,attributeType:null,azimuth:L,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:L,by:null,calcMode:null,capHeight:L,className:R,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:L,diffuseConstant:L,direction:null,display:null,dur:null,divisor:L,dominantBaseline:null,download:F,dx:null,dy:null,edgeMode:null,editable:null,elevation:L,enableBackground:null,end:null,event:null,exponent:L,externalResourcesRequired:null,fill:null,fillOpacity:L,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Mr,g2:Mr,glyphName:Mr,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:L,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:L,horizOriginX:L,horizOriginY:L,id:null,ideographic:L,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:L,k:L,k1:L,k2:L,k3:L,k4:L,kernelMatrix:Nr,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:L,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskType:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:L,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:L,overlineThickness:L,paintOrder:null,panose1:null,path:null,pathLength:L,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:R,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:L,pointsAtY:L,pointsAtZ:L,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:Nr,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:Nr,rev:Nr,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:Nr,requiredFeatures:Nr,requiredFonts:Nr,requiredFormats:Nr,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:L,specularExponent:L,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:L,strikethroughThickness:L,string:null,stroke:null,strokeDashArray:Nr,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:L,strokeOpacity:L,strokeWidth:null,style:null,surfaceScale:L,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:Nr,tabIndex:L,tableValues:null,target:null,targetX:L,targetY:L,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:Nr,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:L,underlineThickness:L,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:L,values:null,vAlphabetic:L,vMathematical:L,vectorEffect:null,vHanging:L,vIdeographic:L,version:null,vertAdvY:L,vertOriginX:L,vertOriginY:L,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:L,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:`svg`,transform:Br}),Wr=Rr({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:`xlink`,transform(e,t){return`xlink:`+t.slice(5).toLowerCase()}}),Gr=Rr({attributes:{xmlnsxlink:`xmlns:xlink`},properties:{xmlnsXLink:null,xmlns:null},space:`xmlns`,transform:Vr}),Kr=Rr({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:`xml`,transform(e,t){return`xml:`+t.slice(3).toLowerCase()}}),qr={classId:`classID`,dataType:`datatype`,itemId:`itemID`,strokeDashArray:`strokeDasharray`,strokeDashOffset:`strokeDashoffset`,strokeLineCap:`strokeLinecap`,strokeLineJoin:`strokeLinejoin`,strokeMiterLimit:`strokeMiterlimit`,typeOf:`typeof`,xLinkActuate:`xlinkActuate`,xLinkArcRole:`xlinkArcrole`,xLinkHref:`xlinkHref`,xLinkRole:`xlinkRole`,xLinkShow:`xlinkShow`,xLinkTitle:`xlinkTitle`,xLinkType:`xlinkType`,xmlnsXLink:`xmlnsXlink`},Jr=/[A-Z]/g,Yr=/-[a-z]/g,Xr=/^data[-\w.:]+$/i;function Zr(e,t){let n=Dr(t),r=t,i=Or;if(n in e.normal)return e.property[e.normal[n]];if(n.length>4&&n.slice(0,4)===`data`&&Xr.test(t)){if(t.charAt(4)===`-`){let e=t.slice(5).replace(Yr,$r);r=`data`+e.charAt(0).toUpperCase()+e.slice(1)}else{let e=t.slice(4);if(!Yr.test(e)){let n=e.replace(Jr,Qr);n.charAt(0)!==`-`&&(n=`-`+n),t=`data`+n}}i=Ir}return new i(r,t)}function Qr(e){return`-`+e.toLowerCase()}function $r(e){return e.charAt(1).toUpperCase()}var ei=Er([zr,Hr,Wr,Gr,Kr],`html`),ti=Er([zr,Ur,Wr,Gr,Kr],`svg`);function ni(e){return e.join(` `).trim()}var ri=o(((e,t)=>{var n=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,i=/^\s*/,a=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,o=/^:\s*/,s=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,c=/^[;\s]*/,l=/^\s+|\s+$/g,u=`
`,d=`/`,f=`*`,p=``,m=`comment`,h=`declaration`;function g(e,t){if(typeof e!=`string`)throw TypeError(`First argument must be a string`);if(!e)return[];t||={};var l=1,g=1;function v(e){var t=e.match(r);t&&(l+=t.length);var n=e.lastIndexOf(u);g=~n?e.length-n:g+e.length}function y(){var e={line:l,column:g};return function(t){return t.position=new b(e),C(),t}}function b(e){this.start=e,this.end={line:l,column:g},this.source=t.source}b.prototype.content=e;function x(n){var r=Error(t.source+`:`+l+`:`+g+`: `+n);if(r.reason=n,r.filename=t.source,r.line=l,r.column=g,r.source=e,!t.silent)throw r}function S(t){var n=t.exec(e);if(n){var r=n[0];return v(r),e=e.slice(r.length),n}}function C(){S(i)}function ee(e){var t;for(e||=[];t=w();)t!==!1&&e.push(t);return e}function w(){var t=y();if(!(d!=e.charAt(0)||f!=e.charAt(1))){for(var n=2;p!=e.charAt(n)&&(f!=e.charAt(n)||d!=e.charAt(n+1));)++n;if(n+=2,p===e.charAt(n-1))return x(`End of comment missing`);var r=e.slice(2,n-2);return g+=2,v(r),e=e.slice(n),g+=2,t({type:m,comment:r})}}function T(){var e=y(),t=S(a);if(t){if(w(),!S(o))return x(`property missing ':'`);var r=S(s),i=e({type:h,property:_(t[0].replace(n,p)),value:r?_(r[0].replace(n,p)):p});return S(c),i}}function te(){var e=[];ee(e);for(var t;t=T();)t!==!1&&(e.push(t),ee(e));return e}return C(),te()}function _(e){return e?e.replace(l,p):p}t.exports=g})),ii=o((e=>{var t=e&&e.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(e,`__esModule`,{value:!0}),e.default=r;var n=t(ri());function r(e,t){let r=null;if(!e||typeof e!=`string`)return r;let i=(0,n.default)(e),a=typeof t==`function`;return i.forEach(e=>{if(e.type!==`declaration`)return;let{property:n,value:i}=e;a?t(n,i,e):i&&(r||={},r[n]=i)}),r}})),ai=o((e=>{Object.defineProperty(e,`__esModule`,{value:!0}),e.camelCase=void 0;var t=/^--[a-zA-Z0-9_-]+$/,n=/-([a-z])/g,r=/^[^-]+$/,i=/^-(webkit|moz|ms|o|khtml)-/,a=/^-(ms)-/,o=function(e){return!e||r.test(e)||t.test(e)},s=function(e,t){return t.toUpperCase()},c=function(e,t){return`${t}-`};e.camelCase=function(e,t){return t===void 0&&(t={}),o(e)?e:(e=e.toLowerCase(),e=t.reactCompat?e.replace(a,c):e.replace(i,c),e.replace(n,s))}})),oi=o(((e,t)=>{var n=(e&&e.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(ii()),r=ai();function i(e,t){var i={};return!e||typeof e!=`string`||(0,n.default)(e,function(e,n){e&&n&&(i[(0,r.camelCase)(e,t)]=n)}),i}i.default=i,t.exports=i})),si=li(`end`),ci=li(`start`);function li(e){return t;function t(t){let n=t&&t.position&&t.position[e]||{};if(typeof n.line==`number`&&n.line>0&&typeof n.column==`number`&&n.column>0)return{line:n.line,column:n.column,offset:typeof n.offset==`number`&&n.offset>-1?n.offset:void 0}}}function ui(e){let t=ci(e),n=si(e);if(t&&n)return{start:t,end:n}}function di(e){return!e||typeof e!=`object`?``:`position`in e||`type`in e?pi(e.position):`start`in e||`end`in e?pi(e):`line`in e||`column`in e?fi(e):``}function fi(e){return mi(e&&e.line)+`:`+mi(e&&e.column)}function pi(e){return fi(e&&e.start)+`-`+fi(e&&e.end)}function mi(e){return e&&typeof e==`number`?e:1}var hi=class extends Error{constructor(e,t,n){super(),typeof t==`string`&&(n=t,t=void 0);let r=``,i={},a=!1;if(t&&(i=`line`in t&&`column`in t||`start`in t&&`end`in t?{place:t}:`type`in t?{ancestors:[t],place:t.position}:{...t}),typeof e==`string`?r=e:!i.cause&&e&&(a=!0,r=e.message,i.cause=e),!i.ruleId&&!i.source&&typeof n==`string`){let e=n.indexOf(`:`);e===-1?i.ruleId=n:(i.source=n.slice(0,e),i.ruleId=n.slice(e+1))}if(!i.place&&i.ancestors&&i.ancestors){let e=i.ancestors[i.ancestors.length-1];e&&(i.place=e.position)}let o=i.place&&`start`in i.place?i.place.start:i.place;this.ancestors=i.ancestors||void 0,this.cause=i.cause||void 0,this.column=o?o.column:void 0,this.fatal=void 0,this.file=``,this.message=r,this.line=o?o.line:void 0,this.name=di(i.place)||`1:1`,this.place=i.place||void 0,this.reason=this.message,this.ruleId=i.ruleId||void 0,this.source=i.source||void 0,this.stack=a&&i.cause&&typeof i.cause.stack==`string`?i.cause.stack:``,this.actual=void 0,this.expected=void 0,this.note=void 0,this.url=void 0}};hi.prototype.file=``,hi.prototype.name=``,hi.prototype.reason=``,hi.prototype.message=``,hi.prototype.stack=``,hi.prototype.column=void 0,hi.prototype.line=void 0,hi.prototype.ancestors=void 0,hi.prototype.cause=void 0,hi.prototype.fatal=void 0,hi.prototype.place=void 0,hi.prototype.ruleId=void 0,hi.prototype.source=void 0;var gi=l(oi(),1),_i={}.hasOwnProperty,vi=new Map,yi=/[A-Z]/g,bi=new Set([`table`,`tbody`,`thead`,`tfoot`,`tr`]),xi=new Set([`td`,`th`]),Si=`https://github.com/syntax-tree/hast-util-to-jsx-runtime`;function Ci(e,t){if(!t||t.Fragment===void 0)throw TypeError("Expected `Fragment` in options");let n=t.filePath||void 0,r;if(t.development){if(typeof t.jsxDEV!=`function`)throw TypeError("Expected `jsxDEV` in options when `development: true`");r=Ni(n,t.jsxDEV)}else{if(typeof t.jsx!=`function`)throw TypeError("Expected `jsx` in production options");if(typeof t.jsxs!=`function`)throw TypeError("Expected `jsxs` in production options");r=Mi(n,t.jsx,t.jsxs)}let i={Fragment:t.Fragment,ancestors:[],components:t.components||{},create:r,elementAttributeNameCase:t.elementAttributeNameCase||`react`,evaluater:t.createEvaluater?t.createEvaluater():void 0,filePath:n,ignoreInvalidStyle:t.ignoreInvalidStyle||!1,passKeys:t.passKeys!==!1,passNode:t.passNode||!1,schema:t.space===`svg`?ti:ei,stylePropertyNameCase:t.stylePropertyNameCase||`dom`,tableCellAlignToStyle:t.tableCellAlignToStyle!==!1},a=wi(i,e,void 0);return a&&typeof a!=`string`?a:i.create(e,i.Fragment,{children:a||void 0},void 0)}function wi(e,t,n){if(t.type===`element`)return Ti(e,t,n);if(t.type===`mdxFlowExpression`||t.type===`mdxTextExpression`)return Ei(e,t);if(t.type===`mdxJsxFlowElement`||t.type===`mdxJsxTextElement`)return Oi(e,t,n);if(t.type===`mdxjsEsm`)return Di(e,t);if(t.type===`root`)return ki(e,t,n);if(t.type===`text`)return z(e,t)}function Ti(e,t,n){let r=e.schema,i=r;t.tagName.toLowerCase()===`svg`&&r.space===`html`&&(i=ti,e.schema=i),e.ancestors.push(t);let a=zi(e,t.tagName,!1),o=Pi(e,t),s=Ii(e,t);return bi.has(t.tagName)&&(s=s.filter(function(e){return typeof e==`string`?!Cr(e):!0})),Ai(e,o,a,t),ji(o,s),e.ancestors.pop(),e.schema=r,e.create(t,a,o,n)}function Ei(e,t){if(t.data&&t.data.estree&&e.evaluater){let n=t.data.estree.body[0];return n.type,e.evaluater.evaluateExpression(n.expression)}Bi(e,t.position)}function Di(e,t){if(t.data&&t.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(t.data.estree);Bi(e,t.position)}function Oi(e,t,n){let r=e.schema,i=r;t.name===`svg`&&r.space===`html`&&(i=ti,e.schema=i),e.ancestors.push(t);let a=t.name===null?e.Fragment:zi(e,t.name,!0),o=Fi(e,t),s=Ii(e,t);return Ai(e,o,a,t),ji(o,s),e.ancestors.pop(),e.schema=r,e.create(t,a,o,n)}function ki(e,t,n){let r={};return ji(r,Ii(e,t)),e.create(t,e.Fragment,r,n)}function z(e,t){return t.value}function Ai(e,t,n,r){typeof n!=`string`&&n!==e.Fragment&&e.passNode&&(t.node=r)}function ji(e,t){if(t.length>0){let n=t.length>1?t:t[0];n&&(e.children=n)}}function Mi(e,t,n){return r;function r(e,r,i,a){let o=Array.isArray(i.children)?n:t;return a?o(r,i,a):o(r,i)}}function Ni(e,t){return n;function n(n,r,i,a){let o=Array.isArray(i.children),s=ci(n);return t(r,i,a,o,{columnNumber:s?s.column-1:void 0,fileName:e,lineNumber:s?s.line:void 0},void 0)}}function Pi(e,t){let n={},r,i;for(i in t.properties)if(i!==`children`&&_i.call(t.properties,i)){let a=Li(e,i,t.properties[i]);if(a){let[i,o]=a;e.tableCellAlignToStyle&&i===`align`&&typeof o==`string`&&xi.has(t.tagName)?r=o:n[i]=o}}if(r){let t=n.style||={};t[e.stylePropertyNameCase===`css`?`text-align`:`textAlign`]=r}return n}function Fi(e,t){let n={};for(let r of t.attributes)if(r.type===`mdxJsxExpressionAttribute`)if(r.data&&r.data.estree&&e.evaluater){let t=r.data.estree.body[0];t.type;let i=t.expression;i.type;let a=i.properties[0];a.type,Object.assign(n,e.evaluater.evaluateExpression(a.argument))}else Bi(e,t.position);else{let i=r.name,a;if(r.value&&typeof r.value==`object`)if(r.value.data&&r.value.data.estree&&e.evaluater){let t=r.value.data.estree.body[0];t.type,a=e.evaluater.evaluateExpression(t.expression)}else Bi(e,t.position);else a=r.value===null?!0:r.value;n[i]=a}return n}function Ii(e,t){let n=[],r=-1,i=e.passKeys?new Map:vi;for(;++r<t.children.length;){let a=t.children[r],o;if(e.passKeys){let e=a.type===`element`?a.tagName:a.type===`mdxJsxFlowElement`||a.type===`mdxJsxTextElement`?a.name:void 0;if(e){let t=i.get(e)||0;o=e+`-`+t,i.set(e,t+1)}}let s=wi(e,a,o);s!==void 0&&n.push(s)}return n}function Li(e,t,n){let r=Zr(e.schema,t);if(!(n==null||typeof n==`number`&&Number.isNaN(n))){if(Array.isArray(n)&&(n=r.commaSeparated?_r(n):ni(n)),r.property===`style`){let t=typeof n==`object`?n:Ri(e,String(n));return e.stylePropertyNameCase===`css`&&(t=Vi(t)),[`style`,t]}return[e.elementAttributeNameCase===`react`&&r.space?qr[r.property]||r.property:r.attribute,n]}}function Ri(e,t){try{return(0,gi.default)(t,{reactCompat:!0})}catch(t){if(e.ignoreInvalidStyle)return{};let n=t,r=new hi("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:n,ruleId:`style`,source:`hast-util-to-jsx-runtime`});throw r.file=e.filePath||void 0,r.url=Si+`#cannot-parse-style-attribute`,r}}function zi(e,t,n){let r;if(!n)r={type:`Literal`,value:t};else if(t.includes(`.`)){let e=t.split(`.`),n=-1,i;for(;++n<e.length;){let t=xr(e[n])?{type:`Identifier`,name:e[n]}:{type:`Literal`,value:e[n]};i=i?{type:`MemberExpression`,object:i,property:t,computed:!!(n&&t.type===`Literal`),optional:!1}:t}r=i}else r=xr(t)&&!/^[a-z]/.test(t)?{type:`Identifier`,name:t}:{type:`Literal`,value:t};if(r.type===`Literal`){let t=r.value;return _i.call(e.components,t)?e.components[t]:t}if(e.evaluater)return e.evaluater.evaluateExpression(r);Bi(e)}function Bi(e,t){let n=new hi("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:t,ruleId:`mdx-estree`,source:`hast-util-to-jsx-runtime`});throw n.file=e.filePath||void 0,n.url=Si+`#cannot-handle-mdx-estrees-without-createevaluater`,n}function Vi(e){let t={},n;for(n in e)_i.call(e,n)&&(t[Hi(n)]=e[n]);return t}function Hi(e){let t=e.replace(yi,Ui);return t.slice(0,3)===`ms-`&&(t=`-`+t),t}function Ui(e){return`-`+e.toLowerCase()}var Wi={action:[`form`],cite:[`blockquote`,`del`,`ins`,`q`],data:[`object`],formAction:[`button`,`input`],href:[`a`,`area`,`base`,`link`],icon:[`menuitem`],itemId:null,manifest:[`html`],ping:[`a`,`area`],poster:[`video`],src:[`audio`,`embed`,`iframe`,`img`,`input`,`script`,`source`,`track`,`video`]},Gi={};function Ki(e,t){let n=t||Gi;return qi(e,typeof n.includeImageAlt==`boolean`?n.includeImageAlt:!0,typeof n.includeHtml==`boolean`?n.includeHtml:!0)}function qi(e,t,n){if(Yi(e)){if(`value`in e)return e.type===`html`&&!n?``:e.value;if(t&&`alt`in e&&e.alt)return e.alt;if(`children`in e)return Ji(e.children,t,n)}return Array.isArray(e)?Ji(e,t,n):``}function Ji(e,t,n){let r=[],i=-1;for(;++i<e.length;)r[i]=qi(e[i],t,n);return r.join(``)}function Yi(e){return!!(e&&typeof e==`object`)}var Xi=document.createElement(`i`);function Zi(e){let t=`&`+e+`;`;Xi.innerHTML=t;let n=Xi.textContent;return n.charCodeAt(n.length-1)===59&&e!==`semi`||n===t?!1:n}function Qi(e,t,n,r){let i=e.length,a=0,o;if(t=t<0?-t>i?0:i+t:t>i?i:t,n=n>0?n:0,r.length<1e4)o=Array.from(r),o.unshift(t,n),e.splice(...o);else for(n&&e.splice(t,n);a<r.length;)o=r.slice(a,a+1e4),o.unshift(t,0),e.splice(...o),a+=1e4,t+=1e4}function $i(e,t){return e.length>0?(Qi(e,e.length,0,t),e):t}var ea={}.hasOwnProperty;function ta(e){let t={},n=-1;for(;++n<e.length;)na(t,e[n]);return t}function na(e,t){let n;for(n in t){let r=(ea.call(e,n)?e[n]:void 0)||(e[n]={}),i=t[n],a;if(i)for(a in i){ea.call(r,a)||(r[a]=[]);let e=i[a];ra(r[a],Array.isArray(e)?e:e?[e]:[])}}}function ra(e,t){let n=-1,r=[];for(;++n<t.length;)(t[n].add===`after`?e:r).push(t[n]);Qi(e,0,0,r)}function ia(e,t){let n=Number.parseInt(e,t);return n<9||n===11||n>13&&n<32||n>126&&n<160||n>55295&&n<57344||n>64975&&n<65008||(n&65535)==65535||(n&65535)==65534||n>1114111?`�`:String.fromCodePoint(n)}function aa(e){return e.replace(/[\t\n\r ]+/g,` `).replace(/^ | $/g,``).toLowerCase().toUpperCase()}var oa=ha(/[A-Za-z]/),sa=ha(/[\dA-Za-z]/),ca=ha(/[#-'*+\--9=?A-Z^-~]/);function la(e){return e!==null&&(e<32||e===127)}var ua=ha(/\d/),da=ha(/[\dA-Fa-f]/),fa=ha(/[!-/:-@[-`{-~]/);function B(e){return e!==null&&e<-2}function V(e){return e!==null&&(e<0||e===32)}function H(e){return e===-2||e===-1||e===32}var pa=ha(/\p{P}|\p{S}/u),ma=ha(/\s/);function ha(e){return t;function t(t){return t!==null&&t>-1&&e.test(String.fromCharCode(t))}}function ga(e){let t=[],n=-1,r=0,i=0;for(;++n<e.length;){let a=e.charCodeAt(n),o=``;if(a===37&&sa(e.charCodeAt(n+1))&&sa(e.charCodeAt(n+2)))i=2;else if(a<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a))||(o=String.fromCharCode(a));else if(a>55295&&a<57344){let t=e.charCodeAt(n+1);a<56320&&t>56319&&t<57344?(o=String.fromCharCode(a,t),i=1):o=`�`}else o=String.fromCharCode(a);o&&=(t.push(e.slice(r,n),encodeURIComponent(o)),r=n+i+1,``),i&&=(n+=i,0)}return t.join(``)+e.slice(r)}function U(e,t,n,r){let i=r?r-1:1/0,a=0;return o;function o(r){return H(r)?(e.enter(n),s(r)):t(r)}function s(r){return H(r)&&a++<i?(e.consume(r),s):(e.exit(n),t(r))}}var _a={tokenize:va};function va(e){let t=e.attempt(this.parser.constructs.contentInitial,r,i),n;return t;function r(n){if(n===null){e.consume(n);return}return e.enter(`lineEnding`),e.consume(n),e.exit(`lineEnding`),U(e,t,`linePrefix`)}function i(t){return e.enter(`paragraph`),a(t)}function a(t){let r=e.enter(`chunkText`,{contentType:`text`,previous:n});return n&&(n.next=r),n=r,o(t)}function o(t){if(t===null){e.exit(`chunkText`),e.exit(`paragraph`),e.consume(t);return}return B(t)?(e.consume(t),e.exit(`chunkText`),a):(e.consume(t),o)}}var ya={tokenize:xa},ba={tokenize:Sa};function xa(e){let t=this,n=[],r=0,i,a,o;return s;function s(i){if(r<n.length){let a=n[r];return t.containerState=a[1],e.attempt(a[0].continuation,c,l)(i)}return l(i)}function c(e){if(r++,t.containerState._closeFlow){t.containerState._closeFlow=void 0,i&&v();let n=t.events.length,a=n,o;for(;a--;)if(t.events[a][0]===`exit`&&t.events[a][1].type===`chunkFlow`){o=t.events[a][1].end;break}_(r);let s=n;for(;s<t.events.length;)t.events[s][1].end={...o},s++;return Qi(t.events,a+1,0,t.events.slice(n)),t.events.length=s,l(e)}return s(e)}function l(a){if(r===n.length){if(!i)return f(a);if(i.currentConstruct&&i.currentConstruct.concrete)return m(a);t.interrupt=!!(i.currentConstruct&&!i._gfmTableDynamicInterruptHack)}return t.containerState={},e.check(ba,u,d)(a)}function u(e){return i&&v(),_(r),f(e)}function d(e){return t.parser.lazy[t.now().line]=r!==n.length,o=t.now().offset,m(e)}function f(n){return t.containerState={},e.attempt(ba,p,m)(n)}function p(e){return r++,n.push([t.currentConstruct,t.containerState]),f(e)}function m(n){if(n===null){i&&v(),_(0),e.consume(n);return}return i||=t.parser.flow(t.now()),e.enter(`chunkFlow`,{_tokenizer:i,contentType:`flow`,previous:a}),h(n)}function h(n){if(n===null){g(e.exit(`chunkFlow`),!0),_(0),e.consume(n);return}return B(n)?(e.consume(n),g(e.exit(`chunkFlow`)),r=0,t.interrupt=void 0,s):(e.consume(n),h)}function g(e,n){let s=t.sliceStream(e);if(n&&s.push(null),e.previous=a,a&&(a.next=e),a=e,i.defineSkip(e.start),i.write(s),t.parser.lazy[e.start.line]){let e=i.events.length;for(;e--;)if(i.events[e][1].start.offset<o&&(!i.events[e][1].end||i.events[e][1].end.offset>o))return;let n=t.events.length,a=n,s,c;for(;a--;)if(t.events[a][0]===`exit`&&t.events[a][1].type===`chunkFlow`){if(s){c=t.events[a][1].end;break}s=!0}for(_(r),e=n;e<t.events.length;)t.events[e][1].end={...c},e++;Qi(t.events,a+1,0,t.events.slice(n)),t.events.length=e}}function _(r){let i=n.length;for(;i-- >r;){let r=n[i];t.containerState=r[1],r[0].exit.call(t,e)}n.length=r}function v(){i.write([null]),a=void 0,i=void 0,t.containerState._closeFlow=void 0}}function Sa(e,t,n){return U(e,e.attempt(this.parser.constructs.document,t,n),`linePrefix`,this.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)}function Ca(e){if(e===null||V(e)||ma(e))return 1;if(pa(e))return 2}function wa(e,t,n){let r=[],i=-1;for(;++i<e.length;){let a=e[i].resolveAll;a&&!r.includes(a)&&(t=a(t,n),r.push(a))}return t}var Ta={name:`attention`,resolveAll:Ea,tokenize:Da};function Ea(e,t){let n=-1,r,i,a,o,s,c,l,u;for(;++n<e.length;)if(e[n][0]===`enter`&&e[n][1].type===`attentionSequence`&&e[n][1]._close){for(r=n;r--;)if(e[r][0]===`exit`&&e[r][1].type===`attentionSequence`&&e[r][1]._open&&t.sliceSerialize(e[r][1]).charCodeAt(0)===t.sliceSerialize(e[n][1]).charCodeAt(0)){if((e[r][1]._close||e[n][1]._open)&&(e[n][1].end.offset-e[n][1].start.offset)%3&&!((e[r][1].end.offset-e[r][1].start.offset+e[n][1].end.offset-e[n][1].start.offset)%3))continue;c=e[r][1].end.offset-e[r][1].start.offset>1&&e[n][1].end.offset-e[n][1].start.offset>1?2:1;let d={...e[r][1].end},f={...e[n][1].start};Oa(d,-c),Oa(f,c),o={type:c>1?`strongSequence`:`emphasisSequence`,start:d,end:{...e[r][1].end}},s={type:c>1?`strongSequence`:`emphasisSequence`,start:{...e[n][1].start},end:f},a={type:c>1?`strongText`:`emphasisText`,start:{...e[r][1].end},end:{...e[n][1].start}},i={type:c>1?`strong`:`emphasis`,start:{...o.start},end:{...s.end}},e[r][1].end={...o.start},e[n][1].start={...s.end},l=[],e[r][1].end.offset-e[r][1].start.offset&&(l=$i(l,[[`enter`,e[r][1],t],[`exit`,e[r][1],t]])),l=$i(l,[[`enter`,i,t],[`enter`,o,t],[`exit`,o,t],[`enter`,a,t]]),l=$i(l,wa(t.parser.constructs.insideSpan.null,e.slice(r+1,n),t)),l=$i(l,[[`exit`,a,t],[`enter`,s,t],[`exit`,s,t],[`exit`,i,t]]),e[n][1].end.offset-e[n][1].start.offset?(u=2,l=$i(l,[[`enter`,e[n][1],t],[`exit`,e[n][1],t]])):u=0,Qi(e,r-1,n-r+3,l),n=r+l.length-u-2;break}}for(n=-1;++n<e.length;)e[n][1].type===`attentionSequence`&&(e[n][1].type=`data`);return e}function Da(e,t){let n=this.parser.constructs.attentionMarkers.null,r=this.previous,i=Ca(r),a;return o;function o(t){return a=t,e.enter(`attentionSequence`),s(t)}function s(o){if(o===a)return e.consume(o),s;let c=e.exit(`attentionSequence`),l=Ca(o),u=!l||l===2&&i||n.includes(o),d=!i||i===2&&l||n.includes(r);return c._open=!!(a===42?u:u&&(i||!d)),c._close=!!(a===42?d:d&&(l||!u)),t(o)}}function Oa(e,t){e.column+=t,e.offset+=t,e._bufferIndex+=t}var ka={name:`autolink`,tokenize:Aa};function Aa(e,t,n){let r=0;return i;function i(t){return e.enter(`autolink`),e.enter(`autolinkMarker`),e.consume(t),e.exit(`autolinkMarker`),e.enter(`autolinkProtocol`),a}function a(t){return oa(t)?(e.consume(t),o):t===64?n(t):l(t)}function o(e){return e===43||e===45||e===46||sa(e)?(r=1,s(e)):l(e)}function s(t){return t===58?(e.consume(t),r=0,c):(t===43||t===45||t===46||sa(t))&&r++<32?(e.consume(t),s):(r=0,l(t))}function c(r){return r===62?(e.exit(`autolinkProtocol`),e.enter(`autolinkMarker`),e.consume(r),e.exit(`autolinkMarker`),e.exit(`autolink`),t):r===null||r===32||r===60||la(r)?n(r):(e.consume(r),c)}function l(t){return t===64?(e.consume(t),u):ca(t)?(e.consume(t),l):n(t)}function u(e){return sa(e)?d(e):n(e)}function d(n){return n===46?(e.consume(n),r=0,u):n===62?(e.exit(`autolinkProtocol`).type=`autolinkEmail`,e.enter(`autolinkMarker`),e.consume(n),e.exit(`autolinkMarker`),e.exit(`autolink`),t):f(n)}function f(t){if((t===45||sa(t))&&r++<63){let n=t===45?f:d;return e.consume(t),n}return n(t)}}var ja={partial:!0,tokenize:Ma};function Ma(e,t,n){return r;function r(t){return H(t)?U(e,i,`linePrefix`)(t):i(t)}function i(e){return e===null||B(e)?t(e):n(e)}}var Na={continuation:{tokenize:Fa},exit:Ia,name:`blockQuote`,tokenize:Pa};function Pa(e,t,n){let r=this;return i;function i(t){if(t===62){let n=r.containerState;return n.open||=(e.enter(`blockQuote`,{_container:!0}),!0),e.enter(`blockQuotePrefix`),e.enter(`blockQuoteMarker`),e.consume(t),e.exit(`blockQuoteMarker`),a}return n(t)}function a(n){return H(n)?(e.enter(`blockQuotePrefixWhitespace`),e.consume(n),e.exit(`blockQuotePrefixWhitespace`),e.exit(`blockQuotePrefix`),t):(e.exit(`blockQuotePrefix`),t(n))}}function Fa(e,t,n){let r=this;return i;function i(t){return H(t)?U(e,a,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):a(t)}function a(r){return e.attempt(Na,t,n)(r)}}function Ia(e){e.exit(`blockQuote`)}var La={name:`characterEscape`,tokenize:Ra};function Ra(e,t,n){return r;function r(t){return e.enter(`characterEscape`),e.enter(`escapeMarker`),e.consume(t),e.exit(`escapeMarker`),i}function i(r){return fa(r)?(e.enter(`characterEscapeValue`),e.consume(r),e.exit(`characterEscapeValue`),e.exit(`characterEscape`),t):n(r)}}var za={name:`characterReference`,tokenize:Ba};function Ba(e,t,n){let r=this,i=0,a,o;return s;function s(t){return e.enter(`characterReference`),e.enter(`characterReferenceMarker`),e.consume(t),e.exit(`characterReferenceMarker`),c}function c(t){return t===35?(e.enter(`characterReferenceMarkerNumeric`),e.consume(t),e.exit(`characterReferenceMarkerNumeric`),l):(e.enter(`characterReferenceValue`),a=31,o=sa,u(t))}function l(t){return t===88||t===120?(e.enter(`characterReferenceMarkerHexadecimal`),e.consume(t),e.exit(`characterReferenceMarkerHexadecimal`),e.enter(`characterReferenceValue`),a=6,o=da,u):(e.enter(`characterReferenceValue`),a=7,o=ua,u(t))}function u(s){if(s===59&&i){let i=e.exit(`characterReferenceValue`);return o===sa&&!Zi(r.sliceSerialize(i))?n(s):(e.enter(`characterReferenceMarker`),e.consume(s),e.exit(`characterReferenceMarker`),e.exit(`characterReference`),t)}return o(s)&&i++<a?(e.consume(s),u):n(s)}}var W={partial:!0,tokenize:Ha},G={concrete:!0,name:`codeFenced`,tokenize:Va};function Va(e,t,n){let r=this,i={partial:!0,tokenize:x},a=0,o=0,s;return c;function c(e){return l(e)}function l(t){let n=r.events[r.events.length-1];return a=n&&n[1].type===`linePrefix`?n[2].sliceSerialize(n[1],!0).length:0,s=t,e.enter(`codeFenced`),e.enter(`codeFencedFence`),e.enter(`codeFencedFenceSequence`),u(t)}function u(t){return t===s?(o++,e.consume(t),u):o<3?n(t):(e.exit(`codeFencedFenceSequence`),H(t)?U(e,d,`whitespace`)(t):d(t))}function d(n){return n===null||B(n)?(e.exit(`codeFencedFence`),r.interrupt?t(n):e.check(W,h,b)(n)):(e.enter(`codeFencedFenceInfo`),e.enter(`chunkString`,{contentType:`string`}),f(n))}function f(t){return t===null||B(t)?(e.exit(`chunkString`),e.exit(`codeFencedFenceInfo`),d(t)):H(t)?(e.exit(`chunkString`),e.exit(`codeFencedFenceInfo`),U(e,p,`whitespace`)(t)):t===96&&t===s?n(t):(e.consume(t),f)}function p(t){return t===null||B(t)?d(t):(e.enter(`codeFencedFenceMeta`),e.enter(`chunkString`,{contentType:`string`}),m(t))}function m(t){return t===null||B(t)?(e.exit(`chunkString`),e.exit(`codeFencedFenceMeta`),d(t)):t===96&&t===s?n(t):(e.consume(t),m)}function h(t){return e.attempt(i,b,g)(t)}function g(t){return e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),_}function _(t){return a>0&&H(t)?U(e,v,`linePrefix`,a+1)(t):v(t)}function v(t){return t===null||B(t)?e.check(W,h,b)(t):(e.enter(`codeFlowValue`),y(t))}function y(t){return t===null||B(t)?(e.exit(`codeFlowValue`),v(t)):(e.consume(t),y)}function b(n){return e.exit(`codeFenced`),t(n)}function x(e,t,n){let i=0;return a;function a(t){return e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),c}function c(t){return e.enter(`codeFencedFence`),H(t)?U(e,l,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):l(t)}function l(t){return t===s?(e.enter(`codeFencedFenceSequence`),u(t)):n(t)}function u(t){return t===s?(i++,e.consume(t),u):i>=o?(e.exit(`codeFencedFenceSequence`),H(t)?U(e,d,`whitespace`)(t):d(t)):n(t)}function d(r){return r===null||B(r)?(e.exit(`codeFencedFence`),t(r)):n(r)}}}function Ha(e,t,n){let r=this;return i;function i(t){return t===null?n(t):(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),a)}function a(e){return r.parser.lazy[r.now().line]?n(e):t(e)}}var Ua={name:`codeIndented`,tokenize:Ga},Wa={partial:!0,tokenize:Ka};function Ga(e,t,n){let r=this;return i;function i(t){return e.enter(`codeIndented`),U(e,a,`linePrefix`,5)(t)}function a(e){let t=r.events[r.events.length-1];return t&&t[1].type===`linePrefix`&&t[2].sliceSerialize(t[1],!0).length>=4?o(e):n(e)}function o(t){return t===null?c(t):B(t)?e.attempt(Wa,o,c)(t):(e.enter(`codeFlowValue`),s(t))}function s(t){return t===null||B(t)?(e.exit(`codeFlowValue`),o(t)):(e.consume(t),s)}function c(n){return e.exit(`codeIndented`),t(n)}}function Ka(e,t,n){let r=this;return i;function i(t){return r.parser.lazy[r.now().line]?n(t):B(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),i):U(e,a,`linePrefix`,5)(t)}function a(e){let a=r.events[r.events.length-1];return a&&a[1].type===`linePrefix`&&a[2].sliceSerialize(a[1],!0).length>=4?t(e):B(e)?i(e):n(e)}}var qa={name:`codeText`,previous:Ya,resolve:Ja,tokenize:Xa};function Ja(e){let t=e.length-4,n=3,r,i;if((e[n][1].type===`lineEnding`||e[n][1].type===`space`)&&(e[t][1].type===`lineEnding`||e[t][1].type===`space`)){for(r=n;++r<t;)if(e[r][1].type===`codeTextData`){e[n][1].type=`codeTextPadding`,e[t][1].type=`codeTextPadding`,n+=2,t-=2;break}}for(r=n-1,t++;++r<=t;)i===void 0?r!==t&&e[r][1].type!==`lineEnding`&&(i=r):(r===t||e[r][1].type===`lineEnding`)&&(e[i][1].type=`codeTextData`,r!==i+2&&(e[i][1].end=e[r-1][1].end,e.splice(i+2,r-i-2),t-=r-i-2,r=i+2),i=void 0);return e}function Ya(e){return e!==96||this.events[this.events.length-1][1].type===`characterEscape`}function Xa(e,t,n){let r=0,i,a;return o;function o(t){return e.enter(`codeText`),e.enter(`codeTextSequence`),s(t)}function s(t){return t===96?(e.consume(t),r++,s):(e.exit(`codeTextSequence`),c(t))}function c(t){return t===null?n(t):t===32?(e.enter(`space`),e.consume(t),e.exit(`space`),c):t===96?(a=e.enter(`codeTextSequence`),i=0,u(t)):B(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),c):(e.enter(`codeTextData`),l(t))}function l(t){return t===null||t===32||t===96||B(t)?(e.exit(`codeTextData`),c(t)):(e.consume(t),l)}function u(n){return n===96?(e.consume(n),i++,u):i===r?(e.exit(`codeTextSequence`),e.exit(`codeText`),t(n)):(a.type=`codeTextData`,l(n))}}var Za=class{constructor(e){this.left=e?[...e]:[],this.right=[]}get(e){if(e<0||e>=this.left.length+this.right.length)throw RangeError("Cannot access index `"+e+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return e<this.left.length?this.left[e]:this.right[this.right.length-e+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(e,t){let n=t??1/0;return n<this.left.length?this.left.slice(e,n):e>this.left.length?this.right.slice(this.right.length-n+this.left.length,this.right.length-e+this.left.length).reverse():this.left.slice(e).concat(this.right.slice(this.right.length-n+this.left.length).reverse())}splice(e,t,n){let r=t||0;this.setCursor(Math.trunc(e));let i=this.right.splice(this.right.length-r,1/0);return n&&Qa(this.left,n),i.reverse()}pop(){return this.setCursor(1/0),this.left.pop()}push(e){this.setCursor(1/0),this.left.push(e)}pushMany(e){this.setCursor(1/0),Qa(this.left,e)}unshift(e){this.setCursor(0),this.right.push(e)}unshiftMany(e){this.setCursor(0),Qa(this.right,e.reverse())}setCursor(e){if(!(e===this.left.length||e>this.left.length&&this.right.length===0||e<0&&this.left.length===0))if(e<this.left.length){let t=this.left.splice(e,1/0);Qa(this.right,t.reverse())}else{let t=this.right.splice(this.left.length+this.right.length-e,1/0);Qa(this.left,t.reverse())}}};function Qa(e,t){let n=0;if(t.length<1e4)e.push(...t);else for(;n<t.length;)e.push(...t.slice(n,n+1e4)),n+=1e4}function $a(e){let t={},n=-1,r,i,a,o,s,c,l,u=new Za(e);for(;++n<u.length;){for(;n in t;)n=t[n];if(r=u.get(n),n&&r[1].type===`chunkFlow`&&u.get(n-1)[1].type===`listItemPrefix`&&(c=r[1]._tokenizer.events,a=0,a<c.length&&c[a][1].type===`lineEndingBlank`&&(a+=2),a<c.length&&c[a][1].type===`content`))for(;++a<c.length&&c[a][1].type!==`content`;)c[a][1].type===`chunkText`&&(c[a][1]._isInFirstContentOfListItem=!0,a++);if(r[0]===`enter`)r[1].contentType&&(Object.assign(t,eo(u,n)),n=t[n],l=!0);else if(r[1]._container){for(a=n,i=void 0;a--;)if(o=u.get(a),o[1].type===`lineEnding`||o[1].type===`lineEndingBlank`)o[0]===`enter`&&(i&&(u.get(i)[1].type=`lineEndingBlank`),o[1].type=`lineEnding`,i=a);else if(!(o[1].type===`linePrefix`||o[1].type===`listItemIndent`))break;i&&(r[1].end={...u.get(i)[1].start},s=u.slice(i,n),s.unshift(r),u.splice(i,n-i+1,s))}}return Qi(e,0,1/0,u.slice(0)),!l}function eo(e,t){let n=e.get(t)[1],r=e.get(t)[2],i=t-1,a=[],o=n._tokenizer;o||(o=r.parser[n.contentType](n.start),n._contentTypeTextTrailing&&(o._contentTypeTextTrailing=!0));let s=o.events,c=[],l={},u,d,f=-1,p=n,m=0,h=0,g=[h];for(;p;){for(;e.get(++i)[1]!==p;);a.push(i),p._tokenizer||(u=r.sliceStream(p),p.next||u.push(null),d&&o.defineSkip(p.start),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=!0),o.write(u),p._isInFirstContentOfListItem&&(o._gfmTasklistFirstContentOfListItem=void 0)),d=p,p=p.next}for(p=n;++f<s.length;)s[f][0]===`exit`&&s[f-1][0]===`enter`&&s[f][1].type===s[f-1][1].type&&s[f][1].start.line!==s[f][1].end.line&&(h=f+1,g.push(h),p._tokenizer=void 0,p.previous=void 0,p=p.next);for(o.events=[],p?(p._tokenizer=void 0,p.previous=void 0):g.pop(),f=g.length;f--;){let t=s.slice(g[f],g[f+1]),n=a.pop();c.push([n,n+t.length-1]),e.splice(n,2,t)}for(c.reverse(),f=-1;++f<c.length;)l[m+c[f][0]]=m+c[f][1],m+=c[f][1]-c[f][0]-1;return l}var to={resolve:ro,tokenize:io},no={partial:!0,tokenize:ao};function ro(e){return $a(e),e}function io(e,t){let n;return r;function r(t){return e.enter(`content`),n=e.enter(`chunkContent`,{contentType:`content`}),i(t)}function i(t){return t===null?a(t):B(t)?e.check(no,o,a)(t):(e.consume(t),i)}function a(n){return e.exit(`chunkContent`),e.exit(`content`),t(n)}function o(t){return e.consume(t),e.exit(`chunkContent`),n.next=e.enter(`chunkContent`,{contentType:`content`,previous:n}),n=n.next,i}}function ao(e,t,n){let r=this;return i;function i(t){return e.exit(`chunkContent`),e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),U(e,a,`linePrefix`)}function a(i){if(i===null||B(i))return n(i);let a=r.events[r.events.length-1];return!r.parser.constructs.disable.null.includes(`codeIndented`)&&a&&a[1].type===`linePrefix`&&a[2].sliceSerialize(a[1],!0).length>=4?t(i):e.interrupt(r.parser.constructs.flow,n,t)(i)}}function oo(e,t,n,r,i,a,o,s,c){let l=c||1/0,u=0;return d;function d(t){return t===60?(e.enter(r),e.enter(i),e.enter(a),e.consume(t),e.exit(a),f):t===null||t===32||t===41||la(t)?n(t):(e.enter(r),e.enter(o),e.enter(s),e.enter(`chunkString`,{contentType:`string`}),h(t))}function f(n){return n===62?(e.enter(a),e.consume(n),e.exit(a),e.exit(i),e.exit(r),t):(e.enter(s),e.enter(`chunkString`,{contentType:`string`}),p(n))}function p(t){return t===62?(e.exit(`chunkString`),e.exit(s),f(t)):t===null||t===60||B(t)?n(t):(e.consume(t),t===92?m:p)}function m(t){return t===60||t===62||t===92?(e.consume(t),p):p(t)}function h(i){return!u&&(i===null||i===41||V(i))?(e.exit(`chunkString`),e.exit(s),e.exit(o),e.exit(r),t(i)):u<l&&i===40?(e.consume(i),u++,h):i===41?(e.consume(i),u--,h):i===null||i===32||i===40||la(i)?n(i):(e.consume(i),i===92?g:h)}function g(t){return t===40||t===41||t===92?(e.consume(t),h):h(t)}}function so(e,t,n,r,i,a){let o=this,s=0,c;return l;function l(t){return e.enter(r),e.enter(i),e.consume(t),e.exit(i),e.enter(a),u}function u(l){return s>999||l===null||l===91||l===93&&!c||l===94&&!s&&`_hiddenFootnoteSupport`in o.parser.constructs?n(l):l===93?(e.exit(a),e.enter(i),e.consume(l),e.exit(i),e.exit(r),t):B(l)?(e.enter(`lineEnding`),e.consume(l),e.exit(`lineEnding`),u):(e.enter(`chunkString`,{contentType:`string`}),d(l))}function d(t){return t===null||t===91||t===93||B(t)||s++>999?(e.exit(`chunkString`),u(t)):(e.consume(t),c||=!H(t),t===92?f:d)}function f(t){return t===91||t===92||t===93?(e.consume(t),s++,d):d(t)}}function co(e,t,n,r,i,a){let o;return s;function s(t){return t===34||t===39||t===40?(e.enter(r),e.enter(i),e.consume(t),e.exit(i),o=t===40?41:t,c):n(t)}function c(n){return n===o?(e.enter(i),e.consume(n),e.exit(i),e.exit(r),t):(e.enter(a),l(n))}function l(t){return t===o?(e.exit(a),c(o)):t===null?n(t):B(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),U(e,l,`linePrefix`)):(e.enter(`chunkString`,{contentType:`string`}),u(t))}function u(t){return t===o||t===null||B(t)?(e.exit(`chunkString`),l(t)):(e.consume(t),t===92?d:u)}function d(t){return t===o||t===92?(e.consume(t),u):u(t)}}function lo(e,t){let n;return r;function r(i){return B(i)?(e.enter(`lineEnding`),e.consume(i),e.exit(`lineEnding`),n=!0,r):H(i)?U(e,r,n?`linePrefix`:`lineSuffix`)(i):t(i)}}var uo={name:`definition`,tokenize:po},fo={partial:!0,tokenize:mo};function po(e,t,n){let r=this,i;return a;function a(t){return e.enter(`definition`),o(t)}function o(t){return so.call(r,e,s,n,`definitionLabel`,`definitionLabelMarker`,`definitionLabelString`)(t)}function s(t){return i=aa(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)),t===58?(e.enter(`definitionMarker`),e.consume(t),e.exit(`definitionMarker`),c):n(t)}function c(t){return V(t)?lo(e,l)(t):l(t)}function l(t){return oo(e,u,n,`definitionDestination`,`definitionDestinationLiteral`,`definitionDestinationLiteralMarker`,`definitionDestinationRaw`,`definitionDestinationString`)(t)}function u(t){return e.attempt(fo,d,d)(t)}function d(t){return H(t)?U(e,f,`whitespace`)(t):f(t)}function f(a){return a===null||B(a)?(e.exit(`definition`),r.parser.defined.push(i),t(a)):n(a)}}function mo(e,t,n){return r;function r(t){return V(t)?lo(e,i)(t):n(t)}function i(t){return co(e,a,n,`definitionTitle`,`definitionTitleMarker`,`definitionTitleString`)(t)}function a(t){return H(t)?U(e,o,`whitespace`)(t):o(t)}function o(e){return e===null||B(e)?t(e):n(e)}}var ho={name:`hardBreakEscape`,tokenize:go};function go(e,t,n){return r;function r(t){return e.enter(`hardBreakEscape`),e.consume(t),i}function i(r){return B(r)?(e.exit(`hardBreakEscape`),t(r)):n(r)}}var _o={name:`headingAtx`,resolve:vo,tokenize:yo};function vo(e,t){let n=e.length-2,r=3,i,a;return e[r][1].type===`whitespace`&&(r+=2),n-2>r&&e[n][1].type===`whitespace`&&(n-=2),e[n][1].type===`atxHeadingSequence`&&(r===n-1||n-4>r&&e[n-2][1].type===`whitespace`)&&(n-=r+1===n?2:4),n>r&&(i={type:`atxHeadingText`,start:e[r][1].start,end:e[n][1].end},a={type:`chunkText`,start:e[r][1].start,end:e[n][1].end,contentType:`text`},Qi(e,r,n-r+1,[[`enter`,i,t],[`enter`,a,t],[`exit`,a,t],[`exit`,i,t]])),e}function yo(e,t,n){let r=0;return i;function i(t){return e.enter(`atxHeading`),a(t)}function a(t){return e.enter(`atxHeadingSequence`),o(t)}function o(t){return t===35&&r++<6?(e.consume(t),o):t===null||V(t)?(e.exit(`atxHeadingSequence`),s(t)):n(t)}function s(n){return n===35?(e.enter(`atxHeadingSequence`),c(n)):n===null||B(n)?(e.exit(`atxHeading`),t(n)):H(n)?U(e,s,`whitespace`)(n):(e.enter(`atxHeadingText`),l(n))}function c(t){return t===35?(e.consume(t),c):(e.exit(`atxHeadingSequence`),s(t))}function l(t){return t===null||t===35||V(t)?(e.exit(`atxHeadingText`),s(t)):(e.consume(t),l)}}var bo=`address.article.aside.base.basefont.blockquote.body.caption.center.col.colgroup.dd.details.dialog.dir.div.dl.dt.fieldset.figcaption.figure.footer.form.frame.frameset.h1.h2.h3.h4.h5.h6.head.header.hr.html.iframe.legend.li.link.main.menu.menuitem.nav.noframes.ol.optgroup.option.p.param.search.section.summary.table.tbody.td.tfoot.th.thead.title.tr.track.ul`.split(`.`),xo=[`pre`,`script`,`style`,`textarea`],So={concrete:!0,name:`htmlFlow`,resolveTo:To,tokenize:Eo},Co={partial:!0,tokenize:Oo},wo={partial:!0,tokenize:Do};function To(e){let t=e.length;for(;t--&&!(e[t][0]===`enter`&&e[t][1].type===`htmlFlow`););return t>1&&e[t-2][1].type===`linePrefix`&&(e[t][1].start=e[t-2][1].start,e[t+1][1].start=e[t-2][1].start,e.splice(t-2,2)),e}function Eo(e,t,n){let r=this,i,a,o,s,c;return l;function l(e){return u(e)}function u(t){return e.enter(`htmlFlow`),e.enter(`htmlFlowData`),e.consume(t),d}function d(s){return s===33?(e.consume(s),f):s===47?(e.consume(s),a=!0,h):s===63?(e.consume(s),i=3,r.interrupt?t:D):oa(s)?(e.consume(s),o=String.fromCharCode(s),g):n(s)}function f(a){return a===45?(e.consume(a),i=2,p):a===91?(e.consume(a),i=5,s=0,m):oa(a)?(e.consume(a),i=4,r.interrupt?t:D):n(a)}function p(i){return i===45?(e.consume(i),r.interrupt?t:D):n(i)}function m(i){return i===`CDATA[`.charCodeAt(s++)?(e.consume(i),s===6?r.interrupt?t:E:m):n(i)}function h(t){return oa(t)?(e.consume(t),o=String.fromCharCode(t),g):n(t)}function g(s){if(s===null||s===47||s===62||V(s)){let c=s===47,l=o.toLowerCase();return!c&&!a&&xo.includes(l)?(i=1,r.interrupt?t(s):E(s)):bo.includes(o.toLowerCase())?(i=6,c?(e.consume(s),_):r.interrupt?t(s):E(s)):(i=7,r.interrupt&&!r.parser.lazy[r.now().line]?n(s):a?v(s):y(s))}return s===45||sa(s)?(e.consume(s),o+=String.fromCharCode(s),g):n(s)}function _(i){return i===62?(e.consume(i),r.interrupt?t:E):n(i)}function v(t){return H(t)?(e.consume(t),v):T(t)}function y(t){return t===47?(e.consume(t),T):t===58||t===95||oa(t)?(e.consume(t),b):H(t)?(e.consume(t),y):T(t)}function b(t){return t===45||t===46||t===58||t===95||sa(t)?(e.consume(t),b):x(t)}function x(t){return t===61?(e.consume(t),S):H(t)?(e.consume(t),x):y(t)}function S(t){return t===null||t===60||t===61||t===62||t===96?n(t):t===34||t===39?(e.consume(t),c=t,C):H(t)?(e.consume(t),S):ee(t)}function C(t){return t===c?(e.consume(t),c=null,w):t===null||B(t)?n(t):(e.consume(t),C)}function ee(t){return t===null||t===34||t===39||t===47||t===60||t===61||t===62||t===96||V(t)?x(t):(e.consume(t),ee)}function w(e){return e===47||e===62||H(e)?y(e):n(e)}function T(t){return t===62?(e.consume(t),te):n(t)}function te(t){return t===null||B(t)?E(t):H(t)?(e.consume(t),te):n(t)}function E(t){return t===45&&i===2?(e.consume(t),ae):t===60&&i===1?(e.consume(t),oe):t===62&&i===4?(e.consume(t),O):t===63&&i===3?(e.consume(t),D):t===93&&i===5?(e.consume(t),ce):B(t)&&(i===6||i===7)?(e.exit(`htmlFlowData`),e.check(Co,le,ne)(t)):t===null||B(t)?(e.exit(`htmlFlowData`),ne(t)):(e.consume(t),E)}function ne(t){return e.check(wo,re,le)(t)}function re(t){return e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),ie}function ie(t){return t===null||B(t)?ne(t):(e.enter(`htmlFlowData`),E(t))}function ae(t){return t===45?(e.consume(t),D):E(t)}function oe(t){return t===47?(e.consume(t),o=``,se):E(t)}function se(t){if(t===62){let n=o.toLowerCase();return xo.includes(n)?(e.consume(t),O):E(t)}return oa(t)&&o.length<8?(e.consume(t),o+=String.fromCharCode(t),se):E(t)}function ce(t){return t===93?(e.consume(t),D):E(t)}function D(t){return t===62?(e.consume(t),O):t===45&&i===2?(e.consume(t),D):E(t)}function O(t){return t===null||B(t)?(e.exit(`htmlFlowData`),le(t)):(e.consume(t),O)}function le(n){return e.exit(`htmlFlow`),t(n)}}function Do(e,t,n){let r=this;return i;function i(t){return B(t)?(e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),a):n(t)}function a(e){return r.parser.lazy[r.now().line]?n(e):t(e)}}function Oo(e,t,n){return r;function r(r){return e.enter(`lineEnding`),e.consume(r),e.exit(`lineEnding`),e.attempt(ja,t,n)}}var ko={name:`htmlText`,tokenize:Ao};function Ao(e,t,n){let r=this,i,a,o;return s;function s(t){return e.enter(`htmlText`),e.enter(`htmlTextData`),e.consume(t),c}function c(t){return t===33?(e.consume(t),l):t===47?(e.consume(t),x):t===63?(e.consume(t),y):oa(t)?(e.consume(t),ee):n(t)}function l(t){return t===45?(e.consume(t),u):t===91?(e.consume(t),a=0,m):oa(t)?(e.consume(t),v):n(t)}function u(t){return t===45?(e.consume(t),p):n(t)}function d(t){return t===null?n(t):t===45?(e.consume(t),f):B(t)?(o=d,oe(t)):(e.consume(t),d)}function f(t){return t===45?(e.consume(t),p):d(t)}function p(e){return e===62?ae(e):e===45?f(e):d(e)}function m(t){return t===`CDATA[`.charCodeAt(a++)?(e.consume(t),a===6?h:m):n(t)}function h(t){return t===null?n(t):t===93?(e.consume(t),g):B(t)?(o=h,oe(t)):(e.consume(t),h)}function g(t){return t===93?(e.consume(t),_):h(t)}function _(t){return t===62?ae(t):t===93?(e.consume(t),_):h(t)}function v(t){return t===null||t===62?ae(t):B(t)?(o=v,oe(t)):(e.consume(t),v)}function y(t){return t===null?n(t):t===63?(e.consume(t),b):B(t)?(o=y,oe(t)):(e.consume(t),y)}function b(e){return e===62?ae(e):y(e)}function x(t){return oa(t)?(e.consume(t),S):n(t)}function S(t){return t===45||sa(t)?(e.consume(t),S):C(t)}function C(t){return B(t)?(o=C,oe(t)):H(t)?(e.consume(t),C):ae(t)}function ee(t){return t===45||sa(t)?(e.consume(t),ee):t===47||t===62||V(t)?w(t):n(t)}function w(t){return t===47?(e.consume(t),ae):t===58||t===95||oa(t)?(e.consume(t),T):B(t)?(o=w,oe(t)):H(t)?(e.consume(t),w):ae(t)}function T(t){return t===45||t===46||t===58||t===95||sa(t)?(e.consume(t),T):te(t)}function te(t){return t===61?(e.consume(t),E):B(t)?(o=te,oe(t)):H(t)?(e.consume(t),te):w(t)}function E(t){return t===null||t===60||t===61||t===62||t===96?n(t):t===34||t===39?(e.consume(t),i=t,ne):B(t)?(o=E,oe(t)):H(t)?(e.consume(t),E):(e.consume(t),re)}function ne(t){return t===i?(e.consume(t),i=void 0,ie):t===null?n(t):B(t)?(o=ne,oe(t)):(e.consume(t),ne)}function re(t){return t===null||t===34||t===39||t===60||t===61||t===96?n(t):t===47||t===62||V(t)?w(t):(e.consume(t),re)}function ie(e){return e===47||e===62||V(e)?w(e):n(e)}function ae(r){return r===62?(e.consume(r),e.exit(`htmlTextData`),e.exit(`htmlText`),t):n(r)}function oe(t){return e.exit(`htmlTextData`),e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),se}function se(t){return H(t)?U(e,ce,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):ce(t)}function ce(t){return e.enter(`htmlTextData`),o(t)}}var jo={name:`labelEnd`,resolveAll:Fo,resolveTo:Io,tokenize:Lo},Mo={tokenize:Ro},No={tokenize:zo},Po={tokenize:Bo};function Fo(e){let t=-1,n=[];for(;++t<e.length;){let r=e[t][1];if(n.push(e[t]),r.type===`labelImage`||r.type===`labelLink`||r.type===`labelEnd`){let e=r.type===`labelImage`?4:2;r.type=`data`,t+=e}}return e.length!==n.length&&Qi(e,0,e.length,n),e}function Io(e,t){let n=e.length,r=0,i,a,o,s;for(;n--;)if(i=e[n][1],a){if(i.type===`link`||i.type===`labelLink`&&i._inactive)break;e[n][0]===`enter`&&i.type===`labelLink`&&(i._inactive=!0)}else if(o){if(e[n][0]===`enter`&&(i.type===`labelImage`||i.type===`labelLink`)&&!i._balanced&&(a=n,i.type!==`labelLink`)){r=2;break}}else i.type===`labelEnd`&&(o=n);let c={type:e[a][1].type===`labelLink`?`link`:`image`,start:{...e[a][1].start},end:{...e[e.length-1][1].end}},l={type:`label`,start:{...e[a][1].start},end:{...e[o][1].end}},u={type:`labelText`,start:{...e[a+r+2][1].end},end:{...e[o-2][1].start}};return s=[[`enter`,c,t],[`enter`,l,t]],s=$i(s,e.slice(a+1,a+r+3)),s=$i(s,[[`enter`,u,t]]),s=$i(s,wa(t.parser.constructs.insideSpan.null,e.slice(a+r+4,o-3),t)),s=$i(s,[[`exit`,u,t],e[o-2],e[o-1],[`exit`,l,t]]),s=$i(s,e.slice(o+1)),s=$i(s,[[`exit`,c,t]]),Qi(e,a,e.length,s),e}function Lo(e,t,n){let r=this,i=r.events.length,a,o;for(;i--;)if((r.events[i][1].type===`labelImage`||r.events[i][1].type===`labelLink`)&&!r.events[i][1]._balanced){a=r.events[i][1];break}return s;function s(t){return a?a._inactive?d(t):(o=r.parser.defined.includes(aa(r.sliceSerialize({start:a.end,end:r.now()}))),e.enter(`labelEnd`),e.enter(`labelMarker`),e.consume(t),e.exit(`labelMarker`),e.exit(`labelEnd`),c):n(t)}function c(t){return t===40?e.attempt(Mo,u,o?u:d)(t):t===91?e.attempt(No,u,o?l:d)(t):o?u(t):d(t)}function l(t){return e.attempt(Po,u,d)(t)}function u(e){return t(e)}function d(e){return a._balanced=!0,n(e)}}function Ro(e,t,n){return r;function r(t){return e.enter(`resource`),e.enter(`resourceMarker`),e.consume(t),e.exit(`resourceMarker`),i}function i(t){return V(t)?lo(e,a)(t):a(t)}function a(t){return t===41?u(t):oo(e,o,s,`resourceDestination`,`resourceDestinationLiteral`,`resourceDestinationLiteralMarker`,`resourceDestinationRaw`,`resourceDestinationString`,32)(t)}function o(t){return V(t)?lo(e,c)(t):u(t)}function s(e){return n(e)}function c(t){return t===34||t===39||t===40?co(e,l,n,`resourceTitle`,`resourceTitleMarker`,`resourceTitleString`)(t):u(t)}function l(t){return V(t)?lo(e,u)(t):u(t)}function u(r){return r===41?(e.enter(`resourceMarker`),e.consume(r),e.exit(`resourceMarker`),e.exit(`resource`),t):n(r)}}function zo(e,t,n){let r=this;return i;function i(t){return so.call(r,e,a,o,`reference`,`referenceMarker`,`referenceString`)(t)}function a(e){return r.parser.defined.includes(aa(r.sliceSerialize(r.events[r.events.length-1][1]).slice(1,-1)))?t(e):n(e)}function o(e){return n(e)}}function Bo(e,t,n){return r;function r(t){return e.enter(`reference`),e.enter(`referenceMarker`),e.consume(t),e.exit(`referenceMarker`),i}function i(r){return r===93?(e.enter(`referenceMarker`),e.consume(r),e.exit(`referenceMarker`),e.exit(`reference`),t):n(r)}}var Vo={name:`labelStartImage`,resolveAll:jo.resolveAll,tokenize:Ho};function Ho(e,t,n){let r=this;return i;function i(t){return e.enter(`labelImage`),e.enter(`labelImageMarker`),e.consume(t),e.exit(`labelImageMarker`),a}function a(t){return t===91?(e.enter(`labelMarker`),e.consume(t),e.exit(`labelMarker`),e.exit(`labelImage`),o):n(t)}function o(e){return e===94&&`_hiddenFootnoteSupport`in r.parser.constructs?n(e):t(e)}}var Uo={name:`labelStartLink`,resolveAll:jo.resolveAll,tokenize:Wo};function Wo(e,t,n){let r=this;return i;function i(t){return e.enter(`labelLink`),e.enter(`labelMarker`),e.consume(t),e.exit(`labelMarker`),e.exit(`labelLink`),a}function a(e){return e===94&&`_hiddenFootnoteSupport`in r.parser.constructs?n(e):t(e)}}var Go={name:`lineEnding`,tokenize:Ko};function Ko(e,t){return n;function n(n){return e.enter(`lineEnding`),e.consume(n),e.exit(`lineEnding`),U(e,t,`linePrefix`)}}var qo={name:`thematicBreak`,tokenize:Jo};function Jo(e,t,n){let r=0,i;return a;function a(t){return e.enter(`thematicBreak`),o(t)}function o(e){return i=e,s(e)}function s(a){return a===i?(e.enter(`thematicBreakSequence`),c(a)):r>=3&&(a===null||B(a))?(e.exit(`thematicBreak`),t(a)):n(a)}function c(t){return t===i?(e.consume(t),r++,c):(e.exit(`thematicBreakSequence`),H(t)?U(e,s,`whitespace`)(t):s(t))}}var Yo={continuation:{tokenize:$o},exit:ts,name:`list`,tokenize:Qo},Xo={partial:!0,tokenize:ns},Zo={partial:!0,tokenize:es};function Qo(e,t,n){let r=this,i=r.events[r.events.length-1],a=i&&i[1].type===`linePrefix`?i[2].sliceSerialize(i[1],!0).length:0,o=0;return s;function s(t){let i=r.containerState.type||(t===42||t===43||t===45?`listUnordered`:`listOrdered`);if(i===`listUnordered`?!r.containerState.marker||t===r.containerState.marker:ua(t)){if(r.containerState.type||(r.containerState.type=i,e.enter(i,{_container:!0})),i===`listUnordered`)return e.enter(`listItemPrefix`),t===42||t===45?e.check(qo,n,l)(t):l(t);if(!r.interrupt||t===49)return e.enter(`listItemPrefix`),e.enter(`listItemValue`),c(t)}return n(t)}function c(t){return ua(t)&&++o<10?(e.consume(t),c):(!r.interrupt||o<2)&&(r.containerState.marker?t===r.containerState.marker:t===41||t===46)?(e.exit(`listItemValue`),l(t)):n(t)}function l(t){return e.enter(`listItemMarker`),e.consume(t),e.exit(`listItemMarker`),r.containerState.marker=r.containerState.marker||t,e.check(ja,r.interrupt?n:u,e.attempt(Xo,f,d))}function u(e){return r.containerState.initialBlankLine=!0,a++,f(e)}function d(t){return H(t)?(e.enter(`listItemPrefixWhitespace`),e.consume(t),e.exit(`listItemPrefixWhitespace`),f):n(t)}function f(n){return r.containerState.size=a+r.sliceSerialize(e.exit(`listItemPrefix`),!0).length,t(n)}}function $o(e,t,n){let r=this;return r.containerState._closeFlow=void 0,e.check(ja,i,a);function i(n){return r.containerState.furtherBlankLines=r.containerState.furtherBlankLines||r.containerState.initialBlankLine,U(e,t,`listItemIndent`,r.containerState.size+1)(n)}function a(n){return r.containerState.furtherBlankLines||!H(n)?(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,o(n)):(r.containerState.furtherBlankLines=void 0,r.containerState.initialBlankLine=void 0,e.attempt(Zo,t,o)(n))}function o(i){return r.containerState._closeFlow=!0,r.interrupt=void 0,U(e,e.attempt(Yo,t,n),`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(i)}}function es(e,t,n){let r=this;return U(e,i,`listItemIndent`,r.containerState.size+1);function i(e){let i=r.events[r.events.length-1];return i&&i[1].type===`listItemIndent`&&i[2].sliceSerialize(i[1],!0).length===r.containerState.size?t(e):n(e)}}function ts(e){e.exit(this.containerState.type)}function ns(e,t,n){let r=this;return U(e,i,`listItemPrefixWhitespace`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:5);function i(e){let i=r.events[r.events.length-1];return!H(e)&&i&&i[1].type===`listItemPrefixWhitespace`?t(e):n(e)}}var rs={name:`setextUnderline`,resolveTo:is,tokenize:as};function is(e,t){let n=e.length,r,i,a;for(;n--;)if(e[n][0]===`enter`){if(e[n][1].type===`content`){r=n;break}e[n][1].type===`paragraph`&&(i=n)}else e[n][1].type===`content`&&e.splice(n,1),!a&&e[n][1].type===`definition`&&(a=n);let o={type:`setextHeading`,start:{...e[r][1].start},end:{...e[e.length-1][1].end}};return e[i][1].type=`setextHeadingText`,a?(e.splice(i,0,[`enter`,o,t]),e.splice(a+1,0,[`exit`,e[r][1],t]),e[r][1].end={...e[a][1].end}):e[r][1]=o,e.push([`exit`,o,t]),e}function as(e,t,n){let r=this,i;return a;function a(t){let a=r.events.length,s;for(;a--;)if(r.events[a][1].type!==`lineEnding`&&r.events[a][1].type!==`linePrefix`&&r.events[a][1].type!==`content`){s=r.events[a][1].type===`paragraph`;break}return!r.parser.lazy[r.now().line]&&(r.interrupt||s)?(e.enter(`setextHeadingLine`),i=t,o(t)):n(t)}function o(t){return e.enter(`setextHeadingLineSequence`),s(t)}function s(t){return t===i?(e.consume(t),s):(e.exit(`setextHeadingLineSequence`),H(t)?U(e,c,`lineSuffix`)(t):c(t))}function c(r){return r===null||B(r)?(e.exit(`setextHeadingLine`),t(r)):n(r)}}var os={tokenize:ss};function ss(e){let t=this,n=e.attempt(ja,r,e.attempt(this.parser.constructs.flowInitial,i,U(e,e.attempt(this.parser.constructs.flow,i,e.attempt(to,i)),`linePrefix`)));return n;function r(r){if(r===null){e.consume(r);return}return e.enter(`lineEndingBlank`),e.consume(r),e.exit(`lineEndingBlank`),t.currentConstruct=void 0,n}function i(r){if(r===null){e.consume(r);return}return e.enter(`lineEnding`),e.consume(r),e.exit(`lineEnding`),t.currentConstruct=void 0,n}}var cs={resolveAll:fs()},ls=ds(`string`),us=ds(`text`);function ds(e){return{resolveAll:fs(e===`text`?ps:void 0),tokenize:t};function t(t){let n=this,r=this.parser.constructs[e],i=t.attempt(r,a,o);return a;function a(e){return c(e)?i(e):o(e)}function o(e){if(e===null){t.consume(e);return}return t.enter(`data`),t.consume(e),s}function s(e){return c(e)?(t.exit(`data`),i(e)):(t.consume(e),s)}function c(e){if(e===null)return!0;let t=r[e],i=-1;if(t)for(;++i<t.length;){let e=t[i];if(!e.previous||e.previous.call(n,n.previous))return!0}return!1}}}function fs(e){return t;function t(t,n){let r=-1,i;for(;++r<=t.length;)i===void 0?t[r]&&t[r][1].type===`data`&&(i=r,r++):(!t[r]||t[r][1].type!==`data`)&&(r!==i+2&&(t[i][1].end=t[r-1][1].end,t.splice(i+2,r-i-2),r=i+2),i=void 0);return e?e(t,n):t}}function ps(e,t){let n=0;for(;++n<=e.length;)if((n===e.length||e[n][1].type===`lineEnding`)&&e[n-1][1].type===`data`){let r=e[n-1][1],i=t.sliceStream(r),a=i.length,o=-1,s=0,c;for(;a--;){let e=i[a];if(typeof e==`string`){for(o=e.length;e.charCodeAt(o-1)===32;)s++,o--;if(o)break;o=-1}else if(e===-2)c=!0,s++;else if(e!==-1){a++;break}}if(t._contentTypeTextTrailing&&n===e.length&&(s=0),s){let i={type:n===e.length||c||s<2?`lineSuffix`:`hardBreakTrailing`,start:{_bufferIndex:a?o:r.start._bufferIndex+o,_index:r.start._index+a,line:r.end.line,column:r.end.column-s,offset:r.end.offset-s},end:{...r.end}};r.end={...i.start},r.start.offset===r.end.offset?Object.assign(r,i):(e.splice(n,0,[`enter`,i,t],[`exit`,i,t]),n+=2)}n++}return e}var ms=s({attentionMarkers:()=>Ss,contentInitial:()=>gs,disable:()=>Cs,document:()=>hs,flow:()=>vs,flowInitial:()=>_s,insideSpan:()=>xs,string:()=>ys,text:()=>bs}),hs={42:Yo,43:Yo,45:Yo,48:Yo,49:Yo,50:Yo,51:Yo,52:Yo,53:Yo,54:Yo,55:Yo,56:Yo,57:Yo,62:Na},gs={91:uo},_s={[-2]:Ua,[-1]:Ua,32:Ua},vs={35:_o,42:qo,45:[rs,qo],60:So,61:rs,95:qo,96:G,126:G},ys={38:za,92:La},bs={[-5]:Go,[-4]:Go,[-3]:Go,33:Vo,38:za,42:Ta,60:[ka,ko],91:Uo,92:[ho,La],93:jo,95:Ta,96:qa},xs={null:[Ta,cs]},Ss={null:[42,95]},Cs={null:[]};function ws(e,t,n){let r={_bufferIndex:-1,_index:0,line:n&&n.line||1,column:n&&n.column||1,offset:n&&n.offset||0},i={},a=[],o=[],s=[],c={attempt:C(x),check:C(S),consume:v,enter:y,exit:b,interrupt:C(S,{interrupt:!0})},l={code:null,containerState:{},defineSkip:h,events:[],now:m,parser:e,previous:null,sliceSerialize:f,sliceStream:p,write:d},u=t.tokenize.call(l,c);return t.resolveAll&&a.push(t),l;function d(e){return o=$i(o,e),g(),o[o.length-1]===null?(ee(t,0),l.events=wa(a,l.events,l),l.events):[]}function f(e,t){return Es(p(e),t)}function p(e){return Ts(o,e)}function m(){let{_bufferIndex:e,_index:t,line:n,column:i,offset:a}=r;return{_bufferIndex:e,_index:t,line:n,column:i,offset:a}}function h(e){i[e.line]=e.column,T()}function g(){let e;for(;r._index<o.length;){let t=o[r._index];if(typeof t==`string`)for(e=r._index,r._bufferIndex<0&&(r._bufferIndex=0);r._index===e&&r._bufferIndex<t.length;)_(t.charCodeAt(r._bufferIndex));else _(t)}}function _(e){u=u(e)}function v(e){B(e)?(r.line++,r.column=1,r.offset+=e===-3?2:1,T()):e!==-1&&(r.column++,r.offset++),r._bufferIndex<0?r._index++:(r._bufferIndex++,r._bufferIndex===o[r._index].length&&(r._bufferIndex=-1,r._index++)),l.previous=e}function y(e,t){let n=t||{};return n.type=e,n.start=m(),l.events.push([`enter`,n,l]),s.push(n),n}function b(e){let t=s.pop();return t.end=m(),l.events.push([`exit`,t,l]),t}function x(e,t){ee(e,t.from)}function S(e,t){t.restore()}function C(e,t){return n;function n(n,r,i){let a,o,s,u;return Array.isArray(n)?f(n):`tokenize`in n?f([n]):d(n);function d(e){return t;function t(t){let n=t!==null&&e[t],r=t!==null&&e.null;return f([...Array.isArray(n)?n:n?[n]:[],...Array.isArray(r)?r:r?[r]:[]])(t)}}function f(e){return a=e,o=0,e.length===0?i:p(e[o])}function p(e){return n;function n(n){return u=w(),s=e,e.partial||(l.currentConstruct=e),e.name&&l.parser.constructs.disable.null.includes(e.name)?h(n):e.tokenize.call(t?Object.assign(Object.create(l),t):l,c,m,h)(n)}}function m(t){return e(s,u),r}function h(e){return u.restore(),++o<a.length?p(a[o]):i}}}function ee(e,t){e.resolveAll&&!a.includes(e)&&a.push(e),e.resolve&&Qi(l.events,t,l.events.length-t,e.resolve(l.events.slice(t),l)),e.resolveTo&&(l.events=e.resolveTo(l.events,l))}function w(){let e=m(),t=l.previous,n=l.currentConstruct,i=l.events.length,a=Array.from(s);return{from:i,restore:o};function o(){r=e,l.previous=t,l.currentConstruct=n,l.events.length=i,s=a,T()}}function T(){r.line in i&&r.column<2&&(r.column=i[r.line],r.offset+=i[r.line]-1)}}function Ts(e,t){let n=t.start._index,r=t.start._bufferIndex,i=t.end._index,a=t.end._bufferIndex,o;if(n===i)o=[e[n].slice(r,a)];else{if(o=e.slice(n,i),r>-1){let e=o[0];typeof e==`string`?o[0]=e.slice(r):o.shift()}a>0&&o.push(e[i].slice(0,a))}return o}function Es(e,t){let n=-1,r=[],i;for(;++n<e.length;){let a=e[n],o;if(typeof a==`string`)o=a;else switch(a){case-5:o=`\r`;break;case-4:o=`
`;break;case-3:o=`\r
`;break;case-2:o=t?` `:`	`;break;case-1:if(!t&&i)continue;o=` `;break;default:o=String.fromCharCode(a)}i=a===-2,r.push(o)}return r.join(``)}function Ds(e){let t={constructs:ta([ms,...(e||{}).extensions||[]]),content:n(_a),defined:[],document:n(ya),flow:n(os),lazy:{},string:n(ls),text:n(us)};return t;function n(e){return n;function n(n){return ws(t,e,n)}}}function Os(e){for(;!$a(e););return e}var ks=/[\0\t\n\r]/g;function As(){let e=1,t=``,n=!0,r;return i;function i(i,a,o){let s=[],c,l,u,d,f;for(i=t+(typeof i==`string`?i.toString():new TextDecoder(a||void 0).decode(i)),u=0,t=``,n&&=(i.charCodeAt(0)===65279&&u++,void 0);u<i.length;){if(ks.lastIndex=u,c=ks.exec(i),d=c&&c.index!==void 0?c.index:i.length,f=i.charCodeAt(d),!c){t=i.slice(u);break}if(f===10&&u===d&&r)s.push(-3),r=void 0;else switch(r&&=(s.push(-5),void 0),u<d&&(s.push(i.slice(u,d)),e+=d-u),f){case 0:s.push(65533),e++;break;case 9:for(l=Math.ceil(e/4)*4,s.push(-2);e++<l;)s.push(-1);break;case 10:s.push(-4),e=1;break;default:r=!0,e=1}u=d+1}return o&&(r&&s.push(-5),t&&s.push(t),s.push(null)),s}}var js=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function Ms(e){return e.replace(js,Ns)}function Ns(e,t,n){if(t)return t;if(n.charCodeAt(0)===35){let e=n.charCodeAt(1),t=e===120||e===88;return ia(n.slice(t?2:1),t?16:10)}return Zi(n)||e}var Ps={}.hasOwnProperty;function Fs(e,t,n){return t&&typeof t==`object`&&(n=t,t=void 0),Is(n)(Os(Ds(n).document().write(As()(e,t,!0))))}function Is(e){let t={transforms:[],canContainEols:[`emphasis`,`fragment`,`heading`,`paragraph`,`strong`],enter:{autolink:a(Te),autolinkProtocol:w,autolinkEmail:w,atxHeading:a(xe),blockQuote:a(ge),characterEscape:w,characterReference:w,codeFenced:a(_e),codeFencedFenceInfo:o,codeFencedFenceMeta:o,codeIndented:a(_e,o),codeText:a(ve,o),codeTextData:w,data:w,codeFlowValue:w,definition:a(ye),definitionDestinationString:o,definitionLabelString:o,definitionTitleString:o,emphasis:a(be),hardBreakEscape:a(Se),hardBreakTrailing:a(Se),htmlFlow:a(Ce,o),htmlFlowData:w,htmlText:a(Ce,o),htmlTextData:w,image:a(we),label:o,link:a(Te),listItem:a(De),listItemValue:f,listOrdered:a(Ee,d),listUnordered:a(Ee),paragraph:a(Oe),reference:ue,referenceString:o,resourceDestinationString:o,resourceTitleString:o,setextHeading:a(xe),strong:a(ke),thematicBreak:a(je)},exit:{atxHeading:c(),atxHeadingSequence:x,autolink:c(),autolinkEmail:he,autolinkProtocol:me,blockQuote:c(),characterEscapeValue:T,characterReferenceMarkerHexadecimal:fe,characterReferenceMarkerNumeric:fe,characterReferenceValue:pe,characterReference:k,codeFenced:c(g),codeFencedFence:h,codeFencedFenceInfo:p,codeFencedFenceMeta:m,codeFlowValue:T,codeIndented:c(_),codeText:c(ie),codeTextData:T,data:T,definition:c(),definitionDestinationString:b,definitionLabelString:v,definitionTitleString:y,emphasis:c(),hardBreakEscape:c(E),hardBreakTrailing:c(E),htmlFlow:c(ne),htmlFlowData:T,htmlText:c(re),htmlTextData:T,image:c(oe),label:ce,labelText:se,lineEnding:te,link:c(ae),listItem:c(),listOrdered:c(),listUnordered:c(),paragraph:c(),referenceString:de,resourceDestinationString:D,resourceTitleString:O,resource:le,setextHeading:c(ee),setextHeadingLineSequence:C,setextHeadingText:S,strong:c(),thematicBreak:c()}};Rs(t,(e||{}).mdastExtensions||[]);let n={};return r;function r(e){let r={type:`root`,children:[]},a={stack:[r],tokenStack:[],config:t,enter:s,exit:l,buffer:o,resume:u,data:n},c=[],d=-1;for(;++d<e.length;)(e[d][1].type===`listOrdered`||e[d][1].type===`listUnordered`)&&(e[d][0]===`enter`?c.push(d):d=i(e,c.pop(),d));for(d=-1;++d<e.length;){let n=t[e[d][0]];Ps.call(n,e[d][1].type)&&n[e[d][1].type].call(Object.assign({sliceSerialize:e[d][2].sliceSerialize},a),e[d][1])}if(a.tokenStack.length>0){let e=a.tokenStack[a.tokenStack.length-1];(e[1]||Bs).call(a,void 0,e[0])}for(r.position={start:Ls(e.length>0?e[0][1].start:{line:1,column:1,offset:0}),end:Ls(e.length>0?e[e.length-2][1].end:{line:1,column:1,offset:0})},d=-1;++d<t.transforms.length;)r=t.transforms[d](r)||r;return r}function i(e,t,n){let r=t-1,i=-1,a=!1,o,s,c,l;for(;++r<=n;){let t=e[r];switch(t[1].type){case`listUnordered`:case`listOrdered`:case`blockQuote`:t[0]===`enter`?i++:i--,l=void 0;break;case`lineEndingBlank`:t[0]===`enter`&&(o&&!l&&!i&&!c&&(c=r),l=void 0);break;case`linePrefix`:case`listItemValue`:case`listItemMarker`:case`listItemPrefix`:case`listItemPrefixWhitespace`:break;default:l=void 0}if(!i&&t[0]===`enter`&&t[1].type===`listItemPrefix`||i===-1&&t[0]===`exit`&&(t[1].type===`listUnordered`||t[1].type===`listOrdered`)){if(o){let i=r;for(s=void 0;i--;){let t=e[i];if(t[1].type===`lineEnding`||t[1].type===`lineEndingBlank`){if(t[0]===`exit`)continue;s&&(e[s][1].type=`lineEndingBlank`,a=!0),t[1].type=`lineEnding`,s=i}else if(!(t[1].type===`linePrefix`||t[1].type===`blockQuotePrefix`||t[1].type===`blockQuotePrefixWhitespace`||t[1].type===`blockQuoteMarker`||t[1].type===`listItemIndent`))break}c&&(!s||c<s)&&(o._spread=!0),o.end=Object.assign({},s?e[s][1].start:t[1].end),e.splice(s||r,0,[`exit`,o,t[2]]),r++,n++}if(t[1].type===`listItemPrefix`){let i={type:`listItem`,_spread:!1,start:Object.assign({},t[1].start),end:void 0};o=i,e.splice(r,0,[`enter`,i,t[2]]),r++,n++,c=void 0,l=!0}}}return e[t][1]._spread=a,n}function a(e,t){return n;function n(n){s.call(this,e(n),n),t&&t.call(this,n)}}function o(){this.stack.push({type:`fragment`,children:[]})}function s(e,t,n){this.stack[this.stack.length-1].children.push(e),this.stack.push(e),this.tokenStack.push([t,n||void 0]),e.position={start:Ls(t.start),end:void 0}}function c(e){return t;function t(t){e&&e.call(this,t),l.call(this,t)}}function l(e,t){let n=this.stack.pop(),r=this.tokenStack.pop();if(r)r[0].type!==e.type&&(t?t.call(this,e,r[0]):(r[1]||Bs).call(this,e,r[0]));else throw Error("Cannot close `"+e.type+"` ("+di({start:e.start,end:e.end})+`): it’s not open`);n.position.end=Ls(e.end)}function u(){return Ki(this.stack.pop())}function d(){this.data.expectingFirstListItemValue=!0}function f(e){if(this.data.expectingFirstListItemValue){let t=this.stack[this.stack.length-2];t.start=Number.parseInt(this.sliceSerialize(e),10),this.data.expectingFirstListItemValue=void 0}}function p(){let e=this.resume(),t=this.stack[this.stack.length-1];t.lang=e}function m(){let e=this.resume(),t=this.stack[this.stack.length-1];t.meta=e}function h(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function g(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,``),this.data.flowCodeInside=void 0}function _(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e.replace(/(\r?\n|\r)$/g,``)}function v(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=aa(this.sliceSerialize(e)).toLowerCase()}function y(){let e=this.resume(),t=this.stack[this.stack.length-1];t.title=e}function b(){let e=this.resume(),t=this.stack[this.stack.length-1];t.url=e}function x(e){let t=this.stack[this.stack.length-1];t.depth||=this.sliceSerialize(e).length}function S(){this.data.setextHeadingSlurpLineEnding=!0}function C(e){let t=this.stack[this.stack.length-1];t.depth=this.sliceSerialize(e).codePointAt(0)===61?1:2}function ee(){this.data.setextHeadingSlurpLineEnding=void 0}function w(e){let t=this.stack[this.stack.length-1].children,n=t[t.length-1];(!n||n.type!==`text`)&&(n=Ae(),n.position={start:Ls(e.start),end:void 0},t.push(n)),this.stack.push(n)}function T(e){let t=this.stack.pop();t.value+=this.sliceSerialize(e),t.position.end=Ls(e.end)}function te(e){let n=this.stack[this.stack.length-1];if(this.data.atHardBreak){let t=n.children[n.children.length-1];t.position.end=Ls(e.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&t.canContainEols.includes(n.type)&&(w.call(this,e),T.call(this,e))}function E(){this.data.atHardBreak=!0}function ne(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function re(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function ie(){let e=this.resume(),t=this.stack[this.stack.length-1];t.value=e}function ae(){let e=this.stack[this.stack.length-1];if(this.data.inReference){let t=this.data.referenceType||`shortcut`;e.type+=`Reference`,e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;this.data.referenceType=void 0}function oe(){let e=this.stack[this.stack.length-1];if(this.data.inReference){let t=this.data.referenceType||`shortcut`;e.type+=`Reference`,e.referenceType=t,delete e.url,delete e.title}else delete e.identifier,delete e.label;this.data.referenceType=void 0}function se(e){let t=this.sliceSerialize(e),n=this.stack[this.stack.length-2];n.label=Ms(t),n.identifier=aa(t).toLowerCase()}function ce(){let e=this.stack[this.stack.length-1],t=this.resume(),n=this.stack[this.stack.length-1];this.data.inReference=!0,n.type===`link`?n.children=e.children:n.alt=t}function D(){let e=this.resume(),t=this.stack[this.stack.length-1];t.url=e}function O(){let e=this.resume(),t=this.stack[this.stack.length-1];t.title=e}function le(){this.data.inReference=void 0}function ue(){this.data.referenceType=`collapsed`}function de(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.label=t,n.identifier=aa(this.sliceSerialize(e)).toLowerCase(),this.data.referenceType=`full`}function fe(e){this.data.characterReferenceType=e.type}function pe(e){let t=this.sliceSerialize(e),n=this.data.characterReferenceType,r;n?(r=ia(t,n===`characterReferenceMarkerNumeric`?10:16),this.data.characterReferenceType=void 0):r=Zi(t);let i=this.stack[this.stack.length-1];i.value+=r}function k(e){let t=this.stack.pop();t.position.end=Ls(e.end)}function me(e){T.call(this,e);let t=this.stack[this.stack.length-1];t.url=this.sliceSerialize(e)}function he(e){T.call(this,e);let t=this.stack[this.stack.length-1];t.url=`mailto:`+this.sliceSerialize(e)}function ge(){return{type:`blockquote`,children:[]}}function _e(){return{type:`code`,lang:null,meta:null,value:``}}function ve(){return{type:`inlineCode`,value:``}}function ye(){return{type:`definition`,identifier:``,label:null,title:null,url:``}}function be(){return{type:`emphasis`,children:[]}}function xe(){return{type:`heading`,depth:0,children:[]}}function Se(){return{type:`break`}}function Ce(){return{type:`html`,value:``}}function we(){return{type:`image`,title:null,url:``,alt:null}}function Te(){return{type:`link`,title:null,url:``,children:[]}}function Ee(e){return{type:`list`,ordered:e.type===`listOrdered`,start:null,spread:e._spread,children:[]}}function De(e){return{type:`listItem`,spread:e._spread,checked:null,children:[]}}function Oe(){return{type:`paragraph`,children:[]}}function ke(){return{type:`strong`,children:[]}}function Ae(){return{type:`text`,value:``}}function je(){return{type:`thematicBreak`}}}function Ls(e){return{line:e.line,column:e.column,offset:e.offset}}function Rs(e,t){let n=-1;for(;++n<t.length;){let r=t[n];Array.isArray(r)?Rs(e,r):zs(e,r)}}function zs(e,t){let n;for(n in t)if(Ps.call(t,n))switch(n){case`canContainEols`:{let r=t[n];r&&e[n].push(...r);break}case`transforms`:{let r=t[n];r&&e[n].push(...r);break}case`enter`:case`exit`:{let r=t[n];r&&Object.assign(e[n],r);break}}}function Bs(e,t){throw Error(e?"Cannot close `"+e.type+"` ("+di({start:e.start,end:e.end})+"): a different token (`"+t.type+"`, "+di({start:t.start,end:t.end})+`) is open`:"Cannot close document, a token (`"+t.type+"`, "+di({start:t.start,end:t.end})+`) is still open`)}function Vs(e){let t=this;t.parser=n;function n(n){return Fs(n,{...t.data(`settings`),...e,extensions:t.data(`micromarkExtensions`)||[],mdastExtensions:t.data(`fromMarkdownExtensions`)||[]})}}function Hs(e,t){let n={type:`element`,tagName:`blockquote`,properties:{},children:e.wrap(e.all(t),!0)};return e.patch(t,n),e.applyData(t,n)}function Us(e,t){let n={type:`element`,tagName:`br`,properties:{},children:[]};return e.patch(t,n),[e.applyData(t,n),{type:`text`,value:`
`}]}function Ws(e,t){let n=t.value?t.value+`
`:``,r={},i=t.lang?t.lang.split(/\s+/):[];i.length>0&&(r.className=[`language-`+i[0]]);let a={type:`element`,tagName:`code`,properties:r,children:[{type:`text`,value:n}]};return t.meta&&(a.data={meta:t.meta}),e.patch(t,a),a=e.applyData(t,a),a={type:`element`,tagName:`pre`,properties:{},children:[a]},e.patch(t,a),a}function Gs(e,t){let n={type:`element`,tagName:`del`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Ks(e,t){let n={type:`element`,tagName:`em`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function qs(e,t){let n=typeof e.options.clobberPrefix==`string`?e.options.clobberPrefix:`user-content-`,r=String(t.identifier).toUpperCase(),i=ga(r.toLowerCase()),a=e.footnoteOrder.indexOf(r),o,s=e.footnoteCounts.get(r);s===void 0?(s=0,e.footnoteOrder.push(r),o=e.footnoteOrder.length):o=a+1,s+=1,e.footnoteCounts.set(r,s);let c={type:`element`,tagName:`a`,properties:{href:`#`+n+`fn-`+i,id:n+`fnref-`+i+(s>1?`-`+s:``),dataFootnoteRef:!0,ariaDescribedBy:[`footnote-label`]},children:[{type:`text`,value:String(o)}]};e.patch(t,c);let l={type:`element`,tagName:`sup`,properties:{},children:[c]};return e.patch(t,l),e.applyData(t,l)}function Js(e,t){let n={type:`element`,tagName:`h`+t.depth,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function Ys(e,t){if(e.options.allowDangerousHtml){let n={type:`raw`,value:t.value};return e.patch(t,n),e.applyData(t,n)}}function Xs(e,t){let n=t.referenceType,r=`]`;if(n===`collapsed`?r+=`[]`:n===`full`&&(r+=`[`+(t.label||t.identifier)+`]`),t.type===`imageReference`)return[{type:`text`,value:`![`+t.alt+r}];let i=e.all(t),a=i[0];a&&a.type===`text`?a.value=`[`+a.value:i.unshift({type:`text`,value:`[`});let o=i[i.length-1];return o&&o.type===`text`?o.value+=r:i.push({type:`text`,value:r}),i}function Zs(e,t){let n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return Xs(e,t);let i={src:ga(r.url||``),alt:t.alt};r.title!==null&&r.title!==void 0&&(i.title=r.title);let a={type:`element`,tagName:`img`,properties:i,children:[]};return e.patch(t,a),e.applyData(t,a)}function Qs(e,t){let n={src:ga(t.url)};t.alt!==null&&t.alt!==void 0&&(n.alt=t.alt),t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:`element`,tagName:`img`,properties:n,children:[]};return e.patch(t,r),e.applyData(t,r)}function $s(e,t){let n={type:`text`,value:t.value.replace(/\r?\n|\r/g,` `)};e.patch(t,n);let r={type:`element`,tagName:`code`,properties:{},children:[n]};return e.patch(t,r),e.applyData(t,r)}function ec(e,t){let n=String(t.identifier).toUpperCase(),r=e.definitionById.get(n);if(!r)return Xs(e,t);let i={href:ga(r.url||``)};r.title!==null&&r.title!==void 0&&(i.title=r.title);let a={type:`element`,tagName:`a`,properties:i,children:e.all(t)};return e.patch(t,a),e.applyData(t,a)}function tc(e,t){let n={href:ga(t.url)};t.title!==null&&t.title!==void 0&&(n.title=t.title);let r={type:`element`,tagName:`a`,properties:n,children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function nc(e,t,n){let r=e.all(t),i=n?rc(n):ic(t),a={},o=[];if(typeof t.checked==`boolean`){let e=r[0],n;e&&e.type===`element`&&e.tagName===`p`?n=e:(n={type:`element`,tagName:`p`,properties:{},children:[]},r.unshift(n)),n.children.length>0&&n.children.unshift({type:`text`,value:` `}),n.children.unshift({type:`element`,tagName:`input`,properties:{type:`checkbox`,checked:t.checked,disabled:!0},children:[]}),a.className=[`task-list-item`]}let s=-1;for(;++s<r.length;){let e=r[s];(i||s!==0||e.type!==`element`||e.tagName!==`p`)&&o.push({type:`text`,value:`
`}),e.type===`element`&&e.tagName===`p`&&!i?o.push(...e.children):o.push(e)}let c=r[r.length-1];c&&(i||c.type!==`element`||c.tagName!==`p`)&&o.push({type:`text`,value:`
`});let l={type:`element`,tagName:`li`,properties:a,children:o};return e.patch(t,l),e.applyData(t,l)}function rc(e){let t=!1;if(e.type===`list`){t=e.spread||!1;let n=e.children,r=-1;for(;!t&&++r<n.length;)t=ic(n[r])}return t}function ic(e){return e.spread??e.children.length>1}function ac(e,t){let n={},r=e.all(t),i=-1;for(typeof t.start==`number`&&t.start!==1&&(n.start=t.start);++i<r.length;){let e=r[i];if(e.type===`element`&&e.tagName===`li`&&e.properties&&Array.isArray(e.properties.className)&&e.properties.className.includes(`task-list-item`)){n.className=[`contains-task-list`];break}}let a={type:`element`,tagName:t.ordered?`ol`:`ul`,properties:n,children:e.wrap(r,!0)};return e.patch(t,a),e.applyData(t,a)}function oc(e,t){let n={type:`element`,tagName:`p`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function sc(e,t){let n={type:`root`,children:e.wrap(e.all(t))};return e.patch(t,n),e.applyData(t,n)}function cc(e,t){let n={type:`element`,tagName:`strong`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}function lc(e,t){let n=e.all(t),r=n.shift(),i=[];if(r){let n={type:`element`,tagName:`thead`,properties:{},children:e.wrap([r],!0)};e.patch(t.children[0],n),i.push(n)}if(n.length>0){let r={type:`element`,tagName:`tbody`,properties:{},children:e.wrap(n,!0)},a=ci(t.children[1]),o=si(t.children[t.children.length-1]);a&&o&&(r.position={start:a,end:o}),i.push(r)}let a={type:`element`,tagName:`table`,properties:{},children:e.wrap(i,!0)};return e.patch(t,a),e.applyData(t,a)}function uc(e,t,n){let r=n?n.children:void 0,i=(r?r.indexOf(t):1)===0?`th`:`td`,a=n&&n.type===`table`?n.align:void 0,o=a?a.length:t.children.length,s=-1,c=[];for(;++s<o;){let n=t.children[s],r={},o=a?a[s]:void 0;o&&(r.align=o);let l={type:`element`,tagName:i,properties:r,children:[]};n&&(l.children=e.all(n),e.patch(n,l),l=e.applyData(n,l)),c.push(l)}let l={type:`element`,tagName:`tr`,properties:{},children:e.wrap(c,!0)};return e.patch(t,l),e.applyData(t,l)}function dc(e,t){let n={type:`element`,tagName:`td`,properties:{},children:e.all(t)};return e.patch(t,n),e.applyData(t,n)}var fc=9,pc=32;function mc(e){let t=String(e),n=/\r?\n|\r/g,r=n.exec(t),i=0,a=[];for(;r;)a.push(hc(t.slice(i,r.index),i>0,!0),r[0]),i=r.index+r[0].length,r=n.exec(t);return a.push(hc(t.slice(i),i>0,!1)),a.join(``)}function hc(e,t,n){let r=0,i=e.length;if(t){let t=e.codePointAt(r);for(;t===fc||t===pc;)r++,t=e.codePointAt(r)}if(n){let t=e.codePointAt(i-1);for(;t===fc||t===pc;)i--,t=e.codePointAt(i-1)}return i>r?e.slice(r,i):``}function gc(e,t){let n={type:`text`,value:mc(String(t.value))};return e.patch(t,n),e.applyData(t,n)}function _c(e,t){let n={type:`element`,tagName:`hr`,properties:{},children:[]};return e.patch(t,n),e.applyData(t,n)}var vc={blockquote:Hs,break:Us,code:Ws,delete:Gs,emphasis:Ks,footnoteReference:qs,heading:Js,html:Ys,imageReference:Zs,image:Qs,inlineCode:$s,linkReference:ec,link:tc,listItem:nc,list:ac,paragraph:oc,root:sc,strong:cc,table:lc,tableCell:dc,tableRow:uc,text:gc,thematicBreak:_c,toml:yc,yaml:yc,definition:yc,footnoteDefinition:yc};function yc(){}var bc=typeof self==`object`?self:globalThis,xc=(e,t)=>{switch(e){case`Function`:case`SharedWorker`:case`Worker`:case`eval`:case`setInterval`:case`setTimeout`:throw TypeError(`unable to deserialize `+e)}return new bc[e](t)},Sc=(e,t)=>{let n=(t,n)=>(e.set(n,t),t),r=i=>{if(e.has(i))return e.get(i);let[a,o]=t[i];switch(a){case 0:case-1:return n(o,i);case 1:{let e=n([],i);for(let t of o)e.push(r(t));return e}case 2:{let e=n({},i);for(let[t,n]of o)e[r(t)]=r(n);return e}case 3:return n(new Date(o),i);case 4:{let{source:e,flags:t}=o;return n(new RegExp(e,t),i)}case 5:{let e=n(new Map,i);for(let[t,n]of o)e.set(r(t),r(n));return e}case 6:{let e=n(new Set,i);for(let t of o)e.add(r(t));return e}case 7:{let{name:e,message:t}=o;return n(typeof bc[e]==`function`?xc(e,t):Error(t),i)}case 8:return n(BigInt(o),i);case`BigInt`:return n(Object(BigInt(o)),i);case`ArrayBuffer`:return n(new Uint8Array(o).buffer,o);case`DataView`:{let{buffer:e}=new Uint8Array(o);return n(new DataView(e),o)}}return n(xc(a,o),i)};return r},Cc=e=>Sc(new Map,e)(0),wc=``,{toString:Tc}={},{keys:Ec}=Object,Dc=e=>{let t=typeof e;if(t!==`object`||!e)return[0,t];let n=Tc.call(e).slice(8,-1);switch(n){case`Array`:return[1,wc];case`Object`:return[2,wc];case`Date`:return[3,wc];case`RegExp`:return[4,wc];case`Map`:return[5,wc];case`Set`:return[6,wc];case`DataView`:return[1,n]}return n.includes(`Array`)?[1,n]:e instanceof Error?[7,e.name||`Error`]:[2,n]},Oc=([e,t])=>e===0&&(t===`function`||t===`symbol`),kc=(e,t,n,r)=>{let i=(e,t)=>{let i=r.push(e)-1;return n.set(t,i),i},a=r=>{if(n.has(r))return n.get(r);let[o,s]=Dc(r);switch(o){case 0:{let t=r;switch(s){case`bigint`:o=8,t=r.toString();break;case`function`:case`symbol`:if(e)throw TypeError(`unable to serialize `+s);t=null;break;case`undefined`:return i([-1],r)}return i([o,t],r)}case 1:{if(s){let e=r;return s===`DataView`?e=new Uint8Array(r.buffer):s===`ArrayBuffer`&&(e=new Uint8Array(r)),i([s,[...e]],r)}let e=[],t=i([o,e],r);for(let t of r)e.push(a(t));return t}case 2:{if(s)switch(s){case`BigInt`:return i([s,r.toString()],r);case`Boolean`:case`Number`:case`String`:return i([s,r.valueOf()],r)}if(t&&`toJSON`in r)return a(r.toJSON());let n=[],c=i([o,n],r);for(let t of Ec(r))(e||!Oc(Dc(r[t])))&&n.push([a(t),a(r[t])]);return c}case 3:return i([o,isNaN(r.getTime())?wc:r.toISOString()],r);case 4:{let{source:e,flags:t}=r;return i([o,{source:e,flags:t}],r)}case 5:{let t=[],n=i([o,t],r);for(let[n,i]of r)(e||!(Oc(Dc(n))||Oc(Dc(i))))&&t.push([a(n),a(i)]);return n}case 6:{let t=[],n=i([o,t],r);for(let n of r)(e||!Oc(Dc(n)))&&t.push(a(n));return n}}let{message:c}=r;return i([o,{name:s,message:c}],r)};return a},Ac=(e,{json:t,lossy:n}={})=>{let r=[];return kc(!(t||n),!!t,new Map,r)(e),r},jc=typeof structuredClone==`function`?(e,t)=>t&&(`json`in t||`lossy`in t)?Cc(Ac(e,t)):structuredClone(e):(e,t)=>Cc(Ac(e,t));function Mc(e,t){let n=[{type:`text`,value:`↩`}];return t>1&&n.push({type:`element`,tagName:`sup`,properties:{},children:[{type:`text`,value:String(t)}]}),n}function Nc(e,t){return`Back to reference `+(e+1)+(t>1?`-`+t:``)}function Pc(e){let t=typeof e.options.clobberPrefix==`string`?e.options.clobberPrefix:`user-content-`,n=e.options.footnoteBackContent||Mc,r=e.options.footnoteBackLabel||Nc,i=e.options.footnoteLabel||`Footnotes`,a=e.options.footnoteLabelTagName||`h2`,o=e.options.footnoteLabelProperties||{className:[`sr-only`]},s=[],c=-1;for(;++c<e.footnoteOrder.length;){let i=e.footnoteById.get(e.footnoteOrder[c]);if(!i)continue;let a=e.all(i),o=String(i.identifier).toUpperCase(),l=ga(o.toLowerCase()),u=0,d=[],f=e.footnoteCounts.get(o);for(;f!==void 0&&++u<=f;){d.length>0&&d.push({type:`text`,value:` `});let e=typeof n==`string`?n:n(c,u);typeof e==`string`&&(e={type:`text`,value:e}),d.push({type:`element`,tagName:`a`,properties:{href:`#`+t+`fnref-`+l+(u>1?`-`+u:``),dataFootnoteBackref:``,ariaLabel:typeof r==`string`?r:r(c,u),className:[`data-footnote-backref`]},children:Array.isArray(e)?e:[e]})}let p=a[a.length-1];if(p&&p.type===`element`&&p.tagName===`p`){let e=p.children[p.children.length-1];e&&e.type===`text`?e.value+=` `:p.children.push({type:`text`,value:` `}),p.children.push(...d)}else a.push(...d);let m={type:`element`,tagName:`li`,properties:{id:t+`fn-`+l},children:e.wrap(a,!0)};e.patch(i,m),s.push(m)}if(s.length!==0)return{type:`element`,tagName:`section`,properties:{dataFootnotes:!0,className:[`footnotes`]},children:[{type:`element`,tagName:a,properties:{...jc(o),id:`footnote-label`},children:[{type:`text`,value:i}]},{type:`text`,value:`
`},{type:`element`,tagName:`ol`,properties:{},children:e.wrap(s,!0)},{type:`text`,value:`
`}]}}var Fc=(function(e){if(e==null)return Bc;if(typeof e==`function`)return zc(e);if(typeof e==`object`)return Array.isArray(e)?Ic(e):Lc(e);if(typeof e==`string`)return Rc(e);throw Error(`Expected function, string, or object as test`)});function Ic(e){let t=[],n=-1;for(;++n<e.length;)t[n]=Fc(e[n]);return zc(r);function r(...e){let n=-1;for(;++n<t.length;)if(t[n].apply(this,e))return!0;return!1}}function Lc(e){let t=e;return zc(n);function n(n){let r=n,i;for(i in e)if(r[i]!==t[i])return!1;return!0}}function Rc(e){return zc(t);function t(t){return t&&t.type===e}}function zc(e){return t;function t(t,n,r){return!!(Vc(t)&&e.call(this,t,typeof n==`number`?n:void 0,r||void 0))}}function Bc(){return!0}function Vc(e){return typeof e==`object`&&!!e&&`type`in e}function Hc(e){return e}var Uc=[];function Wc(e,t,n,r){let i;typeof t==`function`&&typeof n!=`function`?(r=n,n=t):i=t;let a=Fc(i),o=r?-1:1;s(e,void 0,[])();function s(e,i,c){let l=e&&typeof e==`object`?e:{};if(typeof l.type==`string`){let t=typeof l.tagName==`string`?l.tagName:typeof l.name==`string`?l.name:void 0;Object.defineProperty(u,`name`,{value:`node (`+Hc(e.type+(t?`<`+t+`>`:``))+`)`})}return u;function u(){let l=Uc,u,d,f;if((!t||a(e,i,c[c.length-1]||void 0))&&(l=Gc(n(e,c)),l[0]===!1))return l;if(`children`in e&&e.children){let t=e;if(t.children&&l[0]!==`skip`)for(d=(r?t.children.length:-1)+o,f=c.concat(t);d>-1&&d<t.children.length;){let e=t.children[d];if(u=s(e,d,f)(),u[0]===!1)return u;d=typeof u[1]==`number`?u[1]:d+o}}return l}}}function Gc(e){return Array.isArray(e)?e:typeof e==`number`?[!0,e]:e==null?Uc:[e]}function Kc(e,t,n,r){let i,a,o;typeof t==`function`&&typeof n!=`function`?(a=void 0,o=t,i=n):(a=t,o=n,i=r),Wc(e,a,s,i);function s(e,t){let n=t[t.length-1],r=n?n.children.indexOf(e):void 0;return o(e,r,n)}}var qc={}.hasOwnProperty,Jc={};function Yc(e,t){let n=t||Jc,r=new Map,i=new Map,a={all:s,applyData:Zc,definitionById:r,footnoteById:i,footnoteCounts:new Map,footnoteOrder:[],handlers:{...vc,...n.handlers},one:o,options:n,patch:Xc,wrap:$c};return Kc(e,function(e){if(e.type===`definition`||e.type===`footnoteDefinition`){let t=e.type===`definition`?r:i,n=String(e.identifier).toUpperCase();t.has(n)||t.set(n,e)}}),a;function o(e,t){let n=e.type,r=a.handlers[n];if(qc.call(a.handlers,n)&&r)return r(a,e,t);if(a.options.passThrough&&a.options.passThrough.includes(n)){if(`children`in e){let{children:t,...n}=e,r=jc(n);return r.children=a.all(e),r}return jc(e)}return(a.options.unknownHandler||Qc)(a,e,t)}function s(e){let t=[];if(`children`in e){let n=e.children,r=-1;for(;++r<n.length;){let i=a.one(n[r],e);if(i){if(r&&n[r-1].type===`break`&&(!Array.isArray(i)&&i.type===`text`&&(i.value=el(i.value)),!Array.isArray(i)&&i.type===`element`)){let e=i.children[0];e&&e.type===`text`&&(e.value=el(e.value))}Array.isArray(i)?t.push(...i):t.push(i)}}}return t}}function Xc(e,t){e.position&&(t.position=ui(e))}function Zc(e,t){let n=t;if(e&&e.data){let t=e.data.hName,r=e.data.hChildren,i=e.data.hProperties;typeof t==`string`&&(n.type===`element`?n.tagName=t:n={type:`element`,tagName:t,properties:{},children:`children`in n?n.children:[n]}),n.type===`element`&&i&&Object.assign(n.properties,jc(i)),`children`in n&&n.children&&r!=null&&(n.children=r)}return n}function Qc(e,t){let n=t.data||{},r=`value`in t&&!(qc.call(n,`hProperties`)||qc.call(n,`hChildren`))?{type:`text`,value:t.value}:{type:`element`,tagName:`div`,properties:{},children:e.all(t)};return e.patch(t,r),e.applyData(t,r)}function $c(e,t){let n=[],r=-1;for(t&&n.push({type:`text`,value:`
`});++r<e.length;)r&&n.push({type:`text`,value:`
`}),n.push(e[r]);return t&&e.length>0&&n.push({type:`text`,value:`
`}),n}function el(e){let t=0,n=e.charCodeAt(t);for(;n===9||n===32;)t++,n=e.charCodeAt(t);return e.slice(t)}function tl(e,t){let n=Yc(e,t),r=n.one(e,void 0),i=Pc(n),a=Array.isArray(r)?{type:`root`,children:r}:r||{type:`root`,children:[]};return i&&(`children`in a,a.children.push({type:`text`,value:`
`},i)),a}function nl(e,t){return e&&`run`in e?async function(n,r){let i=tl(n,{file:r,...t});await e.run(i,r)}:function(n,r){return tl(n,{file:r,...e||t})}}function rl(e){if(e)throw e}var il=o(((e,t)=>{var n=Object.prototype.hasOwnProperty,r=Object.prototype.toString,i=Object.defineProperty,a=Object.getOwnPropertyDescriptor,o=function(e){return typeof Array.isArray==`function`?Array.isArray(e):r.call(e)===`[object Array]`},s=function(e){if(!e||r.call(e)!==`[object Object]`)return!1;var t=n.call(e,`constructor`),i=e.constructor&&e.constructor.prototype&&n.call(e.constructor.prototype,`isPrototypeOf`);if(e.constructor&&!t&&!i)return!1;for(var a in e);return a===void 0||n.call(e,a)},c=function(e,t){i&&t.name===`__proto__`?i(e,t.name,{enumerable:!0,configurable:!0,value:t.newValue,writable:!0}):e[t.name]=t.newValue},l=function(e,t){if(t===`__proto__`){if(!n.call(e,t))return;if(a)return a(e,t).value}return e[t]};t.exports=function e(){var t,n,r,i,a,u,d=arguments[0],f=1,p=arguments.length,m=!1;for(typeof d==`boolean`&&(m=d,d=arguments[1]||{},f=2),(d==null||typeof d!=`object`&&typeof d!=`function`)&&(d={});f<p;++f)if(t=arguments[f],t!=null)for(n in t)r=l(d,n),i=l(t,n),d!==i&&(m&&i&&(s(i)||(a=o(i)))?(a?(a=!1,u=r&&o(r)?r:[]):u=r&&s(r)?r:{},c(d,{name:n,newValue:e(m,u,i)})):i!==void 0&&c(d,{name:n,newValue:i}));return d}}));function al(e){if(typeof e!=`object`||!e)return!1;let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function ol(){let e=[],t={run:n,use:r};return t;function n(...t){let n=-1,r=t.pop();if(typeof r!=`function`)throw TypeError(`Expected function as last argument, not `+r);i(null,...t);function i(a,...o){let s=e[++n],c=-1;if(a){r(a);return}for(;++c<t.length;)(o[c]===null||o[c]===void 0)&&(o[c]=t[c]);t=o,s?sl(s,i)(...o):r(null,...o)}}function r(n){if(typeof n!=`function`)throw TypeError("Expected `middelware` to be a function, not "+n);return e.push(n),t}}function sl(e,t){let n;return r;function r(...t){let r=e.length>t.length,o;r&&t.push(i);try{o=e.apply(this,t)}catch(e){let t=e;if(r&&n)throw t;return i(t)}r||(o&&o.then&&typeof o.then==`function`?o.then(a,i):o instanceof Error?i(o):a(o))}function i(e,...r){n||(n=!0,t(e,...r))}function a(e){i(null,e)}}var cl={basename:ll,dirname:ul,extname:dl,join:fl,sep:`/`};function ll(e,t){if(t!==void 0&&typeof t!=`string`)throw TypeError(`"ext" argument must be a string`);hl(e);let n=0,r=-1,i=e.length,a;if(t===void 0||t.length===0||t.length>e.length){for(;i--;)if(e.codePointAt(i)===47){if(a){n=i+1;break}}else r<0&&(a=!0,r=i+1);return r<0?``:e.slice(n,r)}if(t===e)return``;let o=-1,s=t.length-1;for(;i--;)if(e.codePointAt(i)===47){if(a){n=i+1;break}}else o<0&&(a=!0,o=i+1),s>-1&&(e.codePointAt(i)===t.codePointAt(s--)?s<0&&(r=i):(s=-1,r=o));return n===r?r=o:r<0&&(r=e.length),e.slice(n,r)}function ul(e){if(hl(e),e.length===0)return`.`;let t=-1,n=e.length,r;for(;--n;)if(e.codePointAt(n)===47){if(r){t=n;break}}else r||=!0;return t<0?e.codePointAt(0)===47?`/`:`.`:t===1&&e.codePointAt(0)===47?`//`:e.slice(0,t)}function dl(e){hl(e);let t=e.length,n=-1,r=0,i=-1,a=0,o;for(;t--;){let s=e.codePointAt(t);if(s===47){if(o){r=t+1;break}continue}n<0&&(o=!0,n=t+1),s===46?i<0?i=t:a!==1&&(a=1):i>-1&&(a=-1)}return i<0||n<0||a===0||a===1&&i===n-1&&i===r+1?``:e.slice(i,n)}function fl(...e){let t=-1,n;for(;++t<e.length;)hl(e[t]),e[t]&&(n=n===void 0?e[t]:n+`/`+e[t]);return n===void 0?`.`:pl(n)}function pl(e){hl(e);let t=e.codePointAt(0)===47,n=ml(e,!t);return n.length===0&&!t&&(n=`.`),n.length>0&&e.codePointAt(e.length-1)===47&&(n+=`/`),t?`/`+n:n}function ml(e,t){let n=``,r=0,i=-1,a=0,o=-1,s,c;for(;++o<=e.length;){if(o<e.length)s=e.codePointAt(o);else if(s===47)break;else s=47;if(s===47){if(!(i===o-1||a===1))if(i!==o-1&&a===2){if(n.length<2||r!==2||n.codePointAt(n.length-1)!==46||n.codePointAt(n.length-2)!==46){if(n.length>2){if(c=n.lastIndexOf(`/`),c!==n.length-1){c<0?(n=``,r=0):(n=n.slice(0,c),r=n.length-1-n.lastIndexOf(`/`)),i=o,a=0;continue}}else if(n.length>0){n=``,r=0,i=o,a=0;continue}}t&&(n=n.length>0?n+`/..`:`..`,r=2)}else n.length>0?n+=`/`+e.slice(i+1,o):n=e.slice(i+1,o),r=o-i-1;i=o,a=0}else s===46&&a>-1?a++:a=-1}return n}function hl(e){if(typeof e!=`string`)throw TypeError(`Path must be a string. Received `+JSON.stringify(e))}var gl={cwd:_l};function _l(){return`/`}function vl(e){return!!(typeof e==`object`&&e&&`href`in e&&e.href&&`protocol`in e&&e.protocol&&e.auth===void 0)}function yl(e){if(typeof e==`string`)e=new URL(e);else if(!vl(e)){let t=TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw t.code=`ERR_INVALID_ARG_TYPE`,t}if(e.protocol!==`file:`){let e=TypeError(`The URL must be of scheme file`);throw e.code=`ERR_INVALID_URL_SCHEME`,e}return bl(e)}function bl(e){if(e.hostname!==``){let e=TypeError(`File URL host must be "localhost" or empty on darwin`);throw e.code=`ERR_INVALID_FILE_URL_HOST`,e}let t=e.pathname,n=-1;for(;++n<t.length;)if(t.codePointAt(n)===37&&t.codePointAt(n+1)===50){let e=t.codePointAt(n+2);if(e===70||e===102){let e=TypeError(`File URL path must not include encoded / characters`);throw e.code=`ERR_INVALID_FILE_URL_PATH`,e}}return decodeURIComponent(t)}var xl=[`history`,`path`,`basename`,`stem`,`extname`,`dirname`],Sl=class{constructor(e){let t;t=e?vl(e)?{path:e}:typeof e==`string`||El(e)?{value:e}:e:{},this.cwd=`cwd`in t?``:gl.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let n=-1;for(;++n<xl.length;){let e=xl[n];e in t&&t[e]!==void 0&&t[e]!==null&&(this[e]=e===`history`?[...t[e]]:t[e])}let r;for(r in t)xl.includes(r)||(this[r]=t[r])}get basename(){return typeof this.path==`string`?cl.basename(this.path):void 0}set basename(e){wl(e,`basename`),Cl(e,`basename`),this.path=cl.join(this.dirname||``,e)}get dirname(){return typeof this.path==`string`?cl.dirname(this.path):void 0}set dirname(e){Tl(this.basename,`dirname`),this.path=cl.join(e||``,this.basename)}get extname(){return typeof this.path==`string`?cl.extname(this.path):void 0}set extname(e){if(Cl(e,`extname`),Tl(this.dirname,`extname`),e){if(e.codePointAt(0)!==46)throw Error("`extname` must start with `.`");if(e.includes(`.`,1))throw Error("`extname` cannot contain multiple dots")}this.path=cl.join(this.dirname,this.stem+(e||``))}get path(){return this.history[this.history.length-1]}set path(e){vl(e)&&(e=yl(e)),wl(e,`path`),this.path!==e&&this.history.push(e)}get stem(){return typeof this.path==`string`?cl.basename(this.path,this.extname):void 0}set stem(e){wl(e,`stem`),Cl(e,`stem`),this.path=cl.join(this.dirname||``,e+(this.extname||``))}fail(e,t,n){let r=this.message(e,t,n);throw r.fatal=!0,r}info(e,t,n){let r=this.message(e,t,n);return r.fatal=void 0,r}message(e,t,n){let r=new hi(e,t,n);return this.path&&(r.name=this.path+`:`+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}toString(e){return this.value===void 0?``:typeof this.value==`string`?this.value:new TextDecoder(e||void 0).decode(this.value)}};function Cl(e,t){if(e&&e.includes(cl.sep))throw Error("`"+t+"` cannot be a path: did not expect `"+cl.sep+"`")}function wl(e,t){if(!e)throw Error("`"+t+"` cannot be empty")}function Tl(e,t){if(!e)throw Error("Setting `"+t+"` requires `path` to be set too")}function El(e){return!!(e&&typeof e==`object`&&`byteLength`in e&&`byteOffset`in e)}var Dl=(function(e){let t=this.constructor.prototype,n=t[e],r=function(){return n.apply(r,arguments)};return Object.setPrototypeOf(r,t),r}),K=l(il(),1),q={}.hasOwnProperty,J=new class e extends Dl{constructor(){super(`copy`),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=ol()}copy(){let t=new e,n=-1;for(;++n<this.attachers.length;){let e=this.attachers[n];t.use(...e)}return t.data((0,K.default)(!0,{},this.namespace)),t}data(e,t){return typeof e==`string`?arguments.length===2?(Ol(`data`,this.frozen),this.namespace[e]=t,this):q.call(this.namespace,e)&&this.namespace[e]||void 0:e?(Ol(`data`,this.frozen),this.namespace=e,this):this.namespace}freeze(){if(this.frozen)return this;let e=this;for(;++this.freezeIndex<this.attachers.length;){let[t,...n]=this.attachers[this.freezeIndex];if(n[0]===!1)continue;n[0]===!0&&(n[0]=void 0);let r=t.call(e,...n);typeof r==`function`&&this.transformers.use(r)}return this.frozen=!0,this.freezeIndex=1/0,this}parse(e){this.freeze();let t=jl(e),n=this.parser||this.Parser;return Y(`parse`,n),n(String(t),t)}process(e,t){let n=this;return this.freeze(),Y(`process`,this.parser||this.Parser),X(`process`,this.compiler||this.Compiler),t?r(void 0,t):new Promise(r);function r(r,i){let a=jl(e),o=n.parse(a);n.run(o,a,function(e,t,r){if(e||!t||!r)return s(e);let i=t,a=n.stringify(i,r);Nl(a)?r.value=a:r.result=a,s(e,r)});function s(e,n){e||!n?i(e):r?r(n):t(void 0,n)}}}processSync(e){let t=!1,n;return this.freeze(),Y(`processSync`,this.parser||this.Parser),X(`processSync`,this.compiler||this.Compiler),this.process(e,r),Al(`processSync`,`process`,t),n;function r(e,r){t=!0,rl(e),n=r}}run(e,t,n){kl(e),this.freeze();let r=this.transformers;return!n&&typeof t==`function`&&(n=t,t=void 0),n?i(void 0,n):new Promise(i);function i(i,a){let o=jl(t);r.run(e,o,s);function s(t,r,o){let s=r||e;t?a(t):i?i(s):n(void 0,s,o)}}}runSync(e,t){let n=!1,r;return this.run(e,t,i),Al(`runSync`,`run`,n),r;function i(e,t){rl(e),r=t,n=!0}}stringify(e,t){this.freeze();let n=jl(t),r=this.compiler||this.Compiler;return X(`stringify`,r),kl(e),r(e,n)}use(e,...t){let n=this.attachers,r=this.namespace;if(Ol(`use`,this.frozen),e!=null)if(typeof e==`function`)s(e,t);else if(typeof e==`object`)Array.isArray(e)?o(e):a(e);else throw TypeError("Expected usable value, not `"+e+"`");return this;function i(e){if(typeof e==`function`)s(e,[]);else if(typeof e==`object`)if(Array.isArray(e)){let[t,...n]=e;s(t,n)}else a(e);else throw TypeError("Expected usable value, not `"+e+"`")}function a(e){if(!(`plugins`in e)&&!(`settings`in e))throw Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");o(e.plugins),e.settings&&(r.settings=(0,K.default)(!0,r.settings,e.settings))}function o(e){let t=-1;if(e!=null)if(Array.isArray(e))for(;++t<e.length;){let n=e[t];i(n)}else throw TypeError("Expected a list of plugins, not `"+e+"`")}function s(e,t){let r=-1,i=-1;for(;++r<n.length;)if(n[r][0]===e){i=r;break}if(i===-1)n.push([e,...t]);else if(t.length>0){let[r,...a]=t,o=n[i][1];al(o)&&al(r)&&(r=(0,K.default)(!0,o,r)),n[i]=[e,r,...a]}}}}().freeze();function Y(e,t){if(typeof t!=`function`)throw TypeError("Cannot `"+e+"` without `parser`")}function X(e,t){if(typeof t!=`function`)throw TypeError("Cannot `"+e+"` without `compiler`")}function Ol(e,t){if(t)throw Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function kl(e){if(!al(e)||typeof e.type!=`string`)throw TypeError("Expected node, got `"+e+"`")}function Al(e,t,n){if(!n)throw Error("`"+e+"` finished async. Use `"+t+"` instead")}function jl(e){return Ml(e)?e:new Sl(e)}function Ml(e){return!!(e&&typeof e==`object`&&`message`in e&&`messages`in e)}function Nl(e){return typeof e==`string`||Pl(e)}function Pl(e){return!!(e&&typeof e==`object`&&`byteLength`in e&&`byteOffset`in e)}var Fl=[],Il={allowDangerousHtml:!0},Ll=/^(https?|ircs?|mailto|xmpp)$/i,Rl=[{from:`astPlugins`,id:`remove-buggy-html-in-markdown-parser`},{from:`allowDangerousHtml`,id:`remove-buggy-html-in-markdown-parser`},{from:`allowNode`,id:`replace-allownode-allowedtypes-and-disallowedtypes`,to:`allowElement`},{from:`allowedTypes`,id:`replace-allownode-allowedtypes-and-disallowedtypes`,to:`allowedElements`},{from:`className`,id:`remove-classname`},{from:`disallowedTypes`,id:`replace-allownode-allowedtypes-and-disallowedtypes`,to:`disallowedElements`},{from:`escapeHtml`,id:`remove-buggy-html-in-markdown-parser`},{from:`includeElementIndex`,id:`#remove-includeelementindex`},{from:`includeNodeIndex`,id:`change-includenodeindex-to-includeelementindex`},{from:`linkTarget`,id:`remove-linktarget`},{from:`plugins`,id:`change-plugins-to-remarkplugins`,to:`remarkPlugins`},{from:`rawSourcePos`,id:`#remove-rawsourcepos`},{from:`renderers`,id:`change-renderers-to-components`,to:`components`},{from:`source`,id:`change-source-to-children`,to:`children`},{from:`sourcePos`,id:`#remove-sourcepos`},{from:`transformImageUri`,id:`#add-urltransform`,to:`urlTransform`},{from:`transformLinkUri`,id:`#add-urltransform`,to:`urlTransform`}];function zl(e){let t=Bl(e),n=Vl(e);return Hl(t.runSync(t.parse(n),n),e)}function Bl(e){let t=e.rehypePlugins||Fl,n=e.remarkPlugins||Fl,r=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...Il}:Il;return J().use(Vs).use(n).use(nl,r).use(t)}function Vl(e){let t=e.children||``,n=new Sl;return typeof t==`string`?n.value=t:``+t,n}function Hl(e,t){let n=t.allowedElements,r=t.allowElement,i=t.components,a=t.disallowedElements,o=t.skipHtml,s=t.unwrapDisallowed,c=t.urlTransform||Ul;for(let e of Rl)Object.hasOwn(t,e.from)&&``+e.from+(e.to?"use `"+e.to+"` instead":`remove it`)+e.id;return Kc(e,l),Ci(e,{Fragment:M.Fragment,components:i,ignoreInvalidStyle:!0,jsx:M.jsx,jsxs:M.jsxs,passKeys:!0,passNode:!0});function l(e,t,i){if(e.type===`raw`&&i&&typeof t==`number`)return o?i.children.splice(t,1):i.children[t]={type:`text`,value:e.value},t;if(e.type===`element`){let t;for(t in Wi)if(Object.hasOwn(Wi,t)&&Object.hasOwn(e.properties,t)){let n=e.properties[t],r=Wi[t];(r===null||r.includes(e.tagName))&&(e.properties[t]=c(String(n||``),t,e))}}if(e.type===`element`){let o=n?!n.includes(e.tagName):a?a.includes(e.tagName):!1;if(!o&&r&&typeof t==`number`&&(o=!r(e,t,i)),o&&i&&typeof t==`number`)return s&&e.children?i.children.splice(t,1,...e.children):i.children.splice(t,1),t}}}function Ul(e){let t=e.indexOf(`:`),n=e.indexOf(`?`),r=e.indexOf(`#`),i=e.indexOf(`/`);return t===-1||i!==-1&&t>i||n!==-1&&t>n||r!==-1&&t>r||Ll.test(e.slice(0,t))?e:``}function Wl(e,t){let n=String(e);if(typeof t!=`string`)throw TypeError(`Expected character`);let r=0,i=n.indexOf(t);for(;i!==-1;)r++,i=n.indexOf(t,i+t.length);return r}function Gl(e){if(typeof e!=`string`)throw TypeError(`Expected a string`);return e.replace(/[|\\{}()[\]^$+*?.]/g,`\\$&`).replace(/-/g,`\\x2d`)}function Kl(e,t,n){let r=Fc((n||{}).ignore||[]),i=ql(t),a=-1;for(;++a<i.length;)Wc(e,`text`,o);function o(e,t){let n=-1,i;for(;++n<t.length;){let e=t[n],a=i?i.children:void 0;if(r(e,a?a.indexOf(e):void 0,i))return;i=e}if(i)return s(e,t)}function s(e,t){let n=t[t.length-1],r=i[a][0],o=i[a][1],s=0,c=n.children.indexOf(e),l=!1,u=[];r.lastIndex=0;let d=r.exec(e.value);for(;d;){let n=d.index,i={index:d.index,input:d.input,stack:[...t,e]},a=o(...d,i);if(typeof a==`string`&&(a=a.length>0?{type:`text`,value:a}:void 0),a===!1?r.lastIndex=n+1:(s!==n&&u.push({type:`text`,value:e.value.slice(s,n)}),Array.isArray(a)?u.push(...a):a&&u.push(a),s=n+d[0].length,l=!0),!r.global)break;d=r.exec(e.value)}return l?(s<e.value.length&&u.push({type:`text`,value:e.value.slice(s)}),n.children.splice(c,1,...u)):u=[e],c+u.length}}function ql(e){let t=[];if(!Array.isArray(e))throw TypeError(`Expected find and replace tuple or list of tuples`);let n=!e[0]||Array.isArray(e[0])?e:[e],r=-1;for(;++r<n.length;){let e=n[r];t.push([Jl(e[0]),Yl(e[1])])}return t}function Jl(e){return typeof e==`string`?new RegExp(Gl(e),`g`):e}function Yl(e){return typeof e==`function`?e:function(){return e}}var Xl=`phrasing`,Zl=[`autolink`,`link`,`image`,`label`];function Ql(){return{transforms:[ou],enter:{literalAutolink:eu,literalAutolinkEmail:tu,literalAutolinkHttp:tu,literalAutolinkWww:tu},exit:{literalAutolink:au,literalAutolinkEmail:iu,literalAutolinkHttp:nu,literalAutolinkWww:ru}}}function $l(){return{unsafe:[{character:`@`,before:`[+\\-.\\w]`,after:`[\\-.\\w]`,inConstruct:Xl,notInConstruct:Zl},{character:`.`,before:`[Ww]`,after:`[\\-.\\w]`,inConstruct:Xl,notInConstruct:Zl},{character:`:`,before:`[ps]`,after:`\\/`,inConstruct:Xl,notInConstruct:Zl}]}}function eu(e){this.enter({type:`link`,title:null,url:``,children:[]},e)}function tu(e){this.config.enter.autolinkProtocol.call(this,e)}function nu(e){this.config.exit.autolinkProtocol.call(this,e)}function ru(e){this.config.exit.data.call(this,e);let t=this.stack[this.stack.length-1];t.type,t.url=`http://`+this.sliceSerialize(e)}function iu(e){this.config.exit.autolinkEmail.call(this,e)}function au(e){this.exit(e)}function ou(e){Kl(e,[[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi,su],[/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu,cu]],{ignore:[`link`,`linkReference`]})}function su(e,t,n,r,i){let a=``;if(!du(i)||(/^w/i.test(t)&&(n=t+n,t=``,a=`http://`),!lu(n)))return!1;let o=uu(n+r);if(!o[0])return!1;let s={type:`link`,title:null,url:a+t+o[0],children:[{type:`text`,value:t+o[0]}]};return o[1]?[s,{type:`text`,value:o[1]}]:s}function cu(e,t,n,r){return!du(r,!0)||/[-\d_]$/.test(n)?!1:{type:`link`,title:null,url:`mailto:`+t+`@`+n,children:[{type:`text`,value:t+`@`+n}]}}function lu(e){let t=e.split(`.`);return!(t.length<2||t[t.length-1]&&(/_/.test(t[t.length-1])||!/[a-zA-Z\d]/.test(t[t.length-1]))||t[t.length-2]&&(/_/.test(t[t.length-2])||!/[a-zA-Z\d]/.test(t[t.length-2])))}function uu(e){let t=/[!"&'),.:;<>?\]}]+$/.exec(e);if(!t)return[e,void 0];e=e.slice(0,t.index);let n=t[0],r=n.indexOf(`)`),i=Wl(e,`(`),a=Wl(e,`)`);for(;r!==-1&&i>a;)e+=n.slice(0,r+1),n=n.slice(r+1),r=n.indexOf(`)`),a++;return[e,n]}function du(e,t){let n=e.input.charCodeAt(e.index-1);return(e.index===0||ma(n)||pa(n))&&(!t||n!==47)}xu.peek=bu;function fu(){this.buffer()}function pu(e){this.enter({type:`footnoteReference`,identifier:``,label:``},e)}function mu(){this.buffer()}function hu(e){this.enter({type:`footnoteDefinition`,identifier:``,label:``,children:[]},e)}function gu(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=aa(this.sliceSerialize(e)).toLowerCase(),n.label=t}function _u(e){this.exit(e)}function vu(e){let t=this.resume(),n=this.stack[this.stack.length-1];n.type,n.identifier=aa(this.sliceSerialize(e)).toLowerCase(),n.label=t}function yu(e){this.exit(e)}function bu(){return`[`}function xu(e,t,n,r){let i=n.createTracker(r),a=i.move(`[^`),o=n.enter(`footnoteReference`),s=n.enter(`reference`);return a+=i.move(n.safe(n.associationId(e),{after:`]`,before:a})),s(),o(),a+=i.move(`]`),a}function Su(){return{enter:{gfmFootnoteCallString:fu,gfmFootnoteCall:pu,gfmFootnoteDefinitionLabelString:mu,gfmFootnoteDefinition:hu},exit:{gfmFootnoteCallString:gu,gfmFootnoteCall:_u,gfmFootnoteDefinitionLabelString:vu,gfmFootnoteDefinition:yu}}}function Cu(e){let t=!1;return e&&e.firstLineBlank&&(t=!0),{handlers:{footnoteDefinition:n,footnoteReference:xu},unsafe:[{character:`[`,inConstruct:[`label`,`phrasing`,`reference`]}]};function n(e,n,r,i){let a=r.createTracker(i),o=a.move(`[^`),s=r.enter(`footnoteDefinition`),c=r.enter(`label`);return o+=a.move(r.safe(r.associationId(e),{before:o,after:`]`})),c(),o+=a.move(`]:`),e.children&&e.children.length>0&&(a.shift(4),o+=a.move((t?`
`:` `)+r.indentLines(r.containerFlow(e,a.current()),t?Tu:wu))),s(),o}}function wu(e,t,n){return t===0?e:Tu(e,t,n)}function Tu(e,t,n){return(n?``:`    `)+e}var Eu=[`autolink`,`destinationLiteral`,`destinationRaw`,`reference`,`titleQuote`,`titleApostrophe`];ju.peek=Z;function Du(){return{canContainEols:[`delete`],enter:{strikethrough:ku},exit:{strikethrough:Au}}}function Ou(){return{unsafe:[{character:`~`,inConstruct:`phrasing`,notInConstruct:Eu}],handlers:{delete:ju}}}function ku(e){this.enter({type:`delete`,children:[]},e)}function Au(e){this.exit(e)}function ju(e,t,n,r){let i=n.createTracker(r),a=n.enter(`strikethrough`),o=i.move(`~~`);return o+=n.containerPhrasing(e,{...i.current(),before:o,after:`~`}),o+=i.move(`~~`),a(),o}function Z(){return`~`}function Mu(e){return e.length}function Nu(e,t){let n=t||{},r=(n.align||[]).concat(),i=n.stringLength||Mu,a=[],o=[],s=[],c=[],l=0,u=-1;for(;++u<e.length;){let t=[],r=[],a=-1;for(e[u].length>l&&(l=e[u].length);++a<e[u].length;){let o=Pu(e[u][a]);if(n.alignDelimiters!==!1){let e=i(o);r[a]=e,(c[a]===void 0||e>c[a])&&(c[a]=e)}t.push(o)}o[u]=t,s[u]=r}let d=-1;if(typeof r==`object`&&`length`in r)for(;++d<l;)a[d]=Fu(r[d]);else{let e=Fu(r);for(;++d<l;)a[d]=e}d=-1;let f=[],p=[];for(;++d<l;){let e=a[d],t=``,r=``;e===99?(t=`:`,r=`:`):e===108?t=`:`:e===114&&(r=`:`);let i=n.alignDelimiters===!1?1:Math.max(1,c[d]-t.length-r.length),o=t+`-`.repeat(i)+r;n.alignDelimiters!==!1&&(i=t.length+i+r.length,i>c[d]&&(c[d]=i),p[d]=i),f[d]=o}o.splice(1,0,f),s.splice(1,0,p),u=-1;let m=[];for(;++u<o.length;){let e=o[u],t=s[u];d=-1;let r=[];for(;++d<l;){let i=e[d]||``,o=``,s=``;if(n.alignDelimiters!==!1){let e=c[d]-(t[d]||0),n=a[d];n===114?o=` `.repeat(e):n===99?e%2?(o=` `.repeat(e/2+.5),s=` `.repeat(e/2-.5)):(o=` `.repeat(e/2),s=o):s=` `.repeat(e)}n.delimiterStart!==!1&&!d&&r.push(`|`),n.padding!==!1&&!(n.alignDelimiters===!1&&i===``)&&(n.delimiterStart!==!1||d)&&r.push(` `),n.alignDelimiters!==!1&&r.push(o),r.push(i),n.alignDelimiters!==!1&&r.push(s),n.padding!==!1&&r.push(` `),(n.delimiterEnd!==!1||d!==l-1)&&r.push(`|`)}m.push(n.delimiterEnd===!1?r.join(``).replace(/ +$/,``):r.join(``))}return m.join(`
`)}function Pu(e){return e==null?``:String(e)}function Fu(e){let t=typeof e==`string`?e.codePointAt(0):0;return t===67||t===99?99:t===76||t===108?108:t===82||t===114?114:0}function Iu(e,t,n,r){let i=n.enter(`blockquote`),a=n.createTracker(r);a.move(`> `),a.shift(2);let o=n.indentLines(n.containerFlow(e,a.current()),Lu);return i(),o}function Lu(e,t,n){return`>`+(n?``:` `)+e}function Ru(e,t){return zu(e,t.inConstruct,!0)&&!zu(e,t.notInConstruct,!1)}function zu(e,t,n){if(typeof t==`string`&&(t=[t]),!t||t.length===0)return n;let r=-1;for(;++r<t.length;)if(e.includes(t[r]))return!0;return!1}function Bu(e,t,n,r){let i=-1;for(;++i<n.unsafe.length;)if(n.unsafe[i].character===`
`&&Ru(n.stack,n.unsafe[i]))return/[ \t]/.test(r.before)?``:` `;return`\\
`}function Vu(e,t){let n=String(e),r=n.indexOf(t),i=r,a=0,o=0;if(typeof t!=`string`)throw TypeError(`Expected substring`);for(;r!==-1;)r===i?++a>o&&(o=a):a=1,i=r+t.length,r=n.indexOf(t,i);return o}function Hu(e,t){return!!(t.options.fences===!1&&e.value&&!e.lang&&/[^ \r\n]/.test(e.value)&&!/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value))}function Uu(e){let t=e.options.fence||"`";if(t!=="`"&&t!==`~`)throw Error("Cannot serialize code with `"+t+"` for `options.fence`, expected `` ` `` or `~`");return t}function Wu(e,t,n,r){let i=Uu(n),a=e.value||``,o=i==="`"?`GraveAccent`:`Tilde`;if(Hu(e,n)){let e=n.enter(`codeIndented`),t=n.indentLines(a,Gu);return e(),t}let s=n.createTracker(r),c=i.repeat(Math.max(Vu(a,i)+1,3)),l=n.enter(`codeFenced`),u=s.move(c);if(e.lang){let t=n.enter(`codeFencedLang${o}`);u+=s.move(n.safe(e.lang,{before:u,after:` `,encode:["`"],...s.current()})),t()}if(e.lang&&e.meta){let t=n.enter(`codeFencedMeta${o}`);u+=s.move(` `),u+=s.move(n.safe(e.meta,{before:u,after:`
`,encode:["`"],...s.current()})),t()}return u+=s.move(`
`),a&&(u+=s.move(a+`
`)),u+=s.move(c),l(),u}function Gu(e,t,n){return(n?``:`    `)+e}function Ku(e){let t=e.options.quote||`"`;if(t!==`"`&&t!==`'`)throw Error("Cannot serialize title with `"+t+"` for `options.quote`, expected `\"`, or `'`");return t}function qu(e,t,n,r){let i=Ku(n),a=i===`"`?`Quote`:`Apostrophe`,o=n.enter(`definition`),s=n.enter(`label`),c=n.createTracker(r),l=c.move(`[`);return l+=c.move(n.safe(n.associationId(e),{before:l,after:`]`,...c.current()})),l+=c.move(`]: `),s(),!e.url||/[\0- \u007F]/.test(e.url)?(s=n.enter(`destinationLiteral`),l+=c.move(`<`),l+=c.move(n.safe(e.url,{before:l,after:`>`,...c.current()})),l+=c.move(`>`)):(s=n.enter(`destinationRaw`),l+=c.move(n.safe(e.url,{before:l,after:e.title?` `:`
`,...c.current()}))),s(),e.title&&(s=n.enter(`title${a}`),l+=c.move(` `+i),l+=c.move(n.safe(e.title,{before:l,after:i,...c.current()})),l+=c.move(i),s()),o(),l}function Ju(e){let t=e.options.emphasis||`*`;if(t!==`*`&&t!==`_`)throw Error("Cannot serialize emphasis with `"+t+"` for `options.emphasis`, expected `*`, or `_`");return t}function Yu(e){return`&#x`+e.toString(16).toUpperCase()+`;`}function Xu(e,t,n){let r=Ca(e),i=Ca(t);return r===void 0?i===void 0?n===`_`?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!0}:r===1?i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!0}:{inside:!1,outside:!1}:i===void 0?{inside:!1,outside:!1}:i===1?{inside:!0,outside:!1}:{inside:!1,outside:!1}}Zu.peek=Qu;function Zu(e,t,n,r){let i=Ju(n),a=n.enter(`emphasis`),o=n.createTracker(r),s=o.move(i),c=o.move(n.containerPhrasing(e,{after:i,before:s,...o.current()})),l=c.charCodeAt(0),u=Xu(r.before.charCodeAt(r.before.length-1),l,i);u.inside&&(c=Yu(l)+c.slice(1));let d=c.charCodeAt(c.length-1),f=Xu(r.after.charCodeAt(0),d,i);f.inside&&(c=c.slice(0,-1)+Yu(d));let p=o.move(i);return a(),n.attentionEncodeSurroundingInfo={after:f.outside,before:u.outside},s+c+p}function Qu(e,t,n){return n.options.emphasis||`*`}function $u(e,t){let n=!1;return Kc(e,function(e){if(`value`in e&&/\r?\n|\r/.test(e.value)||e.type===`break`)return n=!0,!1}),!!((!e.depth||e.depth<3)&&Ki(e)&&(t.options.setext||n))}function ed(e,t,n,r){let i=Math.max(Math.min(6,e.depth||1),1),a=n.createTracker(r);if($u(e,n)){let t=n.enter(`headingSetext`),r=n.enter(`phrasing`),o=n.containerPhrasing(e,{...a.current(),before:`
`,after:`
`});return r(),t(),o+`
`+(i===1?`=`:`-`).repeat(o.length-(Math.max(o.lastIndexOf(`\r`),o.lastIndexOf(`
`))+1))}let o=`#`.repeat(i),s=n.enter(`headingAtx`),c=n.enter(`phrasing`);a.move(o+` `);let l=n.containerPhrasing(e,{before:`# `,after:`
`,...a.current()});return/^[\t ]/.test(l)&&(l=Yu(l.charCodeAt(0))+l.slice(1)),l=l?o+` `+l:o,n.options.closeAtx&&(l+=` `+o),c(),s(),l}td.peek=nd;function td(e){return e.value||``}function nd(){return`<`}rd.peek=id;function rd(e,t,n,r){let i=Ku(n),a=i===`"`?`Quote`:`Apostrophe`,o=n.enter(`image`),s=n.enter(`label`),c=n.createTracker(r),l=c.move(`![`);return l+=c.move(n.safe(e.alt,{before:l,after:`]`,...c.current()})),l+=c.move(`](`),s(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(s=n.enter(`destinationLiteral`),l+=c.move(`<`),l+=c.move(n.safe(e.url,{before:l,after:`>`,...c.current()})),l+=c.move(`>`)):(s=n.enter(`destinationRaw`),l+=c.move(n.safe(e.url,{before:l,after:e.title?` `:`)`,...c.current()}))),s(),e.title&&(s=n.enter(`title${a}`),l+=c.move(` `+i),l+=c.move(n.safe(e.title,{before:l,after:i,...c.current()})),l+=c.move(i),s()),l+=c.move(`)`),o(),l}function id(){return`!`}ad.peek=od;function ad(e,t,n,r){let i=e.referenceType,a=n.enter(`imageReference`),o=n.enter(`label`),s=n.createTracker(r),c=s.move(`![`),l=n.safe(e.alt,{before:c,after:`]`,...s.current()});c+=s.move(l+`][`),o();let u=n.stack;n.stack=[],o=n.enter(`reference`);let d=n.safe(n.associationId(e),{before:c,after:`]`,...s.current()});return o(),n.stack=u,a(),i===`full`||!l||l!==d?c+=s.move(d+`]`):i===`shortcut`?c=c.slice(0,-1):c+=s.move(`]`),c}function od(){return`!`}Q.peek=sd;function Q(e,t,n){let r=e.value||``,i="`",a=-1;for(;RegExp("(^|[^`])"+i+"([^`]|$)").test(r);)i+="`";for(/[^ \r\n]/.test(r)&&(/^[ \r\n]/.test(r)&&/[ \r\n]$/.test(r)||/^`|`$/.test(r))&&(r=` `+r+` `);++a<n.unsafe.length;){let e=n.unsafe[a],t=n.compilePattern(e),i;if(e.atBreak)for(;i=t.exec(r);){let e=i.index;r.charCodeAt(e)===10&&r.charCodeAt(e-1)===13&&e--,r=r.slice(0,e)+` `+r.slice(i.index+1)}}return i+r+i}function sd(){return"`"}function cd(e,t){let n=Ki(e);return!!(!t.options.resourceLink&&e.url&&!e.title&&e.children&&e.children.length===1&&e.children[0].type===`text`&&(n===e.url||`mailto:`+n===e.url)&&/^[a-z][a-z+.-]+:/i.test(e.url)&&!/[\0- <>\u007F]/.test(e.url))}ld.peek=ud;function ld(e,t,n,r){let i=Ku(n),a=i===`"`?`Quote`:`Apostrophe`,o=n.createTracker(r),s,c;if(cd(e,n)){let t=n.stack;n.stack=[],s=n.enter(`autolink`);let r=o.move(`<`);return r+=o.move(n.containerPhrasing(e,{before:r,after:`>`,...o.current()})),r+=o.move(`>`),s(),n.stack=t,r}s=n.enter(`link`),c=n.enter(`label`);let l=o.move(`[`);return l+=o.move(n.containerPhrasing(e,{before:l,after:`](`,...o.current()})),l+=o.move(`](`),c(),!e.url&&e.title||/[\0- \u007F]/.test(e.url)?(c=n.enter(`destinationLiteral`),l+=o.move(`<`),l+=o.move(n.safe(e.url,{before:l,after:`>`,...o.current()})),l+=o.move(`>`)):(c=n.enter(`destinationRaw`),l+=o.move(n.safe(e.url,{before:l,after:e.title?` `:`)`,...o.current()}))),c(),e.title&&(c=n.enter(`title${a}`),l+=o.move(` `+i),l+=o.move(n.safe(e.title,{before:l,after:i,...o.current()})),l+=o.move(i),c()),l+=o.move(`)`),s(),l}function ud(e,t,n){return cd(e,n)?`<`:`[`}dd.peek=fd;function dd(e,t,n,r){let i=e.referenceType,a=n.enter(`linkReference`),o=n.enter(`label`),s=n.createTracker(r),c=s.move(`[`),l=n.containerPhrasing(e,{before:c,after:`]`,...s.current()});c+=s.move(l+`][`),o();let u=n.stack;n.stack=[],o=n.enter(`reference`);let d=n.safe(n.associationId(e),{before:c,after:`]`,...s.current()});return o(),n.stack=u,a(),i===`full`||!l||l!==d?c+=s.move(d+`]`):i===`shortcut`?c=c.slice(0,-1):c+=s.move(`]`),c}function fd(){return`[`}function pd(e){let t=e.options.bullet||`*`;if(t!==`*`&&t!==`+`&&t!==`-`)throw Error("Cannot serialize items with `"+t+"` for `options.bullet`, expected `*`, `+`, or `-`");return t}function md(e){let t=pd(e),n=e.options.bulletOther;if(!n)return t===`*`?`-`:`*`;if(n!==`*`&&n!==`+`&&n!==`-`)throw Error("Cannot serialize items with `"+n+"` for `options.bulletOther`, expected `*`, `+`, or `-`");if(n===t)throw Error("Expected `bullet` (`"+t+"`) and `bulletOther` (`"+n+"`) to be different");return n}function hd(e){let t=e.options.bulletOrdered||`.`;if(t!==`.`&&t!==`)`)throw Error("Cannot serialize items with `"+t+"` for `options.bulletOrdered`, expected `.` or `)`");return t}function gd(e){let t=e.options.rule||`*`;if(t!==`*`&&t!==`-`&&t!==`_`)throw Error("Cannot serialize rules with `"+t+"` for `options.rule`, expected `*`, `-`, or `_`");return t}function _d(e,t,n,r){let i=n.enter(`list`),a=n.bulletCurrent,o=e.ordered?hd(n):pd(n),s=e.ordered?o===`.`?`)`:`.`:md(n),c=t&&n.bulletLastUsed?o===n.bulletLastUsed:!1;if(!e.ordered){let t=e.children?e.children[0]:void 0;if((o===`*`||o===`-`)&&t&&(!t.children||!t.children[0])&&n.stack[n.stack.length-1]===`list`&&n.stack[n.stack.length-2]===`listItem`&&n.stack[n.stack.length-3]===`list`&&n.stack[n.stack.length-4]===`listItem`&&n.indexStack[n.indexStack.length-1]===0&&n.indexStack[n.indexStack.length-2]===0&&n.indexStack[n.indexStack.length-3]===0&&(c=!0),gd(n)===o&&t){let t=-1;for(;++t<e.children.length;){let n=e.children[t];if(n&&n.type===`listItem`&&n.children&&n.children[0]&&n.children[0].type===`thematicBreak`){c=!0;break}}}}c&&(o=s),n.bulletCurrent=o;let l=n.containerFlow(e,r);return n.bulletLastUsed=o,n.bulletCurrent=a,i(),l}function vd(e){let t=e.options.listItemIndent||`one`;if(t!==`tab`&&t!==`one`&&t!==`mixed`)throw Error("Cannot serialize items with `"+t+"` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");return t}function yd(e,t,n,r){let i=vd(n),a=n.bulletCurrent||pd(n);t&&t.type===`list`&&t.ordered&&(a=(typeof t.start==`number`&&t.start>-1?t.start:1)+(n.options.incrementListMarker===!1?0:t.children.indexOf(e))+a);let o=a.length+1;(i===`tab`||i===`mixed`&&(t&&t.type===`list`&&t.spread||e.spread))&&(o=Math.ceil(o/4)*4);let s=n.createTracker(r);s.move(a+` `.repeat(o-a.length)),s.shift(o);let c=n.enter(`listItem`),l=n.indentLines(n.containerFlow(e,s.current()),u);return c(),l;function u(e,t,n){return t?(n?``:` `.repeat(o))+e:(n?a:a+` `.repeat(o-a.length))+e}}function bd(e,t,n,r){let i=n.enter(`paragraph`),a=n.enter(`phrasing`),o=n.containerPhrasing(e,r);return a(),i(),o}var $=Fc([`break`,`delete`,`emphasis`,`footnote`,`footnoteReference`,`image`,`imageReference`,`inlineCode`,`inlineMath`,`link`,`linkReference`,`mdxJsxTextElement`,`mdxTextExpression`,`strong`,`text`,`textDirective`]);function xd(e,t,n,r){return(e.children.some(function(e){return $(e)})?n.containerPhrasing:n.containerFlow).call(n,e,r)}function Sd(e){let t=e.options.strong||`*`;if(t!==`*`&&t!==`_`)throw Error("Cannot serialize strong with `"+t+"` for `options.strong`, expected `*`, or `_`");return t}Cd.peek=wd;function Cd(e,t,n,r){let i=Sd(n),a=n.enter(`strong`),o=n.createTracker(r),s=o.move(i+i),c=o.move(n.containerPhrasing(e,{after:i,before:s,...o.current()})),l=c.charCodeAt(0),u=Xu(r.before.charCodeAt(r.before.length-1),l,i);u.inside&&(c=Yu(l)+c.slice(1));let d=c.charCodeAt(c.length-1),f=Xu(r.after.charCodeAt(0),d,i);f.inside&&(c=c.slice(0,-1)+Yu(d));let p=o.move(i+i);return a(),n.attentionEncodeSurroundingInfo={after:f.outside,before:u.outside},s+c+p}function wd(e,t,n){return n.options.strong||`*`}function Td(e,t,n,r){return n.safe(e.value,r)}function Ed(e){let t=e.options.ruleRepetition||3;if(t<3)throw Error("Cannot serialize rules with repetition `"+t+"` for `options.ruleRepetition`, expected `3` or more");return t}function Dd(e,t,n){let r=(gd(n)+(n.options.ruleSpaces?` `:``)).repeat(Ed(n));return n.options.ruleSpaces?r.slice(0,-1):r}var Od={blockquote:Iu,break:Bu,code:Wu,definition:qu,emphasis:Zu,hardBreak:Bu,heading:ed,html:td,image:rd,imageReference:ad,inlineCode:Q,link:ld,linkReference:dd,list:_d,listItem:yd,paragraph:bd,root:xd,strong:Cd,text:Td,thematicBreak:Dd};function kd(){return{enter:{table:Ad,tableData:Pd,tableHeader:Pd,tableRow:Md},exit:{codeText:Fd,table:jd,tableData:Nd,tableHeader:Nd,tableRow:Nd}}}function Ad(e){let t=e._align;this.enter({type:`table`,align:t.map(function(e){return e===`none`?null:e}),children:[]},e),this.data.inTable=!0}function jd(e){this.exit(e),this.data.inTable=void 0}function Md(e){this.enter({type:`tableRow`,children:[]},e)}function Nd(e){this.exit(e)}function Pd(e){this.enter({type:`tableCell`,children:[]},e)}function Fd(e){let t=this.resume();this.data.inTable&&(t=t.replace(/\\([\\|])/g,Id));let n=this.stack[this.stack.length-1];n.type,n.value=t,this.exit(e)}function Id(e,t){return t===`|`?t:e}function Ld(e){let t=e||{},n=t.tableCellPadding,r=t.tablePipeAlign,i=t.stringLength,a=n?` `:`|`;return{unsafe:[{character:`\r`,inConstruct:`tableCell`},{character:`
`,inConstruct:`tableCell`},{atBreak:!0,character:`|`,after:`[	 :-]`},{character:`|`,inConstruct:`tableCell`},{atBreak:!0,character:`:`,after:`-`},{atBreak:!0,character:`-`,after:`[:|-]`}],handlers:{inlineCode:f,table:o,tableCell:c,tableRow:s}};function o(e,t,n,r){return l(u(e,n,r),e.align)}function s(e,t,n,r){let i=l([d(e,n,r)]);return i.slice(0,i.indexOf(`
`))}function c(e,t,n,r){let i=n.enter(`tableCell`),o=n.enter(`phrasing`),s=n.containerPhrasing(e,{...r,before:a,after:a});return o(),i(),s}function l(e,t){return Nu(e,{align:t,alignDelimiters:r,padding:n,stringLength:i})}function u(e,t,n){let r=e.children,i=-1,a=[],o=t.enter(`table`);for(;++i<r.length;)a[i]=d(r[i],t,n);return o(),a}function d(e,t,n){let r=e.children,i=-1,a=[],o=t.enter(`tableRow`);for(;++i<r.length;)a[i]=c(r[i],e,t,n);return o(),a}function f(e,t,n){let r=Od.inlineCode(e,t,n);return n.stack.includes(`tableCell`)&&(r=r.replace(/\|/g,`\\$&`)),r}}function Rd(){return{exit:{taskListCheckValueChecked:Bd,taskListCheckValueUnchecked:Bd,paragraph:Vd}}}function zd(){return{unsafe:[{atBreak:!0,character:`-`,after:`[:|-]`}],handlers:{listItem:Hd}}}function Bd(e){let t=this.stack[this.stack.length-2];t.type,t.checked=e.type===`taskListCheckValueChecked`}function Vd(e){let t=this.stack[this.stack.length-2];if(t&&t.type===`listItem`&&typeof t.checked==`boolean`){let e=this.stack[this.stack.length-1];e.type;let n=e.children[0];if(n&&n.type===`text`){let r=t.children,i=-1,a;for(;++i<r.length;){let e=r[i];if(e.type===`paragraph`){a=e;break}}a===e&&(n.value=n.value.slice(1),n.value.length===0?e.children.shift():e.position&&n.position&&typeof n.position.start.offset==`number`&&(n.position.start.column++,n.position.start.offset++,e.position.start=Object.assign({},n.position.start)))}}this.exit(e)}function Hd(e,t,n,r){let i=e.children[0],a=typeof e.checked==`boolean`&&i&&i.type===`paragraph`,o=`[`+(e.checked?`x`:` `)+`] `,s=n.createTracker(r);a&&s.move(o);let c=Od.listItem(e,t,n,{...r,...s.current()});return a&&(c=c.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/,l)),c;function l(e){return e+o}}function Ud(){return[Ql(),Su(),Du(),kd(),Rd()]}function Wd(e){return{extensions:[$l(),Cu(e),Ou(),Ld(e),zd()]}}var Gd={tokenize:of,partial:!0},Kd={tokenize:sf,partial:!0},qd={tokenize:cf,partial:!0},Jd={tokenize:lf,partial:!0},Yd={tokenize:uf,partial:!0},Xd={name:`wwwAutolink`,tokenize:rf,previous:df},Zd={name:`protocolAutolink`,tokenize:af,previous:ff},Qd={name:`emailAutolink`,tokenize:nf,previous:pf},$d={};function ef(){return{text:$d}}for(var tf=48;tf<123;)$d[tf]=Qd,tf++,tf===58?tf=65:tf===91&&(tf=97);$d[43]=Qd,$d[45]=Qd,$d[46]=Qd,$d[95]=Qd,$d[72]=[Qd,Zd],$d[104]=[Qd,Zd],$d[87]=[Qd,Xd],$d[119]=[Qd,Xd];function nf(e,t,n){let r=this,i,a;return o;function o(t){return!mf(t)||!pf.call(r,r.previous)||hf(r.events)?n(t):(e.enter(`literalAutolink`),e.enter(`literalAutolinkEmail`),s(t))}function s(t){return mf(t)?(e.consume(t),s):t===64?(e.consume(t),c):n(t)}function c(t){return t===46?e.check(Yd,u,l)(t):t===45||t===95||sa(t)?(a=!0,e.consume(t),c):u(t)}function l(t){return e.consume(t),i=!0,c}function u(o){return a&&i&&oa(r.previous)?(e.exit(`literalAutolinkEmail`),e.exit(`literalAutolink`),t(o)):n(o)}}function rf(e,t,n){let r=this;return i;function i(t){return t!==87&&t!==119||!df.call(r,r.previous)||hf(r.events)?n(t):(e.enter(`literalAutolink`),e.enter(`literalAutolinkWww`),e.check(Gd,e.attempt(Kd,e.attempt(qd,a),n),n)(t))}function a(n){return e.exit(`literalAutolinkWww`),e.exit(`literalAutolink`),t(n)}}function af(e,t,n){let r=this,i=``,a=!1;return o;function o(t){return(t===72||t===104)&&ff.call(r,r.previous)&&!hf(r.events)?(e.enter(`literalAutolink`),e.enter(`literalAutolinkHttp`),i+=String.fromCodePoint(t),e.consume(t),s):n(t)}function s(t){if(oa(t)&&i.length<5)return i+=String.fromCodePoint(t),e.consume(t),s;if(t===58){let n=i.toLowerCase();if(n===`http`||n===`https`)return e.consume(t),c}return n(t)}function c(t){return t===47?(e.consume(t),a?l:(a=!0,c)):n(t)}function l(t){return t===null||la(t)||V(t)||ma(t)||pa(t)?n(t):e.attempt(Kd,e.attempt(qd,u),n)(t)}function u(n){return e.exit(`literalAutolinkHttp`),e.exit(`literalAutolink`),t(n)}}function of(e,t,n){let r=0;return i;function i(t){return(t===87||t===119)&&r<3?(r++,e.consume(t),i):t===46&&r===3?(e.consume(t),a):n(t)}function a(e){return e===null?n(e):t(e)}}function sf(e,t,n){let r,i,a;return o;function o(t){return t===46||t===95?e.check(Jd,c,s)(t):t===null||V(t)||ma(t)||t!==45&&pa(t)?c(t):(a=!0,e.consume(t),o)}function s(t){return t===95?r=!0:(i=r,r=void 0),e.consume(t),o}function c(e){return i||r||!a?n(e):t(e)}}function cf(e,t){let n=0,r=0;return i;function i(o){return o===40?(n++,e.consume(o),i):o===41&&r<n?a(o):o===33||o===34||o===38||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===60||o===63||o===93||o===95||o===126?e.check(Jd,t,a)(o):o===null||V(o)||ma(o)?t(o):(e.consume(o),i)}function a(t){return t===41&&r++,e.consume(t),i}}function lf(e,t,n){return r;function r(o){return o===33||o===34||o===39||o===41||o===42||o===44||o===46||o===58||o===59||o===63||o===95||o===126?(e.consume(o),r):o===38?(e.consume(o),a):o===93?(e.consume(o),i):o===60||o===null||V(o)||ma(o)?t(o):n(o)}function i(e){return e===null||e===40||e===91||V(e)||ma(e)?t(e):r(e)}function a(e){return oa(e)?o(e):n(e)}function o(t){return t===59?(e.consume(t),r):oa(t)?(e.consume(t),o):n(t)}}function uf(e,t,n){return r;function r(t){return e.consume(t),i}function i(e){return sa(e)?n(e):t(e)}}function df(e){return e===null||e===40||e===42||e===95||e===91||e===93||e===126||V(e)}function ff(e){return!oa(e)}function pf(e){return!(e===47||mf(e))}function mf(e){return e===43||e===45||e===46||e===95||sa(e)}function hf(e){let t=e.length,n=!1;for(;t--;){let r=e[t][1];if((r.type===`labelLink`||r.type===`labelImage`)&&!r._balanced){n=!0;break}if(r._gfmAutolinkLiteralWalkedInto){n=!1;break}}return e.length>0&&!n&&(e[e.length-1][1]._gfmAutolinkLiteralWalkedInto=!0),n}var gf={tokenize:wf,partial:!0};function _f(){return{document:{91:{name:`gfmFootnoteDefinition`,tokenize:xf,continuation:{tokenize:Sf},exit:Cf}},text:{91:{name:`gfmFootnoteCall`,tokenize:bf},93:{name:`gfmPotentialFootnoteCall`,add:`after`,tokenize:vf,resolveTo:yf}}}}function vf(e,t,n){let r=this,i=r.events.length,a=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),o;for(;i--;){let e=r.events[i][1];if(e.type===`labelImage`){o=e;break}if(e.type===`gfmFootnoteCall`||e.type===`labelLink`||e.type===`label`||e.type===`image`||e.type===`link`)break}return s;function s(i){if(!o||!o._balanced)return n(i);let s=aa(r.sliceSerialize({start:o.end,end:r.now()}));return s.codePointAt(0)!==94||!a.includes(s.slice(1))?n(i):(e.enter(`gfmFootnoteCallLabelMarker`),e.consume(i),e.exit(`gfmFootnoteCallLabelMarker`),t(i))}}function yf(e,t){let n=e.length;for(;n--;)if(e[n][1].type===`labelImage`&&e[n][0]===`enter`){e[n][1];break}e[n+1][1].type=`data`,e[n+3][1].type=`gfmFootnoteCallLabelMarker`;let r={type:`gfmFootnoteCall`,start:Object.assign({},e[n+3][1].start),end:Object.assign({},e[e.length-1][1].end)},i={type:`gfmFootnoteCallMarker`,start:Object.assign({},e[n+3][1].end),end:Object.assign({},e[n+3][1].end)};i.end.column++,i.end.offset++,i.end._bufferIndex++;let a={type:`gfmFootnoteCallString`,start:Object.assign({},i.end),end:Object.assign({},e[e.length-1][1].start)},o={type:`chunkString`,contentType:`string`,start:Object.assign({},a.start),end:Object.assign({},a.end)},s=[e[n+1],e[n+2],[`enter`,r,t],e[n+3],e[n+4],[`enter`,i,t],[`exit`,i,t],[`enter`,a,t],[`enter`,o,t],[`exit`,o,t],[`exit`,a,t],e[e.length-2],e[e.length-1],[`exit`,r,t]];return e.splice(n,e.length-n+1,...s),e}function bf(e,t,n){let r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),a=0,o;return s;function s(t){return e.enter(`gfmFootnoteCall`),e.enter(`gfmFootnoteCallLabelMarker`),e.consume(t),e.exit(`gfmFootnoteCallLabelMarker`),c}function c(t){return t===94?(e.enter(`gfmFootnoteCallMarker`),e.consume(t),e.exit(`gfmFootnoteCallMarker`),e.enter(`gfmFootnoteCallString`),e.enter(`chunkString`).contentType=`string`,l):n(t)}function l(s){if(a>999||s===93&&!o||s===null||s===91||V(s))return n(s);if(s===93){e.exit(`chunkString`);let a=e.exit(`gfmFootnoteCallString`);return i.includes(aa(r.sliceSerialize(a)))?(e.enter(`gfmFootnoteCallLabelMarker`),e.consume(s),e.exit(`gfmFootnoteCallLabelMarker`),e.exit(`gfmFootnoteCall`),t):n(s)}return V(s)||(o=!0),a++,e.consume(s),s===92?u:l}function u(t){return t===91||t===92||t===93?(e.consume(t),a++,l):l(t)}}function xf(e,t,n){let r=this,i=r.parser.gfmFootnotes||(r.parser.gfmFootnotes=[]),a,o=0,s;return c;function c(t){return e.enter(`gfmFootnoteDefinition`)._container=!0,e.enter(`gfmFootnoteDefinitionLabel`),e.enter(`gfmFootnoteDefinitionLabelMarker`),e.consume(t),e.exit(`gfmFootnoteDefinitionLabelMarker`),l}function l(t){return t===94?(e.enter(`gfmFootnoteDefinitionMarker`),e.consume(t),e.exit(`gfmFootnoteDefinitionMarker`),e.enter(`gfmFootnoteDefinitionLabelString`),e.enter(`chunkString`).contentType=`string`,u):n(t)}function u(t){if(o>999||t===93&&!s||t===null||t===91||V(t))return n(t);if(t===93){e.exit(`chunkString`);let n=e.exit(`gfmFootnoteDefinitionLabelString`);return a=aa(r.sliceSerialize(n)),e.enter(`gfmFootnoteDefinitionLabelMarker`),e.consume(t),e.exit(`gfmFootnoteDefinitionLabelMarker`),e.exit(`gfmFootnoteDefinitionLabel`),f}return V(t)||(s=!0),o++,e.consume(t),t===92?d:u}function d(t){return t===91||t===92||t===93?(e.consume(t),o++,u):u(t)}function f(t){return t===58?(e.enter(`definitionMarker`),e.consume(t),e.exit(`definitionMarker`),i.includes(a)||i.push(a),U(e,p,`gfmFootnoteDefinitionWhitespace`)):n(t)}function p(e){return t(e)}}function Sf(e,t,n){return e.check(ja,t,e.attempt(gf,t,n))}function Cf(e){e.exit(`gfmFootnoteDefinition`)}function wf(e,t,n){let r=this;return U(e,i,`gfmFootnoteDefinitionIndent`,5);function i(e){let i=r.events[r.events.length-1];return i&&i[1].type===`gfmFootnoteDefinitionIndent`&&i[2].sliceSerialize(i[1],!0).length===4?t(e):n(e)}}function Tf(e){let t=(e||{}).singleTilde,n={name:`strikethrough`,tokenize:i,resolveAll:r};return t??=!0,{text:{126:n},insideSpan:{null:[n]},attentionMarkers:{null:[126]}};function r(e,t){let n=-1;for(;++n<e.length;)if(e[n][0]===`enter`&&e[n][1].type===`strikethroughSequenceTemporary`&&e[n][1]._close){let r=n;for(;r--;)if(e[r][0]===`exit`&&e[r][1].type===`strikethroughSequenceTemporary`&&e[r][1]._open&&e[n][1].end.offset-e[n][1].start.offset===e[r][1].end.offset-e[r][1].start.offset){e[n][1].type=`strikethroughSequence`,e[r][1].type=`strikethroughSequence`;let i={type:`strikethrough`,start:Object.assign({},e[r][1].start),end:Object.assign({},e[n][1].end)},a={type:`strikethroughText`,start:Object.assign({},e[r][1].end),end:Object.assign({},e[n][1].start)},o=[[`enter`,i,t],[`enter`,e[r][1],t],[`exit`,e[r][1],t],[`enter`,a,t]],s=t.parser.constructs.insideSpan.null;s&&Qi(o,o.length,0,wa(s,e.slice(r+1,n),t)),Qi(o,o.length,0,[[`exit`,a,t],[`enter`,e[n][1],t],[`exit`,e[n][1],t],[`exit`,i,t]]),Qi(e,r-1,n-r+3,o),n=r+o.length-2;break}}for(n=-1;++n<e.length;)e[n][1].type===`strikethroughSequenceTemporary`&&(e[n][1].type=`data`);return e}function i(e,n,r){let i=this.previous,a=this.events,o=0;return s;function s(t){return i===126&&a[a.length-1][1].type!==`characterEscape`?r(t):(e.enter(`strikethroughSequenceTemporary`),c(t))}function c(a){let s=Ca(i);if(a===126)return o>1?r(a):(e.consume(a),o++,c);if(o<2&&!t)return r(a);let l=e.exit(`strikethroughSequenceTemporary`),u=Ca(a);return l._open=!u||u===2&&!!s,l._close=!s||s===2&&!!u,n(a)}}}var Ef=class{constructor(){this.map=[]}add(e,t,n){Df(this,e,t,n)}consume(e){if(this.map.sort(function(e,t){return e[0]-t[0]}),this.map.length===0)return;let t=this.map.length,n=[];for(;t>0;)--t,n.push(e.slice(this.map[t][0]+this.map[t][1]),this.map[t][2]),e.length=this.map[t][0];n.push(e.slice()),e.length=0;let r=n.pop();for(;r;){for(let t of r)e.push(t);r=n.pop()}this.map.length=0}};function Df(e,t,n,r){let i=0;if(!(n===0&&r.length===0)){for(;i<e.map.length;){if(e.map[i][0]===t){e.map[i][1]+=n,e.map[i][2].push(...r);return}i+=1}e.map.push([t,n,r])}}function Of(e,t){let n=!1,r=[];for(;t<e.length;){let i=e[t];if(n){if(i[0]===`enter`)i[1].type===`tableContent`&&r.push(e[t+1][1].type===`tableDelimiterMarker`?`left`:`none`);else if(i[1].type===`tableContent`){if(e[t-1][1].type===`tableDelimiterMarker`){let e=r.length-1;r[e]=r[e]===`left`?`center`:`right`}}else if(i[1].type===`tableDelimiterRow`)break}else i[0]===`enter`&&i[1].type===`tableDelimiterRow`&&(n=!0);t+=1}return r}function kf(){return{flow:{null:{name:`table`,tokenize:Af,resolveAll:jf}}}}function Af(e,t,n){let r=this,i=0,a=0,o;return s;function s(e){let t=r.events.length-1;for(;t>-1;){let e=r.events[t][1].type;if(e===`lineEnding`||e===`linePrefix`)t--;else break}let i=t>-1?r.events[t][1].type:null,a=i===`tableHead`||i===`tableRow`?S:c;return a===S&&r.parser.lazy[r.now().line]?n(e):a(e)}function c(t){return e.enter(`tableHead`),e.enter(`tableRow`),l(t)}function l(e){return e===124?u(e):(o=!0,a+=1,u(e))}function u(t){return t===null?n(t):B(t)?a>1?(a=0,r.interrupt=!0,e.exit(`tableRow`),e.enter(`lineEnding`),e.consume(t),e.exit(`lineEnding`),p):n(t):H(t)?U(e,u,`whitespace`)(t):(a+=1,o&&(o=!1,i+=1),t===124?(e.enter(`tableCellDivider`),e.consume(t),e.exit(`tableCellDivider`),o=!0,u):(e.enter(`data`),d(t)))}function d(t){return t===null||t===124||V(t)?(e.exit(`data`),u(t)):(e.consume(t),t===92?f:d)}function f(t){return t===92||t===124?(e.consume(t),d):d(t)}function p(t){return r.interrupt=!1,r.parser.lazy[r.now().line]?n(t):(e.enter(`tableDelimiterRow`),o=!1,H(t)?U(e,m,`linePrefix`,r.parser.constructs.disable.null.includes(`codeIndented`)?void 0:4)(t):m(t))}function m(t){return t===45||t===58?g(t):t===124?(o=!0,e.enter(`tableCellDivider`),e.consume(t),e.exit(`tableCellDivider`),h):x(t)}function h(t){return H(t)?U(e,g,`whitespace`)(t):g(t)}function g(t){return t===58?(a+=1,o=!0,e.enter(`tableDelimiterMarker`),e.consume(t),e.exit(`tableDelimiterMarker`),_):t===45?(a+=1,_(t)):t===null||B(t)?b(t):x(t)}function _(t){return t===45?(e.enter(`tableDelimiterFiller`),v(t)):x(t)}function v(t){return t===45?(e.consume(t),v):t===58?(o=!0,e.exit(`tableDelimiterFiller`),e.enter(`tableDelimiterMarker`),e.consume(t),e.exit(`tableDelimiterMarker`),y):(e.exit(`tableDelimiterFiller`),y(t))}function y(t){return H(t)?U(e,b,`whitespace`)(t):b(t)}function b(n){return n===124?m(n):n===null||B(n)?!o||i!==a?x(n):(e.exit(`tableDelimiterRow`),e.exit(`tableHead`),t(n)):x(n)}function x(e){return n(e)}function S(t){return e.enter(`tableRow`),C(t)}function C(n){return n===124?(e.enter(`tableCellDivider`),e.consume(n),e.exit(`tableCellDivider`),C):n===null||B(n)?(e.exit(`tableRow`),t(n)):H(n)?U(e,C,`whitespace`)(n):(e.enter(`data`),ee(n))}function ee(t){return t===null||t===124||V(t)?(e.exit(`data`),C(t)):(e.consume(t),t===92?w:ee)}function w(t){return t===92||t===124?(e.consume(t),ee):ee(t)}}function jf(e,t){let n=-1,r=!0,i=0,a=[0,0,0,0],o=[0,0,0,0],s=!1,c=0,l,u,d,f=new Ef;for(;++n<e.length;){let p=e[n],m=p[1];p[0]===`enter`?m.type===`tableHead`?(s=!1,c!==0&&(Nf(f,t,c,l,u),u=void 0,c=0),l={type:`table`,start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[[`enter`,l,t]])):m.type===`tableRow`||m.type===`tableDelimiterRow`?(r=!0,d=void 0,a=[0,0,0,0],o=[0,n+1,0,0],s&&(s=!1,u={type:`tableBody`,start:Object.assign({},m.start),end:Object.assign({},m.end)},f.add(n,0,[[`enter`,u,t]])),i=m.type===`tableDelimiterRow`?2:u?3:1):i&&(m.type===`data`||m.type===`tableDelimiterMarker`||m.type===`tableDelimiterFiller`)?(r=!1,o[2]===0&&(a[1]!==0&&(o[0]=o[1],d=Mf(f,t,a,i,void 0,d),a=[0,0,0,0]),o[2]=n)):m.type===`tableCellDivider`&&(r?r=!1:(a[1]!==0&&(o[0]=o[1],d=Mf(f,t,a,i,void 0,d)),a=o,o=[a[1],n,0,0])):m.type===`tableHead`?(s=!0,c=n):m.type===`tableRow`||m.type===`tableDelimiterRow`?(c=n,a[1]===0?o[1]!==0&&(d=Mf(f,t,o,i,n,d)):(o[0]=o[1],d=Mf(f,t,a,i,n,d)),i=0):i&&(m.type===`data`||m.type===`tableDelimiterMarker`||m.type===`tableDelimiterFiller`)&&(o[3]=n)}for(c!==0&&Nf(f,t,c,l,u),f.consume(t.events),n=-1;++n<t.events.length;){let e=t.events[n];e[0]===`enter`&&e[1].type===`table`&&(e[1]._align=Of(t.events,n))}return e}function Mf(e,t,n,r,i,a){let o=r===1?`tableHeader`:r===2?`tableDelimiter`:`tableData`;n[0]!==0&&(a.end=Object.assign({},Pf(t.events,n[0])),e.add(n[0],0,[[`exit`,a,t]]));let s=Pf(t.events,n[1]);if(a={type:o,start:Object.assign({},s),end:Object.assign({},s)},e.add(n[1],0,[[`enter`,a,t]]),n[2]!==0){let i=Pf(t.events,n[2]),a=Pf(t.events,n[3]),o={type:`tableContent`,start:Object.assign({},i),end:Object.assign({},a)};if(e.add(n[2],0,[[`enter`,o,t]]),r!==2){let r=t.events[n[2]],i=t.events[n[3]];if(r[1].end=Object.assign({},i[1].end),r[1].type=`chunkText`,r[1].contentType=`text`,n[3]>n[2]+1){let t=n[2]+1,r=n[3]-n[2]-1;e.add(t,r,[])}}e.add(n[3]+1,0,[[`exit`,o,t]])}return i!==void 0&&(a.end=Object.assign({},Pf(t.events,i)),e.add(i,0,[[`exit`,a,t]]),a=void 0),a}function Nf(e,t,n,r,i){let a=[],o=Pf(t.events,n);i&&(i.end=Object.assign({},o),a.push([`exit`,i,t])),r.end=Object.assign({},o),a.push([`exit`,r,t]),e.add(n+1,0,a)}function Pf(e,t){let n=e[t],r=n[0]===`enter`?`start`:`end`;return n[1][r]}var Ff={name:`tasklistCheck`,tokenize:Lf};function If(){return{text:{91:Ff}}}function Lf(e,t,n){let r=this;return i;function i(t){return r.previous!==null||!r._gfmTasklistFirstContentOfListItem?n(t):(e.enter(`taskListCheck`),e.enter(`taskListCheckMarker`),e.consume(t),e.exit(`taskListCheckMarker`),a)}function a(t){return V(t)?(e.enter(`taskListCheckValueUnchecked`),e.consume(t),e.exit(`taskListCheckValueUnchecked`),o):t===88||t===120?(e.enter(`taskListCheckValueChecked`),e.consume(t),e.exit(`taskListCheckValueChecked`),o):n(t)}function o(t){return t===93?(e.enter(`taskListCheckMarker`),e.consume(t),e.exit(`taskListCheckMarker`),e.exit(`taskListCheck`),s):n(t)}function s(r){return B(r)?t(r):H(r)?e.check({tokenize:Rf},t,n)(r):n(r)}}function Rf(e,t,n){return U(e,r,`whitespace`);function r(e){return e===null?n(e):t(e)}}function zf(e){return ta([ef(),_f(),Tf(e),kf(),If()])}var Bf={};function Vf(e){let t=this,n=e||Bf,r=t.data(),i=r.micromarkExtensions||=[],a=r.fromMarkdownExtensions||=[],o=r.toMarkdownExtensions||=[];i.push(zf(n)),a.push(Ud()),o.push(Wd(n))}function Hf(){let{slug:e}=Ze(),t=pr(e);return t?(0,M.jsxs)(`div`,{className:`page-shell blog-post-shell`,children:[(0,M.jsx)(It,{to:A.blog,className:`page-back-link`,children:`← 글 목록`}),(0,M.jsxs)(`article`,{className:`blog-post`,children:[(0,M.jsxs)(`header`,{className:`blog-post-header`,children:[(0,M.jsx)(`h1`,{children:t.title}),(0,M.jsxs)(`div`,{className:`blog-post-meta`,children:[(0,M.jsx)(`time`,{dateTime:t.date,children:t.date}),t.tags.map(e=>(0,M.jsx)(`span`,{className:`blog-post-tag`,children:e},e))]})]}),(0,M.jsx)(`div`,{className:`blog-prose`,children:(0,M.jsx)(zl,{remarkPlugins:[Vf],children:t.body})})]})]}):(0,M.jsx)(Vn,{message:`요청한 글을 찾을 수 없습니다.`})}function Uf({links:e=[],label:t=``}){return e.length?(0,M.jsxs)(`div`,{className:`external-links`,children:[t?(0,M.jsx)(`p`,{className:`external-links-label`,children:t}):null,(0,M.jsx)(`div`,{className:`external-links-row`,children:e.map(e=>(0,M.jsx)(`a`,{href:e.href,target:`_blank`,rel:`noopener noreferrer`,className:`external-link`,children:e.label},e.href))})]}):null}function Wf({src:e,alt:t=``,onClose:n}){let r=(0,v.useRef)(null);return(0,v.useEffect)(()=>{let e=e=>{e.key===`Escape`&&n()};return document.addEventListener(`keydown`,e),r.current?.focus(),()=>document.removeEventListener(`keydown`,e)},[n]),(0,M.jsx)(`div`,{className:`lightbox`,role:`presentation`,onClick:n,children:(0,M.jsxs)(`div`,{className:`lightbox-panel`,role:`dialog`,"aria-modal":`true`,"aria-label":t||`이미지 확대 보기`,onClick:e=>e.stopPropagation(),children:[(0,M.jsx)(`button`,{type:`button`,ref:r,className:`lightbox-close`,"aria-label":`닫기`,onClick:n,children:`×`}),(0,M.jsx)(`img`,{src:e,alt:t})]})})}function Gf({src:e,alt:t,className:n,href:r,onZoom:i}){let a=(0,M.jsx)(`img`,{src:e,alt:t,className:n});return r?(0,M.jsx)(`a`,{href:r,target:`_blank`,rel:`noopener noreferrer`,className:`image-link`,children:a}):(0,M.jsx)(`button`,{type:`button`,className:`image-zoom-button`,"aria-label":`${t} 이미지 크게 보기`,onClick:()=>i(e,t),children:a})}function Kf(){let[e,t]=(0,v.useState)(null);return{zoomed:e,open:(0,v.useCallback)((e,n=``)=>t({src:e,alt:n}),[]),close:(0,v.useCallback)(()=>t(null),[])}}var qf=[{id:`lgcns-ucamp`,degree:`LG CNS U-CAMP 36기 신입 교육 프로그램`,school:`LG CNS`,period:`2022.09 - 2022.11`,summary:`Full-Stack Web Development Bootcamp 과정`,curriculum:[`JAVA(JDK 11), ORACLE(11c), React.js, Spring Boot(2.x.x)`],image:`LGCNS.png`,imageLink:`https://www.lg.co.kr/media/release/3933`},{id:`ezen-academy`,degree:`빅데이터 기반 자바 백엔드 과정`,school:`EZEN ACADEMY`,period:`2021.06 - 2022.01`,summary:`Full-Stack Web Application Development Program`,curriculum:[`JAVA(JDK11), MYSQL, HTML, CSS, JavaScript(ES6), JSP, Spring Framework`],image:`Ezen2.png`},{id:`hycu-bachelor`,degree:`컴퓨터공학과 학사`,school:`한양사이버대학교`,period:`2016.03 - 2021.03`,summary:`평점 4.05 / 4.5`,image:`HYLOGO.jpg`,imageLink:`https://www.hycu.ac.kr/user/maSnEx/goMain/30003/loadMap.do`,links:[{label:`GitHub`,href:`https://github.com/seulgae/Leesigukgram`},{label:`프로젝트 설명 PDF`,href:`https://github.com/Giltaehyeong/Leesigukgram/blob/main/LeeSigukgram(%EC%84%A4%EB%AA%85).pdf`},{label:`동작 영상`,href:`https://www.youtube.com/watch?v=kE8Ci-JRsi4`}]}];function Jf(){let{zoomed:e,open:t,close:n}=Kf();return(0,M.jsxs)(`div`,{className:`page-shell`,children:[(0,M.jsx)(`h1`,{children:`학력 및 교육`}),(0,M.jsx)(`div`,{className:`education-list`,children:qf.map(e=>(0,M.jsxs)(`article`,{className:`education-card`,children:[(0,M.jsx)(Gf,{src:Jt(e.image),alt:e.school,className:`education-image`,href:e.imageLink,onZoom:t}),(0,M.jsxs)(`div`,{className:`education-details`,children:[(0,M.jsx)(`h2`,{children:e.degree}),(0,M.jsx)(`h3`,{children:e.school}),(0,M.jsxs)(`p`,{children:[(0,M.jsx)(`strong`,{children:`기간:`}),` `,e.period]}),(0,M.jsx)(`p`,{children:e.summary}),e.curriculum?.length?(0,M.jsxs)(`div`,{className:`education-curriculum`,children:[(0,M.jsx)(`p`,{className:`education-curriculum-label`,children:`상세 교육 내용`}),(0,M.jsx)(`ul`,{children:e.curriculum.map(e=>(0,M.jsx)(`li`,{children:e},e))})]}):null,(0,M.jsx)(Uf,{links:e.links,label:`프로젝트 항목`})]})]},e.id))}),e?(0,M.jsx)(Wf,{src:e.src,alt:e.alt,onClose:n}):null]})}function Yf({items:e=[],dateLabel:t=`일자`}){let{zoomed:n,open:r,close:i}=Kf();return(0,M.jsxs)(`div`,{className:`credential-list`,children:[e.map(e=>(0,M.jsxs)(`article`,{className:`credential-card`,children:[(0,M.jsx)(Gf,{src:Jt(e.image),alt:e.title,className:`credential-image`,onZoom:r}),(0,M.jsxs)(`div`,{className:`credential-details`,children:[(0,M.jsx)(`h2`,{children:e.title}),(0,M.jsxs)(`p`,{className:`credential-date`,children:[(0,M.jsx)(`strong`,{children:t}),` `,e.date]}),(0,M.jsx)(`p`,{children:e.description}),(0,M.jsx)(Uf,{links:e.links})]})]},e.id)),n?(0,M.jsx)(Wf,{src:n.src,alt:n.alt,onClose:i}):null]})}var Xf=[{id:`abacus-2024`,title:`(주)애버커스 통신사업본부 우수사원`,date:`2024.12`,description:`CloudXper 플랫폼 성능 개선과 LG U+ 통합 빌링 운영 안정화 성과를 바탕으로 선정되었습니다.`,image:`ABACUS.jpg`,links:[{label:`회사 홈페이지`,href:`http://iabacus.co.kr/iabacus/`},{label:`기업정보`,href:`https://www.jobkorea.co.kr/recruit/co_read/c/abacus`}]},{id:`ucamp-2022`,title:`LG CNS UCAMP 프로젝트 최우수상`,date:`2022.11`,description:`사전 평가 시험에서 반 2등을 기록해 2팀 팀장을 맡았고, 4명의 팀원과 협업하여 프로젝트를 최우수상으로 이끌었습니다.`,image:`UCAMP.jpg`,links:[{label:`GitHub`,href:`https://github.com/seulgae/fmBoot`},{label:`프로젝트 설명`,href:`https://github.com/seulgae/fmBoot/blob/main/PPT.pdf`},{label:`프로젝트 영상`,href:`https://youtu.be/Cb8BTgsmOXY`}]}];function Zf(){return(0,M.jsxs)(`div`,{className:`page-shell`,children:[(0,M.jsx)(`h1`,{children:`수상 이력`}),(0,M.jsx)(Yf,{items:Xf,dateLabel:`수상일`})]})}var Qf=[{id:`sqld`,title:`SQLD`,date:`2025.06.27`,description:`한국데이터산업진흥원`,image:`Licenses2.png`},{id:`web-design`,title:`웹 디자인 개발기능사`,date:`2014.06.24`,description:`한국산업인력공단`,image:`Licenses1.png`}];function $f(){return(0,M.jsxs)(`div`,{className:`page-shell`,children:[(0,M.jsx)(`h1`,{children:`자격증`}),(0,M.jsx)(Yf,{items:Qf,dateLabel:`취득일`})]})}var ep=`2026-07-17 | e9fbd32 | [20260717]경력기술서 내용 현행화(2026-07-04 | 396bed9 | [20260704]경력기술서 내용, Navbar 제목 현행화(2026-06-30 | d6e5f5e | [20260630]인사 문구 수정(2026-06-30 | b46d99b | [20260630]경력기술서 현행화(2026-06-30 | 4a5eba6 | [20260630]경력기술서 현행화(2026-06-30 | 56237fd | [20260630]경력기술서 현행화(2026-06-16 | ff75cbd | [20260513]Projects.jsx, ResumePrint.jsx 이력서 출력 페이지 현행화(2026-05-18 | d175c85 | [20260513]ResumePrint.jsx 이력서 출력 페이지 현행화(2026-05-13 | f80571c | [20260513]Home.jsx 파일 내용 수정(2026-05-13 | f1e03e9 | [20260513]임시 모바일 css 데탑 모드로 적용(2026-05-13 | 54cec7b | [20260513]Home.jsx 파일 내용 수정(2026-05-13 | 072477d | [20260513]ReadMe.md 현행화(2026-05-13 | 4d4a3fd | [20260513]Projects.jsx 항목 현행화 및 구조 수정(2026-04-12 | b1630de | [20260412]ResumePrint.jsx css 수정(2026-04-11 | 2a6e5e7 | [20260411]Home.jsx, tech-group 목록 수정(2026-03-31 | 1852130 | [20260331]모바일 웹, 데스크톱 웹 css 분리 적용(2026-03-31 | ed1025e | [20260331]README 업데이트(2026-03-31 | 2c0aad9 | [20260331] Architecture 페이지에 라우팅, 패키지, 커밋 이력 문서 추가(2026-03-30 | 4f1a6b6 | [20260330]이력서 출력페이지 추가, Awards, Licenses 내용 수정(2026-03-30 | 49f316d | [20260330]이력서 출력페이지 추가, Awards, Licenses 내용 수정(2026-03-26 | 54ce037 | [20260326]BrowserRouter 변경(2026-03-26 | 587c79e | [20260326]포트폴리오 사이트 개선 업로드(2025-06-27 | 7de9113 | 20250627 ReadMe UPD(2025-06-27 | c78b02a | Merge branch 'main' of https://github.com/seulgae/seulgae.github.io(2025-06-27 | 31c51da | SQLD Licenses img UPD(2025-06-26 | 55527d3 | Update README.md(2025-06-26 | e71057a | 20250625 ReadMe UPD(2025-06-04 | 740ff1b | 사이드 프로젝트 링크 수정(2025-06-04 | f83c5bf | 자격증 목록 수정(2025-05-28 | 1cff3e2 | 기술 스택 수정(2025-05-16 | 3659100 | 사이드 프로젝트 임시 활성화(2025-05-09 | a0a9eb9 | 포트폴리오 사이트 지원용 임시 백업(2025-05-08 | 203e6ce | 경력기술서 update(2025-05-07 | 546065f | 깃허브 포맷 후 커밋 테스트(2025-05-06 | bed0ad0 | 기술 스택 영역별 박스 추가(2025-05-05 | 250682e | 사이드 프로젝트 목록 최신화(2025-05-04 | 61a5e35 | 프로젝트 리스트 mainTasks 수정(2025-05-04 | 647a28d | 프로젝트 리스트 Kosa 경력 항목 추가(2025-05-02 | 67dcca7 | 사이드 프로젝트 메뉴 임시 비활성화(2025-04-29 | 8e319c4 | 사이드 프로젝트 목록 수정(2025-04-25 | d933763 | Merge branch 'main' of https://github.com/seulgae/seulgae.github.io(2025-04-25 | cc64bc1 | 교육 내용 패스트캠퍼스 이력 추가(2025-04-25 | 45f65fe | Update README.md(2025-04-24 | 868baf6 | 로고 사이즈 조절(2025-04-24 | 9cb4f2a | 로고 사이즈 조절(2025-04-24 | a2fc987 | 로고 사이즈 조절(2025-04-24 | 6b99eed | SideProject 로고 업데이트(2025-04-23 | 7ce0761 | sideProjects 메뉴 수정, 마이그레이션 전, 후 아이콘 추가(2025-04-22 | de35e99 | SideProject FM 프로젝트 JDK 수정(2025-04-21 | 64751d8 | 교육 목록 수정(2025-04-21 | 5876690 | 사이드 프로젝트 목록과 내용 수정(2025-04-20 | f46ab56 | 앞으로의 다짐 Home 내용 추가(2025-04-20 | 4effd64 | Education 목록 수정(2025-04-20 | fc402e9 | 교육 모달 레이어 이미지 효과 추가(2025-04-18 | 8dbab4e | 사이드 프로젝트 메뉴 활성화(2025-04-17 | e5d9e93 | 모바일 css 제거 viewport 태그 주석처리(2025-04-17 | d438497 | 모바일 버전 pc 사이즈에 맞는 css 반영(2025-04-17 | 1e978bc | css 폴더 구조 분리, 모바일 css 주석처리(2025-04-17 | 2a1fa2b | Blog 형태 소스로 다시 원복(2025-04-15 | 3fbc90b | css width 사이즈 100% 적용(2025-04-14 | 7abb3b8 | 각 메뉴별 애니메이션 효과 적용, Home 페이지 디자인 수정 및 적용(2025-04-14 | 744c6a0 | 사이드 프로젝트 목록 정리(2025-04-14 | 9eb2540 | 모달레이어 x버튼 위치 수정(2025-04-14 | e39dc59 | 수상경력 사진 수정(2025-04-14 | cceddf7 | 사이드바 메뉴 위치 수정, 애니메이션 수정, 버튼 위치 수정(2025-04-14 | 2ee7e7d | 모바일 슬라이드 기능 추가(2025-04-14 | 9c7e6d6 | 사이드바 버튼 제거, 스크롤 방식으로 변경(2025-04-14 | 271e562 | 모바일 css 적용(2025-04-14 | 0c8cd88 | 페이지별 CSS 사이즈 %로 변경(2025-04-14 | 6328ca0 | 프로젝트 일지 추가작성(2025-04-13 | a0505a2 | Side Project 메뉴 추가(2025-04-13 | 779acc4 | ProjectList STAR 양식으로 변경(2025-04-11 | 95e1ffc | ReadMe 내용 업데이트(2025-04-11 | a18b230 | ReadMe 정리(2025-04-10 | f369906 | Contact 디자인 적용(2025-04-09 | cd5b7f0 | 자격증 메뉴 추가(2025-04-09 | 000861d | ReadMe 프로젝트 일지 기록(2025-04-09 | 2c1e574 | Project Experience 메뉴 하위 세부항목 메뉴 추가(2025-04-09 | 250f4af | Router 속성 변경 -> HashRouter(2025-04-08 | e2b41ee | 사이드바 버튼 수정(2025-04-08 | c7ea94e | 포트폴리오 버전 V2 업로드(2025-04-08 | 808f362 | Navbar 사이드 수정(2025-04-08 | bbaeac9 | Navbar 사이드 수정(2025-04-08 | 8c9f6b0 | Navbar 사이드 수정(2025-04-08 | d98909f | Navbar 사이드 수정(2025-04-08 | e43d134 | Navbar 사이드 수정(2025-04-08 | 72a4de8 | Navbar 사이드 수정(2025-04-08 | a3b8b42 | Navbar 사이드 수정(2025-04-08 | da544c1 | Navbar 사이드 수정(2025-04-08 | 23a1c75 | Navbar 사이드 수정(2025-04-08 | d619506 | Navbar 사이드 수정(2025-04-07 | 2baa3ef | ReadMe Edit(2025-04-07 | 47719ca | ReadMe Edit(2025-04-07 | af8f40d | ReadMe Edit(2025-04-07 | 7dad5a3 | 포트폴리오 페이지 초안 디자인 V1(2025-04-07 | 5c04f97 | ReadMe Edit(2025-04-07 | 2a29d0a | HomePage Main Edit(2025-04-07 | 27e38c8 | ReadMe Edit(2025-04-07 | 72ccab5 | favicon.ico file Edit(2025-04-07 | 1ffd21a | package.json Edit(2025-04-07 | c18fe9a | first upload`.split(`(`),tp=[{step:`01. Bootstrap`,title:`main.jsx`,body:`ReactDOM root를 생성하고 App을 마운트합니다. 전역 토큰(styles/tokens.css)과 기본 스타일도 여기서 연결됩니다.`},{step:`02. Application Shell`,title:`App.jsx`,body:`BrowserRouter, 상단 고정 헤더, 푸터, 페이지 진입 애니메이션을 관리합니다. 라우트 목록은 routes.js에서 가져옵니다.`},{step:`03. Routing Source`,title:`routes.js`,body:`경로와 상단 메뉴 구성의 단일 출처입니다. App(라우팅)과 Header(메뉴)가 같은 정의를 공유합니다.`},{step:`04. Content Data`,title:`data/* + posts/*`,body:`프로필·프로젝트·교육·수상·자격은 data/에, 블로그 글은 posts/의 마크다운 파일에만 존재합니다. 화면과 출력용 이력서가 같은 데이터를 참조합니다.`},{step:`05. Composition`,title:`components/ + pages/`,body:`components/는 재사용 UI(Header, Lightbox, CredentialList 등), pages/는 라우트 단위 화면 조립만 담당합니다.`},{step:`06. Deployment`,title:`Vite + GitHub Pages`,body:`vite build 결과물을 gh-pages로 배포합니다. package.json의 predeploy/deploy 스크립트가 배포 흐름을 담당합니다.`}],np=[{title:`새 프로젝트 추가`,body:`data/projects.js 배열에 객체 하나만 추가하면 됩니다. 상세 페이지(/projects/:slug), 사이드바 서브메뉴, 출력용 이력서가 모두 자동으로 반영됩니다.`},{title:`블로그 글 작성`,body:`src/posts/에 마크다운 파일을 추가하면 목록·상세·태그가 자동 반영됩니다. 파일 상단 frontmatter(title, date, tags, summary)만 지키면 됩니다. 자세한 방법은 블로그의 '이 블로그에 글 쓰는 방법' 글 참고.`},{title:`이력 내용 수정`,body:`교육·수상·자격은 data/education.js, data/awards.js, data/licenses.js에만 있습니다. 연락처·기술 스택·핵심 요약은 data/profile.js에 있습니다.`},{title:`디자인 조정`,body:`색·반경·그림자는 styles/tokens.css의 변수를 수정하면 전체에 반영됩니다. 화면별 레이아웃만 각 CSS 파일에서 다룹니다.`},{title:`경로 변경`,body:`routes.js의 paths를 수정하면 라우팅과 메뉴가 함께 바뀝니다. 이전 경로는 legacyRedirects에 남겨 두어 공유된 링크가 깨지지 않게 합니다.`},{title:`화면 대응 범위`,body:`3단계 적응형입니다. 데스크톱(960px 초과)은 상단 메뉴, 태블릿(769~960px)은 햄버거 패널, 모바일(768px 이하)은 앱 스타일 하단 탭바(BottomNav)로 이동합니다. 모바일은 여백·글자 밀도도 별도로 조정되며, 출력용 이력서는 A4 폭 유지 + 가로 스크롤로 열람합니다.`},{title:`배포 절차`,body:`npm run sync:history로 커밋 이력을 갱신하고, npm run build로 확인한 뒤 npm run deploy를 실행합니다.`}],rp=[{path:A.home,page:`Home`,purpose:`포트폴리오 첫 화면. 자기소개, 핵심 메시지, 기술 스택 요약을 제공합니다.`,userGuide:`처음 방문한 사용자는 여기서 전체 톤과 강점을 빠르게 파악하면 됩니다.`},{path:A.projects,page:`Projects`,purpose:`프로젝트 목록. 개요 카드에서 상세로 진입합니다.`,userGuide:`무엇을 먼저 볼지 여기서 고르면 됩니다. 상세에서 이전/다음 이동도 가능합니다.`},...On.map(e=>({path:A.project(e.slug),page:e.shortTitle||e.title,purpose:e.description,userGuide:`${e.period} / ${e.role}`})),{path:A.blog,page:`Blog`,purpose:`학습·작업 기록. src/posts/의 마크다운 파일에서 자동 생성됩니다.`,userGuide:`태그로 필터링할 수 있고, 글은 DB 없이 파일로 관리됩니다.`},{path:A.education,page:`Education`,purpose:`학위 및 교육 이력을 정리해둔 페이지입니다.`,userGuide:`기술 역량이 어떤 학습 경로를 통해 형성됐는지 확인할 수 있습니다.`},{path:A.awards,page:`Awards`,purpose:`수상 이력을 정리합니다.`,userGuide:`성과에 대한 외부 평가나 조직 내 인정 이력을 확인할 수 있습니다.`},{path:A.licenses,page:`Licenses`,purpose:`자격증 이력을 정리합니다.`,userGuide:`기술/직무 관련 공식 자격 보유 여부를 확인할 수 있습니다.`},{path:A.resume,page:`Resume Print`,purpose:`A4 2장 출력용 이력서입니다. 내용은 data/의 원본을 그대로 사용합니다.`,userGuide:`실제 제출용 문서를 보거나 인쇄할 때 사용합니다.`},{path:A.architecture,page:`Architecture`,purpose:`현재 프로젝트의 구조, 흐름, 의존성, 변경 이력을 설명하는 내부 문서 페이지입니다.`,userGuide:`이 프로젝트를 유지보수하거나 확장하려는 사람이 먼저 보는 안내서입니다.`}],ip=[{name:`react / react-dom`,version:`^19.1.0`,category:`runtime`,purpose:`컴포넌트 기반 UI 렌더링과 DOM 마운트를 담당합니다.`,note:`전체 화면이 함수형 컴포넌트 기준으로 구성돼 있습니다.`},{name:`react-router-dom`,version:`^6.30.1`,category:`runtime`,purpose:`라우팅과 화면 전환 경로를 담당합니다.`,note:`routes.js의 경로 정의를 App.jsx가 Route로 펼쳐 사용합니다.`},{name:`react-markdown / remark-gfm`,version:`^10.1.0 / ^4.0.1`,category:`runtime`,purpose:`블로그 마크다운 본문을 렌더링합니다. GFM(표·체크리스트) 문법 지원.`,note:`BlogPostPage.jsx에서 사용됩니다. 페이지 전환은 CSS 애니메이션으로 대체되어 framer-motion은 제거했습니다.`},{name:`react-icons`,version:`^5.5.0`,category:`runtime`,purpose:`GitHub, 블로그 아이콘 등 UI 아이콘을 제공합니다.`,note:`Navbar.jsx에서 사용됩니다.`},{name:`vite / @vitejs/plugin-react`,version:`^8.0.3 / ^6.0.1`,category:`build`,purpose:`개발 서버와 프로덕션 번들 빌드, JSX 변환을 담당합니다.`,note:`dev/build/preview 스크립트가 모두 Vite 기준입니다.`},{name:`vitest / jsdom`,version:`^4.1.2 / ^26.0.0`,category:`test`,purpose:`테스트 러너와 브라우저 유사 DOM 환경을 제공합니다.`,note:`npm test는 vitest run으로 연결돼 있습니다.`},{name:`@testing-library/react · jest-dom · user-event`,version:`^16.3.0 / ^6.6.3 / ^13.5.0`,category:`test`,purpose:`컴포넌트 렌더링, DOM assertion, 사용자 인터랙션 검증 도구입니다.`,note:`라우팅·데이터 정합성 테스트에 사용합니다.`},{name:`gh-pages`,version:`^6.3.0`,category:`deploy`,purpose:`build 결과물을 GitHub Pages 브랜치로 배포합니다.`,note:`npm run deploy에서 사용됩니다.`}],ap=[`src/`,`  main.jsx                    // 앱 진입점, 전역 스타일 연결`,`  App.jsx                     // 라우팅, 헤더/푸터 배치, 진입 애니메이션`,`  routes.js                   // 경로 + 메뉴 정의 (단일 출처)`,`  index.css                   // 기본 스타일`,`  data/                       // 콘텐츠 단일 출처`,`    profile.js                // 인물 정보, 연락처, 기술 스택`,`    projects.js               // 프로젝트 경력 (목록·상세·이력서 공용)`,`    education.js / awards.js / licenses.js`,`    commitHistory.js          // 자동 생성 (npm run sync:history)`,`  posts/                      // 블로그 글 (마크다운 파일 = 글 1건)`,`    how-to-write-posts.md`,`    portfolio-refactoring.md`,`  lib/posts.js                // posts/ 로더 + frontmatter 파서`,`  components/                 // 재사용 UI`,`    Header.jsx / Footer.jsx   // 상단 고정 메뉴, 연락처 푸터`,`    BottomNav.jsx             // 모바일 전용 하단 탭바 (+더보기 시트)`,`    ProjectDetail.jsx         // 프로젝트 상세 렌더러 (+이전/다음 이동)`,`    CredentialList.jsx        // 수상·자격 공용 카드 목록`,`    Lightbox.jsx / ZoomableImage.jsx / ExternalLinks.jsx`,`  pages/                      // 라우트 단위 화면`,`    HomePage.jsx`,`    ProjectsIndexPage.jsx     // /projects 목록`,`    ProjectDetailPage.jsx     // /projects/:slug 단일 처리`,`    BlogListPage.jsx / BlogPostPage.jsx`,`    EducationPage.jsx / AwardsPage.jsx / LicensesPage.jsx`,`    ResumePage.jsx / ArchitecturePage.jsx / NotFoundPage.jsx`,`  hooks/useLightbox.js`,`  utils/text.js               // 제목 분리, 정적 파일 경로`,`  styles/`,`    tokens.css                // 색·반경·그림자·폰트 단일 출처 (클린 라이트)`,`    pageShell.css             // 페이지 공통 폭·제목·뒤로가기`,`    header.css / footer.css / bottomNav.css / blog.css / projectsIndex.css`,`    lightbox.css / externalLinks.css / credentials.css`,`    home.css / projectDetail.css / education.css`,`    architecture.css / resume.css / notFound.css`,`scripts/`,`  generate-commit-history.mjs // git log -> data/commitHistory.js`],op=[{date:`2026-08`,title:`클린 라이트 개편 + 블로그 추가`,body:`숨은 사이드바를 상단 고정 헤더로 교체하고 모바일 반응형을 적용했습니다. 마크다운 파일 기반 블로그(/blog)와 프로젝트 목록(/projects)을 추가했습니다.`},{date:`2026-08`,title:`구조 리팩터링`,body:`콘텐츠를 data/로 분리해 웹 화면과 출력용 이력서의 내용 중복을 제거했고, 프로젝트별 페이지 파일을 /projects/:slug 단일 라우트로 통합했습니다. 미사용 반응형 코드와 중복 CSS도 함께 정리했습니다.`},{date:`2026-03`,title:`Resume Print와 라우팅 정리`,body:`출력용 이력서 페이지가 추가됐고 BrowserRouter 기반으로 라우팅 구성이 정리됐습니다.`},{date:`2025-06`,title:`이력 최신화`,body:`SQLD 자격증, README, 포트폴리오 소개 내용이 갱신됐습니다.`},{date:`2025-04`,title:`UI 구조 확장 집중`,body:`Navbar, Project Experience 하위 메뉴, 모달, 애니메이션, Home 디자인이 집중적으로 발전했습니다.`}];function sp(){return(0,M.jsxs)(`div`,{className:`page-shell architecture-page`,children:[(0,M.jsxs)(`section`,{className:`architecture-hero`,children:[(0,M.jsx)(`span`,{className:`architecture-eyebrow`,children:`Project Manual`}),(0,M.jsx)(`h1`,{children:`Portfolio Architecture & Maintenance Guide`}),(0,M.jsx)(`p`,{children:`이 페이지는 현재 포트폴리오 프로젝트를 유지보수하거나 확장하려는 사람이 먼저 보는 문서입니다. 화면 구조, 라우팅, 파일 역할, 패키지 버전, 사용 가이드, 변경 이력을 한 곳에서 확인할 수 있도록 정리했습니다.`})]}),(0,M.jsx)(`section`,{className:`architecture-map`,children:tp.slice(0,4).map(e=>(0,M.jsxs)(`div`,{className:`map-column`,children:[(0,M.jsx)(`span`,{className:`architecture-index`,children:e.step}),(0,M.jsxs)(`div`,{className:`map-box`,children:[(0,M.jsx)(`strong`,{children:e.title}),(0,M.jsx)(`span`,{children:e.body})]})]},e.step))}),(0,M.jsxs)(`section`,{className:`architecture-shell`,children:[(0,M.jsxs)(`div`,{className:`architecture-header`,children:[(0,M.jsx)(`span`,{className:`architecture-index`,children:`Overview`}),(0,M.jsx)(`h2`,{children:`아키텍처 레벨 단계`})]}),(0,M.jsx)(`div`,{className:`architecture-grid architecture-grid-wide`,children:tp.map(e=>(0,M.jsxs)(`article`,{className:`architecture-card`,children:[(0,M.jsx)(`span`,{className:`architecture-card-step`,children:e.step}),(0,M.jsx)(`h3`,{children:e.title}),(0,M.jsx)(`p`,{children:e.body})]},e.step))})]}),(0,M.jsxs)(`section`,{className:`architecture-shell`,children:[(0,M.jsxs)(`div`,{className:`architecture-header`,children:[(0,M.jsx)(`span`,{className:`architecture-index`,children:`Guide`}),(0,M.jsx)(`h2`,{children:`사용자/운영자 가이드`})]}),(0,M.jsx)(`div`,{className:`architecture-grid`,children:np.map(e=>(0,M.jsxs)(`article`,{className:`architecture-card`,children:[(0,M.jsx)(`h3`,{children:e.title}),(0,M.jsx)(`p`,{children:e.body})]},e.title))})]}),(0,M.jsxs)(`section`,{className:`architecture-shell`,children:[(0,M.jsxs)(`div`,{className:`architecture-header`,children:[(0,M.jsx)(`span`,{className:`architecture-index`,children:`Routes`}),(0,M.jsx)(`h2`,{children:`페이지 구조와 사용 흐름`})]}),(0,M.jsx)(`div`,{className:`route-list`,children:rp.map(e=>(0,M.jsxs)(`article`,{className:`route-card`,children:[(0,M.jsxs)(`div`,{className:`route-head`,children:[(0,M.jsx)(`strong`,{children:e.page}),(0,M.jsx)(`span`,{children:e.path})]}),(0,M.jsx)(`p`,{children:e.purpose}),(0,M.jsx)(`p`,{className:`route-guide`,children:e.userGuide})]},e.path))})]}),(0,M.jsxs)(`section`,{className:`architecture-shell`,children:[(0,M.jsxs)(`div`,{className:`architecture-header`,children:[(0,M.jsx)(`span`,{className:`architecture-index`,children:`Legacy`}),(0,M.jsx)(`h2`,{children:`이전 경로 리다이렉트`})]}),(0,M.jsx)(`p`,{className:`architecture-note`,children:`이미 공유된 옛 주소로 접속해도 새 경로로 자동 이동합니다.`}),(0,M.jsx)(`pre`,{className:`architecture-code`,children:(0,M.jsx)(`code`,{children:Wt.map(e=>`${e.from}  ->  ${e.to}`).join(`
`)})})]}),(0,M.jsxs)(`section`,{className:`architecture-shell`,children:[(0,M.jsxs)(`div`,{className:`architecture-header`,children:[(0,M.jsx)(`span`,{className:`architecture-index`,children:`Packages`}),(0,M.jsx)(`h2`,{children:`package.json 라이브러리와 버전 설명`})]}),(0,M.jsx)(`div`,{className:`package-grid package-grid-wide`,children:ip.map(e=>(0,M.jsxs)(`article`,{className:`package-card`,children:[(0,M.jsxs)(`div`,{className:`package-meta`,children:[(0,M.jsx)(`strong`,{children:e.name}),(0,M.jsx)(`span`,{children:e.version})]}),(0,M.jsx)(`em`,{children:e.category}),(0,M.jsx)(`p`,{children:e.purpose}),(0,M.jsx)(`p`,{className:`package-note`,children:e.note})]},e.name))})]}),(0,M.jsxs)(`section`,{className:`architecture-shell`,children:[(0,M.jsxs)(`div`,{className:`architecture-header`,children:[(0,M.jsx)(`span`,{className:`architecture-index`,children:`Structure`}),(0,M.jsx)(`h2`,{children:`실제 디렉터리 구조`})]}),(0,M.jsx)(`pre`,{className:`architecture-code`,children:(0,M.jsx)(`code`,{children:ap.join(`
`)})})]}),(0,M.jsxs)(`section`,{className:`architecture-shell`,children:[(0,M.jsxs)(`div`,{className:`architecture-header`,children:[(0,M.jsx)(`span`,{className:`architecture-index`,children:`History`}),(0,M.jsx)(`h2`,{children:`변경 이력 요약`})]}),(0,M.jsx)(`div`,{className:`timeline-list`,children:op.map(e=>(0,M.jsxs)(`article`,{className:`timeline-card`,children:[(0,M.jsx)(`span`,{children:e.date}),(0,M.jsx)(`h3`,{children:e.title}),(0,M.jsx)(`p`,{children:e.body})]},`${e.date}-${e.title}`))})]}),(0,M.jsxs)(`section`,{className:`architecture-shell`,children:[(0,M.jsxs)(`div`,{className:`architecture-header`,children:[(0,M.jsx)(`span`,{className:`architecture-index`,children:`Commits`}),(0,M.jsx)(`h2`,{children:`전체 커밋 리스트`})]}),(0,M.jsxs)(`p`,{className:`architecture-note`,children:[`npm run sync:history로 git log에서 자동 생성됩니다. (총 `,ep.length,`건)`]}),(0,M.jsx)(`pre`,{className:`architecture-code architecture-code-tall`,children:(0,M.jsx)(`code`,{children:ep.join(`
`)})})]})]})}var cp=2,lp=[On.slice(0,cp),On.slice(cp)];function up({project:e}){return(0,M.jsxs)(`article`,{className:`resume-project-entry`,children:[(0,M.jsxs)(`div`,{className:`resume-project-title-row`,children:[(0,M.jsx)(`h3`,{children:e.title}),(0,M.jsxs)(`span`,{children:[e.period,` / `,e.role]})]}),(0,M.jsx)(`table`,{className:`resume-table resume-project-table`,children:(0,M.jsxs)(`tbody`,{children:[(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`th`,{scope:`row`,children:`주요 업무`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(`ul`,{className:`resume-doc-list compact`,children:e.mainTasks.map(e=>(0,M.jsx)(`li`,{children:e},e))})})]}),(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`th`,{scope:`row`,children:`주요 성과`}),(0,M.jsx)(`td`,{children:(0,M.jsx)(`ul`,{className:`resume-doc-list compact`,children:e.achievements.map(e=>(0,M.jsx)(`li`,{children:e.result},e.title))})})]})]})})]})}function dp({rows:e}){return(0,M.jsx)(`table`,{className:`resume-table`,children:(0,M.jsx)(`tbody`,{children:e.map(([e,t])=>(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`th`,{scope:`row`,children:e}),(0,M.jsx)(`td`,{children:t})]},e))})})}function fp(){let e=[[`이름`,j.name],[`생년월일`,Kt()],[`직무`,j.role],[`경력`,j.careerSummary],[`핵심 키워드`,j.keywords],[`연락처`,`${j.phone} / ${j.email}`],[`링크`,`${j.links.github.replace(/^https?:\/\//,``)} / ${j.links.blog.replace(/^https?:\/\//,``).replace(/\/$/,``)}`]],t=j.techStack.map(e=>[e.label,e.items.join(`, `)]);return(0,M.jsxs)(`div`,{className:`resume-print-page`,children:[(0,M.jsxs)(`div`,{className:`resume-print-toolbar`,children:[(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`strong`,{children:`출력용 이력서`}),(0,M.jsx)(`span`,{children:`Ctrl+P 후 A4, 배율 기본값, 머리글/바닥글 끔 기준으로 2장 출력에 맞춰 구성했습니다.`})]}),(0,M.jsx)(`button`,{type:`button`,className:`resume-print-button`,onClick:()=>window.print(),children:`인쇄하기`})]}),(0,M.jsxs)(`section`,{className:`resume-paper`,children:[(0,M.jsxs)(`header`,{className:`resume-doc-header`,children:[(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`p`,{className:`resume-doc-eyebrow`,children:`Printable Resume`}),(0,M.jsx)(`h1`,{children:j.name}),(0,M.jsx)(`p`,{className:`resume-doc-role`,children:j.role})]}),(0,M.jsx)(`p`,{className:`resume-doc-intro`,children:j.intro})]}),(0,M.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,M.jsx)(`h2`,{children:`기본 정보`}),(0,M.jsx)(dp,{rows:e})]}),(0,M.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,M.jsx)(`h2`,{children:`핵심 요약`}),(0,M.jsx)(`ul`,{className:`resume-doc-list`,children:j.strengths.map(e=>(0,M.jsx)(`li`,{children:e},e))})]}),(0,M.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,M.jsx)(`h2`,{children:`경력 기술서`}),lp[0].map(e=>(0,M.jsx)(up,{project:e},e.slug))]})]}),(0,M.jsxs)(`section`,{className:`resume-paper page-break`,children:[lp[1].length?(0,M.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,M.jsx)(`h2`,{children:`경력 기술서`}),lp[1].map(e=>(0,M.jsx)(up,{project:e},e.slug))]}):null,(0,M.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,M.jsx)(`h2`,{children:`기술 스택`}),(0,M.jsx)(dp,{rows:t})]}),(0,M.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,M.jsx)(`h2`,{children:`교육`}),(0,M.jsxs)(`table`,{className:`resume-table`,children:[(0,M.jsx)(`thead`,{children:(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`th`,{children:`과정`}),(0,M.jsx)(`th`,{children:`기관`}),(0,M.jsx)(`th`,{children:`기간`})]})}),(0,M.jsx)(`tbody`,{children:qf.map(e=>(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`th`,{scope:`row`,children:e.degree}),(0,M.jsx)(`td`,{children:e.school}),(0,M.jsx)(`td`,{children:e.period})]},e.id))})]})]}),(0,M.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,M.jsx)(`h2`,{children:`수상`}),(0,M.jsxs)(`table`,{className:`resume-table`,children:[(0,M.jsx)(`thead`,{children:(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`th`,{children:`항목`}),(0,M.jsx)(`th`,{children:`일자`})]})}),(0,M.jsx)(`tbody`,{children:Xf.map(e=>(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`th`,{scope:`row`,children:e.title}),(0,M.jsx)(`td`,{children:e.date})]},e.id))})]})]}),(0,M.jsxs)(`section`,{className:`resume-doc-section`,children:[(0,M.jsx)(`h2`,{children:`자격`}),(0,M.jsxs)(`table`,{className:`resume-table`,children:[(0,M.jsx)(`thead`,{children:(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`th`,{children:`항목`}),(0,M.jsx)(`th`,{children:`취득일`})]})}),(0,M.jsx)(`tbody`,{children:Qf.map(e=>(0,M.jsxs)(`tr`,{children:[(0,M.jsx)(`th`,{scope:`row`,children:e.title}),(0,M.jsx)(`td`,{children:e.date})]},e.id))})]})]})]})]})}var pp=[{path:A.home,element:(0,M.jsx)(Dn,{})},{path:A.projects,element:(0,M.jsx)(kn,{})},{path:`${A.projects}/:slug`,element:(0,M.jsx)(Hn,{})},{path:A.blog,element:(0,M.jsx)(gr,{})},{path:`${A.blog}/:slug`,element:(0,M.jsx)(Hf,{})},{path:A.education,element:(0,M.jsx)(Jf,{})},{path:A.awards,element:(0,M.jsx)(Zf,{})},{path:A.licenses,element:(0,M.jsx)($f,{})},{path:A.resume,element:(0,M.jsx)(fp,{})},{path:A.architecture,element:(0,M.jsx)(sp,{})}];function mp(){return(0,M.jsx)(Nt,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:(0,M.jsx)(hp,{})})}function hp(){let e=qe();return(0,v.useEffect)(()=>{window.scrollTo(0,0)},[e.pathname]),(0,M.jsxs)(`div`,{className:`app-shell`,children:[(0,M.jsx)(Xt,{}),(0,M.jsx)(`main`,{className:`app-main page-enter`,children:(0,M.jsxs)(xt,{location:e,children:[pp.map(e=>(0,M.jsx)(yt,{path:e.path,element:e.element},e.path)),Wt.map(e=>(0,M.jsx)(yt,{path:e.from,element:(0,M.jsx)(vt,{to:e.to,replace:!0})},e.from)),(0,M.jsx)(yt,{path:`*`,element:(0,M.jsx)(Vn,{})})]})},e.pathname),(0,M.jsx)(xn,{}),(0,M.jsx)(wn,{})]})}y.createRoot(document.getElementById(`root`)).render((0,M.jsx)(v.StrictMode,{children:(0,M.jsx)(mp,{})}));