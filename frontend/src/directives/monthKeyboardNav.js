import { UP, DOWN, LEFT, RIGHT } from '@/constants'

export const MonthKeyboardNav = {
  updated(el, binding) {
    let focusables = [...el.children].filter(hasIndexAttribute)

    focusables.forEach((el) =>
      el.addEventListener('keydown', manageKeyDown(focusables, binding.value))
    )

    focusables = undefined
  },
  beforeUnmount(el) {
    let focusables = [...el.children].filter(hasIndexAttribute)

    focusables.forEach((el) => el.removeEventListener('keydown', manageKeyDown))

    focusables = undefined
  },
}

function manageKeyDown(siblings, { prevMonth, nextMonth }) {
  return function (e) {
    e.preventDefault()

    const { code, target } = e

    let inFocus

    if (code === UP) {
      inFocus = findSiblingAheadOrBehind(-7)(target, siblings)
      if (!inFocus) return prevMonth()
    }

    if (code === DOWN) {
      inFocus = findSiblingAheadOrBehind(7)(target, siblings)
      if (!inFocus) return nextMonth()
    }

    if (code === RIGHT) inFocus = target.nextElementSibling
    if (code === LEFT) inFocus = target.previousElementSibling

    if (!inFocus) return

    inFocus.setAttribute('tabindex', 0)

    inFocus.focus()

    target.setAttribute('tabindex', -1)
  }
}

function hasIndexAttribute(el) {
  return el.hasAttribute('index')
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
