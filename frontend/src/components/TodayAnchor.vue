<template>
  <router-link :to="today.path">
    {{ today.label }}
  </router-link>
</template>

<script>
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'
import { MONTH_SLUG, TODAY } from '@/constants'
import { parseDate } from '@/date-utils'

export default {
  setup() {
    const {
      constructDayViewPath,
      constructMonthViewPath,
      route,
    } = useCalendarRoutes()

    function constructTodayParams() {
      const { y, m, d } = parseDate(new Date().getTime())
      return { year: y, month: m, day: d }
    }

    const today = computed(() => ({
      path:
        route.path.indexOf(MONTH_SLUG) < 0
          ? constructDayViewPath(constructTodayParams())
          : constructMonthViewPath(constructTodayParams()),
      label: TODAY,
    }))

    return { today }
  },
}
</script>

<style></style>
