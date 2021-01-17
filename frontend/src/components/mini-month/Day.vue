<template>
  <router-link :to="subViewPath" :class="styles">
    <span>{{ day.dayOfMonth }}</span>
  </router-link>
</template>

<script>
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'
import { useDayStyles } from '@/composables'

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

    const styles = computed(() =>
      useDayStyles({
        ...props.day,
        dayIsInView: props.dayIsInView,
      })
    )

    const pathParams = computed(() => ({
      year: props.day.year,
      month: props.day.month,
      day: props.day.dayOfMonth,
    }))

    const subViewPath = computed(() =>
      route.path.indexOf('d') > -1
        ? constructDayViewPath(pathParams.value)
        : constructMonthViewPath(pathParams.value)
    )

    return {
      styles,
      subViewPath,
    }
  },
}
</script>
