import { resType } from '@/api/schemas/search/searchSchema';
import publicFetch from '@/api/utils/public-fetch';
import { filterUrl } from '@/constants/api';

interface FilterObject {
  gender: string;
  ageFrom: string;
  ageTo: string;
  minHeight: string;
  maxHeight: string;
  minWeight: string;
  maxWeight: string;
  materialStatus: string;
  haveChildren: string;
  religion: string;
  motherTongue: string;
  community: string;
  states: string;
  city: string;
  food: string;
  salaryForm: string;
  salaryTo: string;
}

export const searchInput = async (data: FilterObject) => {
  try {
    console.log(data);
    const res = await publicFetch(filterUrl, data, undefined, 'POST');
    const json: resType = await res.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
    return error;
  }
};
