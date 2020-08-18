import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: 保存全局共享数据
  // mutations: 保存修改全局共享数据的方法
  // actions: 保存触发 mutations 中保存的方法 的方法
  // getters: 相当于计算属性
  state,
  mutations,
  actions,
  getters
})
