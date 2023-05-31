import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBrands = async (jwt) => {
  const response = await axios.get(`${base_url}/brands`);

  return response.data;
};

const brandServices = {
  getBrands,
};

export default brandServices;
