<template>
  <div>
    <div>
      {{ dayInView?.label }}
    </div>
  </div>
</template>

<script>
import { onMounted, watch } from 'vue'
import { useDayInView, useCalendarApi, useCalendarRoutes } from '@/composables'

export default {
  name: 'Sub-Day',
  setup() {
    const { findDay } = useCalendarApi()

    const [dayInView, _, fetchSetDay] = useDayInView()

    const { params } = useCalendarRoutes()

    const findSetDay = fetchSetDay(findDay)

    onMounted(() =>
      findSetDay(params.value.year, params.value.month, params.value.day)
    )

    watch(params, () =>
      findSetDay(params.value.year, params.value.month, params.value.day)
    )

    return {
      dayInView,
    }
  },
}
</script>
