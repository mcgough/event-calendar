<template>
  <div
    :class="['cell', 'day-of-month', isActive, hasEvents, today]"
    @click="showDetails"
  >
    <div class="day">{{ dayOfMonth }}</div>
    <div v-if="eventCount">
      <div class="event-count">{{ eventCount }} events</div>
    </div>
    <div class="events-wrapper">
      <ul class="event-list">
        <li v-for="event in events" :key="event.id" class="event">
          <div>
            {{ format(event.when.start_time, 'p') }} -
            {{ format(event.when.end_time, 'p') }}
          </div>
          <div>{{ event.title }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { format, isToday } from 'date-fns'
import { computed } from 'vue'
import { useCalendarApi, useDay } from '@/hooks'

const ACTIVE = 'active'
const INACTIVE = 'inactive'
const EVENTS = 'events'
const IS_TODAY = 'is-today'

export default {
  props: {
    dayOfMonth: Number,
    events: Array,
    dateStamp: Date,
  },
  setup(props) {
    let api

    const [_, setDay] = useDay()

    const eventCount = computed(() => (props.events ? props.events.length : 0))

    const isActive = computed(() => (props.dayOfMonth ? ACTIVE : INACTIVE))
    const hasEvents = computed(() => (eventCount.value ? EVENTS : ''))
    const today = computed(() => (isToday(props.dateStamp) ? IS_TODAY : ''))

    async function showDetails() {
      if (!api) api = await useCalendarApi()

      if (props.dateStamp) {
        setDay(await api.getDay(new Date(props.dateStamp)))
      }
    }

    return { format, isActive, eventCount, hasEvents, showDetails, today }
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
  &.is-today {
    background: rgba(132, 87, 254, 0.25);
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
