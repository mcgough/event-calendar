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

class Month {
  constructor(year, month) {
    this.populateDays = this.populateDays.bind(this)

    this.name = MONTHS[month]
    this.firstDayOfMonth = getDay(startOfMonth(new Date(year, month)))
    this.daysInMonth = getDaysInMonth(new Date(year, month))
    this.splitDays = (35 - this.daysInMonth - this.firstDayOfMonth) * -1 // Number of days that require splt
    this._weeks = this.scaffoldMonth()
  }

  get weeks() {
    return this._weeks
  }

  getDay({ week, day }) {
    if (this.splitDays > 0 && week === 4) {
      if (Array.isArray(this._weeks[week][day])) {
        // TODO: Return correct day here. Currently returning first nested to avoid error.
        return this._weeks[week][day][0]
      }
    }
    return this._weeks[week][day]
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
    // TODO: Clean up scaffolding of split days
    if (this.splitDays > 0) {
      if (this.splitDays === 2) {
        scaffold[4][5] = [new Day(), new Day()]
      }
      scaffold[4][6] = [new Day(), new Day()]
    }
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
        if (Array.isArray(day)) {
          day[0].setDayOfMonth(daysPopulated)
          daysPopulated++
          day[1].setDayOfMonth(daysPopulated)
        } else {
          day.setDayOfMonth(daysPopulated)
        }
        daysPopulated++
      }
    })
  }
}

class Year {
  constructor(year, month) {
    this.year = parseInt(year)
    this._year = new Map()
    this._year.set(month, new Month(this.year, month))
  }

  getMonth(month) {
    if (!this._year.has(month)) {
      this._year.set(month, new Month(this.year, month))
    }
    return this._year.get(month)
  }
}

class CalendarAPI {
  constructor() {
    this.setDayEvent = this.setDayEvent.bind(this)

    this._years = new Map()
  }

  async init() {
    try {
      const response = await fetch(BASE_URL)
      const { data } = await response.json()
      if (data) {
        data.forEach(this.setDayEvent)
      }
    } catch (e) {
      // TODO: Error handling
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
    return { year, month: monthInstance.name, weeks: monthInstance.weeks }
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
