import compose from 'lodash.flowright'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  setDay,
  setMonth,
  formatParams,
  constructPath,
  setBasePath,
  setDayExplicit,
  setKeyValue,
  setNextDay,
  setNextDayMonth,
  setNextDayYear,
  setPrevDay,
  setPrevDayMonth,
  setPrevDayYear,
  setNextMonthYear,
  setPrevMonthYear,
} from './helpers'
import { MONTH_SLUG, DAY_SLUG } from '@/constants'

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
  ...constructDayPathBase(setDay, setMonth)
)()

const constructMonthViewPath = compose(...constructMonthPathBase(setMonth))()

const constructPrevNextMonthViewPaths = (data) => ({
  prev: compose(
    ...constructMonthPathBase(setDayExplicit(1), setPrevMonthYear)
  )()(data),
  next: compose(
    ...constructMonthPathBase(setDayExplicit(1), setNextMonthYear)
  )()(data),
})

const constructPrevNextDayViewPaths = (data) => ({
  prev: compose(
    ...constructDayPathBase(setPrevDay, setPrevDayMonth, setPrevDayYear)
  )()(data),
  next: compose(
    ...constructDayPathBase(setNextDay, setNextDayMonth, setNextDayYear)
  )()(data),
})
