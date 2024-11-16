<script>
import UserService from '@/DescuentOS/services/user.service.js'
import OperationTceaService from '@/DescuentOS/services/operation-tcea.service.js'
import { jwtDecode } from 'jwt-decode'

export default {
  name: 'tcea-management.component',
  data() {
    return {
      tceaList: [],
      filteredTceaList: [],
      mostrarModal: false,
      showSoles: true,
      showDolares: true,
    };
  },
  methods: {
    formatInterestRate(rate) {
      return (rate * 100).toFixed(7);
    },

    async fetchTCEA() {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const username = decoded.username;

      const rucUser = await UserService.getUserRUC(username);

      this.tceaList = await OperationTceaService.getTceaWalletBySupplierRUC(rucUser);
      this.filterTCEA();
    },

    filterTCEA() {
      if (this.showSoles && this.showDolares || !this.showSoles && !this.showDolares) {
        this.filteredTceaList = this.tceaList;
      } else if (this.showSoles) {
        this.filteredTceaList = this.tceaList.filter(tcea => tcea.moneda === 'PEN');
      } else if (this.showDolares) {
        this.filteredTceaList = this.tceaList.filter(tcea => tcea.moneda === 'USD');
      }
    },

    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      return `${formattedDate} ${formattedTime}`;
    },

    returnToDashboard() {
      this.$router.push('/dashboard');
    }
  },
  async mounted() {
    await this.fetchTCEA();
  },
  watch: {
    showSoles() {
      this.filterTCEA();
    },
    showDolares() {
      this.filterTCEA();
    }
  }
}
</script>

<template>
  <div class="gestion-tcea-container">
    <h1>Gestión de TCEA (Cartera TCEA)</h1>

    <pv-button @click="returnToDashboard" class="return-button">
      Volver al dashboard
    </pv-button>

    <div class="filter-container">
      <div class="checkbox-group">
        <pv-checkbox v-model="showSoles" binary />
        <label for="soles">Soles</label>
        <pv-checkbox v-model="showDolares" binary />
        <label for="dolares">Dólares</label>
      </div>
    </div>

    <div class="wallet-table">
      <pv-data-view :value="filteredTceaList">
        <template #list="slotProps">
          <div class="table-container">
            <div class="table-row table-header">
              <div>TCEA</div>
              <div>Cantidad Operaciones</div>
              <div>Montos Nominales</div>
              <div>Montos Descontados</div>
              <div>Montos Recibidos</div>
              <div>Moneda</div>
              <div>Fecha</div>
            </div>
            <div v-for="(tcea, index) in slotProps.items" :key="index" class="table-row">
              <div class="table-cell">
                <span class="cell-label">TCEA: </span> {{ formatInterestRate(tcea.tcea) }}%
              </div>
              <div class="table-cell">
                <span class="cell-label">Cantidad Operaciones: </span> {{tcea.cantidadOperaciones}}
              </div>
              <div class="table-cell">
                <span class="cell-label">Montos Nominales: </span> {{tcea.montosNominales}}
              </div>
              <div class="table-cell">
                <span class="cell-label">Montos Descontados: </span> {{tcea.montosDescontados}}
              </div>
              <div class="table-cell">
                <span class="cell-label">Montos Recibidos: </span> {{tcea.montosRecibidos}}
              </div>
              <div class="table-cell">
                <span class="cell-label">Moneda: </span> {{tcea.moneda}}
              </div>
              <div class="table-cell">
                <span class="cell-label">Fecha: </span> {{ formatDateTime(tcea.fecha) }}
              </div>
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

.filter-container {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.checkbox-group label {
  margin-left: 0.5rem;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.wallet-table {
  width: 100%;
  align-content: center;
}

.table-container {
  display: flex;
  flex-direction: column;
}

.table-header {
  font-weight: bold;
  background-color: #f5f5f5;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.table-cell {
  padding: 0.5rem;
  display: flex;
  align-items: center;
}

.cell-label {
  font-weight: bold;
  margin-right: 0.5rem;
  display: none;
}

.return-button {
  padding: 10px 20px;
  font-size: 1rem;
}


@media (max-width: 768px) {
  .table-header {
    display: none;
  }

  .table-row {
    grid-template-columns: 1fr;
  }

  .table-container {
    grid-template-columns: 1fr;
  }

  .table-cell {
    display: flex;
    flex-direction: row;
    padding: 0.5rem 0;
  }

  .cell-label {
    display: inline;
  }
}
</style>
