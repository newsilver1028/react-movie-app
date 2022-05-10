import { IMovieSearchProps } from "../types/movieTypes";
import { GlobalStyle } from "../styles/styled";
import styled from "styled-components";

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

const List = styled.li`
  display: flex;
  background-color: aliceblue;
  cursor: pointer;

  img {
    width: 100px;
  }
`;

interface MovieListProps {
  bgColor: string;
}
