import Vue from 'vue'
import Vuex from 'vuex'

import index_module from './index/index'
import detail_module from './detail/index'
import search_module from './search/index'
import login_module from './login/index'
import collect_module from './collect/index'
import video_module from './video/index'
import user_module from './user/index'
import health_module from './health/index'
import weather_module from './weather/index'

Vue.use(Vuex)

const state = {
    device: 'android',                       // 设备
    userid: '',  // 我微信的id: oqKkTvySObkOpp6L2z__GjacVFN8
    firstTime: '',                            // 第一次进入app时间
    _id: ''
}

const getters = {
    device: state => {
        return state.device
    },
    userid: state => {
        return state.userid
    },
    firstTime: state => {
        return state.firstTime
    },
    _id: state => {
        return state._id
    }
}

const mutations = {
    set_device(state, val) {
        state.device = val
    },
    set_userid(state, val) {
        state.userid = val
    },
    set_firstTime(state, val) {
        state.firstTime = val
    },
    set_id(state, val) {
        state._id = val
    }
}

const actions = {
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        index: index_module,
        detail: detail_module,
        search: search_module,
        login: login_module,
        collect: collect_module,
        video: video_module,
        user: user_module,
        health: health_module,
        weather: weather_module
    }
})
