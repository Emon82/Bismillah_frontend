import { RegisterResType } from '@/api/schemas/auth/register';
import { ResetOTPResType, VerifyResType } from '@/api/schemas/auth/verify';
import publicFetch from '@/api/utils/public-fetch';
import {
  otpVerifyUrl,
  passUpdateUrl,
  resendOTPUrl,
  signUpUrl,
} from '@/constants/api';

export const signUp = async (
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
    // console.log(data)
    const res = await publicFetch(signUpUrl, data, undefined, 'POST');
    const json: RegisterResType = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const verify = async (identity: string, otp: string) => {
  try {
    const data = {
      identity,
      otp,
    };
    const res = await publicFetch(otpVerifyUrl, data, undefined, 'POST');
    const json: VerifyResType = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const resendOTP = async (identity: string) => {
  console.log(identity);
  try {
    const data = {
      identity,
    };
    const res = await publicFetch(resendOTPUrl, data, undefined, 'POST');
    const json: ResetOTPResType = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePassword = async (
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
    const res = await publicFetch(passUpdateUrl, data, undefined, 'POST');
    const json = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
