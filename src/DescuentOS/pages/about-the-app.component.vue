<script>
export default {
  name: 'help-support.component',

  methods: {
    returnToDashboard() {
      this.$router.push('/dashboard')
    }
  }
}
</script>

<template>
  <div class="help-support-container">
    <h1 class="main-title">Ayuda y Asistencia Técnica</h1>

    <pv-card class="help-card">
      <template #header>
        <br>
        <h2 class="card-title">Introducción</h2>
      </template>
      <template #content>
        <p>
          Bienvenido a la página de ayuda y asistencia técnica. Aquí encontrarás información sobre cómo utilizar nuestra aplicación de tercerización de facturas mediante el factoring.
        </p>
        <p>Imagina que tienes un acuerdo con alguien y te promete pagarte dentro de una cantidad de días:</p>
        <div class="image-container">
          <img src="https://img.freepik.com/fotos-premium/cambiando-dinero-trato-corrupcion-o-acuerdo-rostro_39408-1297.jpg" alt="Acuerdo">
        </div>
        <p>Sin embargo, por situaciones que escapan a tu control, necesitas ese dinero urgentemente:</p>
        <div class="image-container">
          <img src="https://static8.depositphotos.com/1009086/993/i/450/depositphotos_9932687-stock-photo-broke-and-poor-business-man.jpg" alt="Necesidad">
        </div>
        <p>Aquí es donde entra el factoring:</p>
        <div class="image-container">
          <img src="https://mesfix.com/blog/wp-content/uploads/2018/01/destacada-factoring.png" alt="Factoring">
        </div>
        <p>¿En qué consiste el factoring?</p>
        <p>
          El factoring es una operación financiera mediante la cual una empresa cede a una entidad financiera o a una empresa especializada en factoring, una serie de facturas pendientes de cobro a cambio de una cantidad de dinero. De esta forma, la empresa obtiene liquidez inmediata y la entidad financiera o empresa especializada en factoring se queda con el derecho de cobro de las facturas.
        </p>
        <div class="image-container">
          <img src="https://perulcfactoring.com/wp-content/uploads/2021/08/proceso-factoring.png" alt="Proceso de factoring">
        </div>
      </template>
    </pv-card>

    <h1 class="section-title">¿Cómo funciona la web?</h1>

    <pv-card class="help-card">
      <template #header>
        <br>
        <h2 class="card-title">Registro de Facturas</h2>
      </template>
      <template #content>
        <p>
          Para registrar una factura, ingresa la fecha de emisión, la fecha de vencimiento, el monto y la moneda. Luego, acepta la tasa y las comisiones aplicables a tu operación de factoring.
        </p>
        <div class="image-container">
          <img src="../../assets/factura-ingresar.png" alt="Registro de factura">
        </div>
        <div class="image-container">
          <img src="../../assets/ventana-confirmacion.png" alt="Ventana de confirmación">
        </div>
      </template>
    </pv-card>

    <pv-card class="help-card">
      <template #header>
        <br>
        <h2 class="card-title">Operaciones de Factoring</h2>
      </template>
      <template #content>
        <p>
          Una vez que hayas registrado una factura y aceptado las comisiones, se te redirigirá a la sección de operaciones de factoring donde podrás ver un resumen de toda la operación con la factura y TCEA creada.
        </p>
        <div class="image-container">
          <img src="../../assets/gestion-operaciones.png" alt="Gestión de operaciones">
        </div>
        <br>
        <p>
          En caso de no haber aceptado las comisiones, se te creará la factura pero no la operación. De todas formas, puedes crearla en cualquier momento presionando el botón de *Realizar Operación*.
        </p>
        <div class="image-container">
          <img src="../../assets/factura-sinoperacion.jpg" alt="Factura sin operación">
        </div>
      </template>
    </pv-card>

    <pv-card class="help-card">
      <template #header>
        <br>
        <h2 class="card-title">Cartera de TCEA</h2>
      </template>
      <template #content>
        <p>
          En la sección de cartera de TCEA, podrás ver la tasa interna de retorno de todas las TCEA generadas por operaciones de factoring en un día y por moneda.
        </p>
        <div class="image-container">
          <img src="../../assets/gestion-tcea.png" alt="Gestión de TCEA">
        </div>
        <p>
          Una notificación por operación se mostrará en la esquina superior derecha del dashboard.
        </p>
        <div class="image-container">
          <img src="../../assets/notificacion.png" alt="Notificación">
        </div>
      </template>
    </pv-card>

    <h1 class="section-title">¡Y listo!</h1>

    <div class="actions-container">
      <pv-button @click="returnToDashboard" class="return-button">
        Volver al dashboard
      </pv-button>
    </div>
  </div>
</template>

<style scoped>
.help-support-container {
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.main-title, .section-title {
  text-align: center;
  color: #4CAF50;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  color: #4CAF50;
  margin: 0;
}

.help-card {
  margin-bottom: 2rem;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.image-container {
  text-align: center;
  margin: 1rem 0;
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.return-button {
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.return-button:hover {
  background-color: #4CAF50;
}

.actions-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

p {
  text-align: center;
}
</style>
