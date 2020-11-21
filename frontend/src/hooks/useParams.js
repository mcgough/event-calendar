import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CALENDAR } from '@/constants'

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
  return {
    year: parseInt(year),
    month: parseInt(month) - 1,
    day: parseInt(day),
  }
}

export function buildRoute(name, params) {
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
    buildRoute(CALENDAR, setNextMonth(params.value))
  )

  const prevMonth = computed(() =>
    buildRoute(CALENDAR, setPrevMonth(params.value))
  )

  return {
    router,
    params,
    nextMonth,
    prevMonth,
    query,
  }
}
