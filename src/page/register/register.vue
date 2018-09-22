<template>
    <div id="register">
        <my-header fixed title='注册'>
            <a class="back-white" slot='left' @click='$router.go(-1)'></a>
        </my-header>
        <div class="wrapper">
            <mt-field label="用户名" placeholder="手机/邮箱/用户名" type="text" :state="state.username" v-model="user.username" @blur.native.capture="checkedInpout('1')"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" :state="state.password" v-model="user.password" @blur.native.capture="checkedInpout('2')"></mt-field>
            <mt-field label="确认密码" placeholder="请重新输入密码" type="password" :state="state.repassword" v-model="user.repassword" @blur.native.capture="checkedInpout('3')"></mt-field>
            <mt-field label="昵称" placeholder="请输入昵称" type="text" :state="state.nickname" v-model="user.nickname" @blur.native.capture="checkedInpout('4')"></mt-field>
            <mt-button class="register-btn" size="large" type="primary" @click.native="register">立即注册</mt-button>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: 'register',
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    repassword: '',
                    nickname: ''
                },
                state: {
                    username: '',
                    password: '',
                    repassword: '',
                    nickname: ''
                }
            }
        },
        methods: {
            ...mapActions('user', [
                'post_register',
                'post_checkedUser'
            ]),
            checkedInpout (type) {
                console.log(type)
                // 检验username
                if (type === '1') {
                    let username = this.user.username
                    if (username.length > 3 && username.length < 20) {
                        this.post_checkedUser({username}).then(res => {
                            if (res.code === 0) {
                                this.state.username = 'success'
                            } else {
                                this.$toast({ message: res.msg, duration: 2000 })
                                this.state.username = 'error'
                            }
                        })
                    } else {
                        this.state.username = 'error'
                    }
                } else if (type === '2') {
                    // 校验密码
                    let password = this.user.password
                    if (password.length > 5) {
                        this.state.password = 'success'
                    } else {
                        this.state.password = 'error'
                    }
                } else if (type === '3') {
                    let repassword = this.user.repassword
                    if (repassword.length > 5 && repassword === this.user.password) {
                        this.state.repassword = 'success'
                    } else {
                        this.state.repassword = 'error'
                        this.$toast({ message: '两次密码不一致', duration: 2000 })
                    }
                } else if (type === '4') {
                    let nickname = this.user.nickname
                    if (nickname.length > 3 && nickname.length < 20) {
                        this.state.nickname = 'success'
                    } else {
                        this.state.nickname = 'error'
                    }
                }
            },
            register () {
                // this.$toast({ message: `${this.username}-${this.password}-${this.repassword}`, duration: 2000 })
                let states = this.state
                for (let i in states) {
                    if (states[i] !== 'success') {
                        this.$toast({ message: '以上输入的数据校验不成功！', duration: 2000 })
                        return
                    }
                }
                this.post_register(this.user).then(res => {
                    if (res.code === 0) {
                        this.$toast({ message: '注册成功！', duration: 2000 })
                        this.$router.go(-1)
                    } else {
                        this.$toast({ message: '注册失败！', duration: 2000 })
                    }
                })
            }
        }
    }
</script>

<style lang='stylus'>
#register{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .wrapper{
        padding: 1.335rem .2rem 0 .2rem;
        .register-btn {
            margin-top: 1rem;
        }
    }
}
</style>
