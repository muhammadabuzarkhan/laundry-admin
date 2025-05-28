// ../userService.js
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

export const createUser = async (userData) => {
  const token = localStorage.getItem('token');

  const response = await axios.post(`${BASE_URL}/api/custom-customer/add`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
