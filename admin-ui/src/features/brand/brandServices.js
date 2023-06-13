import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getBrands = async (jwt) => {
  const response = await axios.get(`${base_url}/brands`);

  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}/brands`, brand, config);

  return response.data;
};

const brandServices = {
  getBrands,
  createBrand,
};

export default brandServices;
