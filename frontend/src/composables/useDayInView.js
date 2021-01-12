import { reactive, readonly } from 'vue'

const dayInView = reactive({})

function setDayInView(day) {
  for (let prop in day) {
    dayInView[prop] = day[prop]
  }
}

export function useDayInView() {
  return [readonly(dayInView), setDayInView]
}
