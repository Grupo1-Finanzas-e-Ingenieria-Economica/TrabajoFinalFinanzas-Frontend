<script>
import UserService from '@/DescuentOS/services/user.service.js'
import Swal from 'sweetalert2'

export default {
  name: 'the-login.component',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {

      try {
        const user = {
          username: this.username,
          password: this.password
        }

        const response = await UserService.loginUser(user);

        localStorage.setItem('token', response.data.token);

        console.log("Token guardado: " + localStorage.getItem('token'));

        if (response.data.token) {
          this.$router.push('/dashboard');
        }
      } catch {
        if (this.username === '' || this.password === '') {
          Swal.fire({
            icon: 'error',
            title: 'Campos vacíos',
            text: 'Por favor, completa los campos.'
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Credenciales inválidas',
            text: 'Por favor, verifica tu usuario y contraseña.'
          })
        }
      }
    },
    goToRegister(){
      this.$router.push('/register');
    }

  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="image-container">
        <img src="https://qumachocolate.com/sistema/data/images/logo/Logo%20Q'uma%20Foil.jpg" alt="Logo" />
      </div>

      <div class="form-container">
        <h2 class="block text-900 text-xl font-medium mb-2" style="font-family: 'Poppins', sans-serif;">Iniciar Sesión</h2>
        <div class="form-group">
          <label for="username" class="block text-900 text-xl font-medium mb-2" style="font-family: 'Poppins', sans-serif;">Usuario</label>
          <pv-input-text type="text" v-model="username" placeholder="Ingresa tu usuario" required />
        </div>

        <div class="form-group">
          <label for="password" class="block text-900 text-xl font-medium mb-2" style="font-family: 'Poppins', sans-serif;">Contraseña</label>
          <pv-input-text type="password" v-model="password" placeholder="Ingresa tu contraseña" required />
        </div>

        <div class="form-group">
          <a href="#" class="forgot-password" style="font-family: 'Poppins', sans-serif;">¿Olvidaste tu contraseña?</a>
        </div>

        <div class="button-group">
          <pv-button type="submit" @click="handleLogin" class="btn">Ingresar</pv-button>
          <pv-button type="button"  @click="goToRegister" class="btn btn-secondary">Registrarse</pv-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #28a745;
}

.login-box {
  display: flex;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fff;
}

.image-container img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.form-container {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.forgot-password {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn:hover {
  opacity: 0.9;
}


@media (max-width: 768px) {
  .login-box {
    flex-direction: column;
  }

  .image-container {
    padding: 10px;
  }

  .form-container {
    padding: 20px;
  }
}
</style>
