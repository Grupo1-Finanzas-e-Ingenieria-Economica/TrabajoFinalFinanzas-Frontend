<script>

import BillService from '@/DescuentOS/services/bill.service.js'

export default {
  name: 'register-bill.component',
  data() {
    return {
      factura: {
        numero: null,
        montoTotalIgv: null,
        moneda: 'PEN',
        fechaEmision: null,
        fechaVencimiento: null,
        rucClienteProveedor: '',
        rucClienteDeudor: '',
      },
      monedas: ['PEN', 'USD'],


    };
  },
  methods: {

    async guardarFactura() {

      const nueva_factura = {
          id: null,
          numero_factura: this.factura.numero,
          montoTotalIGV: parseFloat(this.factura.montoTotalIgv),
          moneda: this.factura.moneda,
          fechaEmision: this.factura.fechaEmision,
          fechaVencimiento: this.factura.fechaVencimiento,
          cliente_proveedor_RUC: localStorage.getItem('rucUser'),
          cliente_deudor_RUC: this.factura.rucClienteDeudor,
      }

      console.log(nueva_factura);

      await BillService.postBill(nueva_factura);

      this.$router.push('/pick-rate');
    },
  },
}
</script>

<template>
  <div class="nueva-factura-container">
    <h1>Factura Electrónica</h1>

    <form @submit.prevent="guardarFactura">
      <div class="form-group">
        <label for="numero">Número de Factura</label>
        <pv-input-text type="text" id="numero" v-model="factura.numero" required />
      </div>

      <div class="form-group">
        <label for="montoTotal">Monto Total (con IGV)</label>
        <pv-input-number v-model="factura.montoTotalIgv" inputId="minmaxfraction" :minFractionDigist="2" :maxFractionDigits="5" fluid required />
      </div>
      <div class="form-group">
        <label for="moneda">Moneda</label>
        <pv-select-button v-model="factura.moneda" :options="monedas" aria-labelledby="basic"/>
      </div>

      <div class="form-group">
        <label for="fechaEmision">Fecha de Emisión</label>
        <input type="date" id="fechaEmision" v-model="factura.fechaEmision" required />
      </div>

      <div class="form-group">
        <label for="fechaVencimiento">Fecha de Vencimiento</label>
        <input type="date" id="fechaVencimiento" v-model="factura.fechaVencimiento" required />
      </div>

      <div class="form-group">
        <label for="rucClienteProveedor">RUC Cliente</label>
        <input type="text" id="rucClienteProveedor" v-model="factura.rucClienteDeudor" required />
      </div>
      <div class="form-group">
        <button type="submit" class="btn-guardar">CONFIRMAR</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

.nueva-factura-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input:focus, select:focus {
  outline: none;
  border-color: #4caf50;
}

.btn-guardar {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-guardar:hover {
  background-color: #45a049;
}
</style>
