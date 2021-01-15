<template>
  <div>
    <div class="text-left">
      <span class="text-xl font-medium">{{ month.label }}</span>
    </div>
    <div class="grid grid-cols-7 h-screen border-r border-t">
      <day
        v-for="(day, i) in month.days"
        :dayIsInView="dayInView?.timestamp === day?.timestamp"
        :day="day"
        :key="day?.timestamp"
        :dayOfWeek="i <= 6 ? DAYS_OF_WEEK_MEDIUM[i] : null"
      />
    </div>
  </div>
</template>

<script>
import Day from '@/components/Day.vue'
import { computed, onMounted, watch } from 'vue'
import {
  useCalendarApi,
  useMonthInView,
  useCalendarRoutes,
  useDayInView,
} from '@/composables'
import { DAYS_OF_WEEK_MEDIUM } from '@/constants'

export default {
  name: 'Sub-Month',
  components: { Day },
  setup() {
    const { findMonth, findDay, fetchSetEvents } = useCalendarApi()
    const [month, _m, findSetMonth] = useMonthInView()
    const [dayInView, _d, findSetDay] = useDayInView()
    const { params } = useCalendarRoutes()

    const yearMonthDay = computed(() => [
      params.value.year,
      params.value.month,
      params.value.day,
    ])

    const setDayMonthInView = () => (
      findSetMonth(findMonth)(...yearMonthDay.value),
      findSetDay(findDay)(...yearMonthDay.value)
    )

    watch(params, setDayMonthInView)

    onMounted(setDayMonthInView)

    // fetchSetEvents()

    return {
      month,
      dayInView,
      DAYS_OF_WEEK_MEDIUM,
    }
  },
}
</script>

<style></style>
