import { populateStorage } from './utilities.js'; { saveNewTask, drawTasks }
import { saveNewProject, drawProjects } from './projectsHTML.js';
import { toggleTaskCompletion } from './tasksLogic.js';
import { saveNewTask, drawTasks } from './tasksHTML.js';

// Populate localStorage on first use
populateStorage('projects');
populateStorage('tasks');
populateStorage('projectCount');
populateStorage('taskCount');

// Draw the page on load
drawTasks(); /* Task */
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

// Get the projects that to shows tasks by project
const projectsAll = document.querySelectorAll(".projectSort"); /* Task */

// Get the button that shows task details
const showDetailAll = document.querySelectorAll(".showDetail"); /* Task */

// Get the button that toggle the task completion
const completeTaskAll = document.querySelectorAll(".completeTask"); /* Task */

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

//Save new project
saveProject.addEventListener('click', () => {
  saveNewProject();
  projectFormModal.setAttribute('hidden', 'true');
  saveProject.value = '';
});

//Save new task
saveTask.addEventListener('click', () => {
  saveNewTask();
  taskFormModal.setAttribute('hidden', 'true');
  saveTask.value = '';
});

// Toggle task detail
showDetailAll.forEach((button) => {
  button.addEventListener('click', () => {
    const id = parseInt(button.id.match(/\d+/gm), 10);
    const taskDetail = document.querySelector(`#taskDetail${id}`);
    if (taskDetail.hasAttribute("hidden")){
      taskDetail.removeAttribute('hidden');
      button.setAttribute('class', 'alignDown projectBtn fas fa-angle-double-up showDetail');
    } else {
      taskDetail.setAttribute('hidden', 'true');
      button.setAttribute('class', 'alignDown projectBtn fas fa-angle-double-down showDetail');
    }
  });
});

// Toggle Completion
completeTaskAll.forEach((button) => {
  button.addEventListener('click', () => {
    const id = parseInt(button.id.match(/\d+/gm), 10);
    const taskHTML = document.querySelector(`#task${id}`).firstChild;
    const completed = toggleTaskCompletion(id);
    if (completed){
      button.setAttribute('class', 'taksCompleted alignUp projectBtn far fa-calendar-check completeTask');
      taskHTML.setAttribute('class', 'flexContainer  disabled');
    } else {
      button.setAttribute('class', 'taksPending alignUp projectBtn far fa-calendar completeTask');
      taskHTML.setAttribute('class', 'flexContainer  enabled');
    }
  });
});

// Sort tasks by project
projectsAll.forEach((button) => {
  button.addEventListener('click', () => {
    const id = parseInt(button.id.match(/\d+/gm), 10);
    const tasksContent = document.querySelector('#tasksContent').children;
    for (let i = 0; i < tasksContent.length; i += 1) {
      const taskProject = tasksContent[i].lastElementChild.firstElementChild.firstElementChild.lastElementChild
      if (button.textContent === taskProject.textContent){
        tasksContent[i].setAttribute('class', 'itemCard flexColumn');
      } else {
        tasksContent[i].setAttribute('class', 'itemCard displayNone');
      }
    }
  });
});
