import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getUsers = async (jwt) => {
  const response = await axios.get(`${base_url}/users/customers`, {
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  });

  return response.data;
};

const customerServices = {
  getUsers,
};

export default customerServices;
