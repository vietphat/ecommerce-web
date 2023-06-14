import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}/product-categories`);

  return response.data;
};

const getAProductCategory = async (id) => {
  const response = await axios.get(
    `${base_url}/product-categories/${id}`,
    config
  );

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

const editAProductCategory = async (productCategoryData) => {
  const response = await axios.patch(
    `${base_url}/product-categories/${productCategoryData._id}`,
    productCategoryData.productCategory,
    config
  );

  return response.data;
};

const deleteAProductCategory = async (id) => {
  const response = await axios.delete(
    `${base_url}/product-categories/${id}`,
    config
  );

  return { ...response.data, deletedProductCategoryId: id };
};

const productCategoryServices = {
  getProductCategories,
  getAProductCategory,
  createProductCategory,
  editAProductCategory,
  deleteAProductCategory,
};

export default productCategoryServices;
