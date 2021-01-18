import compose from 'lodash.flowright'
import { loop, pluckValue } from '@/composables'
import { parseDate } from '@/date-utils'
import { useCalendarMap } from './composables/useCalendarMap'
import { Year } from './year'
import { pluckMonth } from './month'
import { pluckDay, addEvent } from './day'

const BASE_URL = 'http://localhost:3030/events'

export function calendarApi() {
  const [getYear, setYear] = useCalendarMap(new Map(), 'y', Year)

  const pluckYear = [getYear, setYear, parseDate]

  const findYear = compose(pluckValue, ...pluckYear)

  const findMonth = compose(pluckValue, pluckMonth, ...pluckYear)

  const findDay = compose(pluckValue, pluckDay, pluckMonth, ...pluckYear)

  const fetchSetEvents = () => fetchEvents().then(loop(addEvent(findDay)))

  return {
    fetchSetEvents,
    findDay,
    findMonth,
    findYear,
    setYear,
  }
}

async function fetchEvents() {
  const response = await fetch(BASE_URL)
  const { holidays } = await response.json()
  return holidays
}
