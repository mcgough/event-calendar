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
    <transition :name="route.meta.transition">
      <div
        v-if="slideInDay"
        class="flex flex-col justify-center items-start mt-4"
      >
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
    </transition>
  </div>
</template>

<script>
import PreviousNextAnchors from '@/components/PreviousNextAnchors.vue'
import { computed, onMounted, ref } from 'vue'
import { useCalendarRoutes } from '@/composables'
import { DAYS_OF_WEEK_MEDIUM } from '@/constants'
import { FocusOnMount } from '@/directives'
import useSelectedDate from '@/store/useSelectedDate'

export default {
  components: { PreviousNextAnchors },
  directives: { FocusOnMount },
  name: 'Sub-Day',
  setup() {
    const selectedDate = useSelectedDate()

    const { constructPrevNextDayViewPaths, params, route } = useCalendarRoutes()

    const dayInView = computed(() => selectedDate.day)

    const events = computed(() => dayInView.value.getEvents())

    const slideInDay = ref(false)

    const prevNextDayPaths = computed(() =>
      constructPrevNextDayViewPaths(params.value)
    )

    onMounted(() => (slideInDay.value = true))

    return {
      dayInView,
      DAYS_OF_WEEK_MEDIUM,
      events,
      prevNextDayPaths,
      route,
      slideInDay,
    }
  },
}
</script>

<style scoped>
/* TODO: moved to css file */
.day-slide-right-enter-active {
  transition: all 0.5s ease;
  transform: translateX(0rem);
}
.day-slide-right-leave-active {
  position: absolute;
}

.day-slide-right-enter-from {
  transform: translateX(-1rem);
}
.day-slide-right-leave-to {
  opacity: 0;
}

.day-slide-left-enter-active {
  transition: all 0.5s ease;
  transform: translateX(0rem);
}
.day-slide-left-leave-active {
  position: absolute;
}

.day-slide-left-enter-from {
  transform: translateX(1rem);
}
.day-slide-left-leave-to {
  opacity: 0;
}
</style>
