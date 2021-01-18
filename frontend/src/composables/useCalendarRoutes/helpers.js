import compose from 'lodash.flowright'
import { isLastDayOfMonth } from 'date-fns'

export function formatParams({ year, month, day }) {
  const parsedYear = parseInt(year)
  const parsedMonth = parseInt(month) - 1
  const parsedDay = parseInt(day)
  const timestamp = new Date(parsedYear, parsedMonth, day || 1)
  return {
    timestamp,
    year: parsedYear,
    month: parsedMonth,
    day: parsedDay,
  }
}

export function setBasePath(basePath) {
  return function () {
    return { basePath: `/${basePath}` }
  }
}

export function setKeyValue(key) {
  return function () {
    const value = [...arguments]
    return function (data) {
      return { [key]: value, ...data }
    }
  }
}

export function constructPath({ keys, basePath, hooks }) {
  return function (params) {
    const values = hooks && hooks.length ? compose(...hooks)(params) : params
    return keys.reduce((path, key) => `${path}/${values[key]}`, basePath)
  }
}

export function checkDay({ day, ...data }) {
  return { day: day || 1, ...data }
}

export function checkMonth({ month, ...data }) {
  return { month: month + 1, ...data }
}

export function setPrevMonthYearDay(data) {
  const isJanuary = data.month < 1
  const month = isJanuary ? 12 : data.month - 1
  const year = isJanuary ? data.year - 1 : data.year
  return { ...data, month, year, day: 1 }
}

export function setNextMonthYearDay(data) {
  const isDecember = data.month > 12
  const month = isDecember + 1 === 13 ? 1 : data.month + 2
  const year = isDecember + 1 === 13 ? data.year + 1 : data.year
  return { ...data, month, year, day: 1 }
}

export function setPrevDay({ year, month, ...data }) {
  const isLastDay = isLastDayOfMonth(new Date(year, month, data.day))
  const day = isLastDay ? 30 : data.day - 1
  return { ...data, year, month, day }
}

export function setNextDay({ year, month, ...data }) {
  const isLastDay = isLastDayOfMonth(new Date(year, month, data.day))
  const day = isLastDay ? 30 : data.day + 1
  return { ...data, year, month, day }
}
