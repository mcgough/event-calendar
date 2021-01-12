import compose from 'lodash.compose'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ROUTE_NAME_CALENDAR } from '@/constants'
import { parseDate } from '../date-utils'

function setParams({ year, month, day }) {
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
    day: d,
  }
}

function getNextMonth({ month, year }) {
  return {
    year: month === 11 ? year + 1 : year,
    month: month === 11 ? 1 : month + 2,
  }
}

function getPrevMonth({ month, year }) {
  return {
    year: month === 0 ? year - 1 : year,
    month: month === 0 ? 12 : month,
  }
}

const formatCalendarRoute = formatRoute.bind(null, ROUTE_NAME_CALENDAR)

const constructDayRoute = compose(formatCalendarRoute, getDayRoute)

let route, router, initialized

export function useCalendarRoutes() {
  if (!initialized) {
    route = useRoute()
    router = useRouter()
  }

  const params = computed(() => setParams(route.params))

  const nextMonth = computed(() =>
    compose(formatCalendarRoute, getNextMonth)(params.value)
  )

  const prevMonth = computed(() =>
    compose(formatCalendarRoute, getPrevMonth)(params.value)
  )

  return {
    route,
    router,
    params,
    nextMonth,
    constructDayRoute,
    prevMonth,
  }
}
