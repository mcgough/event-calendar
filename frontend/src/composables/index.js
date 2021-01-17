import { useState } from './useState'
import { useCalendarRoutes } from './useCalendarRoutes/index'
import { useCalendarApi } from './useCalendarApi'
import { useDayInView } from './useDayInView'
import { useDayStyles } from './useDayStyles'
import { useMonthInView } from './useMonthInView'

function loop(cb) {
  return function (list) {
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
  useDayStyles,
  useMonthInView,
  useState,
}
