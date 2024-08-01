type Methods = 'GET' | 'POST' | 'PUT';

type PublicFetch = <D = any>(
  url: string,
  data?: D,
  header?: Record<string, string>,
  method?: Methods,
  form?: FormData,
) => Promise<Response>;

const contentTypeJSON = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const contentTypeForm = {
  Accept: 'application/json',
};

const publicFetch: PublicFetch = (url, data, header, method = 'POST', form) =>
  fetch(url, {
    method,
    headers: form ? contentTypeForm : contentTypeJSON,
    body: form || JSON.stringify(data),
    ...header,
  });

export default publicFetch;
