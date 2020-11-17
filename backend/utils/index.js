/**
 * For testing purposes
 */

const getDay = require('date-fns/getDay')
const getWeekOfMonth = require('date-fns/getWeekOfMonth')

module.exports = {
  generateRandomEvents(count) {
    const random = []
    for (let i = 0; i < count; i++) {
      const start_time = Date.now() + i * 1000000000
      const end_time = start_time + 100000000
      const event = {
        title: `Event ${i}`,
        when: {
          start_time,
          end_time,
        },
        day: getDay(start_time),
        week: getWeekOfMonth(start_time, { weekStartsOn: 0 }),
      }
      random.push(event)
    }
    return random
  },
}
