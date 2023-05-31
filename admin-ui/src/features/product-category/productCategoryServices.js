import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getProductCategories = async (jwt) => {
  const response = await axios.get(`${base_url}/product-categories`);

  return response.data;
};

const productCategoryServices = {
  getProductCategories,
};

export default productCategoryServices;
