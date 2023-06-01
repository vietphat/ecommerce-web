import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getOrders = async (jwt) => {
  const response = await axios.get(`${base_url}/orders`, {
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  });

  return response.data;
};

const orderServices = {
  getOrders,
};

export default orderServices;
