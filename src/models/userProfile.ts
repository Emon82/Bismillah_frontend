import { types } from 'mobx-state-tree';
import { setAvatar, AvatarModel } from '@/models/avatar';

// export type SetProfileType = {
//   id: string;
//   avatar?: any;
//   userId: string;
//   bio: string;
//   relationship: string;
//   firstName: string;
//   lastName: string;
//   gender: string;
//   birthDate: any;
//   religion: string;
//   contact: string;
//   zipCode: string;
//   address: string;
//   addressTwo: string;
//   city: string;
//   state: string;
//   country: string;
//   maritalStatus: string;
//   profession: string;
//   companyName: string;
//   designation: string;
//   degree: string;
//   institute: string;
//   income: number;
//   diet: string;
//   drink: boolean;
//   smoke: boolean;
//   height: number;
//   weight: number;
//   bodyType: string;
//   skinTone: string;
//   // makeDefault: boolean;
// };

export const ProfileModel = types.model('UserProfile', {
  id: types.identifier,
  userId: types.string,
  bio: types.maybeNull(types.string),
  relationship: types.string,
  firstName: types.string,
  lastName: types.string,
  gender: types.string,
  birthDate: types.string,
  religion: types.string,
  contact: types.string,
  correctionList: types.array(types.string),
  isCorrected: types.maybeNull(types.boolean),
  address: types.string,
  approval: types.string,
  addressTwo: types.maybeNull(types.string),
  city: types.string,
  state: types.string,
  country: types.string,
  zipCode: types.string,
  maritalStatus: types.string,
  profession: types.string,
  companyName: types.maybeNull(types.string),
  designation: types.maybeNull(types.string),
  degree: types.string,
  institute: types.maybeNull(types.string),
  income: types.number,
  diet: types.string,
  drink: types.boolean,
  smoke: types.boolean,
  height: types.number,
  weight: types.number,
  bodyType: types.string,
  skinTone: types.string,
  avatarId: types.maybeNull(types.string),
  avatar: types.maybeNull(AvatarModel),
  created: types.string,
  updated: types.string,
});
