import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import InputText from "primevue/inputtext";
import Aura from "@primevue/themes/aura";
import "./resources/primevue-sass-theme-main/themes/aura/aura-light/green/theme.scss";



const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  }
})
app.component('pv-input-text', InputText)

app.mount('#app')
