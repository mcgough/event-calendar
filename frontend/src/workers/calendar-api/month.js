import { MONTHS } from '@/constants'
import { format } from 'date-fns'
import { useCalendarDays } from './composables/useCalendarDays'

export function pluckMonth({ value, data }) {
  return { data, value: value.findMonth(data).value }
}

export function Month({ y, m, daysInMonth, ...data }) {
  const [days, findDay] = useCalendarDays({ y, m, daysInMonth, ...data })

  const label = format(new Date(y, m), 'MMMM y')
  const month = m
  const name = MONTHS[m]
  const year = y

  return {
    days,
    daysInMonth,
    findDay,
    label,
    month,
    name,
    year,
  }
}
