import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);

  window.addEventListener("beforeunload", () =>
    localStorage.removeItem("searchinput")
  );

  useEffect(() => {
    let searchistory = localStorage.getItem("searchinput");
    console.log(searchistory);

    if (searchistory) {
      Axios.get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${searchistory}`
      )
        .then(function (response) {
          setMovies(response.data.Search);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  let navigate = useNavigate();
  let search = (e) => {
    e.preventDefault();

    if (!e.target.searchinput.value.trim()) {
      e.target.searchinput.value = "";
      return;
    }

    localStorage.setItem("searchinput", e.target.searchinput.value);

    Axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&s=${e.target.searchinput.value}`
    )
      .then(function (response) {
        setMovies(response.data.Search);
      })
      .catch(function (error) {
        console.log(error);
      });

    e.target.searchinput.value = "";
  };

  return (
    <>
      <form className="searchform" onSubmit={search}>
        <input
          type="text"
          placeholder="Type Movie Name"
          className="searchinput"
          name="searchinput"
          required
        />
        <button type="submit" className="searchbtn">
          Search
        </button>
      </form>

      {movies ? (
        <div className="movies_container">
          {movies?.map((movie) => {
            return (
              <div
                className="movies_lists"
                key={movie.imdbID}
                onClick={() => {
                  navigate(`/movie/${movie.imdbID}`);
                }}
              >
                {movie.Poster == "N/A" ? (
                  <div className="noposter">
                    <h3>NO POSTER FOUND!</h3>
                  </div>
                ) : (
                  <img src={movie.Poster} />
                )}

                <div className="movies_lists_infos">
                  <h3>{movie.Title}</h3>
                  <span>Released Year: {movie.Year}</span>
                  &nbsp;&nbsp;/&nbsp;&nbsp;
                  <span>Type: {movie.Type}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="nomovies">NO MOVIES FOUND</div>
      )}
    </>
  );
}

export default App;
