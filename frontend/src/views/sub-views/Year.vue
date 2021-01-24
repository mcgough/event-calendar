<template>
  <div class="overflow-y-auto">
    <teleport to=".top-level-nav .sub-view-header">
      <div class="flex items-center">
        <previous-next-anchors
          :previous="prevNextPaths.prev"
          :next="prevNextPaths.next"
        />
        <div class="text-xl font-medium">{{ year.year }}</div>
      </div>
    </teleport>
    <div class="grid grid-cols-4">
      <div v-for="month in months" :key="month.name" class="mb-12 w-48">
        <h4 class="text-left font-semibold">{{ month.name }}</h4>
        <div class="grid grid-cols-7" v-month-keyboard-nav>
          <days-of-week length="short" />
          <div
            v-for="(day, i) in month.days"
            :key="day.timestamp"
            class="text-xs cursor-pointer"
            :index="i"
          >
            {{ day.dayOfMonth }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DaysOfWeek from '@/components/DaysOfWeek.vue'
import PreviousNextAnchors from '@/components/PreviousNextAnchors.vue'
import { onMounted, computed, reactive } from 'vue'
import {
  useCalendarApi,
  useCalendarRoutes,
  useDayInView,
  useMonthInView,
} from '@/composables'
import { DAYS_OF_WEEK_SHORT } from '@/constants'
import { MonthKeyboardNav } from '@/directives'

export default {
  components: { DaysOfWeek, PreviousNextAnchors },
  directives: { MonthKeyboardNav },
  name: 'Sub-Year',
  setup() {
    const { findYear } = useCalendarApi()
    const { constructPrevNextYearViewPaths, params } = useCalendarRoutes()

    const prevNextPaths = computed(() =>
      constructPrevNextYearViewPaths(params.value)
    )

    const year = computed(() => findYear(params.value.timestamp))

    const months = computed(() => year.value.findAllMonths())

    return {
      DAYS_OF_WEEK_SHORT,
      months,
      prevNextPaths,
      year,
    }
  },
}
</script>

<style></style>
