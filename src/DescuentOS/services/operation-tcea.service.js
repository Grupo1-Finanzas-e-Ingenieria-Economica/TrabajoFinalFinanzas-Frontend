import axios from 'axios';
import BASE_URL from '@/DescuentOS/services/http-common.js'

class OperationTceaService {

  async getTceaByOperation(id){
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}quma/tceaoperacion/usuario/tceaoperacionfactoring/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  async getTceaWalletBySupplierRUC(ruc){
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}quma/carteratcea/usuario/listar/${ruc}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }
}

export default new OperationTceaService();
