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

const updateMyData = async (userData) => {
  const response = await axios.patch(
    `${base_url}/users/update-my-data`,
    userData,
    config()
  );

  if (response.data) {
    return response.data;
  }
};

const forgotPassword = async (email) => {
  const response = await axios.post(`${base_url}/auth/forgot-password`, {
    email,
  });

  if (response.data) {
    return response.data;
  }
};

const resetPassword = async (data) => {
  const response = await axios.patch(
    `${base_url}/auth/reset-password/${data.resetPasswordToken}`,
    data.passwords
  );

  if (response.data) {
    return response.data;
  }
};

export const authServices = {
  register,
  login,
  logout,
  addEnquiry,
  updateMyData,
  forgotPassword,
  resetPassword,
};
