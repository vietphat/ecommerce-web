import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getBlogCategories = async (jwt) => {
  const response = await axios.get(`${base_url}/blog-categories`);

  return response.data;
};

const createBlogCategory = async (color) => {
  const response = await axios.post(
    `${base_url}/blog-categories`,
    color,
    config
  );

  return response.data;
};

const blogCategoryServices = {
  getBlogCategories,
  createBlogCategory,
};

export default blogCategoryServices;
