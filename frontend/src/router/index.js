import Calendar from '@/views/Calendar.vue'

import Year from '@/views/sub-views/Year.vue'
import Month from '@/views/sub-views/Month.vue'
import Day from '@/views/sub-views/Day.vue'

import { createRouter, createWebHistory } from 'vue-router'

import { attachTransition, validateParams } from './guards'

const routes = [
  {
    path: '',
    name: 'Calendar',
    component: Calendar,
    children: [
      {
        path: '/d/:year/:month/:day',
        name: 'Sub-Day',
        component: Day,
        meta: { transition: undefined },
      },
      { path: '/m/:year/:month/:day?', name: 'Sub-Month', component: Month },
      { path: '/y/:year/:month/:day', name: 'Sub-Year', component: Year },
    ],
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach(validateParams)

router.afterEach(attachTransition)

export default router
