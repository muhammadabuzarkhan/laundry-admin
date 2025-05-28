// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const getToken = () => localStorage.getItem('token');

// export const fetchCategories = async () => {
//   const res = await fetch(`${BASE_URL}/api/admin/auth/category/get`, {
//     headers: { Authorization: `Bearer ${getToken()}` }
//   });
//   return res.json();
// };

// export const fetchSubCategories = async (categoryId) => {
//   const res = await fetch(`${BASE_URL}/api/admin/auth/subcategory/get/${categoryId}`, {
//     headers: { Authorization: `Bearer ${getToken()}` }
//   });
//   return res.json();
// };

// export const fetchProducts = async (categoryId) => {
//   const res = await fetch(`${BASE_URL}/api/admin/auth/product/get/${categoryId}`, {
//     headers: { Authorization: `Bearer ${getToken()}` }
//   });
//   return res.json();
// };

// export const createCallOrder = async (payload) => {
//   const res = await fetch(`${BASE_URL}/api/callorder/create`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${getToken()}`
//     },
//     body: JSON.stringify(payload)
//   });
//   return res.json();
// };


const BASE_URL = process.env.REACT_APP_BASE_URL;

const getToken = () => localStorage.getItem('token');

export const createCallOrder = async (payload) => {
  const res = await fetch(`${BASE_URL}/api/callorder/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(payload)
  });
  return res.json();
};
