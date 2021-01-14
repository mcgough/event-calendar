import compose from 'lodash.flowright'
import { reactive, readonly } from 'vue'
import { convertToDate } from '@/date-utils'

function setDayInView(day) {
  for (let prop in day) {
    dayInView[prop] = day[prop]
  }
}

const findSetDay = (...fns) => compose(setDayInView, ...fns, convertToDate)

const dayInView = reactive({})

export function useDayInView() {
  return [readonly(dayInView), setDayInView, findSetDay]
}
