<template>
  <div class="border-l border-b">
    <div class="w-full mt-1 flex flex-col justify-center items-center">
      <div v-if="dayOfWeek">
        <span class="text-xs text-gray-400 select-none">{{ dayOfWeek }}</span>
      </div>
      <router-link :to="subViewPath" :class="dayAnchorStyles">
        <span>{{ day.dayOfMonth }}</span>
      </router-link>
      <div class="w-full">
        <button
          v-for="event in events"
          :key="event.id"
          @click="showEventDetails.call(null, event)"
          class="rounded bg-green-300 mb-1 pl-1 pr-1 text-left overflow-clip pointer"
        >
          <span class="text-xs overflow-clip w-full">{{ event.name }}</span>
        </button>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'

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

    const inMonth = computed(() =>
      props.day.isInCurrentMonth ? dayInMonth : dayOutsideMonth
    )

    const dayAnchorStyles = computed(() => [
      ...base,
      ...focus,
      ...inMonth.value,
    ])

    function showEventDetails(event) {
      console.log(event)
    }

    return {
      dayAnchorStyles,
      events,
      showEventDetails,
      subViewPath,
    }
  },
}

const base = [
  'select-none',
  'rounded-full',
  'w-6',
  'h-6',
  'flex',
  'justify-center',
  'items-center',
  'active:bg-blue-200',
  'text-xs',
]
const dayInMonth = ['cursor-pointer', 'hover:bg-gray-100']
const dayOutsideMonth = ['text-gray-400']
const dayHasEvents = ['bg-green-200', 'hover:bg-green-300']
const dayInView = ['bg-blue-200', 'hover:bg-blue-300', 'text-blue-700']
const focus = ['focus:outline-none', 'focus:ring-1', 'rounded-full']
</script>
