import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import ChatWindow from '@/components/ChatWindow'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/chatwindow', component: ChatWindow }
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
      path: '/chat',
      name: 'Chat',
      component: Chat
    }
  ]
})
