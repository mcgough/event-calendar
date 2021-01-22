<template>
  <div :class="styles" v-for="(day, i) in daysOfWeek" :key="i">
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

export default {
  props: {
    length: String,
  },
  setup(props) {
    const daysOfWeek = computed(() => {
      const { length } = props
      if (length === 'short') return DAYS_OF_WEEK_SHORT
      if (length === 'medium') return DAYS_OF_WEEK_MEDIUM
      if (length === 'long') return DAYS_OF_WEEK_LONG
      return DAYS_OF_WEEK_SHORT
    })

    const styles = [
      'flex',
      'justify-center',
      'items-center',
      'h-7',
      'w-7',
      'text-xs',
      'text-gray-400',
      'select-none',
    ]
    return { daysOfWeek, styles }
  },
}
</script>

<style></style>
