import { useState } from './useState'
import { useParams } from './useParams'
import { useCalendarApi } from './useCalendarApi'

function loop(cb) {
  return function(list) {
    return list.forEach(cb)
  }
}

function pluckValue({ value }) {
  return value
}

export { useState, useParams, useCalendarApi, loop, pluckValue }
