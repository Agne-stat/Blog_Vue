import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import NewPost from '../components/NewPost.vue'
import UpdatePost from '../components/UpdatePost.vue'
import UserPosts from '../components/UserPosts.vue'
import SinglePost from '../components/SinglePost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/register',
    name: 'Register',
    component: Register
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/newPost',
    name: 'NewPost',
    component: NewPost
  },

  {
    path: '/newPost/:id',
    name: 'UpdatePost',
    component: UpdatePost
  },

  {
    path: '/post/:name',
    name: 'UserPosts',
    component: UserPosts
  },

  {
    path: '/post/:name/:id',
    name: 'SinglePost',
    component: SinglePost
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
