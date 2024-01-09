"use strict";var T=Object.defineProperty;var E=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var F=Object.prototype.hasOwnProperty;var j=(t,e,n)=>e in t?T(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var H=(t,e)=>{for(var n in e)T(t,n,{get:e[n],enumerable:!0})},L=(t,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of I(e))!F.call(t,r)&&r!==n&&T(t,r,{get:()=>e[r],enumerable:!(i=E(e,r))||i.enumerable});return t};var R=t=>L(T({},"__esModule",{value:!0}),t);var l=(t,e,n)=>(j(t,typeof e!="symbol"?e+"":e,n),n);var B={};H(B,{DataTypes:()=>v});module.exports=R(B);var h=t=>t.trim().replace(/\s/g,"").replace(/\u00A0/g,"").replace(/,/g,".").replace(/^[−–—]/,"-").replace(/[\u2012\u2013\u2014\u2015]/g,"-");var A=t=>t?t.map(e=>{if(typeof e=="number")return e;let n=h(e);return typeof n=="string"?parseFloat(n):NaN}):[],g=t=>t?t.map(e=>typeof e=="string"?e:e.toString()):[];var W=t=>{if(!t||t==="")return"undefined";if(typeof t=="number")return"number";if(typeof t!="string")return"string";try{let e=h(t);return isNaN(Number(e))?"string":"number"}catch(e){return"string"}},$=t=>t.map(e=>W(e)),_=t=>$(t).filter(n=>n!=="undefined").every(n=>n==="number");var S=t=>{let e=/^\d+([\D]+)$/,n=/^([\D]+)\d+$/,i=t.values;if(!i)return;let r=i.filter(m=>m&&m!=="").shift();if(!r||typeof r!="string")return;let o=n.exec(r);if(!o&&(o=e.exec(r),!o))return;let s=o[1];!s||!i.every(m=>m===""||typeof m=="string"&&(m.endsWith(s)||m.startsWith(s))&&!isNaN(Number(h(m.replace(s,"")))))||(t.values=i.map(m=>typeof m=="number"?m:Number(h(m.replace(s,"")))),t.unit=s,t.type="measure")};var k=(t,e,n,i,r=!1)=>!(!t||!O(t,e.max,e.min)||!P(t,n.max,n.min)||r&&!U(t,i.max,i.min)),O=(t,e,n=1)=>t?t.every(i=>{if(!i)return!0;let r=i.toString().length;return r===0||i==="undefined"||i===0?!0:n<=r&&r<=e}):!1,P=(t,e,n=0)=>{if(!t)return!1;let i=Math.min(...t.filter(o=>o!==0).map(o=>typeof o=="string"?parseInt(o):o)),r=Math.max(...t.map(o=>typeof o=="string"?parseInt(o):o));return n<=i&&r<=e},U=(t,e,n=0)=>{if(!t)return!1;let i=Math.min(...t.map(o=>typeof o=="string"?parseInt(o):o)),r=Math.max(...t.map(o=>typeof o=="string"?parseInt(o):o));return n<=i&&r<=e},w=()=>q.sort((t,e)=>e.priority-t.priority),q=[{type:"year",match:(t,e=!0)=>k(t,{min:4,max:4},{min:1e3,max:3e3},{min:1e3,max:3e3},e),priority:.9,names:["year","years","\xE9v","\xE9vek","anno","anni","jahr","jahre","ann\xE9e","ans","a\xF1o","a\xF1os","ano","anos","\xE5r","\xE5rene","\u0433\u043E\u0434","\u043B\u0435\u0442","\u5E74","\u5E74\u9593","\u0938\u093E\u0932","\u0BB5\u0BB0\u0BC1\u0B9F\u0BAE\u0BCD","tahun","\u0433\u043E\u0434\u0438\u043D\u0430","\u0433\u043E\u0434\u0438\u043D\u0438","\u0AB5\u0AB0\u0ACD\u0AB7","\u0440\u0456\u043A","lat","\u0433\u043E\u0434\u0438\u043D\u0430","\u0440\u043E\u043A\u0438","godina","\u0433\u043E\u0434\u0438\u043D\u0435","\xE9v","\u0E9B\u0EB5","\u10EC\u10D4\u10DA\u10D8","\u0D85\u0DC0\u0DD4\u0DBB\u0DD4\u0DAF\u0DCA\u0DAF","vuosi","\u043B\u0435\u0442\u043E","rok","\u043B\u0456\u0442","\u0E1B\u0E35","\u05E9\u05E0\u05D4","aasta","\u0CB5\u0CB0\u0CCD\u0CB7","\u057F\u0561\u0580\u056B","\u0633\u0627\u0644","a\xF1o","\u5E74","\xE5r","\xFCzb\xE9g","ann\xE9e","\u0430\u0441\u0442\u0430\u043D","\xE1r","\u0B86\u0BA3\u0BCD\u0B9F\u0BC1","rok","\u0935\u0930\u094D\u0937"]},{type:"month",match:(t,e=!0)=>k(t,{min:1,max:13},{min:0,max:12},{min:0,max:12},e),priority:.4,dependencies:["year"],names:["month","months","h\xF3nap","h\xF3napok","meseac","mesecev","m\u011Bs\xEDc","m\u011Bs\xEDce","\u043C\u0435\u0441\u044F\u0446","\u043C\u0435\u0441\u044F\u0446\u0430","kuukausi","kuukautta","\u6708","\u30F6\u6708","m\u011Bnesis","\u043C\u0435\u0441\u0435\u0446","mwezi","bulan","\u043C\u0456\u0441\u044F\u0446\u044C","b\xFA\xF0ar","manche","maand","mjesec","mesiac","mesec","\u03BC\u03AE\u03BD\u03B1\u03C2","maan","miesi\u0105c","\u0645\u0627\u0647","\u10D7\u10D5\u10D4","\u0E40\u0E14\u0E37\u0E2D\u0E19","\u043C\u0456\u0441\u044F\u0446\u044C","\u092E\u0939\u093F\u0928\u093E","\u0634\u0647\u0631","bulan","\u0645\u0627\u0647","\u092E\u0939\u093F\u0928\u093E","mesec"]},{type:"day",match:(t,e=!0)=>k(t,{min:1,max:2},{min:0,max:31},{min:24,max:31},e),priority:.6,dependencies:["month"],names:["day","days","nap","napok","dan","dana","dzie\u0144","dni","\u0434\u0435\u043D\u044C","\u0434\u043D\u0456\u0432","\u064A\u0648\u0645","\u65E5","giorno","giorni","tag","tage","dia","dias","\u0434\u0435\u043D","dag","den","\u0631\u0648\u0632","d\xEDa"]},{type:"hour",match:(t,e=!0)=>k(t,{min:1,max:2},{min:0,max:24},{min:12,max:24},e),priority:.5,dependencies:["day"],names:["hour","hours","\xF3ra","\xF3r\xE1k","\u0633\u0627\u0639\u0629","stund","stunden","heure","uur","\u0433\u0430\u0434\u0437\u0456\u043D\u0430","\u6642\u9593","\u0447\u0430\u0441","\u0447\u0430\u0441\u0430","ora","ore","hora","\u0918\u0902\u091F\u093E","\u10E1\u10D0\u10D0\u10D7\u10D8","\u0433\u043E\u0434\u0438\u043D\u0430","\u0433\u043E\u0434\u0438\u043D\u0438","\u0633\u0627\u0639\u062A","\u0441\u0430\u0430\u0442","\uC2DC\uAC04","\u5C0F\u65F6","\u0A95\u0AB2\u0ABE\u0A95","\u03CE\u03C1\u03B1","saat","\u05E9\u05E2\u05D4","\u0938\u092E\u092F","tunti","\u0998\u09A3\u09CD\u099F\u09BE","\u0BAE\u0BA3\u0BBF","\u0C17\u0C02\u0C1F","\u0D2E\u0D23\u0D3F\u0D15\u0D4D\u0D15\u0D42\u0D7C","or\xEB","\u0447\u0430\u0441","\u0998\u09A3\u09CD\u099F\u09BE","\u0E27\u0E31\u0E19"]},{type:"minute",match:(t,e=!0)=>k(t,{min:1,max:2},{min:0,max:60},{min:31,max:60},e),priority:.8,dependencies:["hour"],names:["minute","minutes","perc","percek","minuta","minut","minuta","minut","\u0445\u0432\u0438\u043B\u0438\u043D\u0430","\u0445\u0432\u0438\u043B\u0438\u043D","\u062F\u0642\u064A\u0642\u0629","\u5206","minuto","minuti","minute","minuten","minuto","minutos","\u043C\u0438\u043D\u0443\u0442\u0430","minut","minuut","\u062F\u0642\u06CC\u0642\u0647"]}];var z=(t,e)=>{let n=w();t.forEach(i=>{var b;if((b=i==null?void 0:i.meta)!=null&&b.type)return;let{name:r,values:o}=i,s=r.toLowerCase(),f=n.find(({names:d})=>d.includes(s));if(!f)return;let{type:m,match:p}=f;p(o,!1)&&(i.values=g(o),i.type="dimension",i.meta?i.meta.type=m:i.meta={type:m},e(r,m))})};var N=(t,e)=>{let n="date";t.forEach(i=>{let r=i.values;if(!r)return!1;r.forEach(s=>{console.log(s.toString(),Date.parse(s.toString()))}),r.every(s=>s===""||typeof s=="string"&&Date.parse(s.toString()))&&(i.values=g(r),i.meta?i.meta.type=n:i.meta={type:n},i.type="dimension",e(i.name,n))})},M=(t,e,n,i=!0)=>{t.forEach((r,o)=>{var f,m,p,b;if((f=r==null?void 0:r.meta)!=null&&f.type)return;let s=w().filter(({type:d})=>!e.includes(d));for(let{type:d,match:Z,dependencies:x}of s){if((m=r==null?void 0:r.meta)!=null&&m.type)return;if(x&&Array.isArray(x)){if(!x.every(y=>e.includes(y)))continue;let C=!1;if(o>0){let y=t[o-1];(p=y.meta)!=null&&p.type&&x.includes(y.meta.type)&&(C=!0)}if(o<t.length-1){let y=t[o+1];(b=y.meta)!=null&&b.type&&x.includes(y.meta.type)&&(C=!0)}if(!C)continue}Z(values,i)&&(r.meta?r.meta.type=d:r.meta={type:d},r.values=g(values),r.type="dimension",n(name,d))}})};var V=(t,e)=>{let n="link",i=/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;t.forEach(r=>{var m;if((m=r==null?void 0:r.meta)!=null&&m.type)return;let{name:o,values:s}=r;s!=null&&s.every(p=>p===""||typeof p=="string"&&p.match(i))&&(r.meta?r.meta.type=n:r.meta={type:n},r.type="dimension",e(o,n))})};var v=class{constructor(){l(this,"meta",{name:"dataTypes"});l(this,"_types",[]);l(this,"checkTypes",e=>{let n=this._mainTypes(e);z(n,this._addType),N(n,this._addType);let i=n.filter(r=>!this.typedSeries.includes(r.name));M(i,this.typesList,this._addType),V(n,this._addType),this._addFinalTypes(n)});l(this,"_addType",(e,n)=>{this._types.push({name:e,type:n})});l(this,"_mainTypes",e=>e.map(n=>n.values?_(n.values)?(n.values=A(n.values),n.type="measure",n):(n.values=g(n.values),n.type="dimension",S(n),n):n))}get types(){return this._types}get typesList(){return this._types.map(({type:e})=>e)}get typedSeries(){return this._types.map(({name:e})=>e)}get api(){return{types:this.types}}get hooks(){let e=n=>{n.forEach(({target:i})=>{var r;(r=i==null?void 0:i.data)!=null&&r.series&&Array.isArray(i.data.series)&&this.checkTypes(i.data.series)})};return{setAnimParams:Object.assign((n,i)=>{Array.isArray(n.target)&&e(n.target),i()},{priority:.9})}}_addFinalTypes(e){e.forEach(n=>{var r;if((r=n==null?void 0:n.meta)!=null&&r.type||!n.values)return;let i=n.type==="measure"?"number":"string";n.meta?n.meta.type=i:n.meta={type:i},this._types.push({name:n.name,type:i})})}};
