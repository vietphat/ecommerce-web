import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getProducts = async (jwt) => {
  const response = await axios.get(`${base_url}/products`);

  return response.data;
};

const productServices = {
  getProducts,
};

export default productServices;
