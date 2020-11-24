<template>
  <div>
    <div class="nav">
      <div class="year">{{ day.year }}</div>
      <div class="month">
        {{ DAYS_OF_WEEK[dayOfWeek] }} {{ MONTHS[day.month] }}
        {{ day.dayOfMonth }}
      </div>
      <slot></slot>
    </div>
    <div class="details justify-center">
      <ul class="event-list" v-if="day.events.length">
        <li v-for="event in day.events" :key="event.id" class="event">
          <div>
            {{ format(event.when.start_time, 'p') }} -
            {{ format(event.when.end_time, 'p') }}
          </div>
          <div>{{ event.title }}</div>
        </li>
      </ul>
      <div v-else>{{ NO_EVENTS_SCHEDULED }}</div>
    </div>
  </div>
</template>

<script>
import { watch, computed } from 'vue'
import { useCalendarApi } from '@/hooks'
import { useCalendarRouter, useDay } from '@/hooks'
import { MONTHS, DAYS_OF_WEEK, NO_EVENTS_SCHEDULED } from '@/constants'
import { format } from 'date-fns'

export default {
  async setup() {
    let api

    const [day, setDay] = useDay()
    const { params, dayParam } = useCalendarRouter()

    const dayOfWeek = computed(() => day.location[1])

    watch(dayParam, async val => {
      if (val) {
        setDay(
          await api.getDay(new Date(params.value.year, params.value.month, val))
        )
      }
    })

    api = await useCalendarApi()

    setDay(
      await api.getDay(
        new Date(params.value.year, params.value.month, params.value.day)
      )
    )

    return { day, DAYS_OF_WEEK, MONTHS, NO_EVENTS_SCHEDULED, format, dayOfWeek }
  },
}
</script>

<style lang="scss" scoped>
li {
  text-align: left;
  margin-block: 1rem;
  margin-left: -1rem;
}

.event-list {
  margin-top: 0;
}

.details {
  margin-top: 1rem;
}
</style>
