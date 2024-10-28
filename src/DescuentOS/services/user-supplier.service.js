import axios from 'axios'
import BASE_URL from '@/DescuentOS/services/http-common.js'


class UserSupplierService {

  async registerUserSupplier(data){
    const token = localStorage.getItem('token');
    return axios.post(`${BASE_URL}quma/clienteproveedor/usuario/insertar`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

export default new UserSupplierService();
