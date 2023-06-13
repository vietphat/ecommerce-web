import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getCoupons = async () => {
  const response = await axios.get(`${base_url}/coupons`, config);

  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await axios.post(`${base_url}/coupons`, coupon, config);

  return response.data;
};

const couponServices = {
  getCoupons,
  createCoupon,
};

export default couponServices;
