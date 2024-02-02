// EditTask.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask } from "../services/api";

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
    completed: false,
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(taskId);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task: ", error);
      }
    };

    fetchTask();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  const handleUpdateTask = async () => {
      try {
          console.log(task);
      await updateTask(taskId, task);
      console.log("Task updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handleInputChange = (e, field) => {
    setTask((prevTask) => ({ ...prevTask, [field]: e.target.value }));
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <label>
        Title:
        <input
          type="text"
          value={task.title}
          onChange={(e) => handleInputChange(e, "title")}
        />
      </label>
      <label>
        Description:
        <textarea
          value={task.description}
          onChange={(e) => handleInputChange(e, "description")}
        />
      </label>
      <label>
        Due Date:
        <input
          type="text"
          value={task.due_date}
          onChange={(e) => handleInputChange(e, "due_date")}
        />
      </label>
      <label>
        Completed:
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() =>
            setTask((prevTask) => ({
              ...prevTask,
              completed: !prevTask.completed,
            }))
          }
        />
      </label>
      <button onClick={handleUpdateTask}>Update Task</button>
    </div>
  );
};

export default EditTask;