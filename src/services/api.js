import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_PROJECTS_API_URI,
});
const verifyUnauthorizedError = (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/'; // Esse comando dá um RELOAD na pagina
  }
  return Promise.reject(error);
};
api.interceptors.response.use((response) => response, verifyUnauthorizedError);
const setHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});
export const login = async (formData) => {
  const response = await api.post('/auth/login', formData);
  return response.data;
};
export const register = async (formData) => {
  const response = await api.post('/auth/register', formData);
  return response.data;
};

export const getTravels = async (searchTitle, token) => {
  const response = await api.get(
    `/travels?title=${searchTitle}`,
    setHeaders(token),
  );

  return response.data;
};

export const getOneTravel = async (travelId, token) => {
  const response = await api.get(`/travels/${travelId}`, setHeaders(token));

  return response.data;
};

export const createOneTravel = async (body, token) => {
  const response = await api.post('/travels', body, setHeaders(token));

  return response.data;
};

export const createOneDay = async (travelId, body, token) => {
  const response = await api.post(`/days/${travelId}`, body, setHeaders(token));

  return response.data;
};
