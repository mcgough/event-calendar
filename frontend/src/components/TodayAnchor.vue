<template>
  <router-link :to="today.path" class="h-full w-full px-3 py-3">
    {{ today.label }}
  </router-link>
</template>

<script>
import compose from 'lodash.flowright'
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'
import { MONTH_SLUG, TODAY } from '@/constants'
import { parseDate } from '@/date-utils'

function getTodayRouteParams() {
  const { y, m, d } = parseDate(new Date().getTime())
  return { year: y, month: m, day: d }
}

export default {
  setup() {
    const {
      constructDayViewPath,
      constructMonthViewPath,
      route,
    } = useCalendarRoutes()

    const today = computed(() => ({
      label: TODAY,
      path:
        route.path.indexOf(MONTH_SLUG) < 0
          ? compose(constructDayViewPath, getTodayRouteParams)()
          : compose(constructMonthViewPath, getTodayRouteParams)(),
    }))

    return { today }
  },
}
</script>

<style></style>
