<template>
  <v-select :options="options" v-model="selected"></v-select>
</template>

<script>
import VSelect from '@/components/Select.vue'
import { ref, watch } from 'vue'
import { DAY, MONTH, YEAR, DAY_SLUG, MONTH_SLUG, YEAR_SLUG } from '@/constants'
import { useCalendarRoutes } from '@/composables'

export default {
  name: 'Select',
  components: { VSelect },
  setup() {
    const { buildPathWithBase, router, params } = useCalendarRoutes()

    const options = [
      { label: DAY, value: DAY_SLUG },
      { label: MONTH, value: MONTH_SLUG },
      { label: YEAR, value: YEAR_SLUG },
    ]

    const selected = ref(options[0])

    function updateSubView(val) {
      const path = buildPathWithBase(val.value, params.value)
      console.log(path)
      router.push(path)
    }

    watch(selected, updateSubView)

    return {
      options,
      selected,
    }
  },
}
</script>
