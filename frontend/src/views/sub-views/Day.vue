<template>
  <Suspense>
    <template #default>
      <div class="ml-4">
        <div class="text-left">
          <span class="text-xl font-medium">{{ dayInView.label }}</span>
        </div>
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
    <template #fallback>Loading!!!</template>
  </Suspense>
</template>

<script>
import { computed, onMounted, watch } from 'vue'
import { useDayInView, useCalendarApi, useCalendarRoutes } from '@/composables'
import { DAYS_OF_WEEK_MEDIUM } from '@/constants'

export default {
  name: 'Sub-Day',
  setup() {
    const [dayInView, _, fetchSetDay] = useDayInView()
    const { findDay, fetchEvents } = useCalendarApi()
    const { params } = useCalendarRoutes()

    const yearMonthDay = computed(() => [
      params.value.year,
      params.value.month,
      params.value.day,
    ])

    const findAndSetDay = () => fetchSetDay(findDay)(...yearMonthDay.value)

    watch(params, findAndSetDay)

    onMounted(findAndSetDay)

    return {
      dayInView,
      DAYS_OF_WEEK_MEDIUM,
    }
  },
}
</script>
