const Task = (id, name, description, priority, project, dueDate, completed = false) => ({
  id, name, description, priority, project, dueDate, completed,
});

function addTaskToTasks(name, description, priority, project, dueDate) {
  const tasks = JSON.parse(localStorage.getItem('tasks'))
  let id = JSON.parse(localStorage.getItem('taskCount'))
  const task = Task(id, name, description, priority, project, dueDate);
  id += 1;
  tasks.push(task);
  localStorage.setItem('taskCount', JSON.stringify(id));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return task;
};

function toggleTaskCompletion(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks'))
  const i = tasks.findIndex((item) => {
    return item.id === id
  })
  tasks[i].completed = (tasks[i].completed) ? false:true;
  localStorage.setItem('tasks', JSON.stringify(tasks))
  return tasks[i].completed;
}

export { addTaskToTasks, toggleTaskCompletion };
