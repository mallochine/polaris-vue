import{b4 as h,bb as p,b8 as F,bC as Or,bD as Ar,bE as Vr,bF as Gr,bG as Kr,ba as Wr,bH as Dr,bI as vr,bJ as Ur}from"./vendor.1a10ce79.js";var $,X;function S(a,r,e){return r in a?Object.defineProperty(a,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):a[r]=e,a}function or(a){return or=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},or(a)}function R(a,r){return Zr(a)||Yr(a,r)||Qr(a,r)||Jr()}function Jr(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qr(a,r){if(!!a){if(typeof a=="string")return pr(a,r);var e=Object.prototype.toString.call(a).slice(8,-1);if(e==="Object"&&a.constructor&&(e=a.constructor.name),e==="Map"||e==="Set")return Array.from(a);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return pr(a,r)}}function pr(a,r){(r==null||r>a.length)&&(r=a.length);for(var e=0,t=new Array(r);e<r;e++)t[e]=a[e];return t}function Yr(a,r){var e=a==null?null:typeof Symbol!="undefined"&&a[Symbol.iterator]||a["@@iterator"];if(e!=null){var t=[],n=!0,o=!1,i,l;try{for(e=e.call(a);!(n=(i=e.next()).done)&&(t.push(i.value),!(r&&t.length===r));n=!0);}catch(u){o=!0,l=u}finally{try{!n&&e.return!=null&&e.return()}finally{if(o)throw l}}return t}}function Zr(a){if(Array.isArray(a))return a}function z(){return(z=Object.assign||function(a){for(var r=1;r<arguments.length;r++){var e=arguments[r];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(a[t]=e[t])}return a}).apply(this,arguments)}function fr(a,r){if(a==null)return{};var e,t,n={},o=Object.keys(a);for(t=0;t<o.length;t++)r.indexOf(e=o[t])>=0||(n[e]=a[e]);return n}function ir(a){var r=p.exports.useRef(a),e=p.exports.useRef(function(t){r.current&&r.current(t)});return r.current=a,e.current}var j=function(r,e,t){return e===void 0&&(e=0),t===void 0&&(t=1),r>t?t:r<e?e:r},q=function(r){return"touches"in r},lr=function(r){return r&&r.ownerDocument.defaultView||self},gr=function(r,e,t){var n=r.getBoundingClientRect(),o=q(e)?function(i,l){for(var u=0;u<i.length;u++)if(i[u].identifier===l)return i[u];return i[0]}(e.touches,t):e;return{left:j((o.pageX-(n.left+lr(r).pageXOffset))/n.width),top:j((o.pageY-(n.top+lr(r).pageYOffset))/n.height)}},br=function(r){!q(r)&&r.preventDefault()},hr=h.memo(function(a){var r=a.onMove,e=a.onKey,t=fr(a,["onMove","onKey"]),n=p.exports.useRef(null),o=ir(r),i=ir(e),l=p.exports.useRef(null),u=p.exports.useRef(!1),c=p.exports.useMemo(function(){var k=function(d){br(d),(q(d)?d.touches.length>0:d.buttons>0)&&n.current?o(gr(n.current,d,l.current)):O(!1)},M=function(){return O(!1)};function O(y){var d=u.current,g=lr(n.current),b=y?g.addEventListener:g.removeEventListener;b(d?"touchmove":"mousemove",k),b(d?"touchend":"mouseup",M)}return[function(y){var d=y.nativeEvent,g=n.current;if(g&&(br(d),!function(E,C){return C&&!q(E)}(d,u.current)&&g)){if(q(d)){u.current=!0;var b=d.changedTouches||[];b.length&&(l.current=b[0].identifier)}g.focus(),o(gr(g,d,l.current)),O(!0)}},function(y){var d=y.which||y.keyCode;d<37||d>40||(y.preventDefault(),i({left:d===39?.05:d===37?-.05:0,top:d===40?.05:d===38?-.05:0}))},O]},[i,o]),v=c[0],f=c[1],x=c[2];return p.exports.useEffect(function(){return x},[x]),h.createElement("div",z({},t,{onTouchStart:v,onMouseDown:v,className:"react-colorful__interactive",ref:n,onKeyDown:f,tabIndex:0,role:"slider"}))}),G=function(r){return r.filter(Boolean).join(" ")},dr=function(r){var e=r.color,t=r.left,n=r.top,o=n===void 0?.5:n,i=G(["react-colorful__pointer",r.className]);return h.createElement("div",{className:i,style:{top:100*o+"%",left:100*t+"%"}},h.createElement("div",{className:"react-colorful__pointer-fill",style:{backgroundColor:e}}))},_=function(r,e,t){return e===void 0&&(e=0),t===void 0&&(t=Math.pow(10,e)),Math.round(t*r)/t},re={grad:.9,turn:360,rad:360/(2*Math.PI)},rr=function(r){return r[0]==="#"&&(r=r.substr(1)),r.length<6?{r:parseInt(r[0]+r[0],16),g:parseInt(r[1]+r[1],16),b:parseInt(r[2]+r[2],16),a:1}:{r:parseInt(r.substr(0,2),16),g:parseInt(r.substr(2,2),16),b:parseInt(r.substr(4,2),16),a:1}},ee=function(r,e){return e===void 0&&(e="deg"),Number(r)*(re[e]||1)},ae=function(r){var e=/hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(r);return e?te({h:ee(e[1],e[2]),s:Number(e[3]),l:Number(e[4]),a:e[5]===void 0?1:Number(e[5])/(e[6]?100:1)}):{h:0,s:0,v:0,a:1}},te=function(r){var e=r.s,t=r.l;return{h:r.h,s:(e*=(t<50?t:100-t)/100)>0?2*e/(t+e)*100:0,v:t+e,a:r.a}},Ir=function(r){var e=r.s,t=r.v,n=r.a,o=(200-e)*t/100;return{h:_(r.h),s:_(o>0&&o<200?e*t/100/(o<=100?o:200-o)*100:0),l:_(o/2),a:_(n,2)}},ur=function(r){var e=Ir(r);return"hsl("+e.h+", "+e.s+"%, "+e.l+"%)"},J=function(r){var e=Ir(r);return"hsla("+e.h+", "+e.s+"%, "+e.l+"%, "+e.a+")"},Hr=function(r){var e=r.h,t=r.s,n=r.v,o=r.a;e=e/360*6,t/=100,n/=100;var i=Math.floor(e),l=n*(1-t),u=n*(1-(e-i)*t),c=n*(1-(1-e+i)*t),v=i%6;return{r:_(255*[n,u,l,l,c,n][v]),g:_(255*[c,n,n,u,l,l][v]),b:_(255*[l,l,c,n,n,u][v]),a:_(o,2)}},ne=function(r){var e=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(r);return e?Rr({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):{h:0,s:0,v:0,a:1}},er=function(r){var e=r.toString(16);return e.length<2?"0"+e:e},Rr=function(r){var e=r.r,t=r.g,n=r.b,o=r.a,i=Math.max(e,t,n),l=i-Math.min(e,t,n),u=l?i===e?(t-n)/l:i===t?2+(n-e)/l:4+(e-t)/l:0;return{h:_(60*(u<0?u+6:u)),s:_(i?l/i*100:0),v:_(i/255*100),a:o}},Nr=h.memo(function(a){var r=a.hue,e=a.onChange,t=G(["react-colorful__hue",a.className]);return h.createElement("div",{className:t},h.createElement(hr,{onMove:function(o){e({h:360*o.left})},onKey:function(o){e({h:j(r+360*o.left,0,360)})},"aria-label":"Hue","aria-valuetext":_(r)},h.createElement(dr,{className:"react-colorful__hue-pointer",left:r/360,color:ur({h:r,s:100,v:100,a:1})})))}),Tr=h.memo(function(a){var r=a.hsva,e=a.onChange,t={backgroundColor:ur({h:r.h,s:100,v:100,a:1})};return h.createElement("div",{className:"react-colorful__saturation",style:t},h.createElement(hr,{onMove:function(o){e({s:100*o.left,v:100-100*o.top})},onKey:function(o){e({s:j(r.s+100*o.left,0,100),v:j(r.v-100*o.top,0,100)})},"aria-label":"Color","aria-valuetext":"Saturation "+_(r.s)+"%, Brightness "+_(r.v)+"%"},h.createElement(dr,{className:"react-colorful__saturation-pointer",top:1-r.v/100,left:r.s/100,color:ur(r)})))}),Fr=function(r,e){if(r===e)return!0;for(var t in r)if(r[t]!==e[t])return!1;return!0},Pr=function(r,e){return r.replace(/\s/g,"")===e.replace(/\s/g,"")};function zr(a,r,e){var t=ir(e),n=p.exports.useState(function(){return a.toHsva(r)}),o=n[0],i=n[1],l=p.exports.useRef({color:r,hsva:o});p.exports.useEffect(function(){if(!a.equal(r,l.current.color)){var c=a.toHsva(r);l.current={hsva:c,color:r},i(c)}},[r,a]),p.exports.useEffect(function(){var c;Fr(o,l.current.hsva)||a.equal(c=a.fromHsva(o),l.current.color)||(l.current={hsva:o,color:c},t(c))},[o,a,t]);var u=p.exports.useCallback(function(c){i(function(v){return Object.assign({},v,c)})},[]);return[o,u]}var oe=typeof window!="undefined"?p.exports.useLayoutEffect:p.exports.useEffect,ie=function(){return typeof __webpack_nonce__!="undefined"?__webpack_nonce__:void 0},mr=new Map,Lr=function(r){oe(function(){var e=r.current?r.current.ownerDocument:document;if(e!==void 0&&!mr.has(e)){var t=e.createElement("style");t.innerHTML=`.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}`,mr.set(e,t);var n=ie();n&&t.setAttribute("nonce",n),e.head.appendChild(t)}},[])},le=function(r){var e=r.className,t=r.colorModel,n=r.color,o=n===void 0?t.defaultColor:n,i=r.onChange,l=fr(r,["className","colorModel","color","onChange"]),u=p.exports.useRef(null);Lr(u);var c=zr(t,o,i),v=c[0],f=c[1],x=G(["react-colorful",e]);return h.createElement("div",z({},l,{ref:u,className:x}),h.createElement(Tr,{hsva:v,onChange:f}),h.createElement(Nr,{hue:v.h,onChange:f,className:"react-colorful__last-control"}))},ue={defaultColor:"000",toHsva:function(r){return Rr(rr(r))},fromHsva:function(r){return t=(e=Hr(r)).g,n=e.b,"#"+er(e.r)+er(t)+er(n);var e,t,n},equal:function(r,e){return r.toLowerCase()===e.toLowerCase()||Fr(rr(r),rr(e))}},ce=function(r){return h.createElement(le,z({},r,{colorModel:ue}))},se=function(r){var e=r.className,t=r.hsva,n=r.onChange,o={backgroundImage:"linear-gradient(90deg, "+J(Object.assign({},t,{a:0}))+", "+J(Object.assign({},t,{a:1}))+")"},i=G(["react-colorful__alpha",e]);return h.createElement("div",{className:i},h.createElement("div",{className:"react-colorful__alpha-gradient",style:o}),h.createElement(hr,{onMove:function(u){n({a:u.left})},onKey:function(u){n({a:j(t.a+u.left)})},"aria-label":"Alpha","aria-valuetext":_(100*t.a)+"%"},h.createElement(dr,{className:"react-colorful__alpha-pointer",left:t.a,color:J(t)})))},jr=function(r){var e=r.className,t=r.colorModel,n=r.color,o=n===void 0?t.defaultColor:n,i=r.onChange,l=fr(r,["className","colorModel","color","onChange"]),u=p.exports.useRef(null);Lr(u);var c=zr(t,o,i),v=c[0],f=c[1],x=G(["react-colorful",e]);return h.createElement("div",z({},l,{ref:u,className:x}),h.createElement(Tr,{hsva:v,onChange:f}),h.createElement(Nr,{hue:v.h,onChange:f}),h.createElement(se,{hsva:v,onChange:f,className:"react-colorful__last-control"}))},ve={defaultColor:"hsla(0, 0%, 0%, 1)",toHsva:ae,fromHsva:J,equal:Pr},fe=function(r){return h.createElement(jr,z({},r,{colorModel:ve}))},he={defaultColor:"rgba(0, 0, 0, 1)",toHsva:ne,fromHsva:function(r){var e=Hr(r);return"rgba("+e.r+", "+e.g+", "+e.b+", "+e.a+")"},equal:Pr},de=function(r){return h.createElement(jr,z({},r,{colorModel:he}))},pe={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},V=pe,Br={};for(var ar=0,yr=Object.keys(V);ar<yr.length;ar++){var xr=yr[ar];Br[V[xr]]=xr}var s={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}},$r=s;for(var tr=0,wr=Object.keys(s);tr<wr.length;tr++){var I=wr[tr];if(!("channels"in s[I]))throw new Error("missing channels property: "+I);if(!("labels"in s[I]))throw new Error("missing channel labels property: "+I);if(s[I].labels.length!==s[I].channels)throw new Error("channel and label counts mismatch: "+I);var kr=s[I],ge=kr.channels,be=kr.labels;delete s[I].channels,delete s[I].labels,Object.defineProperty(s[I],"channels",{value:ge}),Object.defineProperty(s[I],"labels",{value:be})}s.rgb.hsl=function(a){var r=a[0]/255,e=a[1]/255,t=a[2]/255,n=Math.min(r,e,t),o=Math.max(r,e,t),i=o-n,l,u;o===n?l=0:r===o?l=(e-t)/i:e===o?l=2+(t-r)/i:t===o&&(l=4+(r-e)/i),l=Math.min(l*60,360),l<0&&(l+=360);var c=(n+o)/2;return o===n?u=0:c<=.5?u=i/(o+n):u=i/(2-o-n),[l,u*100,c*100]};s.rgb.hsv=function(a){var r,e,t,n,o,i=a[0]/255,l=a[1]/255,u=a[2]/255,c=Math.max(i,l,u),v=c-Math.min(i,l,u),f=function(k){return(c-k)/6/v+1/2};return v===0?(n=0,o=0):(o=v/c,r=f(i),e=f(l),t=f(u),i===c?n=t-e:l===c?n=1/3+r-t:u===c&&(n=2/3+e-r),n<0?n+=1:n>1&&(n-=1)),[n*360,o*100,c*100]};s.rgb.hwb=function(a){var r=a[0],e=a[1],t=a[2],n=s.rgb.hsl(a)[0],o=1/255*Math.min(r,Math.min(e,t));return t=1-1/255*Math.max(r,Math.max(e,t)),[n,o*100,t*100]};s.rgb.cmyk=function(a){var r=a[0]/255,e=a[1]/255,t=a[2]/255,n=Math.min(1-r,1-e,1-t),o=(1-r-n)/(1-n)||0,i=(1-e-n)/(1-n)||0,l=(1-t-n)/(1-n)||0;return[o*100,i*100,l*100,n*100]};function me(a,r){return Math.pow(a[0]-r[0],2)+Math.pow(a[1]-r[1],2)+Math.pow(a[2]-r[2],2)}s.rgb.keyword=function(a){var r=Br[a];if(r)return r;for(var e=1/0,t,n=0,o=Object.keys(V);n<o.length;n++){var i=o[n],l=V[i],u=me(a,l);u<e&&(e=u,t=i)}return t};s.keyword.rgb=function(a){return V[a]};s.rgb.xyz=function(a){var r=a[0]/255,e=a[1]/255,t=a[2]/255;r=r>.04045?Math.pow((r+.055)/1.055,2.4):r/12.92,e=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,t=t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92;var n=r*.4124+e*.3576+t*.1805,o=r*.2126+e*.7152+t*.0722,i=r*.0193+e*.1192+t*.9505;return[n*100,o*100,i*100]};s.rgb.lab=function(a){var r=s.rgb.xyz(a),e=r[0],t=r[1],n=r[2];e/=95.047,t/=100,n/=108.883,e=e>.008856?Math.pow(e,1/3):7.787*e+16/116,t=t>.008856?Math.pow(t,1/3):7.787*t+16/116,n=n>.008856?Math.pow(n,1/3):7.787*n+16/116;var o=116*t-16,i=500*(e-t),l=200*(t-n);return[o,i,l]};s.hsl.rgb=function(a){var r=a[0]/360,e=a[1]/100,t=a[2]/100,n,o,i;if(e===0)return i=t*255,[i,i,i];t<.5?n=t*(1+e):n=t+e-t*e;for(var l=2*t-n,u=[0,0,0],c=0;c<3;c++)o=r+1/3*-(c-1),o<0&&o++,o>1&&o--,6*o<1?i=l+(n-l)*6*o:2*o<1?i=n:3*o<2?i=l+(n-l)*(2/3-o)*6:i=l,u[c]=i*255;return u};s.hsl.hsv=function(a){var r=a[0],e=a[1]/100,t=a[2]/100,n=e,o=Math.max(t,.01);t*=2,e*=t<=1?t:2-t,n*=o<=1?o:2-o;var i=(t+e)/2,l=t===0?2*n/(o+n):2*e/(t+e);return[r,l*100,i*100]};s.hsv.rgb=function(a){var r=a[0]/60,e=a[1]/100,t=a[2]/100,n=Math.floor(r)%6,o=r-Math.floor(r),i=255*t*(1-e),l=255*t*(1-e*o),u=255*t*(1-e*(1-o));switch(t*=255,n){case 0:return[t,u,i];case 1:return[l,t,i];case 2:return[i,t,u];case 3:return[i,l,t];case 4:return[u,i,t];case 5:return[t,i,l]}};s.hsv.hsl=function(a){var r=a[0],e=a[1]/100,t=a[2]/100,n=Math.max(t,.01),o,i;i=(2-e)*t;var l=(2-e)*n;return o=e*n,o/=l<=1?l:2-l,o=o||0,i/=2,[r,o*100,i*100]};s.hwb.rgb=function(a){var r=a[0]/360,e=a[1]/100,t=a[2]/100,n=e+t,o;n>1&&(e/=n,t/=n);var i=Math.floor(6*r),l=1-t;o=6*r-i,(i&1)!==0&&(o=1-o);var u=e+o*(l-e),c,v,f;switch(i){default:case 6:case 0:c=l,v=u,f=e;break;case 1:c=u,v=l,f=e;break;case 2:c=e,v=l,f=u;break;case 3:c=e,v=u,f=l;break;case 4:c=u,v=e,f=l;break;case 5:c=l,v=e,f=u;break}return[c*255,v*255,f*255]};s.cmyk.rgb=function(a){var r=a[0]/100,e=a[1]/100,t=a[2]/100,n=a[3]/100,o=1-Math.min(1,r*(1-n)+n),i=1-Math.min(1,e*(1-n)+n),l=1-Math.min(1,t*(1-n)+n);return[o*255,i*255,l*255]};s.xyz.rgb=function(a){var r=a[0]/100,e=a[1]/100,t=a[2]/100,n,o,i;return n=r*3.2406+e*-1.5372+t*-.4986,o=r*-.9689+e*1.8758+t*.0415,i=r*.0557+e*-.204+t*1.057,n=n>.0031308?1.055*Math.pow(n,1/2.4)-.055:n*12.92,o=o>.0031308?1.055*Math.pow(o,1/2.4)-.055:o*12.92,i=i>.0031308?1.055*Math.pow(i,1/2.4)-.055:i*12.92,n=Math.min(Math.max(0,n),1),o=Math.min(Math.max(0,o),1),i=Math.min(Math.max(0,i),1),[n*255,o*255,i*255]};s.xyz.lab=function(a){var r=a[0],e=a[1],t=a[2];r/=95.047,e/=100,t/=108.883,r=r>.008856?Math.pow(r,1/3):7.787*r+16/116,e=e>.008856?Math.pow(e,1/3):7.787*e+16/116,t=t>.008856?Math.pow(t,1/3):7.787*t+16/116;var n=116*e-16,o=500*(r-e),i=200*(e-t);return[n,o,i]};s.lab.xyz=function(a){var r=a[0],e=a[1],t=a[2],n,o,i;o=(r+16)/116,n=e/500+o,i=o-t/200;var l=Math.pow(o,3),u=Math.pow(n,3),c=Math.pow(i,3);return o=l>.008856?l:(o-16/116)/7.787,n=u>.008856?u:(n-16/116)/7.787,i=c>.008856?c:(i-16/116)/7.787,n*=95.047,o*=100,i*=108.883,[n,o,i]};s.lab.lch=function(a){var r=a[0],e=a[1],t=a[2],n,o=Math.atan2(t,e);n=o*360/2/Math.PI,n<0&&(n+=360);var i=Math.sqrt(e*e+t*t);return[r,i,n]};s.lch.lab=function(a){var r=a[0],e=a[1],t=a[2],n=t/360*2*Math.PI,o=e*Math.cos(n),i=e*Math.sin(n);return[r,o,i]};s.rgb.ansi16=function(a){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null,e=R(a,3),t=e[0],n=e[1],o=e[2],i=r===null?s.rgb.hsv(a)[2]:r;if(i=Math.round(i/50),i===0)return 30;var l=30+(Math.round(o/255)<<2|Math.round(n/255)<<1|Math.round(t/255));return i===2&&(l+=60),l};s.hsv.ansi16=function(a){return s.rgb.ansi16(s.hsv.rgb(a),a[2])};s.rgb.ansi256=function(a){var r=a[0],e=a[1],t=a[2];if(r===e&&e===t)return r<8?16:r>248?231:Math.round((r-8)/247*24)+232;var n=16+36*Math.round(r/255*5)+6*Math.round(e/255*5)+Math.round(t/255*5);return n};s.ansi16.rgb=function(a){var r=a%10;if(r===0||r===7)return a>50&&(r+=3.5),r=r/10.5*255,[r,r,r];var e=(~~(a>50)+1)*.5,t=(r&1)*e*255,n=(r>>1&1)*e*255,o=(r>>2&1)*e*255;return[t,n,o]};s.ansi256.rgb=function(a){if(a>=232){var r=(a-232)*10+8;return[r,r,r]}a-=16;var e,t=Math.floor(a/36)/5*255,n=Math.floor((e=a%36)/6)/5*255,o=e%6/5*255;return[t,n,o]};s.rgb.hex=function(a){var r=((Math.round(a[0])&255)<<16)+((Math.round(a[1])&255)<<8)+(Math.round(a[2])&255),e=r.toString(16).toUpperCase();return"000000".substring(e.length)+e};s.hex.rgb=function(a){var r=a.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!r)return[0,0,0];var e=r[0];r[0].length===3&&(e=e.split("").map(function(l){return l+l}).join(""));var t=parseInt(e,16),n=t>>16&255,o=t>>8&255,i=t&255;return[n,o,i]};s.rgb.hcg=function(a){var r=a[0]/255,e=a[1]/255,t=a[2]/255,n=Math.max(Math.max(r,e),t),o=Math.min(Math.min(r,e),t),i=n-o,l,u;return i<1?l=o/(1-i):l=0,i<=0?u=0:n===r?u=(e-t)/i%6:n===e?u=2+(t-r)/i:u=4+(r-e)/i,u/=6,u%=1,[u*360,i*100,l*100]};s.hsl.hcg=function(a){var r=a[1]/100,e=a[2]/100,t=e<.5?2*r*e:2*r*(1-e),n=0;return t<1&&(n=(e-.5*t)/(1-t)),[a[0],t*100,n*100]};s.hsv.hcg=function(a){var r=a[1]/100,e=a[2]/100,t=r*e,n=0;return t<1&&(n=(e-t)/(1-t)),[a[0],t*100,n*100]};s.hcg.rgb=function(a){var r=a[0]/360,e=a[1]/100,t=a[2]/100;if(e===0)return[t*255,t*255,t*255];var n=[0,0,0],o=r%1*6,i=o%1,l=1-i,u=0;switch(Math.floor(o)){case 0:n[0]=1,n[1]=i,n[2]=0;break;case 1:n[0]=l,n[1]=1,n[2]=0;break;case 2:n[0]=0,n[1]=1,n[2]=i;break;case 3:n[0]=0,n[1]=l,n[2]=1;break;case 4:n[0]=i,n[1]=0,n[2]=1;break;default:n[0]=1,n[1]=0,n[2]=l}return u=(1-e)*t,[(e*n[0]+u)*255,(e*n[1]+u)*255,(e*n[2]+u)*255]};s.hcg.hsv=function(a){var r=a[1]/100,e=a[2]/100,t=r+e*(1-r),n=0;return t>0&&(n=r/t),[a[0],n*100,t*100]};s.hcg.hsl=function(a){var r=a[1]/100,e=a[2]/100,t=e*(1-r)+.5*r,n=0;return t>0&&t<.5?n=r/(2*t):t>=.5&&t<1&&(n=r/(2*(1-t))),[a[0],n*100,t*100]};s.hcg.hwb=function(a){var r=a[1]/100,e=a[2]/100,t=r+e*(1-r);return[a[0],(t-r)*100,(1-t)*100]};s.hwb.hcg=function(a){var r=a[1]/100,e=a[2]/100,t=1-e,n=t-r,o=0;return n<1&&(o=(t-n)/(1-n)),[a[0],n*100,o*100]};s.apple.rgb=function(a){return[a[0]/65535*255,a[1]/65535*255,a[2]/65535*255]};s.rgb.apple=function(a){return[a[0]/255*65535,a[1]/255*65535,a[2]/255*65535]};s.gray.rgb=function(a){return[a[0]/100*255,a[0]/100*255,a[0]/100*255]};s.gray.hsl=function(a){return[0,0,a[0]]};s.gray.hsv=s.gray.hsl;s.gray.hwb=function(a){return[0,100,a[0]]};s.gray.cmyk=function(a){return[0,0,0,a[0]]};s.gray.lab=function(a){return[a[0],0,0]};s.gray.hex=function(a){var r=Math.round(a[0]/100*255)&255,e=(r<<16)+(r<<8)+r,t=e.toString(16).toUpperCase();return"000000".substring(t.length)+t};s.rgb.gray=function(a){var r=(a[0]+a[1]+a[2])/3;return[r/255*100]};var Q=$r;function ye(){for(var a={},r=Object.keys(Q),e=r.length,t=0;t<e;t++)a[r[t]]={distance:-1,parent:null};return a}function xe(a){var r=ye(),e=[a];for(r[a].distance=0;e.length;)for(var t=e.pop(),n=Object.keys(Q[t]),o=n.length,i=0;i<o;i++){var l=n[i],u=r[l];u.distance===-1&&(u.distance=r[t].distance+1,u.parent=t,e.unshift(l))}return r}function we(a,r){return function(e){return r(a(e))}}function ke(a,r){for(var e=[r[a].parent,a],t=Q[r[a].parent][a],n=r[a].parent;r[n].parent;)e.unshift(r[n].parent),t=we(Q[r[n].parent][n],t),n=r[n].parent;return t.conversion=e,t}var Ee=function(r){for(var e=xe(r),t={},n=Object.keys(e),o=n.length,i=0;i<o;i++){var l=n[i],u=e[l];u.parent!==null&&(t[l]=ke(l,e))}return t},cr=$r,Me=Ee,L={},Ce=Object.keys(cr);function Se(a){var r=function(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];var i=n[0];return i==null?i:(i.length>1&&(n=i),a(n))};return"conversion"in a&&(r.conversion=a.conversion),r}function _e(a){var r=function(){for(var t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];var i=n[0];if(i==null)return i;i.length>1&&(n=i);var l=a(n);if(or(l)==="object")for(var u=l.length,c=0;c<u;c++)l[c]=Math.round(l[c]);return l};return"conversion"in a&&(r.conversion=a.conversion),r}Ce.forEach(function(a){L[a]={},Object.defineProperty(L[a],"channels",{value:cr[a].channels}),Object.defineProperty(L[a],"labels",{value:cr[a].labels});var r=Me(a),e=Object.keys(r);e.forEach(function(t){var n=r[t];L[a][t]=_e(n),L[a][t].raw=Se(n)})});var H=L,Oe=Dr,Ie=function(){return Oe.Date.now()},He=Ie,Re=/\s/;function Ne(a){for(var r=a.length;r--&&Re.test(a.charAt(r)););return r}var Te=Ne,Fe=Te,Pe=/^\s+/;function ze(a){return a&&a.slice(0,Fe(a)+1).replace(Pe,"")}var Le=ze,je=Le,Er=vr,Be=Ur,Mr=0/0,$e=/^[-+]0x[0-9a-f]+$/i,Xe=/^0b[01]+$/i,qe=/^0o[0-7]+$/i,Ae=parseInt;function Ve(a){if(typeof a=="number")return a;if(Be(a))return Mr;if(Er(a)){var r=typeof a.valueOf=="function"?a.valueOf():a;a=Er(r)?r+"":r}if(typeof a!="string")return a===0?a:+a;a=je(a);var e=Xe.test(a);return e||qe.test(a)?Ae(a.slice(2),e?2:8):$e.test(a)?Mr:+a}var Ge=Ve,Ke=vr,nr=He,Cr=Ge,We="Expected a function",De=Math.max,Ue=Math.min;function Je(a,r,e){var t,n,o,i,l,u,c=0,v=!1,f=!1,x=!0;if(typeof a!="function")throw new TypeError(We);r=Cr(r)||0,Ke(e)&&(v=!!e.leading,f="maxWait"in e,o=f?De(Cr(e.maxWait)||0,r):o,x="trailing"in e?!!e.trailing:x);function k(w){var N=t,T=n;return t=n=void 0,c=w,i=a.apply(T,N),i}function M(w){return c=w,l=setTimeout(d,r),v?k(w):i}function O(w){var N=w-u,T=w-c,K=r-N;return f?Ue(K,o-T):K}function y(w){var N=w-u,T=w-c;return u===void 0||N>=r||N<0||f&&T>=o}function d(){var w=nr();if(y(w))return g(w);l=setTimeout(d,O(w))}function g(w){return l=void 0,x&&t?k(w):(t=n=void 0,i)}function b(){l!==void 0&&clearTimeout(l),c=0,t=u=n=l=void 0}function E(){return l===void 0?i:g(nr())}function C(){var w=nr(),N=y(w);if(t=arguments,n=this,u=w,N){if(l===void 0)return M(u);if(f)return clearTimeout(l),l=setTimeout(d,r),k(u)}return l===void 0&&(l=setTimeout(d,r)),i}return C.cancel=b,C.flush=E,C}var Qe=Je,Ye=Qe,Ze=vr,ra="Expected a function";function ea(a,r,e){var t=!0,n=!0;if(typeof a!="function")throw new TypeError(ra);return Ze(e)&&(t="leading"in e?!!e.leading:t,n="trailing"in e?!!e.trailing:n),Ye(a,r,{leading:t,maxWait:r,trailing:n})}var aa=ea,ta=F.div({position:"relative",maxWidth:250}),na=F(Or)({position:"absolute",zIndex:1,top:4,left:4}),oa=F.div({width:200,margin:5,".react-colorful__saturation":{borderRadius:"4px 4px 0 0"},".react-colorful__hue":{boxShadow:"inset 0 0 0 1px rgb(0 0 0 / 5%)"},".react-colorful__last-control":{borderRadius:"0 0 4px 4px"}}),ia=F(Ar)(function(a){var r=a.theme;return{fontFamily:r.typography.fonts.base}}),la=F.div({display:"grid",gridTemplateColumns:"repeat(9, 16px)",gap:6,padding:3,marginTop:5,width:200}),ua=F.div(function(a){var r=a.theme,e=a.active;return{width:16,height:16,boxShadow:e?"".concat(r.appBorderColor," 0 0 0 1px inset, ").concat(r.color.mediumdark,"50 0 0 0 4px"):"".concat(r.appBorderColor," 0 0 0 1px inset"),borderRadius:r.appBorderRadius}}),ca=`url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`,Sr=function(r){var e=r.value,t=r.active,n=r.onClick,o=r.style,i=Wr(r,["value","active","onClick","style"]),l="linear-gradient(".concat(e,", ").concat(e,"), ").concat(ca,", linear-gradient(#fff, #fff)");return h.createElement(ua,Object.assign({},i,{active:t,onClick:n},{style:Object.assign(Object.assign({},o),{backgroundImage:l})}))},sa=F(Vr.Input)(function(a){var r=a.theme;return{width:"100%",paddingLeft:30,paddingRight:30,boxSizing:"border-box",fontFamily:r.typography.fonts.base}}),va=F(Gr)(function(a){var r=a.theme;return{position:"absolute",zIndex:1,top:6,right:7,width:20,height:20,padding:4,boxSizing:"border-box",cursor:"pointer",color:r.input.color}}),m;(function(a){a.RGB="rgb",a.HSL="hsl",a.HEX="hex"})(m||(m={}));var D=Object.values(m),fa=/\(([0-9]+),\s*([0-9]+)%?,\s*([0-9]+)%?,?\s*([0-9.]+)?\)/,ha=/^\s*rgba?\(([0-9]+),\s*([0-9]+),\s*([0-9]+),?\s*([0-9.]+)?\)\s*$/i,da=/^\s*hsla?\(([0-9]+),\s*([0-9]+)%,\s*([0-9]+)%,?\s*([0-9.]+)?\)\s*$/i,sr=/^\s*#?([0-9a-f]{3}|[0-9a-f]{6})\s*$/i,pa=/^\s*#?([0-9a-f]{3})\s*$/i,ga=($={},S($,m.HEX,ce),S($,m.RGB,de),S($,m.HSL,fe),$),U=(X={},S(X,m.HEX,"transparent"),S(X,m.RGB,"rgba(0, 0, 0, 0)"),S(X,m.HSL,"hsla(0, 0%, 0%, 0)"),X),_r=function(r){var e=r==null?void 0:r.match(fa);if(!e)return[0,0,0,1];var t=R(e,5),n=t[1],o=t[2],i=t[3],l=t[4],u=l===void 0?1:l;return[n,o,i,u].map(Number)},A=function(r){var e;if(!!r){var t=!0;if(ha.test(r)){var n,o=_r(r),i=R(o,4),l=i[0],u=i[1],c=i[2],v=i[3],f=H.rgb.hsl([l,u,c])||[0,0,0],x=R(f,3),k=x[0],M=x[1],O=x[2];return n={valid:t,value:r,keyword:H.rgb.keyword([l,u,c]),colorSpace:m.RGB},S(n,m.RGB,r),S(n,m.HSL,"hsla(".concat(k,", ").concat(M,"%, ").concat(O,"%, ").concat(v,")")),S(n,m.HEX,"#".concat(H.rgb.hex([l,u,c]).toLowerCase())),n}if(da.test(r)){var y,d=_r(r),g=R(d,4),b=g[0],E=g[1],C=g[2],w=g[3],N=H.hsl.rgb([b,E,C])||[0,0,0],T=R(N,3),K=T[0],Xr=T[1],qr=T[2];return y={valid:t,value:r,keyword:H.hsl.keyword([b,E,C]),colorSpace:m.HSL},S(y,m.RGB,"rgba(".concat(K,", ").concat(Xr,", ").concat(qr,", ").concat(w,")")),S(y,m.HSL,r),S(y,m.HEX,"#".concat(H.hsl.hex([b,E,C]).toLowerCase())),y}var W=r.replace("#",""),B=H.keyword.rgb(W)||H.hex.rgb(W),Z=H.rgb.hsl(B),P=r;if(/[^#a-f0-9]/i.test(r)?P=W:sr.test(r)&&(P="#".concat(W)),P.startsWith("#"))t=sr.test(P);else try{H.keyword.hex(P)}catch{t=!1}return e={valid:t,value:P,keyword:H.rgb.keyword(B),colorSpace:m.HEX},S(e,m.RGB,"rgba(".concat(B[0],", ").concat(B[1],", ").concat(B[2],", 1)")),S(e,m.HSL,"hsla(".concat(Z[0],", ").concat(Z[1],"%, ").concat(Z[2],"%, 1)")),S(e,m.HEX,P),e}},ba=function(r,e,t){if(!r||!(e==null?void 0:e.valid))return U[t];if(t!==m.HEX)return(e==null?void 0:e[t])||U[t];if(!e.hex.startsWith("#"))try{return"#".concat(H.keyword.hex(e.hex))}catch{return U.hex}var n=e.hex.match(pa);if(!n)return sr.test(e.hex)?e.hex:U.hex;var o=n[1].split(""),i=R(o,3),l=i[0],u=i[1],c=i[2];return"#".concat(l).concat(l).concat(u).concat(u).concat(c).concat(c)},ma=function(r,e){var t=p.exports.useState(r||""),n=R(t,2),o=n[0],i=n[1],l=p.exports.useState(function(){return A(o)}),u=R(l,2),c=u[0],v=u[1],f=p.exports.useState((c==null?void 0:c.colorSpace)||m.HEX),x=R(f,2),k=x[0],M=x[1];p.exports.useEffect(function(){r===void 0&&(i(""),v(void 0),M(m.HEX))},[r]);var O=p.exports.useMemo(function(){return ba(o,c,k).toLowerCase()},[o,c,k]),y=p.exports.useCallback(function(g){var b=A(g);i((b==null?void 0:b.value)||g||""),!!b&&(v(b),M(b.colorSpace),e(b.value))},[e]),d=p.exports.useCallback(function(){var g=D.indexOf(k)+1;g>=D.length&&(g=0),M(D[g]);var b=(c==null?void 0:c[D[g]])||"";i(b),e(b)},[c,k,e]);return{value:o,realValue:O,updateValue:y,color:c,colorSpace:k,cycleColorSpace:d}},Y=function(r){return r.replace(/\s*/,"").toLowerCase()},ya=function(r,e,t){var n=p.exports.useState((e==null?void 0:e.valid)?[e]:[]),o=R(n,2),i=o[0],l=o[1];p.exports.useEffect(function(){e===void 0&&l([])},[e]);var u=p.exports.useMemo(function(){var v=(r||[]).map(function(f){return typeof f=="string"?A(f):f.title?Object.assign(Object.assign({},A(f.color)),{keyword:f.title}):A(f.color)});return v.concat(i).filter(Boolean).slice(-27)},[r,i]),c=p.exports.useCallback(function(v){!(v==null?void 0:v.valid)||u.some(function(f){return Y(f[t])===Y(v[t])})||l(function(f){return f.concat(v)})},[t,u]);return{presets:u,addPreset:c}},ka=function(r){var e=r.name,t=r.value,n=r.onChange,o=r.onFocus,i=r.onBlur,l=r.presetColors,u=r.startOpen,c=ma(t,aa(n,200)),v=c.value,f=c.realValue,x=c.updateValue,k=c.color,M=c.colorSpace,O=c.cycleColorSpace,y=ya(l,k,M),d=y.presets,g=y.addPreset,b=ga[M];return h.createElement(ta,null,h.createElement(na,{trigger:"click",startOpen:u,closeOnClick:!0,onVisibilityChange:function(){return g(k)},tooltip:h.createElement(oa,null,h.createElement(b,Object.assign({color:f==="transparent"?"#000000":f},{onChange:x,onFocus:o,onBlur:i})),d.length>0&&h.createElement(la,null,d.map(function(E,C){return h.createElement(Or,{key:"".concat(E.value,"-").concat(C),hasChrome:!1,tooltip:h.createElement(ia,{note:E.keyword||E.value})},h.createElement(Sr,{value:E[M],active:k&&Y(E[M])===Y(k[M]),onClick:function(){return x(E.value)}}))})))},h.createElement(Sr,{value:f,style:{margin:4}})),h.createElement(sa,{id:Kr(e),value:v,onChange:function(C){return x(C.target.value)},onFocus:function(C){return C.target.select()},placeholder:"Choose color..."}),v?h.createElement(va,{icon:"markup",onClick:O}):null)};export{ka as ColorControl,ka as default};
//# sourceMappingURL=Color-01c31ae2.70b293b4.js.map
