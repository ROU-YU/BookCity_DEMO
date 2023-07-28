import axios from '@/libs/api.request'
import { API_PATH_PARAM_1_STR, API_PATH_PARAM_2_STR } from '@/libs/util'

export const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const GET_TO_DO_LIST = `${BASE_URL}/todos`
export const POST_TO_DO_LIST = `${BASE_URL}/todos`

export const PUT_TO_DO_LIST = `${BASE_URL}/posts/${API_PATH_PARAM_1_STR}`
export const DELETE_TO_DO_LIST = `${BASE_URL}/posts/${API_PATH_PARAM_1_STR}`

export const getToDoList = (userId) => {
  return axios.request({
    url: GET_TO_DO_LIST,
    params: {
      userId
    },
    method: 'get'
  })
}

export const postToDoList = (userId, todos) => {
  return axios.request({
    url: POST_TO_DO_LIST,
    params: {
      userId
    },
    data: todos,
    method: 'post'
  })
}

export const putToDoList = (userId, todos) => {
  return axios.request({
    url: PUT_TO_DO_LIST.replace(API_PATH_PARAM_1_STR, userId),
    data: todos,
    method: 'put'
  })
}

export const deleteToDoList = (userId, id) => {
  return axios.request({
    url: DELETE_TO_DO_LIST.replace(API_PATH_PARAM_1_STR, userId),
    data: {
      id: id
    },
    method: 'delete'
  })
}

