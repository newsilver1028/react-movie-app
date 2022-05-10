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

export interface IMovieSearchProps {
  imdbID: string;
  title: string;
  year: string;
  type: string;
  poster: string;
  onClick: (e: any) => void;
}

export interface AddBookMarkModalProps {
  clickedMovieId: string;
  setIsOpenBookMarkModal: Dispatch<SetStateAction<boolean>>;
  handleIsMarkedClick: () => void;
}
