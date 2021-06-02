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
    button.setAttribute('class', 'fas fa-angle-double-up taskShow');
  } else {
    taskDetail.setAttribute('hidden', 'true');
    button.setAttribute('class', 'fas fa-angle-double-down taskShow');
  }
}

// Toggle task completion
function eventCompletionToggle(e) {
  const button = e.target;
  const id = parseInt(button.id.match(/\d+/gm), 10);
  const taskCardInfo = document.querySelector(`#taskCardInfo${id}`);
  const completed = toggleTaskCompletion(id);
  if (completed) {
    button.setAttribute('class', 'taksCompleted far fa-calendar-check completeTask');
    taskCardInfo.setAttribute('class', 'taskCardInfo  disabled');
  } else {
    button.setAttribute('class', 'taksPending far fa-calendar completeTask');
    taskCardInfo.setAttribute('class', 'taskCardInfo');
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
  const taskShowAll = document.querySelectorAll('.taskShow'); /* Task */
  // Get the button that toggle the task completion
  const completeTaskAll = document.querySelectorAll('.completeTask'); /* Task */
  // Get the button that edit the task
  const editTaskAll = document.querySelectorAll('.taskEdit'); /* Task */
  // Get the button that delete the task
  const deleteTaskAll = document.querySelectorAll('.taskDelete'); /* Task */

  taskShowAll.forEach((button) => {
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
