import axios from 'axios'

const API = 'http://localhost:3000/'

class UserService {

  async login(username, password){
    console.log("Username: " + username + " Password: " + password);
    const response = await axios.get(API + `usuario_cliente_proveedor`, {
      params: {
        usuario: username,
        contrasena: password
      }
    });
    return response.data.length > 0 ? response.data[0].id : null;
  }

  async getUserRUC(id){
    const response = await axios.get(API + `cliente_proveedor`, {
      params: {
        usuario_cliente_proveedor_id: id
      }
    });
    return response.data[0].ruc;
  }

  async postUser(data){
    return axios.post(API + "usuario_cliente_proveedor", data);
  }

  async postUserSupplier(data){
    return axios.post(API + "cliente_proveedor", data);
  }
}

export default new UserService();
