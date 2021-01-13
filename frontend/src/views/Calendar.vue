<template>
  <Suspense>
    <template #default>
      <div class="flex justify-space-between flex-nowrap">
        <side-panel>
          <mini-month />
          <div>
            <router-link :to="dayViewPath">Day</router-link>
            <router-link :to="monthViewPath">Month</router-link>
          </div>
        </side-panel>
        <div class="w-full">
          <div class="mt-4">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </template>
    <template #fallback>
      <splash />
    </template>
  </Suspense>
</template>

<script>
import MiniMonth from '@/components/mini-month/Month'
import Splash from '@/components/Splash'
import SidePanel from '@/components/Side-Panel'
import { watch, computed } from 'vue'
import { useDayInView, useCalendarRoutes, useCalendarApi } from '@/composables'
import { ROUTE_NAME_CALENDAR } from '@/constants'

function setDay(handler) {
  return function(data) {}
}

export default {
  name: ROUTE_NAME_CALENDAR,
  components: { MiniMonth, Splash, SidePanel },
  setup() {
    const calendar = useCalendarApi()

    const [dayInView, setDayInView] = useDayInView()

    const {
      params,
      constructDayViewPath,
      constructMonthViewPath,
    } = useCalendarRoutes()

    const dayViewPath = computed(() => constructDayViewPath(params.value))

    const monthViewPath = computed(() => constructMonthViewPath(params.value))

    watch(params, ({ day, timestamp }) => {
      if (day && timestamp) setDayInView(calendar.findDay(timestamp))
    })

    return { dayViewPath, monthViewPath }
  },
}
</script>
