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
            <label for="nombre">Nombre de usuario</label>
            <pv-input-text type="text" id="nombre" v-model="usuario.nombre" required />
          </div>
          <div class="form-group">
            <label for="correo">Correo electrónico</label>
            <pv-input-text type="email" id="correo" v-model="usuario.correo" required />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <pv-input-text type="password" id="password" v-model="usuario.password" required />
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirmar contraseña</label>
            <pv-input-text type="password" id="confirmPassword" v-model="usuario.confirmPassword" required />
          </div>
          <pv-button type="submit" class="btn">Registrarse</pv-button>
        </form>
        <pv-button @click="goToLogin" class="btn-link">¿Ya tienes una cuenta? Inicia sesión</pv-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'the-register.component',
  data() {
    return {
      usuario: {
        nombre: '',
        correo: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    registrarUsuario() {},
    goToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

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
