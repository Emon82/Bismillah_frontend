import { resType } from '@/api/schemas/search/searchSchema';
import {
  changePasswordInputUrl,
  editUserInputUrl,
  accountHeartbeatUrl,
  refreshUrl,
  getAllProfileUrl,
  paymentUrl,
} from '@/constants/api';

type headerType = {
  Authorization: string;
};
type changePassType = {
  confirmPass: string;
  newPass: string;
  currentPass: string;
};
type editAccountType = {
  name: string;
  phone?: string;
  email?: string;
};

export const changePassDataInput = async (
  data: changePassType,
  headers: headerType,
) => {
  console.log(data);
  try {
    const res = await fetch(changePasswordInputUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
    });
    const json: resType = await res.json();

    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const editAccountDataInput = async (
  data: editAccountType,
  headers: headerType,
) => {
  console.log(data);
  try {
    const res = await fetch(editUserInputUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(data),
    });
    const json: resType = await res.json();

    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const accountHeartbeat = async (headers: headerType) => {
  try {
    const res = await fetch(accountHeartbeatUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    const json: resType = await res.json();

    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// export const refreshUser = async (token: string) => {
//   const res = await fetchDetailsOk(rf, undefined, 'POST', 200, {
//     Authorization: `Bearer ${token}`,
//   });
//   return res;
// };

export const refreshUser = async (headers: headerType) => {
  try {
    const res = await fetch(refreshUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    const json: resType = await res.json();

    return json.details;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllProfile = async (headers: headerType) => {
  try {
    const res = await fetch(getAllProfileUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    const json: resType = await res.json();

    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const makePayment = async (headers: any, userId: any, data: any) => {
  const res = await fetch(paymentUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ data }),
  });
  const json: resType = await res.json();
  return json;
};
