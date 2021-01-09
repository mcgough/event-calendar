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
    d: getDay(date),
    dayOfMonth: getDate(date),
    daysInMonth: getDaysInMonth(date),
    startOfMonth: getDay(startOfMonth(date)),
    weeksInMonth: getWeeksInMonth(date),
    weekOfMonth: getWeekOfMonth(date),
    timestamp: date,
  }
}
