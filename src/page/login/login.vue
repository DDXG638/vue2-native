<template>
    <div id="login">
        <!-- 头部 -->
        <my-header fixed title='登录'>
            <a class="back-white" slot='left' @click='$router.go(-1)'></a>
        </my-header>
        <!-- 正文 -->
        <div class="content" :class="{isIOS: $store.state.device == 'ios'}">
            <div class="container">
                <div class="wrapper">
                    <div class="defaultImg">
                        <img src="~@/assets/icon/members.png">
                    </div>
                    <ul class="input-box">
                        <li class="input-li">
                            <label for="">账号：</label><input type="text" v-model="user.username" placeholder="手机号/邮箱/用户名">
                        </li>
                        <li class="input-li">
                            <label for="">密码：</label><input type="password" v-model="user.password" placeholder="请输入密码">
                        </li>
                        <span class="login-btn" @click.stop="loginByPassword">登陆</span>
                        <router-link :to="{name: 'register'}">
                            <p class="register-btn">还没有账号？立即注册>></p>
                        </router-link>
                    </ul>
                    <div class="defaultTip">
                        <span>其他登录方式</span>
                    </div>
                    <ul class="loginList">
                        <!-- QQ登录 -->
                        <li class="list-item" @click.stop="login(0)">
                            <img src="~@/assets/icon/qqlogin.png">
                        </li>
                        <!-- 微信登录 -->
                        <li class="list-item" @click.stop="login(1)">
                            <img src="~@/assets/icon/wxlogin.png">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import { get_iosLocation, get_androidLocation } from '@/config/cordova'
