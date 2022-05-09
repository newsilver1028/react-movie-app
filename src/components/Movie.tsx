import { IMovieSearchProps } from "../types/movieTypes";

export default function Movie(props: IMovieSearchProps) {
  const { title, year, type, poster } = props;
  return (
    <li>
      {/* <img src={poster} alt={title} /> */}
      <div>{title}</div>
      <span>{year}</span>
      <span>{type}</span>
    </li>
  );
}
