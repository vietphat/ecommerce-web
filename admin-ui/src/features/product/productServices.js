import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getProducts = async (jwt) => {
  const response = await axios.get(`${base_url}/products`);

  return response.data;
};

const getProductById = async (id) => {
  const response = await axios.get(`${base_url}/products/${id}`);

  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}/products`, product, config());

  return response.data;
};

const editAProduct = async (productData) => {
  const response = await axios.patch(
    `${base_url}/products/${productData._id}`,
    productData.product,
    config()
  );

  return response.data;
};

const deleteAProduct = async (id) => {
  const response = await axios.delete(`${base_url}/products/${id}`, config());

  return { ...response.data, deletedProductId: id };
};

const productServices = {
  getProducts,
  getProductById,
  createProduct,
  editAProduct,
  deleteAProduct,
};

export default productServices;
