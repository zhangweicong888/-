import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 侧边栏数据
    // 侧边栏的数据应从sessionStorage中获取，并将数据转换为数组的形式
    // 首次获取没有数据时，应将sessionStorage设置为 '[]'
    rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]'),
    // 获取用户名称
    username: sessionStorage.getItem('username')
  },
  mutations: {
    // 修改rightList中的数据
    setRightList(state, data) {
      state.rightList = data
      // 为了防止用户刷新页面导致数据丢失，
      // 需要将修改后的数据存储在sessionStoage和vuex中
      // 将侧边栏数据存储在sessionStorage中，并将数据转换成字符串的形式
      sessionStorage.setItem('rightList', JSON.stringify(data))
    },
    setUsername(state, data) {
      state.username = data
      sessionStorage.setItem('username', data)
    }
  },
  actions: {
  },
  getters: {
  }
})
