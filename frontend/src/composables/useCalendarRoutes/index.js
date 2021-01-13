import compose from 'lodash.compose'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  checkDay,
  checkMonth,
  formatParams,
  constructPath,
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
  setKeyValue('keys')('year', 'month', 'day'),
  setBasePath('m')
)()

let route, router

export function useCalendarRoutes() {
  if (!route || !router) {
    route = useRoute()
    router = useRouter()
  }

  const params = computed(() => formatParams(route.params))

  return {
    constructDayViewPath,
    constructMonthViewPath,
    params,
    route,
    router,
  }
}
