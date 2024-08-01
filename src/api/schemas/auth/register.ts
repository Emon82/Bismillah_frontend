export interface RegisterResType {
  status: number;
  message: string;
  details: Details;
}
export interface Details {
  code: string;
  meta: Meta;
}
export interface Meta {
  target?: string[] | null;
}
