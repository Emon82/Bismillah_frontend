import { LoginResType } from '@/api/schemas/auth/login';
import publicFetch from '@/api/utils/public-fetch';
import { signInUrl, magicLogin } from '@/constants/api';

export const signIn = async (identity: string, password: string) => {
  try {
    const data = {
      identity,
      password,
    };
    const res = await publicFetch(signInUrl, data, undefined, 'POST');
    const json: LoginResType = await res.json();
    return json;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

// export const magicLoginInput = async (token: string) => {
//   try {
//     // const data = {
//     //   token,
//     // };
//     const res = await publicFetch(`${magicLogin}/token`, undefined, 'POST');
//     const json: LoginResType = await res.json();
//     return json;
//   } catch (error) {
//     // console.log(error);
//     return error;
//   }
// };

// export const magicLoginInput = async (
//   token: string
// ) => {
//   try {
//     const res = await fetch(`${magicLogin}/${token}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//      const json: LoginResType = await res.json();
//     return json;
//     // return matchData;
//   } catch (error) {
//     return error;
//   }
// };
