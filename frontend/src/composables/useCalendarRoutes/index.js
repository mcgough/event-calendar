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
import { MONTH_SLUG, DAY_SLUG } from '@/constants'

const constructDayViewPath = compose(
  constructPath,
  setKeyValue('hooks')(checkDay, checkMonth),
  setKeyValue('keys')('year', 'month', 'day'),
  setBasePath(DAY_SLUG)
)()

const constructMonthViewPath = compose(
  constructPath,
  setKeyValue('hooks')(checkMonth),
  setKeyValue('keys')('year', 'month', 'day'),
  setBasePath(MONTH_SLUG)
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
