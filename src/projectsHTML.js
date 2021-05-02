import { addProjectToProjects } from './projectsLogic.js';

const ProjectHTML = (project) => {
  console.log(project.name);
  const projectItem = document.createElement('div');
  projectItem.setAttribute('class', 'projectItem flexContainer');

  const projectName = document.createElement('span');
  projectName.setAttribute('class', 'projectBtn');
  projectName.textContent = project.name;

  const editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fas fa-edit');

  const deleteIcon = document.createElement('i');
  deleteIcon.setAttribute('class', 'far fa-trash-alt');

  const editProject = document.createElement('span');
  editProject.setAttribute('class', 'editProject projectBtn');
  editProject.appendChild(editIcon);

  const deleteProject = document.createElement('span');
  deleteProject.setAttribute('class', 'deleteProject projectBtn');
  deleteProject.appendChild(deleteIcon);

  projectItem.appendChild(projectName);
  projectItem.appendChild(editProject);
  projectItem.appendChild(deleteProject);

  return projectItem;
};

function appendProjectToProjects(project) {
  const projectsContent = document.querySelector('#projectsContent');
  const projectItem = ProjectHTML(project);
  projectsContent.appendChild(projectItem);
}

function saveNewProject() {
  const projectName = document.querySelector('#projectName');
  const project = addProjectToProjects(projectName.value);
  appendProjectToProjects(project);
  projectName.value = "";
}

function drawProjects() {
  const projects = JSON.parse(localStorage.getItem('projects'));
  for (let i = 0; i < projects.length; i += 1) {
    appendProjectToProjects(projects[i])
  }
}

export { saveNewProject, drawProjects };
