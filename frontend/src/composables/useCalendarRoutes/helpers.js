import compose from 'lodash.flowright'
import { parseDate } from '@/date-utils'
import {
  addDays,
  subDays,
  isLastDayOfMonth,
  isFirstDayOfMonth,
  getDaysInMonth,
} from 'date-fns'
import { MONTH_SLUG, DAY_SLUG, WEEK_SLUG, YEAR_SLUG } from '@/constants'

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
      return {
        ...data,
        [key]: value,
      }
    }
  }
}

export function constructPath({ keys, basePath, hooks }) {
  return function (params) {
    const values = hooks && hooks.length ? compose(...hooks)(params) : params
    return keys.reduce((path, key) => `${path}/${values[key]}`, basePath)
  }
}

export function setDay({ day, ...data }) {
  return {
    ...data,
    day: day || 1,
  }
}

export function setMonth({ month, ...data }) {
  return {
    ...data,
    month: month + 1,
  }
}

export function setPrevMonthYear(data) {
  const isJanuary = data.month < 1

  let month = data.month - 1

  let year = data.year

  if (isJanuary) month = 12

  if (isJanuary) year -= 1

  return { ...data, month, year }
}

export function setNextMonthYear(data) {
  const isDecember = data.month === 11

  let month = data.month + 2

  let year = data.year

  if (isDecember) month = 1

  if (isDecember) year += 1

  return { ...data, month, year }
}

export function setPrevYear({ timestamp, ...data }) {
  return {
    ...data,
    month: data.month + 1,
    year: data.year - 1,
  }
}

export function setNextYear({ timestamp, ...data }) {
  return {
    ...data,
    month: data.month + 1,
    year: data.year + 1,
  }
}

export function setPrevDay({ timestamp, ...data }) {
  const isFirstDay = isFirstDayOfMonth(timestamp)

  let day = data.day - 1

  if (isFirstDay) day = getDaysInMonth(timestamp - 24 * 60 * 60 * 1000)

  return { ...data, day, timestamp }
}

export function setNextDay({ timestamp, ...data }) {
  const isLastDay = isLastDayOfMonth(timestamp)

  let day = data.day + 1

  if (isLastDay) day = 1

  return { ...data, day, timestamp }
}

export function setNextDayMonth({ timestamp, ...data }) {
  const isLastDay = isLastDayOfMonth(timestamp)

  let month = data.month + 1

  if (isLastDay) month += 1

  if (month > 11) month = 1

  return { ...data, month, timestamp }
}

export function setPrevDayMonth({ timestamp, ...data }) {
  const isFirstDay = isFirstDayOfMonth(timestamp)

  let month = data.month + 1

  if (isFirstDay) month -= 1

  if (month < 1) month = 12

  return { ...data, month, timestamp }
}

export function setPrevDayYear({ timestamp, ...data }) {
  const isFirstDay = isFirstDayOfMonth(timestamp)

  let year = data.year

  if (isFirstDay && data.month === 0) year -= 1

  return { ...data, timestamp, year }
}

export function setNextDayYear({ timestamp, ...data }) {
  const isLastDay = isLastDayOfMonth(timestamp)

  let year = data.year

  if (isLastDay && data.month === 11) year += 1

  return { ...data, timestamp, year }
}

export function setDayExplicit(day = 1) {
  return function (data) {
    return {
      day,
      ...data,
    }
  }
}

export function setWeekAway(method) {
  return function (data) {
    const timestamp = method(data.timestamp, 7)
    const { y, m, d } = parseDate(timestamp)
    return {
      year: y,
      month: m,
      day: d,
      timestamp,
    }
  }
}

function constructPathBase(slug) {
  return function (...hooks) {
    return [
      constructPath,
      setKeyValue('hooks')(...hooks),
      setKeyValue('keys')('year', 'month', 'day'),
      setBasePath(slug),
    ]
  }
}

export function constructPrevNextYearViewPaths(data) {
  return {
    prev: compose(...constructPathBase(YEAR_SLUG)(setPrevYear))()(data),
    next: compose(...constructPathBase(YEAR_SLUG)(setNextYear))()(data),
  }
}

export function constructPrevNextMonthViewPaths(data) {
  return {
    prev: compose(
      ...constructPathBase(MONTH_SLUG)(setDayExplicit(1), setPrevMonthYear)
    )()(data),
    next: compose(
      ...constructPathBase(MONTH_SLUG)(setDayExplicit(1), setNextMonthYear)
    )()(data),
  }
}

export function constructPrevNextWeekViewPaths(data) {
  return {
    prev: compose(
      ...constructPathBase(WEEK_SLUG)(
        setPrevDay,
        setPrevDayMonth,
        setPrevDayYear,
        setWeekAway(subDays)
      )
    )()(data),
    next: compose(
      ...constructPathBase(WEEK_SLUG)(
        setNextDay,
        setNextDayMonth,
        setNextDayYear,
        setWeekAway(addDays)
      )
    )()(data),
  }
}

export function constructPrevNextDayViewPaths(data) {
  return {
    prev: compose(
      ...constructPathBase(DAY_SLUG)(
        setPrevDay,
        setPrevDayMonth,
        setPrevDayYear
      )
    )()(data),
    next: compose(
      ...constructPathBase(DAY_SLUG)(
        setNextDay,
        setNextDayMonth,
        setNextDayYear
      )
    )()(data),
  }
}

export const constructDayViewPath = compose(
  ...constructPathBase(DAY_SLUG)(setDay, setMonth)
)()

export const constructWeekViewPath = compose(
  ...constructPathBase(WEEK_SLUG)(setDay, setMonth)
)()

export const constructMonthViewPath = compose(
  ...constructPathBase(MONTH_SLUG)(setMonth)
)()

export const constructYearViewPath = compose(
  ...constructPathBase(YEAR_SLUG)(setDay, setMonth)
)()

export function buildPathWithBase(base, params) {
  return compose(...constructPathBase(base)(setDay, setMonth))()(params)
}
