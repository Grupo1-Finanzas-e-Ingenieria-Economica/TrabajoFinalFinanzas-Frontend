<script>
export default {
  name: 'clients-management.component',
  data() {
    return {
      clientes: [],
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
  computed: {
  },
  methods: {
    buscarClientes() {
    },
    abrirModalNuevoCliente() {
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    registrarCliente() {
    },
  },
  mounted() {
  },
}
</script>

<template>
  <div class="gestion-clientes-container">
    <h1>Gestión de Clientes (Proveedores y Deudores)</h1>

    <div class="filtros">
      <input type="text" v-model="filtroRuc" placeholder="Buscar por RUC" />
      <input type="text" v-model="filtroNombre" placeholder="Buscar por nombre" />
      <pv-button @click="buscarClientes">Buscar</pv-button>
    </div>

    <table class="tabla-clientes">
      <thead>
      <tr>
        <th>RUC</th>
        <th>Nombre de Empresa</th>
        <th>Dirección</th>
        <th>Teléfono</th>
        <th>Correo</th>
        <th>Tipo</th>
      </tr>
      </thead>
    </table>

    <pv-button class="btn-nuevo-cliente" @click="abrirModalNuevoCliente">
      Agregar Nuevo Cliente
    </pv-button>

    <div v-if="mostrarModal" class="modal">
      <div class="modal-contenido">
        <h2>Registrar Nuevo Cliente</h2>
        <form @submit.prevent="registrarCliente">
          <div class="form-group">
            <label for="ruc">RUC</label>
            <input type="text" id="ruc" v-model="nuevoCliente.ruc" required />
          </div>
          <div class="form-group">
            <label for="nombreEmpresa">Nombre de Empresa</label>
            <input type="text" id="nombreEmpresa" v-model="nuevoCliente.nombreEmpresa" required />
          </div>
          <div class="form-group">
            <label for="direccionEmpresa">Dirección</label>
            <input type="text" id="direccionEmpresa" v-model="nuevoCliente.direccionEmpresa" required />
          </div>
          <div class="form-group">
            <label for="telefonoEmpresa">Teléfono</label>
            <input type="text" id="telefonoEmpresa" v-model="nuevoCliente.telefonoEmpresa" required />
          </div>
          <div class="form-group">
            <label for="correoEmpresa">Correo</label>
            <input type="email" id="correoEmpresa" v-model="nuevoCliente.correoEmpresa" required />
          </div>
          <div class="form-group">
            <label for="tipo">Tipo de Cliente</label>
            <pv-select v-model="nuevoCliente.tipo" :options="tipo_cliente" required></pv-select>
          </div>

          <pv-button type="submit" class="btn-registrar">Registrar</pv-button>
          <pv-button @click="cerrarModal" class="btn-cancelar">Cancelar</pv-button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gestion-clientes-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.filtros {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type="text"] {
  padding: 8px;
  width: 200px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.tabla-clientes {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.tabla-clientes th,
.tabla-clientes td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.tabla-clientes th {
  background-color: #f2f2f2;
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
