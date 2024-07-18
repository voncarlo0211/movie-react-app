import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";

export default function MovieView() {
  const { movieId } = useParams();
  const { user } = useContext(UserContext);

  const [movie, setMovie] = useState({
    title: "",
    director: "",
    year: "",
    description: "",
    genre: "",
    comments: [],
  });

  useEffect(() => {
    fetch(`http://localhost:4000/movies/getMovie/${movieId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.table(data);
        setMovie(data.movie); // Assuming movie is an array with one object
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
      });
  }, [movieId]);

  return (
    <Container>
      <Row className="justify-content-center text-center mt-5">
        <Col md={6}>
          <Card className="m-5" border="dark">
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Subtitle className="mb-2">Description:</Card.Subtitle>
              <Card.Text>{movie.description}</Card.Text>
              <Card.Subtitle className="mb-2">Genre:</Card.Subtitle>
              <Card.Text>{movie.genre}</Card.Text>
              <Card.Subtitle className="mb-2">Year:</Card.Subtitle>
              <Card.Text>{movie.year}</Card.Text>
              <Card.Subtitle className="mb-2">Director:</Card.Subtitle>
              <Card.Text>{movie.director}</Card.Text>
              <Card.Subtitle className="mb-2">Comments:</Card.Subtitle>
              {movie.comments && movie.comments.length > 0 ? (
                <ul>
                  {movie.comments.map((comment) => (
                    <li key={comment._id}>{comment.comment}</li>
                  ))}
                </ul>
              ) : (
                <Card.Text>No comments</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
