export interface ApiRes<Details = any> {
  message: string;
  code: number;
  details?: Details | null;
}
