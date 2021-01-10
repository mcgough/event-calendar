import { reactive, readonly } from 'vue'

export function useState() {
  let state = reactive({})
  function setState(data) {
    state = Object.assign(state, data)
  }
  return [readonly(state), setState]
}
