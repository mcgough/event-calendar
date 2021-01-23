<template>
  <div>
    <teleport to=".top-level-nav .sub-view-header">
      <div class="flex items-center">
        <div class="flex mr-4">
          <router-link :to="prevNextMonthPaths.prev">Prev</router-link>
          <router-link :to="prevNextMonthPaths.next">Next</router-link>
        </div>
        <div class="text-left">
          <span class="text-xl font-medium">{{ month.label }}</span>
        </div>
      </div>
    </teleport>
    <div class="month grid grid-cols-7 border-r border-t" ref="monthRef">
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
import { computed, onMounted, ref } from 'vue'
import {
  useCalendarApi,
  useMonthInView,
  useCalendarRoutes,
  useDayInView,
  useMouseWheel,
} from '@/composables'
import { DAYS_OF_WEEK_MEDIUM } from '@/constants'

export default {
  components: { Day },
  name: 'Sub-Month',
  setup() {
    const monthRef = ref(null)

    const { findMonth, findDay } = useCalendarApi()
    const [month, _m, findSetMonth] = useMonthInView()
    const [dayInView, _d, findSetDay] = useDayInView()
    const {
      constructPrevNextMonthViewPaths,
      params,
      pushToRouter,
      watchRouteParams,
      yearMonthDay,
    } = useCalendarRoutes()

    const { onWheelDown, onWheelUp } = useMouseWheel(monthRef)

    const setDayMonthInView = () => (
      findSetMonth(findMonth)(...yearMonthDay.value),
      findSetDay(findDay)(...yearMonthDay.value)
    )

    const prevNextMonthPaths = computed(() =>
      constructPrevNextMonthViewPaths(params.value)
    )

    onWheelDown(pushToRouter.bind(undefined, prevNextMonthPaths, 'prev'), 100)
    onWheelUp(pushToRouter.bind(undefined, prevNextMonthPaths, 'next'), 100)

    watchRouteParams(setDayMonthInView)

    onMounted(setDayMonthInView)

    return {
      dayInView,
      DAYS_OF_WEEK_MEDIUM,
      month,
      monthRef,
      prevNextMonthPaths,
    }
  },
}
</script>

<style scoped>
.month {
  height: calc(100vh - 7rem);
}
</style>
