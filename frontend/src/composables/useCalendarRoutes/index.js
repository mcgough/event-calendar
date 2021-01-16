import compose from 'lodash.flowright'
import { computed, watch } from 'vue'
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

  const yearMonthDay = computed(() => [
    params.value.year,
    params.value.month,
    params.value.day,
  ])

  function watchRouteParams(cb) {
    return watch(params, cb)
  }

  return {
    constructDayViewPath,
    constructMonthViewPath,
    params,
    route,
    router,
    watchRouteParams,
    yearMonthDay,
  }
}
