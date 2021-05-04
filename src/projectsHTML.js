import { addProjectToProjects } from './projectsLogic.js';

const ProjectHTML = (project) => {
  const projectItem = document.createElement('div');
  projectItem.setAttribute('class', 'itemCard flexContainer');
  projectItem.setAttribute('id', `project${project.id}`)

  const projectName = document.createElement('p');
  projectName.setAttribute('class', 'textFormat project');
  projectName.setAttribute('id', `project${project.id}`)
  projectName.textContent = project.name;

  const editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'editProject projectBtn fas fa-edit');
  editIcon.setAttribute('id', `editProject${project.id}`)

  const deleteIcon = document.createElement('i');
  deleteIcon.setAttribute('class', 'deleteProject projectBtn far fa-trash-alt');
  deleteIcon.setAttribute('id', `deleteProject${project.id}`)

  projectItem.appendChild(projectName);
  projectItem.appendChild(editIcon);
  projectItem.appendChild(deleteIcon);

  return projectItem;
};

function appendProjectToProjects(project) {
  const projectsContent = document.querySelector('#projectsContent');
  const projectItem = ProjectHTML(project);
  projectsContent.appendChild(projectItem);
}

function appendProjectToTaskSelect(name) {
  const taskProject = document.querySelector('#taskProject');
  const taskOption = document.createElement('option');
  taskOption.setAttribute('value', `${name}`);
  taskOption.textContent = name;
  taskProject.appendChild(taskOption);
}

function saveNewProject() {
  const projectName = document.querySelector('#projectName');
  const project = addProjectToProjects(projectName.value);
  appendProjectToProjects(project);
  appendProjectToTaskSelect(project.name)
  projectName.value = "";
}

function drawProjects() {
  const projects = JSON.parse(localStorage.getItem('projects'));
  for (let i = 0; i < projects.length; i += 1) {
    appendProjectToProjects(projects[i])
    appendProjectToTaskSelect(projects[i].name)
  }
}

export { saveNewProject, drawProjects };
