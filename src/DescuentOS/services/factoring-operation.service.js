import axios from 'axios'
import BASE_URL from '@/DescuentOS/services/http-common.js'

class FactoringOperationService {
  async postFactoringOperation(data){
    const token = localStorage.getItem('token');
    return axios.post(`${BASE_URL}quma/operacionfactoring/usuario/insertar`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

export default new FactoringOperationService();
