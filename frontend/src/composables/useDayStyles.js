import compose from 'lodash.flowright'

export function useDayStyles(day) {
  return compose(
    returnStyles,
    setFocusStyles,
    setIsTodayStyles,
    setDayInSubViewStyles,
    setDayInMonthStyles,
    setBaseStyles
  )(day)
}

function returnStyles({ styles }) {
  return styles
}

function setBaseStyles(day) {
  const styles = [...baseStyles]
  return {
    day,
    styles,
  }
}

function setDayInMonthStyles({ day, ...data }) {
  const styles = [
    ...data.styles,
    ...(day.isInCurrentMonth ? dayInMonthStyles : dayOutsideMonthStyles),
  ]
  return {
    day,
    styles,
  }
}

function setDayInSubViewStyles({ day, ...data }) {
  const styles = [
    ...data.styles,
    ...(day.dayIsInView ? dayInSubViewStyles : []),
  ]
  return {
    day,
    styles,
  }
}

function setIsTodayStyles({ day, ...data }) {
  const styles = [...data.styles, ...(day.isToday ? todayStyles : [])]
  return {
    day,
    styles,
  }
}

function setFocusStyles({ day, ...data }) {
  const styles = [...data.styles, ...focus]
  return {
    day,
    styles,
  }
}

const baseStyles = [
  'select-none',
  'rounded-full',
  'w-7',
  'h-7',
  'flex',
  'justify-center',
  'items-center',
  'active:bg-blue-200',
  'text-xs',
]
const todayStyles = ['bg-blue-700', 'text-white']
const dayInMonthStyles = ['cursor-pointer', 'hover:bg-gray-100']
const dayOutsideMonthStyles = ['text-gray-400']
const dayInSubViewStyles = ['bg-blue-200', 'hover:bg-blue-300', 'text-blue-700']
const focus = ['focus:outline-none', 'focus:ring-1']
