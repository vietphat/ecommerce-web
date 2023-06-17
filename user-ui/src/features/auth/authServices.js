import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

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

const logout = async () => {
  console.log(config());
  const response = await axios.get(`${base_url}/auth/logout`, config());

  if (response.data) {
    return response.data;
  }
};

const addEnquiry = async (enquiryData) => {
  const response = await axios.post(`${base_url}/enquiries`, enquiryData);

  if (response.data) {
    return response.data;
  }
};

export const authServices = {
  register,
  login,
  logout,
  addEnquiry,
};
