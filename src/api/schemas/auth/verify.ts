export interface VerifyResType {
  code: number;
  message: string;
  details: Details;
}
export interface Details {
  token: string;
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ResetOTPResType {
  code: number;
  message: string;
  details: DetailsOTP;
}
export interface DetailsOTP {
  otp: string;
  res: boolean;
}
