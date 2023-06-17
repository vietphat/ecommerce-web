import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getCart = async () => {
  const response = await axios.get(`${base_url}/users/cart`, config());

  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const response = await axios.post(
    `${base_url}/users/cart`,
    cartData,
    config()
  );

  if (response.data) {
    return response.data;
  }
};

const updateQuantity = async (cartData) => {
  const response = await axios.patch(
    `${base_url}/users/cart/${cartData.id}`,
    { quantity: cartData.quantity },
    config()
  );

  if (response.data) {
    return response.data;
  }
};

const deleteCartItem = async (cartId) => {
  const response = await axios.delete(
    `${base_url}/users/cart/${cartId}`,
    config()
  );

  if (response.data) {
    return response.data;
  }
};

const deleteCartsAfterOrder = async (cartIds) => {
  const response = await axios.post(
    `${base_url}/users/cart/order`,
    { cartIds },
    config()
  );

  if (response.data) {
    return response.data;
  }
};

export const cartServices = {
  getCart,
  addToCart,
  updateQuantity,
  deleteCartItem,
  deleteCartsAfterOrder,
};
