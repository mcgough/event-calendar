import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CALENDAR } from '@/constants'
import { getDaysInMonth } from 'date-fns'

export function setNextMonth({ month, year }) {
  const december = 11
  return {
    year: month === december ? year + 1 : year,
    month: month === december ? 1 : month + 2,
  }
}

export function setPrevMonth({ month, year }) {
  const january = 0
  return {
    year: month === january ? year - 1 : year,
    month: month === january ? 12 : month,
  }
}

export function setNextDay({ month, year, day }) {
  let nextDay = day + 1
  let nextMonth = month + 1
  let nextYear = year

  // If last day of month
  if (nextDay > getDaysInMonth(new Date(year, month))) {
    const nextParams = setNextMonth({ month, year })
    nextDay = 1
    nextMonth = nextParams.month
    nextYear = nextParams.year
  }
  return {
    year: nextYear,
    month: nextMonth,
    day: nextDay,
  }
}

export function setPrevDay({ month, year, day }) {
  let prevDay = day - 1
  let prevMonth = month + 1
  let prevYear = year

  // If first day of month
  if (prevDay < 1) {
    const prevParams = setPrevMonth({ month, year })
    prevDay = getDaysInMonth(new Date(year, month - 1))
    prevMonth = prevParams.month
    prevYear = prevParams.year
  }
  return {
    year: prevYear,
    month: prevMonth,
    day: prevDay,
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

export function useCalendarRouter() {
  const route = useRoute()

  const router = useRouter()

  const query = route.query

  // Route calendar parameters as numbers
  // Month represents month index
  const params = computed(() => setParams(route.params))

  const dayParam = computed(() => params.value.day)

  const nextMonth = computed(() =>
    buildRoute(CALENDAR, setNextMonth(params.value))
  )

  const prevMonth = computed(() =>
    buildRoute(CALENDAR, setPrevMonth(params.value))
  )

  const nextDay = computed(() =>
    buildRoute('day-view', setNextDay(params.value))
  )

  const prevDay = computed(() =>
    buildRoute('day-view', setPrevDay(params.value))
  )

  const currentMonth = computed(() =>
    buildRoute(CALENDAR, {
      year: params.value.year,
      month: params.value.month + 1,
    })
  )

  return {
    router,
    params,
    nextMonth,
    prevMonth,
    query,
    dayParam,
    nextDay,
    prevDay,
    currentMonth,
  }
}
