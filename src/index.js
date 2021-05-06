import populateStorage from './utilities.js';
import { saveNewProject, drawProjects } from './projectsHTML.js';
import refreshTaskListeners from './tasksEvents.js';
import {
  saveNewTask, drawTasks, saveEditedTask,
} from './tasksHTML.js';

// Populate localStorage on first use
populateStorage('projects');
populateStorage('tasks');
populateStorage('projectCount');
populateStorage('taskCount');
populateStorage('currentProject');

// Draw the page on load
drawTasks(); /* Task */
drawProjects(); /* Project */
refreshTaskListeners();

// Get the modal
const projectFormModal = document.querySelector('#projectFormModal'); /* Project */
const taskFormModal = document.querySelector('#taskFormModal'); /* Task */

// Get the button that opens the modal
const btnNewProject = document.querySelector('#btnNewProject'); /* Project */
const btnNewTask = document.querySelector('#btnNewTask'); /* Task */

// Get the button that closes the modal
const btnCloseProject = document.querySelector('#btnCloseProject'); /* Project */
const btnCloseTask = document.querySelector('#btnCloseTask'); /* Task */

// Get the button that saves the information
const saveProject = document.querySelector('#saveProject'); /* Project */
const saveTask = document.querySelector('#saveTask'); /* Task */

// Get the projects that to shows tasks by project
const projectsAll = document.querySelectorAll('.projectSort'); /* Task */

// Show project form
btnNewProject.addEventListener('click', () => {
  projectFormModal.removeAttribute('hidden');
  saveProject.setAttribute('value', 'new');
});

// Show task form
btnNewTask.addEventListener('click', () => {
  taskFormModal.removeAttribute('hidden');
  saveTask.setAttribute('value', 'new');
});

// Hide project form (for close button)
btnCloseProject.addEventListener('click', () => {
  projectFormModal.setAttribute('hidden', 'true');
  saveProject.value = '';
});

// Hide task form (for close button)
btnCloseTask.addEventListener('click', () => {
  taskFormModal.setAttribute('hidden', 'true');
  saveTask.value = '';
});

// Hide form (for background)
window.onclick = (event) => {
  // Project form
  if (event.target === projectFormModal) {
    projectFormModal.setAttribute('hidden', 'true');
    saveProject.value = '';
  }
  // Task Form
  if (event.target === taskFormModal) {
    taskFormModal.setAttribute('hidden', 'true');
    saveTask.value = '';
  }
};

// Save new project
saveProject.addEventListener('click', () => {
  saveNewProject();
  projectFormModal.setAttribute('hidden', 'true');
  saveProject.value = '';
});

// Save new task
saveTask.addEventListener('click', () => {
  if (saveTask.value === 'new') {
    saveNewTask();
    refreshTaskListeners();
  } else {
    saveEditedTask(parseInt(saveTask.value, 10));
  }
  taskFormModal.setAttribute('hidden', 'true');
  saveTask.value = '';
});

// Sort tasks by project
projectsAll.forEach((button) => {
  button.addEventListener('click', () => {
    const tasksContent = document.querySelector('#tasksContent').children;
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
        const taskProject = tasksContent[i].lastElementChild.firstElementChild.firstElementChild.lastElementChild;
        if (button.textContent === taskProject.textContent) {
          tasksContent[i].setAttribute('class', 'itemCard flexColumn');
        } else {
          tasksContent[i].setAttribute('class', 'itemCard displayNone');
        }
      }
      localStorage.setItem('currentProject', JSON.stringify(button.textContent));
    }
  });
});
