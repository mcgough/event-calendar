import { getDay, getMonth, getYear } from 'date-fns'

export const isInvalidYear = (year) =>
  !year ||
  isNaN(parseInt(year)) ||
  year.length < 4 ||
  year.length > 4 ||
  parseInt(year) < 1000

export const isInvalidMonth = (month) =>
  !month ||
  isNaN(parseInt(month)) ||
  parseInt(month) != month ||
  month.length > 2 ||
  parseInt(month) > 12 ||
  parseInt(month) < 1

export const validateParams = (to, from, next) => {
  const { year, month } = to.params

  const invalidYear = isInvalidYear(year)

  const invalidMonth = isInvalidMonth(month)

  if (to.path === '/') {
    to.path = '/d'
    to.params.day = getDay(Date.now())
  }

  if (invalidYear) {
    to.params.year = getYear(Date.now())
    to.params.month = getMonth(Date.now()) + 1
  } else if (invalidMonth) {
    to.params.month = 1
  }

  console.log(to)
  next()
}
