import axios from 'axios';

const API = 'http://localhost:3000/';

class NominalRateService {
  async postNominalRate(date){
    const response = await axios.post(API + "tasa_nominal", date);

    return response.data;
  }

  async getNominalRate(){
    const response = await axios.get(API + "tasa_nominal");

    return response.data;
  }
}

export default new NominalRateService();
