import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBlogCategories = async (jwt) => {
  const response = await axios.get(`${base_url}/blog-categories`);

  return response.data;
};

const blogCategoryServices = {
  getBlogCategories,
};

export default blogCategoryServices;
