import { resType } from '@/api/schemas/search/searchSchema';
import { getMatchUrl } from '@/constants/api';
// import { matchData } from '../utils/fakeData/matchFakeData';

type headerType = {
  Authorization: string;
};

export const getMatch = async (
  headers: headerType,
  profileId: string | undefined,
) => {
  try {
    const res = await fetch(`${getMatchUrl}/${profileId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
    const json: resType = await res.json();
    return json;
    // return matchData;
  } catch (error) {
    console.log(error);
    return error;
  }
};
