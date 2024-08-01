import { resType } from '@/api/schemas/search/searchSchema';
import { getDefaultProfileUrl } from '@/constants/api';

type headerType = {
  Authorization: string;
};

export const getProfile = async (headers: headerType | null) => {
  try {
    const res = await fetch(getDefaultProfileUrl, {
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
