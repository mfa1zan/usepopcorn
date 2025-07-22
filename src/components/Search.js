import { useRef } from "react";
import { useKey } from "../custom hooks/useKey";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current)
      return;
    inputEl.current.focus();
    setQuery("");

  });

  // useEffect(
  //   function(){
  //     const el = document.querySelector(".search")
  //     console.log(el)
  //     el.focus();
  //   },[]
  // )
  return <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    ref={inputEl} />;
}
