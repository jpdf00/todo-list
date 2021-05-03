const Task = (name, description, priority, project, dueDate, completed) => ({
  name, description, priority, project, dueDate, completed,
});

function addTaskToTasks(name) {
  const projects = JSON.parse(localStorage.getItem('projects'))
  let id = JSON.parse(localStorage.getItem('projectCount'))
  id += 1;
  const project = Project(id, name);
  projects.push(project);
  localStorage.setItem('projectCount', JSON.stringify(id));
  localStorage.setItem('projects', JSON.stringify(projects));
  return project;
};
