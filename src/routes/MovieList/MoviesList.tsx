import { useEffect, useRef, useState } from "react";
import AddBookmarkModal from "../../components/Modal/AddBookmarkModal";
import Movie from "../../components/Movie";
import SearchMovieForm from "../../components/SearchMovieForm";
import { useMovieAPI } from "../../hooks/useMovieAPI";
import { IMovieSearch } from "../../types/movieTypes";

export default function MoviesList() {
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const { loading, error, moviesList, setPage } = useMovieAPI(query);
  const loader = useRef(null);

  const [isOpanBookmarkModal, setIsOpenBookarkModal] = useState<boolean>(false);
  const [clickedMovieId, setClickedMovieId] = useState<string>("");

  const handleObserver = (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting && query !== "") {
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

  const handleMovieListClick = (e: any) => {
    const dataset = e.currentTarget.dataset;
    const { imdbid } = dataset;
    setIsOpenBookarkModal(true);
    setClickedMovieId(imdbid);
    console.log({ isOpen: isOpanBookmarkModal });
  };

  const handleIsMarkedClick = () => {
    console.log({ clickIsMarked: clickedMovieId });
    // 전역 상태로 사용자 아이디마다 즐겨찾기 저장.
  };

  return (
    <div>
      <form>
        <input type="text" value={search} onChange={handleInputTextChange} />
        <button type="submit" onClick={handleSubmitButtonClick}>
          seacrh
        </button>
      </form>
      {/* <SearchMovieForm search={search} onChange={handleInputTextChange} onClick={handleSubmitButtonClick}/> */}
      <div>
        <div className="scrollArea">
          {moviesList.length === 0 && "검색결과가 없습니다"}
          {isOpanBookmarkModal && (
            <AddBookmarkModal
              clickedMovieId={clickedMovieId}
              setIsOpenBookMarkModal={setIsOpenBookarkModal}
              handleIsMarkedClick={handleIsMarkedClick}
            />
          )}
          <ul>
            {moviesList.map((movie: IMovieSearch): JSX.Element => {
              const { Title, Year, imdbID, Type, Poster } = movie;
              console.log({ imdbID: imdbID });

              return (
                <Movie
                  key={imdbID}
                  imdbID={imdbID}
                  title={Title}
                  year={Year}
                  type={Type}
                  poster={Poster}
                  onClick={handleMovieListClick}
                />
              );
            })}
          </ul>
          {/* <MoviesList moviesList={moviesList} /> */}
          <div ref={loader} />
          {loading && <p>loading...</p>}
          {error && <p>Error!</p>}
        </div>
      </div>
    </div>
  );
}
