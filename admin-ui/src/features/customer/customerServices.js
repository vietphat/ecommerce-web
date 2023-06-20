import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getUserById = async (id) => {
  const response = await axios.get(`${base_url}/users/${id}`, config());

  return response.data;
};

const getUsers = async () => {
  const response = await axios.get(`${base_url}/users`, config());

  return response.data;
};

const editUserRole = async (data) => {
  const response = await axios.patch(
    `${base_url}/users/${data._id}`,
    { role: data.role },
    config()
  );

  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${base_url}/users/${userId}`, config());

  return { ...response.data, deletedUserId: userId };
};

const customerServices = {
  getUsers,
  getUserById,
  editUserRole,
  deleteUser,
};

export default customerServices;
