import React, { useState } from "react";
import TaskForm from "./TaskForm"; // Import TaskForm
import TaskList from "./TaskList"; // Import TaskList
import assets from "../assets/index";
import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css";

const Header = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleNewTask = () => {
    setEditIndex(null); // Reset edit index for new task
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleSaveTask = (task) => {
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task; // Update existing task
      setTasks(updatedTasks);
    } else {
      setTasks((prevTasks) => [...prevTasks, task]); // Add new task
    }
    handleCloseForm();
    setFilteredTasks(tasks); // Reset filtered tasks
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const taskToEdit = tasks[index];
    setFormOpen(true);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks); // Update filtered tasks
  };

  const handleRefresh = () => {
    setFilteredTasks(tasks); // Reset filtered tasks to show all
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = tasks.filter((task) =>
      task.assignedTo.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  return (
    <>
      <header
        className="slds-grid slds-grid_align-spread slds-p-around_medium slds-box slds-box_xx-small"
        style={{ width: "100%" }}
      >
        <div className="slds-col slds-align-middle">
          <img
            src={assets.tlogo}
            alt="Logo"
            className="slds-avatar slds-avatar_medium"
          />
        </div>
        <h1
          className="slds-text-heading_medium slds-col slds-text-align_center"
          style={{ flex: "1", textAlign: "center" }}
        >
          Tasks
        </h1>
        <div className="slds-col slds-grid slds-grid_align-end"></div>
      </header>

      {/* New and Refresh Buttons */}
      <div className="slds-grid slds-grid_align-spread slds-p-around_medium">
        <div>
          <button
            className="slds-button slds-button_brand"
            onClick={handleNewTask}
          >
            New Task
          </button>
          <button
            className="slds-button slds-button_success slds-m-left_small"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="slds-grid slds-grid_align-spread slds-p-around_medium">
        <input
          type="text"
          className="slds-input"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: "100%" }}
        />
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveTask}
        editIndex={editIndex}
        tasks={tasks}
      />
      <TaskList
        tasks={filteredTasks.length > 0 ? filteredTasks : tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Header;
