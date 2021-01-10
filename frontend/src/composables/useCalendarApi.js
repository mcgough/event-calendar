import { calendarApi } from '@/workers/calendar-api'

export function useCalendarApi(randomCount) {
  let api

  if (api) return api

  api = calendarApi(randomCount)

  return api
}
