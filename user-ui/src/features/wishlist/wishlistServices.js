import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const addToWishlist = async (productId) => {
  const response = await axios.patch(
    `${base_url}/products/wishlist/${productId}`,
    null,
    config()
  );

  return response.data;
};

const getWishlist = async () => {
  const response = await axios.get(`${base_url}/users/wishlist`, config());

  return response.data;
};

export const wishlistServices = {
  getWishlist,
  addToWishlist,
};
