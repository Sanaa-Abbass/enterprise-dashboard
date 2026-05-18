import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const fetchTasks = () => API.get("tasks/");
export const createTask = (task) => API.post("tasks/", task);
export const updateTaskApi = (id, task) =>
  API.put(`tasks/${id}/`, task);
export const deleteTaskApi = (id) =>
  API.delete(`tasks/${id}/`);