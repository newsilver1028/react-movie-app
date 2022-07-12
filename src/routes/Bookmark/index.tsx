import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import MoviesList from '../../components/MoviesList';
import { bookmarkMoviesState } from '../../state/bookmarkMoviesState';

const BookmarkContainer = styled.div`
  position: relative;
  color: white;

  header {
    padding-left: 30px;
    width: 100%;
    height: 50px;
  }
  .scrollArea {
    width: 100%;
    height: 590px;
    overflow-y: scroll;
  }
`;

const Bookmark = () => {
  const bookmarkMovies = useRecoilValue(bookmarkMoviesState);

  return (
    <BookmarkContainer>
      <header>
        <h1>My Movies</h1>
      </header>
      <main>
        <div className='scrollArea'>
          <MoviesList moviesList={bookmarkMovies} />
        </div>
      </main>
    </BookmarkContainer>
  );
};
export default Bookmark;
