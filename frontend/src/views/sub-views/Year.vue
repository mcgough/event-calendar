<template>
  <div>
    <teleport to=".top-level-nav .sub-view-header">
      <div class="flex">
        <div class="flex mr-4">
          <router-link :to="'/'">Prev</router-link>
          <router-link :to="'/'">Next</router-link>
        </div>
        <div class="text-xl font-medium">{{ year.year }}</div>
      </div>
    </teleport>
    <div class="grid grid-cols-4">
      <div v-for="month in months" :key="month.name" class="mb-16 w-48">
        <h4>{{ month.name }}</h4>
        <div class="grid grid-cols-7" v-month-keyboard-nav>
          <days-of-week length="short" />
          <div
            v-for="(day, i) in month.days"
            :key="day.timestamp"
            class="text-xs cursor-pointer"
            :index="i"
          >
            {{ day.dayOfMonth }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DaysOfWeek from '@/components/DaysOfWeek.vue'
import { onMounted, computed, reactive } from 'vue'
import { useCalendarApi, useCalendarRoutes } from '@/composables'
import { DAYS_OF_WEEK_SHORT } from '@/constants'
import { MonthKeyboardNav } from '@/directives'

export default {
  components: { DaysOfWeek },
  directives: { MonthKeyboardNav },
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
