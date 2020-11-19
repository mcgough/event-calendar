import {
  validateParams,
  isInvalidMonth,
  isInvalidYear,
} from '../../../../src/router/guards'
import { getMonth, getYear } from 'date-fns'

describe('isInvalidMonth', () => {
  it('returns true correctly', () => {
    const invalidMonths = ['adfasd', 'ds', 'a3', '13', '-1', '4c', '030']
    invalidMonths.forEach(arg => expect(isInvalidMonth(arg)).toBe(true))
  })
  it('returns false correctly', () => {
    const validMonths = ['1', '12', '5', '05']
    validMonths.forEach(arg => expect(isInvalidMonth(arg)).toBe(false))
  })
})

describe('isInvalidYear', () => {
  it('returns true correctly', () => {
    const invalidYears = ['1qs2', '1', '12', '123', '13324', 'abcd', '1999a']
    invalidYears.forEach(arg => expect(isInvalidYear(arg)).toBe(true))
  })
  it('returns false correctly', () => {
    const validYears = ['1999', '2020', '1500', '2030']
    validYears.forEach(arg => expect(isInvalidYear(arg)).toBe(false))
  })
})

describe('validateParams', () => {
  it('ignores valid params', () => {
    const to = { params: { year: '2020', month: '11' } }
    validateParams(to, undefined, () => undefined)
    expect(to.params.year).toEqual('2020')
    expect(to.params.month).toEqual('11')
  })
  it('modifies params correctly when year is invalid', () => {
    const expectedYear = getYear(Date.now())
    const expectedMonth = getMonth(Date.now()) + 1
    const to = { params: { year: '14', month: '2' } }
    validateParams(to, undefined, () => undefined)
    expect(to.params.year).toEqual(expectedYear)
    expect(to.params.month).toEqual(expectedMonth)
  })
  it('modifies params correctly when month is invalid', () => {
    const to = { params: { year: '2021', month: 'abc' } }
    validateParams(to, undefined, () => undefined)
    expect(to.params.year).toEqual('2021')
    expect(to.params.month).toEqual(1)
  })
})
