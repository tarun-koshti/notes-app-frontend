import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
// import Home from "./pages/home";
import Signup from "./pages/authentication/signup";
import Login from "./pages/authentication/login";
import PrivateRoute from "./privateRoute";
import UserProfile from "./pages/users/user-profile";
import NoteForm from "./pages/notes/noteForm";
import AllNotes from "./pages/notes/allNotes";
import GetNoteById from "./pages/notes/getNoteById";

function Navigation({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    onLogout();
    navigate("/login");
  }

  return (
    <nav>
      <span>
        <Link to="/">Home</Link>
      </span>
      {isAuthenticated ? (
        <ul>
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
          <li>
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      )}
      {isAuthenticated && (
        <span>
          <hr />
          <ul>
            <li>
              <Link to="/createNote">Add Note</Link>
            </li>
            <li>
              <Link to="/myNotes">My Notes</Link>
            </li>
          </ul>
        </span>
      )}
    </nav>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleLogin() {
    setIsAuthenticated(true);
  }

  function handleLogout() {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  }
  // Check if the user is logged in or not.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      handleLogin();
    }
  }, []);

  return (
    <Router>
      <header>
        <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      </header>
      <main className="App">
        <Routes>
          <Route index element={<AllNotes />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {/* Protected Routes Will Come Here. */}
          <Route
            path="/profile"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/createNote"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <NoteForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/notes/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <GetNoteById />
              </PrivateRoute>
            }
          />
          <Route
            path="/notes/:id/edit"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <NoteForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/myNotes"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AllNotes myNotes={true} />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
