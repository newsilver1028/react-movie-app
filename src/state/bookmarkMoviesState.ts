import { atom } from 'recoil';

export const bookmarkMoviesState = atom({
  key: 'bookmarkMoviesState',
  default: [
    {
      Poster: '',
      Title: '',
      Type: '',
      Year: '',
      imdbID: '',
    },
    {
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_SX300.jpg',
      Title: 'The Amazing Spider-Man',
      Type: 'movie',
      Year: '2012',
      imdbID: 'tt0948470',
    },
  ],
});
