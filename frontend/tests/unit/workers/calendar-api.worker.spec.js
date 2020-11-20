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
    expect(month.daysInMonth).toEqual(30)
    month.weeks.forEach(week => expect(week.length).toEqual(7))
  })
  it('returns correct day', () => {
    const today = new Date('2020-11-19T08:00:00.000Z')
    const day = api.getDay(today)
    expect(day.year).toEqual(2020)
    expect(day.dayOfMonth).toEqual(19)
    expect(day.location).toEqual([2, 4])
    expect(day.month).toEqual(10)
  })
})

describe('Month - No overflow days', () => {
  const year = new Year(2021, 1)
  const month = year.getMonth(1)
  it('creates new instance', () => {
    expect(month).toBeTruthy()
  })
  it('returns correct day', () => {
    const day = month.getDay({ week: 3, day: 0 })
    expect(day.dayOfMonth).toEqual(14)
  })
  it('returns correct unpopulated day', () => {
    const emptyDay = month.getDay({ week: 5, day: 1 })
    expect(emptyDay.dayOfMonth).toBe(undefined)
  })
  it('sets overflowDays correctly', () => {
    expect(month.overflowDays).toBeLessThanOrEqual(0)
  })
})

describe('Month - Overflow days - 1', () => {
  const year = new Year(2021, 0)
  const month = year.getMonth(0)
  it('sets overflowDays correctly', () => {
    expect(month.overflowDays).toEqual(1)
  })
  it('returns correct day', () => {
    const day = month.getDay({ week: 6, day: 0 })
    expect(day.dayOfMonth).toEqual(31)
  })
})

describe('Month - Overflow days - 2', () => {
  const year = new Year(2021, 4)
  const month = year.getMonth(4)
  it('sets overflowDays correctly', () => {
    expect(month.overflowDays).toEqual(2)
  })
  it('returns correct day', () => {
    const overflowDay1 = month.getDay({ week: 6, day: 0 })
    expect(overflowDay1.dayOfMonth).toEqual(30)
    const overflowDay2 = month.getDay({ week: 6, day: 1 })
    expect(overflowDay2.dayOfMonth).toEqual(31)
    const lastDay = month.getDay({ week: 5, day: 6 })
    expect(lastDay.dayOfMonth).toEqual(29)
  })
})
