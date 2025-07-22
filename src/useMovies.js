import { useState,useEffect } from "react";
const KEY = "eef23e42";
export function useMovies(query,callback){
    
      const [movies, setMovies] = useState([]);
      const [isLoading,setIsLoading] = useState(false)
      const [error,setError] = useState("")

    useEffect(function(){
    const controller = new AbortController()

    async function fetchMovies(){
      try {setIsLoading(true)
        setError("")
      const res =await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal})

      if (!res.ok) throw new Error("Something went wrong with fetching movies")
      const data = await res.json()

      if (data.Response === 'False') throw new Error("Movie not found")
      setMovies(data.Search)
      setIsLoading(false)
      setError("")
    } 
      catch(err){
        if(err.message !== "AbortError"){
          setError(err.message)
        }
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
    // handleCloseMovie()
    callback?.()
    fetchMovies()

    return function(){
      controller.abort()
    }
  },[query]) //this 2nd argument (empty array) means that this component will render when the component first launch.
  return {movies, isLoading, error}
}