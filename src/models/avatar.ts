import { types } from 'mobx-state-tree';

export type setAvatar = {
  host: string;
  id: string;
  name: string;
  avatar: string;
  height: number;
  width: number;
  path: string[];
};

export const AvatarModel = types.model('Avatar', {
  host: types.string,
  id: types.string,
  name: types.string,
  height: types.number,
  width: types.number,
  path: types.array(types.string),
});
