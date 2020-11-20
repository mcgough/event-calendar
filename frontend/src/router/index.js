import { createRouter, createWebHistory } from 'vue-router'
import Calendar from '../components/Calendar.vue'
import { validateParams } from './guards'
import { CALENDAR } from '@/constants'

const routes = [
  {
    path: '/:year?/:month?/:day?',
    name: CALENDAR,
    component: Calendar,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(validateParams)

export default router
