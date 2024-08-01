// type Methods = 'GET' | 'POST' | 'PUT';

// type PublicFetch = <D = any>(
//   url: string,
//   data?: D,
//   header?: any,
//   method?: Methods,
//   form?: FormData,
// ) => Promise<Response>;

// const contentTypeJSON = {
//   "Content-Type": "application/json",
//   // Accept: 'application/json',
// };

// const contentTypeForm = {
//   Accept: 'application/json',
// };

// const publicFetch: PublicFetch = (url, data, header, method = 'POST', form) =>
//   fetch(url, {
//     method,
//     headers: { contentTypeJSON, ...header },
//     body: JSON.stringify({
//         "makeDefault": true,
//         "skinTone": "Fair",
//         "bodyType": "Fat",
//         "weight": 0,
//         "height": 0,
//         "smoke": true,
//         "drink": true,
//         "diet": "string",
//         "income": 0,
//         "institute": "string",
//         "degree": "string",
//         "designation": "string",
//         "companyName": "string",
//         "profession": "string",
//         "maritalStatus": "Never_Married",
//         "country": "string",
//         "state": "string",
//         "city": "string",
//         "addressTwo": "string",
//         "address": "string",
//         "contact": "string",
//         "religion": "Islam",
//         "birthDate": "string",
//         "gender": "Male",
//         "lastName": "string",
//         "firstName": "string",
//         // "relationship": "Self",
//         // "bio": "string"

//       // address: 'pirganj',
//       // addressTwo: 'rangpur',
//       // bio: 'this is shohedul  ...',
//       // birthDate: '1999-04-01',
//       // bodyType: 'Slim',
//       // city: 'LosAngeles',
//       // companyName: 'starit',
//       // contact: '01303029065',
//       // country: 'Bangladesh',
//       // degree: 'College',
//       // designation: 'Executive',
//       // diet: 'NonVeg',
//       // drink: false,
//       // firstName: 'Md Shohedul',
//       // gender: 'Male',
//       // height: 5.7,
//       // income: 12000,
//       // institute: 'polytechnic',
//       // lastName: 'Islam',
//       // maritalStatus: 'Never_Married',
//       // profession: 'Engineer',
//       // relationship: 'Self',
//       // // religion: "Islam",
//       // // skinTone: "Fair",
//       // // smoke: false,
//       // // state: "Alaska",
//       // // weight: 50,
//     }),
//   });

// export default publicFetch;

// const PrivetFetch = (url, data, header, form) =>
//   fetch(url, {
//     method:'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       ...header,
//     },
//     // headers: { contentTypeJSON, ...header },
//     body: JSON.stringify(data),
//   });

// export default PrivetFetch;
export type Methods = 'GET' | 'POST' | 'PUT';

export type PublicFetch = <D = Record<string, any>>(
  url: string,
  data?: D,
  method?: Methods,
  header?: Record<string, string>,
  form?: FormData,
) => Promise<any>;

export const contentTypeJSON = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const contentTypeForm = {
  Accept: 'application/json',
};

const PrivetFetch: PublicFetch = async (
  url,
  data,
  method = 'PUT',
  header,
  form,
) => {
  const res = await fetch(url, {
    method,
    headers: form
      ? { ...contentTypeForm, ...header }
      : { ...contentTypeJSON, ...header },
    body: form || JSON.stringify(data),
  });
  if (!res.headers.get('Content-Type')?.includes('json')) {
    const txt = await res.text();
    console.log({ url, txt });
    throw new Error('Server Returned Non-JSON Data');
  }

  return res.json();
};

export default PrivetFetch;
