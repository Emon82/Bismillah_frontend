import firebase from 'firebase/app';
// eslint-disable-next-line import/no-duplicates
import 'firebase/firestore';
import FirebaseFirestoreTypes from '@firebase/firestore-types';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type Collection<T extends Record<string, any>> = T & {
  id: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
  modifiedAt: FirebaseFirestoreTypes.Timestamp;
};

export type Where = [string, FirebaseFirestoreTypes.WhereFilterOp, string];

const useFirestoreCollection = <T extends Record<string, any>>(
  path: string,
  limit = 10,
  where?: Where,
) => {
  const db = useMemo(() => firebase.firestore(), []);

  const query = useMemo(() => {
    if (where) {
      return db
        .collection(path)
        .where(...where)
        .orderBy('createdAt', 'desc')
        .limit(limit);
    }
    return db.collection(path).orderBy('createdAt', 'desc').limit(limit);
  }, [db, limit, path, where]);

  const ref = useMemo(() => db.collection(path), [db, path]);

  const [data, setData] = useState<Collection<T>[]>([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const unsubscribe = query.onSnapshot(
      (coll) =>
        setData(
          coll.docs.map((v) => ({
            ...(v.data() as Collection<T>),
            id: v.id,
          })),
        ),
      (err) => setError(err),
    );
    return () => {
      unsubscribe();
    };
  }, [query]);

  const add = useCallback(
    (doc: T) => {
      const time = firebase.firestore.FieldValue.serverTimestamp();
      const addData = {
        ...doc,
        createdAt: time,
        modifiedAt: time,
      };
      console.log('data', addData);
      return ref.add(addData);
    },
    [ref],
  );

  const update = useCallback(
    (id: string, doc: Partial<T>) => {
      const time = firebase.firestore.FieldValue.serverTimestamp();
      return ref.doc(id).update({
        ...doc,
        modifiedAt: time,
      });
    },
    [ref],
  );

  const remove = useCallback((id: string) => ref.doc(id).delete(), [ref]);

  return [data.reverse(), add, update, remove, error, query] as const;
};

export default useFirestoreCollection;
