import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { bookmarkMoviesState } from '../../state/bookmarkMoviesState';
import { IMovieSearch } from '../../types/movieTypes';
import Movie from './Movie';

const MovieContainer = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 80%;
`;

export interface Props {
  moviesList: IMovieSearch[];
  onClickItem?: (item: IMovieSearch) => void;
}

export default function Movies({ moviesList, onClickItem }: Props) {
  const bookmarkList = useRecoilValue(bookmarkMoviesState);
  const handleMovieListClick = (movie: IMovieSearch) => {
    onClickItem?.(movie);
  };

  return (
    <MovieContainer>
      {moviesList.map((movie: IMovieSearch): JSX.Element => {
        const isMarked = bookmarkList.some((bookmark) => bookmark.imdbID === movie.imdbID);
        return (
          <Movie
            key={movie.imdbID}
            movie={movie}
            onClickItem={handleMovieListClick}
            isMarked={isMarked}
          />
        );
      })}
    </MovieContainer>
  );
}
