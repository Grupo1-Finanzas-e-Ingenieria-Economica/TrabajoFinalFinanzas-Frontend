<script>
import BillService from '@/DescuentOS/services/bill.service.js'
import { jwtDecode } from 'jwt-decode'
import UserService from '@/DescuentOS/services/user.service.js'
import FactoringOperationService from '@/DescuentOS/services/factoring-operation.service.js'
import EffectiveRateService from "@/DescuentOS/services/effective-rate.service.js";
import CommissionService from "@/DescuentOS/services/commission.service.js";
import Swal from "sweetalert2";
import DiscountService from "@/DescuentOS/services/discount.service.js";

export default {
  name: 'bill-management.component',
  computed: {},
  data() {
    return {
      facturas: [],
      factoringValidation:{},
      filteredBillList: [],
      showSoles: true,
      showDolares: true,
    }
  },
  methods: {

    filterBill() {
      if (this.showSoles && this.showDolares || !this.showSoles && !this.showDolares) {
        this.filteredBillList = this.facturas;
      } else if (this.showSoles) {
        this.filteredBillList = this.facturas.filter(factura => factura.moneda === 'PEN');
      } else if (this.showDolares) {
        this.filteredBillList = this.facturas.filter(factura => factura.moneda === 'USD');
      }
    },

    registrarNuevaFactura() {
      this.$router.push('/register-bill')
    },
    async fetchFacturas() {
      const token = localStorage.getItem('token')
      const decoded = jwtDecode(token)
      const username = decoded.username

      const rucUser = await UserService.getUserRUC(username)

      this.facturas = await BillService.getBillBySupplierRUC(rucUser)

      for (const factura of this.facturas) {
        this.factoringValidation[factura.id] = await this.isFactoring(factura.id)
      }
      this.filterBill();
    },

    formatNumber(value) {
      return parseFloat(value).toFixed(2)
    },

    formatInterestRate(rate) {
      return (rate * 100).toFixed(7)
    },

    formatDateTime(dateTime) {
      const date = new Date(dateTime)
      const formattedDate = date.toLocaleDateString()
      const formattedTime = date.toLocaleTimeString()
      return `${formattedDate} ${formattedTime}`
    },

    returnToDashboard() {
      this.$router.push('/dashboard')
    },

    async isFactoring(id) {
      return await FactoringOperationService.validateBillwithFactoringOperation(id)
    },

    async createFactoring(id, moneda) {

      const tasa_efectiva = await EffectiveRateService.getEffectiveRate();
      const tasa = tasa_efectiva[0];

      const idComision = await CommissionService.getCommissionIdByCurrency(moneda);

      const comision = await CommissionService.getFullCommissionByCurrency(moneda);

      const monedaSimbolo = moneda === 'PEN' ? 'S/.' : '$';

      Swal.fire({
        title: 'Confirmación de Tasa',
        html: `
          <p><strong>Tasa de Interés:</strong> ${this.formatInterestRate(tasa.tasaInteres)}%</p>
          <p><strong>Plazo:</strong> ${tasa.plazo}</p>
          <p><strong>Fecha de Inicio:</strong> ${this.formatDateTime(tasa.fechaInicio)}</p>
          <p><strong>Fecha de Fin:</strong> ${this.formatDateTime(tasa.fechaFin)}</p>
          <p><strong>Comision </strong></p>
          <p><strong>Estudio Riesgo: </strong> ${monedaSimbolo}${this.formatNumber(comision.estudioRiesgo)}</p>
          <p><strong>Seguro de Degravamen: </strong> ${this.formatInterestRate(comision.seguroDesgravamen)}%</p>
          <p><strong>Foto copias: </strong>  ${monedaSimbolo}${this.formatNumber(comision.fotoCopias)}</p>
          <p><strong>Gastos administrativos: </strong> ${monedaSimbolo}${this.formatNumber(comision.gastoAdministracion)}</p>
          <p><strong>Portes: </strong> ${monedaSimbolo}${this.formatNumber(comision.porte)}</p>
          <p><strong>Moneda: </strong>${moneda}</p>
          <p>¿Desea continuar?</p>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {

          const discount = {
            fecha: "",
            idComision: idComision,
            idTasaNominal: 0,
            idTasaEfectiva: tasa.id,
          };

          const discountId = await DiscountService.postDiscount(discount);

          const factoring = {
            idDescuento: discountId.data,
            idFactura: id
          };

          const operacion_factoring = await FactoringOperationService.postFactoringOperation(factoring);

          this.$router.push('/factoring-management');
        } else {
          this.$router.push('/bill-management');
        }
      });
    }
  },
  async mounted() {
    await this.fetchFacturas()
  },
  watch: {
    showSoles() {
      this.filterBill()
    },
    showDolares() {
      this.filterBill()
    }
  }
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

    <div class="filter-container">
      <div class="checkbox-group">
        <pv-checkbox v-model="showSoles" binary />
        <label for="soles">Soles</label>
        <pv-checkbox v-model="showDolares" binary />
        <label for="dolares">Dólares</label>
      </div>
    </div>

    <div class="facturas-table">
      <pv-data-view :value="filteredBillList">
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
            <div
              v-for="(factura, index) in slotProps.items"
              :key="index"
              class="table-row"
            >
              <div class="table-cell">
                <span class="cell-label">Numero Factura:</span
                >{{ factura.numero }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Monto Total:</span>S/.{{
                  formatNumber(factura.montoTotal)
                }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Monto Total (IGV):</span>S/.{{
                  formatNumber(factura.montoTotalIgv)
                }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Moneda:</span>{{ factura.moneda }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Fecha Emision:</span
                >{{ factura.fechaEmision }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Fecha Vencimiento:</span
                >{{ factura.fechaVencimiento }}
              </div>
              <div class="table-cell">
                <span class="cell-label">RUC cliente deudor:</span
                >{{ factura.rucClienteDeudor }}
              </div>
              <div class="table-cell">
                <pv-button
                  v-if="!factoringValidation[factura.id]"
                  @click="createFactoring(factura.id, factura.moneda)"
                  label="Realizar factoring"
                />
              </div>
            </div>
          </div>
        </template>
      </pv-data-view>
    </div>
  </div>
</template>

<style scoped>

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

.facturas-container {
  padding: 1rem;
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
