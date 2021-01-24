<template>
  <router-link :to="today.path" class="h-full w-full px-3 py-3">
    {{ today.label }}
  </router-link>
</template>

<script>
import compose from 'lodash.flowright'
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'
import { MONTH_SLUG, TODAY, DAY_SLUG, YEAR_SLUG } from '@/constants'
import { parseDate } from '@/date-utils'

function getTodayRouteParams() {
  const { y, m, d } = parseDate(new Date().getTime())
  return { year: y, month: m, day: d }
}

function buildTodayPath(day, month, year) {
  return function (path) {
    const params = getTodayRouteParams()
    if (path.includes(DAY_SLUG)) return day(params)
    if (path.includes(MONTH_SLUG)) return month(params)
    if (path.includes(YEAR_SLUG)) return year(params)
    return path
  }
}

export default {
  setup() {
    const {
      constructDayViewPath,
      constructMonthViewPath,
      constructYearViewPath,
      route,
    } = useCalendarRoutes()

    const buildPath = buildTodayPath(
      constructDayViewPath,
      constructMonthViewPath,
      constructYearViewPath
    )

    const today = computed(() => ({
      label: TODAY,
      path: buildPath(route.path),
    }))

    return { today }
  },
}
</script>

<style></style>
