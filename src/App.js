import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./UserContext";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Movies from "./pages/Movies";
import MovieView from "./pages/MovieView";
import AdminView from "./components/AdminView";
import MovieUser from "./pages/MovieUser";
import "./App.css";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    fetch("https://movie-api-l372.onrender.com/users/details", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.user !== "undefined") {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/movielist" element={<MovieUser />} />

            <Route
              path="/movies/:movieId"
              exact="true"
              element={<MovieView />}
            />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
