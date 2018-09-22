<template>
    <transition name='fadeIn'>
        <div id="feedback">
            <!-- 头部 -->
            <my-header fixed title='修改信息'>
                <a class="back-white" slot='left' @click='$router.go(-1)'></a>
            </my-header>
            <!-- 正文 -->
            <div class="content" :class="{isIOS: $store.state.device == 'ios'}" v-swiper:swiperRight='true'>
                <div class="container">
                    <div class="avatar-box">
                        <croppa v-model="myCroppa"
                                placeholder="选择头像"
                                :placeholder-font-size="0"
                                :disabled="false"
                                :prevent-white-space="true"
                                :show-remove-button="true">
                            <img crossOrigin="anonymous"
                                 :src="newUserInfo.avatar"
                                 slot="initial">
                        </croppa >
                        <mt-button size="small" type="primary" @click.native="getAvatarUrl">上传头像</mt-button>
                    </div>
                    <mt-field label="昵称" placeholder="请输入用户名" v-model="newUserInfo.nickname"></mt-field>
                    <mt-button size="large" type="primary" class="save-btn" @click.native="saveData">保存修改</mt-button>
                    <!--<input name="file" type="file" accept="image/*" @change='upload'/>-->
                </div>
            </div>
            <my-loading :visible="loading" type="double-bounce" color="#26a2ff" :size=36></my-loading>
        </div>
    </transition>
</template>
<script>
/* import { autoTextarea } from '@/config/autoTextarea.js'
import { get_local_cache, set_local_cache } from '@/config/cache.js' */
import { mapGetters, mapMutations } from 'vuex'
import { fetch } from '@/config/fetch'
const STATICDOMAIN = 'http://p6iiiwy0l.bkt.clouddn.com/'
// 后台没有做接口，这里只是模拟一下
export default {
    name: 'feedback',
    data() {
        return {
            newUserInfo: {
                avatar: '',
                nickname: ''
            },
            myCroppa: {},
            uploadData: {},
            loading: false
        }
    },
    computed: {
        ...mapGetters([
            '_id'
        ]),
        ...mapGetters('login', [
            'isLogin'
        ]),
        ...mapGetters('user', [
            'userInfo'
        ])
    },
    methods: {
        ...mapMutations([
            'set_userid'
        ]),
        ...mapMutations('login', [
            'set_isLogin'
        ]),
        ...mapMutations('user', [
            'set_userInfo'
        ]),
        async upload (event) {
            let formData = new FormData()
            let uploadData = await this.qnUpload(event.target.files[0])
            formData.append('file', event.target.files[0])
            formData.append('token', uploadData.token)
            formData.append('key', uploadData.key)
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
            }
            let res = await fetch('post', 'qiniuUpload', formData, config)
            this.newUserInfo.avatar = STATICDOMAIN + res.key
            // console.log(res)
        },
        async getAvatarUrl() {
            this.loading = true
            this.myCroppa.generateBlob(
                async blob => {
                    // write code to upload the cropped image file (a file is a blob)
                    let formData = new FormData()
                    let uploadData = await this.qnUpload(blob)
                    formData.append('file', blob)
                    formData.append('token', uploadData.token)
                    formData.append('key', uploadData.key)
                    let config = {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                    let res = await fetch('post', 'qiniuUpload', formData, config)
                    this.loading = false
                    if (res.key) {
                        this.newUserInfo.avatar = STATICDOMAIN + res.key
                        this.$toast({ message: '上传图片成功！', duration: 1500 })
                    } else {
                        this.$toast({ message: '上传图片失败！', duration: 1500 })
                    }
                },
                'image/jpeg',
                0.8
            );
        },
        async saveData () {
            let params = {
                nickname: this.newUserInfo.nickname,
                headimgurl: this.newUserInfo.avatar,
                userId: this._id
            }
            // console.log(params)
            let res = await fetch('post', 'setUserInfo', params)
            if (res.code === 0) {
                this.$toast({ message: '修改用户信息成功！', duration: 1500 })
                let { headimgurl, nickname, city = '广州' } = params
                this.set_userInfo({headimgurl, nickname, city})     // 设置用户数据
                this.$router.go(-1)
            } else {
                this.$toast({ message: '修改用户信息失败！', duration: 1500 })
            }
            // console.log(typeof dataUrl)
        },
        async qnUpload (file) {
            let fileName = file.name || 'avatar.png'
            let suffix = fileName.split('.') // 分割文件名
            // 获取文件的后缀名称“.png”
            let ext = suffix.splice(suffix.length - 1, 1)[0]
            // 像后台获取key 和 token
            let res = await fetch('post', 'getQiNiuToken')
            if (res.code === 0) {
                return {
                    key: `image/${suffix.join('.')}_${new Date().getTime()}.${ext}`,
                    token: res.data
                }
            } else {
                this.$toast({ message: '获取七牛token失败，无法上传图片！', duration: 1500 })

                return {}
            }
        }
    },
    mounted() {
        console.log(this.userInfo)
        this.newUserInfo.avatar = this.userInfo.headimgurl
        this.newUserInfo.nickname = this.userInfo.nickname
    }
}
</script>
<style lang='stylus'>
#feedback {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 1000;
    background: #fff;
    overflow: hidden;
    .content {
        padding: .4rem;;
        background: #eee;

        .avatar-box {
            margin: 1rem 0 1rem 0;
            text-align: center;
        }

        .save-btn {
            margin-top: 1rem;
        }
    }
}
</style>
