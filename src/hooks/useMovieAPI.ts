import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import * as _ from 'lodash';
import { IMovieSearch } from '../types/movieTypes';

export const useMovieAPI = (query: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [moviesList, setMoviesList] = useState<IMovieSearch[]>([]);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const sendQuery = useCallback(
    async (params: string) => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=92e32667&s=${params}&page=${page}`,
        );

        if (response.data.Response === 'False') {
          console.log('??????????', { res: response, isDone });
          setIsDone(true);
          // 추가한 코드
          // setMoviesList([]);
          // setLoading(false);
          return;
        }

        if (!response) {
          console.log('??????????', { res: response, isDone });
          setError(true);
          setLoading(false);
          setIsDone(true);
          return;
        }

        const searchList: IMovieSearch[] = response.data.Search;
        const removedDuplicateList = _.uniqBy(searchList, 'imdbID');
        setMoviesList((prev: IMovieSearch[]) => [...prev, ...removedDuplicateList]);
      } catch (e: any) {
        setError(true);
        console.log(e);
      } finally {
        setLoading(false);
        setIsDone(false);
      }
    },
    [page],
  );

  useEffect(() => {
    console.log('???', { isDone });
    if (isDone || query === '') {
      return;
    }

    sendQuery(query);
  }, [query, sendQuery, page]);

  return { loading, error, moviesList, setMoviesList, setPage, page };
};
