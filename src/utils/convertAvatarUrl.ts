import { baseUrl } from '../constants/api';

const convertAvatarUrl = (data: any) => {
  if (data) {
    const avatarUrl = `${baseUrl}/${data?.host}/${data?.path.join('/')}/${
      data?.id
    }/${data?.name}`;
    console.log(avatarUrl);
    return avatarUrl;
  }
  return null;
};
export default convertAvatarUrl;
