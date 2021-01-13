import Calendar from '@/views/Calendar.vue'

import Month from '@/views/sub-views/Month.vue'
import Day from '@/views/sub-views/Day.vue'

import { createRouter, createWebHistory } from 'vue-router'

import { validateParams } from './guards'

const routes = [
  {
    path: '',
    name: 'Calendar',
    component: Calendar,
    children: [
      { path: '/d/:year/:month/:day', name: 'Sub-Day', component: Day },
      { path: '/m/:year/:month/:day?', name: 'Sub-Month', component: Month },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach(validateParams)

export default router
