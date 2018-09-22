<template>
    <div id="weather">
        <!-- 头部 -->
        <my-header fixed title='小瓜天气' v-goTop:click='true' isOpacity></my-header>
        <!-- 正文 -->
        <div class="content" :class="{isIOS: $store.state.device == 'ios'}" v-if="nowWeatherJson.location">
            <div class="container" :class="{'day-bg': isDay, 'night-bg': !isDay}">
                <!-- 顶部提示 -->
                <div class="globalTip">
                    <div class="dataCount">成功获取{{location}}的天气信息</div>
                    <div class="noNewData">没有获取到最新的天气信息</div>
                    <div class="requestFail">网络请求失败,请检查网络</div>
                </div>
                <!-- 顶部及时天气信息 -->
                <div class="wea-now">
                    <p class="location-text">{{nowWeatherJson.location.name}}<span class="s-text">{{nowWeatherJson.last_update | showTime}}发布</span></p>
                    <div class="wea-detail">
                        <div :class="`wea-item detail-img wea-icon-${nowWeatherJson.now.code}`"></div>
                        <div class="wea-item detail-temp">
                            <p class="p-big">{{nowWeatherJson.now.temperature}}°</p>
                            <p>{{nowWeatherJson.now.text}}</p>
                        </div>
                        <div class="wea-item detail-dec">
                            <p>{{threeWeatherJson.daily[0].wind_direction}} {{threeWeatherJson.daily[0].wind_scale}}级</p>
                            <p>空气轻度污染 115</p>
                            <p>相对湿度 30%</p>
                        </div>
                    </div>
                </div>
                <div class="wea-thr">
                    <div class="thr-item" :class="{'item-shadow': index > 0}" v-for="(item, index) in threeWeatherJson.daily">
                        <p>{{dayArr[index]}}</p>
                        <div :class="`thr-img wea-icon-${item.code_day}`"></div>
                        <p>{{item.text_day}}/{{item.text_night}}</p>
                        <p>{{item.low}}°/{{item.high}}°</p>
                    </div>
                    <!--<div class="thr-item item-shadow">
                        <p>明日</p>
                        <div class="thr-img wea-icon-0"></div>
                        <p>晴/多云</p>
                        <p>14°/27°</p>
                    </div>
                    <div class="thr-item item-shadow">
                        <p>后日</p>
                        <div class="thr-img wea-icon-0"></div>
                        <p>晴/多云</p>
                        <p>14°/27°</p>
                    </div>-->
                </div>
                <div class="location-picker">
                    <p class="location-text">当前位置：{{preLocation}} - {{location}}</p>
                    <mt-picker :slots="slots" :visibleItemCount="3" @change="onValuesChange">
                    </mt-picker>
                </div>
                <span class="refresh-btn" @click="refresh">
                    刷新
                </span>
            </div>
        </div>

        <!-- 请求提示 -->
        <my-loading :visible="loading"></my-loading>
        <my-error :visible='error' :method='init'></my-error>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
        name: 'weather',
        data() {
            return {
                loading: false,
                error: false,
                location: '广州',
                preLocation: '广东',
                days: 3,
                dayArr: ['今日', '明日', '后日'],
                isDay: '',
                slots: [
                    {
                        flex: 1,
                        values: ['广东', '直辖市', '特别行政区', '浙江', '安徽', '福建', '贵州', '广西', '海南', '湖南', '湖北'],
                        className: 'slot1',
                        textAlign: 'center',
                        defaultIndex: 1
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: ['广州', '深圳', '湛江', '茂名', '阳江', '江门', '珠海', '云浮', '肇庆', '清远', '佛山', '东莞', '惠州', '汕头', '梅州'],
                        className: 'slot3',
                        textAlign: 'center',
                        defaultIndex: 1
                    }
                ],
                placesArr: {
                    '广东': ['广州', '深圳', '湛江', '茂名', '阳江', '江门', '珠海', '云浮', '肇庆', '清远', '佛山', '东莞', '惠州', '汕头', '梅州'],
                    '直辖市': ['北京', '上海', '天津', '重庆'],
                    '特别行政区': ['香港', '澳门'],
                    '浙江': ['丽水', '温州', '衢州', '金华', '杭州', '台州', '绍兴', '嘉兴', '宁波'],
                    '安徽': ['合肥', '淮南', '芜湖'],
                    '福建': ['厦门', '漳州', '龙岩', '福州'],
                    '贵州': ['都匀', '遵义', '贵阳'],
                    '广西': ['钦州', '玉林', '梧州', '桂林'],
                    '海南': ['三亚', '五指山', '琼海', '海口', '南沙', '昌江', '屯昌'],
                    '湖南': ['益阳', '岳阳', '长沙'],
                    '湖北': ['恩施', '宜昌', '荆州', '襄阳', '孝感', '黄冈', '武汉']
                }
            }
        },
        computed: {
            ...mapGetters('weather', [
                'nowWeatherJson',
                'threeWeatherJson'
            ])
        },
        methods: {
            ...mapMutations('weather', [
                'set_nowWeatherJson',
                'set_threeWeatherJson'
            ]),
            ...mapActions('weather', [
                'get_now_weather_data',
                'get_three_weather_data'
            ]),
            async init() {
                if (!this.nowWeatherJson.last_update) {
                    this.loading = true
                    console.log('jin')
                    await this.getNowWeather()
                    await this.getThreeWeather()
                }
            },
            getNowWeather() {
                this.get_now_weather_data(this.location)
                    .then(res => {
                        this.loading = false
                        if (res.code === 0) {
                            // this.nowWeatherJson = res.data.results
                                this.set_nowWeatherJson(res.data.results[0])
                            // console.log(this.nowWeatherJson)
                            $(`#weather .dataCount`).slideDown(200).delay(1000).slideUp(200)
                            // this.$toast({ message: '暂未获取到天气信息！请稍后重试！', duration: 2000 })
                        } else {
                            $(`#weather .noNewData`).slideDown(200).delay(1000).slideUp(200)
                        }
                        this.error = false
                        $(`#weather .requestFail`).hide()
                    })
                    .catch(err => {
                        console.log(err)
                        if (this.nowWeatherJson.last_update) {
                            $(`#weather .requestFail`).show()
                        } else {
                            this.error = true
                        }
                        this.loading = false
                    })
            },
            getThreeWeather() {
                this.get_three_weather_data(this.location, 3)
                    .then(res => {
                        this.loading = false
                        if (res.code === 0) {
                            // this.nowWeatherJson = res.data.results
                            this.set_threeWeatherJson(res.data.results[0])
                            // console.log(this.nowWeatherJson)
                            // $(`#weather .dataCount`).slideDown(200).delay(1000).slideUp(200)
                        } else {
                            $(`#weather .noNewData`).slideDown(200).delay(1000).slideUp(200)
                        }
                        this.error = false
                        $(`#weather .requestFail`).hide()
                    })
                    .catch(err => {
                        console.log(err)
                        if (this.nowWeatherJson.last_update) {
                            $(`#weather .requestFail`).show()
                        } else {
                            this.error = true
                        }
                        this.loading = false
                    })
            },
            onValuesChange(picker, values) {
                // let currValues = picker.getValues()
                /* if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0])
                } */
                picker.setSlotValues(1, this.placesArr[values[0]])
                this.preLocation = values[0]
                this.location = values[1]
            },
            refresh () {
                this.loading = true
                this.getNowWeather()
                this.getThreeWeather()
            }
        },
        async created() {
            // console.log('444')
        },
        mounted() {
            this.init()
            if ((new Date()).getHours() > 18) {
                this.isDay = false
            } else {
                this.isDay = true
            }
            this.$nextTick(() => {
                // 这个是一个初始化默认值的一个技巧
                setTimeout(() => {
                    this.slots[0].defaultIndex = 0
                    this.slots[2].defaultIndex = 0
                }, 1000)
            })
        },
        filters: {
            showTime: function (value) {
                return value.substr(11, 5)
            }
        }
    }
