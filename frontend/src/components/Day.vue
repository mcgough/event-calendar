<template>
  <div :class="[...dayBase, ...isActive, ...hasEvents]">
    <div>{{ dayOfMonth }}</div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { computed } from 'vue'

export default {
  props: { dayOfMonth: Number, eventCount: Number, timestamp: Date },
  setup(props) {
    const isActive = computed(() =>
      props.dayOfMonth ? dayActive : dayInActive
    )

    const hasEvents = computed(() => (props.eventCount ? dayHasEvents : []))

    return { format, isActive, hasEvents, dayBase }
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
const dayActive = ['cursor-pointer', 'hover:bg-gray-100']
const dayInActive = ['bg-gray-200']
const dayHasEvents = ['bg-green-200', 'hover:bg-green-300']
</script>
