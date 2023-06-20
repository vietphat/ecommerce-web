import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getOrders = async () => {
  const response = await axios.get(`${base_url}/orders`, config());

  return response.data;
};

const getOrderById = async (orderID) => {
  const response = await axios.get(`${base_url}/orders/${orderID}`, config());

  return response.data;
};

const updateOrderStatus = async (data) => {
  const response = await axios.patch(
    `${base_url}/orders/${data.orderId}`,
    { orderStatus: data.orderStatus },
    config()
  );

  return response.data;
};

const orderServices = {
  getOrders,
  getOrderById,
  updateOrderStatus,
};

export default orderServices;
