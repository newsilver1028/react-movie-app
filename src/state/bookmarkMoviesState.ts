import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { IMovieSearch } from '../types/movieTypes';

const { persistAtom } = recoilPersist();

export const bookmarkMoviesState = atom<IMovieSearch[]>({
  key: 'bookmarkMoviesState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
