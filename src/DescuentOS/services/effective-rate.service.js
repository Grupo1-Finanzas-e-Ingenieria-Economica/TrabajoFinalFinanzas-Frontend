import axios from 'axios'
import BASE_URL from '@/DescuentOS/services/http-common.js'


class EffectiveRateService {

  async getEffectiveRate(){
    const token = localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}quma/tasaefectiva/usuario/listar`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data
  }
}

export default new EffectiveRateService();
