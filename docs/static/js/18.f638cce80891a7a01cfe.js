webpackJsonp([18],{Crlf:function(e,t,n){"use strict";function a(e){n("vWPT")}Object.defineProperty(t,"__esModule",{value:!0});var r=n("Xxa5"),s=n.n(r),o=n("exGp"),i=n.n(o),c=n("Dd8w"),u=n.n(c),l=n("NYxO"),p=n("KOga"),d={name:"feedback",data:function(){return{newUserInfo:{avatar:"",nickname:""},myCroppa:{},uploadData:{},loading:!1}},computed:u()({},Object(l.c)(["_id"]),Object(l.c)("login",["isLogin"]),Object(l.c)("user",["userInfo"])),methods:u()({},Object(l.d)(["set_userid"]),Object(l.d)("login",["set_isLogin"]),Object(l.d)("user",["set_userInfo"]),{upload:function(e){var t=this;return i()(s.a.mark(function n(){var a,r,o,i;return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a=new FormData,n.next=3,t.qnUpload(e.target.files[0]);case 3:return r=n.sent,a.append("file",e.target.files[0]),a.append("token",r.token),a.append("key",r.key),o={headers:{"Content-Type":"multipart/form-data"}},n.next=10,Object(p.a)("post","qiniuUpload",a,o);case 10:i=n.sent,t.newUserInfo.avatar="http://p6iiiwy0l.bkt.clouddn.com/"+i.key;case 12:case"end":return n.stop()}},n,t)}))()},getAvatarUrl:function(){var e=this;return i()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.loading=!0,e.myCroppa.generateBlob(function(){var t=i()(s.a.mark(function t(n){var a,r,o,i;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=new FormData,t.next=3,e.qnUpload(n);case 3:return r=t.sent,a.append("file",n),a.append("token",r.token),a.append("key",r.key),o={headers:{"Content-Type":"multipart/form-data"}},t.next=10,Object(p.a)("post","qiniuUpload",a,o);case 10:i=t.sent,e.loading=!1,i.key?(e.newUserInfo.avatar="http://p6iiiwy0l.bkt.clouddn.com/"+i.key,e.$toast({message:"上传图片成功！",duration:1500})):e.$toast({message:"上传图片失败！",duration:1500});case 13:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}(),"image/jpeg",.8);case 2:case"end":return t.stop()}},t,e)}))()},saveData:function(){var e=this;return i()(s.a.mark(function t(){var n,a,r,o,i,c;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={nickname:e.newUserInfo.nickname,headimgurl:e.newUserInfo.avatar,userId:e._id},t.next=3,Object(p.a)("post","setUserInfo",n);case 3:a=t.sent,0===a.code?(e.$toast({message:"修改用户信息成功！",duration:1500}),r=n.headimgurl,o=n.nickname,i=n.city,c=void 0===i?"广州":i,e.set_userInfo({headimgurl:r,nickname:o,city:c}),e.$router.go(-1)):e.$toast({message:"修改用户信息失败！",duration:1500});case 5:case"end":return t.stop()}},t,e)}))()},qnUpload:function(e){var t=this;return i()(s.a.mark(function n(){var a,r,o,i;return s.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a=e.name||"avatar.png",r=a.split("."),o=r.splice(r.length-1,1)[0],n.next=5,Object(p.a)("post","getQiNiuToken");case 5:if(i=n.sent,0!==i.code){n.next=10;break}return n.abrupt("return",{key:"image/"+r.join(".")+"_"+(new Date).getTime()+"."+o,token:i.data});case 10:return t.$toast({message:"获取七牛token失败，无法上传图片！",duration:1500}),n.abrupt("return",{});case 12:case"end":return n.stop()}},n,t)}))()}}),mounted:function(){console.log(this.userInfo),this.newUserInfo.avatar=this.userInfo.headimgurl,this.newUserInfo.nickname=this.userInfo.nickname}},f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"fadeIn"}},[n("div",{attrs:{id:"feedback"}},[n("my-header",{attrs:{fixed:"",title:"修改信息"}},[n("a",{staticClass:"back-white",attrs:{slot:"left"},on:{click:function(t){e.$router.go(-1)}},slot:"left"})]),e._v(" "),n("div",{directives:[{name:"swiper",rawName:"v-swiper:swiperRight",value:!0,expression:"true",arg:"swiperRight"}],staticClass:"content",class:{isIOS:"ios"==e.$store.state.device}},[n("div",{staticClass:"container"},[n("div",{staticClass:"avatar-box"},[n("croppa",{attrs:{placeholder:"选择头像","placeholder-font-size":0,disabled:!1,"prevent-white-space":!0,"show-remove-button":!0},model:{value:e.myCroppa,callback:function(t){e.myCroppa=t},expression:"myCroppa"}},[n("img",{attrs:{slot:"initial",crossOrigin:"anonymous",src:e.newUserInfo.avatar},slot:"initial"})]),e._v(" "),n("mt-button",{attrs:{size:"small",type:"primary"},nativeOn:{click:function(t){e.getAvatarUrl(t)}}},[e._v("上传头像")])],1),e._v(" "),n("mt-field",{attrs:{label:"昵称",placeholder:"请输入用户名"},model:{value:e.newUserInfo.nickname,callback:function(t){e.$set(e.newUserInfo,"nickname",t)},expression:"newUserInfo.nickname"}}),e._v(" "),n("mt-button",{staticClass:"save-btn",attrs:{size:"large",type:"primary"},nativeOn:{click:function(t){e.saveData(t)}}},[e._v("保存修改")])],1)]),e._v(" "),n("my-loading",{attrs:{visible:e.loading,type:"double-bounce",color:"#26a2ff",size:36}})],1)])},m=[],v={render:f,staticRenderFns:m},g=v,k=n("VU/8"),b=a,h=k(d,g,!1,b,null,null);t.default=h.exports},M1X2:function(e,t,n){t=e.exports=n("FZ+f")(!1),t.push([e.i,"\n#feedback {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 100%;\n  z-index: 1000;\n  background: #fff;\n  overflow: hidden;\n}\n#feedback .content {\n  padding: 0.4rem;\n  background: #eee;\n}\n#feedback .content .avatar-box {\n  margin: 1rem 0 1rem 0;\n  text-align: center;\n}\n#feedback .content .save-btn {\n  margin-top: 1rem;\n}\n",""])},vWPT:function(e,t,n){var a=n("M1X2");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("2aaa8cb0",a,!0,{})}});