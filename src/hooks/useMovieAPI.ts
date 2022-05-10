import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IMovieSearch } from "../types/movieTypes";

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
          `http://www.omdbapi.com/?apikey=92e32667&s=${params}&page=${page}`
        );

        console.log({ res: response, isDone, params });

        if (response.data.Response === "False") {
          console.log("??????????", { res: response, isDone });
          setIsDone(true);
          return;
        }

        if (!response) {
          setError(true);
          return;
        }

        const searchList: IMovieSearch[] = response.data.Search;
        setMoviesList((prev) => [...prev, ...searchList]);
      } catch (error: any) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [page]
  );

  useEffect(() => {
    console.log("???", { isDone });
    if (isDone || query === "") {
      return;
    }

    sendQuery(query);
  }, [query, sendQuery, page, isDone]);

  return { loading, error, moviesList, setPage, page };
};
