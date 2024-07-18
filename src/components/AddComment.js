import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function EditMovie({ movie, fetchData }) {
  const [comment, setComment] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);

    setComment("");
  };

  const addComment = (e, movie) => {
    e.preventDefault();

    fetch(`http://localhost:4000/movies/addComment/${movie}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        comment: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Comment Added successfully") {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Comment added successfully",
          });

          closeEdit();
          fetchData();
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
          });

          closeEdit();
          fetchData();
        }
      });
  };

  return (
    <>
      <Button
        className="mx-1"
        variant="primary"
        size="sm"
        onClick={() => openEdit()}
      >
        Add Comment
      </Button>

      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={(e) => addComment(e, movie)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => closeEdit()}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
