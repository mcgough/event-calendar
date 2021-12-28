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
    <slide-transition>
      <div class="flex flex-col justify-center items-start mt-4">
        <div class="mb-4">
          <div>
            <span class="text-blue-500 font-medium">{{
              DAYS_OF_WEEK_MEDIUM[dayInView.dayOfWeek]
            }}</span>
          </div>
          <button
            v-focus-on-mount
            class="
              w-12
              h-12
              rounded-full
              bg-blue-500
              text-white
              flex
              justify-center
              items-center
              font-medium
            "
          >
            <span class="text-lg">{{ dayInView.dayOfMonth }}</span>
          </button>
        </div>
        <div v-for="event in events" :key="event.id" class="text-left">
          {{ event.name }}
        </div>
      </div>
    </slide-transition>
  </div>
</template>

<script>
import PreviousNextAnchors from '@/components/PreviousNextAnchors.vue'
import SlideTransition from '@/components/SlideTransition.vue'
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'
import { DAYS_OF_WEEK_MEDIUM } from '@/constants'
import { FocusOnMount } from '@/directives'
import useSelectedDate from '@/store/useSelectedDate'

export default {
  components: { PreviousNextAnchors, SlideTransition },
  directives: { FocusOnMount },
  name: 'Sub-Day',
  setup() {
    const selectedDate = useSelectedDate()

    const { constructPrevNextDayViewPaths, params, route } = useCalendarRoutes()

    const dayInView = computed(() => selectedDate.day)

    const events = computed(() => dayInView.value.getEvents())

    const prevNextDayPaths = computed(() =>
      constructPrevNextDayViewPaths(params.value)
    )

    return {
      dayInView,
      DAYS_OF_WEEK_MEDIUM,
      events,
      prevNextDayPaths,
      route,
    }
  },
}
</script>
