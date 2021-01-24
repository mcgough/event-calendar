import { UP, DOWN, LEFT, RIGHT } from '@/constants'
import { nextTick } from 'vue'

export function manageKeyDown(siblings, binding) {
  return function (e) {
    const { code, target } = e

    const keysToWatch = [UP, RIGHT, DOWN, LEFT]

    if (!keysToWatch.includes(code)) return

    e.preventDefault()

    let inFocus

    if (code === UP) {
      inFocus = findSiblingAheadOrBehind(-7)(target, siblings)
      if (!inFocus) {
        nextTick(setPrevMonthDayFocus(target, binding))
      }
    }

    if (code === DOWN) {
      inFocus = findSiblingAheadOrBehind(7)(target, siblings)
      if (!inFocus) {
        nextTick(setNextMonthDayFocus(target, siblings, binding))
      }
    }

    if (code === RIGHT) inFocus = target.nextElementSibling

    if (code === LEFT) inFocus = target.previousElementSibling

    if (!inFocus) return

    inFocus.setAttribute('tabindex', 0)

    inFocus.focus()

    target.setAttribute('tabindex', -1)
  }
}

function setPrevMonthDayFocus(target, binding) {
  binding.value.prev()

  return function () {
    const index = parseIndex(target)

    const inFocus = document.querySelector(`[index="${index}"]`)

    if (inFocus) inFocus.focus()
  }
}

function setNextMonthDayFocus(target, siblings, binding) {
  binding.value.next()

  return function () {
    const index = siblings.length - parseIndex(target)

    const inFocus = document.querySelector(`[index="${7 - index}"]`)

    if (inFocus) inFocus.focus()
  }
}

export function attachListener(binding) {
  return function (cb) {
    return function (el, _, arr) {
      const handler = cb(arr, binding)

      el.addEventListener('keydown', handler)

      return { el, handler }
    }
  }
}

export function registerHandler(map) {
  return function ({ el, handler }) {
    map.set(el, handler)
  }
}

export function removeListener(handler, el) {
  el.removeEventListener('keydown', handler)
}

export function hasIndexAttribute(el) {
  return el.hasAttribute('index')
}

export function clearMap(map) {
  if (map) map.clear()
  return map
}

function parseIndex(el) {
  return parseInt(el.getAttribute('index'), 10)
}

function findSiblingAheadOrBehind(count) {
  return function (target, siblings) {
    const index = parseIndex(target)
    return siblings[index + count]
  }
}
