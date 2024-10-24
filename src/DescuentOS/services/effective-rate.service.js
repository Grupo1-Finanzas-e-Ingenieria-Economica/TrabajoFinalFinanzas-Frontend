import axios from 'axios'

const API = 'http://localhost:3000/'

class EffectiveRateService {
  async postEffectiveRate(data){
    const response = await axios.post(API + "tasa_efectiva", data);

    return response.data.length > 0 ? response.data : null;
  }

  async getEffectiveRate(){
    const response = await axios.get(API + "tasa_efectiva");

    return response.data.length > 0 ? response.data : null;
  }
}

export default new EffectiveRateService();
