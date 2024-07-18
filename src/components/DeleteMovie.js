import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function DeleteMovie({ movie, fetchData }) {
  const deleteMovie = (movieId) => {
    fetch(`https://movie-api-l372.onrender.com/movies/deleteMovie/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Movie deleted successfully") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Movie deleted successfully",
          });

          fetchData();
        } else {
          Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            text: "Please try again",
          });

          fetchData();
        }
      });
  };

  return (
    <>
      <Button
        className="mx-1"
        variant="danger"
        size="sm"
        onClick={() => deleteMovie(movie)}
      >
        Delete
      </Button>
    </>
  );
}
