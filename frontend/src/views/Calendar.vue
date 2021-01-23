<template>
  <Suspense>
    <template #default>
      <div class="flex justify-space-between flex-nowrap">
        <side-panel>
          <mini-month />
        </side-panel>
        <div class="w-full">
          <div class="mt-4">
            <router-view v-slot="{ Component }">
              <component :is="Component" />
            </router-view>
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
import MiniMonth from '@/components/mini-month/Month.vue'
import SidePanel from '@/components/SidePanel.vue'
import Splash from '@/components/Splash.vue'
import { computed, reactive, ref } from 'vue'
import { useCalendarApi } from '@/composables'
import { ROUTE_NAME_CALENDAR, MONTH_SLUG, DAY, MONTH } from '@/constants'

export default {
  name: ROUTE_NAME_CALENDAR,
  components: {
    MiniMonth,
    SidePanel,
    Splash,
  },
  setup() {
    const calendar = useCalendarApi()

    calendar.fetchSetEvents()
  },
}
</script>
