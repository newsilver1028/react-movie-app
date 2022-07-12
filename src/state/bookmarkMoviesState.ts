import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IMovieSearch } from '../types/type.d';

const { persistAtom } = recoilPersist();

export const bookmarkMoviesState = atom<IMovieSearch[]>({
  key: 'bookmarkMoviesState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
