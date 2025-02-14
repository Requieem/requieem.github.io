import{g as h}from"./index-DbvavOW-.js";function g(r,l){for(var i=0;i<l.length;i++){const o=l[i];if(typeof o!="string"&&!Array.isArray(o)){for(const a in o)if(a!=="default"&&!(a in r)){const e=Object.getOwnPropertyDescriptor(o,a);e&&Object.defineProperty(r,a,e.get?e:{enumerable:!0,get:()=>o[a]})}}}return Object.freeze(Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}))}var c,k;function O(){if(k)return c;k=1,c=r,r.displayName="textile",r.aliases=[];function r(l){(function(i){var o=/\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\}/.source,a=/\)|\((?![^|()\n]+\))/.source;function e(m,f){return RegExp(m.replace(/<MOD>/g,function(){return"(?:"+o+")"}).replace(/<PAR>/g,function(){return"(?:"+a+")"}),f||"")}var s={css:{pattern:/\{[^{}]+\}/,inside:{rest:i.languages.css}},"class-id":{pattern:/(\()[^()]+(?=\))/,lookbehind:!0,alias:"attr-value"},lang:{pattern:/(\[)[^\[\]]+(?=\])/,lookbehind:!0,alias:"attr-value"},punctuation:/[\\\/]\d+|\S/},p=i.languages.textile=i.languages.extend("markup",{phrase:{pattern:/(^|\r|\n)\S[\s\S]*?(?=$|\r?\n\r?\n|\r\r)/,lookbehind:!0,inside:{"block-tag":{pattern:e(/^[a-z]\w*(?:<MOD>|<PAR>|[<>=])*\./.source),inside:{modifier:{pattern:e(/(^[a-z]\w*)(?:<MOD>|<PAR>|[<>=])+(?=\.)/.source),lookbehind:!0,inside:s},tag:/^[a-z]\w*/,punctuation:/\.$/}},list:{pattern:e(/^[*#]+<MOD>*\s+\S.*/.source,"m"),inside:{modifier:{pattern:e(/(^[*#]+)<MOD>+/.source),lookbehind:!0,inside:s},punctuation:/^[*#]+/}},table:{pattern:e(/^(?:(?:<MOD>|<PAR>|[<>=^~])+\.\s*)?(?:\|(?:(?:<MOD>|<PAR>|[<>=^~_]|[\\/]\d+)+\.|(?!(?:<MOD>|<PAR>|[<>=^~_]|[\\/]\d+)+\.))[^|]*)+\|/.source,"m"),inside:{modifier:{pattern:e(/(^|\|(?:\r?\n|\r)?)(?:<MOD>|<PAR>|[<>=^~_]|[\\/]\d+)+(?=\.)/.source),lookbehind:!0,inside:s},punctuation:/\||^\./}},inline:{pattern:e(/(^|[^a-zA-Z\d])(\*\*|__|\?\?|[*_%@+\-^~])<MOD>*.+?\2(?![a-zA-Z\d])/.source),lookbehind:!0,inside:{bold:{pattern:e(/(^(\*\*?)<MOD>*).+?(?=\2)/.source),lookbehind:!0},italic:{pattern:e(/(^(__?)<MOD>*).+?(?=\2)/.source),lookbehind:!0},cite:{pattern:e(/(^\?\?<MOD>*).+?(?=\?\?)/.source),lookbehind:!0,alias:"string"},code:{pattern:e(/(^@<MOD>*).+?(?=@)/.source),lookbehind:!0,alias:"keyword"},inserted:{pattern:e(/(^\+<MOD>*).+?(?=\+)/.source),lookbehind:!0},deleted:{pattern:e(/(^-<MOD>*).+?(?=-)/.source),lookbehind:!0},span:{pattern:e(/(^%<MOD>*).+?(?=%)/.source),lookbehind:!0},modifier:{pattern:e(/(^\*\*|__|\?\?|[*_%@+\-^~])<MOD>+/.source),lookbehind:!0,inside:s},punctuation:/[*_%?@+\-^~]+/}},"link-ref":{pattern:/^\[[^\]]+\]\S+$/m,inside:{string:{pattern:/(^\[)[^\]]+(?=\])/,lookbehind:!0},url:{pattern:/(^\])\S+$/,lookbehind:!0},punctuation:/[\[\]]/}},link:{pattern:e(/"<MOD>*[^"]+":.+?(?=[^\w/]?(?:\s|$))/.source),inside:{text:{pattern:e(/(^"<MOD>*)[^"]+(?=")/.source),lookbehind:!0},modifier:{pattern:e(/(^")<MOD>+/.source),lookbehind:!0,inside:s},url:{pattern:/(:).+/,lookbehind:!0},punctuation:/[":]/}},image:{pattern:e(/!(?:<MOD>|<PAR>|[<>=])*(?![<>=])[^!\s()]+(?:\([^)]+\))?!(?::.+?(?=[^\w/]?(?:\s|$)))?/.source),inside:{source:{pattern:e(/(^!(?:<MOD>|<PAR>|[<>=])*)(?![<>=])[^!\s()]+(?:\([^)]+\))?(?=!)/.source),lookbehind:!0,alias:"url"},modifier:{pattern:e(/(^!)(?:<MOD>|<PAR>|[<>=])+/.source),lookbehind:!0,inside:s},url:{pattern:/(:).+/,lookbehind:!0},punctuation:/[!:]/}},footnote:{pattern:/\b\[\d+\]/,alias:"comment",inside:{punctuation:/\[|\]/}},acronym:{pattern:/\b[A-Z\d]+\([^)]+\)/,inside:{comment:{pattern:/(\()[^()]+(?=\))/,lookbehind:!0},punctuation:/[()]/}},mark:{pattern:/\b\((?:C|R|TM)\)/,alias:"comment",inside:{punctuation:/[()]/}}}}}),n=p.phrase.inside,t={inline:n.inline,link:n.link,image:n.image,footnote:n.footnote,acronym:n.acronym,mark:n.mark};p.tag.pattern=/<\/?(?!\d)[a-z0-9]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i;var d=n.inline.inside;d.bold.inside=t,d.italic.inside=t,d.inserted.inside=t,d.deleted.inside=t,d.span.inside=t;var u=n.table.inside;u.inline=t.inline,u.link=t.link,u.image=t.image,u.footnote=t.footnote,u.acronym=t.acronym,u.mark=t.mark})(l)}return c}var b=O();const M=h(b),x=g({__proto__:null,default:M},[b]);export{x as t};
