import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import './App.module.css'
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";


export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (data: string) => {
    setMovies([]);
    setHasError(false);
    setIsLoading(true);

    try {
      const resultArr = await fetchMovies(data);
      if (resultArr.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(resultArr);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <Toaster position="top-center" />

      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {hasError && <ErrorMessage />}

      {!isLoading && !hasError && <MovieGrid movies={movies} onSelect={handleSelect} />}
      
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)}/>}
    </>
  )
}


