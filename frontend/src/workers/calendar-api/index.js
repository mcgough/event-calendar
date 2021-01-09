import compose from 'lodash.compose'
import { parseDate } from '@/date-utils'
import { useCalendarMap } from './hooks/useCalendarMap'
import { Year } from './year'
import { pluckMonth } from './month'
import { pluckDay } from './day'

const BASE_URL = 'http://localhost:3030'

function pluckValue({ value }) {
  return value
}

async function fetchEvents() {
  const response = await fetch(BASE_URL)
  const { data } = await response.json()
  return data
}

function addEvent(find) {
  return function(event) {
    const day = find(event.when.start_time)
    if (day) {
      day.setEvent(event)
    }
  }
}

function loop(cb) {
  return function(list) {
    return list.forEach(cb)
  }
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
