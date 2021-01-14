<template>
  <div class="ml-4">
    <div class="w-14 flex flex-col justify-center items-center">
      <div>
        <span class="text-blue-500 font-medium">{{
          DAYS_OF_WEEK_MEDIUM[dayInView.dayOfWeek]
        }}</span>
      </div>
      <div
        class="w-12 h-12 rounded-full bg-blue-500 text-white flex justify-center items-center font-medium"
      >
        <span class="text-lg">{{ dayInView.dayOfMonth }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, watch } from 'vue'
import { useDayInView, useCalendarApi, useCalendarRoutes } from '@/composables'
import { DAYS_OF_WEEK_MEDIUM } from '@/constants'

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
      DAYS_OF_WEEK_MEDIUM,
    }
  },
}
</script>
