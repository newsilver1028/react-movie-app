import { IMovieSearch } from "../types/movieTypes";
import Movie from "./Movie";

export default function Movies(props: IMovieSearch[]) {
  const moviesList = props;
  return (
    <ul>
      {moviesList.map((movie: IMovieSearch): JSX.Element => {
        const { Title, Year, imdbID, Type, Poster } = movie;
        console.log({ imdbID: imdbID });

        return (
          <Movie
            key={imdbID}
            imdbID={imdbID}
            title={Title}
            year={Year}
            type={Type}
            poster={Poster}
            onClick={() => {}}
          />
        );
      })}
    </ul>
  );
}
