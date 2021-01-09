import { calendarApi } from '@/workers/calendar-api/index'

let api

export async function useCalendarApi(randomCount) {
  if (api) return api

  api = await calendarApi(randomCount)

  return api
}
