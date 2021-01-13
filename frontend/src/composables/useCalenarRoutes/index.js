import compose from 'lodash.compose'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  checkDay,
  checkMonth,
  formatParams,
  constructPath,
  formatRoute,
  getDayRoute,
  setKeyValue,
  setBasePath,
} from './helpers'

const constructDayViewPath = compose(
  constructPath,
  setKeyValue('hooks')(checkDay, checkMonth),
  setKeyValue('keys')('year', 'month', 'day'),
  setBasePath('d')
)()

const constructMonthViewPath = compose(
  constructPath,
  setKeyValue('hooks')(checkMonth),
  setKeyValue('keys')('year', 'month'),
  setBasePath('m')
)()

const constructDayRoute = compose(formatRoute('Sub-Day'), getDayRoute)

let route, router, initialized

export function useCalendarRoutes() {
  if (!initialized) {
    route = useRoute()
    router = useRouter()
    initialized = true
  }

  const params = computed(() => formatParams(route.params))

  return {
    constructDayRoute,
    constructDayViewPath,
    constructMonthViewPath,
    params,
    route,
    router,
  }
}
