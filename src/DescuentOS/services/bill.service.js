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
    const token = localStorage.getItem('token');
    const response = await axios.get(BASE_URL + `quma/factura/usuario/listar/${ruc}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data.length > 0 ? response.data : null;
  }

  async getBillById(id){
    const token = localStorage.getItem('token');
    const response = await axios.get(BASE_URL + `quma/factura/usuario/facturaid/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }

  async getRecentBills(ruc){
    const token = localStorage.getItem('token');
    const response = await axios.get(BASE_URL + `quma/factura/usuario/facturarecientes/${ruc}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }
}

export default new BillService();
