<script>
export default {
  name: 'commision-management.component',
  data() {
    return {
      comisionList: [],
      mostrarModal: false,
      nuevaComision: {
        seguro: "",
        envio: "",
        retencion: "",
      },
    };
  },
  methods: {
    abrirModalNuevaComision() {
      this.mostrarModal = true;
    },
    cerrarModal() {
    },
    registrarComision() {
    },
  },
  mounted() {
  },
}
</script>

<template>
  <div class="gestion-comisiones-container">
    <h1>Gestión de Comisiones</h1>

    <table class="tabla-comisiones">
      <thead>
      <tr>
        <th>ID</th>
        <th>Seguro</th>
        <th>Envío</th>
        <th>Retención</th>
      </tr>
      </thead>
    </table>

    <pv-button class="btn-nueva-comision" @click="abrirModalNuevaComision">
      Agregar Nueva Comisión
    </pv-button>

    <div v-if="mostrarModal" class="modal">
      <div class="modal-contenido">
        <h2>Registrar Nueva Comisión</h2>
        <form @submit.prevent="registrarComision">
          <div class="form-group">
            <label for="seguro">Seguro (%)</label>
            <input type="number" id="seguro" v-model="nuevaComision.seguro" required />
          </div>
          <div class="form-group">
            <label for="envio">Envío (%)</label>
            <input type="number" id="envio" v-model="nuevaComision.envio" required />
          </div>
          <div class="form-group">
            <label for="retencion">Retención (%)</label>
            <input type="number" id="retencion" v-model="nuevaComision.retencion" required />
          </div>

          <pv-button type="submit" class="btn-registrar">Registrar</pv-button>
          <pv-button @click="cerrarModal" class="btn-cancelar">Cancelar</pv-button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gestion-comisiones-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.tabla-comisiones {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.tabla-comisiones th,
.tabla-comisiones td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.tabla-comisiones th {
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
