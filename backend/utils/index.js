const getDay = require('date-fns/getDay')
const getWeekOfMonth = require('date-fns/getWeekOfMonth')

function rangeMap(handler) {
  return function (length) {
    return Array.from(length).map(handler)
  }
}

function formatEvent(_, i) {
  const start_time = Date.now() / 1000 + i * 15555555
  const end_time = start_time + 100000
  return {
    title: `Event ${i}`,
    when: { start_time, end_time },
    day: getDay(start_time),
    week: getWeekOfMonth(start_time, { weekStartsOn: 0 }),
  }
}

module.exports = {
  generateRandomEvents(count) {
    return rangeMap(formatEvent)(count)
  },
}
