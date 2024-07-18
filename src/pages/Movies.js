import { useEffect, useState, useContext } from "react";
import { Table } from "react-bootstrap";
import UserView from "../components/UserView";
import AdminView from "../components/AdminView";
import AddComment from "../components/AddComment"; // Import AddComment component
import UserContext from "../UserContext";

export default function Movies() {
  const { user } = useContext(UserContext);

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

  if (user.id !== null) {
    return user.isAdmin ? <AdminView /> : <UserView />;
  }

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
                    <ol>
                      {movie.comments.map((comment) => (
                        <li key={comment._id}>{comment.comment}</li>
                      ))}
                    </ol>
                  ) : (
                    "No comments"
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
