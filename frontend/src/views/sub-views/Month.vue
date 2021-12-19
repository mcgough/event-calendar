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
    <div class="month grid grid-cols-7 border-r" ref="monthRef">
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
import PreviousNextAnchors from '@/components/PreviousNextAnchors.vue'
import { computed, ref } from 'vue'
import { useCalendarRoutes, useMouseWheel } from '@/composables'
import { DAYS_OF_WEEK_MEDIUM } from '@/constants'
import useSelectedDate from '@/store/useSelectedDate'

export default {
  components: { Day, PreviousNextAnchors },
  name: 'Sub-Month',
  setup() {
    const monthRef = ref(null)

    const selectedDate = useSelectedDate()

    const { constructPrevNextMonthViewPaths, params, pushToRouter } =
      useCalendarRoutes()

    const month = computed(() => selectedDate.month)

    const dayInView = computed(() => selectedDate.day)

    const { onWheelDown, onWheelUp } = useMouseWheel(monthRef)

    const prevNextMonthPaths = computed(() =>
      constructPrevNextMonthViewPaths(params.value)
    )

    onWheelDown(pushToRouter.bind(undefined, prevNextMonthPaths, 'prev'), 75)

    onWheelUp(pushToRouter.bind(undefined, prevNextMonthPaths, 'next'), 75)

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
