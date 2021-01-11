import compose from 'lodash.compose'
import {
  setPrevMonthDays,
  setCurrentMonthDays,
  setNextMonthDays,
} from './setDays'

export function useCalendarDays(data) {
  const days = compose(
    setNextMonthDays,
    setCurrentMonthDays,
    setPrevMonthDays
  )(data)

  function findDay({ d, startOfMonth }) {
    const day = days[d + startOfMonth - 1]
    return day
  }

  return [days, findDay]
}
