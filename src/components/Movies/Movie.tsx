import styled from 'styled-components';
import { IMovieSearchProps } from '../../types/movieTypes';
import { GlobalStyle } from '../../styles/styled';

const List = styled.li`
  display: flex;
  background-color: aliceblue;
  cursor: pointer;

  img {
    width: 100px;
  }
`;

export default function Movie(props: IMovieSearchProps) {
  const { imdbID, title, year, type, poster, onClick } = props;

  return (
    <List key={imdbID} data-imdbid={imdbID} onClick={onClick}>
      {/* <GlobalStyle bgColor="black" /> */}
      <img src={poster} alt={title} />
      <div>{title}</div>
      <span>{year}</span>
      <span>{type}</span>
    </List>
  );
}

interface MovieListProps {
  bgColor: string;
}
