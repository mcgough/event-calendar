import { useState } from './useState'
import { useCalendarRoutes } from './useCalendarRoutes/index'
import { useCalendarApi } from './useCalendarApi'
import { useDayInView } from './useDayInView'
import { useDayStyles } from './useDayStyles'
import { useMonthInView } from './useMonthInView'
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
  useCalendarApi,
  useCalendarRoutes,
  useDayInView,
  useDayStyles,
  useMonthInView,
  useMouseWheel,
  useState,
}
