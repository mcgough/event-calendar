import { calendarApi } from '@/workers/calendar-api'

let api

export function useCalendarApi() {
  if (api) return api

  api = calendarApi()

  return api
}
