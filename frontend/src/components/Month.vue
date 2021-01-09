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
          class="cell day-of-week flex justify-center items-center"
          v-for="label in DAYS_OF_WEEK"
          :key="label"
        >
          <div>{{ label }}</div>
        </div>
      </div>
      <div class="row flex-wrap">
        <Day
          v-for="(day, i) in month.days"
          :dayOfMonth="day?.dayOfMonth"
          :eventCount="day?.eventCount()"
          :key="i"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Day from '@/components/Day'
import { watch } from 'vue'
import { DAYS_OF_WEEK } from '@/constants'
import { useParams, useState, useCalendarApi } from '@/hooks'

export default {
  name: 'Month',
  components: { Day },
  async setup() {
    let api

    const { params, query } = useParams()
    const [month, setMonth] = useState({})

    watch(params, async val => setMonth(await api.findMonth(val.timestamp)))

    api = await useCalendarApi()

    setMonth(await api.findMonth(params.value.timestamp))

    await api.fetchSetEvents()

    return { DAYS_OF_WEEK, month }
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
