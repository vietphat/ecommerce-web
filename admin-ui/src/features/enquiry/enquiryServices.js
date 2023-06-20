import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axios_config';

const getEnquiries = async (jwt) => {
  const response = await axios.get(`${base_url}/enquiries`);

  return response.data;
};

const getAnEnquiry = async (id) => {
  const response = await axios.get(`${base_url}/enquiries/${id}`, config());

  return response.data;
};

const editAnEnquiry = async (enquiryData) => {
  const response = await axios.patch(
    `${base_url}/enquiries/${enquiryData._id}`,
    enquiryData.enquiry,
    config()
  );

  return response.data;
};

const deleteAnEnquiry = async (id) => {
  const response = await axios.delete(`${base_url}/enquiries/${id}`, config());

  return { ...response.data, deletedEnquiryId: id };
};

const enquiryServices = {
  getEnquiries,
  getAnEnquiry,
  editAnEnquiry,
  deleteAnEnquiry,
};

export default enquiryServices;
