// const BASE_URL = process.env.REACT_APP_BASE_URL;

// const getToken = () => localStorage.getItem('token');

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

// // ✅ FIXED: use backticks, not single quotes
// export const getAllCustomers = async () => {
//   const res = await fetch(`${BASE_URL}/api/custom-customer/get`, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${getToken()}`
//     }
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

export const createBulkCallOrder = async ({ customer, orders }) => {
  const res = await fetch(`${BASE_URL}/api/admin/callorder/create-multiple`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ customer, orders })
  });
  return res.json();
};

export const getAllCustomers = async () => {
  const res = await fetch(`${BASE_URL}/api/custom-customer/get`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return res.json();
};
