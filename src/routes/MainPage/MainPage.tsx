import { useCallback, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import MoviesList from '../../components/MoviesList/MoviesList';
import { getMovieListAPI } from '../../hooks/getMovieListAPI';

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
  const [searchWord, setSearchWord] = useState<string>('');
  const { fetchNextPage, isFetchingNextPage, ...result } = useInfiniteQuery(
    ['getMovieList', searchWord],
    ({ pageParam = 1 }) => getMovieListAPI({ pageParam, searchWord }),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) return lastPage.nextPage;
        return undefined;
      },
    }
  );
  const movieList = result.data?.pages[0].result ?? [];
  const isEmptyMovieList = movieList.length === 0;

  const observerRef = useRef<IntersectionObserver>();
  const loaderRef = useRef<HTMLDivElement>(null);

  const intersectionObserver = useCallback(
    (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          io.unobserve(entry.target);
          fetchNextPage();
        }
      });
    },
    [fetchNextPage]
  );

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    observerRef.current = new IntersectionObserver(intersectionObserver);
    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }
  }, [intersectionObserver, result]);

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.currentTarget.value;
    setSearch(targetValue);
  };

  const handleInputClick = () => {
    setSearch('');
  };

  const handleSubmitButtonClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchWord(search);
  };

  return (
    <MainPageContainer>
      <header>
        <form>
          <input
            type='text'
            value={search}
            onClick={handleInputClick}
            onChange={handleInputTextChange}
          />
          <button className='submitButton' type='submit' onClick={handleSubmitButtonClick}>
            <FiSearch className='searchIcon' color='dimgray' size='30' />
          </button>
        </form>
      </header>
      <main>
        <div className='scrollArea'>
          {isEmptyMovieList && <div className='nothingResult'>검색결과가 없습니다</div>}
          {!isFetchingNextPage && <MoviesList moviesList={movieList} />}
          <div ref={loaderRef} />
          {!isEmptyMovieList && isFetchingNextPage && <div className='loadingArea'>loading...</div>}
        </div>
      </main>
    </MainPageContainer>
  );
}
