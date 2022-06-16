import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import * as _ from 'lodash';
import { IMovieSearch } from '../types/movieTypes';

const apikey = process.env.REACT_APP_MOVIE_API_KEY;

export const useMovieAPI = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [moviesList, setMoviesList] = useState<IMovieSearch[]>([]);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');

  const sendQuery = useCallback(
    async (params: string) => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios({
          url: 'http://www.omdbapi.com',
          method: 'get',
          params: {
            apikey,
            s: params,
            page,
          },
        });
        console.log({ response });

        if (response.data.Response === 'False') {
          setIsDone(true);
          return;
        }

        if (!response) {
          setError(true);
          setLoading(false);
          setIsDone(true);
          return;
        }

        const searchList: IMovieSearch[] = response.data.Search;
        const removedDuplicateList = _.uniqBy(searchList, 'imdbID');
        setMoviesList((prev: IMovieSearch[]) => [...prev, ...removedDuplicateList]);
      } catch (e: unknown) {
        setError(true);
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [page]
  );

  useEffect(() => {
    if (isDone || query === '') {
      return;
    }

    sendQuery(query);
  }, [query, sendQuery, page, isDone]);

  const fetchQuery = (search: string) => {
    setQuery(search);
    setMoviesList([]);
    setPage(1);
    setIsDone(false);
  };
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return {
    query,
    loading,
    error,
    moviesList,
    isDone,
    fetchQuery,
    loadMore,
  };
};
