import {
  addProjectToProjects, deleteProject, retrieveProject, editProject,
} from './projectsLogic.js';
import { editTaskByProject, deleteTaskByProject } from './tasksLogic.js';
import { changeTaskByProject, removeTaskByProject } from './tasksHTML.js';

const ProjectHTML = (project) => {
  const currentProject = JSON.parse(localStorage.getItem('currentProject'));

  const projectItemClass = (project.name === currentProject) ? 'itemCardReversed flexContainer' : 'itemCard flexContainer';

  const projectItem = document.createElement('div');
  projectItem.setAttribute('class', `${projectItemClass}`);
  projectItem.setAttribute('id', `project${project.id}`);

  const projectName = document.createElement('p');
  projectName.setAttribute('class', 'project projectSort');
  projectName.setAttribute('id', `projectName${project.id}`);
  projectName.textContent = project.name;

  const editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'editProject projectBtn fas fa-edit');
  editIcon.setAttribute('id', `editProject${project.id}`);

  const deleteIcon = document.createElement('i');
  deleteIcon.setAttribute('class', 'deleteProject projectBtn far fa-trash-alt');
  deleteIcon.setAttribute('id', `deleteProject${project.id}`);

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
  appendProjectToTaskSelect(project.name);
  projectName.value = '';
}

function callEditFormProjects(id) {
  const projectName = document.querySelector('#projectName');
  const project = retrieveProject(id);
  projectName.value = project.name;
}

function changeProjectInTaskSelect(projectOld, projectNew) {
  const taskProject = document.querySelector('#taskProject').children;
  for (let i = 0; i < taskProject.length; i += 1) {
    const taskOption = taskProject[i];
    if (projectOld === taskOption.value) {
      taskOption.textContent = projectNew;
      taskOption.value = projectNew;
    }
  }
}

function saveEditedProject(id) {
  const projectName = document.querySelector('#projectName');
  const projectNameId = document.querySelector(`#projectName${id}`);
  const project = editProject(id, projectName.value);
  editTaskByProject(project, projectName.value);
  changeTaskByProject(project, projectName.value);
  changeProjectInTaskSelect(project, projectName.value);
  projectNameId.textContent = projectName.value;
  projectName.value = '';
}

function removeProjectFromProjects(id) {
  const projectItem = document.querySelector(`#project${id}`);
  const project = deleteProject(id);
  console.log(project);
  deleteTaskByProject(project[0].name);
  removeTaskByProject(project[0].name);
  projectItem.parentElement.removeChild(projectItem);
}

function drawProjects() {
  const projects = JSON.parse(localStorage.getItem('projects'));
  for (let i = 0; i < projects.length; i += 1) {
    appendProjectToProjects(projects[i]);
    appendProjectToTaskSelect(projects[i].name);
  }
}

export {
  saveNewProject, drawProjects, removeProjectFromProjects, callEditFormProjects, saveEditedProject,
};
