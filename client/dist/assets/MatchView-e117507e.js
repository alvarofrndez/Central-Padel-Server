import{_ as u,y as p,u as l,o as s,c as r,F as y,b as g,q as v}from"./index-8839c4fe.js";import{M}from"./MatchComponent-4a8e3bd5.js";import"./router-e0bcc5ce.js";const f={key:0,class:"global-container"},D={key:1,class:"empty"},k={__name:"MatchView",setup(w){const n=p();var o=[],i=[],d=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],m=new Date;function h(){for(let a=0;a<7;a++){const e=new Date(m.getTime()+a*24*60*60*1e3),t=e.getMonth()+1,c=e.getDate(),_=`${c<10?"0"+c:c}/${t<10?"0"+t:t}/${e.getFullYear()}`;o.push(_),i.push({day:d[e.getDay()],number:e.getDate(),date:_})}}return h(),n.getAllWeekMatchs(o[0],o[6]),(a,e)=>l(n).all_matchs.length>0?(s(),r("div",f,[(s(!0),r(y,null,g(l(n).all_matchs,t=>(s(),v(M,{match:t,add:!0},null,8,["match"]))),256))])):(s(),r("div",D,"No hay partidos disponibles"))}},V=u(k,[["__scopeId","data-v-093aa0f0"]]);export{V as default};