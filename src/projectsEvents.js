import { removeProjectFromProjects, callEditFormProjects } from './projectsHTML.js';
// Sort tasks by project removeProjectFromProjects
function eventSortTaskByProject(e) {
  const button = e.target;
  const tasksContent = document.querySelector('#tasksContent').children;
  const projectsAll = document.querySelectorAll('.projectSort');
  if (button.parentElement.attributes[0].value === 'itemCardReversed flexContainer') {
    button.parentElement.attributes[0].value = 'itemCard flexContainer';
    for (let i = 0; i < tasksContent.length; i += 1) {
      tasksContent[i].setAttribute('class', 'itemCard flexColumn');
    }
    localStorage.setItem('currentProject', JSON.stringify(''));
  } else {
    button.parentElement.attributes[0].value = 'itemCardReversed flexContainer';
    projectsAll.forEach((item) => {
      if (item !== button) {
        item.parentElement.attributes[0].value = 'itemCard flexContainer';
      }
    });
    for (let i = 0; i < tasksContent.length; i += 1) {
      const taskProject = tasksContent[i]
        .lastElementChild
        .firstElementChild
        .firstElementChild
        .lastElementChild;
      if (button.textContent === taskProject.textContent) {
        tasksContent[i].setAttribute('class', 'itemCard flexColumn');
      } else {
        tasksContent[i].setAttribute('class', 'itemCard displayNone');
      }
    }
    localStorage.setItem('currentProject', JSON.stringify(button.textContent));
  }
}

function eventEditProject(e) {
  const button = e.target;
  const id = parseInt(button.id.match(/\d+/gm), 10);
  const projectFormModal = document.querySelector('#projectFormModal');
  const saveProject = document.querySelector('#saveProject');
  callEditFormProjects(id);
  projectFormModal.removeAttribute('hidden');
  saveProject.setAttribute('value', `${id}`);
}

// Delete task
function eventDeleteProject(e) {
  const button = e.target;
  const id = parseInt(button.id.match(/\d+/gm), 10);
  removeProjectFromProjects(id);
}

function refreshProjectsListener() {
  // Get the projects that to shows tasks by project
  const projectsAll = document.querySelectorAll('.projectSort');
  // Get the delete project buttons
  const deleteProjectAll = document.querySelectorAll('.deleteProject');
  // Get the edit project buttons
  const editProjectAll = document.querySelectorAll('.editProject');

  projectsAll.forEach((button) => {
    button.addEventListener('click', eventSortTaskByProject);
  });

  deleteProjectAll.forEach((button) => {
    button.addEventListener('click', eventDeleteProject);
  });

  editProjectAll.forEach((button) => {
    button.addEventListener('click', eventEditProject);
  });
}

export default refreshProjectsListener;
