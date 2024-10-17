<script>
export default {
  name: 'factoring-management.component',
  data() {
    return {
      operacionesList: [],
    };
  },
  methods: {
  },
  mounted() {
  },
}
</script>

<template>
  <div class="gestion-factoring-container">
    <h1>Gestión de Operaciones de Factoring</h1>
    <table class="tabla-factoring">
      <thead>
      <tr>
        <th>ID Operación</th>
        <th>Cliente Proveedor</th>
        <th>Cliente Deudor</th>
        <th>Monto Total Factura</th>
        <th>Fecha de Operación</th>
        <th>TCEA Aplicada</th>
      </tr>
      </thead>
    </table>

    <pv-button class="btn-nueva-operacion">
      Agregar Nueva Operación
    </pv-button>
  </div>
</template>

<style scoped>
.gestion-factoring-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.tabla-factoring {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.tabla-factoring th,
.tabla-factoring td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.tabla-factoring th {
  background-color: #f2f2f2;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
