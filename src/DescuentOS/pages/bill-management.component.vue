<script>
import BillService from '@/DescuentOS/services/bill.service.js'

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
      const rucUser = localStorage.getItem('rucUser');
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
          <div class="flex flex-col">
            <div class="factura-data grid grid-cols-6 gap-4 p-6" >
              <div><h3>Numero Factura</h3></div>
              <div><h3>Monto Total (con IGV)</h3></div>
              <div><h3>Moneda</h3></div>
              <div><h3>Fecha de emisión</h3></div>
              <div><h3>Fecha de vencimiento</h3></div>
              <div><h3>RUC cliente proveedor</h3></div>
            </div>
            <div v-for="(factura, index) in slotProps.items" :key="index">
              <div class="factura-data grid grid-cols-6 gap-4 p-6" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                <div>{{ factura.numero_factura }}</div>
                <div>{{ factura.montoTotalIGV }}</div>
                <div>{{ factura.moneda }}</div>
                <div>{{ factura.fechaEmision }}</div>
                <div>{{ factura.fechaVencimiento }}</div>
                <div>{{ factura.cliente_proveedor_RUC }}</div>
                <div class="flex justify-end col-span-6">
                  <pv-button icon="pi pi-pencil" @click="editarFactura(factura.id)" class="btn-editar"></pv-button>
                  <pv-button icon="pi pi-trash" @click="eliminarFactura(factura.id)" class="btn-eliminar"></pv-button>
                </div>
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
  padding: 20px;
  background-color: #f4f7fa;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.btn-nueva-factura {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-nueva-factura:hover {
  background-color: #45a049;
}

.facturas-table {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #4caf50;
  color: white;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

.btn-editar, .btn-eliminar {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-editar {
  background-color: #ff9800;
  color: white;
}

.btn-editar:hover {
  background-color: #e68900;
}

.btn-eliminar {
  background-color: #f44336;
  color: white;
}

.btn-eliminar:hover {
  background-color: #d32f2f;
}

.factura-data {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
}

.facturas-container {
  padding: 20px;
  background-color: #f4f7fa;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.btn-nueva-factura {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-nueva-factura:hover {
  background-color: #45a049;
}

.facturas-table {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.factura-data {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;
  padding: 10px;
}

@media (max-width: 600px) {
  .factura-data {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 400px) {
  .factura-data {
    grid-template-columns: repeat(2, 1fr);
  }
}

.btn-editar, .btn-eliminar {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-editar {
  background-color: #ff9800;
  color: white;
}

.btn-editar:hover {
  background-color: #e68900;
}

.btn-eliminar {
  background-color: #f44336;
  color: white;
}

.btn-eliminar:hover {
  background-color: #d32f2f;
}
</style>
