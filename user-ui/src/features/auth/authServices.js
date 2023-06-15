import axios from 'axios';

import { base_url } from '../../utils/base_url';

const register = async (userData) => {
  const response = await axios.post(`${base_url}/auth/register`, userData);

  if (response.data) {
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}/auth/login`, userData);

  if (response.data) {
    return response.data;
  }
};

export const authServices = {
  register,
  login,
};
