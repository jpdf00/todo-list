const Task = (id, name, description, priority, project, dueDate, completed = false) => ({
  name, description, priority, project, dueDate, completed,
});

function addTaskToTasks(name, description, priority, project, dueDate) {
  const tasks = JSON.parse(localStorage.getItem('tasks'))
  let id = JSON.parse(localStorage.getItem('taskCount'))
  const task = Project(id, name, description, priority, project, dueDate);
  id += 1;
  tasks.push(project);
  localStorage.setItem('taskCount', JSON.stringify(id));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return task;
};

export { addTaskToTasks };
