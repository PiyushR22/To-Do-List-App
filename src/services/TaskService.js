export const getTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks;
};

export const addTask = (task) => {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const updateTask = (index, updatedTask) => {
  const tasks = getTasks();
  tasks[index] = updatedTask;
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const deleteTask = (index) => {
  const tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
