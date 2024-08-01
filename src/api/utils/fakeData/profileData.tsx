export interface profiledataInstance {
  bio: string;
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
}

const profileData: profiledataInstance = {
  bio: 'I am very Good persaon',
  income: 5000,
  bodyType: 'Slim',
  city: 'LosAngeles',
  institute: 'Jhenaidah polytechnic Institute',
  contact: '1710488865',
  birthDate: '1999-04-01',
  degree: 'College',
  designation: 'Executive',
  diet: 'NonVeg',
  drink: false,
  companyName: 'Starit',
  firstName: 'Md Shohedul',
  gender: 'Male',
  height: 5.6,
  lastName: 'Islam',
  country: 'Bangladesh',
  maritalStatus: 'Never_Married',
  profession: 'Engineer',
  relationship: 'Self',
  religion: 'Islam',
  skinTone: 'Honey',
  smoke: false,
  state: 'Alaska',
  weight: 55,
  address: 'abc address',
  addressTwo: 'abcd two address',
};

export default profileData;
