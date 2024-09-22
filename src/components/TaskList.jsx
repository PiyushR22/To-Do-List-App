import React, { useState } from "react";
import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5); // Default tasks per page

  // Get the tasks for the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Calculate total pages
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Change number of tasks per page
  const handleTasksPerPageChange = (event) => {
    setTasksPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className="slds-table_container slds-p-around_medium">
      {/* Task List Table */}
      <table className="slds-table slds-table_cell-buffer slds-table_bordered slds-table_fixed-layout">
        <thead>
          <tr className="slds-text-title_caps">
            <th className="slds-text-title_caps">
              <input type="checkbox" />
            </th>
            <th className="slds-text-title_caps">Assigned To</th>
            <th className="slds-text-title_caps">Status</th>
            <th className="slds-text-title_caps">Due Date</th>
            <th className="slds-text-title_caps">Priority</th>
            <th className="slds-text-title_caps">Comments</th>
            <th className="slds-text-title_caps">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <div className="slds-dropdown-trigger slds-dropdown-trigger_click">
                  <button
                    className="slds-button slds-button_icon slds-button_icon-border-filled"
                    aria-haspopup="true"
                  >
                    <svg className="slds-button__icon" aria-hidden="true">
                      <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#down" />
                    </svg>
                    <span className="slds-assistive-text">Show More</span>
                  </button>
                  <div className="slds-dropdown slds-dropdown_left slds-dropdown_actions">
                    <ul className="slds-dropdown__list" role="menu">
                      <li className="slds-dropdown__item" role="presentation">
                        <a
                          href="#"
                          onClick={() => onEdit(task)}
                          role="menuitem"
                          tabIndex="-1"
                        >
                          <span className="slds-truncate" title="Edit">
                            Edit
                          </span>
                        </a>
                      </li>
                      <li className="slds-dropdown__item" role="presentation">
                        <a
                          href="#"
                          onClick={() => onDelete(index)}
                          role="menuitem"
                          tabIndex="-1"
                        >
                          <span className="slds-truncate" title="Delete">
                            Delete
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="slds-grid slds-grid_align-spread slds-m-top_medium">
        {/* Pagination Button Group */}
        <div className="slds-button-group">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`slds-button slds-button_neutral ${
                currentPage === index + 1 ? "slds-button_brand" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Tasks Per Page Selector */}
        <div className="slds-form-element">
          <label className="slds-form-element__label">Tasks per page:</label>
          <div className="slds-form-element__control">
            <select
              value={tasksPerPage}
              onChange={handleTasksPerPageChange}
              className="slds-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
