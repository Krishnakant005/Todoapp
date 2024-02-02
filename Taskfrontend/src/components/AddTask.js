import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTask } from "../services/api";

const AddTask = ({ onAddTask }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleAddTask = async () => {
    // Basic validation - you may add more validation as needed
    if (title.trim() === "") {
      alert("Please enter a title for the task.");
      return;
    }

    // Create a new task object
    const newTask = {
      title: title,
      description: description,
      due_date: dueDate,
      completed: completed,
    };

    try {
      // Use the addTask function from api.js to send the POST request
      await addTask(newTask);
      // Call the onAddTask function from the parent component if provided
      if (onAddTask) {
        onAddTask();
      }
      // Reset the form fields
      setTitle("");
      setDescription("");
      setDueDate("");
      setCompleted(false);

      // Navigate to the TaskList page after adding the task
      navigate("/");
    } catch (error) {
      console.error("Error adding task:", error);
      // Handle error as needed
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Due Date:
        <input
          type="text"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <label>
        Completed:
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted(!completed)}
        />
      </label>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
