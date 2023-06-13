import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getBlogs = async (jwt) => {
  const response = await axios.get(`${base_url}/blogs`);

  return response.data;
};

const createBlog = async (blog) => {
  const response = await axios.post(`${base_url}/blogs`, blog, config);

  return response.data;
};

const blogServices = {
  getBlogs,
  createBlog,
};

export default blogServices;
