import compose from 'lodash.flowright'
import { Day } from '../day'
import { getDaysInMonth } from 'date-fns'

export const setCalendarDays = compose(
  setNextMonthDays,
  setCurrentMonthDays,
  setPrevMonthDays
)

const NUMBER_OF_DAYS_IN_WEEK = 7

function setPrevMonthDays({ startOfMonth, daysInMonth, y, m, ...data }) {
  const days = []

  const isInCurrentMonth = false

  let prevMonthDayOfMonth = getDaysInMonth(new Date(y, m - 1)) - startOfMonth

  while (days.length < startOfMonth) {
    prevMonthDayOfMonth++
    days.push(
      Day({ y, isInCurrentMonth, m: m - 1, dayOfMonth: prevMonthDayOfMonth })
    )
  }

  return { ...data, days, startOfMonth, y, m, daysInMonth }
}

function setCurrentMonthDays({ daysInMonth, days, ...data }) {
  const isInCurrentMonth = true

  let dayOfMonth = 0

  while (dayOfMonth++ < daysInMonth) {
    days.push(Day({ dayOfMonth, isInCurrentMonth, ...data }))
  }

  return { days, ...data }
}

function setNextMonthDays({ days, y, m }) {
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
