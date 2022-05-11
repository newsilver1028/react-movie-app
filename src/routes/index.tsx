import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import store from 'storejs';
import { IMovieSearch } from '../types/movieTypes';
import Bookmark from './Bookmark/Bookmark';
import MainPage from './MainPage/MainPage';

const initialState = [{ Title: '', Year: '', imdbID: '', Type: '', Poster: '' }];

export default function App() {
  const [localData, setLocalData] = useState<IMovieSearch[]>(initialState);
  useEffect(() => {
    const getLocalData = store.get('movieAppUser');
    if (getLocalData.length === 0) {
      setLocalData(initialState);
    }
    setLocalData(getLocalData);
  }, []);

  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<MainPage bookmarkLocalData={localData!} />} />
        <Route path="bookmark" element={<Bookmark bookmarkLocalData={localData!} />} />
      </Routes>
    </RecoilRoot>
  );
}
