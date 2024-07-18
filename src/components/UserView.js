import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import AddComment from "./AddComment";
import { Link } from "react-router-dom";

export default function UserView() {
  const [movies, setMovies] = useState([]);

  const fetchData = () => {
    fetch(`https://movie-api-l372.onrender.com/movies/getMovies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.table(data);
        if (Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else {
          setMovies([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setMovies([]);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center my-4">Movies</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Title</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Year</th>
            <th>Director</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(movies) &&
            movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td>{movie.genre}</td>
                <td>{movie.year}</td>
                <td>{movie.director}</td>
                <td>
                  {movie.comments && movie.comments.length > 0 ? (
                    <ul>
                      {movie.comments.map((comment) => (
                        <li key={comment._id}>{comment.comment}</li>
                      ))}
                    </ul>
                  ) : (
                    "No comments"
                  )}
                </td>
                <td>
                  <AddComment movie={movie._id} fetchData={fetchData} />
                  <Link to={`/movies/${movie._id}`}>View Movie</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
