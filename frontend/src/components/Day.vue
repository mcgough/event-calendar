<template>
  <div class="border-l border-b">
    <div class="w-full mt-1 flex flex-col justify-center items-center">
      <div v-if="dayOfWeek">
        <span class="text-xs text-gray-400 select-none">{{ dayOfWeek }}</span>
      </div>
      <router-link :to="subViewPath" :class="styles">
        <span>{{ day.dayOfMonth }}</span>
      </router-link>
      <div class="w-full">
        <button
          v-for="event in events"
          :key="event.id"
          @click="showEventDetails.call(null, event)"
          class="rounded bg-green-300 mb-1 pl-1 pr-1 text-left pointer h-4 overflow-hidden"
        >
          <span class="text-xs w-full block">{{ event.name }}</span>
        </button>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCalendarRoutes, useDayStyles } from '@/composables'

export default {
  props: {
    dayIsInView: Boolean,
    dayOfWeek: String,
    day: Object,
  },
  setup(props) {
    const { constructDayViewPath } = useCalendarRoutes()

    const events = computed(props.day.getEvents)

    const pathParams = computed(() => ({
      year: props.day.year,
      month: props.day.month,
      day: props.day.dayOfMonth,
    }))

    const subViewPath = computed(() => constructDayViewPath(pathParams.value))

    const styles = computed(() =>
      useDayStyles({
        ...props.day,
      })
    )

    function showEventDetails(event) {}

    return {
      events,
      showEventDetails,
      styles,
      subViewPath,
    }
  },
}
</script>
