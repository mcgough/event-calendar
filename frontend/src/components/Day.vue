<template>
  <div :class="['cell', 'day-of-month', isActive, hasEvents]">
    <template v-if="isSplitDay">
      <div v-for="(day, index) in details" :key="index" class="split-day">
        <div class="day">{{ day.dayOfMonth }}</div>
      </div>
    </template>
    <template v-else>
      <div class="day">{{ details.dayOfMonth }}</div>
      <div v-if="eventCount">
        <div class="event-count">{{ eventCount }} events</div>
      </div>
      <div class="events-wrapper">
        <ul class="event-list">
          <li v-for="event in details.events" :key="event.id" class="event">
            <div>
              {{ event.when.start_time | formatted }} -
              {{ event.when.end_time | formatted }}
            </div>
            <div>{{ event.title }}</div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: ['details'],
  filters: {
    formatted(val) {
      return format(val, 'p')
    },
  },
  computed: {
    isSplitDay() {
      return Array.isArray(this.details)
    },
    isActive() {
      const isDay = this.details.dayOfMonth
      return this.isSplitDay || isDay ? 'active' : 'inactive'
    },
    eventCount() {
      return this.details.events ? this.details.events.length : 0
    },
    hasEvents() {
      return this.eventCount ? 'events' : ''
    },
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
    border-top: 1px solid rgb(132, 87, 254);
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
