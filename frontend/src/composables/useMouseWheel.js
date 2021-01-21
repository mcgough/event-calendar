import debounce from 'lodash.debounce'
import { onBeforeUnmount, onMounted } from 'vue'

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

    map.set('wheel', handler)

    ref.value.addEventListener('wheel', handler, { passive: true })
  }
}

function detachWheelListener(ref, map) {
  return function () {
    const handler = map.get('wheel')

    ref.value.removeEventListener('wheel', handler, { passive: true })

    map.clear()
  }
}

function callback() {
  let cb
  return function (handler, { wait } = defaultOptions) {
    if (!cb) {
      cb = debounce(handler, wait, { leading: true, trailing: false })
      return
    }
    if (cb) cb()
  }
}

const defaultOptions = { wait: 0 }
