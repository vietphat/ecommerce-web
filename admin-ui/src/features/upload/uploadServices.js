import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}/upload`, data, config);

  return response.data;
};

const deleteImg = async (publicId) => {
  const response = await axios.delete(`${base_url}/upload/${publicId}`, config);

  return response.data;
};

const uploadServices = {
  uploadImg,
  deleteImg,
};

export default uploadServices;