</script>

<style lang="stylus">
#weather {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-bottom: 48px;
    background: #fff;
    .content {
        position: relative;
        padding: 0;
        font-family: PingFang SC,Microsoft YaHei UI Light,STHeitiSC-Light,Microsoft YaHei UI,Microsoft YaHei;
        .container {
            padding-top: 1.335rem;
            &.day-bg {
                background: linear-gradient(#2869e9,#79bfff);
            }
            &.night-bg {
                background: linear-gradient(#1b1d5c,#5d428e);
            }
            .globalTip {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                z-index: 999;
                div {
                    height: 32px;
                    line-height: 34px;
                    font-size: 14px;
                    color: #2a90d7;
                    background: rgba(213, 233, 247, .9);
                    text-align: center;
                    display: none;
                    &.requestFail {
                        color: #f56767;
                        background: #FBE9EF;
                    }
                }
            }
            .wea-now {
                padding: .5rem 0 0 .5rem;
                box-sizing: border-box;
                color: white;
                .location-text {
                    line-height: .8rem;
                    font-size: .6rem;
                    .s-text {
                        margin-left: .2rem;
                        font-size: .32rem;
                        color: hsla(0,0%,100%,.6);
                    }
                }
                .wea-detail {
                    font-size: 0;
                    .wea-item {
                        display: inline-block;
                        height: 3rem;
                        vertical-align: top;
                    }
                    .detail-img {
                        width: 30%;
                    }
                    .detail-temp {
                        width: 25%;
                        text-align: center;
                        font-size: .5rem;
                        .p-big {
                            font-size: 1.2rem;
                        }
                    }
                    .detail-dec {
                        margin-left: 0.4rem;
                        width: 40%;
                        font-size: 0.44rem;
                        line-height: .9rem;
                    }
                }
            }
            .wea-thr {
                margin-top: .2rem;
                padding: .5rem 0;
                font-size: 0;
                color: white;
                box-shadow: 0 -1px hsla(0,0%,100%,.2);
                .thr-item {
                    font-size: .4rem;
                    display: inline-block;
                    width: 33%;
                    height: 3rem;

                    &.item-shadow {
                        box-shadow: -1px 0 hsla(0,0%,100%,.2);
                    }
                    p {
                        text-align: center;
                        font-size: .44rem;
                        line-height: .6rem;
                    }
                    .thr-img {
                        height: 1.3rem;
                    }
                }
            }
            .location-picker {
                margin: .5rem;
                color: white;
                border-radius: .5rem;
                background: white;
                opacity: .5;
                .location-text {
                    color: #6f7c85;
                    font-size: 0.44rem;
                    line-height: 0.8rem;
                    text-indent: .5rem;
                }
            }
            .refresh-btn {
                display: block;
                margin: 0 .5rem .5rem .5rem;
                border-radius: .5rem;
                background: white;
                opacity: .5;
                color: #6f7c85;
                font-size: 0.44rem;
                text-align: center;
                line-height: 2;
            }
        }
    }
    .wea-icon-0 {
        background: url('../../../assets/icon/weather/0.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-1 {
        background: url('../../../assets/icon/weather/1.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-2 {
        background: url('../../../assets/icon/weather/2.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-3 {
        background: url('../../../assets/icon/weather/3.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-4 {
        background: url('../../../assets/icon/weather/4.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-5 {
        background: url('../../../assets/icon/weather/5.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-6 {
        background: url('../../../assets/icon/weather/6.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-7 {
        background: url('../../../assets/icon/weather/7.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-8 {
        background: url('../../../assets/icon/weather/8.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-9 {
        background: url('../../../assets/icon/weather/9.png') no-repeat center center;
        background-size: auto 100%;
    }

    .wea-icon-10 {
        background: url('../../../assets/icon/weather/10.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-11 {
        background: url('../../../assets/icon/weather/11.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-12 {
        background: url('../../../assets/icon/weather/12.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-13 {
        background: url('../../../assets/icon/weather/13.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-14 {
        background: url('../../../assets/icon/weather/14.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-15 {
        background: url('../../../assets/icon/weather/15.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-16 {
        background: url('../../../assets/icon/weather/16.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-17 {
        background: url('../../../assets/icon/weather/17.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-18 {
        background: url('../../../assets/icon/weather/18.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-19 {
        background: url('../../../assets/icon/weather/19.png') no-repeat center center;
        background-size: auto 100%;
    }

    .wea-icon-20 {
        background: url('../../../assets/icon/weather/20.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-21 {
        background: url('../../../assets/icon/weather/21.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-22 {
        background: url('../../../assets/icon/weather/22.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-23 {
        background: url('../../../assets/icon/weather/23.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-24 {
        background: url('../../../assets/icon/weather/24.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-25 {
        background: url('../../../assets/icon/weather/25.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-26 {
        background: url('../../../assets/icon/weather/26.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-27 {
        background: url('../../../assets/icon/weather/27.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-28 {
        background: url('../../../assets/icon/weather/28.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-29 {
        background: url('../../../assets/icon/weather/29.png') no-repeat center center;
        background-size: auto 100%;
    }

    .wea-icon-30 {
        background: url('../../../assets/icon/weather/30.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-31 {
        background: url('../../../assets/icon/weather/31.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-32 {
        background: url('../../../assets/icon/weather/32.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-33 {
        background: url('../../../assets/icon/weather/33.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-34 {
        background: url('../../../assets/icon/weather/34.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-35 {
        background: url('../../../assets/icon/weather/35.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-36 {
        background: url('../../../assets/icon/weather/36.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-37 {
        background: url('../../../assets/icon/weather/37.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-38 {
        background: url('../../../assets/icon/weather/38.png') no-repeat center center;
        background-size: auto 100%;
    }
    .wea-icon-99 {
        background: url('../../../assets/icon/weather/99.png') no-repeat center center;
        background-size: auto 100%;
    }
}
</style>
