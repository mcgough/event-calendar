import Calendar from '../components/Calendar.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { validateParams } from './guards'

import { ROUTE_NAME_CALENDAR } from '@/constants'

const routes = [
  {
    path: '/:year?/:month?/:day?',
    name: ROUTE_NAME_CALENDAR,
    component: Calendar,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach(validateParams)

export default router
