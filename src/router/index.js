import {createRouter, createWebHistory} from 'vue-router'
import TheLoginComponent from '@/DescuentOS/pages/the-login.component.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: TheLoginComponent,
    }
  ]
})

export default router
