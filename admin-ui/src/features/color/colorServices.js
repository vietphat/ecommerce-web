import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getColors = async () => {
  const response = await axios.get(`${base_url}/colors`);

  return response.data;
};

const getAColor = async (id) => {
  const response = await axios.get(`${base_url}/colors/${id}`, config);

  return response.data;
};

const createColor = async (color) => {
  const response = await axios.post(`${base_url}/colors`, color, config);

  return response.data;
};

const editAColor = async (colorData) => {
  const response = await axios.patch(
    `${base_url}/colors/${colorData._id}`,
    colorData.color,
    config
  );

  return response.data;
};

const deleteAColor = async (id) => {
  const response = await axios.delete(`${base_url}/colors/${id}`, config);

  return { ...response.data, deletedColorId: id };
};

const colorServices = {
  getColors,
  getAColor,
  createColor,
  editAColor,
  deleteAColor,
};

export default colorServices;
