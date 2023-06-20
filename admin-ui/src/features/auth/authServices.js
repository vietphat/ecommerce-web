import axios from 'axios';

import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const login = async (userData) => {
  const response = await axios.post(`${base_url}/auth/admin-login`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${base_url}/auth/logout`, config());

  if (response.data) {
    return response.data;
  }
};

const getMonthlyIncomeReport = async () => {
  const response = await axios.get(
    `${base_url}/users/monthly-income-report`,
    config()
  );

  return response.data;
};

const getYearlyIncomeReport = async () => {
  const response = await axios.get(
    `${base_url}/users/yearly-income-report`,
    config()
  );

  return response.data;
};

const getRecentlyOrders = async () => {
  const response = await axios.get(
    `${base_url}/orders?sort=createdAt`,
    config()
  );

  return response.data;
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

const authServices = {
  login,
  logout,
  getMonthlyIncomeReport,
  getYearlyIncomeReport,
  getRecentlyOrders,
  updateMyData,
  forgotPassword,
  resetPassword,
};

export default authServices;
