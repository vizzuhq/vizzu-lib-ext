var y=t=>t.trim().replace(/\s/g,"").replace(/\u00A0/g,"").replace(/,/g,".").replace(/^[−–—]/,"-").replace(/[\u2012\u2013\u2014\u2015]/g,"-");var x=t=>t?t.map(n=>{if(typeof n=="number")return n;let e=y(n);return typeof e=="string"?parseFloat(e):NaN}):[],g=t=>t?t.map(n=>typeof n=="string"?n:n.toString()):[];var S=t=>{if(!t||t==="")return"undefined";if(typeof t=="number")return"number";if(typeof t!="string")return"string";try{let n=y(t);return isNaN(Number(n))?"string":"number"}catch{return"string"}},z=t=>t.map(n=>S(n)),k=t=>z(t).filter(e=>e!=="undefined").every(e=>e==="number");var T=t=>{let n=/^\d+([\D]+)$/,e=/^([\D]+)\d+$/,r=t.values;if(!r)return;let i=r.filter(m=>m&&m!=="").shift();if(!i||typeof i!="string")return;let o=e.exec(i);if(!o&&(o=n.exec(i),!o))return;let s=o[1];!s||!r.every(m=>m===""||typeof m=="string"&&(m.endsWith(s)||m.startsWith(s))&&!isNaN(Number(y(m.replace(s,"")))))||(t.values=r.map(m=>typeof m=="number"?m:Number(y(m.replace(s,"")))),t.unit=s,t.type="measure")};var l=(t,n,e,r,i=!1)=>!(!t||!N(t,n.max,n.min)||!M(t,e.max,e.min)||i&&!V(t,r.max,r.min)),N=(t,n,e=1)=>t?t.every(r=>{if(!r)return!0;let i=r.toString().length;return i===0||r==="undefined"||r===0?!0:e<=i&&i<=n}):!1,M=(t,n,e=0)=>{if(!t)return!1;let r=Math.min(...t.filter(o=>o!==0).map(o=>typeof o=="string"?parseInt(o):o)),i=Math.max(...t.map(o=>typeof o=="string"?parseInt(o):o));return e<=r&&i<=n},V=(t,n,e=0)=>{if(!t)return!1;let r=Math.min(...t.map(o=>typeof o=="string"?parseInt(o):o)),i=Math.max(...t.map(o=>typeof o=="string"?parseInt(o):o));return e<=r&&i<=n},b=()=>Z.sort((t,n)=>n.priority-t.priority),Z=[{type:"year",match:(t,n=!0)=>l(t,{min:4,max:4},{min:1e3,max:3e3},{min:1e3,max:3e3},n),priority:.9,names:["year","years","\xE9v","\xE9vek","anno","anni","jahr","jahre","ann\xE9e","ans","a\xF1o","a\xF1os","ano","anos","\xE5r","\xE5rene","\u0433\u043E\u0434","\u043B\u0435\u0442","\u5E74","\u5E74\u9593","\u0938\u093E\u0932","\u0BB5\u0BB0\u0BC1\u0B9F\u0BAE\u0BCD","tahun","\u0433\u043E\u0434\u0438\u043D\u0430","\u0433\u043E\u0434\u0438\u043D\u0438","\u0AB5\u0AB0\u0ACD\u0AB7","\u0440\u0456\u043A","lat","\u0433\u043E\u0434\u0438\u043D\u0430","\u0440\u043E\u043A\u0438","godina","\u0433\u043E\u0434\u0438\u043D\u0435","\xE9v","\u0E9B\u0EB5","\u10EC\u10D4\u10DA\u10D8","\u0D85\u0DC0\u0DD4\u0DBB\u0DD4\u0DAF\u0DCA\u0DAF","vuosi","\u043B\u0435\u0442\u043E","rok","\u043B\u0456\u0442","\u0E1B\u0E35","\u05E9\u05E0\u05D4","aasta","\u0CB5\u0CB0\u0CCD\u0CB7","\u057F\u0561\u0580\u056B","\u0633\u0627\u0644","a\xF1o","\u5E74","\xE5r","\xFCzb\xE9g","ann\xE9e","\u0430\u0441\u0442\u0430\u043D","\xE1r","\u0B86\u0BA3\u0BCD\u0B9F\u0BC1","rok","\u0935\u0930\u094D\u0937"]},{type:"month",match:(t,n=!0)=>l(t,{min:1,max:13},{min:0,max:12},{min:0,max:12},n),priority:.4,dependencies:["year"],names:["month","months","h\xF3nap","h\xF3napok","meseac","mesecev","m\u011Bs\xEDc","m\u011Bs\xEDce","\u043C\u0435\u0441\u044F\u0446","\u043C\u0435\u0441\u044F\u0446\u0430","kuukausi","kuukautta","\u6708","\u30F6\u6708","m\u011Bnesis","\u043C\u0435\u0441\u0435\u0446","mwezi","bulan","\u043C\u0456\u0441\u044F\u0446\u044C","b\xFA\xF0ar","manche","maand","mjesec","mesiac","mesec","\u03BC\u03AE\u03BD\u03B1\u03C2","maan","miesi\u0105c","\u0645\u0627\u0647","\u10D7\u10D5\u10D4","\u0E40\u0E14\u0E37\u0E2D\u0E19","\u043C\u0456\u0441\u044F\u0446\u044C","\u092E\u0939\u093F\u0928\u093E","\u0634\u0647\u0631","bulan","\u0645\u0627\u0647","\u092E\u0939\u093F\u0928\u093E","mesec"]},{type:"day",match:(t,n=!0)=>l(t,{min:1,max:2},{min:0,max:31},{min:24,max:31},n),priority:.6,dependencies:["month"],names:["day","days","nap","napok","dan","dana","dzie\u0144","dni","\u0434\u0435\u043D\u044C","\u0434\u043D\u0456\u0432","\u064A\u0648\u0645","\u65E5","giorno","giorni","tag","tage","dia","dias","\u0434\u0435\u043D","dag","den","\u0631\u0648\u0632","d\xEDa"]},{type:"hour",match:(t,n=!0)=>l(t,{min:1,max:2},{min:0,max:24},{min:12,max:24},n),priority:.5,dependencies:["day"],names:["hour","hours","\xF3ra","\xF3r\xE1k","\u0633\u0627\u0639\u0629","stund","stunden","heure","uur","\u0433\u0430\u0434\u0437\u0456\u043D\u0430","\u6642\u9593","\u0447\u0430\u0441","\u0447\u0430\u0441\u0430","ora","ore","hora","\u0918\u0902\u091F\u093E","\u10E1\u10D0\u10D0\u10D7\u10D8","\u0433\u043E\u0434\u0438\u043D\u0430","\u0433\u043E\u0434\u0438\u043D\u0438","\u0633\u0627\u0639\u062A","\u0441\u0430\u0430\u0442","\uC2DC\uAC04","\u5C0F\u65F6","\u0A95\u0AB2\u0ABE\u0A95","\u03CE\u03C1\u03B1","saat","\u05E9\u05E2\u05D4","\u0938\u092E\u092F","tunti","\u0998\u09A3\u09CD\u099F\u09BE","\u0BAE\u0BA3\u0BBF","\u0C17\u0C02\u0C1F","\u0D2E\u0D23\u0D3F\u0D15\u0D4D\u0D15\u0D42\u0D7C","or\xEB","\u0447\u0430\u0441","\u0998\u09A3\u09CD\u099F\u09BE","\u0E27\u0E31\u0E19"]},{type:"minute",match:(t,n=!0)=>l(t,{min:1,max:2},{min:0,max:60},{min:31,max:60},n),priority:.8,dependencies:["hour"],names:["minute","minutes","perc","percek","minuta","minut","minuta","minut","\u0445\u0432\u0438\u043B\u0438\u043D\u0430","\u0445\u0432\u0438\u043B\u0438\u043D","\u062F\u0642\u064A\u0642\u0629","\u5206","minuto","minuti","minute","minuten","minuto","minutos","\u043C\u0438\u043D\u0443\u0442\u0430","minut","minuut","\u062F\u0642\u06CC\u0642\u0647"]}];var w=(t,n)=>{let e=b();t.forEach(r=>{if(r?.meta?.type)return;let{name:i,values:o}=r,s=i.toLowerCase(),a=e.find(({names:h})=>h.includes(s));if(!a)return;let{type:m,match:f}=a;f(o,!1)&&(r.values=g(o),r.type="dimension",r.meta?r.meta.type=m:r.meta={type:m},n(i,m))})};var v=(t,n)=>{let e="date";t.forEach(r=>{let i=r.values;if(!i)return!1;i.forEach(s=>{console.log(s.toString(),Date.parse(s.toString()))}),i.every(s=>s===""||typeof s=="string"&&Date.parse(s.toString()))&&(r.values=g(i),r.meta?r.meta.type=e:r.meta={type:e},r.type="dimension",n(r.name,e))})},C=(t,n,e,r=!0)=>{t.forEach((i,o)=>{if(i?.meta?.type)return;let s=b().filter(({type:a})=>!n.includes(a));for(let{type:a,match:m,dependencies:f}of s){if(i?.meta?.type)return;if(f&&Array.isArray(f)){if(!f.every(d=>n.includes(d)))continue;let h=!1;if(o>0){let d=t[o-1];d.meta?.type&&f.includes(d.meta.type)&&(h=!0)}if(o<t.length-1){let d=t[o+1];d.meta?.type&&f.includes(d.meta.type)&&(h=!0)}if(!h)continue}m(values,r)&&(i.meta?i.meta.type=a:i.meta={type:a},i.values=g(values),i.type="dimension",e(name,a))}})};var A=(t,n)=>{let e="link",r=/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;t.forEach(i=>{if(i?.meta?.type)return;let{name:o,values:s}=i;s?.every(m=>m===""||typeof m=="string"&&m.match(r))&&(i.meta?i.meta.type=e:i.meta={type:e},i.type="dimension",n(o,e))})};var _=class{meta={name:"dataTypes"};_types=[];get types(){return this._types}get typesList(){return this._types.map(({type:n})=>n)}get typedSeries(){return this._types.map(({name:n})=>n)}get api(){return{types:this.types}}get hooks(){let n=e=>{e.forEach(({target:r})=>{r?.data?.series&&Array.isArray(r.data.series)&&this.checkTypes(r.data.series)})};return{setAnimParams:Object.assign((e,r)=>{Array.isArray(e.target)&&n(e.target),r()},{priority:.9})}}checkTypes=n=>{let e=this._mainTypes(n);w(e,this._addType),v(e,this._addType);let r=e.filter(i=>!this.typedSeries.includes(i.name));C(r,this.typesList,this._addType),A(e,this._addType),this._addFinalTypes(e)};_addType=(n,e)=>{this._types.push({name:n,type:e})};_mainTypes=n=>n.map(e=>e.values?k(e.values)?(e.values=x(e.values),e.type="measure",e):(e.values=g(e.values),e.type="dimension",T(e),e):e);_addFinalTypes(n){n.forEach(e=>{if(e?.meta?.type||!e.values)return;let r=e.type==="measure"?"number":"string";e.meta?e.meta.type=r:e.meta={type:r},this._types.push({name:e.name,type:r})})}};export{_ as DataTypes};
