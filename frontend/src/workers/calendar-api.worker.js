import * as Comlink from 'comlink'
import {
  getMonth,
  getYear,
  getWeekOfMonth,
  getDay,
  getDaysInMonth,
  startOfMonth,
} from 'date-fns'
import { MONTHS } from '../constants'
const BASE_URL = 'http://localhost:3030'

class Day {
  constructor() {
    this.events = []
    this.dayOfMonth = undefined
  }

  setDayOfMonth(day) {
    this.dayOfMonth = day
  }

  setEvent(event) {
    this.events = [...this.events, event].sort((a, b) =>
      a.when.start_time < b.when.start_time ? -1 : 1
    )
  }
}

export class Month {
  constructor(parent, month) {
    const yearMonthDate = new Date(parent.year, month)

    this.populateDays = this.populateDays.bind(this)
    this.year = parent.year
    this.name = MONTHS[month]
    this.firstDayOfMonth = getDay(startOfMonth(yearMonthDate))
    this.daysInMonth = getDaysInMonth(yearMonthDate)
    this.overflowDays = (35 - this.daysInMonth - this.firstDayOfMonth) * -1 // Number of days that require splt

    this._index = month
    this._parent = parent
    this._weeks = this.scaffoldMonth()
  }

  get weeks() {
    return this._weeks
  }

  getDay({ week, day }) {
    if (this.isOverflowDay(day)) {
      return this.getOverflowday(day)
    }
    return this._weeks[week][day]
  }

  getOverflowday(day) {
    const nextMonth = this._parent.getMonth(this._index + 1)
    const nextMonthWeek = 0
    let nextMonthDayIndex = 0
    if (this.overflowDays === 2) {
      if (day === 6) {
        nextMonthDayIndex = 1
      }
    }
    return nextMonth.getDay({
      week: nextMonthWeek,
      day: nextMonthDayIndex,
    })
  }

  scaffoldMonth() {
    const COLUMNS = 7
    const ROWS = 5
    const scaffold = Array(ROWS)
      .fill()
      .map(() =>
        Array(COLUMNS)
          .fill()
          .map(() => new Day())
      )
    scaffold.forEach(this.populateDays)
    return scaffold
  }

  populateDays(days, weekIndex) {
    const daysInWeek = 7
    const dayBaseCount = weekIndex * daysInWeek
    let daysPopulated = 1 + dayBaseCount
    if (weekIndex > 0) {
      daysPopulated = daysPopulated - this.firstDayOfMonth
    }
    days.forEach((day, dayIdx) => {
      if (weekIndex === 0 && dayIdx >= this.firstDayOfMonth) {
        day.setDayOfMonth(daysPopulated)
        daysPopulated++
      }
      if (weekIndex > 0 && daysPopulated <= this.daysInMonth) {
        day.setDayOfMonth(daysPopulated)
        daysPopulated++
      }
    })
    if (weekIndex === 4 && this.overflowDays > 0) {
      this.populateOverflowDays()
    }
  }

  populateOverflowDays() {
    const nextMonth = this._parent.getMonth(this._index + 1)
    const nextSunday = nextMonth.getDay({ week: 0, day: 0 })
    const nextMonday = nextMonth.getDay({ week: 0, day: 1 })
    if (this.overflowDays === 2) {
      if (this.daysInMonth === 31) {
        nextSunday.setDayOfMonth(30)
        nextMonday.setDayOfMonth(31)
      }
      if (this.daysInMonth === 30) {
        nextSunday.setDayOfMonth(29)
        nextMonday.setDayOfMonth(30)
      }
      return
    }
    nextSunday.setDayOfMonth(this.daysInMonth === 31 ? 31 : 30)
  }

  isOverflowDay(day) {
    if (this.overflowDays > 0) {
      if (day >= 5) {
        return this.overflowDays === 2 || day === 6
      }
    }
    return false
  }
}

export class Year {
  constructor(year, month) {
    this.year = parseInt(year)
    this._year = new Map()
    this._year.set(month, new Month(this, month))
  }

  getMonth(month) {
    if (!this._year.has(month)) {
      this._year.set(month, new Month(this, month))
    }
    return this._year.get(month)
  }
}

export class CalendarAPI {
  constructor() {
    this.setDayEvent = this.setDayEvent.bind(this)

    this._years = new Map()
  }

  async loadAllEvents() {
    try {
      const response = await fetch(BASE_URL)
      const { data } = await response.json()
      if (data) {
        data.forEach(this.setDayEvent)
      }
    } catch (e) {
      console.error(`endpoint error - ${e}`)
    }
  }

  setDayEvent(event) {
    const { year, month, week, day } = this.parseEventDate(event)
    if (!this._years.has(year)) {
      this._years.set(year, new Year(year, month))
    }
    this._years
      .get(year)
      .getMonth(month)
      .getDay({ week, day })
      .setEvent(event)
  }

  getMonth(year, month) {
    if (!this._years.has(year)) {
      this._years.set(year, new Year(year, month))
    }
    const monthInstance = this._years.get(year).getMonth(month)
    return {
      year: monthInstance.year,
      name: monthInstance.name,
      weeks: monthInstance.weeks,
    }
  }

  parseEventDate({ when }) {
    return {
      year: getYear(when.start_time),
      month: getMonth(when.start_time),
      week: getWeekOfMonth(when.start_time),
      day: getDay(when.start_time),
    }
  }
}

Comlink.expose(CalendarAPI)
