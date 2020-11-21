import { reactive, readonly } from 'vue'

const month = reactive({})

export function useMonth() {
  function setMonth({ year, daysInMonth, name, weeks }) {
    month.daysInMonth = daysInMonth
    month.year = year
    month.name = name
    month.weeks = weeks
  }
  return [readonly(month), setMonth]
}

const day = reactive({})

export function useDay() {
  function setDay({ dayOfMonth, events, location, month, year }) {
    day.dayOfMonth = dayOfMonth
    day.events = events
    day.location = location
    day.month = month
    day.year = year
  }
  return [readonly(day), setDay]
}
