import axios from 'axios';

import { base_url } from '../../utils/base_url';

const getBrands = async () => {
  const response = await axios.get(`${base_url}/brands`);

  return response.data;
};

export const brandServices = {
  getBrands,
};
