import axios from "axios";
import type { Movie } from "../types/movie";

const key = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResults {
  results: Movie[]
}

export default async function fetchMovies(value: string): Promise<Movie[]> {
  return await axios.get<FetchMoviesResults>(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          query: value,
        },
        headers: {
          Authorization: `Bearer ${key}`,
        },
      }
  )
    .then((response) => response.data.results)
    .catch((error) => error);
}