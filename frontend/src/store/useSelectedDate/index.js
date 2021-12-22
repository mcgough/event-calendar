import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useCalendarRoutes } from '@/composables'
import useCalendar from '@/store/useCalendar'

export default defineStore('selectedDate', () => {
  const calendar = useCalendar()

  const { watchRouteParams } = useCalendarRoutes()

  const timestamp = ref()

  const year = computed(() => calendar.findYear(timestamp.value))

  const month = computed(() => calendar.findMonth(timestamp.value))

  const day = computed(() => calendar.findDay(timestamp.value))

  watchRouteParams(
    (newVal, oldVal) =>
      newVal.year &&
      newVal.year !== oldVal?.year &&
      calendar.fetchSetEvents(newVal.year),
    { immediate: true }
  )

  watchRouteParams((params) => (timestamp.value = params.timestamp), {
    immediate: true,
  })

  return { year, month, day }
})
