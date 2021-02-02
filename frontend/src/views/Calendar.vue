<template>
  <Suspense>
    <template #default>
      <div class="flex justify-space-between flex-nowrap">
        <side-panel>
          <mini-month />
        </side-panel>
        <div class="w-full">
          <router-view v-slot="{ Component }">
            <component :is="Component" />
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
import { computed, onMounted, reactive, ref } from 'vue'
import {
  useCalendarApi,
  useCalendarRoutes,
  useMonthInView,
  useDayInView,
} from '@/composables'
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

    const { watchRouteParams, yearMonthDay } = useCalendarRoutes()

    const [month, _m, findSetMonth] = useMonthInView()

    const [dayInView, _d, findSetDay] = useDayInView()

    const setDayMonthInView = () => (
      findSetMonth(calendar.findMonth)(...yearMonthDay.value),
      findSetDay(calendar.findDay)(...yearMonthDay.value)
    )

    watchRouteParams(setDayMonthInView)

    onMounted(setDayMonthInView)

    calendar.fetchSetEvents()
  },
}
</script>
