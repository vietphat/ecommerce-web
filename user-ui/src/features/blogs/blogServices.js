import axios from 'axios';

import { base_url } from '../../utils/base_url';

const getBlogs = async (filter) => {
  const queryString = filter?.blogCategory
    ? `?category=${filter?.blogCategory}`
    : '';

  const response = await axios.get(`${base_url}/blogs${queryString}`);

  return response.data;
};

const getABlog = async (blogId) => {
  const response = await axios.get(`${base_url}/blogs/${blogId}`);

  return response.data;
};

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}/blog-categories`);

  return response.data;
};

export const blogServices = {
  getBlogs,
  getABlog,
  getBlogCategories,
};
