<template>
  <div class="w-full max-w-sm m-auto">
    <div class="flex justify-between items-center my-3">
      <div class="font-semibold">
        <span>{{ month.name }} {{ month.year }}</span>
      </div>
      <div class="flex">
        <button @click="getPrevMonth">
          Prev
        </button>
        <button @click="getNextMonth">
          Next
        </button>
      </div>
    </div>
    <div class="grid grid-cols-7">
      <div
        class="flex justify-center items-center h-8 w-8 text-xs text-gray-400"
        v-for="(DAY, i) in DAYS_OF_WEEK_SHORT"
        :key="i"
      >
        <div>{{ DAY }}</div>
      </div>
      <day
        v-for="day in month.days"
        :dayIsInView="dayInView?.timestamp === day?.timestamp"
        :dayOfMonth="day?.dayOfMonth"
        :isInCurrentMonth="day?.isInCurrentMonth"
        :timestamp="day?.timestamp"
        :key="day?.timestamp"
      />
    </div>
  </div>
</template>

<script>
import Day from '@/components/mini-month/Day'
import { computed } from 'vue'
import { DAYS_OF_WEEK_SHORT } from '@/constants'
import { useState, useCalendarApi, useDayInView } from '@/composables'
import compose from 'lodash.compose'

function parse(y, m) {
  if (y && m) return new Date(y, m)
  return Date.now()
}

export default {
  name: 'Month',
  components: { Day },
  setup() {
    const { findMonth } = useCalendarApi()

    const [month, setMonth] = useState({})

    const [dayInView] = useDayInView()

    const findSetMonth = compose(setMonth, findMonth, parse)

    const getNextMonth = computed(() => () =>
      findSetMonth(month.year, month.month + 1)
    )

    const getPrevMonth = computed(() => () =>
      findSetMonth(month.year, month.month - 1)
    )

    findSetMonth()

    return {
      DAYS_OF_WEEK_SHORT,
      dayInView,
      month,
      getNextMonth,
      getPrevMonth,
    }
  },
}
</script>