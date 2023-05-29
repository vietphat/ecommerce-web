import axios from 'axios';
import { base_url } from '../../utils/base_url';

const login = async (userData) => {
  const response = await axios.post(`${base_url}/auth/admin-login`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const authServices = {
  login,
};

export default authServices;
