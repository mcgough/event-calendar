<template>
  <Suspense>
    <template #default>
      <div class="flex justify-space-between flex-nowrap">
        <side-panel>
          <mini-month />
          <div class="mt-12">
            <sub-view-anchor />
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
import SubViewAnchor from '@/components/SubViewAnchor'
import { computed } from 'vue'
import { useCalendarRoutes } from '@/composables'
import { ROUTE_NAME_CALENDAR, MONTH_SLUG, DAY, MONTH } from '@/constants'

export default {
  name: ROUTE_NAME_CALENDAR,
  components: { MiniMonth, Splash, SidePanel, SubViewAnchor },
}
</script>
