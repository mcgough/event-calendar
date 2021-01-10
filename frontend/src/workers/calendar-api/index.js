import compose from 'lodash.compose'
import { loop, pluckValue } from '@/composables'
import { parseDate } from '@/date-utils'
import { useCalendarMap } from './composables/useCalendarMap'
import { Year } from './year'
import { pluckMonth } from './month'
import { pluckDay, addEvent } from './day'

const BASE_URL = 'http://localhost:3030'

async function fetchEvents() {
  const response = await fetch(BASE_URL)
  const { data } = await response.json()
  return data
}

export function calendarApi() {
  const [getYear, setYear] = useCalendarMap(new Map(), 'y', Year)

  const pluckYear = [getYear, setYear, parseDate]

  const findYear = compose(pluckValue, ...pluckYear)
  const findMonth = compose(pluckValue, pluckMonth, ...pluckYear)
  const findDay = compose(pluckValue, pluckDay, pluckMonth, ...pluckYear)

  const setEvent = addEvent(findDay)

  const fetchSetEvents = () => fetchEvents().then(loop(setEvent))

  return {
    setYear,
    findYear,
    findMonth,
    findDay,
    fetchSetEvents,
  }
}
