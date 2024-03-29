<template>
  <div>
    <teleport to=".top-level-nav .sub-view-header">
      <div class="flex items-center">
        <previous-next-anchors
          :previous="prevNextPaths.prev"
          :next="prevNextPaths.next"
        />
        <div class="text-xl font-medium">{{ year.year }}</div>
      </div>
    </teleport>
    <slide-transition>
      <div class="container grid grid-cols-4 overflow-y-auto">
        <div v-for="month in months" :key="month.name" class="mb-4 w-52 h-52">
          <router-link :to="buildMonthPath(month)">
            <h4 class="text-left font-semibold ml-2">{{ month.name }}</h4>
          </router-link>
          <div class="grid grid-cols-7" v-month-keyboard-nav>
            <days-of-week length="short" height="h-6" width="w-6" />
            <router-link
              v-for="(day, i) in month.days"
              :to="buildDayPath(day)"
              class="year-day"
              :class="useDayStyles(day)"
              :key="day.timestamp"
              :index="i"
            >
              {{ day.dayOfMonth }}
            </router-link>
          </div>
        </div>
      </div>
    </slide-transition>
  </div>
</template>

<script>
import DaysOfWeek from '@/components/DaysOfWeek.vue'
import PreviousNextAnchors from '@/components/PreviousNextAnchors.vue'
import SlideTransition from '@/components/SlideTransition.vue'
import { computed } from 'vue'
import { useCalendarRoutes, useDayStyles } from '@/composables'
import { DAYS_OF_WEEK_SHORT } from '@/constants'
import { MonthKeyboardNav } from '@/directives'
import useSelectedDate from '@/store/useSelectedDate'

export default {
  components: { DaysOfWeek, PreviousNextAnchors, SlideTransition },
  directives: { MonthKeyboardNav },
  name: 'Sub-Year',
  setup() {
    const selectedDate = useSelectedDate()

    const {
      constructPrevNextYearViewPaths,
      constructDayViewPath,
      constructMonthViewPath,
      params,
    } = useCalendarRoutes()

    const year = computed(() => selectedDate.year)

    const months = computed(() => selectedDate.year.findAllMonths())

    const prevNextPaths = computed(() =>
      constructPrevNextYearViewPaths(params.value)
    )

    const buildDayPath = (day) =>
      constructDayViewPath({
        day: day.dayOfMonth,
        month: day.month,
        year: day.year,
      })

    const buildMonthPath = ({ month, year }) =>
      constructMonthViewPath({ month, year, day: 1 })

    return {
      buildDayPath,
      buildMonthPath,
      DAYS_OF_WEEK_SHORT,
      months,
      prevNextPaths,
      useDayStyles,
      year,
    }
  },
}
</script>

<style scoped>
.container {
  height: calc(100vh - 75px);
  padding-top: 1rem;
}
.year-day {
  @apply h-6 w-6;
}
</style>
