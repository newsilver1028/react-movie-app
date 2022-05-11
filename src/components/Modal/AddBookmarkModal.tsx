import { useRecoilState, useRecoilValue } from 'recoil';
import { bookmarkMoviesState } from '../../state/bookmarkMoviesState';
import { clickedTargetMovieState } from '../../state/clickedTargetMovieState';
import { AddBookMarkModalProps, IMovieSearch, IMovieSearchProps } from '../../types/movieTypes';

export default function AddBookmarkModal(props: AddBookMarkModalProps) {
  const { setIsOpenBookMarkModal, handleAddBookmarkClick } = props;
  const bookmarkMoviesList = useRecoilValue(bookmarkMoviesState);
  // const isMarked = bookmarkMoviesList.includes(clickedMovieId);

  const [clickedMovie, setClickedMovie] = useRecoilState<string>(clickedTargetMovieState);

  const isMarked = bookmarkMoviesList.filter(
    (movie: IMovieSearch) => movie.imdbID === clickedMovie,
  );

  const handleModalOutsideClick = () => {
    setIsOpenBookMarkModal(false);
  };

  return (
    <div>
      {/* background */}
      <div onClick={handleModalOutsideClick} aria-hidden="true">
        <button type="button" onClick={handleAddBookmarkClick}>
          {isMarked.length === 0 ? '즐겨찾기' : '즐겨찾기 제거'}
        </button>
        <button type="button">cancel</button>
      </div>
    </div>
  );
}
