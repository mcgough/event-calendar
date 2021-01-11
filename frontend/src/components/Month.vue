<template>
  <div class="w-full max-w-sm m-auto">
    <div class="flex justify-between items-center my-3">
      <div class="font-semibold">
        <span class="month">{{ month.name }} {{ month.year }}</span>
      </div>
      <div>
        <router-link :to="prevMonth">
          Previous
        </router-link>
        <router-link :to="nextMonth">
          Next
        </router-link>
      </div>
    </div>
    <div class="grid grid-cols-7">
      <div
        class="flex justify-center items-center h-8 w-12 text-gray-400"
        v-for="(DAY, i) in DAYS_OF_WEEK_SHORT"
        :key="i"
      >
        <div>{{ DAY }}</div>
      </div>
      <day
        v-for="day in month.days"
        :dayOfMonth="day?.dayOfMonth"
        :eventCount="day?.eventCount()"
        :isInCurrentMonth="day?.isInCurrentMonth"
        :timestamp="day?.timestamp"
        :key="day?.timestamp"
      />
    </div>
  </div>
</template>

<script>
import Day from '@/components/Day'
import { watch } from 'vue'
import { DAYS_OF_WEEK_SHORT } from '@/constants'
import {
  useCalendarRoutes,
  useState,
  useCalendarApi,
  useDayInView,
} from '@/composables'

export default {
  name: 'Month',
  components: { Day },
  setup() {
    const calendar = useCalendarApi()

    const { params, prevMonth, nextMonth } = useCalendarRoutes()

    const [month, setMonth] = useState({})

    const [dayInView, setDayInView] = useDayInView()

    watch(params, async val => setMonth(calendar.findMonth(val.timestamp)))

    setMonth(calendar.findMonth(params.value.timestamp))

    return {
      DAYS_OF_WEEK_SHORT,
      month,
      nextMonth,
      prevMonth,
    }
  },
}
</script>
