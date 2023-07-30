import _isNil, { has } from "lodash"
import _cloneDeep from 'lodash'
import _trim from 'lodash'
import { hasOneOf, forEach } from "./tools"

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

/**
 * 判定router是否包含子項目
 */
export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

/**
 * 判定是否有權限檢視
 */
const showThisMeau = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}

/**
 * 通過router/routers.js 得到菜單列表
 * acess 之後新增註冊/登入功能可用，限制某些頁面的檢視權限
 */
export const getMenuByRouter = (list, acess) => {
  let menuList = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if (hasChild(item) || (item.meta && item.meta.showAlways) && showThisMeau(item, access)) {
        obj.children = getMenuByRouter(item.children, acess)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMeau(item, acess)) menuList.push(obj)
    }
  })
  return menuList
}

/**
 * 顯示菜單名稱
 */
export const showTitle = (item, vm) => {
  return vm.$config.useI18n ? vm.$t(item.name) : ((item.meta && item.meta.title) || item.name)
}
