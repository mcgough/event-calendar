<template>
  <div>
    <teleport to=".top-level-nav .sub-view-header">
      <div class="flex items-center">
        <previous-next-anchors
          :previous="prevNextMonthPaths.prev"
          :next="prevNextMonthPaths.next"
        />
        <div class="text-left">
          <span class="text-xl font-medium">{{ month.label }}</span>
        </div>
      </div>
    </teleport>
    <slide-transition>
      <div class="month grid grid-cols-7 border-r" :ref="mouseWheelElement">
        <day
          v-for="(day, i) in month.days"
          :dayIsInView="dayInView && dayInView.timestamp === day.timestamp"
          :day="day"
          :key="(day && day.timestamp) || i"
          :dayOfWeek="i <= 6 ? DAYS_OF_WEEK_MEDIUM[i] : null"
        />
      </div>
    </slide-transition>
  </div>
</template>

<script>
import Day from '@/components/Day.vue'
import PreviousNextAnchors from '@/components/PreviousNextAnchors.vue'
import SlideTransition from '@/components/SlideTransition.vue'
import { computed } from 'vue'
import { useCalendarRoutes, useMouseWheel } from '@/composables'
import { DAYS_OF_WEEK_MEDIUM } from '@/constants'
import useSelectedDate from '@/store/useSelectedDate'

export default {
  components: { Day, PreviousNextAnchors, SlideTransition },
  name: 'Sub-Month',
  setup() {
    const selectedDate = useSelectedDate()

    const { constructPrevNextMonthViewPaths, params, pushToRouter } =
      useCalendarRoutes()

    const month = computed(() => selectedDate.month)

    const dayInView = computed(() => selectedDate.day)

    const { mouseWheelElement, onWheelDown, onWheelUp } = useMouseWheel()

    const prevNextMonthPaths = computed(() =>
      constructPrevNextMonthViewPaths(params.value)
    )

    const navigateToMonth = (direction) => (data) =>
      pushToRouter(prevNextMonthPaths, direction, data)

    onWheelDown(navigateToMonth('prev'), 75)

    onWheelUp(navigateToMonth('next'), 75)

    return {
      dayInView,
      DAYS_OF_WEEK_MEDIUM,
      month,
      mouseWheelElement,
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
