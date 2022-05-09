import { useCallback, useEffect, useRef, useState } from "react";
import Movie from "./components/Movie";
import { useFetch } from "./hooks/useFetch";
import { IMovieSearch } from "./types/movieTypes";

export default function Wrapper() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  // const { loading, error, moviesList, totalResult, hasMoreData } = useFetch(
  //   query,
  //   page
  // );
  const [hasMoreData, setHasMoreData] = useState<boolean>(false);
  const { loading, error, moviesList, totalResult } = useFetch(
    query,
    page,
    hasMoreData
  );
  const loader = useRef(null);
  const rootRef = useRef(null);

  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0];
      if (hasMoreData && target.interesecting) {
        console.log("it's work");
        setPage((prev) => prev + 1);
        setHasMoreData(moviesList.length < totalResult);
        return;
      }
    },
    [hasMoreData, moviesList.length, totalResult]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5,
    };
    let observer = new global.IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer = new global.IntersectionObserver(handleObserver, {
        ...option,
      });
      observer.observe(loader.current);
    }
    return () => {
      setPage((prev) => prev + 1);
      return observer && observer.disconnect();
    };
  }, [handleObserver, loader]);

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setSearch(targetValue);
  };
  const handleSubmitButtonClick = (
    // e: React.MouseEventHandler<HTMLButtonElement>
    e: any
  ) => {
    e.preventDefault();
    setQuery(search);
  };
  console.log({ hasInWrapper: hasMoreData });

  return (
    <div>
      <form>
        <input type="text" value={search} onChange={handleInputTextChange} />
        <button type="submit" onClick={handleSubmitButtonClick}>
          seacrh
        </button>
      </form>
      <div>
        <div className="scrollArea">
          {moviesList.length === 0
            ? "검색결과가 없습니다"
            : `${query} 결과 출력`}

          <ul>
            {hasMoreData &&
              moviesList.map(
                (movie: IMovieSearch, index: number): JSX.Element => {
                  const { Title, Year, imbdID, Type, Poster } = movie;
                  // console.log({ movie: movie });
                  return (
                    <Movie
                      key={imbdID}
                      title={Title}
                      year={Year}
                      type={Type}
                      poster={Poster}
                    />
                  );
                }
              )}
          </ul>
          <div ref={loader} />
          {loading && <p>loading...</p>}
          {error && <p>Error!</p>}
        </div>
      </div>
    </div>
  );
}
