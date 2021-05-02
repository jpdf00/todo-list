const Project = (name) => ({ name });

function populateStorage(item){
  if (localStorage.getItem(`${item}`) === null){
    const arr = (item === 'projects') ? [Project('Default Project')]:[];
    localStorage.setItem(`${item}`, JSON.stringify(arr))
  }
}

function addProjectToProjects(name) {
  const projects = JSON.parse(localStorage.getItem('projects'))
  const project = Project(name);
  projects.push(project);
  localStorage.setItem('projects', JSON.stringify(projects));
  return project;
};

export { populateStorage, addProjectToProjects };
