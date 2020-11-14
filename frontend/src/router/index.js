import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '../components/Calendar.vue'
import { getMonth, getYear } from 'date-fns'

const isInvalidYear = (year) =>
  isNaN(parseInt(year)) ||
  year.length < 4 ||
  year.length > 4 ||
  parseInt(year) < 1

const isInvalidMonth = (month) =>
  isNaN(parseInt(month)) ||
  month.length > 2 ||
  parseInt(month) > 12 ||
  parseInt(month) < 1

const validateParams = (to, from, next) => {
  const { year, month } = to.params
  const invalidYear = isInvalidYear(year)
  const invalidMonth = isInvalidMonth(month)
  if (invalidYear) {
    to.params.year = getYear(Date.now())
    to.params.month = getMonth(Date.now()) + 1
    next()
  } else if (invalidMonth) {
    to.params.month = 1
  }
  next()
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/:year?/:month?',
    name: 'Calendar',
    component: Calendar,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach(validateParams)

export default router
