import { reactive, readonly } from 'vue'

const dayInView = reactive({})

export function useDayInView() {
  function setDayInView(day) {
    Object.assign(dayInView, day)
  }
  return [readonly(dayInView), setDayInView]
}
