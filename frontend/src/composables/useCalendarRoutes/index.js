import compose from 'lodash.flowright'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  checkDay,
  checkMonth,
  formatParams,
  constructPath,
  setBasePath,
  setKeyValue,
  setNextDay,
  setPrevDay,
  setNextMonthYear,
  setPrevMonthYear,
} from './helpers'
import { MONTH_SLUG, DAY_SLUG } from '@/constants'

const constructDayPathBase = (...hooks) => [
  constructPath,
  setKeyValue('hooks')(...hooks),
  setKeyValue('keys')('year', 'month', 'day'),
  setBasePath(DAY_SLUG),
]

const constructMonthPathBase = (...hooks) => [
  constructPath,
  setKeyValue('hooks')(...hooks),
  setKeyValue('keys')('year', 'month', 'day'),
  setBasePath(MONTH_SLUG),
]

const constructDayViewPath = compose(
  ...constructDayPathBase(checkDay, checkMonth)
)()

const constructMonthViewPath = compose(...constructMonthPathBase(checkMonth))()

const constructPrevNextMonthViewPaths = (data) => ({
  prev: compose(...constructMonthPathBase(setPrevMonthYear))()(data),
  next: compose(...constructMonthPathBase(setNextMonthYear))()(data),
})

const constructPrevNextDayViewPaths = (data) => ({
  prev: compose(...constructDayPathBase(setPrevDay))()(data),
  next: compose(...constructDayPathBase(setNextDay))()(data),
})

let route, router

export function useCalendarRoutes() {
  if (!route || !router) {
    route = useRoute()
    router = useRouter()
  }

  const params = computed(() => formatParams(route.params))

  const yearMonthDay = computed(() => [
    params.value.year,
    params.value.month,
    params.value.day,
  ])

  function watchRouteParams(cb) {
    return watch(params, cb)
  }

  return {
    constructDayViewPath,
    constructMonthViewPath,
    constructPrevNextMonthViewPaths,
    constructPrevNextDayViewPaths,
    params,
    route,
    router,
    watchRouteParams,
    yearMonthDay,
  }
}
