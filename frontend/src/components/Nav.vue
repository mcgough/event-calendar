<template>
  <div>
    <router-link :to="prev">
      {{ PREVIOUS }}
    </router-link>
    <router-link :to="next">
      {{ NEXT }}
    </router-link>
    <slot></slot>
  </div>
</template>

<script>
const NEXT = 'Next'
const PREVIOUS = 'Previous'

export default {
  props: ['next', 'prev'],
  setup() {
    return { NEXT, PREVIOUS }
  },
}
</script>
