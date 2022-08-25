import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import TodoList from './components/todoList/TodoList.vue'
Vue.use(Router)


const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login', component: Login,
    },
    { path: '/todo', component: TodoList },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/reguser') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})


export default router