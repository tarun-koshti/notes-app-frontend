import React, { useState, useEffect } from "react";
import noteService from "../../services/NotesService";
import { Link, useParams, useNavigate } from "react-router-dom";
import userService from "../../services/userService";

const GetNoteById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchNoteById = async () => {
      try {
        const response = await noteService.getNoteById(id);
        setNote(response.data);
        (async () => {
          try {
            const user = await userService.getMyProfile();
            if (note.userId === user.data._id || user.data.role === "admin") {
              setIsAllowed(true);
            } else {
              setIsAllowed(false);
            }
          } catch (error) {
            setIsAllowed(false);
          }
        })();
        setLoading(false);
        setErrorMessage(null);
      } catch (error) {
        setLoading(false);
        setErrorMessage(error?.response?.data?.message || error.message);
      }
    };

    fetchNoteById();
  }, [id]);

  const handleDelete = async () => {
    try {
      await noteService.deleteNoteById(id);
      navigate("/", { replace: true }); // Redirect to the home page after deletion
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
    <div>
      <h2>Note Details</h2>
      <div>
        {isAllowed && (
          <>
            <Link to={`/notes/${id}/edit`}>Edit</Link>
            <br />
            <button onClick={handleDelete} className="delete-button">
              Delete
            </button>
            <br />
          </>
        )}
        <strong>{note.title}</strong>
        <br />
        <pre>{note.content}</pre>
      </div>
    </div>
  );
};

export default GetNoteById;
