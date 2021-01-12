<template>
  <router-link :to="thisDayRoute">
    <div :class="[...dayBase, ...dayInCurrentMonth, ...hasEvents]">
      <div>{{ dayOfMonth }}</div>
    </div>
  </router-link>
</template>

<script>
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'

export default {
  props: {
    dayOfMonth: Number,
    eventCount: Number,
    timestamp: Number,
    isInCurrentMonth: Boolean,
  },
  setup(props) {
    const { constructDayRoute } = useCalendarRoutes()

    const thisDayRoute = constructDayRoute(props.timestamp)

    const dayInCurrentMonth = computed(() =>
      props.isInCurrentMonth ? dayInMonth : dayOutsideMonth
    )

    const hasEvents = computed(() => (props.eventCount ? hasEvents : []))

    return {
      dayInCurrentMonth,
      hasEvents,
      dayBase,
      thisDayRoute,
    }
  },
}

const dayBase = [
  'select-none',
  'rounded-full',
  'w-12',
  'h-12',
  'flex',
  'justify-center',
  'items-center',
]
const dayInMonth = ['cursor-pointer', 'hover:bg-gray-100']
const dayOutsideMonth = ['text-gray-400']
const dayHasEvents = ['bg-green-200', 'hover:bg-green-300']
</script>
