import { getEmailLogin } from '@/request/api/home.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //给底部组件播放列表添加默认值
    footer: {
      al: {
        id: 1958431039,
        name: "人间旅行者",
        pic: 109951167850934610,
        picUrl: "https://p1.music.126.net/AmR5INEPNC3zEVCWZuHHcA==/109951167581658860.jpg",
      },
      ar: [{ name: '咻咻满' }],
      id: 1958431039,
    },
    musicList: [],//播放列表
    playing: false,//播放状态
    currentTime: 0,//
    duration: 0,//歌曲总时长
    isLogin: false,//登录状态
    token: '',
    user: {},//用户信息
  },
  mutations: {
    updatePlaying(state, playStatus) {
      state.playing = playStatus
    },
    updateFooter(state, footer) {
      state.footer = footer
      state.playing = true
    },
    updateCurrentTime(state, value) {
      state.currentTime = value
    },
    updateDuration(state, value) {
      state.duration = value
    },
    updateIsLogin(state, value) {
      state.isLogin = true
    },
    updateToken(state, value) {
      state.token = value //响应式
      localStorage.setItem('netEase', state.token)  //持久化
    },
    updateUser(state,value){
      state.user = value
    }
  },

  actions: {
    async getLogin(context, value) {
      let res = await getEmailLogin(value)
      console.log(res);
      return res
    }
  },
  modules: {
  }
})
