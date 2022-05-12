import { IMovieSearch } from '../types/movieTypes';

export const getNewBookmarkList = (
  clickedMovie: string,
  bookMarkList: IMovieSearch[],
  moviesList: IMovieSearch[],
) => {
  const targetMovie = moviesList.filter((movie: IMovieSearch) => movie.imdbID === clickedMovie);
  if (bookMarkList.length === 0) {
    console.log('bookmark list is nothing', targetMovie);

    return targetMovie;
  }
  const isMarked = bookMarkList.filter((movie: IMovieSearch) => movie.imdbID === clickedMovie);

  if (isMarked.length === 0) {
    // console.log('bookmark list is nothing', targetMovie);
    return [...bookMarkList, ...targetMovie];
  }
  const removedBookmarkList = bookMarkList.filter(
    (movie: IMovieSearch) => movie.imdbID !== clickedMovie,
  );
  return removedBookmarkList;
};
