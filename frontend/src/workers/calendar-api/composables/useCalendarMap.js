import compose from 'lodash.flowright'
import { parseDate } from '@/date-utils'

export const useCalendarMap = (map, key, value) => [
  compose(getValue.bind(null, map, key), parseData),
  compose(setKeyValue.bind(null, map, key, value), parseData),
]

function setKeyValue(map, key, value, data) {
  if (!map.has(data[key])) {
    map.set(data[key], value({ ...data }))
  }
  return data
}

function getValue(map, key, data) {
  return { data, value: map.get(data[key]) }
}

function parseData(date) {
  return typeof date === 'number' ? parseDate(date) : date
}
