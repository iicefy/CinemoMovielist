import { useMemo } from "react";
import { Container, Grid, Typography } from "@mui/material";
import MovieCard from "src/components/movie/movieCard";
import useFavorite from "src/hooks/useFavorite";
import { IMovie } from "src/store/movie/movieSlide";
import { useResponsive } from "src/hooks/useResponsive";

const FavoritePage = () => {
  const { favoriteMovies } = useFavorite();
  const lgUp = useResponsive({ query: "up", start: "lg" });

  const renderMovieCard = useMemo(() => {
    if (favoriteMovies.length === 0) {
      return (
        <Grid xs={12} sm={6} md={4} item>
          No favorite movie...
        </Grid>
      );
    }

    return favoriteMovies?.map((movie: IMovie) => (
      <Grid key={movie.id} xs={12} sm={6} md={4} item>
        <MovieCard movie={movie} />
      </Grid>
    ));
  }, [favoriteMovies]);

  return (
    <Container sx={{ pt: lgUp ? 4 : 0 }}>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Favorite
      </Typography>

      <Grid container spacing={3}>
        {renderMovieCard}
      </Grid>
    </Container>
  );
};

export default FavoritePage;
