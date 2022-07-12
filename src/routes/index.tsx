import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Bookmark from './Bookmark';
import Layout from './Layout';
import MainPage from './MainPage';

const App = () => {
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
};

export default App;
