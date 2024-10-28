import axios from 'axios'
import BASE_URL from '@/DescuentOS/services/http-common.js'

class BillService {
  async postBill(data){
    const token = localStorage.getItem('token');
    return axios.post(`${BASE_URL}quma/factura/usuario/insertar`, data, {
      headers: {
        'Authorization': ` Bearer ${token}`
      }
    });
  }

  async getBillBySupplierRUC(ruc){
    const response = await axios.get(BASE_URL + `factura`, {
      params: {
        cliente_proveedor_RUC: ruc
      }
    });
    return response.data.length > 0 ? response.data : null;
  }
}

export default new BillService();
