import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './includes/validation.js'
import './assets/css/base.css'
import './assets/css/main.css'

import App from './App.vue'
import router from './router'

const app = createApp(App);

app.use(createPinia());
app.use(VeeValidatePlugin);
app.use(router);

app.mount('#app');
