<script>
import BillService from '@/DescuentOS/services/bill.service.js'
import { jwtDecode } from 'jwt-decode'
import UserService from '@/DescuentOS/services/user.service.js'

export default {
  name: 'bill-management.component',
  computed:{
  },
  data() {
    return {
      facturas: []

    };
  },
  methods: {
    registrarNuevaFactura() {
      this.$router.push('/register-bill');
    },
    async fetchFacturas() {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const username = decoded.username;

      console.log("Id del usuario: " + username)

      const rucUser = await UserService.getUserRUC(username);

      this.facturas = await BillService.getBillBySupplierRUC(rucUser);
      console.log(this.facturas);
    },

    formatNumber(value) {
      return parseFloat(value).toFixed(2);
    },

    returnToDashboard() {
      this.$router.push('/dashboard');
    }
  },
  async mounted() {
    await this.fetchFacturas();
  },
}
</script>

<template>
  <div class="facturas-container">
    <h1>Gestión de Facturas</h1>

    <div class="actions-container">
      <pv-button @click="registrarNuevaFactura" class="btn-nueva-factura">
        Registrar Nueva Factura
      </pv-button>
      <pv-button @click="returnToDashboard" class="return-button">
        Volver al dashboard
      </pv-button>
    </div>

    <div class="facturas-table">
      <pv-data-view :value="facturas">
        <template #list="slotProps">
          <div class="table-container">
            <div class="table-row table-header">
              <div>Numero Factura</div>
              <div>Monto Total</div>
              <div>Monto Total (con IGV)</div>
              <div>Moneda</div>
              <div>Fecha de emisión</div>
              <div>Fecha de vencimiento</div>
              <div>RUC cliente proveedor</div>
            </div>
            <div v-for="(factura, index) in slotProps.items" :key="index" class="table-row">
              <div class="table-cell">
                <span class="cell-label">Numero Factura:</span>{{ factura.numero }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Monto Total:</span>S/.{{ formatNumber(factura.montoTotal) }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Monto Total (IGV):</span>S/.{{ formatNumber(factura.montoTotalIgv) }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Moneda:</span>{{ factura.moneda }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Fecha Emision:</span>{{ factura.fechaEmision }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Fecha Vencimiento:</span>{{ factura.fechaVencimiento }}
              </div>
              <div class="table-cell">
                <span class="cell-label">RUC cliente deudor:</span>{{ factura.rucClienteDeudor }}
              </div>
            </div>
          </div>
        </template>
      </pv-data-view>
    </div>
  </div>
</template>

<style scoped>

.facturas-container {
  padding: 1rem;
}

.facturas-table{
  width: 100%;
}

.table-container {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
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

.actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn-nueva-factura,
.return-button {
  padding: 10px 20px;
  font-size: 1rem;
}

@media (max-width: 786px) {
  .table-row {
    grid-template-columns: 1fr;
  }

  .table-header {
    display: none;
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
