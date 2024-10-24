import axios from 'axios'

const API = 'http://localhost:3000/'

class BillService {
  async postBill(data){
    return axios.post(API + "factura", data);
  }

  async getBillBySupplierRUC(ruc){
    const response = await axios.get(API + `factura`, {
      params: {
        cliente_proveedor_RUC: ruc
      }
    });
    return response.data.length > 0 ? response.data : null;
  }
}

export default new BillService();
