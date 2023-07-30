import { createStore } from 'vuex'
import toDoList from './module/toDoList'
import app from './module/app'
import user from './module/user'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    toDoList,
    app,
    user
  }
})
