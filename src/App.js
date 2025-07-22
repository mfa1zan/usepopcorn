import { useState } from "react";
import { useMovies } from "./custom hooks/useMovies";
import { useLocalStorageState } from "./custom hooks/useLocalStorageState";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";
import WatchedMoviesList from "./components/WatchedMoviesList";
import WatchedSummary from "./components/WatchedSummary";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import Main from "./components/Main";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "eef23e42";

export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [selectedId,setSelectedId] = useState(null)
  const {movies, isLoading, error} =  useMovies(query,handleCloseMovie)
  const [watched,setWatched] = useLocalStorageState([],'watched')

  function handleSelectMovie(id){
    setSelectedId(selectedId => selectedId === id ? null : id)
  }

  function handleCloseMovie(){
    setSelectedId(null)
  }

  function handleAddWatched(movie){
    setWatched(watched=>[...watched,movie])
  }

  function handleDeleteWatched(id){
    setWatched(movie=>movie.filter(movie => movie.imdbID !== id))

  }

  return (
    <>
      <NavBar>
        
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies}/>
      </NavBar>
      <Main  >
        <Box >
          {isLoading && <Loader/>}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
          {error && <ErrorMessage message={error}/> }
        </Box>
        <Box>
         {selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} watched={watched}/> :  <>
            <WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched}/>
          </>}
        </Box>
      </Main>
      </>
  );
}
