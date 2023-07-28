import {
  getToDoList,
  putToDoList,
  postToDoList,
  deleteToDoList
} from "@/api/todos"
import {
  getUserId
} from '@/libs/util'

export default {
  state: {
    toDoList: [],
    userId: getUserId()
  },
  getters: {
    processList: (state) => state.toDoList.filter(_ => !_.completed),
    completeList: (state) => state.toDoList.filter(_ => _.completed),
    allCount: state => state.toDoList.length,
    processCount: (state) => state.toDoList.filter(_ => !_.completed).length,
    completedCount: (state) => state.toDoList.filter(_ => _.completed).length
  },
  mutations: {
    setToDoList (state, toDoList) {
      state.toDoList = toDoList
    },
    addToDo (state, newList) {
      state.toDoList.push(newList)
    },
    editToDo (state, editList, id) {
      let index = state.toDoList.findIndex(_ => _.id === id)
      state.toDoList[index] = editList
    },
    deleteToDo (state, id) {
      let index = state.toDoList.findIndex(_ => _.id === id)
      state.toDoList.splice(index, 1)
    }
  },
  actions: {
    getToDoList ({ state, commit }) {
      //api 不會影響實際值，須將 未完成、已完成項目 放在其他地方
      return new Promise((resolve, reject) => {
        try {
          getToDoList(state.userId).then(res => {
            const data = res.data
            if (Array.isArray(data) && data.length > 0) {
              commit('setToDoList', data)
            }
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        }catch (error) {
          reject(error)
        }
      })
    },
    addToDoList ({ state, commit }, newtitle) {
      let newList = {
        //省略id
        userId: state.userId,
        title: newtitle,
        completed: false
      }
      postToDoList(state.userId, newList).then(res => {
        commit('addToDo', newList)
      })
    },
    editToDoList ({ state, commit }, { id, index, _value }) {
      let editList = state.toDoList[index]

      editList.title = _value
      delete editList.isEdit

      putToDoList(state.userId, editList).then(res => {
        commit('editToDo', editList, id)
      })
    },
    deleteToDoList ({ state, commit }, id) {
      deleteToDoList(state.userId, id).then(res => {
        commit('deleteToDo', id)
      })
    },
    changeToDoListState ({ state, commit}, { id, index, status }) {
      let editList = state.toDoList[index]
      editList.completed = status
      
      putToDoList(state.userId, editList).then(res => {
        commit('editToDo', status, index, id)
      })
    }
  }
}