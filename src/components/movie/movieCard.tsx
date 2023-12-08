import { useMemo, useCallback, memo } from "react";
import {
  Box,
  Button,
  Card,
  // IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { IMovie } from "src/store/movie/movieSlide";
import { bgGradient } from "src/theme/css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "src/routes/hooks/use-router";
import useFavorite from "src/hooks/useFavorite";
import Iconify from "../Iconify/Iconify";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

const MovieCard = memo(({ movie }: { movie: IMovie }) => {
  const navigate = useRouter();
  const { toggleFavorite } = useFavorite();

  const isFavorite = useSelector(
    (state: RootState) => state.movie.movieFavorite
  ).entities[movie.id];

  const goToPageDetails = useCallback(() => {
    navigate.push(`/${movie.id}`);
  }, [movie.id, navigate]);

  const renderImg = useMemo(
    () => (
      <Box
        sx={{
          top: 0,
          width: 1,
          height: 1,
          objectFit: "cover",
          position: "absolute",
        }}
      >
        <LazyLoadImage
          src={movie.poster_url}
          alt={movie.title_en}
          width="100%"
          height="100%"
          loading="lazy"
        />
      </Box>
    ),
    [movie.poster_url, movie.title_en]
  );

  const renderButton = useMemo(() => {
    return (
      <Stack spacing={1} direction="row">
        <Button
          variant="outlined"
          onClick={() => toggleFavorite(movie.id)}
          sx={{ px: 0, minWidth: "40px" }}
          disableRipple
        >
          {isFavorite ? (
            <Iconify icon={"material-symbols:favorite"} />
          ) : (
            <Iconify icon={"material-symbols:favorite-outline"} />
          )}
        </Button>

        <Button
          variant="contained"
          onClick={goToPageDetails}
          sx={{ width: "100%" }}
        >
          Details
        </Button>
      </Stack>
    );
  }, [goToPageDetails, isFavorite, movie.id, toggleFavorite]);

  const renderInfo = useMemo(() => {
    return (
      <Stack spacing={1}>
        <Typography variant="h5" color="white" noWrap>
          {movie.title_en}
        </Typography>
        <Typography variant="caption" color="white">
          {movie.release_date}
        </Typography>
        <Typography variant="caption" color="white">
          {movie.genre}
        </Typography>
      </Stack>
    );
  }, [movie.genre, movie.release_date, movie.title_en]);

  return (
    <Card style={{ borderRadius: 0 }}>
      <Box
        className="movie-card"
        sx={{
          pt: "150%",
          position: "relative",
        }}
      >
        {renderImg}
        <Stack
          gap={4}
          sx={[
            {
              p: 4,
              pt: 12,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              ...bgGradient({
                direction: "to top",
                endColor: "#00000000",
                startColor: "#000000ff",
              }),
            },
          ]}
        >
          {renderInfo}
          {renderButton}
        </Stack>
      </Box>
    </Card>
  );
});

export default MovieCard;
