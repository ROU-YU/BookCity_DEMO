import Main from '@/components/main'

export default [
  {
    path: '/',
    name: 'home',
    redirect: '/interview/home',
    component: Main,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: '/interview/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: 'home',
          icon: 'md-home'
        },
        component: () => import('@/views/Home')
      }
    ]
  },
  {     
    path: '/interview/toDoList',
    name: 'to_do_list',
    component: Main,
    children: [
      {
        path: '/interview/toDoList',
        name: 'to_do_list',
        meta: {
          icon: 'md-clipboard',
          title: 'to_do_list'
        },
        component: () => import('@/views/subject_1/toDoList')
      }
    ]
    
  },
  {
    path: '/interview/mealTime',
    name: 'meal_time',
    component: Main,
    children: [
      {
        path: '/interview/mealTime',
        name: 'meal_time',
        meta: {
          icon: 'md-list-box',
          title: 'meal_time'
        },
        component: () => import('@/views/subject_2/mealTime')
      }
    ]
  }
]