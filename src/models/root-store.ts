import { User } from '@/models/user';
import { Vendor } from '@/models/Vendor';
import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
  flow,
} from 'mobx-state-tree';

export const RootStore = types
  .model('RootStore', {
    user: User,
    vendor: Vendor,
    hydrated: types.boolean,
  })
  .actions((self) => ({
    hydrate: flow(function* hydrate() {
      try {
        yield self.user.refresh();
        self.hydrated = true;
      } catch (error) {
        console.error(error);
      }
    }),
  }))

  .views((self) => ({
    get hydrateStatus() {
      return self.hydrated;
    },
    get getProfileData() {
      return self.user.profiles;
      // if (!self.user.selectProfileId) {
      //   return undefined;
      // }
      // return self.user.profiles.get(self.user.selectProfileId);
    },
  }));

export type RootStoreModel = Instance<typeof RootStore>;
export type RootStoreData = SnapshotOut<typeof RootStore>;
export type RootStoreStorage = SnapshotIn<typeof RootStore>;
