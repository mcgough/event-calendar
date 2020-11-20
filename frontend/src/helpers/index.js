import { CalendarAPI } from '../workers/calendar-api.worker.js'

export function setNextMonth({ month, year }) {
  return {
    year: month === 11 ? year + 1 : year,
    month: month === 11 ? 1 : month + 2,
  }
}

export function setPrevMonth({ month, year }) {
  return {
    year: month === 0 ? year - 1 : year,
    month: month === 0 ? 12 : month,
  }
}

export async function initCalendarAPI(randomCount) {
  const api = await new CalendarAPI()
  await api.loadAllEvents(randomCount)
  return api
}

export function setParams({ year, month, day }) {
  return {
    year: parseInt(year),
    month: parseInt(month) - 1,
    day: parseInt(day),
  }
}

export function buildRoute(name, params) {
  return {
    name,
    params,
  }
}
