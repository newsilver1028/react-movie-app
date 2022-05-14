import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import MoviesList from '../../components/MoviesList/MoviesList';
import { bookmarkMoviesState } from '../../state/bookmarkMoviesState';

const BookmarkContainer = styled.div`
  header {
    padding: 40px;
    width: 100%;
    height: 40px;
  }
`;

export default function Bookmark() {
  const bookmarkMovies = useRecoilValue(bookmarkMoviesState);

  return (
    <BookmarkContainer>
      <header>
        <h1>내 즐겨찾기</h1>
      </header>
      <MoviesList moviesList={bookmarkMovies} />
    </BookmarkContainer>
  );
}
