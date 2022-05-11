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
  isMarked?: boolean;
  onClick?: (e: any) => void;
}

export interface AddBookMarkModalProps {
  clickedMovie: string;
  setIsOpenBookMarkModal: Dispatch<SetStateAction<boolean>>;
  handleAddBookmarkClick: (e: any) => void;
}
