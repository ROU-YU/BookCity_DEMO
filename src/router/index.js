import { createRouter, createWebHistory } from 'vue-router'
import routes from './routers'
import config from '../config'
import iView from 'view-ui-plus'

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.afterEach((to, from, next) => {
  window.document.title = to.meta.title //設定瀏覽器title，綁定當前頁面的title
  console.log('router.aftereach')
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
