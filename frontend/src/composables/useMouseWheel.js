import debounce from 'lodash.debounce'
import { onBeforeUnmount, onMounted } from 'vue'

const WHEEL = 'wheel'

const eventOptions = { passive: true }

export function useMouseWheel(ref) {
  const onWheelUp = callback()
  const onWheelDown = callback()

  const activeListener = new Map()

  onMounted(attachWheelListener(ref, onWheelUp, onWheelDown, activeListener))

  onBeforeUnmount(detachWheelListener(ref, activeListener))

  return {
    onWheelDown,
    onWheelUp,
  }
}

function attachWheelListener(ref, up, down, map) {
  return function () {
    const handler = function (e) {
      const { wheelDeltaY } = e
      if (wheelDeltaY < 0) up()
      if (wheelDeltaY > 0) down()
    }

    map.set(WHEEL, handler)

    ref.value.addEventListener(WHEEL, handler, eventOptions)
  }
}

function detachWheelListener(ref, map) {
  return function () {
    const handler = map.get(WHEEL)

    ref.value.removeEventListener(WHEEL, handler, eventOptions)

    map.clear()
  }
}

function callback() {
  let cb
  return function (handler, wait = 0) {
    if (!cb) {
      cb = debounce(handler, wait, { leading: true, trailing: false })
      return
    }
    if (cb) cb()
  }
}
