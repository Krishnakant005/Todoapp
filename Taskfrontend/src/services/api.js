// api.js

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/task";

export const getTasks = () => axios.get(API_BASE_URL);
export const getTaskById = (taskId) => axios.get(`${API_BASE_URL}/${taskId}`);
export const addTask = (task) => axios.post(API_BASE_URL, task);
export const updateTask = (taskId, task) =>
  axios.put(`${API_BASE_URL}/${taskId}`, task);
export const deleteTask = (taskId) => axios.delete(`${API_BASE_URL}/${taskId}`);
export const markComplet = (taskId) =>
  axios.put(`${API_BASE_URL}/markComplete/${taskId}`);