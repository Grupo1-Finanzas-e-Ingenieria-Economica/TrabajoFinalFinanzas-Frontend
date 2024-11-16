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
      filteredOperacionesList: [],
      selectedBill: null,
      selectedTcea: null,
      showBillDialog: false,
      showTceaDialog: false,
      showSoles: true,
      showDolares: true,
    }
  },
  methods: {
    formatInterestRate(rate) {
      return (rate * 100).toFixed(7)
    },

    async fetchFactoring() {
      const token = localStorage.getItem('token')
      const decoded = jwtDecode(token)
      const username = decoded.username

      const rucUser = await UserService.getUserRUC(username)

      const operaciones = await FactoringOperationService.getFactoringOperationByRUC(rucUser)
      const facturas = await Promise.all(operaciones.map(op => BillService.getBillById(op.idFactura)))

      this.operacionesList = operaciones.map(op => {
        const factura = facturas.find(f => f.id === op.idFactura)
        return {...op, moneda: factura.moneda}
      })

      this.filterOperaciones()
    },

    filterOperaciones() {
      if (this.showSoles && this.showDolares || !this.showSoles && !this.showDolares) {
        this.filteredOperacionesList = this.operacionesList
      } else if (this.showSoles) {
        this.filteredOperacionesList = this.operacionesList.filter(op => op.moneda === 'PEN')
      } else if (this.showDolares) {
        this.filteredOperacionesList = this.operacionesList.filter(op => op.moneda === 'USD')
      }
    },

    async getBillById(id) {
      this.selectedBill = await BillService.getBillById(id)
      this.showBillDialog = true
    },

    async getTceaByFactoring(id) {
      this.selectedTcea = await OperationTceaService.getTceaByOperation(id)
      this.showTceaDialog = true
    },

    formatDateTime(dateTime) {
      const date = new Date(dateTime)
      const formattedDate = date.toLocaleDateString()
      const formattedTime = date.toLocaleTimeString()
      return `${formattedDate} ${formattedTime}`
    },

    formatNumber(value) {
      return parseFloat(value).toFixed(2)
    },

    returnToDashboard() {
      this.$router.push('/dashboard')
    },
  },
  async mounted() {
    await this.fetchFactoring()
  },
  watch: {
    showSoles() {
      this.filterOperaciones()
    },
    showDolares() {
      this.filterOperaciones()
    }
  }
}
</script>

<template>
  <div class="gestion-factoring-container">
    <h1>Gestión de Operaciones de Factoring</h1>

    <div class="actions-container">
      <pv-button @click="returnToDashboard" class="return-button">
        Volver al dashboard
      </pv-button>
    </div>

    <div class="filter-container">
      <div class="checkbox-group">
        <pv-checkbox v-model="showSoles" binary />
        <label for="soles">Soles</label>
        <pv-checkbox v-model="showDolares" binary />
        <label for="dolares">Dólares</label>
      </div>
    </div>

    <div class="factoring-table">
      <pv-data-view :value="filteredOperacionesList">
        <template #list="slotProps">
          <div class="table-container">
            <div class="table-row table-header">
              <div>Fecha Operacion</div>
              <div>Valor Nominal</div>
              <div>Numero Dias</div>
              <div>Tasa Aplicada</div>
              <div>Tasa descuento</div>
              <div>Descuento</div>
              <div>Costes Iniciales</div>
              <div>Finales</div>
              <div>Valor Neto</div>
              <div>Valor Recibido</div>
              <div>Valor Entregado</div>
            </div>
            <div v-for="(factoring, index) in slotProps.items" :key="index" class="table-row">
              <div class="table-cell">
                <span class="cell-label">Fecha Operacion: </span>{{ formatDateTime(factoring.fechaOperacion) }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Valor Nominal: </span>{{ formatNumber(factoring.valorNominal) }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Numero Dias: </span>{{ factoring.numeroDias }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Tasa Aplicada: </span>{{ formatInterestRate(factoring.tasaEfectivaAplicada) }}%
              </div>
              <div class="table-cell">
                <span class="cell-label">Tasa Descuento: </span>{{ formatInterestRate(factoring.tasaDescuento) }}%
              </div>
              <div class="table-cell">
                <span class="cell-label">Descuento: </span>{{ factoring.descuento }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Costes iniciales: </span>{{ factoring.costesIniciales }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Costes finales: </span>{{ factoring.costesFinales }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Valor Neto: </span>{{ factoring.valorNeto }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Valor Recibido: </span>{{ factoring.valorRecibido }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Valor Entregado: </span>{{ factoring.valorEntregado }}
              </div>
              <div>
                <pv-button
                  @click="getBillById(factoring.idFactura)"
                  label="Factura"
                />
              </div>
              <div>
                <pv-button
                  @click="getTceaByFactoring(factoring.id)"
                  label="TCEA"
                />
              </div>
            </div>
          </div>
        </template>
      </pv-data-view>
    </div>

    <pv-dialog
      v-model:visible="showBillDialog"
      header="Detalles de la Factura"
      :modal="true"
      :closable="true"
    >
      <div v-if="selectedBill" class="bill-details">
        <div class="detail-row">
          <strong>Número:</strong> {{ selectedBill.numero }}
        </div>
        <div class="detail-row">
          <strong>Monto Total:</strong> {{
            formatNumber(selectedBill.montoTotal)
          }}
        </div>
        <div class="detail-row">
          <strong>Monto Total (con IGV):</strong> {{
            formatNumber(selectedBill.montoTotalIgv)
          }}
        </div>
        <div class="detail-row">
          <strong>Moneda:</strong> {{ selectedBill.moneda }}
        </div>
        <div class="detail-row">
          <strong>Fecha de Emisión:</strong> {{ selectedBill.fechaEmision }}
        </div>
        <div class="detail-row">
          <strong>Fecha de Vencimiento:</strong>
          {{ selectedBill.fechaVencimiento }}
        </div>
        <div class="detail-row">
          <strong>RUC Cliente Proveedor:</strong>
          {{ selectedBill.rucClienteProveedor }}
        </div>
        <div class="detail-row">
          <strong>RUC Cliente Deudor:</strong>
          {{ selectedBill.rucClienteDeudor }}
        </div>
      </div>
    </pv-dialog>

    <pv-dialog
      v-model:visible="showTceaDialog"
      header="Detalles de la TCEA"
      :modal="true"
      :closable="true"
    >
      <div v-if="selectedTcea" class="tcea-details">
        <div class="detail-row">
          <strong>TCEA:</strong> {{ formatInterestRate(selectedTcea.tcea) }}%
        </div>
        <div class="detail-row">
          <strong>Fecha:</strong> {{ formatDateTime(selectedTcea.fecha) }}
        </div>
      </div>
    </pv-dialog>
  </div>
</template>

<style scoped>
.gestion-factoring-container {
  padding: 1rem;
}

.filter-container {
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

.table-container {
  display: flex;
  flex-direction: column;
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
  grid-template-columns: repeat(11, 1fr);
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

.actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

@media (max-width: 1000px) {
  .table-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .table-header {
    display: none;
  }

  .table-row div:nth-child(odd) {
    font-weight: bold;
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
