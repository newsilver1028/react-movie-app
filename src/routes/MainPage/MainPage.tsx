import { useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';
import MoviesList from '../../components/MoviesList/MoviesList';
import { useMovieAPI } from '../../hooks/useMovieAPI';

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

  input:focus,
  .submitButton:focus {
    outline: none;
  }

  .submitButton {
    position: absolute;
    right: 10%;
    height: 40px;
    border: none;
    background-color: transparent;
    border-radius: 10px;
    cursor: pointer;
  }

  .scrollArea {
    margin-top: 50px;
    width: 100%;
    height: 620px;
    overflow-y: scroll;
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

  .loadingArea {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    padding: 20px;
    color: white;
    background-color: black;
    border-radius: 20px;
    z-index: 3;
    transform: translate(-50%, -50%);
    text-align: center;
  }
`;

export default function MainPage() {
  const [search, setSearch] = useState<string>('');
  const { query, loading, moviesList, isDone, fetchQuery, loadMore } = useMovieAPI();

  const loader = useRef(null);
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (target.isIntersecting && query !== '' && !isDone) {
      loadMore();
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
    fetchQuery(search);
  };

  return (
    <MainPageContainer>
      <header>
        <form>
          <input
            type="text"
            value={search}
            onClick={handleInputClick}
            onChange={handleInputTextChange}
          />
          <button className="submitButton" type="submit" onClick={handleSubmitButtonClick}>
            <FiSearch className="searchIcon" color="dimgray" size="30" />
          </button>
        </form>
      </header>
      <div className="scrollArea">
        {moviesList.length === 0 && <div className="nothingResult">검색결과가 없습니다</div>}
        <MoviesList moviesList={moviesList} />
        <div ref={loader} />
        {loading && <div className="loadingArea">loading...</div>}
      </div>
    </MainPageContainer>
  );
}
