import { resType } from '@/api/schemas/search/searchSchema';
import {
  getOutGoingUrl,
  deleteReqInputUrl,
  sendConnectionUrl,
  getIncommingReqUrl,
  acceptReqInputUrl,
  rejectReqInputUrl,
  unfriendReqInputUrl,
  profileViewListUrl,
} from '@/constants/api';

type headerType = {
  Authorization: string;
};

interface connectionInput {
  receiverId: string | undefined;
  senderId: string | undefined;
}

export const getOutGoingRequest = async (
  profileId: string | undefined,
  headers: headerType,
) => {
  const res = await fetch(getOutGoingUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ profileId }),
  });
  const json: resType = await res.json();
  return json;
};

export const getIncomingRequest = async (
  profileId: string | undefined,
  headers: headerType,
) => {
  const res = await fetch(getIncommingReqUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ profileId }),
  });
  const json: resType = await res.json();
  return json;
};

export const sendConnectionInput = async (
  data: connectionInput,
  headers: any,
) => {
  const res = await fetch(sendConnectionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });
  const json: resType = await res.json();
  return json;
};

export const deleteReqInput = async (data: connectionInput, headers: any) => {
  console.log(data);
  const res = await fetch(deleteReqInputUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });
  const json: resType = await res.json();
  return json;
};

export const acceptReqInput = async (data: connectionInput, headers: any) => {
  const res = await fetch(acceptReqInputUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });
  const json: resType = await res.json();
  return json;
};

export const rejectReqInput = async (data: connectionInput, headers: any) => {
  const res = await fetch(rejectReqInputUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });
  const json: resType = await res.json();
  return json;
};

export const unfriendReqInput = async (data: connectionInput, headers: any) => {
  console.log(data);
  const res = await fetch(unfriendReqInputUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(data),
  });
  const json: resType = await res.json();
  return json;
};

export const getViewProfileList = async (
  profileId: any,
  headers: headerType | null,
) => {
  const res = await fetch(`${profileViewListUrl}/${profileId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  const json: resType = await res.json();
  return json;
};
