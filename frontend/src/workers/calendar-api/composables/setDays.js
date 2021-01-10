import { Day } from '../day'

const NUMBER_OF_DAYS_IN_WEEK = 7

export function initializeDays({ startOfMonth, ...data }) {
  const days = []

  while (days.length < startOfMonth) {
    days.push(null)
  }

  return { ...data, days, startOfMonth }
}

export function setActiveDays({ daysInMonth, days, ...data }) {
  let dayOfMonth = 0

  while (dayOfMonth++ < daysInMonth) {
    days.push(Day({ dayOfMonth, ...data }))
  }

  return days
}

export function setRemainingEmptyDays(days) {
  if (days.length % NUMBER_OF_DAYS_IN_WEEK === 0) return days

  while (days.length % NUMBER_OF_DAYS_IN_WEEK !== 0) {
    days.push(null)
  }

  return days
}
