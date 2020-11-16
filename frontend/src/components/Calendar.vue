<template>
  <div class="calendar-wrapper">
    <div :class="[loading, 'loading-overlay']">Events Calendar</div>
    <template v-if="!loading">
      <div class="nav">
        <div class="year">{{ month.year }}</div>
        <div class="month">{{ month.name }}</div>
        <div>
          <router-link
            :to="{
              name: 'Calendar',
              params: prev,
            }"
          >
            Previous
          </router-link>
          <router-link
            :to="{
              name: 'Calendar',
              params: next,
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
          <div v-for="(week, index) in month.weeks" :key="index" class="row">
            <Day :details="day" v-for="(day, index) in week" :key="index" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import * as Comlink from 'comlink'
import Worker from '@/workers/calendar-api.worker.js'
import Day from '@/components/Day'
import { DAYS_OF_WEEK } from '@/constants'

export default {
  name: 'Calendar',
  components: { Day },
  data: () => ({
    daysOfWeek: DAYS_OF_WEEK,
    month: {},
    loading: 'loading',
    calendarAPI: undefined,
  }),
  // TODO: Move API initialization out of created
  async created() {
    await this.initCalendarAPI()
  },
  watch: {
    monthIndex() {
      this.setMonth()
    },
  },
  computed: {
    monthIndex() {
      return this.$route.params.month - 1
    },
    params() {
      return { year: parseInt(this.$route.params.year), month: this.monthIndex }
    },
    next() {
      const isLastMonth = this.params.month === 11
      const month = isLastMonth ? 1 : this.params.month + 2
      const year = isLastMonth ? this.params.year + 1 : this.params.year
      return {
        year,
        month,
      }
    },
    prev() {
      const isFirstMonth = this.params.month === 0
      const month = isFirstMonth ? 12 : this.params.month
      const year = isFirstMonth ? this.params.year - 1 : this.params.year
      return {
        year,
        month,
      }
    },
  },
  methods: {
    async initCalendarAPI() {
      const CalendarAPI = new Comlink.wrap(new Worker())
      this.calendarAPI = await new CalendarAPI()
      await this.calendarAPI.loadAllEvents()
      await this.setMonth()
    },
    async setMonth() {
      this.month = await this.calendarAPI.getMonth(
        this.params.year,
        this.params.month
      )
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
