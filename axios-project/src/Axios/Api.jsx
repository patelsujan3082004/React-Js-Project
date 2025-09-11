import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// ✅ GET all albums
export const getAlbums = () => {
  return api.get("/albums");
};

// ✅ DELETE an album
export const deleteAlbum = (id) => {
  return api.delete(`/albums/${id}`);
};

// ✅ ADD (create) a new album
export const addAlbum = (data) => {
  return api.post("/albums", data);
};

// ✅ UPDATE an album
export const updateAlbum = (id, data) => {
  return api.put(`/albums/${id}`, data);
};

export default api;
