import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getColors = async (jwt) => {
  const response = await axios.get(`${base_url}/colors`);

  return response.data;
};

const colorServices = {
  getColors,
};

export default colorServices;
