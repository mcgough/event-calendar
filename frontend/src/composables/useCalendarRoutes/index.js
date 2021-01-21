import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  formatParams,
  constructDayViewPath,
  constructMonthViewPath,
  constructPrevNextMonthViewPaths,
  constructPrevNextDayViewPaths,
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

  function watchRouteParams(cb) {
    return watch(params, cb)
  }

  function pushToRouter(route, key) {
    if (router) router.push(route.value[key])
  }

  return {
    constructDayViewPath,
    constructMonthViewPath,
    constructPrevNextMonthViewPaths,
    constructPrevNextDayViewPaths,
    params,
    pushToRouter,
    route,
    router,
    watchRouteParams,
    yearMonthDay,
  }
}
