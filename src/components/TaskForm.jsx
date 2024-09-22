import React, { useState, useEffect } from "react";
import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css";

const TaskForm = ({ isOpen, onClose, onSave, editIndex, tasks }) => {
  const [formData, setFormData] = useState({
    assignedTo: "",
    status: "",
    dueDate: "",
    priority: "",
    description: "",
  });

  useEffect(() => {
    if (editIndex !== null && tasks) {
      const taskToEdit = tasks[editIndex];
      setFormData(taskToEdit);
    } else {
      setFormData({
        assignedTo: "",
        status: "",
        dueDate: "",
        priority: "",
        description: "",
      });
    }
  }, [editIndex, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="slds-modal slds-fade-in-open">
      <div className="slds-modal__container">
        <div className="slds-modal__header">
          <h2 className="slds-text-heading_medium">Create/Edit Task</h2>
        </div>
        <div className="slds-modal__content slds-p-around_medium">
          <form onSubmit={handleSubmit} className="slds-form slds-form_stacked">
            {fields.map((field) => (
              <div key={field.name} className="slds-form-element">
                <label className="slds-form-element__label">
                  {field.label}:
                </label>
                <div className="slds-form-element__control">
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="slds-select"
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="slds-textarea"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      className="slds-input"
                    />
                  )}
                </div>
              </div>
            ))}
            <div className="slds-modal__footer">
              <button type="submit" className="slds-button slds-button_brand">
                Save
              </button>
              <button
                type="button"
                className="slds-button slds-button_neutral"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const fields = [
  { name: "assignedTo", label: "Assigned To", type: "text" },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "", label: "Select Status" },
      { value: "Completed", label: "Completed" },
      { value: "In Progress", label: "In Progress" },
      { value: "Not Started", label: "Not Started" },
    ],
  },
  { name: "dueDate", label: "Due Date", type: "date" },
  {
    name: "priority",
    label: "Priority",
    type: "select",
    options: [
      { value: "", label: "Select Priority" },
      { value: "High", label: "High" },
      { value: "Medium", label: "Medium" },
      { value: "Low", label: "Low" },
    ],
  },
  { name: "description", label: "Description", type: "textarea" },
];

export default TaskForm;
