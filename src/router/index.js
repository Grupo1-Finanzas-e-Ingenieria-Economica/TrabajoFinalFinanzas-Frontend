import {createRouter, createWebHistory} from 'vue-router'
import TheLoginComponent from '@/DescuentOS/pages/the-login.component.vue'
import TheRegisterComponent from '@/DescuentOS/pages/the-register.component.vue'
import TheDashboardComponent from '@/DescuentOS/pages/the-dashboard.component.vue'
import BillManagementComponent from '@/DescuentOS/pages/bill-management.component.vue'

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
    },
    {
      path: '/register',
      name: 'register',
      component: TheRegisterComponent
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: TheDashboardComponent
    },
    {
      path: '/bill-management',
      name: 'bill-management',
      component: BillManagementComponent
    }
  ]
})

export default router
