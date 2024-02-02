// TaskList.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTasks, deleteTask, markComplet } from "../services/api";
import {
  IoIosAdd,
  IoMdCheckmarkCircleOutline,
  IoMdCheckmarkCircle,
} from "react-icons/io";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState(""); // State for sorting criteria
  const [filterCompleted, setFilterCompleted] = useState(false); // State for completion filter

  useEffect(() => {
    fetchTasks();
  }, [sortBy, filterCompleted]);

  const fetchTasks = async () => {
    try {
      let response = await getTasks();

      // Apply sorting based on sortBy criteria
      if (sortBy === "due_date") {
        response.data.sort((a, b) => (a.due_date > b.due_date ? 1 : -1));
      }

      // Apply completion filter if set
      if (filterCompleted) {
        response.data = response.data.filter((task) => task.completed);
      }

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handleToggleCompleted = async (taskId, completed) => {
    try {
      // Toggle the completed status
      await markComplet(taskId);
      await fetchTasks();
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handleSortBy = (criteria) => {
    setSortBy(criteria);
  };

  const handleFilterCompleted = () => {
    setFilterCompleted(!filterCompleted);
  };

  return (
    <div>
      <h1>Task List</h1>
      <div>
        <button onClick={() => handleSortBy("due_date")}>
          Sort by Due Date
        </button>
        <button onClick={handleFilterCompleted}>
          {filterCompleted ? "Show All" : "Show Completed"}
        </button>
      </div>
      <Link to="/add/task" style={{ fontSize: "50px" }}>
        {" "}
        {/* Adjust the font size as needed */}
        <IoIosAdd>Add Task</IoIosAdd>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(
            (task) =>
              task && (
                <tr key={task.id}>
                  <td>
                    <Link to={`/task/${task.id}`}>{task.title}</Link>
                  </td>
                  <td>{task.due_date}</td>
                  <td>
                    {task.completed ? (
                      <IoMdCheckmarkCircle
                        style={{ fontSize: "50px" }} // Adjust the font size as needed
                        onClick={() =>
                          handleToggleCompleted(task.id, task.completed)
                        }
                      >
                        Mark Incomplete
                      </IoMdCheckmarkCircle>
                    ) : (
                      <IoMdCheckmarkCircleOutline
                        style={{ fontSize: "50px" }} // Adjust the font size as needed
                        onClick={() =>
                          handleToggleCompleted(task.id, task.completed)
                        }
                      >
                        Mark Complete
                      </IoMdCheckmarkCircleOutline>
                    )}
                  </td>
                  <td>
                    <Link to={`/edit/${task.id}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
