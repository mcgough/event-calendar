<template>
  <Suspense>
    <template #default>
      <div class="flex justify-space-between flex-nowrap">
        <side-panel>
          <mini-month />
          <div class="mt-12">
            <select @change="pushSubViewPath" class="border rounded-sm p-2">
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
import SidePanel from '@/components/SidePanel'
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'
import { ROUTE_NAME_CALENDAR } from '@/constants'

export default {
  name: ROUTE_NAME_CALENDAR,
  components: { MiniMonth, Splash, SidePanel },
  setup() {
    const {
      router,
      params,
      constructDayViewPath,
      constructMonthViewPath,
    } = useCalendarRoutes()

    const pushSubViewPath = event => router.push({ path: event.target.value })

    const dayViewPath = computed(() => constructDayViewPath(params.value))

    const monthViewPath = computed(() => constructMonthViewPath(params.value))

    return { dayViewPath, monthViewPath, pushSubViewPath }
  },
}
</script>
