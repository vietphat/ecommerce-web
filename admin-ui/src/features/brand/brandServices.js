import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getBrands = async () => {
  const response = await axios.get(`${base_url}/brands`);

  return response.data;
};

const getABrand = async (id) => {
  const response = await axios.get(`${base_url}/brands/${id}`, config);

  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}/brands`, brand, config);

  return response.data;
};

const editABrand = async (brandData) => {
  const response = await axios.patch(
    `${base_url}/brands/${brandData._id}`,
    brandData.brand,
    config
  );

  return response.data;
};

const deleteABrand = async (id) => {
  const response = await axios.delete(`${base_url}/brands/${id}`, config);

  return { ...response.data, deletedBrandId: id };
};

const brandServices = {
  getBrands,
  getABrand,
  createBrand,
  editABrand,
  deleteABrand,
};

export default brandServices;
