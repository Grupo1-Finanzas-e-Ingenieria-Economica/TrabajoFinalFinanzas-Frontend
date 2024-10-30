import axios from 'axios'
import BASE_URL from '@/DescuentOS/services/http-common.js'

class DiscountService {

  async postDiscount(data){
    const token = localStorage.getItem('token');
    return axios.post(`${BASE_URL}quma/descuento/usuario/insertar`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}

export default new DiscountService();
