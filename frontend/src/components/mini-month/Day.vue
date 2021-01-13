<template>
  <router-link
    :to="subViewRoute"
    :class="[...base, ...inMonth, ...hasEvents, ...inView, ...focus]"
  >
    <span>{{ day.dayOfMonth }}</span>
  </router-link>
</template>

<script>
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'

export default {
  props: {
    dayIsInView: Boolean,
    day: Object,
  },
  setup(props) {
    const {
      constructDayViewPath,
      constructMonthViewPath,
      route,
    } = useCalendarRoutes()

    const pathParams = computed(() => ({
      year: props.day.year,
      month: props.day.month,
      day: props.day.dayOfMonth,
    }))

    const subViewRoute = computed(() =>
      route.path.indexOf('d') > -1
        ? constructDayViewPath(pathParams.value)
        : constructMonthViewPath(pathParams.value)
    )

    const inMonth = computed(() =>
      props.day.isInCurrentMonth ? dayInMonth : dayOutsideMonth
    )

    const inView = computed(() => (props.dayIsInView ? dayInView : []))

    const hasEvents = computed(() =>
      props.day.eventCount() ? dayHasEvents : []
    )

    return {
      base,
      focus,
      hasEvents,
      inMonth,
      inView,
      subViewRoute,
    }
  },
}

const base = [
  'select-none',
  'rounded-full',
  'w-8',
  'h-8',
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
