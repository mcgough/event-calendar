<template>
  <div>
    <div>{{ year.year }}</div>
    <div class="grid grid-cols-4">
      <div v-for="month in months" :key="month.name" class="mb-16 w-48">
        <h4>{{ month.name }}</h4>
        <div class="grid grid-cols-7">
          <days-of-week length="short" />
          <div
            v-for="day in month.days"
            :key="day.timestamp"
            class="text-xs cursor-pointer"
          >
            {{ day.dayOfMonth }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue'
import { useCalendarApi, useCalendarRoutes } from '@/composables'
import { DAYS_OF_WEEK_SHORT } from '@/constants'
import DaysOfWeek from '@/components/DaysOfWeek.vue'

export default {
  components: { DaysOfWeek },
  name: 'Sub-Year',
  setup() {
    const { findYear } = useCalendarApi()
    const { yearMonthDay, params } = useCalendarRoutes()

    const year = computed(() => findYear(params.value.timestamp))

    const months = computed(() => year.value.findAllMonths())

    return {
      DAYS_OF_WEEK_SHORT,
      months,
      year,
    }
  },
}
</script>

<style></style>
