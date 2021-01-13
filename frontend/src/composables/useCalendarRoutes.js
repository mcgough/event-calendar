import compose from 'lodash.compose'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { parseDate } from '../date-utils'

function formatParams({ year, month, day }) {
  const parsedYear = parseInt(year)
  const parsedMonth = parseInt(month) - 1
  const timestamp = new Date(parsedYear, parsedMonth, day || 1)
  return {
    timestamp,
    year: parsedYear,
    month: parsedMonth,
    day: day,
  }
}

function formatRoute(name, params) {
  return {
    name,
    params,
  }
}

function getDayRoute(timestamp) {
  const { y, m, d } = parseDate(timestamp)
  return {
    year: y,
    month: m + 1,
    day: d || 1,
  }
}

function setBasePath(basePath) {
  return function() {
    return { basePath: `/${basePath}` }
  }
}

function setKeys() {
  const keys = [...arguments]
  return function(data) {
    return { keys, ...data }
  }
}

function setGuard(guard) {
  return function(data) {
    return { guard, ...data }
  }
}

function constructPath({ keys, basePath }) {
  return function(params) {
    return keys.reduce((path, key) => `${path}/${params[key]}`, basePath)
  }
}

const constructDayViewPath = compose(
  constructPath,
  setGuard(),
  setKeys('year', 'month', 'day'),
  setBasePath('d')
)()

const constructMonthViewPath = compose(
  constructPath,
  setGuard(),
  setKeys('year', 'month'),
  setBasePath('m')
)()

const constructDayRoute = compose(
  formatRoute.bind(undefined, 'Sub-Day'),
  getDayRoute
)

let route, router, initialized

export function useCalendarRoutes() {
  if (!initialized) {
    route = useRoute()
    router = useRouter()
    initialized = true
  }

  const params = computed(() => formatParams(route.params))

  return {
    route,
    router,
    params,
    constructDayRoute,
    constructDayViewPath,
    constructMonthViewPath,
  }
}
