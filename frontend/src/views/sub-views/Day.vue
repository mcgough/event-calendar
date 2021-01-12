<template>
  <div>
    <h2>Day</h2>
    <div>
      {{ dayInView?.label }}
    </div>
  </div>
</template>

<script>
import { watch } from 'vue'
import { useDayInView } from '@/composables/useDayInView'

export default {
  name: 'Sub-Day',
  setup() {
    const [dayInView] = useDayInView()
    return {
      dayInView,
    }
  },
}
</script>
