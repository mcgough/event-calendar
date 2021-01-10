<template>
  <div class="w-full max-w-sm m-auto">
    <div class="flex justify-between items-center my-3">
      <div class="font-semibold">
        <span class="month">{{ month.name }} {{ month.year }}</span>
      </div>
      <slot></slot>
    </div>

    <div class="grid grid-cols-7">
      <div
        v-for="(DAY, i) in DAYS_OF_WEEK_SHORT"
        :key="i"
        class="flex justify-center items-center h-8 w-12 text-gray-400"
      >
        <div>{{ DAY }}</div>
      </div>
      <day
        v-for="(day, i) in month.days"
        :dayOfMonth="day?.dayOfMonth"
        :eventCount="day?.eventCount()"
        :timestamp="day?.timestamp"
        :key="i"
      />
    </div>
  </div>
</template>

<script>
import Day from '@/components/Day'
import { watch } from 'vue'
import { DAYS_OF_WEEK_SHORT } from '@/constants'
import { useParams, useState, useCalendarApi } from '@/composables'

export default {
  name: 'Month',
  components: { Day },
  async setup() {
    let api

    const { params } = useParams()
    const [month, setMonth] = useState({})

    watch(params, async val => setMonth(await api.findMonth(val.timestamp)))

    api = await useCalendarApi()

    setMonth(await api.findMonth(params.value.timestamp))

    await api.fetchSetEvents()

    return { DAYS_OF_WEEK_SHORT, month }
  },
}
</script>
