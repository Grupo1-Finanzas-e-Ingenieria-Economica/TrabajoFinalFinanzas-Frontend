import axios from 'axios';
import BASE_URL from '@/DescuentOS/services/http-common.js';

class UserService {
  async registerUser(data) {
    return axios.post(`${BASE_URL}quma/register`, data);
  }

  async loginUser(data){
    return axios.post(`${BASE_URL}quma/login`, data);
  }

  async getUserRUC(username) {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}quma/clienteproveedor/usuario/cliente/${username}`, {
      headers: {
        Authorization: ` Bearer ${token}`
      }
    });
    return response.data.ruc;
  }

  async getUserDataByUserName(username) {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}quma/cliente/usuario/id/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return `${response.data.nombre + " " + response.data.apellido}`;
  }
}

export default new UserService();
