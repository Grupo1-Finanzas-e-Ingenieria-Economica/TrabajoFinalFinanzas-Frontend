import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import DataView from 'primevue/dataview'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import Row from 'primevue/row'
import CascadeSelect from 'primevue/cascadeselect'
import SelectButton from 'primevue/selectbutton'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
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
app.component('pv-input-number', InputNumber)
app.component('pv-button', Button)
app.component('pv-card', Card)
app.component('pv-data-table', DataTable)
app.component('pv-data-view', DataView)
app.component('pv-column', Column)
app.component('pv-column-group', ColumnGroup)
app.component('pv-row', Row)
app.component('pv-cascade-select', CascadeSelect)
app.component('pv-select-button', SelectButton)
app.component('pv-select', Select)
app.component('pv-date-picker', DatePicker)

app.mount('#app')
