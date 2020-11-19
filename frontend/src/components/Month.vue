<template>
  <div :class="['calendar']">
    <div class="row days-of-week">
      <div v-for="label in DAYS_OF_WEEK" :key="label" class="cell day-of-week">
        <div>{{ label }}</div>
      </div>
    </div>
    <div class="rows">
      <div v-for="(week, index) in weeks" :key="index" class="row">
        <Day
          :dayOfMonth="day.dayOfMonth"
          :events="day.events"
          v-for="(day, index) in week"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Day from '@/components/Day'
import { DAYS_OF_WEEK } from '@/constants'

export default {
  name: 'Month',
  components: { Day },
  props: { weeks: Array },
  setup() {
    return { DAYS_OF_WEEK }
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
