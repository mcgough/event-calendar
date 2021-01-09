import compose from 'lodash.compose'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ROUTE_NAME_CALENDAR } from '@/constants'

export function setNextMonth({ month, year }) {
  return {
    year: month === 11 ? year + 1 : year,
    month: month === 11 ? 1 : month + 2,
  }
}

export function setPrevMonth({ month, year }) {
  return {
    year: month === 0 ? year - 1 : year,
    month: month === 0 ? 12 : month,
  }
}

export function setParams({ year, month, day }) {
  const parsedYear = parseInt(year)
  const parsedMonth = parseInt(month) - 1
  return {
    year: parsedYear,
    month: parsedMonth,
    day: parseInt(day),
    timestamp: new Date(parsedYear, parsedMonth),
  }
}

export function formatRoute(name, params) {
  return {
    name,
    params,
  }
}

export function useParams() {
  const route = useRoute()

  const router = useRouter()

  const query = route.query

  const params = computed(() => setParams(route.params))

  const nextMonth = computed(() =>
    formatRoute(ROUTE_NAME_CALENDAR, setNextMonth(params.value))
  )

  const prevMonth = computed(() =>
    formatRoute(ROUTE_NAME_CALENDAR, setPrevMonth(params.value))
  )

  return {
    router,
    params,
    nextMonth,
    prevMonth,
    query,
  }
}
