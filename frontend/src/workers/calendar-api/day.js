import compose from 'lodash.flowright'
import { format, getTime } from 'date-fns'

const formatDateString = (string) => string.replace(/-/g, '/')

const convertToMilli = (date) => getTime(new Date(date))

const pluckDate = (event) => event.date

const findEventDate = [convertToMilli, formatDateString, pluckDate]

function setEvents(event, events) {
  return [...events, event].sort((a, b) => (a.start < b.start ? -1 : 1))
}

export function addEvent(findFn) {
  return function (event) {
    const day = compose(findFn, ...findEventDate)(event)

    if (day) day.setEvent(event)
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
