"use strict";(self["webpackChunksim_rt"]=self["webpackChunksim_rt"]||[]).push([[845],{2213:function(e,t,n){n.d(t,{Z:function(){return _}});n(9653),n(8309);var l=n(6252),r=n(2262),u=n(3577),a=n(9963),i=n(3907),o=n(744),s={props:{icon:{type:String,default:null},h:{type:String,default:null}},setup:function(e){return function(t,n){return(0,l.wg)(),(0,l.j4)(o.Z,{path:e.icon,w:"w-10",h:e.h,class:"absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-gray-400"},null,8,["path","h"])}}};const d=s;var c=d,m={class:"relative"},f=["id","name","multiple"],p=["value"],w=["id","name","placeholder","required"],g=["id","name","autocomplete","required","placeholder","type"],y={props:{name:{type:String,default:null},id:{type:String,default:null},autocomplete:{type:String,default:null},placeholder:{type:String,default:null},icon:{type:String,default:null},options:{type:Array,default:null},type:{type:String,default:"text"},modelValue:{type:[String,Number,Boolean,Array,Object],default:""},multiple:Boolean,required:Boolean,borderless:Boolean,transparent:Boolean,ctrlKFocus:Boolean},emits:["update:modelValue","right-icon-click"],setup:function(e,t){var n=t.emit,o=e,s=(0,l.Fl)({get:function(){return o.modelValue},set:function(e){n("update:modelValue",e)}}),d=(0,l.Fl)((function(){var e=["px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full","dark:placeholder-gray-400","textarea"===y.value?"h-24":"h-12",o.multiple?"h-24":"h-12",o.borderless?"border-0":"border",o.transparent?"bg-transparent":"bg-white dark:bg-gray-800"];return o.icon&&e.push("pl-10"),e})),y=(0,l.Fl)((function(){return o.options?"select":o.type})),b=(0,l.Fl)((function(){return"textarea"===o.type?"h-full":"h-12"})),_=(0,i.oR)(),k=(0,r.iH)(null);if(o.ctrlKFocus){var S=function(e){e.ctrlKey&&"k"===e.key?(e.preventDefault(),k.value.focus()):"Escape"===e.key&&k.value.blur()};(0,l.bv)((function(){_.state.isFieldFocusRegistered||(window.addEventListener("keydown",S),_.commit("basic",{key:"isFieldFocusRegistered",value:!0}))})),(0,l.Jd)((function(){window.removeEventListener("keydown",S),_.commit("basic",{key:"isFieldFocusRegistered",value:!1})}))}return function(t,n){return(0,l.wg)(),(0,l.iD)("div",m,["select"===(0,r.SU)(y)?(0,l.wy)(((0,l.wg)(),(0,l.iD)("select",{key:0,id:e.id,"onUpdate:modelValue":n[0]||(n[0]=function(e){return(0,r.dq)(s)?s.value=e:null}),name:e.name,class:(0,u.C_)((0,r.SU)(d)),multiple:e.multiple},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(e.options,(function(e){var t,n;return(0,l.wg)(),(0,l.iD)("option",{key:null!==(t=e.id)&&void 0!==t?t:e,value:e.id},(0,u.zw)(null!==(n=e.nama)&&void 0!==n?n:e),9,p)})),128))],10,f)),[[a.bM,(0,r.SU)(s)]]):"textarea"===(0,r.SU)(y)?(0,l.wy)(((0,l.wg)(),(0,l.iD)("textarea",{key:1,id:e.id,"onUpdate:modelValue":n[1]||(n[1]=function(e){return(0,r.dq)(s)?s.value=e:null}),class:(0,u.C_)((0,r.SU)(d)),name:e.name,placeholder:e.placeholder,required:e.required},null,10,w)),[[a.nr,(0,r.SU)(s)]]):(0,l.wy)(((0,l.wg)(),(0,l.iD)("input",{key:2,id:e.id,ref_key:"inputEl",ref:k,"onUpdate:modelValue":n[2]||(n[2]=function(e){return(0,r.dq)(s)?s.value=e:null}),name:e.name,autocomplete:e.autocomplete,required:e.required,placeholder:e.placeholder,type:(0,r.SU)(y),class:(0,u.C_)((0,r.SU)(d))},null,10,g)),[[a.YZ,(0,r.SU)(s)]]),e.icon?((0,l.wg)(),(0,l.j4)(c,{key:3,icon:e.icon,h:(0,r.SU)(b)},null,8,["icon","h"])):(0,l.kq)("",!0)])}}};const b=y;var _=b},5690:function(e,t,n){n.d(t,{Z:function(){return m}});var l=n(6252),r=n(3577),u=n(2262),a={class:"mb-6 last:mb-0"},i={key:0,class:"block font-bold mb-2"},o={key:1,class:"text-xs text-gray-500 dark:text-gray-400 mt-1"},s={key:2,class:"text-sm text-red-500 mt-1"},d={props:{label:{type:String,default:null},help:{type:String,default:null},message:{type:Object,default:null},error:Boolean},setup:function(e){var t=(0,l.Rr)(),n=(0,l.Fl)((function(){var e=[],n=t.default().length;return n>1&&e.push("grid grid-cols-1 gap-3"),2===n&&e.push("md:grid-cols-2"),e}));return function(t,d){return(0,l.wg)(),(0,l.iD)("div",a,[e.label?((0,l.wg)(),(0,l.iD)("label",i,(0,r.zw)(e.label),1)):(0,l.kq)("",!0),(0,l._)("div",{class:(0,r.C_)((0,u.SU)(n))},[(0,l.WI)(t.$slots,"default")],2),e.help?((0,l.wg)(),(0,l.iD)("div",o,(0,r.zw)(e.help),1)):(0,l.kq)("",!0),e.error?((0,l.wg)(),(0,l.iD)("div",s,(0,r.zw)(e.message.$message),1)):(0,l.kq)("",!0)])}}};const c=d;var m=c},3227:function(e,t,n){n.r(t),n.d(t,{default:function(){return V}});n(6699),n(2023);var l=n(6252),r=n(2262),u=n(3577),a=n(9963),i=n(3907),o=n(5317),s=n(6843),d=n(9890),c=n(9112),m=n(5693),f=n(5690),p=n(2213),w=n(3432),g=n(6373),y=n(1770),b=n(6993),_={class:"flex leading-tight flex-row items-center mb-6 justify-center"},k={class:"grid grid-cols-1 lg:grid-cols-2 gap-6"},S=(0,l._)("div",{class:"flex leading-tight items-end text-lg md:text-xl text-gray-800 dark:text-gray-500 font-semibold"}," Id User ",-1),h={class:"flex leading-tight items-end text-lg md:text-xl text-gray-600 font-medium"},x=(0,l._)("h2",{class:"flex leading-tight items-end text-lg md:text-xl text-gray-800 dark:text-gray-500 font-semibold"}," Nama User ",-1),U={class:"flex leading-tight items-end text-md md:text-lg text-gray-600 font-medium"},Z=(0,l._)("h2",{class:"flex leading-tight items-end text-lg md:text-xl text-gray-800 dark:text-gray-500 font-semibold"}," Email User ",-1),v={class:"flex leading-tight items-end text-md md:text-lg text-gray-600 font-medium"},W=(0,l._)("h2",{class:"flex leading-tight items-end text-lg md:text-xl text-gray-800 dark:text-gray-500 font-semibold"}," Role User ",-1),q={class:"flex leading-tight items-end text-md md:text-lg text-gray-600 font-medium"},j={setup:function(e){var t=(0,i.oR)(),n=(0,l.Fl)((function(){return t.state.auth.user})),j=(0,r.iH)(["Profile Pengguna"]),D=(0,r.qj)({password_current:"",password:"",password_confirmation:""}),V=function(e){return n.value.roles.includes(e)},A=function(){};return function(e,t){return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(y.Z,{aside:""}),(0,l.Wm)(c.Z,{"title-stack":j.value},null,8,["title-stack"]),(0,l.Wm)(s.Z,null,{default:(0,l.w5)((function(){return[(0,l._)("div",_,[V("ROLE_STAFF")?((0,l.wg)(),(0,l.j4)(d.Z,{key:0,title:"Akses Staff",icon:(0,r.SU)(o.wJe)},{default:(0,l.w5)((function(){return[(0,l.Wm)(g.Z,{type:"justify-center"},{default:(0,l.w5)((function(){return[(0,l.Wm)(w.Z,{to:"/staff",type:"submit",color:"success",label:"Menuju ke Dashboard Staff"})]})),_:1})]})),_:1},8,["icon"])):(0,l.kq)("",!0),V("ROLE_ADMIN")?((0,l.wg)(),(0,l.j4)(d.Z,{key:1,title:"Akses Admin",icon:(0,r.SU)(o.wJe)},{default:(0,l.w5)((function(){return[(0,l.Wm)(g.Z,{type:"justify-center"},{default:(0,l.w5)((function(){return[(0,l.Wm)(w.Z,{to:"/admin",type:"submit",color:"success",label:"Menuju ke Dashboard Admin"})]})),_:1})]})),_:1},8,["icon"])):(0,l.kq)("",!0),V("ROLE_USER")?((0,l.wg)(),(0,l.j4)(d.Z,{key:2,title:"Akses User",icon:(0,r.SU)(o.wJe)},{default:(0,l.w5)((function(){return[(0,l.Wm)(g.Z,{type:"justify-center"},{default:(0,l.w5)((function(){return[(0,l.Wm)(w.Z,{to:"/user",type:"submit",color:"success",label:"Menuju ke Halaman Pengguna"})]})),_:1})]})),_:1},8,["icon"])):(0,l.kq)("",!0),V("ROLE_ADMINGUDANG")?((0,l.wg)(),(0,l.j4)(d.Z,{key:3,title:"Akses Admin Gudang",icon:(0,r.SU)(o.wJe)},{default:(0,l.w5)((function(){return[(0,l.Wm)(g.Z,{type:"justify-center"},{default:(0,l.w5)((function(){return[(0,l.Wm)(w.Z,{to:"/admin-gudang",type:"submit",color:"success",label:"Menuju ke Dashboard Admin Gudang"})]})),_:1})]})),_:1},8,["icon"])):(0,l.kq)("",!0),V("ROLE_TEKNISI")?((0,l.wg)(),(0,l.j4)(d.Z,{key:4,title:"Akses Teknisi",icon:(0,r.SU)(o.wJe)},{default:(0,l.w5)((function(){return[(0,l.Wm)(g.Z,{type:"justify-center"},{default:(0,l.w5)((function(){return[(0,l.Wm)(w.Z,{to:"/teknisi",type:"submit",color:"success",label:"Menuju ke Halaman Pekerjaan"})]})),_:1})]})),_:1},8,["icon"])):(0,l.kq)("",!0),V("ROLE_SOPIR")?((0,l.wg)(),(0,l.j4)(d.Z,{key:5,title:"Akses Sopir",icon:(0,r.SU)(o.wJe)},{default:(0,l.w5)((function(){return[(0,l.Wm)(g.Z,{type:"justify-center"},{default:(0,l.w5)((function(){return[(0,l.Wm)(w.Z,{to:"/sopir",type:"submit",color:"success",label:"Menuju ke Halaman Pekerjaan"})]})),_:1})]})),_:1},8,["icon"])):(0,l.kq)("",!0)]),(0,l._)("div",k,[(0,l._)("div",null,[(0,l.Wm)(d.Z,{class:"mb-4",title:"Profil Anda",icon:(0,r.SU)(o.wJe)},{default:(0,l.w5)((function(){return[(0,l.Wm)(f.Z,null,{default:(0,l.w5)((function(){return[S,(0,l._)("div",h,(0,u.zw)((0,r.SU)(n).id),1)]})),_:1}),(0,l.Wm)(f.Z,null,{default:(0,l.w5)((function(){return[x,(0,l._)("h3",U,(0,u.zw)((0,r.SU)(n).username),1)]})),_:1}),(0,l.Wm)(f.Z,null,{default:(0,l.w5)((function(){return[Z,(0,l._)("h3",v,(0,u.zw)((0,r.SU)(n).email),1)]})),_:1}),(0,l.Wm)(f.Z,null,{default:(0,l.w5)((function(){return[W,(0,l._)("h3",q,[(0,l._)("ul",null,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)((0,r.SU)(n).roles,(function(e){return(0,l.wg)(),(0,l.iD)("li",{key:e},(0,u.zw)(e),1)})),128))])])]})),_:1}),(0,l.Wm)(m.Z)]})),_:1},8,["icon"]),(0,l.Wm)(d.Z,{title:"Ubah Profil",icon:(0,r.SU)(o.d5D),form:"",onSubmit:(0,a.iM)(A,["prevent"])},{default:(0,l.w5)((function(){return[(0,l.Wm)(f.Z,{label:"Nama"},{default:(0,l.w5)((function(){return[(0,l.Wm)(p.Z,{modelValue:(0,r.SU)(D).password_current,"onUpdate:modelValue":t[0]||(t[0]=function(e){return(0,r.SU)(D).password_current=e}),name:"nama",type:"tel"},null,8,["modelValue"])]})),_:1}),(0,l.Wm)(f.Z,{label:"Email"},{default:(0,l.w5)((function(){return[(0,l.Wm)(p.Z,{name:"password",type:"tel"})]})),_:1}),(0,l.Wm)(g.Z,null,{default:(0,l.w5)((function(){return[(0,l.Wm)(w.Z,{type:"submit",color:"info",label:"Submit",disabled:""})]})),_:1})]})),_:1},8,["icon","onSubmit"])]),(0,l._)("div",null,[(0,l.Wm)(d.Z,{title:"Ubah Password",icon:(0,r.SU)(o.d5D),form:"",onSubmit:(0,a.iM)(A,["prevent"])},{default:(0,l.w5)((function(){return[(0,l.Wm)(f.Z,{label:"Current password",help:"Required. Your current password"},{default:(0,l.w5)((function(){return[(0,l.Wm)(p.Z,{modelValue:(0,r.SU)(D).password_current,"onUpdate:modelValue":t[1]||(t[1]=function(e){return(0,r.SU)(D).password_current=e}),icon:(0,r.SU)(o.AD$),name:"password_current",type:"password",required:"",autocomplete:"current-password"},null,8,["modelValue","icon"])]})),_:1}),(0,l.Wm)(m.Z),(0,l.Wm)(f.Z,{label:"New password",help:"Required. New password"},{default:(0,l.w5)((function(){return[(0,l.Wm)(p.Z,{modelValue:(0,r.SU)(D).password,"onUpdate:modelValue":t[2]||(t[2]=function(e){return(0,r.SU)(D).password=e}),icon:(0,r.SU)(o.$_S),name:"password",type:"password",required:"",autocomplete:"new-password"},null,8,["modelValue","icon"])]})),_:1}),(0,l.Wm)(f.Z,{label:"Confirm password",help:"Required. New password one more time"},{default:(0,l.w5)((function(){return[(0,l.Wm)(p.Z,{modelValue:(0,r.SU)(D).password_confirmation,"onUpdate:modelValue":t[3]||(t[3]=function(e){return(0,r.SU)(D).password_confirmation=e}),icon:(0,r.SU)(o.$_S),name:"password_confirmation",type:"password",required:"",autocomplete:"new-password"},null,8,["modelValue","icon"])]})),_:1}),(0,l.Wm)(m.Z),(0,l.Wm)(g.Z,null,{default:(0,l.w5)((function(){return[(0,l.Wm)(w.Z,{type:"submit",color:"info",label:"Submit",disabled:""})]})),_:1})]})),_:1},8,["icon","onSubmit"])])])]})),_:1}),(0,l.Wm)(b.Z)],64)}}};const D=j;var V=D}}]);
//# sourceMappingURL=profile-legacy.5a9b7d17.js.map