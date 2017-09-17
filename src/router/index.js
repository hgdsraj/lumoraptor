import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Chat from '@/components/Chat'
import SignUp from '@/components/SignUp'
import ChatHome from '@/components/ChatHome'
import Profile from '@/components/Profile'

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
      path: '/signup',
      name: 'Signup',
      component: SignUp
    },
    {
      path: '/chat',
      name: 'ChatHome',
      component: ChatHome
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
