import axios from 'axios'
import BASE_URL from '@/DescuentOS/services/http-common.js'

class NotificationUserService {
  async getNotifications(ruc){
    const token = localStorage.getItem('token');
    const response = await axios.get(BASE_URL + `quma/notificacion/usuario/listar/${ruc}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  }
}
export default new NotificationUserService();
