import useGetMovie from "src/api/useGetMovie";
import ResponsiveGrid from "src/components/responsiveGrid/responsiveGrid";

const MoviePage = () => {
  const { movies } = useGetMovie();

  return <ResponsiveGrid list={movies} />;
};

export default MoviePage;
