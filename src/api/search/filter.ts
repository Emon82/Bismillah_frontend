import { resType } from '@/api/schemas/search/searchSchema';
import publicFetch from '@/api/utils/public-fetch';
import { searchUrl } from '@/constants/api';

export const filterInput = async (
  gender: string,
  ageFrom: string,
  ageTo: string,
  religion: string,
  mTounge: string,
) => {
  try {
    const data = {
      gender,
      ageFrom,
      ageTo,
      religion,
      mTounge,
    };
    console.log(data);
    const res = await publicFetch(searchUrl, data, undefined, 'POST');
    const json: resType = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
};
