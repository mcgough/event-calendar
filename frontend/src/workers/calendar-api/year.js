import compose from 'lodash.flowright'
import { Month } from './month'
import { useCalendarMap } from './composables/useCalendarMap'

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
