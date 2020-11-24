<template>
  <div>
    <div class="nav">
      <div class="year">{{ month.year }}</div>
      <div class="month">{{ month.name }}</div>
      <slot></slot>
    </div>
    <div :class="['calendar']">
      <div class="row days-of-week">
        <div
          v-for="label in DAYS_OF_WEEK"
          :key="label"
          class="cell day-of-week"
        >
          <div>{{ label }}</div>
        </div>
      </div>
      <div class="rows">
        <div v-for="(week, index) in month.weeks" :key="index" class="row">
          <Day
            v-for="day in week"
            :dateStamp="day.dateStamp"
            :dayOfMonth="day.dayOfMonth"
            :events="day.events"
            :key="day.dayOfMonth"
            @click="onDayClick(day)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Day from '@/components/Day'
import { watch } from 'vue'
import { DAYS_OF_WEEK } from '@/constants'
import { useCalendarRouter, useMonth, useCalendarApi } from '@/hooks'

export default {
  name: 'Month',
  components: { Day },
  async setup() {
    let api

    const { params, query, router } = useCalendarRouter()
    const [month, setMonth] = useMonth()

    watch(params, async val =>
      setMonth(await api.getMonth(val.year, val.month))
    )

    api = await useCalendarApi(query.count)

    setMonth(await api.getMonth(params.value.year, params.value.month))

    function onDayClick({ dayOfMonth, year, month }) {
      if (dayOfMonth) {
        router.push({
          path: `/${year}/${month + 1}/${dayOfMonth}`,
        })
      }
    }

    return { DAYS_OF_WEEK, month, onDayClick }
  },
}
</script>

<style lang="scss">
.calendar {
  height: 80vh;
}
.rows {
  border: 1px solid;
  border-top: 0;
  border-bottom: 0;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  &:last-of-type {
    border-bottom: 1px solid;
  }
}
.cell {
  position: relative;
  width: calc(100% / 7);
  height: 5vh;
  border: 1px solid;
  border-bottom: 0;
  border-left: 0;
  &.day-of-week {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    &:last-of-type {
      border-right: 1px solid;
    }
    &:first-of-type {
      border-left: 1px solid;
    }
  }
  &:last-of-type {
    border-right: 0;
  }
}
</style>
