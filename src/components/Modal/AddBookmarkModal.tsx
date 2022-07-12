import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { bookmarkMoviesState } from '../../state/bookmarkMoviesState';
import { IMovieSearch } from '../../types/type.d';
import { FaStar } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';

const Background = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  .modalContents {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 550px;
    padding: 30px 10px;
    border-radius: 20px;
    transform: translate(-50%, -50%);
    background-color: rgb(23, 23, 30);
    backdrop-filter: blur(5px);
    color: white;

    .textContents {
      display: flex;
      flex-direction: column;
      margin: 0;
      width: 290px;
      align-items: center;

      .dlContents {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 30px;
      }
    }

    .title {
      width: 290px;
      height: 60px;
      overflow: hidden;
      font-size: 1.4rem;
      font-weight: 600;
      text-align: center;
      word-break: break-all;
    }

    .imgWrapper {
      width: 240px;
      height: 360px;
    }

    img {
      width: 240px;
      border-radius: 10px;
    }

    .iconWrapper {
      margin-top: 10px;
      > button {
        background-color: transparent;
        border: none;
      }
    }
  }
`;

interface AddBookMarkModalProps {
  clickedMovie: IMovieSearch;
  onClose: () => void;
}

const AddBookmarkModal = ({ clickedMovie, onClose }: AddBookMarkModalProps) => {
  const [bookmarkMovies, setBookmarkMovies] = useRecoilState(bookmarkMoviesState);

  const isMarked = bookmarkMovies.some((m) => m.imdbID === clickedMovie.imdbID);

  const { Title: title, Year: year, Type: type, Poster: poster } = clickedMovie;

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

  const onErrorImg = (e: any) => {
    e.currentTarget.src =
      'https://img.icons8.com/fluency-systems-regular/500/6a6a73/clapperboard.png';
  };

  return (
    <>
      <Background onClick={handleModalOutsideClick} aria-hidden='true' />
      <ModalContainer>
        <div className='modalContents'>
          <div className='imgWrapper'>
            <img src={poster} alt={title} onError={onErrorImg} />
          </div>
          <h1 className='title'>{title}</h1>
          <dl className='textContents'>
            <div className='dlContents'>
              <dt>YEAR |</dt>
              <dd>{year}</dd>
            </div>
            <div className='dlContents'>
              <dt>TYPE |</dt>
              <dd>{type}</dd>
            </div>
          </dl>
          <div className='iconWrapper'>
            <button type='button' onClick={handleBookmarkClick}>
              {isMarked ? <FaStar size='25' color='white' /> : <FiStar size='25' color='#6a6a73' />}
            </button>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default AddBookmarkModal;
