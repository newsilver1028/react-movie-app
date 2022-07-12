import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { bookmarkMoviesState } from '../../state/bookmarkMoviesState';
import { IMovieSearch } from '../../types/type.d';
import Movie from './Movie';

const MovieContainer = styled.ul`
  padding: 0;
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

export interface Props {
  moviesList: IMovieSearch[];
  onClickItem?: (item: IMovieSearch) => void;
}

const Movies = ({ moviesList, onClickItem }: Props) => {
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
};
export default Movies;
