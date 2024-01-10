"use strict";var w=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var L=Object.getOwnPropertyNames,V=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable;var S=(n,t,e)=>t in n?w(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,u=(n,t)=>{for(var e in t||(t={}))z.call(t,e)&&S(n,e,t[e]);if(V)for(var e of V(t))P.call(t,e)&&S(n,e,t[e]);return n};var Q=(n,t)=>{for(var e in t)w(n,e,{get:t[e],enumerable:!0})},R=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of L(t))!z.call(n,r)&&r!==e&&w(n,r,{get:()=>t[r],enumerable:!(i=$(t,r))||i.enumerable});return n};var W=n=>R(w({},"__esModule",{value:!0}),n);var b=(n,t,e)=>(S(n,typeof t!="symbol"?t+"":t,e),e);var Y={};Q(Y,{DataTypes:()=>M});module.exports=W(Y);var x=n=>n.trim().replace(/\s/g,"").replace(/\u00A0/g,"").replace(/,/g,".").replace(/^[−–—]/,"-").replace(/[\u2012\u2013\u2014\u2015]/g,"-");var I=n=>n?n.map(t=>{if(typeof t=="number")return t;let e=x(t);return typeof e=="string"?parseFloat(e):NaN}):[],g=n=>n?n.map(t=>typeof t=="string"?t:t.toString()):[];var B=n=>{if(!n||n==="")return"undefined";if(typeof n=="number")return"number";if(typeof n!="string")return"string";try{let t=x(n);return isNaN(Number(t))?"string":"number"}catch(t){return"string"}},G=n=>n.map(t=>B(t)),A=n=>G(n).filter(e=>e!=="undefined").every(e=>e==="number");var q=n=>{let t=["Q","SKU","ID","SKU","EAN","UPC","ISBN","GTIN","MPN","ASIN"],e=/^\d+([\D]+)$/,i=/^([\D]+)\d+$/,r=n.values;if(!r)return;let o=r.filter(a=>a&&a!=="").shift();if(!o||typeof o!="string")return;let m=i.exec(o);if(!m&&(m=e.exec(o),!m))return;let s=m[1];!s||t.includes(s)||!r.every(a=>a===""||typeof a=="string"&&(a.endsWith(s)||a.startsWith(s))&&!isNaN(Number(x(a.replace(s,"")))))||(n.values=r.map(a=>typeof a=="number"?a:Number(x(a.replace(s,"")))),n.unit=s,n.type="measure")};var k=(n,t,e,i,r=!1)=>{if(!n)return!1;let o=n.filter(m=>m!==""&&!isNaN(m)&&m!==void 0);return!(o.length===0||!H(o,t.max,t.min)||!O(o,e.max,e.min)||r&&!J(o,i.max,i.min))},H=(n,t,e=1)=>n?n.every(i=>{if(!i)return!0;let r=i.toString().length;return r===0||i==="undefined"||i===0?!0:e<=r&&r<=t}):!1,O=(n,t,e=0)=>{if(!n)return!1;let i=Math.min(...n.filter(o=>o!==0).map(o=>typeof o=="string"?parseInt(o):o)),r=Math.max(...n.map(o=>typeof o=="string"?parseInt(o):o));return e<=i&&r<=t},J=(n,t,e=0)=>{if(!n)return!1;let i=Math.min(...n.map(o=>typeof o=="string"?parseInt(o):o)),r=Math.max(...n.map(o=>typeof o=="string"?parseInt(o):o));return e<=i&&r<=t},C=()=>X.sort((n,t)=>t.priority-n.priority),X=[{type:"year",seriesType:"dimension",dataType:"date",match:(n,t=!0)=>k(n,{min:4,max:4},{min:1e3,max:3e3},{min:1e3,max:3e3},t),priority:.9,names:["year","years","\xE9v","\xE9vek","anno","anni","jahr","jahre","ann\xE9e","ans","a\xF1o","a\xF1os","ano","anos","\xE5r","\xE5rene","\u0433\u043E\u0434","\u043B\u0435\u0442","\u5E74","\u5E74\u9593","\u0938\u093E\u0932","\u0BB5\u0BB0\u0BC1\u0B9F\u0BAE\u0BCD","tahun","\u0433\u043E\u0434\u0438\u043D\u0430","\u0433\u043E\u0434\u0438\u043D\u0438","\u0AB5\u0AB0\u0ACD\u0AB7","\u0440\u0456\u043A","lat","\u0433\u043E\u0434\u0438\u043D\u0430","\u0440\u043E\u043A\u0438","godina","\u0433\u043E\u0434\u0438\u043D\u0435","\xE9v","\u0E9B\u0EB5","\u10EC\u10D4\u10DA\u10D8","\u0D85\u0DC0\u0DD4\u0DBB\u0DD4\u0DAF\u0DCA\u0DAF","vuosi","\u043B\u0435\u0442\u043E","rok","\u043B\u0456\u0442","\u0E1B\u0E35","\u05E9\u05E0\u05D4","aasta","\u0CB5\u0CB0\u0CCD\u0CB7","\u057F\u0561\u0580\u056B","\u0633\u0627\u0644","a\xF1o","\u5E74","\xE5r","\xFCzb\xE9g","ann\xE9e","\u0430\u0441\u0442\u0430\u043D","\xE1r","\u0B86\u0BA3\u0BCD\u0B9F\u0BC1","rok","\u0935\u0930\u094D\u0937"]},{type:"quarter",seriesType:"dimension",dataType:"date",match:n=>!n||A(n)?!1:n.filter(e=>e!==""&&e!==void 0).every(e=>/^Q\d{1}$/.test(e.toString())),priority:.7,dependencies:["year"],names:["quarter","quarters","negyed\xE9v","negyed\xE9vek","quartal","quartali","quartals","cuartal","cuartales","quarto","quartos","quartalen","\u043A\u0432\u0430\u0440\u0442\u0430\u043B","\u043A\u0432\u0430\u0440\u0442\u0430\u043B\u043E\u0432","\u56DB\u534A\u671F","Q"]},{type:"month",seriesType:"dimension",dataType:"date",match:(n,t=!0)=>k(n,{min:1,max:13},{min:0,max:12},{min:0,max:12},t),priority:.4,dependencies:["year"],names:["month","months","h\xF3nap","h\xF3napok","meseac","mesecev","m\u011Bs\xEDc","m\u011Bs\xEDce","\u043C\u0435\u0441\u044F\u0446","\u043C\u0435\u0441\u044F\u0446\u0430","kuukausi","kuukautta","\u6708","\u30F6\u6708","m\u011Bnesis","\u043C\u0435\u0441\u0435\u0446","mwezi","bulan","\u043C\u0456\u0441\u044F\u0446\u044C","b\xFA\xF0ar","manche","maand","mjesec","mesiac","mesec","\u03BC\u03AE\u03BD\u03B1\u03C2","maan","miesi\u0105c","\u0645\u0627\u0647","\u10D7\u10D5\u10D4","\u0E40\u0E14\u0E37\u0E2D\u0E19","\u043C\u0456\u0441\u044F\u0446\u044C","\u092E\u0939\u093F\u0928\u093E","\u0634\u0647\u0631","bulan","\u0645\u0627\u0647","\u092E\u0939\u093F\u0928\u093E","mesec"]},{type:"day",seriesType:"dimension",dataType:"date",match:(n,t=!0)=>k(n,{min:1,max:2},{min:0,max:31},{min:24,max:31},t),priority:.6,dependencies:["month"],names:["day","days","nap","napok","dan","dana","dzie\u0144","dni","\u0434\u0435\u043D\u044C","\u0434\u043D\u0456\u0432","\u064A\u0648\u0645","\u65E5","giorno","giorni","tag","tage","dia","dias","\u0434\u0435\u043D","dag","den","\u0631\u0648\u0632","d\xEDa"]},{type:"hour",seriesType:"dimension",dataType:"time",match:(n,t=!0)=>k(n,{min:1,max:2},{min:0,max:24},{min:12,max:24},t),priority:.5,dependencies:["day"],names:["hour","hours","\xF3ra","\xF3r\xE1k","\u0633\u0627\u0639\u0629","stund","stunden","heure","uur","\u0433\u0430\u0434\u0437\u0456\u043D\u0430","\u6642\u9593","\u0447\u0430\u0441","\u0447\u0430\u0441\u0430","ora","ore","hora","\u0918\u0902\u091F\u093E","\u10E1\u10D0\u10D0\u10D7\u10D8","\u0433\u043E\u0434\u0438\u043D\u0430","\u0433\u043E\u0434\u0438\u043D\u0438","\u0633\u0627\u0639\u062A","\u0441\u0430\u0430\u0442","\uC2DC\uAC04","\u5C0F\u65F6","\u0A95\u0AB2\u0ABE\u0A95","\u03CE\u03C1\u03B1","saat","\u05E9\u05E2\u05D4","\u0938\u092E\u092F","tunti","\u0998\u09A3\u09CD\u099F\u09BE","\u0BAE\u0BA3\u0BBF","\u0C17\u0C02\u0C1F","\u0D2E\u0D23\u0D3F\u0D15\u0D4D\u0D15\u0D42\u0D7C","or\xEB","\u0447\u0430\u0441","\u0998\u09A3\u09CD\u099F\u09BE","\u0E27\u0E31\u0E19"]},{type:"minute",seriesType:"dimension",dataType:"time",match:(n,t=!0)=>k(n,{min:1,max:2},{min:0,max:60},{min:31,max:60},t),priority:.8,dependencies:["hour"],names:["minute","minutes","perc","percek","minuta","minut","minuta","minut","\u0445\u0432\u0438\u043B\u0438\u043D\u0430","\u0445\u0432\u0438\u043B\u0438\u043D","\u062F\u0642\u064A\u0642\u0629","\u5206","minuto","minuti","minute","minuten","minuto","minutos","\u043C\u0438\u043D\u0443\u0442\u0430","minut","minuut","\u062F\u0642\u06CC\u0642\u0647"]}];var E=(n,t)=>{let e=C();n.forEach(i=>{var _,d;if((_=i==null?void 0:i.meta)!=null&&_.type)return;let{name:r,values:o}=i;if(!o)return;let m=r.toLowerCase(),s=e.find(({names:h})=>h.includes(m));if(!s)return;let{type:p,dataType:a,seriesType:v,match:N}=s;if(!N(o,!1))return;i.values=g(o),i.type=v;let T={type:p,dataTypes:a,dependencies:(d=s==null?void 0:s.dependencies)!=null?d:[]};i.meta=u(u({},i.meta),T),i.meta?i.meta.type=p:i.meta={type:p},t(r,p)})};var Z=(n,t)=>{let e="date";n.forEach(i=>{let r=i.values;if(!r)return!1;if(!r.every(p=>p===""||typeof p=="string"&&Date.parse(p.toString())))return;let m=r.every(p=>/\d{1,2}:\d{1,2}/.test(p.toString())),s={type:e,dataTypes:m?"datetime":"date",dependencies:[]};i.values=g(r),i.meta?i.meta=u(u({},i.meta),s):i.meta=s,i.type="dimension",t(i.name,e)})},F=(n,t)=>{let e="date";n.forEach(i=>{var s;let r=i.values;if(!r)return!1;if(!r.every(p=>p===""||typeof p=="string"&&/^([0-1]?[0-9]|2[0-3]):[0-5]?[0-9](?::[0-5]?[0-9](?:[.:]\d{1,6})?)?$/.test(p.toString())))return;let m={type:e,dataTypes:"time",dependencies:[]};i.values=g(r),i.meta=u(u({},(s=i.meta)!=null?s:{}),m),i.type="dimension",t(i.name,e)})},j=(n,t,e,i=!0)=>{n.forEach((r,o)=>{var s,p,a,v,N;if((s=r==null?void 0:r.meta)!=null&&s.type)return;let m=C().filter(({type:T})=>!t.includes(T));for(let{type:T,match:_,dependencies:d}of m){if((p=r==null?void 0:r.meta)!=null&&p.type)return;if(d&&Array.isArray(d)){if(!d.every(l=>t.includes(l)))continue;let h=!1;if(o>0){let l=n[o-1];(a=l.meta)!=null&&a.type&&d.includes(l.meta.type)&&(h=!0)}if(o<n.length-1){let l=n[o+1];(v=l.meta)!=null&&v.type&&d.includes(l.meta.type)&&(h=!0)}if(!h)continue}if(_(r.values,i)){let h={type:T,dependencies:d&&Array.isArray(d)?d:[]};r.meta=u(u({},(N=r==null?void 0:r.meta)!=null?N:{}),h),r.values=g(r.values),r.type="dimension",e(r.name,T)}}})};var U=(n,t)=>{let e="link",i=/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;n.forEach(r=>{var p;if((p=r==null?void 0:r.meta)!=null&&p.type)return;let{name:o,values:m}=r;m!=null&&m.every(a=>a===""||typeof a=="string"&&a.match(i))&&(r.meta?r.meta.type=e:r.meta={type:e},r.type="dimension",t(o,e))})};var M=class{constructor(){b(this,"meta",{name:"dataTypes"});b(this,"_types",[]);b(this,"checkTypes",t=>{let e=this._mainTypes(t);E(e,this._addType),Z(this._notTyped(e),this._addType),F(this._notTyped(e),this._addType),j(this._notTyped(e),this.typesList,this._addType),U(this._notTyped(e),this._addType),this._addFinalTypes(e)});b(this,"_notTyped",t=>t.filter(e=>!this.typedSeries.includes(e.name)));b(this,"_addType",(t,e)=>{this._types.push({name:t,type:e})});b(this,"_mainTypes",t=>t.map(e=>e.values?A(e.values)?(e.values=I(e.values),e.type="measure",e):(e.values=g(e.values),e.type="dimension",q(e),e):e))}get types(){return this._types}get typesList(){return this._types.map(({type:t})=>t)}get typedSeries(){return this._types.map(({name:t})=>t)}get api(){return{types:this.types}}get hooks(){let t=e=>{e.forEach(({target:i})=>{var r;(r=i==null?void 0:i.data)!=null&&r.series&&Array.isArray(i.data.series)&&this.checkTypes(i.data.series)})};return{setAnimParams:Object.assign((e,i)=>{Array.isArray(e.target)&&t(e.target),i()},{priority:.9})}}_addFinalTypes(t){t.forEach(e=>{var o,m;if((o=e==null?void 0:e.meta)!=null&&o.type||!e.values)return;let i=e.type==="measure"?"number":"string",r={type:i,dataTypes:i,dependencies:[]};e.meta=u(u({},(m=e.meta)!=null?m:{}),r),this._types.push({name:e.name,type:i})})}};