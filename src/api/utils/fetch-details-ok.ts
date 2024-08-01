import { ApiRes } from '@/api/types/api-res';
import fetchJSON, { Methods } from '@/api/utils/fetch-json';

type FetchDetailsOk = <D = Record<string, any>>(
  url: string,
  data?: D,
  method?: Methods,
  ok?: number,
  header?: Record<string, string>,
  form?: FormData,
) => Promise<any>;

const fetchDetailsOk: FetchDetailsOk = async (
  url,
  data,
  method = 'GET',
  ok = 200,
  header,
  form,
) => {
  console.log(header);
  try {
    const json: ApiRes = await fetchJSON(url, data, method, header, form);
    if (json.code !== ok) {
      throw new Error(json.message);
    }

    if (json.details === null || json.details === undefined) {
      throw new Error('No Details');
    }

    return json.details;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchDetailsOk;
