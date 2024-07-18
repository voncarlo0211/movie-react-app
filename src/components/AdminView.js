import { useEffect, useState, useContext } from "react";
import { Table } from "react-bootstrap";
import AddMovie from "../components/AddMovie";
import EditMovie from "../components/EditMovie";
import DeleteMovie from "../components/DeleteMovie";
import { CardGroup } from "react-bootstrap";

export default function AdminView() {
  const [movies, setMovies] = useState([]);

  const fetchData = () => {
    fetch(`https://movie-api-l372.onrender.com/movies/getMovies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.table(data.movies);
        if (typeof data.message !== "string") {
          setMovies(data.movies);
        } else {
          setMovies([]);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center my-4">Movies</h1>
      <AddMovie fetchData={fetchData} />
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
          {movies.map((movie) => (
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
              <td className="text-center">
                <EditMovie movie={movie._id} fetchData={fetchData} />
                <DeleteMovie movie={movie._id} fetchData={fetchData} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
