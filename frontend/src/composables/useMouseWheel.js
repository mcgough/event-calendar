import debounce from 'lodash.debounce'
import { onBeforeUnmount, onMounted } from 'vue'

export function useMouseWheel(ref) {
  const onWheelUp = callback()
  const onWheelDown = callback()

  onMounted(attachWheelListener(ref, onWheelUp, onWheelDown))

  onBeforeUnmount(detachWheelListener(ref))

  return {
    onWheelDown,
    onWheelUp,
  }
}

function handleWheelUpDown(up, down) {
  return function (e) {
    const { wheelDeltaY } = e
    if (wheelDeltaY < 0) up()
    if (wheelDeltaY > 0) down()
  }
}

function attachWheelListener(ref, up, down) {
  return function () {
    ref.value.addEventListener(...listenerArgs(up, down))
  }
}

function detachWheelListener(ref) {
  return function () {
    ref.value.removeEventListener('wheel', handleWheelUpDown)
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

const listenerArgs = (up, down) => [
  'wheel',
  handleWheelUpDown(up, down),
  { passive: true },
]
