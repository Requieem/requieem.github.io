import{g as c}from"./index-DbvavOW-.js";function l(e,t){for(var n=0;n<t.length;n++){const a=t[n];if(typeof a!="string"&&!Array.isArray(a)){for(const r in a)if(r!=="default"&&!(r in e)){const o=Object.getOwnPropertyDescriptor(a,r);o&&Object.defineProperty(e,r,o.get?o:{enumerable:!0,get:()=>a[r]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var i,d;function u(){if(d)return i;d=1,i=e,e.displayName="ada",e.aliases=[];function e(t){t.languages.ada={comment:/--.*/,string:/"(?:""|[^"\r\f\n])*"/,number:[{pattern:/\b\d(?:_?\d)*#[\dA-F](?:_?[\dA-F])*(?:\.[\dA-F](?:_?[\dA-F])*)?#(?:E[+-]?\d(?:_?\d)*)?/i},{pattern:/\b\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:E[+-]?\d(?:_?\d)*)?\b/i}],"attr-name":/\b'\w+/,keyword:/\b(?:abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|case|constant|declare|delay|delta|digits|do|else|elsif|end|entry|exception|exit|for|function|generic|goto|if|in|interface|is|limited|loop|mod|new|not|null|of|others|out|overriding|package|pragma|private|procedure|protected|raise|range|record|rem|renames|requeue|return|reverse|select|separate|some|subtype|synchronized|tagged|task|terminate|then|type|until|use|when|while|with|xor)\b/i,boolean:/\b(?:false|true)\b/i,operator:/<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/,punctuation:/\.\.?|[,;():]/,char:/'.'/,variable:/\b[a-z](?:\w)*\b/i}}return i}var s=u();const p=c(s),f=l({__proto__:null,default:p},[s]);export{f as a};
