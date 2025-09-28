const RAW = import.meta.env.VITE_API_BASE_URL;
export const BASE_URL =
  RAW === undefined
    ? "http://localhost:8000"  // Local development
    : RAW === ""
      ? ""                    // Empty string = same origin (production)
      : RAW.replace(/\/$/, "");

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", //Signup
    LOGIN: "/api/auth/login", //Authentication user & return JWT token
    GET_PEOPLE: "/api/auth/profile", //Get logged-in user details
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", //Upload user profile image
  },

  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions", //Generate interview questions based on job title
    GENERATE_EXPLANATION: "/api/ai/generate-explanation", //Generate explanation using Gemini
  },

  SESSION: {
    CREATE: "/api/sessions/create", //Create a new interview session
    GET_ALL: "/api/sessions/my-sessions", //Get all interview sessions of logged-in user
    GET_ONE: (id) => `/api/sessions/${id}`, //Get details of a specific interview session
    DELETE: (id) => `/api/sessions/${id}`, //Delete a specific interview session
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add", //Add a question to an interview session
    PIN: (id) => `/api/questions/${id}/pin`, //Pin a question
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`, //Update note for a question
  },
};
