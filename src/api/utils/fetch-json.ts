export type Methods = 'GET' | 'POST';

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
  'X-Submitted-By': 'kuasha-test',
};

export const contentTypeForm = {
  Accept: 'application/json',
};

const fetchJSON: PublicFetch = async (
  url,
  data,
  method = 'GET',
  header,
  form,
) => {
  if (process.env.NODE_ENV === 'development') {
    console.log({
      url,
      header,
    });
  }
  if (header && header['X-Not-Logged-In']) {
    throw new Error('User is not Logged In');
  }
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

export default fetchJSON;
