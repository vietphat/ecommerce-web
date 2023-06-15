import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getCart = async () => {
  const response = await axios.get(`${base_url}/users/cart`, config);

  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const response = await axios.post(`${base_url}/users/cart`, cartData, config);

  if (response.data) {
    return response.data;
  }
};

export const cartServices = {
  getCart,
  addToCart,
};
