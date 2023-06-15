import axios from 'axios';

import { base_url } from '../../utils/base_url';

const getAllProducts = async () => {
  const response = await axios.get(`${base_url}/products`);

  return response.data;
};

const getAProduct = async (productId) => {
  const response = await axios.get(`${base_url}/products/${productId}`);

  return response.data;
};

export const productServices = {
  getAllProducts,
  getAProduct,
};
