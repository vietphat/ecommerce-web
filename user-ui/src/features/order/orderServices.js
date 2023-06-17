import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const createOrder = async (orderData) => {
  const response = await axios.post(
    `${base_url}/users/order`,
    orderData,
    config()
  );

  if (response.data) {
    return response.data;
  }
};

export const orderServices = {
  createOrder,
};
