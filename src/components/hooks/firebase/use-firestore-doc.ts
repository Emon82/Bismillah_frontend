import firebase from 'firebase/app';
// eslint-disable-next-line import/no-duplicates
import 'firebase/firestore';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Collection } from './use-firestore-collection';

const useFirestoreDoc = <T extends Record<string, any>>(path: string) => {
  const db = useMemo(() => firebase.firestore(), []);

  const ref = useMemo(() => db.doc(path), [db, path]);

  const [data, setData] = useState<Collection<T>>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const unsubscribe = ref.onSnapshot(
      (doc) => setData(doc.data() as Collection<T> | undefined),
      (err) => setError(err),
    );
    return () => {
      unsubscribe();
    };
  }, [ref]);

  const set = useCallback(
    (doc: Partial<T>) => {
      const time = firebase.firestore.FieldValue.serverTimestamp();
      return ref.set(
        {
          ...doc,
          modifiedAt: time,
        },
        {
          merge: true,
        },
      );
    },
    [ref],
  );

  return [data, set, ref, error] as const;
};

export default useFirestoreDoc;
