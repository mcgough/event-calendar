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
import { onMounted, watch } from 'vue'
import {
  useCalendarApi,
  useCalendarRoutes,
  useMonthInView,
  useDayInView,
} from '@/composables'
import { ROUTE_NAME_CALENDAR } from '@/constants'
import { useTotal, useHistory } from '@/store/count-store'

export default {
  name: ROUTE_NAME_CALENDAR,
  components: {
    MiniMonth,
    SidePanel,
    Splash,
  },
  setup() {
    const totalStore = useTotal()

    const historyStore = useHistory()

    watch(() => totalStore.total, console.log)

    watch(() => totalStore.changeCount, console.log)

    watch(() => historyStore.changeCount, console.log)

    totalStore.add(10)

    totalStore.minus(5)

    setTimeout(historyStore.reset, 5000)

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
