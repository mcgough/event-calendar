<template>
  <button tabindex="-1" :class="[...baseStyles, ...styles]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['styles'],
  setup() {
    return { baseStyles }
  },
}

const baseStyles = [
  'inline-flex',
  'justify-center',
  'rounded-md',
  'border',
  'border-gray-300',
  'shadow-sm',
  'bg-white',
  'text-sm',
  'font-medium',
  'text-gray-700',
  'hover:bg-gray-50',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-offset-2',
  'focus:ring-offset-gray-100',
  'focus:ring-indigo-500',
]
</script>
