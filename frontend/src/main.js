import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCalendarAlt,
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'

library.add(faCalendarAlt, faChevronRight, faChevronLeft)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(router)
  .mount('#app')
