<script>
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import BillService from '@/DescuentOS/services/bill.service.js';
import UserService from '@/DescuentOS/services/user.service.js';
import CommissionService from "@/DescuentOS/services/commission.service.js";
import DiscountService from "@/DescuentOS/services/discount.service.js";
import FactoringOperationService from "@/DescuentOS/services/factoring-operation.service.js";
import EffectiveRateService from "@/DescuentOS/services/effective-rate.service.js";

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
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const username = decoded.username;

      console.log("Id del usuario: " + username);

      const rucUser = await UserService.getUserRUC(username);

      console.log("RUC del usuario: " + rucUser);

      const nueva_factura = {
        numero: this.factura.numero,
        montoTotal: 0,
        montoTotalIgv: parseFloat(this.factura.montoTotalIgv),
        moneda: this.factura.moneda,
        fechaEmision: this.factura.fechaEmision,
        fechaVencimiento: this.factura.fechaVencimiento,
        rucClienteProveedor: rucUser,
        rucClienteDeudor: this.factura.rucClienteDeudor,
      };

      const facturaId = await BillService.postBill(nueva_factura);

      const tasa_efectiva = await EffectiveRateService.getEffectiveRate();
      const tasa = tasa_efectiva[0];

      Swal.fire({
        title: 'Confirmación de Tasa',
        html: `
          <p><strong>Tasa de Interés:</strong> ${tasa.tasaInteres}</p>
          <p><strong>Plazo:</strong> ${tasa.plazo}</p>
          <p><strong>Fecha de Inicio:</strong> ${tasa.fechaInicio}</p>
          <p><strong>Fecha de Fin:</strong> ${tasa.fechaFin}</p>
          <p>¿Desea continuar?</p>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const idComision = await CommissionService.getCommissionIdByCurrency(this.factura.moneda);

          const discount = {
            fecha: "",
            idComision: idComision,
            idTasaNominal: 0,
            idTasaEfectiva: tasa.id,
          };

          console.log('Discount: ', discount);

          const discountId = await DiscountService.postDiscount(discount);

          const factoring = {
            idDescuento: discountId.data,
            idFactura: facturaId.data
          };

          console.log('Factoring: ', factoring);

          const operacion_factoring = await FactoringOperationService.postFactoringOperation(factoring);

          console.log("Response: ", operacion_factoring.data);

          this.$router.push('/factoring-management');
        } else {
          this.$router.push('/bill-management');
        }
      });
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
