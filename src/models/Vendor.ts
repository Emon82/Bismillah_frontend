import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { type } from 'os';

export interface LoginResType {
  token: string;
  id: string;
  name: string | null;
  email: string | null;
  phone: string;
  scopes: any;
  businessDays: any;
  businessHours: any;
  businessType: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  companyName: string | null;
  description: string | null;
}

// businessDays?: Days[];
// businessHours?: string[];
// businessType?: string;
// country?: string;
// state?: string;
// city?: string;
// companyName?: string;
// description?: string;

const VendorInfo = types.model('VendorInfo', {
  token: types.string,
  id: types.string,
  phone: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  scopes: types.array(types.string),
});

const vendorImage = types.model('vendorImage', {
  host: types.string,
  id: types.string,
  name: types.string,
  height: types.number,
  width: types.number,
  path: types.array(types.string),
});

const ProfileInfo = types.model('ProfileInfo', {
  businessDays: types.array(types.string),
  businessHours: types.array(types.string),
  country: types.maybeNull(types.string),
  state: types.maybeNull(types.string),
  city: types.maybeNull(types.string),
  companyName: types.maybeNull(types.string),
  businessType: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  image: types.maybeNull(vendorImage),
});

export const Vendor = types
  .model('Vendor', {
    details: types.maybe(VendorInfo),
    profile: types.maybe(ProfileInfo),
  })
  .actions((self) => ({
    addVendorProfile(profile: any) {
      self.profile = profile;
    },
  }))

  .views((self) => ({
    get isLoggedIn() {
      return !!self.details;
    },
    get vendorDetails() {
      return self.details;
    },
    get auth() {
      // if (!self.details) {
      //   throw new Error('User is not logged In');
      // }
      return {
        Authorization: `Bearer ${self.details?.token}`,
      };
    },
  }))

  .actions((self) => ({
    logIn(vendor: LoginResType) {
      console.log(vendor);
      self.details = vendor;
    },
    logOut() {
      self.details = undefined;
      self.profile = undefined;
    },
  }));

export type VendorModel = Instance<typeof Vendor>;
export type VendorData = SnapshotOut<typeof Vendor>;
