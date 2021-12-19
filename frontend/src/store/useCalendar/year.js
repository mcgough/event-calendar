import compose from 'lodash.flowright'
import { Month, findAll } from './month'
import { useCalendarMap } from './composables/useCalendarMap'

export function Year({ y, ...data }) {
  const month = new Map()

  const [getMonth, setMonth] = useCalendarMap(month, 'm', Month)

  const year = y

  const findMonth = compose(getMonth, setMonth)

  const findAllMonths = findAll(year, findMonth)

  setMonth({ y, ...data })

  return {
    month,
    year,
    findMonth,
    findAllMonths,
  }
}
