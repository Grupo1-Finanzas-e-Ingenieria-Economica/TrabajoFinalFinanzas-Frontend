<script>
import NotificationUserService from '@/DescuentOS/services/notification-user.service.js'
import { jwtDecode } from 'jwt-decode'
import UserService from '@/DescuentOS/services/user.service.js'
import BillService from '@/DescuentOS/services/bill.service.js'

export default {
  name: 'the-dashboard.component',
  data() {
    return {
      facturasRecientes: [],
      notificationes: [],
      unreadNotifications: [],
      cant_notificationes: 0,
      showNotificationDialog: false
    };
  },
  methods: {
    goToFacturas() {
      this.$router.push('/bill-management');
    },
    goToClientesDeudores() {
      this.$router.push('/clients-management');
    },
    goToTCEAWallet() {
      this.$router.push('/tcea-management');
    },
    goToFactoring(){
      this.$router.push('/factoring-management');
    },
    async fetchFacturasRecientes() {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const username = decoded.username;
      const rucUser = await UserService.getUserRUC(username);
      this.facturasRecientes = await BillService.getRecentBills(rucUser);
    },
    async fetchNotificaciones() {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const username = decoded.username;
      const rucUser = await UserService.getUserRUC(username);
      this.notificationes = await NotificationUserService.getNotifications(rucUser);
      this.unreadNotifications = this.notificationes.filter(notification => !notification.leido);
      this.cant_notificationes = this.unreadNotifications.length;
    },
    showNotifications() {
      this.showNotificationDialog = true;
    },
    async markNotificationsAsRead() {
      for (const notification of this.unreadNotifications) {
        await NotificationUserService.readNotifications(parseInt(notification.id));
      }
      this.cant_notificationes = 0;
      this.unreadNotifications = [];
    },
    formatNumber(value) {
      return parseFloat(value).toFixed(2);
    }
  },
  watch: {
    showNotificationDialog(newValue) {
      if (!newValue) {
        this.markNotificationsAsRead();
      }
    }
  },
  mounted() {
    this.fetchNotificaciones();
    this.fetchFacturasRecientes();
  },
}
</script>

<template>
  <div class="dashboard-container">
    <div class="notification-container">
      <pv-overlay-badge :value="cant_notificationes" severity="danger" class="inline-flex" @click="showNotifications">
        <pv-avatar icon="pi pi-bell" shape="circle" size="large"></pv-avatar>
      </pv-overlay-badge>
    </div>
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

      <pv-card class="card" @click="goToFactoring">
        <template #title>
          <h2>Operaciones de Factoring</h2>
        </template>
        <template #content>
          <p>Visualiza tus operaciones de factoring</p>
        </template>
      </pv-card>

      <pv-card class="card" @click="goToTCEAWallet">
        <template #title>
          <h2>Cartera TCEA</h2>
        </template>
        <template #content>
          <p>Visualiza tu cartera TCEA</p>
        </template>
      </pv-card>
    </div>

    <div class="facturas-section">
      <h2>Facturas Recientes</h2>

      <div class="table-container">
        <pv-data-view :value="facturasRecientes">
          <template #list="slotProps">
            <div class="table-container">
              <div class="table-row table-header">
                <div>Numero</div>
                <div>Monto Total</div>
                <div>Moneda</div>
                <div>Fecha Emisión</div>
                <div>Fecha Vencimiento</div>
                <div>RUC Proveedor</div>
                <div>RUC Deudor</div>
              </div>
              <div v-for="(factura, index) in slotProps.items" :key="index" class="table-row">
                <div class="table-cell">
                  <span class="cell-label">Numero:</span> {{ factura.numero }}
                </div>
                <div class="table-cell">
                  <span class="cell-label">Monto Total:</span> {{ formatNumber(factura.montoTotal) }}
                </div>
                <div class="table-cell">
                  <span class="cell-label">Moneda:</span> {{ factura.moneda }}
                </div>
                <div class="table-cell">
                  <span class="cell-label">Fecha de emisión:</span> {{ factura.fechaEmision }}
                </div>
                <div class="table-cell">
                  <span class="cell-label">Fecha de vencimiento:</span> {{ factura.fechaVencimiento }}
                </div>
                <div class="table-cell">
                  <span class="cell-label">RUC cliente proveedor:</span> {{ factura.rucClienteProveedor }}
                </div>
                <div class="table-cell">
                  <span class="cell-label">RUC Cliente deudor:</span> {{ factura.rucClienteDeudor }}
                </div>
              </div>
            </div>
          </template>
        </pv-data-view>
      </div>
    </div>

    <pv-dialog v-model:visible="showNotificationDialog"
               header="Notificaciones"
               :modal="true"
               :closable="true"
               :width="'260vw'"
               :height="'270vh'"
    >
      <ul>
        <li v-for="notification in unreadNotifications" :key="notification.id">
          {{ notification.mensaje }}
        </li>
      </ul>
      <v-if v-show="unreadNotifications.length === 0">No hay notificaciones</v-if>
    </pv-dialog>
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


.table-container {
  display: flex;
  flex-direction: column;
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

.inline-flex {
  display: inline-flex;
  position: relative;
  cursor: pointer;
}


.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
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

.table-header {
  font-weight: bold;
  background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .table-row {
    grid-template-columns: 1fr;
  }

  .card-container {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 90%;
  }

  .table-cell {
    display: flex;
    flex-direction: row;
    padding: 0.5rem 0;
  }

  .cell-label {
    display: inline;
  }

  .table-header {
    display: none;
  }
}
</style>
