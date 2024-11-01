import axios from 'axios'
import BASE_URL from "@/DescuentOS/services/http-common.js";

class CommissionService {

  async getCommissionIdByCurrency(currency){
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}quma/comision/usuario/id/${currency}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data
  }
}

export default new CommissionService();
