<template>
  <div class="w-full max-w-sm m-auto" v-if="month.days?.length">
    <div class="flex justify-between items-center my-3">
      <div class="font-semibold">
        <span>{{ month.name }} {{ month.year }}</span>
      </div>
      <div class="flex">
        <button @click="getPrevMonth">Prev</button>
        <button @click="getNextMonth">Next</button>
      </div>
    </div>
    <div
      class="grid grid-cols-7"
      v-month-keyboard-nav="{
        prev: getPrevMonth,
        next: getNextMonth,
      }"
    >
      <days-of-week length="short" />
      <day
        v-for="(day, i) in month.days"
        :dayIsInView="dayInView?.timestamp === day?.timestamp"
        :day="day"
        :key="day?.timestamp"
        :index="i"
      />
    </div>
  </div>
</template>

<script>
import Day from '@/components/mini-month/Day.vue'
import DaysOfWeek from '@/components/DaysOfWeek.vue'
import compose from 'lodash.flowright'
import { computed, onMounted } from 'vue'
import { MonthKeyboardNav } from '@/directives'
import {
  useState,
  useCalendarApi,
  useDayInView,
  useCalendarRoutes,
} from '@/composables'
import { convertToDate } from '@/date-utils'

export default {
  components: { Day, DaysOfWeek },
  directives: { MonthKeyboardNav },
  name: 'Mini-Month',
  setup() {
    const { findMonth } = useCalendarApi()
    const [month, setMonth] = useState({})
    const [dayInView] = useDayInView()
    const { watchRouteParams, params } = useCalendarRoutes()

    const findSetMonth = compose(setMonth, findMonth, convertToDate)

    const getNextMonth = computed(() => () =>
      findSetMonth(month.year, month.month + 1)
    )

    const getPrevMonth = computed(() => () =>
      findSetMonth(month.year, month.month - 1)
    )

    watchRouteParams(() => findSetMonth(params.value.year, params.value.month))

    onMounted(findSetMonth)

    return {
      dayInView,
      month,
      getNextMonth,
      getPrevMonth,
    }
  },
}
</script>
