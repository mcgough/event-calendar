<template>
  <router-link :to="subViewPath" :class="styles" :tabindex="focusable">
    <span>{{ day.dayOfMonth }}</span>
  </router-link>
</template>

<script>
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'
import { useDayStyles } from '@/composables'

export default {
  name: 'Mini-Day',
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

    const focusable = computed(() => (props.dayIsInView ? 0 : -1))

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
      focusable,
      styles,
      subViewPath,
    }
  },
}
</script>
