import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

export type IMovie = {
  id: number;
  movieCode: string[];
  title_en: string;
  title_th: string;
  rating: string;
  rating_id: number;
  duration: number;
  release_date: string;
  sneak_date: string;
  synopsis_th: string;
  synopsis_en: string;
  director: string;
  actor: string;
  genre: string;
  poster_ori: string;
  poster_url: string;
  trailer: string;
  tr_ios: string;
  tr_hd: string;
  tr_sd: string;
  tr_mp4: string;
  priority: number;
  now_showing: "1" | "0";
  advance_ticket: "1" | "0";
  date_update: string;
  show_buyticket: "1" | "0";
  trailer_cms_id: string;
  trailer_ivx_key: string;
};

export interface MovieState {
  movieFetching: boolean;
  movieError: string | null;
  movieFavorite: {
    ids: number[];
    entities: {
      [key: number]: IMovie;
    };
  };
  entities: {
    ids: number[];
    entities: {
      [key: number]: IMovie;
    };
  };
}

const moviesAdapter = createEntityAdapter({
  selectId: (movie: IMovie) => movie.id,
});

const favoriteMoviesAdapter = createEntityAdapter({
  selectId: (movie: IMovie) => movie.id,
});

const initialState: MovieState = {
  movieFetching: false,
  movieError: null,
  movieFavorite: favoriteMoviesAdapter.getInitialState(),
  entities: moviesAdapter.getInitialState(),
};

export const fetchMovies = createAsyncThunk<IMovie[]>(
  "movie/fetchMovies",
  async (_, { rejectWithValue }) => {
    const response = await fetch(
      `https://www.majorcineplex.com/apis/get_movie_avaiable`
    );
    const data = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data.movies;
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    toggleFavoriteMovie: (state, action) => {
      const movie = state.entities.entities[action.payload];
      if (movie) {
        if (state.movieFavorite.entities[action.payload]) {
          favoriteMoviesAdapter.removeOne(state.movieFavorite, action.payload);
        } else {
          favoriteMoviesAdapter.addOne(state.movieFavorite, movie);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.movieFetching = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      console.log("set_movie");
      state.movieFetching = false;
      state.movieError = null;
      moviesAdapter.upsertMany(state.entities, action.payload);
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.movieFetching = false;
      state.movieError = action.error.message || "error";
    });
  },
});

export const { selectById: selectMovieById, selectAll: selectAllMovies } =
  moviesAdapter.getSelectors((state: RootState) => state.movie.entities);

export const { selectAll: selectFavoriteMovies } =
  favoriteMoviesAdapter.getSelectors(
    (state: RootState) => state.movie.movieFavorite
  );

export const { toggleFavoriteMovie } = movieSlice.actions;

export default movieSlice.reducer;
