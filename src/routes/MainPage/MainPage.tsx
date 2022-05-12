import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import MoviesList from '../../components/MoviesList/MoviesList';
import { useMovieAPI } from '../../hooks/useMovieAPI';
import { IMovieSearch } from '../../types/movieTypes';
import Footer from '../../components/Footer';

const MainPageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  header {
    position: absolute;
    top: 0;
    width: 100%;
  }

  form {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 50px;
  }

  input {
    width: 80%;
    height: 40px;
    border: none;
    border-bottom: 1px solid lightgrey;
    font-size: 1.2rem;
    color: dimgray;
    background-color: transparent;
  }

  input:focus {
    outline: none;
  }

  button {
    position: absolute;
    right: 40px;
    width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;
    border-radius: 10px;
    cursor: pointer;
  }

  .scrollArea {
    margin: 40px auto;
  }

  .nothingResult {
    position: absolute;
    top: 300px;
    left: 0;
    width: 100%;
    text-align: center;
    color: dimgray;
    font-size: 1.2rem;
  }
`;

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
    <MainPageContainer>
      {/* <div> */}
      <header>
        <form>
          <input
            type="text"
            value={search}
            onClick={handleInputClick}
            onChange={handleInputTextChange}
          />
          <button type="submit" onClick={handleSubmitButtonClick}>
            <FiSearch color="dimgray" size="s" />
          </button>
        </form>
      </header>
      <div className="scrollArea">
        {moviesList.length === 0 && <div className="nothingResult">검색결과가 없습니다</div>}
        <MoviesList moviesList={moviesList} />
        <div ref={loader} />
        {loading && <p>loading...</p>}
      </div>
      {/* </div> */}
      <Footer />
    </MainPageContainer>
  );
}
