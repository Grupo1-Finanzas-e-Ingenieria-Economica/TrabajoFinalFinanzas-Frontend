<script>
import FactoringOperationService from '@/DescuentOS/services/factoring-operation.service.js'
import { jwtDecode } from 'jwt-decode'
import UserService from '@/DescuentOS/services/user.service.js'
import BillService from '@/DescuentOS/services/bill.service.js'
import OperationTceaService from '@/DescuentOS/services/operation-tcea.service.js'

export default {
  name: 'factoring-management.component',
  data() {
    return {
      operacionesList: [],
      selectedBill: null,
      selectedTcea: null,
      showBillDialog: false,
      showTceaDialog: false
    };
  },
  methods: {
    async fetchFactoring() {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const username = decoded.username;

      const rucUser = await UserService.getUserRUC(username);

      this.operacionesList = await FactoringOperationService.getFactoringOperationByRUC(rucUser);
    },

    async getBillById(id) {
      this.selectedBill = await BillService.getBillById(id);
      this.showBillDialog = true;
    },

    async getTceaByFactoring(id){
      this.selectedTcea = await OperationTceaService.getTceaByOperation(id);
      this.showTceaDialog = true;
    },

    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      return `${formattedDate} ${formattedTime}`;
    },

    formatNumber(value) {
      return parseFloat(value).toFixed(2);
    }
  },
  async mounted() {
    await this.fetchFactoring();
  },
}
</script>

<template>
  <div class="gestion-factoring-container">
    <h1>Gestión de Operaciones de Factoring</h1>
    <div class="factoring-table">
      <pv-data-view :value="operacionesList">
        <template #list="slotProps">
          <div class="table-container">
            <div class="table-row table-header">
              <div>Fecha Operacion</div>
              <div>Tasa Aplicada</div>
              <div>Monto Descuento</div>
              <div>Monto Pago</div>
              <div>Factura</div>
              <div>TCEA</div>
            </div>
            <div v-for="(factoring, index) in slotProps.items" :key="index" class="table-row">
              <div>{{ formatDateTime(factoring.fechaOperacion) }}</div>
              <div>{{ factoring.tasaInteresAplicada }}%</div>
              <div>S/.{{ formatNumber(factoring.montoDescuento) }}</div>
              <div>S/.{{ formatNumber(factoring.montoPago) }}</div>
              <div><pv-button @click="getBillById(factoring.idFactura)" label="Factura"/></div>
              <div><pv-button @click="getTceaByFactoring(factoring.id)" label="TCEA"/></div>
            </div>
          </div>
        </template>
      </pv-data-view>
    </div>

    <pv-dialog v-model:visible="showBillDialog" header="Detalles de la Factura" :modal="true" :closable="true">
      <div v-if="selectedBill" class="bill-details">
        <div class="detail-row"><strong>Número:</strong> {{ selectedBill.numero }}</div>
        <div class="detail-row"><strong>Monto Total:</strong> S/.{{ formatNumber(selectedBill.montoTotal) }}</div>
        <div class="detail-row"><strong>Monto Total (con IGV):</strong> S/.{{ formatNumber(selectedBill.montoTotalIgv) }}</div>
        <div class="detail-row"><strong>Moneda:</strong> {{ selectedBill.moneda }}</div>
        <div class="detail-row"><strong>Fecha de Emisión:</strong> {{ selectedBill.fechaEmision }}</div>
        <div class="detail-row"><strong>Fecha de Vencimiento:</strong> {{ selectedBill.fechaVencimiento }}</div>
        <div class="detail-row"><strong>RUC Cliente Proveedor:</strong> {{ selectedBill.rucClienteProveedor }}</div>
        <div class="detail-row"><strong>RUC Cliente Deudor:</strong> {{ selectedBill.rucClienteDeudor }}</div>
      </div>
    </pv-dialog>

    <pv-dialog v-model:visible="showTceaDialog" header="Detalles de la TCEA" :modal="true" :closable="true">
      <div v-if="selectedTcea" class="tcea-details">
        <div class="detail-row"><strong>TCEA:</strong> {{ selectedTcea.tcea }}</div>
        <div class="detail-row"><strong>Fecha:</strong> {{ formatDateTime(selectedTcea.fecha) }}</div>
      </div>
    </pv-dialog>
  </div>
</template>

<style scoped>
.gestion-factoring-container {
  padding: 1rem;
}

.factoring-table {
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

.table-row div {
  padding: 0.5rem;
}

.bill-details {
  display: flex;
  flex-direction: column;
}

.tcea-details {
  display: flex;
  flex-direction: column;
}

.detail-row {
  margin-bottom: 0.5rem;
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
