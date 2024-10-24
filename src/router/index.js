import {createRouter, createWebHistory} from 'vue-router'
import TheLoginComponent from '@/DescuentOS/pages/the-login.component.vue'
import TheRegisterComponent from '@/DescuentOS/pages/the-register.component.vue'
import TheDashboardComponent from '@/DescuentOS/pages/the-dashboard.component.vue'
import BillManagementComponent from '@/DescuentOS/pages/bill-management.component.vue'
import RegisterBillComponent from '@/DescuentOS/pages/register-bill.component.vue'
import ClientsManagementComponent from '@/DescuentOS/pages/clients-management.component.vue'
import TceaManagementComponent from '@/DescuentOS/pages/tcea-management.component.vue'
import TheOperationsComponent from '@/DescuentOS/pages/the-operations.component.vue'
import CommisionManagementComponent from '@/DescuentOS/pages/commision-management.component.vue'
import FactoringManagementComponent from '@/DescuentOS/pages/factoring-management.component.vue'
import RegisterSupplierComponent from '@/DescuentOS/pages/register-supplier.component.vue'
import PickRateComponent from '@/DescuentOS/pages/pick-rate.component.vue'

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
      path: '/register-supplier',
      name: 'register-supplier',
      component: RegisterSupplierComponent
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
    },
    {
      path: '/register-bill',
      name: 'register-bill',
      component: RegisterBillComponent
    },
    {
      path: '/clients-management',
      name: 'clients-management',
      component: ClientsManagementComponent
    },
    {
      path: '/tcea-management',
      name: 'tcea-management',
      component: TceaManagementComponent
    },
    {
      path: '/commision-management',
      name: 'commision-management',
      component: CommisionManagementComponent
    },
    {
      path: '/factoring-management',
      name: 'factoring-management',
      component: FactoringManagementComponent
    },
    {
      path: '/operations',
      name: 'operations',
      component: TheOperationsComponent
    },
    {
      path: '/pick-rate',
      name: 'pick-rate',
      component: PickRateComponent
    }
  ]
})

export default router
