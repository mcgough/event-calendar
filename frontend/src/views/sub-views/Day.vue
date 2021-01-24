<template>
  <div class="ml-4">
    <teleport to=".top-level-nav .sub-view-header">
      <div class="flex items-center">
        <previous-next-anchors
          :previous="prevNextDayPaths.prev"
          :next="prevNextDayPaths.next"
        />
        <div class="text-left">
          <span class="text-xl font-medium">{{ dayInView.label }}</span>
        </div>
      </div>
    </teleport>
    <div class="w-14 flex flex-col justify-center items-center mt-4">
      <div>
        <span class="text-blue-500 font-medium">{{
          DAYS_OF_WEEK_MEDIUM[dayInView.dayOfWeek]
        }}</span>
      </div>
      <button
        v-focus-on-mount
        class="w-12 h-12 rounded-full bg-blue-500 text-white flex justify-center items-center font-medium"
      >
        <span class="text-lg">{{ dayInView.dayOfMonth }}</span>
      </button>
    </div>
    <div v-for="event in events" :key="event.id" class="text-left">
      {{ event.name }}
    </div>
  </div>
</template>

<script>
import PreviousNextAnchors from '@/components/PreviousNextAnchors.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useDayInView, useCalendarApi, useCalendarRoutes } from '@/composables'
import { DAYS_OF_WEEK_MEDIUM } from '@/constants'
import { FocusOnMount } from '@/directives'

export default {
  components: { PreviousNextAnchors },
  directives: { FocusOnMount },
  name: 'Sub-Day',
  setup() {
    const [dayInView, _, fetchSetDay] = useDayInView()
    const { findDay, fetchEvents } = useCalendarApi()
    const { constructPrevNextDayViewPaths, params } = useCalendarRoutes()

    const events = ref([])

    const prevNextDayPaths = computed(() =>
      constructPrevNextDayViewPaths(params.value)
    )

    return {
      dayInView,
      DAYS_OF_WEEK_MEDIUM,
      events,
      prevNextDayPaths,
    }
  },
}
</script>
