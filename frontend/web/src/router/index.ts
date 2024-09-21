import { createRouter, createWebHistory } from 'vue-router'
import DepositCalculator from '../features/deposit-calculator/DepositCalculator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'deposit-calculator',
      component: DepositCalculator
    }
  ]
})

export default router
