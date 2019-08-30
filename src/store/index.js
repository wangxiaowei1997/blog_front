import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    ArticleNo: localStorage.getItem('ArticleNo') ? localStorage.getItem('ArticleNo') : ''
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization
      localStorage.setItem('Authorization', user.Authorization)
    },

    changeAnything (state, user) {
      const key = user.key
      state[key] = user[key]
      localStorage.setItem(key, user[key])
      // console.log(state.get(user.key))
      // console.log(user[user.key])
    }
  }
})

export default store
