import { resType } from '@/api/schemas/search/searchSchema';
import {
  getProfileDetailsUrl,
  getConnectedUrl,
  createProfileUrl,
  profileSearchUrl,
  reportUrl,
  uploadGalleryImageUrl,
  deleteGalleryImageUrl,
  showGalleryImageUrl,
  getPreferenceMatchUrl,
  setDefaultProfileUrl,
} from '@/constants/api';
import { ProfileInput, reportInput } from './types';

type headerType = {
  Authorization: string;
};

export const getProfiledetails = async (
  headers: headerType | null,
  profileId: string | undefined,
) => {
  try {
    const res = await fetch(`${getProfileDetailsUrl}/${profileId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    const json: resType = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const setDefaultProfile = async (headers: any, data: any) => {
  const profileId = { id: data };
  console.log(data);
  const res = await fetch(setDefaultProfileUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(profileId),
  });
  const json: resType = await res.json();
  return json;
};

export const getConnected = async (
  headers: headerType,
  profileId: string | undefined,
) => {
  try {
    const res = await fetch(`${getConnectedUrl}/${profileId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    const json: resType = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// const dataaa = {
//   bio: 'i am superman',
//   relationship: 'Son',
//   firstName: 'Md Shohedul',
//   lastName: 'Emon',
//   gender: 'Male',
//   birthDate: '2021-04-08',
//   religion: 'Christianity',
//   contact: '01710488865',
//   address: 'Rangpur',
//   addressTwo: 'tfujgvyj',
//   city: 'Rangpur',
//   state: 'Rangpur',
//   country: 'Bangladesh',
//   zipCode: '5402',
//   maritalStatus: 'Never_Married',
//   profession: 'dfghdfghdfgfh',
//   degree: 'Masters',
//   institute: 'dhgfhfg',
//   income: 111,
//   diet: 'Veg',
//   drink: false,
//   smoke: false,
//   height: 100,
//   weight: 50,
//   bodyType: 'Slim',
//   skinTone: 'Fair',
//   makeDefault: true,
// };

export const createProfileInput = async (d: ProfileInput, headers: any) => {
  console.log(d);
  const data: any = d;
  Object.keys(data).forEach((key) => {
    if (data[key] === '') {
      delete data[key];
    }
  });
  console.log(data);
  // console.log(JSON.stringify(data))
  const res = await fetch(createProfileUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
    // body: JSON.stringify(dataaa),
  });
  const json: resType = await res.json();
  return json;
};

export const profileSearch = async (d: any, headers: any) => {
  const data: any = d;
  Object.keys(data).forEach((key) => {
    if (data[key] === '' || data[key] === 'Any' || data[key] === 0) {
      delete data[key];
    }
  });
  console.log(data);
  // const newData = data
  // newData.drink = data.drink === 'Yes'
  // newData.smoke = data.smoke === 'Yes'
  // drink: drink === 'Yes',
  // smoke: smoke === 'Yes',
  // console.log(newData);
  // console.log(JSON.stringify(data))
  const res = await fetch(profileSearchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });
  const json: resType = await res.json();
  return json;
};

export const profileReportInput = async (d: reportInput, headers: any) => {
  const data: any = d;
  Object.keys(data).forEach((key) => {
    if (data[key] === '') {
      delete data[key];
    }
  });

  const res = await fetch(reportUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });
  const json: resType = await res.json();
  return json;
};

export const uploadGalleryImage = async (
  imageArray: any,
  id: string | undefined,
  headers: headerType,
) => {
  const formData: any = new FormData();

  for (let i = 0; i < imageArray.length; i += 1) {
    formData.append('gallery', imageArray[i].file);
  }

  formData.append('id', id);
  console.log(imageArray);
  const res = await fetch(uploadGalleryImageUrl, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: formData,
  });
  const json: resType = await res.json();
  return json;
};

export const deleteGalleryImage = async (headers: any, data: any) => {
  console.log(data);
  const res = await fetch(deleteGalleryImageUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });
  const json: resType = await res.json();
  return json;
};

export const showGalleryImage = async (headers: any, profileId: any) => {
  const res = await fetch(`${showGalleryImageUrl}/${profileId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  const json: resType = await res.json();
  return json;
};

export const getPreferenceMatch = async (headers: any, profileId: any) => {
  const res = await fetch(getPreferenceMatchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ profileId }),
  });
  const json: resType = await res.json();
  return json;
};
