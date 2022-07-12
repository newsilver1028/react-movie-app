import { useState } from 'react';
import styled from 'styled-components';
import { IMovieSearch } from '../../types/type.d';
import AddBookmarkModal from '../Modal/AddBookmarkModal';
import { Portal } from '../Modal/Portal';
import Movies from '../Movies/Movies';

const MoviesListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MoviesList = ({ moviesList }: { moviesList: IMovieSearch[] }) => {
  const [isOpenBookmarkModal, setIsOpenBookarkModal] = useState<boolean>(false);
  const [clickedMovie, setClickedMovie] = useState<IMovieSearch | undefined>(undefined);

  const handleMoviItemClick = (item: IMovieSearch) => {
    setClickedMovie(item);
    setIsOpenBookarkModal(true);
  };

  const handleModalClose = () => setIsOpenBookarkModal(false);

  return (
    <MoviesListContainer>
      <Portal>
        {clickedMovie && isOpenBookmarkModal && (
          <AddBookmarkModal clickedMovie={clickedMovie} onClose={handleModalClose} />
        )}
      </Portal>
      <Movies moviesList={moviesList} onClickItem={handleMoviItemClick} />
    </MoviesListContainer>
  );
};

export default MoviesList;
