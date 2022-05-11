import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import store from 'storejs';
import AddBookmarkModal from '../Modal/AddBookmarkModal';
import Movies from '../Movies/Movies';
import { bookmarkMoviesState } from '../../state/bookmarkMoviesState';
import { clickedTargetMovieState } from '../../state/clickedTargetMovieState';
import { IMovieSearch } from '../../types/movieTypes';
import { getNewBookmarkList } from '../../util/getNewBookmarkList';

export default function MoviesList(props: { moviesList: IMovieSearch[] }) {
  const { moviesList } = props;
  const [isOpenBookmarkModal, setIsOpenBookarkModal] = useState<boolean>(false);
  const [clickedMovie] = useRecoilState<string>(clickedTargetMovieState);

  const [bookmarkMoviesList, setBookmarkMoviesList] =
    useRecoilState<IMovieSearch[]>(bookmarkMoviesState);

  const handleAddBookmarkClick = (e: any) => {
    setBookmarkMoviesList((prev: IMovieSearch[]): IMovieSearch[] => {
      const array = getNewBookmarkList(clickedMovie, bookmarkMoviesList, prev);
      store.set({ movieAppUser: array });
      return array;
    });
    setIsOpenBookarkModal(false);
  };

  useEffect(() => {
    const localData = store.get('movieAppUser');
    setBookmarkMoviesList(localData);
  }, []);

  console.log({ bookmarkMoviesList });

  useEffect(() => {
    store.set({ movieAppUser: bookmarkMoviesList });
  }, [bookmarkMoviesList]);

  return (
    <div>
      {isOpenBookmarkModal && (
        <AddBookmarkModal
          clickedMovie={clickedMovie}
          setIsOpenBookMarkModal={setIsOpenBookarkModal}
          handleAddBookmarkClick={handleAddBookmarkClick}
        />
      )}
      <Movies moviesList={moviesList} setIsOpenBookMarkModal={setIsOpenBookarkModal} />
    </div>
  );
}
