import { setCalendarDays } from './setCalendarDays'

export function useCalendarDays(data) {
  const days = setCalendarDays(data)

  function findDay({ d, startOfMonth }) {
    return days[d + (startOfMonth - 1)]
  }

  return [days, findDay]
}
