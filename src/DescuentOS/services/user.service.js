import axios from 'axios'

const API = 'http://localhost:3000/'

class UserService {

  login(data){
    return axios.get(API + "login", data);
  }

  postUser(data){
    return axios.post(API + "usuario_cliente_proveedor", data);
  }

  postUserSupplier(data){
    return axios.post(API + "cliente_proveedor", data);
  }
}

export default new UserService();
