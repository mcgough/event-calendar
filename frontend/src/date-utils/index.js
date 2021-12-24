import {
  getMonth,
  getYear,
  getWeekOfMonth,
  getDay,
  getDaysInMonth,
  startOfMonth,
  getWeeksInMonth,
  getDate,
} from 'date-fns'

export function parseDate(date) {
  return {
    y: getYear(date),
    m: getMonth(date),
    d: getDate(date),
    daysInMonth: getDaysInMonth(date),
    startOfMonth: getDay(startOfMonth(date)),
    weeksInMonth: getWeeksInMonth(date),
  }
}

export function convertToDate(...args) {
  if (!args.length) return Date.now()
  return new Date(...args)
}
