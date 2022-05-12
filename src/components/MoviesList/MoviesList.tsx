import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import store from 'storejs';
import AddBookmarkModal from '../Modal/AddBookmarkModal';
import Movies from '../Movies/Movies';
import { bookmarkMoviesState } from '../../state/bookmarkMoviesState';
import { clickedTargetMovieState } from '../../state/clickedTargetMovieState';
import { IMovieSearch } from '../../types/movieTypes';
import { getNewBookmarkList } from '../../util/getNewBookmarkList';

const initialState = [{ Title: '', Year: '', imdbID: '', Type: '', Poster: '' }];

export default function MoviesList(props: { moviesList: IMovieSearch[] }) {
  const { moviesList } = props;

  const [isOpenBookmarkModal, setIsOpenBookarkModal] = useState<boolean>(false);
  const [clickedMovie] = useRecoilState<string>(clickedTargetMovieState);

  const [localData, setLocalData] = useState<IMovieSearch[]>(initialState);

  useEffect(() => {
    // const getLocalData = store.get('movieAppUser');
    const getLocalData = localStorage.getItem('movieAppUser');
    if (!getLocalData) {
      console.log('new user');
      setLocalData([]);
      return;
    }
    const parsedLocalData = JSON.parse(getLocalData!);
    setLocalData(parsedLocalData);
  }, []);

  console.log({ localData });

  const handleAddBookmarkClick = (e: any) => {
    setLocalData((prev: IMovieSearch[]): IMovieSearch[] => {
      const array = getNewBookmarkList(clickedMovie, prev, moviesList);
      const object = {
        movieAppUser: array,
      };
      // store.set('movieAppUser', array);
      localStorage.setItem('movieAppUser', JSON.stringify(object));
      console.log({ array });

      return array;
    });
    setIsOpenBookarkModal(false);
  };

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
