<template>
  <div class="calendar-wrapper">
    <div :class="[loading, 'loading-overlay']">
      <div>
        Events Calendar
      </div>
      <div class="fade-in-out"><span class="small">loading...</span></div>
    </div>
    <template v-if="!loading">
      <div class="nav">
        <div class="year">{{ month.year }}</div>
        <div class="month">{{ month.name }}</div>
        <div>
          <router-link :to="prevMonth">
            Previous
          </router-link>
          <router-link :to="nextMonth">
            Next
          </router-link>
        </div>
      </div>
      <Month :weeks="month.weeks" />
    </template>
  </div>
</template>

<script>
import Month from '@/components/Month'
import { ref, computed, watch, reactive, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import {
  initCalendarAPI,
  setNextMonth,
  setPrevMonth,
  setParams,
} from '@/helpers'

const CALENDAR = 'Calendar'
const LOADING = 'loading'

export default {
  name: CALENDAR,
  components: { Month },
  setup() {
    let calendarApi

    const route = useRoute()
    const loading = ref(LOADING)
    const month = reactive({})

    const params = computed(() => setParams(route.params))

    const nextMonth = computed(() => ({
      name: CALENDAR,
      params: setNextMonth(params.value),
    }))

    const prevMonth = computed(() => ({
      name: CALENDAR,
      params: setPrevMonth(params.value),
    }))

    watch(params, async val =>
      setMonth(await calendarApi.getMonth(val.year, val.month))
    )

    onBeforeMount(async () => {
      calendarApi = await initCalendarAPI(route.query.count)
      setMonth(
        await calendarApi.getMonth(params.value.year, params.value.month)
      )
    })

    function setMonth({ year, weeks, name }) {
      month.year = year
      month.weeks = weeks
      month.name = name
      loading.value = ''
    }

    return { loading, month, nextMonth, prevMonth }
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
  flex-direction: column;
  font-size: 2.1rem;
  &.loading {
    display: flex;
  }
  .small {
    font-size: 1rem;
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
.fade-in-out {
  animation: fadeInOut 1.25s infinite;
}
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
