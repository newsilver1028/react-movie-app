import { useCallback, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import MoviesList from '../../components/MoviesList';
import { getMovieListAPI } from '../../hooks/getMovieListAPI';
import { IMovieList } from '../../types/type.d';

const MainPageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: white;

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
    height: 60px;
  }

  input {
    padding-left: 15px;
    width: 80%;
    height: 40px;
    border: none;
    font-size: 1.2rem;
    color: white;
    background-color: #17171e;
    border-radius: 15px;
    font-family: 'Roboto Condensed', sans-serif;
  }

  input:focus,
  .submitButton:focus {
    outline: none;
  }

  input::placeholder {
    color: #6a6a73;
  }

  .submitButton {
    position: absolute;
    right: 30px;
    height: 40px;
    border: none;
    background-color: transparent;
    border-radius: 10px;
    cursor: pointer;
  }

  .scrollArea {
    margin-top: 50px;
    width: 100%;
    height: 590px;
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

const MainPage = () => {
  const [search, setSearch] = useState<string>('');
  const [searchWord, setSearchWord] = useState<string>('');

  const observerRef = useRef<IntersectionObserver>();
  const loaderRef = useRef<HTMLDivElement>(null);

  const { fetchNextPage, isFetchingNextPage, data, hasNextPage, ...result } = useInfiniteQuery(
    ['getMovieList', searchWord],
    ({ pageParam = 1 }) => getMovieListAPI({ pageParam, searchWord }),
    {
      enabled: !!searchWord,
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) return lastPage.nextPage;
        return undefined;
      },
      staleTime: 3 * 60 * 1000,
      cacheTime: 3 * 60 * 1000,
    }
  );

  const movieList = data?.pages;

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
    return () => {
      observerRef.current && observerRef.current.disconnect();
    };
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
  console.log({ movieList });

  return (
    <MainPageContainer>
      <header>
        <form>
          <input
            type='text'
            value={search}
            onClick={handleInputClick}
            onChange={handleInputTextChange}
            placeholder='search your movie'
          />
          <button className='submitButton' type='submit' onClick={handleSubmitButtonClick}>
            <FiSearch className='searchIcon' color='white' size='30' />
          </button>
        </form>
      </header>
      <main>
        <div className='scrollArea'>
          {!isFetchingNextPage &&
            movieList?.map((movie: IMovieList, index) => (
              <MoviesList key={index} moviesList={movie.result} />
            ))}
          <div ref={loaderRef} />
          {isFetchingNextPage && <div className='loadingArea'>loading...</div>}
        </div>
      </main>
    </MainPageContainer>
  );
};

export default MainPage;
