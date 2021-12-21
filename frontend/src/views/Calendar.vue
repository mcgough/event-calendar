<template>
  <Suspense>
    <template #default>
      <div class="flex justify-space-between flex-nowrap">
        <side-panel>
          <mini-month />
        </side-panel>
        <div class="w-full">
          <router-view v-slot="{ Component, route }">
            <component :is="Component" :key="route.path" />
          </router-view>
        </div>
      </div>
    </template>
    <template #fallback>
      <splash />
    </template>
  </Suspense>
</template>

<script>
import MiniMonth from '@/components/mini-month/Month.vue'
import SidePanel from '@/components/SidePanel.vue'
import Splash from '@/components/Splash.vue'
import useCalendar from '@/store/useCalendar'
import { ROUTE_NAME_CALENDAR } from '@/constants'

export default {
  name: ROUTE_NAME_CALENDAR,
  components: {
    MiniMonth,
    SidePanel,
    Splash,
  },
  setup() {
    useCalendar().fetchSetEvents()
  },
}
</script>
