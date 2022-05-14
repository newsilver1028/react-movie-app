import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Footer from '../components/Footer';
import Bookmark from './Bookmark/Bookmark';
import MainPage from './MainPage/MainPage';

export default function App() {
  return (
    <RecoilRoot>
      <div className="contents">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="bookmark" element={<Bookmark />} />
        </Routes>
        <Footer />
      </div>
    </RecoilRoot>
  );
}
