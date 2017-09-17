import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Chat from '@/components/Chat'
import ChatHome from '@/components/ChatHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/chat/:health_status',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/chat',
      name: 'ChatHome',
      component: ChatHome
    }
  ]
})
