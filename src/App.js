import { useEffect, useState } from "react";
import StarRating from './StarRating'

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "eef23e42";

export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  const [selectedId,setSelectedId] = useState(null)
  const [error,setError] = useState("")

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

  useEffect(function(){
    async function fetchMovies(){
      try {setIsLoading(true)
        setError("")
      const res =await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`)

      if (!res.ok) throw new Error("Something went wrong with fetching movies")
      const data = await res.json()

      if (data.Response === 'False') throw new Error("Movie not found")
      setMovies(data.Search)
      setIsLoading(false)} catch(err){
        console.log(err.message)
        setError(err.message)
      }
      finally{
        setIsLoading(false)
      }
    }
    if(!query.length){
      setMovies([])
      setError("")
      return
    }
    fetchMovies()
  },[query]) //this 2nd argument (empty array) means that this component will render when the component first launch.
  
  return (
    <>
      <NavBar>
        
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies}/>
      </NavBar>
      <Main  >
        {/* <Box element={<MovieList movies={movies}/>}/>
        <Box element={<><WatchedSummary watched={watched} />
            <WatchedMoviesList watched={watched}/></>}/>   */}
            {/* ABOVE METHOD IS EXPLICIT PROP */}


            {/* AND BELOW WE ARE PASSING COMPONENTS IMPLECITLY */}
        <Box >
          {/* {isLoading ? <Loader /> :  <MovieList movies={movies}/>} */}
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
        {/* <WatchedBox/> */}
      </Main>
      </>
  );
}

function Loader(){
  return <p className="loader" >Loading...</p>
}

function ErrorMessage({message}){
  return <p className="error"><span>⛔️</span>{message}</p>
}

function NavBar({children}){

  return <nav className="nav-bar">
    <Logo/>
          {children}
      </nav>
}

function Search({query, setQuery}){

  return <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
}

function Logo(){
  return <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
}

function NumResults({movies}){
  return <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
}

function Main({children}){

  
 

  return <main className="main">
            {children}
          </main>
}

function Box({children}){
  const [isOpen, setIsOpen] = useState(true);
  

  return <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>
          {isOpen && (
            children
          )}
        </div>
}

function MovieList({movies, onSelectMovie}){

  
  return <ul className="list list-movies">
              {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
              ))}
            </ul>
}

function Movie({movie, onSelectMovie}){
  return <li onClick={()=>onSelectMovie(movie.imdbID)}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
}

// function WatchedBox(){
//  const [watched, setWatched] = useState(tempWatchedData);

//   const [isOpen2, setIsOpen2] = useState(true);

  

//   return <div className="box">
//           <button
//             className="btn-toggle"
//             onClick={() => setIsOpen2((open) => !open)}
//           >
//             {isOpen2 ? "–" : "+"}
//           </button>
//           {isOpen2 && (
//             <>
              
//             <WatchedSummary watched={watched} />
//               <WatchedMoviesList watched={watched}/>
//             </>
//           )}
//         </div>
// }


function MovieDetails({selectedId, onCloseMovie, onAddWatched, watched}){
  const [movie,setMovie] = useState({})
  const [isLoading,setIsLoading] = useState(false)
  const [userRating,setUserRating] = useState('')
  // const [isWatched,setIsWatched] = useState(false)

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId)
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating

  
  const {
    Title: title, 
    Year: year, 
    Poster:poster, 
    Runtime:runtime, 
    imdbRating, 
    Plot: plot, 
    Released:released, 
    Actors:actors, 
    Director: director, 
    Genre:genre} = movie

  function handleAdd(){
    // if (watched.map(movie.id => selectedId )){}
    const newWatchedMovie = {
      imdbID : selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split('').at(0),
      userRating
    }
    onAddWatched(newWatchedMovie)
    onCloseMovie();
  }

  useEffect(function(){
    async function getMovieDetails(){
      setIsLoading(true)
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
      const data = await res.json()
      console.log(data)
      setMovie(data)
      setIsLoading(false)
    }
    getMovieDetails()
  },[selectedId])


  useEffect(function(){
    if(!title) return;
    document.title = `${title}`
    return function(){
      document.title = "usePopcorn"
    }
  },[title])

  return <>
          {isLoading ?<Loader/> : <div className="details" >
                    <header>
                      <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
                      <img src={poster} alt={`Poster of ${movie} movie`}  />
                      <div className="details-overview" >
                        <h2>{title}</h2>
                        <p>
                          {released} &bull; {runtime}
                        </p>
                        <p>{genre}</p>
                        <p><span>⭐️</span>{imdbRating} IMDb Rating</p>
                      </div>
                    </header>
                    <section>
                      <div className="rating">
                        {
                        !isWatched ? 
                        <>
                        <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
                        {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to Watch List</button>} </> : <p>You rated this movie {watchedUserRating}{watchedUserRating >1 ? " ⭐️s" : " ⭐️" }</p>}
                      </div>
                      <p>
                        <em>{plot}</em>
                      </p>
                      <p>Starring {actors}</p>
                      <p>Directed by {director}</p>
                    </section>
                    
                    {selectedId}
            </div>}
    </>
}


function WatchedSummary({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(2)} min</span>
                  </p>
                </div>
              </div>
}
function WatchedMoviesList({watched, onDeleteWatched}){
  return <ul className="list">
                {watched.map((movie) => (
                  <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched}/>
                ))}
              </ul>
}

function WatchedMovie({movie, onDeleteWatched}){
  return <li >
                    <img src={movie.poster} alt={`${movie.title} poster`} />
                    <h3>{movie.title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
                      <button className="btn-delete" onClick={()=>onDeleteWatched(movie.imdbID)}>X</button>
                    </div>
                  </li>
}
