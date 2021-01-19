import { UP, DOWN, LEFT, RIGHT } from '@/constants'

export const MonthKeyboardNav = {
  updated(el) {
    let focusables = [...el.children].filter(hasIndexAttribute)

    focusables.forEach((el) =>
      el.addEventListener('keydown', manageKeyDown(focusables))
    )

    focusables = undefined
  },
  beforeUnmount(el) {
    let focusables = [...el.children].filter(hasIndexAttribute)

    focusables.forEach((el) => el.removeEventListener('keydown', manageKeyDown))

    focusables = undefined
  },
}

function manageKeyDown(siblings) {
  return function (e) {
    const { code, target } = e

    let inFocus

    if (code === UP) inFocus = findWeekPast(target, siblings)
    if (code === DOWN) inFocus = findWeekFuture(target, siblings)
    if (code === RIGHT) inFocus = target.nextElementSibling
    if (code === LEFT) inFocus = target.previousElementSibling

    if (!inFocus) return

    e.preventDefault()

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

function findWeekPast(target, siblings) {
  const index = parseIndex(target)
  return siblings[index - 7]
}

function findWeekFuture(target, siblings) {
  const index = parseIndex(target)
  return siblings[index + 7]
}
