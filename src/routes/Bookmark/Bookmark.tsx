import { useEffect, useState } from 'react';
import store from 'storejs';
import MoviesList from '../../components/MoviesList/MoviesList';
import { IMovieSearch } from '../../types/movieTypes';

const initialState = [{ Title: '', Year: '', imdbID: '', Type: '', Poster: '' }];

export default function Bookmark(props: { bookmarkLocalData: IMovieSearch[] }) {
  const { bookmarkLocalData } = props;

  const [localData, setLocalData] = useState<IMovieSearch[]>(initialState);
  useEffect(() => {
    console.log({ bookmarkLocalData });

    const getLocalData = store.get('movieAppUser');
    if (!getLocalData) {
      console.log('new user');
      setLocalData([]);
    }
    setLocalData(getLocalData);
  }, []);

  return (
    <div>
      bookmark page
      <MoviesList moviesList={localData} />
    </div>
  );
}
