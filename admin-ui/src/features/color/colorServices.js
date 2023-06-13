import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getColors = async () => {
  const response = await axios.get(`${base_url}/colors`);

  return response.data;
};

const createColor = async (color) => {
  const response = await axios.post(`${base_url}/colors`, color, config);

  return response.data;
};

const colorServices = {
  getColors,
  createColor,
};

export default colorServices;
