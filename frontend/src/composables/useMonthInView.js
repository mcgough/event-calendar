import compose from 'lodash.flowright'
import { reactive, readonly } from 'vue'
import { convertToDate } from '@/date-utils'

const monthInView = reactive({})

export function useMonthInView() {
  return [readonly(monthInView), setMonthInView, findSetMonthInView]
}

function setMonthInView(month) {
  for (let prop in month) {
    monthInView[prop] = month[prop]
  }
}

const findSetMonthInView = (...fns) =>
  compose(setMonthInView, ...fns, convertToDate)
