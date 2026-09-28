import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
import seon from './seon'

import '@/assets/css/reset.scss'
import '@/assets/css/style.scss'
import '@/assets/css/range_slider.scss'
import '@/assets/css/slimselect.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(seon)

app.mount('#app')
