<template>
  <router-link :to="subView.path" class="h-full w-full px-3 py-3">
    {{ subView.label }}
  </router-link>
</template>

<script>
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'
import { MONTH_SLUG, DAY, MONTH } from '@/constants'

export default {
  setup() {
    const {
      constructDayViewPath,
      constructMonthViewPath,
      params,
      route,
    } = useCalendarRoutes()

    const subView = computed(() => ({
      path:
        route.path.indexOf(MONTH_SLUG) > -1
          ? constructDayViewPath(params.value)
          : constructMonthViewPath(params.value),
      label: route.path.indexOf(MONTH_SLUG) > -1 ? DAY : MONTH,
    }))

    return { subView }
  },
}
</script>

<style></style>
