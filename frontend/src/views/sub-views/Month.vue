<template>
  <div class="grid grid-cols-7 h-screen">
    {{ month.name }} {{ month.year }}
    <div
      class="flex justify-center items-center h-8 w-8 text-xs text-gray-400"
      v-for="(DAY, i) in DAYS_OF_WEEK_MEDIUM"
      :key="i"
    >
      <div>{{ DAY }}</div>
    </div>
    <day
      v-for="day in month.days"
      :dayIsInView="dayInView?.timestamp === day?.timestamp"
      :day="day"
      :key="day?.timestamp"
    />
  </div>
</template>

<script>
import Day from '@/components/mini-month/Day'
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
    const { findMonth, findDay } = useCalendarApi()

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

    onMounted(setDayMonthInView)

    watch(params, setDayMonthInView)

    return {
      month,
      dayInView,
      DAYS_OF_WEEK_MEDIUM,
    }
  },
}
</script>

<style></style>
