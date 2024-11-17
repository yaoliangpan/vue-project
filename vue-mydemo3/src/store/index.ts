import Vue from 'vue'
import { set } from 'vue/types/umd'
import createPersistedState from 'vuex-persistedstate';

import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: "",
    token: ""
  },
  getters: {
  },
  mutations: {
    setUserName(state, userName) {
      state.userName = userName
    },
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      key: 'token', // 自定义存储的键名
      paths: ['token'] // 需要持久化的状态路径
    })
    ,
    createPersistedState({
      key: 'userName', // 自定义存储的键名
      paths: ['userName'] // 需要持久化的状态路径
    })
  ]
})
