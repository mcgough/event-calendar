<template>
  <div class="flex-auto flex flex-col items-center">
    <div class="flex flex-col items-center relative" v-if="options">
      <div class="w-full">
        <div
          class="
            my-2
            bg-white
            p-1
            flex
            border border-gray-200
            rounded
            cursor-pointer
          "
          @click="onOpenClick"
        >
          <div class="flex flex-auto flex-wrap"></div>
          <input
            :value="modelValue.label"
            disabled
            class="
              cursor-pointer
              p-1
              px-2
              appearance-none
              outline-none
              w-full
              text-gray-800
              select-none
            "
          />
          <div
            class="
              text-gray-300
              w-8
              py-1
              pl-2
              pr-1
              border-l
              flex
              items-center
              border-gray-200
            "
          >
            <button
              class="w-6 h-6 text-gray-600 outline-none focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-up w-4 h-4"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <template v-if="active">
        <transition>
          <div
            class="
              absolute
              shadow
              top-100
              z-40
              w-full
              lef-0
              rounded
              max-h-select
              overflow-y-auto
            "
          >
            <div
              class="flex flex-col w-full"
              v-for="option in options"
              :key="option"
              @click="onOptionClick(option)"
            >
              <div
                class="
                  cursor-pointer
                  w-full
                  border-gray-100
                  rounded-t
                  border-b
                  hover:bg-teal-100
                "
                style=""
              >
                <div
                  class="
                    flex
                    w-full
                    items-center
                    p-2
                    pl-2
                    border-transparent
                    bg-white
                    border-l-2
                    relative
                    hover:bg-teal-600 hover:text-teal-100 hover:border-teal-600
                  "
                >
                  <div class="w-full items-center flex">
                    <div class="mx-2 leading-6">{{ option.label }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Select',
  props: {
    options: Array,
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(_, { emit }) {
    const active = ref(false)

    const onOpenClick = () => (active.value = !active.value)

    const onOptionClick = (option) => (
      emit('update:modelValue', option), (active.value = false)
    )

    return {
      active,
      onOpenClick,
      onOptionClick,
    }
  },
}
</script>

<style>
.top-100 {
  top: 100%;
}
.bottom-100 {
  bottom: 100%;
}
.max-h-select {
  max-height: 300px;
}
</style>
