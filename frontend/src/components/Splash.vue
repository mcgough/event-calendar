<template>
  <div :class="loadingOverlay">
    <div>
      Events Calendar
    </div>
    <div class="animate-pulse"><span class="text-base">loading...</span></div>
  </div>
</template>

<script>
export default {
  setup() {
    return { loadingOverlay }
  },
}

const loadingOverlay = [
  'w-full',
  'h-screen',
  'text-4xl',
  'absolute',
  'inset-0',
  'flex',
  'flex-col',
  'justify-center',
  'items-center',
]
</script>
