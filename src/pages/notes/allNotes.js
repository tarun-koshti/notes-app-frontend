import React, { useState, useEffect } from "react";
import noteService from "../../services/NotesService";
import { Link } from "react-router-dom";
import "./allNotes.css"; // Import the CSS file

const AllNotes = ({ myNotes }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        if (myNotes) {
          const response = await noteService.getMyNotes();
          setNotes(response.data);
        } else {
          const response = await noteService.getAllNotes();
          setNotes(response.data);
        }
        setLoading(false);
        setErrorMessage(null);
      } catch (error) {
        setLoading(false);
        setErrorMessage(error?.response?.data?.message || error.message);
      }
    };

    fetchAllNotes();
  }, [myNotes]);

  const handleDelete = async (noteId) => {
    try {
      await noteService.deleteNoteById(noteId);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className="all-notes-container">
      <h2>All Notes</h2>
      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note._id} className="note-item">
            <Link to={`/notes/${note._id}`} className="note-title">
              {note.title}
            </Link>
            {myNotes && (
              <button
                onClick={() => handleDelete(note._id)}
                className="delete-button"
              >
                Delete
              </button>
            )}
            <br />
            <pre className="note-content">{note.content}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllNotes;
