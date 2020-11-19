import { createRouter, createWebHistory } from 'vue-router'
import Calendar from '../components/Calendar.vue'
import { validateParams } from './guards'

const routes = [
  {
    path: '/:year?/:month?',
    name: 'Calendar',
    component: Calendar,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(validateParams)

export default router
