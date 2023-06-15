import axios from 'axios';

import { base_url } from '../../utils/base_url';

const getBlogs = async () => {
  const response = await axios.get(`${base_url}/blogs`);

  return response.data;
};

const getABlog = async (blogId) => {
  const response = await axios.get(`${base_url}/blogs/${blogId}`);

  return response.data;
};

export const blogServices = {
  getBlogs,
  getABlog,
};
