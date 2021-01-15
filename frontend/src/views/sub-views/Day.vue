<template>
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
    <div v-for="event in events" :key="event.id" class="text-left">
      {{ event.name }}
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useDayInView, useCalendarApi, useCalendarRoutes } from '@/composables'
import { DAYS_OF_WEEK_MEDIUM } from '@/constants'

export default {
  name: 'Sub-Day',
  setup() {
    const [dayInView, _, fetchSetDay] = useDayInView()
    const { findDay, fetchEvents } = useCalendarApi()
    const { watchRouteParams, yearMonthDay } = useCalendarRoutes()

    const events = ref([])

    const setDayAndEvents = () => (
      fetchSetDay(findDay)(...yearMonthDay.value),
      (events.value = dayInView.getEvents())
    )

    watchRouteParams(setDayAndEvents)

    onMounted(setDayAndEvents)

    return {
      dayInView,
      DAYS_OF_WEEK_MEDIUM,
      events,
    }
  },
}
</script>
