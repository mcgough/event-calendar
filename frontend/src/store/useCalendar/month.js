import compose from 'lodash.flowright'
import { MONTHS } from '@/constants'
import { format } from 'date-fns'
import { parseDate } from '@/date-utils'
import { pluckValue } from '@/composables'
import { useCalendarDays } from './composables/useCalendarDays'

export function Month({ y, m, daysInMonth, ...data }) {
  const [days, findDay] = useCalendarDays({ y, m, daysInMonth, ...data })

  const label = format(new Date(y, m), 'MMMM y')
  const month = m
  const name = MONTHS[m]
  const year = y

  const findWeek = findDaysInWeek(days)

  return {
    days,
    daysInMonth,
    findDay,
    findWeek,
    label,
    month,
    name,
    year,
  }
}

export function pluckMonth({ value, data }) {
  return { data, value: value.findMonth(data).value }
}

export function findAll(year, getter) {
  const findResult = compose(pluckValue, getter, parseDate)

  return function () {
    const results = []

    let i = -1
    while (i++ < 11) {
      results.push(findResult(new Date(year, i)))
    }

    return results
  }
}

function findDaysInWeek(days) {
  return function ({ weekOfYear }) {
    const week = []

    let index = 0

    let dayCount = 0

    while (dayCount < 7) {
      if (days[index].weekOfYear === weekOfYear) {
        week.push(days[index])
        dayCount++
      }
      index++
    }

    return week
  }
}
