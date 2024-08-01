import {
  Instance,
  SnapshotOut,
  getParent,
  types,
  flow,
  cast,
} from 'mobx-state-tree';
// import firebase from 'firebase/app';
// // These imports load individual services into the firebase namespace.
// import 'firebase/auth';
import { auth } from '@/components/hooks/firebase/firebase';
import { baseApiUrl } from '@/constants/api';
import fetchDetailsOk from '@/api/utils/fetch-details-ok';
import FirebaseAuthTypes from '@firebase/auth-types';
import initials from '@/api/utils/initials';
import { getProfile } from '@/api/profile/getProfile';
import { getProfiledetails } from '@/api/profile/profile';
import { ProfileModel } from './userProfile';
import { accountHeartbeat, refreshUser } from '../api/auth/auth';

export interface LoginResType {
  token: string;
  id: string;
  name: string | null;
  email: string | null;
  phone: string;
  defautProfile: string | null;
  scopes: any;
}

const UserInfo = types.model('UserInfo', {
  token: types.string,
  id: types.string,
  phone: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  defautProfile: types.maybeNull(types.string),
  scopes: types.array(types.string),
});

export const User = types
  .model('User', {
    details: types.maybe(UserInfo),
    profiles: types.maybe(ProfileModel),
    selectProfileId: types.maybe(types.string),
    outGoingRequest: types.array(types.string),
  })
  .actions((self) => ({
    addProfile(profile: any) {
      self.profiles = profile;
      self.selectProfileId = profile.id.toString();
    },
    addOutGoingRequest(id: any) {
      self.outGoingRequest.replace(id);
    },
    hydrate(data: LoginResType) {
      if (self.details) {
        self.details = cast(data);
      }
    },
    /**
     * @private
     * DO NOT USE
     * Internal Action
     * DO NOT USE
     */
    firebaseCall: flow(function* firebaseFun(headers: Record<string, any>) {
      // const auth = firebase.auth();
      if (auth.currentUser) {
        return console.log(
          'user already signed in to firebase. UID: ',
          auth.currentUser.uid,
        );
      }
      const { token }: { token: string } = yield fetchDetailsOk(
        `${baseApiUrl}/user/account/firebase-token`,
        undefined,
        'POST',
        200,
        headers,
      );
      const fireUser: FirebaseAuthTypes.UserCredential = yield auth.signInWithCustomToken(
        token,
      );
      console.log('signed in to firebase. UID: ', fireUser?.user?.uid);
      return 0;
    }),
  }))

  .views((self) => ({
    get isLoggedIn() {
      return !!self.details;
    },
    get userdetails() {
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
    get initials() {
      return initials(`${self.profiles?.firstName} ${self.profiles?.lastName}`);
    },
  }))
  .actions((self) => ({
    loadDefaultProfile: flow(function* loadProfile() {
      console.log('3');
      const result: any = yield getProfile(self.auth);
      if (result.code === 200) {
        console.log('4');
        self.addProfile(result.details);
        // const parent = getParent<UserModel>(self);
        self.firebaseCall(self.auth);
      }
    }),

    loadSelectedProfile: flow(function* loadProfile(id: string | undefined) {
      const result: any = yield getProfiledetails(self.auth, id);
      // console.log(result)
      if (result.code === 200) {
        self.addProfile(result.details);
        // const parent = getParent<UserModel>(self);
        self.firebaseCall(self.auth);
      }
    }),
  }))

  .actions((self) => ({
    logIn(user: LoginResType) {
      self.details = user;
      if (self.details.defautProfile) {
        self.loadDefaultProfile();
      }
    },
    AddRefreshUser(user: LoginResType) {
      self.details = user;
    },
    logOut() {
      console.log('logour data');
      self.profiles = undefined;
      self.selectProfileId = undefined;
      self.details = undefined;
      self.outGoingRequest.clear();
    },
  }))
  .actions((self) => ({
    refresh: flow(function* refresh() {
      try {
        if (!self.details) {
          console.log('User is not logged in');
          return null;
        }
        const isUpdated: boolean = yield accountHeartbeat(self.auth);
        if (!isUpdated) {
          yield self.firebaseCall(self.auth);
          console.log('User not changed');
          return null;
        }
        const newUser: LoginResType = yield refreshUser(self.auth);
        console.log('updating user');
        yield self.firebaseCall(self.auth);
        return self.AddRefreshUser(newUser);
      } catch (error) {
        return console.error(error);
      }
    }),
  }));

export type UserModel = Instance<typeof User>;
export type UserData = SnapshotOut<typeof User>;
