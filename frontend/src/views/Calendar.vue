<template>
  <Suspense>
    <template #default>
      <div class="flex justify-space-between flex-nowrap">
        <side-panel>
          <mini-month />
          <div class="mt-16">
            <v-button>
              <sub-view-anchor />
            </v-button>
            <div class="mt-4 mb-4"></div>
            <v-button>
              <today-anchor />
            </v-button>
          </div>
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
import Splash from '@/components/Splash.vue'
import SidePanel from '@/components/SidePanel.vue'
import SubViewAnchor from '@/components/SubViewAnchor.vue'
import TodayAnchor from '@/components/TodayAnchor.vue'
import VButton from '@/components/Button.vue'
import { computed } from 'vue'
import { useCalendarApi } from '@/composables'
import { ROUTE_NAME_CALENDAR, MONTH_SLUG, DAY, MONTH } from '@/constants'

export default {
  name: ROUTE_NAME_CALENDAR,
  components: {
    MiniMonth,
    Splash,
    SidePanel,
    SubViewAnchor,
    TodayAnchor,
    VButton,
  },
  setup() {
    const calendar = useCalendarApi()

    calendar.fetchSetEvents()
  },
}
</script>
