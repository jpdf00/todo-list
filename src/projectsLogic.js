const Project = (id, name) => ({ id, name });

function addProjectToProjects(name) {
  const projects = JSON.parse(localStorage.getItem('projects'));
  let id = JSON.parse(localStorage.getItem('projectCount'));
  id += 1;
  const project = Project(id, name);
  projects.push(project);
  localStorage.setItem('projectCount', JSON.stringify(id));
  localStorage.setItem('projects', JSON.stringify(projects));
  return project;
}

function retrieveProject(id) {
  const projects = JSON.parse(localStorage.getItem('projects'));
  const i = projects.findIndex((item) => item.id === id);
  return projects[i];
}

function editProject(id, name) {
  const projects = JSON.parse(localStorage.getItem('projects'));
  const i = projects.findIndex((item) => item.id === id);
  const project = projects[i].name;
  projects[i].name = name;
  localStorage.setItem('projects', JSON.stringify(projects));
  return project;
}

function deleteProject(id) {
  const projects = JSON.parse(localStorage.getItem('projects'));
  const i = projects.findIndex((item) => item.id === id);
  const project = projects.splice(i, 1);
  localStorage.setItem('projects', JSON.stringify(projects));
  return project;
}

export {
  Project, addProjectToProjects, deleteProject, retrieveProject, editProject,
};
