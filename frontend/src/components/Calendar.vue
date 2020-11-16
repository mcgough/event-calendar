<template>
  <div class="calendar-wrapper">
    <div :class="[loading, 'loading-overlay']">Events Calendar</div>
    <template v-if="!loading">
      <div class="nav">
        <div class="year">{{ calendar.year }}</div>
        <div class="month">{{ calendar.month }}</div>
        <div>
          <router-link
            :to="{
              name: 'Calendar',
              params: prevParams,
            }"
          >
            Previous
          </router-link>
          <router-link
            :to="{
              name: 'Calendar',
              params: nextParams,
            }"
          >
            Next
          </router-link>
        </div>
      </div>
      <div :class="['calendar']">
        <div class="row days-of-week">
          <div
            v-for="dayName in daysOfWeek"
            :key="dayName"
            class="cell day-of-week"
          >
            <div>{{ dayName }}</div>
          </div>
        </div>
        <div class="rows">
          <div v-for="(week, index) in calendar.weeks" :key="index" class="row">
            <Day :details="day" v-for="(day, index) in week" :key="index" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Day from '@/components/Day'
import * as Comlink from 'comlink'
import Worker from '@/workers/calendar-api.worker.js'
import { DAYS_OF_WEEK } from '@/constants'

export default {
  name: 'Calendar',
  components: { Day },
  data: () => ({
    daysOfWeek: DAYS_OF_WEEK,
    calendar: {},
    loading: 'loading',
    calendarAPI: undefined,
  }),
  // TODO: Move init out of created
  async created() {
    await this.initAPICalendar()
  },
  watch: {
    month() {
      this.setCalendar()
    },
  },
  computed: {
    year() {
      return parseInt(this.$route.params.year)
    },
    month() {
      return this.$route.params.month - 1
    },
    nextParams() {
      const isLastMonth = this.month === 11
      const month = isLastMonth ? 1 : this.month + 2
      const year = isLastMonth ? parseInt(this.year) + 1 : this.year
      return {
        year,
        month,
      }
    },
    prevParams() {
      const isFirstMonth = this.month === 0
      const month = isFirstMonth ? 12 : this.month
      const year = isFirstMonth ? parseInt(this.year) - 1 : this.year
      return {
        year,
        month,
      }
    },
  },
  methods: {
    async initAPICalendar() {
      const CalendarAPI = new Comlink.wrap(new Worker())
      this.calendarAPI = await new CalendarAPI()
      await this.calendarAPI.init()
      await this.setCalendar()
    },
    async setCalendar() {
      this.calendar = await this.calendarAPI.getMonth(this.year, this.month)
      this.loading = ''
    },
  },
}
</script>

<style lang="scss">
.loading-overlay {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-size: 2.1rem;
  &.loading {
    display: flex;
  }
}
a {
  margin: 0.25rem;
}
.nav {
  height: 12vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
}
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
