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

const useFirestoreSubCollection = <
  T extends Record<string, any>,
  U extends Record<string, any>
>(
  path: string,
  initialMetaData: Partial<U>,
  limit = 10,
  where?: Where,
) => {
  const db = useMemo(() => firebase.firestore(), []);

  const metapath = useMemo(() => path.split('/').slice(0, -1).join('/'), [
    path,
  ]);

  const query = useMemo(() => {
    if (where) {
      return db
        .collection(path)
        .where(...where)
        .orderBy('createdAt', 'asc')
        .limit(limit);
    }
    return db.collection(path).orderBy('createdAt', 'asc').limit(limit);
  }, [db, limit, path, where]);

  const ref = useMemo(() => db.collection(path), [db, path]);

  const [data, setData] = useState<Collection<T>[]>([]);
  const [metaData, setMetaData] = useState<Collection<U> | undefined>();
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

  useEffect(() => {
    const asyncAwait = async () => {
      console.log({ metapath });
      const metaRef = db.doc(metapath);
      const doc = (await metaRef.get()).data();
      if (!doc) {
        await metaRef.set(initialMetaData);
        setMetaData((await metaRef.get()).data() as Collection<U>);
      } else {
        setMetaData(doc as Collection<U>);
      }
    };
    asyncAwait().catch(console.error);
  }, [db, initialMetaData, metapath]);

  const add = useCallback(
    (doc: T) => {
      const time = firebase.firestore.FieldValue.serverTimestamp();
      const addData = {
        ...doc,
        createdAt: time,
        modifiedAt: time,
      };
      console.log('data', addData);
      ref.add(addData).then(() => {
        db.doc(metapath).set(
          {
            lastMessage:
              addData.type === 'text' ? addData.message : 'Media Message',
            lastMessageAt: time,
            lastMessageBy: addData.pid,
          },
          { merge: true },
        );
      });
    },
    [db, metapath, ref],
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

  return [data, metaData, add, update, remove, error, query] as const;
};

export default useFirestoreSubCollection;
