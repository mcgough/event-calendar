import compose from 'lodash.compose'
import { Month } from './month'
import { useCalendarMap } from './hooks/useCalendarMap'

export function Year({ y, ...data }) {
  const [getMonth, setMonth] = useCalendarMap(new Map(), 'm', Month)

  const year = y

  const findMonth = compose(getMonth, setMonth)

  setMonth({ y, ...data })

  return {
    year,
    findMonth,
  }
}
