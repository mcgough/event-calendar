function setEvents(event, events) {
  return [...events, event].sort((a, b) =>
    a.when.start_time < b.when.start_time ? -1 : 1
  )
}

export function pluckDay({ data, value }) {
  return { data, value: value.findDay(data) }
}

export function Day({ y, m, count }) {
  const year = y
  const month = m
  const dayOfMonth = count

  let events = []

  const eventCount = () => events.length

  const getEvents = () => [...events]

  const setEvent = e => (events = setEvents(e, events))

  return {
    year,
    month,
    dayOfMonth,
    eventCount,
    getEvents,
    setEvent,
  }
}
