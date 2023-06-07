import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getProducts = async (jwt) => {
  const response = await axios.get(`${base_url}/products`);

  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}/products`, product, config);

  return response.data;
};

const productServices = {
  getProducts,
  createProduct,
};

export default productServices;
