import { IMovieSearch } from '../types/movieTypes';

export const getNewBookmarkList = (
  clickedMovie: string,
  bookMarkList: IMovieSearch[],
  moviesList: IMovieSearch[],
) => {
  const isMarked = bookMarkList.filter((movie: IMovieSearch) => movie.imdbID === clickedMovie);
  const targetMovie = moviesList.filter((movie: IMovieSearch) => movie.imdbID === clickedMovie);
  const removedBookmarkList = bookMarkList.filter(
    (movie: IMovieSearch) => movie.imdbID !== clickedMovie,
  );

  if (isMarked.length === 0) {
    return [...bookMarkList, ...targetMovie];
  }

  return removedBookmarkList;
};
