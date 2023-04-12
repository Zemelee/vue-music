// import {service} from '..';
import service from '..';


// 获取推荐歌单
export function getRecommends(limit) {
    // 此时的service已经配置了baseURL和timeout
    return service({
        method: 'GET',
        url: `/personalized?limit=${limit}`
    })
}

// 获取歌单介绍
export function getRecommendDetails(id) {
    // 此时的service已经配置了baseURL和timeout
    return service({
        method: 'GET',
        url: `/playlist/detail?id=${id}`
    })
}


// 获取歌单歌曲列表
export function getRecommendMusicList(id) {
    // 此时的service已经配置了baseURL和timeout
    return service({
        method: 'GET',
        url: `/playlist/track/all?id=${id}&limit=40`
    })
}

// 新歌速递
export function getTopSong() {
    // 此时的service已经配置了baseURL和timeout
    return service({
        method: 'GET',
        url: '/top/song?type=0'
    })
}

// 获取歌手详情
export function getSinger(id) {
    // 此时的service已经配置了baseURL和timeout
    return service({
        method: 'GET',
        url: `/artist/detail?id=${id}`
    })
}
// 获取歌手热门50首
export function getSingerTop(id) {
    // 此时的service已经配置了baseURL和timeout
    return service({
        method: 'GET',
        url: `/artist/top/song?id=${id}`
    })
}

// 获取歌手top
export function getSingersTop(limit) {
    // 此时的service已经配置了baseURL和timeout
    return service({
        method: 'GET',
        url: `/top/artists?offset=0&limit=${limit}`
    })
}

// /search?keywords=海阔天空
// 获取搜索结果
export function getSearch(keyword) {
    // 此时的service已经配置了baseURL和timeout
    return service({
        method: 'GET',
        url: `/search?keywords=${keyword}`
    })
}


// 获取热门搜索
export function getSearchHot() {
    // 此时的service已经配置了baseURL和timeout
    return service({
        method: 'GET',
        url: '/search/hot'
    })
}
// /song/detail

// 获取歌词数据
export function getLyrics(id) {
    // 此时的service已经配置了baseURL和timeout
    return service({
        method: 'GET',
        url: `/lyric?id=${id}`
    })
}

// 搜索建议
export function getSearchSuggest(keywords) {
    // 此时的service已经配置了baseURL和timeout
    return service({
        method: 'GET',
        url: `/search/suggest?keywords=${keywords}`
    })
}

//邮箱登录接口
export function getEmailLogin(user) {
    // 此时的service已经配置了baseURL和timeout
    return service({
        method: 'GET',
        url: `/login?email=${user.email}&password=${user.password}`
    })
}

//邮箱登录接口
export function getAnoLogin() {
    // 此时的service已经配置了baseURL和timeout
    return service({
        method: 'GET',
        url: '/register/anonimous'
    })
}



//用户详情
export function getUser(uid) {
    return service({
        method: 'GET',
        url: `/user/detail?uid=${uid}`
    })
}



// ----------------------------------------------------
// 获取用户账号信息、
// POST 请求 url 必须添加时间戳
export function getUserAccount() {
    return service({
        url: '/user/account',
        params: {
            timestamp: Date.parse(new Date())
        }
    })
}


//
// 获取用户动态数据
export function getUserEvent(uid) {
    return service({
        method: 'GET',
        url: `/user/event?uid=${uid}`,
    })
}

// 
// 获取用户动态数据
export function getUserFolloweds(uid) {
    return service({
        method: 'GET',
        url: `/user/followeds?uid=${uid}`,
    })
}
