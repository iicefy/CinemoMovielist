import { Box, Container, Stack, Typography } from "@mui/material";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectMovieById } from "src/store/movie/movieSlide";
import { RootState } from "src/store/store";

const MovieDetails = () => {
  const { movieId } = useParams();
  const movieData = useSelector((state: RootState) =>
    selectMovieById(state, Number(movieId))
  );

  return (
    <Box gap={4}>
      <Box style={{ paddingTop: `${(9 / 16) * 100}%`, position: "relative" }}>
        <ReactPlayer
          url={movieData?.tr_mp4}
          playing={true}
          muted={true}
          width={"100%"}
          height={"100%"}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            maxWidth: "md",
          }}
          controls={true}
        />
      </Box>
      <Container maxWidth="md" style={{ padding: "2.5rem 1.5rem" }}>
        {movieData && (
          <Box gap={4} display={"flex"} flexDirection={"column"}>
            <Stack spacing={2}>
              <Typography variant="h3">{movieData.title_en}</Typography>
              <Typography variant="body1">{movieData.release_date}</Typography>
              <Typography variant="body1">{movieData.genre}</Typography>
              <Typography variant="body1">{movieData.synopsis_en}</Typography>
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MovieDetails;
