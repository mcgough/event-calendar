import compose from 'lodash.compose'
import { Day } from '../day'

const NUMBER_OF_DAYS_IN_WEEK = 7

function initializeDays({ startOfMonth, ...data }) {
  const days = []

  while (days.length < startOfMonth) {
    days.push(null)
  }

  return { ...data, days, startOfMonth }
}

function setActiveDays({ daysInMonth, days, ...data }) {
  let count = 0

  while (count++ < daysInMonth) {
    days.push(Day({ count, ...data }))
  }

  return days
}

function setRemainingEmptyDays(days) {
  if (days.length % NUMBER_OF_DAYS_IN_WEEK === 0) return days

  while (days.length % NUMBER_OF_DAYS_IN_WEEK !== 0) {
    days.push(null)
  }

  return days
}

export const setDays = compose(
  setRemainingEmptyDays,
  setActiveDays,
  initializeDays
)
