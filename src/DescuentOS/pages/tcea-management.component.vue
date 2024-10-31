<script>
import UserService from '@/DescuentOS/services/user.service.js'
import OperationTceaService from '@/DescuentOS/services/operation-tcea.service.js'
import { jwtDecode } from 'jwt-decode'

export default {
  name: 'tcea-management.component',
  data() {
    return {
      tceaList: [],
      mostrarModal: false,
      nuevaTCEA: {
        tcea: "",
        fecha: "",
        rucCliente: "",
      },
    };
  },
  methods: {
    async fetchTCEA() {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const username = decoded.username;

      const rucUser = await UserService.getUserRUC(username);

      this.tceaList = await OperationTceaService.getTceaWalletBySupplierRUC(rucUser);
    },
    formatDateTime(dateTime){
      const date = new Date(dateTime);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      return `${formattedDate} ${formattedTime}`;
    }
  },
  async mounted() {
    await this.fetchTCEA();
  }
}
</script>

<template>
  <div class="gestion-tcea-container">
    <h1>Gestión de TCEA (Cartera TCEA)</h1>

    <div class="wallet-table">
      <pv-data-view :value="tceaList">
        <template #list="slotProps">
          <div class="table-container">
            <div class="table-row table-header">
              <div class="table-cell">TCEA</div>
              <div class="table-cell">Fecha</div>
            </div>
            <div v-for="(tcea, index) in slotProps.items" :key="index" class="table-row">
              <div class="table-cell">{{ tcea.tcea }}%</div>
              <div class="table-cell">{{ formatDateTime(tcea.fecha) }}</div>
            </div>
          </div>
        </template>
      </pv-data-view>
    </div>
  </div>
</template>

<style scoped>
.gestion-tcea-container {
  padding: 20px;
  background-color: #f9f9f9;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.wallet-table {
  width: 100%;
  overflow-x: auto;
}

.table-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.table-header {
  font-weight: bold;
  background-color: #4caf50;
  color: #000000;
  padding: 10px 0;
  text-align: center;
}

.table-row {
  display: contents;
}

.table-cell {
  padding: 15px 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  background-color: white;
}

@media (max-width: 768px) {
  .table-container {
    grid-template-columns: 1fr;
  }
  .table-cell {
    text-align: left;
  }
}
</style>
