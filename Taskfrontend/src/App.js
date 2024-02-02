import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/:taskId" element={<Task />} />
        <Route path="/add/task" element={<AddTask />} />
        <Route path="/edit/:taskId" element={<EditTask/>}/>
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
