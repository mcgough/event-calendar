<template>
  <router-link :to="thisDayRoute">
    <div :class="[...base, ...inMonth, ...hasEvents, ...inView]">
      <div>{{ dayOfMonth }}</div>
    </div>
  </router-link>
</template>

<script>
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'

export default {
  props: {
    dayIsInView: Boolean,
    dayOfMonth: Number,
    eventCount: Number,
    timestamp: Number,
    isInCurrentMonth: Boolean,
  },
  setup(props) {
    const { constructDayRoute } = useCalendarRoutes()

    const thisDayRoute = constructDayRoute(props.timestamp)

    const inMonth = computed(() =>
      props.isInCurrentMonth ? dayInMonth : dayOutsideMonth
    )

    const inView = computed(() => (props.dayIsInView ? dayInView : []))

    const hasEvents = computed(() => (props.eventCount ? dayHasEvents : []))

    return {
      inMonth,
      inView,
      hasEvents,
      base,
      thisDayRoute,
    }
  },
}

const base = [
  'select-none',
  'rounded-full',
  'w-12',
  'h-12',
  'flex',
  'justify-center',
  'items-center',
  'active:bg-blue-200',
]
const dayInMonth = ['cursor-pointer', 'hover:bg-gray-100']
const dayOutsideMonth = ['text-gray-400']
const dayHasEvents = ['bg-green-200', 'hover:bg-green-300']
const dayInView = ['bg-blue-300', 'hover:bg-blue-300', 'text-white']
</script>
