import { resType } from '@/api/schemas/search/searchSchema';
import { updateProfileUrl } from '@/constants/api';
import { ProfileEditInput } from './types';

type headerType = {
  Authorization: string;
};

export const updateProfileDataInput = async (
  data: ProfileEditInput,
  headers: headerType,
) => {
  console.log(data);
  try {
    const res = await fetch(updateProfileUrl, {
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
