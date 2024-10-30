<script>
import UserDebtorService from '@/DescuentOS/services/user-debtor.service.js'

export default {
  name: 'clients-management.component',
  data() {
    return {
      deudores: [],
      filtroRuc: "",
      filtroNombre: "",
      mostrarModal: false,
      nuevoCliente: {
        ruc: "",
        nombreEmpresa: "",
        direccionEmpresa: "",
        telefonoEmpresa: "",
        correoEmpresa: "",
        tipo: "Proveedor",
      },
      tipo_cliente: ["Proveedor", "Deudor"]
    };
  },
  methods: {
    async fetchClients() {
      this.deudores = await UserDebtorService.getDebtors();
    },
    buscarClientes() {
    },
  },
  async mounted() {
    await this.fetchClients()
  },
}
</script>

<template>
  <div class="gestion-clientes-container">
    <h1>Gestión de Clientes (Proveedores y Deudores)</h1>

    <div class="filtros">
      <input type="text" v-model="filtroRuc" placeholder="Buscar por RUC" class="filtro-input" />
      <input type="text" v-model="filtroNombre" placeholder="Buscar por nombre" class="filtro-input" />
      <pv-button @click="buscarClientes" class="btn-buscar">Buscar</pv-button>
    </div>

    <div class="clients-table">
      <pv-data-view :value="deudores">
        <template #list="slotProps">
          <div class="table-container">
            <div class="table-row table-header">
              <div>RUC</div>
              <div>Nombre Empresa</div>
              <div>Dirección Empresa</div>
              <div>Teléfono Empresa</div>
              <div>Correo Empresa</div>
              <div>Fecha Registro</div>
            </div>

            <div v-for="(deudor, index) in slotProps.items" :key="index" class="table-row">
              <div class="table-cell">
                <span class="cell-label">RUC:</span> {{ deudor.ruc }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Nombre Empresa:</span> {{ deudor.nombreEmpresa }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Dirección Empresa:</span> {{ deudor.direccionEmpresa }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Teléfono Empresa:</span> {{ deudor.telefonoEmpresa }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Correo Empresa:</span> {{ deudor.correoEmpresa }}
              </div>
              <div class="table-cell">
                <span class="cell-label">Fecha Registro:</span> {{ deudor.fechaRegistro }}
              </div>
            </div>
          </div>
        </template>
      </pv-data-view>
    </div>
  </div>
</template>

<style scoped>
.gestion-clientes-container {
  padding: 1rem;
}

.filtros {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filtro-input {
  flex: 1;
  max-width: 200px;
  padding: 0.5rem;
}

.btn-buscar {
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
}

.clients-table {
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

@media (max-width: 768px) {
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
