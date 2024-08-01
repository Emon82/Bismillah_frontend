import { resType } from '@/api/schemas/search/searchSchema';
import {
  planList,
  createSubscriptionUrl,
  subScriptionCalcenUrl,
  getSubscriptionDetailsUrl,
  directcalcel,
} from '@/constants/api';

type headerType = {
  Authorization: string;
};
type inputSubscription = {
  priceId: string;
  email: string;
};

export const createSubscription = async (
  headers: any,
  data: inputSubscription,
) => {
  console.log(data);
  const res = await fetch(createSubscriptionUrl, {
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

export const getPlanList = async (headers: any) => {
  const res = await fetch(planList, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  const json: resType = await res.json();
  return json;
};

export const subScriptionCancel = async (
  headers: any,
  subscriptionId: string | null | undefined,
) => {
  console.log(subscriptionId);
  const res = await fetch(directcalcel, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ subscriptionId }),
  });
  const json: resType = await res.json();
  return json;
};

export const getSubscriptionDetails = async (headers: any) => {
  const res = await fetch(getSubscriptionDetailsUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
  const json: resType = await res.json();
  return json;
};
