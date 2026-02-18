import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

const vuetify = createVuetify()

createApp(App).use(vuetify).mount('#app')