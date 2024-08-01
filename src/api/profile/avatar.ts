import { resType } from '@/api/schemas/search/searchSchema';
import { uploadAvatarUrl } from '@/constants/api';

type headerType = {
  Authorization: string;
};

export const uploadAvatar = async (
  blobFile: any,
  id: string | undefined,
  headers: headerType,
) => {
  const formData: any = new FormData();
  console.log(blobFile);
  // Object.keys(blobFile).forEach((key) => formData.append(key, blobFile[key]));
  formData.append('avatar', blobFile);
  formData.append('id', id);

  const res = await fetch(uploadAvatarUrl, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      // 'Content-type': 'application/json',
      ...headers,
    },
    body: formData,
  });
  const json: resType = await res.json();
  return json;
};
