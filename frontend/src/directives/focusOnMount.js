export const FocusOnMount = {
  mounted(el) {
    el.focus()
  },
  updated(el) {
    el.focus()
  },
}
