import { toggleTaskCompletion } from './tasksLogic.js';
import {
  callEditFormTasks, removeTaskFromTasks,
} from './tasksHTML.js';

// Toggle task detail
function eventTaskToggle(e) {
  const button = e.target;
  const id = parseInt(button.id.match(/\d+/gm), 10);
  const taskDetail = document.querySelector(`#taskDetail${id}`);
  if (taskDetail.hasAttribute('hidden')) {
    taskDetail.removeAttribute('hidden');
    button.setAttribute('class', 'alignDown projectBtn fas fa-angle-double-up showDetail');
  } else {
    taskDetail.setAttribute('hidden', 'true');
    button.setAttribute('class', 'alignDown projectBtn fas fa-angle-double-down showDetail');
  }
}

// Toggle task completion
function eventCompletionToggle(e) {
  const button = e.target;
  const id = parseInt(button.id.match(/\d+/gm), 10);
  const taskHTML = document.querySelector(`#task${id}`).firstChild;
  const completed = toggleTaskCompletion(id);
  if (completed) {
    button.setAttribute('class', 'taksCompleted alignUp projectBtn far fa-calendar-check completeTask');
    taskHTML.setAttribute('class', 'displayFlex  disabled');
  } else {
    button.setAttribute('class', 'taksPending alignUp projectBtn far fa-calendar completeTask');
    taskHTML.setAttribute('class', 'displayFlex');
  }
}

// Edit task
function eventEditTask(e) {
  const button = e.target;
  const id = parseInt(button.id.match(/\d+/gm), 10);
  const taskFormModal = document.querySelector('#taskFormModal');
  const saveTask = document.querySelector('#saveTask');
  callEditFormTasks(id);
  taskFormModal.removeAttribute('hidden');
  saveTask.setAttribute('value', `${id}`);
}

// Delete task
function eventDeleteTask(e) {
  const button = e.target;
  const id = parseInt(button.id.match(/\d+/gm), 10);
  removeTaskFromTasks(id);
}

function refreshTaskListeners() {
  // Get the button that shows task details
  const showDetailAll = document.querySelectorAll('.showDetail'); /* Task */
  // Get the button that toggle the task completion
  const completeTaskAll = document.querySelectorAll('.completeTask'); /* Task */
  // Get the button that edit the task
  const editTaskAll = document.querySelectorAll('.editTask'); /* Task */
  // Get the button that delete the task
  const deleteTaskAll = document.querySelectorAll('.deleteTask'); /* Task */

  showDetailAll.forEach((button) => {
    button.addEventListener('click', eventTaskToggle);
  });

  completeTaskAll.forEach((button) => {
    button.addEventListener('click', eventCompletionToggle);
  });

  editTaskAll.forEach((button) => {
    button.addEventListener('click', eventEditTask);
  });

  deleteTaskAll.forEach((button) => {
    button.addEventListener('click', eventDeleteTask);
  });
}

export default refreshTaskListeners;
