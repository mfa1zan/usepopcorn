import { useState, useRef, useEffect } from "react";
import { KEY } from "../App";
import { useKey } from "../custom hooks/useKey";
import Loader from "./Loader";
import StarRating from "./StarRating";

export default function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');
  // const [isWatched,setIsWatched] = useState(false)
  const countRef = useRef(0);

  useEffect(function () {
    if (userRating) {
      countRef.current = countRef.current + 1;
    }
  }, [userRating]);

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;


  const {
    Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;

  function handleAdd() {
    // if (watched.map(movie.id => selectedId )){}
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ')[0]),
      userRating,
      countRatingDecisions: countRef.current
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  ////////
  useKey("Escape", onCloseMovie);

  useEffect(function () {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);


  useEffect(function () {
    if (!title) return;
    document.title = `${title}`;
    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);

  return <>
    {isLoading ? <Loader /> : <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
        <img src={poster} alt={`Poster of ${movie} movie`} />
        <div className="details-overview">
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
          {!isWatched ?
            <>
              <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
              {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to Watch List</button>} </> : <p>You rated this movie {watchedUserRating}{watchedUserRating > 1 ? " ⭐️s" : " ⭐️"}</p>}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>}
  </>;
}
