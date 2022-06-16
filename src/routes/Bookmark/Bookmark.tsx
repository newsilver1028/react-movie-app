import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import MoviesList from '../../components/MoviesList/MoviesList';
import { bookmarkMoviesState } from '../../state/bookmarkMoviesState';

const BookmarkContainer = styled.div`
  position: relative;

  header {
    padding-left: 60px;
    width: 100%;
    height: 50px;
  }
  .scrollArea {
    width: 100%;
    height: 620px;
    overflow-y: scroll;
  }
`;

export default function Bookmark() {
  const bookmarkMovies = useRecoilValue(bookmarkMoviesState);

  return (
    <BookmarkContainer>
      <header>
        <h1>내 즐겨찾기</h1>
      </header>
      <main>
        <div className='scrollArea'>
          <MoviesList moviesList={bookmarkMovies} />
        </div>
      </main>
    </BookmarkContainer>
  );
}
