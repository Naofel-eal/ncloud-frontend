import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/variable.css'
import './assets/css/style.css'
import router from './router/index.js'
import Axios from '@/services/interceptors.js'

createApp(App)
  .use(router)
  .mount("#app");