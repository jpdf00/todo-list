import populateStorage from './utilities.js';
import { saveNewProject, drawProjects } from './projectsHTML.js';
import refreshTaskListeners from './tasksEvents.js';
import refreshProjectsListener from './projectsEvents.js';
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

// Add event listeners
refreshTaskListeners(); /* Task */
refreshProjectsListener(); /* Project */

// Get the modal
const taskFormModal = document.querySelector('#taskFormModal'); /* Task */
const projectFormModal = document.querySelector('#projectFormModal'); /* Project */

// Get the button that opens the modal
const btnNewTask = document.querySelector('#btnNewTask'); /* Task */
const btnNewProject = document.querySelector('#btnNewProject'); /* Project */

// Get the button that closes the modal
const btnCloseTask = document.querySelector('#btnCloseTask'); /* Task */
const btnCloseProject = document.querySelector('#btnCloseProject'); /* Project */

// Get the button that saves the information
const saveTask = document.querySelector('#saveTask'); /* Task */
const saveProject = document.querySelector('#saveProject'); /* Project */

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
  refreshProjectsListener();
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
