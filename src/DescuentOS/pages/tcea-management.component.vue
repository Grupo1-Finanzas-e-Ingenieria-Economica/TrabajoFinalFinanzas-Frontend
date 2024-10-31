<script>
export default {
  name: 'tcea-management.component',
  data() {
    return {
      tceaList: [],
      mostrarModal: false,
      nuevaTCEA: {
        tcea: "",
        fecha: "",
        rucCliente: "",
      },
    };
  },
  methods: {
    cargarTCEA() {
    },
    abrirModalNuevaTCEA() {
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
      this.nuevaTCEA = {
        tcea: "",
        fecha: "",
        rucCliente: "",
      };
    },
    registrarTCEA() {
    },
  },
  mounted() {
    this.cargarTCEA();
  }
}
</script>

<template>
  <div class="gestion-tcea-container">
    <h1>Gestión de TCEA (Cartera TCEA)</h1>

    <table class="tabla-tcea">
      <thead>
      <tr>
        <th>ID</th>
        <th>TCEA</th>
        <th>Fecha</th>
        <th>RUC Cliente</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="tcea in tceaList" :key="tcea.id">
        <td>{{ tcea.id }}</td>
        <td>{{ tcea.tcea }}</td>
        <td>{{ tcea.fecha }}</td>
        <td>{{ tcea.rucCliente }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.gestion-tcea-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.tabla-tcea {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.tabla-tcea th,
.tabla-tcea td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.tabla-tcea th {
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-contenido {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}

.btn-registrar {
  background-color: #4caf50;
  margin-top: 10px;
}

.btn-cancelar {
  background-color: #f44336;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
