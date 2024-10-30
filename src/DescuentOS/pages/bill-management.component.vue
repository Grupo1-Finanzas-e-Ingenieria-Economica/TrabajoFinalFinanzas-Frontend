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

    editarFactura(id) {
      console.log("Id: ", id);
    },

    eliminarFactura(id) {
      console.log(id)
    },

    async fetchFacturas() {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const username = decoded.username;

      console.log("Id del usuario: " + username)

      const rucUser = await UserService.getUserRUC(username);

      this.facturas = await BillService.getBillBySupplierRUC(rucUser);
      console.log(this.facturas);
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

    <div class="actions">
      <pv-button @click="registrarNuevaFactura" class="btn-nueva-factura">
        Registrar Nueva Factura
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
              <div>{{ factura.numero }}</div>
              <div>{{ factura.montoTotal }}</div>
              <div>{{ factura.montoTotalIgv }}</div>
              <div>{{ factura.moneda }}</div>
              <div>{{ factura.fechaEmision }}</div>
              <div>{{ factura.fechaVencimiento }}</div>
              <div>{{ factura.rucClienteDeudor }}</div>
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

.actions {
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
}

.facturas-table {
  width: 100%;
}

.table-container {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.table-header {
  font-weight: bold;
  background-color: #f5f5f5;
}

.table-row div {
  padding: 0.5rem;
}

.table-row .actions {
  display: flex;
  gap: 0.5rem;
}

.btn-nueva-factura {
  background-color: #4CAF50;
  color: white;
}


@media (max-width: 768px) {
  .table-row {
    grid-template-columns: repeat(2, 1fr);
  }
  .table-header {
    display: none;
  }
  .table-row div:nth-child(odd) {
    font-weight: bold;
  }
}
</style>
