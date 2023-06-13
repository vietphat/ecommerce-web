import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}/product-categories`);

  return response.data;
};

const createProductCategory = async (productCategory) => {
  const response = await axios.post(
    `${base_url}/product-categories`,
    productCategory,
    config
  );

  return response.data;
};

const productCategoryServices = {
  getProductCategories,
  createProductCategory,
};

export default productCategoryServices;
