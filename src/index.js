import { populateStorage } from './projectsLogic.js';
import { saveNewProject, drawProjects } from './projectsHTML';

// Populate localStorage on first use
populateStorage('projects'); /* Project */
populateStorage('tasks'); /* Task */

// Draw the page on load
drawProjects(); /* Project */

// Get the modal
const projectFormModal = document.querySelector("#projectFormModal"); /* Project */
const taskFormModal = document.querySelector("#taskFormModal"); /* Task */

// Get the button that opens the modal
const btnNewProject = document.querySelector("#btnNewProject"); /* Project */
const btnNewTask = document.querySelector("#btnNewTask"); /* Task */

// Get the button that closes the modal
const btnCloseProject = document.querySelector("#btnCloseProject"); /* Project */
const btnCloseTask = document.querySelector("#btnCloseTask"); /* Task */

// Get the button that saves the information
const saveProject = document.querySelector("#saveProject"); /* Project */
const saveTask = document.querySelector("#saveTask"); /* Task */

// Show project form
btnNewProject.addEventListener('click', () => {
  projectFormModal.removeAttribute('hidden');
});

// Show task form
btnNewTask.addEventListener('click', () => {
  taskFormModal.removeAttribute('hidden');
});

// Hide project form (for close button)
btnCloseProject.addEventListener('click', () => {
  projectFormModal.setAttribute('hidden', 'true');
});

// Hide task form (for close button)
btnCloseTask.addEventListener('click', () => {
  taskFormModal.setAttribute('hidden', 'true');
});

// Hide form (for background)
window.onclick = function(event) {
  // Project form
  if (event.target == projectFormModal) {
    projectFormModal.setAttribute('hidden', 'true');
  }
  // Task Form
  if (event.target == taskFormModal) {
    taskFormModal.setAttribute('hidden', 'true');
  }
}


saveProject.addEventListener('click', () => {
  saveNewProject();
  projectFormModal.setAttribute('hidden', 'true');
});
