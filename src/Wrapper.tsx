import { useEffect, useRef, useState } from "react";
import Movie from "./components/Movie";
import { useMovieAPI } from "./hooks/useMovieAPI";
import { IMovieSearch } from "./types/movieTypes";

export default function Wrapper() {
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const { loading, error, moviesList, setPage } = useMovieAPI(query);
  const loader = useRef(null);

  const handleObserver = (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting && query === "") {
      console.log("it's work");
      setPage((prev) => prev + 1);
      return;
    }
  };

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1,
    };
    console.log({ loader, query });
    let observer = new global.IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer = new global.IntersectionObserver(handleObserver, {
        ...option,
      });
      observer.observe(loader.current);
    }
    return () => {
      return observer && observer.disconnect();
    };
  }, [loader, query]);

  // query가 없는 deps면
  // handleObserver callback이
  // query === empty string일 때 만들어진 callback이

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
    setPage(1);
  };

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
            {moviesList.map((movie: IMovieSearch): JSX.Element => {
              const { Title, Year, imdbID, Type, Poster } = movie;
              console.log({ imbdID: imdbID });

              return (
                <Movie
                  key={imdbID}
                  title={Title}
                  year={Year}
                  type={Type}
                  poster={Poster}
                />
              );
            })}
          </ul>
          <div ref={loader} />
          {loading && <p>loading...</p>}
          {error && <p>Error!</p>}
        </div>
      </div>
    </div>
  );
}
