webpackJsonp([0],{"24wF":function(n,i,t){var e=t("dFjw");"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);t("rjj0")("2de74300",e,!0,{})},B0Ga:function(n,i,t){"use strict";(function(n){i.a={props:["json"],data:function(){return{video:"",video_poster:!0,video_playing:!1,video_ended:!1,video_loading:!1,video_fixed:!1}},watch:{json:function(n){var i=this;this.$nextTick(function(){i.video=i.$el.querySelector("video"),i.video_poster=!0,i.video_playing=!1,i.video_ended=!1,i.video_loading=!1,i.video_fixed=!1})}},methods:{videoPlay:function(){this.video=this.$el.querySelector("video"),this.video.play(),this.videoEvent(),this.videoFixed()},videoEvent:function(){var n=this;this.video.onplay=function(){n.video_playing=!0,n.video_poster=!1,n.video_ended=!1},this.video.onpause=function(){n.video_playing=!1,n.video_loading=!1},this.video.onwaiting=function(){n.video_loading=!0},this.video.oncanplay=function(){n.video_loading=!1},this.video.onended=function(){n.video_ended=!0}},videoFixed:function(){var i=this,t=n(".video").position().top;n("#detail .container").on("scroll",function(e){e.preventDefault(),n("#detail .container").scrollTop()>=t&&i.video_playing?i.video_fixed=!0:i.video_fixed=!1})},backTo:function(){var n=this;document.addEventListener("pause",function(){n.video&&n.video.pause()},!1)}},mounted:function(){this.backTo()}}}).call(i,t("7t+N"))},Iwrl:function(n,i,t){"use strict";function e(n){t("24wF")}var o=t("B0Ga"),a=function(){var n=this,i=n.$createElement,t=n._self._c||i;return n.json?t("article",{attrs:{id:"article"}},[t("div",{staticClass:"article_info"},[t("h1",{staticClass:"title"},[n._v(n._s(n.json.title))]),n._v(" "),t("span",{staticClass:"befrom"},[n._v(n._s(n.json.befrom))]),n._v(" "),t("span",{staticClass:"newstime"},[n._v(n._s(n.json.newstime))])]),n._v(" "),n.json.playonlineurl?[t("div",{staticClass:"article_video"},[t("div",{staticClass:"video",class:{"video-fixed":n.video_fixed}},[n.video_poster?[t("div",{staticClass:"video_info"},[t("img",{attrs:{src:n.json.titlepic}})]),n._v(" "),t("div",{staticClass:"playRound",on:{click:function(i){i.stopPropagation(),n.videoPlay(i)}}},[t("div",{staticClass:"playSan"})])]:n._e(),n._v(" "),n.video_ended?[t("div",{staticClass:"video_info"},[t("img",{attrs:{src:n.json.titlepic}})]),n._v(" "),t("div",{staticClass:"repeat"},[t("div",{staticClass:"repeat_round",on:{click:function(i){i.stopPropagation(),n.videoPlay(i)}}}),n._v(" "),t("p",{staticClass:"repeat_text"},[n._v("重播")])]),n._v(" "),t("div",{staticClass:"black"})]:n._e(),n._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:n.video_loading,expression:"video_loading"}],staticClass:"loading"},[t("mt-spinner",{attrs:{type:0,size:50}})],1),n._v(" "),t("div",{staticClass:"video_box"},[t("video",{key:n.json.playonlineurl,ref:"video",attrs:{controls:!n.video_poster}},[t("source",{attrs:{src:n.json.playonlineurl,type:"video/mp4"}})])])],2)])]:[t("section",{staticClass:"article_content"},[t("div",{staticClass:"content_html",domProps:{innerHTML:n._s(n.json.newstext)}})])]],2):n._e()},r=[],d={render:a,staticRenderFns:r},l=d,s=t("VU/8"),c=e,p=s(o.a,l,!1,c,null,null);i.a=p.exports},YSVn:function(n,i){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEMUlEQVR4Xu2bga3UMAyG/SYAJoA3ATABMAEwATABMAEwATABMAEwwYMJgAmACYAJQJ+USJZx2yR12l7vLFW9d+0lzu/fjuPkncmRy9mRj19OAJwYcOQInFxgIQLcEJFbIsL9WuqTe/7MVz/S9VVEuD6nv7uq2JMBd0XktojcMwOtGRCgfBCR173AqAUAK/5JFhoaCAN+OWPQQ+1+EpEXIsI9TGoAeCUij1PP70TkodECaz9LVg9T0GkIAB5FMaIGgL9Kmd8iciX9fTlZ3AJidf+YrId/a5/P7xEfaAsguWDbmDxPjJgFdisAdMpvCWLvU3DzFIEp+DBXrQAG7gSwQ2AA5v05bJgDwJ00eBS1wsCxEEEsQmAE7XlAwEZ0ycyq6m8OAF5H30TkSXSgUh3BCGLRVdN5MwiRAHiBscoahS/DuLciwjSrpQmEKACYnqDokgIIDxwQzkUEMIokAgB8Twc5pimyuCUEdyPn0EL/xIQiiQDA64jMDeWWEI8JxYzsBQADr2l7LlBY3c4QuMLkLFSjpNfJkOIkPUTspYTAyGAvqQ6LXKEGADopoTUBiJgwiX4wOgBOUqaFWDC6dqgBIFjfLs1Zlk4ycW8AkDFeGGhHY8HeAGDsTMvXFQhPU/boUm6PANjcAEBuDjncHgEgWP8yA2bp7maHewTAcwOWzO6SfK8A6OoVgAxmhnsFgCLKG+UGg9PhXgGw0yGLM777T04AdMnH1m/UmwlcY48xAMqw1qYxytCh9fjOGIUA8EVVe1nYkFIeioTEAL0PwMAHk4kNohICgF1ZTS4tNwREyDRI5qQrr8QByk+HICGJEFVe9vqyLFX2jgBYxy/aa0qFrR8dSiAMXQyxgtJ1tkEkI8wW1IZdDrNbxcarK1OZoC05H4IbWPrPKohUl5iCrNjaTLW+UwxAEXxfb0ZumQXUA/WiJ6QoaudUQKHE1LQd3Wragt91LYtbFozW2QqUjX6FyP89rVty24NLYN15iQvwvudbS+7/TQFmqc/74Vtj3ibkFrJDKj/2fFKXzVFoBvXt6Yw1QSBTtecSiqifKVXqAvl9EgoWSTo54tkaIHiW5wwjB7e6HJDIIHjRlme4CElHcedTjj3wHCayCWprfAye76pmp1oGZJ28qZFndA4IvapHgI/l7cm0psGjcCsA/BZlsLp1h8wGAlHUFvnYKdTmwc8FgN8TE6gb2MCYmcIzQCIjqxWsTD0Ctrkl7XQWCUM0u90cBuQBoSiROJ8j9gaKgrgFLsLdO3ANmADJPR+XHQOteKobayQCgNw+SlOJ0VvTtVYveZ9pDlaEuFckADpAsiaPBoKBw7TQANsDAJ0zYCkuL1CWWPtnijEwK8TittOeAOi+sl+TpPCZy4JC5YZYkf9lBkt3GbRWbCkASqy9yjsnAFaBfUOdnhiwIWOsosrRM+Af8AraQaJ/cBUAAAAASUVORK5CYII="},dFjw:function(n,i,t){var e=t("kxFB");i=n.exports=t("FZ+f")(!1),i.push([n.i,"\n#article {\n  width: 100%;\n  position: relative;\n}\n#article .article_info {\n  font-size: 12px;\n  overflow: hidden;\n  background: #fff;\n  padding: 0 0.427rem 0.4rem;\n  border-bottom: 1px solid #eee;\n  background: #fff;\n}\n#article .article_info .title {\n  color: #000;\n  font-size: 20px;\n  font-weight: bold;\n  padding: 0.4rem 0;\n}\n#article .article_info .befrom {\n  margin-right: 5px;\n}\n#article .article_video {\n  width: 100%;\n  margin-bottom: 40px;\n}\n#article .article_video .video {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n  height: 5.3rem;\n}\n#article .article_video .video-fixed {\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  z-index: 1000;\n}\n#article .article_video .video_info {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  z-index: 111;\n}\n#article .article_video .video_info img {\n  width: 100%;\n  height: 5.3rem;\n}\n#article .article_video .playRound {\n  position: absolute;\n  width: 48px;\n  height: 48px;\n  left: 50%;\n  top: 50%;\n  margin-left: -24px;\n  margin-top: -24px;\n  border-radius: 50%;\n  background: rgba(0,0,0,0.3);\n  z-index: 333;\n  border: 1px solid #eee;\n}\n#article .article_video .playRound .playSan {\n  position: absolute;\n  width: 0;\n  height: 0;\n  font-size: 0;\n  border-width: 16px;\n  border-style: solid;\n  border-color: transparent transparent transparent rgba(255,255,255,0.6);\n  left: 50%;\n  top: 50%;\n  margin-left: -5px;\n  margin-top: -16px;\n}\n#article .article_video .loading {\n  position: absolute;\n  width: 50px;\n  height: 50px;\n  left: 50%;\n  top: 50%;\n  margin-left: -25px;\n  margin-top: -25px;\n  z-index: 222;\n}\n#article .article_video .repeat {\n  position: absolute;\n  width: 44px;\n  height: 44px;\n  left: 50%;\n  top: 50%;\n  margin-left: -22px;\n  margin-top: -22px;\n  border-radius: 50%;\n  z-index: 444;\n  background: #f8f8f8;\n}\n#article .article_video .repeat .repeat_round {\n  width: 44px;\n  height: 44px;\n  background: url("+e(t("YSVn"))+') no-repeat center center;\n  background-size: 28px;\n}\n#article .article_video .repeat .repeat_text {\n  font-size: 12px;\n  color: #fff;\n  text-align: center;\n  margin-top: 4px;\n}\n#article .article_video .black {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  z-index: 333;\n  height: 200px;\n  background: rgba(0,0,0,0.3);\n}\n#article .article_video .video_box {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  overflow: hidden;\n  text-align: center;\n  height: 5.3rem;\n}\n#article .article_video .video_box video {\n  width: 100%;\n}\n#article .article_content {\n  position: relative;\n  color: #333;\n  font-size: 18px !important;\n  line-height: 30px;\n  padding: 0.4rem 0.427rem 0;\n}\n#article .article_content .content_html {\n  overflow: hidden;\n  text-indent: none !important;\n  font-size: inherit;\n}\n#article .article_content .content_html img {\n  width: 100% !important;\n  height: auto !important;\n}\n#article .article_content .content_html img[type="icon"] {\n  width: initial !important;\n}\n#article .article_content .content_html * {\n  text-indent: inherit !important;\n  font-size: inherit !important;\n  font-family: inherit !important;\n  line-height: inherit !important;\n  text-align: justify !important;\n  text-justify: inter-ideograph !important;\n}\n#article .article_content .content_html div,\n#article .article_content .content_html p {\n  width: 100% !important;\n  padding-bottom: 15px;\n}\n',""])}});