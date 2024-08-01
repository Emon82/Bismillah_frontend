export interface LoginResType {
  code: number;
  message: string;
  details: Details;
}

export interface Details {
  token: string;
}
