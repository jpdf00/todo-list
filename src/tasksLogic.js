const Task = (id, name, description, priority, project, dueDate, completed = false) => ({
  id, name, description, priority, project, dueDate, completed,
});

function addTaskToTasks(name, description, priority, project, dueDate) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  let id = JSON.parse(localStorage.getItem('taskCount'));
  const task = Task(id, name, description, priority, project, dueDate);
  id += 1;
  tasks.push(task);
  localStorage.setItem('taskCount', JSON.stringify(id));
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return task;
}

function toggleTaskCompletion(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const i = tasks.findIndex((item) => item.id === id);
  tasks[i].completed = !(tasks[i].completed);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks[i].completed;
}

function retrieveTask(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const i = tasks.findIndex((item) => item.id === id);
  return tasks[i];
}

function editTask(id, name, description, priority, project, dueDate) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const i = tasks.findIndex((item) => item.id === id);
  tasks[i].name = name;
  tasks[i].description = description;
  tasks[i].priority = priority;
  tasks[i].project = project;
  tasks[i].dueDate = dueDate;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks[i];
}

function editTaskByProject(projectOld, projectNew) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; ;) {
    i = tasks.findIndex((item) => item.project === projectOld);
    if (i === -1 || projectOld === projectNew) {
      break;
    }
    tasks[i].project = projectNew;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const i = tasks.findIndex((item) => item.id === id);
  tasks.splice(i, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks[i];
}

function deleteTaskByProject(project) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; ;) {
    i = tasks.findIndex((item) => item.project === project);
    if (i === -1) {
      break;
    }
    tasks.splice(i, 1);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export {
  addTaskToTasks,
  toggleTaskCompletion,
  retrieveTask,
  editTask,
  editTaskByProject,
  deleteTask,
  deleteTaskByProject,
};
