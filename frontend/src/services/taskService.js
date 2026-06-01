import API from "../api/axios";

export const getTasks = () => {
  return API.get("tasks/");
};

export const addTask = (task) => {
  return API.post("tasks/", task);
};

export const updateTask = (id, task) => {
  return API.put(`tasks/${id}/`, task);
};

export const deleteTask = (id) => {
  return API.delete(`tasks/${id}/`);
};