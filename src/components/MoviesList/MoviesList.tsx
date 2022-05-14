import { useState } from 'react';
import styled from 'styled-components';
import { IMovieSearch } from '../../types/movieTypes';
import AddBookmarkModal from '../Modal/AddBookmarkModal';
import Movies from '../Movies/Movies';

const MoviesListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function MoviesList({ moviesList }: { moviesList: IMovieSearch[] }) {
  const [isOpenBookmarkModal, setIsOpenBookarkModal] = useState<boolean>(false);
  const [clickedMovie, setClickedMovie] = useState<IMovieSearch | undefined>(undefined);

  const handleMoviItemClick = (item: IMovieSearch) => {
    setClickedMovie(item);
    setIsOpenBookarkModal(true);
  };

  const handleModalClose = () => setIsOpenBookarkModal(false);

  return (
    <MoviesListContainer>
      {clickedMovie && isOpenBookmarkModal && (
        <AddBookmarkModal clickedMovie={clickedMovie} onClose={handleModalClose} />
      )}
      <Movies moviesList={moviesList} onClickItem={handleMoviItemClick} />
    </MoviesListContainer>
  );
}
