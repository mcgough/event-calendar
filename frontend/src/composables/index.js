import { useState } from './useState'
import { useCalendarRoutes } from './useCalenarRoutes'
import { useCalendarApi } from './useCalendarApi'
import { useDayInView } from './useDayInView'

function loop(cb) {
  return function(list) {
    return list.forEach(cb)
  }
}

function pluckValue({ value }) {
  return value
}

export {
  loop,
  pluckValue,
  useCalendarApi,
  useCalendarRoutes,
  useDayInView,
  useState,
}
