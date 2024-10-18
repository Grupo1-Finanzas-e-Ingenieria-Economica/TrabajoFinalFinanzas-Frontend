import axios from 'axios'

const API = 'http://localhost:3000/'

class UserService {
  postUser(data){
    return axios.post(API + "usuario_cliente_proveedor", data);
  }

  postUserSupplier(data){
    return axios.post(API + "cliente_proveedor", data);
  }
}

export default new UserService();
