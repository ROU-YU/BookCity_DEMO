import _isNil from "lodash"
import _cloneDeep from 'lodash'
import _trim from 'lodash'

export const isNil = _isNil
export const cloneDeep = _cloneDeep
export const trim = _trim

export const API_PATH_PARAM_1_STR = '*1'
export const API_PATH_PARAM_2_STR = '*2'

export const getUserId = () => {
  return Math.floor(Math.random()*9) + 1
}

export const isBlank = (value) => {
  return trim(value).length === 0
}

export const isObject = (value) => {
  return !isNil(value) && typeof value === 'object'
}

export const localRead = (key) => {
  return localStorage.getItem(key) || ''
}

