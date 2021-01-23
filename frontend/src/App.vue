<template>
  <teleport to=".top-level-nav .logo">
    <div class="flex items-center">
      <h1>Google Calendar Clone</h1>
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
  padding: 1rem 1rem 0;
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
