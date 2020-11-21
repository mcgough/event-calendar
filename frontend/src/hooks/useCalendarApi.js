import { CalendarAPI } from '../workers/calendar-api.worker.js'

let api

export async function useCalendarApi(randomCount) {
  if (api) return api

  api = await new CalendarAPI()

  await api.loadAllEvents(randomCount)

  return api
}
