<template>
  <div class="calendar-wrapper">
    <div :class="[loading, 'loading-overlay']">Events Calendar</div>
    <template v-if="!loading">
      <div class="nav">
        <div class="year">{{ month.year }}</div>
        <div class="month">{{ month.name }}</div>
        <div>
          <router-link :to="prev">
            Previous
          </router-link>
          <router-link :to="next">
            Next
          </router-link>
        </div>
      </div>
      <Month :weeks="month.weeks" />
    </template>
  </div>
</template>

<script>
import * as Comlink from 'comlink'
import Worker from '@/workers/calendar-api.worker.js'
import Month from '@/components/Month'

export default {
  name: 'Calendar',
  components: { Month },
  data: () => ({
    calendarAPI: undefined,
    loading: 'loading',
    month: {},
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
        name: 'Calendar',
        params: {
          year,
          month,
        },
      }
    },
    prev() {
      const isFirstMonth = this.params.month === 0
      const month = isFirstMonth ? 12 : this.params.month
      const year = isFirstMonth ? this.params.year - 1 : this.params.year
      return {
        name: 'Calendar',
        params: { year, month },
      }
    },
  },
  methods: {
    async initCalendarAPI() {
      const CalendarAPI = new Comlink.wrap(new Worker())
      this.calendarAPI = await new CalendarAPI()
      await this.calendarAPI.loadAllEvents(this.$route.query.count)
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
  justify-content: center;
  padding: 0.5rem;
  position: relative;
  .year {
    font-size: 3rem;
    position: absolute;
    left: 0;
  }
  .month {
    font-size: 1.8rem;
  }
}
</style>
