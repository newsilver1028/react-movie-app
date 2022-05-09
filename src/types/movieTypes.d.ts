export interface IMovieSearch {
  Title: string;
  Year: string;
  imbdID: string;
  Type: string;
  Poster: string;
}

export interface IMovie {
  Search: IMovieSearch[];
}

export interface IMovieSearchProps {
  title: string;
  year: string;
  type: string;
  poster: string;
}
