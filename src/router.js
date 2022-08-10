import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import TodoList from './components/todoList/TodoList.vue'
Vue.use(Router)


export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login', component: Login,
    },
    { path: '/todo', component: TodoList },
  ]
})