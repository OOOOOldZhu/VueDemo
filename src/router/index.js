import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TestVue from '@/components/TestVue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // 此页面的URL http://192.168.31.101:8080/#/test/
    {
      path: '/test',
      name: 'test',
      component: TestVue
    }
  ]
})
