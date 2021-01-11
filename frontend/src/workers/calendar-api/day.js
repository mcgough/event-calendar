function setEvents(event, events) {
  return [...events, event].sort((a, b) =>
    a.when.start_time < b.when.start_time ? -1 : 1
  )
}

export function addEvent(find) {
  return function(event) {
    const day = find(event.when.start_time)
    if (day) {
      day.setEvent(event)
    }
  }
}

export function pluckDay({ data, value }) {
  return { data, value: value.findDay(data) }
}

export function Day({ y, m, dayOfMonth }) {
  const year = y
  const month = m
  const timestamp = new Date(y, m)

  let events = []

  const eventCount = () => events.length

  const getEvents = () => [...events]

  const setEvent = e => (events = setEvents(e, events))

  return {
    year,
    month,
    dayOfMonth,
    timestamp,
    eventCount,
    getEvents,
    setEvent,
  }
}