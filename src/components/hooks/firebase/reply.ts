import { firestore } from './firebase';

const db = firestore;

const getReply = async <T>(id: string, chatId: string) => {
  const doc = await db.doc(`messages/${chatId}/chats/${id}`).get();
  const data = doc.data();
  if (!data) {
    return null;
  }
  return data as T;
};

export default getReply;
