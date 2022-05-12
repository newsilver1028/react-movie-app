import styled from 'styled-components';
import { IMovieSearchProps } from '../../types/movieTypes';
import { GlobalStyle } from '../../styles/styled';

const MvoieList = styled.li`
  display: flex;
  flex-flow: row nowrap;
  width: 350px;
  height: 113px;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);

  .textContents {
    display: flex;
    padding: 10px;
    flex-flow: row wrap;
    align-items: center;
  }

  .title {
    width: 250px;
    height: 45px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .year,
  .type {
    width: 140px;
    text-align: center;
  }

  img {
    width: 80px;
    height: 113px;
    border-radius: 10px;
  }
`;

export default function Movie(props: IMovieSearchProps) {
  const { imdbID, title, year, type, poster, onClick } = props;

  return (
    <MvoieList key={imdbID} data-imdbid={imdbID} onClick={onClick}>
      {/* <GlobalStyle bgColor="black" /> */}
      <img src={poster} alt={title} />
      <div className="textContents">
        <div className="title">{title}</div>
        <span className="year">{year}</span>
        <span className="type">{type}</span>
      </div>
    </MvoieList>
  );
}
