export interface IMovieSearch {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IMovie {
  Search: IMovieSearch[];
  totalResults: string;
  Response: string;
}
