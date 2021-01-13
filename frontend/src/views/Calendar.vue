<template>
  <Suspense>
    <template #default>
      <div class="flex justify-space-between flex-nowrap">
        <side-panel>
          <mini-month />
          <div class="mt-12">
            <select @change="showSubView" class="border rounded-sm p-2">
              <option :value="dayViewPath">Day</option>
              <option :value="monthViewPath">Month</option>
            </select>
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
      router,
      params,
      constructDayViewPath,
      constructMonthViewPath,
    } = useCalendarRoutes()

    const dayViewPath = computed(() => constructDayViewPath(params.value))

    const monthViewPath = computed(() => constructMonthViewPath(params.value))

    function showSubView(event) {
      const path = event.target.value
      router.push({ path })
    }

    watch(params, ({ day, timestamp }) => {
      if (day && timestamp) setDayInView(calendar.findDay(timestamp))
    })

    return { dayViewPath, monthViewPath, showSubView }
  },
}
</script>
