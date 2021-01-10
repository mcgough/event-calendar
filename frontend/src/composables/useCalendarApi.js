import { calendarApi } from '@/workers/calendar-api'

export async function useCalendarApi(randomCount) {
  let api

  if (api) return api

  api = await calendarApi(randomCount)

  return api
}
