import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getCoupons = async () => {
  const response = await axios.get(`${base_url}/coupons`, config());

  return response.data;
};

const getACoupon = async (id) => {
  const response = await axios.get(`${base_url}/coupons/${id}`, config());

  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await axios.post(`${base_url}/coupons`, coupon, config());

  return response.data;
};

const editACoupon = async (couponData) => {
  const response = await axios.patch(
    `${base_url}/coupons/${couponData._id}`,
    couponData.coupon,
    config()
  );

  return response.data;
};

const deleteACoupon = async (id) => {
  const response = await axios.delete(`${base_url}/coupons/${id}`, config());

  return { ...response.data, deletedCouponId: id };
};

const couponServices = {
  getCoupons,
  getACoupon,
  createCoupon,
  editACoupon,
  deleteACoupon,
};

export default couponServices;
