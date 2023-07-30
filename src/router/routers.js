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
        component: () => import('@/views/subject_1/toDoList')
      }
    ]
    
  },
  {
    path: '/mealTime',
    name: 'meal_time',
    component: Main,
    children: [
      {
        path: '/mealTime',
        name: 'meal_time',
        meta: {
          icon: 'md-list-box',
          title: '提供時段'
        },
        component: () => import('@/views/subject_2/mealTime')
      }
    ]
  }
]