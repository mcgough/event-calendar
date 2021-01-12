import { MONTHS } from '@/constants'
import { useCalendarDays } from './composables/useCalendarDays'

export function pluckMonth({ value, data }) {
  return { data, value: value.findMonth(data).value }
}

export function Month({ y, m, daysInMonth, ...data }) {
  const [days, findDay] = useCalendarDays({ y, m, daysInMonth, ...data })

  const name = MONTHS[m]

  const year = y
  const month = m

  return {
    days,
    daysInMonth,
    findDay,
    month,
    name,
    year,
  }
}
