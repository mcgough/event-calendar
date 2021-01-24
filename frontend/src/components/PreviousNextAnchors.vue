<template>
  <div class="flex mr-4">
    <router-link
      :to="previous"
      class="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center focus:outline-none focus:ring-1"
      ><svg
        class="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        /></svg
    ></router-link>
    <router-link
      :to="next"
      class="w-8 h-8 hover:bg-gray-100 rounded-full flex items-center justify-center focus:outline-none focus:ring-1"
      ><svg
        class="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        /></svg
    ></router-link>
  </div>
</template>

<script>
export default {
  props: {
    previous: String,
    next: String,
  },
}
</script>

<style></style>
