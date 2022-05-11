import { useEffect, useRef, useState } from 'react';
import MoviesList from '../../components/MoviesList/MoviesList';
import { useMovieAPI } from '../../hooks/useMovieAPI';
import { IMovieSearch } from '../../types/movieTypes';

export default function MainPage(props: { bookmarkLocalData: IMovieSearch[] }) {
  const { bookmarkLocalData } = props;
  const [search, setSearch] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const { loading, error, moviesList, setPage, setMoviesList } = useMovieAPI(query);

  const loader = useRef(null);
  const handleObserver = (entries: any) => {
    // console.log({ typeOfEnt: typeof entries });
    const target = entries[0];
    if (target.isIntersecting && query !== '') {
      setPage((prev: number) => prev + 1);
      return;
    }
  };

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1,
    };
    let observer = new global.IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer = new global.IntersectionObserver(handleObserver, {
        ...option,
      });
      observer.observe(loader.current);
    }
    return () => observer && observer.disconnect();
  }, [handleObserver, loader, query]);

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    setSearch(targetValue);
  };

  const handleInputClick = () => {
    setSearch('');
  };

  const handleSubmitButtonClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMoviesList([]);
    setQuery(search);
    setPage(1);
  };

  return (
    <div>
      <header>
        <form>
          <input
            type="text"
            value={search}
            onClick={handleInputClick}
            onChange={handleInputTextChange}
          />
          <button type="submit" onClick={handleSubmitButtonClick}>
            seacrh
          </button>
        </form>
      </header>
      {moviesList.length === 0 && '검색결과가 없습니다'}
      <div className="scrollArea">
        <MoviesList moviesList={moviesList} />
        <div ref={loader} />
        {loading && <p>loading...</p>}
      </div>
    </div>
  );
}
