<template>
  <teleport to=".top-level-nav .logo">
    <div class="flex items-center">
      <svg
        class="w-12"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span class="text-2xl ml-2">Calendar</span>
    </div>
  </teleport>
  <teleport to=".top-level-nav .today">
    <v-button :styles="['w-20', 'mr-4']">
      <today-anchor />
    </v-button>
  </teleport>
  <teleport to=".top-level-nav .sub-view-select">
    <sub-view-select />
  </teleport>
  <router-view />
</template>

<script>
import VButton from '@/components/Button.vue'
import TodayAnchor from '@/components/TodayAnchor.vue'
import SubViewSelect from '@/components/SubViewSelect.vue'

export default {
  components: { VButton, TodayAnchor, SubViewSelect },
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.top-level-nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}
.logo {
  width: 16rem;
}
.header {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
