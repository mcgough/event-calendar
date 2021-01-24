<template>
  <div
    :class="[...baseStyles, height, width]"
    v-for="(day, i) in daysOfWeek"
    :key="i"
  >
    <div>{{ day }}</div>
  </div>
</template>

<script>
import { computed } from 'vue'
import {
  DAYS_OF_WEEK_SHORT,
  DAYS_OF_WEEK_MEDIUM,
  DAYS_OF_WEEK_LONG,
} from '@/constants'

const SHORT = 'short'
const LONG = 'long'
const MEDIUM = 'medium'

export default {
  props: {
    length: {
      type: String,
      default: SHORT,
    },
    height: {
      type: String,
      default: 'h-7',
    },
    width: {
      type: String,
      default: 'w-7',
    },
  },
  setup(props) {
    const daysOfWeek = computed(() => {
      const { length } = props
      if (length === SHORT) return DAYS_OF_WEEK_SHORT
      if (length === MEDIUM) return DAYS_OF_WEEK_MEDIUM
      if (length === LONG) return DAYS_OF_WEEK_LONG
      return DAYS_OF_WEEK_SHORT
    })

    return { daysOfWeek, baseStyles }
  },
}

const baseStyles = [
  'flex',
  'justify-center',
  'items-center',
  'text-xs',
  'text-gray-400',
  'select-none',
]
</script>

<style></style>
