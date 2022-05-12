import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import store from 'storejs';
import styled from 'styled-components';
import { IMovieSearch } from '../types/movieTypes';
import Bookmark from './Bookmark/Bookmark';
import MainPage from './MainPage/MainPage';

const initialState = [{ Title: '', Year: '', imdbID: '', Type: '', Poster: '' }];
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #dee3f9;

  .contents {
    position: relative;
    width: 360px;
    height: 720px;
    padding: 10px;
    background-color: #fafbfe;
    border-radius: 40px;
  }
`;

export default function App() {
  const [localData, setLocalData] = useState<IMovieSearch[]>(initialState);
  useEffect(() => {
    const getLocalData = store.get('movieAppUser');
    if (!getLocalData) {
      console.log('newuser!!');

      setLocalData([]);
    }
    setLocalData(getLocalData);
  }, []);

  return (
    <Container>
      <RecoilRoot>
        <div className="contents">
          <Routes>
            <Route path="/" element={<MainPage bookmarkLocalData={localData!} />} />
            <Route path="bookmark" element={<Bookmark bookmarkLocalData={localData!} />} />
          </Routes>
        </div>
      </RecoilRoot>
    </Container>
  );
}
