import { LoginResType } from '@/api/schemas/auth/login';
import publicFetch from '@/api/utils/public-fetch';
import { passResetUrl } from '@/constants/api';

export const passReset = async (identity: string) => {
  try {
    const data = { identity };
    const res = await publicFetch(passResetUrl, data, undefined, 'POST');
    const json: LoginResType = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
