import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./services/TaskService";
import "./index.css";
import Header from "./components/Header";

function App() {
  const [tasks, setTasks] = useState(getTasks());
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const handleAddTask = (task) => {
    addTask(task);
    setTasks(getTasks());
  };

  const handleEditTask = (index) => {
    setCurrentTaskIndex(index);
    setIsEditing(true);
  };

  const handleUpdateTask = (updatedTask) => {
    updateTask(currentTaskIndex, updatedTask);
    setTasks(getTasks());
    setIsEditing(false);
  };

  const handleDeleteTask = (index) => {
    deleteTask(index);
    setTasks(getTasks());
  };

  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
