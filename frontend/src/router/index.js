import { createRouter, createWebHistory } from 'vue-router'
import Calendar from '@/views/Calendar.vue'
import Day from '@/views/Day.vue'
import { validateParams } from './guards'
import { CALENDAR } from '@/constants'

const routes = [
  {
    path: '/:year/:month/:day',
    name: 'day-view',
    component: Day,
  },
  {
    path: '/:year?/:month?',
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
