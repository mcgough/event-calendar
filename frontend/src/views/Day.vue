<template>
  <Suspense>
    <template #default>
      <DayDetails>
        <div>
          <Nav :next="nextDay" :prev="prevDay">
            <router-link :to="currentMonth">
              <font-awesome-icon icon="calendar-alt" title="Month View" />
            </router-link>
          </Nav>
        </div>
      </DayDetails>
    </template>
    <template #fallback>
      <div class="loading loading-overlay">
        <div>
          Events Calendar
        </div>
        <div class="fade-in-out"><span class="small">loading...</span></div>
      </div>
    </template>
  </Suspense>
</template>

<script>
import DayDetails from '@/components/DayDetails'
import Nav from '@/components/Nav'
import { useCalendarRouter } from '@/hooks'

export default {
  name: 'day-view',
  components: { DayDetails, Nav },
  setup() {
    return useCalendarRouter()
  },
}
</script>

<style></style>
