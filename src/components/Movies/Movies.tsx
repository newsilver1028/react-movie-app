import { Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { clickedTargetMovieState } from '../../state/clickedTargetMovieState';
import { IMovieSearch } from '../../types/movieTypes';
import Movie from './Movie';

const MovieContainer = styled.ul`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
  height: 610px;
  overflow-y: scroll;
  width: 360px;

  ::-webkit-scrollbar {
    width: 5px;
    position: absolute;
  }

  ::-webkit-scrollbar-track {
    /* border-radius: 5px; */
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 10px;
  }
`;

export default function Movies(props: {
  moviesList: IMovieSearch[];
  setIsOpenBookMarkModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { moviesList, setIsOpenBookMarkModal } = props;

  const [, setClickedMovie] = useRecoilState<string>(clickedTargetMovieState);

  const handleMovieListClick = (e: any) => {
    const { imdbid } = e.currentTarget.dataset;
    setIsOpenBookMarkModal(true);
    setClickedMovie(imdbid);
  };

  return (
    <MovieContainer>
      {moviesList.map((movie: IMovieSearch): JSX.Element => {
        const { Title, Year, imdbID, Type, Poster } = movie;

        return (
          <Movie
            key={imdbID}
            imdbID={imdbID}
            title={Title}
            year={Year}
            type={Type}
            poster={Poster}
            onClick={handleMovieListClick}
          />
        );
      })}
    </MovieContainer>
  );
}
