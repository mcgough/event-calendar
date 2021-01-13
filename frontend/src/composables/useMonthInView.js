import compose from 'lodash.compose'
import { reactive, readonly } from 'vue'
import { convertToDate } from '@/date-utils'

const monthInView = reactive({})

function setMonthInView(month) {
  for (let prop in month) {
    monthInView[prop] = month[prop]
  }
}

const findSetMonth = (...fns) => compose(setMonthInView, ...fns, convertToDate)

export function useMonthInView() {
  return [readonly(monthInView), setMonthInView, findSetMonth]
}
