import { useState, useEffect, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function AddMovie({ fetchData }) {
  const { user } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);

  const openM = () => {
    setShow(true);
  };

  const closeEdit = () => {
    setShow(false);

    setTitle("");
    setDirector("");
    setYear("");
    setDescription("");
    setGenre("");
  };

  function addMovie(e) {
    e.preventDefault();

    let token = localStorage.getItem("token");

    fetch(`https://movie-api-l372.onrender.com/movies/addMovie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        director: director,
        year: year,
        description: description,
        genre: genre,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.table(data);

        if (data.error === "Movie already exists") {
          Swal.fire({
            title: "Movie already exists",
            icon: "error",
          });
          setTitle("");
          setDirector("");
          setYear("");
          setDescription("");
          setGenre("");
        } else if (data.error === "Failed to save the movie") {
          Swal.fire({
            title: "Failed to save the movie",
            icon: "error",
            text: "Try again",
          });
          setTitle("");
          setDirector("");
          setYear("");
          setDescription("");
          setGenre("");

          closeEdit();
          fetchData();
        } else if (data !== null) {
          Swal.fire({
            title: "Movie Added",
            icon: "success",
          });

          closeEdit();
          fetchData();
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
          });

          closeEdit();
          fetchData();
        }
      });
    setTitle("");
    setDirector("");
    setYear("");
    setDescription("");
    setGenre("");
  }

  useEffect(() => {
    if (
      title !== "" &&
      director !== "" &&
      year !== "" &&
      description !== "" &&
      genre !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [title, director, year, description, genre]);
  return (
    <>
      <Button
        className="p-3 mb-2"
        variant="primary"
        size="sm"
        onClick={() => openM()}
      >
        Add Movie
      </Button>

      <Modal className="p-5" show={show} onHide={closeEdit}>
        <Form className="p-5" onSubmit={(e) => addMovie(e)}>
          <h1 className="text-center">Add Movie</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Genre"
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Director</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Director"
              value={director}
              onChange={(e) => {
                setDirector(e.target.value);
              }}
              required
            />
          </Form.Group>
          {isActive ? (
            <Button variant="primary" type="submit" className="my-3">
              Submit
            </Button>
          ) : (
            <Button variant="danger" type="submit" className="my-3" disabled>
              Submit
            </Button>
          )}
        </Form>
      </Modal>
    </>
  );
}
