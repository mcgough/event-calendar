import { calendarApi } from '@/workers/calendar-api'

let api

export function useCalendarApi(randomCount) {
  if (api) return api

  api = calendarApi(randomCount)

  return api
}
