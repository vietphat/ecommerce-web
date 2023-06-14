import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getBlogs = async (jwt) => {
  const response = await axios.get(`${base_url}/blogs`);

  return response.data;
};

const getABlog = async (id) => {
  const response = await axios.get(`${base_url}/blogs/${id}`, config);

  return response.data;
};

const createBlog = async (blog) => {
  const response = await axios.post(`${base_url}/blogs`, blog, config);

  return response.data;
};

const editABlog = async (blogData) => {
  const response = await axios.patch(
    `${base_url}/blogs/${blogData._id}`,
    blogData.blog,
    config
  );

  return response.data;
};

const deleteABlog = async (id) => {
  const response = await axios.delete(`${base_url}/blogs/${id}`, config);

  return { ...response.data, deletedBlogId: id };
};

const blogServices = {
  getBlogs,
  getABlog,
  createBlog,
  editABlog,
  deleteABlog,
};

export default blogServices;
