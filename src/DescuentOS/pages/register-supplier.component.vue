<script>
import UserService from '@/DescuentOS/services/user.service.js'

export default {
  name: 'register-supplier.component',
  data() {
    return {
      usuario: {
        ruc: 0,
        nombre_empresa: '',
        direccion: '',
        telefono_empresa: '',
        correo_empresarial: '',
        representante_legal: '',
        fecha_registro: '',
        usuario_cliente_proveedor: 0,
      },
    };
  },
  methods: {
    async registrarUsuario() {
      const user = {
        id: null,
        ruc: this.usuario.ruc,
        nombre_empresa: this.usuario.nombre_empresa,
        direccion: this.usuario.direccion,
        telefono_empresa: this.usuario.telefono_empresa,
        correo_empresarial: this.usuario.correo_empresarial,
        representante_legal: this.usuario.representante_legal,
        fecha_registro: this.usuario.fecha_registro.toISOString().split('T')[0],
        usuario_cliente_proveedor_id: parseInt(localStorage.getItem('userId'))
      }
      const response = await UserService.postUserSupplier(user);

      localStorage.clear();

      console.log(response);
      this.$router.push('/login');
    },
    goToLogin() {
      this.$router.push('/login');
    },
  },
}
</script>

<template>
  <div class="registro-container">
    <div class="form-container">
      <div class="image-container">
        <img src="https://qumachocolate.com/sistema/data/images/logo/Logo%20Q'uma%20Foil.jpg" alt="Logo" class="logo" />
      </div>
      <div class="form-section">
        <h2>Regístrate</h2>
        <form @submit.prevent="registrarUsuario">
          <div class="form-group">
            <label for="documento">RUC</label>
            <pv-input-text type="number" id="documento" v-model="usuario.ruc" required />
          </div>
          <div class="form-group">
            <label for="nombre">Nombre Empresa</label>
            <pv-input-text type="text" id="nombre" v-model="usuario.nombre_empresa" required />
          </div>
          <div class="form-group">
            <label for="apellido">Direccion</label>
            <pv-input-text type="text" id="apellido" v-model="usuario.direccion" required />
          </div>
          <div class="form-group">
            <label for="usuario">Telefono Empresa</label>
            <pv-input-text type="text" id="usuario" v-model="usuario.telefono_empresa" required />
          </div>
          <div class="form-group">
            <label for="correo">Correo Empresarial</label>
            <pv-input-text type="email" id="correo" v-model="usuario.correo_empresarial" required />
          </div>
          <div class="form-group">
            <label for="password">Represante Legal</label>
            <pv-input-text type="text" id="password" v-model="usuario.representante_legal" required />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Fecha Registro</label>
            <pv-date-picker v-model="usuario.fecha_registro" dateFormat="dd/mm/yy" required />
          </div>
          <pv-button type="submit" class="btn">Registrarse</pv-button>
        </form>
        <pv-button @click="goToLogin" class="btn-link">¿Ya tienes una cuenta? Inicia sesión</pv-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.registro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #eaf4e2;
}

.form-container {
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
}

.image-container {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4caf50;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.logo {
  max-width: 80%;
  height: auto;
  border-radius: 10px;
}

.form-section {
  width: 50%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

.btn:hover {
  background-color: #45a049;
}

.btn-link {
  margin-top: 10px;
  text-align: center;
  background: none;
  border: none;
  color: #4caf50;
  cursor: pointer;
}

.btn-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .form-container {
    flex-direction: column;
  }

  .image-container {
    width: 100%;
    border-radius: 10px 10px 0 0;
  }

  .form-section {
    width: 100%;
  }
}
</style>
