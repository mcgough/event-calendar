<template>
  <v-select :options="options" v-model="selected"></v-select>
</template>

<script>
import VSelect from '@/components/Select.vue'
import { ref, watch, watchEffect } from 'vue'
import {
  DAY,
  WEEK,
  MONTH,
  YEAR,
  DAY_SLUG,
  WEEK_SLUG,
  MONTH_SLUG,
  YEAR_SLUG,
} from '@/constants'
import { useCalendarRoutes } from '@/composables'

export default {
  name: 'Select',
  components: { VSelect },
  setup() {
    const { buildPathWithBase, router, route, params } = useCalendarRoutes()

    const selected = ref(undefined)

    const options = [
      { label: DAY, value: DAY_SLUG },
      { label: WEEK, value: WEEK_SLUG },
      { label: MONTH, value: MONTH_SLUG },
      { label: YEAR, value: YEAR_SLUG },
    ]

    function setSelected() {
      selected.value = options[options.findIndex(findOptionInPath) ?? 0]
    }

    function findOptionInPath(option) {
      return route.path.includes(option.value)
    }

    function updateSubView() {
      router.push(buildPathWithBase(selected.value.value, params.value))
    }

    watchEffect(setSelected)

    watch(selected, updateSubView)

    return {
      options,
      selected,
    }
  },
}
</script>
