<template>
  <div>
    <div class="flex">
      <div class="flex">
        <router-link :to="prevNextMonthPaths.prev">Prev</router-link>
        <router-link :to="prevNextMonthPaths.next">Next</router-link>
      </div>
      <div class="text-left">
        <span class="text-xl font-medium">{{ month.label }}</span>
      </div>
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
import { computed, onMounted, toRef } from 'vue'
import {
  useCalendarApi,
  useMonthInView,
  useCalendarRoutes,
  useDayInView,
} from '@/composables'
import { DAYS_OF_WEEK_MEDIUM } from '@/constants'

export default {
  components: { Day },
  name: 'Sub-Month',
  setup() {
    const { findMonth, findDay, fetchSetEvents } = useCalendarApi()
    const [month, _m, findSetMonth] = useMonthInView()
    const [dayInView, _d, findSetDay] = useDayInView()
    const {
      constructPrevNextMonthViewPaths,
      params,
      watchRouteParams,
      yearMonthDay,
    } = useCalendarRoutes()

    const setDayMonthInView = () => (
      findSetMonth(findMonth)(...yearMonthDay.value),
      findSetDay(findDay)(...yearMonthDay.value)
    )

    const prevNextMonthPaths = computed(() =>
      constructPrevNextMonthViewPaths(params.value)
    )

    watchRouteParams(setDayMonthInView)

    onMounted(setDayMonthInView)

    return {
      dayInView,
      DAYS_OF_WEEK_MEDIUM,
      month,
      prevNextMonthPaths,
    }
  },
}
</script>

<style></style>
