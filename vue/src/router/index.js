import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Limit from '@/views/Limit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/limit',
      component: Limit
    }
  ]
})
