import { resType } from '@/api/schemas/search/searchSchema';
import {
  preferenceInputUrl,
  preferenceEditInputUrl,
  getPreferenceUrl,
} from '@/constants/api';
import { PreferenceInput, headerType } from './type';

export const preferenceInput = async (
  data: PreferenceInput,
  headers: headerType | null,
) => {
  const formatData: any = data;
  Object.keys(formatData).forEach((key) => {
    if (formatData[key] === '' || formatData[key] === 0) {
      delete formatData[key];
    }
  });
  console.log(formatData);
  const res = await fetch(preferenceInputUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(formatData),
  });
  const json: resType = await res.json();
  return json;
};

export const preferenceEditInput = async (
  data: any,
  headers: headerType | null,
) => {
  const formatData: any = data;
  Object.keys(formatData).forEach((key) => {
    if (formatData[key] === '') {
      delete formatData[key];
    }
  });
  console.log(formatData);

  const res = await fetch(preferenceEditInputUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(formatData),
  });
  const json: resType = await res.json();
  return json;
};

export const getPreference = async (
  headers: headerType | null,
  profileId: any,
) => {
  const res = await fetch(`${getPreferenceUrl}/${profileId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  const json: resType = await res.json();
  return json;
};
