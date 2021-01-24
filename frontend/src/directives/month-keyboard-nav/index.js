import compose from 'lodash.flowright'
import { loop, filter } from '@/composables'
import {
  attachListener,
  clearMap,
  hasIndexAttribute,
  manageKeyDown,
  removeListener,
  registerHandler,
} from './helpers'

const activeListeners = new Map()

export const MonthKeyboardNav = {
  updated(el, binding) {
    const attachAndRegisterHandler = compose(
      registerHandler(activeListeners),
      attachListener(binding)(manageKeyDown)
    )

    compose(
      loop(attachAndRegisterHandler),
      filter(hasIndexAttribute)(el.children),
      clearMap,
      loop(removeListener)
    )(activeListeners)
  },
}
