import { createApp } from 'vue';
import { createPinia } from 'pinia';
import pinDirective from './shared/pin-directive';
import App from './App.vue';
import router from './router';

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .directive('pin', pinDirective)
  .mount('#app');
