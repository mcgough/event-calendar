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
    <div class="week grid grid-cols-7 border-r mt-3">
      <div
        class="text-xs mb-2"
        v-for="dayOfWeek in DAYS_OF_WEEK_MEDIUM"
        :key="dayOfWeek"
      >
        {{ dayOfWeek }}
      </div>
      <div class="text-xl" v-for="day in week" :key="day.timestamp">
        {{ day.dayOfMonth }}
      </div>
    </div>
  </div>
</template>

<script>
import Day from '@/components/Day.vue'
import PreviousNextAnchors from '@/components/PreviousNextAnchors.vue'
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'
import { DAYS_OF_WEEK_MEDIUM } from '@/constants'
import useSelectedDate from '@/store/useSelectedDate'

export default {
  components: { Day, PreviousNextAnchors },
  name: 'Sub-Week',
  setup() {
    const selectedDate = useSelectedDate()

    const { constructPrevNextWeekViewPaths, params } = useCalendarRoutes()

    const month = computed(() => selectedDate.month)

    const dayInView = computed(() => selectedDate.day)

    const week = computed(() => month.value.findWeek(selectedDate.day))

    const prevNextMonthPaths = computed(() =>
      constructPrevNextWeekViewPaths({
        ...params.value,
        weekOfYear: selectedDate.day.weekOfYear,
      })
    )

    return {
      dayInView,
      DAYS_OF_WEEK_MEDIUM,
      month,
      prevNextMonthPaths,
      week,
    }
  },
}
</script>
