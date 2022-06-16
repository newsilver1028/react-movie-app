import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { bookmarkMoviesState } from '../../state/bookmarkMoviesState';
import { IMovieSearch } from '../../types/movieTypes';

const Background = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 40%;
`;

const ModalContainer = styled.div`
  .modalContents {
    position: absolute;
    display: flex;
    align-items: center;
    flex: 1;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 100px;
    padding: 20px;
    background-color: white;
    border-radius: 20px;
    transform: translate(-50%, -50%);

    > button {
      width: 50%;
      height: 40px;
    }
  }
`;

export interface AddBookMarkModalProps {
  clickedMovie: IMovieSearch;
  onClose: () => void;
}

export default function AddBookmarkModal({ clickedMovie, onClose }: AddBookMarkModalProps) {
  const [bookmarkMovies, setBookmarkMovies] = useRecoilState(bookmarkMoviesState);

  const isMarked = bookmarkMovies.some((m) => m.imdbID === clickedMovie.imdbID);

  const handleModalOutsideClick = () => {
    onClose?.();
  };

  const handleBookmarkClick = () => {
    if (isMarked) {
      setBookmarkMovies((prev) => prev.filter((m) => m.imdbID !== clickedMovie.imdbID));
    } else {
      setBookmarkMovies((prev) => [...prev, clickedMovie]);
    }
    onClose();
  };

  return (
    <>
      <Background onClick={handleModalOutsideClick} aria-hidden='true' />
      <ModalContainer>
        <div className='modalContents'>
          <button type='button' onClick={handleBookmarkClick}>
            {isMarked ? 'REMOVE' : 'BOOKMARK'}
          </button>
          <button type='button' onClick={handleModalOutsideClick}>
            CANCEL
          </button>
        </div>
      </ModalContainer>
    </>
  );
}
