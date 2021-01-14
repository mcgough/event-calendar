import compose from 'lodash.flowright'

export function formatParams({ year, month, day }) {
  const parsedYear = parseInt(year)
  const parsedMonth = parseInt(month) - 1
  const timestamp = new Date(parsedYear, parsedMonth, day || 1)
  return {
    timestamp,
    year: parsedYear,
    month: parsedMonth,
    day: day,
  }
}

export function setBasePath(basePath) {
  return function () {
    return { basePath: `/${basePath}` }
  }
}

export function setKeyValue(key) {
  return function () {
    const value = [...arguments]
    return function (data) {
      return { [key]: value, ...data }
    }
  }
}

export function constructPath({ keys, basePath, hooks }) {
  return function (params) {
    const values = hooks && hooks.length ? compose(...hooks)(params) : params
    return keys.reduce((path, key) => `${path}/${values[key]}`, basePath)
  }
}

export function checkDay({ day, ...data }) {
  return { day: day || 1, ...data }
}

export function checkMonth({ month, ...data }) {
  return { month: month + 1, ...data }
}
