import { resType } from '@/api/schemas/search/searchSchema';
import { RegisterResType } from '@/api/schemas/auth/register';
import { ResetOTPResType, VerifyResType } from '@/api/schemas/auth/verify';
import {
  publicVendorListUrl,
  publicVendordetailsUrl,
  vendorSignupUrl,
  vendorSigninUrl,
  vendorResentOtpUrl,
  vendorOtpVerifyUrl,
  vendorEditUrl,
  vendorInfo,
  changeVendorPasswordInputUrl,
  vendorPassResetUrl,
  vendorPassUpdateUrl,
  uploadGalleryImageUrlVendor,
  vendorDeleteGalleryImageUrl,
  vendorShowGalleryImageUrl,
  uploadVendorSliderPhotoUrl,
} from '@/constants/api';
import { LoginResType } from '@/api/schemas/auth/login';
import publicFetch from '@/api/utils/public-fetch';

export const vendorsignIn = async (identity: string, password: string) => {
  try {
    const data = {
      identity,
      password,
    };
    const res = await publicFetch(vendorSigninUrl, data, undefined, 'POST');
    const json: LoginResType = await res.json();
    return json;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const vendorsignUp = async (
  name: string,
  email: string,
  phone: string,
  password: string,
) => {
  try {
    const data: Record<string, string> = { name, phone, email, password };
    Object.keys(data).forEach((key) => {
      if (data[key] === '') {
        delete data[key];
      }
    });
    const res = await publicFetch(vendorSignupUrl, data, undefined, 'POST');
    const json: RegisterResType = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const vendorVerify = async (identity: string, otp: string) => {
  try {
    const data = {
      identity,
      otp,
    };
    const res = await publicFetch(vendorOtpVerifyUrl, data, undefined, 'POST');
    const json: VerifyResType = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const vendorResendOTP = async (identity: string) => {
  console.log(identity);
  try {
    const data = {
      identity,
    };
    const res = await publicFetch(vendorResentOtpUrl, data, undefined, 'POST');
    const json: ResetOTPResType = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const updatePassword = async (
//   identity: string,
//   otp: string,
//   password: string,
// ) => {
//   try {
//     const data = {
//       identity,
//       otp,
//       password,
//     };
//     const res = await publicFetch(passUpdateUrl, data, undefined, 'POST');
//     const json = await res.json();
//     console.log(json);
//     return json;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export const createVendorProfileInput = async (d: any, headers: any) => {
  console.log(d);
  const data: any = d;
  Object.keys(data).forEach((key) => {
    if (data[key] === '') {
      delete data[key];
    }
  });
  console.log(data);
  // console.log(JSON.stringify(data))
  const res = await fetch(vendorEditUrl, {
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

export const getVendorProfileInfo = async (headers: any) => {
  const res = await fetch(vendorInfo, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  const json: resType = await res.json();
  return json;
};

export const publicVendorList = async () => {
  const res = await fetch(publicVendorListUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json: resType = await res.json();
  return json;
};

export const publicVendorDetails = async (id: any) => {
  const res = await fetch(`${publicVendordetailsUrl}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json: resType = await res.json();
  return json;
};

export const changePassDataInput = async (data: any, headers: any) => {
  console.log(data);
  try {
    const res = await fetch(changeVendorPasswordInputUrl, {
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

export const vendorPassReset = async (identity: string) => {
  try {
    const data = { identity };
    const res = await publicFetch(vendorPassResetUrl, data, undefined, 'POST');
    const json: LoginResType = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateVendorPassword = async (
  identity: string,
  otp: string,
  password: string,
) => {
  try {
    const data = {
      identity,
      otp,
      password,
    };
    const res = await publicFetch(vendorPassUpdateUrl, data, undefined, 'POST');
    const json = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

type headerType = {
  Authorization: string;
};

export const uploadGalleryImageVendor = async (
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
  const res = await fetch(uploadGalleryImageUrlVendor, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: formData,
  });
  const json: resType = await res.json();
  return json;
};

export const deleteGalleryImageVendor = async (headers: any, data: any) => {
  const res = await fetch(vendorDeleteGalleryImageUrl, {
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

export const publicVendorGallery = async (id: any) => {
  const res = await fetch(`${vendorShowGalleryImageUrl}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json: resType = await res.json();
  return json;
};

export const uploadVendorSliderPhoto = async (
  blobFile: any,
  headers: headerType,
) => {
  const formData: any = new FormData();
  formData.append('avatar', blobFile);

  const res = await fetch(uploadVendorSliderPhotoUrl, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: formData,
  });
  const json: resType = await res.json();
  return json;
};
