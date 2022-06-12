import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";

const Movie = () => {
  let { id } = useParams();
  let [movie, setmovie] = useState({});

  useEffect(() => {
    Axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_KEY}&i=${id}&plot=full`
    )
      .then((r) => {
        setmovie(r.data);
        console.log(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="single_movie_container">
      <Link to="/"> BACK </Link>
      {!movie ? (
        <div className="noposter">
          <h3>NO POSTER FOUND!</h3>
        </div>
      ) : (
        <img src={movie.Poster} />
      )}

      <div className="single_movie_infos">
        <h2>
          {movie.Title} ({movie.Year})
        </h2>
        <p className="plot">Plot: {movie.Plot}</p> <br />
        <p className="actors">Actors: {movie.Actors}</p>
        <br />
        <p className="genre">Genre: {movie.Genre}</p>
        <br />
        <p className="awards">Awards: {movie.Awards}</p>
        <br />
        <p className="imdbratings">IMDB Ratings: {movie.imdbRating}</p>
      </div>
    </div>
  );
};

export default Movie;
