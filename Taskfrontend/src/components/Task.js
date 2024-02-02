// Task.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTaskById } from "../services/api";
import "../App.css"

const Task = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    try {
      const response = await getTaskById(taskId);
      setTask(response.data);
    } catch (error) {
      console.error("Error fetching task: ", error);
    }
  };

  if (!task) {
    return <div className="Loader"></div>; // Show a loading spinner
  }

  return (
    <div className="Task">
      <h1>Task Details</h1>
      <div className="TaskDetails">
        <strong>Title:</strong> {task.title}
        <br />
        <strong>Description:</strong> {task.description}
        <br />
        <strong>Due Date:</strong> {task.due_date}
        <br />
        <strong>Completed:</strong> {task.completed ? "Yes" : "No"}
      </div>
    </div>
  );
};

export default Task;
