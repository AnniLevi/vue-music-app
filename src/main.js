import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './includes/validation'
import { auth } from './includes/firebase'
import './assets/css/base.css'
import './assets/css/main.css'

import App from './App.vue'
import router from './router'

let app;

auth.onAuthStateChanged(() => {
  if (app) return;

  app = createApp(App)

  app.use(createPinia());
  app.use(VeeValidatePlugin);
  app.use(router);

  app.mount('#app');
})