export default {
    name: 'login',
    data() {
        return {
            GPSLocation: {},
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapMutations([
            'set_userid',
            'set_id'
        ]),
        ...mapMutations('login', [
            'set_isLogin'
        ]),
        ...mapMutations('user', [
            'set_userInfo'
        ]),
        ...mapActions('login', [
            'get_userPower_data',
            'post_login'
        ]),
        loginByPassword() {
            // this.$toast({ message: `${this.userName}-${this.password}`, duration: 2000 })
            let username = this.user.username
            let password = this.user.password
            if (username.length > 3 && username.length < 20 && password.length > 5) {
                this.post_login(this.user).then(res => {
                    if (res.code === 0) {
                        this.$toast({ message: '登陆成功！', duration: 2000 })
                        // 设置数据
                        let { headimgurl, nickname, city = '广州', username, _id } = res.data
                        this.set_isLogin('psw')                             // 设置登录
                        this.set_userInfo({headimgurl, nickname, city})     // 设置用户数据
                        this.set_userid(username) // 设置userid
                        this.set_id(_id)
                        this.$router.go(-1)
                    } else {
                        this.$toast({ message: res.msg, duration: 2000 })
                    }
                }, () => {
                    this.$toast({ message: '登陆失败！', duration: 2000 })
                })
                .catch(err => {
                    this.$toast({ message: '登陆异常！', duration: 2000 })
                    console.log(err)
                })
            } else {
                this.$toast({ message: '账号密码格式不正确', duration: 2000 })
            }
        },
        // 第三方登录
        login(loginType) {
            var that = this
            if (loginType === 1) {
                var scope = 'snsapi_userinfo'
                document.addEventListener('deviceready', () => {
                    cordova.exec(successCallback, errorCallback, 'Wechat', 'sendAuthRequest', [scope])
                    function successCallback(response) {
                        var code = response.code
                        var appidA = 'wxab47f0260fabea40'
                        // var appidB = 'wx13b05ceac5e7a654'
                        var secretA = '24950a2a032720541e0e952954dd6248'
                        // var secretB = '9c96f15b353dc26658def855f9b04ce0'
                        $.ajax({
                                type: 'GET',
                                url: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appidA}&secret=${secretA}&code=${code}&grant_type=authorization_code`
                            })
                            .then(
                                function(res1) {
                                    var data1 = JSON.parse(res1)
                                    console.log('data1:', data1)
                                    var refresh_token = data1.refresh_token
                                    $.ajax({
                                        type: 'GET',
                                        url: `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${appidA}&grant_type=refresh_token&refresh_token=${refresh_token}`
                                    }).then(
                                        function(res2) {
                                            var data2 = JSON.parse(res2)
                                            console.log('data2:', data2)
                                            var access_token = data2.access_token
                                            var openid = data2.openid
                                            $.ajax({
                                                type: 'GET',
                                                url: `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`
                                            }).then(
                                                function(res3) {
                                                    var data3 = JSON.parse(res3)
                                                    console.log('data3:', data3)
                                                    that.set_isLogin('wx')                    // 设置登录
                                                    that.set_userInfo(data3)                  // 设置用户数据
                                                    that.set_userid(data3.unionid)            // 设置userid
                                                    that.get_userPower_data(data3.unionid)    // 请求用户权限
                                                    that.$router.go(-1)
                                                    $.ajax({
                                                        type: 'GET',
                                                        data: data3,
                                                        url: `http://app.toutiaojk.com/e/extend/list/appuser.php`
                                                    })
                                                },
                                                function() {
                                                    Toast({ message: '登录失败', duration: 2000 })
                                                }
                                            )
                                        },
                                        function() {
                                            Toast({ message: '登录失败', duration: 2000 })
                                        }
                                    )
                                },
                                function() {
                                    Toast({ message: '登录失败', duration: 2000 })
                                }
                            )
                        //              $.ajax({
                        //                type: 'GET',
                        //                data: that.cordova_location,
                        //                url: `http://app.toutiaojk.com/e/extend/list/appuser.php?code=${code}`
                        //              })
                        //                .then(res => {
                        //                  var ress = JSON.parse(res)
                        //                  if (ress.err !== 1) {
                        //                    that.set_login('wx')
                        //                    that.set_wx(ress.data)
                        //                    that.set_userid(ress.data.unionid)
                        //                    that.$router.go(-1)
                        //                  } else {
                        //                    alert(ress.errMsg)
                        //                  }
                        //                })
                    }

                    function errorCallback() {
                        Toast({ message: '授权失败', duration: 2000 })
                    }
                }, false)
            } else {
                this.$toast({ message: '暂不支持QQ登录', duration: 2000 })
            }
        },
        // onSuccess(response) {
        //     const code = response.code
        //     const appidA = 'wxab47f0260fabea40'
        //     // const appidB = 'wx13b05ceac5e7a654'
        //     const secretA = '24950a2a032720541e0e952954dd6248'
        //     // const secretB = '9c96f15b353dc26658def855f9b04ce0'

        //     // 获取refresh_token
        //     this.$http.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appidA}&secret=${secretA}&code=${code}&grant_type=authorization_code`)
        //     .then(res1 => {
        //         let data1 = JSON.parse(res1)
        //         let refresh_token = data1.refresh_token
        //         this.$http.get(`https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${appidA}&grant_type=refresh_token&refresh_token=${refresh_token}`)
        //         .then(res2 => {
        //             let data2 = JSON.parse(res2)
        //             let access_token = data2.access_token
        //             let openid = data2.openid
        //             this.$http.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`)
        //             .then(res3 => {
        //                 let data3 = JSON.parse(res3)
        //                 let unionid = data3.unionid
        //                 this.set_isLogin('wx')              // 设置登录
        //                 this.set_userInfo(data3)            // 设置用户数据
        //                 this.set_userid(unionid)            // 设置userid
        //                 this.get_userPower_data(unionid)    // 请求用户权限
        //                 this.$router.go(-1)
        //                 $.ajax({
        //                     type: 'GET',
        //                     data: data3,
        //                     url: `http://app.toutiaojk.com/e/extend/list/appuser.php`
        //                 })
        //             })
        //         })
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         this.$toast({ message: '登录失败', duration: 2000 })
        //     })

        //     // 发送定位
        //     this.$http.get(`http://app.toutiaojk.com/e/extend/list/appuser.php?code=${code}`, {params: this.GPSLocation})
        //     .then(res => {
        //         console.log(res)
        //     })
        // },
        // onError() {
        //     this.$toast({ message: '授权失败', duration: 2000 })
        // },
        get_location() {
            if (this.$store.state.device === 'ios') {
                var res = get_iosLocation()
                this.GPSLocation = res.coords
                 console.log('IOS定位', this.GPSLocation)
            } else {
                this.GPSLocation = get_androidLocation()
                 console.log('安卓定位', this.GPSLocation)
            }
        }
    },
    mounted() {
        // this.get_location()
    }
}
</script>
<style lang='stylus'>
#login{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .wrapper{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
    .defaultImg {
        text-align: center;
        width: 100%;
        margin-bottom: 0.53rem;
        img {
            width: 2.4rem;
            height: 2.4rem;
        }
    }
    .input-box {
        padding: 0 .8rem;
        margin-bottom: .5rem;

        .input-li {
            display: block;
            padding: .2rem .5rem;
            margin-bottom: .18rem;
            border-bottom: 1px solid #dbdbdc;
            font-size: .5rem;

            input {
                background: #f8f8f8;
                border: none;
                width: 5rem;
                outline: none;
                &::placeholder {
                    font-size: 0.4rem;
                }
            }
        }
        .login-btn {
            display: block;
            width: 100%;
            text-align: center;
            line-height: 1rem;
            background: #e4493d;
            border-radius: .1rem;
            font-weight: bold;
            font-size: .5rem;
            letter-spacing: .2rem;
            color: white;
        }
        .register-btn {
            text-align: right;
            font-size: .3rem;
            color: crimson;
            margin-top: .2rem;
        }
    }
    .defaultTip {
        margin: 0 auto;
        width: 50%;
        text-align: center;
        span{
            position: relative;
            display: inline-block;
            vertical-align: middle;
            font-size: 0.32rem;
            color: darkgray;
            letter-spacing: 5px;
            height: 0.8rem;
            line-height: 0.8rem;
        }
        span:before{
            content: '';
            position: absolute;
            width: 25%;
            top: 50%;
            left: -50%;
            transform: translateY(-50%);
            border-top: 1px solid darkgray;
        }
        span:after{
            content: '';
            position: absolute;
            width: 25%;
            top: 50%;
            right: -50%;
            transform: translateY(-50%);
            border-top: 1px solid darkgray;
        }
    }
    .loginList{
        .list-item{
            margin-top: 0.4rem;
            text-align: center;
            img{
                width: 5.5rem;
                height: 1.28rem;
            }
        }
    }
}
</style>
