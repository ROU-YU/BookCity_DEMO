import Main from '@/components/main'

export default [
  {
    path: '/',
    name: 'home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首頁',
          icon: 'md-home'
        },
        component: () => import('@/views/Home')
      }
    ]
  },
  {     
    path: '/toDoList',
    name: 'to_do_list',
    component: Main,
    children: [
      {
        path: '/toDoList',
        name: 'to_do_list',
        meta: {
          icon: 'md-clipboard',
          title: '待辦事項'
        },
        component: () => import('@/views/toDoList/toDoList')
      }
    ]
    
  }
]