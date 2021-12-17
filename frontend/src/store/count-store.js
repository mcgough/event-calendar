import { computed, reactive, ref, toRefs, watch } from 'vue'
import { defineStore } from 'pinia'

const defaultHistory = () => ({
  changeCount: 0,
  history: [],
})

export const useHistory = defineStore('history', () => {
  const state = reactive(defaultHistory())

  function add(_, oldVal) {
    state.changeCount += 1
    state.history = [...state.history, oldVal]
  }

  function reset() {
    Object.assign(state, defaultHistory())
  }

  return { ...toRefs(state), add, reset }
})

export const useTotal = defineStore('total', () => {
  const history = useHistory()

  const total = ref(0)

  const totalPlus10 = computed(() => total.value + 10)

  function add(num) {
    total.value += num
  }

  function minus(num) {
    total.value -= num
  }

  watch(total, history.add)

  return {
    total,
    totalPlus10,
    add,
    minus,
  }
})
