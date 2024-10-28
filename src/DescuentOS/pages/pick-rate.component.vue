<script>
import NominalRateService from '@/DescuentOS/services/nominal-rate.service.js';
import EffectiveRateService from '@/DescuentOS/services/effective-rate.service.js';

export default {
  name: 'pick-rate.component',
  data() {
    return {
      tasa_nominal: [],
      tasa_efectiva: []
    };
  },
  methods: {
    async fetchRates() {
      this.tasa_nominal = await NominalRateService.getNominalRate();
      console.log(this.tasa_nominal);
      this.tasa_efectiva = await EffectiveRateService.getEffectiveRate();
      console.log(this.tasa_efectiva)
    },
    handleEffectiveRateClick(rateId) {
      console.log('Selected Effective Rate ID:', rateId);
    },
    handleNominalRateClick(rateId) {
      console.log('Selected Nominal Rate ID:', rateId);
    }
  },
  async mounted() {
    await this.fetchRates();
  }
}
</script>

<template>
  <div class="rate-container">
    <h2>Nominal Rates</h2>
    <div class="rate-grid">
      <pv-card v-for="tasa in tasa_nominal" :key="tasa.id" @click="handleNominalRateClick(tasa.id)">
        <template #title>{{ tasa.tasaInteres }}%</template>
        <template #content>
          <h3>Plazo: {{ tasa.plazo }}</h3>
          <p>Capitalizacion {{ tasa.capitalizable }}</p>
          <p>Fecha inicio: {{tasa.fechaInicio}}</p>
          <p>Fecha_fin: {{tasa.fechaFin}}</p>
        </template>
      </pv-card>
    </div>
    <h2>Effective Rates</h2>
    <div class="rate-grid">
      <pv-card v-for="tasa in tasa_efectiva" :key="tasa.id" @click="handleEffectiveRateClick(tasa.id)">
        <template #title>{{ tasa.tasaInteres }}%</template>
        <template #content>
          <h3>Plazo: {{ tasa.plazo }}</h3>
          <p>Fecha inicio: {{tasa.fechaInicio}}</p>
          <p>Fecha_fin: {{tasa.fechaFin}}</p>
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
