import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchMovies, selectAllMovies } from "src/store/movie/movieSlide";
import { RootState, useAppDispatch } from "src/store/store";

const useGetMovie = () => {
  const dispatch = useAppDispatch();
  const movies = useSelector(selectAllMovies);
  const loading = useSelector((state: RootState) => state.movie.movieFetching);
  const error = useSelector((state: RootState) => state.movie.movieError);

  useEffect(() => {
    if (!movies.length && !error) {
      dispatch(fetchMovies());
    }
  }, [dispatch, movies, error]);

  return { movies, loading, error };
};

export default useGetMovie;
