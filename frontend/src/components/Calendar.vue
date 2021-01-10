<template>
  <Suspense>
    <template #default>
      <month>
        <div>
          <router-link :to="prevMonth">
            Previous
          </router-link>
          <router-link :to="nextMonth">
            Next
          </router-link>
        </div>
      </month>
    </template>
    <template #fallback>
      <splash />
    </template>
  </Suspense>
</template>

<script>
import Month from '@/components/Month'
import Splash from '@/components/Splash'
import { useParams } from '@/hooks'
import { ROUTE_NAME_CALENDAR } from '@/constants'

export default {
  name: ROUTE_NAME_CALENDAR,
  components: { Month, Splash },
  setup() {
    return useParams()
  },
}
</script>
