import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getEnquiries = async (jwt) => {
  const response = await axios.get(`${base_url}/enquiries`);

  return response.data;
};

const enquiryServices = {
  getEnquiries,
};

export default enquiryServices;
