<template>
  <teleport to="#app">
    <div class="overlay">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'Modal',
}
</script>

<style></style>
