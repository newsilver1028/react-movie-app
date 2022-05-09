import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { IMovieSearch } from "../types/movieTypes";

export const useFetch = (query: any, page: number, hasMoreData: boolean) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  // const [hasMoreData, setHasMoreData] = useState<boolean>(false);
  const [totalResult, setTotalResult] = useState<number>(0);
  const [moviesList, setMoviesList] = useState<IMovieSearch[]>([]);

  const sendQuery = useCallback(async (params: string) => {
    try {
      await setLoading(true);
      await setError(false);
      const response = await axios
        .get(
          `http://www.omdbapi.com/?apikey=92e32667&s=${params}&page=${page}`
          // `http://www.omdbapi.com/?apikey=92e32667&s=iron&page=5444`
        )
        .then((response) => {
          console.log({ response: response });
          if (response.data.Response === "False") {
            setError(true);
            return;
          }
          return response;
        })
        .catch((error) => {
          console.log({ error: error });
        });

      if (!response) {
        setError(true);
        console.log("not response ");
        // setHasMoreData(false);
        // console.log({ hasmore: hasMoreData });
        return;
      }
      const searchList: IMovieSearch[] = response.data.Search;
      await setTotalResult(response.data.totalResults);
      await setMoviesList((prev) => [...prev, ...searchList]);
      // await setHasMoreData(moviesList.length < response.data.totalResults);
      setLoading(false);
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!hasMoreData) {
      console.log("useEffect work");
      console.log({ effectHasData: hasMoreData });
      sendQuery(query);
      return;
    }
  }, [query, sendQuery, page]);

  return { loading, error, moviesList, totalResult };
};
