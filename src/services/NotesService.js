import axios from "axios";
import authenticationService from "./authenticationService";

const baseUrl = "http://127.0.0.1:5000";

const setToken = () => {
  const token = authenticationService.getToken();
  if (!token) {
    throw new Error("No Token Found.");
  }

  const headers = {
    authorization: `Bearer ${token}`,
  };
  return headers;
};

const noteService = {
  createNote: async (payload) => {
    try {
      const headers = setToken();
      const result = await axios.post(`${baseUrl}/api/users/notes`, payload, {
        headers,
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  getNoteById: async (noteId) => {
    try {
      const headers = setToken();
      const result = await axios.get(`${baseUrl}/api/users/notes/${noteId}`, {
        headers,
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  deleteNoteById: async (noteId) => {
    try {
      const headers = setToken();
      const result = await axios.delete(
        `${baseUrl}/api/users/notes/${noteId}`,
        { headers }
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  updateNote: async (payload, noteId) => {
    try {
      const headers = setToken();
      const result = await axios.patch(
        `${baseUrl}/api/users/notes/${noteId}`,
        payload,
        { headers }
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  getAllNotes: async () => {
    try {
      const headers = setToken();
      const result = await axios.get(`${baseUrl}/api/users/notes`, { headers });
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  getMyNotes: async () => {
    try {
      const headers = setToken();
      const result = await axios.get(`${baseUrl}/api/users/me/notes`, {
        headers,
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};

export default noteService;
