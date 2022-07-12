import { FaStar } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';
import styled from 'styled-components';
import { IMovieSearch } from '../../types/type.d';

const MovieList = styled.li`
  display: flex;
  flex-flow: column wrap;
  width: 160px;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
  cursor: pointer;
  text-align: center;

  .textContents {
    display: flex;
    flex-direction: column;
    width: 160px;
    height: 120px;
    align-items: center;
  }

  .title {
    width: 160px;
    height: 45px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    font-size: 1.1rem;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .ddWrapper {
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    width: 160px;
    height: 30px;
    align-items: center;
  }

  .year,
  .type {
    margin: 0;
  }

  .year {
    width: 100px;
  }

  .imgWrapper {
    width: 160px;
    height: 240px;
  }

  img {
    width: 160px;
    border-radius: 10px;
  }

  .iconWrapper {
    height: 30px;
  }
`;

interface IMovieSearchProps {
  isMarked?: boolean;
  movie: IMovieSearch;
  onClickItem?: (movie: IMovieSearch) => void;
}

const Movie = ({ movie, isMarked, onClickItem }: IMovieSearchProps) => {
  const { Title: title, Year: year, imdbID, Type: type, Poster: poster } = movie;

  const handleClick = () => {
    onClickItem?.(movie);
  };

  const onErrorImg = (e: any) => {
    e.currentTarget.src =
      'https://img.icons8.com/fluency-systems-regular/500/6a6a73/clapperboard.png';
  };

  return (
    <MovieList key={imdbID} onClick={handleClick}>
      <div className='imgWrapper'>
        <img src={poster} alt={title} onError={onErrorImg} />
      </div>
      <dl className='textContents'>
        <dt className='title'>{title}</dt>
        <div className='ddWrapper'>
          <dd className='year'>{year}</dd>
          <dd className='type'>{type}</dd>
        </div>
        <div className='iconWrapper'>
          {isMarked ? <FaStar size='25' color='white' /> : <FiStar size='25' color='#6a6a73' />}
        </div>
      </dl>
    </MovieList>
  );
};

export default Movie;
