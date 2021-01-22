<template>
  <div
    :class="[...baseStyles, ...styles]"
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
    styles: {
      type: Array,
      default: [],
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
  'h-7',
  'w-7',
  'text-xs',
  'text-gray-400',
  'select-none',
]
</script>

<style></style>
