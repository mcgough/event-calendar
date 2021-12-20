<template>
  <div class="w-full max-w-sm m-auto" v-if="month.days?.length">
    <div class="flex justify-between items-center my-3">
      <div class="font-semibold ml-2">
        <span>{{ month.name }} {{ month.year }}</span>
      </div>
      <div class="flex mr-2">
        <button
          @click="getPrevMonth"
          class="
            w-6
            h-6
            hover:bg-gray-100
            rounded-full
            flex
            items-center
            justify-center
            focus:outline-none focus:ring-1
          "
        >
          <svg
            class="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          @click="getNextMonth"
          class="
            w-6
            h-6
            hover:bg-gray-100
            rounded-full
            flex
            items-center
            justify-center
            focus:outline-none focus:ring-1
          "
        >
          <svg
            class="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
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
import { computed, ref, watch } from 'vue'
import Day from '@/components/mini-month/Day.vue'
import DaysOfWeek from '@/components/DaysOfWeek.vue'
import { MonthKeyboardNav } from '@/directives'
import useSelectedDate from '@/store/useSelectedDate'
import useCalendar from '@/store/useCalendar'

export default {
  components: { Day, DaysOfWeek },
  directives: { MonthKeyboardNav },
  name: 'Mini-Month',
  setup() {
    const calendar = useCalendar()

    const selectedDate = useSelectedDate()

    const dayInView = computed(() => selectedDate.day)

    const month = ref()

    const setMonth = (val) => (month.value = val)

    const getNextMonth = () =>
      setMonth(
        calendar.findMonth(new Date(month.value.year, month.value.month + 1))
      )

    const getPrevMonth = () =>
      setMonth(
        calendar.findMonth(new Date(month.value.year, month.value.month - 1))
      )

    watch(() => selectedDate.month, setMonth)

    setMonth(selectedDate.month)

    return {
      dayInView,
      month,
      getNextMonth,
      getPrevMonth,
    }
  },
}
</script>
