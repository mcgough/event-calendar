import { useCalendarRoutes } from './useCalendarRoutes/index'
import { useDayStyles } from './useDayStyles'
import { useMouseWheel } from './useMouseWheel'

function filter(condition) {
  return function (list) {
    return function () {
      return [...list].filter(condition)
    }
  }
}

function loop(cb) {
  return function (list) {
    list.forEach(cb)
    return list
  }
}

function pluckValue({ value }) {
  return value
}

export {
  filter,
  loop,
  pluckValue,
  useCalendarRoutes,
  useDayStyles,
  useMouseWheel,
}
