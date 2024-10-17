<script>

export default {
  name: 'the-dashboard.component',
  data() {
    return {
      facturas: [
        {
          numero: '001',
          montoTotal: 1000,
          moneda: 'USD',
          fechaEmision: '2021-10-01',
          fechaVencimiento: '2021-10-31',
          clienteProveedor: 'Cliente 1',
        },
        {
          numero: '002',
          montoTotal: 2000,
          moneda: 'USD',
          fechaEmision: '2021-10-02',
          fechaVencimiento: '2021-10-30',
          clienteProveedor: 'Cliente 2',
        },
        {
          numero: '003',
          montoTotal: 3000,
          moneda: 'USD',
          fechaEmision: '2021-10-03',
          fechaVencimiento: '2021-10-29',
          clienteProveedor: 'Cliente 3',
        }
      ],
    };
  },
  methods: {
    goToFacturas() {
      this.$router.push('/bill-management');
    },
    goToClientesDeudores() {
      this.$router.push('/clients-management');
    },
    goToProveedores() {
      this.$router.push('/proveedores');
    },
    goToOperaciones() {
      this.$router.push('/operations');
    },

  },
  mounted() {

  },
}
</script>

<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>
    <div class="card-container">
      <pv-card class="card" @click="goToFacturas">
        <template #title>
          <h2>Facturas</h2>
        </template>
        <template #content>
          <p>Gestiona todas las facturas de tus clientes y proveedores.</p>
        </template>
      </pv-card>

      <pv-card class="card" @click="goToClientesDeudores">
        <template #title>
          <h2>Clientes Deudores</h2>
        </template>
        <template #content>
          <p>Administra tus clientes deudores registrados.</p>
        </template>
      </pv-card>

      <pv-card class="card" @click="goToProveedores">
        <template #title>
          <h2>Proveedores</h2>
        </template>
        <template #content>
          <p>Gestiona la información de tus proveedores.</p>
        </template>
      </pv-card>

      <pv-card class="card" @click="goToOperaciones">
        <template #title>
          <h2>Operaciones</h2>
        </template>
        <template #content>
          <p>Visualiza y gestiona tus operaciones.</p>
        </template>
      </pv-card>
    </div>

    <div class="facturas-section">
      <h2>Facturas Recientes</h2>

      <pv-data-table :value="facturas" tableStyle="min-width: 50rem">
        <pv-column field="numero" header="Número"></pv-column>
        <pv-column field="montoTotal" header="Monto Total"></pv-column>
        <pv-column field="moneda" header="Moneda"></pv-column>
        <pv-column field="fechaEmision" header="Fecha de Emisión"></pv-column>
        <pv-column field="fechaVencimiento" header="Fecha de Vencimiento"></pv-column>
        <pv-column field="clienteProveedor" header="Cliente Proveedor"></pv-column>
      </pv-data-table>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 20px;
  background-color: #f4f7fa;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.card-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.card {
  background-color: white;
  width: 250px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.facturas-section {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
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

@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 90%;
  }
}
</style>
