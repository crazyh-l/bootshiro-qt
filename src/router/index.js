import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import TestElementForm from '@/components/TestElementForm'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/main',
      name: 'Main',
      component : Main
    },
    {
      path: '/form',
      name: 'TestElementForm',
      component : TestElementForm
    },
    {
      path: '/login',
      name: Login,
      component: Login
    }
  ]
})
