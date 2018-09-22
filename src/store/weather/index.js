import { fetch } from '@/config/fetch'

export default {
    namespaced: true,
    state: {
        nowWeatherJson: {},
        threeWeatherJson: {}
    },
    getters: {
        nowWeatherJson: state => {
            return state.nowWeatherJson
        },
        threeWeatherJson: state => {
            return state.threeWeatherJson
        }
    },
    mutations: {
        set_nowWeatherJson (state, val) {
            state.nowWeatherJson = val
        },
        set_threeWeatherJson (state, val) {
            state.threeWeatherJson = val
        }
    },
    actions: {
        // 获取视频列表数据
        async get_now_weather_data({ rootState, getters }, location) {
            let params = {
                'location': location
            }
            let res = await fetch('post', 'nowWeather', params)
            return res
        },
        async get_three_weather_data({ rootState, getters }, location, days) {
            let params = {
                'location': location,
                'days': days
            }
            let res = await fetch('post', 'threeWeather', params)
            return res
        }
    }
}
