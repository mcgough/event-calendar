import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  formatParams,
  buildPathWithBase,
  constructDayViewPath,
  constructMonthViewPath,
  constructYearViewPath,
  constructPrevNextDayViewPaths,
  constructPrevNextMonthViewPaths,
  constructPrevNextYearViewPaths,
} from './helpers'

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

  function watchRouteParams(cb, options = {}) {
    return watch(params, cb, options)
  }

  function pushToRouter(route, key) {
    if (router) router.push(route.value[key])
  }

  return {
    buildPathWithBase,
    constructDayViewPath,
    constructMonthViewPath,
    constructYearViewPath,
    constructPrevNextDayViewPaths,
    constructPrevNextMonthViewPaths,
    constructPrevNextYearViewPaths,
    params,
    pushToRouter,
    route,
    router,
    watchRouteParams,
    yearMonthDay,
  }
}
