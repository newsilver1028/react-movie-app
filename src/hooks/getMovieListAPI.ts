import axios from 'axios';
import _ from 'lodash';
import { IMovieSearch } from '../types/type.d';

const apikey = process.env.REACT_APP_MOVIE_API_KEY;

export const getMovieListAPI = async ({
  pageParam,
  searchWord,
}: {
  pageParam: number;
  searchWord: string;
}) => {
  const response = await axios.get(
    `http://www.omdbapi.com?apikey=${apikey}&s=${searchWord}&page=${pageParam}`
  );

  const searchList: IMovieSearch[] = response.data.Search;
  const removedDuplicateList = _.uniqBy(searchList, 'imdbID');
  return {
    result: removedDuplicateList,
    nextPage: pageParam + 1,
    isLast: response.data.Response === 'False',
  };
};
