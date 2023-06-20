import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getAllProducts = async (filters = {}) => {
  const { brand, category, tag, from, to, sort } = filters;

  let queryString = '';
  if (!brand && !category && !tag && !from && !to && !sort) {
    queryString = '';
  } else {
    queryString = `?sort=${sort || 'createdAt'}${
      brand ? '&brand=' + encodeURI(brand) : ''
    }${category ? '&category=' + encodeURI(category) : ''}${
      tag ? '&tag=' + encodeURI(tag) : ''
    }${from ? '&price[gte]=' + from : ''}${to ? '&price[lte]=' + to : ''}`;
  }

  const response = await axios.get(`${base_url}/products${queryString}`);

  return response.data;
};

const getAProduct = async (productId) => {
  const response = await axios.get(`${base_url}/products/${productId}`);

  return response.data;
};

const createReview = async (data) => {
  const response = await axios.patch(
    `${base_url}/products/rating/${data.productId}`,
    data.review,
    config()
  );

  if (response.data) {
    return response.data;
  }
};

export const productServices = {
  getAllProducts,
  getAProduct,
  createReview,
};
