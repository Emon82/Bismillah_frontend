export type ProfileInput = {
  bio?: string | null;
  relationship: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: any;
  religion: string;
  contact: string;
  address: string;
  addressTwo?: string | null;
  city: string;
  state: string;
  country: string;
  maritalStatus: string;
  profession: string;
  companyName?: string | null;
  designation?: string | null;
  degree: string;
  institute?: string | null;
  income: number;
  diet: string;
  drink: boolean;
  smoke: boolean;
  height: number;
  weight: number;
  bodyType: string;
  skinTone: string;
  /** Make this Profile Default for the user */
  makeDefault?: boolean;
};

type PartialInput<T> = {
  [P in keyof T]?: T[P];
};

export interface ProfileEditInput extends PartialInput<ProfileInput> {
  /** The Profile ID That Needs To Be Updated */
  id: string;
}

export interface ProfileSet extends PartialInput<ProfileInput> {
  /** The Profile ID That come from databse */
  id: number;
}

export type profileSearchInputType = {
  religion?: any;
  gender?: string;
  maritalStatus?: string;
  income?: number;
  drink?: boolean;
  smoke?: boolean;
  height?: number;
  weight?: number;
  bodyType?: string;
  skinTone?: string;
  ageFrom?: number | string;
  ageTo?: number | string;
};

type ReportType =
  | 'Harassment'
  | 'Fraud'
  | 'Spam'
  | 'Inappropriate_Content'
  | 'Harmful'
  | 'Impersonation'
  | 'Offensive'
  | 'Other';

export type reportInput = {
  details?: string;
  reportType: any;
  reportedUserId: string;
  reportedProfile: string;
};
