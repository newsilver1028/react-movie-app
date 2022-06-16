import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Bookmark from './Bookmark/Bookmark';
import Layout from './Layout/Layout';
import MainPage from './MainPage/MainPage';

export default function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='bookmark' element={<Bookmark />} />
        </Route>
      </Routes>
    </RecoilRoot>
  );
}
