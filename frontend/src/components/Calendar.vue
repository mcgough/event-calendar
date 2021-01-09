<template>
  <Suspense>
    <template #default>
      <Month>
        <div>
          <router-link :to="prevMonth">
            Previous
          </router-link>
          <router-link :to="nextMonth">
            Next
          </router-link>
        </div>
      </Month>
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
import Month from '@/components/Month'
import { useParams } from '@/hooks'
import { ROUTE_NAME_CALENDAR } from '@/constants'

export default {
  name: ROUTE_NAME_CALENDAR,
  components: { Month },
  setup() {
    return useParams()
  },
}
</script>

<style lang="scss">
.loading-overlay {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 2.1rem;
  &.loading {
    display: flex;
  }
  .small {
    font-size: 1rem;
  }
}
a {
  margin: 0.25rem;
}
.nav {
  height: 12vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
  position: relative;
  .year {
    font-size: 3rem;
    position: absolute;
    left: 0;
  }
  .month {
    font-size: 1.8rem;
  }
}
.fade-in-out {
  animation: fadeInOut 1.25s infinite;
}
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
