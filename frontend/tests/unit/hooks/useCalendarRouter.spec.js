import {
  setNextMonth,
  setPrevMonth,
  setNextDay,
  setPrevDay,
  setParams,
} from '../../../src/hooks/useCalendarRouter'

describe('setParams', () => {
  it('returns year and month as numbers and correctly', () => {
    const monthYear = { month: 2, year: 2020 }
    const { month, year } = setParams(monthYear)
    expect(month).toStrictEqual(1)
    expect(year).toStrictEqual(2020)
  })
})

describe('setNextMonth', () => {
  it('returns first month and next year', () => {
    const monthYear = { month: 11, year: 2020 }
    const expected = { month: 1, year: 2021 }
    expect(setNextMonth(monthYear)).toStrictEqual(expected)
  })
  it('returns correct month and correct year', () => {
    const monthYear = { month: 9, year: 2020 }
    const expected = { month: 11, year: 2020 }
    expect(setNextMonth(monthYear)).toStrictEqual(expected)
  })
})

describe('setPrevMonth', () => {
  it('returns last month and previous year', () => {
    const monthYear = { month: 0, year: 2020 }
    const expected = { month: 12, year: 2019 }
    expect(setPrevMonth(monthYear)).toStrictEqual(expected)
  })
  it('returns correct month and correct year', () => {
    const monthYear = { month: 10, year: 2020 }
    const expected = { month: 10, year: 2020 }
    expect(setPrevMonth(monthYear)).toStrictEqual(expected)
  })
})

describe('setNextDay', () => {
  it('returns last month and previous year and correct day', () => {
    const yearMonthDay = { month: 11, year: 2020, day: 31 }
    const expected = { month: 1, year: 2021, day: 1 }
    expect(setNextDay(yearMonthDay)).toStrictEqual(expected)
  })
  it('returns correct month and correct year and correct day', () => {
    const yearMonthDay = { month: 2, year: 2020, day: 3 }
    const expected = { month: 3, year: 2020, day: 4 }
    expect(setNextDay(yearMonthDay)).toStrictEqual(expected)
  })
})

describe('setPrevDay', () => {
  it('returns last month and previous year and correct day', () => {
    const yearMonthDay = { month: 0, year: 2020, day: 1 }
    const expected = { month: 12, year: 2019, day: 31 }
    expect(setPrevDay(yearMonthDay)).toStrictEqual(expected)
  })
  it('returns correct month and correct year and correct day', () => {
    const yearMonthDay = { month: 11, year: 2019, day: 29 }
    const expected = { month: 12, year: 2019, day: 28 }
    expect(setPrevDay(yearMonthDay)).toStrictEqual(expected)
  })
})
