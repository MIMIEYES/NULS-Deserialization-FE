import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/views/Home.vue'], resolve)
    },
    {
      path: '/',
      name: 'deserialization',
      component: resolve => require(['@/views/Deserialization.vue'], resolve)
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: resolve => require(['@/views/Home.vue'], resolve)
    // },
    // {
    //   path: '/deserialization',
    //   name: 'deserialization',
    //   component: resolve => require(['@/views/Deserialization.vue'], resolve)
    // },
    {
      path: '/page2',
      name: 'page2',
      component: resolve => require(['@/views/page2.vue'], resolve)
    },
    {
      path: '/NewAddress',
      name: 'newAddress',
      component: resolve => require(['@/views/user/NewAddress.vue'], resolve)
    },
    {
      path: '/BackupsAddress',
      name: 'backupsAddress',
      component: resolve => require(['@/views/user/BackupsAddress.vue'], resolve)
    },
    {
      path: '/User',
      name: 'user',
      component: resolve => require(['@/views/user/User.vue'], resolve)
    }

  ]
})
