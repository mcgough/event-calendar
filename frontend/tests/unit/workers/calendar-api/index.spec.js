import { calendarApi } from '../../../../src/workers/calendar-api'

const calendar = calendarApi()

it('should exist', () => {
  expect(calendar).toBeTruthy()
})

it('should return correct year', () => {
  const year = calendar.findYear(1618336800000)
  expect(year.year).toEqual(2021)

  const month = calendar.findMonth(1618336800000)
  expect(month.name).toEqual('April')

  const day = calendar.findDay(1618336800000)
  expect(day.dayOfMonth).toEqual(13)
})
