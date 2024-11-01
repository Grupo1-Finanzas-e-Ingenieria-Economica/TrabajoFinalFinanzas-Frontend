<script>
import NominalRateService from '@/DescuentOS/services/nominal-rate.service.js';
import EffectiveRateService from '@/DescuentOS/services/effective-rate.service.js';
import DiscountService from '@/DescuentOS/services/discount.service.js'
import FactoringOperationService from '@/DescuentOS/services/factoring-operation.service.js'
import CommissionService from "@/DescuentOS/services/commission.service.js";
import Swal from "sweetalert2";

export default {
  name: 'pick-rate.component',
  data() {
    return {
      tasa_nominal: [],
      tasa_efectiva: [],
      selectedRate: false
    };
  },
  methods: {
    formatInterestRate(rate) {
      return (rate * 100).toFixed(7);
    },

    checkRateSelection(event) {
      if (!this.selectedRate) {
        event.preventDefault();
        event.returnValue = '';
      }
    },

    async fetchRates() {
      this.tasa_nominal = await NominalRateService.getNominalRate();
      console.log(this.tasa_nominal);
      this.tasa_efectiva = await EffectiveRateService.getEffectiveRate();
      console.log(this.tasa_efectiva)
    },

    formatDateTime(dateTime) {
      return dateTime.replace('T', ' ');
    },

    async handleEffectiveRateClick(rateId) {
      this.selectedRate = true;

      const currency = localStorage.getItem('moneda');

      const idComision = await CommissionService.getCommissionIdByCurrency(currency);

      const discount = {
        fecha: "",
        idComision: idComision,
        idTasaNominal: 0,
        idTasaEfectiva: parseInt(rateId),
      }

      console.log('Selected Effective Rate ID:', rateId);

      const discountId = await DiscountService.postDiscount(discount);
      console.log("Response: ", discountId.data);

      const factoring = {
        idDescuento: parseInt(discountId.data),
        idFactura: parseInt(localStorage.getItem('factura'))
      }

      const operacion_factoring = await FactoringOperationService.postFactoringOperation(factoring)

      console.log("Response: ", operacion_factoring.data);

      this.$router.push('/factoring-management');
    },
    async handleNominalRateClick(rateId) {
      this.selectedRate = true;

      const currency = localStorage.getItem('moneda');

      const idComision = await CommissionService.getCommissionIdByCurrency(currency);

      const discount = {
        fecha: "",
        idComision: idComision,
        idTasaNominal: parseInt(rateId),
        idTasaEfectiva: 0,
      }

      console.log('Selected Nominal Rate ID:', rateId);

      const discountId = await DiscountService.postDiscount(discount);
      console.log("Response: ", discountId.data);

      const factoring = {
        idDescuento: parseInt(discountId.data),
        idFactura: parseInt(localStorage.getItem('factura'))
      }

      console.log("Factoring: ", factoring);

      const operacion_factoring = await FactoringOperationService.postFactoringOperation(factoring)

      console.log("Response: ", operacion_factoring.data);

      this.$router.push('/factoring-management');
    }
  },
  async mounted() {
    await this.fetchRates();
    window.addEventListener('beforeunload', this.checkRateSelection);
    this.$router.beforeEach((to, from, next) => {
      if (!this.selectedRate) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Debe seleccionar una tasa antes de salir.',
          confirmButtonText: 'OK'
        });
        next(false);
      } else {
        next();
      }
    });
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.checkRateSelection);
  }
}
</script>

<template>
  <div class="rate-container">
    <h2>Nominal Rates</h2>
    <div class="rate-grid">
      <pv-card v-for="tasa in tasa_nominal" :key="tasa.id" @click="handleNominalRateClick(tasa.id)">
        <template #title>{{ formatInterestRate(tasa.tasaInteres) }}%</template>
        <template #content>
          <h3>Plazo: {{ tasa.plazo }}</h3>
          <p>Capitalizacion {{ tasa.capitalizable }}</p>
          <p>Fecha inicio: {{ formatDateTime(tasa.fechaInicio) }}</p>
          <p>Fecha_fin: {{ formatDateTime(tasa.fechaFin) }}</p>
        </template>
      </pv-card>
    </div>
    <h2>Effective Rates</h2>
    <div class="rate-grid">
      <pv-card v-for="tasa in tasa_efectiva" :key="tasa.id" @click="handleEffectiveRateClick(tasa.id)">
        <template #title>{{ formatInterestRate(tasa.tasaInteres) }}%</template>
        <template #content>
          <h3>Plazo: {{ (tasa.plazo) }}</h3>
          <p>Fecha inicio: {{ formatDateTime(tasa.fechaInicio) }}</p>
          <p>Fecha_fin: {{ formatDateTime(tasa.fechaFin) }}</p>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<style scoped>
.rate-container {
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.rate-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

pv-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 300px;
  text-align: center;
  flex: 1 1 calc(33.333% - 40px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

pv-card h3,
pv-card p {
  margin: 10px 0;
}

@media (max-width: 768px) {
  .rate-grid {
    flex-direction: column;
    align-items: center;
  }

  pv-card {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
