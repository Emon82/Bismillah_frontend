import {
  RootStore,
  RootStoreModel,
  RootStoreStorage,
} from '@/models/root-store';
import { debounce } from '@/utils/debounce';
import { delay } from '@/utils/delay';
import localforage from 'localforage';
import { applySnapshot, onSnapshot } from 'mobx-state-tree';
import React, { createContext, useContext, useRef } from 'react';
import useAsyncEffect from 'use-async-effect';

const RootStoreContext = createContext<RootStoreModel | null>(null);

const blacklist = { hydrated: false };

export const RootStoreProvider: React.FC = ({ children }) => {
  // The store instance that will be passed down the context tree.
  // We keep this in a ref to avoid unnecessary rerenders.
  // We could have exported the context or stored it as a global
  // variable but that is a testing nightare and not recommended.
  const store = useRef(
    RootStore.create({ user: {}, vendor: {}, ...blacklist }),
  );

  // Effects will only run on client side.
  useAsyncEffect(
    async (isMounted) => {
      const data = await localforage.getItem<RootStoreStorage>('rootStore');
      if (data) {
        try {
          console.log('Hydrating Store from Storage');
          applySnapshot(store.current, { ...data, ...blacklist });
          console.log('Successfully hydrated store from storage');
        } catch (error) {
          console.error(error);
          console.log(
            'Failed to hydrate store. Throwing away data from stogare.',
          );
          await localforage.removeItem('rootStore');
        }
      }

      if (process.env.NODE_ENV === 'development') {
        try {
          console.log('Dev env detected, trying to enable mobx-devtools-mst');
          const { default: makeInspectable } = await import(
            'mobx-devtools-mst'
          );
          makeInspectable(store.current);
        } catch (error) {
          console.error(error);
        }
      }

      const saveSnapshot = debounce((snapshot: RootStoreStorage) => {
        console.log('Saving Snapshot to Storage');

        localforage.setItem('rootStore', snapshot);
      }, 1500);

      if (isMounted()) {
        // This delay is for testing.
        await delay(0);
        store.current.hydrate();
        console.log('Store hydration completed on client-side.');
      }

      return onSnapshot(store.current, (snapshot) => {
        console.log('New Snapshot Available');
        saveSnapshot(snapshot);
      });
    },
    (disposer) => {
      console.log('RootStoreProvider is getting unmounted.');
      // disposer can be undefined in some cases, such as-
      // Component getting unmounted before the async effect
      // has finished running, or, it has thrown.
      if (disposer) {
        disposer();
      }
    },
    [],
  );

  return (
    <RootStoreContext.Provider value={store.current}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = () => {
  const store = useContext(RootStoreContext);

  if (!store) {
    throw new Error('useRootStore must be used within a RootStoreProvider.');
  }
  return store;
};
