import { FaStar } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';
import styled from 'styled-components';
import { IMovieSearch } from '../../types/movieTypes';

const MovieList = styled.li`
  display: flex;
  width: 100%;
  height: 113px;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);

  .textContents {
    display: flex;
    flex: 1;
    padding: 10px;
    align-items: center;
    text-align: left;
  }

  .title {
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .year,
  .type {
    width: 110px;
    text-align: center;
  }

  img {
    width: 80px;
    height: 113px;
    border-radius: 10px;
    text-overflow: ellipsis;
  }

  .bookmarkIcon {
    color: orange;
  }
`;

export interface IMovieSearchProps {
  isMarked?: boolean;
  movie: IMovieSearch;
  onClickItem?: (movie: IMovieSearch) => void;
}

export default function Movie({ movie, isMarked, onClickItem }: IMovieSearchProps) {
  const { Title: title, Year: year, imdbID, Type: type, Poster: poster } = movie;

  const handleClick = () => {
    onClickItem?.(movie);
  };

  return (
    <MovieList key={imdbID} data-imdbid={imdbID} onClick={handleClick}>
      <img src={poster} alt={title} />
      <div className="textContents">
        <div className="title">{title}</div>
        <span className="year">{year}</span>
        <span className="type">{type}</span>
        {isMarked ? (
          <FaStar className="bookmarkIcon" size="30" />
        ) : (
          <FiStar className="bookmarkIcon" size="30" />
        )}
      </div>
    </MovieList>
  );
}
