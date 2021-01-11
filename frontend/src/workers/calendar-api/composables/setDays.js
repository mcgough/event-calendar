import { Day } from '../day'
import { getDaysInMonth } from 'date-fns'

const NUMBER_OF_DAYS_IN_WEEK = 7

export function setPrevMonthDays({ startOfMonth, daysInMonth, y, m, ...data }) {
  const days = []

  const isInCurrentMonth = false

  let daysInPrevMonth = getDaysInMonth(new Date(y, m - 1)) - startOfMonth

  while (days.length < startOfMonth) {
    daysInPrevMonth++
    days.push(
      Day({ dayOfMonth: daysInPrevMonth, y, m: m - 1, isInCurrentMonth })
    )
  }

  return { ...data, days, startOfMonth, y, m, daysInMonth }
}

export function setCurrentMonthDays({ daysInMonth, days, ...data }) {
  const isInCurrentMonth = true

  let dayOfMonth = 0

  while (dayOfMonth++ < daysInMonth) {
    days.push(Day({ dayOfMonth, isInCurrentMonth, ...data }))
  }

  return { days, ...data }
}

export function setNextMonthDays({ days, y, m }) {
  if (days.length % NUMBER_OF_DAYS_IN_WEEK === 0) return days

  const isInCurrentMonth = false

  let dayOfNextMonth = 1

  while (days.length % NUMBER_OF_DAYS_IN_WEEK !== 0) {
    days.push(
      Day({ isInCurrentMonth, dayOfMonth: dayOfNextMonth, y, m: m + 1 })
    )
    dayOfNextMonth++
  }

  return days
}
