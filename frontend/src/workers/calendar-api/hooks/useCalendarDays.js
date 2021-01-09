import { setDays } from './setDays'

export function useCalendarDays(data) {
  const days = setDays(data)

  function findDay({ dayOfMonth, startOfMonth }) {
    const day = days[dayOfMonth + startOfMonth - 1]
    return day
  }

  return [days, findDay]
}
