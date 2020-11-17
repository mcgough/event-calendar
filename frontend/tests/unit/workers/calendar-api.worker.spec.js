import { CalendarAPI, Year } from '../../../src/workers/calendar-api.worker'

describe('CalendarAPI', () => {
  const api = new CalendarAPI()
  it('creates new instance', () => {
    expect(api).toBeTruthy()
  })
  it('returns correct month info', () => {
    const expectedName = 'November'
    const expectedYear = 2020
    const month = api.getMonth(2020, 10)

    expect(month.name).toEqual(expectedName)
    expect(month.year).toEqual(expectedYear)
    expect(month.weeks.length).toEqual(5)
    month.weeks.forEach(week => expect(week.length).toEqual(7))
  })
})

describe('Month - No overflow days', () => {
  const year = new Year(2020, 10)
  const month = year.getMonth(10)
  it('creates new instance', () => {
    expect(month).toBeTruthy()
  })
  it('returns correct day', () => {
    const day = month.getDay({ week: 3, day: 0 })
    expect(day.dayOfMonth).toEqual(22)
  })
  it('returns correct unpopulated day', () => {
    const emptyDay = month.getDay({ week: 4, day: 6 })
    expect(emptyDay.dayOfMonth).toBe(undefined)
  })
  it('sets overflowDays correctly', () => {
    expect(month.overflowDays).toBeLessThanOrEqual(0)
  })
})

describe('Month - Overflow days', () => {
  const year = new Year(1972, 6)
  const month = year.getMonth(6)
  it('sets overflowDays correctly', () => {
    expect(month.overflowDays).toEqual(2)
  })
  it('returns correct day', () => {
    const day = month.getDay({ week: 4, day: 6 })
    expect(day.dayOfMonth).toEqual(31)
  })
})
