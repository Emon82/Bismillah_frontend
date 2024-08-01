// import { Avatar } from '@/models/user';

export interface ChatIdentity {
  id: string;
  firstName: string;
  lastName: string;
  avatar: any;
  name: string;
}

export interface ChatIdentities {
  [key: string]: ChatIdentity;
}
