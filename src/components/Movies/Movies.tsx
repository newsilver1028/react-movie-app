import { Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import { clickedTargetMovieState } from '../../state/clickedTargetMovieState';
import { IMovieSearch } from '../../types/movieTypes';
import Movie from './Movie';

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
    <ul>
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
    </ul>
  );
}
