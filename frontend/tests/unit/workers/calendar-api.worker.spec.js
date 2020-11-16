import { CalendarAPI, Month } from '../../../src/workers/calendar-api.worker'

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
    month.weeks.forEach((week) => expect(week.length).toEqual(7))
  })
})

describe('Month - No Split Days', () => {
  const month = new Month(2020, 10)
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
  it('sets splitDays correctly', () => {
    expect(month.splitDays).toBeLessThanOrEqual(0)
  })
})

describe('Month - Split Days', () => {
  const month = new Month(2021, 0)
  it('returns correct day', () => {
    const day = month.getDay({ week: 1, day: 4 })
    expect(day.dayOfMonth).toEqual(7)
  })
  it('sets splitDays correctly', () => {
    expect(month.splitDays).toEqual(1)
  })
})
