import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Bookmark from "./routes/Bookmark/Bookmark";
import MoviesList from "./routes/MovieList/MoviesList";
import { ThemeProvider } from "styled-components";

export default function App() {
  return (
    <ThemeProvider theme={{}}>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
        <div>footer nav</div>
      </RecoilRoot>
    </ThemeProvider>
  );
}
