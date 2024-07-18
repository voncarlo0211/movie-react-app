import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Row>
        <Col className="p-4 text-center">
          <h1>Welcome to our Movie App</h1>
          <p>Create, Update, Delete and View Our Movie App</p>
          <Link className="btn btn-primary" to={"/movies"}>
            Check Our Movies
          </Link>
        </Col>
      </Row>
    </>
  );
}
