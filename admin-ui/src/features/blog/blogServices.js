import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBlogs = async (jwt) => {
  const response = await axios.get(`${base_url}/blogs`);

  return response.data;
};

const blogServices = {
  getBlogs,
};

export default blogServices;
