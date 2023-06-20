import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getBlogCategories = async (jwt) => {
  const response = await axios.get(`${base_url}/blog-categories`);

  return response.data;
};

const getABlogCategory = async (id) => {
  const response = await axios.get(
    `${base_url}/blog-categories/${id}`,
    config()
  );

  return response.data;
};

const createBlogCategory = async (color) => {
  const response = await axios.post(
    `${base_url}/blog-categories`,
    color,
    config()
  );

  return response.data;
};

const editABlogCategory = async (blogCategoryData) => {
  const response = await axios.patch(
    `${base_url}/blog-categories/${blogCategoryData._id}`,
    blogCategoryData.blogCategory,
    config()
  );

  return response.data;
};

const deleteABlogCategory = async (id) => {
  const response = await axios.delete(
    `${base_url}/blog-categories/${id}`,
    config()
  );

  return { ...response.data, deletedBlogCategoryId: id };
};

const blogCategoryServices = {
  getBlogCategories,
  getABlogCategory,
  createBlogCategory,
  editABlogCategory,
  deleteABlogCategory,
};

export default blogCategoryServices;
