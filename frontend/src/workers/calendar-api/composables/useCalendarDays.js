import compose from 'lodash.compose'
import { initializeDays, setActiveDays, setRemainingEmptyDays } from './setDays'

export function useCalendarDays(data) {
  const days = compose(
    setRemainingEmptyDays,
    setActiveDays,
    initializeDays
  )(data)

  function findDay({ dayOfMonth, startOfMonth }) {
    const day = days[dayOfMonth + startOfMonth - 1]
    return day
  }

  return [days, findDay]
}
