import './styles/tailwind.css';

import { createApp } from "vue";
import App from "./App.vue";

// import router, { setupRouter } from './router';
// import { setupNaive, setupDirectives } from '@/plugins';
import { AppProvider } from '@/components/Application';

async function bootstrap() {
  const appProvider = createApp(AppProvider);

  const app = createApp(App);

  // setupNaive(app);
  // setupDirectives(app);

  appProvider.mount('#appProvider', true);

  // await setupRouter(app);
  // await router.isReady();

  app.mount('#app', true);
}

void bootstrap();
