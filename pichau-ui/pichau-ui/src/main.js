import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/styles/global.css'

import { router } from '@/router'
import App from '@/App.vue'

createApp(App).use(createPinia()).use(router).mount('#app')
