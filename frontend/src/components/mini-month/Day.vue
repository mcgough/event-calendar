<template>
  <router-link :to="subViewPath" :class="styles" :tabindex="focusable">
    <span>{{ day.dayOfMonth }}</span>
  </router-link>
</template>

<script>
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'
import { useDayStyles } from '@/composables'
import { MONTH_SLUG, DAY_SLUG, YEAR_SLUG } from '@/constants'

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
      constructYearViewPath,
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

    const subViewPath = computed(() => {
      if (route.path.includes(MONTH_SLUG))
        return constructMonthViewPath(pathParams.value)
      if (route.path.includes(DAY_SLUG))
        return constructDayViewPath(pathParams.value)
      if (route.path.includes(YEAR_SLUG))
        return constructYearViewPath(pathParams.value)
    })

    return {
      focusable,
      styles,
      subViewPath,
    }
  },
}
</script>
