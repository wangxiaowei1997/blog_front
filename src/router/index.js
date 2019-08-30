import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Test01 from '@/components/Test01'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Detail from '@/components/Detail'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/main',
      name: 'Main',
      component: Main
    }, {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('Authorization')
  console.log('token: ' + token)
  // console.log('token.length: '+token.length)
  console.log(token === null)

  if (to.path === '/') {
    if (token !== null && token !== 'null' && token.length > 10) {
      next('/main')
    }
    next()
  } else {
    if (token === 'null' || token === '' || token === null) {
      next('/')
    } else {
      next()
    }
  }
})
