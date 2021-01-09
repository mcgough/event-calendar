<template>
  <div :class="['cell', 'day-of-month', isActive, hasEvents]">
    <div class="day">{{ dayOfMonth }}</div>
    <div v-if="eventCount">
      <div class="event-count">{{ eventCount }} events</div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { computed } from 'vue'

const ACTIVE = 'active'
const INACTIVE = 'inactive'
const EVENTS = 'events'

export default {
  props: { dayOfMonth: Number, eventCount: Number, dateStamp: Date },
  setup(props) {
    const isActive = computed(() => (props.dayOfMonth ? ACTIVE : INACTIVE))

    const hasEvents = computed(() => (props.eventCount ? EVENTS : ''))

    return { format, isActive, hasEvents }
  },
}
</script>

<style lang="scss" scoped>
.split-day {
  position: relative;
  height: 100%;
  width: 50%;
  &:first-of-type {
    border-right: 1px solid;
  }
}
.day-of-month {
  height: calc(76vh / 5);
  overflow-y: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
  .day {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
  }
  &.events {
    cursor: pointer;
    background: rgb(132, 87, 254);
    color: #fff;
    .events-wrapper {
      display: none;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      overflow-y: scroll;
    }
    .event-list {
      font-size: 0.5rem;
      li {
        margin-left: -1rem;
        margin-top: 0.5rem;
        text-align: left;
        .month-day-year {
          font-size: 0.25rem;
        }
      }
    }
    &:hover {
      .day,
      .event-count {
        display: none;
      }
      .events-wrapper {
        display: block;
      }
    }
  }
}
.inactive {
  background: rgba(0, 0, 0, 0.1);
}
</style>
