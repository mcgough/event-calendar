import compose from 'lodash.flowright'
import { format } from 'date-fns'

const convertToMilli = (date) => new Date(date).getTime()

const pluckStart = (event) => event.start

function setEvents(event, events) {
  return [...events, event].sort((a, b) => (a.start < b.start ? -1 : 1))
}

export function addEvent(find) {
  return function (event) {
    const day = compose(find, convertToMilli, pluckStart)(event)

    if (day) day.setEvent(event)

    return day.getEvents()
  }
}

export function pluckDay({ data, value }) {
  return { data, value: value.findDay(data) }
}

export function Day({ y, m, dayOfMonth, dayOfWeek, isInCurrentMonth }) {
  const year = y
  const month = m
  const timestamp = parseInt(format(new Date(y, m, dayOfMonth), 'T'), 10)
  const label = format(timestamp, 'PPP')

  let events = []
  const eventCount = () => events.length
  const getEvents = () => [...events]
  const setEvent = (e) => (events = setEvents(e, events))

  return {
    year,
    month,
    dayOfMonth,
    dayOfWeek,
    eventCount,
    getEvents,
    isInCurrentMonth,
    label,
    setEvent,
    timestamp,
  }
}
