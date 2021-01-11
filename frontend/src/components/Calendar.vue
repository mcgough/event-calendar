<template>
  <Suspense>
    <template #default>
      <div class="flex justify-space-between flex-nowrap">
        <div class="w-1/3 min-w-max">
          <month />
        </div>
        <div class="w-full">
          {{ dayInView }}
        </div>
      </div>
    </template>
    <template #fallback>
      <splash />
    </template>
  </Suspense>
</template>

<script>
import Month from '@/components/Month'
import Splash from '@/components/Splash'
import { watch, toRefs } from 'vue'
import { useDayInView, useCalendarRoutes, useCalendarApi } from '@/composables'
import { ROUTE_NAME_CALENDAR } from '@/constants'

export default {
  name: ROUTE_NAME_CALENDAR,
  components: { Month, Splash },
  setup() {
    const calendar = useCalendarApi()

    const [dayInView, setDayInView] = useDayInView()

    const { params } = useCalendarRoutes()

    watch(params, ({ day, timestamp }) => {
      if (day && timestamp) {
        setDayInView(calendar.findDay(timestamp))
      }
    })

    return { dayInView }
  },
}
</script>
