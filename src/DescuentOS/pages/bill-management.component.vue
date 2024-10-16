<script>
export default {
  name: 'bill-management.component',
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
    // Función para redirigir a la página de registro de una nueva factura
    registrarNuevaFactura() {
      //this.$router.push('/facturas/registrar');
    },

    // Función para redirigir a la pantalla de edición de una factura
    editarFactura(id) {
      console.log("Id: ", id);
      //this.$router.push(`/facturas/editar/${id}`);
    },

    // Función para eliminar una factura
    eliminarFactura(id) {
      if (confirm('¿Estás seguro de que deseas eliminar esta factura?')) {
        fetch(`http://localhost:8080/factura/eliminar/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              alert('Factura eliminada exitosamente');
              this.listarFacturas(); // Refrescar la lista de facturas
            } else {
              alert('Error al eliminar la factura');
            }
          })
          .catch((error) => {
            console.error('Error al eliminar la factura:', error);
          });
      }
    },
  },
  mounted() {
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
            <div v-for="(factura, index) in slotProps.items" :key="index">
              <div class="factura-data grid grid-cols-6 gap-4 p-6" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                <div>{{ factura.numero }}</div>
                <div>{{ factura.montoTotal }}</div>
                <div>{{ factura.moneda }}</div>
                <div>{{ factura.fechaEmision }}</div>
                <div>{{ factura.fechaVencimiento }}</div>
                <div>{{ factura.clienteProveedor }}</div>
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
