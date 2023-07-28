export default {
  /**
   * @description 顯示在瀏覽器標籤的title
   */
  title: 'interview',
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: window.location.origin,
    pro: window.location.origin
  },
  /**
   * @description 默認打開的頁面，先預設為題目1
   */
  homeName: 'toDoList',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
