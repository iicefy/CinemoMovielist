import { useSelector } from "react-redux";
import {
  selectFavoriteMovies,
  toggleFavoriteMovie,
} from "src/store/movie/movieSlide";
import { useAppDispatch } from "src/store/store";

const useFavorite = () => {
  const dispatch = useAppDispatch();
  const favoriteMovies = useSelector(selectFavoriteMovies);

  const toggleFavorite = (id: number) => {
    dispatch(toggleFavoriteMovie(id));
  };

  return {
    favoriteMovies,
    toggleFavorite,
  };
};

export default useFavorite;
