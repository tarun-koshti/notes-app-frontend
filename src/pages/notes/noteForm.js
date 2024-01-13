import React, { useState, useEffect } from "react";
import noteService from "../../services/NotesService";
import "./noteForm.css"; // Import the CSS file
import { useNavigate, useParams } from "react-router-dom";

const NoteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false); // New state for the checkbox
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the note details for editing
      (async () => {
        try {
          const response = await noteService.getNoteById(id);
          const { title, content, isPublic } = response.data;
          setTitle(title);
          setContent(content);
          setIsPublic(isPublic);
          setErrorMessage(null);
        } catch (error) {
          setErrorMessage(error?.response?.data?.message || error.message);
        }
      })();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    try {
      const noteData = { title, content, isPublic };

      if (id) {
        // Update existing note
        const response = await noteService.updateNote(noteData, id);
        navigate(`/notes/${response.data._id}`, { replace: true });
      } else {
        // Create a new note
        const response = await noteService.createNote(noteData);
        navigate(`/notes/${response.data._id}`, { replace: true });
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="note-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <label>
          Is Public:
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </label>
        <br />
        <button type="submit">{id ? "Update Note" : "Create Note"}</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default NoteForm;
