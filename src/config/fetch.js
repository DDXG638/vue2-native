import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$http = axios

// 应用数据和后台富文本数据的地址不同
let baseUrl = 'http://app.toutiaojk.com/e/extend/list/'
let publishURL = 'http://api.toutiaojk.com/e/extend/jkh/'
// let testURL = '//localhost:3333'
let testURL = 'http://119.29.128.86:3333'

const ajaxURL = {
    // 主页
    classID: testURL + '/api/getTagsList',        // 栏目baseUrl + 'appclassid.php'
    Class: testURL + '/api/getNewsList',          // 栏目列表baseUrl + 'appnews.php'
    Stick: baseUrl + 'appistop.php',                    // 栏目置顶
    // 详情页
    Artilce: testURL + '/api/getNewsDetail',                // 文章  baseUrl + 'apparticle.php'
    Recommend: baseUrl + 'apptuijian.php',              // 文章推荐
    getComment: testURL + '/newsDetail/getComment',          // 获取评论appGetComment.php
    postComment: baseUrl + 'appPostComment.php',        // 提交评论
    userData: testURL + '/user/addCollect',             //  appuserdata.php
    // 用户点赞、评论、收藏操作
    UserOperation: testURL + '/user/operation',
    // 搜索页
    Search: testURL + '/api/getSearchInfo',                     // 搜索
    // Search: baseUrl + 'search.php',
    // 视频页
    videoList: baseUrl + 'appvideo.php',                // 视频列表
    // 收藏页
    collectList: testURL + '/newsDetail/getUserCollect',       // 收藏列表 appreaduserdata.php
    // 用户页
    getNum: testURL + '/user/getNum',   // 用户页数据：评论、收藏数量 appreaduserdata.php
    historyComment: testURL + '/newsDetail/getUserComment',     // 用户的历史评论 historyComment.php
    register: testURL + '/user/register',               // 用户注册
    login: testURL + '/user/login',                     // 用户登陆
    checkedUser: testURL + '/user/checkedUser',         // 用户名校验
    // 后台页
    list: publishURL + 'List.php',                      // 后台列表请求
    edit: publishURL + 'Edit.php',                      // 后台编辑内容
    uploadFile: publishURL + 'upload_file.php',         // 后台图片上传
    // 其他
    addata: testURL + '/defaultConfig/getAd',                         // 广告
    // addata: baseUrl + 'ad.php',
    power: publishURL + 'Logincc.php',                   // 用户权限验证

    nowWeather: testURL + '/weather/getNowWeather',      // 获取及时天气信息

    threeWeather: testURL + '/weather/getThreeWeather',   // 获取三天的天气信息
    // 删除评论
    deleteComment: testURL + '/comment/deleteComment',
    // 获取七牛上传图片的token
    getQiNiuToken: testURL + '/manager/getQiNiuInfo',
    // 修改用户信息
    setUserInfo: testURL + '/user/setUserInfo',
    // 七牛上传
    qiniuUpload: 'http://upload.qiniu.com/'
}

export var fetch = async(type = 'POST', url = '', data = {}, config = {}) => {
    let result
    type = type.toUpperCase()
    url = ajaxURL[url]
    if (type === 'GET') {
        await axios.get(url, { params: data })
        .then(res => {
            result = res.data
        })
    } else if (type === 'POST') {
        if (config) {
            await axios.post(url, data, config)
                .then(res => {
                    result = res.data
                })
        } else {
            await axios.post(url, qs.stringify(data), config)
                .then(res => {
                    result = res.data
                })
        }
    }
    return result
}
